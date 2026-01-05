(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/auth/core/create-login-message.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Create an EIP-4361 & CAIP-122 compliant message to sign based on the login payload
 * @param payload - The login payload containing the necessary information.
 * @returns The generated login message.
 * @internal
 */ __turbopack_context__.s([
    "createLoginMessage",
    ()=>createLoginMessage
]);
function createLoginMessage(payload) {
    const typeField = "Ethereum";
    const header = `${payload.domain} wants you to sign in with your ${typeField} account:`;
    let prefix = [
        header,
        payload.address
    ].join("\n");
    prefix = [
        prefix,
        payload.statement
    ].join("\n\n");
    if (payload.statement) {
        prefix += "\n";
    }
    const suffixArray = [];
    if (payload.uri) {
        const uriField = `URI: ${payload.uri}`;
        suffixArray.push(uriField);
    }
    const versionField = `Version: ${payload.version}`;
    suffixArray.push(versionField);
    if (payload.chain_id) {
        const chainField = `Chain ID: ${payload.chain_id}` || "1";
        suffixArray.push(chainField);
    }
    const nonceField = `Nonce: ${payload.nonce}`;
    suffixArray.push(nonceField);
    const issuedAtField = `Issued At: ${payload.issued_at}`;
    suffixArray.push(issuedAtField);
    const expiryField = `Expiration Time: ${payload.expiration_time}`;
    suffixArray.push(expiryField);
    if (payload.invalid_before) {
        const invalidBeforeField = `Not Before: ${payload.invalid_before}`;
        suffixArray.push(invalidBeforeField);
    }
    if (payload.resources) {
        suffixArray.push([
            "Resources:",
            ...payload.resources.map((x)=>`- ${x}`)
        ].join("\n"));
    }
    const suffix = suffixArray.join("\n");
    return [
        prefix,
        suffix
    ].join("\n");
} //# sourceMappingURL=create-login-message.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/auth/core/sign-login-payload.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "signLoginPayload",
    ()=>signLoginPayload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$auth$2f$core$2f$create$2d$login$2d$message$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/auth/core/create-login-message.js [app-client] (ecmascript)");
;
async function signLoginPayload(options) {
    const { payload, account } = options;
    const signature = await account.signMessage({
        message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$auth$2f$core$2f$create$2d$login$2d$message$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLoginMessage"])(payload)
    });
    return {
        payload,
        signature
    };
} //# sourceMappingURL=sign-login-payload.js.map
}),
]);

//# sourceMappingURL=1b50e_thirdweb_dist_esm_auth_core_d7df4952._.js.map