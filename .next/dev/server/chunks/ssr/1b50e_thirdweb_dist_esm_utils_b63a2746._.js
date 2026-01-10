module.exports = [
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/base58/alphabet.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALPHABET",
    ()=>ALPHABET
]);
const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"; //# sourceMappingURL=alphabet.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/base58/encode.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "base58Encode",
    ()=>base58Encode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$base58$2f$alphabet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/base58/alphabet.js [app-ssr] (ecmascript)");
;
const BASE = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$base58$2f$alphabet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ALPHABET"].length;
const LEADER = /* @__PURE__ */ (()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$base58$2f$alphabet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ALPHABET"].charAt(0))();
const iFACTOR = /* @__PURE__ */ (()=>Math.log(256) / Math.log(BASE))(); // log(256) / log(BASE), rounded up
function base58Encode(source) {
    if (!(source instanceof Uint8Array)) {
        throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
        return "";
    }
    // Skip & count leading zeroes.
    let zeroes = 0;
    let length = 0;
    let pbegin = 0;
    const pend = source.length;
    while(pbegin !== pend && source[pbegin] === 0){
        pbegin++;
        zeroes++;
    }
    // Allocate enough space in big-endian base58 representation.
    const size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    const b58 = new Uint8Array(size);
    // Process the bytes.
    while(pbegin !== pend){
        let carry = source[pbegin] || 0;
        // Apply "b58 = b58 * 256 + ch".
        let i = 0;
        for(let it1 = size - 1; (carry !== 0 || i < length) && it1 !== -1; it1--, i++){
            carry += 256 * (b58[it1] || 0) >>> 0;
            b58[it1] = carry % BASE >>> 0;
            carry = carry / BASE >>> 0;
        }
        if (carry !== 0) {
            throw new Error("Non-zero carry");
        }
        length = i;
        pbegin++;
    }
    // Skip leading zeroes in base58 result.
    let it2 = size - length;
    while(it2 !== size && b58[it2] === 0){
        it2++;
    }
    // Translate the result into a string.
    let str = LEADER.repeat(zeroes);
    for(; it2 < size; ++it2){
        str += __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$base58$2f$alphabet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ALPHABET"].charAt(b58[it2] || 0);
    }
    return str;
} //# sourceMappingURL=encode.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/cbor-decode.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decode",
    ()=>decode
]);
/* biome-ignore-all lint: IGNORED */ // original source: https://github.com/kriszyp/cbor-x/blob/master/decode.js
// heavily modified to remove all non-essential code
// TODO: re-enable typescript and properly type this
// @ts-nocheck - TODO: re-enable typescript and properly type this
let src;
let srcEnd;
let position = 0;
const EMPTY_ARRAY = [];
let strings = EMPTY_ARRAY;
let stringPosition = 0;
let currentDecoder = {};
let currentStructures;
let srcString;
const srcStringStart = 0;
let srcStringEnd = 0;
let bundledStrings;
let referenceMap;
const currentExtensions = [];
let packedValues;
let dataView;
const defaultOptions = {
    mapsAsObjects: true,
    useRecords: false
};
function readFixedString(length) {
    let result;
    if (length < 16) {
        if (result = shortStringInJS(length)) return result;
    }
    if (length > 64 && decoder) return decoder.decode(src.subarray(position, position += length));
    const end = position + length;
    const units = [];
    result = "";
    while(position < end){
        const byte1 = src[position++];
        if ((byte1 & 0x80) === 0) {
            // 1 byte
            units.push(byte1);
        } else if ((byte1 & 0xe0) === 0xc0) {
            // 2 bytes
            const byte2 = src[position++] & 0x3f;
            units.push((byte1 & 0x1f) << 6 | byte2);
        } else if ((byte1 & 0xf0) === 0xe0) {
            // 3 bytes
            const byte2 = src[position++] & 0x3f;
            const byte3 = src[position++] & 0x3f;
            units.push((byte1 & 0x1f) << 12 | byte2 << 6 | byte3);
        } else if ((byte1 & 0xf8) === 0xf0) {
            // 4 bytes
            const byte2 = src[position++] & 0x3f;
            const byte3 = src[position++] & 0x3f;
            const byte4 = src[position++] & 0x3f;
            let unit = (byte1 & 0x07) << 0x12 | byte2 << 0x0c | byte3 << 0x06 | byte4;
            if (unit > 0xffff) {
                unit -= 0x10000;
                units.push(unit >>> 10 & 0x3ff | 0xd800);
                unit = 0xdc00 | unit & 0x3ff;
            }
            units.push(unit);
        } else {
            units.push(byte1);
        }
        if (units.length >= 0x1000) {
            result += fromCharCode.apply(String, units);
            units.length = 0;
        }
    }
    if (units.length > 0) {
        result += fromCharCode.apply(String, units);
    }
    return result;
}
class Decoder {
    constructor(){
        Object.assign(this, defaultOptions);
    }
    decodeKey(key) {
        return key;
    }
    decode(source, end = -1) {
        srcEnd = end > -1 ? end : source.length;
        position = 0;
        stringPosition = 0;
        srcStringEnd = 0;
        srcString = null;
        strings = EMPTY_ARRAY;
        bundledStrings = null;
        src = source;
        // this provides cached access to the data view for a buffer if it is getting reused, which is a recommend
        // technique for getting data from a database where it can be copied into an existing buffer instead of creating
        // new ones
        try {
            dataView = source.dataView || (source.dataView = new DataView(source.buffer, source.byteOffset, source.byteLength));
        } catch (error) {
            // if it doesn't have a buffer, maybe it is the wrong type of object
            src = null;
            if (source instanceof Uint8Array) {
                throw error;
            }
            throw new Error(`Source must be a Uint8Array or Buffer but was a ${source && typeof source === "object" ? source.constructor.name : typeof source}`);
        }
        if (this instanceof Decoder) {
            currentDecoder = this;
            packedValues = this.sharedValues && (this.pack ? new Array(this.maxPrivatePackedValues || 16).concat(this.sharedValues) : this.sharedValues);
            if (!currentStructures || currentStructures.length > 0) {
                currentStructures = [];
            }
        } else {
            currentDecoder = defaultOptions;
            if (!currentStructures || currentStructures.length > 0) {
                currentStructures = [];
            }
            packedValues = null;
        }
        return checkedRead();
    }
}
function checkedRead() {
    try {
        const result = read();
        if (bundledStrings) {
            if (position >= bundledStrings.postBundlePosition) {
                const error = new Error("Unexpected bundle position");
                error.incomplete = true;
                throw error;
            }
            // bundled strings to skip past
            position = bundledStrings.postBundlePosition;
            bundledStrings = null;
        }
        if (position === srcEnd) {
            // finished reading this source, cleanup references
            currentStructures = null;
            src = null;
            if (referenceMap) {
                referenceMap = null;
            }
        } else if (position > srcEnd) {
            // over read
            const error = new Error("Unexpected end of CBOR data");
            error.incomplete = true;
            throw error;
        } else {
            throw new Error("Data read, but end of buffer not reached");
        }
        // else more to read, but we are reading sequentially, so don't clear source yet
        return result;
    } catch (error) {
        clearSource();
        if (error instanceof RangeError || error.message.startsWith("Unexpected end of buffer")) {
            error.incomplete = true;
        }
        throw error;
    }
}
function read() {
    let token = src[position++];
    const majorType = token >> 5;
    token = token & 0x1f;
    if (token > 0x17) {
        switch(token){
            case 0x18:
                token = src[position++];
                break;
            default:
                throw new Error(`Unknown token ${token}`);
        }
    }
    switch(majorType){
        case 0:
            return token;
        case 1:
            return ~token;
        case 2:
            return readBin(token);
        case 3:
            if (srcStringEnd >= position) {
                return srcString.slice(position - srcStringStart, (position += token) - srcStringStart);
            }
            if (srcStringEnd === 0 && srcEnd < 140 && token < 32) {
                // for small blocks, avoiding the overhead of the extract call is helpful
                const string = token < 16 ? shortStringInJS(token) : longStringInJS(token);
                if (string !== null) {
                    return string;
                }
            }
            return readFixedString(token);
        case 4:
            {
                // array
                const array = new Array(token);
                for(let i = 0; i < token; i++){
                    array[i] = read();
                }
                return array;
            }
        case 5:
            {
                // map
                const object = {};
                for(let i = 0; i < token; i++){
                    object[safeKey(read())] = read();
                }
                return object;
            }
        default:
            if (Number.isNaN(token)) {
                const error = new Error("Unexpected end of CBOR data");
                error.incomplete = true;
                throw error;
            }
            throw new Error(`Unknown CBOR token ${token}`);
    }
}
function safeKey(key) {
    // protect against prototype pollution
    if (typeof key === "string") {
        return key === "__proto__" ? "__proto_" : key;
    }
    if (typeof key !== "object") {
        return key.toString();
    }
    // protect against expensive (DoS) string conversions
    throw new Error(`Invalid property name type ${typeof key}`);
}
const fromCharCode = String.fromCharCode;
function longStringInJS(length) {
    const start = position;
    const bytes = new Array(length);
    for(let i = 0; i < length; i++){
        const byte = src[position++];
        if ((byte & 0x80) > 0) {
            position = start;
            return;
        }
        bytes[i] = byte;
    }
    return fromCharCode.apply(String, bytes);
}
function shortStringInJS(length) {
    if (length < 4) {
        if (length < 2) {
            if (length === 0) {
                return "";
            }
            const a = src[position++];
            if ((a & 0x80) > 1) {
                position -= 1;
                return;
            }
            return fromCharCode(a);
        }
        const a = src[position++];
        const b = src[position++];
        if ((a & 0x80) > 0 || (b & 0x80) > 0) {
            position -= 2;
            return;
        }
        if (length < 3) {
            return fromCharCode(a, b);
        }
        const c = src[position++];
        if ((c & 0x80) > 0) {
            position -= 3;
            return;
        }
        return fromCharCode(a, b, c);
    }
    const a = src[position++];
    const b = src[position++];
    const c = src[position++];
    const d = src[position++];
    if ((a & 0x80) > 0 || (b & 0x80) > 0 || (c & 0x80) > 0 || (d & 0x80) > 0) {
        position -= 4;
        return;
    }
    if (length < 6) {
        if (length === 4) {
            return fromCharCode(a, b, c, d);
        }
        const e = src[position++];
        if ((e & 0x80) > 0) {
            position -= 5;
            return;
        }
        return fromCharCode(a, b, c, d, e);
    }
    if (length < 8) {
        const e = src[position++];
        const f = src[position++];
        if ((e & 0x80) > 0 || (f & 0x80) > 0) {
            position -= 6;
            return;
        }
        if (length < 7) {
            return fromCharCode(a, b, c, d, e, f);
        }
        const g = src[position++];
        if ((g & 0x80) > 0) {
            position -= 7;
            return;
        }
        return fromCharCode(a, b, c, d, e, f, g);
    }
    const e = src[position++];
    const f = src[position++];
    const g = src[position++];
    const h = src[position++];
    if ((e & 0x80) > 0 || (f & 0x80) > 0 || (g & 0x80) > 0 || (h & 0x80) > 0) {
        position -= 8;
        return;
    }
    if (length < 10) {
        if (length === 8) {
            return fromCharCode(a, b, c, d, e, f, g, h);
        }
        const i = src[position++];
        if ((i & 0x80) > 0) {
            position -= 9;
            return;
        }
        return fromCharCode(a, b, c, d, e, f, g, h, i);
    }
    if (length < 12) {
        const i = src[position++];
        const j = src[position++];
        if ((i & 0x80) > 0 || (j & 0x80) > 0) {
            position -= 10;
            return;
        }
        if (length < 11) {
            return fromCharCode(a, b, c, d, e, f, g, h, i, j);
        }
        const k = src[position++];
        if ((k & 0x80) > 0) {
            position -= 11;
            return;
        }
        return fromCharCode(a, b, c, d, e, f, g, h, i, j, k);
    }
    const i = src[position++];
    const j = src[position++];
    const k = src[position++];
    const l = src[position++];
    if ((i & 0x80) > 0 || (j & 0x80) > 0 || (k & 0x80) > 0 || (l & 0x80) > 0) {
        position -= 12;
        return;
    }
    if (length < 14) {
        if (length === 12) {
            return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l);
        }
        const m = src[position++];
        if ((m & 0x80) > 0) {
            position -= 13;
            return;
        }
        return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m);
    }
    const m = src[position++];
    const n = src[position++];
    if ((m & 0x80) > 0 || (n & 0x80) > 0) {
        position -= 14;
        return;
    }
    if (length < 15) {
        return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
    }
    const o = src[position++];
    if ((o & 0x80) > 0) {
        position -= 15;
        return;
    }
    return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o);
}
function readBin(length) {
    return currentDecoder.copyBuffers ? Uint8Array.prototype.slice.call(src, position, position += length) : src.subarray(position, position += length);
}
const glbl = {
    Error,
    RegExp
};
currentExtensions[27] = (data)=>{
    // http://cbor.schmorp.de/generic-object
    return (glbl[data[0]] || Error)(data[1], data[2]);
};
const packedTable = (read_)=>{
    if (src[position++] !== 0x84) {
        const error = new Error("Packed values structure must be followed by a 4 element array");
        if (src.length < position) {
            error.incomplete = true;
        }
        throw error;
    }
    const newPackedValues = read_(); // packed values
    if (!newPackedValues || !newPackedValues.length) {
        const error = new Error("Packed values structure must be followed by a 4 element array");
        error.incomplete = true;
        throw error;
    }
    packedValues = packedValues ? newPackedValues.concat(packedValues.slice(newPackedValues.length)) : newPackedValues;
    packedValues.prefixes = read_();
    packedValues.suffixes = read_();
    return read_(); // read the rump
};
packedTable.handlesRead = true;
currentExtensions[28] = (read_)=>{
    // shareable http://cbor.schmorp.de/value-sharing (for structured clones)
    if (!referenceMap) {
        referenceMap = new Map();
        referenceMap.id = 0;
    }
    const id = referenceMap.id++;
    const token = src[position];
    let target;
    // TODO: handle Maps, Sets, and other types that can cycle; this is complicated, because you potentially need to read
    // ahead past references to record structure definitions
    if (token >> 5 === 4) {
        target = [];
    } else {
        target = {};
    }
    const refEntry = {
        target
    }; // a placeholder object
    referenceMap.set(id, refEntry);
    const targetProperties = read_(); // read the next value as the target object to id
    if (refEntry.used) {
        // there is a cycle, so we have to assign properties to original target
        return Object.assign(target, targetProperties);
    }
    refEntry.target = targetProperties; // the placeholder wasn't used, replace with the deserialized one
    return targetProperties; // no cycle, can just use the returned read object
};
function clearSource() {
    src = null;
    referenceMap = null;
    currentStructures = null;
}
const mult10 = new Array(147); // this is a table matching binary exponents to the multiplier to determine significant digit rounding
for(let i = 0; i < 256; i++){
    mult10[i] = /* @__PURE__ */ (()=>Number(`1e${Math.floor(45.15 - i * 0.30103)}`))();
}
const defaultDecoder = new Decoder();
const decode = defaultDecoder.decode; //# sourceMappingURL=cbor-decode.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/prefix.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ensureBytecodePrefix",
    ()=>ensureBytecodePrefix
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/is-hex.js [app-ssr] (ecmascript)");
;
function ensureBytecodePrefix(bytecode) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHex"])(bytecode, {
        strict: false
    })) {
        return bytecode;
    }
    return `0x${bytecode}`;
} //# sourceMappingURL=prefix.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/extractIPFS.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractIPFSUri",
    ()=>extractIPFSUri
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$base58$2f$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/base58/encode.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$to$2d$bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/to-bytes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$cbor$2d$decode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/cbor-decode.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$prefix$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bytecode/prefix.js [app-ssr] (ecmascript)");
;
;
;
;
function extractIPFSUri(bytecode) {
    const numericBytecode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$to$2d$bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexToBytes"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$prefix$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ensureBytecodePrefix"])(bytecode));
    const cborLength = // @ts-expect-error - TS doesn't like this, but it's fine
    numericBytecode[numericBytecode.length - 2] * 0x100 + // @ts-expect-error - TS doesn't like this, but it's fine
    numericBytecode[numericBytecode.length - 1];
    const cborStart = numericBytecode.length - 2 - cborLength;
    // if the cborStart is invalid, return undefined
    if (cborStart < 0 || cborStart > numericBytecode.length) {
        return undefined;
    }
    const bytecodeBuffer = numericBytecode.slice(cborStart, -2);
    const cborData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bytecode$2f$cbor$2d$decode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decode"])(bytecodeBuffer);
    if ("ipfs" in cborData) {
        return `ipfs://${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$base58$2f$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["base58Encode"])(cborData.ipfs)}`;
    }
    return undefined;
} //# sourceMappingURL=extractIPFS.js.map
}),
];

//# sourceMappingURL=1b50e_thirdweb_dist_esm_utils_b63a2746._.js.map