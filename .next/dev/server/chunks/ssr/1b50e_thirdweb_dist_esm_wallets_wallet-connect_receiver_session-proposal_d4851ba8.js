module.exports = [
"[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-connect/receiver/session-proposal.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "acceptSessionProposal",
    ()=>acceptSessionProposal,
    "disconnectExistingSessions",
    ()=>disconnectExistingSessions,
    "onSessionProposal",
    ()=>onSessionProposal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$receiver$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-connect/receiver/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$receiver$2f$session$2d$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/dist/esm/wallets/wallet-connect/receiver/session-store.js [app-ssr] (ecmascript)");
;
;
async function onSessionProposal(options) {
    const { wallet, walletConnectClient, event, chains, onConnect } = options;
    const account = wallet.getAccount();
    if (!account) {
        throw new Error("No account connected to provided wallet");
    }
    const origin = event.verifyContext?.verified?.origin;
    if (origin) {
        await disconnectExistingSessions({
            origin,
            walletConnectClient
        });
    }
    const session = await acceptSessionProposal({
        account,
        chains,
        sessionProposal: event,
        walletConnectClient
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$receiver$2f$session$2d$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveSession"])(session);
    wallet.subscribe("disconnect", ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$receiver$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disconnectWalletConnectSession"])({
            session,
            walletConnectClient
        });
    });
    onConnect?.(session);
}
async function disconnectExistingSessions({ walletConnectClient, origin }) {
    const sessions = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$receiver$2f$session$2d$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSessions"])();
    for (const session of sessions){
        if (session.origin === origin) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$dist$2f$esm$2f$wallets$2f$wallet$2d$connect$2f$receiver$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disconnectWalletConnectSession"])({
                session,
                walletConnectClient
            });
        }
    }
}
async function acceptSessionProposal({ account, walletConnectClient, sessionProposal, chains }) {
    if (!sessionProposal.params.requiredNamespaces?.eip155 && !sessionProposal.params.optionalNamespaces?.eip155) {
        throw new Error("No EIP155 namespace found in Wallet Connect session proposal");
    }
    const namespaces = {
        chains: [
            ...Array.from(new Set([
                ...sessionProposal.params.requiredNamespaces?.eip155?.chains?.map((chain)=>`${chain}:${account.address}`) ?? [],
                ...sessionProposal.params.optionalNamespaces?.eip155?.chains?.map((chain)=>`${chain}:${account.address}`) ?? [],
                ...chains?.map((chain)=>`eip155:${chain.id}:${account.address}`) ?? []
            ]))
        ],
        events: [
            ...sessionProposal.params.requiredNamespaces?.eip155?.events ?? [],
            ...sessionProposal.params.optionalNamespaces?.eip155?.events ?? []
        ],
        methods: [
            ...sessionProposal.params.requiredNamespaces?.eip155?.methods ?? [],
            ...sessionProposal.params.optionalNamespaces?.eip155?.methods ?? []
        ]
    };
    const approval = await walletConnectClient.approve({
        id: sessionProposal.id,
        namespaces: {
            eip155: {
                accounts: namespaces.chains,
                events: namespaces.events,
                methods: namespaces.methods
            }
        }
    });
    const session = await approval.acknowledged();
    return {
        origin: sessionProposal.verifyContext?.verified?.origin || "Unknown origin",
        topic: session.topic
    };
} //# sourceMappingURL=session-proposal.js.map
}),
];

//# sourceMappingURL=1b50e_thirdweb_dist_esm_wallets_wallet-connect_receiver_session-proposal_d4851ba8.js.map