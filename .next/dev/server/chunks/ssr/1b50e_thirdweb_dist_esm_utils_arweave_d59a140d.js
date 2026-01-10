module.exports = [
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
];

//# sourceMappingURL=1b50e_thirdweb_dist_esm_utils_arweave_d59a140d.js.map