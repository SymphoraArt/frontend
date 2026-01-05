(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/frontend/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>_assertThisInitialized
]);
function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
}
;
}),
"[project]/Desktop/frontend/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>_setPrototypeOf
]);
function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
        return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
}
;
}),
"[project]/Desktop/frontend/node_modules/@babel/runtime/helpers/esm/inheritsLoose.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>_inheritsLoose
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$setPrototypeOf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js [app-client] (ecmascript)");
;
function _inheritsLoose(t, o) {
    t.prototype = Object.create(o.prototype), t.prototype.constructor = t, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$setPrototypeOf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(t, o);
}
;
}),
"[project]/Desktop/frontend/node_modules/@hcaptcha/loader/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hCaptchaLoader",
    ()=>ye
]);
var G = Object.defineProperty, K = Object.defineProperties;
var V = Object.getOwnPropertyDescriptors;
var w = Object.getOwnPropertySymbols;
var P = Object.prototype.hasOwnProperty, D = Object.prototype.propertyIsEnumerable;
var I = (t, e, r)=>e in t ? G(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : t[e] = r, d = (t, e)=>{
    for(var r in e || (e = {}))P.call(e, r) && I(t, r, e[r]);
    if (w) for (var r of w(e))D.call(e, r) && I(t, r, e[r]);
    return t;
}, R = (t, e)=>K(t, V(e));
var M = (t, e)=>{
    var r = {};
    for(var n in t)P.call(t, n) && e.indexOf(n) < 0 && (r[n] = t[n]);
    if (t != null && w) for (var n of w(t))e.indexOf(n) < 0 && D.call(t, n) && (r[n] = t[n]);
    return r;
};
var l = (t, e, r)=>(I(t, typeof e != "symbol" ? e + "" : e, r), r);
var x = (t, e, r)=>new Promise((n, s)=>{
        var a = (c)=>{
            try {
                o(r.next(c));
            } catch (i) {
                s(i);
            }
        }, u = (c)=>{
            try {
                o(r.throw(c));
            } catch (i) {
                s(i);
            }
        }, o = (c)=>c.done ? n(c.value) : Promise.resolve(c.value).then(a, u);
        o((r = r.apply(t, e)).next());
    });
var L = "hCaptcha-script", b = "hCaptchaOnLoad", T = "script-error";
var g = "@hCaptcha/loader";
function U(t) {
    return Object.entries(t).filter(([, e])=>e || e === !1).map(([e, r])=>`${encodeURIComponent(e)}=${encodeURIComponent(String(r))}`).join("&");
}
function O(t) {
    let e = t && t.ownerDocument || document, r = e.defaultView || e.parentWindow || window;
    return {
        document: e,
        window: r
    };
}
function S(t) {
    return t || document.head;
}
function B(t) {
    var e;
    t.setTag("source", g), t.setTag("url", document.URL), t.setContext("os", {
        UA: navigator.userAgent
    }), t.setContext("browser", d({}, z())), t.setContext("device", R(d({}, J()), {
        screen_width_pixels: screen.width,
        screen_height_pixels: screen.height,
        language: navigator.language,
        orientation: ((e = screen.orientation) == null ? void 0 : e.type) || "Unknown",
        processor_count: navigator.hardwareConcurrency,
        platform: navigator.platform
    }));
}
function z() {
    var n, s, a, u, o, c;
    let t = navigator.userAgent, e, r;
    return t.indexOf("Firefox") !== -1 ? (e = "Firefox", r = (n = t.match(/Firefox\/([\d.]+)/)) == null ? void 0 : n[1]) : t.indexOf("Edg") !== -1 ? (e = "Microsoft Edge", r = (s = t.match(/Edg\/([\d.]+)/)) == null ? void 0 : s[1]) : t.indexOf("Chrome") !== -1 && t.indexOf("Safari") !== -1 ? (e = "Chrome", r = (a = t.match(/Chrome\/([\d.]+)/)) == null ? void 0 : a[1]) : t.indexOf("Safari") !== -1 && t.indexOf("Chrome") === -1 ? (e = "Safari", r = (u = t.match(/Version\/([\d.]+)/)) == null ? void 0 : u[1]) : t.indexOf("Opera") !== -1 || t.indexOf("OPR") !== -1 ? (e = "Opera", r = (o = t.match(/(Opera|OPR)\/([\d.]+)/)) == null ? void 0 : o[2]) : t.indexOf("MSIE") !== -1 || t.indexOf("Trident") !== -1 ? (e = "Internet Explorer", r = (c = t.match(/(MSIE |rv:)([\d.]+)/)) == null ? void 0 : c[2]) : (e = "Unknown", r = "Unknown"), {
        name: e,
        version: r
    };
}
function F(t) {
    return new Promise((e)=>setTimeout(e, t));
}
function J() {
    let t = navigator.userAgent, e;
    t.indexOf("Win") !== -1 ? e = "Windows" : t.indexOf("Mac") !== -1 ? e = "Mac" : t.indexOf("Linux") !== -1 ? e = "Linux" : t.indexOf("Android") !== -1 ? e = "Android" : t.indexOf("like Mac") !== -1 || t.indexOf("iPhone") !== -1 || t.indexOf("iPad") !== -1 ? e = "iOS" : e = "Unknown";
    let r;
    return /Mobile|iPhone|iPod|Android/i.test(t) ? r = "Mobile" : /Tablet|iPad/i.test(t) ? r = "Tablet" : r = "Desktop", {
        model: e,
        family: e,
        device: r
    };
}
var Q = class k {
    constructor(e){
        l(this, "_parent");
        l(this, "breadcrumbs", []);
        l(this, "context", {});
        l(this, "extra", {});
        l(this, "tags", {});
        l(this, "request");
        l(this, "user");
        this._parent = e;
    }
    get parent() {
        return this._parent;
    }
    child() {
        return new k(this);
    }
    setRequest(e) {
        return this.request = e, this;
    }
    removeRequest() {
        return this.request = void 0, this;
    }
    addBreadcrumb(e) {
        return typeof e.timestamp > "u" && (e.timestamp = new Date().toISOString()), this.breadcrumbs.push(e), this;
    }
    setExtra(e, r) {
        return this.extra[e] = r, this;
    }
    removeExtra(e) {
        return delete this.extra[e], this;
    }
    setContext(e, r) {
        return typeof r.type > "u" && (r.type = e), this.context[e] = r, this;
    }
    removeContext(e) {
        return delete this.context[e], this;
    }
    setTags(e) {
        return this.tags = d(d({}, this.tags), e), this;
    }
    setTag(e, r) {
        return this.tags[e] = r, this;
    }
    removeTag(e) {
        return delete this.tags[e], this;
    }
    setUser(e) {
        return this.user = e, this;
    }
    removeUser() {
        return this.user = void 0, this;
    }
    toBody() {
        let e = [], r = this;
        for(; r;)e.push(r), r = r.parent;
        return e.reverse().reduce((n, s)=>{
            var a;
            return n.breadcrumbs = [
                ...(a = n.breadcrumbs) != null ? a : [],
                ...s.breadcrumbs
            ], n.extra = d(d({}, n.extra), s.extra), n.contexts = d(d({}, n.contexts), s.context), n.tags = d(d({}, n.tags), s.tags), s.user && (n.user = s.user), s.request && (n.request = s.request), n;
        }, {
            breadcrumbs: [],
            extra: {},
            contexts: {},
            tags: {},
            request: void 0,
            user: void 0
        });
    }
    clear() {
        this.breadcrumbs = [], this.context = {}, this.tags = {}, this.user = void 0;
    }
}, Z = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, ee = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i, te = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, re = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/, A = "?", j = "An unknown error occurred", ne = "0.0.4";
function se(t) {
    for(let e = 0; e < t.length; e++)t[e] = Math.floor(Math.random() * 256);
    return t;
}
function p(t) {
    return (t + 256).toString(16).substring(1);
}
function oe() {
    let t = se(new Array(16));
    return t[6] = t[6] & 15 | 64, t[8] = t[8] & 63 | 128, p(t[0]) + p(t[1]) + p(t[2]) + p(t[3]) + "-" + p(t[4]) + p(t[5]) + "-" + p(t[6]) + p(t[7]) + "-" + p(t[8]) + p(t[9]) + "-" + p(t[10]) + p(t[11]) + p(t[12]) + p(t[13]) + p(t[14]) + p(t[15]);
}
var ie = [
    [
        Z,
        "chrome"
    ],
    [
        te,
        "winjs"
    ],
    [
        ee,
        "gecko"
    ]
];
function ae(t) {
    var n, s, a, u;
    if (!t.stack) return null;
    let e = [], r = (a = (s = (n = t.stack).split) == null ? void 0 : s.call(n, `
`)) != null ? a : [];
    for(let o = 0; o < r.length; ++o){
        let c = null, i = null, h = null;
        for (let [y, E] of ie)if (i = y.exec(r[o]), i) {
            h = E;
            break;
        }
        if (!(!i || !h)) {
            if (h === "chrome") c = {
                filename: (u = i[2]) != null && u.startsWith("address at ") ? i[2].substring(11) : i[2],
                function: i[1] || A,
                lineno: i[3] ? +i[3] : null,
                colno: i[4] ? +i[4] : null
            };
            else if (h === "winjs") c = {
                filename: i[2],
                function: i[1] || A,
                lineno: +i[3],
                colno: i[4] ? +i[4] : null
            };
            else if (h === "gecko") o === 0 && !i[5] && t.columnNumber !== void 0 && e.length > 0 && (e[0].column = t.columnNumber + 1), c = {
                filename: i[3],
                function: i[1] || A,
                lineno: i[4] ? +i[4] : null,
                colno: i[5] ? +i[5] : null
            };
            else continue;
            !c.function && c.lineno && (c.function = A), e.push(c);
        }
    }
    return e.length ? e.reverse() : null;
}
function ce(t) {
    let e = ae(t);
    return {
        type: t.name,
        value: t.message,
        stacktrace: {
            frames: e != null ? e : []
        }
    };
}
function ue(t) {
    let e = re.exec(t), r = e ? e.slice(1) : [];
    if (r.length !== 6) throw new Error("Invalid DSN");
    let n = r[5].split("/"), s = n.slice(0, -1).join("/");
    return r[0] + "://" + r[3] + (r[4] ? ":" + r[4] : "") + (s ? "/" + s : "") + "/api/" + n.pop() + "/envelope/?sentry_version=7&sentry_key=" + r[1] + (r[2] ? "&sentry_secret=" + r[2] : "");
}
function le(t, e, r) {
    var s, a;
    let n = d({
        event_id: oe().replaceAll("-", ""),
        platform: "javascript",
        sdk: {
            name: "@hcaptcha/sentry",
            version: ne
        },
        environment: e,
        release: r,
        timestamp: Date.now() / 1e3
    }, t.scope.toBody());
    if (t.type === "exception") {
        n.message = (a = (s = t.error) == null ? void 0 : s.message) != null ? a : "Unknown error", n.fingerprint = [
            n.message
        ];
        let u = [], o = t.error;
        for(let c = 0; c < 5 && o && (u.push(ce(o)), !(!o.cause || !(o.cause instanceof Error))); c++)o = o.cause;
        n.exception = {
            values: u.reverse()
        };
    }
    return t.type === "message" && (n.message = t.message, n.level = t.level), n;
}
function de(t) {
    if (t instanceof Error) return t;
    if (typeof t == "string") return new Error(t);
    if (typeof t == "object" && t !== null && !Array.isArray(t)) {
        let r = t, { message: n } = r, s = M(r, [
            "message"
        ]), a = new Error(typeof n == "string" ? n : j);
        return Object.assign(a, s);
    }
    let e = new Error(j);
    return Object.assign(e, {
        cause: t
    });
}
function pe(t, e, r) {
    return x(this, null, function*() {
        var n, s;
        try {
            if (typeof fetch < "u" && typeof AbortSignal < "u") {
                let a;
                if (r) {
                    let c = new AbortController;
                    a = c.signal, setTimeout(()=>c.abort(), r);
                }
                let u = yield fetch(t, R(d({}, e), {
                    signal: a
                })), o = yield u.text();
                return {
                    status: u.status,
                    body: o
                };
            }
            return yield new Promise((a, u)=>{
                var c, i;
                let o = new XMLHttpRequest;
                if (o.open((c = e == null ? void 0 : e.method) != null ? c : "GET", t), o.onload = ()=>a({
                        status: o.status,
                        body: o.responseText
                    }), o.onerror = ()=>u(new Error("XHR Network Error")), e == null ? void 0 : e.headers) for (let [h, y] of Object.entries(e.headers))o.setRequestHeader(h, y);
                if (r) {
                    let h = setTimeout(()=>{
                        o.abort(), u(new Error("Request timed out"));
                    }, r);
                    o.onloadend = ()=>{
                        clearTimeout(h);
                    };
                }
                o.send((i = e == null ? void 0 : e.body) == null ? void 0 : i.toString());
            });
        } catch (a) {
            return {
                status: 0,
                body: (s = (n = a == null ? void 0 : a.toString) == null ? void 0 : n.call(a)) != null ? s : "Unknown error"
            };
        }
    });
}
var f, N = (f = class {
    constructor(e){
        l(this, "apiURL");
        l(this, "dsn");
        l(this, "environment");
        l(this, "release");
        l(this, "sampleRate");
        l(this, "debug");
        l(this, "_scope");
        l(this, "shouldBuffer", !1);
        l(this, "bufferlimit", 20);
        l(this, "buffer", []);
        var r, n, s, a, u;
        this.environment = e.environment, this.release = e.release, this.sampleRate = (r = e.sampleRate) != null ? r : 1, this.debug = (n = e.debug) != null ? n : !1, this._scope = (s = e.scope) != null ? s : new Q, this.apiURL = ue(e.dsn), this.dsn = e.dsn, this.shouldBuffer = (a = e.buffer) != null ? a : !1, this.bufferlimit = (u = e.bufferLimit) != null ? u : 20;
    }
    static init(e) {
        f._instance || (f._instance = new f(e));
    }
    static get instance() {
        if (!f._instance) throw new Error("Sentry has not been initialized");
        return f._instance;
    }
    log(...e) {
        this.debug && console.log(...e);
    }
    get scope() {
        return this._scope;
    }
    static get scope() {
        return f.instance.scope;
    }
    withScope(e) {
        let r = this._scope.child();
        e(r);
    }
    static withScope(e) {
        f.instance.withScope(e);
    }
    captureException(e, r) {
        this.captureEvent({
            type: "exception",
            level: "error",
            error: de(e),
            scope: r != null ? r : this._scope
        });
    }
    static captureException(e, r) {
        f.instance.captureException(e, r);
    }
    captureMessage(e, r = "info", n) {
        this.captureEvent({
            type: "message",
            level: r,
            message: e,
            scope: n != null ? n : this._scope
        });
    }
    static captureMessage(e, r = "info", n) {
        f.instance.captureMessage(e, r, n);
    }
    captureEvent(e) {
        if (Math.random() >= this.sampleRate) {
            this.log("Dropped event due to sample rate");
            return;
        }
        if (this.shouldBuffer) {
            if (this.buffer.length >= this.bufferlimit) return;
            this.buffer.push(e);
        } else this.sendEvent(e);
    }
    sendEvent(e, r = 5e3) {
        return x(this, null, function*() {
            try {
                this.log("Sending sentry event", e);
                let n = le(e, this.environment, this.release), s = {
                    event_id: n.event_id,
                    dsn: this.dsn
                }, a = {
                    type: "event"
                }, u = JSON.stringify(s) + `
` + JSON.stringify(a) + `
` + JSON.stringify(n), o = yield pe(this.apiURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-sentry-envelope"
                    },
                    body: u
                }, r);
                this.log("Sentry response", o.status), o.status !== 200 && (console.log(o.body), console.error("Failed to send event to Sentry", o));
            } catch (n) {
                console.error("Failed to send event", n);
            }
        });
    }
    flush(e = 5e3) {
        return x(this, null, function*() {
            try {
                this.log("Flushing sentry events", this.buffer.length);
                let r = this.buffer.splice(0, this.buffer.length).map((n)=>this.sendEvent(n, e));
                yield Promise.all(r), this.log("Flushed all events");
            } catch (r) {
                console.error("Failed to flush events", r);
            }
        });
    }
    static flush(e = 5e3) {
        return f.instance.flush(e);
    }
    static reset() {
        f._instance = void 0;
    }
}, l(f, "_instance"), f);
var fe = "https://d233059272824702afc8c43834c4912d@sentry.hcaptcha.com/6", he = "2.3.0", me = "production";
function H(t = !0) {
    if (!t) return q();
    N.init({
        dsn: fe,
        release: he,
        environment: me
    });
    let e = N.scope;
    return B(e), q(e);
}
function q(t = null) {
    return {
        addBreadcrumb: (e)=>{
            t && t.addBreadcrumb(e);
        },
        captureRequest: (e)=>{
            t && t.setRequest(e);
        },
        captureException: (e)=>{
            t && N.captureException(e, t);
        }
    };
}
function W({ scriptLocation: t, query: e, loadAsync: r = !0, crossOrigin: n = "anonymous", apihost: s = "https://js.hcaptcha.com", cleanup: a = !1, secureApi: u = !1, scriptSource: o = "" } = {}, c) {
    let i = S(t), h = O(i);
    return new Promise((y, E)=>{
        let m = h.document.createElement("script");
        m.id = L, o ? m.src = `${o}?onload=${b}` : u ? m.src = `${s}/1/secure-api.js?onload=${b}` : m.src = `${s}/1/api.js?onload=${b}`, m.crossOrigin = n, m.async = r;
        let _ = (v, X)=>{
            try {
                !u && a && i.removeChild(m), X(v);
            } catch (Y) {
                E(Y);
            }
        };
        m.onload = (v)=>_(v, y), m.onerror = (v)=>{
            c && c(m.src), _(v, E);
        }, m.src += e !== "" ? `&${e}` : "", i.appendChild(m);
    });
}
var C = [];
function be(t = {
    cleanup: !1
}, e) {
    try {
        e.addBreadcrumb({
            category: g,
            message: "hCaptcha loader params",
            data: t
        });
        let r = S(t.scriptLocation), n = O(r), s = C.find(({ scope: u })=>u === n.window);
        if (s) return e.addBreadcrumb({
            category: g,
            message: "hCaptcha already loaded"
        }), s.promise;
        let a = new Promise((u, o)=>x(this, null, function*() {
                try {
                    n.window[b] = ()=>{
                        e.addBreadcrumb({
                            category: g,
                            message: "hCaptcha script called onload function"
                        }), u(n.window.hcaptcha);
                    };
                    let c = U({
                        custom: t.custom,
                        render: t.render,
                        sentry: t.sentry,
                        assethost: t.assethost,
                        imghost: t.imghost,
                        reportapi: t.reportapi,
                        endpoint: t.endpoint,
                        host: t.host,
                        recaptchacompat: t.recaptchacompat,
                        hl: t.hl,
                        uj: t.uj
                    });
                    yield W(d({
                        query: c
                    }, t), (i)=>{
                        e.captureRequest({
                            url: i,
                            method: "GET"
                        });
                    }), e.addBreadcrumb({
                        category: g,
                        message: "hCaptcha loaded",
                        data: s
                    });
                } catch (c) {
                    e.addBreadcrumb({
                        category: g,
                        message: "hCaptcha failed to load"
                    });
                    let i = C.findIndex((h)=>h.scope === n.window);
                    i !== -1 && C.splice(i, 1), o(new Error(T));
                }
            }));
        return C.push({
            promise: a,
            scope: n.window
        }), a;
    } catch (r) {
        return e.captureException(r), Promise.reject(new Error(T));
    }
}
function $(t, e, r = 0) {
    return x(this, null, function*() {
        var u, o;
        let n = (u = t.maxRetries) != null ? u : 2, s = (o = t.retryDelay) != null ? o : 1e3, a = r < n ? "Retry loading hCaptcha Api" : "Exceeded maximum retries";
        try {
            return yield be(t, e);
        } catch (c) {
            return e.addBreadcrumb({
                category: g,
                message: a
            }), r >= n ? (e.captureException(c), Promise.reject(c)) : (e.addBreadcrumb({
                category: g,
                message: `Waiting ${s}ms before retry attempt ${r + 1}`
            }), yield F(s), r += 1, $(t, e, r));
        }
    });
}
function ye() {
    return x(this, arguments, function*(t = {}) {
        let e = H(t.sentry);
        return yield $(t, e);
    });
}
;
}),
"[project]/Desktop/frontend/node_modules/@hcaptcha/react-hcaptcha/dist/esm/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFrame",
    ()=>getFrame,
    "getMountElement",
    ()=>getMountElement
]);
function getFrame(element) {
    var doc = element && element.ownerDocument || document;
    var win = doc.defaultView || doc.parentWindow || window;
    return {
        document: doc,
        window: win
    };
}
function getMountElement(element) {
    return element || document.head;
}
;
}),
"[project]/Desktop/frontend/node_modules/@hcaptcha/react-hcaptcha/dist/esm/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$assertThisInitialized$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$inheritsLoose$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@babel/runtime/helpers/esm/inheritsLoose.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$hcaptcha$2f$loader$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@hcaptcha/loader/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$hcaptcha$2f$react$2d$hcaptcha$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@hcaptcha/react-hcaptcha/dist/esm/utils.js [app-client] (ecmascript)");
;
;
;
;
;
var HCaptcha = /*#__PURE__*/ function(_React$Component) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$inheritsLoose$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(HCaptcha, _React$Component);
    function HCaptcha(props) {
        var _this;
        _this = _React$Component.call(this, props) || this;
        /**
     * Internal reference to track hCaptcha API
     *
     * Required as window is relative to initialization in application
     * not where the script and iFrames have been loaded.
     */ _this._hcaptcha = undefined;
        // API Methods
        _this.renderCaptcha = _this.renderCaptcha.bind((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$assertThisInitialized$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(_this));
        _this.resetCaptcha = _this.resetCaptcha.bind((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$assertThisInitialized$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(_this));
        _this.removeCaptcha = _this.removeCaptcha.bind((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$assertThisInitialized$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(_this));
        _this.isReady = _this.isReady.bind((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$assertThisInitialized$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(_this));
        _this._onReady = null;
        // Event Handlers
        _this.loadCaptcha = _this.loadCaptcha.bind((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$assertThisInitialized$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(_this));
        _this.handleOnLoad = _this.handleOnLoad.bind((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$assertThisInitialized$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(_this));
        _this.handleSubmit = _this.handleSubmit.bind((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$assertThisInitialized$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(_this));
        _this.handleExpire = _this.handleExpire.bind((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$assertThisInitialized$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(_this));
        _this.handleError = _this.handleError.bind((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$assertThisInitialized$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(_this));
        _this.handleOpen = _this.handleOpen.bind((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$assertThisInitialized$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(_this));
        _this.handleClose = _this.handleClose.bind((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$assertThisInitialized$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(_this));
        _this.handleChallengeExpired = _this.handleChallengeExpired.bind((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$babel$2f$runtime$2f$helpers$2f$esm$2f$assertThisInitialized$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(_this));
        _this.ref = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRef"]();
        _this.apiScriptRequested = false;
        _this.sentryHub = null;
        _this.captchaId = '';
        /**
     * Tracks the currently pending async execute() promise.
     * Stores { resolve, reject } so we can cancel on unmount/errors/etc.
     */ _this._pendingExecute = null;
        _this.state = {
            isApiReady: false,
            isRemoved: false,
            elementId: props.id
        };
        return _this;
    }
    var _proto = HCaptcha.prototype;
    _proto.componentDidMount = function componentDidMount() {
        var _this2 = this;
        // Once captcha is mounted intialize hCaptcha - hCaptcha
        var element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$hcaptcha$2f$react$2d$hcaptcha$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMountElement"])(this.props.scriptLocation);
        var frame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$hcaptcha$2f$react$2d$hcaptcha$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFrame"])(element);
        this._hcaptcha = frame.window.hcaptcha || undefined;
        var isApiReady = typeof this._hcaptcha !== 'undefined';
        /*
     * Check if hCaptcha has already been loaded,
     * If Yes, render the captcha
     * If No, create script tag and wait to render the captcha
     */ if (isApiReady) {
            this.setState({
                isApiReady: true
            }, function() {
                _this2.renderCaptcha();
            });
            return;
        }
        this.loadCaptcha();
    };
    _proto.componentWillUnmount = function componentWillUnmount() {
        var hcaptcha = this._hcaptcha;
        var captchaId = this.captchaId;
        this._cancelPendingExecute('react-component-unmounted');
        if (!this.isReady()) {
            return;
        }
        // Reset any stored variables / timers when unmounting
        hcaptcha.reset(captchaId);
        hcaptcha.remove(captchaId);
    };
    _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
        // Prevent component re-rendering when these internal state variables are updated
        if (this.state.isApiReady !== nextState.isApiReady || this.state.isRemoved !== nextState.isRemoved) {
            return false;
        }
        return true;
    };
    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
        var _this3 = this;
        // Prop Keys that could change
        var keys = [
            'sitekey',
            'size',
            'theme',
            'tabindex',
            'languageOverride',
            'endpoint'
        ];
        // See if any props changed during component update
        var match = keys.every(function(key) {
            return prevProps[key] === _this3.props[key];
        });
        // If they have changed, remove current captcha and render a new one
        if (!match) {
            this.removeCaptcha(function() {
                _this3.renderCaptcha();
            });
        }
    };
    _proto.loadCaptcha = function loadCaptcha() {
        if (this.apiScriptRequested) {
            return;
        }
        var _this$props = this.props, apihost = _this$props.apihost, assethost = _this$props.assethost, endpoint = _this$props.endpoint, host = _this$props.host, imghost = _this$props.imghost, hl = _this$props.languageOverride, reCaptchaCompat = _this$props.reCaptchaCompat, reportapi = _this$props.reportapi, sentry = _this$props.sentry, custom = _this$props.custom, loadAsync = _this$props.loadAsync, scriptLocation = _this$props.scriptLocation, scriptSource = _this$props.scriptSource, secureApi = _this$props.secureApi, _this$props$cleanup = _this$props.cleanup, cleanup = _this$props$cleanup === void 0 ? true : _this$props$cleanup, userJourneys = _this$props.userJourneys;
        var mountParams = {
            render: 'explicit',
            apihost: apihost,
            assethost: assethost,
            endpoint: endpoint,
            hl: hl,
            host: host,
            imghost: imghost,
            recaptchacompat: reCaptchaCompat === false ? 'off' : null,
            reportapi: reportapi,
            sentry: sentry,
            custom: custom,
            loadAsync: loadAsync,
            scriptLocation: scriptLocation,
            scriptSource: scriptSource,
            secureApi: secureApi,
            cleanup: cleanup,
            uj: userJourneys !== undefined ? userJourneys : false
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$hcaptcha$2f$loader$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hCaptchaLoader"])(mountParams).then(this.handleOnLoad, this.handleError)["catch"](this.handleError);
        this.apiScriptRequested = true;
    };
    _proto.renderCaptcha = function renderCaptcha(onRender) {
        var _this4 = this;
        var onReady = this.props.onReady;
        var isApiReady = this.state.isApiReady;
        var captchaId = this.captchaId;
        // Prevent calling hCaptcha render on two conditions:
        // • API is not ready
        // • Component has already been mounted
        if (!isApiReady || captchaId) return;
        var renderParams = Object.assign({
            "open-callback": this.handleOpen,
            "close-callback": this.handleClose,
            "error-callback": this.handleError,
            "chalexpired-callback": this.handleChallengeExpired,
            "expired-callback": this.handleExpire,
            "callback": this.handleSubmit
        }, this.props, {
            hl: this.props.hl || this.props.languageOverride,
            languageOverride: undefined
        });
        var hcaptcha = this._hcaptcha;
        //Render hCaptcha widget and provide necessary callbacks - hCaptcha
        var id = hcaptcha.render(this.ref.current, renderParams);
        this.captchaId = id;
        this.setState({
            isRemoved: false
        }, function() {
            onRender && onRender();
            onReady && onReady();
            _this4._onReady && _this4._onReady(id);
        });
    };
    _proto.resetCaptcha = function resetCaptcha() {
        var hcaptcha = this._hcaptcha;
        var captchaId = this.captchaId;
        if (!this.isReady()) {
            return;
        }
        // Reset captcha state, removes stored token and unticks checkbox
        hcaptcha.reset(captchaId);
        this._cancelPendingExecute('hcaptcha-reset');
    };
    _proto.removeCaptcha = function removeCaptcha(callback) {
        var _this5 = this;
        var hcaptcha = this._hcaptcha;
        var captchaId = this.captchaId;
        this._cancelPendingExecute('hcaptcha-removed');
        if (!this.isReady()) {
            return;
        }
        this.setState({
            isRemoved: true
        }, function() {
            _this5.captchaId = '';
            hcaptcha.remove(captchaId);
            callback && callback();
        });
    };
    _proto.handleOnLoad = function handleOnLoad() {
        var _this6 = this;
        this.setState({
            isApiReady: true
        }, function() {
            var element = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$hcaptcha$2f$react$2d$hcaptcha$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMountElement"])(_this6.props.scriptLocation);
            var frame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$hcaptcha$2f$react$2d$hcaptcha$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFrame"])(element);
            _this6._hcaptcha = frame.window.hcaptcha;
            // render captcha and wait for captcha id
            _this6.renderCaptcha(function() {
                // trigger onLoad if it exists
                var onLoad = _this6.props.onLoad;
                if (onLoad) onLoad();
            });
        });
    };
    _proto.handleSubmit = function handleSubmit(event) {
        var onVerify = this.props.onVerify;
        var isRemoved = this.state.isRemoved;
        var hcaptcha = this._hcaptcha;
        var captchaId = this.captchaId;
        if (typeof hcaptcha === 'undefined' || isRemoved) return;
        var token = hcaptcha.getResponse(captchaId); //Get response token from hCaptcha widget
        var ekey = hcaptcha.getRespKey(captchaId); //Get current challenge session id from hCaptcha widget
        if (onVerify) onVerify(token, ekey); //Dispatch event to verify user response
    };
    _proto.handleExpire = function handleExpire() {
        var onExpire = this.props.onExpire;
        var hcaptcha = this._hcaptcha;
        var captchaId = this.captchaId;
        if (!this.isReady()) {
            return;
        }
        hcaptcha.reset(captchaId); // If hCaptcha runs into error, reset captcha - hCaptcha
        if (onExpire) onExpire();
    };
    _proto.handleError = function handleError(event) {
        var onError = this.props.onError;
        var hcaptcha = this._hcaptcha;
        var captchaId = this.captchaId;
        if (this.isReady()) {
            // If hCaptcha runs into error, reset captcha - hCaptcha
            hcaptcha.reset(captchaId);
        }
        if (onError) onError(event);
    };
    _proto.isReady = function isReady() {
        var _this$state = this.state, isApiReady = _this$state.isApiReady, isRemoved = _this$state.isRemoved;
        return isApiReady && !isRemoved;
    };
    _proto._cancelPendingExecute = function _cancelPendingExecute(reason) {
        if (!this._pendingExecute) {
            return;
        }
        var pending = this._pendingExecute;
        this._pendingExecute = null;
        var error = new Error(reason);
        pending.reject(error);
    };
    _proto.handleOpen = function handleOpen() {
        if (!this.isReady() || !this.props.onOpen) {
            return;
        }
        this.props.onOpen();
    };
    _proto.handleClose = function handleClose() {
        if (!this.isReady() || !this.props.onClose) {
            return;
        }
        this.props.onClose();
    };
    _proto.handleChallengeExpired = function handleChallengeExpired() {
        if (!this.isReady() || !this.props.onChalExpired) {
            return;
        }
        this.props.onChalExpired();
    };
    _proto.execute = function execute(opts) {
        var _this7 = this;
        if (opts === void 0) {
            opts = null;
        }
        opts = typeof opts === 'object' ? opts : null;
        try {
            var hcaptcha = this._hcaptcha;
            var captchaId = this.captchaId;
            // Is an async execute and there's already 1 pending, cancel the old one.
            if (opts && opts.async && this._pendingExecute) {
                this._cancelPendingExecute('hcaptcha-execute-replaced');
            }
            if (!this.isReady()) {
                if (opts && opts.async) {
                    return new Promise(function(resolve, reject) {
                        _this7._pendingExecute = {
                            resolve: resolve,
                            reject: reject
                        };
                        _this7._onReady = function(id) {
                            if (!_this7._pendingExecute) {
                                return;
                            }
                            try {
                                var _result = hcaptcha.execute(id, opts);
                                if (_result && typeof _result.then === 'function') {
                                    _result.then(function(val) {
                                        _this7._pendingExecute = null;
                                        resolve(val);
                                    })["catch"](function(err) {
                                        _this7._pendingExecute = null;
                                        reject(err);
                                    });
                                } else {
                                    _this7._pendingExecute = null;
                                    reject(new Error('hcaptcha-execute-no-promise'));
                                }
                            } catch (e) {
                                _this7._pendingExecute = null;
                                reject(e);
                            }
                        };
                    });
                } else {
                    // Non-async: don't return a promise.
                    this._onReady = function(id) {
                        hcaptcha.execute(id, opts);
                    };
                    return null;
                }
            }
            // hCaptcha is ready, execute directly.
            var result = hcaptcha.execute(captchaId, opts);
            // If it's async execute, track it.
            if (opts && opts.async && result && typeof result.then === 'function') {
                return new Promise(function(resolve, reject) {
                    _this7._pendingExecute = {
                        resolve: resolve,
                        reject: reject
                    };
                    result.then(function(val) {
                        _this7._pendingExecute = null;
                        resolve(val);
                    })["catch"](function(err) {
                        _this7._pendingExecute = null;
                        reject(err);
                    });
                });
            }
            return result;
        } catch (error) {
            if (opts && opts.async) {
                return Promise.reject(error);
            }
            return null;
        }
    };
    _proto.close = function close() {
        var hcaptcha = this._hcaptcha;
        var captchaId = this.captchaId;
        this._cancelPendingExecute('hcaptcha-closed');
        if (!this.isReady()) {
            return;
        }
        return hcaptcha.close(captchaId);
    };
    _proto.setData = function setData(data) {
        var hcaptcha = this._hcaptcha;
        var captchaId = this.captchaId;
        if (!this.isReady()) {
            return;
        }
        if (data && typeof data !== "object") {
            data = null;
        }
        hcaptcha.setData(captchaId, data);
    };
    _proto.getResponse = function getResponse() {
        var hcaptcha = this._hcaptcha;
        return hcaptcha.getResponse(this.captchaId);
    };
    _proto.getRespKey = function getRespKey() {
        var hcaptcha = this._hcaptcha;
        return hcaptcha.getRespKey(this.captchaId);
    };
    _proto.render = function render() {
        var elementId = this.state.elementId;
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("div", {
            ref: this.ref,
            id: elementId
        });
    };
    return HCaptcha;
}(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Component"]);
const __TURBOPACK__default__export__ = HCaptcha;
}),
"[project]/Desktop/frontend/node_modules/@privy-io/react-auth/dist/esm/HCaptchaWrapper-Dl2Jt_Df.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HCaptchaWrapper",
    ()=>t,
    "default",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$hcaptcha$2f$react$2d$hcaptcha$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@hcaptcha/react-hcaptcha/dist/esm/index.js [app-client] (ecmascript)");
;
;
const t = ({ captchaContext: t, ...o })=>{
    let { setError: a, setToken: i, setExecuting: c, siteKey: n, ref: s } = t; /*#__PURE__*/ 
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$hcaptcha$2f$react$2d$hcaptcha$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        ref: s,
        sitekey: n ?? "",
        size: "invisible",
        onVerify: (e)=>{
            o.onSuccess?.(e), i(e), c(!1);
        },
        onError: (e)=>{
            o.onError?.(e), a("Captcha failed"), c(!1);
        },
        onExpire: ()=>{
            o.onExpire?.("");
            try {
                s.current?.resetCaptcha(), a(void 0), i(void 0);
            } catch (e) {
                a("expired_and_failed_reset");
            }
        }
    });
};
;
}),
]);

//# sourceMappingURL=1b50e_aac4a9a4._.js.map