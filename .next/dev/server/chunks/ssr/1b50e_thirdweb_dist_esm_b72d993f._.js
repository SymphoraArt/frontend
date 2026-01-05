module.exports = [
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/x402/permitSignatureStorage.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearPermitSignatureFromCache",
    ()=>clearPermitSignatureFromCache,
    "getPermitSignatureFromCache",
    ()=>getPermitSignatureFromCache,
    "savePermitSignatureToCache",
    ()=>savePermitSignatureToCache
]);
const CACHE_KEY_PREFIX = "x402:permit";
/**
 * Generates a cache key for permit signature storage
 * @param params - The parameters to generate the cache key from
 * @returns The cache key string
 */ function getPermitCacheKey(params) {
    return `${CACHE_KEY_PREFIX}:${params.chainId}:${params.asset.toLowerCase()}:${params.owner.toLowerCase()}:${params.spender.toLowerCase()}`;
}
async function getPermitSignatureFromCache(storage, params) {
    try {
        const key = getPermitCacheKey(params);
        const cached = await storage.getItem(key);
        if (!cached) {
            return null;
        }
        return JSON.parse(cached);
    } catch  {
        return null;
    }
}
async function savePermitSignatureToCache(storage, params, payload, deadline, maxAmount) {
    try {
        const key = getPermitCacheKey(params);
        const data = {
            payload,
            deadline,
            maxAmount
        };
        await storage.setItem(key, JSON.stringify(data));
    } catch  {
    // Silently fail - caching is optional
    }
}
async function clearPermitSignatureFromCache(storage, params) {
    try {
        const key = getPermitCacheKey(params);
        await storage.removeItem(key);
    } catch  {
    // Silently fail
    }
} //# sourceMappingURL=permitSignatureStorage.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/x402/types.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PaymentSchemeSchema",
    ()=>PaymentSchemeSchema,
    "x402Version",
    ()=>x402Version
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/zod/index.js [app-ssr] (ecmascript) <locals>");
;
const x402Version = 1;
const PaymentSchemeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].union([
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].literal("exact"),
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].literal("upto")
]); //# sourceMappingURL=types.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/x402/schemas.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RequestedPaymentRequirementsSchema",
    ()=>RequestedPaymentRequirementsSchema,
    "SupportedSignatureTypeSchema",
    ()=>SupportedSignatureTypeSchema,
    "extractEvmChainId",
    ()=>extractEvmChainId,
    "networkToCaip2ChainId",
    ()=>networkToCaip2ChainId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/x402/dist/esm/types/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$QA4WG5II$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/x402/dist/esm/chunk-QA4WG5II.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/zod/v3/external.js [app-ssr] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/x402/types.js [app-ssr] (ecmascript)");
;
;
;
const FacilitatorNetworkSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string();
const RequestedPaymentPayloadSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$QA4WG5II$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaymentPayloadSchema"].extend({
    network: FacilitatorNetworkSchema,
    scheme: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaymentSchemeSchema"]
});
const RequestedPaymentRequirementsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$QA4WG5II$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaymentRequirementsSchema"].extend({
    network: FacilitatorNetworkSchema,
    scheme: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaymentSchemeSchema"]
});
const FacilitatorSettleResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$QA4WG5II$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SettleResponseSchema"].extend({
    network: FacilitatorNetworkSchema,
    errorMessage: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    fundWalletLink: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    allowance: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    balance: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const FacilitatorVerifyResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$QA4WG5II$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VerifyResponseSchema"].extend({
    errorMessage: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    fundWalletLink: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    allowance: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    balance: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
});
const SupportedSignatureTypeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
    "TransferWithAuthorization",
    "Permit"
]);
const FacilitatorSupportedAssetSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    address: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    decimals: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    eip712: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        name: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        primaryType: SupportedSignatureTypeSchema
    })
});
const FacilitatorSupportedResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$QA4WG5II$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SupportedPaymentKindsResponseSchema"].extend({
    kinds: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        x402Version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].literal(1),
        scheme: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PaymentSchemeSchema"],
        network: FacilitatorNetworkSchema,
        extra: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
            defaultAsset: FacilitatorSupportedAssetSchema.optional(),
            supportedAssets: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(FacilitatorSupportedAssetSchema).optional()
        }).optional()
    }))
}).describe("Supported payment kinds for this facilitator");
function isEvmChain(caip2ChainId) {
    return caip2ChainId.startsWith("eip155:");
}
function extractEvmChainId(caip2ChainId) {
    if (!isEvmChain(caip2ChainId)) {
        return null;
    }
    const parts = caip2ChainId.split(":");
    const chainId = Number(parts[1]);
    return Number.isNaN(chainId) ? null : chainId;
}
/**
 * CAIP-2 compliant blockchain identifier
 * @see https://chainagnostic.org/CAIPs/caip-2
 */ const Caip2ChainIdSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive()
]).transform((value, ctx)=>{
    // Handle proper CAIP-2 format (already valid)
    if (typeof value === "string" && value.includes(":")) {
        const [namespace, reference] = value.split(":");
        // Solana mainnet/devnet aliases
        if (namespace === "solana" && reference === "mainnet") {
            return "solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ";
        }
        if (namespace === "solana" && reference === "devnet") {
            return "solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K";
        }
        // Validate CAIP-2 format
        const namespaceRegex = /^[-a-z0-9]{3,8}$/;
        const referenceRegex = /^[-_a-zA-Z0-9]{1,32}$/;
        if (!namespaceRegex.test(namespace ?? "")) {
            ctx.addIssue({
                code: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodIssueCode.custom,
                message: `Invalid CAIP-2 namespace: ${namespace}. Must match [-a-z0-9]{3,8}`
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].NEVER;
        }
        if (!referenceRegex.test(reference ?? "")) {
            ctx.addIssue({
                code: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodIssueCode.custom,
                message: `Invalid CAIP-2 reference: ${reference}. Must match [-_a-zA-Z0-9]{1,32}`
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].NEVER;
        }
        return value;
    }
    // Handle number (EVM chain ID fallback)
    if (typeof value === "number") {
        return `eip155:${value}`;
    }
    // Handle string number (EVM chain ID fallback)
    const numValue = Number(value);
    if (!Number.isNaN(numValue) && Number.isInteger(numValue) && numValue > 0) {
        return `eip155:${numValue}`;
    }
    const mappedChainId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$x402$2f$dist$2f$esm$2f$chunk$2d$QA4WG5II$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EvmNetworkToChainId"].get(value);
    if (mappedChainId) {
        return `eip155:${mappedChainId}`;
    }
    ctx.addIssue({
        code: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodIssueCode.custom,
        message: `Invalid chain ID: ${value}. Must be a CAIP-2 identifier (e.g., "eip155:1", "solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ"), a numeric chain ID for EVM, or "solana:mainnet"/"solana:devnet"`
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].NEVER;
}).describe("CAIP-2 blockchain identifier (e.g., 'eip155:1' for Ethereum, 'solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ' for Solana mainnet). Also accepts numeric EVM chain IDs (e.g., 1, 137) or aliases ('solana:mainnet', 'solana:devnet') for backward compatibility.");
function networkToCaip2ChainId(network) {
    if (typeof network === "object") {
        return `eip155:${network.id}`;
    }
    return Caip2ChainIdSchema.parse(network);
} //# sourceMappingURL=schemas.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/x402/encode.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Encodes a payment payload into a base64 string, ensuring bigint values are properly stringified
 *
 * @param payment - The payment payload to encode
 * @returns A base64 encoded string representation of the payment payload
 */ __turbopack_context__.s([
    "decodePayment",
    ()=>decodePayment,
    "encodePayment",
    ()=>encodePayment,
    "safeBase64Encode",
    ()=>safeBase64Encode
]);
function encodePayment(payment) {
    let safe;
    // evm
    const evmPayload = payment.payload;
    safe = {
        ...payment,
        payload: {
            ...evmPayload,
            authorization: Object.fromEntries(Object.entries(evmPayload.authorization).map(([key, value])=>[
                    key,
                    typeof value === "bigint" ? value.toString() : value
                ]))
        }
    };
    return safeBase64Encode(JSON.stringify(safe));
}
function decodePayment(payment) {
    const decoded = safeBase64Decode(payment);
    const parsed = JSON.parse(decoded);
    const obj = {
        ...parsed,
        payload: parsed.payload
    };
    return obj;
}
function safeBase64Encode(data) {
    if (typeof globalThis !== "undefined" && typeof globalThis.btoa === "function") {
        return globalThis.btoa(data);
    }
    return Buffer.from(data).toString("base64");
}
/**
 * Decodes a base64 string back to its original format
 *
 * @param data - The base64 encoded string to be decoded
 * @returns The decoded string in UTF-8 format
 */ function safeBase64Decode(data) {
    if (typeof globalThis !== "undefined" && typeof globalThis.atob === "function") {
        return globalThis.atob(data);
    }
    return Buffer.from(data, "base64").toString("utf-8");
} //# sourceMappingURL=encode.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/x402/common.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decodePaymentRequest",
    ()=>decodePaymentRequest,
    "getSupportedSignatureType",
    ()=>getSupportedSignatureType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toFunctionSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/hash/toFunctionSelector.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$actions$2f$resolve$2d$abi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/actions/resolve-abi.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/contract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc20$2f$_$5f$generated_$5f2f$IERC20Permit$2f$write$2f$permit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc20/__generated__/IERC20Permit/write/permit.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc20$2f$_$5f$generated_$5f2f$USDC$2f$write$2f$transferWithAuthorization$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc20/__generated__/USDC/write/transferWithAuthorization.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/x402/encode.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/x402/schemas.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/x402/types.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
async function decodePaymentRequest(args) {
    const { facilitator, routeConfig = {}, paymentData } = args;
    const { errorMessages } = routeConfig;
    const paymentRequirementsResult = await facilitator.accepts(args);
    // Check for payment header, if none, return the payment requirements
    if (!paymentData) {
        return paymentRequirementsResult;
    }
    const paymentRequirements = paymentRequirementsResult.responseBody.accepts;
    // decode b64 payment
    let decodedPayment;
    try {
        decodedPayment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodePayment"])(paymentData);
        decodedPayment.x402Version = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["x402Version"];
    } catch (error) {
        return {
            status: 402,
            responseHeaders: {
                "Content-Type": "application/json"
            },
            responseBody: {
                x402Version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["x402Version"],
                error: errorMessages?.invalidPayment || (error instanceof Error ? error.message : "Invalid payment"),
                accepts: paymentRequirements
            }
        };
    }
    const selectedPaymentRequirements = paymentRequirements.find((value)=>value.scheme === decodedPayment.scheme && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["networkToCaip2ChainId"])(value.network) === (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["networkToCaip2ChainId"])(decodedPayment.network));
    if (!selectedPaymentRequirements) {
        return {
            status: 402,
            responseHeaders: {
                "Content-Type": "application/json"
            },
            responseBody: {
                x402Version: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["x402Version"],
                error: errorMessages?.noMatchingRequirements || "Unable to find matching payment requirements",
                accepts: paymentRequirements
            }
        };
    }
    return {
        status: 200,
        paymentRequirements,
        decodedPayment,
        selectedPaymentRequirements
    };
}
async function getSupportedSignatureType(args) {
    const primaryType = args.eip712Extras?.primaryType;
    if (primaryType === "Permit" || primaryType === "TransferWithAuthorization") {
        return primaryType;
    }
    // not specified, so we need to detect it
    const abi = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$actions$2f$resolve$2d$abi$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveContractAbi"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContract"])({
        client: args.client,
        address: args.asset,
        chain: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedChain"])(args.chainId)
    })).catch((error)=>{
        console.error("Error resolving contract ABI", error);
        return [];
    });
    const selectors = abi.filter((f)=>f.type === "function").map((f)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toFunctionSelector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toFunctionSelector"])(f));
    const hasPermit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc20$2f$_$5f$generated_$5f2f$IERC20Permit$2f$write$2f$permit$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isPermitSupported"])(selectors);
    const hasTransferWithAuthorization = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc20$2f$_$5f$generated_$5f2f$USDC$2f$write$2f$transferWithAuthorization$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isTransferWithAuthorizationSupported"])(selectors);
    // prefer transferWithAuthorization over permit
    if (hasTransferWithAuthorization) {
        return "TransferWithAuthorization";
    }
    if (hasPermit) {
        return "Permit";
    }
    return undefined;
} //# sourceMappingURL=common.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/x402/sign.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createPaymentHeader",
    ()=>createPaymentHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/encoding/fromHex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/contract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc20$2f$_$5f$generated_$5f2f$IERC20$2f$read$2f$allowance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc20/__generated__/IERC20/read/allowance.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc20$2f$_$5f$generated_$5f2f$IERC20Permit$2f$read$2f$nonces$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc20/__generated__/IERC20Permit/read/nonces.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$common$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/x402/common.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/x402/encode.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$permitSignatureStorage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/x402/permitSignatureStorage.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/x402/schemas.js [app-ssr] (ecmascript)");
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
 * Prepares an unsigned payment header with the given sender address and payment requirements.
 *
 * @param from - The sender's address from which the payment will be made
 * @param x402Version - The version of the X402 protocol to use
 * @param paymentRequirements - The payment requirements containing scheme and network information
 * @returns An unsigned payment payload containing authorization details
 */ function preparePaymentHeader(from, x402Version, paymentRequirements, nonce) {
    const validAfter = BigInt(Math.floor(Date.now() / 1000) - 86400).toString();
    const validBefore = BigInt(Math.floor(Date.now() / 1000 + paymentRequirements.maxTimeoutSeconds)).toString();
    return {
        x402Version,
        scheme: paymentRequirements.scheme,
        network: paymentRequirements.network,
        payload: {
            signature: undefined,
            authorization: {
                from,
                to: paymentRequirements.payTo,
                value: paymentRequirements.maxAmountRequired,
                validAfter: validAfter.toString(),
                validBefore: validBefore.toString(),
                nonce: nonce
            }
        }
    };
}
/**
 * Signs a payment header using the provided client and payment requirements.
 *
 * @param client - The signer wallet instance used to sign the payment header
 * @param paymentRequirements - The payment requirements containing scheme and network information
 * @param unsignedPaymentHeader - The unsigned payment payload to be signed
 * @param storage - Optional storage for caching permit signatures (for "upto" scheme)
 * @returns A promise that resolves to the signed payment payload
 */ async function signPaymentHeader(client, account, paymentRequirements, x402Version, storage) {
    const from = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(account.address);
    const caip2ChainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["networkToCaip2ChainId"])(paymentRequirements.network);
    const chainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractEvmChainId"])(caip2ChainId);
    // TODO (402): support solana
    if (chainId === null) {
        throw new Error(`Unsupported chain ID: ${paymentRequirements.network}`);
    }
    const supportedSignatureType = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$common$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupportedSignatureType"])({
        client,
        asset: paymentRequirements.asset,
        chainId: chainId,
        eip712Extras: paymentRequirements.extra
    });
    switch(supportedSignatureType){
        case "Permit":
            {
                const shouldCache = paymentRequirements.scheme === "upto" && storage !== undefined;
                const spender = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(paymentRequirements.payTo);
                const cacheParams = {
                    chainId,
                    asset: paymentRequirements.asset,
                    owner: from,
                    spender
                };
                // Try to reuse cached signature for "upto" scheme
                if (shouldCache && storage) {
                    const cached = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$permitSignatureStorage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPermitSignatureFromCache"])(storage, cacheParams);
                    if (cached) {
                        // Validate deadline hasn't passed
                        const now = BigInt(Math.floor(Date.now() / 1000));
                        if (BigInt(cached.deadline) > now) {
                            // Check on-chain allowance
                            const currentAllowance = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc20$2f$_$5f$generated_$5f2f$IERC20$2f$read$2f$allowance$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["allowance"])({
                                contract: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContract"])({
                                    address: paymentRequirements.asset,
                                    chain: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedChain"])(chainId),
                                    client
                                }),
                                owner: from,
                                spender
                            });
                            // Determine threshold - use minAmountRequired if present, else maxAmountRequired
                            const extra = paymentRequirements.extra;
                            const threshold = extra?.minAmountRequired ? BigInt(extra.minAmountRequired) : BigInt(paymentRequirements.maxAmountRequired);
                            // If allowance >= threshold, reuse signature
                            if (currentAllowance >= threshold) {
                                return cached.payload;
                            }
                        }
                    }
                }
                // Generate new signature
                const nonce = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$extensions$2f$erc20$2f$_$5f$generated_$5f2f$IERC20Permit$2f$read$2f$nonces$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nonces"])({
                    contract: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContract"])({
                        address: paymentRequirements.asset,
                        chain: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedChain"])(chainId),
                        client: client
                    }),
                    owner: from
                });
                const unsignedPaymentHeader = preparePaymentHeader(from, x402Version, paymentRequirements, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(nonce, {
                    size: 32
                }));
                const { signature } = await signERC2612Permit(account, unsignedPaymentHeader.payload.authorization, paymentRequirements);
                const signedPayload = {
                    ...unsignedPaymentHeader,
                    payload: {
                        ...unsignedPaymentHeader.payload,
                        signature
                    }
                };
                // Cache the signature for "upto" scheme
                if (shouldCache && storage) {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$permitSignatureStorage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["savePermitSignatureToCache"])(storage, cacheParams, signedPayload, unsignedPaymentHeader.payload.authorization.validBefore, paymentRequirements.maxAmountRequired);
                }
                return signedPayload;
            }
        case "TransferWithAuthorization":
            {
                // default to transfer with authorization
                const nonce = await createNonce();
                const unsignedPaymentHeader = preparePaymentHeader(from, x402Version, paymentRequirements, nonce);
                const { signature } = await signERC3009Authorization(account, unsignedPaymentHeader.payload.authorization, paymentRequirements);
                return {
                    ...unsignedPaymentHeader,
                    payload: {
                        ...unsignedPaymentHeader.payload,
                        signature
                    }
                };
            }
        default:
            throw new Error(`No supported payment authorization methods found on ${paymentRequirements.asset} on chain ${paymentRequirements.network}`);
    }
}
async function createPaymentHeader(client, account, paymentRequirements, x402Version, storage) {
    const payment = await signPaymentHeader(client, account, paymentRequirements, x402Version, storage);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodePayment"])(payment);
}
/**
 * Signs an EIP-3009 authorization for USDC transfer
 *
 * @param walletClient - The wallet client that will sign the authorization
 * @param params - The authorization parameters containing transfer details
 * @param params.from - The address tokens will be transferred from
 * @param params.to - The address tokens will be transferred to
 * @param params.value - The amount of USDC tokens to transfer (in base units)
 * @param params.validAfter - Unix timestamp after which the authorization becomes valid
 * @param params.validBefore - Unix timestamp before which the authorization is valid
 * @param params.nonce - Random 32-byte nonce to prevent replay attacks
 * @param paymentRequirements - The payment requirements containing asset and network information
 * @param paymentRequirements.asset - The address of the USDC contract
 * @param paymentRequirements.network - The network where the USDC contract exists
 * @param paymentRequirements.extra - The extra information containing the name and version of the ERC20 contract
 * @returns The signature for the authorization
 */ async function signERC3009Authorization(account, { from, to, value, validAfter, validBefore, nonce }, { asset, network, extra }) {
    const chainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractEvmChainId"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["networkToCaip2ChainId"])(network));
    if (chainId === null) {
        throw new Error(`Unsupported chain ID: ${network}`);
    }
    const name = extra?.name;
    const version = extra?.version;
    const signature = await account.signTypedData({
        types: {
            TransferWithAuthorization: [
                {
                    name: "from",
                    type: "address"
                },
                {
                    name: "to",
                    type: "address"
                },
                {
                    name: "value",
                    type: "uint256"
                },
                {
                    name: "validAfter",
                    type: "uint256"
                },
                {
                    name: "validBefore",
                    type: "uint256"
                },
                {
                    name: "nonce",
                    type: "bytes32"
                }
            ]
        },
        domain: {
            name,
            version,
            chainId,
            verifyingContract: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(asset)
        },
        primaryType: "TransferWithAuthorization",
        message: {
            from: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(from),
            to: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(to),
            value: BigInt(value),
            validAfter: BigInt(validAfter),
            validBefore: BigInt(validBefore),
            nonce: nonce
        }
    });
    return {
        signature
    };
}
async function signERC2612Permit(account, { from, to, value, validBefore, nonce }, { asset, network, extra }) {
    const chainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractEvmChainId"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["networkToCaip2ChainId"])(network));
    if (chainId === null) {
        throw new Error(`Unsupported chain ID: ${network}`);
    }
    const name = extra?.name;
    const version = extra?.version;
    if (!name || !version) {
        throw new Error("name and version are required in PaymentRequirements extra to pay with permit-based assets");
    }
    //Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline
    const signature = await account.signTypedData({
        types: {
            Permit: [
                {
                    name: "owner",
                    type: "address"
                },
                {
                    name: "spender",
                    type: "address"
                },
                {
                    name: "value",
                    type: "uint256"
                },
                {
                    name: "nonce",
                    type: "uint256"
                },
                {
                    name: "deadline",
                    type: "uint256"
                }
            ]
        },
        domain: {
            name,
            version,
            chainId,
            verifyingContract: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(asset)
        },
        primaryType: "Permit",
        message: {
            owner: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(from),
            spender: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(to),
            value: BigInt(value),
            nonce: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexToBigInt"])(nonce),
            deadline: BigInt(validBefore)
        }
    });
    return {
        signature
    };
}
/**
 * Generates a random 32-byte nonce for use in authorization signatures
 *
 * @returns A random 32-byte nonce as a hex string
 */ async function createNonce() {
    const cryptoObj = typeof globalThis.crypto !== "undefined" && typeof globalThis.crypto.getRandomValues === "function" ? globalThis.crypto : // eslint-disable-next-line @typescript-eslint/no-require-imports
    __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)").webcrypto;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(cryptoObj.getRandomValues(new Uint8Array(32)));
} //# sourceMappingURL=sign.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/x402/fetchWithPayment.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "wrapFetchWithPayment",
    ()=>wrapFetchWithPayment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$webStorage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/storage/webStorage.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$permitSignatureStorage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/x402/permitSignatureStorage.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/x402/schemas.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/x402/sign.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
function wrapFetchWithPayment(fetch, client, wallet, options) {
    return async (input, init)=>{
        const response = await fetch(input, init);
        if (response.status !== 402) {
            return response;
        }
        const { x402Version, accepts, error } = await response.json();
        const parsedPaymentRequirements = accepts.map((x)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestedPaymentRequirementsSchema"].parse(x));
        const account = wallet.getAccount();
        let chain = wallet.getChain();
        if (!account || !chain) {
            throw new Error("Wallet not connected. Please connect your wallet to continue.");
        }
        const selectedPaymentRequirements = options?.paymentRequirementsSelector ? options.paymentRequirementsSelector(parsedPaymentRequirements) : defaultPaymentRequirementsSelector(parsedPaymentRequirements, chain.id, error);
        if (!selectedPaymentRequirements) {
            throw new Error(`No suitable payment requirements found for chain ${chain.id}. ${error}`);
        }
        if (options?.maxValue && BigInt(selectedPaymentRequirements.maxAmountRequired) > options.maxValue) {
            throw new Error(`Payment amount exceeds maximum allowed (currently set to ${options.maxValue} in base units)`);
        }
        const caip2ChainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["networkToCaip2ChainId"])(selectedPaymentRequirements.network);
        const paymentChainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractEvmChainId"])(caip2ChainId);
        // TODO (402): support solana
        if (paymentChainId === null) {
            throw new Error(`Unsupported chain ID: ${selectedPaymentRequirements.network}`);
        }
        // switch to the payment chain if it's not the current chain
        if (paymentChainId !== chain.id) {
            await wallet.switchChain((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedChain"])(paymentChainId));
            chain = wallet.getChain();
            if (!chain) {
                throw new Error(`Failed to switch chain (${paymentChainId})`);
            }
        }
        const paymentHeader = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPaymentHeader"])(client, account, selectedPaymentRequirements, x402Version, options?.storage ?? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$storage$2f$webStorage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["webLocalStorage"]);
        const initParams = init || {};
        if (initParams.__is402Retry) {
            throw new Error("Payment already attempted");
        }
        const newInit = {
            ...initParams,
            headers: {
                ...initParams.headers || {},
                "X-PAYMENT": paymentHeader,
                "Access-Control-Expose-Headers": "X-PAYMENT-RESPONSE"
            },
            __is402Retry: true
        };
        const secondResponse = await fetch(input, newInit);
        // If payment was rejected (still 402), clear cached signature
        if (secondResponse.status === 402 && options?.storage) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$permitSignatureStorage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearPermitSignatureFromCache"])(options.storage, {
                chainId: paymentChainId,
                asset: selectedPaymentRequirements.asset,
                owner: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(account.address),
                spender: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(selectedPaymentRequirements.payTo)
            });
        }
        return secondResponse;
    };
}
function defaultPaymentRequirementsSelector(paymentRequirements, chainId, error) {
    if (!paymentRequirements.length) {
        throw new Error(`No valid payment requirements found in server 402 response. ${error}`);
    }
    // find the payment requirements matching the connected wallet chain
    const matchingPaymentRequirements = paymentRequirements.find((x)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractEvmChainId"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$x402$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["networkToCaip2ChainId"])(x.network)) === chainId);
    if (matchingPaymentRequirements) {
        return matchingPaymentRequirements;
    } else {
        // if no matching payment requirements, use the first payment requirement
        // and switch the wallet to that chain
        const firstPaymentRequirement = paymentRequirements[0];
        return firstPaymentRequirement;
    }
} //# sourceMappingURL=fetchWithPayment.js.map
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_getBalance.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "eth_getBalance",
    ()=>eth_getBalance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-ssr] (ecmascript) <locals>");
;
async function eth_getBalance(request, params) {
    const hexBalance = await request({
        method: "eth_getBalance",
        params: [
            params.address,
            params.blockTag || "latest"
        ]
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hexToBigInt"])(hexBalance);
} //# sourceMappingURL=eth_getBalance.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_sendRawTransaction.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/once.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/nft/parseNft.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseNFT",
    ()=>parseNFT,
    "parseNftUri",
    ()=>parseNftUri
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/contract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-ssr] (ecmascript)");
;
;
;
function parseNFT(base, options) {
    switch(options.type){
        case "ERC721":
            return {
                chainId: options.chainId,
                id: options.tokenId,
                metadata: base,
                owner: options?.owner ?? null,
                tokenAddress: options.tokenAddress,
                tokenURI: options.tokenUri,
                type: options.type
            };
        case "ERC1155":
            return {
                chainId: options.chainId,
                id: options.tokenId,
                metadata: base,
                owner: options?.owner ?? null,
                supply: options.supply,
                tokenAddress: options.tokenAddress,
                tokenURI: options.tokenUri,
                type: options.type
            };
        default:
            throw new Error("Invalid NFT type");
    }
}
async function parseNftUri(options) {
    let uri = options.uri;
    // parse valid nft spec (CAIP-22/CAIP-29)
    // @see: https://github.com/ChainAgnostic/CAIPs/tree/master/CAIPs
    if (uri.startsWith("did:nft:")) {
        // convert DID to CAIP
        uri = uri.replace("did:nft:", "").replace(/_/g, "/");
    }
    const [reference = "", asset_namespace = "", tokenID = ""] = uri.split("/");
    const [eip_namespace, chainID] = reference.split(":");
    const [erc_namespace, contractAddress] = asset_namespace.split(":");
    if (!eip_namespace || eip_namespace.toLowerCase() !== "eip155") {
        throw new Error(`Invalid EIP namespace, expected EIP155, got: "${eip_namespace}"`);
    }
    if (!chainID) {
        throw new Error("Chain ID not found");
    }
    if (!contractAddress || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAddress"])(contractAddress)) {
        throw new Error("Contract address not found");
    }
    if (!tokenID) {
        throw new Error("Token ID not found");
    }
    const chain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedChain"])(Number(chainID));
    const contract = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContract"])({
        address: contractAddress,
        chain,
        client: options.client
    });
    switch(erc_namespace){
        case "erc721":
            {
                const { getNFT } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc721/read/getNFT.js [app-ssr] (ecmascript, async loader)");
                const nft = await getNFT({
                    contract,
                    tokenId: BigInt(tokenID)
                });
                return nft.metadata.image ?? null;
            }
        case "erc1155":
            {
                const { getNFT } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc1155/read/getNFT.js [app-ssr] (ecmascript, async loader)");
                const nft = await getNFT({
                    contract,
                    tokenId: BigInt(tokenID)
                });
                return nft.metadata.image ?? null;
            }
        default:
            {
                throw new Error(`Invalid ERC namespace, expected ERC721 or ERC1155, got: "${erc_namespace}"`);
            }
    }
} //# sourceMappingURL=parseNft.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/ens/avatar.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseAvatarRecord",
    ()=>parseAvatarRecord
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$ipfs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/ipfs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$nft$2f$parseNft$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/nft/parseNft.js [app-ssr] (ecmascript)");
;
;
;
async function parseAvatarRecord(options) {
    let uri = options.uri;
    if (/eip155:/i.test(options.uri)) {
        // do nft uri parsing
        uri = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$nft$2f$parseNft$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseNftUri"])(options);
    }
    if (!uri) {
        return null;
    }
    const resolvedScheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$ipfs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolveScheme"])({
        client: options.client,
        uri
    });
    // check if it's an image
    if (await isImageUri({
        client: options.client,
        uri: resolvedScheme
    })) {
        return resolvedScheme;
    }
    return null;
}
async function isImageUri(options) {
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientFetch"])(options.client)(options.uri, {
            method: "HEAD"
        });
        // retrieve content type header to check if content is image
        if (res.status === 200) {
            const contentType = res.headers.get("content-type");
            return !!contentType?.startsWith("image/");
        }
        return false;
    // biome-ignore lint/suspicious/noExplicitAny: TODO: fix any
    } catch (error) {
        // if error is not cors related then fail
        if (typeof error === "object" && typeof error.response !== "undefined") {
            return false;
        }
        // fail in NodeJS, since the error is not cors but any other network issue
        if (!Object.hasOwn(globalThis, "Image")) {
            return false;
        }
        // in case of cors, use image api to validate if given url is an actual image
        return new Promise((resolve)=>{
            const img = new Image();
            img.onload = ()=>{
                resolve(true);
            };
            img.onerror = ()=>{
                resolve(false);
            };
            img.src = options.uri;
        });
    }
} //# sourceMappingURL=avatar.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/ens/encodeLabelToLabelhash.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "encodedLabelToLabelhash",
    ()=>encodedLabelToLabelhash
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/is-hex.js [app-ssr] (ecmascript)");
;
function encodedLabelToLabelhash(label) {
    if (label.length !== 66) {
        return null;
    }
    if (label.indexOf("[") !== 0) {
        return null;
    }
    if (label.indexOf("]") !== 65) {
        return null;
    }
    const hash = `0x${label.slice(1, 65)}`;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$is$2d$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHex"])(hash)) {
        return null;
    }
    return hash;
} //# sourceMappingURL=encodeLabelToLabelhash.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/ens/namehash.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "namehash",
    ()=>namehash
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/encoding/toHex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$concat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/data/concat.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$to$2d$bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/to-bytes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$keccak256$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/hashing/keccak256.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$ens$2f$encodeLabelToLabelhash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/ens/encodeLabelToLabelhash.js [app-ssr] (ecmascript)");
;
;
;
;
function namehash(name) {
    let result = new Uint8Array(32).fill(0);
    if (!name) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bytesToHex"])(result);
    }
    const labels = name.split(".");
    // Iterate in reverse order building up hash
    for(let i = labels.length - 1; i >= 0; i -= 1){
        const item = labels[i];
        const hashFromEncodedLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$ens$2f$encodeLabelToLabelhash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodedLabelToLabelhash"])(item);
        const hashed = hashFromEncodedLabel ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$to$2d$bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBytes"])(hashFromEncodedLabel) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$keccak256$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$to$2d$bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringToBytes"])(item), "bytes");
        result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$hashing$2f$keccak256$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$concat$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concat"])([
            result,
            hashed
        ]), "bytes");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bytesToHex"])(result);
} //# sourceMappingURL=namehash.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/ens/encodeLabelhash.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @internal
 */ __turbopack_context__.s([
    "encodeLabelhash",
    ()=>encodeLabelhash
]);
function encodeLabelhash(hash) {
    return `[${hash.slice(2)}]`;
} //# sourceMappingURL=encodeLabelhash.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/ens/packetToBytes.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "packetToBytes",
    ()=>packetToBytes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$ens$2f$labelhash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/ens/labelhash.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$to$2d$bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/to-bytes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$ens$2f$encodeLabelhash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/ens/encodeLabelhash.js [app-ssr] (ecmascript)");
;
;
;
function packetToBytes(packet) {
    // strip leading and trailing `.`
    const value = packet.replace(/^\.|\.$/gm, "");
    if (value.length === 0) {
        return new Uint8Array(1);
    }
    const bytes = new Uint8Array((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$to$2d$bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringToBytes"])(value).byteLength + 2);
    let offset = 0;
    const list = value.split(".");
    for(let i = 0; i < list.length; i++){
        const item = list[i];
        let encoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$to$2d$bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringToBytes"])(item);
        // if the length is > 255, make the encoded label value a labelhash
        // this is compatible with the universal resolver
        if (encoded.byteLength > 255) {
            encoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$to$2d$bytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringToBytes"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$ens$2f$encodeLabelhash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeLabelhash"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$ens$2f$labelhash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["labelhash"])(item)));
        }
        bytes[offset] = encoded.length;
        bytes.set(encoded, offset + 1);
        offset += encoded.length + 1;
    }
    if (bytes.byteLength !== offset + 1) {
        return bytes.slice(0, offset + 1);
    }
    return bytes;
} //# sourceMappingURL=packetToBytes.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/wait.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Waits for the specified number of milliseconds.
 * @param ms - The number of milliseconds to wait.
 * @returns A promise that resolves after the specified time.
 * @internal
 */ __turbopack_context__.s([
    "wait",
    ()=>wait
]);
function wait(ms) {
    return new Promise((resolve)=>{
        setTimeout(resolve, ms);
    });
} //# sourceMappingURL=wait.js.map
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/timeoutPromise.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Timeout a promise with a given Error message if the promise does not resolve in given time
 * @internal
 */ __turbopack_context__.s([
    "timeoutPromise",
    ()=>timeoutPromise
]);
function timeoutPromise(promise, option) {
    return new Promise((resolve, reject)=>{
        const timeoutId = setTimeout(()=>{
            reject(new Error(option.message));
        }, option.ms);
        promise.then((res)=>{
            clearTimeout(timeoutId);
            resolve(res);
        }, (err)=>{
            clearTimeout(timeoutId);
            reject(err);
        });
    });
} //# sourceMappingURL=timeoutPromise.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bigint.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-ssr] (ecmascript) <locals>");
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
        return BigInt((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["uint8ArrayToHex"])(value));
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/date.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dateToSeconds",
    ()=>dateToSeconds,
    "tenYearsFromNow",
    ()=>tenYearsFromNow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bigint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bigint.js [app-ssr] (ecmascript)");
;
function tenYearsFromNow() {
    return new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10); // 10 years
}
function dateToSeconds(date) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bigint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBigInt"])(Math.floor(date.getTime() / 1000));
} //# sourceMappingURL=date.js.map
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/types.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @internal
 */ __turbopack_context__.s([
    "maxUint96",
    ()=>maxUint96
]);
const maxUint96 = 2n ** 96n - 1n; //# sourceMappingURL=types.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/p-limit.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Queue",
    ()=>Queue,
    "pLimit",
    ()=>pLimit
]);
/* biome-ignore-all lint: IGNORED */ // source code of yocto-queue + modified to add types
// https://github.com/sindresorhus/yocto-queue
class Node {
    constructor(value){
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "next", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.value = value;
    }
}
class Queue {
    constructor(){
        Object.defineProperty(this, "head", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tail", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "size", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.clear();
        this.size = 0;
    }
    enqueue(value) {
        const node = new Node(value);
        if (this.head) {
            if (this.tail) {
                this.tail.next = node;
            }
            this.tail = node;
        } else {
            this.head = node;
            this.tail = node;
        }
        this.size++;
    }
    dequeue() {
        const current = this.head;
        if (!current) {
            return;
        }
        this.head = this.head?.next;
        this.size--;
        return current.value;
    }
    clear() {
        this.head = undefined;
        this.tail = undefined;
        this.size = 0;
    }
    *[Symbol.iterator]() {
        let current = this.head;
        while(current){
            yield current.value;
            current = current.next;
        }
    }
}
// source code of p-limit - https://github.com/sindresorhus/p-limit/ + modified to add types
const AsyncResource = {
    bind (fn, _type, thisArg) {
        return fn.bind(thisArg);
    }
};
function pLimit(concurrency) {
    if (!((Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency > 0)) {
        throw new TypeError("Expected `concurrency` to be a number from 1 and up");
    }
    const queue = new Queue();
    let activeCount = 0;
    const next = ()=>{
        activeCount--;
        if (queue.size > 0) {
            const fn = queue.dequeue();
            if (fn) {
                fn();
            }
        }
    };
    const run = async (function_, resolve, arguments_)=>{
        activeCount++;
        // @ts-ignore
        const result = (async ()=>function_(...arguments_))();
        resolve(result);
        try {
            await result;
        } catch  {}
        next();
    };
    const enqueue = (function_, resolve, arguments_)=>{
        queue.enqueue(AsyncResource.bind(run.bind(undefined, function_, resolve, arguments_)));
        (async ()=>{
            // This function needs to wait until the next microtask before comparing
            // `activeCount` to `concurrency`, because `activeCount` is updated asynchronously
            // when the run function is dequeued and called. The comparison in the if-statement
            // needs to happen asynchronously as well to get an up-to-date value for `activeCount`.
            await Promise.resolve();
            if (activeCount < concurrency && queue.size > 0) {
                const fn = queue.dequeue();
                if (fn) {
                    fn();
                }
            }
        })();
    };
    const generator = (function_, ...arguments_)=>new Promise((resolve)=>{
            enqueue(function_, resolve, arguments_);
        });
    Object.defineProperties(generator, {
        activeCount: {
            get: ()=>activeCount
        },
        clearQueue: {
            value () {
                queue.clear();
            }
        },
        pendingCount: {
            get: ()=>queue.size
        }
    });
    return generator;
} //# sourceMappingURL=p-limit.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/formatNumber.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Round up a number to a certain decimal place
 * @example
 * ```ts
 * import { formatNumber } from "thirdweb/utils";
 * const value = formatNumber(12.1214141, 1); // 12.1
 * ```
 * @utils
 */ __turbopack_context__.s([
    "formatNumber",
    ()=>formatNumber,
    "numberToPlainString",
    ()=>numberToPlainString
]);
function formatNumber(value, decimalPlaces) {
    if (value === 0) return 0;
    const precision = 10 ** decimalPlaces;
    const threshold = 1 / 10 ** decimalPlaces; // anything below this if rounded will result in zero - so use ceil instead
    const fn = value < threshold ? "ceil" : "round";
    return Math[fn]((value + Number.EPSILON) * precision) / precision;
}
function numberToPlainString(num) {
    const str = num.toString();
    // If no exponential notation, return as-is
    if (str.indexOf("e") === -1) {
        return str;
    }
    // Parse exponential notation
    const [rawCoeff, rawExp = "0"] = str.split("e");
    const exponent = parseInt(rawExp, 10);
    // Separate sign and absolute coefficient
    const sign = rawCoeff?.startsWith("-") ? "-" : "";
    const coefficient = rawCoeff?.replace(/^[-+]/, "") || "";
    // Handle negative exponents (small numbers)
    if (exponent < 0) {
        const zeros = "0".repeat(Math.abs(exponent) - 1);
        const digits = coefficient.replace(".", "");
        return `${sign}0.${zeros}${digits}`;
    }
    // Handle positive exponents (large numbers)
    const [integer, decimal = ""] = coefficient?.split(".") || [];
    const zerosNeeded = exponent - decimal.length;
    if (zerosNeeded >= 0) {
        return `${integer}${decimal}${"0".repeat(zerosNeeded)}`;
    } else {
        // When exponent < decimal.length, we need to insert decimal point
        // at the correct position: integer.length + exponent
        const insertAt = (integer?.length ?? 0) + exponent;
        const result = integer + decimal;
        return `${result.slice(0, insertAt)}.${result.slice(insertAt)}`;
    }
} //# sourceMappingURL=formatNumber.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/shortenLargeNumber.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Shorten the string for large value
 * Mainly used for
 * Examples:
 * 10_000 -> 10k
 * 1_000_000 -> 1M
 * 1_000_000_000 -> 1B
 * @example
 * ```ts
 * import { shortenLargeNumber } from "thirdweb/utils";
 * const numStr = shortenLargeNumber(1_000_000_000, )
 * ```
 * @utils
 */ __turbopack_context__.s([
    "shortenLargeNumber",
    ()=>shortenLargeNumber
]);
function shortenLargeNumber(value) {
    if (value === 0) {
        return "0.00";
    }
    if (value < 1000) {
        return value.toString();
    }
    if (value < 10_000) {
        return value.toLocaleString("en-US");
    }
    if (value < 1_000_000) {
        return formatLargeNumber(value, 1_000, "k");
    }
    if (value < 1_000_000_000) {
        return formatLargeNumber(value, 1_000_000, "M");
    }
    return formatLargeNumber(value, 1_000_000_000, "B");
}
/**
 * Shorten the string for large value (over 4 digits)
 * 1000 -> 1000
 * 10_000 -> 10k
 * 1_000_000 -> 1M
 * 1_000_000_000 -> 1B
 */ function formatLargeNumber(value, divisor, suffix) {
    const quotient = value / divisor;
    if (Number.isInteger(quotient)) {
        return Math.floor(quotient) + suffix;
    }
    return quotient.toFixed(1).replace(/\.0$/, "") + suffix;
} //# sourceMappingURL=shortenLargeNumber.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/function-id.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFunctionId",
    ()=>getFunctionId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$random$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/random.js [app-ssr] (ecmascript)");
;
const functionIdCache = new Map();
function getFunctionId(fn) {
    if (functionIdCache.has(fn)) {
        // biome-ignore lint/style/noNonNullAssertion: the `has` above ensures that this will always be set
        return functionIdCache.get(fn);
    }
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$random$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["randomBytesHex"])();
    functionIdCache.set(fn, id);
    return id;
} //# sourceMappingURL=function-id.js.map
}),
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/ens/isValidENSName.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// modified version of isFQDN from validator.js that checks if given string is a valid domain name
// https://github.com/validatorjs/validator.js/blob/master/src/lib/isFQDN.js
// underscores are allowed, hyphens are allowed, no max length check
/**
 * Checks if a string is a valid ENS name.
 * It does not check if the ENS name is currently registered or resolves to an address - it only validates the string format.
 *
 * @param name - The ENS name to check.
 *
 * @example
 * ```ts
 * isValidENSName("thirdweb.eth"); // true
 * isValidENSName("foo.bar.com"); // true
 * isValidENSName("xyz"); // false
 */ __turbopack_context__.s([
    "isValidENSName",
    ()=>isValidENSName
]);
function isValidENSName(name) {
    const parts = name.split(".");
    const tld = parts[parts.length - 1];
    // disallow fqdns without tld
    if (parts.length < 2 || !tld) {
        return false;
    }
    // disallow spaces
    if (/\s/.test(tld)) {
        return false;
    }
    // reject numeric TLDs
    if (/^\d+$/.test(tld)) {
        return false;
    }
    return parts.every((part)=>{
        // part must be at least 1 char long
        if (part.length < 1) {
            return false;
        }
        // disallow invalid chars
        if (!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(part)) {
            return false;
        }
        // disallow full-width chars
        if (/[\uff01-\uff5e]/.test(part)) {
            return false;
        }
        return true;
    });
} //# sourceMappingURL=isValidENSName.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/base64/base64.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isBase64JSON",
    ()=>isBase64JSON,
    "parseBase64String",
    ()=>parseBase64String
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$uint8$2d$array$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/uint8-array.js [app-ssr] (ecmascript)");
;
const Base64Prefix = "data:application/json;base64";
function isBase64JSON(input) {
    if (input.toLowerCase().startsWith(Base64Prefix)) {
        return true;
    }
    return false;
}
function parseBase64String(input) {
    const commaIndex = input.indexOf(",");
    const base64 = input.slice(commaIndex + 1);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$uint8$2d$array$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["base64ToString"])(base64);
} //# sourceMappingURL=base64.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/utf8/utf8.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isUTF8JSONString",
    ()=>isUTF8JSONString,
    "parseUTF8String",
    ()=>parseUTF8String
]);
const UTF8Prefix = "data:application/json;utf-8";
function isUTF8JSONString(input) {
    if (input.toLowerCase().startsWith(UTF8Prefix)) {
        return true;
    }
    return false;
}
function parseUTF8String(input) {
    const commaIndex = input.indexOf(",");
    const utf8 = input.slice(commaIndex + 1);
    try {
        // try to decode the UTF-8 string, if it fails, return the original string
        return decodeURIComponent(utf8);
    } catch  {
        return utf8;
    }
} //# sourceMappingURL=utf8.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/nft/fetchTokenMetadata.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchTokenMetadata",
    ()=>fetchTokenMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$base64$2f$base64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/base64/base64.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$utf8$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/utf8/utf8.js [app-ssr] (ecmascript)");
;
;
;
async function fetchTokenMetadata(options) {
    const { client, tokenId, tokenUri } = options;
    // handle case where the URI is a base64 encoded JSON (onchain nft)
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$base64$2f$base64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isBase64JSON"])(tokenUri)) {
        try {
            return JSON.parse((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$base64$2f$base64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseBase64String"])(tokenUri));
        } catch (e) {
            console.error("Failed to fetch base64 encoded NFT", {
                tokenId,
                tokenUri
            }, e);
            throw e;
        }
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$utf8$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isUTF8JSONString"])(tokenUri)) {
        try {
            return JSON.parse((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$utf8$2f$utf8$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseUTF8String"])(tokenUri));
        } catch (e) {
            console.error("Failed to fetch utf8 encoded NFT", {
                tokenId,
                tokenUri
            }, e);
            throw e;
        }
    }
    // in all other cases we will need the `download` function from storage
    const { download } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/storage/download.js [app-ssr] (ecmascript, async loader)");
    // handle non-dynamic uris (most common case -> skip the other checks)
    try {
        if (!tokenUri.includes("{id}")) {
            return await (await download({
                client,
                uri: tokenUri
            })).json();
        }
    } catch (e) {
        console.error("Failed to fetch non-dynamic NFT", {
            tokenId,
            tokenUri
        }, e);
        throw e;
    }
    // DYNAMIC NFT FORMATS (2 options, sadly has to be waterfall)
    try {
        try {
            // try first dynamic id format
            return await (await download({
                client,
                uri: tokenUri.replace("{id}", (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["numberToHex"])(tokenId, {
                    size: 32
                }).slice(2))
            })).json();
        } catch  {
            // otherwise attempt the second format
            return await (await download({
                client,
                uri: tokenUri.replace("{id}", tokenId.toString())
            })).json();
        }
    } catch (e) {
        console.error("Failed to fetch dynamic NFT", {
            tokenId,
            tokenUri
        }, e);
        throw e;
    }
} //# sourceMappingURL=fetchTokenMetadata.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/arweave.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveArweaveScheme",
    ()=>resolveArweaveScheme
]);
const DEFAULT_GATEWAY = "https://arweave.net/{fileId}";
function resolveArweaveScheme(options) {
    if (options.uri.startsWith("ar://")) {
        const fileId = options.uri.replace("ar://", "");
        if (options.gatewayUrl) {
            const separator = options.gatewayUrl.endsWith("/") ? "" : "/";
            return `${options.gatewayUrl}${separator}${fileId}`;
        }
        return DEFAULT_GATEWAY.replace("{fileId}", fileId);
    }
    if (options.uri.startsWith("http")) {
        return options.uri;
    }
    throw new Error(`Invalid URI scheme, expected "ar://" or "http(s)://"`);
} //# sourceMappingURL=arweave.js.map
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/chain-definitions/ethereum.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ethereum",
    ()=>ethereum,
    "mainnet",
    ()=>mainnet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-ssr] (ecmascript)");
;
const ethereum = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineChain"])({
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/zksync/getEip721Domain.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "gasPerPubdataDefault",
    ()=>gasPerPubdataDefault,
    "getEip712Domain",
    ()=>getEip712Domain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$zksync$2f$utils$2f$hashBytecode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/zksync/utils/hashBytecode.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-ssr] (ecmascript) <locals>");
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
        factoryDeps: factoryDeps?.map((dep)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$zksync$2f$utils$2f$hashBytecode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hashBytecode"])(dep))) ?? [],
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/zksync/send-eip712-transaction.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/encoding/toBytes.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toRlp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/encoding/toRlp.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_sendRawTransaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/actions/eth_sendRawTransaction.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/rpc/rpc.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bigint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/bigint.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$concat$2d$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/helpers/concat-hex.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/encoding/hex.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/resolve-promised-value.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/encode.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$to$2d$serializable$2d$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/to-serializable-transaction.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$zksync$2f$getEip721Domain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/transaction/actions/zksync/getEip721Domain.js [app-ssr] (ecmascript)");
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
    const rpc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRpcClient"])(transaction);
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$actions$2f$eth_sendRawTransaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["eth_sendRawTransaction"])(rpc, hash);
    return {
        chain: transaction.chain,
        client: transaction.client,
        transactionHash: result
    };
}
async function signEip712Transaction(options) {
    const { account, eip712Transaction, chainId } = options;
    // EIP712 signing of the serialized tx
    const eip712Domain = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$zksync$2f$getEip721Domain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getEip712Domain"])(eip712Transaction);
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
        from: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(account.address),
        transaction
    });
    // serialize the transaction (with fees, gas, nonce)
    const serializableTransaction = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$to$2d$serializable$2d$transaction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toSerializableTransaction"])({
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
        nonce ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(nonce) : "0x",
        maxPriorityFeePerGas ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(maxPriorityFeePerGas) : "0x",
        maxFeePerGas ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(maxFeePerGas) : "0x",
        gas ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(gas) : "0x",
        to ?? "0x",
        value ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(value) : "0x",
        data ?? "0x0",
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(chainId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(""),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(""),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(chainId),
        from ?? "0x",
        gasPerPubdata ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(gasPerPubdata) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$zksync$2f$getEip721Domain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["gasPerPubdataDefault"]),
        factoryDeps ?? [],
        customSignature ?? "0x",
        paymaster && paymasterInput ? [
            paymaster,
            paymasterInput
        ] : []
    ];
    // @ts-ignore - TODO: fix types
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$helpers$2f$concat$2d$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["concatHex"])([
        "0x71",
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toRlp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toRlp"])(serializedTransaction)
    ]);
}
async function getZkGasFees(args) {
    const { transaction, from } = args;
    let [gas, maxFeePerGas, maxPriorityFeePerGas, eip712] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(transaction.gas),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(transaction.maxFeePerGas),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(transaction.maxPriorityFeePerGas),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(transaction.eip712)
    ]);
    let gasPerPubdata = eip712?.gasPerPubdata;
    if (gas === undefined || maxFeePerGas === undefined || maxPriorityFeePerGas === undefined) {
        const rpc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$rpc$2f$rpc$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRpcClient"])(transaction);
        const params = await formatTransaction({
            from,
            transaction
        });
        const result = await rpc({
            // biome-ignore lint/suspicious/noExplicitAny: TODO add to RPC method types
            method: "zks_estimateFee",
            // biome-ignore lint/suspicious/noExplicitAny: TODO add to RPC method types
            params: [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bigint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["replaceBigInts"])(params, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$encoding$2f$hex$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toHex"])
            ]
        });
        gas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bigint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBigInt"])(result.gas_limit) * 2n; // overestimating to avoid issues when not accounting for paymaster extra gas ( we should really pass the paymaster input above for better accuracy )
        const baseFee = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bigint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBigInt"])(result.max_fee_per_gas);
        maxFeePerGas = baseFee * 2n; // bumping the base fee per gas to ensure fast inclusion
        maxPriorityFeePerGas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bigint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBigInt"])(result.max_priority_fee_per_gas) || 1n;
        gasPerPubdata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$bigint$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBigInt"])(result.gas_per_pubdata_limit) * 2n; // doubling for fast inclusion;
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$transaction$2f$actions$2f$encode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encode"])(transaction),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(transaction.to),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(transaction.value),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$resolve$2d$promised$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolvePromisedValue"])(transaction.eip712)
    ]);
    const gasPerPubdata = eip712?.gasPerPubdata;
    return {
        data,
        eip712Meta: {
            ...eip712,
            factoryDeps: eip712?.factoryDeps?.map((dep)=>Array.from((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexToBytes"])(dep))),
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/constants/addresses.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/social/profiles.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSocialProfiles",
    ()=>getSocialProfiles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-ssr] (ecmascript)");
;
;
async function getSocialProfiles(args) {
    const { address, client } = args;
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientFetch"])(client);
    const response = await clientFetch(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("social")}/v1/profiles/${address}`);
    if (!response.ok) {
        const errorBody = await response.text().catch(()=>"Unknown error");
        throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText} - ${errorBody}`);
    }
    return (await response.json()).data;
} //# sourceMappingURL=profiles.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/pay.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "trackPayEvent",
    ()=>trackPayEvent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/analytics/track/index.js [app-ssr] (ecmascript)");
;
async function trackPayEvent(args) {
    const data = {
        action: args.event,
        amountWei: args.amountWei,
        chainId: args.chainId,
        clientId: args.client.clientId,
        dstChainId: args.toChainId,
        dstTokenAddress: args.toToken,
        errorCode: args.error,
        source: "pay",
        tokenAddress: args.fromToken,
        walletAddress: args.walletAddress,
        walletType: args.walletType
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$analytics$2f$track$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["track"])({
        client: args.client,
        data,
        ecosystem: args.ecosystem
    });
} //# sourceMappingURL=pay.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/event/actions/parse-logs.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseEventLogs",
    ()=>parseEventLogs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$parseEventLogs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/parseEventLogs.js [app-ssr] (ecmascript)");
;
function parseEventLogs(options) {
    const { logs, events, strict } = options;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$parseEventLogs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseEventLogs"])({
        abi: events.map((e)=>e.abiEvent),
        logs,
        strict
    });
} //# sourceMappingURL=parse-logs.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/event/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/event/prepare-event.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prepareEvent",
    ()=>prepareEvent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/abitype/dist/esm/human-readable/parseAbiItem.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeEventTopics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/abi/encodeEventTopics.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toSignatureHash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__toSignatureHash__as__toEventHash$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/utils/hash/toSignatureHash.js [app-ssr] (ecmascript) <export toSignatureHash as toEventHash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$event$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/event/utils.js [app-ssr] (ecmascript)");
;
;
;
function prepareEvent(options) {
    const { signature } = options;
    let resolvedSignature;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$event$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAbiEvent"])(signature)) {
        resolvedSignature = signature;
    } else {
        resolvedSignature = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiItem$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseAbiItem"])(signature);
    }
    return {
        abiEvent: resolvedSignature,
        hash: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$toSignatureHash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__toSignatureHash__as__toEventHash$3e$__["toEventHash"])(resolvedSignature),
        // @ts-expect-error - TODO: investiagte why this complains, it works fine however
        topics: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeEventTopics$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["encodeEventTopics"])({
            abi: [
                resolvedSignature
            ],
            args: options.filters
        })
    };
} //# sourceMappingURL=prepare-event.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/types/Errors.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiError",
    ()=>ApiError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-ssr] (ecmascript)");
;
class ApiError extends Error {
    constructor(args){
        super(args.message);
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "correlationId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "statusCode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.code = args.code;
        this.correlationId = args.correlationId;
        this.statusCode = args.statusCode;
    }
    toString() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringify"])({
            code: this.code,
            correlationId: this.correlationId,
            message: this.message,
            statusCode: this.statusCode
        });
    }
} //# sourceMappingURL=Errors.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Token.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "add",
    ()=>add,
    "tokens",
    ()=>tokens
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/types/Errors.js [app-ssr] (ecmascript)");
;
;
;
async function tokens(options) {
    const { client, chainId, tokenAddress, symbol, name, limit, offset, includePrices, sortBy, query } = options;
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientFetch"])(client);
    const url = new URL(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("bridge")}/v1/tokens`);
    if (chainId !== null && chainId !== undefined) {
        url.searchParams.set("chainId", chainId.toString());
    }
    if (tokenAddress) {
        url.searchParams.set("tokenAddress", tokenAddress);
    }
    if (symbol) {
        url.searchParams.set("symbol", symbol);
    }
    if (name) {
        url.searchParams.set("name", name);
    }
    if (limit !== undefined) {
        url.searchParams.set("limit", limit.toString());
    }
    if (offset !== null && offset !== undefined) {
        url.searchParams.set("offset", offset.toString());
    }
    if (includePrices !== undefined) {
        url.searchParams.set("includePrices", includePrices.toString());
    }
    if (sortBy !== undefined) {
        url.searchParams.set("sortBy", sortBy);
    }
    if (query !== undefined) {
        url.searchParams.set("query", query);
    }
    const response = await clientFetch(url.toString());
    if (!response.ok) {
        const errorJson = await response.json();
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"]({
            code: errorJson.code || "UNKNOWN_ERROR",
            correlationId: errorJson.correlationId || undefined,
            message: errorJson.message || response.statusText,
            statusCode: response.status
        });
    }
    const { data } = await response.json();
    return data;
}
async function add(options) {
    const { client, chainId, tokenAddress } = options;
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientFetch"])(client);
    const url = `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("bridge")}/v1/tokens`;
    const requestBody = {
        chainId,
        tokenAddress
    };
    const response = await clientFetch(url, {
        body: JSON.stringify(requestBody),
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    });
    if (!response.ok) {
        const errorJson = await response.json();
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"]({
            code: errorJson.code || "UNKNOWN_ERROR",
            correlationId: errorJson.correlationId || undefined,
            message: errorJson.message || response.statusText,
            statusCode: response.status
        });
    }
    const { data } = await response.json();
    return data;
} //# sourceMappingURL=Token.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Chains.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "chains",
    ()=>chains
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$withCache$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/withCache.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/types/Errors.js [app-ssr] (ecmascript)");
;
;
;
;
async function chains(options) {
    const { client } = options;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$withCache$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withCache"])(async ()=>{
        const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientFetch"])(client);
        const url = new URL(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("bridge")}/v1/chains`);
        const response = await clientFetch(url.toString());
        if (!response.ok) {
            const errorJson = await response.json();
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"]({
                code: errorJson.code || "UNKNOWN_ERROR",
                correlationId: errorJson.correlationId || undefined,
                message: errorJson.message || response.statusText,
                statusCode: response.status
            });
        }
        const { data } = await response.json();
        return data;
    }, {
        cacheKey: "bridge-chains",
        cacheTime: 1000 * 60 * 60 * 1
    });
} //# sourceMappingURL=Chains.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Onramp.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prepare",
    ()=>prepare
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/types/Errors.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
async function prepare(options) {
    const { client, onramp, chainId, tokenAddress, receiver, amount, purchaseData, sender, onrampTokenAddress, onrampChainId, currency, maxSteps, excludeChainIds, paymentLinkId, country } = options;
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientFetch"])(client);
    const url = `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("bridge")}/v1/onramp/prepare`;
    const apiRequestBody = {
        chainId: Number(chainId),
        onramp,
        receiver,
        tokenAddress
    };
    if (amount !== undefined) {
        apiRequestBody.amount = amount.toString();
    }
    if (purchaseData !== undefined) {
        apiRequestBody.purchaseData = purchaseData;
    }
    if (sender !== undefined) {
        apiRequestBody.sender = sender;
    }
    if (onrampTokenAddress !== undefined) {
        apiRequestBody.onrampTokenAddress = onrampTokenAddress;
    }
    if (onrampChainId !== undefined) {
        apiRequestBody.onrampChainId = Number(onrampChainId);
    }
    if (currency !== undefined) {
        apiRequestBody.currency = currency;
    }
    if (maxSteps !== undefined) {
        apiRequestBody.maxSteps = maxSteps;
    }
    if (excludeChainIds !== undefined) {
        apiRequestBody.excludeChainIds = Array.isArray(excludeChainIds) ? excludeChainIds.join(",") : excludeChainIds;
    }
    if (paymentLinkId !== undefined) {
        apiRequestBody.paymentLinkId = paymentLinkId;
    }
    if (country !== undefined) {
        apiRequestBody.country = country;
    }
    const response = await clientFetch(url, {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringify"])(apiRequestBody),
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    });
    if (!response.ok) {
        const errorJson = await response.json();
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"]({
            code: errorJson.code || "UNKNOWN_ERROR",
            correlationId: errorJson.correlationId || undefined,
            message: errorJson.message || response.statusText,
            statusCode: response.status
        });
    }
    const { data } = await response.json();
    // Transform amounts from string to bigint where appropriate
    const transformedSteps = data.steps.map((step)=>({
            ...step,
            destinationAmount: BigInt(step.destinationAmount),
            originAmount: BigInt(step.originAmount),
            transactions: step.transactions.map((tx)=>({
                    ...tx,
                    chain: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineChain"])(tx.chainId),
                    client,
                    value: tx.value ? BigInt(tx.value) : undefined
                }))
        }));
    const intentFromResponse = {
        ...data.intent,
        amount: data.intent.amount ? data.intent.amount : undefined
    };
    return {
        ...data,
        destinationAmount: BigInt(data.destinationAmount),
        intent: intentFromResponse,
        steps: transformedSteps
    };
} //# sourceMappingURL=Onramp.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Buy.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prepare",
    ()=>prepare,
    "quote",
    ()=>quote
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/types/Errors.js [app-ssr] (ecmascript)");
;
;
;
;
;
async function quote(options) {
    const { originChainId, originTokenAddress, destinationChainId, destinationTokenAddress, client, maxSteps } = options;
    const amount = "buyAmountWei" in options ? options.buyAmountWei : options.amount;
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientFetch"])(client);
    const url = new URL(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("bridge")}/v1/buy/quote`);
    url.searchParams.set("originChainId", originChainId.toString());
    url.searchParams.set("originTokenAddress", originTokenAddress);
    url.searchParams.set("destinationChainId", destinationChainId.toString());
    url.searchParams.set("destinationTokenAddress", destinationTokenAddress);
    url.searchParams.set("buyAmountWei", amount.toString());
    url.searchParams.set("amount", amount.toString());
    if (maxSteps) {
        url.searchParams.set("maxSteps", maxSteps.toString());
    }
    const response = await clientFetch(url.toString());
    if (!response.ok) {
        const errorJson = await response.json();
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"]({
            code: errorJson.code || "UNKNOWN_ERROR",
            correlationId: errorJson.correlationId || undefined,
            message: errorJson.message || response.statusText,
            statusCode: response.status
        });
    }
    const { data } = await response.json();
    return {
        blockNumber: data.blockNumber ? BigInt(data.blockNumber) : undefined,
        destinationAmount: BigInt(data.destinationAmount),
        estimatedExecutionTimeMs: data.estimatedExecutionTimeMs,
        intent: {
            amount,
            buyAmountWei: amount,
            destinationChainId,
            destinationTokenAddress,
            originChainId,
            originTokenAddress
        },
        originAmount: BigInt(data.originAmount),
        steps: data.steps,
        timestamp: data.timestamp
    };
}
async function prepare(options) {
    const { originChainId, originTokenAddress, destinationChainId, destinationTokenAddress, sender, receiver, client, amount, purchaseData, maxSteps, paymentLinkId, slippageToleranceBps } = options;
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientFetch"])(client);
    const url = new URL(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("bridge")}/v1/buy/prepare`);
    const response = await clientFetch(url.toString(), {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringify"])({
            amount: amount.toString(),
            buyAmountWei: amount.toString(),
            destinationChainId: destinationChainId.toString(),
            destinationTokenAddress,
            maxSteps,
            originChainId: originChainId.toString(),
            originTokenAddress,
            paymentLinkId,
            purchaseData,
            receiver,
            sender,
            slippageToleranceBps
        }),
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    });
    if (!response.ok) {
        const errorJson = await response.json();
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"]({
            code: errorJson.code || "UNKNOWN_ERROR",
            correlationId: errorJson.correlationId || undefined,
            message: errorJson.message || response.statusText,
            statusCode: response.status
        });
    }
    const { data } = await response.json();
    return {
        blockNumber: data.blockNumber ? BigInt(data.blockNumber) : undefined,
        destinationAmount: BigInt(data.destinationAmount),
        estimatedExecutionTimeMs: data.estimatedExecutionTimeMs,
        intent: {
            amount,
            destinationChainId,
            destinationTokenAddress,
            originChainId,
            originTokenAddress,
            receiver,
            sender
        },
        originAmount: BigInt(data.originAmount),
        steps: data.steps.map((step)=>({
                ...step,
                transactions: step.transactions.map((transaction)=>({
                        ...transaction,
                        chain: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineChain"])(transaction.chainId),
                        client,
                        value: transaction.value ? BigInt(transaction.value) : undefined
                    }))
            })),
        timestamp: data.timestamp
    };
} //# sourceMappingURL=Buy.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Buy.js [app-ssr] (ecmascript) <export * as Buy>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Buy",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Buy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Buy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Buy.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Sell.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prepare",
    ()=>prepare,
    "quote",
    ()=>quote
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/types/Errors.js [app-ssr] (ecmascript)");
;
;
;
;
;
async function quote(options) {
    const { originChainId, originTokenAddress, destinationChainId, destinationTokenAddress, amount, client, maxSteps } = options;
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientFetch"])(client);
    const url = new URL(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("bridge")}/v1/sell/quote`);
    url.searchParams.set("originChainId", originChainId.toString());
    url.searchParams.set("originTokenAddress", originTokenAddress);
    url.searchParams.set("destinationChainId", destinationChainId.toString());
    url.searchParams.set("destinationTokenAddress", destinationTokenAddress);
    url.searchParams.set("sellAmountWei", amount.toString());
    url.searchParams.set("amount", amount.toString());
    if (typeof maxSteps !== "undefined") {
        url.searchParams.set("maxSteps", maxSteps.toString());
    }
    const response = await clientFetch(url.toString());
    if (!response.ok) {
        const errorJson = await response.json();
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"]({
            code: errorJson.code || "UNKNOWN_ERROR",
            correlationId: errorJson.correlationId || undefined,
            message: errorJson.message || response.statusText,
            statusCode: response.status
        });
    }
    const { data } = await response.json();
    return {
        blockNumber: data.blockNumber ? BigInt(data.blockNumber) : undefined,
        destinationAmount: BigInt(data.destinationAmount),
        estimatedExecutionTimeMs: data.estimatedExecutionTimeMs,
        intent: {
            amount,
            destinationChainId,
            destinationTokenAddress,
            originChainId,
            originTokenAddress
        },
        originAmount: BigInt(data.originAmount),
        steps: data.steps,
        timestamp: data.timestamp
    };
}
async function prepare(options) {
    const { originChainId, originTokenAddress, destinationChainId, destinationTokenAddress, amount, sender, receiver, client, purchaseData, maxSteps, paymentLinkId, slippageToleranceBps } = options;
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientFetch"])(client);
    const url = new URL(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("bridge")}/v1/sell/prepare`);
    const response = await clientFetch(url.toString(), {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringify"])({
            amount: amount.toString(),
            destinationChainId: destinationChainId.toString(),
            destinationTokenAddress,
            maxSteps,
            originChainId: originChainId.toString(),
            originTokenAddress,
            paymentLinkId,
            purchaseData,
            receiver,
            sellAmountWei: amount.toString(),
            sender,
            slippageToleranceBps
        }),
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    });
    if (!response.ok) {
        const errorJson = await response.json();
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"]({
            code: errorJson.code || "UNKNOWN_ERROR",
            correlationId: errorJson.correlationId || undefined,
            message: errorJson.message || response.statusText,
            statusCode: response.status
        });
    }
    const { data } = await response.json();
    return {
        blockNumber: data.blockNumber ? BigInt(data.blockNumber) : undefined,
        destinationAmount: BigInt(data.destinationAmount),
        estimatedExecutionTimeMs: data.estimatedExecutionTimeMs,
        expiration: data.expiration,
        intent: {
            amount,
            destinationChainId,
            destinationTokenAddress,
            originChainId,
            originTokenAddress,
            purchaseData,
            receiver,
            sender
        },
        originAmount: BigInt(data.originAmount),
        steps: data.steps.map((step)=>({
                ...step,
                transactions: step.transactions.map((transaction)=>({
                        ...transaction,
                        chain: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineChain"])(transaction.chainId),
                        client,
                        value: transaction.value ? BigInt(transaction.value) : undefined
                    }))
            })),
        timestamp: data.timestamp
    };
} //# sourceMappingURL=Sell.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Sell.js [app-ssr] (ecmascript) <export * as Sell>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sell",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Sell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Sell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Sell.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Transfer.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prepare",
    ()=>prepare
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/types/Errors.js [app-ssr] (ecmascript)");
;
;
;
;
;
async function prepare(options) {
    const { chainId, tokenAddress, sender, receiver, client, amount, purchaseData, feePayer, paymentLinkId } = options;
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientFetch"])(client);
    const url = new URL(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("bridge")}/v1/transfer/prepare`);
    const response = await clientFetch(url.toString(), {
        body: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$json$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stringify"])({
            amount: amount.toString(),
            chainId: chainId.toString(),
            feePayer,
            paymentLinkId,
            purchaseData,
            receiver,
            sender,
            tokenAddress,
            transferAmountWei: amount.toString()
        }),
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST"
    });
    if (!response.ok) {
        const errorJson = await response.json();
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"]({
            code: errorJson.code || "UNKNOWN_ERROR",
            correlationId: errorJson.correlationId || undefined,
            message: errorJson.message || response.statusText,
            statusCode: response.status
        });
    }
    const { data } = await response.json();
    return {
        blockNumber: data.blockNumber ? BigInt(data.blockNumber) : undefined,
        destinationAmount: BigInt(data.destinationAmount),
        estimatedExecutionTimeMs: data.estimatedExecutionTimeMs,
        intent: {
            amount,
            chainId,
            feePayer,
            receiver,
            sender,
            tokenAddress
        },
        originAmount: BigInt(data.originAmount),
        steps: data.steps.map((step)=>({
                ...step,
                transactions: step.transactions.map((transaction)=>({
                        ...transaction,
                        chain: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineChain"])(transaction.chainId),
                        client,
                        value: transaction.value ? BigInt(transaction.value) : undefined
                    }))
            })),
        timestamp: data.timestamp
    };
} //# sourceMappingURL=Transfer.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Transfer.js [app-ssr] (ecmascript) <export * as Transfer>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Transfer",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Transfer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Transfer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Transfer.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/OnrampStatus.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "status",
    ()=>status
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/types/Errors.js [app-ssr] (ecmascript)");
;
;
;
async function status(options) {
    const { id, client } = options;
    const clientFetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$fetch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getClientFetch"])(client);
    const url = new URL(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$domains$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getThirdwebBaseUrl"])("bridge")}/v1/onramp/status`);
    url.searchParams.set("id", id);
    const response = await clientFetch(url.toString());
    if (!response.ok) {
        const errorJson = await response.json();
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$types$2f$Errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"]({
            code: errorJson.code || "UNKNOWN_ERROR",
            correlationId: errorJson.correlationId || undefined,
            message: errorJson.message || response.statusText,
            statusCode: response.status
        });
    }
    const { data } = await response.json();
    return data;
} //# sourceMappingURL=OnrampStatus.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Onramp.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prepare",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Onramp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["prepare"],
    "status",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$OnrampStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["status"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Onramp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Onramp.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$OnrampStatus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/OnrampStatus.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Onramp.js [app-ssr] (ecmascript) <export * as Onramp>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Onramp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Onramp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Onramp$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Onramp.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/pay/convert/type.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFiatSymbol",
    ()=>getFiatSymbol
]);
const currencySymbol = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    KRW: "₩",
    CNY: "¥",
    INR: "₹",
    NOK: "kr",
    SEK: "kr",
    CHF: "CHF",
    AUD: "$",
    CAD: "$",
    NZD: "$",
    MXN: "$",
    BRL: "R$",
    CLP: "$",
    CZK: "Kč",
    DKK: "kr",
    HKD: "$",
    HUF: "Ft",
    IDR: "Rp",
    ILS: "₪",
    ISK: "kr"
};
function getFiatSymbol(showBalanceInFiat) {
    return currencySymbol[showBalanceInFiat] || "$";
} //# sourceMappingURL=type.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/pay/convert/get-token.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getToken",
    ()=>getToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Token$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/bridge/Token.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$withCache$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/promise/withCache.js [app-ssr] (ecmascript)");
;
;
async function getToken(client, tokenAddress, chainId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$promise$2f$withCache$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["withCache"])(async ()=>{
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Token$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tokens"])({
            chainId,
            client,
            tokenAddress
        });
        const token = result[0];
        if (!token) {
            // Attempt to add the token
            const tokenResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$bridge$2f$Token$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["add"])({
                chainId,
                client,
                tokenAddress
            }).catch(()=>{
                throw new Error("Token not supported");
            });
            return tokenResult;
        }
        return token;
    }, {
        cacheKey: `get-token-price-${tokenAddress}-${chainId}`,
        cacheTime: 1000 * 60
    });
} //# sourceMappingURL=get-token.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/pay/convert/cryptoToFiat.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "convertCryptoToFiat",
    ()=>convertCryptoToFiat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$pay$2f$convert$2f$get$2d$token$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/pay/convert/get-token.js [app-ssr] (ecmascript)");
;
;
async function convertCryptoToFiat(options) {
    const { client, fromTokenAddress, chain, fromAmount, to } = options;
    if (Number(fromAmount) === 0) {
        return {
            result: 0
        };
    }
    // Testnets just don't work with our current provider(s)
    if (chain.testnet === true) {
        throw new Error(`Cannot fetch price for a testnet (chainId: ${chain.id})`);
    }
    // Some provider that we are using will return `0` for unsupported token
    // so we should do some basic input validations before sending the request
    // Make sure it's a valid EVM address
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAddress"])(fromTokenAddress)) {
        throw new Error("Invalid fromTokenAddress. Expected a valid EVM contract address");
    }
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$pay$2f$convert$2f$get$2d$token$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])(client, fromTokenAddress, chain.id);
    const price = token?.prices[to] || 0;
    if (!token || price === 0) {
        throw new Error(`Error: Failed to fetch price for token ${fromTokenAddress} on chainId: ${chain.id}`);
    }
    return {
        result: price * fromAmount
    };
} //# sourceMappingURL=cryptoToFiat.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/insight/get-nfts.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getContractNFTs",
    ()=>getContractNFTs,
    "getNFT",
    ()=>getNFT,
    "getOwnedNFTs",
    ()=>getOwnedNFTs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/chains/utils.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/contract.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/address.js [app-ssr] (ecmascript)");
;
;
;
async function getOwnedNFTs(args) {
    const [{ getV1Nfts }, { getThirdwebDomains }, { getClientFetch }, { assertInsightEnabled }, { stringify }] = await Promise.all([
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/@thirdweb-dev/insight/dist/esm/exports/thirdweb.js [app-ssr] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-ssr] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-ssr] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/insight/common.js [app-ssr] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/viem/_esm/index.js [app-ssr] (ecmascript, async loader)")
    ]);
    const { client, chains, ownerAddress, contractAddresses, queryOptions } = args;
    await assertInsightEnabled(chains);
    const defaultQueryOptions = {
        chain: chains.map((chain)=>chain.id),
        // metadata: includeMetadata ? "true" : "false", TODO (insight): add support for this
        limit: 50,
        owner_address: [
            ownerAddress
        ],
        contract_address: contractAddresses ? contractAddresses : undefined
    };
    const result = await getV1Nfts({
        baseUrl: `https://${getThirdwebDomains().insight}`,
        fetch: getClientFetch(client),
        query: {
            ...defaultQueryOptions,
            ...queryOptions
        }
    });
    if (result.error) {
        throw new Error(`${result.response.status} ${result.response.statusText} - ${result.error ? stringify(result.error) : "Unknown error"}`);
    }
    const transformedNfts = await transformNFTModel(result.data?.data ?? [], client, ownerAddress);
    return transformedNfts.map((nft)=>({
            ...nft,
            quantityOwned: nft.quantityOwned ?? 1n
        }));
}
async function getContractNFTs(args) {
    const [{ getV1NftsByContractAddress }, { getThirdwebDomains }, { getClientFetch }, { assertInsightEnabled }, { stringify }] = await Promise.all([
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/@thirdweb-dev/insight/dist/esm/exports/thirdweb.js [app-ssr] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-ssr] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-ssr] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/insight/common.js [app-ssr] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-ssr] (ecmascript, async loader)")
    ]);
    const { client, chains, contractAddress, includeOwners = true, queryOptions } = args;
    const defaultQueryOptions = {
        chain: chains.map((chain)=>chain.id),
        include_owners: includeOwners === true ? "true" : "false",
        // metadata: includeMetadata ? "true" : "false", TODO (insight): add support for this
        limit: 50
    };
    await assertInsightEnabled(chains);
    const result = await getV1NftsByContractAddress({
        baseUrl: `https://${getThirdwebDomains().insight}`,
        fetch: getClientFetch(client),
        path: {
            contract_address: contractAddress
        },
        query: {
            ...defaultQueryOptions,
            ...queryOptions
        }
    });
    if (result.error) {
        throw new Error(`${result.response.status} ${result.response.statusText} - ${result.error ? stringify(result.error) : "Unknown error"}`);
    }
    return transformNFTModel(result.data?.data ?? [], client);
}
async function getNFT(args) {
    const [{ getV1NftsByContractAddressByTokenId }, { getThirdwebDomains }, { getClientFetch }, { assertInsightEnabled }, { stringify }] = await Promise.all([
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/@thirdweb-dev/insight/dist/esm/exports/thirdweb.js [app-ssr] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-ssr] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-ssr] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/insight/common.js [app-ssr] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-ssr] (ecmascript, async loader)")
    ]);
    const { client, chain, contractAddress, tokenId, includeOwners = true, queryOptions } = args;
    await assertInsightEnabled([
        chain
    ]);
    const defaultQueryOptions = {
        chain_id: [
            chain.id
        ],
        include_owners: includeOwners === true ? "true" : "false"
    };
    const result = await getV1NftsByContractAddressByTokenId({
        baseUrl: `https://${getThirdwebDomains().insight}`,
        fetch: getClientFetch(client),
        path: {
            contract_address: contractAddress,
            token_id: tokenId.toString()
        },
        query: {
            ...defaultQueryOptions,
            ...queryOptions
        }
    });
    if (result.error) {
        throw new Error(`${result.response.status} ${result.response.statusText} - ${result.error ? stringify(result.error) : "Unknown error"}`);
    }
    const transformedNfts = await transformNFTModel(result.data?.data ?? [], client);
    return transformedNfts?.[0];
}
async function transformNFTModel(nfts, client, ownerAddress) {
    const [{ parseNFT }, { totalSupply }] = await Promise.all([
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/nft/parseNft.js [app-ssr] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/extensions/erc1155/__generated__/IERC1155/read/totalSupply.js [app-ssr] (ecmascript, async loader)")
    ]);
    return await Promise.all(nfts.map(async (nft)=>{
        let parsedNft;
        const { contract, // biome-ignore lint/correctness/noUnusedVariables: explicitly unused to not include it in the resulting metadata
        extra_metadata, // biome-ignore lint/correctness/noUnusedVariables: explicitly unused to not include it in the resulting metadata
        collection, metadata_url, // biome-ignore lint/correctness/noUnusedVariables: explicitly unused to not include it in the resulting metadata
        chain_id, token_id, // biome-ignore lint/correctness/noUnusedVariables: explicitly unused to not include it in the resulting metadata
        status, balance, // biome-ignore lint/correctness/noUnusedVariables: explicitly unused to not include it in the resulting metadata
        token_type, ...rest } = nft;
        let metadataToUse = rest;
        let owners = ownerAddress ? [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(ownerAddress)
        ] : undefined;
        if ("owner_addresses" in rest) {
            const { owner_addresses, ...restWithoutOwnerAddresses } = rest;
            metadataToUse = restWithoutOwnerAddresses;
            owners = owners ?? owner_addresses?.map((o)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$utils$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(o));
        }
        const metadata = replaceIPFSGatewayRecursively({
            attributes: nft.extra_metadata?.attributes ?? undefined,
            image: nft.image_url,
            uri: nft.metadata_url ?? "",
            ...metadataToUse
        });
        if (contract?.type === "erc1155") {
            // TODO (insight): this needs to be added in the API
            const supply = await totalSupply({
                contract: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getContract"])({
                    address: contract.address,
                    chain: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$chains$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCachedChain"])(contract.chain_id),
                    client: client
                }),
                id: BigInt(token_id)
            }).catch(()=>0n);
            parsedNft = parseNFT(metadata, {
                chainId: contract?.chain_id ?? 0,
                owner: owners?.[0],
                supply: supply,
                tokenAddress: contract?.address ?? "",
                tokenId: BigInt(token_id),
                tokenUri: replaceIPFSGateway(metadata_url) ?? "",
                type: "ERC1155"
            });
        } else {
            parsedNft = parseNFT(metadata, {
                chainId: contract?.chain_id ?? 0,
                owner: owners?.[0],
                tokenAddress: contract?.address ?? "",
                tokenId: BigInt(token_id),
                tokenUri: replaceIPFSGateway(metadata_url) ?? "",
                type: "ERC721"
            });
        }
        return {
            ...parsedNft,
            ...contract?.type === "erc1155" ? {
                quantityOwned: balance ? BigInt(balance) : undefined
            } : {}
        };
    }));
}
// biome-ignore lint/suspicious/noExplicitAny: this should be fixed in the API
function replaceIPFSGatewayRecursively(obj) {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }
    for(const key in obj){
        if (typeof obj[key] === "string") {
            obj[key] = replaceIPFSGateway(obj[key]);
        } else {
            replaceIPFSGatewayRecursively(obj[key]);
        }
    }
    return obj;
}
function replaceIPFSGateway(url) {
    if (!url || typeof url !== "string") {
        return url;
    }
    try {
        const parsedUrl = new URL(url);
        if (parsedUrl.host.endsWith(".ipfscdn.io")) {
            const paths = parsedUrl.pathname.split("/");
            const index = paths.findIndex((path)=>path === "ipfs");
            if (index === -1) {
                return url;
            }
            const ipfsHash = paths.slice(index + 1).join("/");
            if (ipfsHash) {
                return `ipfs://${ipfsHash}`;
            }
            return url;
        }
    } catch  {
        // If the URL is invalid, return it as is
        return url;
    }
    return url;
} //# sourceMappingURL=get-nfts.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/insight/get-tokens.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Get ERC20 tokens owned by an address
 * @example
 * ```ts
 * import { Insight } from "thirdweb";
 *
 * const tokens = await Insight.getOwnedTokens({
 *   client,
 *   chains: [sepolia],
 *   ownerAddress: "0x1234567890123456789012345678901234567890",
 * });
 * ```
 * @insight
 */ __turbopack_context__.s([
    "getOwnedTokens",
    ()=>getOwnedTokens
]);
async function getOwnedTokens(args) {
    const [{ getV1Tokens }, { getThirdwebDomains }, { getClientFetch }, { assertInsightEnabled }, { stringify }] = await Promise.all([
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/@thirdweb-dev/insight/dist/esm/exports/thirdweb.js [app-ssr] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/domains.js [app-ssr] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/fetch.js [app-ssr] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/insight/common.js [app-ssr] (ecmascript, async loader)"),
        __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/json.js [app-ssr] (ecmascript, async loader)")
    ]);
    const { client, chains, ownerAddress, tokenAddresses, queryOptions } = args;
    await assertInsightEnabled(chains);
    const defaultQueryOptions = {
        chain_id: chains.length > 0 ? chains.map((chain)=>chain.id) : [
            1
        ],
        include_native: "true",
        include_spam: "false",
        limit: 50,
        metadata: "true",
        owner_address: [
            ownerAddress
        ],
        token_address: tokenAddresses ? tokenAddresses : undefined,
        sort_by: "balance",
        sort_order: "desc"
    };
    const result = await getV1Tokens({
        baseUrl: `https://${getThirdwebDomains().insight}`,
        fetch: getClientFetch(client),
        query: {
            ...defaultQueryOptions,
            ...queryOptions
        }
    });
    if (result.error) {
        throw new Error(`${result.response.status} ${result.response.statusText} - ${result.error ? stringify(result.error) : "Unknown error"}`);
    }
    return transformOwnedToken(result.data?.data ?? []);
}
async function transformOwnedToken(token) {
    const { toTokens } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/utils/units.js [app-ssr] (ecmascript, async loader)");
    return token.map((t)=>{
        const decimals = t.decimals ?? 18;
        const value = BigInt(t.balance);
        return {
            chainId: t.chain_id,
            decimals,
            displayValue: toTokens(value, decimals),
            name: t.name ?? "",
            symbol: t.symbol ?? "",
            tokenAddress: t.token_address,
            value
        };
    });
} //# sourceMappingURL=get-tokens.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/actions/compiler-metadata.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Formats the compiler metadata into a standardized format.
 * @param metadata - The compiler metadata to be formatted.
 * @returns The formatted metadata.
 * @internal
 */ __turbopack_context__.s([
    "formatCompilerMetadata",
    ()=>formatCompilerMetadata
]);
function formatCompilerMetadata(// biome-ignore lint/suspicious/noExplicitAny: TODO: fix later
metadata) {
    let meta = metadata;
    if ("source_metadata" in metadata) {
        meta = metadata.source_metadata;
    }
    const compilationTarget = meta.settings.compilationTarget;
    const targets = Object.keys(compilationTarget);
    const name = compilationTarget[targets[0]];
    const info = {
        author: meta.output.devdoc.author,
        details: meta.output.devdoc.detail,
        notice: meta.output.userdoc.notice,
        title: meta.output.devdoc.title
    };
    const licenses = [
        ...new Set(// biome-ignore lint/suspicious/noExplicitAny: TODO: fix later
        Object.entries(meta.sources).map(([, src])=>src.license))
    ];
    return {
        abi: meta?.output?.abi || [],
        info,
        isPartialAbi: meta.isPartialAbi,
        licenses,
        metadata: meta,
        name,
        zk_version: metadata.zk_version
    };
} //# sourceMappingURL=compiler-metadata.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/actions/get-compiler-metadata.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCompilerMetadata",
    ()=>getCompilerMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$actions$2f$compiler$2d$metadata$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/contract/actions/compiler-metadata.js [app-ssr] (ecmascript)");
;
async function getCompilerMetadata(contract) {
    const { address, chain } = contract;
    const response = await fetch(`https://contract.thirdweb.com/metadata/${chain.id}/${address}`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    });
    if (!response.ok) {
        const errorMsg = await response.json();
        throw new Error(errorMsg.message || errorMsg.error || "Failed to get compiler metadata");
    }
    const data = await response.json();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$contract$2f$actions$2f$compiler$2d$metadata$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCompilerMetadata"])(data);
} //# sourceMappingURL=get-compiler-metadata.js.map
}),
];

//# sourceMappingURL=1b50e_thirdweb_dist_esm_b72d993f._.js.map