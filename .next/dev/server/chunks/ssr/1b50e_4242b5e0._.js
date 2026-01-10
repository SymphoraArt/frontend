module.exports = [
"[project]/Desktop/frontend/node_modules/@marsidev/react-turnstile/dist/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_CONTAINER_ID",
    ()=>z,
    "DEFAULT_ONLOAD_NAME",
    ()=>_,
    "DEFAULT_SCRIPT_ID",
    ()=>I,
    "SCRIPT_URL",
    ()=>K,
    "Turnstile",
    ()=>Ee
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
'use client';
;
;
;
var ue = ({ as: n = "div", ...a }, s)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(n, {
        ...a,
        ref: s
    }), J = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(ue);
;
var K = "https://challenges.cloudflare.com/turnstile/v0/api.js", I = "cf-turnstile-script", z = "cf-turnstile", _ = "onloadTurnstileCallback", W = (n)=>!!document.getElementById(n), X = ({ render: n = "explicit", onLoadCallbackName: a = _, scriptOptions: { nonce: s = "", defer: e = !0, async: m = !0, id: S = "", appendTo: g, onError: T, crossOrigin: w = "" } = {} })=>{
    let E = S || I;
    if (W(E)) return;
    let i = document.createElement("script");
    if (i.id = E, i.src = `${K}?onload=${a}&render=${n}`, document.querySelector(`script[src="${i.src}"]`)) return;
    i.defer = !!e, i.async = !!m, s && (i.nonce = s), w && (i.crossOrigin = w), T && (i.onerror = T, delete window[a]), (g === "body" ? document.body : document.getElementsByTagName("head")[0]).appendChild(i);
}, f = {
    normal: {
        width: 300,
        height: 65
    },
    compact: {
        width: 150,
        height: 140
    },
    invisible: {
        width: 0,
        height: 0,
        overflow: "hidden"
    },
    flexible: {
        minWidth: 300,
        width: "100%",
        height: 65
    },
    interactionOnly: {
        width: "fit-content",
        height: "auto",
        display: "flex"
    }
};
function G(n) {
    if (n !== "invisible" && n !== "interactionOnly") return n;
}
function $(n = I) {
    let [a, s] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!1);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let e = ()=>{
            W(n) && s(!0);
        }, m = new MutationObserver(e);
        return m.observe(document, {
            childList: !0,
            subtree: !0
        }), e(), ()=>{
            m.disconnect();
        };
    }, [
        n
    ]), a;
}
;
var k = "unloaded", te, we = new Promise((n, a)=>{
    te = {
        resolve: n,
        reject: a
    }, k === "ready" && n(void 0);
}), ee = (n = _)=>(k === "unloaded" && (k = "loading", window[n] = ()=>{
        te.resolve(), k = "ready", delete window[n];
    }), we), Ee = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])((n, a)=>{
    let { scriptOptions: s, options: e = {}, siteKey: m, onWidgetLoad: S, onSuccess: g, onExpire: T, onError: w, onBeforeInteractive: E, onAfterInteractive: i, onUnsupported: b, onTimeout: A, onLoadScript: j, id: re, style: ne, as: oe = "div", injectScript: B = !0, rerenderOnCallbackChange: o = !1, ...ie } = n, c = e.size, H = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>typeof c > "u" ? {} : e.execution === "execute" ? f.invisible : e.appearance === "interaction-only" ? f.interactionOnly : f[c], [
        e.execution,
        c,
        e.appearance
    ]), [se, R] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(H()), u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null), [x, F] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!1), r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(void 0), L = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(!1), V = re || z, d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        onSuccess: g,
        onError: w,
        onExpire: T,
        onBeforeInteractive: E,
        onAfterInteractive: i,
        onUnsupported: b,
        onTimeout: A
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        o || (d.current = {
            onSuccess: g,
            onError: w,
            onExpire: T,
            onBeforeInteractive: E,
            onAfterInteractive: i,
            onUnsupported: b,
            onTimeout: A
        });
    });
    let N = s?.id || I, D = $(N), C = s?.onLoadCallbackName || _, ce = e.appearance || "always", P = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            sitekey: m,
            action: e.action,
            cData: e.cData,
            theme: e.theme || "auto",
            language: e.language || "auto",
            tabindex: e.tabIndex,
            "response-field": e.responseField,
            "response-field-name": e.responseFieldName,
            size: G(c),
            retry: e.retry || "auto",
            "retry-interval": e.retryInterval || 8e3,
            "refresh-expired": e.refreshExpired || "auto",
            "refresh-timeout": e.refreshTimeout || "auto",
            execution: e.execution || "render",
            appearance: e.appearance || "always",
            "feedback-enabled": e.feedbackEnabled || !0,
            callback: (t)=>{
                L.current = !0, o ? g?.(t) : d.current.onSuccess?.(t);
            },
            "error-callback": o ? w : (...t)=>d.current.onError?.(...t),
            "expired-callback": o ? T : (...t)=>d.current.onExpire?.(...t),
            "before-interactive-callback": o ? E : (...t)=>d.current.onBeforeInteractive?.(...t),
            "after-interactive-callback": o ? i : (...t)=>d.current.onAfterInteractive?.(...t),
            "unsupported-callback": o ? b : (...t)=>d.current.onUnsupported?.(...t),
            "timeout-callback": o ? A : (...t)=>d.current.onTimeout?.(...t)
        }), [
        e.action,
        e.appearance,
        e.cData,
        e.execution,
        e.language,
        e.refreshExpired,
        e.responseField,
        e.responseFieldName,
        e.retry,
        e.retryInterval,
        e.tabIndex,
        e.theme,
        e.feedbackEnabled,
        e.refreshTimeout,
        m,
        c,
        o,
        o ? g : null,
        o ? w : null,
        o ? T : null,
        o ? E : null,
        o ? i : null,
        o ? b : null,
        o ? A : null
    ]), y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>("TURBOPACK compile-time value", "undefined") < "u" && !!window.turnstile, []);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(function() {
        B && !x && (ee(C), X({
            onLoadCallbackName: C,
            scriptOptions: {
                ...s,
                id: N
            }
        }));
    }, [
        B,
        x,
        s,
        N,
        C
    ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(function() {
        k !== "ready" && ee(C).then(()=>F(!0)).catch(console.error);
    }, [
        C
    ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(function() {
        if (!u.current || !x) return;
        let l = !1;
        return (async ()=>{
            if (l || !u.current) return;
            let U = window.turnstile.render(u.current, P);
            r.current = U, r.current && S?.(r.current);
        })(), ()=>{
            l = !0, r.current && (window.turnstile.remove(r.current), L.current = !1);
        };
    }, [
        V,
        x,
        P
    ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useImperativeHandle"])(a, ()=>{
        let { turnstile: t } = window;
        return {
            getResponse () {
                if (!t?.getResponse || !r.current || !y()) {
                    console.warn("Turnstile has not been loaded");
                    return;
                }
                return t.getResponse(r.current);
            },
            async getResponsePromise (l = 3e4, Y = 100) {
                return new Promise((U, M)=>{
                    let p, q = async ()=>{
                        if (L.current && window.turnstile && r.current) try {
                            let v = window.turnstile.getResponse(r.current);
                            return p && clearTimeout(p), v ? U(v) : M(new Error("No response received"));
                        } catch (v) {
                            return p && clearTimeout(p), console.warn("Failed to get response", v), M(new Error("Failed to get response"));
                        }
                        p || (p = setTimeout(()=>{
                            p && clearTimeout(p), M(new Error("Timeout"));
                        }, l)), await new Promise((v)=>setTimeout(v, Y)), await q();
                    };
                    q();
                });
            },
            reset () {
                if (!t?.reset || !r.current || !y()) {
                    console.warn("Turnstile has not been loaded");
                    return;
                }
                e.execution === "execute" && R(f.invisible);
                try {
                    L.current = !1, t.reset(r.current);
                } catch (l) {
                    console.warn(`Failed to reset Turnstile widget ${r}`, l);
                }
            },
            remove () {
                if (!t?.remove || !r.current || !y()) {
                    console.warn("Turnstile has not been loaded");
                    return;
                }
                R(f.invisible), L.current = !1, t.remove(r.current), r.current = null;
            },
            render () {
                if (!t?.render || !u.current || !y() || r.current) {
                    console.warn("Turnstile has not been loaded or container not found");
                    return;
                }
                let l = t.render(u.current, P);
                return r.current = l, r.current && S?.(r.current), e.execution !== "execute" && R(c ? f[c] : {}), l;
            },
            execute () {
                if (e.execution !== "execute") {
                    console.warn('Execution mode is not set to "execute"');
                    return;
                }
                if (!t?.execute || !u.current || !r.current || !y()) {
                    console.warn("Turnstile has not been loaded or container not found");
                    return;
                }
                t.execute(u.current, P), R(c ? f[c] : {});
            },
            isExpired () {
                return !t?.isExpired || !r.current || !y() ? (console.warn("Turnstile has not been loaded"), !1) : t.isExpired(r.current);
            }
        };
    }, [
        r,
        e.execution,
        c,
        P,
        u,
        y,
        x,
        S
    ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (x || !D) return;
        if (window.turnstile) {
            F(!0);
            return;
        }
        let t = setInterval(()=>{
            window.turnstile && (F(!0), clearInterval(t));
        }, 50);
        return ()=>{
            clearInterval(t);
        };
    }, [
        x,
        D
    ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        R(H());
    }, [
        e.execution,
        c,
        ce
    ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        !D || typeof j != "function" || j();
    }, [
        D
    ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(J, {
        ref: u,
        as: oe,
        id: V,
        style: {
            ...se,
            ...ne
        },
        ...ie
    });
});
Ee.displayName = "Turnstile";
;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/TurnstileWrapper-Co-t5mTh.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TurnstileWrapper",
    ()=>t,
    "default",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$marsidev$2f$react$2d$turnstile$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@marsidev/react-turnstile/dist/index.js [app-ssr] (ecmascript)");
;
;
const t = ({ delayedExecution: t, captchaContext: o, ...n })=>{
    let { appId: s, setError: a, setToken: i, setExecuting: c, siteKey: p, ref: u } = o; /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$marsidev$2f$react$2d$turnstile$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Turnstile"], {
        ...n,
        ref: u,
        siteKey: p ?? "",
        options: {
            action: s,
            size: "invisible",
            ...t ? {
                appearance: "execute",
                execution: "execute"
            } : {
                appearance: "always",
                execution: "render"
            }
        },
        onUnsupported: ()=>{
            n.onUnsupported?.(), console.warn("Browser does not support Turnstile.");
        },
        onError: (e)=>{
            n.onError?.(e), a("Captcha failed"), c(!1);
        },
        onSuccess: (e)=>{
            n.onSuccess?.(e), i(e), c(!1);
        },
        onExpire: (e)=>{
            n.onExpire?.(e);
            try {
                u.current?.reset(), a(void 0), i(void 0);
            } catch (e) {
                a("expired_and_failed_reset");
            }
        }
    });
};
;
}),
];

//# sourceMappingURL=1b50e_4242b5e0._.js.map