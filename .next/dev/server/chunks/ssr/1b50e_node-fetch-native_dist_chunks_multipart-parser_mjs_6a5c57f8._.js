module.exports = [
"[project]/Desktop/frontend/node_modules/node-fetch-native/dist/chunks/multipart-parser.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toFormData",
    ()=>Z
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$node$2d$fetch$2d$native$2f$dist$2f$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/node-fetch-native/dist/node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$http__$5b$external$5d$__$28$node$3a$http$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:http [external] (node:http, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$https__$5b$external$5d$__$28$node$3a$https$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:https [external] (node:https, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$zlib__$5b$external$5d$__$28$node$3a$zlib$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:zlib [external] (node:zlib, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$stream__$5b$external$5d$__$28$node$3a$stream$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:stream [external] (node:stream, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$buffer__$5b$external$5d$__$28$node$3a$buffer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:buffer [external] (node:buffer, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$util__$5b$external$5d$__$28$node$3a$util$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:util [external] (node:util, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$node$2d$fetch$2d$native$2f$dist$2f$shared$2f$node$2d$fetch$2d$native$2e$DfbY2q$2d$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/node-fetch-native/dist/shared/node-fetch-native.DfbY2q-x.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:url [external] (node:url, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$net__$5b$external$5d$__$28$node$3a$net$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:net [external] (node:net, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var B = Object.defineProperty;
var E = (u, a)=>B(u, "name", {
        value: a,
        configurable: !0
    });
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
let D = 0;
const t = {
    START_BOUNDARY: D++,
    HEADER_FIELD_START: D++,
    HEADER_FIELD: D++,
    HEADER_VALUE_START: D++,
    HEADER_VALUE: D++,
    HEADER_VALUE_ALMOST_DONE: D++,
    HEADERS_ALMOST_DONE: D++,
    PART_DATA_START: D++,
    PART_DATA: D++,
    END: D++
};
let w = 1;
const R = {
    PART_BOUNDARY: w,
    LAST_BOUNDARY: w *= 2
}, g = 10, N = 13, x = 32, P = 45, C = 58, I = 97, M = 122, $ = E((u)=>u | 32, "lower"), m = E(()=>{}, "noop"), F = class F {
    constructor(a){
        this.index = 0, this.flags = 0, this.onHeaderEnd = m, this.onHeaderField = m, this.onHeadersEnd = m, this.onHeaderValue = m, this.onPartBegin = m, this.onPartData = m, this.onPartEnd = m, this.boundaryChars = {}, a = `\r
--` + a;
        const n = new Uint8Array(a.length);
        for(let r = 0; r < a.length; r++)n[r] = a.charCodeAt(r), this.boundaryChars[n[r]] = !0;
        this.boundary = n, this.lookbehind = new Uint8Array(this.boundary.length + 8), this.state = t.START_BOUNDARY;
    }
    write(a) {
        let n = 0;
        const r = a.length;
        let d = this.index, { lookbehind: l, boundary: c, boundaryChars: p, index: e, state: i, flags: A } = this;
        const H = this.boundary.length, O = H - 1, y = a.length;
        let o, L;
        const f = E((h)=>{
            this[h + "Mark"] = n;
        }, "mark"), s = E((h)=>{
            delete this[h + "Mark"];
        }, "clear"), T = E((h, S, _, U)=>{
            (S === void 0 || S !== _) && this[h](U && U.subarray(S, _));
        }, "callback"), b = E((h, S)=>{
            const _ = h + "Mark";
            _ in this && (S ? (T(h, this[_], n, a), delete this[_]) : (T(h, this[_], a.length, a), this[_] = 0));
        }, "dataCallback");
        for(n = 0; n < r; n++)switch(o = a[n], i){
            case t.START_BOUNDARY:
                if (e === c.length - 2) {
                    if (o === P) A |= R.LAST_BOUNDARY;
                    else if (o !== N) return;
                    e++;
                    break;
                } else if (e - 1 === c.length - 2) {
                    if (A & R.LAST_BOUNDARY && o === P) i = t.END, A = 0;
                    else if (!(A & R.LAST_BOUNDARY) && o === g) e = 0, T("onPartBegin"), i = t.HEADER_FIELD_START;
                    else return;
                    break;
                }
                o !== c[e + 2] && (e = -2), o === c[e + 2] && e++;
                break;
            case t.HEADER_FIELD_START:
                i = t.HEADER_FIELD, f("onHeaderField"), e = 0;
            case t.HEADER_FIELD:
                if (o === N) {
                    s("onHeaderField"), i = t.HEADERS_ALMOST_DONE;
                    break;
                }
                if (e++, o === P) break;
                if (o === C) {
                    if (e === 1) return;
                    b("onHeaderField", !0), i = t.HEADER_VALUE_START;
                    break;
                }
                if (L = $(o), L < I || L > M) return;
                break;
            case t.HEADER_VALUE_START:
                if (o === x) break;
                f("onHeaderValue"), i = t.HEADER_VALUE;
            case t.HEADER_VALUE:
                o === N && (b("onHeaderValue", !0), T("onHeaderEnd"), i = t.HEADER_VALUE_ALMOST_DONE);
                break;
            case t.HEADER_VALUE_ALMOST_DONE:
                if (o !== g) return;
                i = t.HEADER_FIELD_START;
                break;
            case t.HEADERS_ALMOST_DONE:
                if (o !== g) return;
                T("onHeadersEnd"), i = t.PART_DATA_START;
                break;
            case t.PART_DATA_START:
                i = t.PART_DATA, f("onPartData");
            case t.PART_DATA:
                if (d = e, e === 0) {
                    for(n += O; n < y && !(a[n] in p);)n += H;
                    n -= O, o = a[n];
                }
                if (e < c.length) c[e] === o ? (e === 0 && b("onPartData", !0), e++) : e = 0;
                else if (e === c.length) e++, o === N ? A |= R.PART_BOUNDARY : o === P ? A |= R.LAST_BOUNDARY : e = 0;
                else if (e - 1 === c.length) if (A & R.PART_BOUNDARY) {
                    if (e = 0, o === g) {
                        A &= ~R.PART_BOUNDARY, T("onPartEnd"), T("onPartBegin"), i = t.HEADER_FIELD_START;
                        break;
                    }
                } else A & R.LAST_BOUNDARY && o === P ? (T("onPartEnd"), i = t.END, A = 0) : e = 0;
                if (e > 0) l[e - 1] = o;
                else if (d > 0) {
                    const h = new Uint8Array(l.buffer, l.byteOffset, l.byteLength);
                    T("onPartData", 0, d, h), d = 0, f("onPartData"), n--;
                }
                break;
            case t.END:
                break;
            default:
                throw new Error(`Unexpected state entered: ${i}`);
        }
        b("onHeaderField"), b("onHeaderValue"), b("onPartData"), this.index = e, this.state = i, this.flags = A;
    }
    end() {
        if (this.state === t.HEADER_FIELD_START && this.index === 0 || this.state === t.PART_DATA && this.index === this.boundary.length) this.onPartEnd();
        else if (this.state !== t.END) throw new Error("MultipartParser.end(): stream ended unexpectedly");
    }
};
E(F, "MultipartParser");
let k = F;
function v(u) {
    const a = u.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
    if (!a) return;
    const n = a[2] || a[3] || "";
    let r = n.slice(n.lastIndexOf("\\") + 1);
    return r = r.replace(/%22/g, '"'), r = r.replace(/&#(\d{4});/g, (d, l)=>String.fromCharCode(l)), r;
}
E(v, "_fileName");
async function Z(u, a) {
    if (!/multipart/i.test(a)) throw new TypeError("Failed to fetch");
    const n = a.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
    if (!n) throw new TypeError("no or bad content-type header, no multipart boundary");
    const r = new k(n[1] || n[2]);
    let d, l, c, p, e, i;
    const A = [], H = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$node$2d$fetch$2d$native$2f$dist$2f$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FormData"], O = E((s)=>{
        c += f.decode(s, {
            stream: !0
        });
    }, "onPartData"), y = E((s)=>{
        A.push(s);
    }, "appendToFile"), o = E(()=>{
        const s = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$node$2d$fetch$2d$native$2f$dist$2f$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["File"](A, i, {
            type: e
        });
        H.append(p, s);
    }, "appendFileToFormData"), L = E(()=>{
        H.append(p, c);
    }, "appendEntryToFormData"), f = new TextDecoder("utf-8");
    f.decode(), r.onPartBegin = function() {
        r.onPartData = O, r.onPartEnd = L, d = "", l = "", c = "", p = "", e = "", i = null, A.length = 0;
    }, r.onHeaderField = function(s) {
        d += f.decode(s, {
            stream: !0
        });
    }, r.onHeaderValue = function(s) {
        l += f.decode(s, {
            stream: !0
        });
    }, r.onHeaderEnd = function() {
        if (l += f.decode(), d = d.toLowerCase(), d === "content-disposition") {
            const s = l.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
            s && (p = s[2] || s[3] || ""), i = v(l), i && (r.onPartData = y, r.onPartEnd = o);
        } else d === "content-type" && (e = l);
        l = "", d = "";
    };
    for await (const s of u)r.write(s);
    return r.end(), H;
}
E(Z, "toFormData");
;
}),
];

//# sourceMappingURL=1b50e_node-fetch-native_dist_chunks_multipart-parser_mjs_6a5c57f8._.js.map