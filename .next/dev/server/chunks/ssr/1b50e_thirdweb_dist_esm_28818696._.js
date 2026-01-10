module.exports = [
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/text-decoder.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cachedTextDecoder",
    ()=>cachedTextDecoder
]);
let textDecoder;
function cachedTextDecoder() {
    if (!textDecoder) {
        textDecoder = new TextDecoder();
    }
    return textDecoder;
} //# sourceMappingURL=text-decoder.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/uint8-array.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "areUint8ArraysEqual",
    ()=>areUint8ArraysEqual,
    "base64ToString",
    ()=>base64ToString,
    "base64ToUint8Array",
    ()=>base64ToUint8Array,
    "base64UrlToBase64",
    ()=>base64UrlToBase64,
    "compareUint8Arrays",
    ()=>compareUint8Arrays,
    "concatUint8Arrays",
    ()=>concatUint8Arrays,
    "isUint8Array",
    ()=>isUint8Array,
    "uint8ArrayToBase64",
    ()=>uint8ArrayToBase64
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$text$2d$decoder$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/text-decoder.js [app-ssr] (ecmascript)");
;
const uint8ArrayStringified = "[object Uint8Array]";
/**
 * Throw a `TypeError` if the given value is not an instance of `Uint8Array`.
 * @example
 * ```ts
 * import {assertUint8Array} from 'uint8array-extras';
 *
 * try {
 * assertUint8Array(new ArrayBuffer(10)); // Throws a TypeError
 * } catch (error) {
 * console.error(error.message);
 * }
 * ```
 */ function assertUint8Array(value) {
    if (!isUint8Array(value)) {
        throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof value}\``);
    }
}
function isUint8Array(value) {
    if (!value) {
        return false;
    }
    if (value.constructor === Uint8Array) {
        return true;
    }
    return Object.prototype.toString.call(value) === uint8ArrayStringified;
}
function areUint8ArraysEqual(a, b) {
    assertUint8Array(a);
    assertUint8Array(b);
    if (a === b) {
        return true;
    }
    if (a.length !== b.length) {
        return false;
    }
    for(let index = 0; index < a.length; index++){
        if (a[index] !== b[index]) {
            return false;
        }
    }
    return true;
}
/**
 * Convert a `Uint8Array` (containing a UTF-8 string) to a string.
 *
 * Replacement for [`Buffer#toString()`](https://nodejs.org/api/buffer.html#buftostringencoding-start-end).
 * @example
 * ```ts
 * import {uint8ArrayToString} from 'uint8array-extras';
 *
 * const byteArray = new Uint8Array([72, 101, 108, 108, 111]);
 *
 * console.log(uint8ArrayToString(byteArray));
 * //=> 'Hello'
 * ```
 */ function uint8ArrayToString(array) {
    assertUint8Array(array);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$text$2d$decoder$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cachedTextDecoder"])().decode(array);
}
function assertString(value) {
    if (typeof value !== "string") {
        throw new TypeError(`Expected \`string\`, got \`${typeof value}\``);
    }
}
function base64UrlToBase64(base64url) {
    // Replace Base64URL characters with Base64 characters
    let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
    // Add padding if necessary
    const padding = base64.length % 4;
    if (padding !== 0) {
        base64 += "=".repeat(4 - padding);
    }
    return base64;
}
function base64ToUint8Array(base64String) {
    assertString(base64String);
    return Uint8Array.from(globalThis.atob(base64UrlToBase64(base64String)), // biome-ignore lint/style/noNonNullAssertion: we know that the code points exist
    (x)=>x.codePointAt(0));
}
function base64ToString(base64String) {
    assertString(base64String);
    return uint8ArrayToString(base64ToUint8Array(base64String));
}
function base64ToBase64Url(base64) {
    return base64.replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}
// Reference: https://phuoc.ng/collection/this-vs-that/concat-vs-push/
const MAX_BLOCK_SIZE = 65_535;
function uint8ArrayToBase64(array, { urlSafe = false } = {}) {
    assertUint8Array(array);
    let base64;
    if (array.length < MAX_BLOCK_SIZE) {
        // Required as `btoa` and `atob` don't properly support Unicode: https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem
        // @ts-expect-error - TS doesn't know about `String#fromCodePoint`
        base64 = globalThis.btoa(String.fromCodePoint.apply(this, array));
    } else {
        base64 = "";
        for (const value of array){
            base64 += String.fromCodePoint(value);
        }
        base64 = globalThis.btoa(base64);
    }
    return urlSafe ? base64ToBase64Url(base64) : base64;
}
function concatUint8Arrays(arrays, totalLength) {
    if (arrays.length === 0) {
        return new Uint8Array(0);
    }
    const calculatedTotalLength = totalLength ?? arrays.reduce((accumulator, currentValue)=>accumulator + currentValue.length, 0);
    const returnValue = new Uint8Array(calculatedTotalLength);
    let offset = 0;
    for (const array of arrays){
        assertUint8Array(array);
        returnValue.set(array, offset);
        offset += array.length;
    }
    return returnValue;
}
function compareUint8Arrays(a, b) {
    assertUint8Array(a);
    assertUint8Array(b);
    const length = Math.min(a.length, b.length);
    for(let index = 0; index < length; index++){
        // biome-ignore lint/style/noNonNullAssertion: we check the length above so the index is always in bounds
        const diff = a[index] - b[index];
        if (diff !== 0) {
            return Math.sign(diff);
        }
    }
    // At this point, all the compared elements are equal.
    // The shorter array should come first if the arrays are of different lengths.
    return Math.sign(a.length - b.length);
} //# sourceMappingURL=uint8-array.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/storage/upload/helpers.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildFormData",
    ()=>buildFormData,
    "extractObjectFiles",
    ()=>extractObjectFiles,
    "isFileBufferOrStringEqual",
    ()=>isFileBufferOrStringEqual,
    "isFileOrUint8Array",
    ()=>isFileOrUint8Array,
    "replaceGatewayUrlWithScheme",
    ()=>replaceGatewayUrlWithScheme,
    "replaceObjectFilesWithUris",
    ()=>replaceObjectFilesWithUris,
    "replaceObjectGatewayUrlsWithSchemes",
    ()=>replaceObjectGatewayUrlsWithSchemes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$type$2d$guards$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/type-guards.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$uint8$2d$array$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/uint8-array.js [app-ssr] (ecmascript)");
;
;
/**
 * @internal
 */ function isFileInstance(data) {
    return globalThis.File && data instanceof File;
}
/**
 * @internal
 */ function isBufferOrStringWithName(data) {
    if (!data) {
        return false;
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$type$2d$guards$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isObjectWithKeys"])(data, [
        "data",
        "name"
    ])) {
        return false;
    }
    return !!(typeof data.name === "string" && (typeof data.data === "string" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$uint8$2d$array$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isUint8Array"])(data.data)));
}
function isFileBufferOrStringEqual(input1, input2) {
    if (isFileInstance(input1) && isFileInstance(input2)) {
        // if both are File types, compare the name, size, and last modified date (best guess that these are the same files)
        if (input1.name === input2.name && input1.lastModified === input2.lastModified && input1.size === input2.size) {
            return true;
        }
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$uint8$2d$array$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isUint8Array"])(input1) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$uint8$2d$array$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isUint8Array"])(input2)) {
        // buffer gives us an easy way to compare the contents!
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$uint8$2d$array$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["areUint8ArraysEqual"])(input1, input2);
    } else if (isBufferOrStringWithName(input1) && isBufferOrStringWithName(input2)) {
        // first check the names
        if (input1.name === input2.name) {
            // if the data for both is a string, compare the strings
            if (typeof input1.data === "string" && typeof input2.data === "string") {
                return input1.data === input2.data;
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$uint8$2d$array$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isUint8Array"])(input1.data) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$uint8$2d$array$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isUint8Array"])(input2.data)) {
                // otherwise we know it's buffers, so compare the buffers
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$uint8$2d$array$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["areUint8ArraysEqual"])(input1.data, input2.data);
            }
        }
    }
    // otherwise if we have not found a match, return false
    return false;
}
function buildFormData(form, files, options) {
    const fileNameToFileMap = new Map();
    const fileNames = [];
    for(let i = 0; i < files.length; i++){
        // biome-ignore lint/style/noNonNullAssertion: we know that files[i] is not null or undefined because we are iterating over the array
        const file = files[i];
        let fileName = "";
        let fileData = file;
        if (isFileInstance(file)) {
            if (options?.rewriteFileNames) {
                let extensions = "";
                if (file.name) {
                    const extensionStartIndex = file.name.lastIndexOf(".");
                    if (extensionStartIndex > -1) {
                        extensions = file.name.substring(extensionStartIndex);
                    }
                }
                fileName = `${i + options.rewriteFileNames.fileStartNumber}${extensions}`;
            } else {
                fileName = `${file.name}`;
            }
        } else if (isBufferOrStringWithName(file)) {
            fileData = file.data;
            if (options?.rewriteFileNames) {
                fileName = `${i + options.rewriteFileNames.fileStartNumber}`;
            } else {
                fileName = `${file.name}`;
            }
        } else {
            if (options?.rewriteFileNames) {
                fileName = `${i + options.rewriteFileNames.fileStartNumber}`;
            } else {
                fileName = `${i}`;
            }
        }
        // If we don't want to wrap with directory, adjust the filepath
        const filepath = options?.uploadWithoutDirectory ? "files" : `files/${fileName}`;
        if (fileNameToFileMap.has(fileName)) {
            // if the file in the map is the same as the file we are already looking at then just skip and continue
            if (isFileBufferOrStringEqual(fileNameToFileMap.get(fileName), file)) {
                // we add it to the filenames array so that we can return the correct number of urls,
                fileNames.push(fileName);
                continue;
            }
            // otherwise if file names are the same but they are not the same file then we should throw an error (trying to upload to different files but with the same names)
            throw new Error(`[DUPLICATE_FILE_NAME_ERROR] File name ${fileName} was passed for more than one different file.`);
        }
        // add it to the map so that we can check for duplicates
        fileNameToFileMap.set(fileName, file);
        // add it to the filenames array so that we can return the correct number of urls
        fileNames.push(fileName);
        form.append("file", new Blob([
            fileData
        ]), filepath);
    }
    const metadata = {
        keyvalues: {
            ...options?.metadata
        },
        name: "Storage SDK"
    };
    form.append("pinataMetadata", JSON.stringify(metadata));
    if (options?.uploadWithoutDirectory) {
        form.append("pinataOptions", JSON.stringify({
            wrapWithDirectory: false
        }));
    }
    return {
        // encode the file names on the way out (which is what the upload backend expects)
        fileNames: fileNames.map((fName)=>encodeURIComponent(fName)),
        form
    };
}
function isFileOrUint8Array(data) {
    return isFileInstance(data) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$uint8$2d$array$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isUint8Array"])(data) || isBufferOrStringWithName(data);
}
function extractObjectFiles(data, files = []) {
    // If item is a FileOrBuffer add it to our list of files
    if (isFileOrUint8Array(data)) {
        files.push(data);
        return files;
    }
    if (typeof data === "object") {
        if (!data) {
            return files;
        }
        if (Array.isArray(data)) {
            for (const entry of data){
                extractObjectFiles(entry, files);
            }
        } else {
            Object.keys(data).map((key)=>extractObjectFiles(data[key], files));
        }
    }
    return files;
}
function replaceObjectFilesWithUris(data, uris) {
    if (isFileOrUint8Array(data)) {
        if (uris.length) {
            return uris.shift();
        }
        console.warn("Not enough URIs to replace all files in object.");
    }
    if (typeof data === "object") {
        if (!data) {
            return data;
        }
        if (Array.isArray(data)) {
            return data.map((entry)=>replaceObjectFilesWithUris(entry, uris));
        }
        return Object.fromEntries(Object.entries(data).map(([key, value])=>[
                key,
                replaceObjectFilesWithUris(value, uris)
            ]));
    }
    return data;
}
function replaceGatewayUrlWithScheme(url) {
    if (url.includes("/ipfs/")) {
        const hash = url.split("/ipfs/")[1];
        return `ipfs://${hash}`;
    }
    return url;
}
function replaceObjectGatewayUrlsWithSchemes(data) {
    if (typeof data === "string") {
        return replaceGatewayUrlWithScheme(data);
    }
    if (typeof data === "object") {
        if (!data) {
            return data;
        }
        if (isFileOrUint8Array(data)) {
            return data;
        }
        if (Array.isArray(data)) {
            return data.map((entry)=>replaceObjectGatewayUrlsWithSchemes(entry));
        }
        return Object.fromEntries(Object.entries(data).map(([key, value])=>[
                key,
                replaceObjectGatewayUrlsWithSchemes(value)
            ]));
    }
    return data;
} //# sourceMappingURL=helpers.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/storage/upload.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "upload",
    ()=>upload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$detect$2d$platform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/detect-platform.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$storage$2f$upload$2f$helpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/storage/upload/helpers.js [app-ssr] (ecmascript)");
;
;
;
async function upload(options) {
    // deal with the different file types
    // if there are no files, return an empty array immediately
    if (options.files.length === 0) {
        return null;
    }
    // handle file arrays
    const isFileArray = options.files.map((item)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$storage$2f$upload$2f$helpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFileOrUint8Array"])(item) || typeof item === "string").every((item)=>!!item);
    let uris;
    if (isFileArray) {
        // if we already have an array of files, we can just pass it through
        uris = options.files;
    } else {
        // otherwise we have to process them first
        let cleaned = options.files;
        // Replace any gateway URLs with their hashes
        cleaned = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$storage$2f$upload$2f$helpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["replaceObjectGatewayUrlsWithSchemes"])(cleaned);
        // Recurse through data and extract files to upload
        const files = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$storage$2f$upload$2f$helpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractObjectFiles"])(cleaned);
        if (files.length) {
            // Upload all files that came from the object
            const uris_ = await upload({
                ...options,
                files
            });
            // Recurse through data and replace files with hashes
            cleaned = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$storage$2f$upload$2f$helpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["replaceObjectFilesWithUris"])(cleaned, // always pass an array even if the underlying upload returns a single uri
            Array.isArray(uris_) ? uris_ : [
                uris_
            ]);
        }
        uris = cleaned.map((item)=>{
            if (typeof item === "string") {
                return item;
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringify"])(item);
        });
    }
    // end deal with the different file types
    const form_ = new FormData();
    const { fileNames, form } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$storage$2f$upload$2f$helpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildFormData"])(form_, uris, options);
    const platform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$detect$2d$platform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["detectPlatform"])();
    if (platform === "browser" || platform === "node") {
        const { uploadBatch } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/storage/upload/web-node.js [app-ssr] (ecmascript, async loader)");
        const uris = await uploadBatch(options.client, form, fileNames, options);
        // if we only passed a single file, return its URI directly
        if (options.files.length === 1) {
            return uris[0];
        }
        return uris;
    }
    throw new Error("Please, use the uploadMobile function in mobile environments.");
} //# sourceMappingURL=upload.js.map
}),
];

//# sourceMappingURL=1b50e_thirdweb_dist_esm_28818696._.js.map