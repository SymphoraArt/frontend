module.exports = [
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/micro-task.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "microTask",
    ()=>t
]);
function t(e) {
    typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((o)=>setTimeout(()=>{
            throw o;
        }));
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/disposables.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "disposables",
    ()=>o
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$micro$2d$task$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/micro-task.js [app-ssr] (ecmascript)");
;
function o() {
    let s = [], r = {
        addEventListener (e, t, n, i) {
            return e.addEventListener(t, n, i), r.add(()=>e.removeEventListener(t, n, i));
        },
        requestAnimationFrame (...e) {
            let t = requestAnimationFrame(...e);
            return r.add(()=>cancelAnimationFrame(t));
        },
        nextFrame (...e) {
            return r.requestAnimationFrame(()=>r.requestAnimationFrame(...e));
        },
        setTimeout (...e) {
            let t = setTimeout(...e);
            return r.add(()=>clearTimeout(t));
        },
        microTask (...e) {
            let t = {
                current: !0
            };
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$micro$2d$task$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["microTask"])(()=>{
                t.current && e[0]();
            }), r.add(()=>{
                t.current = !1;
            });
        },
        style (e, t, n) {
            let i = e.style.getPropertyValue(t);
            return Object.assign(e.style, {
                [t]: n
            }), this.add(()=>{
                Object.assign(e.style, {
                    [t]: i
                });
            });
        },
        group (e) {
            let t = o();
            return e(t), this.add(()=>t.dispose());
        },
        add (e) {
            return s.includes(e) || s.push(e), ()=>{
                let t = s.indexOf(e);
                if (t >= 0) for (let n of s.splice(t, 1))n();
            };
        },
        dispose () {
            for (let e of s.splice(0))e();
        }
    };
    return r;
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-disposables.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDisposables",
    ()=>p
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/disposables.js [app-ssr] (ecmascript)");
;
;
function p() {
    let [e] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disposables"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>()=>e.dispose(), [
        e
    ]), e;
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/env.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "env",
    ()=>s
]);
var i = Object.defineProperty;
var d = (t, e, n)=>e in t ? i(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : t[e] = n;
var r = (t, e, n)=>(d(t, typeof e != "symbol" ? e + "" : e, n), n);
class o {
    constructor(){
        r(this, "current", this.detect());
        r(this, "handoffState", "pending");
        r(this, "currentId", 0);
    }
    set(e) {
        this.current !== e && (this.handoffState = "pending", this.currentId = 0, this.current = e);
    }
    reset() {
        this.set(this.detect());
    }
    nextId() {
        return ++this.currentId;
    }
    get isServer() {
        return this.current === "server";
    }
    get isClient() {
        return this.current === "client";
    }
    detect() {
        return ("TURBOPACK compile-time truthy", 1) ? "server" : "TURBOPACK unreachable";
    }
    handoff() {
        this.handoffState === "pending" && (this.handoffState = "complete");
    }
    get isHandoffComplete() {
        return this.handoffState === "complete";
    }
}
let s = new o;
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsoMorphicEffect",
    ()=>n
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/env.js [app-ssr] (ecmascript)");
;
;
let n = (e, t)=>{
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["env"].isServer ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(e, t) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLayoutEffect"])(e, t);
};
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-latest-value.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLatestValue",
    ()=>s
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js [app-ssr] (ecmascript)");
;
;
function s(e) {
    let r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(e);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        r.current = e;
    }, [
        e
    ]), r;
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-event.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEvent",
    ()=>o
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$latest$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-latest-value.js [app-ssr] (ecmascript)");
;
;
let o = function(t) {
    let e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$latest$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLatestValue"])(t);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useCallback((...r)=>e.current(...r), [
        e
    ]);
};
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-is-mounted.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsMounted",
    ()=>f
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js [app-ssr] (ecmascript)");
;
;
function f() {
    let e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(!1);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>(e.current = !0, ()=>{
            e.current = !1;
        }), []), e;
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-server-handoff-complete.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useServerHandoffComplete",
    ()=>l
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/env.js [app-ssr] (ecmascript)");
;
;
function s() {
    let r = typeof document == "undefined";
    return "useSyncExternalStore" in __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ ? ((o)=>o.useSyncExternalStore)(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__)(()=>()=>{}, ()=>!1, ()=>!r) : !1;
}
function l() {
    let r = s(), [e, n] = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useState(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["env"].isHandoffComplete);
    return e && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["env"].isHandoffComplete === !1 && n(!1), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useEffect(()=>{
        e !== !0 && n(!0);
    }, [
        e
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useEffect(()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["env"].handoff(), []), r ? !1 : e;
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-sync-refs.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "optionalRef",
    ()=>T,
    "useSyncRefs",
    ()=>y
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-event.js [app-ssr] (ecmascript)");
;
;
let u = Symbol();
function T(t, n = !0) {
    return Object.assign(t, {
        [u]: n
    });
}
function y(...t) {
    let n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(t);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        n.current = t;
    }, [
        t
    ]);
    let c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((e)=>{
        for (let o of n.current)o != null && (typeof o == "function" ? o(e) : o.current = e);
    });
    return t.every((e)=>e == null || (e == null ? void 0 : e[u])) ? void 0 : c;
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-flags.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFlags",
    ()=>c
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function c(u = 0) {
    let [r, a] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(u), g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>a(e), []), s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>a((l)=>l | e), []), m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>(r & e) === e, [
        r
    ]), n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>a((l)=>l & ~e), []), F = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>a((l)=>l ^ e), []);
    return {
        flags: r,
        setFlag: g,
        addFlag: s,
        hasFlag: m,
        removeFlag: n,
        toggleFlag: F
    };
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-transition.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transitionDataAttributes",
    ()=>x,
    "useTransition",
    ()=>N
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/disposables.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-disposables.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$flags$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-flags.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js [app-ssr] (ecmascript)");
var T, S;
;
;
;
;
;
typeof process != "undefined" && typeof globalThis != "undefined" && typeof Element != "undefined" && ((T = process == null ? void 0 : process.env) == null ? void 0 : T["NODE_ENV"]) === "test" && typeof ((S = Element == null ? void 0 : Element.prototype) == null ? void 0 : S.getAnimations) == "undefined" && (Element.prototype.getAnimations = function() {
    return console.warn([
        "Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.",
        "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.",
        "",
        "Example usage:",
        "```js",
        "import { mockAnimationsApi } from 'jsdom-testing-mocks'",
        "mockAnimationsApi()",
        "```"
    ].join(`
`)), [];
});
var A = ((i)=>(i[i.None = 0] = "None", i[i.Closed = 1] = "Closed", i[i.Enter = 2] = "Enter", i[i.Leave = 4] = "Leave", i))(A || {});
function x(e) {
    let r = {};
    for(let t in e)e[t] === !0 && (r[`data-${t}`] = "");
    return r;
}
function N(e, r, t, n) {
    let [i, a] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(t), { hasFlag: s, addFlag: o, removeFlag: l } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$flags$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useFlags"])(e && i ? 3 : 0), u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(!1), f = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(!1), E = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDisposables"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        var d;
        if (e) {
            if (t && a(!0), !r) {
                t && o(3);
                return;
            }
            return (d = n == null ? void 0 : n.start) == null || d.call(n, t), C(r, {
                inFlight: u,
                prepare () {
                    f.current ? f.current = !1 : f.current = u.current, u.current = !0, !f.current && (t ? (o(3), l(4)) : (o(4), l(2)));
                },
                run () {
                    f.current ? t ? (l(3), o(4)) : (l(4), o(3)) : t ? l(1) : o(1);
                },
                done () {
                    var p;
                    f.current && D(r) || (u.current = !1, l(7), t || a(!1), (p = n == null ? void 0 : n.end) == null || p.call(n, t));
                }
            });
        }
    }, [
        e,
        t,
        r,
        E
    ]), e ? [
        i,
        {
            closed: s(1),
            enter: s(2),
            leave: s(4),
            transition: s(2) || s(4)
        }
    ] : [
        t,
        {
            closed: void 0,
            enter: void 0,
            leave: void 0,
            transition: void 0
        }
    ];
}
function C(e, { prepare: r, run: t, done: n, inFlight: i }) {
    let a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disposables"])();
    return j(e, {
        prepare: r,
        inFlight: i
    }), a.nextFrame(()=>{
        t(), a.requestAnimationFrame(()=>{
            a.add(M(e, n));
        });
    }), a.dispose;
}
function M(e, r) {
    var a, s;
    let t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disposables"])();
    if (!e) return t.dispose;
    let n = !1;
    t.add(()=>{
        n = !0;
    });
    let i = (s = (a = e.getAnimations) == null ? void 0 : a.call(e).filter((o)=>o instanceof CSSTransition)) != null ? s : [];
    return i.length === 0 ? (r(), t.dispose) : (Promise.allSettled(i.map((o)=>o.finished)).then(()=>{
        n || r();
    }), t.dispose);
}
function j(e, { inFlight: r, prepare: t }) {
    if (r != null && r.current) {
        t();
        return;
    }
    let n = e.style.transition;
    e.style.transition = "none", t(), e.offsetHeight, e.style.transition = n;
}
function D(e) {
    var t, n;
    return ((n = (t = e.getAnimations) == null ? void 0 : t.call(e)) != null ? n : []).some((i)=>i instanceof CSSTransition && i.playState !== "finished");
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/internal/open-closed.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OpenClosedProvider",
    ()=>c,
    "ResetOpenClosedProvider",
    ()=>s,
    "State",
    ()=>i,
    "useOpenClosed",
    ()=>u
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
let n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
n.displayName = "OpenClosedContext";
var i = ((e)=>(e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(i || {});
function u() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(n);
}
function c({ value: o, children: t }) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(n.Provider, {
        value: o
    }, t);
}
function s({ children: o }) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(n.Provider, {
        value: null
    }, o);
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/class-names.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "classNames",
    ()=>t
]);
function t(...r) {
    return Array.from(new Set(r.flatMap((n)=>typeof n == "string" ? n.split(" ") : []))).filter(Boolean).join(" ");
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/match.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "match",
    ()=>u
]);
function u(r, n, ...a) {
    if (r in n) {
        let e = n[r];
        return typeof e == "function" ? e(...a) : e;
    }
    let t = new Error(`Tried to handle "${r}" but there is no handler defined. Only defined handlers are: ${Object.keys(n).map((e)=>`"${e}"`).join(", ")}.`);
    throw Error.captureStackTrace && Error.captureStackTrace(t, u), t;
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/render.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RenderFeatures",
    ()=>A,
    "RenderStrategy",
    ()=>C,
    "compact",
    ()=>m,
    "forwardRefWithAs",
    ()=>Y,
    "isFragment",
    ()=>b,
    "isFragmentInstance",
    ()=>D,
    "mergeProps",
    ()=>V,
    "useRender",
    ()=>K
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$class$2d$names$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/class-names.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$match$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/match.js [app-ssr] (ecmascript)");
;
;
;
var A = ((a)=>(a[a.None = 0] = "None", a[a.RenderStrategy = 1] = "RenderStrategy", a[a.Static = 2] = "Static", a))(A || {}), C = ((e)=>(e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(C || {});
function K() {
    let n = $();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((r)=>U({
            mergeRefs: n,
            ...r
        }), [
        n
    ]);
}
function U({ ourProps: n, theirProps: r, slot: e, defaultTag: a, features: s, visible: t = !0, name: l, mergeRefs: i }) {
    i = i != null ? i : I;
    let o = P(r, n);
    if (t) return F(o, e, a, l, i);
    let y = s != null ? s : 0;
    if (y & 2) {
        let { static: f = !1, ...u } = o;
        if (f) return F(u, e, a, l, i);
    }
    if (y & 1) {
        let { unmount: f = !0, ...u } = o;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$match$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["match"])(f ? 0 : 1, {
            [0] () {
                return null;
            },
            [1] () {
                return F({
                    ...u,
                    hidden: !0,
                    style: {
                        display: "none"
                    }
                }, e, a, l, i);
            }
        });
    }
    return F(o, e, a, l, i);
}
function F(n, r = {}, e, a, s) {
    let { as: t = e, children: l, refName: i = "ref", ...o } = h(n, [
        "unmount",
        "static"
    ]), y = n.ref !== void 0 ? {
        [i]: n.ref
    } : {}, f = typeof l == "function" ? l(r) : l;
    "className" in o && o.className && typeof o.className == "function" && (o.className = o.className(r)), o["aria-labelledby"] && o["aria-labelledby"] === o.id && (o["aria-labelledby"] = void 0);
    let u = {};
    if (r) {
        let d = !1, p = [];
        for (let [c, T] of Object.entries(r))typeof T == "boolean" && (d = !0), T === !0 && p.push(c.replace(/([A-Z])/g, (g)=>`-${g.toLowerCase()}`));
        if (d) {
            u["data-headlessui-state"] = p.join(" ");
            for (let c of p)u[`data-${c}`] = "";
        }
    }
    if (b(t) && (Object.keys(m(o)).length > 0 || Object.keys(m(u)).length > 0)) if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidElement"])(f) || Array.isArray(f) && f.length > 1 || D(f)) {
        if (Object.keys(m(o)).length > 0) throw new Error([
            'Passing props on "Fragment"!',
            "",
            `The current component <${a} /> is rendering a "Fragment".`,
            "However we need to passthrough the following props:",
            Object.keys(m(o)).concat(Object.keys(m(u))).map((d)=>`  - ${d}`).join(`
`),
            "",
            "You can apply a few solutions:",
            [
                'Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',
                "Render a single element as the child so that we can forward the props onto that element."
            ].map((d)=>`  - ${d}`).join(`
`)
        ].join(`
`));
    } else {
        let d = f.props, p = d == null ? void 0 : d.className, c = typeof p == "function" ? (...R)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$class$2d$names$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])(p(...R), o.className) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$class$2d$names$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])(p, o.className), T = c ? {
            className: c
        } : {}, g = P(f.props, m(h(o, [
            "ref"
        ])));
        for(let R in u)R in g && delete u[R];
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cloneElement"])(f, Object.assign({}, g, u, y, {
            ref: s(H(f), y.ref)
        }, T));
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])(t, Object.assign({}, h(o, [
        "ref"
    ]), !b(t) && y, !b(t) && u), f);
}
function $() {
    let n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]), r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>{
        for (let a of n.current)a != null && (typeof a == "function" ? a(e) : a.current = e);
    }, []);
    return (...e)=>{
        if (!e.every((a)=>a == null)) return n.current = e, r;
    };
}
function I(...n) {
    return n.every((r)=>r == null) ? void 0 : (r)=>{
        for (let e of n)e != null && (typeof e == "function" ? e(r) : e.current = r);
    };
}
function P(...n) {
    var a;
    if (n.length === 0) return {};
    if (n.length === 1) return n[0];
    let r = {}, e = {};
    for (let s of n)for(let t in s)t.startsWith("on") && typeof s[t] == "function" ? ((a = e[t]) != null || (e[t] = []), e[t].push(s[t])) : r[t] = s[t];
    if (r.disabled || r["aria-disabled"]) for(let s in e)/^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(s) && (e[s] = [
        (t)=>{
            var l;
            return (l = t == null ? void 0 : t.preventDefault) == null ? void 0 : l.call(t);
        }
    ]);
    for(let s in e)Object.assign(r, {
        [s] (t, ...l) {
            let i = e[s];
            for (let o of i){
                if ((t instanceof Event || (t == null ? void 0 : t.nativeEvent) instanceof Event) && t.defaultPrevented) return;
                o(t, ...l);
            }
        }
    });
    return r;
}
function V(...n) {
    var a;
    if (n.length === 0) return {};
    if (n.length === 1) return n[0];
    let r = {}, e = {};
    for (let s of n)for(let t in s)t.startsWith("on") && typeof s[t] == "function" ? ((a = e[t]) != null || (e[t] = []), e[t].push(s[t])) : r[t] = s[t];
    for(let s in e)Object.assign(r, {
        [s] (...t) {
            let l = e[s];
            for (let i of l)i == null || i(...t);
        }
    });
    return r;
}
function Y(n) {
    var r;
    return Object.assign((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(n), {
        displayName: (r = n.displayName) != null ? r : n.name
    });
}
function m(n) {
    let r = Object.assign({}, n);
    for(let e in r)r[e] === void 0 && delete r[e];
    return r;
}
function h(n, r = []) {
    let e = Object.assign({}, n);
    for (let a of r)a in e && delete e[a];
    return e;
}
function H(n) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].version.split(".")[0] >= "19" ? n.props.ref : n.ref;
}
function b(n) {
    return n === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"] || n === Symbol.for("react.fragment");
}
function D(n) {
    return b(n.type);
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/transition/transition.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Transition",
    ()=>Ke,
    "TransitionChild",
    ()=>Oe
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-disposables.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-event.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$is$2d$mounted$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-is-mounted.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$latest$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-latest-value.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$server$2d$handoff$2d$complete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-server-handoff-complete.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-sync-refs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$transition$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-transition.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/internal/open-closed.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$class$2d$names$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/class-names.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$match$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/match.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/render.js [app-ssr] (ecmascript)");
"use client";
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
function ue(e) {
    var t;
    return !!(e.enter || e.enterFrom || e.enterTo || e.leave || e.leaveFrom || e.leaveTo) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFragment"])((t = e.as) != null ? t : de) || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Children.count(e.children) === 1;
}
let V = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
V.displayName = "TransitionContext";
var De = ((n)=>(n.Visible = "visible", n.Hidden = "hidden", n))(De || {});
function He() {
    let e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(V);
    if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
    return e;
}
function Ae() {
    let e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(w);
    if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
    return e;
}
let w = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
w.displayName = "NestingContext";
function M(e) {
    return "children" in e ? M(e.children) : e.current.filter(({ el: t })=>t.current !== null).filter(({ state: t })=>t === "visible").length > 0;
}
function Te(e, t) {
    let n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$latest$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLatestValue"])(e), l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]), S = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$is$2d$mounted$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsMounted"])(), R = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDisposables"])(), d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((o, i = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RenderStrategy"].Hidden)=>{
        let a = l.current.findIndex(({ el: s })=>s === o);
        a !== -1 && ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$match$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["match"])(i, {
            [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RenderStrategy"].Unmount] () {
                l.current.splice(a, 1);
            },
            [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RenderStrategy"].Hidden] () {
                l.current[a].state = "hidden";
            }
        }), R.microTask(()=>{
            var s;
            !M(l) && S.current && ((s = n.current) == null || s.call(n));
        }));
    }), y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((o)=>{
        let i = l.current.find(({ el: a })=>a === o);
        return i ? i.state !== "visible" && (i.state = "visible") : l.current.push({
            el: o,
            state: "visible"
        }), ()=>d(o, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RenderStrategy"].Unmount);
    }), C = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]), p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(Promise.resolve()), h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        enter: [],
        leave: []
    }), g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((o, i, a)=>{
        C.current.splice(0), t && (t.chains.current[i] = t.chains.current[i].filter(([s])=>s !== o)), t == null || t.chains.current[i].push([
            o,
            new Promise((s)=>{
                C.current.push(s);
            })
        ]), t == null || t.chains.current[i].push([
            o,
            new Promise((s)=>{
                Promise.all(h.current[i].map(([r, f])=>f)).then(()=>s());
            })
        ]), i === "enter" ? p.current = p.current.then(()=>t == null ? void 0 : t.wait.current).then(()=>a(i)) : a(i);
    }), v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((o, i, a)=>{
        Promise.all(h.current[i].splice(0).map(([s, r])=>r)).then(()=>{
            var s;
            (s = C.current.shift()) == null || s();
        }).then(()=>a(i));
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            children: l,
            register: y,
            unregister: d,
            onStart: g,
            onStop: v,
            wait: p,
            chains: h
        }), [
        y,
        d,
        l,
        g,
        v,
        h,
        p
    ]);
}
let de = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], fe = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RenderFeatures"].RenderStrategy;
function Fe(e, t) {
    var ee, te;
    let { transition: n = !0, beforeEnter: l, afterEnter: S, beforeLeave: R, afterLeave: d, enter: y, enterFrom: C, enterTo: p, entered: h, leave: g, leaveFrom: v, leaveTo: o, ...i } = e, [a, s] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null), r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null), f = ue(e), U = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncRefs"])(...f ? [
        r,
        t,
        s
    ] : t === null ? [] : [
        t
    ]), H = (ee = i.unmount) == null || ee ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RenderStrategy"].Unmount : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RenderStrategy"].Hidden, { show: u, appear: z, initial: K } = He(), [m, j] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(u ? "visible" : "hidden"), Q = Ae(), { register: A, unregister: F } = Q;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>A(r), [
        A,
        r
    ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        if (H === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RenderStrategy"].Hidden && r.current) {
            if (u && m !== "visible") {
                j("visible");
                return;
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$match$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["match"])(m, {
                ["hidden"]: ()=>F(r),
                ["visible"]: ()=>A(r)
            });
        }
    }, [
        m,
        r,
        A,
        F,
        u,
        H
    ]);
    let G = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$server$2d$handoff$2d$complete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useServerHandoffComplete"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        if (f && G && m === "visible" && r.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
    }, [
        r,
        m,
        G,
        f
    ]);
    let ce = K && !z, Y = z && u && K, B = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(!1), I = Te(()=>{
        B.current || (j("hidden"), F(r));
    }, Q), Z = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((W)=>{
        B.current = !0;
        let L = W ? "enter" : "leave";
        I.onStart(r, L, (_)=>{
            _ === "enter" ? l == null || l() : _ === "leave" && (R == null || R());
        });
    }), $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((W)=>{
        let L = W ? "enter" : "leave";
        B.current = !1, I.onStop(r, L, (_)=>{
            _ === "enter" ? S == null || S() : _ === "leave" && (d == null || d());
        }), L === "leave" && !M(I) && (j("hidden"), F(r));
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        f && n || (Z(u), $(u));
    }, [
        u,
        f,
        n
    ]);
    let pe = (()=>!(!n || !f || !G || ce))(), [, T] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$transition$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransition"])(pe, a, u, {
        start: Z,
        end: $
    }), Ce = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["compact"])({
        ref: U,
        className: ((te = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$class$2d$names$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classNames"])(i.className, Y && y, Y && C, T.enter && y, T.enter && T.closed && C, T.enter && !T.closed && p, T.leave && g, T.leave && !T.closed && v, T.leave && T.closed && o, !T.transition && u && h)) == null ? void 0 : te.trim()) || void 0,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$transition$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["transitionDataAttributes"])(T)
    }), N = 0;
    m === "visible" && (N |= __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["State"].Open), m === "hidden" && (N |= __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["State"].Closed), u && m === "hidden" && (N |= __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["State"].Opening), !u && m === "visible" && (N |= __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["State"].Closing);
    let he = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(w.Provider, {
        value: I
    }, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OpenClosedProvider"], {
        value: N
    }, he({
        ourProps: Ce,
        theirProps: i,
        defaultTag: de,
        features: fe,
        visible: m === "visible",
        name: "Transition.Child"
    })));
}
function Ie(e, t) {
    let { show: n, appear: l = !1, unmount: S = !0, ...R } = e, d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null), y = ue(e), C = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncRefs"])(...y ? [
        d,
        t
    ] : t === null ? [] : [
        t
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$server$2d$handoff$2d$complete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useServerHandoffComplete"])();
    let p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOpenClosed"])();
    if (n === void 0 && p !== null && (n = (p & __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["State"].Open) === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["State"].Open), n === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
    let [h, g] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(n ? "visible" : "hidden"), v = Te(()=>{
        n || g("hidden");
    }), [o, i] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(!0), a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([
        n
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        o !== !1 && a.current[a.current.length - 1] !== n && (a.current.push(n), i(!1));
    }, [
        a,
        n
    ]);
    let s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            show: n,
            appear: l,
            initial: o
        }), [
        n,
        l,
        o
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        n ? g("visible") : !M(v) && d.current !== null && g("hidden");
    }, [
        n,
        v
    ]);
    let r = {
        unmount: S
    }, f = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])(()=>{
        var u;
        o && i(!1), (u = e.beforeEnter) == null || u.call(e);
    }), U = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])(()=>{
        var u;
        o && i(!1), (u = e.beforeLeave) == null || u.call(e);
    }), H = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(w.Provider, {
        value: v
    }, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(V.Provider, {
        value: s
    }, H({
        ourProps: {
            ...r,
            as: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"],
            children: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(me, {
                ref: C,
                ...r,
                ...R,
                beforeEnter: f,
                beforeLeave: U
            })
        },
        theirProps: {},
        defaultTag: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"],
        features: fe,
        visible: h === "visible",
        name: "Transition"
    })));
}
function Le(e, t) {
    let n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(V) !== null, l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOpenClosed"])() !== null;
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, null, !n && l ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(X, {
        ref: t,
        ...e
    }) : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(me, {
        ref: t,
        ...e
    }));
}
let X = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(Ie), me = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(Fe), Oe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(Le), Ke = Object.assign(X, {
    Child: Oe,
    Root: X
});
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/keyboard.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Keys",
    ()=>o
]);
var o = ((r)=>(r.Space = " ", r.Enter = "Enter", r.Escape = "Escape", r.Backspace = "Backspace", r.Delete = "Delete", r.ArrowLeft = "ArrowLeft", r.ArrowUp = "ArrowUp", r.ArrowRight = "ArrowRight", r.ArrowDown = "ArrowDown", r.Home = "Home", r.End = "End", r.PageUp = "PageUp", r.PageDown = "PageDown", r.Tab = "Tab", r))(o || {});
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-event-listener.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEventListener",
    ()=>E
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$latest$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-latest-value.js [app-ssr] (ecmascript)");
;
;
function E(n, e, a, t) {
    let i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$latest$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLatestValue"])(a);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        n = n != null ? n : window;
        function r(o) {
            i.current(o);
        }
        return n.addEventListener(e, r, t), ()=>n.removeEventListener(e, r, t);
    }, [
        n,
        e,
        t
    ]);
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/default-map.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DefaultMap",
    ()=>a
]);
class a extends Map {
    constructor(t){
        super();
        this.factory = t;
    }
    get(t) {
        let e = super.get(t);
        return e === void 0 && (e = this.factory(t), this.set(t, e)), e;
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/machine.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Machine",
    ()=>T,
    "batch",
    ()=>k,
    "shallowEqual",
    ()=>j
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$default$2d$map$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/default-map.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/disposables.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/env.js [app-ssr] (ecmascript)");
var h = Object.defineProperty;
var v = (t, e, r)=>e in t ? h(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : t[e] = r;
var S = (t, e, r)=>(v(t, typeof e != "symbol" ? e + "" : e, r), r), b = (t, e, r)=>{
    if (!e.has(t)) throw TypeError("Cannot " + r);
};
var i = (t, e, r)=>(b(t, e, "read from private field"), r ? r.call(t) : e.get(t)), c = (t, e, r)=>{
    if (e.has(t)) throw TypeError("Cannot add the same private member more than once");
    e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, u = (t, e, r, s)=>(b(t, e, "write to private field"), s ? s.call(t, r) : e.set(t, r), r);
var n, a, o;
;
;
;
class T {
    constructor(e){
        c(this, n, {});
        c(this, a, new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$default$2d$map$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DefaultMap"](()=>new Set));
        c(this, o, new Set);
        S(this, "disposables", (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disposables"])());
        u(this, n, e), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["env"].isServer && this.disposables.microTask(()=>{
            this.dispose();
        });
    }
    dispose() {
        this.disposables.dispose();
    }
    get state() {
        return i(this, n);
    }
    subscribe(e, r) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["env"].isServer) return ()=>{};
        let s = {
            selector: e,
            callback: r,
            current: e(i(this, n))
        };
        return i(this, o).add(s), this.disposables.add(()=>{
            i(this, o).delete(s);
        });
    }
    on(e, r) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["env"].isServer ? ()=>{} : (i(this, a).get(e).add(r), this.disposables.add(()=>{
            i(this, a).get(e).delete(r);
        }));
    }
    send(e) {
        let r = this.reduce(i(this, n), e);
        if (r !== i(this, n)) {
            u(this, n, r);
            for (let s of i(this, o)){
                let l = s.selector(i(this, n));
                j(s.current, l) || (s.current = l, s.callback(l));
            }
            for (let s of i(this, a).get(e.type))s(i(this, n), e);
        }
    }
}
n = new WeakMap, a = new WeakMap, o = new WeakMap;
function j(t, e) {
    return Object.is(t, e) ? !0 : typeof t != "object" || t === null || typeof e != "object" || e === null ? !1 : Array.isArray(t) && Array.isArray(e) ? t.length !== e.length ? !1 : f(t[Symbol.iterator](), e[Symbol.iterator]()) : t instanceof Map && e instanceof Map || t instanceof Set && e instanceof Set ? t.size !== e.size ? !1 : f(t.entries(), e.entries()) : p(t) && p(e) ? f(Object.entries(t)[Symbol.iterator](), Object.entries(e)[Symbol.iterator]()) : !1;
}
function f(t, e) {
    do {
        let r = t.next(), s = e.next();
        if (r.done && s.done) return !0;
        if (r.done || s.done || !Object.is(r.value, s.value)) return !1;
    }while (!0)
}
function p(t) {
    if (Object.prototype.toString.call(t) !== "[object Object]") return !1;
    let e = Object.getPrototypeOf(t);
    return e === null || Object.getPrototypeOf(e) === null;
}
function k(t) {
    let [e, r] = t(), s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disposables"])();
    return (...l)=>{
        e(...l), s.dispose(), s.microTask(r);
    };
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/machines/stack-machine.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActionTypes",
    ()=>k,
    "stackMachines",
    ()=>x
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/machine.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$default$2d$map$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/default-map.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$match$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/match.js [app-ssr] (ecmascript)");
var a = Object.defineProperty;
var r = (e, c, t)=>c in e ? a(e, c, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : e[c] = t;
var p = (e, c, t)=>(r(e, typeof c != "symbol" ? c + "" : c, t), t);
;
;
;
var k = ((t)=>(t[t.Push = 0] = "Push", t[t.Pop = 1] = "Pop", t))(k || {});
let y = {
    [0] (e, c) {
        let t = c.id, s = e.stack, i = e.stack.indexOf(t);
        if (i !== -1) {
            let n = e.stack.slice();
            return n.splice(i, 1), n.push(t), s = n, {
                ...e,
                stack: s
            };
        }
        return {
            ...e,
            stack: [
                ...e.stack,
                t
            ]
        };
    },
    [1] (e, c) {
        let t = c.id, s = e.stack.indexOf(t);
        if (s === -1) return e;
        let i = e.stack.slice();
        return i.splice(s, 1), {
            ...e,
            stack: i
        };
    }
};
class o extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Machine"] {
    constructor(){
        super(...arguments);
        p(this, "actions", {
            push: (t)=>this.send({
                    type: 0,
                    id: t
                }),
            pop: (t)=>this.send({
                    type: 1,
                    id: t
                })
        });
        p(this, "selectors", {
            isTop: (t, s)=>t.stack[t.stack.length - 1] === s,
            inStack: (t, s)=>t.stack.includes(s)
        });
    }
    static new() {
        return new o({
            stack: []
        });
    }
    reduce(t, s) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$match$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["match"])(s.type, y, t, s);
    }
}
const x = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$default$2d$map$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DefaultMap"](()=>o.new());
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/react-glue.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSlice",
    ()=>S
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$use$2d$sync$2d$external$2d$store$2f$with$2d$selector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/use-sync-external-store/with-selector.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-event.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/machine.js [app-ssr] (ecmascript)");
;
;
;
function S(e, n, r = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["shallowEqual"]) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$use$2d$sync$2d$external$2d$store$2f$with$2d$selector$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStoreWithSelector"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((i)=>e.subscribe(s, i)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])(()=>e.state), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])(()=>e.state), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])(n), r);
}
function s(e) {
    return e;
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-is-top-layer.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsTopLayer",
    ()=>I
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machines$2f$stack$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/machines/stack-machine.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/react-glue.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js [app-ssr] (ecmascript)");
;
;
;
;
function I(o, s) {
    let t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])(), r = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machines$2f$stack$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stackMachines"].get(s), [i, c] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSlice"])(r, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((e)=>[
            r.selectors.isTop(e, t),
            r.selectors.inStack(e, t)
        ], [
        r,
        t
    ]));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        if (o) return r.actions.push(t), ()=>r.actions.pop(t);
    }, [
        r,
        o,
        t
    ]), o ? c ? i : !0 : !1;
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-escape.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEscape",
    ()=>a
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/keyboard.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2d$listener$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-event-listener.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$is$2d$top$2d$layer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-is-top-layer.js [app-ssr] (ecmascript)");
;
;
;
function a(o, r = typeof document != "undefined" ? document.defaultView : null, t) {
    let n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$is$2d$top$2d$layer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsTopLayer"])(o, "escape");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2d$listener$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventListener"])(r, "keydown", (e)=>{
        n && (e.defaultPrevented || e.key === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$keyboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Keys"].Escape && t(e));
    });
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/owner.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getActiveElement",
    ()=>e,
    "getOwnerDocument",
    ()=>l,
    "getRootNode",
    ()=>r,
    "isActiveElement",
    ()=>d
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/env.js [app-ssr] (ecmascript)");
;
function l(n) {
    var u;
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["env"].isServer ? null : n == null ? document : (u = n == null ? void 0 : n.ownerDocument) != null ? u : document;
}
function r(n) {
    var u, o;
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["env"].isServer ? null : n == null ? document : (o = (u = n == null ? void 0 : n.getRootNode) == null ? void 0 : u.call(n)) != null ? o : document;
}
function e(n) {
    var u, o;
    return (o = (u = r(n)) == null ? void 0 : u.activeElement) != null ? o : null;
}
function d(n) {
    return e(n) === n;
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-inert-others.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useInertOthers",
    ()=>y
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/disposables.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/owner.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$is$2d$top$2d$layer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-is-top-layer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js [app-ssr] (ecmascript)");
;
;
;
;
let f = new Map, u = new Map;
function h(t) {
    var e;
    let r = (e = u.get(t)) != null ? e : 0;
    return u.set(t, r + 1), r !== 0 ? ()=>m(t) : (f.set(t, {
        "aria-hidden": t.getAttribute("aria-hidden"),
        inert: t.inert
    }), t.setAttribute("aria-hidden", "true"), t.inert = !0, ()=>m(t));
}
function m(t) {
    var i;
    let r = (i = u.get(t)) != null ? i : 1;
    if (r === 1 ? u.delete(t) : u.set(t, r - 1), r !== 1) return;
    let e = f.get(t);
    e && (e["aria-hidden"] === null ? t.removeAttribute("aria-hidden") : t.setAttribute("aria-hidden", e["aria-hidden"]), t.inert = e.inert, f.delete(t));
}
function y(t, { allowed: r, disallowed: e } = {}) {
    let i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$is$2d$top$2d$layer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsTopLayer"])(t, "inert-others");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        var d, c;
        if (!i) return;
        let a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disposables"])();
        for (let n of (d = e == null ? void 0 : e()) != null ? d : [])n && a.add(h(n));
        let s = (c = r == null ? void 0 : r()) != null ? c : [];
        for (let n of s){
            if (!n) continue;
            let l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOwnerDocument"])(n);
            if (!l) continue;
            let o = n.parentElement;
            for(; o && o !== l.body;){
                for (let p of o.children)s.some((E)=>p.contains(E)) || a.add(h(p));
                o = o.parentElement;
            }
        }
        return a.dispose;
    }, [
        i,
        r,
        e
    ]);
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-is-touch-device.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsTouchDevice",
    ()=>f
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js [app-ssr] (ecmascript)");
;
;
function f() {
    var t;
    let [e] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null), [o, c] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])((t = e == null ? void 0 : e.matches) != null ? t : !1);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        if (!e) return;
        function n(r) {
            c(r.matches);
        }
        return e.addEventListener("change", n), ()=>e.removeEventListener("change", n);
    }, [
        e
    ]), o;
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/dom.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hasInlineStyle",
    ()=>r,
    "isElement",
    ()=>t,
    "isHTMLElement",
    ()=>n,
    "isHTMLFieldSetElement",
    ()=>a,
    "isHTMLIframeElement",
    ()=>u,
    "isHTMLInputElement",
    ()=>l,
    "isHTMLLabelElement",
    ()=>m,
    "isHTMLLegendElement",
    ()=>E,
    "isHTMLTextAreaElement",
    ()=>s,
    "isHTMLorSVGElement",
    ()=>i,
    "isInteractiveElement",
    ()=>L,
    "isNode",
    ()=>o
]);
function o(e) {
    return typeof e != "object" || e === null ? !1 : "nodeType" in e;
}
function t(e) {
    return o(e) && "tagName" in e;
}
function n(e) {
    return t(e) && "accessKey" in e;
}
function i(e) {
    return t(e) && "tabIndex" in e;
}
function r(e) {
    return t(e) && "style" in e;
}
function u(e) {
    return n(e) && e.nodeName === "IFRAME";
}
function l(e) {
    return n(e) && e.nodeName === "INPUT";
}
function s(e) {
    return n(e) && e.nodeName === "TEXTAREA";
}
function m(e) {
    return n(e) && e.nodeName === "LABEL";
}
function a(e) {
    return n(e) && e.nodeName === "FIELDSET";
}
function E(e) {
    return n(e) && e.nodeName === "LEGEND";
}
function L(e) {
    return t(e) ? e.matches('a[href],audio[controls],button,details,embed,iframe,img[usemap],input:not([type="hidden"]),label,select,textarea,video[controls]') : !1;
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-on-disappear.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useOnDisappear",
    ()=>p
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/disposables.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$latest$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-latest-value.js [app-ssr] (ecmascript)");
;
;
;
;
function p(s, n, o) {
    let i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$latest$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLatestValue"])((t)=>{
        let e = t.getBoundingClientRect();
        e.x === 0 && e.y === 0 && e.width === 0 && e.height === 0 && o();
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!s) return;
        let t = n === null ? null : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"](n) ? n : n.current;
        if (!t) return;
        let e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disposables"])();
        if (typeof ResizeObserver != "undefined") {
            let r = new ResizeObserver(()=>i.current(t));
            r.observe(t), e.add(()=>r.disconnect());
        }
        if (typeof IntersectionObserver != "undefined") {
            let r = new IntersectionObserver(()=>i.current(t));
            r.observe(t), e.add(()=>r.disconnect());
        }
        return ()=>e.dispose();
    }, [
        n,
        i,
        s
    ]);
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/focus-management.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Focus",
    ()=>T,
    "FocusResult",
    ()=>A,
    "FocusableMode",
    ()=>I,
    "focusElement",
    ()=>w,
    "focusFrom",
    ()=>R,
    "focusIn",
    ()=>v,
    "focusableSelector",
    ()=>E,
    "getAutoFocusableElements",
    ()=>h,
    "getFocusableElements",
    ()=>x,
    "isFocusableElement",
    ()=>H,
    "restoreFocusIfNecessary",
    ()=>K,
    "sortByDomNode",
    ()=>G
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/disposables.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$match$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/match.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/owner.js [app-ssr] (ecmascript)");
;
;
;
;
let E = [
    "[contentEditable=true]",
    "[tabindex]",
    "a[href]",
    "area[href]",
    "button:not([disabled])",
    "iframe",
    "input:not([disabled])",
    "select:not([disabled])",
    "details>summary",
    "textarea:not([disabled])"
].map((e)=>`${e}:not([tabindex='-1'])`).join(","), S = [
    "[data-autofocus]"
].map((e)=>`${e}:not([tabindex='-1'])`).join(",");
var T = ((o)=>(o[o.First = 1] = "First", o[o.Previous = 2] = "Previous", o[o.Next = 4] = "Next", o[o.Last = 8] = "Last", o[o.WrapAround = 16] = "WrapAround", o[o.NoScroll = 32] = "NoScroll", o[o.AutoFocus = 64] = "AutoFocus", o))(T || {}), A = ((n)=>(n[n.Error = 0] = "Error", n[n.Overflow = 1] = "Overflow", n[n.Success = 2] = "Success", n[n.Underflow = 3] = "Underflow", n))(A || {}), O = ((t)=>(t[t.Previous = -1] = "Previous", t[t.Next = 1] = "Next", t))(O || {});
function x(e = document.body) {
    return e == null ? [] : Array.from(e.querySelectorAll(E)).sort((r, t)=>Math.sign((r.tabIndex || Number.MAX_SAFE_INTEGER) - (t.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function h(e = document.body) {
    return e == null ? [] : Array.from(e.querySelectorAll(S)).sort((r, t)=>Math.sign((r.tabIndex || Number.MAX_SAFE_INTEGER) - (t.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var I = ((t)=>(t[t.Strict = 0] = "Strict", t[t.Loose = 1] = "Loose", t))(I || {});
function H(e, r = 0) {
    var t;
    return e === ((t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOwnerDocument"])(e)) == null ? void 0 : t.body) ? !1 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$match$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["match"])(r, {
        [0] () {
            return e.matches(E);
        },
        [1] () {
            let l = e;
            for(; l !== null;){
                if (l.matches(E)) return !0;
                l = l.parentElement;
            }
            return !1;
        }
    });
}
function K(e) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disposables"])().nextFrame(()=>{
        let r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getActiveElement"])(e);
        r && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLorSVGElement"](r) && !H(r, 0) && w(e);
    });
}
var g = ((t)=>(t[t.Keyboard = 0] = "Keyboard", t[t.Mouse = 1] = "Mouse", t))(g || {});
("TURBOPACK compile-time value", "undefined") != "undefined" && typeof document != "undefined" && (document.addEventListener("keydown", (e)=>{
    e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e)=>{
    e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function w(e) {
    e == null || e.focus({
        preventScroll: !0
    });
}
let _ = [
    "textarea",
    "input"
].join(",");
function P(e) {
    var r, t;
    return (t = (r = e == null ? void 0 : e.matches) == null ? void 0 : r.call(e, _)) != null ? t : !1;
}
function G(e, r = (t)=>t) {
    return e.slice().sort((t, l)=>{
        let n = r(t), a = r(l);
        if (n === null || a === null) return 0;
        let u = n.compareDocumentPosition(a);
        return u & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : u & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
    });
}
function R(e, r, t = e === null ? document.body : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRootNode"])(e)) {
    return v(x(t), r, {
        relativeTo: e
    });
}
function v(e, r, { sorted: t = !0, relativeTo: l = null, skipElements: n = [] } = {}) {
    let a = Array.isArray(e) ? e.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRootNode"])(e[0]) : document : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRootNode"])(e), u = Array.isArray(e) ? t ? G(e) : e : r & 64 ? h(e) : x(e);
    n.length > 0 && u.length > 1 && (u = u.filter((i)=>!n.some((d)=>d != null && "current" in d ? (d == null ? void 0 : d.current) === i : d === i))), l = l != null ? l : a == null ? void 0 : a.activeElement;
    let o = (()=>{
        if (r & 5) return 1;
        if (r & 10) return -1;
        throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
    })(), M = (()=>{
        if (r & 1) return 0;
        if (r & 2) return Math.max(0, u.indexOf(l)) - 1;
        if (r & 4) return Math.max(0, u.indexOf(l)) + 1;
        if (r & 8) return u.length - 1;
        throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
    })(), N = r & 32 ? {
        preventScroll: !0
    } : {}, m = 0, c = u.length, s;
    do {
        if (m >= c || m + c <= 0) return 0;
        let i = M + m;
        if (r & 16) i = (i + c) % c;
        else {
            if (i < 0) return 3;
            if (i >= c) return 1;
        }
        s = u[i], s == null || s.focus(N), m += o;
    }while (s !== (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getActiveElement"])(s))
    return r & 6 && P(s) && s.select(), 2;
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/platform.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isAndroid",
    ()=>i,
    "isIOS",
    ()=>t,
    "isMobile",
    ()=>n
]);
function t() {
    return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function i() {
    return /Android/gi.test(window.navigator.userAgent);
}
function n() {
    return t() || i();
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-document-event.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDocumentEvent",
    ()=>i
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$latest$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-latest-value.js [app-ssr] (ecmascript)");
;
;
function i(t, e, o, n) {
    let u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$latest$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLatestValue"])(o);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!t) return;
        function r(m) {
            u.current(m);
        }
        return document.addEventListener(e, r, n), ()=>document.removeEventListener(e, r, n);
    }, [
        t,
        e,
        n
    ]);
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-window-event.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWindowEvent",
    ()=>s
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$latest$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-latest-value.js [app-ssr] (ecmascript)");
;
;
function s(t, e, o, n) {
    let i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$latest$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLatestValue"])(o);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!t) return;
        function r(d) {
            i.current(d);
        }
        return window.addEventListener(e, r, n), ()=>window.removeEventListener(e, r, n);
    }, [
        t,
        e,
        n
    ]);
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-outside-click.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useOutsideClick",
    ()=>k
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/focus-management.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$platform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/platform.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$document$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-document-event.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$latest$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-latest-value.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$window$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-window-event.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const C = 30;
function k(o, f, h) {
    let m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$latest$2d$value$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLatestValue"])(h), s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(function(e, c) {
        if (e.defaultPrevented) return;
        let r = c(e);
        if (r === null || !r.getRootNode().contains(r) || !r.isConnected) return;
        let M = function u(n) {
            return typeof n == "function" ? u(n()) : Array.isArray(n) || n instanceof Set ? n : [
                n
            ];
        }(f);
        for (let u of M)if (u !== null && (u.contains(r) || e.composed && e.composedPath().includes(u))) return;
        return !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isFocusableElement"])(r, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FocusableMode"].Loose) && r.tabIndex !== -1 && e.preventDefault(), m.current(e, r);
    }, [
        m,
        f
    ]), i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$document$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDocumentEvent"])(o, "pointerdown", (t)=>{
        var e, c;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$platform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMobile"])() || (i.current = ((c = (e = t.composedPath) == null ? void 0 : e.call(t)) == null ? void 0 : c[0]) || t.target);
    }, !0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$document$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDocumentEvent"])(o, "pointerup", (t)=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$platform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isMobile"])() || !i.current) return;
        let e = i.current;
        return i.current = null, s(t, ()=>e);
    }, !0);
    let l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$document$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDocumentEvent"])(o, "touchstart", (t)=>{
        l.current.x = t.touches[0].clientX, l.current.y = t.touches[0].clientY;
    }, !0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$document$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDocumentEvent"])(o, "touchend", (t)=>{
        let e = {
            x: t.changedTouches[0].clientX,
            y: t.changedTouches[0].clientY
        };
        if (!(Math.abs(e.x - l.current.x) >= C || Math.abs(e.y - l.current.y) >= C)) return s(t, ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLorSVGElement"](t.target) ? t.target : null);
    }, !0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$window$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWindowEvent"])(o, "blur", (t)=>s(t, ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLIframeElement"](window.document.activeElement) ? window.document.activeElement : null), !0);
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-owner.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useOwnerDocument",
    ()=>u,
    "useRootDocument",
    ()=>c
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/owner.js [app-ssr] (ecmascript)");
;
;
function u(...e) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOwnerDocument"])(...e), [
        ...e
    ]);
}
function c(...e) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getRootNode"])(...e), [
        ...e
    ]);
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/internal/hidden.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Hidden",
    ()=>f,
    "HiddenFeatures",
    ()=>s
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/render.js [app-ssr] (ecmascript)");
;
let a = "span";
var s = ((e)=>(e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(s || {});
function l(t, r) {
    var n;
    let { features: d = 1, ...e } = t, o = {
        ref: r,
        "aria-hidden": (d & 2) === 2 ? !0 : (n = e["aria-hidden"]) != null ? n : void 0,
        hidden: (d & 4) === 4 ? !0 : void 0,
        style: {
            position: "fixed",
            top: 1,
            left: 1,
            width: 1,
            height: 0,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            borderWidth: "0",
            ...(d & 4) === 4 && (d & 2) !== 2 && {
                display: "none"
            }
        }
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])()({
        ourProps: o,
        theirProps: e,
        slot: {},
        defaultTag: a,
        name: "Hidden"
    });
}
let f = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(l);
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-root-containers.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MainTreeProvider",
    ()=>j,
    "useMainTreeNode",
    ()=>x,
    "useRootContainers",
    ()=>S
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$hidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/internal/hidden.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/owner.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-event.js [app-ssr] (ecmascript)");
;
;
;
;
;
function S({ defaultContainers: l = [], portals: n, mainTreeNode: o } = {}) {
    let c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])(()=>{
        var r, u;
        let i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOwnerDocument"])(o), t = [];
        for (let e of l)e !== null && (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"](e) ? t.push(e) : "current" in e && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"](e.current) && t.push(e.current));
        if (n != null && n.current) for (let e of n.current)t.push(e);
        for (let e of (r = i == null ? void 0 : i.querySelectorAll("html > *, body > *")) != null ? r : [])e !== document.body && e !== document.head && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"](e) && e.id !== "headlessui-portal-root" && (o && (e.contains(o) || e.contains((u = o == null ? void 0 : o.getRootNode()) == null ? void 0 : u.host)) || t.some((E)=>e.contains(E)) || t.push(e));
        return t;
    });
    return {
        resolveContainers: c,
        contains: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((i)=>c().some((t)=>t.contains(i)))
    };
}
let d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function j({ children: l, node: n }) {
    let [o, c] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null), i = x(n != null ? n : o);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(d.Provider, {
        value: i
    }, l, i === null && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$hidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Hidden"], {
        features: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$hidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HiddenFeatures"].Hidden,
        ref: (t)=>{
            var r, u;
            if (t) {
                for (let e of (u = (r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getOwnerDocument"])(t)) == null ? void 0 : r.querySelectorAll("html > *, body > *")) != null ? u : [])if (e !== document.body && e !== document.head && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"](e) && e != null && e.contains(t)) {
                    c(e);
                    break;
                }
            }
        }
    }));
}
function x(l = null) {
    var n;
    return (n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(d)) != null ? n : l;
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-store.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStore",
    ()=>o
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function o(t) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(t.subscribe, t.getSnapshot, t.getSnapshot);
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/store.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createStore",
    ()=>a
]);
function a(o, r) {
    let t = o(), n = new Set;
    return {
        getSnapshot () {
            return t;
        },
        subscribe (e) {
            return n.add(e), ()=>n.delete(e);
        },
        dispatch (e, ...s) {
            let i = r[e].call(t, ...s);
            i && (t = i, n.forEach((c)=>c()));
        }
    };
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/document-overflow/adjust-scrollbar-padding.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adjustScrollbarPadding",
    ()=>d
]);
function d() {
    let r;
    return {
        before ({ doc: e }) {
            var l;
            let o = e.documentElement, t = (l = e.defaultView) != null ? l : window;
            r = Math.max(0, t.innerWidth - o.clientWidth);
        },
        after ({ doc: e, d: o }) {
            let t = e.documentElement, l = Math.max(0, t.clientWidth - t.offsetWidth), n = Math.max(0, r - l);
            o.style(t, "paddingRight", `${n}px`);
        }
    };
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/document-overflow/handle-ios-locking.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "handleIOSLocking",
    ()=>w
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/disposables.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$platform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/platform.js [app-ssr] (ecmascript)");
;
;
;
function w() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$platform$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isIOS"])() ? {
        before ({ doc: o, d: r, meta: m }) {
            function a(s) {
                for (let l of m().containers)for (let c of l())if (c.contains(s)) return !0;
                return !1;
            }
            r.microTask(()=>{
                var c;
                if (window.getComputedStyle(o.documentElement).scrollBehavior !== "auto") {
                    let t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disposables"])();
                    t.style(o.documentElement, "scrollBehavior", "auto"), r.add(()=>r.microTask(()=>t.dispose()));
                }
                let s = (c = window.scrollY) != null ? c : window.pageYOffset, l = null;
                r.addEventListener(o, "click", (t)=>{
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLorSVGElement"](t.target)) try {
                        let e = t.target.closest("a");
                        if (!e) return;
                        let { hash: n } = new URL(e.href), f = o.querySelector(n);
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLorSVGElement"](f) && !a(f) && (l = f);
                    } catch  {}
                }, !0), r.group((t)=>{
                    r.addEventListener(o, "touchstart", (e)=>{
                        if (t.dispose(), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLorSVGElement"](e.target) && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasInlineStyle"](e.target)) if (a(e.target)) {
                            let n = e.target;
                            for(; n.parentElement && a(n.parentElement);)n = n.parentElement;
                            t.style(n, "overscrollBehavior", "contain");
                        } else t.style(e.target, "touchAction", "none");
                    });
                }), r.addEventListener(o, "touchmove", (t)=>{
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLorSVGElement"](t.target)) {
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLInputElement"](t.target)) return;
                        if (a(t.target)) {
                            let e = t.target;
                            for(; e.parentElement && e.dataset.headlessuiPortal !== "" && !(e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth);)e = e.parentElement;
                            e.dataset.headlessuiPortal === "" && t.preventDefault();
                        } else t.preventDefault();
                    }
                }, {
                    passive: !1
                }), r.add(()=>{
                    var e;
                    let t = (e = window.scrollY) != null ? e : window.pageYOffset;
                    s !== t && window.scrollTo(0, s), l && l.isConnected && (l.scrollIntoView({
                        block: "nearest"
                    }), l = null);
                });
            });
        }
    } : {};
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/document-overflow/prevent-scroll.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "preventScroll",
    ()=>r
]);
function r() {
    return {
        before ({ doc: e, d: o }) {
            o.style(e.documentElement, "overflow", "hidden");
        }
    };
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/document-overflow/overflow-store.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "overflows",
    ()=>c
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/disposables.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/store.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$document$2d$overflow$2f$adjust$2d$scrollbar$2d$padding$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/document-overflow/adjust-scrollbar-padding.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$document$2d$overflow$2f$handle$2d$ios$2d$locking$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/document-overflow/handle-ios-locking.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$document$2d$overflow$2f$prevent$2d$scroll$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/document-overflow/prevent-scroll.js [app-ssr] (ecmascript)");
;
;
;
;
;
function r(e) {
    let o = {};
    for (let t of e)Object.assign(o, t(o));
    return o;
}
let c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createStore"])(()=>new Map, {
    PUSH (e, o) {
        var n;
        let t = (n = this.get(e)) != null ? n : {
            doc: e,
            count: 0,
            d: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["disposables"])(),
            meta: new Set,
            computedMeta: {}
        };
        return t.count++, t.meta.add(o), t.computedMeta = r(t.meta), this.set(e, t), this;
    },
    POP (e, o) {
        let t = this.get(e);
        return t && (t.count--, t.meta.delete(o), t.computedMeta = r(t.meta)), this;
    },
    SCROLL_PREVENT (e) {
        let o = {
            doc: e.doc,
            d: e.d,
            meta () {
                return e.computedMeta;
            }
        }, t = [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$document$2d$overflow$2f$handle$2d$ios$2d$locking$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["handleIOSLocking"])(),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$document$2d$overflow$2f$adjust$2d$scrollbar$2d$padding$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["adjustScrollbarPadding"])(),
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$document$2d$overflow$2f$prevent$2d$scroll$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["preventScroll"])()
        ];
        t.forEach(({ before: n })=>n == null ? void 0 : n(o)), t.forEach(({ after: n })=>n == null ? void 0 : n(o));
    },
    SCROLL_ALLOW ({ d: e }) {
        e.dispose();
    },
    TEARDOWN ({ doc: e }) {
        this.delete(e);
    }
});
c.subscribe(()=>{
    let e = c.getSnapshot(), o = new Map;
    for (let [t] of e)o.set(t, t.documentElement.style.overflow);
    for (let t of e.values()){
        let n = o.get(t.doc) === "hidden", a = t.count !== 0;
        (a && !n || !a && n) && c.dispatch(t.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", t), t.count === 0 && c.dispatch("TEARDOWN", t);
    }
});
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/document-overflow/use-document-overflow.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDocumentOverflowLockedEffect",
    ()=>a
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-store.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$document$2d$overflow$2f$overflow$2d$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/document-overflow/overflow-store.js [app-ssr] (ecmascript)");
;
;
;
function a(r, e, n = ()=>({
        containers: []
    })) {
    let f = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStore"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$document$2d$overflow$2f$overflow$2d$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["overflows"]), o = e ? f.get(e) : void 0, i = o ? o.count > 0 : !1;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        if (!(!e || !r)) return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$document$2d$overflow$2f$overflow$2d$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["overflows"].dispatch("PUSH", e, n), ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$document$2d$overflow$2f$overflow$2d$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["overflows"].dispatch("POP", e, n);
    }, [
        r,
        e
    ]), i;
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-scroll-lock.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useScrollLock",
    ()=>f
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$document$2d$overflow$2f$use$2d$document$2d$overflow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/document-overflow/use-document-overflow.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$is$2d$top$2d$layer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-is-top-layer.js [app-ssr] (ecmascript)");
;
;
function f(e, c, n = ()=>[
        document.body
    ]) {
    let r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$is$2d$top$2d$layer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsTopLayer"])(e, "scroll-lock");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$document$2d$overflow$2f$use$2d$document$2d$overflow$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDocumentOverflowLockedEffect"])(r, c, (t)=>{
        var o;
        return {
            containers: [
                ...(o = t.containers) != null ? o : [],
                n
            ]
        };
    });
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-slot.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSlot",
    ()=>n
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function n(e) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>e, Object.values(e));
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/internal/close-provider.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CloseProvider",
    ()=>C,
    "useClose",
    ()=>u
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
let e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(()=>{});
function u() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(e);
}
function C({ value: t, children: o }) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(e.Provider, {
        value: t
    }, o);
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/internal/portal-force-root.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ForcePortalRoot",
    ()=>l,
    "usePortalRoot",
    ()=>a
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
let e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(!1);
function a() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(e);
}
function l(o) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(e.Provider, {
        value: o.force
    }, o.children);
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/internal/disabled.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DisabledProvider",
    ()=>l,
    "useDisabled",
    ()=>a
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
let e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(void 0);
function a() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(e);
}
function l({ value: t, children: o }) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(e.Provider, {
        value: t
    }, o);
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/description/description.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Description",
    ()=>M,
    "useDescribedBy",
    ()=>w,
    "useDescriptions",
    ()=>H
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-event.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$slot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-slot.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-sync-refs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$disabled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/internal/disabled.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/render.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
let a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
a.displayName = "DescriptionContext";
function f() {
    let r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(a);
    if (r === null) {
        let e = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
        throw Error.captureStackTrace && Error.captureStackTrace(e, f), e;
    }
    return r;
}
function w() {
    var r, e;
    return (e = (r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(a)) == null ? void 0 : r.value) != null ? e : void 0;
}
function H() {
    let [r, e] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    return [
        r.length > 0 ? r.join(" ") : void 0,
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>function(t) {
                let i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((n)=>(e((o)=>[
                            ...o,
                            n
                        ]), ()=>e((o)=>{
                            let s = o.slice(), p = s.indexOf(n);
                            return p !== -1 && s.splice(p, 1), s;
                        }))), l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
                        register: i,
                        slot: t.slot,
                        name: t.name,
                        props: t.props,
                        value: t.value
                    }), [
                    i,
                    t.slot,
                    t.name,
                    t.props,
                    t.value
                ]);
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(a.Provider, {
                    value: l
                }, t.children);
            }, [
            e
        ])
    ];
}
let I = "p";
function C(r, e) {
    let c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])(), t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$disabled$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDisabled"])(), { id: i = `headlessui-description-${c}`, ...l } = r, n = f(), o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncRefs"])(e);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>n.register(i), [
        i,
        n.register
    ]);
    let s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$slot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSlot"])({
        ...n.slot,
        disabled: t || !1
    }), p = {
        ref: o,
        ...n.props,
        id: i
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])()({
        ourProps: p,
        theirProps: l,
        slot: s,
        defaultTag: I,
        name: n.name || "Description"
    });
}
let _ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(C), M = Object.assign(_, {});
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-on-unmount.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useOnUnmount",
    ()=>c
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$micro$2d$task$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/micro-task.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-event.js [app-ssr] (ecmascript)");
;
;
;
function c(t) {
    let r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])(t), e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(!1);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>(e.current = !1, ()=>{
            e.current = !0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$micro$2d$task$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["microTask"])(()=>{
                e.current && r();
            });
        }), [
        r
    ]);
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-tab-direction.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Direction",
    ()=>a,
    "useTabDirection",
    ()=>u
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$window$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-window-event.js [app-ssr] (ecmascript)");
;
;
var a = ((r)=>(r[r.Forwards = 0] = "Forwards", r[r.Backwards = 1] = "Backwards", r))(a || {});
function u() {
    let e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$window$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWindowEvent"])(!0, "keydown", (r)=>{
        r.key === "Tab" && (e.current = r.shiftKey ? 1 : 0);
    }, !0), e;
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-watch.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWatch",
    ()=>m
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-event.js [app-ssr] (ecmascript)");
;
;
function m(u, t) {
    let e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]), r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])(u);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let o = [
            ...e.current
        ];
        for (let [a, l] of t.entries())if (e.current[a] !== l) {
            let n = r(t, o);
            return e.current = t, n;
        }
    }, [
        r,
        ...t
    ]);
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/document-ready.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "onDocumentReady",
    ()=>t
]);
function t(n) {
    function e() {
        document.readyState !== "loading" && (n(), document.removeEventListener("DOMContentLoaded", e));
    }
    ("TURBOPACK compile-time value", "undefined") != "undefined" && typeof document != "undefined" && (document.addEventListener("DOMContentLoaded", e), e());
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/active-element-history.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "history",
    ()=>n
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$document$2d$ready$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/document-ready.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/focus-management.js [app-ssr] (ecmascript)");
;
;
;
let n = [];
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$document$2d$ready$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onDocumentReady"])(()=>{
    function e(t) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLorSVGElement"](t.target) || t.target === document.body || n[0] === t.target) return;
        let r = t.target;
        r = r.closest(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusableSelector"]), n.unshift(r != null ? r : t.target), n = n.filter((o)=>o != null && o.isConnected), n.splice(10);
    }
    window.addEventListener("click", e, {
        capture: !0
    }), window.addEventListener("mousedown", e, {
        capture: !0
    }), window.addEventListener("focus", e, {
        capture: !0
    }), document.body.addEventListener("click", e, {
        capture: !0
    }), document.body.addEventListener("mousedown", e, {
        capture: !0
    }), document.body.addEventListener("focus", e, {
        capture: !0
    });
});
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/focus-trap/focus-trap.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FocusTrap",
    ()=>ge,
    "FocusTrapFeatures",
    ()=>G
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-disposables.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-event.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2d$listener$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-event-listener.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$is$2d$mounted$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-is-mounted.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$is$2d$top$2d$layer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-is-top-layer.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$on$2d$unmount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-on-unmount.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-owner.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$server$2d$handoff$2d$complete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-server-handoff-complete.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-sync-refs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$tab$2d$direction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-tab-direction.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$watch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-watch.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$hidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/internal/hidden.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$active$2d$element$2d$history$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/active-element-history.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/focus-management.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$match$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/match.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$micro$2d$task$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/micro-task.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/owner.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/render.js [app-ssr] (ecmascript)");
"use client";
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
function x(o) {
    if (!o) return new Set;
    if (typeof o == "function") return new Set(o());
    let t = new Set;
    for (let e of o.current)__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isElement"](e.current) && t.add(e.current);
    return t;
}
let $ = "div";
var G = ((n)=>(n[n.None = 0] = "None", n[n.InitialFocus = 1] = "InitialFocus", n[n.TabLock = 2] = "TabLock", n[n.FocusLock = 4] = "FocusLock", n[n.RestoreFocus = 8] = "RestoreFocus", n[n.AutoFocus = 16] = "AutoFocus", n))(G || {});
function w(o, t) {
    let e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null), r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncRefs"])(e, t), { initialFocus: u, initialFocusFallback: a, containers: n, features: s = 15, ...f } = o;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$server$2d$handoff$2d$complete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useServerHandoffComplete"])() || (s = 0);
    let l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOwnerDocument"])(e.current);
    re(s, {
        ownerDocument: l
    });
    let T = ne(s, {
        ownerDocument: l,
        container: e,
        initialFocus: u,
        initialFocusFallback: a
    });
    oe(s, {
        ownerDocument: l,
        container: e,
        containers: n,
        previousActiveElement: T
    });
    let g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$tab$2d$direction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTabDirection"])(), A = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((c)=>{
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"](e.current)) return;
        let E = e.current;
        ((V)=>V())(()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$match$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["match"])(g.current, {
                [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$tab$2d$direction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Direction"].Forwards]: ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusIn"])(E, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].First, {
                        skipElements: [
                            c.relatedTarget,
                            a
                        ]
                    });
                },
                [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$tab$2d$direction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Direction"].Backwards]: ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusIn"])(E, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Last, {
                        skipElements: [
                            c.relatedTarget,
                            a
                        ]
                    });
                }
            });
        });
    }), v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$is$2d$top$2d$layer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsTopLayer"])(!!(s & 2), "focus-trap#tab-lock"), N = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDisposables"])(), b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(!1), k = {
        ref: r,
        onKeyDown (c) {
            c.key == "Tab" && (b.current = !0, N.requestAnimationFrame(()=>{
                b.current = !1;
            }));
        },
        onBlur (c) {
            if (!(s & 4)) return;
            let E = x(n);
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"](e.current) && E.add(e.current);
            let L = c.relatedTarget;
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLorSVGElement"](L) && L.dataset.headlessuiFocusGuard !== "true" && (I(E, L) || (b.current ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusIn"])(e.current, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$match$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["match"])(g.current, {
                [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$tab$2d$direction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Direction"].Forwards]: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Next,
                [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$tab$2d$direction$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Direction"].Backwards]: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].Previous
            }) | __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].WrapAround, {
                relativeTo: c.target
            }) : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLorSVGElement"](c.target) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusElement"])(c.target)));
        }
    }, B = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Fragment, null, v && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$hidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Hidden"], {
        as: "button",
        type: "button",
        "data-headlessui-focus-guard": !0,
        onFocus: A,
        features: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$hidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HiddenFeatures"].Focusable
    }), B({
        ourProps: k,
        theirProps: f,
        defaultTag: $,
        name: "FocusTrap"
    }), v && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$hidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Hidden"], {
        as: "button",
        type: "button",
        "data-headlessui-focus-guard": !0,
        onFocus: A,
        features: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$hidden$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HiddenFeatures"].Focusable
    }));
}
let ee = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(w), ge = Object.assign(ee, {
    features: G
});
function te(o = !0) {
    let t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$active$2d$element$2d$history$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["history"].slice());
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$watch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWatch"])(([e], [r])=>{
        r === !0 && e === !1 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$micro$2d$task$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["microTask"])(()=>{
            t.current.splice(0);
        }), r === !1 && e === !0 && (t.current = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$active$2d$element$2d$history$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["history"].slice());
    }, [
        o,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$active$2d$element$2d$history$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["history"],
        t
    ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])(()=>{
        var e;
        return (e = t.current.find((r)=>r != null && r.isConnected)) != null ? e : null;
    });
}
function re(o, { ownerDocument: t }) {
    let e = !!(o & 8), r = te(e);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$watch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWatch"])(()=>{
        e || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isActiveElement"])(t == null ? void 0 : t.body) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusElement"])(r());
    }, [
        e
    ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$on$2d$unmount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOnUnmount"])(()=>{
        e && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusElement"])(r());
    });
}
function ne(o, { ownerDocument: t, container: e, initialFocus: r, initialFocusFallback: u }) {
    let a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null), n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$is$2d$top$2d$layer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsTopLayer"])(!!(o & 1), "focus-trap#initial-focus"), s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$is$2d$mounted$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsMounted"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$watch$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWatch"])(()=>{
        if (o === 0) return;
        if (!n) {
            u != null && u.current && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusElement"])(u.current);
            return;
        }
        let f = e.current;
        f && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$micro$2d$task$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["microTask"])(()=>{
            if (!s.current) return;
            let l = t == null ? void 0 : t.activeElement;
            if (r != null && r.current) {
                if ((r == null ? void 0 : r.current) === l) {
                    a.current = l;
                    return;
                }
            } else if (f.contains(l)) {
                a.current = l;
                return;
            }
            if (r != null && r.current) (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusElement"])(r.current);
            else {
                if (o & 16) {
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusIn"])(f, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].First | __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].AutoFocus) !== __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FocusResult"].Error) return;
                } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusIn"])(f, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Focus"].First) !== __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FocusResult"].Error) return;
                if (u != null && u.current && ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusElement"])(u.current), (t == null ? void 0 : t.activeElement) === u.current)) return;
                console.warn("There are no focusable elements inside the <FocusTrap />");
            }
            a.current = t == null ? void 0 : t.activeElement;
        });
    }, [
        u,
        n,
        o
    ]), a;
}
function oe(o, { ownerDocument: t, container: e, containers: r, previousActiveElement: u }) {
    let a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$is$2d$mounted$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsMounted"])(), n = !!(o & 4);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2d$listener$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEventListener"])(t == null ? void 0 : t.defaultView, "focus", (s)=>{
        if (!n || !a.current) return;
        let f = x(r);
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"](e.current) && f.add(e.current);
        let l = u.current;
        if (!l) return;
        let T = s.target;
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHTMLElement"](T) ? I(f, T) ? (u.current = T, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusElement"])(T)) : (s.preventDefault(), s.stopPropagation(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusElement"])(l)) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$focus$2d$management$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["focusElement"])(u.current);
    }, !0);
}
function I(o, t) {
    for (let e of o)if (e.contains(t)) return !0;
    return !1;
}
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/portal/portal.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Portal",
    ()=>te,
    "PortalGroup",
    ()=>X,
    "useNestedPortals",
    ()=>ee
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-disposables.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-event.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$on$2d$unmount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-on-unmount.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-owner.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-sync-refs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$portal$2d$force$2d$root$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/internal/portal-force-root.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/env.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/render.js [app-ssr] (ecmascript)");
"use client";
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
function W(e) {
    let o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$portal$2d$force$2d$root$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePortalRoot"])(), l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(c), [r, p] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        var s;
        if (!o && l !== null) return (s = l.current) != null ? s : null;
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["env"].isServer) return null;
        let t = e == null ? void 0 : e.getElementById("headlessui-portal-root");
        if (t) return t;
        if (e === null) return null;
        let n = e.createElement("div");
        return n.setAttribute("id", "headlessui-portal-root"), e.body.appendChild(n);
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        r !== null && (e != null && e.body.contains(r) || e == null || e.body.appendChild(r));
    }, [
        r,
        e
    ]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        o || l !== null && p(l.current);
    }, [
        l,
        p,
        o
    ]), r;
}
let _ = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], j = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(function(o, l) {
    let { ownerDocument: r = null, ...p } = o, t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null), n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncRefs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["optionalRef"])((a)=>{
        t.current = a;
    }), l), s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOwnerDocument"])(t.current), C = r != null ? r : s, u = W(C), y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(m), g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$disposables$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDisposables"])(), v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$on$2d$unmount$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOnUnmount"])(()=>{
        var a;
        u && u.childNodes.length <= 0 && ((a = u.parentElement) == null || a.removeChild(u));
    }), u ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        "data-headlessui-portal": "",
        ref: (a)=>{
            g.dispose(), y && a && g.add(y.register(a));
        }
    }, v({
        ourProps: {
            ref: n
        },
        theirProps: p,
        slot: {},
        defaultTag: _,
        name: "Portal"
    })), u) : null;
});
function S(e, o) {
    let l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncRefs"])(o), { enabled: r = !0, ownerDocument: p, ...t } = e, n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])();
    return r ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(j, {
        ...t,
        ownerDocument: p,
        ref: l
    }) : n({
        ourProps: {
            ref: l
        },
        theirProps: t,
        slot: {},
        defaultTag: _,
        name: "Portal"
    });
}
let I = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function D(e, o) {
    let { target: l, ...r } = e, t = {
        ref: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncRefs"])(o)
    }, n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(c.Provider, {
        value: l
    }, n({
        ourProps: t,
        theirProps: r,
        defaultTag: I,
        name: "Popover.Group"
    }));
}
let m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function ee() {
    let e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(m), o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]), l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((t)=>(o.current.push(t), e && e.register(t), ()=>r(t))), r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((t)=>{
        let n = o.current.indexOf(t);
        n !== -1 && o.current.splice(n, 1), e && e.unregister(t);
    }), p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            register: l,
            unregister: r,
            portals: o
        }), [
        l,
        r,
        o
    ]);
    return [
        o,
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>function({ children: n }) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(m.Provider, {
                    value: p
                }, n);
            }, [
            p
        ])
    ];
}
let J = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(S), X = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(D), te = Object.assign(J, {
    Group: X
});
;
}),
"[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/dialog/dialog.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>ht,
    "DialogBackdrop",
    ()=>Lt,
    "DialogDescription",
    ()=>xt,
    "DialogPanel",
    ()=>ze,
    "DialogTitle",
    ()=>Qe
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$escape$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-escape.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-event.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$inert$2d$others$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-inert-others.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$is$2d$touch$2d$device$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-is-touch-device.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-iso-morphic-effect.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$on$2d$disappear$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-on-disappear.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$outside$2d$click$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-outside-click.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-owner.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$root$2d$containers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-root-containers.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$scroll$2d$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-scroll-lock.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$server$2d$handoff$2d$complete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-server-handoff-complete.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$slot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-slot.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/hooks/use-sync-refs.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$close$2d$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/internal/close-provider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/internal/open-closed.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$portal$2d$force$2d$root$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/internal/portal-force-root.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machines$2f$stack$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/machines/stack-machine.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/react-glue.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$match$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/match.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/utils/render.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$description$2f$description$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/description/description.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$focus$2d$trap$2f$focus$2d$trap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/focus-trap/focus-trap.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$portal$2f$portal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/portal/portal.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$transition$2f$transition$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@headlessui/react/dist/components/transition/transition.js [app-ssr] (ecmascript)");
"use client";
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
;
;
var we = ((o)=>(o[o.Open = 0] = "Open", o[o.Closed = 1] = "Closed", o))(we || {}), Be = ((t)=>(t[t.SetTitleId = 0] = "SetTitleId", t))(Be || {});
let Ue = {
    [0] (e, t) {
        return e.titleId === t.id ? e : {
            ...e,
            titleId: t.id
        };
    }
}, w = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
w.displayName = "DialogContext";
function O(e) {
    let t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(w);
    if (t === null) {
        let o = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
        throw Error.captureStackTrace && Error.captureStackTrace(o, O), o;
    }
    return t;
}
function He(e, t) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$match$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["match"])(t.type, Ue, e, t);
}
let z = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(function(t, o) {
    let a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])(), { id: n = `headlessui-dialog-${a}`, open: i, onClose: p, initialFocus: d, role: s = "dialog", autoFocus: f = !0, __demoMode: u = !1, unmount: y = !1, ...S } = t, R = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(!1);
    s = function() {
        return s === "dialog" || s === "alertdialog" ? s : (R.current || (R.current = !0, console.warn(`Invalid role [${s}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog");
    }();
    let g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOpenClosed"])();
    i === void 0 && g !== null && (i = (g & __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["State"].Open) === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["State"].Open);
    let T = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null), I = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncRefs"])(T, o), F = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$owner$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOwnerDocument"])(T.current), c = i ? 0 : 1, [b, Q] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducer"])(He, {
        titleId: null,
        descriptionId: null,
        panelRef: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRef"])()
    }), m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])(()=>p(!1)), B = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((r)=>Q({
            type: 0,
            id: r
        })), D = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$server$2d$handoff$2d$complete$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useServerHandoffComplete"])() ? c === 0 : !1, [Z, ee] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$portal$2f$portal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNestedPortals"])(), te = {
        get current () {
            var r;
            return (r = b.panelRef.current) != null ? r : T.current;
        }
    }, v = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$root$2d$containers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMainTreeNode"])(), { resolveContainers: M } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$root$2d$containers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRootContainers"])({
        mainTreeNode: v,
        portals: Z,
        defaultContainers: [
            te
        ]
    }), U = g !== null ? (g & __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["State"].Closing) === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["State"].Closing : !1;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$inert$2d$others$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInertOthers"])(u || U ? !1 : D, {
        allowed: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])(()=>{
            var r, W;
            return [
                (W = (r = T.current) == null ? void 0 : r.closest("[data-headlessui-portal]")) != null ? W : null
            ];
        }),
        disallowed: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])(()=>{
            var r;
            return [
                (r = v == null ? void 0 : v.closest("body > *:not(#headlessui-portal-root)")) != null ? r : null
            ];
        })
    });
    let P = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$machines$2f$stack$2d$machine$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["stackMachines"].get(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$iso$2d$morphic$2d$effect$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsoMorphicEffect"])(()=>{
        if (D) return P.actions.push(n), ()=>P.actions.pop(n);
    }, [
        P,
        n,
        D
    ]);
    let H = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$react$2d$glue$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSlice"])(P, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((r)=>P.selectors.isTop(r, n), [
        P,
        n
    ]));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$outside$2d$click$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOutsideClick"])(H, M, (r)=>{
        r.preventDefault(), m();
    }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$escape$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEscape"])(H, F == null ? void 0 : F.defaultView, (r)=>{
        r.preventDefault(), r.stopPropagation(), document.activeElement && "blur" in document.activeElement && typeof document.activeElement.blur == "function" && document.activeElement.blur(), m();
    }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$scroll$2d$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScrollLock"])(u || U ? !1 : D, F, M), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$on$2d$disappear$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOnDisappear"])(D, T, m);
    let [oe, ne] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$description$2f$description$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDescriptions"])(), re = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>[
            {
                dialogState: c,
                close: m,
                setTitleId: B,
                unmount: y
            },
            b
        ], [
        c,
        m,
        B,
        y,
        b
    ]), N = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$slot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSlot"])({
        open: c === 0
    }), le = {
        ref: I,
        id: n,
        role: s,
        tabIndex: -1,
        "aria-modal": u ? void 0 : c === 0 ? !0 : void 0,
        "aria-labelledby": b.titleId,
        "aria-describedby": oe,
        unmount: y
    }, ae = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$is$2d$touch$2d$device$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useIsTouchDevice"])(), E = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$focus$2d$trap$2f$focus$2d$trap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FocusTrapFeatures"].None;
    D && !u && (E |= __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$focus$2d$trap$2f$focus$2d$trap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FocusTrapFeatures"].RestoreFocus, E |= __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$focus$2d$trap$2f$focus$2d$trap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FocusTrapFeatures"].TabLock, f && (E |= __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$focus$2d$trap$2f$focus$2d$trap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FocusTrapFeatures"].AutoFocus), ae && (E |= __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$focus$2d$trap$2f$focus$2d$trap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FocusTrapFeatures"].InitialFocus));
    let ie = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResetOpenClosedProvider"], null, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$portal$2d$force$2d$root$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ForcePortalRoot"], {
        force: !0
    }, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$portal$2f$portal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], null, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(w.Provider, {
        value: re
    }, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$portal$2f$portal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PortalGroup"], {
        target: T
    }, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$portal$2d$force$2d$root$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ForcePortalRoot"], {
        force: !1
    }, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(ne, {
        slot: N
    }, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(ee, null, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$focus$2d$trap$2f$focus$2d$trap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FocusTrap"], {
        initialFocus: d,
        initialFocusFallback: T,
        containers: M,
        features: E
    }, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$close$2d$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CloseProvider"], {
        value: m
    }, ie({
        ourProps: le,
        theirProps: S,
        slot: N,
        defaultTag: Ne,
        features: We,
        visible: c === 0,
        name: "Dialog"
    })))))))))));
}), Ne = "div", We = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RenderFeatures"].RenderStrategy | __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RenderFeatures"].Static;
function $e(e, t) {
    let { transition: o = !1, open: a, ...n } = e, i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$internal$2f$open$2d$closed$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOpenClosed"])(), p = e.hasOwnProperty("open") || i !== null, d = e.hasOwnProperty("onClose");
    if (!p && !d) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
    if (!p) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
    if (!d) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
    if (!i && typeof e.open != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);
    if (typeof e.onClose != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);
    return (a !== void 0 || o) && !n.static ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$root$2d$containers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MainTreeProvider"], null, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$transition$2f$transition$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Transition"], {
        show: a,
        transition: o,
        unmount: n.unmount
    }, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(z, {
        ref: t,
        ...n
    }))) : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$root$2d$containers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MainTreeProvider"], null, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(z, {
        ref: t,
        open: a,
        ...n
    }));
}
let je = "div";
function Ye(e, t) {
    let o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])(), { id: a = `headlessui-dialog-panel-${o}`, transition: n = !1, ...i } = e, [{ dialogState: p, unmount: d }, s] = O("Dialog.Panel"), f = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncRefs"])(t, s.panelRef), u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$slot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSlot"])({
        open: p === 0
    }), y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$event$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEvent"])((I)=>{
        I.stopPropagation();
    }), S = {
        ref: f,
        id: a,
        onClick: y
    }, R = n ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$transition$2f$transition$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TransitionChild"] : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], g = n ? {
        unmount: d
    } : {}, T = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(R, {
        ...g
    }, T({
        ourProps: S,
        theirProps: i,
        slot: u,
        defaultTag: je,
        name: "Dialog.Panel"
    }));
}
let Je = "div";
function Ke(e, t) {
    let { transition: o = !1, ...a } = e, [{ dialogState: n, unmount: i }] = O("Dialog.Backdrop"), p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$slot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSlot"])({
        open: n === 0
    }), d = {
        ref: t,
        "aria-hidden": !0
    }, s = o ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$transition$2f$transition$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TransitionChild"] : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], f = o ? {
        unmount: i
    } : {}, u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(s, {
        ...f
    }, u({
        ourProps: d,
        theirProps: a,
        slot: p,
        defaultTag: Je,
        name: "Dialog.Backdrop"
    }));
}
let Xe = "h2";
function Ve(e, t) {
    let o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])(), { id: a = `headlessui-dialog-title-${o}`, ...n } = e, [{ dialogState: i, setTitleId: p }] = O("Dialog.Title"), d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$sync$2d$refs$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncRefs"])(t);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>(p(a), ()=>p(null)), [
        a,
        p
    ]);
    let s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$hooks$2f$use$2d$slot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSlot"])({
        open: i === 0
    }), f = {
        ref: d,
        id: a
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRender"])()({
        ourProps: f,
        theirProps: n,
        slot: s,
        defaultTag: Xe,
        name: "Dialog.Title"
    });
}
let qe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRefWithAs"])($e), ze = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(Ye), Lt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(Ke), Qe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$utils$2f$render$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRefWithAs"])(Ve), xt = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$description$2f$description$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"], ht = Object.assign(qe, {
    Panel: ze,
    Title: Qe,
    Description: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$headlessui$2f$react$2f$dist$2f$components$2f$description$2f$description$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"]
});
;
}),
];

//# sourceMappingURL=1b50e_%40headlessui_react_dist_b7c1f2e7._.js.map