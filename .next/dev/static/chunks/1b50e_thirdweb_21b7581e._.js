(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/ethereum.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ethereum",
    ()=>ethereum,
    "mainnet",
    ()=>mainnet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
;
const ethereum = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])({
    blockExplorers: [
        {
            name: "Etherscan",
            url: "https://etherscan.io"
        }
    ],
    id: 1,
    name: "Ethereum",
    nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH"
    }
});
const mainnet = ethereum; //# sourceMappingURL=ethereum.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/types.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authOptions",
    ()=>authOptions,
    "socialAuthOptions",
    ()=>socialAuthOptions
]);
const socialAuthOptions = [
    "google",
    "apple",
    "facebook",
    "discord",
    "line",
    "x",
    "tiktok",
    "epic",
    "coinbase",
    "farcaster",
    "telegram",
    "github",
    "twitch",
    "steam"
];
const authOptions = [
    ...socialAuthOptions,
    "guest",
    "backend",
    "email",
    "phone",
    "passkey",
    "wallet"
]; //# sourceMappingURL=types.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/parseAbiItem.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseAbiItem",
    ()=>parseAbiItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$errors$2f$abiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/errors/abiItem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$signatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/runtime/signatures.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$structs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/runtime/structs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/runtime/utils.js [app-client] (ecmascript)");
;
;
;
;
function parseAbiItem(signature) {
    let abiItem;
    if (typeof signature === 'string') abiItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseSignature"])(signature);
    else {
        const structs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$structs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseStructs"])(signature);
        const length = signature.length;
        for(let i = 0; i < length; i++){
            const signature_ = signature[i];
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$signatures$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isStructSignature"])(signature_)) continue;
            abiItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$runtime$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseSignature"])(signature_, structs);
            break;
        }
    }
    if (!abiItem) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$errors$2f$abiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidAbiItemError"]({
        signature
    });
    return abiItem;
} //# sourceMappingURL=parseAbiItem.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/byte-size.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "byteSize",
    ()=>byteSize
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/is-hex.js [app-client] (ecmascript)");
;
function byteSize(value) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(value, {
        strict: false
    })) {
        return Math.ceil((value.length - 2) / 2);
    }
    return value.length;
} //# sourceMappingURL=byte-size.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/encodeAbiParameters.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "encodeAbiParameters",
    ()=>encodeAbiParameters,
    "encodeAddress",
    ()=>encodeAddress,
    "prepareParam",
    ()=>prepareParam
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$byte$2d$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/byte-size.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
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
            staticSize += (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$byte$2d$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["byteSize"])(encoded);
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
            staticParams.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(staticSize + dynamicSize, {
                size: 32
            }));
            dynamicParams.push(encoded);
            dynamicSize += (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$byte$2d$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["byteSize"])(encoded);
        } else {
            staticParams.push(encoded);
        }
    }
    // 3. Concatenate static and dynamic parts.
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"](...[
        ...staticParams,
        ...dynamicParams
    ]);
}
function encodeAddress(value) {
    // We allow empty strings for deployment transactions where there is no to address
    if (value !== "" && value !== undefined && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAddress"])(value)) {
        throw new Error(`Invalid address: ${value}`);
    }
    return {
        dynamic: false,
        encoded: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["padHex"])(value.toLowerCase())
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
            const length_ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(preparedParams.length, {
                size: 32
            });
            return {
                dynamic: true,
                encoded: preparedParams.length > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"](...[
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
        encoded: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"](...preparedParams.map(({ encoded })=>encoded))
    };
}
function encodeBytes(value, { param }) {
    const [, paramSize] = param.type.split("bytes");
    const bytesSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$byte$2d$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["byteSize"])(value);
    if (!paramSize) {
        let value_ = value;
        // If the size is not divisible by 32 bytes, pad the end
        // with empty bytes to the ceiling 32 bytes.
        if (bytesSize % 32 !== 0) {
            value_ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["padHex"])(value_, {
                dir: "right",
                size: Math.ceil((value.length - 2) / 2 / 32) * 32
            });
        }
        return {
            dynamic: true,
            encoded: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"](...[
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["padHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(bytesSize, {
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
        encoded: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["padHex"])(value, {
            dir: "right"
        })
    };
}
function encodeBool(value) {
    return {
        dynamic: false,
        encoded: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["padHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["boolToHex"])(value))
    };
}
function encodeNumber(value, { signed }) {
    return {
        dynamic: false,
        encoded: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(value, {
            signed,
            size: 32
        })
    };
}
function encodeString(value) {
    const hexValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["stringToHex"])(value);
    const partsLength = Math.ceil((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$byte$2d$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["byteSize"])(hexValue) / 32);
    const parts = [];
    for(let i = 0; i < partsLength; i++){
        parts.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["padHex"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["slice"](hexValue, i * 32, (i + 1) * 32), {
            dir: "right"
        }));
    }
    return {
        dynamic: true,
        encoded: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"](...[
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["padHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$byte$2d$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["byteSize"])(hexValue), {
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
        encoded: dynamic ? encodeParams(preparedParams) : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"](...preparedParams.map(({ encoded })=>encoded))
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/prepare-method.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prepareMethod",
    ()=>prepareMethod
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/parseAbiItem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toFunctionSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/hash/toFunctionSelector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$caching$2f$lru$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/caching/lru.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
;
;
;
;
const prepareMethodCache = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$caching$2f$lru$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LruMap"](4096);
function prepareMethod(method) {
    const key = typeof method === "string" ? method : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(method);
    if (prepareMethodCache.has(key)) {
        return prepareMethodCache.get(key);
    }
    const abiFn = typeof method === "string" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbiItem"])(method) : method;
    // encode the method signature
    const sig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toFunctionSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toFunctionSelector"])(abiFn);
    const ret = [
        sig,
        abiFn.inputs,
        abiFn.outputs
    ];
    prepareMethodCache.set(key, ret);
    return ret;
} //# sourceMappingURL=prepare-method.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/base.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "base",
    ()=>base
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
;
const base = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])({
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/base-sepolia.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "baseSepolia",
    ()=>baseSepolia
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
;
const baseSepolia = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])({
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/optimism.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "optimism",
    ()=>optimism
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
;
const optimism = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])({
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/optimism-sepolia.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "optimismSepolia",
    ()=>optimismSepolia
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
;
const optimismSepolia = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])({
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/zora.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "zora",
    ()=>zora
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
;
const zora = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])({
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/zora-sepolia.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "zoraSepolia",
    ()=>zoraSepolia
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
;
const zoraSepolia = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defineChain"])({
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/constants.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isOpStackChain",
    ()=>isOpStackChain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$base$2d$sepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/base-sepolia.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$optimism$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/optimism.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$optimism$2d$sepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/optimism-sepolia.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$zora$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/zora.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$zora$2d$sepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/zora-sepolia.js [app-client] (ecmascript)");
;
;
;
;
;
;
const opChains = [
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base"].id,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$base$2d$sepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseSepolia"].id,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$optimism$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["optimism"].id,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$optimism$2d$sepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["optimismSepolia"].id,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$zora$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zora"].id,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$zora$2d$sepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zoraSepolia"].id,
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
        const { getChainMetadata } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript, async loader)");
        const chainMetadata = await getChainMetadata(chain);
        return chainMetadata.stackType === "optimism_bedrock";
    } catch  {
        // If the network check fails, assume it's not a OP chain
        return false;
    }
} //# sourceMappingURL=constants.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/estimate-gas-cost.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "estimateGasCost",
    ()=>estimateGasCost
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$gas$2f$fee$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/gas/fee-data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/resolve-promised-value.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/units.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$estimate$2d$gas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/estimate-gas.js [app-client] (ecmascript)");
;
;
;
;
;
async function estimateGasCost(options) {
    const { transaction } = options;
    const from = options.from ?? options.account?.address ?? undefined;
    const gasLimit = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(transaction.gas) || await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$estimate$2d$gas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["estimateGas"])({
        from,
        transaction
    });
    const fees = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$gas$2f$fee$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultGasOverrides"])(transaction.client, transaction.chain);
    const gasPrice = fees.maxFeePerGas || fees.gasPrice;
    if (gasPrice === undefined) {
        throw new Error(`Unable to determine gas price for chain ${transaction.chain.id}`);
    }
    let l1Fee;
    if (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOpStackChain"])(transaction.chain)) {
        const { estimateL1Fee } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/gas/estimate-l1-fee.js [app-client] (ecmascript, async loader)");
        l1Fee = await estimateL1Fee({
            transaction
        });
    } else {
        l1Fee = 0n;
    }
    const wei = gasLimit * gasPrice + l1Fee;
    return {
        ether: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toEther"])(wei),
        wei
    };
} //# sourceMappingURL=estimate-gas-cost.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTransactionGasCost",
    ()=>getTransactionGasCost,
    "isAbiFunction",
    ()=>isAbiFunction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$gas$2f$get$2d$gas$2d$price$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/gas/get-gas-price.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$estimate$2d$gas$2d$cost$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/estimate-gas-cost.js [app-client] (ecmascript)");
;
;
function isAbiFunction(item) {
    return !!(item && typeof item === "object" && "type" in item && item.type === "function");
}
async function getTransactionGasCost(tx, from) {
    try {
        const gasCost = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$estimate$2d$gas$2d$cost$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["estimateGasCost"])({
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
        const gasPrice = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$gas$2f$get$2d$gas$2d$price$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGasPrice"])({
            chain: tx.chain,
            client: tx.client
        });
        return 1000000n * gasPrice;
    }
} //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/prepare-contract-call.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prepareContractCall",
    ()=>prepareContractCall
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/parseAbiItem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/encodeAbiParameters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$prepare$2d$method$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/prepare-method.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/resolve-promised-value.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/prepare-transaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/utils.js [app-client] (ecmascript)");
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
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAbiFunction"])(method)) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$prepare$2d$method$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareMethod"])(method);
            }
            if (typeof method === "function") {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$prepare$2d$method$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareMethod"])(await method(contract));
            }
            // if the method starts with the string `function ` we always will want to try to parse it
            if (typeof method === "string" && method.startsWith("function ")) {
                // @ts-expect-error - method *is* string in this case
                const abiItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbiItem"])(method);
                if (abiItem.type === "function") {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$prepare$2d$method$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareMethod"])(abiItem);
                }
                throw new Error(`"method" passed is not of type "function"`);
            }
            // check if we have a "abi" on the contract
            if (contract.abi && contract.abi?.length > 0) {
                // extract the abiFunction from it
                const abiFunction = contract.abi?.find((item)=>item.type === "function" && item.name === method);
                // if we were able to find it -> return it
                if (abiFunction) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$prepare$2d$method$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareMethod"])(abiFunction);
                }
            }
            throw new Error(`Could not resolve method "${method}".`);
        })();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareTransaction"])({
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
            return preparedM[0] + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeAbiParameters"])(preparedM[1], // @ts-expect-error - TODO: fix this type issue
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(params ?? [])).slice(2);
        },
        // these always inferred from the contract
        to: contract.address
    }, {
        contract: contract,
        preparedMethod: preparedMethodPromise
    });
} //# sourceMappingURL=prepare-contract-call.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/detectExtension.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "detectMethod",
    ()=>detectMethod
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toFunctionSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/hash/toFunctionSelector.js [app-client] (ecmascript)");
;
function detectMethod(options) {
    const fnSelector = Array.isArray(options.method) ? options.method[0] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toFunctionSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toFunctionSelector"])(options.method);
    return options.availableSelectors.includes(fnSelector);
} //# sourceMappingURL=detectExtension.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/once.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "once",
    ()=>once
]);
function once(fn) {
    let result;
    return ()=>{
        if (!result) {
            result = fn();
        }
        return result;
    };
} //# sourceMappingURL=once.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc7702/__generated__/MinimalAccount/write/execute.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FN_SELECTOR",
    ()=>FN_SELECTOR,
    "encodeExecute",
    ()=>encodeExecute,
    "encodeExecuteParams",
    ()=>encodeExecuteParams,
    "execute",
    ()=>execute,
    "isExecuteSupported",
    ()=>isExecuteSupported
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$contract$2d$call$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/prepare-contract-call.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/encodeAbiParameters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$detectExtension$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/detectExtension.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$once$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/once.js [app-client] (ecmascript)");
;
;
;
;
const FN_SELECTOR = "0x3f707e6b";
const FN_INPUTS = [
    {
        type: "tuple[]",
        name: "calls",
        components: [
            {
                type: "address",
                name: "target"
            },
            {
                type: "uint256",
                name: "value"
            },
            {
                type: "bytes",
                name: "data"
            }
        ]
    }
];
const FN_OUTPUTS = [];
function isExecuteSupported(availableSelectors) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$detectExtension$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectMethod"])({
        availableSelectors,
        method: [
            FN_SELECTOR,
            FN_INPUTS,
            FN_OUTPUTS
        ]
    });
}
function encodeExecuteParams(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeAbiParameters"])(FN_INPUTS, [
        options.calls
    ]);
}
function encodeExecute(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return FN_SELECTOR + encodeExecuteParams(options).slice(2);
}
function execute(options) {
    const asyncOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$once$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["once"])(async ()=>{
        return "asyncParams" in options ? await options.asyncParams() : options;
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$contract$2d$call$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareContractCall"])({
        contract: options.contract,
        method: [
            FN_SELECTOR,
            FN_INPUTS,
            FN_OUTPUTS
        ],
        params: async ()=>{
            const resolvedOptions = await asyncOptions();
            return [
                resolvedOptions.calls
            ];
        },
        value: async ()=>(await asyncOptions()).overrides?.value,
        accessList: async ()=>(await asyncOptions()).overrides?.accessList,
        gas: async ()=>(await asyncOptions()).overrides?.gas,
        gasPrice: async ()=>(await asyncOptions()).overrides?.gasPrice,
        maxFeePerGas: async ()=>(await asyncOptions()).overrides?.maxFeePerGas,
        maxPriorityFeePerGas: async ()=>(await asyncOptions()).overrides?.maxPriorityFeePerGas,
        nonce: async ()=>(await asyncOptions()).overrides?.nonce,
        extraGas: async ()=>(await asyncOptions()).overrides?.extraGas,
        erc20Value: async ()=>(await asyncOptions()).overrides?.erc20Value,
        authorizationList: async ()=>(await asyncOptions()).overrides?.authorizationList
    });
} //# sourceMappingURL=execute.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/address/isAddressEqual.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isAddressEqual",
    ()=>isAddressEqual
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/address/isAddress.js [app-client] (ecmascript)");
;
;
function isAddressEqual(a, b) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAddress"])(a, {
        strict: false
    })) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidAddressError"]({
        address: a
    });
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAddress"])(b, {
        strict: false
    })) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidAddressError"]({
        address: b
    });
    return a.toLowerCase() === b.toLowerCase();
} //# sourceMappingURL=isAddressEqual.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/hash/toEventSelector.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toEventSelector",
    ()=>toEventSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toSignatureHash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/hash/toSignatureHash.js [app-client] (ecmascript)");
;
const toEventSelector = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toSignatureHash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSignatureHash"]; //# sourceMappingURL=toEventSelector.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/decodeEventLog.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decodeEventLog",
    ()=>decodeEventLog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/abi.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$cursor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/cursor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/data/size.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toEventSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/hash/toEventSelector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/decodeAbiParameters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$formatAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/formatAbiItem.js [app-client] (ecmascript)");
;
;
;
;
;
;
const docsPath = '/docs/contract/decodeEventLog';
function decodeEventLog(parameters) {
    const { abi, data, strict: strict_, topics } = parameters;
    const strict = strict_ ?? true;
    const [signature, ...argTopics] = topics;
    if (!signature) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AbiEventSignatureEmptyTopicsError"]({
        docsPath
    });
    const abiItem = abi.find((x)=>x.type === 'event' && signature === (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toEventSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toEventSelector"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$formatAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatAbiItem"])(x)));
    if (!(abiItem && 'name' in abiItem) || abiItem.type !== 'event') throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AbiEventSignatureNotFoundError"](signature, {
        docsPath
    });
    const { name, inputs } = abiItem;
    const isUnnamed = inputs?.some((x)=>!('name' in x && x.name));
    const args = isUnnamed ? [] : {};
    // Decode topics (indexed args).
    const indexedInputs = inputs.map((x, i)=>[
            x,
            i
        ]).filter(([x])=>'indexed' in x && x.indexed);
    for(let i = 0; i < indexedInputs.length; i++){
        const [param, argIndex] = indexedInputs[i];
        const topic = argTopics[i];
        if (!topic) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DecodeLogTopicsMismatch"]({
            abiItem,
            param: param
        });
        args[isUnnamed ? argIndex : param.name || argIndex] = decodeTopic({
            param,
            value: topic
        });
    }
    // Decode data (non-indexed args).
    const nonIndexedInputs = inputs.filter((x)=>!('indexed' in x && x.indexed));
    if (nonIndexedInputs.length > 0) {
        if (data && data !== '0x') {
            try {
                const decodedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeAbiParameters"])(nonIndexedInputs, data);
                if (decodedData) {
                    if (isUnnamed) for(let i = 0; i < inputs.length; i++)args[i] = args[i] ?? decodedData.shift();
                    else for(let i = 0; i < nonIndexedInputs.length; i++)args[nonIndexedInputs[i].name] = decodedData[i];
                }
            } catch (err) {
                if (strict) {
                    if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AbiDecodingDataSizeTooSmallError"] || err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$cursor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PositionOutOfBoundsError"]) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DecodeLogDataMismatch"]({
                        abiItem,
                        data: data,
                        params: nonIndexedInputs,
                        size: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["size"])(data)
                    });
                    throw err;
                }
            }
        } else if (strict) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DecodeLogDataMismatch"]({
                abiItem,
                data: '0x',
                params: nonIndexedInputs,
                size: 0
            });
        }
    }
    return {
        eventName: name,
        args: Object.values(args).length > 0 ? args : undefined
    };
}
function decodeTopic({ param, value }) {
    if (param.type === 'string' || param.type === 'bytes' || param.type === 'tuple' || param.type.match(/^(.*)\[(\d+)?\]$/)) return value;
    const decodedArg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeAbiParameters"])([
        param
    ], value) || [];
    return decodedArg[0];
} //# sourceMappingURL=decodeEventLog.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/parseEventLogs.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseEventLogs",
    ()=>parseEventLogs
]);
// TODO(v3): checksum address.
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/abi.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddressEqual$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/address/isAddressEqual.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/encoding/toBytes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/hash/keccak256.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toEventSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/hash/toEventSelector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeEventLog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/decodeEventLog.js [app-client] (ecmascript)");
;
;
;
;
;
;
function parseEventLogs(parameters) {
    const { abi, args, logs, strict = true } = parameters;
    const eventName = (()=>{
        if (!parameters.eventName) return undefined;
        if (Array.isArray(parameters.eventName)) return parameters.eventName;
        return [
            parameters.eventName
        ];
    })();
    return logs.map((log)=>{
        try {
            const abiItem = abi.find((abiItem)=>abiItem.type === 'event' && log.topics[0] === (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toEventSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toEventSelector"])(abiItem));
            if (!abiItem) return null;
            const event = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeEventLog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeEventLog"])({
                ...log,
                abi: [
                    abiItem
                ],
                strict
            });
            // Check that the decoded event name matches the provided event name.
            if (eventName && !eventName.includes(event.eventName)) return null;
            // Check that the decoded event args match the provided args.
            if (!includesArgs({
                args: event.args,
                inputs: abiItem.inputs,
                matchArgs: args
            })) return null;
            return {
                ...event,
                ...log
            };
        } catch (err) {
            let eventName;
            let isUnnamed;
            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AbiEventSignatureNotFoundError"]) return null;
            if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DecodeLogDataMismatch"] || err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DecodeLogTopicsMismatch"]) {
                // If strict mode is on, and log data/topics do not match event definition, skip.
                if (strict) return null;
                eventName = err.abiItem.name;
                isUnnamed = err.abiItem.inputs?.some((x)=>!('name' in x && x.name));
            }
            // Set args to empty if there is an error decoding (e.g. indexed/non-indexed params mismatch).
            return {
                ...log,
                args: isUnnamed ? [] : {},
                eventName
            };
        }
    }).filter(Boolean);
}
function includesArgs(parameters) {
    const { args, inputs, matchArgs } = parameters;
    if (!matchArgs) return true;
    if (!args) return false;
    function isEqual(input, value, arg) {
        try {
            if (input.type === 'address') return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddressEqual$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAddressEqual"])(value, arg);
            if (input.type === 'string' || input.type === 'bytes') return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBytes"])(value)) === arg;
            return value === arg;
        } catch  {
            return false;
        }
    }
    if (Array.isArray(args) && Array.isArray(matchArgs)) {
        return matchArgs.every((value, index)=>{
            if (value === null || value === undefined) return true;
            const input = inputs[index];
            if (!input) return false;
            const value_ = Array.isArray(value) ? value : [
                value
            ];
            return value_.some((value)=>isEqual(input, value, args[index]));
        });
    }
    if (typeof args === 'object' && !Array.isArray(args) && typeof matchArgs === 'object' && !Array.isArray(matchArgs)) return Object.entries(matchArgs).every(([key, value])=>{
        if (value === null || value === undefined) return true;
        const input = inputs.find((input)=>input.name === key);
        if (!input) return false;
        const value_ = Array.isArray(value) ? value : [
            value
        ];
        return value_.some((value)=>isEqual(input, value, args[key]));
    });
    return false;
} //# sourceMappingURL=parseEventLogs.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/event/actions/parse-logs.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseEventLogs",
    ()=>parseEventLogs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$parseEventLogs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/parseEventLogs.js [app-client] (ecmascript)");
;
function parseEventLogs(options) {
    const { logs, events, strict } = options;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$parseEventLogs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEventLogs"])({
        abi: events.map((e)=>e.abiEvent),
        logs,
        strict
    });
} //# sourceMappingURL=parse-logs.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/log.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FilterTypeNotSupportedError",
    ()=>FilterTypeNotSupportedError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)");
;
class FilterTypeNotSupportedError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(type){
        super(`Filter type "${type}" is not supported.`, {
            name: 'FilterTypeNotSupportedError'
        });
    }
} //# sourceMappingURL=log.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/getAbiItem.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAbiItem",
    ()=>getAbiItem,
    "getAmbiguousTypes",
    ()=>getAmbiguousTypes,
    "isArgOfType",
    ()=>isArgOfType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/abi.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/data/isHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/address/isAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toEventSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/hash/toEventSelector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toFunctionSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/hash/toFunctionSelector.js [app-client] (ecmascript)");
;
;
;
;
;
function getAbiItem(parameters) {
    const { abi, args = [], name } = parameters;
    const isSelector = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(name, {
        strict: false
    });
    const abiItems = abi.filter((abiItem)=>{
        if (isSelector) {
            if (abiItem.type === 'function') return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toFunctionSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toFunctionSelector"])(abiItem) === name;
            if (abiItem.type === 'event') return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toEventSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toEventSelector"])(abiItem) === name;
            return false;
        }
        return 'name' in abiItem && abiItem.name === name;
    });
    if (abiItems.length === 0) return undefined;
    if (abiItems.length === 1) return abiItems[0];
    let matchedAbiItem;
    for (const abiItem of abiItems){
        if (!('inputs' in abiItem)) continue;
        if (!args || args.length === 0) {
            if (!abiItem.inputs || abiItem.inputs.length === 0) return abiItem;
            continue;
        }
        if (!abiItem.inputs) continue;
        if (abiItem.inputs.length === 0) continue;
        if (abiItem.inputs.length !== args.length) continue;
        const matched = args.every((arg, index)=>{
            const abiParameter = 'inputs' in abiItem && abiItem.inputs[index];
            if (!abiParameter) return false;
            return isArgOfType(arg, abiParameter);
        });
        if (matched) {
            // Check for ambiguity against already matched parameters (e.g. `address` vs `bytes20`).
            if (matchedAbiItem && 'inputs' in matchedAbiItem && matchedAbiItem.inputs) {
                const ambiguousTypes = getAmbiguousTypes(abiItem.inputs, matchedAbiItem.inputs, args);
                if (ambiguousTypes) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AbiItemAmbiguityError"]({
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
    if (matchedAbiItem) return matchedAbiItem;
    return abiItems[0];
}
function isArgOfType(arg, abiParameter) {
    const argType = typeof arg;
    const abiParameterType = abiParameter.type;
    switch(abiParameterType){
        case 'address':
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAddress"])(arg, {
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
            if (types.includes('address') && types.includes('string')) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAddress"])(args[parameterIndex], {
                strict: false
            });
            if (types.includes('address') && types.includes('bytes')) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAddress"])(args[parameterIndex], {
                strict: false
            });
            return false;
        })();
        if (ambiguous) return types;
    }
    return;
} //# sourceMappingURL=getAbiItem.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/encodeEventTopics.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "encodeEventTopics",
    ()=>encodeEventTopics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/abi.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$log$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/log.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/encoding/toBytes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/hash/keccak256.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toEventSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/hash/toEventSelector.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/encodeAbiParameters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$formatAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/formatAbiItem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$getAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/getAbiItem.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
const docsPath = '/docs/contract/encodeEventTopics';
function encodeEventTopics(parameters) {
    const { abi, eventName, args } = parameters;
    let abiItem = abi[0];
    if (eventName) {
        const item = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$getAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAbiItem"])({
            abi,
            name: eventName
        });
        if (!item) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AbiEventNotFoundError"](eventName, {
            docsPath
        });
        abiItem = item;
    }
    if (abiItem.type !== 'event') throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$abi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AbiEventNotFoundError"](undefined, {
        docsPath
    });
    const definition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$formatAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatAbiItem"])(abiItem);
    const signature = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toEventSelector$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toEventSelector"])(definition);
    let topics = [];
    if (args && 'inputs' in abiItem) {
        const indexedInputs = abiItem.inputs?.filter((param)=>'indexed' in param && param.indexed);
        const args_ = Array.isArray(args) ? args : Object.values(args).length > 0 ? indexedInputs?.map((x)=>args[x.name]) ?? [] : [];
        if (args_.length > 0) {
            topics = indexedInputs?.map((param, i)=>{
                if (Array.isArray(args_[i])) return args_[i].map((_, j)=>encodeArg({
                        param,
                        value: args_[i][j]
                    }));
                return typeof args_[i] !== 'undefined' && args_[i] !== null ? encodeArg({
                    param,
                    value: args_[i]
                }) : null;
            }) ?? [];
        }
    }
    return [
        signature,
        ...topics
    ];
}
function encodeArg({ param, value }) {
    if (param.type === 'string' || param.type === 'bytes') return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBytes"])(value));
    if (param.type === 'tuple' || param.type.match(/^(.*)\[(\d+)?\]$/)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$log$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FilterTypeNotSupportedError"](param.type);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeAbiParameters"])([
        param
    ], [
        value
    ]);
} //# sourceMappingURL=encodeEventTopics.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/hash/toSignatureHash.js [app-client] (ecmascript) <export toSignatureHash as toEventHash>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toEventHash",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toSignatureHash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSignatureHash"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toSignatureHash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/hash/toSignatureHash.js [app-client] (ecmascript)");
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/event/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @internal
 */ __turbopack_context__.s([
    "isAbiEvent",
    ()=>isAbiEvent
]);
function isAbiEvent(item) {
    return !!(item && typeof item === "object" && "type" in item && item.type === "event");
} //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/event/prepare-event.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prepareEvent",
    ()=>prepareEvent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/parseAbiItem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeEventTopics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/encodeEventTopics.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toSignatureHash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__toSignatureHash__as__toEventHash$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/hash/toSignatureHash.js [app-client] (ecmascript) <export toSignatureHash as toEventHash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$event$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/event/utils.js [app-client] (ecmascript)");
;
;
;
function prepareEvent(options) {
    const { signature } = options;
    let resolvedSignature;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$event$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAbiEvent"])(signature)) {
        resolvedSignature = signature;
    } else {
        resolvedSignature = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbiItem"])(signature);
    }
    return {
        abiEvent: resolvedSignature,
        hash: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toSignatureHash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__toSignatureHash__as__toEventHash$3e$__["toEventHash"])(resolvedSignature),
        // @ts-expect-error - TODO: investiagte why this complains, it works fine however
        topics: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeEventTopics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeEventTopics"])({
            abi: [
                resolvedSignature
            ],
            args: options.filters
        })
    };
} //# sourceMappingURL=prepare-event.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc4337/__generated__/IEntryPoint/events/UserOperationRevertReason.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "userOperationRevertReasonEvent",
    ()=>userOperationRevertReasonEvent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$event$2f$prepare$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/event/prepare-event.js [app-client] (ecmascript)");
;
function userOperationRevertReasonEvent(filters = {}) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$event$2f$prepare$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareEvent"])({
        filters,
        signature: "event UserOperationRevertReason(bytes32 indexed userOpHash, address indexed sender, uint256 nonce, bytes revertReason)"
    });
} //# sourceMappingURL=UserOperationRevertReason.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc4337/__generated__/IEntryPoint_v07/events/PostOpRevertReason.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "postOpRevertReasonEvent",
    ()=>postOpRevertReasonEvent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$event$2f$prepare$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/event/prepare-event.js [app-client] (ecmascript)");
;
function postOpRevertReasonEvent(filters = {}) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$event$2f$prepare$2d$event$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareEvent"])({
        filters,
        signature: "event PostOpRevertReason(bytes32 indexed userOpHash, address indexed sender, uint256 nonce, bytes revertReason)"
    });
} //# sourceMappingURL=PostOpRevertReason.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_call.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "eth_call",
    ()=>eth_call
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
;
function encodeStateOverrides(overrides) {
    return Object.fromEntries(Object.entries(overrides).map(([address, override])=>{
        return [
            address,
            {
                balance: override.balance ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(override.balance) : undefined,
                code: override.code,
                nonce: override.nonce ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(override.nonce) : undefined,
                state: override.state,
                stateDiff: override.stateDiff
            }
        ];
    }));
}
async function eth_call(request, params) {
    const { blockNumber, blockTag, ...txRequest } = params;
    const blockNumberHex = blockNumber ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(blockNumber) : undefined;
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/read-contract.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "readContract",
    ()=>readContract
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/parseAbiItem.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/decodeAbiParameters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_call$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_call.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/encodeAbiParameters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$prepare$2d$method$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/prepare-method.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/utils.js [app-client] (ecmascript)");
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
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAbiFunction"])(method)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$prepare$2d$method$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareMethod"])(method);
        }
        if (typeof method === "function") {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$prepare$2d$method$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareMethod"])(await method(contract));
        }
        // if the method starts with the string `function ` we always will want to try to parse it
        if (typeof method === "string" && method.startsWith("function ")) {
            // @ts-expect-error - method *is* string in this case
            const abiItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbiItem"])(method);
            if (abiItem.type === "function") {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$prepare$2d$method$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareMethod"])(abiItem);
            }
            throw new Error(`"method" passed is not of type "function"`);
        }
        // check if we have a "abi" on the contract
        if (contract.abi && contract.abi?.length > 0) {
            // extract the abiFunction from it
            const abiFunction = contract.abi?.find((item)=>item.type === "function" && item.name === method);
            // if we were able to find it -> return it
            if (abiFunction) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$prepare$2d$method$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareMethod"])(abiFunction);
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
        encodedData = resolvedPreparedMethod[0] + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeAbiParameters"])(resolvedPreparedMethod[1], // @ts-expect-error - TODO: fix this type issue
        resolvedParams).slice(2);
    }
    const rpcRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRpcClient"])({
        chain: contract.chain,
        client: contract.client
    });
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_call$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eth_call"])(rpcRequest, {
        data: encodedData,
        from: options.from ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(options.from) : undefined,
        to: contract.address
    });
    // use the prepared method to decode the result
    const decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeAbiParameters"])(resolvedPreparedMethod[2], result);
    if (Array.isArray(decoded) && decoded.length === 1) {
        return decoded[0];
    }
    return decoded;
} //# sourceMappingURL=read-contract.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc20/__generated__/IERC20/read/allowance.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FN_SELECTOR",
    ()=>FN_SELECTOR,
    "allowance",
    ()=>allowance,
    "decodeAllowanceResult",
    ()=>decodeAllowanceResult,
    "encodeAllowance",
    ()=>encodeAllowance,
    "encodeAllowanceParams",
    ()=>encodeAllowanceParams,
    "isAllowanceSupported",
    ()=>isAllowanceSupported
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/decodeAbiParameters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$read$2d$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/read-contract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/encodeAbiParameters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$detectExtension$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/detectExtension.js [app-client] (ecmascript)");
;
;
;
;
const FN_SELECTOR = "0xdd62ed3e";
const FN_INPUTS = [
    {
        name: "owner",
        type: "address"
    },
    {
        name: "spender",
        type: "address"
    }
];
const FN_OUTPUTS = [
    {
        type: "uint256"
    }
];
function isAllowanceSupported(availableSelectors) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$detectExtension$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectMethod"])({
        availableSelectors,
        method: [
            FN_SELECTOR,
            FN_INPUTS,
            FN_OUTPUTS
        ]
    });
}
function encodeAllowanceParams(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeAbiParameters"])(FN_INPUTS, [
        options.owner,
        options.spender
    ]);
}
function encodeAllowance(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return FN_SELECTOR + encodeAllowanceParams(options).slice(2);
}
function decodeAllowanceResult(result) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeAbiParameters"])(FN_OUTPUTS, result)[0];
}
async function allowance(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$read$2d$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readContract"])({
        contract: options.contract,
        method: [
            FN_SELECTOR,
            FN_INPUTS,
            FN_OUTPUTS
        ],
        params: [
            options.owner,
            options.spender
        ]
    });
} //# sourceMappingURL=allowance.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc20/__generated__/IERC20/write/approve.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FN_SELECTOR",
    ()=>FN_SELECTOR,
    "approve",
    ()=>approve,
    "encodeApprove",
    ()=>encodeApprove,
    "encodeApproveParams",
    ()=>encodeApproveParams,
    "isApproveSupported",
    ()=>isApproveSupported
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$contract$2d$call$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/prepare-contract-call.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/encodeAbiParameters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$detectExtension$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/detectExtension.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$once$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/once.js [app-client] (ecmascript)");
;
;
;
;
const FN_SELECTOR = "0x095ea7b3";
const FN_INPUTS = [
    {
        name: "spender",
        type: "address"
    },
    {
        name: "value",
        type: "uint256"
    }
];
const FN_OUTPUTS = [
    {
        type: "bool"
    }
];
function isApproveSupported(availableSelectors) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$detectExtension$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectMethod"])({
        availableSelectors,
        method: [
            FN_SELECTOR,
            FN_INPUTS,
            FN_OUTPUTS
        ]
    });
}
function encodeApproveParams(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeAbiParameters"])(FN_INPUTS, [
        options.spender,
        options.value
    ]);
}
function encodeApprove(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return FN_SELECTOR + encodeApproveParams(options).slice(2);
}
function approve(options) {
    const asyncOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$once$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["once"])(async ()=>{
        return "asyncParams" in options ? await options.asyncParams() : options;
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$contract$2d$call$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareContractCall"])({
        accessList: async ()=>(await asyncOptions()).overrides?.accessList,
        authorizationList: async ()=>(await asyncOptions()).overrides?.authorizationList,
        contract: options.contract,
        erc20Value: async ()=>(await asyncOptions()).overrides?.erc20Value,
        extraGas: async ()=>(await asyncOptions()).overrides?.extraGas,
        gas: async ()=>(await asyncOptions()).overrides?.gas,
        gasPrice: async ()=>(await asyncOptions()).overrides?.gasPrice,
        maxFeePerGas: async ()=>(await asyncOptions()).overrides?.maxFeePerGas,
        maxPriorityFeePerGas: async ()=>(await asyncOptions()).overrides?.maxPriorityFeePerGas,
        method: [
            FN_SELECTOR,
            FN_INPUTS,
            FN_OUTPUTS
        ],
        nonce: async ()=>(await asyncOptions()).overrides?.nonce,
        params: async ()=>{
            const resolvedOptions = await asyncOptions();
            return [
                resolvedOptions.spender,
                resolvedOptions.value
            ];
        },
        value: async ()=>(await asyncOptions()).overrides?.value
    });
} //# sourceMappingURL=approve.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc20/write/approve.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "approve",
    ()=>approve
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/units.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc20$2f$_$5f$generated_$5f2f$IERC20$2f$write$2f$approve$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc20/__generated__/IERC20/write/approve.js [app-client] (ecmascript)");
;
;
function approve(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc20$2f$_$5f$generated_$5f2f$IERC20$2f$write$2f$approve$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["approve"])({
        asyncParams: async ()=>{
            let amount;
            if ("amount" in options) {
                // if we need to parse the amount from ether to gwei then we pull in the decimals extension
                const { decimals } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc20/read/decimals.js [app-client] (ecmascript, async loader)");
                // if this fails we fall back to `18` decimals
                const d = await decimals(options).catch(()=>18);
                // turn ether into gwei
                amount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toUnits"])(options.amount.toString(), d);
            } else {
                amount = options.amountWei;
            }
            return {
                overrides: {
                    erc20Value: {
                        amountWei: amount,
                        tokenAddress: options.contract.address
                    },
                    ...options.overrides
                },
                spender: options.spender,
                value: amount
            };
        },
        contract: options.contract
    });
} //# sourceMappingURL=approve.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/constants/addresses.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * The address of the native token.
 */ __turbopack_context__.s([
    "NATIVE_TOKEN_ADDRESS",
    ()=>NATIVE_TOKEN_ADDRESS,
    "ZERO_ADDRESS",
    ()=>ZERO_ADDRESS,
    "isNativeTokenAddress",
    ()=>isNativeTokenAddress
]);
const NATIVE_TOKEN_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
function isNativeTokenAddress(address) {
    return address.toLowerCase() === NATIVE_TOKEN_ADDRESS;
}
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"; //# sourceMappingURL=addresses.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc4337/__generated__/IAccountPermissions/read/getPermissionsForSigner.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FN_SELECTOR",
    ()=>FN_SELECTOR,
    "decodeGetPermissionsForSignerResult",
    ()=>decodeGetPermissionsForSignerResult,
    "encodeGetPermissionsForSigner",
    ()=>encodeGetPermissionsForSigner,
    "encodeGetPermissionsForSignerParams",
    ()=>encodeGetPermissionsForSignerParams,
    "getPermissionsForSigner",
    ()=>getPermissionsForSigner,
    "isGetPermissionsForSignerSupported",
    ()=>isGetPermissionsForSignerSupported
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/decodeAbiParameters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$read$2d$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/read-contract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/encodeAbiParameters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$detectExtension$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/detectExtension.js [app-client] (ecmascript)");
;
;
;
;
const FN_SELECTOR = "0xf15d424e";
const FN_INPUTS = [
    {
        name: "signer",
        type: "address"
    }
];
const FN_OUTPUTS = [
    {
        components: [
            {
                name: "signer",
                type: "address"
            },
            {
                name: "approvedTargets",
                type: "address[]"
            },
            {
                name: "nativeTokenLimitPerTransaction",
                type: "uint256"
            },
            {
                name: "startTimestamp",
                type: "uint128"
            },
            {
                name: "endTimestamp",
                type: "uint128"
            }
        ],
        name: "permissions",
        type: "tuple"
    }
];
function isGetPermissionsForSignerSupported(availableSelectors) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$detectExtension$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectMethod"])({
        availableSelectors,
        method: [
            FN_SELECTOR,
            FN_INPUTS,
            FN_OUTPUTS
        ]
    });
}
function encodeGetPermissionsForSignerParams(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeAbiParameters"])(FN_INPUTS, [
        options.signer
    ]);
}
function encodeGetPermissionsForSigner(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return FN_SELECTOR + encodeGetPermissionsForSignerParams(options).slice(2);
}
function decodeGetPermissionsForSignerResult(result) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeAbiParameters"])(FN_OUTPUTS, result)[0];
}
async function getPermissionsForSigner(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$read$2d$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readContract"])({
        contract: options.contract,
        method: [
            FN_SELECTOR,
            FN_INPUTS,
            FN_OUTPUTS
        ],
        params: [
            options.signer
        ]
    });
} //# sourceMappingURL=getPermissionsForSigner.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc4337/__generated__/IAccountPermissions/write/setPermissionsForSigner.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FN_SELECTOR",
    ()=>FN_SELECTOR,
    "encodeSetPermissionsForSigner",
    ()=>encodeSetPermissionsForSigner,
    "encodeSetPermissionsForSignerParams",
    ()=>encodeSetPermissionsForSignerParams,
    "isSetPermissionsForSignerSupported",
    ()=>isSetPermissionsForSignerSupported,
    "setPermissionsForSigner",
    ()=>setPermissionsForSigner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$contract$2d$call$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/prepare-contract-call.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/encodeAbiParameters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$detectExtension$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/detectExtension.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$once$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/once.js [app-client] (ecmascript)");
;
;
;
;
const FN_SELECTOR = "0x5892e236";
const FN_INPUTS = [
    {
        components: [
            {
                name: "signer",
                type: "address"
            },
            {
                name: "isAdmin",
                type: "uint8"
            },
            {
                name: "approvedTargets",
                type: "address[]"
            },
            {
                name: "nativeTokenLimitPerTransaction",
                type: "uint256"
            },
            {
                name: "permissionStartTimestamp",
                type: "uint128"
            },
            {
                name: "permissionEndTimestamp",
                type: "uint128"
            },
            {
                name: "reqValidityStartTimestamp",
                type: "uint128"
            },
            {
                name: "reqValidityEndTimestamp",
                type: "uint128"
            },
            {
                name: "uid",
                type: "bytes32"
            }
        ],
        name: "req",
        type: "tuple"
    },
    {
        name: "signature",
        type: "bytes"
    }
];
const FN_OUTPUTS = [];
function isSetPermissionsForSignerSupported(availableSelectors) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$detectExtension$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectMethod"])({
        availableSelectors,
        method: [
            FN_SELECTOR,
            FN_INPUTS,
            FN_OUTPUTS
        ]
    });
}
function encodeSetPermissionsForSignerParams(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeAbiParameters"])(FN_INPUTS, [
        options.req,
        options.signature
    ]);
}
function encodeSetPermissionsForSigner(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return FN_SELECTOR + encodeSetPermissionsForSignerParams(options).slice(2);
}
function setPermissionsForSigner(options) {
    const asyncOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$once$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["once"])(async ()=>{
        return "asyncParams" in options ? await options.asyncParams() : options;
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$contract$2d$call$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareContractCall"])({
        accessList: async ()=>(await asyncOptions()).overrides?.accessList,
        authorizationList: async ()=>(await asyncOptions()).overrides?.authorizationList,
        contract: options.contract,
        erc20Value: async ()=>(await asyncOptions()).overrides?.erc20Value,
        extraGas: async ()=>(await asyncOptions()).overrides?.extraGas,
        gas: async ()=>(await asyncOptions()).overrides?.gas,
        gasPrice: async ()=>(await asyncOptions()).overrides?.gasPrice,
        maxFeePerGas: async ()=>(await asyncOptions()).overrides?.maxFeePerGas,
        maxPriorityFeePerGas: async ()=>(await asyncOptions()).overrides?.maxPriorityFeePerGas,
        method: [
            FN_SELECTOR,
            FN_INPUTS,
            FN_OUTPUTS
        ],
        nonce: async ()=>(await asyncOptions()).overrides?.nonce,
        params: async ()=>{
            const resolvedOptions = await asyncOptions();
            return [
                resolvedOptions.req,
                resolvedOptions.signature
            ];
        },
        value: async ()=>(await asyncOptions()).overrides?.value
    });
} //# sourceMappingURL=setPermissionsForSigner.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bigint.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "max",
    ()=>max,
    "min",
    ()=>min,
    "replaceBigInts",
    ()=>replaceBigInts,
    "toBigInt",
    ()=>toBigInt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
;
function min(a, b) {
    return a < b ? a : b;
}
function max(a, b) {
    return a > b ? a : b;
}
function toBigInt(value) {
    if ([
        "string",
        "number"
    ].includes(typeof value) && !Number.isInteger(Number(value))) {
        throw new Error(`Expected value to be an integer to convert to a bigint, got ${value} of type ${typeof value}`);
    }
    if (value instanceof Uint8Array) {
        return BigInt((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["uint8ArrayToHex"])(value));
    }
    return BigInt(value);
}
const replaceBigInts = (obj, replacer)=>{
    if (typeof obj === "bigint") return replacer(obj);
    if (Array.isArray(obj)) return obj.map((x)=>replaceBigInts(x, replacer));
    if (obj && typeof obj === "object") return Object.fromEntries(Object.entries(obj).map(([k, v])=>[
            k,
            replaceBigInts(v, replacer)
        ]));
    return obj;
}; //# sourceMappingURL=bigint.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/date.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dateToSeconds",
    ()=>dateToSeconds,
    "tenYearsFromNow",
    ()=>tenYearsFromNow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bigint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bigint.js [app-client] (ecmascript)");
;
function tenYearsFromNow() {
    return new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10); // 10 years
}
function dateToSeconds(date) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bigint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBigInt"])(Math.floor(date.getTime() / 1000));
} //# sourceMappingURL=date.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc4337/account/types.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SignerPermissionRequest",
    ()=>SignerPermissionRequest
]);
const SignerPermissionRequest = [
    {
        name: "signer",
        type: "address"
    },
    {
        name: "isAdmin",
        type: "uint8"
    },
    {
        name: "approvedTargets",
        type: "address[]"
    },
    {
        name: "nativeTokenLimitPerTransaction",
        type: "uint256"
    },
    {
        name: "permissionStartTimestamp",
        type: "uint128"
    },
    {
        name: "permissionEndTimestamp",
        type: "uint128"
    },
    {
        name: "reqValidityStartTimestamp",
        type: "uint128"
    },
    {
        name: "reqValidityEndTimestamp",
        type: "uint128"
    },
    {
        name: "uid",
        type: "bytes32"
    }
]; //# sourceMappingURL=types.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc4337/account/common.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultPermissionsForAdmin",
    ()=>defaultPermissionsForAdmin,
    "signPermissionRequest",
    ()=>signPermissionRequest,
    "toContractPermissions",
    ()=>toContractPermissions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/constants/addresses.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$date$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/date.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$random$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/random.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/units.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$account$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc4337/account/types.js [app-client] (ecmascript)");
;
;
;
;
;
async function signPermissionRequest(options) {
    const { account, contract, req } = options;
    const signature = await account.signTypedData({
        domain: {
            chainId: contract.chain.id,
            name: "Account",
            verifyingContract: contract.address,
            version: "1"
        },
        message: req,
        primaryType: "SignerPermissionRequest",
        types: {
            SignerPermissionRequest: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$account$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignerPermissionRequest"]
        }
    });
    return {
        req,
        signature
    };
}
async function toContractPermissions(options) {
    const { target, permissions } = options;
    return {
        approvedTargets: permissions.approvedTargets === "*" ? [
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZERO_ADDRESS"]
        ] : permissions.approvedTargets,
        isAdmin: 0,
        nativeTokenLimitPerTransaction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toWei"])(permissions.nativeTokenLimitPerTransaction?.toString() || "0"),
        permissionEndTimestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$date$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dateToSeconds"])(permissions.permissionEndTimestamp || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$date$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tenYearsFromNow"])()),
        permissionStartTimestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$date$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dateToSeconds"])(permissions.permissionStartTimestamp || new Date(0)),
        reqValidityEndTimestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$date$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dateToSeconds"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$date$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tenYearsFromNow"])()),
        reqValidityStartTimestamp: 0n,
        signer: target,
        uid: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$random$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomBytesHex"])()
    };
}
async function defaultPermissionsForAdmin(options) {
    const { target, action } = options;
    return {
        approvedTargets: [],
        isAdmin: action === "add-admin" ? 1 : action === "remove-admin" ? 2 : 0,
        nativeTokenLimitPerTransaction: 0n,
        permissionEndTimestamp: 0n,
        permissionStartTimestamp: 0n,
        reqValidityEndTimestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$date$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dateToSeconds"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$date$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tenYearsFromNow"])()),
        reqValidityStartTimestamp: 0n,
        signer: target,
        uid: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$random$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomBytesHex"])()
    };
} //# sourceMappingURL=common.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc4337/account/addSessionKey.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addSessionKey",
    ()=>addSessionKey,
    "isAddSessionKeySupported",
    ()=>isAddSessionKeySupported,
    "shouldUpdateSessionKey",
    ()=>shouldUpdateSessionKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/constants/addresses.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$is$2d$contract$2d$deployed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/is-contract-deployed.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/units.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$_$5f$generated_$5f2f$IAccountPermissions$2f$read$2f$getPermissionsForSigner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc4337/__generated__/IAccountPermissions/read/getPermissionsForSigner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$_$5f$generated_$5f2f$IAccountPermissions$2f$write$2f$setPermissionsForSigner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc4337/__generated__/IAccountPermissions/write/setPermissionsForSigner.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$account$2f$common$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc4337/account/common.js [app-client] (ecmascript)");
;
;
;
;
;
;
function addSessionKey(options) {
    const { contract, sessionKeyAddress, account, permissions } = options;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$_$5f$generated_$5f2f$IAccountPermissions$2f$write$2f$setPermissionsForSigner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setPermissionsForSigner"])({
        async asyncParams () {
            const { req, signature } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$account$2f$common$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signPermissionRequest"])({
                account,
                contract,
                req: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$account$2f$common$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toContractPermissions"])({
                    permissions,
                    target: sessionKeyAddress
                })
            });
            return {
                req,
                signature
            };
        },
        contract
    });
}
function isAddSessionKeySupported(availableSelectors) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$_$5f$generated_$5f2f$IAccountPermissions$2f$write$2f$setPermissionsForSigner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSetPermissionsForSignerSupported"])(availableSelectors);
}
async function shouldUpdateSessionKey(args) {
    const { accountContract, sessionKeyAddress, newPermissions } = args;
    // check if account is deployed
    const accountDeployed = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$is$2d$contract$2d$deployed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isContractDeployed"])(accountContract);
    if (!accountDeployed) {
        return true;
    }
    // get current permissions
    const currentPermissions = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$_$5f$generated_$5f2f$IAccountPermissions$2f$read$2f$getPermissionsForSigner$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPermissionsForSigner"])({
        contract: accountContract,
        signer: sessionKeyAddress
    });
    // check end time validity
    if (currentPermissions.endTimestamp && currentPermissions.endTimestamp < Math.floor(Date.now() / 1000)) {
        return true;
    }
    // check targets
    if (!areSessionKeyContractTargetsEqual(currentPermissions.approvedTargets, newPermissions.approvedTargets)) {
        return true;
    }
    // check if the new native token limit is greater than the current one
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toWei"])(newPermissions.nativeTokenLimitPerTransaction?.toString() ?? "0") > currentPermissions.nativeTokenLimitPerTransaction) {
        return true;
    }
    return false;
}
function areSessionKeyContractTargetsEqual(currentTargets, newTargets) {
    // Handle the case where approvedTargets is "*"
    if (newTargets === "*" && currentTargets.length === 1 && currentTargets[0] === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$constants$2f$addresses$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ZERO_ADDRESS"]) {
        return true;
    }
    if (newTargets !== "*") {
        return newTargets.map((target)=>target.toLowerCase()).every((target)=>currentTargets.map((t)=>t.toLowerCase()).includes(target));
    }
    return false;
} //# sourceMappingURL=addSessionKey.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/encoding/toRlp.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bytesToRlp",
    ()=>bytesToRlp,
    "hexToRlp",
    ()=>hexToRlp,
    "toRlp",
    ()=>toRlp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$cursor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/cursor.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/encoding/toBytes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
;
;
;
;
function toRlp(bytes, to = 'hex') {
    const encodable = getEncodable(bytes);
    const cursor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$cursor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCursor"])(new Uint8Array(encodable.length));
    encodable.encode(cursor);
    if (to === 'hex') return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytesToHex"])(cursor.bytes);
    return cursor.bytes;
}
function bytesToRlp(bytes, to = 'bytes') {
    return toRlp(bytes, to);
}
function hexToRlp(hex, to = 'hex') {
    return toRlp(hex, to);
}
function getEncodable(bytes) {
    if (Array.isArray(bytes)) return getEncodableList(bytes.map((x)=>getEncodable(x)));
    return getEncodableBytes(bytes);
}
function getEncodableList(list) {
    const bodyLength = list.reduce((acc, x)=>acc + x.length, 0);
    const sizeOfBodyLength = getSizeOfLength(bodyLength);
    const length = (()=>{
        if (bodyLength <= 55) return 1 + bodyLength;
        return 1 + sizeOfBodyLength + bodyLength;
    })();
    return {
        length,
        encode (cursor) {
            if (bodyLength <= 55) {
                cursor.pushByte(0xc0 + bodyLength);
            } else {
                cursor.pushByte(0xc0 + 55 + sizeOfBodyLength);
                if (sizeOfBodyLength === 1) cursor.pushUint8(bodyLength);
                else if (sizeOfBodyLength === 2) cursor.pushUint16(bodyLength);
                else if (sizeOfBodyLength === 3) cursor.pushUint24(bodyLength);
                else cursor.pushUint32(bodyLength);
            }
            for (const { encode } of list){
                encode(cursor);
            }
        }
    };
}
function getEncodableBytes(bytesOrHex) {
    const bytes = typeof bytesOrHex === 'string' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexToBytes"])(bytesOrHex) : bytesOrHex;
    const sizeOfBytesLength = getSizeOfLength(bytes.length);
    const length = (()=>{
        if (bytes.length === 1 && bytes[0] < 0x80) return 1;
        if (bytes.length <= 55) return 1 + bytes.length;
        return 1 + sizeOfBytesLength + bytes.length;
    })();
    return {
        length,
        encode (cursor) {
            if (bytes.length === 1 && bytes[0] < 0x80) {
                cursor.pushBytes(bytes);
            } else if (bytes.length <= 55) {
                cursor.pushByte(0x80 + bytes.length);
                cursor.pushBytes(bytes);
            } else {
                cursor.pushByte(0x80 + 55 + sizeOfBytesLength);
                if (sizeOfBytesLength === 1) cursor.pushUint8(bytes.length);
                else if (sizeOfBytesLength === 2) cursor.pushUint16(bytes.length);
                else if (sizeOfBytesLength === 3) cursor.pushUint24(bytes.length);
                else cursor.pushUint32(bytes.length);
                cursor.pushBytes(bytes);
            }
        }
    };
}
function getSizeOfLength(length) {
    if (length < 2 ** 8) return 1;
    if (length < 2 ** 16) return 2;
    if (length < 2 ** 24) return 3;
    if (length < 2 ** 32) return 4;
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"]('Length is too large.');
} //# sourceMappingURL=toRlp.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_sendRawTransaction.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Sends a raw transaction to the Ethereum network.
 * @param request - The EIP1193 request function.
 * @param signedTransaction - The signed transaction in hex format.
 * @returns A promise that resolves to the transaction hash.
 * @rpc
 * @example
 * ```ts
 * import { getRpcClient, eth_sendRawTransaction } from "thirdweb/rpc";
 * const rpcRequest = getRpcClient({ client, chain });
 * const transactionHash = await eth_sendRawTransaction(rpcRequest, "0x...");
 * ```
 */ __turbopack_context__.s([
    "eth_sendRawTransaction",
    ()=>eth_sendRawTransaction
]);
async function eth_sendRawTransaction(request, signedTransaction) {
    return await request({
        method: "eth_sendRawTransaction",
        params: [
            signedTransaction
        ]
    });
} //# sourceMappingURL=eth_sendRawTransaction.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/concat-hex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "concatHex",
    ()=>concatHex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Hex.js [app-client] (ecmascript)");
;
function concatHex(values) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"](...values);
} //# sourceMappingURL=concat-hex.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/node_modules/@noble/hashes/esm/_md.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Chi",
    ()=>Chi,
    "HashMD",
    ()=>HashMD,
    "Maj",
    ()=>Maj,
    "SHA224_IV",
    ()=>SHA224_IV,
    "SHA256_IV",
    ()=>SHA256_IV,
    "SHA384_IV",
    ()=>SHA384_IV,
    "SHA512_IV",
    ()=>SHA512_IV,
    "setBigUint64",
    ()=>setBigUint64
]);
/**
 * Internal Merkle-Damgard hash utils.
 * @module
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/node_modules/@noble/hashes/esm/utils.js [app-client] (ecmascript)");
;
function setBigUint64(view, byteOffset, value, isLE) {
    if (typeof view.setBigUint64 === 'function') return view.setBigUint64(byteOffset, value, isLE);
    const _32n = BigInt(32);
    const _u32_max = BigInt(0xffffffff);
    const wh = Number(value >> _32n & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE ? 4 : 0;
    const l = isLE ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE);
    view.setUint32(byteOffset + l, wl, isLE);
}
function Chi(a, b, c) {
    return a & b ^ ~a & c;
}
function Maj(a, b, c) {
    return a & b ^ a & c ^ b & c;
}
class HashMD extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Hash"] {
    constructor(blockLen, outputLen, padOffset, isLE){
        super();
        this.finished = false;
        this.length = 0;
        this.pos = 0;
        this.destroyed = false;
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE;
        this.buffer = new Uint8Array(blockLen);
        this.view = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createView"])(this.buffer);
    }
    update(data) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aexists"])(this);
        data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBytes"])(data);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["abytes"])(data);
        const { view, buffer, blockLen } = this;
        const len = data.length;
        for(let pos = 0; pos < len;){
            const take = Math.min(blockLen - this.pos, len - pos);
            // Fast path: we have at least one block in input, cast it to view and process
            if (take === blockLen) {
                const dataView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createView"])(data);
                for(; blockLen <= len - pos; pos += blockLen)this.process(dataView, pos);
                continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
                this.process(view, 0);
                this.pos = 0;
            }
        }
        this.length += data.length;
        this.roundClean();
        return this;
    }
    digestInto(out) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aexists"])(this);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aoutput"])(out, this);
        this.finished = true;
        // Padding
        // We can avoid allocation of buffer for padding completely if it
        // was previously not allocated here. But it won't change performance.
        const { buffer, view, blockLen, isLE } = this;
        let { pos } = this;
        // append the bit '1' to the message
        buffer[pos++] = 0b10000000;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(this.buffer.subarray(pos));
        // we have less than padOffset left in buffer, so we cannot put length in
        // current block, need process it and pad again
        if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
        }
        // Pad until full block byte with zeros
        for(let i = pos; i < blockLen; i++)buffer[i] = 0;
        // Note: sha512 requires length to be 128bit integer, but length in JS will overflow before that
        // You need to write around 2 exabytes (u64_max / 8 / (1024**6)) for this to happen.
        // So we just write lowest 64 bits of that value.
        setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
        this.process(view, 0);
        const oview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createView"])(out);
        const len = this.outputLen;
        // NOTE: we do division by 4 later, which should be fused in single op with modulo by JIT
        if (len % 4) throw new Error('_sha2: outputLen should be aligned to 32bit');
        const outLen = len / 4;
        const state = this.get();
        if (outLen > state.length) throw new Error('_sha2: outputLen bigger than state');
        for(let i = 0; i < outLen; i++)oview.setUint32(4 * i, state[i], isLE);
    }
    digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
    }
    _cloneInto(to) {
        to || (to = new this.constructor());
        to.set(...this.get());
        const { blockLen, buffer, length, finished, destroyed, pos } = this;
        to.destroyed = destroyed;
        to.finished = finished;
        to.length = length;
        to.pos = pos;
        if (length % blockLen) to.buffer.set(buffer);
        return to;
    }
    clone() {
        return this._cloneInto();
    }
}
const SHA256_IV = /* @__PURE__ */ Uint32Array.from([
    0x6a09e667,
    0xbb67ae85,
    0x3c6ef372,
    0xa54ff53a,
    0x510e527f,
    0x9b05688c,
    0x1f83d9ab,
    0x5be0cd19
]);
const SHA224_IV = /* @__PURE__ */ Uint32Array.from([
    0xc1059ed8,
    0x367cd507,
    0x3070dd17,
    0xf70e5939,
    0xffc00b31,
    0x68581511,
    0x64f98fa7,
    0xbefa4fa4
]);
const SHA384_IV = /* @__PURE__ */ Uint32Array.from([
    0xcbbb9d5d,
    0xc1059ed8,
    0x629a292a,
    0x367cd507,
    0x9159015a,
    0x3070dd17,
    0x152fecd8,
    0xf70e5939,
    0x67332667,
    0xffc00b31,
    0x8eb44a87,
    0x68581511,
    0xdb0c2e0d,
    0x64f98fa7,
    0x47b5481d,
    0xbefa4fa4
]);
const SHA512_IV = /* @__PURE__ */ Uint32Array.from([
    0x6a09e667,
    0xf3bcc908,
    0xbb67ae85,
    0x84caa73b,
    0x3c6ef372,
    0xfe94f82b,
    0xa54ff53a,
    0x5f1d36f1,
    0x510e527f,
    0xade682d1,
    0x9b05688c,
    0x2b3e6c1f,
    0x1f83d9ab,
    0xfb41bd6b,
    0x5be0cd19,
    0x137e2179
]); //# sourceMappingURL=_md.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/node_modules/@noble/hashes/esm/sha2.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SHA224",
    ()=>SHA224,
    "SHA256",
    ()=>SHA256,
    "SHA384",
    ()=>SHA384,
    "SHA512",
    ()=>SHA512,
    "SHA512_224",
    ()=>SHA512_224,
    "SHA512_256",
    ()=>SHA512_256,
    "sha224",
    ()=>sha224,
    "sha256",
    ()=>sha256,
    "sha384",
    ()=>sha384,
    "sha512",
    ()=>sha512,
    "sha512_224",
    ()=>sha512_224,
    "sha512_256",
    ()=>sha512_256
]);
/**
 * SHA2 hash function. A.k.a. sha256, sha384, sha512, sha512_224, sha512_256.
 * SHA256 is the fastest hash implementable in JS, even faster than Blake3.
 * Check out [RFC 4634](https://datatracker.ietf.org/doc/html/rfc4634) and
 * [FIPS 180-4](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf).
 * @module
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/node_modules/@noble/hashes/esm/_md.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/node_modules/@noble/hashes/esm/_u64.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/node_modules/@noble/hashes/esm/utils.js [app-client] (ecmascript)");
;
;
;
/**
 * Round constants:
 * First 32 bits of fractional parts of the cube roots of the first 64 primes 2..311)
 */ // prettier-ignore
const SHA256_K = /* @__PURE__ */ Uint32Array.from([
    0x428a2f98,
    0x71374491,
    0xb5c0fbcf,
    0xe9b5dba5,
    0x3956c25b,
    0x59f111f1,
    0x923f82a4,
    0xab1c5ed5,
    0xd807aa98,
    0x12835b01,
    0x243185be,
    0x550c7dc3,
    0x72be5d74,
    0x80deb1fe,
    0x9bdc06a7,
    0xc19bf174,
    0xe49b69c1,
    0xefbe4786,
    0x0fc19dc6,
    0x240ca1cc,
    0x2de92c6f,
    0x4a7484aa,
    0x5cb0a9dc,
    0x76f988da,
    0x983e5152,
    0xa831c66d,
    0xb00327c8,
    0xbf597fc7,
    0xc6e00bf3,
    0xd5a79147,
    0x06ca6351,
    0x14292967,
    0x27b70a85,
    0x2e1b2138,
    0x4d2c6dfc,
    0x53380d13,
    0x650a7354,
    0x766a0abb,
    0x81c2c92e,
    0x92722c85,
    0xa2bfe8a1,
    0xa81a664b,
    0xc24b8b70,
    0xc76c51a3,
    0xd192e819,
    0xd6990624,
    0xf40e3585,
    0x106aa070,
    0x19a4c116,
    0x1e376c08,
    0x2748774c,
    0x34b0bcb5,
    0x391c0cb3,
    0x4ed8aa4a,
    0x5b9cca4f,
    0x682e6ff3,
    0x748f82ee,
    0x78a5636f,
    0x84c87814,
    0x8cc70208,
    0x90befffa,
    0xa4506ceb,
    0xbef9a3f7,
    0xc67178f2
]);
/** Reusable temporary buffer. "W" comes straight from spec. */ const SHA256_W = /* @__PURE__ */ new Uint32Array(64);
class SHA256 extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HashMD"] {
    constructor(outputLen = 32){
        super(64, outputLen, 8, false);
        // We cannot use array here since array allows indexing by variable
        // which means optimizer/compiler cannot use registers.
        this.A = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA256_IV"][0] | 0;
        this.B = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA256_IV"][1] | 0;
        this.C = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA256_IV"][2] | 0;
        this.D = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA256_IV"][3] | 0;
        this.E = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA256_IV"][4] | 0;
        this.F = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA256_IV"][5] | 0;
        this.G = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA256_IV"][6] | 0;
        this.H = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA256_IV"][7] | 0;
    }
    get() {
        const { A, B, C, D, E, F, G, H } = this;
        return [
            A,
            B,
            C,
            D,
            E,
            F,
            G,
            H
        ];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
        this.A = A | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D | 0;
        this.E = E | 0;
        this.F = F | 0;
        this.G = G | 0;
        this.H = H | 0;
    }
    process(view, offset) {
        // Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array
        for(let i = 0; i < 16; i++, offset += 4)SHA256_W[i] = view.getUint32(offset, false);
        for(let i = 16; i < 64; i++){
            const W15 = SHA256_W[i - 15];
            const W2 = SHA256_W[i - 2];
            const s0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotr"])(W15, 7) ^ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotr"])(W15, 18) ^ W15 >>> 3;
            const s1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotr"])(W2, 17) ^ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotr"])(W2, 19) ^ W2 >>> 10;
            SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
        }
        // Compression function main loop, 64 rounds
        let { A, B, C, D, E, F, G, H } = this;
        for(let i = 0; i < 64; i++){
            const sigma1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotr"])(E, 6) ^ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotr"])(E, 11) ^ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotr"])(E, 25);
            const T1 = H + sigma1 + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chi"])(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
            const sigma0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotr"])(A, 2) ^ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotr"])(A, 13) ^ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotr"])(A, 22);
            const T2 = sigma0 + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Maj"])(A, B, C) | 0;
            H = G;
            G = F;
            F = E;
            E = D + T1 | 0;
            D = C;
            C = B;
            B = A;
            A = T1 + T2 | 0;
        }
        // Add the compressed chunk to the current hash value
        A = A + this.A | 0;
        B = B + this.B | 0;
        C = C + this.C | 0;
        D = D + this.D | 0;
        E = E + this.E | 0;
        F = F + this.F | 0;
        G = G + this.G | 0;
        H = H + this.H | 0;
        this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(SHA256_W);
    }
    destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(this.buffer);
    }
}
class SHA224 extends SHA256 {
    constructor(){
        super(28);
        this.A = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA224_IV"][0] | 0;
        this.B = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA224_IV"][1] | 0;
        this.C = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA224_IV"][2] | 0;
        this.D = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA224_IV"][3] | 0;
        this.E = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA224_IV"][4] | 0;
        this.F = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA224_IV"][5] | 0;
        this.G = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA224_IV"][6] | 0;
        this.H = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA224_IV"][7] | 0;
    }
}
// SHA2-512 is slower than sha256 in js because u64 operations are slow.
// Round contants
// First 32 bits of the fractional parts of the cube roots of the first 80 primes 2..409
// prettier-ignore
const K512 = /* @__PURE__ */ (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["split"]([
        '0x428a2f98d728ae22',
        '0x7137449123ef65cd',
        '0xb5c0fbcfec4d3b2f',
        '0xe9b5dba58189dbbc',
        '0x3956c25bf348b538',
        '0x59f111f1b605d019',
        '0x923f82a4af194f9b',
        '0xab1c5ed5da6d8118',
        '0xd807aa98a3030242',
        '0x12835b0145706fbe',
        '0x243185be4ee4b28c',
        '0x550c7dc3d5ffb4e2',
        '0x72be5d74f27b896f',
        '0x80deb1fe3b1696b1',
        '0x9bdc06a725c71235',
        '0xc19bf174cf692694',
        '0xe49b69c19ef14ad2',
        '0xefbe4786384f25e3',
        '0x0fc19dc68b8cd5b5',
        '0x240ca1cc77ac9c65',
        '0x2de92c6f592b0275',
        '0x4a7484aa6ea6e483',
        '0x5cb0a9dcbd41fbd4',
        '0x76f988da831153b5',
        '0x983e5152ee66dfab',
        '0xa831c66d2db43210',
        '0xb00327c898fb213f',
        '0xbf597fc7beef0ee4',
        '0xc6e00bf33da88fc2',
        '0xd5a79147930aa725',
        '0x06ca6351e003826f',
        '0x142929670a0e6e70',
        '0x27b70a8546d22ffc',
        '0x2e1b21385c26c926',
        '0x4d2c6dfc5ac42aed',
        '0x53380d139d95b3df',
        '0x650a73548baf63de',
        '0x766a0abb3c77b2a8',
        '0x81c2c92e47edaee6',
        '0x92722c851482353b',
        '0xa2bfe8a14cf10364',
        '0xa81a664bbc423001',
        '0xc24b8b70d0f89791',
        '0xc76c51a30654be30',
        '0xd192e819d6ef5218',
        '0xd69906245565a910',
        '0xf40e35855771202a',
        '0x106aa07032bbd1b8',
        '0x19a4c116b8d2d0c8',
        '0x1e376c085141ab53',
        '0x2748774cdf8eeb99',
        '0x34b0bcb5e19b48a8',
        '0x391c0cb3c5c95a63',
        '0x4ed8aa4ae3418acb',
        '0x5b9cca4f7763e373',
        '0x682e6ff3d6b2b8a3',
        '0x748f82ee5defb2fc',
        '0x78a5636f43172f60',
        '0x84c87814a1f0ab72',
        '0x8cc702081a6439ec',
        '0x90befffa23631e28',
        '0xa4506cebde82bde9',
        '0xbef9a3f7b2c67915',
        '0xc67178f2e372532b',
        '0xca273eceea26619c',
        '0xd186b8c721c0c207',
        '0xeada7dd6cde0eb1e',
        '0xf57d4f7fee6ed178',
        '0x06f067aa72176fba',
        '0x0a637dc5a2c898a6',
        '0x113f9804bef90dae',
        '0x1b710b35131c471b',
        '0x28db77f523047d84',
        '0x32caab7b40c72493',
        '0x3c9ebe0a15c9bebc',
        '0x431d67c49c100d4c',
        '0x4cc5d4becb3e42b6',
        '0x597f299cfc657e2a',
        '0x5fcb6fab3ad6faec',
        '0x6c44198c4a475817'
    ].map((n)=>BigInt(n))))();
const SHA512_Kh = /* @__PURE__ */ (()=>K512[0])();
const SHA512_Kl = /* @__PURE__ */ (()=>K512[1])();
// Reusable temporary buffers
const SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
const SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
class SHA512 extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HashMD"] {
    constructor(outputLen = 64){
        super(128, outputLen, 16, false);
        // We cannot use array here since array allows indexing by variable
        // which means optimizer/compiler cannot use registers.
        // h -- high 32 bits, l -- low 32 bits
        this.Ah = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][0] | 0;
        this.Al = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][1] | 0;
        this.Bh = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][2] | 0;
        this.Bl = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][3] | 0;
        this.Ch = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][4] | 0;
        this.Cl = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][5] | 0;
        this.Dh = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][6] | 0;
        this.Dl = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][7] | 0;
        this.Eh = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][8] | 0;
        this.El = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][9] | 0;
        this.Fh = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][10] | 0;
        this.Fl = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][11] | 0;
        this.Gh = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][12] | 0;
        this.Gl = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][13] | 0;
        this.Hh = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][14] | 0;
        this.Hl = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][15] | 0;
    }
    // prettier-ignore
    get() {
        const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
        return [
            Ah,
            Al,
            Bh,
            Bl,
            Ch,
            Cl,
            Dh,
            Dl,
            Eh,
            El,
            Fh,
            Fl,
            Gh,
            Gl,
            Hh,
            Hl
        ];
    }
    // prettier-ignore
    set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
        this.Ah = Ah | 0;
        this.Al = Al | 0;
        this.Bh = Bh | 0;
        this.Bl = Bl | 0;
        this.Ch = Ch | 0;
        this.Cl = Cl | 0;
        this.Dh = Dh | 0;
        this.Dl = Dl | 0;
        this.Eh = Eh | 0;
        this.El = El | 0;
        this.Fh = Fh | 0;
        this.Fl = Fl | 0;
        this.Gh = Gh | 0;
        this.Gl = Gl | 0;
        this.Hh = Hh | 0;
        this.Hl = Hl | 0;
    }
    process(view, offset) {
        // Extend the first 16 words into the remaining 64 words w[16..79] of the message schedule array
        for(let i = 0; i < 16; i++, offset += 4){
            SHA512_W_H[i] = view.getUint32(offset);
            SHA512_W_L[i] = view.getUint32(offset += 4);
        }
        for(let i = 16; i < 80; i++){
            // s0 := (w[i-15] rightrotate 1) xor (w[i-15] rightrotate 8) xor (w[i-15] rightshift 7)
            const W15h = SHA512_W_H[i - 15] | 0;
            const W15l = SHA512_W_L[i - 15] | 0;
            const s0h = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSH"](W15h, W15l, 1) ^ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSH"](W15h, W15l, 8) ^ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shrSH"](W15h, W15l, 7);
            const s0l = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSL"](W15h, W15l, 1) ^ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSL"](W15h, W15l, 8) ^ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shrSL"](W15h, W15l, 7);
            // s1 := (w[i-2] rightrotate 19) xor (w[i-2] rightrotate 61) xor (w[i-2] rightshift 6)
            const W2h = SHA512_W_H[i - 2] | 0;
            const W2l = SHA512_W_L[i - 2] | 0;
            const s1h = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSH"](W2h, W2l, 19) ^ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrBH"](W2h, W2l, 61) ^ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shrSH"](W2h, W2l, 6);
            const s1l = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSL"](W2h, W2l, 19) ^ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrBL"](W2h, W2l, 61) ^ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shrSL"](W2h, W2l, 6);
            // SHA256_W[i] = s0 + s1 + SHA256_W[i - 7] + SHA256_W[i - 16];
            const SUMl = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add4L"](s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
            const SUMh = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add4H"](SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
            SHA512_W_H[i] = SUMh | 0;
            SHA512_W_L[i] = SUMl | 0;
        }
        let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
        // Compression function main loop, 80 rounds
        for(let i = 0; i < 80; i++){
            // S1 := (e rightrotate 14) xor (e rightrotate 18) xor (e rightrotate 41)
            const sigma1h = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSH"](Eh, El, 14) ^ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSH"](Eh, El, 18) ^ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrBH"](Eh, El, 41);
            const sigma1l = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSL"](Eh, El, 14) ^ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSL"](Eh, El, 18) ^ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrBL"](Eh, El, 41);
            //const T1 = (H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i]) | 0;
            const CHIh = Eh & Fh ^ ~Eh & Gh;
            const CHIl = El & Fl ^ ~El & Gl;
            // T1 = H + sigma1 + Chi(E, F, G) + SHA512_K[i] + SHA512_W[i]
            // prettier-ignore
            const T1ll = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add5L"](Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
            const T1h = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add5H"](T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
            const T1l = T1ll | 0;
            // S0 := (a rightrotate 28) xor (a rightrotate 34) xor (a rightrotate 39)
            const sigma0h = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSH"](Ah, Al, 28) ^ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrBH"](Ah, Al, 34) ^ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrBH"](Ah, Al, 39);
            const sigma0l = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSL"](Ah, Al, 28) ^ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrBL"](Ah, Al, 34) ^ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrBL"](Ah, Al, 39);
            const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
            const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
            Hh = Gh | 0;
            Hl = Gl | 0;
            Gh = Fh | 0;
            Gl = Fl | 0;
            Fh = Eh | 0;
            Fl = El | 0;
            ({ h: Eh, l: El } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add"](Dh | 0, Dl | 0, T1h | 0, T1l | 0));
            Dh = Ch | 0;
            Dl = Cl | 0;
            Ch = Bh | 0;
            Cl = Bl | 0;
            Bh = Ah | 0;
            Bl = Al | 0;
            const All = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add3L"](T1l, sigma0l, MAJl);
            Ah = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add3H"](All, T1h, sigma0h, MAJh);
            Al = All | 0;
        }
        // Add the compressed chunk to the current hash value
        ({ h: Ah, l: Al } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add"](this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
        ({ h: Bh, l: Bl } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add"](this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
        ({ h: Ch, l: Cl } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add"](this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
        ({ h: Dh, l: Dl } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add"](this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
        ({ h: Eh, l: El } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add"](this.Eh | 0, this.El | 0, Eh | 0, El | 0));
        ({ h: Fh, l: Fl } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add"](this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
        ({ h: Gh, l: Gl } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add"](this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
        ({ h: Hh, l: Hl } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add"](this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
        this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
    }
    roundClean() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(SHA512_W_H, SHA512_W_L);
    }
    destroy() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(this.buffer);
        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
}
class SHA384 extends SHA512 {
    constructor(){
        super(48);
        this.Ah = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][0] | 0;
        this.Al = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][1] | 0;
        this.Bh = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][2] | 0;
        this.Bl = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][3] | 0;
        this.Ch = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][4] | 0;
        this.Cl = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][5] | 0;
        this.Dh = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][6] | 0;
        this.Dl = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][7] | 0;
        this.Eh = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][8] | 0;
        this.El = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][9] | 0;
        this.Fh = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][10] | 0;
        this.Fl = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][11] | 0;
        this.Gh = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][12] | 0;
        this.Gl = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][13] | 0;
        this.Hh = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][14] | 0;
        this.Hl = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][15] | 0;
    }
}
/**
 * Truncated SHA512/256 and SHA512/224.
 * SHA512_IV is XORed with 0xa5a5a5a5a5a5a5a5, then used as "intermediary" IV of SHA512/t.
 * Then t hashes string to produce result IV.
 * See `test/misc/sha2-gen-iv.js`.
 */ /** SHA512/224 IV */ const T224_IV = /* @__PURE__ */ Uint32Array.from([
    0x8c3d37c8,
    0x19544da2,
    0x73e19966,
    0x89dcd4d6,
    0x1dfab7ae,
    0x32ff9c82,
    0x679dd514,
    0x582f9fcf,
    0x0f6d2b69,
    0x7bd44da8,
    0x77e36f73,
    0x04c48942,
    0x3f9d85a8,
    0x6a1d36c8,
    0x1112e6ad,
    0x91d692a1
]);
/** SHA512/256 IV */ const T256_IV = /* @__PURE__ */ Uint32Array.from([
    0x22312194,
    0xfc2bf72c,
    0x9f555fa3,
    0xc84c64c2,
    0x2393b86b,
    0x6f53b151,
    0x96387719,
    0x5940eabd,
    0x96283ee2,
    0xa88effe3,
    0xbe5e1e25,
    0x53863992,
    0x2b0199fc,
    0x2c85b8aa,
    0x0eb72ddc,
    0x81c52ca2
]);
class SHA512_224 extends SHA512 {
    constructor(){
        super(28);
        this.Ah = T224_IV[0] | 0;
        this.Al = T224_IV[1] | 0;
        this.Bh = T224_IV[2] | 0;
        this.Bl = T224_IV[3] | 0;
        this.Ch = T224_IV[4] | 0;
        this.Cl = T224_IV[5] | 0;
        this.Dh = T224_IV[6] | 0;
        this.Dl = T224_IV[7] | 0;
        this.Eh = T224_IV[8] | 0;
        this.El = T224_IV[9] | 0;
        this.Fh = T224_IV[10] | 0;
        this.Fl = T224_IV[11] | 0;
        this.Gh = T224_IV[12] | 0;
        this.Gl = T224_IV[13] | 0;
        this.Hh = T224_IV[14] | 0;
        this.Hl = T224_IV[15] | 0;
    }
}
class SHA512_256 extends SHA512 {
    constructor(){
        super(32);
        this.Ah = T256_IV[0] | 0;
        this.Al = T256_IV[1] | 0;
        this.Bh = T256_IV[2] | 0;
        this.Bl = T256_IV[3] | 0;
        this.Ch = T256_IV[4] | 0;
        this.Cl = T256_IV[5] | 0;
        this.Dh = T256_IV[6] | 0;
        this.Dl = T256_IV[7] | 0;
        this.Eh = T256_IV[8] | 0;
        this.El = T256_IV[9] | 0;
        this.Fh = T256_IV[10] | 0;
        this.Fl = T256_IV[11] | 0;
        this.Gh = T256_IV[12] | 0;
        this.Gl = T256_IV[13] | 0;
        this.Hh = T256_IV[14] | 0;
        this.Hl = T256_IV[15] | 0;
    }
}
const sha256 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHasher"])(()=>new SHA256());
const sha224 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHasher"])(()=>new SHA224());
const sha512 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHasher"])(()=>new SHA512());
const sha384 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHasher"])(()=>new SHA384());
const sha512_256 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHasher"])(()=>new SHA512_256());
const sha512_224 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHasher"])(()=>new SHA512_224()); //# sourceMappingURL=sha2.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/node_modules/@noble/hashes/esm/sha256.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SHA224",
    ()=>SHA224,
    "SHA256",
    ()=>SHA256,
    "sha224",
    ()=>sha224,
    "sha256",
    ()=>sha256
]);
/**
 * SHA2-256 a.k.a. sha256. In JS, it is the fastest hash, even faster than Blake3.
 *
 * To break sha256 using birthday attack, attackers need to try 2^128 hashes.
 * BTC network is doing 2^70 hashes/sec (2^95 hashes/year) as per 2025.
 *
 * Check out [FIPS 180-4](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf).
 * @module
 * @deprecated
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/node_modules/@noble/hashes/esm/sha2.js [app-client] (ecmascript)");
;
const SHA256 = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA256"];
const sha256 = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sha256"];
const SHA224 = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA224"];
const sha224 = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sha224"]; //# sourceMappingURL=sha256.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/hash/sha256.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sha256",
    ()=>sha256
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/node_modules/@noble/hashes/esm/sha256.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/data/isHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/encoding/toBytes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
;
;
;
;
function sha256(value, to_) {
    const to = to_ || 'hex';
    const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sha256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(value, {
        strict: false
    }) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBytes"])(value) : value);
    if (to === 'bytes') return bytes;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(bytes);
} //# sourceMappingURL=sha256.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/constants/number.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "maxInt104",
    ()=>maxInt104,
    "maxInt112",
    ()=>maxInt112,
    "maxInt120",
    ()=>maxInt120,
    "maxInt128",
    ()=>maxInt128,
    "maxInt136",
    ()=>maxInt136,
    "maxInt144",
    ()=>maxInt144,
    "maxInt152",
    ()=>maxInt152,
    "maxInt16",
    ()=>maxInt16,
    "maxInt160",
    ()=>maxInt160,
    "maxInt168",
    ()=>maxInt168,
    "maxInt176",
    ()=>maxInt176,
    "maxInt184",
    ()=>maxInt184,
    "maxInt192",
    ()=>maxInt192,
    "maxInt200",
    ()=>maxInt200,
    "maxInt208",
    ()=>maxInt208,
    "maxInt216",
    ()=>maxInt216,
    "maxInt224",
    ()=>maxInt224,
    "maxInt232",
    ()=>maxInt232,
    "maxInt24",
    ()=>maxInt24,
    "maxInt240",
    ()=>maxInt240,
    "maxInt248",
    ()=>maxInt248,
    "maxInt256",
    ()=>maxInt256,
    "maxInt32",
    ()=>maxInt32,
    "maxInt40",
    ()=>maxInt40,
    "maxInt48",
    ()=>maxInt48,
    "maxInt56",
    ()=>maxInt56,
    "maxInt64",
    ()=>maxInt64,
    "maxInt72",
    ()=>maxInt72,
    "maxInt8",
    ()=>maxInt8,
    "maxInt80",
    ()=>maxInt80,
    "maxInt88",
    ()=>maxInt88,
    "maxInt96",
    ()=>maxInt96,
    "maxUint104",
    ()=>maxUint104,
    "maxUint112",
    ()=>maxUint112,
    "maxUint120",
    ()=>maxUint120,
    "maxUint128",
    ()=>maxUint128,
    "maxUint136",
    ()=>maxUint136,
    "maxUint144",
    ()=>maxUint144,
    "maxUint152",
    ()=>maxUint152,
    "maxUint16",
    ()=>maxUint16,
    "maxUint160",
    ()=>maxUint160,
    "maxUint168",
    ()=>maxUint168,
    "maxUint176",
    ()=>maxUint176,
    "maxUint184",
    ()=>maxUint184,
    "maxUint192",
    ()=>maxUint192,
    "maxUint200",
    ()=>maxUint200,
    "maxUint208",
    ()=>maxUint208,
    "maxUint216",
    ()=>maxUint216,
    "maxUint224",
    ()=>maxUint224,
    "maxUint232",
    ()=>maxUint232,
    "maxUint24",
    ()=>maxUint24,
    "maxUint240",
    ()=>maxUint240,
    "maxUint248",
    ()=>maxUint248,
    "maxUint256",
    ()=>maxUint256,
    "maxUint32",
    ()=>maxUint32,
    "maxUint40",
    ()=>maxUint40,
    "maxUint48",
    ()=>maxUint48,
    "maxUint56",
    ()=>maxUint56,
    "maxUint64",
    ()=>maxUint64,
    "maxUint72",
    ()=>maxUint72,
    "maxUint8",
    ()=>maxUint8,
    "maxUint80",
    ()=>maxUint80,
    "maxUint88",
    ()=>maxUint88,
    "maxUint96",
    ()=>maxUint96,
    "minInt104",
    ()=>minInt104,
    "minInt112",
    ()=>minInt112,
    "minInt120",
    ()=>minInt120,
    "minInt128",
    ()=>minInt128,
    "minInt136",
    ()=>minInt136,
    "minInt144",
    ()=>minInt144,
    "minInt152",
    ()=>minInt152,
    "minInt16",
    ()=>minInt16,
    "minInt160",
    ()=>minInt160,
    "minInt168",
    ()=>minInt168,
    "minInt176",
    ()=>minInt176,
    "minInt184",
    ()=>minInt184,
    "minInt192",
    ()=>minInt192,
    "minInt200",
    ()=>minInt200,
    "minInt208",
    ()=>minInt208,
    "minInt216",
    ()=>minInt216,
    "minInt224",
    ()=>minInt224,
    "minInt232",
    ()=>minInt232,
    "minInt24",
    ()=>minInt24,
    "minInt240",
    ()=>minInt240,
    "minInt248",
    ()=>minInt248,
    "minInt256",
    ()=>minInt256,
    "minInt32",
    ()=>minInt32,
    "minInt40",
    ()=>minInt40,
    "minInt48",
    ()=>minInt48,
    "minInt56",
    ()=>minInt56,
    "minInt64",
    ()=>minInt64,
    "minInt72",
    ()=>minInt72,
    "minInt8",
    ()=>minInt8,
    "minInt80",
    ()=>minInt80,
    "minInt88",
    ()=>minInt88,
    "minInt96",
    ()=>minInt96
]);
const maxInt8 = 2n ** (8n - 1n) - 1n;
const maxInt16 = 2n ** (16n - 1n) - 1n;
const maxInt24 = 2n ** (24n - 1n) - 1n;
const maxInt32 = 2n ** (32n - 1n) - 1n;
const maxInt40 = 2n ** (40n - 1n) - 1n;
const maxInt48 = 2n ** (48n - 1n) - 1n;
const maxInt56 = 2n ** (56n - 1n) - 1n;
const maxInt64 = 2n ** (64n - 1n) - 1n;
const maxInt72 = 2n ** (72n - 1n) - 1n;
const maxInt80 = 2n ** (80n - 1n) - 1n;
const maxInt88 = 2n ** (88n - 1n) - 1n;
const maxInt96 = 2n ** (96n - 1n) - 1n;
const maxInt104 = 2n ** (104n - 1n) - 1n;
const maxInt112 = 2n ** (112n - 1n) - 1n;
const maxInt120 = 2n ** (120n - 1n) - 1n;
const maxInt128 = 2n ** (128n - 1n) - 1n;
const maxInt136 = 2n ** (136n - 1n) - 1n;
const maxInt144 = 2n ** (144n - 1n) - 1n;
const maxInt152 = 2n ** (152n - 1n) - 1n;
const maxInt160 = 2n ** (160n - 1n) - 1n;
const maxInt168 = 2n ** (168n - 1n) - 1n;
const maxInt176 = 2n ** (176n - 1n) - 1n;
const maxInt184 = 2n ** (184n - 1n) - 1n;
const maxInt192 = 2n ** (192n - 1n) - 1n;
const maxInt200 = 2n ** (200n - 1n) - 1n;
const maxInt208 = 2n ** (208n - 1n) - 1n;
const maxInt216 = 2n ** (216n - 1n) - 1n;
const maxInt224 = 2n ** (224n - 1n) - 1n;
const maxInt232 = 2n ** (232n - 1n) - 1n;
const maxInt240 = 2n ** (240n - 1n) - 1n;
const maxInt248 = 2n ** (248n - 1n) - 1n;
const maxInt256 = 2n ** (256n - 1n) - 1n;
const minInt8 = -(2n ** (8n - 1n));
const minInt16 = -(2n ** (16n - 1n));
const minInt24 = -(2n ** (24n - 1n));
const minInt32 = -(2n ** (32n - 1n));
const minInt40 = -(2n ** (40n - 1n));
const minInt48 = -(2n ** (48n - 1n));
const minInt56 = -(2n ** (56n - 1n));
const minInt64 = -(2n ** (64n - 1n));
const minInt72 = -(2n ** (72n - 1n));
const minInt80 = -(2n ** (80n - 1n));
const minInt88 = -(2n ** (88n - 1n));
const minInt96 = -(2n ** (96n - 1n));
const minInt104 = -(2n ** (104n - 1n));
const minInt112 = -(2n ** (112n - 1n));
const minInt120 = -(2n ** (120n - 1n));
const minInt128 = -(2n ** (128n - 1n));
const minInt136 = -(2n ** (136n - 1n));
const minInt144 = -(2n ** (144n - 1n));
const minInt152 = -(2n ** (152n - 1n));
const minInt160 = -(2n ** (160n - 1n));
const minInt168 = -(2n ** (168n - 1n));
const minInt176 = -(2n ** (176n - 1n));
const minInt184 = -(2n ** (184n - 1n));
const minInt192 = -(2n ** (192n - 1n));
const minInt200 = -(2n ** (200n - 1n));
const minInt208 = -(2n ** (208n - 1n));
const minInt216 = -(2n ** (216n - 1n));
const minInt224 = -(2n ** (224n - 1n));
const minInt232 = -(2n ** (232n - 1n));
const minInt240 = -(2n ** (240n - 1n));
const minInt248 = -(2n ** (248n - 1n));
const minInt256 = -(2n ** (256n - 1n));
const maxUint8 = 2n ** 8n - 1n;
const maxUint16 = 2n ** 16n - 1n;
const maxUint24 = 2n ** 24n - 1n;
const maxUint32 = 2n ** 32n - 1n;
const maxUint40 = 2n ** 40n - 1n;
const maxUint48 = 2n ** 48n - 1n;
const maxUint56 = 2n ** 56n - 1n;
const maxUint64 = 2n ** 64n - 1n;
const maxUint72 = 2n ** 72n - 1n;
const maxUint80 = 2n ** 80n - 1n;
const maxUint88 = 2n ** 88n - 1n;
const maxUint96 = 2n ** 96n - 1n;
const maxUint104 = 2n ** 104n - 1n;
const maxUint112 = 2n ** 112n - 1n;
const maxUint120 = 2n ** 120n - 1n;
const maxUint128 = 2n ** 128n - 1n;
const maxUint136 = 2n ** 136n - 1n;
const maxUint144 = 2n ** 144n - 1n;
const maxUint152 = 2n ** 152n - 1n;
const maxUint160 = 2n ** 160n - 1n;
const maxUint168 = 2n ** 168n - 1n;
const maxUint176 = 2n ** 176n - 1n;
const maxUint184 = 2n ** 184n - 1n;
const maxUint192 = 2n ** 192n - 1n;
const maxUint200 = 2n ** 200n - 1n;
const maxUint208 = 2n ** 208n - 1n;
const maxUint216 = 2n ** 216n - 1n;
const maxUint224 = 2n ** 224n - 1n;
const maxUint232 = 2n ** 232n - 1n;
const maxUint240 = 2n ** 240n - 1n;
const maxUint248 = 2n ** 248n - 1n;
const maxUint256 = 2n ** 256n - 1n; //# sourceMappingURL=number.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/zksync/constants/number.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "gasPerPubdataDefault",
    ()=>gasPerPubdataDefault,
    "maxBytecodeSize",
    ()=>maxBytecodeSize,
    "requiredL1ToL2GasPerPubdataLimit",
    ()=>requiredL1ToL2GasPerPubdataLimit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$constants$2f$number$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/constants/number.js [app-client] (ecmascript)");
;
const gasPerPubdataDefault = 50000n;
const maxBytecodeSize = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$constants$2f$number$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maxUint16"] * 32n;
const requiredL1ToL2GasPerPubdataLimit = 800n; //# sourceMappingURL=number.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/zksync/errors/bytecode.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BytecodeLengthExceedsMaxSizeError",
    ()=>BytecodeLengthExceedsMaxSizeError,
    "BytecodeLengthInWordsMustBeOddError",
    ()=>BytecodeLengthInWordsMustBeOddError,
    "BytecodeLengthMustBeDivisibleBy32Error",
    ()=>BytecodeLengthMustBeDivisibleBy32Error
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)");
;
class BytecodeLengthExceedsMaxSizeError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ givenLength, maxBytecodeSize }){
        super(`Bytecode cannot be longer than ${maxBytecodeSize} bytes. Given length: ${givenLength}`, {
            name: 'BytecodeLengthExceedsMaxSizeError'
        });
    }
}
class BytecodeLengthInWordsMustBeOddError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ givenLengthInWords }){
        super(`Bytecode length in 32-byte words must be odd. Given length in words: ${givenLengthInWords}`, {
            name: 'BytecodeLengthInWordsMustBeOddError'
        });
    }
}
class BytecodeLengthMustBeDivisibleBy32Error extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ givenLength }){
        super(`The bytecode length in bytes must be divisible by 32. Given length: ${givenLength}`, {
            name: 'BytecodeLengthMustBeDivisibleBy32Error'
        });
    }
} //# sourceMappingURL=bytecode.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/zksync/utils/hashBytecode.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hashBytecode",
    ()=>hashBytecode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/data/pad.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/encoding/toBytes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$sha256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/hash/sha256.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$zksync$2f$constants$2f$number$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/zksync/constants/number.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$zksync$2f$errors$2f$bytecode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/zksync/errors/bytecode.js [app-client] (ecmascript)");
;
;
;
;
;
function hashBytecode(bytecode) {
    const bytecodeBytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBytes"])(bytecode);
    if (bytecodeBytes.length % 32 !== 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$zksync$2f$errors$2f$bytecode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BytecodeLengthMustBeDivisibleBy32Error"]({
        givenLength: bytecodeBytes.length
    });
    if (bytecodeBytes.length > __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$zksync$2f$constants$2f$number$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maxBytecodeSize"]) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$zksync$2f$errors$2f$bytecode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BytecodeLengthExceedsMaxSizeError"]({
        givenLength: bytecodeBytes.length,
        maxBytecodeSize: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$zksync$2f$constants$2f$number$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maxBytecodeSize"]
    });
    const hashStr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$sha256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sha256"])(bytecodeBytes);
    const hash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBytes"])(hashStr);
    // Note that the length of the bytecode
    // should be provided in 32-byte words.
    const bytecodeLengthInWords = bytecodeBytes.length / 32;
    if (bytecodeLengthInWords % 2 === 0) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$zksync$2f$errors$2f$bytecode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BytecodeLengthInWordsMustBeOddError"]({
            givenLengthInWords: bytecodeLengthInWords
        });
    }
    const bytecodeLength = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBytes"])(bytecodeLengthInWords);
    // The bytecode should always take the first 2 bytes of the bytecode hash,
    // so we pad it from the left in case the length is smaller than 2 bytes.
    const bytecodeLengthPadded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])(bytecodeLength, {
        size: 2
    });
    const codeHashVersion = new Uint8Array([
        1,
        0
    ]);
    hash.set(codeHashVersion, 0);
    hash.set(bytecodeLengthPadded, 2);
    return hash;
} //# sourceMappingURL=hashBytecode.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/zksync/getEip721Domain.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "gasPerPubdataDefault",
    ()=>gasPerPubdataDefault,
    "getEip712Domain",
    ()=>getEip712Domain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$zksync$2f$utils$2f$hashBytecode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/zksync/utils/hashBytecode.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
;
;
const gasPerPubdataDefault = 50000n;
const getEip712Domain = (transaction)=>{
    const message = transactionToMessage(transaction);
    return {
        domain: {
            chainId: transaction.chainId,
            name: "zkSync",
            version: "2"
        },
        message: message,
        primaryType: "Transaction",
        types: {
            Transaction: [
                {
                    name: "txType",
                    type: "uint256"
                },
                {
                    name: "from",
                    type: "uint256"
                },
                {
                    name: "to",
                    type: "uint256"
                },
                {
                    name: "gasLimit",
                    type: "uint256"
                },
                {
                    name: "gasPerPubdataByteLimit",
                    type: "uint256"
                },
                {
                    name: "maxFeePerGas",
                    type: "uint256"
                },
                {
                    name: "maxPriorityFeePerGas",
                    type: "uint256"
                },
                {
                    name: "paymaster",
                    type: "uint256"
                },
                {
                    name: "nonce",
                    type: "uint256"
                },
                {
                    name: "value",
                    type: "uint256"
                },
                {
                    name: "data",
                    type: "bytes"
                },
                {
                    name: "factoryDeps",
                    type: "bytes32[]"
                },
                {
                    name: "paymasterInput",
                    type: "bytes"
                }
            ]
        }
    };
};
function transactionToMessage(transaction) {
    const { gas, nonce, to, from, value, maxFeePerGas, maxPriorityFeePerGas, paymaster, paymasterInput, gasPerPubdata, data, factoryDeps } = transaction;
    return {
        data: data ? data : "0x0",
        factoryDeps: factoryDeps?.map((dep)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$zksync$2f$utils$2f$hashBytecode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashBytecode"])(dep))) ?? [],
        from: BigInt(from),
        gasLimit: gas ?? 0n,
        gasPerPubdataByteLimit: gasPerPubdata ?? gasPerPubdataDefault,
        maxFeePerGas: maxFeePerGas ?? 0n,
        maxPriorityFeePerGas: maxPriorityFeePerGas ?? 0n,
        nonce: nonce ? BigInt(nonce) : 0n,
        paymaster: paymaster ? BigInt(paymaster) : 0n,
        paymasterInput: paymasterInput ? paymasterInput : "0x",
        to: to ? BigInt(to) : 0n,
        txType: 113n,
        value: value ?? 0n
    };
} //# sourceMappingURL=getEip721Domain.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/zksync/send-eip712-transaction.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getZkGasFees",
    ()=>getZkGasFees,
    "populateEip712Transaction",
    ()=>populateEip712Transaction,
    "sendEip712Transaction",
    ()=>sendEip712Transaction,
    "signEip712Transaction",
    ()=>signEip712Transaction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/encoding/toBytes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toRlp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/encoding/toRlp.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_sendRawTransaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_sendRawTransaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bigint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bigint.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$concat$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/concat-hex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/resolve-promised-value.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$encode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/encode.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$to$2d$serializable$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/to-serializable-transaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$zksync$2f$getEip721Domain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/zksync/getEip721Domain.js [app-client] (ecmascript)");
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
async function sendEip712Transaction(options) {
    const { account, transaction } = options;
    const eip712Transaction = await populateEip712Transaction(options);
    const hash = await signEip712Transaction({
        account,
        chainId: transaction.chain.id,
        eip712Transaction
    });
    const rpc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRpcClient"])(transaction);
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_sendRawTransaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["eth_sendRawTransaction"])(rpc, hash);
    return {
        chain: transaction.chain,
        client: transaction.client,
        transactionHash: result
    };
}
async function signEip712Transaction(options) {
    const { account, eip712Transaction, chainId } = options;
    // EIP712 signing of the serialized tx
    const eip712Domain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$zksync$2f$getEip721Domain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEip712Domain"])(eip712Transaction);
    const customSignature = await account.signTypedData({
        // biome-ignore lint/suspicious/noExplicitAny: TODO type properly
        ...eip712Domain
    });
    return serializeTransactionEIP712({
        ...eip712Transaction,
        chainId,
        customSignature
    });
}
async function populateEip712Transaction(options) {
    const { account, transaction } = options;
    const { gas, maxFeePerGas, maxPriorityFeePerGas, gasPerPubdata } = await getZkGasFees({
        from: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(account.address),
        transaction
    });
    // serialize the transaction (with fees, gas, nonce)
    const serializableTransaction = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$to$2d$serializable$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSerializableTransaction"])({
        from: account.address,
        transaction: {
            ...transaction,
            gas,
            maxFeePerGas,
            maxPriorityFeePerGas
        }
    });
    return {
        ...serializableTransaction,
        ...transaction.eip712,
        from: account.address,
        gasPerPubdata
    };
}
function serializeTransactionEIP712(transaction) {
    const { chainId, gas, nonce, to, from, value, maxFeePerGas, maxPriorityFeePerGas, customSignature, factoryDeps, paymaster, paymasterInput, gasPerPubdata, data } = transaction;
    const serializedTransaction = [
        nonce ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(nonce) : "0x",
        maxPriorityFeePerGas ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(maxPriorityFeePerGas) : "0x",
        maxFeePerGas ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(maxFeePerGas) : "0x",
        gas ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(gas) : "0x",
        to ?? "0x",
        value ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(value) : "0x",
        data ?? "0x0",
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(chainId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(""),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(""),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(chainId),
        from ?? "0x",
        gasPerPubdata ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(gasPerPubdata) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$zksync$2f$getEip721Domain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["gasPerPubdataDefault"]),
        factoryDeps ?? [],
        customSignature ?? "0x",
        paymaster && paymasterInput ? [
            paymaster,
            paymasterInput
        ] : []
    ];
    // @ts-ignore - TODO: fix types
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$concat$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concatHex"])([
        "0x71",
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toRlp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toRlp"])(serializedTransaction)
    ]);
}
async function getZkGasFees(args) {
    const { transaction, from } = args;
    let [gas, maxFeePerGas, maxPriorityFeePerGas, eip712] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(transaction.gas),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(transaction.maxFeePerGas),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(transaction.maxPriorityFeePerGas),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(transaction.eip712)
    ]);
    let gasPerPubdata = eip712?.gasPerPubdata;
    if (gas === undefined || maxFeePerGas === undefined || maxPriorityFeePerGas === undefined) {
        const rpc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRpcClient"])(transaction);
        const params = await formatTransaction({
            from,
            transaction
        });
        const result = await rpc({
            // biome-ignore lint/suspicious/noExplicitAny: TODO add to RPC method types
            method: "zks_estimateFee",
            // biome-ignore lint/suspicious/noExplicitAny: TODO add to RPC method types
            params: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bigint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replaceBigInts"])(params, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])
            ]
        });
        gas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bigint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBigInt"])(result.gas_limit) * 2n; // overestimating to avoid issues when not accounting for paymaster extra gas ( we should really pass the paymaster input above for better accuracy )
        const baseFee = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bigint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBigInt"])(result.max_fee_per_gas);
        maxFeePerGas = baseFee * 2n; // bumping the base fee per gas to ensure fast inclusion
        maxPriorityFeePerGas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bigint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBigInt"])(result.max_priority_fee_per_gas) || 1n;
        gasPerPubdata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bigint$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBigInt"])(result.gas_per_pubdata_limit) * 2n; // doubling for fast inclusion;
        if (gasPerPubdata < 50000n) {
            // enforce a minimum gas per pubdata limit
            gasPerPubdata = 50000n;
        }
    }
    return {
        gas,
        gasPerPubdata,
        maxFeePerGas,
        maxPriorityFeePerGas
    };
}
async function formatTransaction(args) {
    const { transaction, from } = args;
    const [data, to, value, eip712] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$encode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encode"])(transaction),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(transaction.to),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(transaction.value),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(transaction.eip712)
    ]);
    const gasPerPubdata = eip712?.gasPerPubdata;
    return {
        data,
        eip712Meta: {
            ...eip712,
            factoryDeps: eip712?.factoryDeps?.map((dep)=>Array.from((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexToBytes"])(dep))),
            gasPerPubdata: gasPerPubdata || 50000n
        },
        from,
        gasPerPubdata,
        to,
        type: "0x71",
        value
    };
} //# sourceMappingURL=send-eip712-transaction.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/types.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @internal
 */ __turbopack_context__.s([
    "maxUint96",
    ()=>maxUint96
]);
const maxUint96 = 2n ** 96n - 1n; //# sourceMappingURL=types.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/calls.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/contract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$contract$2d$call$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/prepare-contract-call.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$read$2d$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/read-contract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/is-hex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$withCache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/withCache.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/constants.js [app-client] (ecmascript)");
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
        factoryContract: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContract"])({
            address: args.factoryAddress ?? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_ACCOUNT_FACTORY_V0_6"],
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$withCache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withCache"])(async ()=>{
        const saltHex = accountSalt && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(accountSalt) ? accountSalt : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["stringToHex"])(accountSalt ?? "");
        let result;
        let retries = 0;
        const maxRetries = 3;
        while(retries <= maxRetries){
            try {
                result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$read$2d$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readContract"])({
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
    const saltHex = accountSalt && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(accountSalt) ? accountSalt : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["stringToHex"])(accountSalt ?? "");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$contract$2d$call$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareContractCall"])({
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$contract$2d$call$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareContractCall"])({
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$prepare$2d$contract$2d$call$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareContractCall"])({
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc4337/__generated__/IEntryPoint/read/getNonce.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FN_SELECTOR",
    ()=>FN_SELECTOR,
    "decodeGetNonceResult",
    ()=>decodeGetNonceResult,
    "encodeGetNonce",
    ()=>encodeGetNonce,
    "encodeGetNonceParams",
    ()=>encodeGetNonceParams,
    "getNonce",
    ()=>getNonce,
    "isGetNonceSupported",
    ()=>isGetNonceSupported
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/decodeAbiParameters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$read$2d$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/read-contract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/encodeAbiParameters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$detectExtension$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/detectExtension.js [app-client] (ecmascript)");
;
;
;
;
const FN_SELECTOR = "0x35567e1a";
const FN_INPUTS = [
    {
        name: "sender",
        type: "address"
    },
    {
        name: "key",
        type: "uint192"
    }
];
const FN_OUTPUTS = [
    {
        name: "nonce",
        type: "uint256"
    }
];
function isGetNonceSupported(availableSelectors) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$detectExtension$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectMethod"])({
        availableSelectors,
        method: [
            FN_SELECTOR,
            FN_INPUTS,
            FN_OUTPUTS
        ]
    });
}
function encodeGetNonceParams(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeAbiParameters"])(FN_INPUTS, [
        options.sender,
        options.key
    ]);
}
function encodeGetNonce(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return FN_SELECTOR + encodeGetNonceParams(options).slice(2);
}
function decodeGetNonceResult(result) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeAbiParameters"])(FN_OUTPUTS, result)[0];
}
async function getNonce(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$read$2d$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readContract"])({
        contract: options.contract,
        method: [
            FN_SELECTOR,
            FN_INPUTS,
            FN_OUTPUTS
        ],
        params: [
            options.sender,
            options.key
        ]
    });
} //# sourceMappingURL=getNonce.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc4337/__generated__/IEntryPoint/read/getUserOpHash.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FN_SELECTOR",
    ()=>FN_SELECTOR,
    "decodeGetUserOpHashResult",
    ()=>decodeGetUserOpHashResult,
    "encodeGetUserOpHash",
    ()=>encodeGetUserOpHash,
    "encodeGetUserOpHashParams",
    ()=>encodeGetUserOpHashParams,
    "getUserOpHash",
    ()=>getUserOpHash,
    "isGetUserOpHashSupported",
    ()=>isGetUserOpHashSupported
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/decodeAbiParameters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$read$2d$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/read-contract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/encodeAbiParameters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$detectExtension$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/detectExtension.js [app-client] (ecmascript)");
;
;
;
;
const FN_SELECTOR = "0xa6193531";
const FN_INPUTS = [
    {
        components: [
            {
                name: "sender",
                type: "address"
            },
            {
                name: "nonce",
                type: "uint256"
            },
            {
                name: "initCode",
                type: "bytes"
            },
            {
                name: "callData",
                type: "bytes"
            },
            {
                name: "callGasLimit",
                type: "uint256"
            },
            {
                name: "verificationGasLimit",
                type: "uint256"
            },
            {
                name: "preVerificationGas",
                type: "uint256"
            },
            {
                name: "maxFeePerGas",
                type: "uint256"
            },
            {
                name: "maxPriorityFeePerGas",
                type: "uint256"
            },
            {
                name: "paymasterAndData",
                type: "bytes"
            },
            {
                name: "signature",
                type: "bytes"
            }
        ],
        name: "userOp",
        type: "tuple"
    }
];
const FN_OUTPUTS = [
    {
        type: "bytes32"
    }
];
function isGetUserOpHashSupported(availableSelectors) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$detectExtension$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectMethod"])({
        availableSelectors,
        method: [
            FN_SELECTOR,
            FN_INPUTS,
            FN_OUTPUTS
        ]
    });
}
function encodeGetUserOpHashParams(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeAbiParameters"])(FN_INPUTS, [
        options.userOp
    ]);
}
function encodeGetUserOpHash(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return FN_SELECTOR + encodeGetUserOpHashParams(options).slice(2);
}
function decodeGetUserOpHashResult(result) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeAbiParameters"])(FN_OUTPUTS, result)[0];
}
async function getUserOpHash(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$read$2d$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readContract"])({
        contract: options.contract,
        method: [
            FN_SELECTOR,
            FN_INPUTS,
            FN_OUTPUTS
        ],
        params: [
            options.userOp
        ]
    });
} //# sourceMappingURL=getUserOpHash.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc4337/__generated__/IEntryPoint_v07/read/getUserOpHash.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FN_SELECTOR",
    ()=>FN_SELECTOR,
    "decodeGetUserOpHashResult",
    ()=>decodeGetUserOpHashResult,
    "encodeGetUserOpHash",
    ()=>encodeGetUserOpHash,
    "encodeGetUserOpHashParams",
    ()=>encodeGetUserOpHashParams,
    "getUserOpHash",
    ()=>getUserOpHash,
    "isGetUserOpHashSupported",
    ()=>isGetUserOpHashSupported
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/decodeAbiParameters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$read$2d$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/read-contract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/encodeAbiParameters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$detectExtension$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/detectExtension.js [app-client] (ecmascript)");
;
;
;
;
const FN_SELECTOR = "0x22cdde4c";
const FN_INPUTS = [
    {
        components: [
            {
                name: "sender",
                type: "address"
            },
            {
                name: "nonce",
                type: "uint256"
            },
            {
                name: "initCode",
                type: "bytes"
            },
            {
                name: "callData",
                type: "bytes"
            },
            {
                name: "accountGasLimits",
                type: "bytes32"
            },
            {
                name: "preVerificationGas",
                type: "uint256"
            },
            {
                name: "gasFees",
                type: "bytes32"
            },
            {
                name: "paymasterAndData",
                type: "bytes"
            },
            {
                name: "signature",
                type: "bytes"
            }
        ],
        name: "userOp",
        type: "tuple"
    }
];
const FN_OUTPUTS = [
    {
        type: "bytes32"
    }
];
function isGetUserOpHashSupported(availableSelectors) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$detectExtension$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectMethod"])({
        availableSelectors,
        method: [
            FN_SELECTOR,
            FN_INPUTS,
            FN_OUTPUTS
        ]
    });
}
function encodeGetUserOpHashParams(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeAbiParameters"])(FN_INPUTS, [
        options.userOp
    ]);
}
function encodeGetUserOpHash(options) {
    // we do a "manual" concat here to avoid the overhead of the "concatHex" function
    // we can do this because we know the specific formats of the values
    return FN_SELECTOR + encodeGetUserOpHashParams(options).slice(2);
}
function decodeGetUserOpHashResult(result) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeAbiParameters"])(FN_OUTPUTS, result)[0];
}
async function getUserOpHash(options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$read$2d$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readContract"])({
        contract: options.contract,
        method: [
            FN_SELECTOR,
            FN_INPUTS,
            FN_OUTPUTS
        ],
        params: [
            options.userOp
        ]
    });
} //# sourceMappingURL=getUserOpHash.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/packUserOp.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPackedUserOperation",
    ()=>getPackedUserOperation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$concat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/data/concat.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/data/pad.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
;
function getInitCode(unpackedUserOperation) {
    return unpackedUserOperation.factory ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$concat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"])([
        unpackedUserOperation.factory,
        unpackedUserOperation.factoryData || "0x"
    ]) : "0x";
}
function getAccountGasLimits(unpackedUserOperation) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$concat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"])([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(BigInt(unpackedUserOperation.verificationGasLimit)), {
            size: 16
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(BigInt(unpackedUserOperation.callGasLimit)), {
            size: 16
        })
    ]);
}
function getGasLimits(unpackedUserOperation) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$concat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"])([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(BigInt(unpackedUserOperation.maxPriorityFeePerGas)), {
            size: 16
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(BigInt(unpackedUserOperation.maxFeePerGas)), {
            size: 16
        })
    ]);
}
function getPaymasterAndData(unpackedUserOperation) {
    return unpackedUserOperation.paymaster ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$concat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"])([
        unpackedUserOperation.paymaster,
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(BigInt(unpackedUserOperation.paymasterVerificationGasLimit || 0)), {
            size: 16
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(BigInt(unpackedUserOperation.paymasterPostOpGasLimit || 0)), {
            size: 16
        }),
        unpackedUserOperation.paymasterData || "0x"
    ]) : "0x";
}
const getPackedUserOperation = (userOperation)=>{
    return {
        accountGasLimits: getAccountGasLimits(userOperation),
        callData: userOperation.callData,
        gasFees: getGasLimits(userOperation),
        initCode: getInitCode(userOperation),
        nonce: BigInt(userOperation.nonce),
        paymasterAndData: getPaymasterAndData(userOperation),
        preVerificationGas: BigInt(userOperation.preVerificationGas),
        sender: userOperation.sender,
        signature: userOperation.signature
    };
}; //# sourceMappingURL=packUserOp.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateRandomUint192",
    ()=>generateRandomUint192,
    "hexlifyUserOp",
    ()=>hexlifyUserOp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/is-hex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
;
const generateRandomUint192 = ()=>{
    const rand1 = BigInt(Math.floor(Math.random() * 0x100000000));
    const rand2 = BigInt(Math.floor(Math.random() * 0x100000000));
    const rand3 = BigInt(Math.floor(Math.random() * 0x100000000));
    const rand4 = BigInt(Math.floor(Math.random() * 0x100000000));
    const rand5 = BigInt(Math.floor(Math.random() * 0x100000000));
    const rand6 = BigInt(Math.floor(Math.random() * 0x100000000));
    return rand1 << BigInt(160) | rand2 << BigInt(128) | rand3 << BigInt(96) | rand4 << BigInt(64) | rand5 << BigInt(32) | rand6;
};
function hexlifyUserOp(userOp) {
    return Object.fromEntries(Object.entries(userOp).map(([key, val])=>[
            key,
            // turn any value that's not hex into hex
            val === undefined || val === null || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(val) ? val : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(val)
        ]));
} //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/paymaster.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPaymasterAndData",
    ()=>getPaymasterAndData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/utils.js [app-client] (ecmascript)");
;
;
;
;
;
async function getPaymasterAndData(args) {
    const { userOp, paymasterOverride, client, chain, entrypointAddress } = args;
    if (paymasterOverride) {
        return paymasterOverride(userOp);
    }
    const headers = {
        "Content-Type": "application/json"
    };
    const entrypoint = entrypointAddress ?? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENTRYPOINT_ADDRESS_v0_6"];
    const paymasterUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultBundlerUrl"])(chain);
    const body = {
        id: 1,
        jsonrpc: "2.0",
        method: "pm_sponsorUserOperation",
        params: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexlifyUserOp"])(userOp),
            entrypoint
        ]
    };
    // Ask the paymaster to sign the transaction and return a valid paymasterAndData value.
    const fetchWithHeaders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(client);
    const response = await fetchWithHeaders(paymasterUrl, {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(body),
        headers,
        method: "POST"
    });
    if (!response.ok) {
        const error = await response.text() || response.statusText;
        throw new Error(`Paymaster error: ${response.status} - ${error}`);
    }
    const res = await response.json();
    if (res.result) {
        // some paymasters return a string, some return an object with more data
        if (typeof res.result === "string") {
            return {
                paymasterAndData: res.result
            };
        }
        // check for policy errors
        if (res.result.reason) {
            console.warn(`Paymaster policy rejected this transaction with reason: ${res.result.reason} ${res.result.policyId ? `(policyId: ${res.result.policyId})` : ""}`);
        }
        return {
            callGasLimit: res.result.callGasLimit ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToBigInt"])(res.result.callGasLimit) : undefined,
            paymaster: res.result.paymaster,
            paymasterAndData: res.result.paymasterAndData,
            paymasterData: res.result.paymasterData,
            paymasterPostOpGasLimit: res.result.paymasterPostOpGasLimit ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToBigInt"])(res.result.paymasterPostOpGasLimit) : undefined,
            paymasterVerificationGasLimit: res.result.paymasterVerificationGasLimit ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToBigInt"])(res.result.paymasterVerificationGasLimit) : undefined,
            preVerificationGas: res.result.preVerificationGas ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToBigInt"])(res.result.preVerificationGas) : undefined,
            verificationGasLimit: res.result.verificationGasLimit ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToBigInt"])(res.result.verificationGasLimit) : undefined
        };
    }
    const error = res.error?.message || res.error || response.statusText || "unknown error";
    throw new Error(`Paymaster error from ${paymasterUrl}: ${error}`);
} //# sourceMappingURL=paymaster.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/userop.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearAccountDeploying",
    ()=>clearAccountDeploying,
    "createAndSignUserOp",
    ()=>createAndSignUserOp,
    "createUnsignedUserOp",
    ()=>createUnsignedUserOp,
    "getUserOpHash",
    ()=>getUserOpHash,
    "prepareUserOp",
    ()=>prepareUserOp,
    "signUserOp",
    ()=>signUserOp,
    "waitForUserOpReceipt",
    ()=>waitForUserOpReceipt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Solidity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/ox/_esm/core/Solidity.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$concat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/data/concat.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/contract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$_$5f$generated_$5f2f$IEntryPoint$2f$read$2f$getNonce$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc4337/__generated__/IEntryPoint/read/getNonce.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$_$5f$generated_$5f2f$IEntryPoint$2f$read$2f$getUserOpHash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc4337/__generated__/IEntryPoint/read/getUserOpHash.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$_$5f$generated_$5f2f$IEntryPoint_v07$2f$read$2f$getUserOpHash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc4337/__generated__/IEntryPoint_v07/read/getUserOpHash.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$gas$2f$fee$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/gas/fee-data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$encode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/encode.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$to$2d$serializable$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/to-serializable-transaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/abi/encodeAbiParameters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$is$2d$contract$2d$deployed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/is-contract-deployed.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$to$2d$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/to-bytes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/hashing/keccak256.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/resolve-promised-value.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$bundler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/bundler.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$calls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/calls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$packUserOp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/packUserOp.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$paymaster$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/paymaster.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/utils.js [app-client] (ecmascript)");
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
const isDeployingSet = new Set();
const getKey = (accountContract)=>{
    return `${accountContract.chain.id}:${accountContract.address}`;
};
const markAccountDeploying = (accountContract)=>{
    isDeployingSet.add(getKey(accountContract));
};
const clearAccountDeploying = (accountContract)=>{
    isDeployingSet.delete(getKey(accountContract));
};
const isAccountDeploying = (accountContract)=>{
    return isDeployingSet.has(getKey(accountContract));
};
async function waitForUserOpReceipt(args) {
    const timeout = args.timeoutMs || 120000; // 2mins
    const interval = args.intervalMs || 1000; // 1s
    const endtime = Date.now() + timeout;
    while(Date.now() < endtime){
        const userOpReceipt = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$bundler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserOpReceipt"])(args);
        if (userOpReceipt) {
            return userOpReceipt;
        }
        await new Promise((resolve)=>setTimeout(resolve, interval));
    }
    throw new Error(`Timeout waiting for userOp to be mined on chain ${args.chain.id} with UserOp hash: ${args.userOpHash}`);
}
async function createUnsignedUserOp(args) {
    const { transaction: executeTx, accountContract, factoryContract, adminAddress, overrides, sponsorGas, waitForDeployment = true, isDeployedOverride } = args;
    const chain = executeTx.chain;
    const client = executeTx.client;
    const bundlerOptions = {
        bundlerUrl: overrides?.bundlerUrl,
        chain,
        client,
        entrypointAddress: overrides?.entrypointAddress
    };
    const entrypointVersion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEntryPointVersion"])(args.overrides?.entrypointAddress || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENTRYPOINT_ADDRESS_v0_6"]);
    const [isDeployed, callData, callGasLimit, gasFees, nonce] = await Promise.all([
        typeof isDeployedOverride === "boolean" ? isDeployedOverride : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$is$2d$contract$2d$deployed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isContractDeployed"])(accountContract).then((isDeployed)=>isDeployed || isAccountDeploying(accountContract)),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$encode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encode"])(executeTx),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(executeTx.gas),
        getGasFees({
            bundlerOptions,
            chain,
            client,
            executeTx
        }),
        getAccountNonce({
            accountContract,
            chain,
            client,
            entrypointAddress: overrides?.entrypointAddress,
            getNonceOverride: overrides?.getAccountNonce
        })
    ]);
    const { maxFeePerGas, maxPriorityFeePerGas } = gasFees;
    if (entrypointVersion === "v0.7") {
        return populateUserOp_v0_7({
            accountContract,
            adminAddress,
            bundlerOptions,
            callData,
            callGasLimit,
            factoryContract,
            isDeployed,
            maxFeePerGas,
            maxPriorityFeePerGas,
            nonce,
            overrides,
            sponsorGas,
            waitForDeployment
        });
    }
    // default to v0.6
    return populateUserOp_v0_6({
        accountContract,
        adminAddress,
        bundlerOptions,
        callData,
        callGasLimit,
        factoryContract,
        isDeployed,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        overrides,
        sponsorGas,
        waitForDeployment
    });
}
async function getGasFees(args) {
    const { executeTx, bundlerOptions, chain, client } = args;
    let { maxFeePerGas, maxPriorityFeePerGas } = executeTx;
    const bundlerUrl = bundlerOptions?.bundlerUrl ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultBundlerUrl"])(chain);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isThirdwebUrl"])(bundlerUrl)) {
        // get gas prices from bundler
        const bundlerGasPrice = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$bundler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserOpGasFees"])({
            options: bundlerOptions
        });
        maxFeePerGas = bundlerGasPrice.maxFeePerGas;
        maxPriorityFeePerGas = bundlerGasPrice.maxPriorityFeePerGas;
    } else {
        // Check for explicity values
        const [resolvedMaxFeePerGas, resolvedMaxPriorityFeePerGas] = await Promise.all([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(maxFeePerGas),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(maxPriorityFeePerGas)
        ]);
        if (resolvedMaxFeePerGas && resolvedMaxPriorityFeePerGas) {
            // Save a network call if the values are provided
            maxFeePerGas = resolvedMaxFeePerGas;
            maxPriorityFeePerGas = resolvedMaxPriorityFeePerGas;
        } else {
            // Fallback to RPC gas prices if no explicit values provided
            const feeData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$gas$2f$fee$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultGasOverrides"])(client, chain);
            // Still check for explicit values in case one is provided and not the other
            maxPriorityFeePerGas = resolvedMaxPriorityFeePerGas ?? feeData.maxPriorityFeePerGas ?? 0n;
            maxFeePerGas = resolvedMaxFeePerGas ?? feeData.maxFeePerGas ?? 0n;
        }
    }
    return {
        maxFeePerGas,
        maxPriorityFeePerGas
    };
}
async function populateUserOp_v0_7(args) {
    const { bundlerOptions, isDeployed, factoryContract, accountContract, adminAddress, sponsorGas, overrides, nonce, callData, callGasLimit, maxFeePerGas, maxPriorityFeePerGas, waitForDeployment } = args;
    const { chain, client } = bundlerOptions;
    let factory;
    let factoryData;
    if (isDeployed) {
        factoryData = "0x";
        if (waitForDeployment) {
            // lock until account is deployed if needed to avoid 'sender already created' errors when sending multiple transactions in parallel
            await waitForAccountDeployed(accountContract);
        }
    } else {
        factory = factoryContract.address;
        factoryData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$encode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encode"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$calls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareCreateAccount"])({
            accountSalt: overrides?.accountSalt,
            adminAddress,
            createAccountOverride: overrides?.createAccount,
            factoryContract: factoryContract
        }));
        if (waitForDeployment) {
            markAccountDeploying(accountContract);
        }
    }
    const partialOp = {
        callData,
        callGasLimit: callGasLimit ?? 0n,
        factory,
        factoryData,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        paymaster: undefined,
        paymasterData: "0x",
        paymasterPostOpGasLimit: 0n,
        paymasterVerificationGasLimit: 0n,
        preVerificationGas: 0n,
        sender: accountContract.address,
        signature: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUMMY_SIGNATURE"],
        verificationGasLimit: 0n
    };
    if (sponsorGas) {
        const paymasterResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$paymaster$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaymasterAndData"])({
            chain,
            client,
            entrypointAddress: overrides?.entrypointAddress,
            paymasterOverride: overrides?.paymaster,
            userOp: partialOp
        });
        if (paymasterResult.paymaster && paymasterResult.paymasterData) {
            partialOp.paymaster = paymasterResult.paymaster;
            partialOp.paymasterData = paymasterResult.paymasterData;
        }
        // paymaster can have the gas limits in the response
        if (paymasterResult.callGasLimit && paymasterResult.verificationGasLimit && paymasterResult.preVerificationGas && paymasterResult.paymasterPostOpGasLimit && paymasterResult.paymasterVerificationGasLimit) {
            partialOp.callGasLimit = paymasterResult.callGasLimit;
            partialOp.verificationGasLimit = paymasterResult.verificationGasLimit;
            partialOp.preVerificationGas = paymasterResult.preVerificationGas;
            partialOp.paymasterPostOpGasLimit = paymasterResult.paymasterPostOpGasLimit;
            partialOp.paymasterVerificationGasLimit = paymasterResult.paymasterVerificationGasLimit;
        } else {
            // otherwise fallback to bundler for gas limits
            const stateOverrides = overrides?.tokenPaymaster ? {
                [overrides.tokenPaymaster.tokenAddress]: {
                    stateDiff: {
                        [(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeAbiParameters"])([
                            {
                                type: "address"
                            },
                            {
                                type: "uint256"
                            }
                        ], [
                            accountContract.address,
                            overrides.tokenPaymaster.balanceStorageSlot
                        ]))]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$ox$2f$_esm$2f$core$2f$Solidity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maxUint96"], {
                            size: 32
                        })
                    }
                }
            } : undefined;
            const estimates = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$bundler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["estimateUserOpGas"])({
                options: bundlerOptions,
                userOp: partialOp
            }, stateOverrides);
            partialOp.callGasLimit = estimates.callGasLimit;
            partialOp.verificationGasLimit = estimates.verificationGasLimit;
            partialOp.preVerificationGas = estimates.preVerificationGas;
            partialOp.paymasterPostOpGasLimit = overrides?.tokenPaymaster ? 500000n // TODO: estimate this better, needed if there's an extra swap needed in the paymaster
             : estimates.paymasterPostOpGasLimit || 0n;
            partialOp.paymasterVerificationGasLimit = estimates.paymasterVerificationGasLimit || 0n;
            // need paymaster to re-sign after estimates
            const paymasterResult2 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$paymaster$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaymasterAndData"])({
                chain,
                client,
                entrypointAddress: overrides?.entrypointAddress,
                paymasterOverride: overrides?.paymaster,
                userOp: partialOp
            });
            if (paymasterResult2.paymaster && paymasterResult2.paymasterData) {
                partialOp.paymaster = paymasterResult2.paymaster;
                partialOp.paymasterData = paymasterResult2.paymasterData;
            }
        }
    } else {
        // not gasless, so we just need to estimate gas limits
        const estimates = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$bundler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["estimateUserOpGas"])({
            options: bundlerOptions,
            userOp: partialOp
        });
        partialOp.callGasLimit = estimates.callGasLimit;
        partialOp.verificationGasLimit = estimates.verificationGasLimit;
        partialOp.preVerificationGas = estimates.preVerificationGas;
        partialOp.paymasterPostOpGasLimit = estimates.paymasterPostOpGasLimit || 0n;
        partialOp.paymasterVerificationGasLimit = estimates.paymasterVerificationGasLimit || 0n;
    }
    return {
        ...partialOp,
        signature: "0x"
    };
}
async function populateUserOp_v0_6(args) {
    const { bundlerOptions, isDeployed, factoryContract, accountContract, adminAddress, sponsorGas, overrides, nonce, callData, callGasLimit, maxFeePerGas, maxPriorityFeePerGas, waitForDeployment } = args;
    const { chain, client } = bundlerOptions;
    let initCode;
    if (isDeployed) {
        initCode = "0x";
        if (waitForDeployment) {
            // lock until account is deployed if needed to avoid 'sender already created' errors when sending multiple transactions in parallel
            await waitForAccountDeployed(accountContract);
        }
    } else {
        initCode = await getAccountInitCode({
            accountSalt: overrides?.accountSalt,
            adminAddress,
            createAccountOverride: overrides?.createAccount,
            factoryContract: factoryContract
        });
        if (waitForDeployment) {
            markAccountDeploying(accountContract);
        }
    }
    const partialOp = {
        callData,
        callGasLimit: callGasLimit ?? 0n,
        initCode,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        paymasterAndData: "0x",
        preVerificationGas: 0n,
        sender: accountContract.address,
        signature: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DUMMY_SIGNATURE"],
        verificationGasLimit: 0n
    };
    if (sponsorGas) {
        const paymasterResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$paymaster$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaymasterAndData"])({
            chain,
            client,
            entrypointAddress: overrides?.entrypointAddress,
            paymasterOverride: overrides?.paymaster,
            userOp: partialOp
        });
        const paymasterAndData = "paymasterAndData" in paymasterResult ? paymasterResult.paymasterAndData : "0x";
        if (paymasterAndData && paymasterAndData !== "0x") {
            partialOp.paymasterAndData = paymasterAndData;
        }
        // paymaster can have the gas limits in the response
        if (paymasterResult.callGasLimit && paymasterResult.verificationGasLimit && paymasterResult.preVerificationGas) {
            partialOp.callGasLimit = paymasterResult.callGasLimit;
            partialOp.verificationGasLimit = paymasterResult.verificationGasLimit;
            partialOp.preVerificationGas = paymasterResult.preVerificationGas;
        } else {
            // otherwise fallback to bundler for gas limits
            const estimates = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$bundler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["estimateUserOpGas"])({
                options: bundlerOptions,
                userOp: partialOp
            });
            partialOp.callGasLimit = estimates.callGasLimit;
            partialOp.verificationGasLimit = estimates.verificationGasLimit;
            partialOp.preVerificationGas = estimates.preVerificationGas;
            // need paymaster to re-sign after estimates
            if (paymasterAndData && paymasterAndData !== "0x") {
                const paymasterResult2 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$paymaster$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaymasterAndData"])({
                    chain,
                    client,
                    entrypointAddress: overrides?.entrypointAddress,
                    paymasterOverride: overrides?.paymaster,
                    userOp: partialOp
                });
                const paymasterAndData2 = "paymasterAndData" in paymasterResult2 ? paymasterResult2.paymasterAndData : "0x";
                if (paymasterAndData2 && paymasterAndData2 !== "0x") {
                    partialOp.paymasterAndData = paymasterAndData2;
                }
            }
        }
    } else {
        // not gasless, so we just need to estimate gas limits
        const estimates = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$bundler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["estimateUserOpGas"])({
            options: bundlerOptions,
            userOp: partialOp
        });
        partialOp.callGasLimit = estimates.callGasLimit;
        partialOp.verificationGasLimit = estimates.verificationGasLimit;
        partialOp.preVerificationGas = estimates.preVerificationGas;
    }
    return {
        ...partialOp,
        signature: "0x"
    };
}
async function signUserOp(args) {
    const { userOp, chain, entrypointAddress, adminAccount } = args;
    const userOpHash = await getUserOpHash({
        chain,
        client: args.client,
        entrypointAddress,
        userOp
    });
    if (adminAccount.signMessage) {
        const signature = await adminAccount.signMessage({
            chainId: chain.id,
            message: {
                raw: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$to$2d$bytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexToBytes"])(userOpHash)
            },
            originalMessage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(userOp)
        });
        return {
            ...userOp,
            signature
        };
    }
    throw new Error("signMessage not implemented in signingAccount");
}
async function getUserOpHash(args) {
    const { userOp, chain, entrypointAddress } = args;
    const entrypointVersion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEntryPointVersion"])(entrypointAddress || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENTRYPOINT_ADDRESS_v0_6"]);
    let userOpHash;
    if (entrypointVersion === "v0.7") {
        const packedUserOp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$packUserOp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPackedUserOperation"])(userOp);
        userOpHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$_$5f$generated_$5f2f$IEntryPoint_v07$2f$read$2f$getUserOpHash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserOpHash"])({
            contract: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContract"])({
                address: entrypointAddress || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENTRYPOINT_ADDRESS_v0_7"],
                chain,
                client: args.client
            }),
            userOp: packedUserOp
        });
    } else {
        userOpHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$_$5f$generated_$5f2f$IEntryPoint$2f$read$2f$getUserOpHash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserOpHash"])({
            contract: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContract"])({
                address: entrypointAddress || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENTRYPOINT_ADDRESS_v0_6"],
                chain,
                client: args.client
            }),
            userOp: userOp
        });
    }
    return userOpHash;
}
async function getAccountInitCode(options) {
    const { factoryContract, adminAddress, accountSalt, createAccountOverride } = options;
    const deployTx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$calls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareCreateAccount"])({
        accountSalt,
        adminAddress,
        createAccountOverride,
        factoryContract
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$concat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"])([
        factoryContract.address,
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$encode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encode"])(deployTx)
    ]);
}
async function getAccountNonce(options) {
    const { accountContract, chain, client, entrypointAddress, getNonceOverride } = options;
    if (getNonceOverride) {
        return getNonceOverride(accountContract);
    }
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$_$5f$generated_$5f2f$IEntryPoint$2f$read$2f$getNonce$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNonce"])({
        contract: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContract"])({
            address: entrypointAddress || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENTRYPOINT_ADDRESS_v0_6"],
            chain,
            client
        }),
        key: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateRandomUint192"])(),
        sender: accountContract.address
    });
}
async function createAndSignUserOp(options) {
    // if factory is passed, but no entrypoint, try to resolve entrypoint from factory
    if (options.smartWalletOptions.factoryAddress && !options.smartWalletOptions.overrides?.entrypointAddress) {
        const entrypointAddress = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getEntrypointFromFactory"])(options.smartWalletOptions.factoryAddress, options.client, options.smartWalletOptions.chain);
        if (entrypointAddress) {
            options.smartWalletOptions.overrides = {
                ...options.smartWalletOptions.overrides,
                entrypointAddress
            };
        }
    }
    const unsignedUserOp = await prepareUserOp({
        adminAccount: options.adminAccount,
        client: options.client,
        isDeployedOverride: options.isDeployedOverride,
        smartWalletOptions: options.smartWalletOptions,
        transactions: options.transactions,
        waitForDeployment: options.waitForDeployment
    });
    const signedUserOp = await signUserOp({
        adminAccount: options.adminAccount,
        chain: options.smartWalletOptions.chain,
        client: options.client,
        entrypointAddress: options.smartWalletOptions.overrides?.entrypointAddress,
        userOp: unsignedUserOp
    });
    return signedUserOp;
}
async function prepareUserOp(options) {
    const config = options.smartWalletOptions;
    const factoryContract = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContract"])({
        address: config.factoryAddress || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultAccountFactory"])(config.overrides?.entrypointAddress),
        chain: config.chain,
        client: options.client
    });
    const accountAddress = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$calls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["predictAddress"])({
        accountAddress: config.overrides?.accountAddress,
        accountSalt: config.overrides?.accountSalt,
        adminAddress: options.adminAccount.address,
        factoryContract,
        predictAddressOverride: config.overrides?.predictAddress
    });
    const accountContract = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContract"])({
        address: accountAddress,
        chain: config.chain,
        client: options.client
    });
    let executeTx;
    if (options.transactions.length === 1) {
        const tx = options.transactions[0];
        // for single tx, simulate fully
        const serializedTx = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$to$2d$serializable$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSerializableTransaction"])({
            from: accountAddress,
            transaction: tx
        });
        executeTx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$calls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareExecute"])({
            accountContract,
            executeOverride: config.overrides?.execute,
            transaction: serializedTx
        });
    } else {
        // for multiple txs, we can't simulate, just encode
        const serializedTxs = await Promise.all(options.transactions.map(async (tx)=>{
            const [data, to, value] = await Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$encode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encode"])(tx),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(tx.to),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(tx.value)
            ]);
            return {
                chainId: tx.chain.id,
                data,
                to,
                value
            };
        }));
        executeTx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$calls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareBatchExecute"])({
            accountContract,
            executeBatchOverride: config.overrides?.executeBatch,
            transactions: serializedTxs
        });
    }
    return createUnsignedUserOp({
        accountContract,
        adminAddress: options.adminAccount.address,
        factoryContract,
        isDeployedOverride: options.isDeployedOverride,
        overrides: config.overrides,
        sponsorGas: "sponsorGas" in config ? config.sponsorGas : config.gasless,
        transaction: executeTx,
        waitForDeployment: options.waitForDeployment
    });
}
async function waitForAccountDeployed(accountContract) {
    const startTime = Date.now();
    while(isAccountDeploying(accountContract)){
        if (Date.now() - startTime > 60000) {
            clearAccountDeploying(accountContract); // clear the flag so it doesnt stay stuck in this state
            throw new Error("Account deployment is taking too long (over 1 minute). Please try again.");
        }
        await new Promise((resolve)=>setTimeout(resolve, 500));
    }
} //# sourceMappingURL=userop.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/index.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "connectSmartAccount",
    ()=>connectSmartAccount,
    "disconnectSmartAccount",
    ()=>disconnectSmartAccount,
    "getEntrypointFromFactory",
    ()=>getEntrypointFromFactory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/helpers.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/transaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/contract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc20$2f$_$5f$generated_$5f2f$IERC20$2f$read$2f$allowance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc20/__generated__/IERC20/read/allowance.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc20$2f$write$2f$approve$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc20/write/approve.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$account$2f$addSessionKey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc4337/account/addSessionKey.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$send$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/send-transaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$to$2d$serializable$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/to-serializable-transaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$zksync$2f$send$2d$eip712$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/zksync/send-eip712-transaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$read$2d$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/read-contract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$any$2d$evm$2f$zksync$2f$isZkSyncChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/any-evm/zksync/isZkSyncChain.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/resolve-promised-value.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$signatures$2f$helpers$2f$parse$2d$typed$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/signatures/helpers/parse-typed-data.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/types.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$bundler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/bundler.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$calls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/calls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$userop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/userop.js [app-client] (ecmascript)");
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
;
;
;
;
;
;
;
/**
 * For in-app wallets, the smart wallet creation is implicit so we track these to be able to retrieve the personal account for a smart account on the wallet API.
 * Note: We have to go account to account here and NOT wallet to account because the smart wallet itself is never exposed to the in-app wallet, only the account.
 * @internal
 */ const adminAccountToSmartAccountMap = new WeakMap();
const smartAccountToAdminAccountMap = new WeakMap();
async function connectSmartAccount(connectionOptions, creationOptions) {
    const { personalAccount, client } = connectionOptions;
    if (!personalAccount) {
        throw new Error("No personal account provided for smart account connection");
    }
    const options = creationOptions;
    const chain = creationOptions.chain;
    const sponsorGas = "gasless" in options ? options.gasless : options.sponsorGas;
    if (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$any$2d$evm$2f$zksync$2f$isZkSyncChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isZkSyncChain"])(chain)) {
        return [
            createZkSyncAccount({
                chain,
                connectionOptions,
                creationOptions,
                sponsorGas
            }),
            chain
        ];
    }
    // if factory is passed, but no entrypoint, try to resolve entrypoint from factory
    if (options.factoryAddress && !options.overrides?.entrypointAddress) {
        const entrypointAddress = await getEntrypointFromFactory(options.factoryAddress, client, chain);
        if (entrypointAddress) {
            options.overrides = {
                ...options.overrides,
                entrypointAddress
            };
        }
    }
    if (options.overrides?.tokenPaymaster && !options.overrides?.entrypointAddress) {
        // if token paymaster is set, but no entrypoint address, set the entrypoint address to v0.7
        options.overrides = {
            ...options.overrides,
            entrypointAddress: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENTRYPOINT_ADDRESS_v0_7"]
        };
    }
    const factoryAddress = options.factoryAddress ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultAccountFactory"])(options.overrides?.entrypointAddress);
    const factoryContract = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContract"])({
        address: factoryAddress,
        chain: chain,
        client: client
    });
    const accountAddress = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$calls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["predictAddress"])({
        accountAddress: options.overrides?.accountAddress,
        accountSalt: options.overrides?.accountSalt,
        adminAddress: personalAccount.address,
        factoryContract,
        predictAddressOverride: options.overrides?.predictAddress
    }).then((address)=>address).catch((err)=>{
        throw new Error(`Failed to get account address with factory contract ${factoryContract.address} on chain ID ${chain.id}: ${err?.message || "unknown error"}`, {
            cause: err
        });
    });
    const accountContract = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContract"])({
        address: accountAddress,
        chain,
        client
    });
    const account = await createSmartAccount({
        ...options,
        accountContract,
        chain,
        client,
        factoryContract,
        personalAccount,
        sponsorGas
    });
    adminAccountToSmartAccountMap.set(personalAccount, account);
    smartAccountToAdminAccountMap.set(account, personalAccount);
    if (options.sessionKey) {
        if (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$account$2f$addSessionKey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldUpdateSessionKey"])({
            accountContract,
            newPermissions: options.sessionKey.permissions,
            sessionKeyAddress: options.sessionKey.address
        })) {
            const transaction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$account$2f$addSessionKey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addSessionKey"])({
                account: personalAccount,
                contract: accountContract,
                permissions: options.sessionKey.permissions,
                sessionKeyAddress: options.sessionKey.address
            });
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$send$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendTransaction"])({
                account: account,
                transaction
            });
        }
    }
    return [
        account,
        chain
    ];
}
async function disconnectSmartAccount(account) {
    // look up the personalAccount for the smart wallet
    const personalAccount = smartAccountToAdminAccountMap.get(account);
    if (personalAccount) {
        // remove the mappings
        adminAccountToSmartAccountMap.delete(personalAccount);
        smartAccountToAdminAccountMap.delete(account);
    }
}
async function createSmartAccount(options) {
    const erc20Paymaster = options.overrides?.tokenPaymaster;
    if (erc20Paymaster) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEntryPointVersion"])(options.overrides?.entrypointAddress || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENTRYPOINT_ADDRESS_v0_6"]) !== "v0.7") {
            throw new Error("Token paymaster is only supported for entrypoint version v0.7");
        }
    }
    const sponsorGas = options.sponsorGas;
    let accountContract = options.accountContract;
    const account = {
        address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(accountContract.address),
        async onTransactionRequested (transaction) {
            return options.personalAccount.onTransactionRequested?.(transaction);
        },
        async sendBatchTransaction (transactions) {
            const executeTx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$calls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareBatchExecute"])({
                accountContract,
                executeBatchOverride: options.overrides?.executeBatch,
                transactions
            });
            if (transactions.length === 0) {
                throw new Error("No transactions to send");
            }
            const firstTx = transactions[0];
            if (!firstTx) {
                throw new Error("No transactions to send");
            }
            const chain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(firstTx.chainId);
            const result = await _sendUserOp({
                executeTx,
                options: {
                    ...options,
                    accountContract,
                    chain
                }
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackTransaction"])({
                chainId: chain.id,
                client: options.client,
                contractAddress: transactions[0]?.to ?? undefined,
                transactionHash: result.transactionHash,
                walletAddress: options.accountContract.address,
                walletType: "smart"
            });
            return result;
        },
        async sendTransaction (transaction) {
            // if erc20 paymaster - check allowance and approve if needed
            let paymasterOverride;
            if (erc20Paymaster) {
                await approveERC20({
                    accountContract,
                    erc20Paymaster,
                    options
                });
                const paymasterCallback = async ()=>{
                    return {
                        paymaster: erc20Paymaster.paymasterAddress,
                        paymasterData: "0x"
                    };
                };
                paymasterOverride = options.overrides?.paymaster || paymasterCallback;
            } else {
                paymasterOverride = options.overrides?.paymaster;
            }
            // If this transaction is for a different chain than the initial one, get the account contract for that chain
            if (transaction.chainId !== accountContract.chain.id) {
                accountContract = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContract"])({
                    address: account.address,
                    chain: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(transaction.chainId),
                    client: options.client
                });
            }
            const executeTx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$calls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareExecute"])({
                accountContract: accountContract,
                executeOverride: options.overrides?.execute,
                transaction
            });
            const chain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(transaction.chainId);
            const result = await _sendUserOp({
                executeTx,
                options: {
                    ...options,
                    accountContract,
                    chain,
                    overrides: {
                        ...options.overrides,
                        paymaster: paymasterOverride
                    }
                }
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackTransaction"])({
                chainId: chain.id,
                client: options.client,
                contractAddress: transaction.to ?? undefined,
                transactionHash: result.transactionHash,
                walletAddress: options.accountContract.address,
                walletType: "smart"
            });
            return result;
        },
        async signMessage ({ message }) {
            if (options.overrides?.signMessage) {
                return options.overrides.signMessage({
                    accountContract,
                    adminAccount: options.personalAccount,
                    factoryContract: options.factoryContract,
                    message
                });
            }
            const { smartAccountSignMessage } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/signing.js [app-client] (ecmascript, async loader)");
            return smartAccountSignMessage({
                accountContract,
                factoryContract: options.factoryContract,
                message,
                options
            });
        },
        async signTypedData (typedData) {
            if (options.overrides?.signTypedData) {
                return options.overrides.signTypedData({
                    accountContract,
                    adminAccount: options.personalAccount,
                    factoryContract: options.factoryContract,
                    typedData
                });
            }
            const { smartAccountSignTypedData } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/signing.js [app-client] (ecmascript, async loader)");
            return smartAccountSignTypedData({
                accountContract,
                factoryContract: options.factoryContract,
                options,
                typedData
            });
        },
        sendCalls: async (options)=>{
            const { inAppWalletSendCalls } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/eip5792/in-app-wallet-calls.js [app-client] (ecmascript, async loader)");
            const firstCall = options.calls[0];
            if (!firstCall) {
                throw new Error("No calls to send");
            }
            const client = firstCall.client;
            const chain = firstCall.chain || options.chain;
            const id = await inAppWalletSendCalls({
                account: account,
                calls: options.calls,
                chain
            });
            return {
                chain,
                client,
                id
            };
        },
        getCallsStatus: async (options)=>{
            const { inAppWalletGetCallsStatus } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/eip5792/in-app-wallet-calls.js [app-client] (ecmascript, async loader)");
            return inAppWalletGetCallsStatus(options);
        },
        getCapabilities: async (options)=>{
            return {
                [options.chainId ?? 1]: {
                    atomic: {
                        status: "supported"
                    },
                    paymasterService: {
                        supported: sponsorGas ?? false
                    }
                }
            };
        }
    };
    return account;
}
async function approveERC20(args) {
    const { accountContract, erc20Paymaster, options } = args;
    const tokenAddress = erc20Paymaster.tokenAddress;
    const tokenContract = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContract"])({
        address: tokenAddress,
        chain: accountContract.chain,
        client: accountContract.client
    });
    const accountAllowance = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc20$2f$_$5f$generated_$5f2f$IERC20$2f$read$2f$allowance$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allowance"])({
        contract: tokenContract,
        owner: accountContract.address,
        spender: erc20Paymaster.paymasterAddress
    });
    if (accountAllowance > 0n) {
        return;
    }
    const approveTx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc20$2f$write$2f$approve$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["approve"])({
        amountWei: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maxUint96"] - 1n,
        contract: tokenContract,
        spender: erc20Paymaster.paymasterAddress
    });
    const transaction = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$to$2d$serializable$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSerializableTransaction"])({
        from: accountContract.address,
        transaction: approveTx
    });
    const executeTx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$calls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareExecute"])({
        accountContract,
        executeOverride: options.overrides?.execute,
        transaction
    });
    await _sendUserOp({
        executeTx,
        options: {
            ...options,
            overrides: {
                ...options.overrides,
                tokenPaymaster: undefined
            }
        }
    });
}
function createZkSyncAccount(args) {
    const { creationOptions, connectionOptions, chain } = args;
    const account = {
        address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(connectionOptions.personalAccount.address),
        async onTransactionRequested (transaction) {
            return connectionOptions.personalAccount.onTransactionRequested?.(transaction);
        },
        async sendTransaction (transaction) {
            // override passed tx, we have to refetch gas and fees always
            const prepTx = {
                chain: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(transaction.chainId),
                client: connectionOptions.client,
                data: transaction.data,
                eip712: transaction.eip712,
                to: transaction.to ?? undefined,
                value: transaction.value ?? 0n
            };
            let serializableTransaction = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$zksync$2f$send$2d$eip712$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["populateEip712Transaction"])({
                account,
                transaction: prepTx
            });
            if (args.sponsorGas && !serializableTransaction.paymaster) {
                // get paymaster input
                const pmData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$bundler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getZkPaymasterData"])({
                    options: {
                        bundlerUrl: creationOptions.overrides?.bundlerUrl,
                        chain,
                        client: connectionOptions.client,
                        entrypointAddress: creationOptions.overrides?.entrypointAddress
                    },
                    transaction: serializableTransaction
                });
                serializableTransaction = {
                    ...serializableTransaction,
                    ...pmData
                };
            }
            // sign
            const signedTransaction = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$zksync$2f$send$2d$eip712$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signEip712Transaction"])({
                account,
                chainId: chain.id,
                eip712Transaction: serializableTransaction
            });
            // broadcast via bundler
            const txHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$bundler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["broadcastZkTransaction"])({
                options: {
                    bundlerUrl: creationOptions.overrides?.bundlerUrl,
                    chain,
                    client: connectionOptions.client,
                    entrypointAddress: creationOptions.overrides?.entrypointAddress
                },
                signedTransaction,
                transaction: serializableTransaction
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackTransaction"])({
                chainId: chain.id,
                client: connectionOptions.client,
                contractAddress: transaction.to ?? undefined,
                transactionHash: txHash.transactionHash,
                walletAddress: account.address,
                walletType: "smart"
            });
            return {
                chain: chain,
                client: connectionOptions.client,
                transactionHash: txHash.transactionHash
            };
        },
        async signMessage ({ message }) {
            return connectionOptions.personalAccount.signMessage({
                message
            });
        },
        async signTypedData (_typedData) {
            const typedData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$signatures$2f$helpers$2f$parse$2d$typed$2d$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseTypedData"])(_typedData);
            return connectionOptions.personalAccount.signTypedData(typedData);
        },
        sendCalls: async (options)=>{
            const { inAppWalletSendCalls } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/eip5792/in-app-wallet-calls.js [app-client] (ecmascript, async loader)");
            const firstCall = options.calls[0];
            if (!firstCall) {
                throw new Error("No calls to send");
            }
            const client = firstCall.client;
            const chain = firstCall.chain || options.chain;
            const id = await inAppWalletSendCalls({
                account: account,
                calls: options.calls,
                chain
            });
            return {
                chain,
                client,
                id
            };
        },
        getCallsStatus: async (options)=>{
            const { inAppWalletGetCallsStatus } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/eip5792/in-app-wallet-calls.js [app-client] (ecmascript, async loader)");
            return inAppWalletGetCallsStatus(options);
        },
        getCapabilities: async (options)=>{
            return {
                [options.chainId ?? 1]: {
                    atomic: {
                        status: "unsupported"
                    },
                    paymasterService: {
                        supported: args.sponsorGas ?? false
                    }
                }
            };
        }
    };
    return account;
}
async function _sendUserOp(args) {
    const { executeTx, options } = args;
    try {
        const unsignedUserOp = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$userop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createUnsignedUserOp"])({
            accountContract: options.accountContract,
            adminAddress: options.personalAccount.address,
            factoryContract: options.factoryContract,
            overrides: options.overrides,
            sponsorGas: options.sponsorGas,
            transaction: executeTx
        });
        const signedUserOp = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$userop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signUserOp"])({
            adminAccount: options.personalAccount,
            chain: options.chain,
            client: options.client,
            entrypointAddress: options.overrides?.entrypointAddress,
            userOp: unsignedUserOp
        });
        const bundlerOptions = {
            bundlerUrl: options.overrides?.bundlerUrl,
            chain: options.chain,
            client: options.client,
            entrypointAddress: options.overrides?.entrypointAddress
        };
        const userOpHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$bundler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bundleUserOp"])({
            options: bundlerOptions,
            userOp: signedUserOp
        });
        // wait for tx receipt rather than return the userOp hash
        const receipt = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$userop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["waitForUserOpReceipt"])({
            ...bundlerOptions,
            userOpHash
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackTransaction"])({
            chainId: options.chain.id,
            client: options.client,
            contractAddress: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(executeTx.to ?? undefined),
            transactionHash: receipt.transactionHash,
            walletAddress: options.accountContract.address,
            walletType: "smart"
        });
        return {
            chain: options.chain,
            client: options.client,
            transactionHash: receipt.transactionHash
        };
    } catch (error) {
        // Track insufficient funds errors
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$helpers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInsufficientFundsError"])(error)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackInsufficientFundsError"])({
                chainId: options.chain.id,
                client: options.client,
                contractAddress: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(executeTx.to ?? undefined),
                error,
                transactionValue: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(executeTx.value),
                walletAddress: options.accountContract.address
            });
        }
        throw error;
    } finally{
        // reset the isDeploying flag after every transaction or error
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$userop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearAccountDeploying"])(options.accountContract);
    }
}
async function getEntrypointFromFactory(factoryAddress, client, chain) {
    const factoryContract = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContract"])({
        address: factoryAddress,
        chain,
        client
    });
    try {
        const entrypointAddress = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$read$2d$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readContract"])({
            contract: factoryContract,
            method: "function entrypoint() public view returns (address)"
        });
        return entrypointAddress;
    } catch  {
        return undefined;
    }
} //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/types.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatUserOperationReceipt",
    ()=>formatUserOperationReceipt
]);
function formatUserOperationReceipt(userOpReceiptRaw) {
    const { receipt: transactionReceipt } = userOpReceiptRaw;
    const receipt = {
        ...transactionReceipt,
        blockNumber: transactionReceipt.blockNumber ? BigInt(transactionReceipt.blockNumber) : null,
        contractAddress: transactionReceipt.contractAddress ? transactionReceipt.contractAddress : null,
        cumulativeGasUsed: transactionReceipt.cumulativeGasUsed ? BigInt(transactionReceipt.cumulativeGasUsed) : null,
        effectiveGasPrice: transactionReceipt.effectiveGasPrice ? BigInt(transactionReceipt.effectiveGasPrice) : null,
        gasUsed: transactionReceipt.gasUsed ? BigInt(transactionReceipt.gasUsed) : null,
        logs: transactionReceipt.logs,
        status: transactionReceipt.status,
        to: transactionReceipt.to ? transactionReceipt.to : null,
        transactionHash: transactionReceipt.transactionHash,
        transactionIndex: transactionReceipt.transactionIndex,
        type: transactionReceipt.type
    };
    if (transactionReceipt.blobGasPrice) receipt.blobGasPrice = BigInt(transactionReceipt.blobGasPrice);
    if (transactionReceipt.blobGasUsed) receipt.blobGasUsed = BigInt(transactionReceipt.blobGasUsed);
    const userOpReceipt = {
        ...userOpReceiptRaw,
        actualGasCost: BigInt(userOpReceiptRaw.actualGasCost),
        actualGasUsed: BigInt(userOpReceiptRaw.actualGasUsed),
        nonce: BigInt(userOpReceiptRaw.nonce),
        receipt,
        userOpHash: userOpReceiptRaw.userOpHash
    };
    return userOpReceipt;
} //# sourceMappingURL=types.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/bundler.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "broadcastZkTransaction",
    ()=>broadcastZkTransaction,
    "bundleUserOp",
    ()=>bundleUserOp,
    "estimateUserOpGas",
    ()=>estimateUserOpGas,
    "estimateUserOpGasCost",
    ()=>estimateUserOpGasCost,
    "executeWithSignature",
    ()=>executeWithSignature,
    "getQueuedTransactionHash",
    ()=>getQueuedTransactionHash,
    "getUserOpGasFees",
    ()=>getUserOpGasFees,
    "getUserOpReceipt",
    ()=>getUserOpReceipt,
    "getUserOpReceiptRaw",
    ()=>getUserOpReceiptRaw,
    "getZkPaymasterData",
    ()=>getZkPaymasterData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeErrorResult$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/decodeErrorResult.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/contract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$event$2f$actions$2f$parse$2d$logs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/event/actions/parse-logs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$_$5f$generated_$5f2f$IEntryPoint$2f$events$2f$UserOperationRevertReason$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc4337/__generated__/IEntryPoint/events/UserOperationRevertReason.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$_$5f$generated_$5f2f$IEntryPoint_v07$2f$events$2f$PostOpRevertReason$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc4337/__generated__/IEntryPoint_v07/events/PostOpRevertReason.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$is$2d$contract$2d$deployed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/is-contract-deployed.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/units.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/types.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$calls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/calls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$userop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/userop.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/utils.js [app-client] (ecmascript)");
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
;
;
async function bundleUserOp(args) {
    return sendBundlerRequest({
        ...args,
        operation: "eth_sendUserOperation",
        params: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexlifyUserOp"])(args.userOp),
            args.options.entrypointAddress ?? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENTRYPOINT_ADDRESS_v0_6"]
        ]
    });
}
async function estimateUserOpGas(args, stateOverrides) {
    const res = await sendBundlerRequest({
        ...args,
        operation: "eth_estimateUserOperationGas",
        params: [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexlifyUserOp"])(args.userOp),
            args.options.entrypointAddress ?? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ENTRYPOINT_ADDRESS_v0_6"],
            stateOverrides ?? {}
        ]
    });
    // add gas buffer for managed account factory delegate calls
    return {
        callGasLimit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToBigInt"])(res.callGasLimit) + __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MANAGED_ACCOUNT_GAS_BUFFER"],
        paymasterPostOpGasLimit: res.paymasterPostOpGasLimit !== undefined ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToBigInt"])(res.paymasterPostOpGasLimit) : undefined,
        paymasterVerificationGasLimit: res.paymasterVerificationGasLimit !== undefined ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToBigInt"])(res.paymasterVerificationGasLimit) : undefined,
        preVerificationGas: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToBigInt"])(res.preVerificationGas),
        verificationGas: res.verificationGas !== undefined ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToBigInt"])(res.verificationGas) : undefined,
        verificationGasLimit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToBigInt"])(res.verificationGasLimit)
    };
}
async function estimateUserOpGasCost(args) {
    // if factory is passed, but no entrypoint, try to resolve entrypoint from factory
    if (args.smartWalletOptions.factoryAddress && !args.smartWalletOptions.overrides?.entrypointAddress) {
        const entrypointAddress = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getEntrypointFromFactory"])(args.smartWalletOptions.factoryAddress, args.client, args.smartWalletOptions.chain);
        if (entrypointAddress) {
            args.smartWalletOptions.overrides = {
                ...args.smartWalletOptions.overrides,
                entrypointAddress
            };
        }
    }
    const userOp = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$userop$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prepareUserOp"])({
        adminAccount: args.adminAccount,
        client: args.client,
        isDeployedOverride: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$is$2d$contract$2d$deployed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isContractDeployed"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContract"])({
            address: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$calls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["predictSmartAccountAddress"])({
                adminAddress: args.adminAccount.address,
                chain: args.smartWalletOptions.chain,
                client: args.client,
                factoryAddress: args.smartWalletOptions.factoryAddress
            }),
            chain: args.smartWalletOptions.chain,
            client: args.client
        })),
        smartWalletOptions: args.smartWalletOptions,
        transactions: args.transactions,
        waitForDeployment: false
    });
    let gasLimit = 0n;
    if ("paymasterVerificationGasLimit" in userOp) {
        // v0.7
        gasLimit = BigInt(userOp.paymasterVerificationGasLimit ?? 0) + BigInt(userOp.paymasterPostOpGasLimit ?? 0) + BigInt(userOp.verificationGasLimit ?? 0) + BigInt(userOp.preVerificationGas ?? 0) + BigInt(userOp.callGasLimit ?? 0);
    } else {
        // v0.6
        gasLimit = BigInt(userOp.verificationGasLimit ?? 0) + BigInt(userOp.preVerificationGas ?? 0) + BigInt(userOp.callGasLimit ?? 0);
    }
    const gasCost = gasLimit * (userOp.maxFeePerGas ?? 0n);
    return {
        ether: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$units$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toEther"])(gasCost),
        wei: gasCost
    };
}
async function getUserOpGasFees(args) {
    const res = await sendBundlerRequest({
        ...args,
        operation: "thirdweb_getUserOperationGasPrice",
        params: []
    });
    return {
        maxFeePerGas: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToBigInt"])(res.maxFeePerGas),
        maxPriorityFeePerGas: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToBigInt"])(res.maxPriorityFeePerGas)
    };
}
async function getUserOpReceipt(args) {
    const res = await getUserOpReceiptRaw(args);
    if (!res) {
        return undefined;
    }
    if (res.success === false) {
        // parse revert reason
        const logs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$event$2f$actions$2f$parse$2d$logs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseEventLogs"])({
            events: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$_$5f$generated_$5f2f$IEntryPoint$2f$events$2f$UserOperationRevertReason$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["userOperationRevertReasonEvent"])(),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc4337$2f$_$5f$generated_$5f2f$IEntryPoint_v07$2f$events$2f$PostOpRevertReason$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["postOpRevertReasonEvent"])()
            ],
            logs: res.logs
        });
        const revertReason = logs[0]?.args?.revertReason;
        if (!revertReason) {
            throw new Error(`UserOp failed at txHash: ${res.receipt.transactionHash}`);
        }
        const revertMsg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$decodeErrorResult$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeErrorResult"])({
            data: revertReason
        });
        throw new Error(`UserOp failed with reason: '${revertMsg.args.join(",")}' at txHash: ${res.receipt.transactionHash}`);
    }
    return res.receipt;
}
async function getUserOpReceiptRaw(args) {
    const res = await sendBundlerRequest({
        operation: "eth_getUserOperationReceipt",
        options: args,
        params: [
            args.userOpHash
        ]
    });
    if (!res) {
        return undefined;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUserOperationReceipt"])(res);
}
async function getZkPaymasterData(args) {
    const res = await sendBundlerRequest({
        operation: "zk_paymasterData",
        options: args.options,
        params: [
            args.transaction
        ]
    });
    return {
        paymaster: res.paymaster,
        paymasterInput: res.paymasterInput
    };
}
async function executeWithSignature(args) {
    const res = await sendBundlerRequest({
        ...args,
        operation: "tw_execute",
        params: [
            args.eoaAddress,
            args.wrappedCalls,
            args.signature,
            args.authorization
        ]
    });
    if (!res.queueId) {
        throw new Error(`Error executing 7702 transaction: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(res)}`);
    }
    return {
        transactionId: res.queueId
    };
}
async function getQueuedTransactionHash(args) {
    const res = await sendBundlerRequest({
        ...args,
        operation: "tw_getTransactionHash",
        params: [
            args.transactionId
        ]
    });
    return {
        transactionHash: res.transactionHash
    };
}
async function broadcastZkTransaction(args) {
    const res = await sendBundlerRequest({
        operation: "zk_broadcastTransaction",
        options: args.options,
        params: [
            {
                ...args.transaction,
                signedTransaction: args.signedTransaction
            }
        ]
    });
    return {
        transactionHash: res.transactionHash
    };
}
async function sendBundlerRequest(args) {
    const { options, operation, params } = args;
    const bundlerUrl = options.bundlerUrl ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultBundlerUrl"])(options.chain);
    const fetchWithHeaders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(options.client);
    const response = await fetchWithHeaders(bundlerUrl, {
        useAuthToken: true,
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])({
            id: 1,
            jsonrpc: "2.0",
            method: operation,
            params
        }),
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    });
    const res = await response.json();
    if (!response.ok || res.error) {
        let error = res.error || response.statusText;
        if (typeof error === "object") {
            error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])(error);
        }
        const code = res.code || "UNKNOWN";
        throw new Error(`${operation} error: ${error}
Status: ${response.status}
Code: ${code}`);
    }
    return res.result;
} //# sourceMappingURL=bundler.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/eip7702/minimal-account.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "create7702MinimalAccount",
    ()=>create7702MinimalAccount
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$actions$2f$get$2d$bytecode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/actions/get-bytecode.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/contract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc7702$2f$_$5f$generated_$5f2f$MinimalAccount$2f$write$2f$execute$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc7702/__generated__/MinimalAccount/write/execute.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/rpc.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$to$2d$serializable$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/to-serializable-transaction.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$withCache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/withCache.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$random$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/random.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$bundler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/bundler.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/lib/constants.js [app-client] (ecmascript)");
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
/**
 * Fetches the delegation contract address from the bundler using the tw_getDelegationContract RPC method
 * @internal
 */ async function getDelegationContractAddress(args) {
    const { client, chain, bundlerUrl } = args;
    const url = bundlerUrl ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultBundlerUrl"])(chain);
    // Create a cache key based on the bundler URL to ensure we cache per chain/bundler
    const cacheKey = `delegation-contract:${url}`;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$withCache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["withCache"])(async ()=>{
        const fetchWithHeaders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientFetch"])(client);
        const response = await fetchWithHeaders(url, {
            useAuthToken: true,
            body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringify"])({
                id: 1,
                jsonrpc: "2.0",
                method: "tw_getDelegationContract",
                params: []
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch delegation contract: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        if (result.error) {
            throw new Error(`Delegation contract RPC error: ${JSON.stringify(result.error)}`);
        }
        if (!result.result?.delegationContract) {
            throw new Error("Invalid response: missing delegationContract in result");
        }
        return result.result.delegationContract;
    }, {
        cacheKey,
        cacheTime: 24 * 60 * 60 * 1000
    });
}
const create7702MinimalAccount = (args)=>{
    const { client, adminAccount, sponsorGas } = args;
    const _sendTxWithAuthorization = async (txs)=>{
        const firstTx = txs[0];
        if (!firstTx) {
            throw new Error("No transactions provided");
        }
        const chain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(firstTx.chainId);
        const eoaContract = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getContract"])({
            address: adminAccount.address,
            chain,
            client,
            abi: MinimalAccountAbi
        });
        // check if account has been delegated already
        let authorization = firstTx.authorizationList?.[0];
        const delegationContractAddress = await getDelegationContractAddress({
            client,
            chain
        });
        if (authorization && authorization.address?.toLowerCase() !== delegationContractAddress.toLowerCase()) {
            throw new Error(`Authorization address does not match expected delegation contract address. Expected ${delegationContractAddress} but got ${authorization.address}`);
        }
        // if the tx already has an authorization, use it, otherwise sign one
        if (!authorization) {
            const isMinimalAccount = await is7702MinimalAccount(eoaContract, delegationContractAddress);
            if (!isMinimalAccount) {
                // if not, sign authorization
                let nonce = firstTx.nonce ? BigInt(firstTx.nonce) : BigInt(await getNonce({
                    client,
                    address: adminAccount.address,
                    chain
                }));
                nonce += sponsorGas ? 0n : 1n;
                const auth = await adminAccount.signAuthorization?.({
                    address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(delegationContractAddress),
                    chainId: firstTx.chainId,
                    nonce
                });
                if (!auth) {
                    throw new Error("Failed to sign authorization");
                }
                authorization = auth;
            }
        }
        if (sponsorGas) {
            // send transaction from executor, needs signature
            const wrappedCalls = {
                calls: txs.map((tx)=>({
                        data: tx.data ?? "0x",
                        target: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(tx.to ?? ""),
                        value: tx.value ?? 0n
                    })),
                uid: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$random$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["randomBytesHex"])()
            };
            const signature = await adminAccount.signTypedData({
                domain: {
                    chainId: firstTx.chainId,
                    name: "MinimalAccount",
                    verifyingContract: eoaContract.address,
                    version: "1"
                },
                message: wrappedCalls,
                primaryType: "WrappedCalls",
                types: {
                    Call: [
                        {
                            name: "target",
                            type: "address"
                        },
                        {
                            name: "value",
                            type: "uint256"
                        },
                        {
                            name: "data",
                            type: "bytes"
                        }
                    ],
                    WrappedCalls: [
                        {
                            name: "calls",
                            type: "Call[]"
                        },
                        {
                            name: "uid",
                            type: "bytes32"
                        }
                    ]
                }
            });
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$bundler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["executeWithSignature"])({
                authorization,
                eoaAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(adminAccount.address),
                options: {
                    chain: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(firstTx.chainId),
                    client
                },
                signature,
                wrappedCalls
            });
            const transactionHash = await waitForTransactionHash({
                options: {
                    chain: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCachedChain"])(firstTx.chainId),
                    client
                },
                transactionId: result.transactionId
            });
            return {
                transactionHash
            };
        }
        // send transaction from EOA
        // wrap txs in a single execute call to the MinimalAccount
        const executeTx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc7702$2f$_$5f$generated_$5f2f$MinimalAccount$2f$write$2f$execute$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["execute"])({
            calls: txs.map((tx)=>({
                    data: tx.data ?? "0x",
                    target: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(tx.to ?? ""),
                    value: tx.value ?? 0n
                })),
            contract: eoaContract,
            overrides: {
                authorizationList: authorization ? [
                    authorization
                ] : undefined,
                value: txs.reduce((acc, tx)=>acc + (tx.value ?? 0n), 0n)
            }
        });
        // re-estimate gas for the entire batch + authorization
        const serializedTx = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$to$2d$serializable$2d$transaction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toSerializableTransaction"])({
            from: adminAccount.address,
            transaction: executeTx
        });
        return adminAccount.sendTransaction(serializedTx);
    };
    const minimalAccount = {
        address: adminAccount.address,
        sendBatchTransaction: async (txs)=>{
            return _sendTxWithAuthorization(txs);
        },
        sendTransaction: async (tx)=>{
            return _sendTxWithAuthorization([
                tx
            ]);
        },
        signMessage: ({ message, originalMessage, chainId })=>adminAccount.signMessage({
                chainId,
                message,
                originalMessage
            }),
        signTypedData: (_typedData)=>adminAccount.signTypedData(_typedData),
        sendCalls: async (options)=>{
            const { inAppWalletSendCalls } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/eip5792/in-app-wallet-calls.js [app-client] (ecmascript, async loader)");
            const firstCall = options.calls[0];
            if (!firstCall) {
                throw new Error("No calls to send");
            }
            const client = firstCall.client;
            const chain = firstCall.chain || options.chain;
            const id = await inAppWalletSendCalls({
                account: minimalAccount,
                calls: options.calls,
                chain
            });
            return {
                chain,
                client,
                id
            };
        },
        getCallsStatus: async (options)=>{
            const { inAppWalletGetCallsStatus } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/eip5792/in-app-wallet-calls.js [app-client] (ecmascript, async loader)");
            return inAppWalletGetCallsStatus(options);
        },
        getCapabilities: async (options)=>{
            return {
                [options.chainId ?? 1]: {
                    atomic: {
                        status: "supported"
                    },
                    paymasterService: {
                        supported: sponsorGas ?? false
                    }
                }
            };
        }
    };
    return minimalAccount;
};
async function getNonce(args) {
    const { client, address, chain } = args;
    const rpcRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRpcClient"])({
        chain,
        client
    });
    const nonce = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_getTransactionCount.js [app-client] (ecmascript, async loader)").then(({ eth_getTransactionCount })=>eth_getTransactionCount(rpcRequest, {
            address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAddress"])(address),
            blockTag: "pending"
        }));
    return nonce;
}
async function is7702MinimalAccount(// biome-ignore lint/suspicious/noExplicitAny: TODO properly type tw contract
eoaContract, delegationContractAddress) {
    const code = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$actions$2f$get$2d$bytecode$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBytecode"])(eoaContract);
    const isDelegated = code.length > 0 && code.startsWith("0xef0100");
    const target = `0x${code.slice(8, 48)}`;
    return isDelegated && target.toLowerCase() === delegationContractAddress.toLowerCase();
}
async function waitForTransactionHash(args) {
    const timeout = args.timeoutMs || 300000; // 5mins
    const interval = args.intervalMs || 1000; // 1s
    const endtime = Date.now() + timeout;
    while(Date.now() < endtime){
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$smart$2f$lib$2f$bundler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getQueuedTransactionHash"])({
            options: args.options,
            transactionId: args.transactionId
        });
        if (result.transactionHash) {
            return result.transactionHash;
        }
        await new Promise((resolve)=>setTimeout(resolve, interval));
    }
    throw new Error(`Timeout waiting for transaction to be mined on chain ${args.options.chain.id} with transactionId: ${args.transactionId}`);
}
const MinimalAccountAbi = [
    {
        type: "receive",
        stateMutability: "payable"
    },
    {
        type: "function",
        name: "createSessionWithSig",
        inputs: [
            {
                name: "sessionSpec",
                type: "tuple",
                internalType: "struct SessionLib.SessionSpec",
                components: [
                    {
                        name: "signer",
                        type: "address",
                        internalType: "address"
                    },
                    {
                        name: "isWildcard",
                        type: "bool",
                        internalType: "bool"
                    },
                    {
                        name: "expiresAt",
                        type: "uint256",
                        internalType: "uint256"
                    },
                    {
                        name: "callPolicies",
                        type: "tuple[]",
                        internalType: "struct SessionLib.CallSpec[]",
                        components: [
                            {
                                name: "target",
                                type: "address",
                                internalType: "address"
                            },
                            {
                                name: "selector",
                                type: "bytes4",
                                internalType: "bytes4"
                            },
                            {
                                name: "maxValuePerUse",
                                type: "uint256",
                                internalType: "uint256"
                            },
                            {
                                name: "valueLimit",
                                type: "tuple",
                                internalType: "struct SessionLib.UsageLimit",
                                components: [
                                    {
                                        name: "limitType",
                                        type: "uint8",
                                        internalType: "enum SessionLib.LimitType"
                                    },
                                    {
                                        name: "limit",
                                        type: "uint256",
                                        internalType: "uint256"
                                    },
                                    {
                                        name: "period",
                                        type: "uint256",
                                        internalType: "uint256"
                                    }
                                ]
                            },
                            {
                                name: "constraints",
                                type: "tuple[]",
                                internalType: "struct SessionLib.Constraint[]",
                                components: [
                                    {
                                        name: "condition",
                                        type: "uint8",
                                        internalType: "enum SessionLib.Condition"
                                    },
                                    {
                                        name: "index",
                                        type: "uint64",
                                        internalType: "uint64"
                                    },
                                    {
                                        name: "refValue",
                                        type: "bytes32",
                                        internalType: "bytes32"
                                    },
                                    {
                                        name: "limit",
                                        type: "tuple",
                                        internalType: "struct SessionLib.UsageLimit",
                                        components: [
                                            {
                                                name: "limitType",
                                                type: "uint8",
                                                internalType: "enum SessionLib.LimitType"
                                            },
                                            {
                                                name: "limit",
                                                type: "uint256",
                                                internalType: "uint256"
                                            },
                                            {
                                                name: "period",
                                                type: "uint256",
                                                internalType: "uint256"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: "transferPolicies",
                        type: "tuple[]",
                        internalType: "struct SessionLib.TransferSpec[]",
                        components: [
                            {
                                name: "target",
                                type: "address",
                                internalType: "address"
                            },
                            {
                                name: "maxValuePerUse",
                                type: "uint256",
                                internalType: "uint256"
                            },
                            {
                                name: "valueLimit",
                                type: "tuple",
                                internalType: "struct SessionLib.UsageLimit",
                                components: [
                                    {
                                        name: "limitType",
                                        type: "uint8",
                                        internalType: "enum SessionLib.LimitType"
                                    },
                                    {
                                        name: "limit",
                                        type: "uint256",
                                        internalType: "uint256"
                                    },
                                    {
                                        name: "period",
                                        type: "uint256",
                                        internalType: "uint256"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: "uid",
                        type: "bytes32",
                        internalType: "bytes32"
                    }
                ]
            },
            {
                name: "signature",
                type: "bytes",
                internalType: "bytes"
            }
        ],
        outputs: [],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "eip712Domain",
        inputs: [],
        outputs: [
            {
                name: "fields",
                type: "bytes1",
                internalType: "bytes1"
            },
            {
                name: "name",
                type: "string",
                internalType: "string"
            },
            {
                name: "version",
                type: "string",
                internalType: "string"
            },
            {
                name: "chainId",
                type: "uint256",
                internalType: "uint256"
            },
            {
                name: "verifyingContract",
                type: "address",
                internalType: "address"
            },
            {
                name: "salt",
                type: "bytes32",
                internalType: "bytes32"
            },
            {
                name: "extensions",
                type: "uint256[]",
                internalType: "uint256[]"
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "execute",
        inputs: [
            {
                name: "calls",
                type: "tuple[]",
                internalType: "struct Call[]",
                components: [
                    {
                        name: "target",
                        type: "address",
                        internalType: "address"
                    },
                    {
                        name: "value",
                        type: "uint256",
                        internalType: "uint256"
                    },
                    {
                        name: "data",
                        type: "bytes",
                        internalType: "bytes"
                    }
                ]
            }
        ],
        outputs: [],
        stateMutability: "payable"
    },
    {
        type: "function",
        name: "executeWithSig",
        inputs: [
            {
                name: "wrappedCalls",
                type: "tuple",
                internalType: "struct WrappedCalls",
                components: [
                    {
                        name: "calls",
                        type: "tuple[]",
                        internalType: "struct Call[]",
                        components: [
                            {
                                name: "target",
                                type: "address",
                                internalType: "address"
                            },
                            {
                                name: "value",
                                type: "uint256",
                                internalType: "uint256"
                            },
                            {
                                name: "data",
                                type: "bytes",
                                internalType: "bytes"
                            }
                        ]
                    },
                    {
                        name: "uid",
                        type: "bytes32",
                        internalType: "bytes32"
                    }
                ]
            },
            {
                name: "signature",
                type: "bytes",
                internalType: "bytes"
            }
        ],
        outputs: [],
        stateMutability: "payable"
    },
    {
        type: "function",
        name: "getCallPoliciesForSigner",
        inputs: [
            {
                name: "signer",
                type: "address",
                internalType: "address"
            }
        ],
        outputs: [
            {
                name: "",
                type: "tuple[]",
                internalType: "struct SessionLib.CallSpec[]",
                components: [
                    {
                        name: "target",
                        type: "address",
                        internalType: "address"
                    },
                    {
                        name: "selector",
                        type: "bytes4",
                        internalType: "bytes4"
                    },
                    {
                        name: "maxValuePerUse",
                        type: "uint256",
                        internalType: "uint256"
                    },
                    {
                        name: "valueLimit",
                        type: "tuple",
                        internalType: "struct SessionLib.UsageLimit",
                        components: [
                            {
                                name: "limitType",
                                type: "uint8",
                                internalType: "enum SessionLib.LimitType"
                            },
                            {
                                name: "limit",
                                type: "uint256",
                                internalType: "uint256"
                            },
                            {
                                name: "period",
                                type: "uint256",
                                internalType: "uint256"
                            }
                        ]
                    },
                    {
                        name: "constraints",
                        type: "tuple[]",
                        internalType: "struct SessionLib.Constraint[]",
                        components: [
                            {
                                name: "condition",
                                type: "uint8",
                                internalType: "enum SessionLib.Condition"
                            },
                            {
                                name: "index",
                                type: "uint64",
                                internalType: "uint64"
                            },
                            {
                                name: "refValue",
                                type: "bytes32",
                                internalType: "bytes32"
                            },
                            {
                                name: "limit",
                                type: "tuple",
                                internalType: "struct SessionLib.UsageLimit",
                                components: [
                                    {
                                        name: "limitType",
                                        type: "uint8",
                                        internalType: "enum SessionLib.LimitType"
                                    },
                                    {
                                        name: "limit",
                                        type: "uint256",
                                        internalType: "uint256"
                                    },
                                    {
                                        name: "period",
                                        type: "uint256",
                                        internalType: "uint256"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "getSessionExpirationForSigner",
        inputs: [
            {
                name: "signer",
                type: "address",
                internalType: "address"
            }
        ],
        outputs: [
            {
                name: "",
                type: "uint256",
                internalType: "uint256"
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "getSessionStateForSigner",
        inputs: [
            {
                name: "signer",
                type: "address",
                internalType: "address"
            }
        ],
        outputs: [
            {
                name: "",
                type: "tuple",
                internalType: "struct SessionLib.SessionState",
                components: [
                    {
                        name: "transferValue",
                        type: "tuple[]",
                        internalType: "struct SessionLib.LimitState[]",
                        components: [
                            {
                                name: "remaining",
                                type: "uint256",
                                internalType: "uint256"
                            },
                            {
                                name: "target",
                                type: "address",
                                internalType: "address"
                            },
                            {
                                name: "selector",
                                type: "bytes4",
                                internalType: "bytes4"
                            },
                            {
                                name: "index",
                                type: "uint256",
                                internalType: "uint256"
                            }
                        ]
                    },
                    {
                        name: "callValue",
                        type: "tuple[]",
                        internalType: "struct SessionLib.LimitState[]",
                        components: [
                            {
                                name: "remaining",
                                type: "uint256",
                                internalType: "uint256"
                            },
                            {
                                name: "target",
                                type: "address",
                                internalType: "address"
                            },
                            {
                                name: "selector",
                                type: "bytes4",
                                internalType: "bytes4"
                            },
                            {
                                name: "index",
                                type: "uint256",
                                internalType: "uint256"
                            }
                        ]
                    },
                    {
                        name: "callParams",
                        type: "tuple[]",
                        internalType: "struct SessionLib.LimitState[]",
                        components: [
                            {
                                name: "remaining",
                                type: "uint256",
                                internalType: "uint256"
                            },
                            {
                                name: "target",
                                type: "address",
                                internalType: "address"
                            },
                            {
                                name: "selector",
                                type: "bytes4",
                                internalType: "bytes4"
                            },
                            {
                                name: "index",
                                type: "uint256",
                                internalType: "uint256"
                            }
                        ]
                    }
                ]
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "getTransferPoliciesForSigner",
        inputs: [
            {
                name: "signer",
                type: "address",
                internalType: "address"
            }
        ],
        outputs: [
            {
                name: "",
                type: "tuple[]",
                internalType: "struct SessionLib.TransferSpec[]",
                components: [
                    {
                        name: "target",
                        type: "address",
                        internalType: "address"
                    },
                    {
                        name: "maxValuePerUse",
                        type: "uint256",
                        internalType: "uint256"
                    },
                    {
                        name: "valueLimit",
                        type: "tuple",
                        internalType: "struct SessionLib.UsageLimit",
                        components: [
                            {
                                name: "limitType",
                                type: "uint8",
                                internalType: "enum SessionLib.LimitType"
                            },
                            {
                                name: "limit",
                                type: "uint256",
                                internalType: "uint256"
                            },
                            {
                                name: "period",
                                type: "uint256",
                                internalType: "uint256"
                            }
                        ]
                    }
                ]
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "isWildcardSigner",
        inputs: [
            {
                name: "signer",
                type: "address",
                internalType: "address"
            }
        ],
        outputs: [
            {
                name: "",
                type: "bool",
                internalType: "bool"
            }
        ],
        stateMutability: "view"
    },
    {
        type: "function",
        name: "onERC1155BatchReceived",
        inputs: [
            {
                name: "",
                type: "address",
                internalType: "address"
            },
            {
                name: "",
                type: "address",
                internalType: "address"
            },
            {
                name: "",
                type: "uint256[]",
                internalType: "uint256[]"
            },
            {
                name: "",
                type: "uint256[]",
                internalType: "uint256[]"
            },
            {
                name: "",
                type: "bytes",
                internalType: "bytes"
            }
        ],
        outputs: [
            {
                name: "",
                type: "bytes4",
                internalType: "bytes4"
            }
        ],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "onERC1155Received",
        inputs: [
            {
                name: "",
                type: "address",
                internalType: "address"
            },
            {
                name: "",
                type: "address",
                internalType: "address"
            },
            {
                name: "",
                type: "uint256",
                internalType: "uint256"
            },
            {
                name: "",
                type: "uint256",
                internalType: "uint256"
            },
            {
                name: "",
                type: "bytes",
                internalType: "bytes"
            }
        ],
        outputs: [
            {
                name: "",
                type: "bytes4",
                internalType: "bytes4"
            }
        ],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "onERC721Received",
        inputs: [
            {
                name: "",
                type: "address",
                internalType: "address"
            },
            {
                name: "",
                type: "address",
                internalType: "address"
            },
            {
                name: "",
                type: "uint256",
                internalType: "uint256"
            },
            {
                name: "",
                type: "bytes",
                internalType: "bytes"
            }
        ],
        outputs: [
            {
                name: "",
                type: "bytes4",
                internalType: "bytes4"
            }
        ],
        stateMutability: "nonpayable"
    },
    {
        type: "function",
        name: "supportsInterface",
        inputs: [
            {
                name: "interfaceId",
                type: "bytes4",
                internalType: "bytes4"
            }
        ],
        outputs: [
            {
                name: "",
                type: "bool",
                internalType: "bool"
            }
        ],
        stateMutability: "view"
    },
    {
        type: "event",
        name: "Executed",
        inputs: [
            {
                name: "to",
                type: "address",
                indexed: true,
                internalType: "address"
            },
            {
                name: "value",
                type: "uint256",
                indexed: false,
                internalType: "uint256"
            },
            {
                name: "data",
                type: "bytes",
                indexed: false,
                internalType: "bytes"
            }
        ],
        anonymous: false
    },
    {
        type: "event",
        name: "SessionCreated",
        inputs: [
            {
                name: "signer",
                type: "address",
                indexed: true,
                internalType: "address"
            },
            {
                name: "sessionSpec",
                type: "tuple",
                indexed: false,
                internalType: "struct SessionLib.SessionSpec",
                components: [
                    {
                        name: "signer",
                        type: "address",
                        internalType: "address"
                    },
                    {
                        name: "isWildcard",
                        type: "bool",
                        internalType: "bool"
                    },
                    {
                        name: "expiresAt",
                        type: "uint256",
                        internalType: "uint256"
                    },
                    {
                        name: "callPolicies",
                        type: "tuple[]",
                        internalType: "struct SessionLib.CallSpec[]",
                        components: [
                            {
                                name: "target",
                                type: "address",
                                internalType: "address"
                            },
                            {
                                name: "selector",
                                type: "bytes4",
                                internalType: "bytes4"
                            },
                            {
                                name: "maxValuePerUse",
                                type: "uint256",
                                internalType: "uint256"
                            },
                            {
                                name: "valueLimit",
                                type: "tuple",
                                internalType: "struct SessionLib.UsageLimit",
                                components: [
                                    {
                                        name: "limitType",
                                        type: "uint8",
                                        internalType: "enum SessionLib.LimitType"
                                    },
                                    {
                                        name: "limit",
                                        type: "uint256",
                                        internalType: "uint256"
                                    },
                                    {
                                        name: "period",
                                        type: "uint256",
                                        internalType: "uint256"
                                    }
                                ]
                            },
                            {
                                name: "constraints",
                                type: "tuple[]",
                                internalType: "struct SessionLib.Constraint[]",
                                components: [
                                    {
                                        name: "condition",
                                        type: "uint8",
                                        internalType: "enum SessionLib.Condition"
                                    },
                                    {
                                        name: "index",
                                        type: "uint64",
                                        internalType: "uint64"
                                    },
                                    {
                                        name: "refValue",
                                        type: "bytes32",
                                        internalType: "bytes32"
                                    },
                                    {
                                        name: "limit",
                                        type: "tuple",
                                        internalType: "struct SessionLib.UsageLimit",
                                        components: [
                                            {
                                                name: "limitType",
                                                type: "uint8",
                                                internalType: "enum SessionLib.LimitType"
                                            },
                                            {
                                                name: "limit",
                                                type: "uint256",
                                                internalType: "uint256"
                                            },
                                            {
                                                name: "period",
                                                type: "uint256",
                                                internalType: "uint256"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: "transferPolicies",
                        type: "tuple[]",
                        internalType: "struct SessionLib.TransferSpec[]",
                        components: [
                            {
                                name: "target",
                                type: "address",
                                internalType: "address"
                            },
                            {
                                name: "maxValuePerUse",
                                type: "uint256",
                                internalType: "uint256"
                            },
                            {
                                name: "valueLimit",
                                type: "tuple",
                                internalType: "struct SessionLib.UsageLimit",
                                components: [
                                    {
                                        name: "limitType",
                                        type: "uint8",
                                        internalType: "enum SessionLib.LimitType"
                                    },
                                    {
                                        name: "limit",
                                        type: "uint256",
                                        internalType: "uint256"
                                    },
                                    {
                                        name: "period",
                                        type: "uint256",
                                        internalType: "uint256"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: "uid",
                        type: "bytes32",
                        internalType: "bytes32"
                    }
                ]
            }
        ],
        anonymous: false
    },
    {
        type: "event",
        name: "ValueReceived",
        inputs: [
            {
                name: "from",
                type: "address",
                indexed: true,
                internalType: "address"
            },
            {
                name: "value",
                type: "uint256",
                indexed: false,
                internalType: "uint256"
            }
        ],
        anonymous: false
    },
    {
        type: "error",
        name: "AllowanceExceeded",
        inputs: [
            {
                name: "allowanceUsage",
                type: "uint256",
                internalType: "uint256"
            },
            {
                name: "limit",
                type: "uint256",
                internalType: "uint256"
            },
            {
                name: "period",
                type: "uint64",
                internalType: "uint64"
            }
        ]
    },
    {
        type: "error",
        name: "CallPolicyViolated",
        inputs: [
            {
                name: "target",
                type: "address",
                internalType: "address"
            },
            {
                name: "selector",
                type: "bytes4",
                internalType: "bytes4"
            }
        ]
    },
    {
        type: "error",
        name: "CallReverted",
        inputs: []
    },
    {
        type: "error",
        name: "ConditionFailed",
        inputs: [
            {
                name: "param",
                type: "bytes32",
                internalType: "bytes32"
            },
            {
                name: "refValue",
                type: "bytes32",
                internalType: "bytes32"
            },
            {
                name: "condition",
                type: "uint8",
                internalType: "uint8"
            }
        ]
    },
    {
        type: "error",
        name: "InvalidDataLength",
        inputs: [
            {
                name: "actualLength",
                type: "uint256",
                internalType: "uint256"
            },
            {
                name: "expectedLength",
                type: "uint256",
                internalType: "uint256"
            }
        ]
    },
    {
        type: "error",
        name: "InvalidSignature",
        inputs: [
            {
                name: "msgSender",
                type: "address",
                internalType: "address"
            },
            {
                name: "thisAddress",
                type: "address",
                internalType: "address"
            }
        ]
    },
    {
        type: "error",
        name: "LifetimeUsageExceeded",
        inputs: [
            {
                name: "lifetimeUsage",
                type: "uint256",
                internalType: "uint256"
            },
            {
                name: "limit",
                type: "uint256",
                internalType: "uint256"
            }
        ]
    },
    {
        type: "error",
        name: "MaxValueExceeded",
        inputs: [
            {
                name: "value",
                type: "uint256",
                internalType: "uint256"
            },
            {
                name: "maxValuePerUse",
                type: "uint256",
                internalType: "uint256"
            }
        ]
    },
    {
        type: "error",
        name: "NoCallsToExecute",
        inputs: []
    },
    {
        type: "error",
        name: "SessionExpired",
        inputs: []
    },
    {
        type: "error",
        name: "SessionExpiresTooSoon",
        inputs: []
    },
    {
        type: "error",
        name: "SessionZeroSigner",
        inputs: []
    },
    {
        type: "error",
        name: "TransferPolicyViolated",
        inputs: [
            {
                name: "target",
                type: "address",
                internalType: "address"
            }
        ]
    },
    {
        type: "error",
        name: "UIDAlreadyProcessed",
        inputs: []
    }
]; //# sourceMappingURL=minimal-account.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/wallet/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "autoConnectInAppWallet",
    ()=>autoConnectInAppWallet,
    "connectInAppWallet",
    ()=>connectInAppWallet,
    "isInAppWallet",
    ()=>isInAppWallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$ethereum$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/ethereum.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/types.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$eip7702$2f$minimal$2d$account$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/in-app/core/eip7702/minimal-account.js [app-client] (ecmascript)");
;
;
;
function isInAppWallet(wallet) {
    return wallet.id === "inApp" || wallet.id === "embedded";
}
async function connectInAppWallet(options, createOptions, connector) {
    if (// if auth mode is not specified, the default is popup
    createOptions?.auth?.mode !== "popup" && createOptions?.auth?.mode !== undefined && connector.authenticateWithRedirect) {
        const strategy = options.strategy;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socialAuthOptions"].includes(strategy)) {
            await connector.authenticateWithRedirect(strategy, createOptions?.auth?.mode, createOptions?.auth?.redirectUrl);
        }
    }
    // If we don't have authenticateWithRedirect then it's likely react native, so the default is to redirect and we can carry on
    // IF WE EVER ADD MORE CONNECTOR TYPES, this could cause redirect to be ignored despite being specified
    // TODO: In V6, make everything redirect auth
    const authResult = await connector.connect(options);
    const authAccount = authResult.user.account;
    return createInAppAccount({
        authAccount,
        client: options.client,
        createOptions,
        desiredChain: options.chain
    });
}
async function autoConnectInAppWallet(options, createOptions, connector) {
    if (options.authResult && connector.loginWithAuthToken) {
        await connector.loginWithAuthToken(options.authResult);
    }
    const user = await getAuthenticatedUser(connector);
    if (!user) {
        throw new Error("Failed to authenticate user.");
    }
    const authAccount = user.account;
    return createInAppAccount({
        authAccount,
        client: options.client,
        createOptions,
        desiredChain: options.chain
    });
}
async function convertToSmartAccount(options) {
    const { connectSmartAccount } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/smart/index.js [app-client] (ecmascript, async loader)");
    return connectSmartAccount({
        chain: options.chain,
        client: options.client,
        personalAccount: options.authAccount
    }, options.smartAccountOptions);
}
async function getAuthenticatedUser(connector) {
    const user = await connector.getUser();
    switch(user.status){
        case "Logged In, Wallet Initialized":
            {
                return user;
            }
    }
    return undefined;
}
async function createInAppAccount(options) {
    const { createOptions, authAccount, desiredChain, client } = options;
    let smartAccountOptions;
    let eip7702;
    const executionMode = createOptions && "executionMode" in createOptions ? createOptions.executionMode : undefined;
    if (executionMode) {
        if (executionMode.mode === "EIP4337") {
            smartAccountOptions = executionMode.smartAccount;
        } else if (executionMode.mode === "EIP7702") {
            eip7702 = executionMode;
        }
    }
    // backwards compatibility
    if (createOptions && "smartAccount" in createOptions && createOptions?.smartAccount) {
        smartAccountOptions = createOptions.smartAccount;
    }
    if (smartAccountOptions) {
        const [account, chain] = await convertToSmartAccount({
            authAccount,
            chain: desiredChain,
            client,
            smartAccountOptions
        });
        return {
            account,
            adminAccount: authAccount,
            chain
        };
    }
    if (eip7702) {
        const chain = desiredChain;
        if (!chain) {
            throw new Error("Chain is required for EIP-7702 execution, pass a chain when connecting the inAppWallet.");
        }
        const account = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$in$2d$app$2f$core$2f$eip7702$2f$minimal$2d$account$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create7702MinimalAccount"])({
            adminAccount: authAccount,
            client,
            sponsorGas: eip7702.sponsorGas
        });
        return {
            account,
            adminAccount: authAccount,
            chain
        };
    }
    return {
        account: authAccount,
        chain: desiredChain || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$chain$2d$definitions$2f$ethereum$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ethereum"]
    };
} //# sourceMappingURL=index.js.map
}),
]);

//# sourceMappingURL=1b50e_thirdweb_21b7581e._.js.map