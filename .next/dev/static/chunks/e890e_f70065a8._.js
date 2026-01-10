(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/pino/browser.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const format = __turbopack_context__.r("[project]/Desktop/frontend/node_modules/quick-format-unescaped/index.js [app-client] (ecmascript)");
module.exports = pino;
const _console = pfGlobalThisOrFallback().console || {};
const stdSerializers = {
    mapHttpRequest: mock,
    mapHttpResponse: mock,
    wrapRequestSerializer: passthrough,
    wrapResponseSerializer: passthrough,
    wrapErrorSerializer: passthrough,
    req: mock,
    res: mock,
    err: asErrValue
};
function shouldSerialize(serialize, serializers) {
    if (Array.isArray(serialize)) {
        const hasToFilter = serialize.filter(function(k) {
            return k !== '!stdSerializers.err';
        });
        return hasToFilter;
    } else if (serialize === true) {
        return Object.keys(serializers);
    }
    return false;
}
function pino(opts) {
    opts = opts || {};
    opts.browser = opts.browser || {};
    const transmit = opts.browser.transmit;
    if (transmit && typeof transmit.send !== 'function') {
        throw Error('pino: transmit option must have a send function');
    }
    const proto = opts.browser.write || _console;
    if (opts.browser.write) opts.browser.asObject = true;
    const serializers = opts.serializers || {};
    const serialize = shouldSerialize(opts.browser.serialize, serializers);
    let stdErrSerialize = opts.browser.serialize;
    if (Array.isArray(opts.browser.serialize) && opts.browser.serialize.indexOf('!stdSerializers.err') > -1) stdErrSerialize = false;
    const levels = [
        'error',
        'fatal',
        'warn',
        'info',
        'debug',
        'trace'
    ];
    if (typeof proto === 'function') {
        proto.error = proto.fatal = proto.warn = proto.info = proto.debug = proto.trace = proto;
    }
    if (opts.enabled === false) opts.level = 'silent';
    const level = opts.level || 'info';
    const logger = Object.create(proto);
    if (!logger.log) logger.log = noop;
    Object.defineProperty(logger, 'levelVal', {
        get: getLevelVal
    });
    Object.defineProperty(logger, 'level', {
        get: getLevel,
        set: setLevel
    });
    const setOpts = {
        transmit,
        serialize,
        asObject: opts.browser.asObject,
        levels,
        timestamp: getTimeFunction(opts)
    };
    logger.levels = pino.levels;
    logger.level = level;
    logger.setMaxListeners = logger.getMaxListeners = logger.emit = logger.addListener = logger.on = logger.prependListener = logger.once = logger.prependOnceListener = logger.removeListener = logger.removeAllListeners = logger.listeners = logger.listenerCount = logger.eventNames = logger.write = logger.flush = noop;
    logger.serializers = serializers;
    logger._serialize = serialize;
    logger._stdErrSerialize = stdErrSerialize;
    logger.child = child;
    if (transmit) logger._logEvent = createLogEventShape();
    function getLevelVal() {
        return this.level === 'silent' ? Infinity : this.levels.values[this.level];
    }
    function getLevel() {
        return this._level;
    }
    function setLevel(level) {
        if (level !== 'silent' && !this.levels.values[level]) {
            throw Error('unknown level ' + level);
        }
        this._level = level;
        set(setOpts, logger, 'error', 'log'); // <-- must stay first
        set(setOpts, logger, 'fatal', 'error');
        set(setOpts, logger, 'warn', 'error');
        set(setOpts, logger, 'info', 'log');
        set(setOpts, logger, 'debug', 'log');
        set(setOpts, logger, 'trace', 'log');
    }
    function child(bindings, childOptions) {
        if (!bindings) {
            throw new Error('missing bindings for child Pino');
        }
        childOptions = childOptions || {};
        if (serialize && bindings.serializers) {
            childOptions.serializers = bindings.serializers;
        }
        const childOptionsSerializers = childOptions.serializers;
        if (serialize && childOptionsSerializers) {
            var childSerializers = Object.assign({}, serializers, childOptionsSerializers);
            var childSerialize = opts.browser.serialize === true ? Object.keys(childSerializers) : serialize;
            delete bindings.serializers;
            applySerializers([
                bindings
            ], childSerialize, childSerializers, this._stdErrSerialize);
        }
        function Child(parent) {
            this._childLevel = (parent._childLevel | 0) + 1;
            this.error = bind(parent, bindings, 'error');
            this.fatal = bind(parent, bindings, 'fatal');
            this.warn = bind(parent, bindings, 'warn');
            this.info = bind(parent, bindings, 'info');
            this.debug = bind(parent, bindings, 'debug');
            this.trace = bind(parent, bindings, 'trace');
            if (childSerializers) {
                this.serializers = childSerializers;
                this._serialize = childSerialize;
            }
            if (transmit) {
                this._logEvent = createLogEventShape([].concat(parent._logEvent.bindings, bindings));
            }
        }
        Child.prototype = this;
        return new Child(this);
    }
    return logger;
}
pino.levels = {
    values: {
        fatal: 60,
        error: 50,
        warn: 40,
        info: 30,
        debug: 20,
        trace: 10
    },
    labels: {
        10: 'trace',
        20: 'debug',
        30: 'info',
        40: 'warn',
        50: 'error',
        60: 'fatal'
    }
};
pino.stdSerializers = stdSerializers;
pino.stdTimeFunctions = Object.assign({}, {
    nullTime,
    epochTime,
    unixTime,
    isoTime
});
function set(opts, logger, level, fallback) {
    const proto = Object.getPrototypeOf(logger);
    logger[level] = logger.levelVal > logger.levels.values[level] ? noop : proto[level] ? proto[level] : _console[level] || _console[fallback] || noop;
    wrap(opts, logger, level);
}
function wrap(opts, logger, level) {
    if (!opts.transmit && logger[level] === noop) return;
    logger[level] = function(write) {
        return function LOG() {
            const ts = opts.timestamp();
            const args = new Array(arguments.length);
            const proto = Object.getPrototypeOf && Object.getPrototypeOf(this) === _console ? _console : this;
            for(var i = 0; i < args.length; i++)args[i] = arguments[i];
            if (opts.serialize && !opts.asObject) {
                applySerializers(args, this._serialize, this.serializers, this._stdErrSerialize);
            }
            if (opts.asObject) write.call(proto, asObject(this, level, args, ts));
            else write.apply(proto, args);
            if (opts.transmit) {
                const transmitLevel = opts.transmit.level || logger.level;
                const transmitValue = pino.levels.values[transmitLevel];
                const methodValue = pino.levels.values[level];
                if (methodValue < transmitValue) return;
                transmit(this, {
                    ts,
                    methodLevel: level,
                    methodValue,
                    transmitLevel,
                    transmitValue: pino.levels.values[opts.transmit.level || logger.level],
                    send: opts.transmit.send,
                    val: logger.levelVal
                }, args);
            }
        };
    }(logger[level]);
}
function asObject(logger, level, args, ts) {
    if (logger._serialize) applySerializers(args, logger._serialize, logger.serializers, logger._stdErrSerialize);
    const argsCloned = args.slice();
    let msg = argsCloned[0];
    const o = {};
    if (ts) {
        o.time = ts;
    }
    o.level = pino.levels.values[level];
    let lvl = (logger._childLevel | 0) + 1;
    if (lvl < 1) lvl = 1;
    // deliberate, catching objects, arrays
    if (msg !== null && typeof msg === 'object') {
        while(lvl-- && typeof argsCloned[0] === 'object'){
            Object.assign(o, argsCloned.shift());
        }
        msg = argsCloned.length ? format(argsCloned.shift(), argsCloned) : undefined;
    } else if (typeof msg === 'string') msg = format(argsCloned.shift(), argsCloned);
    if (msg !== undefined) o.msg = msg;
    return o;
}
function applySerializers(args, serialize, serializers, stdErrSerialize) {
    for(const i in args){
        if (stdErrSerialize && args[i] instanceof Error) {
            args[i] = pino.stdSerializers.err(args[i]);
        } else if (typeof args[i] === 'object' && !Array.isArray(args[i])) {
            for(const k in args[i]){
                if (serialize && serialize.indexOf(k) > -1 && k in serializers) {
                    args[i][k] = serializers[k](args[i][k]);
                }
            }
        }
    }
}
function bind(parent, bindings, level) {
    return function() {
        const args = new Array(1 + arguments.length);
        args[0] = bindings;
        for(var i = 1; i < args.length; i++){
            args[i] = arguments[i - 1];
        }
        return parent[level].apply(this, args);
    };
}
function transmit(logger, opts, args) {
    const send = opts.send;
    const ts = opts.ts;
    const methodLevel = opts.methodLevel;
    const methodValue = opts.methodValue;
    const val = opts.val;
    const bindings = logger._logEvent.bindings;
    applySerializers(args, logger._serialize || Object.keys(logger.serializers), logger.serializers, logger._stdErrSerialize === undefined ? true : logger._stdErrSerialize);
    logger._logEvent.ts = ts;
    logger._logEvent.messages = args.filter(function(arg) {
        // bindings can only be objects, so reference equality check via indexOf is fine
        return bindings.indexOf(arg) === -1;
    });
    logger._logEvent.level.label = methodLevel;
    logger._logEvent.level.value = methodValue;
    send(methodLevel, logger._logEvent, val);
    logger._logEvent = createLogEventShape(bindings);
}
function createLogEventShape(bindings) {
    return {
        ts: 0,
        messages: [],
        bindings: bindings || [],
        level: {
            label: '',
            value: 0
        }
    };
}
function asErrValue(err) {
    const obj = {
        type: err.constructor.name,
        msg: err.message,
        stack: err.stack
    };
    for(const key in err){
        if (obj[key] === undefined) {
            obj[key] = err[key];
        }
    }
    return obj;
}
function getTimeFunction(opts) {
    if (typeof opts.timestamp === 'function') {
        return opts.timestamp;
    }
    if (opts.timestamp === false) {
        return nullTime;
    }
    return epochTime;
}
function mock() {
    return {};
}
function passthrough(a) {
    return a;
}
function noop() {}
function nullTime() {
    return false;
}
function epochTime() {
    return Date.now();
}
function unixTime() {
    return Math.round(Date.now() / 1000.0);
}
function isoTime() {
    return new Date(Date.now()).toISOString();
} // using Date.now() for testability
/* eslint-disable */ /* istanbul ignore next */ function pfGlobalThisOrFallback() {
    function defd(o) {
        return typeof o !== 'undefined' && o;
    }
    try {
        if (typeof globalThis !== 'undefined') return globalThis;
        Object.defineProperty(Object.prototype, 'globalThis', {
            get: function() {
                delete Object.prototype.globalThis;
                return this.globalThis = this;
            },
            configurable: true
        });
        return globalThis;
    } catch (e) {
        return defd(self) || defd(window) || defd(this) || {};
    }
} /* eslint-enable */ 
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/logger/dist/index.es.js [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MAX_LOG_SIZE_IN_BYTES_DEFAULT",
    ()=>l,
    "PINO_CUSTOM_CONTEXT_KEY",
    ()=>n,
    "PINO_LOGGER_DEFAULTS",
    ()=>c,
    "formatChildLoggerContext",
    ()=>w,
    "generateChildLogger",
    ()=>E,
    "generateClientLogger",
    ()=>C,
    "generatePlatformLogger",
    ()=>A,
    "generateServerLogger",
    ()=>I,
    "getBrowserLoggerContext",
    ()=>v,
    "getDefaultLoggerOptions",
    ()=>k,
    "getLoggerContext",
    ()=>y,
    "setBrowserLoggerContext",
    ()=>b
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/pino/browser.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/safe-json/dist/esm/index.js [app-client] (ecmascript)");
;
;
;
const c = {
    level: "info"
}, n = "custom_context", l = 1e3 * 1024;
class O {
    constructor(e){
        this.nodeValue = e, this.sizeInBytes = new TextEncoder().encode(this.nodeValue).length, this.next = null;
    }
    get value() {
        return this.nodeValue;
    }
    get size() {
        return this.sizeInBytes;
    }
}
class d {
    constructor(e){
        this.head = null, this.tail = null, this.lengthInNodes = 0, this.maxSizeInBytes = e, this.sizeInBytes = 0;
    }
    append(e) {
        const t = new O(e);
        if (t.size > this.maxSizeInBytes) throw new Error(`[LinkedList] Value too big to insert into list: ${e} with size ${t.size}`);
        for(; this.size + t.size > this.maxSizeInBytes;)this.shift();
        this.head ? (this.tail && (this.tail.next = t), this.tail = t) : (this.head = t, this.tail = t), this.lengthInNodes++, this.sizeInBytes += t.size;
    }
    shift() {
        if (!this.head) return;
        const e = this.head;
        this.head = this.head.next, this.head || (this.tail = null), this.lengthInNodes--, this.sizeInBytes -= e.size;
    }
    toArray() {
        const e = [];
        let t = this.head;
        for(; t !== null;)e.push(t.value), t = t.next;
        return e;
    }
    get length() {
        return this.lengthInNodes;
    }
    get size() {
        return this.sizeInBytes;
    }
    toOrderedArray() {
        return Array.from(this);
    }
    [Symbol.iterator]() {
        let e = this.head;
        return {
            next: ()=>{
                if (!e) return {
                    done: !0,
                    value: null
                };
                const t = e.value;
                return e = e.next, {
                    done: !1,
                    value: t
                };
            }
        };
    }
}
class L {
    constructor(e, t = l){
        this.level = e ?? "error", this.levelValue = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["levels"].values[this.level], this.MAX_LOG_SIZE_IN_BYTES = t, this.logs = new d(this.MAX_LOG_SIZE_IN_BYTES);
    }
    forwardToConsole(e, t) {
        t === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["levels"].values.error ? console.error(e) : t === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["levels"].values.warn ? console.warn(e) : t === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["levels"].values.debug ? console.debug(e) : t === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["levels"].values.trace ? console.trace(e) : console.log(e);
    }
    appendToLogs(e) {
        this.logs.append((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeJsonStringify"])({
            timestamp: new Date().toISOString(),
            log: e
        }));
        const t = typeof e == "string" ? JSON.parse(e).level : e.level;
        t >= this.levelValue && this.forwardToConsole(e, t);
    }
    getLogs() {
        return this.logs;
    }
    clearLogs() {
        this.logs = new d(this.MAX_LOG_SIZE_IN_BYTES);
    }
    getLogArray() {
        return Array.from(this.logs);
    }
    logsToBlob(e) {
        const t = this.getLogArray();
        return t.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeJsonStringify"])({
            extraMetadata: e
        })), new Blob(t, {
            type: "application/json"
        });
    }
}
class m {
    constructor(e, t = l){
        this.baseChunkLogger = new L(e, t);
    }
    write(e) {
        this.baseChunkLogger.appendToLogs(e);
    }
    getLogs() {
        return this.baseChunkLogger.getLogs();
    }
    clearLogs() {
        this.baseChunkLogger.clearLogs();
    }
    getLogArray() {
        return this.baseChunkLogger.getLogArray();
    }
    logsToBlob(e) {
        return this.baseChunkLogger.logsToBlob(e);
    }
    downloadLogsBlobInBrowser(e) {
        const t = URL.createObjectURL(this.logsToBlob(e)), o = document.createElement("a");
        o.href = t, o.download = `walletconnect-logs-${new Date().toISOString()}.txt`, document.body.appendChild(o), o.click(), document.body.removeChild(o), URL.revokeObjectURL(t);
    }
}
class B {
    constructor(e, t = l){
        this.baseChunkLogger = new L(e, t);
    }
    write(e) {
        this.baseChunkLogger.appendToLogs(e);
    }
    getLogs() {
        return this.baseChunkLogger.getLogs();
    }
    clearLogs() {
        this.baseChunkLogger.clearLogs();
    }
    getLogArray() {
        return this.baseChunkLogger.getLogArray();
    }
    logsToBlob(e) {
        return this.baseChunkLogger.logsToBlob(e);
    }
}
var x = Object.defineProperty, S = Object.defineProperties, _ = Object.getOwnPropertyDescriptors, p = Object.getOwnPropertySymbols, T = Object.prototype.hasOwnProperty, z = Object.prototype.propertyIsEnumerable, f = (r, e, t)=>e in r ? x(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, i = (r, e)=>{
    for(var t in e || (e = {}))T.call(e, t) && f(r, t, e[t]);
    if (p) for (var t of p(e))z.call(e, t) && f(r, t, e[t]);
    return r;
}, g = (r, e)=>S(r, _(e));
function k(r) {
    return g(i({}, r), {
        level: r?.level || c.level
    });
}
function v(r, e = n) {
    return r[e] || "";
}
function b(r, e, t = n) {
    return r[t] = e, r;
}
function y(r, e = n) {
    let t = "";
    return typeof r.bindings > "u" ? t = v(r, e) : t = r.bindings().context || "", t;
}
function w(r, e, t = n) {
    const o = y(r, t);
    return o.trim() ? `${o}/${e}` : e;
}
function E(r, e, t = n) {
    const o = w(r, e, t), a = r.child({
        context: o
    });
    return b(a, o, t);
}
function C(r) {
    var e, t;
    const o = new m((e = r.opts) == null ? void 0 : e.level, r.maxSizeInBytes);
    return {
        logger: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(g(i({}, r.opts), {
            level: "trace",
            browser: g(i({}, (t = r.opts) == null ? void 0 : t.browser), {
                write: (a)=>o.write(a)
            })
        })),
        chunkLoggerController: o
    };
}
function I(r) {
    var e;
    const t = new B((e = r.opts) == null ? void 0 : e.level, r.maxSizeInBytes);
    return {
        logger: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(g(i({}, r.opts), {
            level: "trace"
        }), t),
        chunkLoggerController: t
    };
}
function A(r) {
    return typeof r.loggerOverride < "u" && typeof r.loggerOverride != "string" ? {
        logger: r.loggerOverride,
        chunkLoggerController: null
    } : typeof window < "u" ? C(r) : I(r);
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/pino/browser.js [app-client] (ecmascript) <export default as pino>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pino",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/pino/browser.js [app-client] (ecmascript)");
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/types/dist/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ICore",
    ()=>h,
    "ICrypto",
    ()=>g,
    "IEchoClient",
    ()=>O,
    "IEngine",
    ()=>V,
    "IEngineEvents",
    ()=>K,
    "IEventClient",
    ()=>R,
    "IExpirer",
    ()=>S,
    "IJsonRpcHistory",
    ()=>I,
    "IKeyChain",
    ()=>j,
    "IMessageTracker",
    ()=>y,
    "IPairing",
    ()=>$,
    "IPublisher",
    ()=>m,
    "IRelayer",
    ()=>d,
    "ISignClient",
    ()=>J,
    "ISignClientEvents",
    ()=>H,
    "IStore",
    ()=>f,
    "ISubscriber",
    ()=>P,
    "ISubscriberTopicMap",
    ()=>C,
    "IVerify",
    ()=>M
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/events/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/events/dist/esm/events.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/events/events.js [app-client] (ecmascript)");
;
;
var a = Object.defineProperty, u = (e, s, r)=>s in e ? a(e, s, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : e[s] = r, c = (e, s, r)=>u(e, typeof s != "symbol" ? s + "" : s, r);
class h extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(s){
        super(), this.opts = s, c(this, "protocol", "wc"), c(this, "version", 2);
    }
}
class g {
    constructor(s, r, t){
        this.core = s, this.logger = r;
    }
}
var p = Object.defineProperty, b = (e, s, r)=>s in e ? p(e, s, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : e[s] = r, v = (e, s, r)=>b(e, typeof s != "symbol" ? s + "" : s, r);
class I extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(s, r){
        super(), this.core = s, this.logger = r, v(this, "records", new Map);
    }
}
class y {
    constructor(s, r){
        this.logger = s, this.core = r;
    }
}
class m extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(s, r){
        super(), this.relayer = s, this.logger = r;
    }
}
class d extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(s){
        super();
    }
}
class f {
    constructor(s, r, t, q){
        this.core = s, this.logger = r, this.name = t;
    }
}
var E = Object.defineProperty, x = (e, s, r)=>s in e ? E(e, s, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : e[s] = r, w = (e, s, r)=>x(e, typeof s != "symbol" ? s + "" : s, r);
class C {
    constructor(){
        w(this, "map", new Map);
    }
}
class P extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(s, r){
        super(), this.relayer = s, this.logger = r;
    }
}
class j {
    constructor(s, r){
        this.core = s, this.logger = r;
    }
}
class S extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(s, r){
        super(), this.core = s, this.logger = r;
    }
}
class $ {
    constructor(s, r){
        this.logger = s, this.core = r;
    }
}
class M {
    constructor(s, r, t){
        this.core = s, this.logger = r, this.store = t;
    }
}
class O {
    constructor(s, r){
        this.projectId = s, this.logger = r;
    }
}
class R {
    constructor(s, r, t){
        this.core = s, this.logger = r, this.telemetryEnabled = t;
    }
}
var T = Object.defineProperty, k = (e, s, r)=>s in e ? T(e, s, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : e[s] = r, i = (e, s, r)=>k(e, typeof s != "symbol" ? s + "" : s, r);
class H extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] {
    constructor(){
        super();
    }
}
class J {
    constructor(s){
        this.opts = s, i(this, "protocol", "wc"), i(this, "version", 2);
    }
}
class K extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventEmitter"] {
    constructor(){
        super();
    }
}
class V {
    constructor(s){
        this.client = s;
    }
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/version.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "version",
    ()=>version
]);
const version = '2.31.0'; //# sourceMappingURL=version.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseError",
    ()=>BaseError,
    "setErrorConfig",
    ()=>setErrorConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/version.js [app-client] (ecmascript)");
;
let errorConfig = {
    getDocsUrl: ({ docsBaseUrl, docsPath = '', docsSlug })=>docsPath ? `${docsBaseUrl ?? 'https://viem.sh'}${docsPath}${docsSlug ? `#${docsSlug}` : ''}` : undefined,
    version: `viem@${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"]}`
};
function setErrorConfig(config) {
    errorConfig = config;
}
class BaseError extends Error {
    constructor(shortMessage, args = {}){
        const details = (()=>{
            if (args.cause instanceof BaseError) return args.cause.details;
            if (args.cause?.message) return args.cause.message;
            return args.details;
        })();
        const docsPath = (()=>{
            if (args.cause instanceof BaseError) return args.cause.docsPath || args.docsPath;
            return args.docsPath;
        })();
        const docsUrl = errorConfig.getDocsUrl?.({
            ...args,
            docsPath
        });
        const message = [
            shortMessage || 'An error occurred.',
            '',
            ...args.metaMessages ? [
                ...args.metaMessages,
                ''
            ] : [],
            ...docsUrl ? [
                `Docs: ${docsUrl}`
            ] : [],
            ...details ? [
                `Details: ${details}`
            ] : [],
            ...errorConfig.version ? [
                `Version: ${errorConfig.version}`
            ] : []
        ].join('\n');
        super(message, args.cause ? {
            cause: args.cause
        } : undefined);
        Object.defineProperty(this, "details", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "docsPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "metaMessages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "shortMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "version", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'BaseError'
        });
        this.details = details;
        this.docsPath = docsPath;
        this.metaMessages = args.metaMessages;
        this.name = args.name ?? this.name;
        this.shortMessage = shortMessage;
        this.version = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"];
    }
    walk(fn) {
        return walk(this, fn);
    }
}
function walk(err, fn) {
    if (fn?.(err)) return err;
    if (err && typeof err === 'object' && 'cause' in err && err.cause !== undefined) return walk(err.cause, fn);
    return fn ? null : err;
} //# sourceMappingURL=base.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/address.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvalidAddressError",
    ()=>InvalidAddressError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)");
;
class InvalidAddressError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ address }){
        super(`Address "${address}" is invalid.`, {
            metaMessages: [
                '- Address must be a hex value of 20 bytes (40 hex characters).',
                '- Address must match its checksum counterpart.'
            ],
            name: 'InvalidAddressError'
        });
    }
} //# sourceMappingURL=address.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/isHex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isHex",
    ()=>isHex
]);
function isHex(value, { strict = true } = {}) {
    if (!value) return false;
    if (typeof value !== 'string') return false;
    return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith('0x');
} //# sourceMappingURL=isHex.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/data.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvalidBytesLengthError",
    ()=>InvalidBytesLengthError,
    "SizeExceedsPaddingSizeError",
    ()=>SizeExceedsPaddingSizeError,
    "SliceOffsetOutOfBoundsError",
    ()=>SliceOffsetOutOfBoundsError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)");
;
class SliceOffsetOutOfBoundsError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ offset, position, size }){
        super(`Slice ${position === 'start' ? 'starting' : 'ending'} at offset "${offset}" is out-of-bounds (size: ${size}).`, {
            name: 'SliceOffsetOutOfBoundsError'
        });
    }
}
class SizeExceedsPaddingSizeError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ size, targetSize, type }){
        super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (${size}) exceeds padding size (${targetSize}).`, {
            name: 'SizeExceedsPaddingSizeError'
        });
    }
}
class InvalidBytesLengthError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ size, targetSize, type }){
        super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} is expected to be ${targetSize} ${type} long, but is ${size} ${type} long.`, {
            name: 'InvalidBytesLengthError'
        });
    }
} //# sourceMappingURL=data.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/pad.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pad",
    ()=>pad,
    "padBytes",
    ()=>padBytes,
    "padHex",
    ()=>padHex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/data.js [app-client] (ecmascript)");
;
function pad(hexOrBytes, { dir, size = 32 } = {}) {
    if (typeof hexOrBytes === 'string') return padHex(hexOrBytes, {
        dir,
        size
    });
    return padBytes(hexOrBytes, {
        dir,
        size
    });
}
function padHex(hex_, { dir, size = 32 } = {}) {
    if (size === null) return hex_;
    const hex = hex_.replace('0x', '');
    if (hex.length > size * 2) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SizeExceedsPaddingSizeError"]({
        size: Math.ceil(hex.length / 2),
        targetSize: size,
        type: 'hex'
    });
    return `0x${hex[dir === 'right' ? 'padEnd' : 'padStart'](size * 2, '0')}`;
}
function padBytes(bytes, { dir, size = 32 } = {}) {
    if (size === null) return bytes;
    if (bytes.length > size) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$data$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SizeExceedsPaddingSizeError"]({
        size: bytes.length,
        targetSize: size,
        type: 'bytes'
    });
    const paddedBytes = new Uint8Array(size);
    for(let i = 0; i < size; i++){
        const padEnd = dir === 'right';
        paddedBytes[padEnd ? i : size - i - 1] = bytes[padEnd ? i : bytes.length - i - 1];
    }
    return paddedBytes;
} //# sourceMappingURL=pad.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/encoding.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IntegerOutOfRangeError",
    ()=>IntegerOutOfRangeError,
    "InvalidBytesBooleanError",
    ()=>InvalidBytesBooleanError,
    "InvalidHexBooleanError",
    ()=>InvalidHexBooleanError,
    "InvalidHexValueError",
    ()=>InvalidHexValueError,
    "SizeOverflowError",
    ()=>SizeOverflowError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)");
;
class IntegerOutOfRangeError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ max, min, signed, size, value }){
        super(`Number "${value}" is not in safe ${size ? `${size * 8}-bit ${signed ? 'signed' : 'unsigned'} ` : ''}integer range ${max ? `(${min} to ${max})` : `(above ${min})`}`, {
            name: 'IntegerOutOfRangeError'
        });
    }
}
class InvalidBytesBooleanError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(bytes){
        super(`Bytes value "${bytes}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`, {
            name: 'InvalidBytesBooleanError'
        });
    }
}
class InvalidHexBooleanError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(hex){
        super(`Hex value "${hex}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`, {
            name: 'InvalidHexBooleanError'
        });
    }
}
class InvalidHexValueError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor(value){
        super(`Hex value "${value}" is an odd length (${value.length}). It must be an even length.`, {
            name: 'InvalidHexValueError'
        });
    }
}
class SizeOverflowError extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"] {
    constructor({ givenSize, maxSize }){
        super(`Size cannot exceed ${maxSize} bytes. Given size: ${givenSize} bytes.`, {
            name: 'SizeOverflowError'
        });
    }
} //# sourceMappingURL=encoding.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/size.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "size",
    ()=>size
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/isHex.js [app-client] (ecmascript)");
;
function size(value) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(value, {
        strict: false
    })) return Math.ceil((value.length - 2) / 2);
    return value.length;
} //# sourceMappingURL=size.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/trim.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "trim",
    ()=>trim
]);
function trim(hexOrBytes, { dir = 'left' } = {}) {
    let data = typeof hexOrBytes === 'string' ? hexOrBytes.replace('0x', '') : hexOrBytes;
    let sliceLength = 0;
    for(let i = 0; i < data.length - 1; i++){
        if (data[dir === 'left' ? i : data.length - i - 1].toString() === '0') sliceLength++;
        else break;
    }
    data = dir === 'left' ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
    if (typeof hexOrBytes === 'string') {
        if (data.length === 1 && dir === 'right') data = `${data}0`;
        return `0x${data.length % 2 === 1 ? `0${data}` : data}`;
    }
    return data;
} //# sourceMappingURL=trim.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/fromHex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assertSize",
    ()=>assertSize,
    "fromHex",
    ()=>fromHex,
    "hexToBigInt",
    ()=>hexToBigInt,
    "hexToBool",
    ()=>hexToBool,
    "hexToNumber",
    ()=>hexToNumber,
    "hexToString",
    ()=>hexToString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/encoding.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/size.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/trim.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/toBytes.js [app-client] (ecmascript)");
;
;
;
;
function assertSize(hexOrBytes, { size }) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["size"])(hexOrBytes) > size) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SizeOverflowError"]({
        givenSize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["size"])(hexOrBytes),
        maxSize: size
    });
}
function fromHex(hex, toOrOpts) {
    const opts = typeof toOrOpts === 'string' ? {
        to: toOrOpts
    } : toOrOpts;
    const to = opts.to;
    if (to === 'number') return hexToNumber(hex, opts);
    if (to === 'bigint') return hexToBigInt(hex, opts);
    if (to === 'string') return hexToString(hex, opts);
    if (to === 'boolean') return hexToBool(hex, opts);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexToBytes"])(hex, opts);
}
function hexToBigInt(hex, opts = {}) {
    const { signed } = opts;
    if (opts.size) assertSize(hex, {
        size: opts.size
    });
    const value = BigInt(hex);
    if (!signed) return value;
    const size = (hex.length - 2) / 2;
    const max = (1n << BigInt(size) * 8n - 1n) - 1n;
    if (value <= max) return value;
    return value - BigInt(`0x${'f'.padStart(size * 2, 'f')}`) - 1n;
}
function hexToBool(hex_, opts = {}) {
    let hex = hex_;
    if (opts.size) {
        assertSize(hex, {
            size: opts.size
        });
        hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trim"])(hex);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trim"])(hex) === '0x00') return false;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trim"])(hex) === '0x01') return true;
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidHexBooleanError"](hex);
}
function hexToNumber(hex, opts = {}) {
    return Number(hexToBigInt(hex, opts));
}
function hexToString(hex, opts = {}) {
    let bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexToBytes"])(hex);
    if (opts.size) {
        assertSize(bytes, {
            size: opts.size
        });
        bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$trim$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trim"])(bytes, {
            dir: 'right'
        });
    }
    return new TextDecoder().decode(bytes);
} //# sourceMappingURL=fromHex.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "boolToHex",
    ()=>boolToHex,
    "bytesToHex",
    ()=>bytesToHex,
    "numberToHex",
    ()=>numberToHex,
    "stringToHex",
    ()=>stringToHex,
    "toHex",
    ()=>toHex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/encoding.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/pad.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/fromHex.js [app-client] (ecmascript)");
;
;
;
const hexes = /*#__PURE__*/ Array.from({
    length: 256
}, (_v, i)=>i.toString(16).padStart(2, '0'));
function toHex(value, opts = {}) {
    if (typeof value === 'number' || typeof value === 'bigint') return numberToHex(value, opts);
    if (typeof value === 'string') {
        return stringToHex(value, opts);
    }
    if (typeof value === 'boolean') return boolToHex(value, opts);
    return bytesToHex(value, opts);
}
function boolToHex(value, opts = {}) {
    const hex = `0x${Number(value)}`;
    if (typeof opts.size === 'number') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertSize"])(hex, {
            size: opts.size
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])(hex, {
            size: opts.size
        });
    }
    return hex;
}
function bytesToHex(value, opts = {}) {
    let string = '';
    for(let i = 0; i < value.length; i++){
        string += hexes[value[i]];
    }
    const hex = `0x${string}`;
    if (typeof opts.size === 'number') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertSize"])(hex, {
            size: opts.size
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])(hex, {
            dir: 'right',
            size: opts.size
        });
    }
    return hex;
}
function numberToHex(value_, opts = {}) {
    const { signed, size } = opts;
    const value = BigInt(value_);
    let maxValue;
    if (size) {
        if (signed) maxValue = (1n << BigInt(size) * 8n - 1n) - 1n;
        else maxValue = 2n ** (BigInt(size) * 8n) - 1n;
    } else if (typeof value_ === 'number') {
        maxValue = BigInt(Number.MAX_SAFE_INTEGER);
    }
    const minValue = typeof maxValue === 'bigint' && signed ? -maxValue - 1n : 0;
    if (maxValue && value > maxValue || value < minValue) {
        const suffix = typeof value_ === 'bigint' ? 'n' : '';
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$encoding$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IntegerOutOfRangeError"]({
            max: maxValue ? `${maxValue}${suffix}` : undefined,
            min: `${minValue}${suffix}`,
            signed,
            size,
            value: `${value_}${suffix}`
        });
    }
    const hex = `0x${(signed && value < 0 ? (1n << BigInt(size * 8)) + BigInt(value) : value).toString(16)}`;
    if (size) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])(hex, {
        size
    });
    return hex;
}
const encoder = /*#__PURE__*/ new TextEncoder();
function stringToHex(value_, opts = {}) {
    const value = encoder.encode(value_);
    return bytesToHex(value, opts);
} //# sourceMappingURL=toHex.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/toBytes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "boolToBytes",
    ()=>boolToBytes,
    "hexToBytes",
    ()=>hexToBytes,
    "numberToBytes",
    ()=>numberToBytes,
    "stringToBytes",
    ()=>stringToBytes,
    "toBytes",
    ()=>toBytes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/isHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/pad.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/fromHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
;
;
;
;
;
const encoder = /*#__PURE__*/ new TextEncoder();
function toBytes(value, opts = {}) {
    if (typeof value === 'number' || typeof value === 'bigint') return numberToBytes(value, opts);
    if (typeof value === 'boolean') return boolToBytes(value, opts);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(value)) return hexToBytes(value, opts);
    return stringToBytes(value, opts);
}
function boolToBytes(value, opts = {}) {
    const bytes = new Uint8Array(1);
    bytes[0] = Number(value);
    if (typeof opts.size === 'number') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertSize"])(bytes, {
            size: opts.size
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])(bytes, {
            size: opts.size
        });
    }
    return bytes;
}
// We use very optimized technique to convert hex string to byte array
const charCodeMap = {
    zero: 48,
    nine: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102
};
function charCodeToBase16(char) {
    if (char >= charCodeMap.zero && char <= charCodeMap.nine) return char - charCodeMap.zero;
    if (char >= charCodeMap.A && char <= charCodeMap.F) return char - (charCodeMap.A - 10);
    if (char >= charCodeMap.a && char <= charCodeMap.f) return char - (charCodeMap.a - 10);
    return undefined;
}
function hexToBytes(hex_, opts = {}) {
    let hex = hex_;
    if (opts.size) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertSize"])(hex, {
            size: opts.size
        });
        hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])(hex, {
            dir: 'right',
            size: opts.size
        });
    }
    let hexString = hex.slice(2);
    if (hexString.length % 2) hexString = `0${hexString}`;
    const length = hexString.length / 2;
    const bytes = new Uint8Array(length);
    for(let index = 0, j = 0; index < length; index++){
        const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
        const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
        if (nibbleLeft === undefined || nibbleRight === undefined) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseError"](`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
        }
        bytes[index] = nibbleLeft * 16 + nibbleRight;
    }
    return bytes;
}
function numberToBytes(value, opts) {
    const hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberToHex"])(value, opts);
    return hexToBytes(hex);
}
function stringToBytes(value, opts = {}) {
    const bytes = encoder.encode(value);
    if (typeof opts.size === 'number') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertSize"])(bytes, {
            size: opts.size
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$pad$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pad"])(bytes, {
            dir: 'right',
            size: opts.size
        });
    }
    return bytes;
} //# sourceMappingURL=toBytes.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/_u64.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "add",
    ()=>add,
    "add3H",
    ()=>add3H,
    "add3L",
    ()=>add3L,
    "add4H",
    ()=>add4H,
    "add4L",
    ()=>add4L,
    "add5H",
    ()=>add5H,
    "add5L",
    ()=>add5L,
    "default",
    ()=>__TURBOPACK__default__export__,
    "fromBig",
    ()=>fromBig,
    "rotlBH",
    ()=>rotlBH,
    "rotlBL",
    ()=>rotlBL,
    "rotlSH",
    ()=>rotlSH,
    "rotlSL",
    ()=>rotlSL,
    "rotr32H",
    ()=>rotr32H,
    "rotr32L",
    ()=>rotr32L,
    "rotrBH",
    ()=>rotrBH,
    "rotrBL",
    ()=>rotrBL,
    "rotrSH",
    ()=>rotrSH,
    "rotrSL",
    ()=>rotrSL,
    "shrSH",
    ()=>shrSH,
    "shrSL",
    ()=>shrSL,
    "split",
    ()=>split,
    "toBig",
    ()=>toBig
]);
/**
 * Internal helpers for u64. BigUint64Array is too slow as per 2025, so we implement it using Uint32Array.
 * @todo re-check https://issues.chromium.org/issues/42212588
 * @module
 */ const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
const _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n, le = false) {
    if (le) return {
        h: Number(n & U32_MASK64),
        l: Number(n >> _32n & U32_MASK64)
    };
    return {
        h: Number(n >> _32n & U32_MASK64) | 0,
        l: Number(n & U32_MASK64) | 0
    };
}
function split(lst, le = false) {
    const len = lst.length;
    let Ah = new Uint32Array(len);
    let Al = new Uint32Array(len);
    for(let i = 0; i < len; i++){
        const { h, l } = fromBig(lst[i], le);
        [Ah[i], Al[i]] = [
            h,
            l
        ];
    }
    return [
        Ah,
        Al
    ];
}
const toBig = (h, l)=>BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
// for Shift in [0, 32)
const shrSH = (h, _l, s)=>h >>> s;
const shrSL = (h, l, s)=>h << 32 - s | l >>> s;
// Right rotate for Shift in [1, 32)
const rotrSH = (h, l, s)=>h >>> s | l << 32 - s;
const rotrSL = (h, l, s)=>h << 32 - s | l >>> s;
// Right rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotrBH = (h, l, s)=>h << 64 - s | l >>> s - 32;
const rotrBL = (h, l, s)=>h >>> s - 32 | l << 64 - s;
// Right rotate for shift===32 (just swaps l&h)
const rotr32H = (_h, l)=>l;
const rotr32L = (h, _l)=>h;
// Left rotate for Shift in [1, 32)
const rotlSH = (h, l, s)=>h << s | l >>> 32 - s;
const rotlSL = (h, l, s)=>l << s | h >>> 32 - s;
// Left rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotlBH = (h, l, s)=>l << s - 32 | h >>> 64 - s;
const rotlBL = (h, l, s)=>h << s - 32 | l >>> 64 - s;
// JS uses 32-bit signed integers for bitwise operations which means we cannot
// simple take carry out of low bit sum by shift, we need to use division.
function add(Ah, Al, Bh, Bl) {
    const l = (Al >>> 0) + (Bl >>> 0);
    return {
        h: Ah + Bh + (l / 2 ** 32 | 0) | 0,
        l: l | 0
    };
}
// Addition with more than 2 elements
const add3L = (Al, Bl, Cl)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
const add3H = (low, Ah, Bh, Ch)=>Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
const add4L = (Al, Bl, Cl, Dl)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
const add4H = (low, Ah, Bh, Ch, Dh)=>Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
const add5L = (Al, Bl, Cl, Dl, El)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
const add5H = (low, Ah, Bh, Ch, Dh, Eh)=>Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
;
// prettier-ignore
const u64 = {
    fromBig,
    split,
    toBig,
    shrSH,
    shrSL,
    rotrSH,
    rotrSL,
    rotrBH,
    rotrBL,
    rotr32H,
    rotr32L,
    rotlSH,
    rotlSL,
    rotlBH,
    rotlBL,
    add,
    add3L,
    add3H,
    add4L,
    add4H,
    add5H,
    add5L
};
const __TURBOPACK__default__export__ = u64;
 //# sourceMappingURL=_u64.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/crypto.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "crypto",
    ()=>crypto
]);
const crypto = typeof globalThis === 'object' && 'crypto' in globalThis ? globalThis.crypto : undefined; //# sourceMappingURL=crypto.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Hash",
    ()=>Hash,
    "abytes",
    ()=>abytes,
    "aexists",
    ()=>aexists,
    "ahash",
    ()=>ahash,
    "anumber",
    ()=>anumber,
    "aoutput",
    ()=>aoutput,
    "asyncLoop",
    ()=>asyncLoop,
    "byteSwap",
    ()=>byteSwap,
    "byteSwap32",
    ()=>byteSwap32,
    "byteSwapIfBE",
    ()=>byteSwapIfBE,
    "bytesToHex",
    ()=>bytesToHex,
    "bytesToUtf8",
    ()=>bytesToUtf8,
    "checkOpts",
    ()=>checkOpts,
    "clean",
    ()=>clean,
    "concatBytes",
    ()=>concatBytes,
    "createHasher",
    ()=>createHasher,
    "createOptHasher",
    ()=>createOptHasher,
    "createView",
    ()=>createView,
    "createXOFer",
    ()=>createXOFer,
    "hexToBytes",
    ()=>hexToBytes,
    "isBytes",
    ()=>isBytes,
    "isLE",
    ()=>isLE,
    "kdfInputToBytes",
    ()=>kdfInputToBytes,
    "nextTick",
    ()=>nextTick,
    "randomBytes",
    ()=>randomBytes,
    "rotl",
    ()=>rotl,
    "rotr",
    ()=>rotr,
    "swap32IfBE",
    ()=>swap32IfBE,
    "swap8IfBE",
    ()=>swap8IfBE,
    "toBytes",
    ()=>toBytes,
    "u32",
    ()=>u32,
    "u8",
    ()=>u8,
    "utf8ToBytes",
    ()=>utf8ToBytes,
    "wrapConstructor",
    ()=>wrapConstructor,
    "wrapConstructorWithOpts",
    ()=>wrapConstructorWithOpts,
    "wrapXOFConstructorWithOpts",
    ()=>wrapXOFConstructorWithOpts
]);
/**
 * Utilities for hex, bytes, CSPRNG.
 * @module
 */ /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ // We use WebCrypto aka globalThis.crypto, which exists in browsers and node.js 16+.
// node.js versions earlier than v19 don't declare it in global scope.
// For node.js, package.json#exports field mapping rewrites import
// from `crypto` to `cryptoNode`, which imports native module.
// Makes the utils un-importable in browsers without a bundler.
// Once node.js 18 is deprecated (2025-04-30), we can just drop the import.
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/crypto.js [app-client] (ecmascript)");
;
function isBytes(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === 'Uint8Array';
}
function anumber(n) {
    if (!Number.isSafeInteger(n) || n < 0) throw new Error('positive integer expected, got ' + n);
}
function abytes(b, ...lengths) {
    if (!isBytes(b)) throw new Error('Uint8Array expected');
    if (lengths.length > 0 && !lengths.includes(b.length)) throw new Error('Uint8Array expected of length ' + lengths + ', got length=' + b.length);
}
function ahash(h) {
    if (typeof h !== 'function' || typeof h.create !== 'function') throw new Error('Hash should be wrapped by utils.createHasher');
    anumber(h.outputLen);
    anumber(h.blockLen);
}
function aexists(instance, checkFinished = true) {
    if (instance.destroyed) throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished) throw new Error('Hash#digest() has already been called');
}
function aoutput(out, instance) {
    abytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
        throw new Error('digestInto() expects output buffer of length at least ' + min);
    }
}
function u8(arr) {
    return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
}
function u32(arr) {
    return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
    for(let i = 0; i < arrays.length; i++){
        arrays[i].fill(0);
    }
}
function createView(arr) {
    return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
    return word << 32 - shift | word >>> shift;
}
function rotl(word, shift) {
    return word << shift | word >>> 32 - shift >>> 0;
}
const isLE = /* @__PURE__ */ (()=>new Uint8Array(new Uint32Array([
        0x11223344
    ]).buffer)[0] === 0x44)();
function byteSwap(word) {
    return word << 24 & 0xff000000 | word << 8 & 0xff0000 | word >>> 8 & 0xff00 | word >>> 24 & 0xff;
}
const swap8IfBE = isLE ? (n)=>n : (n)=>byteSwap(n);
const byteSwapIfBE = swap8IfBE;
function byteSwap32(arr) {
    for(let i = 0; i < arr.length; i++){
        arr[i] = byteSwap(arr[i]);
    }
    return arr;
}
const swap32IfBE = isLE ? (u)=>u : byteSwap32;
// Built-in hex conversion https://caniuse.com/mdn-javascript_builtins_uint8array_fromhex
const hasHexBuiltin = /* @__PURE__ */ (()=>// @ts-ignore
    typeof Uint8Array.from([]).toHex === 'function' && typeof Uint8Array.fromHex === 'function')();
// Array where index 0xf0 (240) is mapped to string 'f0'
const hexes = /* @__PURE__ */ Array.from({
    length: 256
}, (_, i)=>i.toString(16).padStart(2, '0'));
function bytesToHex(bytes) {
    abytes(bytes);
    // @ts-ignore
    if (hasHexBuiltin) return bytes.toHex();
    // pre-caching improves the speed 6x
    let hex = '';
    for(let i = 0; i < bytes.length; i++){
        hex += hexes[bytes[i]];
    }
    return hex;
}
// We use optimized technique to convert hex string to byte array
const asciis = {
    _0: 48,
    _9: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102
};
function asciiToBase16(ch) {
    if (ch >= asciis._0 && ch <= asciis._9) return ch - asciis._0; // '2' => 50-48
    if (ch >= asciis.A && ch <= asciis.F) return ch - (asciis.A - 10); // 'B' => 66-(65-10)
    if (ch >= asciis.a && ch <= asciis.f) return ch - (asciis.a - 10); // 'b' => 98-(97-10)
    return;
}
function hexToBytes(hex) {
    if (typeof hex !== 'string') throw new Error('hex string expected, got ' + typeof hex);
    // @ts-ignore
    if (hasHexBuiltin) return Uint8Array.fromHex(hex);
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2) throw new Error('hex string expected, got unpadded hex of length ' + hl);
    const array = new Uint8Array(al);
    for(let ai = 0, hi = 0; ai < al; ai++, hi += 2){
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === undefined || n2 === undefined) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2; // multiply first octet, e.g. 'a3' => 10*16+3 => 160 + 3 => 163
    }
    return array;
}
const nextTick = async ()=>{};
async function asyncLoop(iters, tick, cb) {
    let ts = Date.now();
    for(let i = 0; i < iters; i++){
        cb(i);
        // Date.now() is not monotonic, so in case if clock goes backwards we return return control too
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick) continue;
        await nextTick();
        ts += diff;
    }
}
function utf8ToBytes(str) {
    if (typeof str !== 'string') throw new Error('string expected');
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
function bytesToUtf8(bytes) {
    return new TextDecoder().decode(bytes);
}
function toBytes(data) {
    if (typeof data === 'string') data = utf8ToBytes(data);
    abytes(data);
    return data;
}
function kdfInputToBytes(data) {
    if (typeof data === 'string') data = utf8ToBytes(data);
    abytes(data);
    return data;
}
function concatBytes(...arrays) {
    let sum = 0;
    for(let i = 0; i < arrays.length; i++){
        const a = arrays[i];
        abytes(a);
        sum += a.length;
    }
    const res = new Uint8Array(sum);
    for(let i = 0, pad = 0; i < arrays.length; i++){
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
    }
    return res;
}
function checkOpts(defaults, opts) {
    if (opts !== undefined && ({}).toString.call(opts) !== '[object Object]') throw new Error('options should be object or undefined');
    const merged = Object.assign(defaults, opts);
    return merged;
}
class Hash {
}
function createHasher(hashCons) {
    const hashC = (msg)=>hashCons().update(toBytes(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = ()=>hashCons();
    return hashC;
}
function createOptHasher(hashCons) {
    const hashC = (msg, opts)=>hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts)=>hashCons(opts);
    return hashC;
}
function createXOFer(hashCons) {
    const hashC = (msg, opts)=>hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts)=>hashCons(opts);
    return hashC;
}
const wrapConstructor = createHasher;
const wrapConstructorWithOpts = createOptHasher;
const wrapXOFConstructorWithOpts = createXOFer;
function randomBytes(bytesLength = 32) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"] && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"].getRandomValues === 'function') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"].getRandomValues(new Uint8Array(bytesLength));
    }
    // Legacy Node.js compatibility
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"] && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"].randomBytes === 'function') {
        return Uint8Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"].randomBytes(bytesLength));
    }
    throw new Error('crypto.getRandomValues must be defined');
} //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/sha3.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Keccak",
    ()=>Keccak,
    "keccakP",
    ()=>keccakP,
    "keccak_224",
    ()=>keccak_224,
    "keccak_256",
    ()=>keccak_256,
    "keccak_384",
    ()=>keccak_384,
    "keccak_512",
    ()=>keccak_512,
    "sha3_224",
    ()=>sha3_224,
    "sha3_256",
    ()=>sha3_256,
    "sha3_384",
    ()=>sha3_384,
    "sha3_512",
    ()=>sha3_512,
    "shake128",
    ()=>shake128,
    "shake256",
    ()=>shake256
]);
/**
 * SHA3 (keccak) hash function, based on a new "Sponge function" design.
 * Different from older hashes, the internal state is bigger than output size.
 *
 * Check out [FIPS-202](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.202.pdf),
 * [Website](https://keccak.team/keccak.html),
 * [the differences between SHA-3 and Keccak](https://crypto.stackexchange.com/questions/15727/what-are-the-key-differences-between-the-draft-sha-3-standard-and-the-keccak-sub).
 *
 * Check out `sha3-addons` module for cSHAKE, k12, and others.
 * @module
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/_u64.js [app-client] (ecmascript)");
// prettier-ignore
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/utils.js [app-client] (ecmascript)");
;
;
// No __PURE__ annotations in sha3 header:
// EVERYTHING is in fact used on every export.
// Various per round constants calculations
const _0n = BigInt(0);
const _1n = BigInt(1);
const _2n = BigInt(2);
const _7n = BigInt(7);
const _256n = BigInt(256);
const _0x71n = BigInt(0x71);
const SHA3_PI = [];
const SHA3_ROTL = [];
const _SHA3_IOTA = [];
for(let round = 0, R = _1n, x = 1, y = 0; round < 24; round++){
    // Pi
    [x, y] = [
        y,
        (2 * x + 3 * y) % 5
    ];
    SHA3_PI.push(2 * (5 * y + x));
    // Rotational
    SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
    // Iota
    let t = _0n;
    for(let j = 0; j < 7; j++){
        R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
        if (R & _2n) t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
    }
    _SHA3_IOTA.push(t);
}
const IOTAS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["split"])(_SHA3_IOTA, true);
const SHA3_IOTA_H = IOTAS[0];
const SHA3_IOTA_L = IOTAS[1];
// Left rotation (without 0, 32, 64)
const rotlH = (h, l, s)=>s > 32 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotlBH"])(h, l, s) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotlSH"])(h, l, s);
const rotlL = (h, l, s)=>s > 32 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotlBL"])(h, l, s) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotlSL"])(h, l, s);
function keccakP(s, rounds = 24) {
    const B = new Uint32Array(5 * 2);
    // NOTE: all indices are x2 since we store state as u32 instead of u64 (bigints to slow in js)
    for(let round = 24 - rounds; round < 24; round++){
        // Theta θ
        for(let x = 0; x < 10; x++)B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
        for(let x = 0; x < 10; x += 2){
            const idx1 = (x + 8) % 10;
            const idx0 = (x + 2) % 10;
            const B0 = B[idx0];
            const B1 = B[idx0 + 1];
            const Th = rotlH(B0, B1, 1) ^ B[idx1];
            const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
            for(let y = 0; y < 50; y += 10){
                s[x + y] ^= Th;
                s[x + y + 1] ^= Tl;
            }
        }
        // Rho (ρ) and Pi (π)
        let curH = s[2];
        let curL = s[3];
        for(let t = 0; t < 24; t++){
            const shift = SHA3_ROTL[t];
            const Th = rotlH(curH, curL, shift);
            const Tl = rotlL(curH, curL, shift);
            const PI = SHA3_PI[t];
            curH = s[PI];
            curL = s[PI + 1];
            s[PI] = Th;
            s[PI + 1] = Tl;
        }
        // Chi (χ)
        for(let y = 0; y < 50; y += 10){
            for(let x = 0; x < 10; x++)B[x] = s[y + x];
            for(let x = 0; x < 10; x++)s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
        }
        // Iota (ι)
        s[0] ^= SHA3_IOTA_H[round];
        s[1] ^= SHA3_IOTA_L[round];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(B);
}
class Keccak extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Hash"] {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24){
        super();
        this.pos = 0;
        this.posOut = 0;
        this.finished = false;
        this.destroyed = false;
        this.enableXOF = false;
        this.blockLen = blockLen;
        this.suffix = suffix;
        this.outputLen = outputLen;
        this.enableXOF = enableXOF;
        this.rounds = rounds;
        // Can be passed from user as dkLen
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["anumber"])(outputLen);
        // 1600 = 5x5 matrix of 64bit.  1600 bits === 200 bytes
        // 0 < blockLen < 200
        if (!(0 < blockLen && blockLen < 200)) throw new Error('only keccak-f1600 function is supported');
        this.state = new Uint8Array(200);
        this.state32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u32"])(this.state);
    }
    clone() {
        return this._cloneInto();
    }
    keccak() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swap32IfBE"])(this.state32);
        keccakP(this.state32, this.rounds);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swap32IfBE"])(this.state32);
        this.posOut = 0;
        this.pos = 0;
    }
    update(data) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aexists"])(this);
        data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBytes"])(data);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["abytes"])(data);
        const { blockLen, state } = this;
        const len = data.length;
        for(let pos = 0; pos < len;){
            const take = Math.min(blockLen - this.pos, len - pos);
            for(let i = 0; i < take; i++)state[this.pos++] ^= data[pos++];
            if (this.pos === blockLen) this.keccak();
        }
        return this;
    }
    finish() {
        if (this.finished) return;
        this.finished = true;
        const { state, suffix, pos, blockLen } = this;
        // Do the padding
        state[pos] ^= suffix;
        if ((suffix & 0x80) !== 0 && pos === blockLen - 1) this.keccak();
        state[blockLen - 1] ^= 0x80;
        this.keccak();
    }
    writeInto(out) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aexists"])(this, false);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["abytes"])(out);
        this.finish();
        const bufferOut = this.state;
        const { blockLen } = this;
        for(let pos = 0, len = out.length; pos < len;){
            if (this.posOut >= blockLen) this.keccak();
            const take = Math.min(blockLen - this.posOut, len - pos);
            out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
            this.posOut += take;
            pos += take;
        }
        return out;
    }
    xofInto(out) {
        // Sha3/Keccak usage with XOF is probably mistake, only SHAKE instances can do XOF
        if (!this.enableXOF) throw new Error('XOF is not possible for this instance');
        return this.writeInto(out);
    }
    xof(bytes) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["anumber"])(bytes);
        return this.xofInto(new Uint8Array(bytes));
    }
    digestInto(out) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aoutput"])(out, this);
        if (this.finished) throw new Error('digest() was already called');
        this.writeInto(out);
        this.destroy();
        return out;
    }
    digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
        this.destroyed = true;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(this.state);
    }
    _cloneInto(to) {
        const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
        to || (to = new Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
        to.state32.set(this.state32);
        to.pos = this.pos;
        to.posOut = this.posOut;
        to.finished = this.finished;
        to.rounds = rounds;
        // Suffix can change in cSHAKE
        to.suffix = suffix;
        to.outputLen = outputLen;
        to.enableXOF = enableXOF;
        to.destroyed = this.destroyed;
        return to;
    }
}
const gen = (suffix, blockLen, outputLen)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHasher"])(()=>new Keccak(blockLen, suffix, outputLen));
const sha3_224 = /* @__PURE__ */ (()=>gen(0x06, 144, 224 / 8))();
const sha3_256 = /* @__PURE__ */ (()=>gen(0x06, 136, 256 / 8))();
const sha3_384 = /* @__PURE__ */ (()=>gen(0x06, 104, 384 / 8))();
const sha3_512 = /* @__PURE__ */ (()=>gen(0x06, 72, 512 / 8))();
const keccak_224 = /* @__PURE__ */ (()=>gen(0x01, 144, 224 / 8))();
const keccak_256 = /* @__PURE__ */ (()=>gen(0x01, 136, 256 / 8))();
const keccak_384 = /* @__PURE__ */ (()=>gen(0x01, 104, 384 / 8))();
const keccak_512 = /* @__PURE__ */ (()=>gen(0x01, 72, 512 / 8))();
const genShake = (suffix, blockLen, outputLen)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createXOFer"])((opts = {})=>new Keccak(blockLen, suffix, opts.dkLen === undefined ? outputLen : opts.dkLen, true));
const shake128 = /* @__PURE__ */ (()=>genShake(0x1f, 168, 128 / 8))();
const shake256 = /* @__PURE__ */ (()=>genShake(0x1f, 136, 256 / 8))(); //# sourceMappingURL=sha3.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/hash/keccak256.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "keccak256",
    ()=>keccak256
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/sha3.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/isHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/toBytes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
;
;
;
;
function keccak256(value, to_) {
    const to = to_ || 'hex';
    const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak_256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(value, {
        strict: false
    }) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBytes"])(value) : value);
    if (to === 'bytes') return bytes;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(bytes);
} //# sourceMappingURL=keccak256.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/lru.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Map with a LRU (Least recently used) policy.
 *
 * @link https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU
 */ __turbopack_context__.s([
    "LruMap",
    ()=>LruMap
]);
class LruMap extends Map {
    constructor(size){
        super();
        Object.defineProperty(this, "maxSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.maxSize = size;
    }
    get(key) {
        const value = super.get(key);
        if (super.has(key) && value !== undefined) {
            this.delete(key);
            super.set(key, value);
        }
        return value;
    }
    set(key, value) {
        super.set(key, value);
        if (this.maxSize && this.size > this.maxSize) {
            const firstKey = this.keys().next().value;
            if (firstKey) this.delete(firstKey);
        }
        return this;
    }
} //# sourceMappingURL=lru.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/address/isAddress.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isAddress",
    ()=>isAddress,
    "isAddressCache",
    ()=>isAddressCache
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$lru$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/lru.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/address/getAddress.js [app-client] (ecmascript)");
;
;
const addressRegex = /^0x[a-fA-F0-9]{40}$/;
const isAddressCache = /*#__PURE__*/ new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$lru$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LruMap"](8192);
function isAddress(address, options) {
    const { strict = true } = options ?? {};
    const cacheKey = `${address}.${strict}`;
    if (isAddressCache.has(cacheKey)) return isAddressCache.get(cacheKey);
    const result = (()=>{
        if (!addressRegex.test(address)) return false;
        if (address.toLowerCase() === address) return true;
        if (strict) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checksumAddress"])(address) === address;
        return true;
    })();
    isAddressCache.set(cacheKey, result);
    return result;
} //# sourceMappingURL=isAddress.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/address/getAddress.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checksumAddress",
    ()=>checksumAddress,
    "getAddress",
    ()=>getAddress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/errors/address.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/toBytes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/hash/keccak256.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$lru$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/lru.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/address/isAddress.js [app-client] (ecmascript)");
;
;
;
;
;
const checksumAddressCache = /*#__PURE__*/ new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$lru$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LruMap"](8192);
function checksumAddress(address_, /**
 * Warning: EIP-1191 checksum addresses are generally not backwards compatible with the
 * wider Ethereum ecosystem, meaning it will break when validated against an application/tool
 * that relies on EIP-55 checksum encoding (checksum without chainId).
 *
 * It is highly recommended to not use this feature unless you
 * know what you are doing.
 *
 * See more: https://github.com/ethereum/EIPs/issues/1121
 */ chainId) {
    if (checksumAddressCache.has(`${address_}.${chainId}`)) return checksumAddressCache.get(`${address_}.${chainId}`);
    const hexAddress = chainId ? `${chainId}${address_.toLowerCase()}` : address_.substring(2).toLowerCase();
    const hash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toBytes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stringToBytes"])(hexAddress), 'bytes');
    const address = (chainId ? hexAddress.substring(`${chainId}0x`.length) : hexAddress).split('');
    for(let i = 0; i < 40; i += 2){
        if (hash[i >> 1] >> 4 >= 8 && address[i]) {
            address[i] = address[i].toUpperCase();
        }
        if ((hash[i >> 1] & 0x0f) >= 8 && address[i + 1]) {
            address[i + 1] = address[i + 1].toUpperCase();
        }
    }
    const result = `0x${address.join('')}`;
    checksumAddressCache.set(`${address_}.${chainId}`, result);
    return result;
}
function getAddress(address, /**
 * Warning: EIP-1191 checksum addresses are generally not backwards compatible with the
 * wider Ethereum ecosystem, meaning it will break when validated against an application/tool
 * that relies on EIP-55 checksum encoding (checksum without chainId).
 *
 * It is highly recommended to not use this feature unless you
 * know what you are doing.
 *
 * See more: https://github.com/ethereum/EIPs/issues/1121
 */ chainId) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$isAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAddress"])(address, {
        strict: false
    })) throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$errors$2f$address$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InvalidAddressError"]({
        address
    });
    return checksumAddress(address, chainId);
} //# sourceMappingURL=getAddress.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/accounts/utils/publicKeyToAddress.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "publicKeyToAddress",
    ()=>publicKeyToAddress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/address/getAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/hash/keccak256.js [app-client] (ecmascript)");
;
;
function publicKeyToAddress(publicKey) {
    const address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak256"])(`0x${publicKey.substring(4)}`).substring(26);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$address$2f$getAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checksumAddress"])(`0x${address}`);
} //# sourceMappingURL=publicKeyToAddress.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/signature/recoverPublicKey.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "recoverPublicKey",
    ()=>recoverPublicKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/isHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/data/size.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/fromHex.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/encoding/toHex.js [app-client] (ecmascript)");
;
;
;
;
async function recoverPublicKey({ hash, signature }) {
    const hashHex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(hash) ? hash : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(hash);
    const { secp256k1 } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/node_modules/@noble/curves/esm/secp256k1.js [app-client] (ecmascript, async loader)");
    const signature_ = (()=>{
        // typeof signature: `Signature`
        if (typeof signature === 'object' && 'r' in signature && 's' in signature) {
            const { r, s, v, yParity } = signature;
            const yParityOrV = Number(yParity ?? v);
            const recoveryBit = toRecoveryBit(yParityOrV);
            return new secp256k1.Signature((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexToBigInt"])(r), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexToBigInt"])(s)).addRecoveryBit(recoveryBit);
        }
        // typeof signature: `Hex | ByteArray`
        const signatureHex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$isHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHex"])(signature) ? signature : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$toHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toHex"])(signature);
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$data$2f$size$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["size"])(signatureHex) !== 65) throw new Error('invalid signature length');
        const yParityOrV = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$encoding$2f$fromHex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexToNumber"])(`0x${signatureHex.slice(130)}`);
        const recoveryBit = toRecoveryBit(yParityOrV);
        return secp256k1.Signature.fromCompact(signatureHex.substring(2, 130)).addRecoveryBit(recoveryBit);
    })();
    const publicKey = signature_.recoverPublicKey(hashHex.substring(2)).toHex(false);
    return `0x${publicKey}`;
}
function toRecoveryBit(yParityOrV) {
    if (yParityOrV === 0 || yParityOrV === 1) return yParityOrV;
    if (yParityOrV === 27) return 0;
    if (yParityOrV === 28) return 1;
    throw new Error('Invalid yParityOrV value');
} //# sourceMappingURL=recoverPublicKey.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/signature/recoverAddress.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "recoverAddress",
    ()=>recoverAddress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$utils$2f$publicKeyToAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/accounts/utils/publicKeyToAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$recoverPublicKey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/signature/recoverPublicKey.js [app-client] (ecmascript)");
;
;
async function recoverAddress({ hash, signature }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$accounts$2f$utils$2f$publicKeyToAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicKeyToAddress"])(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$recoverPublicKey$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recoverPublicKey"])({
        hash,
        signature
    }));
} //# sourceMappingURL=recoverAddress.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/dist/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BASE10",
    ()=>$n,
    "BASE16",
    ()=>tt,
    "BASE64",
    ()=>Qt,
    "BASE64URL",
    ()=>De,
    "COLON",
    ()=>Hs,
    "DEFAULT_DEPTH",
    ()=>We,
    "EMPTY_SPACE",
    ()=>Ee,
    "ENV_MAP",
    ()=>J,
    "INTERNAL_ERRORS",
    ()=>Qo,
    "LimitedSet",
    ()=>gi,
    "MemoryStore",
    ()=>Ha,
    "ONE_THOUSAND",
    ()=>Ds,
    "REACT_NATIVE_PRODUCT",
    ()=>er,
    "RELAYER_DEFAULT_PROTOCOL",
    ()=>Mo,
    "SDK_ERRORS",
    ()=>Jo,
    "SDK_TYPE",
    ()=>rr,
    "SLASH",
    ()=>nr,
    "TYPE_0",
    ()=>Cn,
    "TYPE_1",
    ()=>ee,
    "TYPE_2",
    ()=>ge,
    "UTF8",
    ()=>te,
    "addResourceToRecap",
    ()=>Yr,
    "addSignatureToExtrinsic",
    ()=>bs,
    "appendToQueryString",
    ()=>or,
    "assertType",
    ()=>Zs,
    "assignAbilityToActions",
    ()=>hn,
    "base64Decode",
    ()=>Zr,
    "base64Encode",
    ()=>Gr,
    "buildApprovedNamespaces",
    ()=>pa,
    "buildAuthObject",
    ()=>mf,
    "buildNamespacesFromAuth",
    ()=>ga,
    "buildRecapStatement",
    ()=>Jr,
    "buildSignedExtrinsicHash",
    ()=>Ka,
    "calcExpiry",
    ()=>ii,
    "capitalize",
    ()=>ti,
    "capitalizeWord",
    ()=>lr,
    "createDelayedPromise",
    ()=>ei,
    "createEncodedRecap",
    ()=>Ef,
    "createExpiringPromise",
    ()=>ni,
    "createRecap",
    ()=>Wr,
    "decodeRecap",
    ()=>Lt,
    "decodeTypeByte",
    ()=>Vt,
    "decodeTypeTwoEnvelope",
    ()=>Yc,
    "decrypt",
    ()=>Zc,
    "deriveExtrinsicHash",
    ()=>ys,
    "deriveSymKey",
    ()=>Kc,
    "deserialize",
    ()=>Me,
    "encodeRecap",
    ()=>Ne,
    "encodeTypeByte",
    ()=>jn,
    "encodeTypeTwoEnvelope",
    ()=>Wc,
    "encrypt",
    ()=>Gc,
    "engineEvent",
    ()=>ci,
    "enumify",
    ()=>Qs,
    "extractSolanaTransactionId",
    ()=>sf,
    "formatAccountId",
    ()=>Zn,
    "formatAccountWithChain",
    ()=>Os,
    "formatChainId",
    ()=>Gn,
    "formatDeeplinkUrl",
    ()=>dr,
    "formatExpirerTarget",
    ()=>Xe,
    "formatIdTarget",
    ()=>oi,
    "formatMessage",
    ()=>qr,
    "formatMessageContext",
    ()=>Ws,
    "formatRelayParams",
    ()=>Ko,
    "formatRelayRpcUrl",
    ()=>zs,
    "formatStatementFromRecap",
    ()=>gn,
    "formatTopicTarget",
    ()=>ri,
    "formatUA",
    ()=>cr,
    "formatUri",
    ()=>oa,
    "fromBase64",
    ()=>Qe,
    "generateKeyPair",
    ()=>Vc,
    "generateRandomBytes32",
    ()=>qc,
    "getAccountsChains",
    ()=>qt,
    "getAccountsFromNamespaces",
    ()=>_s,
    "getAddressFromAccount",
    ()=>Wn,
    "getAddressesFromAccounts",
    ()=>Us,
    "getAlgorandTransactionId",
    ()=>af,
    "getAppId",
    ()=>qs,
    "getAppMetadata",
    ()=>sr,
    "getBrowserOnlineStatus",
    ()=>us,
    "getChainFromAccount",
    ()=>Yn,
    "getChainsFromAccounts",
    ()=>Xn,
    "getChainsFromNamespace",
    ()=>ve,
    "getChainsFromNamespaces",
    ()=>Ts,
    "getChainsFromRecap",
    ()=>Af,
    "getChainsFromRequiredNamespaces",
    ()=>Rs,
    "getCommonValuesInArrays",
    ()=>Je,
    "getCryptoKeyFromKeyData",
    ()=>Do,
    "getDecodedRecapFromResources",
    ()=>Kr,
    "getDeepLink",
    ()=>ui,
    "getDidAddress",
    ()=>dn,
    "getDidAddressSegments",
    ()=>Se,
    "getDidChainId",
    ()=>Mr,
    "getEnvironment",
    ()=>Pt,
    "getHttpUrl",
    ()=>Gs,
    "getInternalError",
    ()=>Et,
    "getJavascriptID",
    ()=>fr,
    "getJavascriptOS",
    ()=>ir,
    "getLastItems",
    ()=>ur,
    "getLinkModeURL",
    ()=>sa,
    "getMethodsFromRecap",
    ()=>If,
    "getNamespacedDidChainId",
    ()=>Vr,
    "getNamespacesChains",
    ()=>Go,
    "getNamespacesEventsForChainId",
    ()=>Wo,
    "getNamespacesFromAccounts",
    ()=>Xo,
    "getNamespacesMethodsForChainId",
    ()=>Zo,
    "getNearTransactionIdFromSignedTransaction",
    ()=>cf,
    "getNearUint8ArrayFromBytes",
    ()=>kr,
    "getNodeOnlineStatus",
    ()=>ds,
    "getReCapActions",
    ()=>zr,
    "getReactNativeOnlineStatus",
    ()=>ls,
    "getRecapAbilitiesFromResource",
    ()=>vf,
    "getRecapFromResources",
    ()=>Oe,
    "getRecapResource",
    ()=>Fr,
    "getRelayClientMetadata",
    ()=>Fs,
    "getRelayProtocolApi",
    ()=>na,
    "getRelayProtocolName",
    ()=>ea,
    "getRequiredNamespacesFromNamespaces",
    ()=>ha,
    "getSdkError",
    ()=>Kt,
    "getSearchParamFromURL",
    ()=>li,
    "getSignDirectHash",
    ()=>uf,
    "getSuiDigest",
    ()=>ff,
    "getUniqueValues",
    ()=>Ge,
    "handleDeeplinkRedirect",
    ()=>ai,
    "hasOverlap",
    ()=>It,
    "hashEthereumMessage",
    ()=>an,
    "hashKey",
    ()=>Fc,
    "hashMessage",
    ()=>zc,
    "isAndroid",
    ()=>Ms,
    "isAppVisible",
    ()=>Pa,
    "isBrowser",
    ()=>zt,
    "isCaipNamespace",
    ()=>Pn,
    "isConformingNamespaces",
    ()=>cs,
    "isExpired",
    ()=>fi,
    "isIframe",
    ()=>gr,
    "isIos",
    ()=>Vs,
    "isNode",
    ()=>Ye,
    "isOnline",
    ()=>ja,
    "isProposalStruct",
    ()=>wa,
    "isReactNative",
    ()=>Bt,
    "isRecap",
    ()=>pn,
    "isSessionCompatible",
    ()=>ya,
    "isSessionStruct",
    ()=>xa,
    "isTelegram",
    ()=>pr,
    "isTestRun",
    ()=>hi,
    "isTypeOneEnvelope",
    ()=>Jc,
    "isTypeTwoEnvelope",
    ()=>Qc,
    "isUndefined",
    ()=>kt,
    "isValidAccountId",
    ()=>ts,
    "isValidAccounts",
    ()=>rs,
    "isValidActions",
    ()=>ss,
    "isValidArray",
    ()=>me,
    "isValidChainId",
    ()=>we,
    "isValidChains",
    ()=>es,
    "isValidController",
    ()=>va,
    "isValidEip1271Signature",
    ()=>jr,
    "isValidEip191Signature",
    ()=>Lr,
    "isValidErrorReason",
    ()=>Sa,
    "isValidEvent",
    ()=>Ua,
    "isValidId",
    ()=>Ia,
    "isValidNamespaceAccounts",
    ()=>os,
    "isValidNamespaceActions",
    ()=>Dn,
    "isValidNamespaceChains",
    ()=>ns,
    "isValidNamespaceMethodsOrEvents",
    ()=>Hn,
    "isValidNamespaces",
    ()=>is,
    "isValidNamespacesChainId",
    ()=>_a,
    "isValidNamespacesEvent",
    ()=>Ra,
    "isValidNamespacesRequest",
    ()=>Ta,
    "isValidNumber",
    ()=>qe,
    "isValidObject",
    ()=>Ve,
    "isValidParams",
    ()=>Aa,
    "isValidRecap",
    ()=>bt,
    "isValidRelay",
    ()=>fs,
    "isValidRelays",
    ()=>Ba,
    "isValidRequest",
    ()=>Na,
    "isValidRequestExpiry",
    ()=>La,
    "isValidRequiredNamespaces",
    ()=>Ea,
    "isValidResponse",
    ()=>Oa,
    "isValidString",
    ()=>it,
    "isValidUrl",
    ()=>ma,
    "mapEntries",
    ()=>Js,
    "mapToObj",
    ()=>Ys,
    "mergeArrays",
    ()=>ct,
    "mergeEncodedRecaps",
    ()=>Bf,
    "mergeRecaps",
    ()=>Xr,
    "mergeRequiredAndOptionalNamespaces",
    ()=>ba,
    "normalizeNamespaces",
    ()=>ye,
    "objToMap",
    ()=>Xs,
    "openDeeplink",
    ()=>hr,
    "parseAccountId",
    ()=>ze,
    "parseChainId",
    ()=>Fe,
    "parseContextNames",
    ()=>ar,
    "parseExpirerTarget",
    ()=>si,
    "parseNamespaceKey",
    ()=>Yo,
    "parseRelayParams",
    ()=>Vo,
    "parseTopic",
    ()=>qo,
    "parseUri",
    ()=>ra,
    "populateAppMetadata",
    ()=>Ks,
    "populateAuthPayload",
    ()=>wf,
    "recapHasResource",
    ()=>xf,
    "serialize",
    ()=>kn,
    "sleep",
    ()=>pi,
    "ss58AddressToPublicKey",
    ()=>gs,
    "subscribeToBrowserNetworkChange",
    ()=>hs,
    "subscribeToNetworkChange",
    ()=>ka,
    "subscribeToReactNativeNetworkChange",
    ()=>ps,
    "toBase64",
    ()=>br,
    "uuidv4",
    ()=>di,
    "validateDecoding",
    ()=>Xc,
    "validateEncoding",
    ()=>Ho,
    "validateSignedCacao",
    ()=>yf,
    "verifyP256Jwt",
    ()=>ta,
    "verifySignature",
    ()=>Cr
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$detect$2d$browser$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/detect-browser/es/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$window$2d$getters$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/window-getters/dist/cjs/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$window$2d$metadata$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/window-metadata/dist/cjs/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$recoverAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/signature/recoverAddress.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/bs58/src/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$msgpack$2f$msgpack$2f$dist$2e$esm$2f$decode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@msgpack/msgpack/dist.esm/decode.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$msgpack$2f$msgpack$2f$dist$2e$esm$2f$encode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@msgpack/msgpack/dist.esm/encode.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$scure$2f$base$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@scure/base/lib/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$relay$2d$auth$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/relay-auth/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/uint8arrays/esm/src/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$to$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/uint8arrays/esm/src/to-string.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$from$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/uint8arrays/esm/src/from-string.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$concat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/uint8arrays/esm/src/concat.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$relay$2d$api$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/relay-api/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$blakejs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/blakejs/index.js [app-client] (ecmascript)");
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
const xe = ":";
function Fe(t) {
    const [e, n] = t.split(xe);
    return {
        namespace: e,
        reference: n
    };
}
function Gn(t) {
    const { namespace: e, reference: n } = t;
    return [
        e,
        n
    ].join(xe);
}
function ze(t) {
    const [e, n, r] = t.split(xe);
    return {
        namespace: e,
        reference: n,
        address: r
    };
}
function Zn(t) {
    const { namespace: e, reference: n, address: r } = t;
    return [
        e,
        n,
        r
    ].join(xe);
}
function Ge(t, e) {
    const n = [];
    return t.forEach((r)=>{
        const o = e(r);
        n.includes(o) || n.push(o);
    }), n;
}
function Wn(t) {
    const { address: e } = ze(t);
    return e;
}
function Yn(t) {
    const { namespace: e, reference: n } = ze(t);
    return Gn({
        namespace: e,
        reference: n
    });
}
function Os(t, e) {
    const { namespace: n, reference: r } = Fe(e);
    return Zn({
        namespace: n,
        reference: r,
        address: t
    });
}
function Us(t) {
    return Ge(t, Wn);
}
function Xn(t) {
    return Ge(t, Yn);
}
function _s(t, e = []) {
    const n = [];
    return Object.keys(t).forEach((r)=>{
        if (e.length && !e.includes(r)) return;
        const o = t[r];
        n.push(...o.accounts);
    }), n;
}
function Ts(t, e = []) {
    const n = [];
    return Object.keys(t).forEach((r)=>{
        if (e.length && !e.includes(r)) return;
        const o = t[r];
        n.push(...Xn(o.accounts));
    }), n;
}
function Rs(t, e = []) {
    const n = [];
    return Object.keys(t).forEach((r)=>{
        if (e.length && !e.includes(r)) return;
        const o = t[r];
        n.push(...ve(r, o));
    }), n;
}
function ve(t, e) {
    return t.includes(":") ? [
        t
    ] : e.chains || [];
}
var $s = Object.defineProperty, Cs = Object.defineProperties, Ls = Object.getOwnPropertyDescriptors, Jn = Object.getOwnPropertySymbols, js = Object.prototype.hasOwnProperty, ks = Object.prototype.propertyIsEnumerable, Ze = (t, e, n)=>e in t ? $s(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : t[e] = n, Qn = (t, e)=>{
    for(var n in e || (e = {}))js.call(e, n) && Ze(t, n, e[n]);
    if (Jn) for (var n of Jn(e))ks.call(e, n) && Ze(t, n, e[n]);
    return t;
}, Ps = (t, e)=>Cs(t, Ls(e)), tr = (t, e, n)=>Ze(t, typeof e != "symbol" ? e + "" : e, n);
const er = "ReactNative", J = {
    reactNative: "react-native",
    node: "node",
    browser: "browser",
    unknown: "unknown"
}, Ee = " ", Hs = ":", nr = "/", We = 2, Ds = 1e3, rr = "js";
function Ye() {
    return typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] < "u" && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].versions < "u" && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].versions.node < "u";
}
function Bt() {
    return !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$window$2d$getters$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])() && !!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$window$2d$getters$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNavigator"])() && navigator.product === er;
}
function Ms() {
    return Bt() && ("TURBOPACK compile-time value", "object") < "u" && typeof (/*TURBOPACK member replacement*/ __turbopack_context__.g == null ? void 0 : /*TURBOPACK member replacement*/ __turbopack_context__.g.Platform) < "u" && (/*TURBOPACK member replacement*/ __turbopack_context__.g == null ? void 0 : /*TURBOPACK member replacement*/ __turbopack_context__.g.Platform.OS) === "android";
}
function Vs() {
    return Bt() && ("TURBOPACK compile-time value", "object") < "u" && typeof (/*TURBOPACK member replacement*/ __turbopack_context__.g == null ? void 0 : /*TURBOPACK member replacement*/ __turbopack_context__.g.Platform) < "u" && (/*TURBOPACK member replacement*/ __turbopack_context__.g == null ? void 0 : /*TURBOPACK member replacement*/ __turbopack_context__.g.Platform.OS) === "ios";
}
function zt() {
    return !Ye() && !!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$window$2d$getters$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNavigator"])() && !!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$window$2d$getters$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])();
}
function Pt() {
    return Bt() ? J.reactNative : Ye() ? J.node : zt() ? J.browser : J.unknown;
}
function qs() {
    var t;
    try {
        return Bt() && ("TURBOPACK compile-time value", "object") < "u" && typeof (/*TURBOPACK member replacement*/ __turbopack_context__.g == null ? void 0 : /*TURBOPACK member replacement*/ __turbopack_context__.g.Application) < "u" ? (t = /*TURBOPACK member replacement*/ __turbopack_context__.g.Application) == null ? void 0 : t.applicationId : void 0;
    } catch  {
        return;
    }
}
function or(t, e) {
    const n = new URLSearchParams(t);
    for (const r of Object.keys(e).sort())if (e.hasOwnProperty(r)) {
        const o = e[r];
        o !== void 0 && n.set(r, o);
    }
    return n.toString();
}
function Ks(t) {
    var e, n;
    const r = sr();
    try {
        return t != null && t.url && r.url && new URL(t.url).host !== new URL(r.url).host && (console.warn(`The configured WalletConnect 'metadata.url':${t.url} differs from the actual page url:${r.url}. This is probably unintended and can lead to issues.`), t.url = r.url), (e = t?.icons) != null && e.length && t.icons.length > 0 && (t.icons = t.icons.filter((o)=>o !== "")), Ps(Qn(Qn({}, r), t), {
            url: t?.url || r.url,
            name: t?.name || r.name,
            description: t?.description || r.description,
            icons: (n = t?.icons) != null && n.length && t.icons.length > 0 ? t.icons : r.icons
        });
    } catch (o) {
        return console.warn("Error populating app metadata", o), t || r;
    }
}
function sr() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$window$2d$metadata$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWindowMetadata"])() || {
        name: "",
        description: "",
        url: "",
        icons: [
            ""
        ]
    };
}
function Fs(t, e) {
    var n;
    const r = Pt(), o = {
        protocol: t,
        version: e,
        env: r
    };
    return r === "browser" && (o.host = ((n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$window$2d$getters$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocation"])()) == null ? void 0 : n.host) || "unknown"), o;
}
function ir() {
    if (Pt() === J.reactNative && ("TURBOPACK compile-time value", "object") < "u" && typeof (/*TURBOPACK member replacement*/ __turbopack_context__.g == null ? void 0 : /*TURBOPACK member replacement*/ __turbopack_context__.g.Platform) < "u") {
        const { OS: n, Version: r } = /*TURBOPACK member replacement*/ __turbopack_context__.g.Platform;
        return [
            n,
            r
        ].join("-");
    }
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$detect$2d$browser$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detect"])();
    if (t === null) return "unknown";
    const e = t.os ? t.os.replace(" ", "").toLowerCase() : "unknown";
    return t.type === "browser" ? [
        e,
        t.name,
        t.version
    ].join("-") : [
        e,
        t.version
    ].join("-");
}
function fr() {
    var t;
    const e = Pt();
    return e === J.browser ? [
        e,
        ((t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$window$2d$getters$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocation"])()) == null ? void 0 : t.host) || "unknown"
    ].join(":") : e;
}
function cr(t, e, n) {
    const r = ir(), o = fr();
    return [
        [
            t,
            e
        ].join("-"),
        [
            rr,
            n
        ].join("-"),
        r,
        o
    ].join("/");
}
function zs({ protocol: t, version: e, relayUrl: n, sdkVersion: r, auth: o, projectId: s, useOnCloseEvent: i, bundleId: f, packageName: a }) {
    const l = n.split("?"), c = cr(t, e, r), u = {
        auth: o,
        ua: c,
        projectId: s,
        useOnCloseEvent: i || void 0,
        packageName: a || void 0,
        bundleId: f || void 0
    }, h = or(l[1] || "", u);
    return l[0] + "?" + h;
}
function Gs(t) {
    let e = (t.match(/^[^:]+(?=:\/\/)/gi) || [])[0];
    const n = typeof e < "u" ? t.split("://")[1] : t;
    return e = e === "wss" ? "https" : "http", [
        e,
        n
    ].join("://");
}
function Zs(t, e, n) {
    if (!t[e] || typeof t[e] !== n) throw new Error(`Missing or invalid "${e}" param`);
}
function ar(t, e = We) {
    return ur(t.split(nr), e);
}
function Ws(t) {
    return ar(t).join(Ee);
}
function It(t, e) {
    return t.filter((n)=>e.includes(n)).length === t.length;
}
function ur(t, e = We) {
    return t.slice(Math.max(t.length - e, 0));
}
function Ys(t) {
    return Object.fromEntries(t.entries());
}
function Xs(t) {
    return new Map(Object.entries(t));
}
function Js(t, e) {
    const n = {};
    return Object.keys(t).forEach((r)=>{
        n[r] = e(t[r]);
    }), n;
}
const Qs = (t)=>t;
function lr(t) {
    return t.trim().replace(/^\w/, (e)=>e.toUpperCase());
}
function ti(t) {
    return t.split(Ee).map((e)=>lr(e)).join(Ee);
}
function ei(t = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_MINUTES"], e) {
    const n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMiliseconds"])(t || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_MINUTES"]);
    let r, o, s, i;
    return {
        resolve: (f)=>{
            s && r && (clearTimeout(s), r(f), i = Promise.resolve(f));
        },
        reject: (f)=>{
            s && o && (clearTimeout(s), o(f));
        },
        done: ()=>new Promise((f, a)=>{
                if (i) return f(i);
                s = setTimeout(()=>{
                    const l = new Error(e);
                    i = Promise.reject(l), a(l);
                }, n), r = f, o = a;
            })
    };
}
function ni(t, e, n) {
    return new Promise(async (r, o)=>{
        const s = setTimeout(()=>o(new Error(n)), e);
        try {
            const i = await t;
            r(i);
        } catch (i) {
            o(i);
        }
        clearTimeout(s);
    });
}
function Xe(t, e) {
    if (typeof e == "string" && e.startsWith(`${t}:`)) return e;
    if (t.toLowerCase() === "topic") {
        if (typeof e != "string") throw new Error('Value must be "string" for expirer target type: topic');
        return `topic:${e}`;
    } else if (t.toLowerCase() === "id") {
        if (typeof e != "number") throw new Error('Value must be "number" for expirer target type: id');
        return `id:${e}`;
    }
    throw new Error(`Unknown expirer target type: ${t}`);
}
function ri(t) {
    return Xe("topic", t);
}
function oi(t) {
    return Xe("id", t);
}
function si(t) {
    const [e, n] = t.split(":"), r = {
        id: void 0,
        topic: void 0
    };
    if (e === "topic" && typeof n == "string") r.topic = n;
    else if (e === "id" && Number.isInteger(Number(n))) r.id = Number(n);
    else throw new Error(`Invalid target, expected id:number or topic:string, got ${e}:${n}`);
    return r;
}
function ii(t, e) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromMiliseconds"])((e || Date.now()) + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMiliseconds"])(t));
}
function fi(t) {
    return Date.now() >= (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMiliseconds"])(t);
}
function ci(t, e) {
    return `${t}${e ? `:${e}` : ""}`;
}
function ct(t = [], e = []) {
    return [
        ...new Set([
            ...t,
            ...e
        ])
    ];
}
async function ai({ id: t, topic: e, wcDeepLink: n }) {
    var r;
    try {
        if (!n) return;
        const o = typeof n == "string" ? JSON.parse(n) : n, s = o?.href;
        if (typeof s != "string") return;
        const i = dr(s, t, e), f = Pt();
        if (f === J.browser) {
            if (!((r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$window$2d$getters$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])()) != null && r.hasFocus())) {
                console.warn("Document does not have focus, skipping deeplink.");
                return;
            }
            hr(i);
        } else f === J.reactNative && typeof (/*TURBOPACK member replacement*/ __turbopack_context__.g == null ? void 0 : /*TURBOPACK member replacement*/ __turbopack_context__.g.Linking) < "u" && await /*TURBOPACK member replacement*/ __turbopack_context__.g.Linking.openURL(i);
    } catch (o) {
        console.error(o);
    }
}
function dr(t, e, n) {
    const r = `requestId=${e}&sessionTopic=${n}`;
    t.endsWith("/") && (t = t.slice(0, -1));
    let o = `${t}`;
    if (t.startsWith("https://t.me")) {
        const s = t.includes("?") ? "&startapp=" : "?startapp=";
        o = `${o}${s}${br(r, !0)}`;
    } else o = `${o}/wc?${r}`;
    return o;
}
function hr(t) {
    let e = "_self";
    gr() ? e = "_top" : (pr() || t.startsWith("https://") || t.startsWith("http://")) && (e = "_blank"), window.open(t, e, "noreferrer noopener");
}
async function ui(t, e) {
    let n = "";
    try {
        if (zt() && (n = localStorage.getItem(e), n)) return n;
        n = await t.getItem(e);
    } catch (r) {
        console.error(r);
    }
    return n;
}
function Je(t, e) {
    return t.filter((n)=>e.includes(n));
}
function li(t, e) {
    if (!t.includes(e)) return null;
    const n = t.split(/([&,?,=])/), r = n.indexOf(e);
    return n[r + 2];
}
function di() {
    return typeof crypto < "u" && crypto != null && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (t)=>{
        const e = Math.random() * 16 | 0;
        return (t === "x" ? e : e & 3 | 8).toString(16);
    });
}
function hi() {
    return typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] < "u" && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.IS_VITEST === "true";
}
function pr() {
    return typeof window < "u" && (!!window.TelegramWebviewProxy || !!window.Telegram || !!window.TelegramWebviewProxyProto);
}
function gr() {
    try {
        return window.self !== window.top;
    } catch  {
        return !1;
    }
}
function br(t, e = !1) {
    const n = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(t).toString("base64");
    return e ? n.replace(/[=]/g, "") : n;
}
function Qe(t) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(t, "base64").toString("utf-8");
}
function pi(t) {
    return new Promise((e)=>setTimeout(e, t));
}
class gi {
    constructor({ limit: e }){
        tr(this, "limit"), tr(this, "set"), this.limit = e, this.set = new Set;
    }
    add(e) {
        if (!this.set.has(e)) {
            if (this.set.size >= this.limit) {
                const n = this.set.values().next().value;
                n && this.set.delete(n);
            }
            this.set.add(e);
        }
    }
    has(e) {
        return this.set.has(e);
    }
}
const Be = BigInt(2 ** 32 - 1), yr = BigInt(32);
function mr(t, e = !1) {
    return e ? {
        h: Number(t & Be),
        l: Number(t >> yr & Be)
    } : {
        h: Number(t >> yr & Be) | 0,
        l: Number(t & Be) | 0
    };
}
function wr(t, e = !1) {
    const n = t.length;
    let r = new Uint32Array(n), o = new Uint32Array(n);
    for(let s = 0; s < n; s++){
        const { h: i, l: f } = mr(t[s], e);
        [r[s], o[s]] = [
            i,
            f
        ];
    }
    return [
        r,
        o
    ];
}
const xr = (t, e, n)=>t >>> n, vr = (t, e, n)=>t << 32 - n | e >>> n, At = (t, e, n)=>t >>> n | e << 32 - n, St = (t, e, n)=>t << 32 - n | e >>> n, se = (t, e, n)=>t << 64 - n | e >>> n - 32, ie = (t, e, n)=>t >>> n - 32 | e << 64 - n, bi = (t, e)=>e, yi = (t, e)=>t, mi = (t, e, n)=>t << n | e >>> 32 - n, wi = (t, e, n)=>e << n | t >>> 32 - n, xi = (t, e, n)=>e << n - 32 | t >>> 64 - n, vi = (t, e, n)=>t << n - 32 | e >>> 64 - n;
function dt(t, e, n, r) {
    const o = (e >>> 0) + (r >>> 0);
    return {
        h: t + n + (o / 2 ** 32 | 0) | 0,
        l: o | 0
    };
}
const tn = (t, e, n)=>(t >>> 0) + (e >>> 0) + (n >>> 0), en = (t, e, n, r)=>e + n + r + (t / 2 ** 32 | 0) | 0, Ei = (t, e, n, r)=>(t >>> 0) + (e >>> 0) + (n >>> 0) + (r >>> 0), Bi = (t, e, n, r, o)=>e + n + r + o + (t / 2 ** 32 | 0) | 0, Ii = (t, e, n, r, o)=>(t >>> 0) + (e >>> 0) + (n >>> 0) + (r >>> 0) + (o >>> 0), Ai = (t, e, n, r, o, s)=>e + n + r + o + s + (t / 2 ** 32 | 0) | 0, Gt = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
function nn(t) {
    return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function mt(t) {
    if (!Number.isSafeInteger(t) || t < 0) throw new Error("positive integer expected, got " + t);
}
function at(t, ...e) {
    if (!nn(t)) throw new Error("Uint8Array expected");
    if (e.length > 0 && !e.includes(t.length)) throw new Error("Uint8Array expected of length " + e + ", got length=" + t.length);
}
function rn(t) {
    if (typeof t != "function" || typeof t.create != "function") throw new Error("Hash should be wrapped by utils.createHasher");
    mt(t.outputLen), mt(t.blockLen);
}
function Nt(t, e = !0) {
    if (t.destroyed) throw new Error("Hash instance has been destroyed");
    if (e && t.finished) throw new Error("Hash#digest() has already been called");
}
function on(t, e) {
    at(t);
    const n = e.outputLen;
    if (t.length < n) throw new Error("digestInto() expects output buffer of length at least " + n);
}
function fe(t) {
    return new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4));
}
function ut(...t) {
    for(let e = 0; e < t.length; e++)t[e].fill(0);
}
function sn(t) {
    return new DataView(t.buffer, t.byteOffset, t.byteLength);
}
function gt(t, e) {
    return t << 32 - e | t >>> e;
}
const Er = new Uint8Array(new Uint32Array([
    287454020
]).buffer)[0] === 68;
function Br(t) {
    return t << 24 & 4278190080 | t << 8 & 16711680 | t >>> 8 & 65280 | t >>> 24 & 255;
}
const wt = Er ? (t)=>t : (t)=>Br(t);
function Si(t) {
    for(let e = 0; e < t.length; e++)t[e] = Br(t[e]);
    return t;
}
const Ot = Er ? (t)=>t : Si, Ir = typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", Ni = Array.from({
    length: 256
}, (t, e)=>e.toString(16).padStart(2, "0"));
function ce(t) {
    if (at(t), Ir) return t.toHex();
    let e = "";
    for(let n = 0; n < t.length; n++)e += Ni[t[n]];
    return e;
}
const xt = {
    _0: 48,
    _9: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102
};
function Ar(t) {
    if (t >= xt._0 && t <= xt._9) return t - xt._0;
    if (t >= xt.A && t <= xt.F) return t - (xt.A - 10);
    if (t >= xt.a && t <= xt.f) return t - (xt.a - 10);
}
function fn(t) {
    if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
    if (Ir) return Uint8Array.fromHex(t);
    const e = t.length, n = e / 2;
    if (e % 2) throw new Error("hex string expected, got unpadded hex of length " + e);
    const r = new Uint8Array(n);
    for(let o = 0, s = 0; o < n; o++, s += 2){
        const i = Ar(t.charCodeAt(s)), f = Ar(t.charCodeAt(s + 1));
        if (i === void 0 || f === void 0) {
            const a = t[s] + t[s + 1];
            throw new Error('hex string expected, got non-hex character "' + a + '" at index ' + s);
        }
        r[o] = i * 16 + f;
    }
    return r;
}
function Oi(t) {
    if (typeof t != "string") throw new Error("string expected");
    return new Uint8Array(new TextEncoder().encode(t));
}
function ht(t) {
    return typeof t == "string" && (t = Oi(t)), at(t), t;
}
function Ht(...t) {
    let e = 0;
    for(let r = 0; r < t.length; r++){
        const o = t[r];
        at(o), e += o.length;
    }
    const n = new Uint8Array(e);
    for(let r = 0, o = 0; r < t.length; r++){
        const s = t[r];
        n.set(s, o), o += s.length;
    }
    return n;
}
class Ie {
}
function ae(t) {
    const e = (r)=>t().update(ht(r)).digest(), n = t();
    return e.outputLen = n.outputLen, e.blockLen = n.blockLen, e.create = ()=>t(), e;
}
function Ui(t) {
    const e = (r, o)=>t(o).update(ht(r)).digest(), n = t({});
    return e.outputLen = n.outputLen, e.blockLen = n.blockLen, e.create = (r)=>t(r), e;
}
function Zt(t = 32) {
    if (Gt && typeof Gt.getRandomValues == "function") return Gt.getRandomValues(new Uint8Array(t));
    if (Gt && typeof Gt.randomBytes == "function") return Uint8Array.from(Gt.randomBytes(t));
    throw new Error("crypto.getRandomValues must be defined");
}
const _i = BigInt(0), ue = BigInt(1), Ti = BigInt(2), Ri = BigInt(7), $i = BigInt(256), Ci = BigInt(113), Sr = [], Nr = [], Or = [];
for(let t = 0, e = ue, n = 1, r = 0; t < 24; t++){
    [n, r] = [
        r,
        (2 * n + 3 * r) % 5
    ], Sr.push(2 * (5 * r + n)), Nr.push((t + 1) * (t + 2) / 2 % 64);
    let o = _i;
    for(let s = 0; s < 7; s++)e = (e << ue ^ (e >> Ri) * Ci) % $i, e & Ti && (o ^= ue << (ue << BigInt(s)) - ue);
    Or.push(o);
}
const Ur = wr(Or, !0), Li = Ur[0], ji = Ur[1], _r = (t, e, n)=>n > 32 ? xi(t, e, n) : mi(t, e, n), Tr = (t, e, n)=>n > 32 ? vi(t, e, n) : wi(t, e, n);
function ki(t, e = 24) {
    const n = new Uint32Array(10);
    for(let r = 24 - e; r < 24; r++){
        for(let i = 0; i < 10; i++)n[i] = t[i] ^ t[i + 10] ^ t[i + 20] ^ t[i + 30] ^ t[i + 40];
        for(let i = 0; i < 10; i += 2){
            const f = (i + 8) % 10, a = (i + 2) % 10, l = n[a], c = n[a + 1], u = _r(l, c, 1) ^ n[f], h = Tr(l, c, 1) ^ n[f + 1];
            for(let g = 0; g < 50; g += 10)t[i + g] ^= u, t[i + g + 1] ^= h;
        }
        let o = t[2], s = t[3];
        for(let i = 0; i < 24; i++){
            const f = Nr[i], a = _r(o, s, f), l = Tr(o, s, f), c = Sr[i];
            o = t[c], s = t[c + 1], t[c] = a, t[c + 1] = l;
        }
        for(let i = 0; i < 50; i += 10){
            for(let f = 0; f < 10; f++)n[f] = t[i + f];
            for(let f = 0; f < 10; f++)t[i + f] ^= ~n[(f + 2) % 10] & n[(f + 4) % 10];
        }
        t[0] ^= Li[r], t[1] ^= ji[r];
    }
    ut(n);
}
class qn extends Ie {
    constructor(e, n, r, o = !1, s = 24){
        if (super(), this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, this.enableXOF = !1, this.blockLen = e, this.suffix = n, this.outputLen = r, this.enableXOF = o, this.rounds = s, mt(r), !(0 < e && e < 200)) throw new Error("only keccak-f1600 function is supported");
        this.state = new Uint8Array(200), this.state32 = fe(this.state);
    }
    clone() {
        return this._cloneInto();
    }
    keccak() {
        Ot(this.state32), ki(this.state32, this.rounds), Ot(this.state32), this.posOut = 0, this.pos = 0;
    }
    update(e) {
        Nt(this), e = ht(e), at(e);
        const { blockLen: n, state: r } = this, o = e.length;
        for(let s = 0; s < o;){
            const i = Math.min(n - this.pos, o - s);
            for(let f = 0; f < i; f++)r[this.pos++] ^= e[s++];
            this.pos === n && this.keccak();
        }
        return this;
    }
    finish() {
        if (this.finished) return;
        this.finished = !0;
        const { state: e, suffix: n, pos: r, blockLen: o } = this;
        e[r] ^= n, (n & 128) !== 0 && r === o - 1 && this.keccak(), e[o - 1] ^= 128, this.keccak();
    }
    writeInto(e) {
        Nt(this, !1), at(e), this.finish();
        const n = this.state, { blockLen: r } = this;
        for(let o = 0, s = e.length; o < s;){
            this.posOut >= r && this.keccak();
            const i = Math.min(r - this.posOut, s - o);
            e.set(n.subarray(this.posOut, this.posOut + i), o), this.posOut += i, o += i;
        }
        return e;
    }
    xofInto(e) {
        if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
        return this.writeInto(e);
    }
    xof(e) {
        return mt(e), this.xofInto(new Uint8Array(e));
    }
    digestInto(e) {
        if (on(e, this), this.finished) throw new Error("digest() was already called");
        return this.writeInto(e), this.destroy(), e;
    }
    digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
        this.destroyed = !0, ut(this.state);
    }
    _cloneInto(e) {
        const { blockLen: n, suffix: r, outputLen: o, rounds: s, enableXOF: i } = this;
        return e || (e = new qn(n, r, o, i, s)), e.state32.set(this.state32), e.pos = this.pos, e.posOut = this.posOut, e.finished = this.finished, e.rounds = s, e.suffix = r, e.outputLen = o, e.enableXOF = i, e.destroyed = this.destroyed, e;
    }
}
const Pi = (t, e, n)=>ae(()=>new qn(e, t, n)), Hi = Pi(1, 136, 256 / 8);
function Di(t, e, n, r) {
    if (typeof t.setBigUint64 == "function") return t.setBigUint64(e, n, r);
    const o = BigInt(32), s = BigInt(4294967295), i = Number(n >> o & s), f = Number(n & s), a = r ? 4 : 0, l = r ? 0 : 4;
    t.setUint32(e + a, i, r), t.setUint32(e + l, f, r);
}
function Mi(t, e, n) {
    return t & e ^ ~t & n;
}
function Vi(t, e, n) {
    return t & e ^ t & n ^ e & n;
}
class Rr extends Ie {
    constructor(e, n, r, o){
        super(), this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.blockLen = e, this.outputLen = n, this.padOffset = r, this.isLE = o, this.buffer = new Uint8Array(e), this.view = sn(this.buffer);
    }
    update(e) {
        Nt(this), e = ht(e), at(e);
        const { view: n, buffer: r, blockLen: o } = this, s = e.length;
        for(let i = 0; i < s;){
            const f = Math.min(o - this.pos, s - i);
            if (f === o) {
                const a = sn(e);
                for(; o <= s - i; i += o)this.process(a, i);
                continue;
            }
            r.set(e.subarray(i, i + f), this.pos), this.pos += f, i += f, this.pos === o && (this.process(n, 0), this.pos = 0);
        }
        return this.length += e.length, this.roundClean(), this;
    }
    digestInto(e) {
        Nt(this), on(e, this), this.finished = !0;
        const { buffer: n, view: r, blockLen: o, isLE: s } = this;
        let { pos: i } = this;
        n[i++] = 128, ut(this.buffer.subarray(i)), this.padOffset > o - i && (this.process(r, 0), i = 0);
        for(let u = i; u < o; u++)n[u] = 0;
        Di(r, o - 8, BigInt(this.length * 8), s), this.process(r, 0);
        const f = sn(e), a = this.outputLen;
        if (a % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
        const l = a / 4, c = this.get();
        if (l > c.length) throw new Error("_sha2: outputLen bigger than state");
        for(let u = 0; u < l; u++)f.setUint32(4 * u, c[u], s);
    }
    digest() {
        const { buffer: e, outputLen: n } = this;
        this.digestInto(e);
        const r = e.slice(0, n);
        return this.destroy(), r;
    }
    _cloneInto(e) {
        e || (e = new this.constructor), e.set(...this.get());
        const { blockLen: n, buffer: r, length: o, finished: s, destroyed: i, pos: f } = this;
        return e.destroyed = i, e.finished = s, e.length = o, e.pos = f, o % n && e.buffer.set(r), e;
    }
    clone() {
        return this._cloneInto();
    }
}
const Ut = Uint32Array.from([
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
]), W = Uint32Array.from([
    3418070365,
    3238371032,
    1654270250,
    914150663,
    2438529370,
    812702999,
    355462360,
    4144912697,
    1731405415,
    4290775857,
    2394180231,
    1750603025,
    3675008525,
    1694076839,
    1203062813,
    3204075428
]), Y = Uint32Array.from([
    1779033703,
    4089235720,
    3144134277,
    2227873595,
    1013904242,
    4271175723,
    2773480762,
    1595750129,
    1359893119,
    2917565137,
    2600822924,
    725511199,
    528734635,
    4215389547,
    1541459225,
    327033209
]), qi = Uint32Array.from([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
]), _t = new Uint32Array(64);
class Ki extends Rr {
    constructor(e = 32){
        super(64, e, 8, !1), this.A = Ut[0] | 0, this.B = Ut[1] | 0, this.C = Ut[2] | 0, this.D = Ut[3] | 0, this.E = Ut[4] | 0, this.F = Ut[5] | 0, this.G = Ut[6] | 0, this.H = Ut[7] | 0;
    }
    get() {
        const { A: e, B: n, C: r, D: o, E: s, F: i, G: f, H: a } = this;
        return [
            e,
            n,
            r,
            o,
            s,
            i,
            f,
            a
        ];
    }
    set(e, n, r, o, s, i, f, a) {
        this.A = e | 0, this.B = n | 0, this.C = r | 0, this.D = o | 0, this.E = s | 0, this.F = i | 0, this.G = f | 0, this.H = a | 0;
    }
    process(e, n) {
        for(let u = 0; u < 16; u++, n += 4)_t[u] = e.getUint32(n, !1);
        for(let u = 16; u < 64; u++){
            const h = _t[u - 15], g = _t[u - 2], w = gt(h, 7) ^ gt(h, 18) ^ h >>> 3, y = gt(g, 17) ^ gt(g, 19) ^ g >>> 10;
            _t[u] = y + _t[u - 7] + w + _t[u - 16] | 0;
        }
        let { A: r, B: o, C: s, D: i, E: f, F: a, G: l, H: c } = this;
        for(let u = 0; u < 64; u++){
            const h = gt(f, 6) ^ gt(f, 11) ^ gt(f, 25), g = c + h + Mi(f, a, l) + qi[u] + _t[u] | 0, y = (gt(r, 2) ^ gt(r, 13) ^ gt(r, 22)) + Vi(r, o, s) | 0;
            c = l, l = a, a = f, f = i + g | 0, i = s, s = o, o = r, r = g + y | 0;
        }
        r = r + this.A | 0, o = o + this.B | 0, s = s + this.C | 0, i = i + this.D | 0, f = f + this.E | 0, a = a + this.F | 0, l = l + this.G | 0, c = c + this.H | 0, this.set(r, o, s, i, f, a, l, c);
    }
    roundClean() {
        ut(_t);
    }
    destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0), ut(this.buffer);
    }
}
const $r = wr([
    "0x428a2f98d728ae22",
    "0x7137449123ef65cd",
    "0xb5c0fbcfec4d3b2f",
    "0xe9b5dba58189dbbc",
    "0x3956c25bf348b538",
    "0x59f111f1b605d019",
    "0x923f82a4af194f9b",
    "0xab1c5ed5da6d8118",
    "0xd807aa98a3030242",
    "0x12835b0145706fbe",
    "0x243185be4ee4b28c",
    "0x550c7dc3d5ffb4e2",
    "0x72be5d74f27b896f",
    "0x80deb1fe3b1696b1",
    "0x9bdc06a725c71235",
    "0xc19bf174cf692694",
    "0xe49b69c19ef14ad2",
    "0xefbe4786384f25e3",
    "0x0fc19dc68b8cd5b5",
    "0x240ca1cc77ac9c65",
    "0x2de92c6f592b0275",
    "0x4a7484aa6ea6e483",
    "0x5cb0a9dcbd41fbd4",
    "0x76f988da831153b5",
    "0x983e5152ee66dfab",
    "0xa831c66d2db43210",
    "0xb00327c898fb213f",
    "0xbf597fc7beef0ee4",
    "0xc6e00bf33da88fc2",
    "0xd5a79147930aa725",
    "0x06ca6351e003826f",
    "0x142929670a0e6e70",
    "0x27b70a8546d22ffc",
    "0x2e1b21385c26c926",
    "0x4d2c6dfc5ac42aed",
    "0x53380d139d95b3df",
    "0x650a73548baf63de",
    "0x766a0abb3c77b2a8",
    "0x81c2c92e47edaee6",
    "0x92722c851482353b",
    "0xa2bfe8a14cf10364",
    "0xa81a664bbc423001",
    "0xc24b8b70d0f89791",
    "0xc76c51a30654be30",
    "0xd192e819d6ef5218",
    "0xd69906245565a910",
    "0xf40e35855771202a",
    "0x106aa07032bbd1b8",
    "0x19a4c116b8d2d0c8",
    "0x1e376c085141ab53",
    "0x2748774cdf8eeb99",
    "0x34b0bcb5e19b48a8",
    "0x391c0cb3c5c95a63",
    "0x4ed8aa4ae3418acb",
    "0x5b9cca4f7763e373",
    "0x682e6ff3d6b2b8a3",
    "0x748f82ee5defb2fc",
    "0x78a5636f43172f60",
    "0x84c87814a1f0ab72",
    "0x8cc702081a6439ec",
    "0x90befffa23631e28",
    "0xa4506cebde82bde9",
    "0xbef9a3f7b2c67915",
    "0xc67178f2e372532b",
    "0xca273eceea26619c",
    "0xd186b8c721c0c207",
    "0xeada7dd6cde0eb1e",
    "0xf57d4f7fee6ed178",
    "0x06f067aa72176fba",
    "0x0a637dc5a2c898a6",
    "0x113f9804bef90dae",
    "0x1b710b35131c471b",
    "0x28db77f523047d84",
    "0x32caab7b40c72493",
    "0x3c9ebe0a15c9bebc",
    "0x431d67c49c100d4c",
    "0x4cc5d4becb3e42b6",
    "0x597f299cfc657e2a",
    "0x5fcb6fab3ad6faec",
    "0x6c44198c4a475817"
].map((t)=>BigInt(t))), Fi = $r[0], zi = $r[1], Tt = new Uint32Array(80), Rt = new Uint32Array(80);
class cn extends Rr {
    constructor(e = 64){
        super(128, e, 16, !1), this.Ah = Y[0] | 0, this.Al = Y[1] | 0, this.Bh = Y[2] | 0, this.Bl = Y[3] | 0, this.Ch = Y[4] | 0, this.Cl = Y[5] | 0, this.Dh = Y[6] | 0, this.Dl = Y[7] | 0, this.Eh = Y[8] | 0, this.El = Y[9] | 0, this.Fh = Y[10] | 0, this.Fl = Y[11] | 0, this.Gh = Y[12] | 0, this.Gl = Y[13] | 0, this.Hh = Y[14] | 0, this.Hl = Y[15] | 0;
    }
    get() {
        const { Ah: e, Al: n, Bh: r, Bl: o, Ch: s, Cl: i, Dh: f, Dl: a, Eh: l, El: c, Fh: u, Fl: h, Gh: g, Gl: w, Hh: y, Hl: x } = this;
        return [
            e,
            n,
            r,
            o,
            s,
            i,
            f,
            a,
            l,
            c,
            u,
            h,
            g,
            w,
            y,
            x
        ];
    }
    set(e, n, r, o, s, i, f, a, l, c, u, h, g, w, y, x) {
        this.Ah = e | 0, this.Al = n | 0, this.Bh = r | 0, this.Bl = o | 0, this.Ch = s | 0, this.Cl = i | 0, this.Dh = f | 0, this.Dl = a | 0, this.Eh = l | 0, this.El = c | 0, this.Fh = u | 0, this.Fl = h | 0, this.Gh = g | 0, this.Gl = w | 0, this.Hh = y | 0, this.Hl = x | 0;
    }
    process(e, n) {
        for(let L = 0; L < 16; L++, n += 4)Tt[L] = e.getUint32(n), Rt[L] = e.getUint32(n += 4);
        for(let L = 16; L < 80; L++){
            const V = Tt[L - 15] | 0, _ = Rt[L - 15] | 0, k = At(V, _, 1) ^ At(V, _, 8) ^ xr(V, _, 7), j = St(V, _, 1) ^ St(V, _, 8) ^ vr(V, _, 7), $ = Tt[L - 2] | 0, d = Rt[L - 2] | 0, m = At($, d, 19) ^ se($, d, 61) ^ xr($, d, 6), p = St($, d, 19) ^ ie($, d, 61) ^ vr($, d, 6), b = Ei(j, p, Rt[L - 7], Rt[L - 16]), v = Bi(b, k, m, Tt[L - 7], Tt[L - 16]);
            Tt[L] = v | 0, Rt[L] = b | 0;
        }
        let { Ah: r, Al: o, Bh: s, Bl: i, Ch: f, Cl: a, Dh: l, Dl: c, Eh: u, El: h, Fh: g, Fl: w, Gh: y, Gl: x, Hh: R, Hl: M } = this;
        for(let L = 0; L < 80; L++){
            const V = At(u, h, 14) ^ At(u, h, 18) ^ se(u, h, 41), _ = St(u, h, 14) ^ St(u, h, 18) ^ ie(u, h, 41), k = u & g ^ ~u & y, j = h & w ^ ~h & x, $ = Ii(M, _, j, zi[L], Rt[L]), d = Ai($, R, V, k, Fi[L], Tt[L]), m = $ | 0, p = At(r, o, 28) ^ se(r, o, 34) ^ se(r, o, 39), b = St(r, o, 28) ^ ie(r, o, 34) ^ ie(r, o, 39), v = r & s ^ r & f ^ s & f, B = o & i ^ o & a ^ i & a;
            R = y | 0, M = x | 0, y = g | 0, x = w | 0, g = u | 0, w = h | 0, ({ h: u, l: h } = dt(l | 0, c | 0, d | 0, m | 0)), l = f | 0, c = a | 0, f = s | 0, a = i | 0, s = r | 0, i = o | 0;
            const E = tn(m, b, B);
            r = en(E, d, p, v), o = E | 0;
        }
        ({ h: r, l: o } = dt(this.Ah | 0, this.Al | 0, r | 0, o | 0)), ({ h: s, l: i } = dt(this.Bh | 0, this.Bl | 0, s | 0, i | 0)), ({ h: f, l: a } = dt(this.Ch | 0, this.Cl | 0, f | 0, a | 0)), ({ h: l, l: c } = dt(this.Dh | 0, this.Dl | 0, l | 0, c | 0)), ({ h: u, l: h } = dt(this.Eh | 0, this.El | 0, u | 0, h | 0)), ({ h: g, l: w } = dt(this.Fh | 0, this.Fl | 0, g | 0, w | 0)), ({ h: y, l: x } = dt(this.Gh | 0, this.Gl | 0, y | 0, x | 0)), ({ h: R, l: M } = dt(this.Hh | 0, this.Hl | 0, R | 0, M | 0)), this.set(r, o, s, i, f, a, l, c, u, h, g, w, y, x, R, M);
    }
    roundClean() {
        ut(Tt, Rt);
    }
    destroy() {
        ut(this.buffer), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
}
class Gi extends cn {
    constructor(){
        super(48), this.Ah = W[0] | 0, this.Al = W[1] | 0, this.Bh = W[2] | 0, this.Bl = W[3] | 0, this.Ch = W[4] | 0, this.Cl = W[5] | 0, this.Dh = W[6] | 0, this.Dl = W[7] | 0, this.Eh = W[8] | 0, this.El = W[9] | 0, this.Fh = W[10] | 0, this.Fl = W[11] | 0, this.Gh = W[12] | 0, this.Gl = W[13] | 0, this.Hh = W[14] | 0, this.Hl = W[15] | 0;
    }
}
const X = Uint32Array.from([
    573645204,
    4230739756,
    2673172387,
    3360449730,
    596883563,
    1867755857,
    2520282905,
    1497426621,
    2519219938,
    2827943907,
    3193839141,
    1401305490,
    721525244,
    746961066,
    246885852,
    2177182882
]);
class Zi extends cn {
    constructor(){
        super(32), this.Ah = X[0] | 0, this.Al = X[1] | 0, this.Bh = X[2] | 0, this.Bl = X[3] | 0, this.Ch = X[4] | 0, this.Cl = X[5] | 0, this.Dh = X[6] | 0, this.Dl = X[7] | 0, this.Eh = X[8] | 0, this.El = X[9] | 0, this.Fh = X[10] | 0, this.Fl = X[11] | 0, this.Gh = X[12] | 0, this.Gl = X[13] | 0, this.Hh = X[14] | 0, this.Hl = X[15] | 0;
    }
}
const Ae = ae(()=>new Ki), Wi = ae(()=>new cn), Yi = ae(()=>new Gi), Xi = ae(()=>new Zi), Ji = Uint8Array.from([
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    14,
    10,
    4,
    8,
    9,
    15,
    13,
    6,
    1,
    12,
    0,
    2,
    11,
    7,
    5,
    3,
    11,
    8,
    12,
    0,
    5,
    2,
    15,
    13,
    10,
    14,
    3,
    6,
    7,
    1,
    9,
    4,
    7,
    9,
    3,
    1,
    13,
    12,
    11,
    14,
    2,
    6,
    5,
    10,
    4,
    0,
    15,
    8,
    9,
    0,
    5,
    7,
    2,
    4,
    10,
    15,
    14,
    1,
    11,
    12,
    6,
    8,
    3,
    13,
    2,
    12,
    6,
    10,
    0,
    11,
    8,
    3,
    4,
    13,
    7,
    5,
    15,
    14,
    1,
    9,
    12,
    5,
    1,
    15,
    14,
    13,
    4,
    10,
    0,
    7,
    6,
    3,
    9,
    2,
    8,
    11,
    13,
    11,
    7,
    14,
    12,
    1,
    3,
    9,
    5,
    0,
    15,
    4,
    8,
    6,
    2,
    10,
    6,
    15,
    14,
    9,
    11,
    3,
    0,
    8,
    12,
    2,
    13,
    7,
    1,
    4,
    10,
    5,
    10,
    2,
    8,
    4,
    7,
    6,
    1,
    5,
    15,
    11,
    9,
    14,
    3,
    12,
    13,
    0,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    14,
    10,
    4,
    8,
    9,
    15,
    13,
    6,
    1,
    12,
    0,
    2,
    11,
    7,
    5,
    3,
    11,
    8,
    12,
    0,
    5,
    2,
    15,
    13,
    10,
    14,
    3,
    6,
    7,
    1,
    9,
    4,
    7,
    9,
    3,
    1,
    13,
    12,
    11,
    14,
    2,
    6,
    5,
    10,
    4,
    0,
    15,
    8,
    9,
    0,
    5,
    7,
    2,
    4,
    10,
    15,
    14,
    1,
    11,
    12,
    6,
    8,
    3,
    13,
    2,
    12,
    6,
    10,
    0,
    11,
    8,
    3,
    4,
    13,
    7,
    5,
    15,
    14,
    1,
    9
]), F = Uint32Array.from([
    4089235720,
    1779033703,
    2227873595,
    3144134277,
    4271175723,
    1013904242,
    1595750129,
    2773480762,
    2917565137,
    1359893119,
    725511199,
    2600822924,
    4215389547,
    528734635,
    327033209,
    1541459225
]), N = new Uint32Array(32);
function $t(t, e, n, r, o, s) {
    const i = o[s], f = o[s + 1];
    let a = N[2 * t], l = N[2 * t + 1], c = N[2 * e], u = N[2 * e + 1], h = N[2 * n], g = N[2 * n + 1], w = N[2 * r], y = N[2 * r + 1], x = tn(a, c, i);
    l = en(x, l, u, f), a = x | 0, ({ Dh: y, Dl: w } = {
        Dh: y ^ l,
        Dl: w ^ a
    }), ({ Dh: y, Dl: w } = {
        Dh: bi(y, w),
        Dl: yi(y)
    }), ({ h: g, l: h } = dt(g, h, y, w)), ({ Bh: u, Bl: c } = {
        Bh: u ^ g,
        Bl: c ^ h
    }), ({ Bh: u, Bl: c } = {
        Bh: At(u, c, 24),
        Bl: St(u, c, 24)
    }), N[2 * t] = a, N[2 * t + 1] = l, N[2 * e] = c, N[2 * e + 1] = u, N[2 * n] = h, N[2 * n + 1] = g, N[2 * r] = w, N[2 * r + 1] = y;
}
function Ct(t, e, n, r, o, s) {
    const i = o[s], f = o[s + 1];
    let a = N[2 * t], l = N[2 * t + 1], c = N[2 * e], u = N[2 * e + 1], h = N[2 * n], g = N[2 * n + 1], w = N[2 * r], y = N[2 * r + 1], x = tn(a, c, i);
    l = en(x, l, u, f), a = x | 0, ({ Dh: y, Dl: w } = {
        Dh: y ^ l,
        Dl: w ^ a
    }), ({ Dh: y, Dl: w } = {
        Dh: At(y, w, 16),
        Dl: St(y, w, 16)
    }), ({ h: g, l: h } = dt(g, h, y, w)), ({ Bh: u, Bl: c } = {
        Bh: u ^ g,
        Bl: c ^ h
    }), ({ Bh: u, Bl: c } = {
        Bh: se(u, c, 63),
        Bl: ie(u, c, 63)
    }), N[2 * t] = a, N[2 * t + 1] = l, N[2 * e] = c, N[2 * e + 1] = u, N[2 * n] = h, N[2 * n + 1] = g, N[2 * r] = w, N[2 * r + 1] = y;
}
function Qi(t, e = {}, n, r, o) {
    if (mt(n), t < 0 || t > n) throw new Error("outputLen bigger than keyLen");
    const { key: s, salt: i, personalization: f } = e;
    if (s !== void 0 && (s.length < 1 || s.length > n)) throw new Error("key length must be undefined or 1.." + n);
    if (i !== void 0 && i.length !== r) throw new Error("salt must be undefined or " + r);
    if (f !== void 0 && f.length !== o) throw new Error("personalization must be undefined or " + o);
}
class tf extends Ie {
    constructor(e, n){
        super(), this.finished = !1, this.destroyed = !1, this.length = 0, this.pos = 0, mt(e), mt(n), this.blockLen = e, this.outputLen = n, this.buffer = new Uint8Array(e), this.buffer32 = fe(this.buffer);
    }
    update(e) {
        Nt(this), e = ht(e), at(e);
        const { blockLen: n, buffer: r, buffer32: o } = this, s = e.length, i = e.byteOffset, f = e.buffer;
        for(let a = 0; a < s;){
            this.pos === n && (Ot(o), this.compress(o, 0, !1), Ot(o), this.pos = 0);
            const l = Math.min(n - this.pos, s - a), c = i + a;
            if (l === n && !(c % 4) && a + l < s) {
                const u = new Uint32Array(f, c, Math.floor((s - a) / 4));
                Ot(u);
                for(let h = 0; a + n < s; h += o.length, a += n)this.length += n, this.compress(u, h, !1);
                Ot(u);
                continue;
            }
            r.set(e.subarray(a, a + l), this.pos), this.pos += l, this.length += l, a += l;
        }
        return this;
    }
    digestInto(e) {
        Nt(this), on(e, this);
        const { pos: n, buffer32: r } = this;
        this.finished = !0, ut(this.buffer.subarray(n)), Ot(r), this.compress(r, 0, !0), Ot(r);
        const o = fe(e);
        this.get().forEach((s, i)=>o[i] = wt(s));
    }
    digest() {
        const { buffer: e, outputLen: n } = this;
        this.digestInto(e);
        const r = e.slice(0, n);
        return this.destroy(), r;
    }
    _cloneInto(e) {
        const { buffer: n, length: r, finished: o, destroyed: s, outputLen: i, pos: f } = this;
        return e || (e = new this.constructor({
            dkLen: i
        })), e.set(...this.get()), e.buffer.set(n), e.destroyed = s, e.finished = o, e.length = r, e.pos = f, e.outputLen = i, e;
    }
    clone() {
        return this._cloneInto();
    }
}
class ef extends tf {
    constructor(e = {}){
        const n = e.dkLen === void 0 ? 64 : e.dkLen;
        super(128, n), this.v0l = F[0] | 0, this.v0h = F[1] | 0, this.v1l = F[2] | 0, this.v1h = F[3] | 0, this.v2l = F[4] | 0, this.v2h = F[5] | 0, this.v3l = F[6] | 0, this.v3h = F[7] | 0, this.v4l = F[8] | 0, this.v4h = F[9] | 0, this.v5l = F[10] | 0, this.v5h = F[11] | 0, this.v6l = F[12] | 0, this.v6h = F[13] | 0, this.v7l = F[14] | 0, this.v7h = F[15] | 0, Qi(n, e, 64, 16, 16);
        let { key: r, personalization: o, salt: s } = e, i = 0;
        if (r !== void 0 && (r = ht(r), i = r.length), this.v0l ^= this.outputLen | i << 8 | 65536 | 1 << 24, s !== void 0) {
            s = ht(s);
            const f = fe(s);
            this.v4l ^= wt(f[0]), this.v4h ^= wt(f[1]), this.v5l ^= wt(f[2]), this.v5h ^= wt(f[3]);
        }
        if (o !== void 0) {
            o = ht(o);
            const f = fe(o);
            this.v6l ^= wt(f[0]), this.v6h ^= wt(f[1]), this.v7l ^= wt(f[2]), this.v7h ^= wt(f[3]);
        }
        if (r !== void 0) {
            const f = new Uint8Array(this.blockLen);
            f.set(r), this.update(f);
        }
    }
    get() {
        let { v0l: e, v0h: n, v1l: r, v1h: o, v2l: s, v2h: i, v3l: f, v3h: a, v4l: l, v4h: c, v5l: u, v5h: h, v6l: g, v6h: w, v7l: y, v7h: x } = this;
        return [
            e,
            n,
            r,
            o,
            s,
            i,
            f,
            a,
            l,
            c,
            u,
            h,
            g,
            w,
            y,
            x
        ];
    }
    set(e, n, r, o, s, i, f, a, l, c, u, h, g, w, y, x) {
        this.v0l = e | 0, this.v0h = n | 0, this.v1l = r | 0, this.v1h = o | 0, this.v2l = s | 0, this.v2h = i | 0, this.v3l = f | 0, this.v3h = a | 0, this.v4l = l | 0, this.v4h = c | 0, this.v5l = u | 0, this.v5h = h | 0, this.v6l = g | 0, this.v6h = w | 0, this.v7l = y | 0, this.v7h = x | 0;
    }
    compress(e, n, r) {
        this.get().forEach((a, l)=>N[l] = a), N.set(F, 16);
        let { h: o, l: s } = mr(BigInt(this.length));
        N[24] = F[8] ^ s, N[25] = F[9] ^ o, r && (N[28] = ~N[28], N[29] = ~N[29]);
        let i = 0;
        const f = Ji;
        for(let a = 0; a < 12; a++)$t(0, 4, 8, 12, e, n + 2 * f[i++]), Ct(0, 4, 8, 12, e, n + 2 * f[i++]), $t(1, 5, 9, 13, e, n + 2 * f[i++]), Ct(1, 5, 9, 13, e, n + 2 * f[i++]), $t(2, 6, 10, 14, e, n + 2 * f[i++]), Ct(2, 6, 10, 14, e, n + 2 * f[i++]), $t(3, 7, 11, 15, e, n + 2 * f[i++]), Ct(3, 7, 11, 15, e, n + 2 * f[i++]), $t(0, 5, 10, 15, e, n + 2 * f[i++]), Ct(0, 5, 10, 15, e, n + 2 * f[i++]), $t(1, 6, 11, 12, e, n + 2 * f[i++]), Ct(1, 6, 11, 12, e, n + 2 * f[i++]), $t(2, 7, 8, 13, e, n + 2 * f[i++]), Ct(2, 7, 8, 13, e, n + 2 * f[i++]), $t(3, 4, 9, 14, e, n + 2 * f[i++]), Ct(3, 4, 9, 14, e, n + 2 * f[i++]);
        this.v0l ^= N[0] ^ N[16], this.v0h ^= N[1] ^ N[17], this.v1l ^= N[2] ^ N[18], this.v1h ^= N[3] ^ N[19], this.v2l ^= N[4] ^ N[20], this.v2h ^= N[5] ^ N[21], this.v3l ^= N[6] ^ N[22], this.v3h ^= N[7] ^ N[23], this.v4l ^= N[8] ^ N[24], this.v4h ^= N[9] ^ N[25], this.v5l ^= N[10] ^ N[26], this.v5h ^= N[11] ^ N[27], this.v6l ^= N[12] ^ N[28], this.v6h ^= N[13] ^ N[29], this.v7l ^= N[14] ^ N[30], this.v7h ^= N[15] ^ N[31], ut(N);
    }
    destroy() {
        this.destroyed = !0, ut(this.buffer32), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
}
const nf = Ui((t)=>new ef(t)), rf = "https://rpc.walletconnect.org/v1";
function an(t) {
    const e = `Ethereum Signed Message:
${t.length}`, n = new TextEncoder().encode(e + t);
    return "0x" + __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(Hi(n)).toString("hex");
}
async function Cr(t, e, n, r, o, s) {
    switch(n.t){
        case "eip191":
            return await Lr(t, e, n.s);
        case "eip1271":
            return await jr(t, e, n.s, r, o, s);
        default:
            throw new Error(`verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${n.t}`);
    }
}
async function Lr(t, e, n) {
    return (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$recoverAddress$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recoverAddress"])({
        hash: an(e),
        signature: n
    })).toLowerCase() === t.toLowerCase();
}
async function jr(t, e, n, r, o, s) {
    const i = Fe(r);
    if (!i.namespace || !i.reference) throw new Error(`isValidEip1271Signature failed: chainId must be in CAIP-2 format, received: ${r}`);
    try {
        const f = "0x1626ba7e", a = "0000000000000000000000000000000000000000000000000000000000000040", l = n.substring(2), c = (l.length / 2).toString(16).padStart(64, "0"), u = (e.startsWith("0x") ? e : an(e)).substring(2), h = f + u + a + c + l, g = await fetch(`${s || rf}/?chainId=${r}&projectId=${o}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                id: of(),
                jsonrpc: "2.0",
                method: "eth_call",
                params: [
                    {
                        to: t,
                        data: h
                    },
                    "latest"
                ]
            })
        }), { result: w } = await g.json();
        return w ? w.slice(0, f.length).toLowerCase() === f.toLowerCase() : !1;
    } catch (f) {
        return console.error("isValidEip1271Signature: ", f), !1;
    }
}
function of() {
    return Date.now() + Math.floor(Math.random() * 1e3);
}
function sf(t) {
    const e = atob(t), n = new Uint8Array(e.length);
    for(let i = 0; i < e.length; i++)n[i] = e.charCodeAt(i);
    const r = n[0];
    if (r === 0) throw new Error("No signatures found");
    const o = 1 + r * 64;
    if (n.length < o) throw new Error("Transaction data too short for claimed signature count");
    if (n.length < 100) throw new Error("Transaction too short");
    const s = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(t, "base64").slice(1, 65);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].encode(s);
}
function ff(t) {
    const e = new Uint8Array(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(t, "base64")), n = Array.from("TransactionData::").map((s)=>s.charCodeAt(0)), r = new Uint8Array(n.length + e.length);
    r.set(n), r.set(e, n.length);
    const o = nf(r, {
        dkLen: 32
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].encode(o);
}
function cf(t) {
    const e = new Uint8Array(Ae(kr(t)));
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].encode(e);
}
function kr(t) {
    if (t instanceof Uint8Array) return t;
    if (Array.isArray(t)) return new Uint8Array(t);
    if (typeof t == "object" && t != null && t.data) return new Uint8Array(Object.values(t.data));
    if (typeof t == "object" && t) return new Uint8Array(Object.values(t));
    throw new Error("getNearUint8ArrayFromBytes: Unexpected result type from bytes array");
}
function af(t) {
    const e = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(t, "base64"), n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$msgpack$2f$msgpack$2f$dist$2e$esm$2f$decode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decode"])(e).txn;
    if (!n) throw new Error("Invalid signed transaction: missing 'txn' field");
    const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$msgpack$2f$msgpack$2f$dist$2e$esm$2f$encode$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encode"])(n), o = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from("TX"), s = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].concat([
        o,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(r)
    ]), i = Xi(s);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$scure$2f$base$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base32"].encode(i).replace(/=+$/, "");
}
function un(t) {
    const e = [];
    let n = BigInt(t);
    for(; n >= BigInt(128);)e.push(Number(n & BigInt(127) | BigInt(128))), n >>= BigInt(7);
    return e.push(Number(n)), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(e);
}
function uf(t) {
    const e = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(t.signed.bodyBytes, "base64"), n = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(t.signed.authInfoBytes, "base64"), r = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(t.signature.signature, "base64"), o = [];
    o.push(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from([
        10
    ])), o.push(un(e.length)), o.push(e), o.push(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from([
        18
    ])), o.push(un(n.length)), o.push(n), o.push(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from([
        26
    ])), o.push(un(r.length)), o.push(r);
    const s = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].concat(o), i = Ae(s);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(i).toString("hex").toUpperCase();
}
var lf = Object.defineProperty, df = Object.defineProperties, hf = Object.getOwnPropertyDescriptors, Pr = Object.getOwnPropertySymbols, pf = Object.prototype.hasOwnProperty, gf = Object.prototype.propertyIsEnumerable, Hr = (t, e, n)=>e in t ? lf(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : t[e] = n, ln = (t, e)=>{
    for(var n in e || (e = {}))pf.call(e, n) && Hr(t, n, e[n]);
    if (Pr) for (var n of Pr(e))gf.call(e, n) && Hr(t, n, e[n]);
    return t;
}, Dr = (t, e)=>df(t, hf(e));
const bf = "did:pkh:", Se = (t)=>t?.split(":"), Mr = (t)=>{
    const e = t && Se(t);
    if (e) return t.includes(bf) ? e[3] : e[1];
}, Vr = (t)=>{
    const e = t && Se(t);
    if (e) return e[2] + ":" + e[3];
}, dn = (t)=>{
    const e = t && Se(t);
    if (e) return e.pop();
};
async function yf(t) {
    const { cacao: e, projectId: n } = t, { s: r, p: o } = e, s = qr(o, o.iss), i = dn(o.iss);
    return await Cr(i, s, r, Vr(o.iss), n);
}
const qr = (t, e)=>{
    const n = `${t.domain} wants you to sign in with your Ethereum account:`, r = dn(e);
    if (!t.aud && !t.uri) throw new Error("Either `aud` or `uri` is required to construct the message");
    let o = t.statement || void 0;
    const s = `URI: ${t.aud || t.uri}`, i = `Version: ${t.version}`, f = `Chain ID: ${Mr(e)}`, a = `Nonce: ${t.nonce}`, l = `Issued At: ${t.iat}`, c = t.exp ? `Expiration Time: ${t.exp}` : void 0, u = t.nbf ? `Not Before: ${t.nbf}` : void 0, h = t.requestId ? `Request ID: ${t.requestId}` : void 0, g = t.resources ? `Resources:${t.resources.map((y)=>`
- ${y}`).join("")}` : void 0, w = Oe(t.resources);
    if (w) {
        const y = Lt(w);
        o = gn(o, y);
    }
    return [
        n,
        r,
        "",
        o,
        "",
        s,
        i,
        f,
        a,
        l,
        c,
        u,
        h,
        g
    ].filter((y)=>y != null).join(`
`);
};
function mf(t, e, n) {
    return n.includes("did:pkh:") || (n = `did:pkh:${n}`), {
        h: {
            t: "caip122"
        },
        p: {
            iss: n,
            domain: t.domain,
            aud: t.aud,
            version: t.version,
            nonce: t.nonce,
            iat: t.iat,
            statement: t.statement,
            requestId: t.requestId,
            resources: t.resources,
            nbf: t.nbf,
            exp: t.exp
        },
        s: e
    };
}
function wf(t) {
    var e;
    const { authPayload: n, chains: r, methods: o } = t, s = n.statement || "";
    if (!(r != null && r.length)) return n;
    const i = n.chains, f = Je(i, r);
    if (!(f != null && f.length)) throw new Error("No supported chains");
    const a = Kr(n.resources);
    if (!a) return n;
    bt(a);
    const l = Fr(a, "eip155");
    let c = n?.resources || [];
    if (l != null && l.length) {
        const u = zr(l), h = Je(u, o);
        if (!(h != null && h.length)) throw new Error(`Supported methods don't satisfy the requested: ${JSON.stringify(u)}, supported: ${JSON.stringify(o)}`);
        const g = hn("request", h, {
            chains: f
        }), w = Yr(a, "eip155", g);
        c = ((e = n?.resources) == null ? void 0 : e.slice(0, -1)) || [], c.push(Ne(w));
    }
    return Dr(ln({}, n), {
        statement: Jr(s, Oe(c)),
        chains: f,
        resources: n != null && n.resources || c.length > 0 ? c : void 0
    });
}
function Kr(t) {
    const e = Oe(t);
    if (e && pn(e)) return Lt(e);
}
function xf(t, e) {
    var n;
    return (n = t?.att) == null ? void 0 : n.hasOwnProperty(e);
}
function Fr(t, e) {
    var n, r;
    return (n = t?.att) != null && n[e] ? Object.keys((r = t?.att) == null ? void 0 : r[e]) : [];
}
function vf(t) {
    return t?.map((e)=>Object.keys(e)) || [];
}
function zr(t) {
    return t?.map((e)=>{
        var n;
        return (n = e.split("/")) == null ? void 0 : n[1];
    }) || [];
}
function Gr(t) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(JSON.stringify(t)).toString("base64");
}
function Zr(t) {
    return JSON.parse(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(t, "base64").toString("utf-8"));
}
function bt(t) {
    if (!t) throw new Error("No recap provided, value is undefined");
    if (!t.att) throw new Error("No `att` property found");
    const e = Object.keys(t.att);
    if (!(e != null && e.length)) throw new Error("No resources found in `att` property");
    e.forEach((n)=>{
        const r = t.att[n];
        if (Array.isArray(r)) throw new Error(`Resource must be an object: ${n}`);
        if (typeof r != "object") throw new Error(`Resource must be an object: ${n}`);
        if (!Object.keys(r).length) throw new Error(`Resource object is empty: ${n}`);
        Object.keys(r).forEach((o)=>{
            const s = r[o];
            if (!Array.isArray(s)) throw new Error(`Ability limits ${o} must be an array of objects, found: ${s}`);
            if (!s.length) throw new Error(`Value of ${o} is empty array, must be an array with objects`);
            s.forEach((i)=>{
                if (typeof i != "object") throw new Error(`Ability limits (${o}) must be an array of objects, found: ${i}`);
            });
        });
    });
}
function Wr(t, e, n, r = {}) {
    return n?.sort((o, s)=>o.localeCompare(s)), {
        att: {
            [t]: hn(e, n, r)
        }
    };
}
function Yr(t, e, n) {
    var r;
    t.att[e] = ln({}, n);
    const o = (r = Object.keys(t.att)) == null ? void 0 : r.sort((i, f)=>i.localeCompare(f)), s = {
        att: {}
    };
    return o.reduce((i, f)=>(i.att[f] = t.att[f], i), s);
}
function hn(t, e, n = {}) {
    e = e?.sort((o, s)=>o.localeCompare(s));
    const r = e.map((o)=>({
            [`${t}/${o}`]: [
                n
            ]
        }));
    return Object.assign({}, ...r);
}
function Ne(t) {
    return bt(t), `urn:recap:${Gr(t).replace(/=/g, "")}`;
}
function Lt(t) {
    const e = Zr(t.replace("urn:recap:", ""));
    return bt(e), e;
}
function Ef(t, e, n) {
    const r = Wr(t, e, n);
    return Ne(r);
}
function pn(t) {
    return t && t.includes("urn:recap:");
}
function Bf(t, e) {
    const n = Lt(t), r = Lt(e), o = Xr(n, r);
    return Ne(o);
}
function Xr(t, e) {
    bt(t), bt(e);
    const n = Object.keys(t.att).concat(Object.keys(e.att)).sort((o, s)=>o.localeCompare(s)), r = {
        att: {}
    };
    return n.forEach((o)=>{
        var s, i;
        Object.keys(((s = t.att) == null ? void 0 : s[o]) || {}).concat(Object.keys(((i = e.att) == null ? void 0 : i[o]) || {})).sort((f, a)=>f.localeCompare(a)).forEach((f)=>{
            var a, l;
            r.att[o] = Dr(ln({}, r.att[o]), {
                [f]: ((a = t.att[o]) == null ? void 0 : a[f]) || ((l = e.att[o]) == null ? void 0 : l[f])
            });
        });
    }), r;
}
function gn(t = "", e) {
    bt(e);
    const n = "I further authorize the stated URI to perform the following actions on my behalf: ";
    if (t.includes(n)) return t;
    const r = [];
    let o = 0;
    Object.keys(e.att).forEach((f)=>{
        const a = Object.keys(e.att[f]).map((u)=>({
                ability: u.split("/")[0],
                action: u.split("/")[1]
            }));
        a.sort((u, h)=>u.action.localeCompare(h.action));
        const l = {};
        a.forEach((u)=>{
            l[u.ability] || (l[u.ability] = []), l[u.ability].push(u.action);
        });
        const c = Object.keys(l).map((u)=>(o++, `(${o}) '${u}': '${l[u].join("', '")}' for '${f}'.`));
        r.push(c.join(", ").replace(".,", "."));
    });
    const s = r.join(" "), i = `${n}${s}`;
    return `${t ? t + " " : ""}${i}`;
}
function If(t) {
    var e;
    const n = Lt(t);
    bt(n);
    const r = (e = n.att) == null ? void 0 : e.eip155;
    return r ? Object.keys(r).map((o)=>o.split("/")[1]) : [];
}
function Af(t) {
    const e = Lt(t);
    bt(e);
    const n = [];
    return Object.values(e.att).forEach((r)=>{
        Object.values(r).forEach((o)=>{
            var s;
            (s = o?.[0]) != null && s.chains && n.push(o[0].chains);
        });
    }), [
        ...new Set(n.flat())
    ];
}
function Jr(t, e) {
    if (!e) return t;
    const n = Lt(e);
    return bt(n), gn(t, n);
}
function Oe(t) {
    if (!t) return;
    const e = t?.[t.length - 1];
    return pn(e) ? e : void 0;
} /*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) */ 
function Qr(t) {
    return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function bn(t) {
    if (typeof t != "boolean") throw new Error(`boolean expected, not ${t}`);
}
function yn(t) {
    if (!Number.isSafeInteger(t) || t < 0) throw new Error("positive integer expected, got " + t);
}
function nt(t, ...e) {
    if (!Qr(t)) throw new Error("Uint8Array expected");
    if (e.length > 0 && !e.includes(t.length)) throw new Error("Uint8Array expected of length " + e + ", got length=" + t.length);
}
function to(t, e = !0) {
    if (t.destroyed) throw new Error("Hash instance has been destroyed");
    if (e && t.finished) throw new Error("Hash#digest() has already been called");
}
function Sf(t, e) {
    nt(t);
    const n = e.outputLen;
    if (t.length < n) throw new Error("digestInto() expects output buffer of length at least " + n);
}
function jt(t) {
    return new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4));
}
function Wt(...t) {
    for(let e = 0; e < t.length; e++)t[e].fill(0);
}
function Nf(t) {
    return new DataView(t.buffer, t.byteOffset, t.byteLength);
}
const Of = new Uint8Array(new Uint32Array([
    287454020
]).buffer)[0] === 68;
function Uf(t) {
    if (typeof t != "string") throw new Error("string expected");
    return new Uint8Array(new TextEncoder().encode(t));
}
function mn(t) {
    if (typeof t == "string") t = Uf(t);
    else if (Qr(t)) t = wn(t);
    else throw new Error("Uint8Array expected, got " + typeof t);
    return t;
}
function _f(t, e) {
    if (e == null || typeof e != "object") throw new Error("options must be defined");
    return Object.assign(t, e);
}
function Tf(t, e) {
    if (t.length !== e.length) return !1;
    let n = 0;
    for(let r = 0; r < t.length; r++)n |= t[r] ^ e[r];
    return n === 0;
}
const Rf = (t, e)=>{
    function n(r, ...o) {
        if (nt(r), !Of) throw new Error("Non little-endian hardware is not yet supported");
        if (t.nonceLength !== void 0) {
            const c = o[0];
            if (!c) throw new Error("nonce / iv required");
            t.varSizeNonce ? nt(c) : nt(c, t.nonceLength);
        }
        const s = t.tagLength;
        s && o[1] !== void 0 && nt(o[1]);
        const i = e(r, ...o), f = (c, u)=>{
            if (u !== void 0) {
                if (c !== 2) throw new Error("cipher output not supported");
                nt(u);
            }
        };
        let a = !1;
        return {
            encrypt (c, u) {
                if (a) throw new Error("cannot encrypt() twice with same key + nonce");
                return a = !0, nt(c), f(i.encrypt.length, u), i.encrypt(c, u);
            },
            decrypt (c, u) {
                if (nt(c), s && c.length < s) throw new Error("invalid ciphertext length: smaller than tagLength=" + s);
                return f(i.decrypt.length, u), i.decrypt(c, u);
            }
        };
    }
    return Object.assign(n, t), n;
};
function eo(t, e, n = !0) {
    if (e === void 0) return new Uint8Array(t);
    if (e.length !== t) throw new Error("invalid output length, expected " + t + ", got: " + e.length);
    if (n && !Cf(e)) throw new Error("invalid output, must be aligned");
    return e;
}
function no(t, e, n, r) {
    if (typeof t.setBigUint64 == "function") return t.setBigUint64(e, n, r);
    const o = BigInt(32), s = BigInt(4294967295), i = Number(n >> o & s), f = Number(n & s), a = r ? 4 : 0, l = r ? 0 : 4;
    t.setUint32(e + a, i, r), t.setUint32(e + l, f, r);
}
function $f(t, e, n) {
    bn(n);
    const r = new Uint8Array(16), o = Nf(r);
    return no(o, 0, BigInt(e), n), no(o, 8, BigInt(t), n), r;
}
function Cf(t) {
    return t.byteOffset % 4 === 0;
}
function wn(t) {
    return Uint8Array.from(t);
}
const ro = (t)=>Uint8Array.from(t.split("").map((e)=>e.charCodeAt(0))), Lf = ro("expand 16-byte k"), jf = ro("expand 32-byte k"), kf = jt(Lf), Pf = jt(jf);
function D(t, e) {
    return t << e | t >>> 32 - e;
}
function xn(t) {
    return t.byteOffset % 4 === 0;
}
const Ue = 64, Hf = 16, oo = 2 ** 32 - 1, so = new Uint32Array;
function Df(t, e, n, r, o, s, i, f) {
    const a = o.length, l = new Uint8Array(Ue), c = jt(l), u = xn(o) && xn(s), h = u ? jt(o) : so, g = u ? jt(s) : so;
    for(let w = 0; w < a; i++){
        if (t(e, n, r, c, i, f), i >= oo) throw new Error("arx: counter overflow");
        const y = Math.min(Ue, a - w);
        if (u && y === Ue) {
            const x = w / 4;
            if (w % 4 !== 0) throw new Error("arx: invalid block position");
            for(let R = 0, M; R < Hf; R++)M = x + R, g[M] = h[M] ^ c[R];
            w += Ue;
            continue;
        }
        for(let x = 0, R; x < y; x++)R = w + x, s[R] = o[R] ^ l[x];
        w += y;
    }
}
function Mf(t, e) {
    const { allowShortKeys: n, extendNonceFn: r, counterLength: o, counterRight: s, rounds: i } = _f({
        allowShortKeys: !1,
        counterLength: 8,
        counterRight: !1,
        rounds: 20
    }, e);
    if (typeof t != "function") throw new Error("core must be a function");
    return yn(o), yn(i), bn(s), bn(n), (f, a, l, c, u = 0)=>{
        nt(f), nt(a), nt(l);
        const h = l.length;
        if (c === void 0 && (c = new Uint8Array(h)), nt(c), yn(u), u < 0 || u >= oo) throw new Error("arx: counter overflow");
        if (c.length < h) throw new Error(`arx: output (${c.length}) is shorter than data (${h})`);
        const g = [];
        let w = f.length, y, x;
        if (w === 32) g.push(y = wn(f)), x = Pf;
        else if (w === 16 && n) y = new Uint8Array(32), y.set(f), y.set(f, 16), x = kf, g.push(y);
        else throw new Error(`arx: invalid 32-byte key, got length=${w}`);
        xn(a) || g.push(a = wn(a));
        const R = jt(y);
        if (r) {
            if (a.length !== 24) throw new Error("arx: extended nonce must be 24 bytes");
            r(x, R, jt(a.subarray(0, 16)), R), a = a.subarray(16);
        }
        const M = 16 - o;
        if (M !== a.length) throw new Error(`arx: nonce must be ${M} or 16 bytes`);
        if (M !== 12) {
            const V = new Uint8Array(12);
            V.set(a, s ? 0 : 12 - a.length), a = V, g.push(a);
        }
        const L = jt(a);
        return Df(t, x, R, L, l, c, u, i), Wt(...g), c;
    };
}
const G = (t, e)=>t[e++] & 255 | (t[e++] & 255) << 8;
class Vf {
    constructor(e){
        this.blockLen = 16, this.outputLen = 16, this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.pos = 0, this.finished = !1, e = mn(e), nt(e, 32);
        const n = G(e, 0), r = G(e, 2), o = G(e, 4), s = G(e, 6), i = G(e, 8), f = G(e, 10), a = G(e, 12), l = G(e, 14);
        this.r[0] = n & 8191, this.r[1] = (n >>> 13 | r << 3) & 8191, this.r[2] = (r >>> 10 | o << 6) & 7939, this.r[3] = (o >>> 7 | s << 9) & 8191, this.r[4] = (s >>> 4 | i << 12) & 255, this.r[5] = i >>> 1 & 8190, this.r[6] = (i >>> 14 | f << 2) & 8191, this.r[7] = (f >>> 11 | a << 5) & 8065, this.r[8] = (a >>> 8 | l << 8) & 8191, this.r[9] = l >>> 5 & 127;
        for(let c = 0; c < 8; c++)this.pad[c] = G(e, 16 + 2 * c);
    }
    process(e, n, r = !1) {
        const o = r ? 0 : 2048, { h: s, r: i } = this, f = i[0], a = i[1], l = i[2], c = i[3], u = i[4], h = i[5], g = i[6], w = i[7], y = i[8], x = i[9], R = G(e, n + 0), M = G(e, n + 2), L = G(e, n + 4), V = G(e, n + 6), _ = G(e, n + 8), k = G(e, n + 10), j = G(e, n + 12), $ = G(e, n + 14);
        let d = s[0] + (R & 8191), m = s[1] + ((R >>> 13 | M << 3) & 8191), p = s[2] + ((M >>> 10 | L << 6) & 8191), b = s[3] + ((L >>> 7 | V << 9) & 8191), v = s[4] + ((V >>> 4 | _ << 12) & 8191), B = s[5] + (_ >>> 1 & 8191), E = s[6] + ((_ >>> 14 | k << 2) & 8191), I = s[7] + ((k >>> 11 | j << 5) & 8191), S = s[8] + ((j >>> 8 | $ << 8) & 8191), O = s[9] + ($ >>> 5 | o), A = 0, T = A + d * f + m * (5 * x) + p * (5 * y) + b * (5 * w) + v * (5 * g);
        A = T >>> 13, T &= 8191, T += B * (5 * h) + E * (5 * u) + I * (5 * c) + S * (5 * l) + O * (5 * a), A += T >>> 13, T &= 8191;
        let U = A + d * a + m * f + p * (5 * x) + b * (5 * y) + v * (5 * w);
        A = U >>> 13, U &= 8191, U += B * (5 * g) + E * (5 * h) + I * (5 * u) + S * (5 * c) + O * (5 * l), A += U >>> 13, U &= 8191;
        let C = A + d * l + m * a + p * f + b * (5 * x) + v * (5 * y);
        A = C >>> 13, C &= 8191, C += B * (5 * w) + E * (5 * g) + I * (5 * h) + S * (5 * u) + O * (5 * c), A += C >>> 13, C &= 8191;
        let H = A + d * c + m * l + p * a + b * f + v * (5 * x);
        A = H >>> 13, H &= 8191, H += B * (5 * y) + E * (5 * w) + I * (5 * g) + S * (5 * h) + O * (5 * u), A += H >>> 13, H &= 8191;
        let q = A + d * u + m * c + p * l + b * a + v * f;
        A = q >>> 13, q &= 8191, q += B * (5 * x) + E * (5 * y) + I * (5 * w) + S * (5 * g) + O * (5 * h), A += q >>> 13, q &= 8191;
        let P = A + d * h + m * u + p * c + b * l + v * a;
        A = P >>> 13, P &= 8191, P += B * f + E * (5 * x) + I * (5 * y) + S * (5 * w) + O * (5 * g), A += P >>> 13, P &= 8191;
        let K = A + d * g + m * h + p * u + b * c + v * l;
        A = K >>> 13, K &= 8191, K += B * a + E * f + I * (5 * x) + S * (5 * y) + O * (5 * w), A += K >>> 13, K &= 8191;
        let et = A + d * w + m * g + p * h + b * u + v * c;
        A = et >>> 13, et &= 8191, et += B * l + E * a + I * f + S * (5 * x) + O * (5 * y), A += et >>> 13, et &= 8191;
        let Z = A + d * y + m * w + p * g + b * h + v * u;
        A = Z >>> 13, Z &= 8191, Z += B * c + E * l + I * a + S * f + O * (5 * x), A += Z >>> 13, Z &= 8191;
        let z = A + d * x + m * y + p * w + b * g + v * h;
        A = z >>> 13, z &= 8191, z += B * u + E * c + I * l + S * a + O * f, A += z >>> 13, z &= 8191, A = (A << 2) + A | 0, A = A + T | 0, T = A & 8191, A = A >>> 13, U += A, s[0] = T, s[1] = U, s[2] = C, s[3] = H, s[4] = q, s[5] = P, s[6] = K, s[7] = et, s[8] = Z, s[9] = z;
    }
    finalize() {
        const { h: e, pad: n } = this, r = new Uint16Array(10);
        let o = e[1] >>> 13;
        e[1] &= 8191;
        for(let f = 2; f < 10; f++)e[f] += o, o = e[f] >>> 13, e[f] &= 8191;
        e[0] += o * 5, o = e[0] >>> 13, e[0] &= 8191, e[1] += o, o = e[1] >>> 13, e[1] &= 8191, e[2] += o, r[0] = e[0] + 5, o = r[0] >>> 13, r[0] &= 8191;
        for(let f = 1; f < 10; f++)r[f] = e[f] + o, o = r[f] >>> 13, r[f] &= 8191;
        r[9] -= 8192;
        let s = (o ^ 1) - 1;
        for(let f = 0; f < 10; f++)r[f] &= s;
        s = ~s;
        for(let f = 0; f < 10; f++)e[f] = e[f] & s | r[f];
        e[0] = (e[0] | e[1] << 13) & 65535, e[1] = (e[1] >>> 3 | e[2] << 10) & 65535, e[2] = (e[2] >>> 6 | e[3] << 7) & 65535, e[3] = (e[3] >>> 9 | e[4] << 4) & 65535, e[4] = (e[4] >>> 12 | e[5] << 1 | e[6] << 14) & 65535, e[5] = (e[6] >>> 2 | e[7] << 11) & 65535, e[6] = (e[7] >>> 5 | e[8] << 8) & 65535, e[7] = (e[8] >>> 8 | e[9] << 5) & 65535;
        let i = e[0] + n[0];
        e[0] = i & 65535;
        for(let f = 1; f < 8; f++)i = (e[f] + n[f] | 0) + (i >>> 16) | 0, e[f] = i & 65535;
        Wt(r);
    }
    update(e) {
        to(this), e = mn(e), nt(e);
        const { buffer: n, blockLen: r } = this, o = e.length;
        for(let s = 0; s < o;){
            const i = Math.min(r - this.pos, o - s);
            if (i === r) {
                for(; r <= o - s; s += r)this.process(e, s);
                continue;
            }
            n.set(e.subarray(s, s + i), this.pos), this.pos += i, s += i, this.pos === r && (this.process(n, 0, !1), this.pos = 0);
        }
        return this;
    }
    destroy() {
        Wt(this.h, this.r, this.buffer, this.pad);
    }
    digestInto(e) {
        to(this), Sf(e, this), this.finished = !0;
        const { buffer: n, h: r } = this;
        let { pos: o } = this;
        if (o) {
            for(n[o++] = 1; o < 16; o++)n[o] = 0;
            this.process(n, 0, !0);
        }
        this.finalize();
        let s = 0;
        for(let i = 0; i < 8; i++)e[s++] = r[i] >>> 0, e[s++] = r[i] >>> 8;
        return e;
    }
    digest() {
        const { buffer: e, outputLen: n } = this;
        this.digestInto(e);
        const r = e.slice(0, n);
        return this.destroy(), r;
    }
}
function qf(t) {
    const e = (r, o)=>t(o).update(mn(r)).digest(), n = t(new Uint8Array(32));
    return e.outputLen = n.outputLen, e.blockLen = n.blockLen, e.create = (r)=>t(r), e;
}
const Kf = qf((t)=>new Vf(t));
function Ff(t, e, n, r, o, s = 20) {
    let i = t[0], f = t[1], a = t[2], l = t[3], c = e[0], u = e[1], h = e[2], g = e[3], w = e[4], y = e[5], x = e[6], R = e[7], M = o, L = n[0], V = n[1], _ = n[2], k = i, j = f, $ = a, d = l, m = c, p = u, b = h, v = g, B = w, E = y, I = x, S = R, O = M, A = L, T = V, U = _;
    for(let H = 0; H < s; H += 2)k = k + m | 0, O = D(O ^ k, 16), B = B + O | 0, m = D(m ^ B, 12), k = k + m | 0, O = D(O ^ k, 8), B = B + O | 0, m = D(m ^ B, 7), j = j + p | 0, A = D(A ^ j, 16), E = E + A | 0, p = D(p ^ E, 12), j = j + p | 0, A = D(A ^ j, 8), E = E + A | 0, p = D(p ^ E, 7), $ = $ + b | 0, T = D(T ^ $, 16), I = I + T | 0, b = D(b ^ I, 12), $ = $ + b | 0, T = D(T ^ $, 8), I = I + T | 0, b = D(b ^ I, 7), d = d + v | 0, U = D(U ^ d, 16), S = S + U | 0, v = D(v ^ S, 12), d = d + v | 0, U = D(U ^ d, 8), S = S + U | 0, v = D(v ^ S, 7), k = k + p | 0, U = D(U ^ k, 16), I = I + U | 0, p = D(p ^ I, 12), k = k + p | 0, U = D(U ^ k, 8), I = I + U | 0, p = D(p ^ I, 7), j = j + b | 0, O = D(O ^ j, 16), S = S + O | 0, b = D(b ^ S, 12), j = j + b | 0, O = D(O ^ j, 8), S = S + O | 0, b = D(b ^ S, 7), $ = $ + v | 0, A = D(A ^ $, 16), B = B + A | 0, v = D(v ^ B, 12), $ = $ + v | 0, A = D(A ^ $, 8), B = B + A | 0, v = D(v ^ B, 7), d = d + m | 0, T = D(T ^ d, 16), E = E + T | 0, m = D(m ^ E, 12), d = d + m | 0, T = D(T ^ d, 8), E = E + T | 0, m = D(m ^ E, 7);
    let C = 0;
    r[C++] = i + k | 0, r[C++] = f + j | 0, r[C++] = a + $ | 0, r[C++] = l + d | 0, r[C++] = c + m | 0, r[C++] = u + p | 0, r[C++] = h + b | 0, r[C++] = g + v | 0, r[C++] = w + B | 0, r[C++] = y + E | 0, r[C++] = x + I | 0, r[C++] = R + S | 0, r[C++] = M + O | 0, r[C++] = L + A | 0, r[C++] = V + T | 0, r[C++] = _ + U | 0;
}
const zf = Mf(Ff, {
    counterRight: !1,
    counterLength: 4,
    allowShortKeys: !1
}), Gf = new Uint8Array(16), io = (t, e)=>{
    t.update(e);
    const n = e.length % 16;
    n && t.update(Gf.subarray(n));
}, Zf = new Uint8Array(32);
function fo(t, e, n, r, o) {
    const s = t(e, n, Zf), i = Kf.create(s);
    o && io(i, o), io(i, r);
    const f = $f(r.length, o ? o.length : 0, !0);
    i.update(f);
    const a = i.digest();
    return Wt(s, f), a;
}
const Wf = (t)=>(e, n, r)=>({
            encrypt (s, i) {
                const f = s.length;
                i = eo(f + 16, i, !1), i.set(s);
                const a = i.subarray(0, -16);
                t(e, n, a, a, 1);
                const l = fo(t, e, n, a, r);
                return i.set(l, f), Wt(l), i;
            },
            decrypt (s, i) {
                i = eo(s.length - 16, i, !1);
                const f = s.subarray(0, -16), a = s.subarray(-16), l = fo(t, e, n, f, r);
                if (!Tf(a, l)) throw new Error("invalid tag");
                return i.set(s.subarray(0, -16)), t(e, n, i, i, 1), Wt(l), i;
            }
        }), co = Rf({
    blockSize: 64,
    nonceLength: 12,
    tagLength: 16
}, Wf(zf));
class ao extends Ie {
    constructor(e, n){
        super(), this.finished = !1, this.destroyed = !1, rn(e);
        const r = ht(n);
        if (this.iHash = e.create(), typeof this.iHash.update != "function") throw new Error("Expected instance of class which extends utils.Hash");
        this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
        const o = this.blockLen, s = new Uint8Array(o);
        s.set(r.length > o ? e.create().update(r).digest() : r);
        for(let i = 0; i < s.length; i++)s[i] ^= 54;
        this.iHash.update(s), this.oHash = e.create();
        for(let i = 0; i < s.length; i++)s[i] ^= 106;
        this.oHash.update(s), ut(s);
    }
    update(e) {
        return Nt(this), this.iHash.update(e), this;
    }
    digestInto(e) {
        Nt(this), at(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy();
    }
    digest() {
        const e = new Uint8Array(this.oHash.outputLen);
        return this.digestInto(e), e;
    }
    _cloneInto(e) {
        e || (e = Object.create(Object.getPrototypeOf(this), {}));
        const { oHash: n, iHash: r, finished: o, destroyed: s, blockLen: i, outputLen: f } = this;
        return e = e, e.finished = o, e.destroyed = s, e.blockLen = i, e.outputLen = f, e.oHash = n._cloneInto(e.oHash), e.iHash = r._cloneInto(e.iHash), e;
    }
    clone() {
        return this._cloneInto();
    }
    destroy() {
        this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
    }
}
const _e = (t, e, n)=>new ao(t, e).update(n).digest();
_e.create = (t, e)=>new ao(t, e);
function Yf(t, e, n) {
    return rn(t), n === void 0 && (n = new Uint8Array(t.outputLen)), _e(t, ht(n), ht(e));
}
const vn = Uint8Array.from([
    0
]), uo = Uint8Array.of();
function Xf(t, e, n, r = 32) {
    rn(t), mt(r);
    const o = t.outputLen;
    if (r > 255 * o) throw new Error("Length should be <= 255*HashLen");
    const s = Math.ceil(r / o);
    n === void 0 && (n = uo);
    const i = new Uint8Array(s * o), f = _e.create(t, e), a = f._cloneInto(), l = new Uint8Array(f.outputLen);
    for(let c = 0; c < s; c++)vn[0] = c + 1, a.update(c === 0 ? uo : l).update(n).update(vn).digestInto(l), i.set(l, o * c), f._cloneInto(a);
    return f.destroy(), a.destroy(), ut(l, vn), i.slice(0, r);
}
const Jf = (t, e, n, r, o)=>Xf(t, Yf(t, e, n), r, o), Te = Ae, En = BigInt(0), Bn = BigInt(1);
function Re(t, e) {
    if (typeof e != "boolean") throw new Error(t + " boolean expected, got " + e);
}
function $e(t) {
    const e = t.toString(16);
    return e.length & 1 ? "0" + e : e;
}
function lo(t) {
    if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
    return t === "" ? En : BigInt("0x" + t);
}
function Ce(t) {
    return lo(ce(t));
}
function Le(t) {
    return at(t), lo(ce(Uint8Array.from(t).reverse()));
}
function In(t, e) {
    return fn(t.toString(16).padStart(e * 2, "0"));
}
function An(t, e) {
    return In(t, e).reverse();
}
function rt(t, e, n) {
    let r;
    if (typeof e == "string") try {
        r = fn(e);
    } catch (s) {
        throw new Error(t + " must be hex string or Uint8Array, cause: " + s);
    }
    else if (nn(e)) r = Uint8Array.from(e);
    else throw new Error(t + " must be hex string or Uint8Array");
    const o = r.length;
    if (typeof n == "number" && o !== n) throw new Error(t + " of length " + n + " expected, got " + o);
    return r;
}
const Sn = (t)=>typeof t == "bigint" && En <= t;
function Qf(t, e, n) {
    return Sn(t) && Sn(e) && Sn(n) && e <= t && t < n;
}
function Nn(t, e, n, r) {
    if (!Qf(e, n, r)) throw new Error("expected valid " + t + ": " + n + " <= n < " + r + ", got " + e);
}
function tc(t) {
    let e;
    for(e = 0; t > En; t >>= Bn, e += 1);
    return e;
}
const je = (t)=>(Bn << BigInt(t)) - Bn;
function ec(t, e, n) {
    if (typeof t != "number" || t < 2) throw new Error("hashLen must be a number");
    if (typeof e != "number" || e < 2) throw new Error("qByteLen must be a number");
    if (typeof n != "function") throw new Error("hmacFn must be a function");
    const r = (g)=>new Uint8Array(g), o = (g)=>Uint8Array.of(g);
    let s = r(t), i = r(t), f = 0;
    const a = ()=>{
        s.fill(1), i.fill(0), f = 0;
    }, l = (...g)=>n(i, s, ...g), c = (g = r(0))=>{
        i = l(o(0), g), s = l(), g.length !== 0 && (i = l(o(1), g), s = l());
    }, u = ()=>{
        if (f++ >= 1e3) throw new Error("drbg: tried 1000 values");
        let g = 0;
        const w = [];
        for(; g < e;){
            s = l();
            const y = s.slice();
            w.push(y), g += s.length;
        }
        return Ht(...w);
    };
    return (g, w)=>{
        a(), c(g);
        let y;
        for(; !(y = w(u()));)c();
        return a(), y;
    };
}
function ke(t, e, n = {}) {
    if (!t || typeof t != "object") throw new Error("expected valid options object");
    function r(o, s, i) {
        const f = t[o];
        if (i && f === void 0) return;
        const a = typeof f;
        if (a !== s || f === null) throw new Error(`param "${o}" is invalid: expected ${s}, got ${a}`);
    }
    Object.entries(e).forEach(([o, s])=>r(o, s, !1)), Object.entries(n).forEach(([o, s])=>r(o, s, !0));
}
function ho(t) {
    const e = new WeakMap;
    return (n, ...r)=>{
        const o = e.get(n);
        if (o !== void 0) return o;
        const s = t(n, ...r);
        return e.set(n, s), s;
    };
}
const ot = BigInt(0), Q = BigInt(1), Dt = BigInt(2), nc = BigInt(3), po = BigInt(4), go = BigInt(5), bo = BigInt(8);
function lt(t, e) {
    const n = t % e;
    return n >= ot ? n : e + n;
}
function pt(t, e, n) {
    let r = t;
    for(; e-- > ot;)r *= r, r %= n;
    return r;
}
function yo(t, e) {
    if (t === ot) throw new Error("invert: expected non-zero number");
    if (e <= ot) throw new Error("invert: expected positive modulus, got " + e);
    let n = lt(t, e), r = e, o = ot, s = Q;
    for(; n !== ot;){
        const f = r / n, a = r % n, l = o - s * f;
        r = n, n = a, o = s, s = l;
    }
    if (r !== Q) throw new Error("invert: does not exist");
    return lt(o, e);
}
function mo(t, e) {
    const n = (t.ORDER + Q) / po, r = t.pow(e, n);
    if (!t.eql(t.sqr(r), e)) throw new Error("Cannot find square root");
    return r;
}
function rc(t, e) {
    const n = (t.ORDER - go) / bo, r = t.mul(e, Dt), o = t.pow(r, n), s = t.mul(e, o), i = t.mul(t.mul(s, Dt), o), f = t.mul(s, t.sub(i, t.ONE));
    if (!t.eql(t.sqr(f), e)) throw new Error("Cannot find square root");
    return f;
}
function oc(t) {
    if (t < BigInt(3)) throw new Error("sqrt is not defined for small field");
    let e = t - Q, n = 0;
    for(; e % Dt === ot;)e /= Dt, n++;
    let r = Dt;
    const o = Yt(t);
    for(; xo(o, r) === 1;)if (r++ > 1e3) throw new Error("Cannot find square root: probably non-prime P");
    if (n === 1) return mo;
    let s = o.pow(r, e);
    const i = (e + Q) / Dt;
    return function(a, l) {
        if (a.is0(l)) return l;
        if (xo(a, l) !== 1) throw new Error("Cannot find square root");
        let c = n, u = a.mul(a.ONE, s), h = a.pow(l, e), g = a.pow(l, i);
        for(; !a.eql(h, a.ONE);){
            if (a.is0(h)) return a.ZERO;
            let w = 1, y = a.sqr(h);
            for(; !a.eql(y, a.ONE);)if (w++, y = a.sqr(y), w === c) throw new Error("Cannot find square root");
            const x = Q << BigInt(c - w - 1), R = a.pow(u, x);
            c = w, u = a.sqr(R), h = a.mul(h, u), g = a.mul(g, R);
        }
        return g;
    };
}
function sc(t) {
    return t % po === nc ? mo : t % bo === go ? rc : oc(t);
}
const ic = [
    "create",
    "isValid",
    "is0",
    "neg",
    "inv",
    "sqrt",
    "sqr",
    "eql",
    "add",
    "sub",
    "mul",
    "pow",
    "div",
    "addN",
    "subN",
    "mulN",
    "sqrN"
];
function fc(t) {
    const e = {
        ORDER: "bigint",
        MASK: "bigint",
        BYTES: "number",
        BITS: "number"
    }, n = ic.reduce((r, o)=>(r[o] = "function", r), e);
    return ke(t, n), t;
}
function cc(t, e, n) {
    if (n < ot) throw new Error("invalid exponent, negatives unsupported");
    if (n === ot) return t.ONE;
    if (n === Q) return e;
    let r = t.ONE, o = e;
    for(; n > ot;)n & Q && (r = t.mul(r, o)), o = t.sqr(o), n >>= Q;
    return r;
}
function wo(t, e, n = !1) {
    const r = new Array(e.length).fill(n ? t.ZERO : void 0), o = e.reduce((i, f, a)=>t.is0(f) ? i : (r[a] = i, t.mul(i, f)), t.ONE), s = t.inv(o);
    return e.reduceRight((i, f, a)=>t.is0(f) ? i : (r[a] = t.mul(i, r[a]), t.mul(i, f)), s), r;
}
function xo(t, e) {
    const n = (t.ORDER - Q) / Dt, r = t.pow(e, n), o = t.eql(r, t.ONE), s = t.eql(r, t.ZERO), i = t.eql(r, t.neg(t.ONE));
    if (!o && !s && !i) throw new Error("invalid Legendre symbol result");
    return o ? 1 : s ? 0 : -1;
}
function ac(t, e) {
    e !== void 0 && mt(e);
    const n = e !== void 0 ? e : t.toString(2).length, r = Math.ceil(n / 8);
    return {
        nBitLength: n,
        nByteLength: r
    };
}
function Yt(t, e, n = !1, r = {}) {
    if (t <= ot) throw new Error("invalid field: expected ORDER > 0, got " + t);
    let o, s;
    if (typeof e == "object" && e != null) {
        if (r.sqrt || n) throw new Error("cannot specify opts in two arguments");
        const c = e;
        c.BITS && (o = c.BITS), c.sqrt && (s = c.sqrt), typeof c.isLE == "boolean" && (n = c.isLE);
    } else typeof e == "number" && (o = e), r.sqrt && (s = r.sqrt);
    const { nBitLength: i, nByteLength: f } = ac(t, o);
    if (f > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
    let a;
    const l = Object.freeze({
        ORDER: t,
        isLE: n,
        BITS: i,
        BYTES: f,
        MASK: je(i),
        ZERO: ot,
        ONE: Q,
        create: (c)=>lt(c, t),
        isValid: (c)=>{
            if (typeof c != "bigint") throw new Error("invalid field element: expected bigint, got " + typeof c);
            return ot <= c && c < t;
        },
        is0: (c)=>c === ot,
        isValidNot0: (c)=>!l.is0(c) && l.isValid(c),
        isOdd: (c)=>(c & Q) === Q,
        neg: (c)=>lt(-c, t),
        eql: (c, u)=>c === u,
        sqr: (c)=>lt(c * c, t),
        add: (c, u)=>lt(c + u, t),
        sub: (c, u)=>lt(c - u, t),
        mul: (c, u)=>lt(c * u, t),
        pow: (c, u)=>cc(l, c, u),
        div: (c, u)=>lt(c * yo(u, t), t),
        sqrN: (c)=>c * c,
        addN: (c, u)=>c + u,
        subN: (c, u)=>c - u,
        mulN: (c, u)=>c * u,
        inv: (c)=>yo(c, t),
        sqrt: s || ((c)=>(a || (a = sc(t)), a(l, c))),
        toBytes: (c)=>n ? An(c, f) : In(c, f),
        fromBytes: (c)=>{
            if (c.length !== f) throw new Error("Field.fromBytes: expected " + f + " bytes, got " + c.length);
            return n ? Le(c) : Ce(c);
        },
        invertBatch: (c)=>wo(l, c),
        cmov: (c, u, h)=>h ? u : c
    });
    return Object.freeze(l);
}
function vo(t) {
    if (typeof t != "bigint") throw new Error("field order must be bigint");
    const e = t.toString(2).length;
    return Math.ceil(e / 8);
}
function Eo(t) {
    const e = vo(t);
    return e + Math.ceil(e / 2);
}
function uc(t, e, n = !1) {
    const r = t.length, o = vo(e), s = Eo(e);
    if (r < 16 || r < s || r > 1024) throw new Error("expected " + s + "-1024 bytes of input, got " + r);
    const i = n ? Le(t) : Ce(t), f = lt(i, e - Q) + Q;
    return n ? An(f, o) : In(f, o);
}
const Xt = BigInt(0), Mt = BigInt(1);
function le(t, e) {
    const n = e.negate();
    return t ? n : e;
}
function lc(t, e, n) {
    const r = e === "pz" ? (i)=>i.pz : (i)=>i.ez, o = wo(t.Fp, n.map(r));
    return n.map((i, f)=>i.toAffine(o[f])).map(t.fromAffine);
}
function Bo(t, e) {
    if (!Number.isSafeInteger(t) || t <= 0 || t > e) throw new Error("invalid window size, expected [1.." + e + "], got W=" + t);
}
function On(t, e) {
    Bo(t, e);
    const n = Math.ceil(e / t) + 1, r = 2 ** (t - 1), o = 2 ** t, s = je(t), i = BigInt(t);
    return {
        windows: n,
        windowSize: r,
        mask: s,
        maxNumber: o,
        shiftBy: i
    };
}
function Io(t, e, n) {
    const { windowSize: r, mask: o, maxNumber: s, shiftBy: i } = n;
    let f = Number(t & o), a = t >> i;
    f > r && (f -= s, a += Mt);
    const l = e * r, c = l + Math.abs(f) - 1, u = f === 0, h = f < 0, g = e % 2 !== 0;
    return {
        nextN: a,
        offset: c,
        isZero: u,
        isNeg: h,
        isNegF: g,
        offsetF: l
    };
}
function dc(t, e) {
    if (!Array.isArray(t)) throw new Error("array expected");
    t.forEach((n, r)=>{
        if (!(n instanceof e)) throw new Error("invalid point at index " + r);
    });
}
function hc(t, e) {
    if (!Array.isArray(t)) throw new Error("array of scalars expected");
    t.forEach((n, r)=>{
        if (!e.isValid(n)) throw new Error("invalid scalar at index " + r);
    });
}
const Un = new WeakMap, Ao = new WeakMap;
function _n(t) {
    return Ao.get(t) || 1;
}
function So(t) {
    if (t !== Xt) throw new Error("invalid wNAF");
}
function pc(t, e) {
    return {
        constTimeNegate: le,
        hasPrecomputes (n) {
            return _n(n) !== 1;
        },
        unsafeLadder (n, r, o = t.ZERO) {
            let s = n;
            for(; r > Xt;)r & Mt && (o = o.add(s)), s = s.double(), r >>= Mt;
            return o;
        },
        precomputeWindow (n, r) {
            const { windows: o, windowSize: s } = On(r, e), i = [];
            let f = n, a = f;
            for(let l = 0; l < o; l++){
                a = f, i.push(a);
                for(let c = 1; c < s; c++)a = a.add(f), i.push(a);
                f = a.double();
            }
            return i;
        },
        wNAF (n, r, o) {
            let s = t.ZERO, i = t.BASE;
            const f = On(n, e);
            for(let a = 0; a < f.windows; a++){
                const { nextN: l, offset: c, isZero: u, isNeg: h, isNegF: g, offsetF: w } = Io(o, a, f);
                o = l, u ? i = i.add(le(g, r[w])) : s = s.add(le(h, r[c]));
            }
            return So(o), {
                p: s,
                f: i
            };
        },
        wNAFUnsafe (n, r, o, s = t.ZERO) {
            const i = On(n, e);
            for(let f = 0; f < i.windows && o !== Xt; f++){
                const { nextN: a, offset: l, isZero: c, isNeg: u } = Io(o, f, i);
                if (o = a, !c) {
                    const h = r[l];
                    s = s.add(u ? h.negate() : h);
                }
            }
            return So(o), s;
        },
        getPrecomputes (n, r, o) {
            let s = Un.get(r);
            return s || (s = this.precomputeWindow(r, n), n !== 1 && (typeof o == "function" && (s = o(s)), Un.set(r, s))), s;
        },
        wNAFCached (n, r, o) {
            const s = _n(n);
            return this.wNAF(s, this.getPrecomputes(s, n, o), r);
        },
        wNAFCachedUnsafe (n, r, o, s) {
            const i = _n(n);
            return i === 1 ? this.unsafeLadder(n, r, s) : this.wNAFUnsafe(i, this.getPrecomputes(i, n, o), r, s);
        },
        setWindowSize (n, r) {
            Bo(r, e), Ao.set(n, r), Un.delete(n);
        }
    };
}
function gc(t, e, n, r) {
    let o = e, s = t.ZERO, i = t.ZERO;
    for(; n > Xt || r > Xt;)n & Mt && (s = s.add(o)), r & Mt && (i = i.add(o)), o = o.double(), n >>= Mt, r >>= Mt;
    return {
        p1: s,
        p2: i
    };
}
function bc(t, e, n, r) {
    dc(n, t), hc(r, e);
    const o = n.length, s = r.length;
    if (o !== s) throw new Error("arrays of points and scalars must have equal length");
    const i = t.ZERO, f = tc(BigInt(o));
    let a = 1;
    f > 12 ? a = f - 3 : f > 4 ? a = f - 2 : f > 0 && (a = 2);
    const l = je(a), c = new Array(Number(l) + 1).fill(i), u = Math.floor((e.BITS - 1) / a) * a;
    let h = i;
    for(let g = u; g >= 0; g -= a){
        c.fill(i);
        for(let y = 0; y < s; y++){
            const x = r[y], R = Number(x >> BigInt(g) & l);
            c[R] = c[R].add(n[y]);
        }
        let w = i;
        for(let y = c.length - 1, x = i; y > 0; y--)x = x.add(c[y]), w = w.add(x);
        if (h = h.add(w), g !== 0) for(let y = 0; y < a; y++)h = h.double();
    }
    return h;
}
function No(t, e) {
    if (e) {
        if (e.ORDER !== t) throw new Error("Field.ORDER must match order: Fp == p, Fn == n");
        return fc(e), e;
    } else return Yt(t);
}
function yc(t, e, n = {}) {
    if (!e || typeof e != "object") throw new Error(`expected valid ${t} CURVE object`);
    for (const f of [
        "p",
        "n",
        "h"
    ]){
        const a = e[f];
        if (!(typeof a == "bigint" && a > Xt)) throw new Error(`CURVE.${f} must be positive bigint`);
    }
    const r = No(e.p, n.Fp), o = No(e.n, n.Fn), i = [
        "Gx",
        "Gy",
        "a",
        t === "weierstrass" ? "b" : "d"
    ];
    for (const f of i)if (!r.isValid(e[f])) throw new Error(`CURVE.${f} must be valid field element of CURVE.Fp`);
    return {
        Fp: r,
        Fn: o
    };
}
BigInt(0), BigInt(1), BigInt(2), BigInt(8);
const de = BigInt(0), Jt = BigInt(1), Pe = BigInt(2);
function mc(t) {
    return ke(t, {
        adjustScalarBytes: "function",
        powPminus2: "function"
    }), Object.freeze({
        ...t
    });
}
function wc(t) {
    const e = mc(t), { P: n, type: r, adjustScalarBytes: o, powPminus2: s, randomBytes: i } = e, f = r === "x25519";
    if (!f && r !== "x448") throw new Error("invalid type");
    const a = i || Zt, l = f ? 255 : 448, c = f ? 32 : 56, u = BigInt(f ? 9 : 5), h = BigInt(f ? 121665 : 39081), g = f ? Pe ** BigInt(254) : Pe ** BigInt(447), w = f ? BigInt(8) * Pe ** BigInt(251) - Jt : BigInt(4) * Pe ** BigInt(445) - Jt, y = g + w + Jt, x = (d)=>lt(d, n), R = M(u);
    function M(d) {
        return An(x(d), c);
    }
    function L(d) {
        const m = rt("u coordinate", d, c);
        return f && (m[31] &= 127), x(Le(m));
    }
    function V(d) {
        return Le(o(rt("scalar", d, c)));
    }
    function _(d, m) {
        const p = $(L(m), V(d));
        if (p === de) throw new Error("invalid private or public key received");
        return M(p);
    }
    function k(d) {
        return _(d, R);
    }
    function j(d, m, p) {
        const b = x(d * (m - p));
        return m = x(m - b), p = x(p + b), {
            x_2: m,
            x_3: p
        };
    }
    function $(d, m) {
        Nn("u", d, de, n), Nn("scalar", m, g, y);
        const p = m, b = d;
        let v = Jt, B = de, E = d, I = Jt, S = de;
        for(let A = BigInt(l - 1); A >= de; A--){
            const T = p >> A & Jt;
            S ^= T, ({ x_2: v, x_3: E } = j(S, v, E)), ({ x_2: B, x_3: I } = j(S, B, I)), S = T;
            const U = v + B, C = x(U * U), H = v - B, q = x(H * H), P = C - q, K = E + I, et = E - I, Z = x(et * U), z = x(K * H), Ft = Z + z, yt = Z - z;
            E = x(Ft * Ft), I = x(b * x(yt * yt)), v = x(C * q), B = x(P * (C + x(h * P)));
        }
        ({ x_2: v, x_3: E } = j(S, v, E)), { x_2: B, x_3: I } = j(S, B, I);
        const O = s(B);
        return x(v * O);
    }
    return {
        scalarMult: _,
        scalarMultBase: k,
        getSharedSecret: (d, m)=>_(d, m),
        getPublicKey: (d)=>k(d),
        utils: {
            randomPrivateKey: ()=>a(c)
        },
        GuBytes: R.slice()
    };
}
BigInt(0);
const xc = BigInt(1), Oo = BigInt(2), vc = BigInt(3), Ec = BigInt(5), Bc = BigInt(8), Uo = {
    p: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed"),
    n: BigInt("0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed"),
    h: Bc,
    a: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec"),
    d: BigInt("0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3"),
    Gx: BigInt("0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a"),
    Gy: BigInt("0x6666666666666666666666666666666666666666666666666666666666666658")
};
function Ic(t) {
    const e = BigInt(10), n = BigInt(20), r = BigInt(40), o = BigInt(80), s = Uo.p, f = t * t % s * t % s, a = pt(f, Oo, s) * f % s, l = pt(a, xc, s) * t % s, c = pt(l, Ec, s) * l % s, u = pt(c, e, s) * c % s, h = pt(u, n, s) * u % s, g = pt(h, r, s) * h % s, w = pt(g, o, s) * g % s, y = pt(w, o, s) * g % s, x = pt(y, e, s) * c % s;
    return {
        pow_p_5_8: pt(x, Oo, s) * t % s,
        b2: f
    };
}
function Ac(t) {
    return t[0] &= 248, t[31] &= 127, t[31] |= 64, t;
}
const Tn = (()=>{
    const t = Uo.p;
    return wc({
        P: t,
        type: "x25519",
        powPminus2: (e)=>{
            const { pow_p_5_8: n, b2: r } = Ic(e);
            return lt(pt(n, vc, t) * r, t);
        },
        adjustScalarBytes: Ac
    });
})();
function _o(t) {
    t.lowS !== void 0 && Re("lowS", t.lowS), t.prehash !== void 0 && Re("prehash", t.prehash);
}
class Sc extends Error {
    constructor(e = ""){
        super(e);
    }
}
const vt = {
    Err: Sc,
    _tlv: {
        encode: (t, e)=>{
            const { Err: n } = vt;
            if (t < 0 || t > 256) throw new n("tlv.encode: wrong tag");
            if (e.length & 1) throw new n("tlv.encode: unpadded data");
            const r = e.length / 2, o = $e(r);
            if (o.length / 2 & 128) throw new n("tlv.encode: long form length too big");
            const s = r > 127 ? $e(o.length / 2 | 128) : "";
            return $e(t) + s + o + e;
        },
        decode (t, e) {
            const { Err: n } = vt;
            let r = 0;
            if (t < 0 || t > 256) throw new n("tlv.encode: wrong tag");
            if (e.length < 2 || e[r++] !== t) throw new n("tlv.decode: wrong tlv");
            const o = e[r++], s = !!(o & 128);
            let i = 0;
            if (!s) i = o;
            else {
                const a = o & 127;
                if (!a) throw new n("tlv.decode(long): indefinite length not supported");
                if (a > 4) throw new n("tlv.decode(long): byte length is too big");
                const l = e.subarray(r, r + a);
                if (l.length !== a) throw new n("tlv.decode: length bytes not complete");
                if (l[0] === 0) throw new n("tlv.decode(long): zero leftmost byte");
                for (const c of l)i = i << 8 | c;
                if (r += a, i < 128) throw new n("tlv.decode(long): not minimal encoding");
            }
            const f = e.subarray(r, r + i);
            if (f.length !== i) throw new n("tlv.decode: wrong value length");
            return {
                v: f,
                l: e.subarray(r + i)
            };
        }
    },
    _int: {
        encode (t) {
            const { Err: e } = vt;
            if (t < he) throw new e("integer: negative integers are not allowed");
            let n = $e(t);
            if (Number.parseInt(n[0], 16) & 8 && (n = "00" + n), n.length & 1) throw new e("unexpected DER parsing assertion: unpadded hex");
            return n;
        },
        decode (t) {
            const { Err: e } = vt;
            if (t[0] & 128) throw new e("invalid signature integer: negative");
            if (t[0] === 0 && !(t[1] & 128)) throw new e("invalid signature integer: unnecessary leading zero");
            return Ce(t);
        }
    },
    toSig (t) {
        const { Err: e, _int: n, _tlv: r } = vt, o = rt("signature", t), { v: s, l: i } = r.decode(48, o);
        if (i.length) throw new e("invalid signature: left bytes after parsing");
        const { v: f, l: a } = r.decode(2, s), { v: l, l: c } = r.decode(2, a);
        if (c.length) throw new e("invalid signature: left bytes after parsing");
        return {
            r: n.decode(f),
            s: n.decode(l)
        };
    },
    hexFromSig (t) {
        const { _tlv: e, _int: n } = vt, r = e.encode(2, n.encode(t.r)), o = e.encode(2, n.encode(t.s)), s = r + o;
        return e.encode(48, s);
    }
}, he = BigInt(0), pe = BigInt(1), Nc = BigInt(2), He = BigInt(3), Oc = BigInt(4);
function Uc(t, e, n) {
    function r(o) {
        const s = t.sqr(o), i = t.mul(s, o);
        return t.add(t.add(i, t.mul(o, e)), n);
    }
    return r;
}
function To(t, e, n) {
    const { BYTES: r } = t;
    function o(s) {
        let i;
        if (typeof s == "bigint") i = s;
        else {
            let f = rt("private key", s);
            if (e) {
                if (!e.includes(f.length * 2)) throw new Error("invalid private key");
                const a = new Uint8Array(r);
                a.set(f, a.length - f.length), f = a;
            }
            try {
                i = t.fromBytes(f);
            } catch  {
                throw new Error(`invalid private key: expected ui8a of size ${r}, got ${typeof s}`);
            }
        }
        if (n && (i = t.create(i)), !t.isValidNot0(i)) throw new Error("invalid private key: out of range [1..N-1]");
        return i;
    }
    return o;
}
function _c(t, e = {}) {
    const { Fp: n, Fn: r } = yc("weierstrass", t, e), { h: o, n: s } = t;
    ke(e, {}, {
        allowInfinityPoint: "boolean",
        clearCofactor: "function",
        isTorsionFree: "function",
        fromBytes: "function",
        toBytes: "function",
        endo: "object",
        wrapPrivateKey: "boolean"
    });
    const { endo: i } = e;
    if (i && (!n.is0(t.a) || typeof i.beta != "bigint" || typeof i.splitScalar != "function")) throw new Error('invalid endo: expected "beta": bigint and "splitScalar": function');
    function f() {
        if (!n.isOdd) throw new Error("compression is not supported: Field does not have .isOdd()");
    }
    function a($, d, m) {
        const { x: p, y: b } = d.toAffine(), v = n.toBytes(p);
        if (Re("isCompressed", m), m) {
            f();
            const B = !n.isOdd(b);
            return Ht(Ro(B), v);
        } else return Ht(Uint8Array.of(4), v, n.toBytes(b));
    }
    function l($) {
        at($);
        const d = n.BYTES, m = d + 1, p = 2 * d + 1, b = $.length, v = $[0], B = $.subarray(1);
        if (b === m && (v === 2 || v === 3)) {
            const E = n.fromBytes(B);
            if (!n.isValid(E)) throw new Error("bad point: is not on curve, wrong x");
            const I = h(E);
            let S;
            try {
                S = n.sqrt(I);
            } catch (T) {
                const U = T instanceof Error ? ": " + T.message : "";
                throw new Error("bad point: is not on curve, sqrt error" + U);
            }
            f();
            const O = n.isOdd(S);
            return (v & 1) === 1 !== O && (S = n.neg(S)), {
                x: E,
                y: S
            };
        } else if (b === p && v === 4) {
            const E = n.fromBytes(B.subarray(d * 0, d * 1)), I = n.fromBytes(B.subarray(d * 1, d * 2));
            if (!g(E, I)) throw new Error("bad point: is not on curve");
            return {
                x: E,
                y: I
            };
        } else throw new Error(`bad point: got length ${b}, expected compressed=${m} or uncompressed=${p}`);
    }
    const c = e.toBytes || a, u = e.fromBytes || l, h = Uc(n, t.a, t.b);
    function g($, d) {
        const m = n.sqr(d), p = h($);
        return n.eql(m, p);
    }
    if (!g(t.Gx, t.Gy)) throw new Error("bad curve params: generator point");
    const w = n.mul(n.pow(t.a, He), Oc), y = n.mul(n.sqr(t.b), BigInt(27));
    if (n.is0(n.add(w, y))) throw new Error("bad curve params: a or b");
    function x($, d, m = !1) {
        if (!n.isValid(d) || m && n.is0(d)) throw new Error(`bad point coordinate ${$}`);
        return d;
    }
    function R($) {
        if (!($ instanceof _)) throw new Error("ProjectivePoint expected");
    }
    const M = ho(($, d)=>{
        const { px: m, py: p, pz: b } = $;
        if (n.eql(b, n.ONE)) return {
            x: m,
            y: p
        };
        const v = $.is0();
        d == null && (d = v ? n.ONE : n.inv(b));
        const B = n.mul(m, d), E = n.mul(p, d), I = n.mul(b, d);
        if (v) return {
            x: n.ZERO,
            y: n.ZERO
        };
        if (!n.eql(I, n.ONE)) throw new Error("invZ was invalid");
        return {
            x: B,
            y: E
        };
    }), L = ho(($)=>{
        if ($.is0()) {
            if (e.allowInfinityPoint && !n.is0($.py)) return;
            throw new Error("bad point: ZERO");
        }
        const { x: d, y: m } = $.toAffine();
        if (!n.isValid(d) || !n.isValid(m)) throw new Error("bad point: x or y not field elements");
        if (!g(d, m)) throw new Error("bad point: equation left != right");
        if (!$.isTorsionFree()) throw new Error("bad point: not in prime-order subgroup");
        return !0;
    });
    function V($, d, m, p, b) {
        return m = new _(n.mul(m.px, $), m.py, m.pz), d = le(p, d), m = le(b, m), d.add(m);
    }
    class _ {
        constructor(d, m, p){
            this.px = x("x", d), this.py = x("y", m, !0), this.pz = x("z", p), Object.freeze(this);
        }
        static fromAffine(d) {
            const { x: m, y: p } = d || {};
            if (!d || !n.isValid(m) || !n.isValid(p)) throw new Error("invalid affine point");
            if (d instanceof _) throw new Error("projective point not allowed");
            return n.is0(m) && n.is0(p) ? _.ZERO : new _(m, p, n.ONE);
        }
        get x() {
            return this.toAffine().x;
        }
        get y() {
            return this.toAffine().y;
        }
        static normalizeZ(d) {
            return lc(_, "pz", d);
        }
        static fromBytes(d) {
            return at(d), _.fromHex(d);
        }
        static fromHex(d) {
            const m = _.fromAffine(u(rt("pointHex", d)));
            return m.assertValidity(), m;
        }
        static fromPrivateKey(d) {
            const m = To(r, e.allowedPrivateKeyLengths, e.wrapPrivateKey);
            return _.BASE.multiply(m(d));
        }
        static msm(d, m) {
            return bc(_, r, d, m);
        }
        precompute(d = 8, m = !0) {
            return j.setWindowSize(this, d), m || this.multiply(He), this;
        }
        _setWindowSize(d) {
            this.precompute(d);
        }
        assertValidity() {
            L(this);
        }
        hasEvenY() {
            const { y: d } = this.toAffine();
            if (!n.isOdd) throw new Error("Field doesn't support isOdd");
            return !n.isOdd(d);
        }
        equals(d) {
            R(d);
            const { px: m, py: p, pz: b } = this, { px: v, py: B, pz: E } = d, I = n.eql(n.mul(m, E), n.mul(v, b)), S = n.eql(n.mul(p, E), n.mul(B, b));
            return I && S;
        }
        negate() {
            return new _(this.px, n.neg(this.py), this.pz);
        }
        double() {
            const { a: d, b: m } = t, p = n.mul(m, He), { px: b, py: v, pz: B } = this;
            let E = n.ZERO, I = n.ZERO, S = n.ZERO, O = n.mul(b, b), A = n.mul(v, v), T = n.mul(B, B), U = n.mul(b, v);
            return U = n.add(U, U), S = n.mul(b, B), S = n.add(S, S), E = n.mul(d, S), I = n.mul(p, T), I = n.add(E, I), E = n.sub(A, I), I = n.add(A, I), I = n.mul(E, I), E = n.mul(U, E), S = n.mul(p, S), T = n.mul(d, T), U = n.sub(O, T), U = n.mul(d, U), U = n.add(U, S), S = n.add(O, O), O = n.add(S, O), O = n.add(O, T), O = n.mul(O, U), I = n.add(I, O), T = n.mul(v, B), T = n.add(T, T), O = n.mul(T, U), E = n.sub(E, O), S = n.mul(T, A), S = n.add(S, S), S = n.add(S, S), new _(E, I, S);
        }
        add(d) {
            R(d);
            const { px: m, py: p, pz: b } = this, { px: v, py: B, pz: E } = d;
            let I = n.ZERO, S = n.ZERO, O = n.ZERO;
            const A = t.a, T = n.mul(t.b, He);
            let U = n.mul(m, v), C = n.mul(p, B), H = n.mul(b, E), q = n.add(m, p), P = n.add(v, B);
            q = n.mul(q, P), P = n.add(U, C), q = n.sub(q, P), P = n.add(m, b);
            let K = n.add(v, E);
            return P = n.mul(P, K), K = n.add(U, H), P = n.sub(P, K), K = n.add(p, b), I = n.add(B, E), K = n.mul(K, I), I = n.add(C, H), K = n.sub(K, I), O = n.mul(A, P), I = n.mul(T, H), O = n.add(I, O), I = n.sub(C, O), O = n.add(C, O), S = n.mul(I, O), C = n.add(U, U), C = n.add(C, U), H = n.mul(A, H), P = n.mul(T, P), C = n.add(C, H), H = n.sub(U, H), H = n.mul(A, H), P = n.add(P, H), U = n.mul(C, P), S = n.add(S, U), U = n.mul(K, P), I = n.mul(q, I), I = n.sub(I, U), U = n.mul(q, C), O = n.mul(K, O), O = n.add(O, U), new _(I, S, O);
        }
        subtract(d) {
            return this.add(d.negate());
        }
        is0() {
            return this.equals(_.ZERO);
        }
        multiply(d) {
            const { endo: m } = e;
            if (!r.isValidNot0(d)) throw new Error("invalid scalar: out of range");
            let p, b;
            const v = (B)=>j.wNAFCached(this, B, _.normalizeZ);
            if (m) {
                const { k1neg: B, k1: E, k2neg: I, k2: S } = m.splitScalar(d), { p: O, f: A } = v(E), { p: T, f: U } = v(S);
                b = A.add(U), p = V(m.beta, O, T, B, I);
            } else {
                const { p: B, f: E } = v(d);
                p = B, b = E;
            }
            return _.normalizeZ([
                p,
                b
            ])[0];
        }
        multiplyUnsafe(d) {
            const { endo: m } = e, p = this;
            if (!r.isValid(d)) throw new Error("invalid scalar: out of range");
            if (d === he || p.is0()) return _.ZERO;
            if (d === pe) return p;
            if (j.hasPrecomputes(this)) return this.multiply(d);
            if (m) {
                const { k1neg: b, k1: v, k2neg: B, k2: E } = m.splitScalar(d), { p1: I, p2: S } = gc(_, p, v, E);
                return V(m.beta, I, S, b, B);
            } else return j.wNAFCachedUnsafe(p, d);
        }
        multiplyAndAddUnsafe(d, m, p) {
            const b = this.multiplyUnsafe(m).add(d.multiplyUnsafe(p));
            return b.is0() ? void 0 : b;
        }
        toAffine(d) {
            return M(this, d);
        }
        isTorsionFree() {
            const { isTorsionFree: d } = e;
            return o === pe ? !0 : d ? d(_, this) : j.wNAFCachedUnsafe(this, s).is0();
        }
        clearCofactor() {
            const { clearCofactor: d } = e;
            return o === pe ? this : d ? d(_, this) : this.multiplyUnsafe(o);
        }
        toBytes(d = !0) {
            return Re("isCompressed", d), this.assertValidity(), c(_, this, d);
        }
        toRawBytes(d = !0) {
            return this.toBytes(d);
        }
        toHex(d = !0) {
            return ce(this.toBytes(d));
        }
        toString() {
            return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
        }
    }
    _.BASE = new _(t.Gx, t.Gy, n.ONE), _.ZERO = new _(n.ZERO, n.ONE, n.ZERO), _.Fp = n, _.Fn = r;
    const k = r.BITS, j = pc(_, e.endo ? Math.ceil(k / 2) : k);
    return _;
}
function Ro(t) {
    return Uint8Array.of(t ? 2 : 3);
}
function Tc(t, e, n = {}) {
    ke(e, {
        hash: "function"
    }, {
        hmac: "function",
        lowS: "boolean",
        randomBytes: "function",
        bits2int: "function",
        bits2int_modN: "function"
    });
    const r = e.randomBytes || Zt, o = e.hmac || ((p, ...b)=>_e(e.hash, p, Ht(...b))), { Fp: s, Fn: i } = t, { ORDER: f, BITS: a } = i;
    function l(p) {
        const b = f >> pe;
        return p > b;
    }
    function c(p) {
        return l(p) ? i.neg(p) : p;
    }
    function u(p, b) {
        if (!i.isValidNot0(b)) throw new Error(`invalid signature ${p}: out of range 1..CURVE.n`);
    }
    class h {
        constructor(b, v, B){
            u("r", b), u("s", v), this.r = b, this.s = v, B != null && (this.recovery = B), Object.freeze(this);
        }
        static fromCompact(b) {
            const v = i.BYTES, B = rt("compactSignature", b, v * 2);
            return new h(i.fromBytes(B.subarray(0, v)), i.fromBytes(B.subarray(v, v * 2)));
        }
        static fromDER(b) {
            const { r: v, s: B } = vt.toSig(rt("DER", b));
            return new h(v, B);
        }
        assertValidity() {}
        addRecoveryBit(b) {
            return new h(this.r, this.s, b);
        }
        recoverPublicKey(b) {
            const v = s.ORDER, { r: B, s: E, recovery: I } = this;
            if (I == null || ![
                0,
                1,
                2,
                3
            ].includes(I)) throw new Error("recovery id invalid");
            if (f * Nc < v && I > 1) throw new Error("recovery id is ambiguous for h>1 curve");
            const O = I === 2 || I === 3 ? B + f : B;
            if (!s.isValid(O)) throw new Error("recovery id 2 or 3 invalid");
            const A = s.toBytes(O), T = t.fromHex(Ht(Ro((I & 1) === 0), A)), U = i.inv(O), C = L(rt("msgHash", b)), H = i.create(-C * U), q = i.create(E * U), P = t.BASE.multiplyUnsafe(H).add(T.multiplyUnsafe(q));
            if (P.is0()) throw new Error("point at infinify");
            return P.assertValidity(), P;
        }
        hasHighS() {
            return l(this.s);
        }
        normalizeS() {
            return this.hasHighS() ? new h(this.r, i.neg(this.s), this.recovery) : this;
        }
        toBytes(b) {
            if (b === "compact") return Ht(i.toBytes(this.r), i.toBytes(this.s));
            if (b === "der") return fn(vt.hexFromSig(this));
            throw new Error("invalid format");
        }
        toDERRawBytes() {
            return this.toBytes("der");
        }
        toDERHex() {
            return ce(this.toBytes("der"));
        }
        toCompactRawBytes() {
            return this.toBytes("compact");
        }
        toCompactHex() {
            return ce(this.toBytes("compact"));
        }
    }
    const g = To(i, n.allowedPrivateKeyLengths, n.wrapPrivateKey), w = {
        isValidPrivateKey (p) {
            try {
                return g(p), !0;
            } catch  {
                return !1;
            }
        },
        normPrivateKeyToScalar: g,
        randomPrivateKey: ()=>{
            const p = f;
            return uc(r(Eo(p)), p);
        },
        precompute (p = 8, b = t.BASE) {
            return b.precompute(p, !1);
        }
    };
    function y(p, b = !0) {
        return t.fromPrivateKey(p).toBytes(b);
    }
    function x(p) {
        if (typeof p == "bigint") return !1;
        if (p instanceof t) return !0;
        const v = rt("key", p).length, B = s.BYTES, E = B + 1, I = 2 * B + 1;
        if (!(n.allowedPrivateKeyLengths || i.BYTES === E)) return v === E || v === I;
    }
    function R(p, b, v = !0) {
        if (x(p) === !0) throw new Error("first arg must be private key");
        if (x(b) === !1) throw new Error("second arg must be public key");
        return t.fromHex(b).multiply(g(p)).toBytes(v);
    }
    const M = e.bits2int || function(p) {
        if (p.length > 8192) throw new Error("input is too large");
        const b = Ce(p), v = p.length * 8 - a;
        return v > 0 ? b >> BigInt(v) : b;
    }, L = e.bits2int_modN || function(p) {
        return i.create(M(p));
    }, V = je(a);
    function _(p) {
        return Nn("num < 2^" + a, p, he, V), i.toBytes(p);
    }
    function k(p, b, v = j) {
        if ([
            "recovered",
            "canonical"
        ].some((q)=>q in v)) throw new Error("sign() legacy options not supported");
        const { hash: B } = e;
        let { lowS: E, prehash: I, extraEntropy: S } = v;
        E == null && (E = !0), p = rt("msgHash", p), _o(v), I && (p = rt("prehashed msgHash", B(p)));
        const O = L(p), A = g(b), T = [
            _(A),
            _(O)
        ];
        if (S != null && S !== !1) {
            const q = S === !0 ? r(s.BYTES) : S;
            T.push(rt("extraEntropy", q));
        }
        const U = Ht(...T), C = O;
        function H(q) {
            const P = M(q);
            if (!i.isValidNot0(P)) return;
            const K = i.inv(P), et = t.BASE.multiply(P).toAffine(), Z = i.create(et.x);
            if (Z === he) return;
            const z = i.create(K * i.create(C + Z * A));
            if (z === he) return;
            let Ft = (et.x === Z ? 0 : 2) | Number(et.y & pe), yt = z;
            return E && l(z) && (yt = c(z), Ft ^= 1), new h(Z, yt, Ft);
        }
        return {
            seed: U,
            k2sig: H
        };
    }
    const j = {
        lowS: e.lowS,
        prehash: !1
    }, $ = {
        lowS: e.lowS,
        prehash: !1
    };
    function d(p, b, v = j) {
        const { seed: B, k2sig: E } = k(p, b, v);
        return ec(e.hash.outputLen, i.BYTES, o)(B, E);
    }
    t.BASE.precompute(8);
    function m(p, b, v, B = $) {
        const E = p;
        b = rt("msgHash", b), v = rt("publicKey", v), _o(B);
        const { lowS: I, prehash: S, format: O } = B;
        if ("strict" in B) throw new Error("options.strict was renamed to lowS");
        if (O !== void 0 && ![
            "compact",
            "der",
            "js"
        ].includes(O)) throw new Error('format must be "compact", "der" or "js"');
        const A = typeof E == "string" || nn(E), T = !A && !O && typeof E == "object" && E !== null && typeof E.r == "bigint" && typeof E.s == "bigint";
        if (!A && !T) throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
        let U, C;
        try {
            if (T) if (O === void 0 || O === "js") U = new h(E.r, E.s);
            else throw new Error("invalid format");
            if (A) {
                try {
                    O !== "compact" && (U = h.fromDER(E));
                } catch (yt) {
                    if (!(yt instanceof vt.Err)) throw yt;
                }
                !U && O !== "der" && (U = h.fromCompact(E));
            }
            C = t.fromHex(v);
        } catch  {
            return !1;
        }
        if (!U || I && U.hasHighS()) return !1;
        S && (b = e.hash(b));
        const { r: H, s: q } = U, P = L(b), K = i.inv(q), et = i.create(P * K), Z = i.create(H * K), z = t.BASE.multiplyUnsafe(et).add(C.multiplyUnsafe(Z));
        return z.is0() ? !1 : i.create(z.x) === H;
    }
    return Object.freeze({
        getPublicKey: y,
        getSharedSecret: R,
        sign: d,
        verify: m,
        utils: w,
        Point: t,
        Signature: h
    });
}
function Rc(t) {
    const e = {
        a: t.a,
        b: t.b,
        p: t.Fp.ORDER,
        n: t.n,
        h: t.h,
        Gx: t.Gx,
        Gy: t.Gy
    }, n = t.Fp, r = Yt(e.n, t.nBitLength), o = {
        Fp: n,
        Fn: r,
        allowedPrivateKeyLengths: t.allowedPrivateKeyLengths,
        allowInfinityPoint: t.allowInfinityPoint,
        endo: t.endo,
        wrapPrivateKey: t.wrapPrivateKey,
        isTorsionFree: t.isTorsionFree,
        clearCofactor: t.clearCofactor,
        fromBytes: t.fromBytes,
        toBytes: t.toBytes
    };
    return {
        CURVE: e,
        curveOpts: o
    };
}
function $c(t) {
    const { CURVE: e, curveOpts: n } = Rc(t), r = {
        hash: t.hash,
        hmac: t.hmac,
        randomBytes: t.randomBytes,
        lowS: t.lowS,
        bits2int: t.bits2int,
        bits2int_modN: t.bits2int_modN
    };
    return {
        CURVE: e,
        curveOpts: n,
        ecdsaOpts: r
    };
}
function Cc(t, e) {
    return Object.assign({}, e, {
        ProjectivePoint: e.Point,
        CURVE: t
    });
}
function Lc(t) {
    const { CURVE: e, curveOpts: n, ecdsaOpts: r } = $c(t), o = _c(e, n), s = Tc(o, r, n);
    return Cc(t, s);
}
function Rn(t, e) {
    const n = (r)=>Lc({
            ...t,
            hash: r
        });
    return {
        ...n(e),
        create: n
    };
}
const $o = {
    p: BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff"),
    n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"),
    h: BigInt(1),
    a: BigInt("0xffffffff00000001000000000000000000000000fffffffffffffffffffffffc"),
    b: BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"),
    Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),
    Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5")
}, Co = {
    p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000ffffffff"),
    n: BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973"),
    h: BigInt(1),
    a: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000fffffffc"),
    b: BigInt("0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef"),
    Gx: BigInt("0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7"),
    Gy: BigInt("0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f")
}, Lo = {
    p: BigInt("0x1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),
    n: BigInt("0x01fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e91386409"),
    h: BigInt(1),
    a: BigInt("0x1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc"),
    b: BigInt("0x0051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f00"),
    Gx: BigInt("0x00c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66"),
    Gy: BigInt("0x011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650")
}, jc = Yt($o.p), kc = Yt(Co.p), Pc = Yt(Lo.p), Hc = Rn({
    ...$o,
    Fp: jc,
    lowS: !1
}, Ae);
Rn({
    ...Co,
    Fp: kc,
    lowS: !1
}, Yi), Rn({
    ...Lo,
    Fp: Pc,
    lowS: !1,
    allowedPrivateKeyLengths: [
        130,
        131,
        132
    ]
}, Wi);
const Dc = Hc, $n = "base10", tt = "base16", Qt = "base64pad", De = "base64url", te = "utf8", Cn = 0, ee = 1, ge = 2, Mc = 0, jo = 1, be = 12, Ln = 32;
function Vc() {
    const t = Tn.utils.randomPrivateKey(), e = Tn.getPublicKey(t);
    return {
        privateKey: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$to$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toString"])(t, tt),
        publicKey: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$to$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toString"])(e, tt)
    };
}
function qc() {
    const t = Zt(Ln);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$to$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toString"])(t, tt);
}
function Kc(t, e) {
    const n = Tn.getSharedSecret((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$from$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromString"])(t, tt), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$from$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromString"])(e, tt)), r = Jf(Te, n, void 0, void 0, Ln);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$to$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toString"])(r, tt);
}
function Fc(t) {
    const e = Te((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$from$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromString"])(t, tt));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$to$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toString"])(e, tt);
}
function zc(t) {
    const e = Te((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$from$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromString"])(t, te));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$to$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toString"])(e, tt);
}
function jn(t) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$from$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromString"])(`${t}`, $n);
}
function Vt(t) {
    return Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$to$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toString"])(t, $n));
}
function ko(t) {
    return t.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function Po(t) {
    const e = t.replace(/-/g, "+").replace(/_/g, "/"), n = (4 - e.length % 4) % 4;
    return e + "=".repeat(n);
}
function Gc(t) {
    const e = jn(typeof t.type < "u" ? t.type : Cn);
    if (Vt(e) === ee && typeof t.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
    const n = typeof t.senderPublicKey < "u" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$from$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromString"])(t.senderPublicKey, tt) : void 0, r = typeof t.iv < "u" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$from$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromString"])(t.iv, tt) : Zt(be), o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$from$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromString"])(t.symKey, tt), s = co(o, r).encrypt((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$from$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromString"])(t.message, te)), i = kn({
        type: e,
        sealed: s,
        iv: r,
        senderPublicKey: n
    });
    return t.encoding === De ? ko(i) : i;
}
function Zc(t) {
    const e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$from$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromString"])(t.symKey, tt), { sealed: n, iv: r } = Me({
        encoded: t.encoded,
        encoding: t.encoding
    }), o = co(e, r).decrypt(n);
    if (o === null) throw new Error("Failed to decrypt");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$to$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toString"])(o, te);
}
function Wc(t, e) {
    const n = jn(ge), r = Zt(be), o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$from$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromString"])(t, te), s = kn({
        type: n,
        sealed: o,
        iv: r
    });
    return e === De ? ko(s) : s;
}
function Yc(t, e) {
    const { sealed: n } = Me({
        encoded: t,
        encoding: e
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$to$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toString"])(n, te);
}
function kn(t) {
    if (Vt(t.type) === ge) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$to$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toString"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$concat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"])([
        t.type,
        t.sealed
    ]), Qt);
    if (Vt(t.type) === ee) {
        if (typeof t.senderPublicKey > "u") throw new Error("Missing sender public key for type 1 envelope");
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$to$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toString"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$concat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"])([
            t.type,
            t.senderPublicKey,
            t.iv,
            t.sealed
        ]), Qt);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$to$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toString"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$concat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"])([
        t.type,
        t.iv,
        t.sealed
    ]), Qt);
}
function Me(t) {
    const e = (t.encoding || Qt) === De ? Po(t.encoded) : t.encoded, n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$from$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromString"])(e, Qt), r = n.slice(Mc, jo), o = jo;
    if (Vt(r) === ee) {
        const a = o + Ln, l = a + be, c = n.slice(o, a), u = n.slice(a, l), h = n.slice(l);
        return {
            type: r,
            sealed: h,
            iv: u,
            senderPublicKey: c
        };
    }
    if (Vt(r) === ge) {
        const a = n.slice(o), l = Zt(be);
        return {
            type: r,
            sealed: a,
            iv: l
        };
    }
    const s = o + be, i = n.slice(o, s), f = n.slice(s);
    return {
        type: r,
        sealed: f,
        iv: i
    };
}
function Xc(t, e) {
    const n = Me({
        encoded: t,
        encoding: e?.encoding
    });
    return Ho({
        type: Vt(n.type),
        senderPublicKey: typeof n.senderPublicKey < "u" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$to$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toString"])(n.senderPublicKey, tt) : void 0,
        receiverPublicKey: e?.receiverPublicKey
    });
}
function Ho(t) {
    const e = t?.type || Cn;
    if (e === ee) {
        if (typeof t?.senderPublicKey > "u") throw new Error("missing sender public key");
        if (typeof t?.receiverPublicKey > "u") throw new Error("missing receiver public key");
    }
    return {
        type: e,
        senderPublicKey: t?.senderPublicKey,
        receiverPublicKey: t?.receiverPublicKey
    };
}
function Jc(t) {
    return t.type === ee && typeof t.senderPublicKey == "string" && typeof t.receiverPublicKey == "string";
}
function Qc(t) {
    return t.type === ge;
}
function Do(t) {
    const e = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(t.x, "base64"), n = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(t.y, "base64");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$concat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"])([
        new Uint8Array([
            4
        ]),
        e,
        n
    ]);
}
function ta(t, e) {
    const [n, r, o] = t.split("."), s = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(Po(o), "base64");
    if (s.length !== 64) throw new Error("Invalid signature length");
    const i = s.slice(0, 32), f = s.slice(32, 64), a = `${n}.${r}`, l = Te(a), c = Do(e);
    if (!Dc.verify((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$concat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concat"])([
        i,
        f
    ]), l, c)) throw new Error("Invalid signature");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$relay$2d$auth$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeJWT"])(t).payload;
}
const Mo = "irn";
function ea(t) {
    return t?.relay || {
        protocol: Mo
    };
}
function na(t) {
    const e = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$relay$2d$api$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RELAY_JSONRPC"][t];
    if (typeof e > "u") throw new Error(`Relay Protocol not supported: ${t}`);
    return e;
}
function Vo(t, e = "-") {
    const n = {}, r = "relay" + e;
    return Object.keys(t).forEach((o)=>{
        if (o.startsWith(r)) {
            const s = o.replace(r, ""), i = t[o];
            n[s] = i;
        }
    }), n;
}
function ra(t) {
    if (!t.includes("wc:")) {
        const l = Qe(t);
        l != null && l.includes("wc:") && (t = l);
    }
    t = t.includes("wc://") ? t.replace("wc://", "") : t, t = t.includes("wc:") ? t.replace("wc:", "") : t;
    const e = t.indexOf(":"), n = t.indexOf("?") !== -1 ? t.indexOf("?") : void 0, r = t.substring(0, e), o = t.substring(e + 1, n).split("@"), s = typeof n < "u" ? t.substring(n) : "", i = new URLSearchParams(s), f = {};
    i.forEach((l, c)=>{
        f[c] = l;
    });
    const a = typeof f.methods == "string" ? f.methods.split(",") : void 0;
    return {
        protocol: r,
        topic: qo(o[0]),
        version: parseInt(o[1], 10),
        symKey: f.symKey,
        relay: Vo(f),
        methods: a,
        expiryTimestamp: f.expiryTimestamp ? parseInt(f.expiryTimestamp, 10) : void 0
    };
}
function qo(t) {
    return t.startsWith("//") ? t.substring(2) : t;
}
function Ko(t, e = "-") {
    const n = "relay", r = {};
    return Object.keys(t).forEach((o)=>{
        const s = o, i = n + e + s;
        t[s] && (r[i] = t[s]);
    }), r;
}
function oa(t) {
    const e = new URLSearchParams, n = Ko(t.relay);
    Object.keys(n).sort().forEach((o)=>{
        e.set(o, n[o]);
    }), e.set("symKey", t.symKey), t.expiryTimestamp && e.set("expiryTimestamp", t.expiryTimestamp.toString()), t.methods && e.set("methods", t.methods.join(","));
    const r = e.toString();
    return `${t.protocol}:${t.topic}@${t.version}?${r}`;
}
function sa(t, e, n) {
    return `${t}?wc_ev=${n}&topic=${e}`;
}
var ia = Object.defineProperty, fa = Object.defineProperties, ca = Object.getOwnPropertyDescriptors, Fo = Object.getOwnPropertySymbols, aa = Object.prototype.hasOwnProperty, ua = Object.prototype.propertyIsEnumerable, zo = (t, e, n)=>e in t ? ia(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : t[e] = n, la = (t, e)=>{
    for(var n in e || (e = {}))aa.call(e, n) && zo(t, n, e[n]);
    if (Fo) for (var n of Fo(e))ua.call(e, n) && zo(t, n, e[n]);
    return t;
}, da = (t, e)=>fa(t, ca(e));
function qt(t) {
    const e = [];
    return t.forEach((n)=>{
        const [r, o] = n.split(":");
        e.push(`${r}:${o}`);
    }), e;
}
function Go(t) {
    const e = [];
    return Object.values(t).forEach((n)=>{
        e.push(...qt(n.accounts));
    }), e;
}
function Zo(t, e) {
    const n = [];
    return Object.values(t).forEach((r)=>{
        qt(r.accounts).includes(e) && n.push(...r.methods);
    }), n;
}
function Wo(t, e) {
    const n = [];
    return Object.values(t).forEach((r)=>{
        qt(r.accounts).includes(e) && n.push(...r.events);
    }), n;
}
function ha(t, e) {
    const n = is(t, e);
    if (n) throw new Error(n.message);
    const r = {};
    for (const [o, s] of Object.entries(t))r[o] = {
        methods: s.methods,
        events: s.events,
        chains: s.accounts.map((i)=>`${i.split(":")[0]}:${i.split(":")[1]}`)
    };
    return r;
}
function pa(t) {
    var e;
    const { proposal: { requiredNamespaces: n, optionalNamespaces: r = {} }, supportedNamespaces: o } = t, s = ye(n), i = ye(r), f = {};
    Object.keys(o).forEach((c)=>{
        const u = o[c].chains, h = o[c].methods, g = o[c].events, w = o[c].accounts;
        u.forEach((y)=>{
            if (!w.some((x)=>x.includes(y))) throw new Error(`No accounts provided for chain ${y} in namespace ${c}`);
        }), f[c] = {
            chains: u,
            methods: h,
            events: g,
            accounts: w
        };
    });
    const a = cs(n, f, "approve()");
    if (a) throw new Error(a.message);
    const l = {};
    if (!Object.keys(n).length && !Object.keys(r).length) return f;
    Object.keys(s).forEach((c)=>{
        const u = o[c].chains.filter((y)=>{
            var x, R;
            return (R = (x = s[c]) == null ? void 0 : x.chains) == null ? void 0 : R.includes(y);
        }), h = o[c].methods.filter((y)=>{
            var x, R;
            return (R = (x = s[c]) == null ? void 0 : x.methods) == null ? void 0 : R.includes(y);
        }), g = o[c].events.filter((y)=>{
            var x, R;
            return (R = (x = s[c]) == null ? void 0 : x.events) == null ? void 0 : R.includes(y);
        }), w = u.map((y)=>o[c].accounts.filter((x)=>x.includes(`${y}:`))).flat();
        l[c] = {
            chains: u,
            methods: h,
            events: g,
            accounts: w
        };
    }), Object.keys(i).forEach((c)=>{
        var u, h, g, w, y, x;
        if (!o[c]) return;
        const R = (h = (u = i[c]) == null ? void 0 : u.chains) == null ? void 0 : h.filter((_)=>o[c].chains.includes(_)), M = o[c].methods.filter((_)=>{
            var k, j;
            return (j = (k = i[c]) == null ? void 0 : k.methods) == null ? void 0 : j.includes(_);
        }), L = o[c].events.filter((_)=>{
            var k, j;
            return (j = (k = i[c]) == null ? void 0 : k.events) == null ? void 0 : j.includes(_);
        }), V = R?.map((_)=>o[c].accounts.filter((k)=>k.includes(`${_}:`))).flat();
        l[c] = {
            chains: ct((g = l[c]) == null ? void 0 : g.chains, R),
            methods: ct((w = l[c]) == null ? void 0 : w.methods, M),
            events: ct((y = l[c]) == null ? void 0 : y.events, L),
            accounts: ct((x = l[c]) == null ? void 0 : x.accounts, V)
        };
    });
    for (const [c, u] of Object.entries(l))(u.accounts.length === 0 || ((e = u?.chains) == null ? void 0 : e.length) === 0) && delete l[c];
    return l;
}
function Pn(t) {
    return t.includes(":");
}
function Yo(t) {
    return Pn(t) ? t.split(":")[0] : t;
}
function ye(t) {
    var e, n, r;
    const o = {};
    if (!Ve(t)) return o;
    for (const [s, i] of Object.entries(t)){
        const f = Pn(s) ? [
            s
        ] : i.chains, a = i.methods || [], l = i.events || [], c = Yo(s);
        o[c] = da(la({}, o[c]), {
            chains: ct(f, (e = o[c]) == null ? void 0 : e.chains),
            methods: ct(a, (n = o[c]) == null ? void 0 : n.methods),
            events: ct(l, (r = o[c]) == null ? void 0 : r.events)
        });
    }
    return o;
}
function Xo(t) {
    const e = {};
    return t?.forEach((n)=>{
        var r;
        const [o, s] = n.split(":");
        e[o] || (e[o] = {
            accounts: [],
            chains: [],
            events: [],
            methods: []
        }), e[o].accounts.push(n), (r = e[o].chains) == null || r.push(`${o}:${s}`);
    }), e;
}
function ga(t, e) {
    e = e.map((r)=>r.replace("did:pkh:", ""));
    const n = Xo(e);
    for (const [r, o] of Object.entries(n))o.methods ? o.methods = ct(o.methods, t) : o.methods = t, o.events = [
        "chainChanged",
        "accountsChanged"
    ];
    return n;
}
function ba(t, e) {
    var n, r, o, s, i, f;
    const a = ye(t), l = ye(e), c = {}, u = Object.keys(a).concat(Object.keys(l));
    for (const h of u)c[h] = {
        chains: ct((n = a[h]) == null ? void 0 : n.chains, (r = l[h]) == null ? void 0 : r.chains),
        methods: ct((o = a[h]) == null ? void 0 : o.methods, (s = l[h]) == null ? void 0 : s.methods),
        events: ct((i = a[h]) == null ? void 0 : i.events, (f = l[h]) == null ? void 0 : f.events)
    };
    return c;
}
const Jo = {
    INVALID_METHOD: {
        message: "Invalid method.",
        code: 1001
    },
    INVALID_EVENT: {
        message: "Invalid event.",
        code: 1002
    },
    INVALID_UPDATE_REQUEST: {
        message: "Invalid update request.",
        code: 1003
    },
    INVALID_EXTEND_REQUEST: {
        message: "Invalid extend request.",
        code: 1004
    },
    INVALID_SESSION_SETTLE_REQUEST: {
        message: "Invalid session settle request.",
        code: 1005
    },
    UNAUTHORIZED_METHOD: {
        message: "Unauthorized method.",
        code: 3001
    },
    UNAUTHORIZED_EVENT: {
        message: "Unauthorized event.",
        code: 3002
    },
    UNAUTHORIZED_UPDATE_REQUEST: {
        message: "Unauthorized update request.",
        code: 3003
    },
    UNAUTHORIZED_EXTEND_REQUEST: {
        message: "Unauthorized extend request.",
        code: 3004
    },
    USER_REJECTED: {
        message: "User rejected.",
        code: 5e3
    },
    USER_REJECTED_CHAINS: {
        message: "User rejected chains.",
        code: 5001
    },
    USER_REJECTED_METHODS: {
        message: "User rejected methods.",
        code: 5002
    },
    USER_REJECTED_EVENTS: {
        message: "User rejected events.",
        code: 5003
    },
    UNSUPPORTED_CHAINS: {
        message: "Unsupported chains.",
        code: 5100
    },
    UNSUPPORTED_METHODS: {
        message: "Unsupported methods.",
        code: 5101
    },
    UNSUPPORTED_EVENTS: {
        message: "Unsupported events.",
        code: 5102
    },
    UNSUPPORTED_ACCOUNTS: {
        message: "Unsupported accounts.",
        code: 5103
    },
    UNSUPPORTED_NAMESPACE_KEY: {
        message: "Unsupported namespace key.",
        code: 5104
    },
    USER_DISCONNECTED: {
        message: "User disconnected.",
        code: 6e3
    },
    SESSION_SETTLEMENT_FAILED: {
        message: "Session settlement failed.",
        code: 7e3
    },
    WC_METHOD_UNSUPPORTED: {
        message: "Unsupported wc_ method.",
        code: 10001
    }
}, Qo = {
    NOT_INITIALIZED: {
        message: "Not initialized.",
        code: 1
    },
    NO_MATCHING_KEY: {
        message: "No matching key.",
        code: 2
    },
    RESTORE_WILL_OVERRIDE: {
        message: "Restore will override.",
        code: 3
    },
    RESUBSCRIBED: {
        message: "Resubscribed.",
        code: 4
    },
    MISSING_OR_INVALID: {
        message: "Missing or invalid.",
        code: 5
    },
    EXPIRED: {
        message: "Expired.",
        code: 6
    },
    UNKNOWN_TYPE: {
        message: "Unknown type.",
        code: 7
    },
    MISMATCHED_TOPIC: {
        message: "Mismatched topic.",
        code: 8
    },
    NON_CONFORMING_NAMESPACES: {
        message: "Non conforming namespaces.",
        code: 9
    }
};
function Et(t, e) {
    const { message: n, code: r } = Qo[t];
    return {
        message: e ? `${n} ${e}` : n,
        code: r
    };
}
function Kt(t, e) {
    const { message: n, code: r } = Jo[t];
    return {
        message: e ? `${n} ${e}` : n,
        code: r
    };
}
function me(t, e) {
    return Array.isArray(t) ? typeof e < "u" && t.length ? t.every(e) : !0 : !1;
}
function Ve(t) {
    return Object.getPrototypeOf(t) === Object.prototype && Object.keys(t).length;
}
function kt(t) {
    return typeof t > "u";
}
function it(t, e) {
    return e && kt(t) ? !0 : typeof t == "string" && !!t.trim().length;
}
function qe(t, e) {
    return e && kt(t) ? !0 : typeof t == "number" && !isNaN(t);
}
function ya(t, e) {
    const { requiredNamespaces: n } = e, r = Object.keys(t.namespaces), o = Object.keys(n);
    let s = !0;
    return It(o, r) ? (r.forEach((i)=>{
        const { accounts: f, methods: a, events: l } = t.namespaces[i], c = qt(f), u = n[i];
        (!It(ve(i, u), c) || !It(u.methods, a) || !It(u.events, l)) && (s = !1);
    }), s) : !1;
}
function we(t) {
    return it(t, !1) && t.includes(":") ? t.split(":").length === 2 : !1;
}
function ts(t) {
    if (it(t, !1) && t.includes(":")) {
        const e = t.split(":");
        if (e.length === 3) {
            const n = e[0] + ":" + e[1];
            return !!e[2] && we(n);
        }
    }
    return !1;
}
function ma(t) {
    function e(n) {
        try {
            return typeof new URL(n) < "u";
        } catch  {
            return !1;
        }
    }
    try {
        if (it(t, !1)) {
            if (e(t)) return !0;
            const n = Qe(t);
            return e(n);
        }
    } catch  {}
    return !1;
}
function wa(t) {
    var e;
    return (e = t?.proposer) == null ? void 0 : e.publicKey;
}
function xa(t) {
    return t?.topic;
}
function va(t, e) {
    let n = null;
    return it(t?.publicKey, !1) || (n = Et("MISSING_OR_INVALID", `${e} controller public key should be a string`)), n;
}
function Hn(t) {
    let e = !0;
    return me(t) ? t.length && (e = t.every((n)=>it(n, !1))) : e = !1, e;
}
function es(t, e, n) {
    let r = null;
    return me(e) && e.length ? e.forEach((o)=>{
        r || we(o) || (r = Kt("UNSUPPORTED_CHAINS", `${n}, chain ${o} should be a string and conform to "namespace:chainId" format`));
    }) : we(t) || (r = Kt("UNSUPPORTED_CHAINS", `${n}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)), r;
}
function ns(t, e, n) {
    let r = null;
    return Object.entries(t).forEach(([o, s])=>{
        if (r) return;
        const i = es(o, ve(o, s), `${e} ${n}`);
        i && (r = i);
    }), r;
}
function rs(t, e) {
    let n = null;
    return me(t) ? t.forEach((r)=>{
        n || ts(r) || (n = Kt("UNSUPPORTED_ACCOUNTS", `${e}, account ${r} should be a string and conform to "namespace:chainId:address" format`));
    }) : n = Kt("UNSUPPORTED_ACCOUNTS", `${e}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), n;
}
function os(t, e) {
    let n = null;
    return Object.values(t).forEach((r)=>{
        if (n) return;
        const o = rs(r?.accounts, `${e} namespace`);
        o && (n = o);
    }), n;
}
function ss(t, e) {
    let n = null;
    return Hn(t?.methods) ? Hn(t?.events) || (n = Kt("UNSUPPORTED_EVENTS", `${e}, events should be an array of strings or empty array for no events`)) : n = Kt("UNSUPPORTED_METHODS", `${e}, methods should be an array of strings or empty array for no methods`), n;
}
function Dn(t, e) {
    let n = null;
    return Object.values(t).forEach((r)=>{
        if (n) return;
        const o = ss(r, `${e}, namespace`);
        o && (n = o);
    }), n;
}
function Ea(t, e, n) {
    let r = null;
    if (t && Ve(t)) {
        const o = Dn(t, e);
        o && (r = o);
        const s = ns(t, e, n);
        s && (r = s);
    } else r = Et("MISSING_OR_INVALID", `${e}, ${n} should be an object with data`);
    return r;
}
function is(t, e) {
    let n = null;
    if (t && Ve(t)) {
        const r = Dn(t, e);
        r && (n = r);
        const o = os(t, e);
        o && (n = o);
    } else n = Et("MISSING_OR_INVALID", `${e}, namespaces should be an object with data`);
    return n;
}
function fs(t) {
    return it(t.protocol, !0);
}
function Ba(t, e) {
    let n = !1;
    return e && !t ? n = !0 : t && me(t) && t.length && t.forEach((r)=>{
        n = fs(r);
    }), n;
}
function Ia(t) {
    return typeof t == "number";
}
function Aa(t) {
    return typeof t < "u" && typeof t !== null;
}
function Sa(t) {
    return !(!t || typeof t != "object" || !t.code || !qe(t.code, !1) || !t.message || !it(t.message, !1));
}
function Na(t) {
    return !(kt(t) || !it(t.method, !1));
}
function Oa(t) {
    return !(kt(t) || kt(t.result) && kt(t.error) || !qe(t.id, !1) || !it(t.jsonrpc, !1));
}
function Ua(t) {
    return !(kt(t) || !it(t.name, !1));
}
function _a(t, e) {
    return !(!we(e) || !Go(t).includes(e));
}
function Ta(t, e, n) {
    return it(n, !1) ? Zo(t, e).includes(n) : !1;
}
function Ra(t, e, n) {
    return it(n, !1) ? Wo(t, e).includes(n) : !1;
}
function cs(t, e, n) {
    let r = null;
    const o = $a(t), s = Ca(e), i = Object.keys(o), f = Object.keys(s), a = as(Object.keys(t)), l = as(Object.keys(e)), c = a.filter((u)=>!l.includes(u));
    return c.length && (r = Et("NON_CONFORMING_NAMESPACES", `${n} namespaces keys don't satisfy requiredNamespaces.
      Required: ${c.toString()}
      Received: ${Object.keys(e).toString()}`)), It(i, f) || (r = Et("NON_CONFORMING_NAMESPACES", `${n} namespaces chains don't satisfy required namespaces.
      Required: ${i.toString()}
      Approved: ${f.toString()}`)), Object.keys(e).forEach((u)=>{
        if (!u.includes(":") || r) return;
        const h = qt(e[u].accounts);
        h.includes(u) || (r = Et("NON_CONFORMING_NAMESPACES", `${n} namespaces accounts don't satisfy namespace accounts for ${u}
        Required: ${u}
        Approved: ${h.toString()}`));
    }), i.forEach((u)=>{
        r || (It(o[u].methods, s[u].methods) ? It(o[u].events, s[u].events) || (r = Et("NON_CONFORMING_NAMESPACES", `${n} namespaces events don't satisfy namespace events for ${u}`)) : r = Et("NON_CONFORMING_NAMESPACES", `${n} namespaces methods don't satisfy namespace methods for ${u}`));
    }), r;
}
function $a(t) {
    const e = {};
    return Object.keys(t).forEach((n)=>{
        var r;
        n.includes(":") ? e[n] = t[n] : (r = t[n].chains) == null || r.forEach((o)=>{
            e[o] = {
                methods: t[n].methods,
                events: t[n].events
            };
        });
    }), e;
}
function as(t) {
    return [
        ...new Set(t.map((e)=>e.includes(":") ? e.split(":")[0] : e))
    ];
}
function Ca(t) {
    const e = {};
    return Object.keys(t).forEach((n)=>{
        if (n.includes(":")) e[n] = t[n];
        else {
            const r = qt(t[n].accounts);
            r?.forEach((o)=>{
                e[o] = {
                    accounts: t[n].accounts.filter((s)=>s.includes(`${o}:`)),
                    methods: t[n].methods,
                    events: t[n].events
                };
            });
        }
    }), e;
}
function La(t, e) {
    return qe(t, !1) && t <= e.max && t >= e.min;
}
function ja() {
    const t = Pt();
    return new Promise((e)=>{
        switch(t){
            case J.browser:
                e(us());
                break;
            case J.reactNative:
                e(ls());
                break;
            case J.node:
                e(ds());
                break;
            default:
                e(!0);
        }
    });
}
function us() {
    return zt() && navigator?.onLine;
}
async function ls() {
    if (Bt() && ("TURBOPACK compile-time value", "object") < "u" && /*TURBOPACK member replacement*/ __turbopack_context__.g != null && /*TURBOPACK member replacement*/ __turbopack_context__.g.NetInfo) {
        const t = await (/*TURBOPACK member replacement*/ __turbopack_context__.g == null ? void 0 : /*TURBOPACK member replacement*/ __turbopack_context__.g.NetInfo.fetch());
        return t?.isConnected;
    }
    return !0;
}
function ds() {
    return !0;
}
function ka(t) {
    switch(Pt()){
        case J.browser:
            hs(t);
            break;
        case J.reactNative:
            ps(t);
            break;
        case J.node:
            break;
    }
}
function hs(t) {
    !Bt() && zt() && (window.addEventListener("online", ()=>t(!0)), window.addEventListener("offline", ()=>t(!1)));
}
function ps(t) {
    Bt() && ("TURBOPACK compile-time value", "object") < "u" && /*TURBOPACK member replacement*/ __turbopack_context__.g != null && /*TURBOPACK member replacement*/ __turbopack_context__.g.NetInfo && /*TURBOPACK member replacement*/ __turbopack_context__.g?.NetInfo.addEventListener((e)=>t(e?.isConnected));
}
function Pa() {
    var t;
    return zt() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$window$2d$getters$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])() ? ((t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$window$2d$getters$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])()) == null ? void 0 : t.visibilityState) === "visible" : !0;
}
const Mn = {};
class Ha {
    static get(e) {
        return Mn[e];
    }
    static set(e, n) {
        Mn[e] = n;
    }
    static delete(e) {
        delete Mn[e];
    }
}
function gs(t) {
    const e = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].decode(t);
    if (e.length < 33) throw new Error("Too short to contain a public key");
    return e.slice(1, 33);
}
function bs({ publicKey: t, signature: e, payload: n }) {
    var r;
    const o = Vn(n.method), s = 128 | parseInt(((r = n.version) == null ? void 0 : r.toString()) || "4"), i = Ma(n.address), f = n.era === "00" ? new Uint8Array([
        0
    ]) : Vn(n.era);
    if (f.length !== 1 && f.length !== 2) throw new Error("Invalid era length");
    const a = parseInt(n.nonce, 16), l = new Uint8Array([
        a & 255,
        a >> 8 & 255
    ]), c = BigInt(`0x${Da(n.tip)}`), u = qa(c), h = new Uint8Array([
        0,
        ...t,
        i,
        ...e,
        ...f,
        ...l,
        ...u,
        ...o
    ]), g = Va(h.length + 1);
    return new Uint8Array([
        ...g,
        s,
        ...h
    ]);
}
function ys(t) {
    const e = Vn(t), n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$blakejs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["blake2b"])(e, void 0, 32);
    return "0x" + __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(n).toString("hex");
}
function Vn(t) {
    return new Uint8Array(t.replace(/^0x/, "").match(/.{1,2}/g).map((e)=>parseInt(e, 16)));
}
function Da(t) {
    return t.startsWith("0x") ? t.slice(2) : t;
}
function Ma(t) {
    const e = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$bs58$2f$src$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].decode(t)[0];
    return e === 42 ? 0 : e === 60 ? 2 : 1;
}
function Va(t) {
    if (t < 64) return new Uint8Array([
        t << 2
    ]);
    if (t < 16384) {
        const e = t << 2 | 1;
        return new Uint8Array([
            e & 255,
            e >> 8 & 255
        ]);
    } else if (t < 1 << 30) {
        const e = t << 2 | 2;
        return new Uint8Array([
            e & 255,
            e >> 8 & 255,
            e >> 16 & 255,
            e >> 24 & 255
        ]);
    } else throw new Error("Compact encoding > 2^30 not supported");
}
function qa(t) {
    if (t < BigInt(1) << BigInt(6)) return new Uint8Array([
        Number(t << BigInt(2))
    ]);
    if (t < BigInt(1) << BigInt(14)) {
        const e = t << BigInt(2) | BigInt(1);
        return new Uint8Array([
            Number(e & BigInt(255)),
            Number(e >> BigInt(8) & BigInt(255))
        ]);
    } else if (t < BigInt(1) << BigInt(30)) {
        const e = t << BigInt(2) | BigInt(2);
        return new Uint8Array([
            Number(e & BigInt(255)),
            Number(e >> BigInt(8) & BigInt(255)),
            Number(e >> BigInt(16) & BigInt(255)),
            Number(e >> BigInt(24) & BigInt(255))
        ]);
    } else throw new Error("BigInt compact encoding not supported > 2^30");
}
function Ka(t) {
    const e = Uint8Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(t.signature, "hex")), n = gs(t.transaction.address), r = bs({
        publicKey: n,
        signature: e,
        payload: t.transaction
    }), o = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(r).toString("hex");
    return ys(o);
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/core/dist/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CORE_CONTEXT",
    ()=>pe,
    "CORE_DEFAULT",
    ()=>It,
    "CORE_PROTOCOL",
    ()=>Ue,
    "CORE_STORAGE_OPTIONS",
    ()=>Tt,
    "CORE_STORAGE_PREFIX",
    ()=>W,
    "CORE_VERSION",
    ()=>Fe,
    "CRYPTO_CLIENT_SEED",
    ()=>Me,
    "CRYPTO_CONTEXT",
    ()=>Ct,
    "CRYPTO_JWT_TTL",
    ()=>Pt,
    "Core",
    ()=>ta,
    "Crypto",
    ()=>Ei,
    "ECHO_CONTEXT",
    ()=>Qt,
    "ECHO_URL",
    ()=>ei,
    "EVENTS_CLIENT_API_URL",
    ()=>ri,
    "EVENTS_STORAGE_CLEANUP_INTERVAL",
    ()=>si,
    "EVENTS_STORAGE_CONTEXT",
    ()=>ii,
    "EVENTS_STORAGE_VERSION",
    ()=>ti,
    "EVENT_CLIENT_AUTHENTICATE_ERRORS",
    ()=>ar,
    "EVENT_CLIENT_AUTHENTICATE_TRACES",
    ()=>or,
    "EVENT_CLIENT_CONTEXT",
    ()=>sr,
    "EVENT_CLIENT_PAIRING_ERRORS",
    ()=>X,
    "EVENT_CLIENT_PAIRING_TRACES",
    ()=>Y,
    "EVENT_CLIENT_SESSION_ERRORS",
    ()=>nr,
    "EVENT_CLIENT_SESSION_TRACES",
    ()=>rr,
    "EXPIRER_CONTEXT",
    ()=>Wt,
    "EXPIRER_DEFAULT_TTL",
    ()=>tr,
    "EXPIRER_EVENTS",
    ()=>q,
    "EXPIRER_STORAGE_VERSION",
    ()=>Ht,
    "EchoClient",
    ()=>qi,
    "EventClient",
    ()=>Wi,
    "Expirer",
    ()=>Ki,
    "HISTORY_CONTEXT",
    ()=>qt,
    "HISTORY_EVENTS",
    ()=>V,
    "HISTORY_STORAGE_VERSION",
    ()=>Gt,
    "JsonRpcHistory",
    ()=>Mi,
    "KEYCHAIN_CONTEXT",
    ()=>St,
    "KEYCHAIN_STORAGE_VERSION",
    ()=>Ot,
    "KeyChain",
    ()=>_i,
    "MESSAGES_CONTEXT",
    ()=>Rt,
    "MESSAGES_STORAGE_VERSION",
    ()=>At,
    "MESSAGE_DIRECTION",
    ()=>ye,
    "MessageTracker",
    ()=>Ti,
    "PAIRING_CONTEXT",
    ()=>Bt,
    "PAIRING_DEFAULT_TTL",
    ()=>er,
    "PAIRING_EVENTS",
    ()=>ae,
    "PAIRING_RPC_OPTS",
    ()=>oe,
    "PAIRING_STORAGE_VERSION",
    ()=>Vt,
    "PENDING_SUB_RESOLUTION_TIMEOUT",
    ()=>Qs,
    "PUBLISHER_CONTEXT",
    ()=>Nt,
    "PUBLISHER_DEFAULT_TTL",
    ()=>xt,
    "Pairing",
    ()=>Fi,
    "RELAYER_CONTEXT",
    ()=>Lt,
    "RELAYER_DEFAULT_LOGGER",
    ()=>zt,
    "RELAYER_DEFAULT_PROTOCOL",
    ()=>$t,
    "RELAYER_DEFAULT_RELAY_URL",
    ()=>Ke,
    "RELAYER_EVENTS",
    ()=>C,
    "RELAYER_PROVIDER_EVENTS",
    ()=>M,
    "RELAYER_RECONNECT_TIMEOUT",
    ()=>jt,
    "RELAYER_SDK_VERSION",
    ()=>Pe,
    "RELAYER_STORAGE_OPTIONS",
    ()=>Js,
    "RELAYER_SUBSCRIBER_SUFFIX",
    ()=>kt,
    "RELAYER_TRANSPORT_CUTOFF",
    ()=>Xs,
    "Relayer",
    ()=>xi,
    "STORE_STORAGE_VERSION",
    ()=>Ut,
    "SUBSCRIBER_CONTEXT",
    ()=>Mt,
    "SUBSCRIBER_DEFAULT_TTL",
    ()=>Zs,
    "SUBSCRIBER_EVENTS",
    ()=>U,
    "SUBSCRIBER_STORAGE_VERSION",
    ()=>Kt,
    "Store",
    ()=>Ui,
    "Subscriber",
    ()=>Oi,
    "TRANSPORT_TYPES",
    ()=>ee,
    "TRUSTED_VERIFY_URLS",
    ()=>Zt,
    "VERIFY_CONTEXT",
    ()=>Yt,
    "VERIFY_SERVER",
    ()=>be,
    "VERIFY_SERVER_V3",
    ()=>Xt,
    "Verify",
    ()=>Bi,
    "WALLETCONNECT_CLIENT_ID",
    ()=>Ft,
    "WALLETCONNECT_LINK_MODE_APPS",
    ()=>Be,
    "default",
    ()=>Oe
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/events/events.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$heartbeat$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/heartbeat/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$keyvaluestorage$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/keyvaluestorage/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/logger/dist/index.es.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__pino$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/pino/browser.js [app-client] (ecmascript) <export default as pino>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$types$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/types/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/safe-json/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$relay$2d$auth$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/relay-auth/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/uint8arrays/esm/src/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$to$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/uint8arrays/esm/src/to-string.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-provider/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/validators.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$ws$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-ws-connection/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$window$2d$getters$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/window-getters/dist/cjs/index.js [app-client] (ecmascript)");
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
const Ue = "wc", Fe = 2, pe = "core", W = `${Ue}@2:${pe}:`, It = {
    name: pe,
    logger: "error"
}, Tt = {
    database: ":memory:"
}, Ct = "crypto", Me = "client_ed25519_seed", Pt = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_DAY"], St = "keychain", Ot = "0.3", Rt = "messages", At = "0.3", xt = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIX_HOURS"], Nt = "publisher", $t = "irn", zt = "error", Ke = "wss://relay.walletconnect.org", Lt = "relayer", C = {
    message: "relayer_message",
    message_ack: "relayer_message_ack",
    connect: "relayer_connect",
    disconnect: "relayer_disconnect",
    error: "relayer_error",
    connection_stalled: "relayer_connection_stalled",
    transport_closed: "relayer_transport_closed",
    publish: "relayer_publish"
}, kt = "_subscription", M = {
    payload: "payload",
    connect: "connect",
    disconnect: "disconnect",
    error: "error"
}, jt = .1, Js = {
    database: ":memory:"
}, Pe = "2.21.8", Xs = 1e4, ee = {
    link_mode: "link_mode",
    relay: "relay"
}, ye = {
    inbound: "inbound",
    outbound: "outbound"
}, Ut = "0.3", Ft = "WALLETCONNECT_CLIENT_ID", Be = "WALLETCONNECT_LINK_MODE_APPS", U = {
    created: "subscription_created",
    deleted: "subscription_deleted",
    expired: "subscription_expired",
    disabled: "subscription_disabled",
    sync: "subscription_sync",
    resubscribed: "subscription_resubscribed"
}, Zs = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["THIRTY_DAYS"], Mt = "subscription", Kt = "0.3", Qs = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_SECONDS"] * 1e3, Bt = "pairing", Vt = "0.3", er = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["THIRTY_DAYS"], oe = {
    wc_pairingDelete: {
        req: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_DAY"],
            prompt: !1,
            tag: 1e3
        },
        res: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_DAY"],
            prompt: !1,
            tag: 1001
        }
    },
    wc_pairingPing: {
        req: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["THIRTY_SECONDS"],
            prompt: !1,
            tag: 1002
        },
        res: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["THIRTY_SECONDS"],
            prompt: !1,
            tag: 1003
        }
    },
    unregistered_method: {
        req: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_DAY"],
            prompt: !1,
            tag: 0
        },
        res: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_DAY"],
            prompt: !1,
            tag: 0
        }
    }
}, ae = {
    create: "pairing_create",
    expire: "pairing_expire",
    delete: "pairing_delete",
    ping: "pairing_ping"
}, V = {
    created: "history_created",
    updated: "history_updated",
    deleted: "history_deleted",
    sync: "history_sync"
}, qt = "history", Gt = "0.3", Wt = "expirer", q = {
    created: "expirer_created",
    deleted: "expirer_deleted",
    expired: "expirer_expired",
    sync: "expirer_sync"
}, Ht = "0.3", tr = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_DAY"], Yt = "verify-api", ir = "https://verify.walletconnect.com", Jt = "https://verify.walletconnect.org", be = Jt, Xt = `${be}/v3`, Zt = [
    ir,
    Jt
], Qt = "echo", ei = "https://echo.walletconnect.com", sr = "event-client", Y = {
    pairing_started: "pairing_started",
    pairing_uri_validation_success: "pairing_uri_validation_success",
    pairing_uri_not_expired: "pairing_uri_not_expired",
    store_new_pairing: "store_new_pairing",
    subscribing_pairing_topic: "subscribing_pairing_topic",
    subscribe_pairing_topic_success: "subscribe_pairing_topic_success",
    existing_pairing: "existing_pairing",
    pairing_not_expired: "pairing_not_expired",
    emit_inactive_pairing: "emit_inactive_pairing",
    emit_session_proposal: "emit_session_proposal",
    subscribing_to_pairing_topic: "subscribing_to_pairing_topic"
}, X = {
    no_wss_connection: "no_wss_connection",
    no_internet_connection: "no_internet_connection",
    malformed_pairing_uri: "malformed_pairing_uri",
    active_pairing_already_exists: "active_pairing_already_exists",
    subscribe_pairing_topic_failure: "subscribe_pairing_topic_failure",
    pairing_expired: "pairing_expired",
    proposal_expired: "proposal_expired",
    proposal_listener_not_found: "proposal_listener_not_found"
}, rr = {
    session_approve_started: "session_approve_started",
    proposal_not_expired: "proposal_not_expired",
    session_namespaces_validation_success: "session_namespaces_validation_success",
    create_session_topic: "create_session_topic",
    subscribing_session_topic: "subscribing_session_topic",
    subscribe_session_topic_success: "subscribe_session_topic_success",
    publishing_session_approve: "publishing_session_approve",
    session_approve_publish_success: "session_approve_publish_success",
    store_session: "store_session",
    publishing_session_settle: "publishing_session_settle",
    session_settle_publish_success: "session_settle_publish_success"
}, nr = {
    no_internet_connection: "no_internet_connection",
    no_wss_connection: "no_wss_connection",
    proposal_expired: "proposal_expired",
    subscribe_session_topic_failure: "subscribe_session_topic_failure",
    session_approve_publish_failure: "session_approve_publish_failure",
    session_settle_publish_failure: "session_settle_publish_failure",
    session_approve_namespace_validation_failure: "session_approve_namespace_validation_failure",
    proposal_not_found: "proposal_not_found"
}, or = {
    authenticated_session_approve_started: "authenticated_session_approve_started",
    authenticated_session_not_expired: "authenticated_session_not_expired",
    chains_caip2_compliant: "chains_caip2_compliant",
    chains_evm_compliant: "chains_evm_compliant",
    create_authenticated_session_topic: "create_authenticated_session_topic",
    cacaos_verified: "cacaos_verified",
    store_authenticated_session: "store_authenticated_session",
    subscribing_authenticated_session_topic: "subscribing_authenticated_session_topic",
    subscribe_authenticated_session_topic_success: "subscribe_authenticated_session_topic_success",
    publishing_authenticated_session_approve: "publishing_authenticated_session_approve",
    authenticated_session_approve_publish_success: "authenticated_session_approve_publish_success"
}, ar = {
    no_internet_connection: "no_internet_connection",
    no_wss_connection: "no_wss_connection",
    missing_session_authenticate_request: "missing_session_authenticate_request",
    session_authenticate_request_expired: "session_authenticate_request_expired",
    chains_caip2_compliant_failure: "chains_caip2_compliant_failure",
    chains_evm_compliant_failure: "chains_evm_compliant_failure",
    invalid_cacao: "invalid_cacao",
    subscribe_authenticated_session_topic_failure: "subscribe_authenticated_session_topic_failure",
    authenticated_session_approve_publish_failure: "authenticated_session_approve_publish_failure",
    authenticated_session_pending_request_not_found: "authenticated_session_pending_request_not_found"
}, ti = .1, ii = "event-client", si = 86400, ri = "https://pulse.walletconnect.org/batch";
function cr(r, e) {
    if (r.length >= 255) throw new TypeError("Alphabet too long");
    for(var t = new Uint8Array(256), i = 0; i < t.length; i++)t[i] = 255;
    for(var s = 0; s < r.length; s++){
        var n = r.charAt(s), o = n.charCodeAt(0);
        if (t[o] !== 255) throw new TypeError(n + " is ambiguous");
        t[o] = s;
    }
    var a = r.length, c = r.charAt(0), h = Math.log(a) / Math.log(256), l = Math.log(256) / Math.log(a);
    function p(u) {
        if (u instanceof Uint8Array || (ArrayBuffer.isView(u) ? u = new Uint8Array(u.buffer, u.byteOffset, u.byteLength) : Array.isArray(u) && (u = Uint8Array.from(u))), !(u instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
        if (u.length === 0) return "";
        for(var m = 0, D = 0, _ = 0, E = u.length; _ !== E && u[_] === 0;)_++, m++;
        for(var L = (E - _) * l + 1 >>> 0, I = new Uint8Array(L); _ !== E;){
            for(var k = u[_], T = 0, S = L - 1; (k !== 0 || T < D) && S !== -1; S--, T++)k += 256 * I[S] >>> 0, I[S] = k % a >>> 0, k = k / a >>> 0;
            if (k !== 0) throw new Error("Non-zero carry");
            D = T, _++;
        }
        for(var O = L - D; O !== L && I[O] === 0;)O++;
        for(var te = c.repeat(m); O < L; ++O)te += r.charAt(I[O]);
        return te;
    }
    function y(u) {
        if (typeof u != "string") throw new TypeError("Expected String");
        if (u.length === 0) return new Uint8Array;
        var m = 0;
        if (u[m] !== " ") {
            for(var D = 0, _ = 0; u[m] === c;)D++, m++;
            for(var E = (u.length - m) * h + 1 >>> 0, L = new Uint8Array(E); u[m];){
                var I = t[u.charCodeAt(m)];
                if (I === 255) return;
                for(var k = 0, T = E - 1; (I !== 0 || k < _) && T !== -1; T--, k++)I += a * L[T] >>> 0, L[T] = I % 256 >>> 0, I = I / 256 >>> 0;
                if (I !== 0) throw new Error("Non-zero carry");
                _ = k, m++;
            }
            if (u[m] !== " ") {
                for(var S = E - _; S !== E && L[S] === 0;)S++;
                for(var O = new Uint8Array(D + (E - S)), te = D; S !== E;)O[te++] = L[S++];
                return O;
            }
        }
    }
    function w(u) {
        var m = y(u);
        if (m) return m;
        throw new Error(`Non-${e} character`);
    }
    return {
        encode: p,
        decodeUnsafe: y,
        decode: w
    };
}
var hr = cr, lr = hr;
const ni = (r)=>{
    if (r instanceof Uint8Array && r.constructor.name === "Uint8Array") return r;
    if (r instanceof ArrayBuffer) return new Uint8Array(r);
    if (ArrayBuffer.isView(r)) return new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
    throw new Error("Unknown type, must be binary type");
}, ur = (r)=>new TextEncoder().encode(r), dr = (r)=>new TextDecoder().decode(r);
class gr {
    constructor(e, t, i){
        this.name = e, this.prefix = t, this.baseEncode = i;
    }
    encode(e) {
        if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`;
        throw Error("Unknown type, must be binary type");
    }
}
class pr {
    constructor(e, t, i){
        if (this.name = e, this.prefix = t, t.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
        this.prefixCodePoint = t.codePointAt(0), this.baseDecode = i;
    }
    decode(e) {
        if (typeof e == "string") {
            if (e.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
            return this.baseDecode(e.slice(this.prefix.length));
        } else throw Error("Can only multibase decode strings");
    }
    or(e) {
        return oi(this, e);
    }
}
class yr {
    constructor(e){
        this.decoders = e;
    }
    or(e) {
        return oi(this, e);
    }
    decode(e) {
        const t = e[0], i = this.decoders[t];
        if (i) return i.decode(e);
        throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
}
const oi = (r, e)=>new yr({
        ...r.decoders || {
            [r.prefix]: r
        },
        ...e.decoders || {
            [e.prefix]: e
        }
    });
class br {
    constructor(e, t, i, s){
        this.name = e, this.prefix = t, this.baseEncode = i, this.baseDecode = s, this.encoder = new gr(e, t, i), this.decoder = new pr(e, t, s);
    }
    encode(e) {
        return this.encoder.encode(e);
    }
    decode(e) {
        return this.decoder.decode(e);
    }
}
const Se = ({ name: r, prefix: e, encode: t, decode: i })=>new br(r, e, t, i), me = ({ prefix: r, name: e, alphabet: t })=>{
    const { encode: i, decode: s } = lr(t, e);
    return Se({
        prefix: r,
        name: e,
        encode: i,
        decode: (n)=>ni(s(n))
    });
}, mr = (r, e, t, i)=>{
    const s = {};
    for(let l = 0; l < e.length; ++l)s[e[l]] = l;
    let n = r.length;
    for(; r[n - 1] === "=";)--n;
    const o = new Uint8Array(n * t / 8 | 0);
    let a = 0, c = 0, h = 0;
    for(let l = 0; l < n; ++l){
        const p = s[r[l]];
        if (p === void 0) throw new SyntaxError(`Non-${i} character`);
        c = c << t | p, a += t, a >= 8 && (a -= 8, o[h++] = 255 & c >> a);
    }
    if (a >= t || 255 & c << 8 - a) throw new SyntaxError("Unexpected end of data");
    return o;
}, fr = (r, e, t)=>{
    const i = e[e.length - 1] === "=", s = (1 << t) - 1;
    let n = "", o = 0, a = 0;
    for(let c = 0; c < r.length; ++c)for(a = a << 8 | r[c], o += 8; o > t;)o -= t, n += e[s & a >> o];
    if (o && (n += e[s & a << t - o]), i) for(; n.length * t & 7;)n += "=";
    return n;
}, A = ({ name: r, prefix: e, bitsPerChar: t, alphabet: i })=>Se({
        prefix: e,
        name: r,
        encode (s) {
            return fr(s, i, t);
        },
        decode (s) {
            return mr(s, i, t, r);
        }
    }), Dr = Se({
    prefix: "\0",
    name: "identity",
    encode: (r)=>dr(r),
    decode: (r)=>ur(r)
});
var vr = Object.freeze({
    __proto__: null,
    identity: Dr
});
const wr = A({
    prefix: "0",
    name: "base2",
    alphabet: "01",
    bitsPerChar: 1
});
var _r = Object.freeze({
    __proto__: null,
    base2: wr
});
const Er = A({
    prefix: "7",
    name: "base8",
    alphabet: "01234567",
    bitsPerChar: 3
});
var Ir = Object.freeze({
    __proto__: null,
    base8: Er
});
const Tr = me({
    prefix: "9",
    name: "base10",
    alphabet: "0123456789"
});
var Cr = Object.freeze({
    __proto__: null,
    base10: Tr
});
const Pr = A({
    prefix: "f",
    name: "base16",
    alphabet: "0123456789abcdef",
    bitsPerChar: 4
}), Sr = A({
    prefix: "F",
    name: "base16upper",
    alphabet: "0123456789ABCDEF",
    bitsPerChar: 4
});
var Or = Object.freeze({
    __proto__: null,
    base16: Pr,
    base16upper: Sr
});
const Rr = A({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5
}), Ar = A({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5
}), xr = A({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5
}), Nr = A({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5
}), $r = A({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5
}), zr = A({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5
}), Lr = A({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5
}), kr = A({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5
}), jr = A({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5
});
var Ur = Object.freeze({
    __proto__: null,
    base32: Rr,
    base32upper: Ar,
    base32pad: xr,
    base32padupper: Nr,
    base32hex: $r,
    base32hexupper: zr,
    base32hexpad: Lr,
    base32hexpadupper: kr,
    base32z: jr
});
const Fr = me({
    prefix: "k",
    name: "base36",
    alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
}), Mr = me({
    prefix: "K",
    name: "base36upper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});
var Kr = Object.freeze({
    __proto__: null,
    base36: Fr,
    base36upper: Mr
});
const Br = me({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
}), Vr = me({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
var qr = Object.freeze({
    __proto__: null,
    base58btc: Br,
    base58flickr: Vr
});
const Gr = A({
    prefix: "m",
    name: "base64",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    bitsPerChar: 6
}), Wr = A({
    prefix: "M",
    name: "base64pad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    bitsPerChar: 6
}), Hr = A({
    prefix: "u",
    name: "base64url",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bitsPerChar: 6
}), Yr = A({
    prefix: "U",
    name: "base64urlpad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    bitsPerChar: 6
});
var Jr = Object.freeze({
    __proto__: null,
    base64: Gr,
    base64pad: Wr,
    base64url: Hr,
    base64urlpad: Yr
});
const ai = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}"), Xr = ai.reduce((r, e, t)=>(r[t] = e, r), []), Zr = ai.reduce((r, e, t)=>(r[e.codePointAt(0)] = t, r), []);
function Qr(r) {
    return r.reduce((e, t)=>(e += Xr[t], e), "");
}
function en(r) {
    const e = [];
    for (const t of r){
        const i = Zr[t.codePointAt(0)];
        if (i === void 0) throw new Error(`Non-base256emoji character: ${t}`);
        e.push(i);
    }
    return new Uint8Array(e);
}
const tn = Se({
    prefix: "\u{1F680}",
    name: "base256emoji",
    encode: Qr,
    decode: en
});
var sn = Object.freeze({
    __proto__: null,
    base256emoji: tn
}), rn = hi, ci = 128, nn = 127, on = ~nn, an = Math.pow(2, 31);
function hi(r, e, t) {
    e = e || [], t = t || 0;
    for(var i = t; r >= an;)e[t++] = r & 255 | ci, r /= 128;
    for(; r & on;)e[t++] = r & 255 | ci, r >>>= 7;
    return e[t] = r | 0, hi.bytes = t - i + 1, e;
}
var cn = Ve, hn = 128, li = 127;
function Ve(r, i) {
    var t = 0, i = i || 0, s = 0, n = i, o, a = r.length;
    do {
        if (n >= a) throw Ve.bytes = 0, new RangeError("Could not decode varint");
        o = r[n++], t += s < 28 ? (o & li) << s : (o & li) * Math.pow(2, s), s += 7;
    }while (o >= hn)
    return Ve.bytes = n - i, t;
}
var ln = Math.pow(2, 7), un = Math.pow(2, 14), dn = Math.pow(2, 21), gn = Math.pow(2, 28), pn = Math.pow(2, 35), yn = Math.pow(2, 42), bn = Math.pow(2, 49), mn = Math.pow(2, 56), fn = Math.pow(2, 63), Dn = function(r) {
    return r < ln ? 1 : r < un ? 2 : r < dn ? 3 : r < gn ? 4 : r < pn ? 5 : r < yn ? 6 : r < bn ? 7 : r < mn ? 8 : r < fn ? 9 : 10;
}, vn = {
    encode: rn,
    decode: cn,
    encodingLength: Dn
}, ui = vn;
const di = (r, e, t = 0)=>(ui.encode(r, e, t), e), gi = (r)=>ui.encodingLength(r), qe = (r, e)=>{
    const t = e.byteLength, i = gi(r), s = i + gi(t), n = new Uint8Array(s + t);
    return di(r, n, 0), di(t, n, i), n.set(e, s), new wn(r, t, e, n);
};
class wn {
    constructor(e, t, i, s){
        this.code = e, this.size = t, this.digest = i, this.bytes = s;
    }
}
const pi = ({ name: r, code: e, encode: t })=>new _n(r, e, t);
class _n {
    constructor(e, t, i){
        this.name = e, this.code = t, this.encode = i;
    }
    digest(e) {
        if (e instanceof Uint8Array) {
            const t = this.encode(e);
            return t instanceof Uint8Array ? qe(this.code, t) : t.then((i)=>qe(this.code, i));
        } else throw Error("Unknown type, must be binary type");
    }
}
const yi = (r)=>async (e)=>new Uint8Array(await crypto.subtle.digest(r, e)), En = pi({
    name: "sha2-256",
    code: 18,
    encode: yi("SHA-256")
}), In = pi({
    name: "sha2-512",
    code: 19,
    encode: yi("SHA-512")
});
var Tn = Object.freeze({
    __proto__: null,
    sha256: En,
    sha512: In
});
const bi = 0, Cn = "identity", mi = ni, Pn = (r)=>qe(bi, mi(r)), Sn = {
    code: bi,
    name: Cn,
    encode: mi,
    digest: Pn
};
var On = Object.freeze({
    __proto__: null,
    identity: Sn
});
new TextEncoder, new TextDecoder;
const fi = {
    ...vr,
    ..._r,
    ...Ir,
    ...Cr,
    ...Or,
    ...Ur,
    ...Kr,
    ...qr,
    ...Jr,
    ...sn
};
({
    ...Tn,
    ...On
});
function Di(r) {
    return globalThis.Buffer != null ? new Uint8Array(r.buffer, r.byteOffset, r.byteLength) : r;
}
function Rn(r = 0) {
    return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? Di(globalThis.Buffer.allocUnsafe(r)) : new Uint8Array(r);
}
function vi(r, e, t, i) {
    return {
        name: r,
        prefix: e,
        encoder: {
            name: r,
            prefix: e,
            encode: t
        },
        decoder: {
            decode: i
        }
    };
}
const wi = vi("utf8", "u", (r)=>"u" + new TextDecoder("utf8").decode(r), (r)=>new TextEncoder().encode(r.substring(1))), Ge = vi("ascii", "a", (r)=>{
    let e = "a";
    for(let t = 0; t < r.length; t++)e += String.fromCharCode(r[t]);
    return e;
}, (r)=>{
    r = r.substring(1);
    const e = Rn(r.length);
    for(let t = 0; t < r.length; t++)e[t] = r.charCodeAt(t);
    return e;
}), An = {
    utf8: wi,
    "utf-8": wi,
    hex: fi.base16,
    latin1: Ge,
    ascii: Ge,
    binary: Ge,
    ...fi
};
function xn(r, e = "utf8") {
    const t = An[e];
    if (!t) throw new Error(`Unsupported encoding "${e}"`);
    return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? Di(globalThis.Buffer.from(r, "utf-8")) : t.decoder.decode(`${t.prefix}${r}`);
}
var Nn = Object.defineProperty, $n = (r, e, t)=>e in r ? Nn(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, J = (r, e, t)=>$n(r, typeof e != "symbol" ? e + "" : e, t);
class _i {
    constructor(e, t){
        this.core = e, this.logger = t, J(this, "keychain", new Map), J(this, "name", St), J(this, "version", Ot), J(this, "initialized", !1), J(this, "storagePrefix", W), J(this, "init", async ()=>{
            if (!this.initialized) {
                const i = await this.getKeyChain();
                typeof i < "u" && (this.keychain = i), this.initialized = !0;
            }
        }), J(this, "has", (i)=>(this.isInitialized(), this.keychain.has(i))), J(this, "set", async (i, s)=>{
            this.isInitialized(), this.keychain.set(i, s), await this.persist();
        }), J(this, "get", (i)=>{
            this.isInitialized();
            const s = this.keychain.get(i);
            if (typeof s > "u") {
                const { message: n } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("NO_MATCHING_KEY", `${this.name}: ${i}`);
                throw new Error(n);
            }
            return s;
        }), J(this, "del", async (i)=>{
            this.isInitialized(), this.keychain.delete(i), await this.persist();
        }), this.core = e, this.logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateChildLogger"])(t, this.name);
    }
    get context() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLoggerContext"])(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
    }
    async setKeyChain(e) {
        await this.core.storage.setItem(this.storageKey, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapToObj"])(e));
    }
    async getKeyChain() {
        const e = await this.core.storage.getItem(this.storageKey);
        return typeof e < "u" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["objToMap"])(e) : void 0;
    }
    async persist() {
        await this.setKeyChain(this.keychain);
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
}
var zn = Object.defineProperty, Ln = (r, e, t)=>e in r ? zn(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, x = (r, e, t)=>Ln(r, typeof e != "symbol" ? e + "" : e, t);
class Ei {
    constructor(e, t, i){
        this.core = e, this.logger = t, x(this, "name", Ct), x(this, "keychain"), x(this, "randomSessionIdentifier", (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateRandomBytes32"])()), x(this, "initialized", !1), x(this, "init", async ()=>{
            this.initialized || (await this.keychain.init(), this.initialized = !0);
        }), x(this, "hasKeys", (s)=>(this.isInitialized(), this.keychain.has(s))), x(this, "getClientId", async ()=>{
            this.isInitialized();
            const s = await this.getClientSeed(), n = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$relay$2d$auth$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateKeyPair"](s);
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$relay$2d$auth$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeIss"](n.publicKey);
        }), x(this, "generateKeyPair", ()=>{
            this.isInitialized();
            const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateKeyPair"])();
            return this.setPrivateKey(s.publicKey, s.privateKey);
        }), x(this, "signJWT", async (s)=>{
            this.isInitialized();
            const n = await this.getClientSeed(), o = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$relay$2d$auth$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateKeyPair"](n), a = this.randomSessionIdentifier, c = Pt;
            return await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$relay$2d$auth$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signJWT"](a, s, c, o);
        }), x(this, "generateSharedKey", (s, n, o)=>{
            this.isInitialized();
            const a = this.getPrivateKey(s), c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deriveSymKey"])(a, n);
            return this.setSymKey(c, o);
        }), x(this, "setSymKey", async (s, n)=>{
            this.isInitialized();
            const o = n || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashKey"])(s);
            return await this.keychain.set(o, s), o;
        }), x(this, "deleteKeyPair", async (s)=>{
            this.isInitialized(), await this.keychain.del(s);
        }), x(this, "deleteSymKey", async (s)=>{
            this.isInitialized(), await this.keychain.del(s);
        }), x(this, "encode", async (s, n, o)=>{
            this.isInitialized();
            const a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateEncoding"])(o), c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeJsonStringify"])(n);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTypeTwoEnvelope"])(a)) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeTypeTwoEnvelope"])(c, o?.encoding);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTypeOneEnvelope"])(a)) {
                const y = a.senderPublicKey, w = a.receiverPublicKey;
                s = await this.generateSharedKey(y, w);
            }
            const h = this.getSymKey(s), { type: l, senderPublicKey: p } = a;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encrypt"])({
                type: l,
                symKey: h,
                message: c,
                senderPublicKey: p,
                encoding: o?.encoding
            });
        }), x(this, "decode", async (s, n, o)=>{
            this.isInitialized();
            const a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateDecoding"])(n, o);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTypeTwoEnvelope"])(a)) {
                const c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeTypeTwoEnvelope"])(n, o?.encoding);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeJsonParse"])(c);
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTypeOneEnvelope"])(a)) {
                const c = a.receiverPublicKey, h = a.senderPublicKey;
                s = await this.generateSharedKey(c, h);
            }
            try {
                const c = this.getSymKey(s), h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decrypt"])({
                    symKey: c,
                    encoded: n,
                    encoding: o?.encoding
                });
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeJsonParse"])(h);
            } catch (c) {
                this.logger.error(`Failed to decode message from topic: '${s}', clientId: '${await this.getClientId()}'`), this.logger.error(c);
            }
        }), x(this, "getPayloadType", (s, n = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE64"])=>{
            const o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deserialize"])({
                encoded: s,
                encoding: n
            });
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeTypeByte"])(o.type);
        }), x(this, "getPayloadSenderPublicKey", (s, n = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE64"])=>{
            const o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deserialize"])({
                encoded: s,
                encoding: n
            });
            return o.senderPublicKey ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$uint8arrays$2f$esm$2f$src$2f$to$2d$string$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toString"])(o.senderPublicKey, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE16"]) : void 0;
        }), this.core = e, this.logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateChildLogger"])(t, this.name), this.keychain = i || new _i(this.core, this.logger);
    }
    get context() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLoggerContext"])(this.logger);
    }
    async setPrivateKey(e, t) {
        return await this.keychain.set(e, t), e;
    }
    getPrivateKey(e) {
        return this.keychain.get(e);
    }
    async getClientSeed() {
        let e = "";
        try {
            e = this.keychain.get(Me);
        } catch  {
            e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateRandomBytes32"])(), await this.keychain.set(Me, e);
        }
        return xn(e, "base16");
    }
    getSymKey(e) {
        return this.keychain.get(e);
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
}
var kn = Object.defineProperty, jn = Object.defineProperties, Un = Object.getOwnPropertyDescriptors, Ii = Object.getOwnPropertySymbols, Fn = Object.prototype.hasOwnProperty, Mn = Object.prototype.propertyIsEnumerable, We = (r, e, t)=>e in r ? kn(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, Kn = (r, e)=>{
    for(var t in e || (e = {}))Fn.call(e, t) && We(r, t, e[t]);
    if (Ii) for (var t of Ii(e))Mn.call(e, t) && We(r, t, e[t]);
    return r;
}, Bn = (r, e)=>jn(r, Un(e)), K = (r, e, t)=>We(r, typeof e != "symbol" ? e + "" : e, t);
class Ti extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$types$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IMessageTracker"] {
    constructor(e, t){
        super(e, t), this.logger = e, this.core = t, K(this, "messages", new Map), K(this, "messagesWithoutClientAck", new Map), K(this, "name", Rt), K(this, "version", At), K(this, "initialized", !1), K(this, "storagePrefix", W), K(this, "init", async ()=>{
            if (!this.initialized) {
                this.logger.trace("Initialized");
                try {
                    const i = await this.getRelayerMessages();
                    typeof i < "u" && (this.messages = i);
                    const s = await this.getRelayerMessagesWithoutClientAck();
                    typeof s < "u" && (this.messagesWithoutClientAck = s), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({
                        type: "method",
                        method: "restore",
                        size: this.messages.size
                    });
                } catch (i) {
                    this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(i);
                } finally{
                    this.initialized = !0;
                }
            }
        }), K(this, "set", async (i, s, n)=>{
            this.isInitialized();
            const o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashMessage"])(s);
            let a = this.messages.get(i);
            if (typeof a > "u" && (a = {}), typeof a[o] < "u") return o;
            if (a[o] = s, this.messages.set(i, a), n === ye.inbound) {
                const c = this.messagesWithoutClientAck.get(i) || {};
                this.messagesWithoutClientAck.set(i, Bn(Kn({}, c), {
                    [o]: s
                }));
            }
            return await this.persist(), o;
        }), K(this, "get", (i)=>{
            this.isInitialized();
            let s = this.messages.get(i);
            return typeof s > "u" && (s = {}), s;
        }), K(this, "getWithoutAck", (i)=>{
            this.isInitialized();
            const s = {};
            for (const n of i){
                const o = this.messagesWithoutClientAck.get(n) || {};
                s[n] = Object.values(o);
            }
            return s;
        }), K(this, "has", (i, s)=>{
            this.isInitialized();
            const n = this.get(i), o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashMessage"])(s);
            return typeof n[o] < "u";
        }), K(this, "ack", async (i, s)=>{
            this.isInitialized();
            const n = this.messagesWithoutClientAck.get(i);
            if (typeof n > "u") return;
            const o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashMessage"])(s);
            delete n[o], Object.keys(n).length === 0 ? this.messagesWithoutClientAck.delete(i) : this.messagesWithoutClientAck.set(i, n), await this.persist();
        }), K(this, "del", async (i)=>{
            this.isInitialized(), this.messages.delete(i), this.messagesWithoutClientAck.delete(i), await this.persist();
        }), this.logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateChildLogger"])(e, this.name), this.core = t;
    }
    get context() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLoggerContext"])(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
    }
    get storageKeyWithoutClientAck() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name + "_withoutClientAck";
    }
    async setRelayerMessages(e) {
        await this.core.storage.setItem(this.storageKey, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapToObj"])(e));
    }
    async setRelayerMessagesWithoutClientAck(e) {
        await this.core.storage.setItem(this.storageKeyWithoutClientAck, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapToObj"])(e));
    }
    async getRelayerMessages() {
        const e = await this.core.storage.getItem(this.storageKey);
        return typeof e < "u" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["objToMap"])(e) : void 0;
    }
    async getRelayerMessagesWithoutClientAck() {
        const e = await this.core.storage.getItem(this.storageKeyWithoutClientAck);
        return typeof e < "u" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["objToMap"])(e) : void 0;
    }
    async persist() {
        await this.setRelayerMessages(this.messages), await this.setRelayerMessagesWithoutClientAck(this.messagesWithoutClientAck);
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
}
var Vn = Object.defineProperty, qn = Object.defineProperties, Gn = Object.getOwnPropertyDescriptors, Ci = Object.getOwnPropertySymbols, Wn = Object.prototype.hasOwnProperty, Hn = Object.prototype.propertyIsEnumerable, He = (r, e, t)=>e in r ? Vn(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, ce = (r, e)=>{
    for(var t in e || (e = {}))Wn.call(e, t) && He(r, t, e[t]);
    if (Ci) for (var t of Ci(e))Hn.call(e, t) && He(r, t, e[t]);
    return r;
}, Pi = (r, e)=>qn(r, Gn(e)), G = (r, e, t)=>He(r, typeof e != "symbol" ? e + "" : e, t);
class Yn extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$types$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IPublisher"] {
    constructor(e, t){
        super(e, t), this.relayer = e, this.logger = t, G(this, "events", new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventEmitter"]), G(this, "name", Nt), G(this, "queue", new Map), G(this, "publishTimeout", (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMiliseconds"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_MINUTE"])), G(this, "initialPublishTimeout", (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMiliseconds"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_SECOND"] * 15)), G(this, "needsTransportRestart", !1), G(this, "publish", async (i, s, n)=>{
            var o, a, c, h, l;
            this.logger.debug("Publishing Payload"), this.logger.trace({
                type: "method",
                method: "publish",
                params: {
                    topic: i,
                    message: s,
                    opts: n
                }
            });
            const p = n?.ttl || xt, y = n?.prompt || !1, w = n?.tag || 0, u = n?.id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBigIntRpcId"])().toString(), m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRelayProtocolApi"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRelayProtocolName"])().protocol), D = {
                id: u,
                method: n?.publishMethod || m.publish,
                params: ce({
                    topic: i,
                    message: s,
                    ttl: p,
                    prompt: y,
                    tag: w,
                    attestation: n?.attestation
                }, n?.tvf && {
                    tvf: n.tvf
                })
            }, _ = `Failed to publish payload, please try again. id:${u} tag:${w}`;
            try {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUndefined"])((o = D.params) == null ? void 0 : o.prompt) && ((a = D.params) == null || delete a.prompt), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUndefined"])((c = D.params) == null ? void 0 : c.tag) && ((h = D.params) == null || delete h.tag);
                const E = new Promise(async (L)=>{
                    const I = ({ id: T })=>{
                        var S;
                        ((S = D.id) == null ? void 0 : S.toString()) === T.toString() && (this.removeRequestFromQueue(T), this.relayer.events.removeListener(C.publish, I), L());
                    };
                    this.relayer.events.on(C.publish, I);
                    const k = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createExpiringPromise"])(new Promise((T, S)=>{
                        this.rpcPublish(D, n).then(T).catch((O)=>{
                            this.logger.warn(O, O?.message), S(O);
                        });
                    }), this.initialPublishTimeout, `Failed initial publish, retrying.... id:${u} tag:${w}`);
                    try {
                        await k, this.events.removeListener(C.publish, I);
                    } catch (T) {
                        this.queue.set(u, {
                            request: D,
                            opts: n,
                            attempt: 1
                        }), this.logger.warn(T, T?.message);
                    }
                });
                this.logger.trace({
                    type: "method",
                    method: "publish",
                    params: {
                        id: u,
                        topic: i,
                        message: s,
                        opts: n
                    }
                }), await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createExpiringPromise"])(E, this.publishTimeout, _);
            } catch (E) {
                if (this.logger.debug("Failed to Publish Payload"), this.logger.error(E), (l = n?.internal) != null && l.throwOnFailedPublish) throw E;
            } finally{
                this.queue.delete(u);
            }
        }), G(this, "publishCustom", async (i)=>{
            var s, n, o, a, c;
            this.logger.debug("Publishing custom payload"), this.logger.trace({
                type: "method",
                method: "publishCustom",
                params: i
            });
            const { payload: h, opts: l = {} } = i, { attestation: p, tvf: y, publishMethod: w, prompt: u, tag: m, ttl: D = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_MINUTES"] } = l, _ = l.id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBigIntRpcId"])().toString(), E = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRelayProtocolApi"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRelayProtocolName"])().protocol), L = w || E.publish, I = {
                id: _,
                method: L,
                params: ce(Pi(ce({}, h), {
                    ttl: D,
                    prompt: u,
                    tag: m,
                    attestation: p
                }), y)
            }, k = `Failed to publish custom payload, please try again. id:${_} tag:${m}`;
            try {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUndefined"])((s = I.params) == null ? void 0 : s.prompt) && ((n = I.params) == null || delete n.prompt), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUndefined"])((o = I.params) == null ? void 0 : o.tag) && ((a = I.params) == null || delete a.tag);
                const T = new Promise(async (S)=>{
                    const O = ({ id: Z })=>{
                        var _e;
                        ((_e = I.id) == null ? void 0 : _e.toString()) === Z.toString() && (this.removeRequestFromQueue(Z), this.relayer.events.removeListener(C.publish, O), S());
                    };
                    this.relayer.events.on(C.publish, O);
                    const te = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createExpiringPromise"])(new Promise((Z, _e)=>{
                        this.rpcPublish(I, l).then(Z).catch((Ee)=>{
                            this.logger.warn(Ee, Ee?.message), _e(Ee);
                        });
                    }), this.initialPublishTimeout, `Failed initial custom payload publish, retrying.... method:${L} id:${_} tag:${m}`);
                    try {
                        await te, this.events.removeListener(C.publish, O);
                    } catch (Z) {
                        this.queue.set(_, {
                            request: I,
                            opts: l,
                            attempt: 1
                        }), this.logger.warn(Z, Z?.message);
                    }
                });
                this.logger.trace({
                    type: "method",
                    method: "publish",
                    params: {
                        id: _,
                        payload: h,
                        opts: l
                    }
                }), await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createExpiringPromise"])(T, this.publishTimeout, k);
            } catch (T) {
                if (this.logger.debug("Failed to Publish Payload"), this.logger.error(T), (c = l?.internal) != null && c.throwOnFailedPublish) throw T;
            } finally{
                this.queue.delete(_);
            }
        }), G(this, "on", (i, s)=>{
            this.events.on(i, s);
        }), G(this, "once", (i, s)=>{
            this.events.once(i, s);
        }), G(this, "off", (i, s)=>{
            this.events.off(i, s);
        }), G(this, "removeListener", (i, s)=>{
            this.events.removeListener(i, s);
        }), this.relayer = e, this.logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateChildLogger"])(t, this.name), this.registerEventListeners();
    }
    get context() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLoggerContext"])(this.logger);
    }
    async rpcPublish(e, t) {
        this.logger.debug("Outgoing Relay Payload"), this.logger.trace({
            type: "message",
            direction: "outgoing",
            request: e
        });
        const i = await this.relayer.request(e);
        return this.relayer.events.emit(C.publish, ce(ce({}, e), t)), this.logger.debug("Successfully Published Payload"), i;
    }
    removeRequestFromQueue(e) {
        this.queue.delete(e);
    }
    checkQueue() {
        this.queue.forEach(async (e, t)=>{
            var i;
            const s = e.attempt + 1;
            this.queue.set(t, Pi(ce({}, e), {
                attempt: s
            })), this.logger.warn({}, `Publisher: queue->publishing: ${e.request.id}, tag: ${(i = e.request.params) == null ? void 0 : i.tag}, attempt: ${s}`), await this.rpcPublish(e.request, e.opts), this.logger.warn({}, `Publisher: queue->published: ${e.request.id}`);
        });
    }
    registerEventListeners() {
        this.relayer.core.heartbeat.on(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$heartbeat$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HEARTBEAT_EVENTS"].pulse, ()=>{
            if (this.needsTransportRestart) {
                this.needsTransportRestart = !1, this.relayer.events.emit(C.connection_stalled);
                return;
            }
            this.checkQueue();
        }), this.relayer.on(C.message_ack, (e)=>{
            this.removeRequestFromQueue(e.id.toString());
        });
    }
}
var Jn = Object.defineProperty, Xn = (r, e, t)=>e in r ? Jn(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, he = (r, e, t)=>Xn(r, typeof e != "symbol" ? e + "" : e, t);
class Zn {
    constructor(){
        he(this, "map", new Map), he(this, "set", (e, t)=>{
            const i = this.get(e);
            this.exists(e, t) || this.map.set(e, [
                ...i,
                t
            ]);
        }), he(this, "get", (e)=>this.map.get(e) || []), he(this, "exists", (e, t)=>this.get(e).includes(t)), he(this, "delete", (e, t)=>{
            if (typeof t > "u") {
                this.map.delete(e);
                return;
            }
            if (!this.map.has(e)) return;
            const i = this.get(e);
            if (!this.exists(e, t)) return;
            const s = i.filter((n)=>n !== t);
            if (!s.length) {
                this.map.delete(e);
                return;
            }
            this.map.set(e, s);
        }), he(this, "clear", ()=>{
            this.map.clear();
        });
    }
    get topics() {
        return Array.from(this.map.keys());
    }
}
var Qn = Object.defineProperty, eo = Object.defineProperties, to = Object.getOwnPropertyDescriptors, Si = Object.getOwnPropertySymbols, io = Object.prototype.hasOwnProperty, so = Object.prototype.propertyIsEnumerable, Ye = (r, e, t)=>e in r ? Qn(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, fe = (r, e)=>{
    for(var t in e || (e = {}))io.call(e, t) && Ye(r, t, e[t]);
    if (Si) for (var t of Si(e))so.call(e, t) && Ye(r, t, e[t]);
    return r;
}, Je = (r, e)=>eo(r, to(e)), f = (r, e, t)=>Ye(r, typeof e != "symbol" ? e + "" : e, t);
class Oi extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$types$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISubscriber"] {
    constructor(e, t){
        super(e, t), this.relayer = e, this.logger = t, f(this, "subscriptions", new Map), f(this, "topicMap", new Zn), f(this, "events", new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventEmitter"]), f(this, "name", Mt), f(this, "version", Kt), f(this, "pending", new Map), f(this, "cached", []), f(this, "initialized", !1), f(this, "storagePrefix", W), f(this, "subscribeTimeout", (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMiliseconds"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_MINUTE"])), f(this, "initialSubscribeTimeout", (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMiliseconds"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_SECOND"] * 15)), f(this, "clientId"), f(this, "batchSubscribeTopicsLimit", 500), f(this, "init", async ()=>{
            this.initialized || (this.logger.trace("Initialized"), this.registerEventListeners(), await this.restore()), this.initialized = !0;
        }), f(this, "subscribe", async (i, s)=>{
            var n;
            this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({
                type: "method",
                method: "subscribe",
                params: {
                    topic: i,
                    opts: s
                }
            });
            try {
                const o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRelayProtocolName"])(s), a = {
                    topic: i,
                    relay: o,
                    transportType: s?.transportType
                };
                (n = s?.internal) != null && n.skipSubscribe || this.pending.set(i, a);
                const c = await this.rpcSubscribe(i, o, s);
                return typeof c == "string" && (this.onSubscribe(c, a), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({
                    type: "method",
                    method: "subscribe",
                    params: {
                        topic: i,
                        opts: s
                    }
                })), c;
            } catch (o) {
                throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(o), o;
            }
        }), f(this, "unsubscribe", async (i, s)=>{
            this.isInitialized(), typeof s?.id < "u" ? await this.unsubscribeById(i, s.id, s) : await this.unsubscribeByTopic(i, s);
        }), f(this, "isSubscribed", (i)=>new Promise((s)=>{
                s(this.topicMap.topics.includes(i));
            })), f(this, "isKnownTopic", (i)=>new Promise((s)=>{
                s(this.topicMap.topics.includes(i) || this.pending.has(i) || this.cached.some((n)=>n.topic === i));
            })), f(this, "on", (i, s)=>{
            this.events.on(i, s);
        }), f(this, "once", (i, s)=>{
            this.events.once(i, s);
        }), f(this, "off", (i, s)=>{
            this.events.off(i, s);
        }), f(this, "removeListener", (i, s)=>{
            this.events.removeListener(i, s);
        }), f(this, "start", async ()=>{
            await this.onConnect();
        }), f(this, "stop", async ()=>{
            await this.onDisconnect();
        }), f(this, "restart", async ()=>{
            await this.restore(), await this.onRestart();
        }), f(this, "checkPending", async ()=>{
            if (this.pending.size === 0 && (!this.initialized || !this.relayer.connected)) return;
            const i = [];
            this.pending.forEach((s)=>{
                i.push(s);
            }), await this.batchSubscribe(i);
        }), f(this, "registerEventListeners", ()=>{
            this.relayer.core.heartbeat.on(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$heartbeat$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HEARTBEAT_EVENTS"].pulse, async ()=>{
                await this.checkPending();
            }), this.events.on(U.created, async (i)=>{
                const s = U.created;
                this.logger.info(`Emitting ${s}`), this.logger.debug({
                    type: "event",
                    event: s,
                    data: i
                }), await this.persist();
            }), this.events.on(U.deleted, async (i)=>{
                const s = U.deleted;
                this.logger.info(`Emitting ${s}`), this.logger.debug({
                    type: "event",
                    event: s,
                    data: i
                }), await this.persist();
            });
        }), this.relayer = e, this.logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateChildLogger"])(t, this.name), this.clientId = "";
    }
    get context() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLoggerContext"])(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.relayer.core.customStoragePrefix + "//" + this.name;
    }
    get length() {
        return this.subscriptions.size;
    }
    get ids() {
        return Array.from(this.subscriptions.keys());
    }
    get values() {
        return Array.from(this.subscriptions.values());
    }
    get topics() {
        return this.topicMap.topics;
    }
    get hasAnyTopics() {
        return this.topicMap.topics.length > 0 || this.pending.size > 0 || this.cached.length > 0 || this.subscriptions.size > 0;
    }
    hasSubscription(e, t) {
        let i = !1;
        try {
            i = this.getSubscription(e).topic === t;
        } catch  {}
        return i;
    }
    reset() {
        this.cached = [], this.initialized = !0;
    }
    onDisable() {
        this.values.length > 0 && (this.cached = this.values), this.subscriptions.clear(), this.topicMap.clear();
    }
    async unsubscribeByTopic(e, t) {
        const i = this.topicMap.get(e);
        await Promise.all(i.map(async (s)=>await this.unsubscribeById(e, s, t)));
    }
    async unsubscribeById(e, t, i) {
        this.logger.debug("Unsubscribing Topic"), this.logger.trace({
            type: "method",
            method: "unsubscribe",
            params: {
                topic: e,
                id: t,
                opts: i
            }
        });
        try {
            const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRelayProtocolName"])(i);
            await this.restartToComplete({
                topic: e,
                id: t,
                relay: s
            }), await this.rpcUnsubscribe(e, t, s);
            const n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSdkError"])("USER_DISCONNECTED", `${this.name}, ${e}`);
            await this.onUnsubscribe(e, t, n), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({
                type: "method",
                method: "unsubscribe",
                params: {
                    topic: e,
                    id: t,
                    opts: i
                }
            });
        } catch (s) {
            throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(s), s;
        }
    }
    async rpcSubscribe(e, t, i) {
        var s, n;
        const o = await this.getSubscriptionId(e);
        if ((s = i?.internal) != null && s.skipSubscribe) return o;
        (!i || i?.transportType === ee.relay) && await this.restartToComplete({
            topic: e,
            id: e,
            relay: t
        });
        const a = {
            method: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRelayProtocolApi"])(t.protocol).subscribe,
            params: {
                topic: e
            }
        };
        this.logger.debug("Outgoing Relay Payload"), this.logger.trace({
            type: "payload",
            direction: "outgoing",
            request: a
        });
        const c = (n = i?.internal) == null ? void 0 : n.throwOnFailedPublish;
        try {
            if (i?.transportType === ee.link_mode) return setTimeout(()=>{
                (this.relayer.connected || this.relayer.connecting) && this.relayer.request(a).catch((p)=>this.logger.warn(p));
            }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMiliseconds"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_SECOND"])), o;
            const h = new Promise(async (p)=>{
                const y = (w)=>{
                    w.topic === e && (this.events.removeListener(U.created, y), p(w.id));
                };
                this.events.on(U.created, y);
                try {
                    const w = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createExpiringPromise"])(new Promise((u, m)=>{
                        this.relayer.request(a).catch((D)=>{
                            this.logger.warn(D, D?.message), m(D);
                        }).then(u);
                    }), this.initialSubscribeTimeout, `Subscribing to ${e} failed, please try again`);
                    this.events.removeListener(U.created, y), p(w);
                } catch  {}
            }), l = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createExpiringPromise"])(h, this.subscribeTimeout, `Subscribing to ${e} failed, please try again`);
            if (!l && c) throw new Error(`Subscribing to ${e} failed, please try again`);
            return l ? o : null;
        } catch (h) {
            if (this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(C.connection_stalled), c) throw h;
        }
        return null;
    }
    async rpcBatchSubscribe(e) {
        if (!e.length) return;
        const t = e[0].relay, i = {
            method: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRelayProtocolApi"])(t.protocol).batchSubscribe,
            params: {
                topics: e.map((s)=>s.topic)
            }
        };
        this.logger.debug("Outgoing Relay Payload"), this.logger.trace({
            type: "payload",
            direction: "outgoing",
            request: i
        });
        try {
            await await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createExpiringPromise"])(new Promise((s)=>{
                this.relayer.request(i).catch((n)=>this.logger.warn(n)).then(s);
            }), this.subscribeTimeout, "rpcBatchSubscribe failed, please try again");
        } catch  {
            this.relayer.events.emit(C.connection_stalled);
        }
    }
    async rpcBatchFetchMessages(e) {
        if (!e.length) return;
        const t = e[0].relay, i = {
            method: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRelayProtocolApi"])(t.protocol).batchFetchMessages,
            params: {
                topics: e.map((n)=>n.topic)
            }
        };
        this.logger.debug("Outgoing Relay Payload"), this.logger.trace({
            type: "payload",
            direction: "outgoing",
            request: i
        });
        let s;
        try {
            s = await await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createExpiringPromise"])(new Promise((n, o)=>{
                this.relayer.request(i).catch((a)=>{
                    this.logger.warn(a), o(a);
                }).then(n);
            }), this.subscribeTimeout, "rpcBatchFetchMessages failed, please try again");
        } catch  {
            this.relayer.events.emit(C.connection_stalled);
        }
        return s;
    }
    rpcUnsubscribe(e, t, i) {
        const s = {
            method: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRelayProtocolApi"])(i.protocol).unsubscribe,
            params: {
                topic: e,
                id: t
            }
        };
        return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({
            type: "payload",
            direction: "outgoing",
            request: s
        }), this.relayer.request(s);
    }
    onSubscribe(e, t) {
        this.setSubscription(e, Je(fe({}, t), {
            id: e
        })), this.pending.delete(t.topic);
    }
    onBatchSubscribe(e) {
        e.length && e.forEach((t)=>{
            this.setSubscription(t.id, fe({}, t)), this.pending.delete(t.topic);
        });
    }
    async onUnsubscribe(e, t, i) {
        this.events.removeAllListeners(t), this.hasSubscription(t, e) && this.deleteSubscription(t, i), await this.relayer.messages.del(e);
    }
    async setRelayerSubscriptions(e) {
        await this.relayer.core.storage.setItem(this.storageKey, e);
    }
    async getRelayerSubscriptions() {
        return await this.relayer.core.storage.getItem(this.storageKey);
    }
    setSubscription(e, t) {
        this.logger.debug("Setting subscription"), this.logger.trace({
            type: "method",
            method: "setSubscription",
            id: e,
            subscription: t
        }), this.addSubscription(e, t);
    }
    addSubscription(e, t) {
        this.subscriptions.set(e, fe({}, t)), this.topicMap.set(t.topic, e), this.events.emit(U.created, t);
    }
    getSubscription(e) {
        this.logger.debug("Getting subscription"), this.logger.trace({
            type: "method",
            method: "getSubscription",
            id: e
        });
        const t = this.subscriptions.get(e);
        if (!t) {
            const { message: i } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("NO_MATCHING_KEY", `${this.name}: ${e}`);
            throw new Error(i);
        }
        return t;
    }
    deleteSubscription(e, t) {
        this.logger.debug("Deleting subscription"), this.logger.trace({
            type: "method",
            method: "deleteSubscription",
            id: e,
            reason: t
        });
        const i = this.getSubscription(e);
        this.subscriptions.delete(e), this.topicMap.delete(i.topic, e), this.events.emit(U.deleted, Je(fe({}, i), {
            reason: t
        }));
    }
    async persist() {
        await this.setRelayerSubscriptions(this.values), this.events.emit(U.sync);
    }
    async onRestart() {
        if (this.cached.length) {
            const e = [
                ...this.cached
            ], t = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
            for(let i = 0; i < t; i++){
                const s = e.splice(0, this.batchSubscribeTopicsLimit);
                await this.batchSubscribe(s);
            }
        }
        this.events.emit(U.resubscribed);
    }
    async restore() {
        try {
            const e = await this.getRelayerSubscriptions();
            if (typeof e > "u" || !e.length) return;
            if (this.subscriptions.size && !e.every((t)=>{
                var i;
                return t.topic === ((i = this.subscriptions.get(t.id)) == null ? void 0 : i.topic);
            })) {
                const { message: t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("RESTORE_WILL_OVERRIDE", this.name);
                throw this.logger.error(t), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(t);
            }
            this.cached = e, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({
                type: "method",
                method: "restore",
                subscriptions: this.values
            });
        } catch (e) {
            this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e);
        }
    }
    async batchSubscribe(e) {
        e.length && (await this.rpcBatchSubscribe(e), this.onBatchSubscribe(await Promise.all(e.map(async (t)=>Je(fe({}, t), {
                id: await this.getSubscriptionId(t.topic)
            })))));
    }
    async batchFetchMessages(e) {
        if (!e.length) return;
        this.logger.trace(`Fetching batch messages for ${e.length} subscriptions`);
        const t = await this.rpcBatchFetchMessages(e);
        t && t.messages && (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sleep"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMiliseconds"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_SECOND"])), await this.relayer.handleBatchMessageEvents(t.messages));
    }
    async onConnect() {
        await this.restart(), this.reset();
    }
    onDisconnect() {
        this.onDisable();
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
    async restartToComplete(e) {
        !this.relayer.connected && !this.relayer.connecting && (this.cached.push(e), await this.relayer.transportOpen());
    }
    async getClientId() {
        return this.clientId || (this.clientId = await this.relayer.core.crypto.getClientId()), this.clientId;
    }
    async getSubscriptionId(e) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashMessage"])(e + await this.getClientId());
    }
}
var ro = Object.defineProperty, Ri = Object.getOwnPropertySymbols, no = Object.prototype.hasOwnProperty, oo = Object.prototype.propertyIsEnumerable, Xe = (r, e, t)=>e in r ? ro(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, Ai = (r, e)=>{
    for(var t in e || (e = {}))no.call(e, t) && Xe(r, t, e[t]);
    if (Ri) for (var t of Ri(e))oo.call(e, t) && Xe(r, t, e[t]);
    return r;
}, g = (r, e, t)=>Xe(r, typeof e != "symbol" ? e + "" : e, t);
class xi extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$types$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IRelayer"] {
    constructor(e){
        super(e), g(this, "protocol", "wc"), g(this, "version", 2), g(this, "core"), g(this, "logger"), g(this, "events", new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventEmitter"]), g(this, "provider"), g(this, "messages"), g(this, "subscriber"), g(this, "publisher"), g(this, "name", Lt), g(this, "transportExplicitlyClosed", !1), g(this, "initialized", !1), g(this, "connectionAttemptInProgress", !1), g(this, "relayUrl"), g(this, "projectId"), g(this, "packageName"), g(this, "bundleId"), g(this, "hasExperiencedNetworkDisruption", !1), g(this, "pingTimeout"), g(this, "heartBeatTimeout", (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMiliseconds"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["THIRTY_SECONDS"] + __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_SECONDS"])), g(this, "reconnectTimeout"), g(this, "connectPromise"), g(this, "reconnectInProgress", !1), g(this, "requestsInFlight", []), g(this, "connectTimeout", (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMiliseconds"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_SECOND"] * 15)), g(this, "request", async (t)=>{
            var i, s;
            this.logger.debug("Publishing Request Payload");
            const n = t.id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBigIntRpcId"])().toString();
            await this.toEstablishConnection();
            try {
                this.logger.trace({
                    id: n,
                    method: t.method,
                    topic: (i = t.params) == null ? void 0 : i.topic
                }, "relayer.request - publishing...");
                const o = `${n}:${((s = t.params) == null ? void 0 : s.tag) || ""}`;
                this.requestsInFlight.push(o);
                const a = await this.provider.request(t);
                return this.requestsInFlight = this.requestsInFlight.filter((c)=>c !== o), a;
            } catch (o) {
                throw this.logger.debug(`Failed to Publish Request: ${n}`), o;
            }
        }), g(this, "resetPingTimeout", ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNode"])() && (clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(()=>{
                var t, i, s, n;
                try {
                    this.logger.debug({}, "pingTimeout: Connection stalled, terminating..."), (n = (s = (i = (t = this.provider) == null ? void 0 : t.connection) == null ? void 0 : i.socket) == null ? void 0 : s.terminate) == null || n.call(s);
                } catch (o) {
                    this.logger.warn(o, o?.message);
                }
            }, this.heartBeatTimeout));
        }), g(this, "onPayloadHandler", (t)=>{
            this.onProviderPayload(t), this.resetPingTimeout();
        }), g(this, "onConnectHandler", ()=>{
            this.logger.warn({}, "Relayer connected \u{1F6DC}"), this.startPingTimeout(), this.events.emit(C.connect);
        }), g(this, "onDisconnectHandler", ()=>{
            this.logger.warn({}, "Relayer disconnected \u{1F6D1}"), this.requestsInFlight = [], this.onProviderDisconnect();
        }), g(this, "onProviderErrorHandler", (t)=>{
            this.logger.fatal(`Fatal socket error: ${t.message}`), this.events.emit(C.error, t), this.logger.fatal("Fatal socket error received, closing transport"), this.transportClose();
        }), g(this, "registerProviderListeners", ()=>{
            this.provider.on(M.payload, this.onPayloadHandler), this.provider.on(M.connect, this.onConnectHandler), this.provider.on(M.disconnect, this.onDisconnectHandler), this.provider.on(M.error, this.onProviderErrorHandler);
        }), this.core = e.core, this.logger = typeof e.logger < "u" && typeof e.logger != "string" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateChildLogger"])(e.logger, this.name) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__pino$3e$__["pino"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDefaultLoggerOptions"])({
            level: e.logger || zt
        })), this.messages = new Ti(this.logger, e.core), this.subscriber = new Oi(this, this.logger), this.publisher = new Yn(this, this.logger), this.projectId = e?.projectId, this.relayUrl = e?.relayUrl || Ke, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAndroid"])() ? this.packageName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAppId"])() : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isIos"])() && (this.bundleId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAppId"])()), this.provider = {};
    }
    async init() {
        this.logger.trace("Initialized"), this.registerEventListeners(), await Promise.all([
            this.messages.init(),
            this.subscriber.init()
        ]), this.initialized = !0, this.transportOpen().catch((e)=>this.logger.warn(e, e?.message));
    }
    get context() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLoggerContext"])(this.logger);
    }
    get connected() {
        var e, t, i;
        return ((i = (t = (e = this.provider) == null ? void 0 : e.connection) == null ? void 0 : t.socket) == null ? void 0 : i.readyState) === 1 || !1;
    }
    get connecting() {
        var e, t, i;
        return ((i = (t = (e = this.provider) == null ? void 0 : e.connection) == null ? void 0 : t.socket) == null ? void 0 : i.readyState) === 0 || this.connectPromise !== void 0 || !1;
    }
    async publish(e, t, i) {
        this.isInitialized(), await this.publisher.publish(e, t, i), await this.recordMessageEvent({
            topic: e,
            message: t,
            publishedAt: Date.now(),
            transportType: ee.relay
        }, ye.outbound);
    }
    async publishCustom(e) {
        this.isInitialized(), await this.publisher.publishCustom(e);
    }
    async subscribe(e, t) {
        var i, s, n;
        this.isInitialized(), (!(t != null && t.transportType) || t?.transportType === "relay") && await this.toEstablishConnection();
        const o = typeof ((i = t?.internal) == null ? void 0 : i.throwOnFailedPublish) > "u" ? !0 : (s = t?.internal) == null ? void 0 : s.throwOnFailedPublish;
        let a = ((n = this.subscriber.topicMap.get(e)) == null ? void 0 : n[0]) || "", c;
        const h = (l)=>{
            l.topic === e && (this.subscriber.off(U.created, h), c());
        };
        return await Promise.all([
            new Promise((l)=>{
                c = l, this.subscriber.on(U.created, h);
            }),
            new Promise(async (l, p)=>{
                a = await this.subscriber.subscribe(e, Ai({
                    internal: {
                        throwOnFailedPublish: o
                    }
                }, t)).catch((y)=>{
                    o && p(y);
                }) || a, l();
            })
        ]), a;
    }
    async unsubscribe(e, t) {
        this.isInitialized(), await this.subscriber.unsubscribe(e, t);
    }
    on(e, t) {
        this.events.on(e, t);
    }
    once(e, t) {
        this.events.once(e, t);
    }
    off(e, t) {
        this.events.off(e, t);
    }
    removeListener(e, t) {
        this.events.removeListener(e, t);
    }
    async transportDisconnect() {
        this.provider.disconnect && (this.hasExperiencedNetworkDisruption || this.connected) ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createExpiringPromise"])(this.provider.disconnect(), 2e3, "provider.disconnect()").catch(()=>this.onProviderDisconnect()) : this.onProviderDisconnect();
    }
    async transportClose() {
        this.transportExplicitlyClosed = !0, await this.transportDisconnect();
    }
    async transportOpen(e) {
        if (!this.subscriber.hasAnyTopics) {
            this.logger.info("Starting WS connection skipped because the client has no topics to work with.");
            return;
        }
        if (this.connectPromise ? (this.logger.debug({}, "Waiting for existing connection attempt to resolve..."), await this.connectPromise, this.logger.debug({}, "Existing connection attempt resolved")) : (this.connectPromise = new Promise(async (t, i)=>{
            await this.connect(e).then(t).catch(i).finally(()=>{
                this.connectPromise = void 0;
            });
        }), await this.connectPromise), !this.connected) throw new Error(`Couldn't establish socket connection to the relay server: ${this.relayUrl}`);
    }
    async restartTransport(e) {
        this.logger.debug({}, "Restarting transport..."), !this.connectionAttemptInProgress && (this.relayUrl = e || this.relayUrl, await this.confirmOnlineStateOrThrow(), await this.transportClose(), await this.transportOpen());
    }
    async confirmOnlineStateOrThrow() {
        if (!await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOnline"])()) throw new Error("No internet connection detected. Please restart your network and try again.");
    }
    async handleBatchMessageEvents(e) {
        if (e?.length === 0) {
            this.logger.trace("Batch message events is empty. Ignoring...");
            return;
        }
        const t = e.sort((i, s)=>i.publishedAt - s.publishedAt);
        this.logger.debug(`Batch of ${t.length} message events sorted`);
        for (const i of t)try {
            await this.onMessageEvent(i);
        } catch (s) {
            this.logger.warn(s, "Error while processing batch message event: " + s?.message);
        }
        this.logger.trace(`Batch of ${t.length} message events processed`);
    }
    async onLinkMessageEvent(e, t) {
        const { topic: i } = e;
        if (!t.sessionExists) {
            const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcExpiry"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_MINUTES"]), n = {
                topic: i,
                expiry: s,
                relay: {
                    protocol: "irn"
                },
                active: !1
            };
            await this.core.pairing.pairings.set(i, n);
        }
        this.events.emit(C.message, e), await this.recordMessageEvent(e, ye.inbound);
    }
    async connect(e) {
        await this.confirmOnlineStateOrThrow(), e && e !== this.relayUrl && (this.relayUrl = e, await this.transportDisconnect()), this.connectionAttemptInProgress = !0, this.transportExplicitlyClosed = !1;
        let t = 1;
        for(; t < 6;){
            try {
                if (this.transportExplicitlyClosed) break;
                this.logger.debug({}, `Connecting to ${this.relayUrl}, attempt: ${t}...`), await this.createProvider(), await new Promise(async (i, s)=>{
                    const n = ()=>{
                        s(new Error("Connection interrupted while trying to connect"));
                    };
                    this.provider.once(M.disconnect, n), await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createExpiringPromise"])(new Promise((o, a)=>{
                        this.provider.connect().then(o).catch(a);
                    }), this.connectTimeout, `Socket stalled when trying to connect to ${this.relayUrl}`).catch((o)=>{
                        s(o);
                    }).finally(()=>{
                        this.provider.off(M.disconnect, n), clearTimeout(this.reconnectTimeout);
                    }), await new Promise(async (o, a)=>{
                        const c = ()=>{
                            s(new Error("Connection interrupted while trying to subscribe"));
                        };
                        this.provider.once(M.disconnect, c), await this.subscriber.start().then(o).catch(a).finally(()=>{
                            this.provider.off(M.disconnect, c);
                        });
                    }), this.hasExperiencedNetworkDisruption = !1, i();
                });
            } catch (i) {
                await this.subscriber.stop();
                const s = i;
                this.logger.warn({}, s.message), this.hasExperiencedNetworkDisruption = !0;
            } finally{
                this.connectionAttemptInProgress = !1;
            }
            if (this.connected) {
                this.logger.debug({}, `Connected to ${this.relayUrl} successfully on attempt: ${t}`);
                break;
            }
            await new Promise((i)=>setTimeout(i, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMiliseconds"])(t * 1))), t++;
        }
    }
    startPingTimeout() {
        var e, t, i, s, n;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNode"])()) try {
            (t = (e = this.provider) == null ? void 0 : e.connection) != null && t.socket && ((n = (s = (i = this.provider) == null ? void 0 : i.connection) == null ? void 0 : s.socket) == null || n.on("ping", ()=>{
                this.resetPingTimeout();
            })), this.resetPingTimeout();
        } catch (o) {
            this.logger.warn(o, o?.message);
        }
    }
    async createProvider() {
        this.provider.connection && this.unregisterProviderListeners();
        const e = await this.core.crypto.signJWT(this.relayUrl);
        this.provider = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$ws$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRelayRpcUrl"])({
            sdkVersion: Pe,
            protocol: this.protocol,
            version: this.version,
            relayUrl: this.relayUrl,
            projectId: this.projectId,
            auth: e,
            useOnCloseEvent: !0,
            bundleId: this.bundleId,
            packageName: this.packageName
        }))), this.registerProviderListeners();
    }
    async recordMessageEvent(e, t) {
        const { topic: i, message: s } = e;
        await this.messages.set(i, s, t);
    }
    async shouldIgnoreMessageEvent(e) {
        const { topic: t, message: i } = e;
        if (!i || i.length === 0) return this.logger.warn(`Ignoring invalid/empty message: ${i}`), !0;
        if (!await this.subscriber.isKnownTopic(t)) return this.logger.warn(`Ignoring message for unknown topic ${t}`), !0;
        const s = this.messages.has(t, i);
        return s && this.logger.warn(`Ignoring duplicate message: ${i}`), s;
    }
    async onProviderPayload(e) {
        if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({
            type: "payload",
            direction: "incoming",
            payload: e
        }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcRequest"])(e)) {
            if (!e.method.endsWith(kt)) return;
            const t = e.params, { topic: i, message: s, publishedAt: n, attestation: o } = t.data, a = {
                topic: i,
                message: s,
                publishedAt: n,
                transportType: ee.relay,
                attestation: o
            };
            this.logger.debug("Emitting Relayer Payload"), this.logger.trace(Ai({
                type: "event",
                event: t.id
            }, a)), this.events.emit(t.id, a), await this.acknowledgePayload(e), await this.onMessageEvent(a);
        } else (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcResponse"])(e) && this.events.emit(C.message_ack, e);
    }
    async onMessageEvent(e) {
        await this.shouldIgnoreMessageEvent(e) || (await this.recordMessageEvent(e, ye.inbound), this.events.emit(C.message, e));
    }
    async acknowledgePayload(e) {
        const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatJsonRpcResult"])(e.id, !0);
        await this.provider.connection.send(t);
    }
    unregisterProviderListeners() {
        this.provider.off(M.payload, this.onPayloadHandler), this.provider.off(M.connect, this.onConnectHandler), this.provider.off(M.disconnect, this.onDisconnectHandler), this.provider.off(M.error, this.onProviderErrorHandler), clearTimeout(this.pingTimeout);
    }
    async registerEventListeners() {
        let e = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isOnline"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribeToNetworkChange"])(async (t)=>{
            e !== t && (e = t, t ? await this.transportOpen().catch((i)=>this.logger.error(i, i?.message)) : (this.hasExperiencedNetworkDisruption = !0, await this.transportDisconnect(), this.transportExplicitlyClosed = !1));
        }), this.core.heartbeat.on(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$heartbeat$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HEARTBEAT_EVENTS"].pulse, async ()=>{
            if (!this.transportExplicitlyClosed && !this.connected && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAppVisible"])()) try {
                await this.confirmOnlineStateOrThrow(), await this.transportOpen();
            } catch (t) {
                this.logger.warn(t, t?.message);
            }
        });
    }
    async onProviderDisconnect() {
        clearTimeout(this.pingTimeout), this.events.emit(C.disconnect), this.connectionAttemptInProgress = !1, !this.reconnectInProgress && (this.reconnectInProgress = !0, await this.subscriber.stop(), this.subscriber.hasAnyTopics && (this.transportExplicitlyClosed || (this.reconnectTimeout = setTimeout(async ()=>{
            await this.transportOpen().catch((e)=>this.logger.error(e, e?.message)), this.reconnectTimeout = void 0, this.reconnectInProgress = !1;
        }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMiliseconds"])(jt)))));
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
    async toEstablishConnection() {
        if (await this.confirmOnlineStateOrThrow(), !this.connected) {
            if (this.connectPromise) {
                await this.connectPromise;
                return;
            }
            await this.connect();
        }
    }
}
function ao(r, e) {
    return r === e || Number.isNaN(r) && Number.isNaN(e);
}
function Ni(r) {
    return Object.getOwnPropertySymbols(r).filter((e)=>Object.prototype.propertyIsEnumerable.call(r, e));
}
function $i(r) {
    return r == null ? r === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(r);
}
const co = "[object RegExp]", ho = "[object String]", lo = "[object Number]", uo = "[object Boolean]", zi = "[object Arguments]", go = "[object Symbol]", po = "[object Date]", yo = "[object Map]", bo = "[object Set]", mo = "[object Array]", fo = "[object Function]", Do = "[object ArrayBuffer]", Ze = "[object Object]", vo = "[object Error]", wo = "[object DataView]", _o = "[object Uint8Array]", Eo = "[object Uint8ClampedArray]", Io = "[object Uint16Array]", To = "[object Uint32Array]", Co = "[object BigUint64Array]", Po = "[object Int8Array]", So = "[object Int16Array]", Oo = "[object Int32Array]", Ro = "[object BigInt64Array]", Ao = "[object Float32Array]", xo = "[object Float64Array]";
function No() {}
function Li(r) {
    if (!r || typeof r != "object") return !1;
    const e = Object.getPrototypeOf(r);
    return e === null || e === Object.prototype || Object.getPrototypeOf(e) === null ? Object.prototype.toString.call(r) === "[object Object]" : !1;
}
function $o(r, e, t) {
    return De(r, e, void 0, void 0, void 0, void 0, t);
}
function De(r, e, t, i, s, n, o) {
    const a = o(r, e, t, i, s, n);
    if (a !== void 0) return a;
    if (typeof r == typeof e) switch(typeof r){
        case "bigint":
        case "string":
        case "boolean":
        case "symbol":
        case "undefined":
            return r === e;
        case "number":
            return r === e || Object.is(r, e);
        case "function":
            return r === e;
        case "object":
            return ve(r, e, n, o);
    }
    return ve(r, e, n, o);
}
function ve(r, e, t, i) {
    if (Object.is(r, e)) return !0;
    let s = $i(r), n = $i(e);
    if (s === zi && (s = Ze), n === zi && (n = Ze), s !== n) return !1;
    switch(s){
        case ho:
            return r.toString() === e.toString();
        case lo:
            {
                const c = r.valueOf(), h = e.valueOf();
                return ao(c, h);
            }
        case uo:
        case po:
        case go:
            return Object.is(r.valueOf(), e.valueOf());
        case co:
            return r.source === e.source && r.flags === e.flags;
        case fo:
            return r === e;
    }
    t = t ?? new Map;
    const o = t.get(r), a = t.get(e);
    if (o != null && a != null) return o === e;
    t.set(r, e), t.set(e, r);
    try {
        switch(s){
            case yo:
                {
                    if (r.size !== e.size) return !1;
                    for (const [c, h] of r.entries())if (!e.has(c) || !De(h, e.get(c), c, r, e, t, i)) return !1;
                    return !0;
                }
            case bo:
                {
                    if (r.size !== e.size) return !1;
                    const c = Array.from(r.values()), h = Array.from(e.values());
                    for(let l = 0; l < c.length; l++){
                        const p = c[l], y = h.findIndex((w)=>De(p, w, void 0, r, e, t, i));
                        if (y === -1) return !1;
                        h.splice(y, 1);
                    }
                    return !0;
                }
            case mo:
            case _o:
            case Eo:
            case Io:
            case To:
            case Co:
            case Po:
            case So:
            case Oo:
            case Ro:
            case Ao:
            case xo:
                {
                    if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"] < "u" && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].isBuffer(r) !== __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].isBuffer(e) || r.length !== e.length) return !1;
                    for(let c = 0; c < r.length; c++)if (!De(r[c], e[c], c, r, e, t, i)) return !1;
                    return !0;
                }
            case Do:
                return r.byteLength !== e.byteLength ? !1 : ve(new Uint8Array(r), new Uint8Array(e), t, i);
            case wo:
                return r.byteLength !== e.byteLength || r.byteOffset !== e.byteOffset ? !1 : ve(new Uint8Array(r), new Uint8Array(e), t, i);
            case vo:
                return r.name === e.name && r.message === e.message;
            case Ze:
                {
                    if (!(ve(r.constructor, e.constructor, t, i) || Li(r) && Li(e))) return !1;
                    const h = [
                        ...Object.keys(r),
                        ...Ni(r)
                    ], l = [
                        ...Object.keys(e),
                        ...Ni(e)
                    ];
                    if (h.length !== l.length) return !1;
                    for(let p = 0; p < h.length; p++){
                        const y = h[p], w = r[y];
                        if (!Object.hasOwn(e, y)) return !1;
                        const u = e[y];
                        if (!De(w, u, y, r, e, t, i)) return !1;
                    }
                    return !0;
                }
            default:
                return !1;
        }
    } finally{
        t.delete(r), t.delete(e);
    }
}
function zo(r, e) {
    return $o(r, e, No);
}
var Lo = Object.defineProperty, ki = Object.getOwnPropertySymbols, ko = Object.prototype.hasOwnProperty, jo = Object.prototype.propertyIsEnumerable, Qe = (r, e, t)=>e in r ? Lo(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, ji = (r, e)=>{
    for(var t in e || (e = {}))ko.call(e, t) && Qe(r, t, e[t]);
    if (ki) for (var t of ki(e))jo.call(e, t) && Qe(r, t, e[t]);
    return r;
}, F = (r, e, t)=>Qe(r, typeof e != "symbol" ? e + "" : e, t);
class Ui extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$types$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IStore"] {
    constructor(e, t, i, s = W, n = void 0){
        super(e, t, i, s), this.core = e, this.logger = t, this.name = i, F(this, "map", new Map), F(this, "version", Ut), F(this, "cached", []), F(this, "initialized", !1), F(this, "getKey"), F(this, "storagePrefix", W), F(this, "recentlyDeleted", []), F(this, "recentlyDeletedLimit", 200), F(this, "init", async ()=>{
            this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((o)=>{
                this.getKey && o !== null && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUndefined"])(o) ? this.map.set(this.getKey(o), o) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isProposalStruct"])(o) ? this.map.set(o.id, o) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSessionStruct"])(o) && this.map.set(o.topic, o);
            }), this.cached = [], this.initialized = !0);
        }), F(this, "set", async (o, a)=>{
            this.isInitialized(), this.map.has(o) ? await this.update(o, a) : (this.logger.debug("Setting value"), this.logger.trace({
                type: "method",
                method: "set",
                key: o,
                value: a
            }), this.map.set(o, a), await this.persist());
        }), F(this, "get", (o)=>(this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({
                type: "method",
                method: "get",
                key: o
            }), this.getData(o))), F(this, "getAll", (o)=>(this.isInitialized(), o ? this.values.filter((a)=>Object.keys(o).every((c)=>zo(a[c], o[c]))) : this.values)), F(this, "update", async (o, a)=>{
            this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({
                type: "method",
                method: "update",
                key: o,
                update: a
            });
            const c = ji(ji({}, this.getData(o)), a);
            this.map.set(o, c), await this.persist();
        }), F(this, "delete", async (o, a)=>{
            this.isInitialized(), this.map.has(o) && (this.logger.debug("Deleting value"), this.logger.trace({
                type: "method",
                method: "delete",
                key: o,
                reason: a
            }), this.map.delete(o), this.addToRecentlyDeleted(o), await this.persist());
        }), this.logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateChildLogger"])(t, this.name), this.storagePrefix = s, this.getKey = n;
    }
    get context() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLoggerContext"])(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
    }
    get length() {
        return this.map.size;
    }
    get keys() {
        return Array.from(this.map.keys());
    }
    get values() {
        return Array.from(this.map.values());
    }
    addToRecentlyDeleted(e) {
        this.recentlyDeleted.push(e), this.recentlyDeleted.length >= this.recentlyDeletedLimit && this.recentlyDeleted.splice(0, this.recentlyDeletedLimit / 2);
    }
    async setDataStore(e) {
        await this.core.storage.setItem(this.storageKey, e);
    }
    async getDataStore() {
        return await this.core.storage.getItem(this.storageKey);
    }
    getData(e) {
        const t = this.map.get(e);
        if (!t) {
            if (this.recentlyDeleted.includes(e)) {
                const { message: s } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `Record was recently deleted - ${this.name}: ${e}`);
                throw this.logger.error(s), new Error(s);
            }
            const { message: i } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("NO_MATCHING_KEY", `${this.name}: ${e}`);
            throw this.logger.error(i), new Error(i);
        }
        return t;
    }
    async persist() {
        await this.setDataStore(this.values);
    }
    async restore() {
        try {
            const e = await this.getDataStore();
            if (typeof e > "u" || !e.length) return;
            if (this.map.size) {
                const { message: t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("RESTORE_WILL_OVERRIDE", this.name);
                throw this.logger.error(t), new Error(t);
            }
            this.cached = e, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({
                type: "method",
                method: "restore",
                value: this.values
            });
        } catch (e) {
            this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e);
        }
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
}
var Uo = Object.defineProperty, Fo = (r, e, t)=>e in r ? Uo(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, d = (r, e, t)=>Fo(r, typeof e != "symbol" ? e + "" : e, t);
class Fi {
    constructor(e, t){
        this.core = e, this.logger = t, d(this, "name", Bt), d(this, "version", Vt), d(this, "events", new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]), d(this, "pairings"), d(this, "initialized", !1), d(this, "storagePrefix", W), d(this, "ignoredPayloadTypes", [
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE_1"]
        ]), d(this, "registeredMethods", []), d(this, "init", async ()=>{
            this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = !0, this.logger.trace("Initialized"));
        }), d(this, "register", ({ methods: i })=>{
            this.isInitialized(), this.registeredMethods = [
                ...new Set([
                    ...this.registeredMethods,
                    ...i
                ])
            ];
        }), d(this, "create", async (i)=>{
            this.isInitialized();
            const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateRandomBytes32"])(), n = await this.core.crypto.setSymKey(s), o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcExpiry"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_MINUTES"]), a = {
                protocol: $t
            }, c = {
                topic: n,
                expiry: o,
                relay: a,
                active: !1,
                methods: i?.methods
            }, h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUri"])({
                protocol: this.core.protocol,
                version: this.core.version,
                topic: n,
                symKey: s,
                relay: a,
                expiryTimestamp: o,
                methods: i?.methods
            });
            return this.events.emit(ae.create, c), this.core.expirer.set(n, o), await this.pairings.set(n, c), await this.core.relayer.subscribe(n, {
                transportType: i?.transportType,
                internal: i?.internal
            }), {
                topic: n,
                uri: h
            };
        }), d(this, "pair", async (i)=>{
            this.isInitialized();
            const s = this.core.eventClient.createEvent({
                properties: {
                    topic: i?.uri,
                    trace: [
                        Y.pairing_started
                    ]
                }
            });
            this.isValidPair(i, s);
            const { topic: n, symKey: o, relay: a, expiryTimestamp: c, methods: h } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUri"])(i.uri);
            s.props.properties.topic = n, s.addTrace(Y.pairing_uri_validation_success), s.addTrace(Y.pairing_uri_not_expired);
            let l;
            if (this.pairings.keys.includes(n)) {
                if (l = this.pairings.get(n), s.addTrace(Y.existing_pairing), l.active) throw s.setError(X.active_pairing_already_exists), new Error(`Pairing already exists: ${n}. Please try again with a new connection URI.`);
                s.addTrace(Y.pairing_not_expired);
            }
            const p = c || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcExpiry"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_MINUTES"]), y = {
                topic: n,
                relay: a,
                expiry: p,
                active: !1,
                methods: h
            };
            this.core.expirer.set(n, p), await this.pairings.set(n, y), s.addTrace(Y.store_new_pairing), i.activatePairing && await this.activate({
                topic: n
            }), this.events.emit(ae.create, y), s.addTrace(Y.emit_inactive_pairing), this.core.crypto.keychain.has(n) || await this.core.crypto.setSymKey(o, n), s.addTrace(Y.subscribing_pairing_topic);
            try {
                await this.core.relayer.confirmOnlineStateOrThrow();
            } catch  {
                s.setError(X.no_internet_connection);
            }
            try {
                await this.core.relayer.subscribe(n, {
                    relay: a
                });
            } catch (w) {
                throw s.setError(X.subscribe_pairing_topic_failure), w;
            }
            return s.addTrace(Y.subscribe_pairing_topic_success), y;
        }), d(this, "activate", async ({ topic: i })=>{
            this.isInitialized();
            const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcExpiry"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_MINUTES"]);
            this.core.expirer.set(i, s), await this.pairings.update(i, {
                active: !0,
                expiry: s
            });
        }), d(this, "ping", async (i)=>{
            this.isInitialized(), await this.isValidPing(i), this.logger.warn("ping() is deprecated and will be removed in the next major release.");
            const { topic: s } = i;
            if (this.pairings.keys.includes(s)) {
                const n = await this.sendRequest(s, "wc_pairingPing", {}), { done: o, resolve: a, reject: c } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDelayedPromise"])();
                this.events.once((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("pairing_ping", n), ({ error: h })=>{
                    h ? c(h) : a();
                }), await o();
            }
        }), d(this, "updateExpiry", async ({ topic: i, expiry: s })=>{
            this.isInitialized(), await this.pairings.update(i, {
                expiry: s
            });
        }), d(this, "updateMetadata", async ({ topic: i, metadata: s })=>{
            this.isInitialized(), await this.pairings.update(i, {
                peerMetadata: s
            });
        }), d(this, "getPairings", ()=>(this.isInitialized(), this.pairings.values)), d(this, "disconnect", async (i)=>{
            this.isInitialized(), await this.isValidDisconnect(i);
            const { topic: s } = i;
            this.pairings.keys.includes(s) && (await this.sendRequest(s, "wc_pairingDelete", (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSdkError"])("USER_DISCONNECTED")), await this.deletePairing(s));
        }), d(this, "formatUriFromPairing", (i)=>{
            this.isInitialized();
            const { topic: s, relay: n, expiry: o, methods: a } = i, c = this.core.crypto.keychain.get(s);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUri"])({
                protocol: this.core.protocol,
                version: this.core.version,
                topic: s,
                symKey: c,
                relay: n,
                expiryTimestamp: o,
                methods: a
            });
        }), d(this, "sendRequest", async (i, s, n)=>{
            const o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatJsonRpcRequest"])(s, n), a = await this.core.crypto.encode(i, o), c = oe[s].req;
            return this.core.history.set(i, o), this.core.relayer.publish(i, a, c), o.id;
        }), d(this, "sendResult", async (i, s, n)=>{
            const o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatJsonRpcResult"])(i, n), a = await this.core.crypto.encode(s, o), c = (await this.core.history.get(s, i)).request.method, h = oe[c].res;
            await this.core.relayer.publish(s, a, h), await this.core.history.resolve(o);
        }), d(this, "sendError", async (i, s, n)=>{
            const o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatJsonRpcError"])(i, n), a = await this.core.crypto.encode(s, o), c = (await this.core.history.get(s, i)).request.method, h = oe[c] ? oe[c].res : oe.unregistered_method.res;
            await this.core.relayer.publish(s, a, h), await this.core.history.resolve(o);
        }), d(this, "deletePairing", async (i, s)=>{
            await this.core.relayer.unsubscribe(i), await Promise.all([
                this.pairings.delete(i, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSdkError"])("USER_DISCONNECTED")),
                this.core.crypto.deleteSymKey(i),
                s ? Promise.resolve() : this.core.expirer.del(i)
            ]);
        }), d(this, "cleanup", async ()=>{
            const i = this.pairings.getAll().filter((s)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isExpired"])(s.expiry));
            await Promise.all(i.map((s)=>this.deletePairing(s.topic)));
        }), d(this, "onRelayEventRequest", async (i)=>{
            const { topic: s, payload: n } = i;
            switch(n.method){
                case "wc_pairingPing":
                    return await this.onPairingPingRequest(s, n);
                case "wc_pairingDelete":
                    return await this.onPairingDeleteRequest(s, n);
                default:
                    return await this.onUnknownRpcMethodRequest(s, n);
            }
        }), d(this, "onRelayEventResponse", async (i)=>{
            const { topic: s, payload: n } = i, o = (await this.core.history.get(s, n.id)).request.method;
            switch(o){
                case "wc_pairingPing":
                    return this.onPairingPingResponse(s, n);
                default:
                    return this.onUnknownRpcMethodResponse(o);
            }
        }), d(this, "onPairingPingRequest", async (i, s)=>{
            const { id: n } = s;
            try {
                this.isValidPing({
                    topic: i
                }), await this.sendResult(n, i, !0), this.events.emit(ae.ping, {
                    id: n,
                    topic: i
                });
            } catch (o) {
                await this.sendError(n, i, o), this.logger.error(o);
            }
        }), d(this, "onPairingPingResponse", (i, s)=>{
            const { id: n } = s;
            setTimeout(()=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcResult"])(s) ? this.events.emit((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("pairing_ping", n), {}) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcError"])(s) && this.events.emit((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("pairing_ping", n), {
                    error: s.error
                });
            }, 500);
        }), d(this, "onPairingDeleteRequest", async (i, s)=>{
            const { id: n } = s;
            try {
                this.isValidDisconnect({
                    topic: i
                }), await this.deletePairing(i), this.events.emit(ae.delete, {
                    id: n,
                    topic: i
                });
            } catch (o) {
                await this.sendError(n, i, o), this.logger.error(o);
            }
        }), d(this, "onUnknownRpcMethodRequest", async (i, s)=>{
            const { id: n, method: o } = s;
            try {
                if (this.registeredMethods.includes(o)) return;
                const a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSdkError"])("WC_METHOD_UNSUPPORTED", o);
                await this.sendError(n, i, a), this.logger.error(a);
            } catch (a) {
                await this.sendError(n, i, a), this.logger.error(a);
            }
        }), d(this, "onUnknownRpcMethodResponse", (i)=>{
            this.registeredMethods.includes(i) || this.logger.error((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSdkError"])("WC_METHOD_UNSUPPORTED", i));
        }), d(this, "isValidPair", (i, s)=>{
            var n;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidParams"])(i)) {
                const { message: a } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `pair() params: ${i}`);
                throw s.setError(X.malformed_pairing_uri), new Error(a);
            }
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidUrl"])(i.uri)) {
                const { message: a } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `pair() uri: ${i.uri}`);
                throw s.setError(X.malformed_pairing_uri), new Error(a);
            }
            const o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUri"])(i?.uri);
            if (!((n = o?.relay) != null && n.protocol)) {
                const { message: a } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", "pair() uri#relay-protocol");
                throw s.setError(X.malformed_pairing_uri), new Error(a);
            }
            if (!(o != null && o.symKey)) {
                const { message: a } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", "pair() uri#symKey");
                throw s.setError(X.malformed_pairing_uri), new Error(a);
            }
            if (o != null && o.expiryTimestamp && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMiliseconds"])(o?.expiryTimestamp) < Date.now()) {
                s.setError(X.pairing_expired);
                const { message: a } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("EXPIRED", "pair() URI has expired. Please try again with a new connection URI.");
                throw new Error(a);
            }
        }), d(this, "isValidPing", async (i)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidParams"])(i)) {
                const { message: n } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `ping() params: ${i}`);
                throw new Error(n);
            }
            const { topic: s } = i;
            await this.isValidPairingTopic(s);
        }), d(this, "isValidDisconnect", async (i)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidParams"])(i)) {
                const { message: n } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `disconnect() params: ${i}`);
                throw new Error(n);
            }
            const { topic: s } = i;
            await this.isValidPairingTopic(s);
        }), d(this, "isValidPairingTopic", async (i)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidString"])(i, !1)) {
                const { message: s } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `pairing topic should be a string: ${i}`);
                throw new Error(s);
            }
            if (!this.pairings.keys.includes(i)) {
                const { message: s } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("NO_MATCHING_KEY", `pairing topic doesn't exist: ${i}`);
                throw new Error(s);
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isExpired"])(this.pairings.get(i).expiry)) {
                await this.deletePairing(i);
                const { message: s } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("EXPIRED", `pairing topic: ${i}`);
                throw new Error(s);
            }
        }), this.core = e, this.logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateChildLogger"])(t, this.name), this.pairings = new Ui(this.core, this.logger, this.name, this.storagePrefix);
    }
    get context() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLoggerContext"])(this.logger);
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
    registerRelayerEvents() {
        this.core.relayer.on(C.message, async (e)=>{
            const { topic: t, message: i, transportType: s } = e;
            if (this.pairings.keys.includes(t) && s !== ee.link_mode && !this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(i))) try {
                const n = await this.core.crypto.decode(t, i);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcRequest"])(n) ? (this.core.history.set(t, n), await this.onRelayEventRequest({
                    topic: t,
                    payload: n
                })) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcResponse"])(n) && (await this.core.history.resolve(n), await this.onRelayEventResponse({
                    topic: t,
                    payload: n
                }), this.core.history.delete(t, n.id)), await this.core.relayer.messages.ack(t, i);
            } catch (n) {
                this.logger.error(n);
            }
        });
    }
    registerExpirerEvents() {
        this.core.expirer.on(q.expired, async (e)=>{
            const { topic: t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseExpirerTarget"])(e.target);
            t && this.pairings.keys.includes(t) && (await this.deletePairing(t, !0), this.events.emit(ae.expire, {
                topic: t
            }));
        });
    }
}
var Mo = Object.defineProperty, Ko = (r, e, t)=>e in r ? Mo(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, N = (r, e, t)=>Ko(r, typeof e != "symbol" ? e + "" : e, t);
class Mi extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$types$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IJsonRpcHistory"] {
    constructor(e, t){
        super(e, t), this.core = e, this.logger = t, N(this, "records", new Map), N(this, "events", new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventEmitter"]), N(this, "name", qt), N(this, "version", Gt), N(this, "cached", []), N(this, "initialized", !1), N(this, "storagePrefix", W), N(this, "init", async ()=>{
            this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i)=>this.records.set(i.id, i)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
        }), N(this, "set", (i, s, n)=>{
            if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({
                type: "method",
                method: "set",
                topic: i,
                request: s,
                chainId: n
            }), this.records.has(s.id)) return;
            const o = {
                id: s.id,
                topic: i,
                request: {
                    method: s.method,
                    params: s.params || null
                },
                chainId: n,
                expiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcExpiry"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["THIRTY_DAYS"])
            };
            this.records.set(o.id, o), this.persist(), this.events.emit(V.created, o);
        }), N(this, "resolve", async (i)=>{
            if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({
                type: "method",
                method: "update",
                response: i
            }), !this.records.has(i.id)) return;
            const s = await this.getRecord(i.id);
            typeof s.response > "u" && (s.response = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcError"])(i) ? {
                error: i.error
            } : {
                result: i.result
            }, this.records.set(s.id, s), this.persist(), this.events.emit(V.updated, s));
        }), N(this, "get", async (i, s)=>(this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({
                type: "method",
                method: "get",
                topic: i,
                id: s
            }), await this.getRecord(s))), N(this, "delete", (i, s)=>{
            this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({
                type: "method",
                method: "delete",
                id: s
            }), this.values.forEach((n)=>{
                if (n.topic === i) {
                    if (typeof s < "u" && n.id !== s) return;
                    this.records.delete(n.id), this.events.emit(V.deleted, n);
                }
            }), this.persist();
        }), N(this, "exists", async (i, s)=>(this.isInitialized(), this.records.has(s) ? (await this.getRecord(s)).topic === i : !1)), N(this, "on", (i, s)=>{
            this.events.on(i, s);
        }), N(this, "once", (i, s)=>{
            this.events.once(i, s);
        }), N(this, "off", (i, s)=>{
            this.events.off(i, s);
        }), N(this, "removeListener", (i, s)=>{
            this.events.removeListener(i, s);
        }), this.logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateChildLogger"])(t, this.name);
    }
    get context() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLoggerContext"])(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
    }
    get size() {
        return this.records.size;
    }
    get keys() {
        return Array.from(this.records.keys());
    }
    get values() {
        return Array.from(this.records.values());
    }
    get pending() {
        const e = [];
        return this.values.forEach((t)=>{
            if (typeof t.response < "u") return;
            const i = {
                topic: t.topic,
                request: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatJsonRpcRequest"])(t.request.method, t.request.params, t.id),
                chainId: t.chainId
            };
            return e.push(i);
        }), e;
    }
    async setJsonRpcRecords(e) {
        await this.core.storage.setItem(this.storageKey, e);
    }
    async getJsonRpcRecords() {
        return await this.core.storage.getItem(this.storageKey);
    }
    getRecord(e) {
        this.isInitialized();
        const t = this.records.get(e);
        if (!t) {
            const { message: i } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("NO_MATCHING_KEY", `${this.name}: ${e}`);
            throw new Error(i);
        }
        return t;
    }
    async persist() {
        await this.setJsonRpcRecords(this.values), this.events.emit(V.sync);
    }
    async restore() {
        try {
            const e = await this.getJsonRpcRecords();
            if (typeof e > "u" || !e.length) return;
            if (this.records.size) {
                const { message: t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("RESTORE_WILL_OVERRIDE", this.name);
                throw this.logger.error(t), new Error(t);
            }
            this.cached = e, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({
                type: "method",
                method: "restore",
                records: this.values
            });
        } catch (e) {
            this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e);
        }
    }
    registerEventListeners() {
        this.events.on(V.created, (e)=>{
            const t = V.created;
            this.logger.info(`Emitting ${t}`), this.logger.debug({
                type: "event",
                event: t,
                record: e
            });
        }), this.events.on(V.updated, (e)=>{
            const t = V.updated;
            this.logger.info(`Emitting ${t}`), this.logger.debug({
                type: "event",
                event: t,
                record: e
            });
        }), this.events.on(V.deleted, (e)=>{
            const t = V.deleted;
            this.logger.info(`Emitting ${t}`), this.logger.debug({
                type: "event",
                event: t,
                record: e
            });
        }), this.core.heartbeat.on(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$heartbeat$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HEARTBEAT_EVENTS"].pulse, ()=>{
            this.cleanup();
        });
    }
    cleanup() {
        try {
            this.isInitialized();
            let e = !1;
            this.records.forEach((t)=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMiliseconds"])(t.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${t.id}`), this.records.delete(t.id), this.events.emit(V.deleted, t, !1), e = !0);
            }), e && this.persist();
        } catch (e) {
            this.logger.warn(e);
        }
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
}
var Bo = Object.defineProperty, Vo = (r, e, t)=>e in r ? Bo(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, z = (r, e, t)=>Vo(r, typeof e != "symbol" ? e + "" : e, t);
class Ki extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$types$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IExpirer"] {
    constructor(e, t){
        super(e, t), this.core = e, this.logger = t, z(this, "expirations", new Map), z(this, "events", new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventEmitter"]), z(this, "name", Wt), z(this, "version", Ht), z(this, "cached", []), z(this, "initialized", !1), z(this, "storagePrefix", W), z(this, "init", async ()=>{
            this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i)=>this.expirations.set(i.target, i)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
        }), z(this, "has", (i)=>{
            try {
                const s = this.formatTarget(i);
                return typeof this.getExpiration(s) < "u";
            } catch  {
                return !1;
            }
        }), z(this, "set", (i, s)=>{
            this.isInitialized();
            const n = this.formatTarget(i), o = {
                target: n,
                expiry: s
            };
            this.expirations.set(n, o), this.checkExpiry(n, o), this.events.emit(q.created, {
                target: n,
                expiration: o
            });
        }), z(this, "get", (i)=>{
            this.isInitialized();
            const s = this.formatTarget(i);
            return this.getExpiration(s);
        }), z(this, "del", (i)=>{
            if (this.isInitialized(), this.has(i)) {
                const s = this.formatTarget(i), n = this.getExpiration(s);
                this.expirations.delete(s), this.events.emit(q.deleted, {
                    target: s,
                    expiration: n
                });
            }
        }), z(this, "on", (i, s)=>{
            this.events.on(i, s);
        }), z(this, "once", (i, s)=>{
            this.events.once(i, s);
        }), z(this, "off", (i, s)=>{
            this.events.off(i, s);
        }), z(this, "removeListener", (i, s)=>{
            this.events.removeListener(i, s);
        }), this.logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateChildLogger"])(t, this.name);
    }
    get context() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLoggerContext"])(this.logger);
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
    }
    get length() {
        return this.expirations.size;
    }
    get keys() {
        return Array.from(this.expirations.keys());
    }
    get values() {
        return Array.from(this.expirations.values());
    }
    formatTarget(e) {
        if (typeof e == "string") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTopicTarget"])(e);
        if (typeof e == "number") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatIdTarget"])(e);
        const { message: t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("UNKNOWN_TYPE", `Target type: ${typeof e}`);
        throw new Error(t);
    }
    async setExpirations(e) {
        await this.core.storage.setItem(this.storageKey, e);
    }
    async getExpirations() {
        return await this.core.storage.getItem(this.storageKey);
    }
    async persist() {
        await this.setExpirations(this.values), this.events.emit(q.sync);
    }
    async restore() {
        try {
            const e = await this.getExpirations();
            if (typeof e > "u" || !e.length) return;
            if (this.expirations.size) {
                const { message: t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("RESTORE_WILL_OVERRIDE", this.name);
                throw this.logger.error(t), new Error(t);
            }
            this.cached = e, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({
                type: "method",
                method: "restore",
                expirations: this.values
            });
        } catch (e) {
            this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e);
        }
    }
    getExpiration(e) {
        const t = this.expirations.get(e);
        if (!t) {
            const { message: i } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("NO_MATCHING_KEY", `${this.name}: ${e}`);
            throw this.logger.warn(i), new Error(i);
        }
        return t;
    }
    checkExpiry(e, t) {
        const { expiry: i } = t;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMiliseconds"])(i) - Date.now() <= 0 && this.expire(e, t);
    }
    expire(e, t) {
        this.expirations.delete(e), this.events.emit(q.expired, {
            target: e,
            expiration: t
        });
    }
    checkExpirations() {
        this.core.relayer.connected && this.expirations.forEach((e, t)=>this.checkExpiry(t, e));
    }
    registerEventListeners() {
        this.core.heartbeat.on(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$heartbeat$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HEARTBEAT_EVENTS"].pulse, ()=>this.checkExpirations()), this.events.on(q.created, (e)=>{
            const t = q.created;
            this.logger.info(`Emitting ${t}`), this.logger.debug({
                type: "event",
                event: t,
                data: e
            }), this.persist();
        }), this.events.on(q.expired, (e)=>{
            const t = q.expired;
            this.logger.info(`Emitting ${t}`), this.logger.debug({
                type: "event",
                event: t,
                data: e
            }), this.persist();
        }), this.events.on(q.deleted, (e)=>{
            const t = q.deleted;
            this.logger.info(`Emitting ${t}`), this.logger.debug({
                type: "event",
                event: t,
                data: e
            }), this.persist();
        });
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: e } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("NOT_INITIALIZED", this.name);
            throw new Error(e);
        }
    }
}
var qo = Object.defineProperty, Go = (r, e, t)=>e in r ? qo(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, P = (r, e, t)=>Go(r, typeof e != "symbol" ? e + "" : e, t);
class Bi extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$types$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IVerify"] {
    constructor(e, t, i){
        super(e, t, i), this.core = e, this.logger = t, this.store = i, P(this, "name", Yt), P(this, "abortController"), P(this, "isDevEnv"), P(this, "verifyUrlV3", Xt), P(this, "storagePrefix", W), P(this, "version", Fe), P(this, "publicKey"), P(this, "fetchPromise"), P(this, "init", async ()=>{
            var s;
            this.isDevEnv || (this.publicKey = await this.store.getItem(this.storeKey), this.publicKey && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMiliseconds"])((s = this.publicKey) == null ? void 0 : s.expiresAt) < Date.now() && (this.logger.debug("verify v2 public key expired"), await this.removePublicKey()));
        }), P(this, "register", async (s)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBrowser"])() || this.isDevEnv) return;
            const n = window.location.origin, { id: o, decryptedId: a } = s, c = `${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${n}&id=${o}&decryptedId=${a}`;
            try {
                const h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$window$2d$getters$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocument"])(), l = this.startAbortTimer(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_SECOND"] * 5), p = await new Promise((y, w)=>{
                    const u = ()=>{
                        window.removeEventListener("message", D), h.body.removeChild(m), w("attestation aborted");
                    };
                    this.abortController.signal.addEventListener("abort", u);
                    const m = h.createElement("iframe");
                    m.src = c, m.style.display = "none", m.addEventListener("error", u, {
                        signal: this.abortController.signal
                    });
                    const D = (_)=>{
                        if (_.data && typeof _.data == "string") try {
                            const E = JSON.parse(_.data);
                            if (E.type === "verify_attestation") {
                                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$relay$2d$auth$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeJWT"])(E.attestation).payload.id !== o) return;
                                clearInterval(l), h.body.removeChild(m), this.abortController.signal.removeEventListener("abort", u), window.removeEventListener("message", D), y(E.attestation === null ? "" : E.attestation);
                            }
                        } catch (E) {
                            this.logger.warn(E);
                        }
                    };
                    h.body.appendChild(m), window.addEventListener("message", D, {
                        signal: this.abortController.signal
                    });
                });
                return this.logger.debug("jwt attestation", p), p;
            } catch (h) {
                this.logger.warn(h);
            }
            return "";
        }), P(this, "resolve", async (s)=>{
            if (this.isDevEnv) return "";
            const { attestationId: n, hash: o, encryptedId: a } = s;
            if (n === "") {
                this.logger.debug("resolve: attestationId is empty, skipping");
                return;
            }
            if (n) {
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$relay$2d$auth$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeJWT"])(n).payload.id !== a) return;
                const h = await this.isValidJwtAttestation(n);
                if (h) {
                    if (!h.isVerified) {
                        this.logger.warn("resolve: jwt attestation: origin url not verified");
                        return;
                    }
                    return h;
                }
            }
            if (!o) return;
            const c = this.getVerifyUrl(s?.verifyUrl);
            return this.fetchAttestation(o, c);
        }), P(this, "fetchAttestation", async (s, n)=>{
            this.logger.debug(`resolving attestation: ${s} from url: ${n}`);
            const o = this.startAbortTimer(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_SECOND"] * 5), a = await fetch(`${n}/attestation/${s}?v2Supported=true`, {
                signal: this.abortController.signal
            });
            return clearTimeout(o), a.status === 200 ? await a.json() : void 0;
        }), P(this, "getVerifyUrl", (s)=>{
            let n = s || be;
            return Zt.includes(n) || (this.logger.info(`verify url: ${n}, not included in trusted list, assigning default: ${be}`), n = be), n;
        }), P(this, "fetchPublicKey", async ()=>{
            try {
                this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);
                const s = this.startAbortTimer(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_SECONDS"]), n = await fetch(`${this.verifyUrlV3}/public-key`, {
                    signal: this.abortController.signal
                });
                return clearTimeout(s), await n.json();
            } catch (s) {
                this.logger.warn(s);
            }
        }), P(this, "persistPublicKey", async (s)=>{
            this.logger.debug("persisting public key to local storage", s), await this.store.setItem(this.storeKey, s), this.publicKey = s;
        }), P(this, "removePublicKey", async ()=>{
            this.logger.debug("removing verify v2 public key from storage"), await this.store.removeItem(this.storeKey), this.publicKey = void 0;
        }), P(this, "isValidJwtAttestation", async (s)=>{
            const n = await this.getPublicKey();
            try {
                if (n) return this.validateAttestation(s, n);
            } catch (a) {
                this.logger.error(a), this.logger.warn("error validating attestation");
            }
            const o = await this.fetchAndPersistPublicKey();
            try {
                if (o) return this.validateAttestation(s, o);
            } catch (a) {
                this.logger.error(a), this.logger.warn("error validating attestation");
            }
        }), P(this, "getPublicKey", async ()=>this.publicKey ? this.publicKey : await this.fetchAndPersistPublicKey()), P(this, "fetchAndPersistPublicKey", async ()=>{
            if (this.fetchPromise) return await this.fetchPromise, this.publicKey;
            this.fetchPromise = new Promise(async (n)=>{
                const o = await this.fetchPublicKey();
                o && (await this.persistPublicKey(o), n(o));
            });
            const s = await this.fetchPromise;
            return this.fetchPromise = void 0, s;
        }), P(this, "validateAttestation", (s, n)=>{
            const o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verifyP256Jwt"])(s, n.publicKey), a = {
                hasExpired: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMiliseconds"])(o.exp) < Date.now(),
                payload: o
            };
            if (a.hasExpired) throw this.logger.warn("resolve: jwt attestation expired"), new Error("JWT attestation expired");
            return {
                origin: a.payload.origin,
                isScam: a.payload.isScam,
                isVerified: a.payload.isVerified
            };
        }), this.logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateChildLogger"])(t, this.name), this.abortController = new AbortController, this.isDevEnv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTestRun"])(), this.init();
    }
    get storeKey() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + "//verify:public:key";
    }
    get context() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLoggerContext"])(this.logger);
    }
    startAbortTimer(e) {
        return this.abortController = new AbortController, setTimeout(()=>this.abortController.abort(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMiliseconds"])(e));
    }
}
var Wo = Object.defineProperty, Ho = (r, e, t)=>e in r ? Wo(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, Vi = (r, e, t)=>Ho(r, typeof e != "symbol" ? e + "" : e, t);
class qi extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$types$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IEchoClient"] {
    constructor(e, t){
        super(e, t), this.projectId = e, this.logger = t, Vi(this, "context", Qt), Vi(this, "registerDeviceToken", async (i)=>{
            const { clientId: s, token: n, notificationType: o, enableEncrypted: a = !1 } = i, c = `${ei}/${this.projectId}/clients`;
            await fetch(c, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    client_id: s,
                    type: o,
                    token: n,
                    always_raw: a
                })
            });
        }), this.logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateChildLogger"])(t, this.context);
    }
}
var Yo = Object.defineProperty, Gi = Object.getOwnPropertySymbols, Jo = Object.prototype.hasOwnProperty, Xo = Object.prototype.propertyIsEnumerable, et = (r, e, t)=>e in r ? Yo(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, we = (r, e)=>{
    for(var t in e || (e = {}))Jo.call(e, t) && et(r, t, e[t]);
    if (Gi) for (var t of Gi(e))Xo.call(e, t) && et(r, t, e[t]);
    return r;
}, R = (r, e, t)=>et(r, typeof e != "symbol" ? e + "" : e, t);
class Wi extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$types$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IEventClient"] {
    constructor(e, t, i = !0){
        super(e, t, i), this.core = e, this.logger = t, R(this, "context", ii), R(this, "storagePrefix", W), R(this, "storageVersion", ti), R(this, "events", new Map), R(this, "shouldPersist", !1), R(this, "init", async ()=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTestRun"])()) try {
                const s = {
                    eventId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uuidv4"])(),
                    timestamp: Date.now(),
                    domain: this.getAppDomain(),
                    props: {
                        event: "INIT",
                        type: "",
                        properties: {
                            client_id: await this.core.crypto.getClientId(),
                            user_agent: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUA"])(this.core.relayer.protocol, this.core.relayer.version, Pe)
                        }
                    }
                };
                await this.sendEvent([
                    s
                ]);
            } catch (s) {
                this.logger.warn(s);
            }
        }), R(this, "createEvent", (s)=>{
            const { event: n = "ERROR", type: o = "", properties: { topic: a, trace: c } } = s, h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uuidv4"])(), l = this.core.projectId || "", p = Date.now(), y = we({
                eventId: h,
                timestamp: p,
                props: {
                    event: n,
                    type: o,
                    properties: {
                        topic: a,
                        trace: c
                    }
                },
                bundleId: l,
                domain: this.getAppDomain()
            }, this.setMethods(h));
            return this.telemetryEnabled && (this.events.set(h, y), this.shouldPersist = !0), y;
        }), R(this, "getEvent", (s)=>{
            const { eventId: n, topic: o } = s;
            if (n) return this.events.get(n);
            const a = Array.from(this.events.values()).find((c)=>c.props.properties.topic === o);
            if (a) return we(we({}, a), this.setMethods(a.eventId));
        }), R(this, "deleteEvent", (s)=>{
            const { eventId: n } = s;
            this.events.delete(n), this.shouldPersist = !0;
        }), R(this, "setEventListeners", ()=>{
            this.core.heartbeat.on(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$heartbeat$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HEARTBEAT_EVENTS"].pulse, async ()=>{
                this.shouldPersist && await this.persist(), this.events.forEach((s)=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromMiliseconds"])(Date.now()) - (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fromMiliseconds"])(s.timestamp) > si && (this.events.delete(s.eventId), this.shouldPersist = !0);
                });
            });
        }), R(this, "setMethods", (s)=>({
                addTrace: (n)=>this.addTrace(s, n),
                setError: (n)=>this.setError(s, n)
            })), R(this, "addTrace", (s, n)=>{
            const o = this.events.get(s);
            o && (o.props.properties.trace.push(n), this.events.set(s, o), this.shouldPersist = !0);
        }), R(this, "setError", (s, n)=>{
            const o = this.events.get(s);
            o && (o.props.type = n, o.timestamp = Date.now(), this.events.set(s, o), this.shouldPersist = !0);
        }), R(this, "persist", async ()=>{
            await this.core.storage.setItem(this.storageKey, Array.from(this.events.values())), this.shouldPersist = !1;
        }), R(this, "restore", async ()=>{
            try {
                const s = await this.core.storage.getItem(this.storageKey) || [];
                if (!s.length) return;
                s.forEach((n)=>{
                    this.events.set(n.eventId, we(we({}, n), this.setMethods(n.eventId)));
                });
            } catch (s) {
                this.logger.warn(s);
            }
        }), R(this, "submit", async ()=>{
            if (!this.telemetryEnabled || this.events.size === 0) return;
            const s = [];
            for (const [n, o] of this.events)o.props.type && s.push(o);
            if (s.length !== 0) try {
                if ((await this.sendEvent(s)).ok) for (const n of s)this.events.delete(n.eventId), this.shouldPersist = !0;
            } catch (n) {
                this.logger.warn(n);
            }
        }), R(this, "sendEvent", async (s)=>{
            const n = this.getAppDomain() ? "" : "&sp=desktop";
            return await fetch(`${ri}?projectId=${this.core.projectId}&st=events_sdk&sv=js-${Pe}${n}`, {
                method: "POST",
                body: JSON.stringify(s)
            });
        }), R(this, "getAppDomain", ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAppMetadata"])().url), this.logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateChildLogger"])(t, this.context), this.telemetryEnabled = i, i ? this.restore().then(async ()=>{
            await this.submit(), this.setEventListeners();
        }) : this.persist();
    }
    get storageKey() {
        return this.storagePrefix + this.storageVersion + this.core.customStoragePrefix + "//" + this.context;
    }
}
var Zo = Object.defineProperty, Hi = Object.getOwnPropertySymbols, Qo = Object.prototype.hasOwnProperty, ea = Object.prototype.propertyIsEnumerable, tt = (r, e, t)=>e in r ? Zo(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, Yi = (r, e)=>{
    for(var t in e || (e = {}))Qo.call(e, t) && tt(r, t, e[t]);
    if (Hi) for (var t of Hi(e))ea.call(e, t) && tt(r, t, e[t]);
    return r;
}, v = (r, e, t)=>tt(r, typeof e != "symbol" ? e + "" : e, t);
class Oe extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$types$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ICore"] {
    constructor(e){
        var t;
        super(e), v(this, "protocol", Ue), v(this, "version", Fe), v(this, "name", pe), v(this, "relayUrl"), v(this, "projectId"), v(this, "customStoragePrefix"), v(this, "events", new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventEmitter"]), v(this, "logger"), v(this, "heartbeat"), v(this, "relayer"), v(this, "crypto"), v(this, "storage"), v(this, "history"), v(this, "expirer"), v(this, "pairing"), v(this, "verify"), v(this, "echoClient"), v(this, "linkModeSupportedApps"), v(this, "eventClient"), v(this, "initialized", !1), v(this, "logChunkController"), v(this, "on", (a, c)=>this.events.on(a, c)), v(this, "once", (a, c)=>this.events.once(a, c)), v(this, "off", (a, c)=>this.events.off(a, c)), v(this, "removeListener", (a, c)=>this.events.removeListener(a, c)), v(this, "dispatchEnvelope", ({ topic: a, message: c, sessionExists: h })=>{
            if (!a || !c) return;
            const l = {
                topic: a,
                message: c,
                publishedAt: Date.now(),
                transportType: ee.link_mode
            };
            this.relayer.onLinkMessageEvent(l, {
                sessionExists: h
            });
        });
        const i = this.getGlobalCore(e?.customStoragePrefix);
        if (i) try {
            return this.customStoragePrefix = i.customStoragePrefix, this.logger = i.logger, this.heartbeat = i.heartbeat, this.crypto = i.crypto, this.history = i.history, this.expirer = i.expirer, this.storage = i.storage, this.relayer = i.relayer, this.pairing = i.pairing, this.verify = i.verify, this.echoClient = i.echoClient, this.linkModeSupportedApps = i.linkModeSupportedApps, this.eventClient = i.eventClient, this.initialized = i.initialized, this.logChunkController = i.logChunkController, i;
        } catch (a) {
            console.warn("Failed to copy global core", a);
        }
        this.projectId = e?.projectId, this.relayUrl = e?.relayUrl || Ke, this.customStoragePrefix = e != null && e.customStoragePrefix ? `:${e.customStoragePrefix}` : "";
        const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDefaultLoggerOptions"])({
            level: typeof e?.logger == "string" && e.logger ? e.logger : It.logger,
            name: pe
        }), { logger: n, chunkLoggerController: o } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generatePlatformLogger"])({
            opts: s,
            maxSizeInBytes: e?.maxLogBlobSizeInBytes,
            loggerOverride: e?.logger
        });
        this.logChunkController = o, (t = this.logChunkController) != null && t.downloadLogsBlobInBrowser && (window.downloadLogsBlobInBrowser = async ()=>{
            var a, c;
            (a = this.logChunkController) != null && a.downloadLogsBlobInBrowser && ((c = this.logChunkController) == null || c.downloadLogsBlobInBrowser({
                clientId: await this.crypto.getClientId()
            }));
        }), this.logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateChildLogger"])(n, this.name), this.heartbeat = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$heartbeat$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeartBeat"], this.crypto = new Ei(this, this.logger, e?.keychain), this.history = new Mi(this, this.logger), this.expirer = new Ki(this, this.logger), this.storage = e != null && e.storage ? e.storage : new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$keyvaluestorage$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](Yi(Yi({}, Tt), e?.storageOptions)), this.relayer = new xi({
            core: this,
            logger: this.logger,
            relayUrl: this.relayUrl,
            projectId: this.projectId
        }), this.pairing = new Fi(this, this.logger), this.verify = new Bi(this, this.logger, this.storage), this.echoClient = new qi(this.projectId || "", this.logger), this.linkModeSupportedApps = [], this.eventClient = new Wi(this, this.logger, e?.telemetryEnabled), this.setGlobalCore(this);
    }
    static async init(e) {
        const t = new Oe(e);
        await t.initialize();
        const i = await t.crypto.getClientId();
        return await t.storage.setItem(Ft, i), t;
    }
    get context() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLoggerContext"])(this.logger);
    }
    async start() {
        this.initialized || await this.initialize();
    }
    async getLogsBlob() {
        var e;
        return (e = this.logChunkController) == null ? void 0 : e.logsToBlob({
            clientId: await this.crypto.getClientId()
        });
    }
    async addLinkModeSupportedApp(e) {
        this.linkModeSupportedApps.includes(e) || (this.linkModeSupportedApps.push(e), await this.storage.setItem(Be, this.linkModeSupportedApps));
    }
    async initialize() {
        this.logger.trace("Initialized");
        try {
            await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.linkModeSupportedApps = await this.storage.getItem(Be) || [], this.initialized = !0, this.logger.info("Core Initialization Success");
        } catch (e) {
            throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e), this.logger.error(e.message), e;
        }
    }
    getGlobalCore(e = "") {
        try {
            if (this.isGlobalCoreDisabled()) return;
            const t = `_walletConnectCore_${e}`, i = `${t}_count`;
            return globalThis[i] = (globalThis[i] || 0) + 1, globalThis[i] > 1 && console.warn(`WalletConnect Core is already initialized. This is probably a mistake and can lead to unexpected behavior. Init() was called ${globalThis[i]} times.`), globalThis[t];
        } catch (t) {
            console.warn("Failed to get global WalletConnect core", t);
            return;
        }
    }
    setGlobalCore(e) {
        var t;
        try {
            if (this.isGlobalCoreDisabled()) return;
            const i = `_walletConnectCore_${((t = e.opts) == null ? void 0 : t.customStoragePrefix) || ""}`;
            globalThis[i] = e;
        } catch (i) {
            console.warn("Failed to set global WalletConnect core", i);
        }
    }
    isGlobalCoreDisabled() {
        try {
            return typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] < "u" && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.DISABLE_GLOBAL_CORE === "true";
        } catch  {
            return !0;
        }
    }
}
const ta = Oe;
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/sign-client/dist/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUTH_CONTEXT",
    ()=>ft,
    "AUTH_KEYS_CONTEXT",
    ()=>Et,
    "AUTH_PAIRING_TOPIC_CONTEXT",
    ()=>St,
    "AUTH_PROTOCOL",
    ()=>_t,
    "AUTH_PUBLIC_KEY_NAME",
    ()=>pe,
    "AUTH_REQUEST_CONTEXT",
    ()=>Rt,
    "AUTH_STORAGE_PREFIX",
    ()=>le,
    "AUTH_VERSION",
    ()=>Ns,
    "ENGINE_CONTEXT",
    ()=>gt,
    "ENGINE_QUEUE_STATES",
    ()=>M,
    "ENGINE_RPC_OPTS",
    ()=>P,
    "HISTORY_CONTEXT",
    ()=>Ts,
    "HISTORY_EVENTS",
    ()=>Is,
    "HISTORY_STORAGE_VERSION",
    ()=>qs,
    "METHODS_TO_VERIFY",
    ()=>mt,
    "PROPOSAL_CONTEXT",
    ()=>dt,
    "PROPOSAL_EXPIRY",
    ()=>Ps,
    "PROPOSAL_EXPIRY_MESSAGE",
    ()=>Me,
    "REQUEST_CONTEXT",
    ()=>wt,
    "SESSION_CONTEXT",
    ()=>ut,
    "SESSION_EXPIRY",
    ()=>B,
    "SESSION_REQUEST_EXPIRY_BOUNDARIES",
    ()=>_e,
    "SIGN_CLIENT_CONTEXT",
    ()=>De,
    "SIGN_CLIENT_DEFAULT",
    ()=>me,
    "SIGN_CLIENT_EVENTS",
    ()=>Rs,
    "SIGN_CLIENT_PROTOCOL",
    ()=>Ce,
    "SIGN_CLIENT_STORAGE_OPTIONS",
    ()=>vs,
    "SIGN_CLIENT_STORAGE_PREFIX",
    ()=>we,
    "SIGN_CLIENT_VERSION",
    ()=>ke,
    "SessionStore",
    ()=>Qs,
    "SignClient",
    ()=>Hs,
    "TVF_METHODS",
    ()=>yt,
    "WALLETCONNECT_DEEPLINK_CHOICE",
    ()=>Le,
    "default",
    ()=>fe
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/core/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/logger/dist/index.es.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__pino$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/pino/browser.js [app-client] (ecmascript) <export default as pino>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$types$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/types/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/events/events.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/validators.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
const Ce = "wc", ke = 2, De = "client", we = `${Ce}@${ke}:${De}:`, me = {
    name: De,
    logger: "error",
    controller: !1,
    relayUrl: "wss://relay.walletconnect.org"
}, Rs = {
    session_proposal: "session_proposal",
    session_update: "session_update",
    session_extend: "session_extend",
    session_ping: "session_ping",
    session_delete: "session_delete",
    session_expire: "session_expire",
    session_request: "session_request",
    session_request_sent: "session_request_sent",
    session_event: "session_event",
    proposal_expire: "proposal_expire",
    session_authenticate: "session_authenticate",
    session_request_expire: "session_request_expire",
    session_connect: "session_connect"
}, vs = {
    database: ":memory:"
}, Le = "WALLETCONNECT_DEEPLINK_CHOICE", Is = {
    created: "history_created",
    updated: "history_updated",
    deleted: "history_deleted",
    sync: "history_sync"
}, Ts = "history", qs = "0.3", dt = "proposal", Ps = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["THIRTY_DAYS"], Me = "Proposal expired", ut = "session", B = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEVEN_DAYS"], gt = "engine", P = {
    wc_sessionPropose: {
        req: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_MINUTES"],
            prompt: !0,
            tag: 1100
        },
        res: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_MINUTES"],
            prompt: !1,
            tag: 1101
        },
        reject: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_MINUTES"],
            prompt: !1,
            tag: 1120
        },
        autoReject: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_MINUTES"],
            prompt: !1,
            tag: 1121
        }
    },
    wc_sessionSettle: {
        req: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_MINUTES"],
            prompt: !1,
            tag: 1102
        },
        res: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_MINUTES"],
            prompt: !1,
            tag: 1103
        }
    },
    wc_sessionUpdate: {
        req: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_DAY"],
            prompt: !1,
            tag: 1104
        },
        res: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_DAY"],
            prompt: !1,
            tag: 1105
        }
    },
    wc_sessionExtend: {
        req: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_DAY"],
            prompt: !1,
            tag: 1106
        },
        res: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_DAY"],
            prompt: !1,
            tag: 1107
        }
    },
    wc_sessionRequest: {
        req: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_MINUTES"],
            prompt: !0,
            tag: 1108
        },
        res: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_MINUTES"],
            prompt: !1,
            tag: 1109
        }
    },
    wc_sessionEvent: {
        req: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_MINUTES"],
            prompt: !0,
            tag: 1110
        },
        res: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_MINUTES"],
            prompt: !1,
            tag: 1111
        }
    },
    wc_sessionDelete: {
        req: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_DAY"],
            prompt: !1,
            tag: 1112
        },
        res: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_DAY"],
            prompt: !1,
            tag: 1113
        }
    },
    wc_sessionPing: {
        req: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_DAY"],
            prompt: !1,
            tag: 1114
        },
        res: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_DAY"],
            prompt: !1,
            tag: 1115
        }
    },
    wc_sessionAuthenticate: {
        req: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_HOUR"],
            prompt: !0,
            tag: 1116
        },
        res: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_HOUR"],
            prompt: !1,
            tag: 1117
        },
        reject: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_MINUTES"],
            prompt: !1,
            tag: 1118
        },
        autoReject: {
            ttl: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_MINUTES"],
            prompt: !1,
            tag: 1119
        }
    }
}, _e = {
    min: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_MINUTES"],
    max: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SEVEN_DAYS"]
}, M = {
    idle: "IDLE",
    active: "ACTIVE"
}, yt = {
    eth_sendTransaction: {
        key: ""
    },
    eth_sendRawTransaction: {
        key: ""
    },
    wallet_sendCalls: {
        key: ""
    },
    solana_signTransaction: {
        key: "signature"
    },
    solana_signAllTransactions: {
        key: "transactions"
    },
    solana_signAndSendTransaction: {
        key: "signature"
    },
    sui_signAndExecuteTransaction: {
        key: "digest"
    },
    sui_signTransaction: {
        key: ""
    },
    hedera_signAndExecuteTransaction: {
        key: "transactionId"
    },
    hedera_executeTransaction: {
        key: "transactionId"
    },
    near_signTransaction: {
        key: ""
    },
    near_signTransactions: {
        key: ""
    },
    tron_signTransaction: {
        key: "txID"
    },
    xrpl_signTransaction: {
        key: ""
    },
    xrpl_signTransactionFor: {
        key: ""
    },
    algo_signTxn: {
        key: ""
    },
    sendTransfer: {
        key: "txid"
    },
    stacks_stxTransfer: {
        key: "txId"
    },
    polkadot_signTransaction: {
        key: ""
    },
    cosmos_signDirect: {
        key: ""
    }
}, wt = "request", mt = [
    "wc_sessionPropose",
    "wc_sessionRequest",
    "wc_authRequest",
    "wc_sessionAuthenticate"
], _t = "wc", Ns = 1.5, ft = "auth", Et = "authKeys", St = "pairingTopics", Rt = "requests", le = `${_t}@${1.5}:${ft}:`, pe = `${le}:PUB_KEY`;
var Os = Object.defineProperty, bs = Object.defineProperties, As = Object.getOwnPropertyDescriptors, vt = Object.getOwnPropertySymbols, xs = Object.prototype.hasOwnProperty, Vs = Object.prototype.propertyIsEnumerable, $e = (E, o, t)=>o in E ? Os(E, o, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : E[o] = t, R = (E, o)=>{
    for(var t in o || (o = {}))xs.call(o, t) && $e(E, t, o[t]);
    if (vt) for (var t of vt(o))Vs.call(o, t) && $e(E, t, o[t]);
    return E;
}, O = (E, o)=>bs(E, As(o)), c = (E, o, t)=>$e(E, typeof o != "symbol" ? o + "" : o, t);
class Cs extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$types$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IEngine"] {
    constructor(o){
        super(o), c(this, "name", gt), c(this, "events", new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]), c(this, "initialized", !1), c(this, "requestQueue", {
            state: M.idle,
            queue: []
        }), c(this, "sessionRequestQueue", {
            state: M.idle,
            queue: []
        }), c(this, "emittedSessionRequests", new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LimitedSet"]({
            limit: 500
        })), c(this, "requestQueueDelay", __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ONE_SECOND"]), c(this, "expectedPairingMethodMap", new Map), c(this, "recentlyDeletedMap", new Map), c(this, "recentlyDeletedLimit", 200), c(this, "relayMessageCache", []), c(this, "pendingSessions", new Map), c(this, "init", async ()=>{
            this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.registerPairingEvents(), await this.registerLinkModeListeners(), this.client.core.pairing.register({
                methods: Object.keys(P)
            }), this.initialized = !0, setTimeout(async ()=>{
                await this.processPendingMessageEvents(), this.sessionRequestQueue.queue = this.getPendingSessionRequests(), this.processSessionRequestQueue();
            }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMiliseconds"])(this.requestQueueDelay)));
        }), c(this, "connect", async (t)=>{
            this.isInitialized(), await this.confirmOnlineStateOrThrow();
            const e = O(R({}, t), {
                requiredNamespaces: t.requiredNamespaces || {},
                optionalNamespaces: t.optionalNamespaces || {}
            });
            await this.isValidConnect(e), e.optionalNamespaces = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeRequiredAndOptionalNamespaces"])(e.requiredNamespaces, e.optionalNamespaces), e.requiredNamespaces = {};
            const { pairingTopic: s, requiredNamespaces: i, optionalNamespaces: r, sessionProperties: n, scopedProperties: a, relays: l } = e;
            let p = s, h, u = !1;
            try {
                if (p) {
                    const T = this.client.core.pairing.pairings.get(p);
                    this.client.logger.warn("connect() with existing pairing topic is deprecated and will be removed in the next major release."), u = T.active;
                }
            } catch (T) {
                throw this.client.logger.error(`connect() -> pairing.get(${p}) failed`), T;
            }
            if (!p || !u) {
                const { topic: T, uri: $ } = await this.client.core.pairing.create({
                    internal: {
                        skipSubscribe: !0
                    }
                });
                p = T, h = $;
            }
            if (!p) {
                const { message: T } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("NO_MATCHING_KEY", `connect() pairing topic: ${p}`);
                throw new Error(T);
            }
            const d = await this.client.core.crypto.generateKeyPair(), y = P.wc_sessionPropose.req.ttl || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FIVE_MINUTES"], w = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcExpiry"])(y), m = O(R(R({
                requiredNamespaces: i,
                optionalNamespaces: r,
                relays: l ?? [
                    {
                        protocol: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RELAYER_DEFAULT_PROTOCOL"]
                    }
                ],
                proposer: {
                    publicKey: d,
                    metadata: this.client.metadata
                },
                expiryTimestamp: w,
                pairingTopic: p
            }, n && {
                sessionProperties: n
            }), a && {
                scopedProperties: a
            }), {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["payloadId"])()
            }), S = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_connect", m.id), { reject: _, resolve: b, done: C } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDelayedPromise"])(y, Me), I = ({ id: T })=>{
                T === m.id && (this.client.events.off("proposal_expire", I), this.pendingSessions.delete(m.id), this.events.emit(S, {
                    error: {
                        message: Me,
                        code: 0
                    }
                }));
            };
            return this.client.events.on("proposal_expire", I), this.events.once(S, ({ error: T, session: $ })=>{
                this.client.events.off("proposal_expire", I), T ? _(T) : $ && b($);
            }), await this.sendProposeSession({
                proposal: m,
                publishOpts: {
                    internal: {
                        throwOnFailedPublish: !0
                    },
                    tvf: {
                        correlationId: m.id
                    }
                }
            }), await this.setProposal(m.id, m), {
                uri: h,
                approval: C
            };
        }), c(this, "pair", async (t)=>{
            this.isInitialized(), await this.confirmOnlineStateOrThrow();
            try {
                return await this.client.core.pairing.pair(t);
            } catch (e) {
                throw this.client.logger.error("pair() failed"), e;
            }
        }), c(this, "approve", async (t)=>{
            var e, s, i;
            const r = this.client.core.eventClient.createEvent({
                properties: {
                    topic: (e = t?.id) == null ? void 0 : e.toString(),
                    trace: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_SESSION_TRACES"].session_approve_started
                    ]
                }
            });
            try {
                this.isInitialized(), await this.confirmOnlineStateOrThrow();
            } catch (N) {
                throw r.setError(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_SESSION_ERRORS"].no_internet_connection), N;
            }
            try {
                await this.isValidProposalId(t?.id);
            } catch (N) {
                throw this.client.logger.error(`approve() -> proposal.get(${t?.id}) failed`), r.setError(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_SESSION_ERRORS"].proposal_not_found), N;
            }
            try {
                await this.isValidApprove(t);
            } catch (N) {
                throw this.client.logger.error("approve() -> isValidApprove() failed"), r.setError(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_SESSION_ERRORS"].session_approve_namespace_validation_failure), N;
            }
            const { id: n, relayProtocol: a, namespaces: l, sessionProperties: p, scopedProperties: h, sessionConfig: u } = t, d = this.client.proposal.get(n);
            this.client.core.eventClient.deleteEvent({
                eventId: r.eventId
            });
            const { pairingTopic: y, proposer: w, requiredNamespaces: m, optionalNamespaces: S } = d;
            let _ = (s = this.client.core.eventClient) == null ? void 0 : s.getEvent({
                topic: y
            });
            _ || (_ = (i = this.client.core.eventClient) == null ? void 0 : i.createEvent({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_SESSION_TRACES"].session_approve_started,
                properties: {
                    topic: y,
                    trace: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_SESSION_TRACES"].session_approve_started,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_SESSION_TRACES"].session_namespaces_validation_success
                    ]
                }
            }));
            const b = await this.client.core.crypto.generateKeyPair(), C = w.publicKey, I = await this.client.core.crypto.generateSharedKey(b, C), T = R(R(R({
                relay: {
                    protocol: a ?? "irn"
                },
                namespaces: l,
                controller: {
                    publicKey: b,
                    metadata: this.client.metadata
                },
                expiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcExpiry"])(B)
            }, p && {
                sessionProperties: p
            }), h && {
                scopedProperties: h
            }), u && {
                sessionConfig: u
            }), $ = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSPORT_TYPES"].relay;
            _.addTrace(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_SESSION_TRACES"].subscribing_session_topic);
            try {
                await this.client.core.relayer.subscribe(I, {
                    transportType: $,
                    internal: {
                        skipSubscribe: !0
                    }
                });
            } catch (N) {
                throw _.setError(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_SESSION_ERRORS"].subscribe_session_topic_failure), N;
            }
            _.addTrace(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_SESSION_TRACES"].subscribe_session_topic_success);
            const Ee = O(R({}, T), {
                topic: I,
                requiredNamespaces: m,
                optionalNamespaces: S,
                pairingTopic: y,
                acknowledged: !1,
                self: T.controller,
                peer: {
                    publicKey: w.publicKey,
                    metadata: w.metadata
                },
                controller: b,
                transportType: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSPORT_TYPES"].relay
            });
            await this.client.session.set(I, Ee), _.addTrace(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_SESSION_TRACES"].store_session);
            try {
                await this.sendApproveSession({
                    sessionTopic: I,
                    proposal: d,
                    pairingProposalResponse: {
                        relay: {
                            protocol: a ?? "irn"
                        },
                        responderPublicKey: b
                    },
                    sessionSettleRequest: T,
                    publishOpts: {
                        internal: {
                            throwOnFailedPublish: !0
                        },
                        tvf: {
                            correlationId: n
                        }
                    }
                }), _.addTrace(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_SESSION_TRACES"].session_approve_publish_success);
            } catch (N) {
                throw this.client.logger.error(N), this.client.session.delete(I, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSdkError"])("USER_DISCONNECTED")), await this.client.core.relayer.unsubscribe(I), N;
            }
            return this.client.core.eventClient.deleteEvent({
                eventId: _.eventId
            }), await this.client.core.pairing.updateMetadata({
                topic: y,
                metadata: w.metadata
            }), await this.deleteProposal(n), await this.client.core.pairing.activate({
                topic: y
            }), await this.setExpiry(I, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcExpiry"])(B)), {
                topic: I,
                acknowledged: ()=>Promise.resolve(this.client.session.get(I))
            };
        }), c(this, "reject", async (t)=>{
            this.isInitialized(), await this.confirmOnlineStateOrThrow();
            try {
                await this.isValidReject(t);
            } catch (r) {
                throw this.client.logger.error("reject() -> isValidReject() failed"), r;
            }
            const { id: e, reason: s } = t;
            let i;
            try {
                i = this.client.proposal.get(e).pairingTopic;
            } catch (r) {
                throw this.client.logger.error(`reject() -> proposal.get(${e}) failed`), r;
            }
            i && await this.sendError({
                id: e,
                topic: i,
                error: s,
                rpcOpts: P.wc_sessionPropose.reject
            }), await this.deleteProposal(e);
        }), c(this, "update", async (t)=>{
            this.isInitialized(), await this.confirmOnlineStateOrThrow();
            try {
                await this.isValidUpdate(t);
            } catch (h) {
                throw this.client.logger.error("update() -> isValidUpdate() failed"), h;
            }
            const { topic: e, namespaces: s } = t, { done: i, resolve: r, reject: n } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDelayedPromise"])(), a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["payloadId"])(), l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBigIntRpcId"])().toString(), p = this.client.session.get(e).namespaces;
            return this.events.once((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_update", a), ({ error: h })=>{
                h ? n(h) : r();
            }), await this.client.session.update(e, {
                namespaces: s
            }), await this.sendRequest({
                topic: e,
                method: "wc_sessionUpdate",
                params: {
                    namespaces: s
                },
                throwOnFailedPublish: !0,
                clientRpcId: a,
                relayRpcId: l
            }).catch((h)=>{
                this.client.logger.error(h), this.client.session.update(e, {
                    namespaces: p
                }), n(h);
            }), {
                acknowledged: i
            };
        }), c(this, "extend", async (t)=>{
            this.isInitialized(), await this.confirmOnlineStateOrThrow();
            try {
                await this.isValidExtend(t);
            } catch (a) {
                throw this.client.logger.error("extend() -> isValidExtend() failed"), a;
            }
            const { topic: e } = t, s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["payloadId"])(), { done: i, resolve: r, reject: n } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDelayedPromise"])();
            return this.events.once((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_extend", s), ({ error: a })=>{
                a ? n(a) : r();
            }), await this.setExpiry(e, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcExpiry"])(B)), this.sendRequest({
                topic: e,
                method: "wc_sessionExtend",
                params: {},
                clientRpcId: s,
                throwOnFailedPublish: !0
            }).catch((a)=>{
                n(a);
            }), {
                acknowledged: i
            };
        }), c(this, "request", async (t)=>{
            this.isInitialized();
            try {
                await this.isValidRequest(t);
            } catch (m) {
                throw this.client.logger.error("request() -> isValidRequest() failed"), m;
            }
            const { chainId: e, request: s, topic: i, expiry: r = P.wc_sessionRequest.req.ttl } = t, n = this.client.session.get(i);
            n?.transportType === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSPORT_TYPES"].relay && await this.confirmOnlineStateOrThrow();
            const a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["payloadId"])(), l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBigIntRpcId"])().toString(), { done: p, resolve: h, reject: u } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDelayedPromise"])(r, "Request expired. Please try again.");
            this.events.once((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_request", a), ({ error: m, result: S })=>{
                m ? u(m) : h(S);
            });
            const d = "wc_sessionRequest", y = this.getAppLinkIfEnabled(n.peer.metadata, n.transportType);
            if (y) return await this.sendRequest({
                clientRpcId: a,
                relayRpcId: l,
                topic: i,
                method: d,
                params: {
                    request: O(R({}, s), {
                        expiryTimestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcExpiry"])(r)
                    }),
                    chainId: e
                },
                expiry: r,
                throwOnFailedPublish: !0,
                appLink: y
            }).catch((m)=>u(m)), this.client.events.emit("session_request_sent", {
                topic: i,
                request: s,
                chainId: e,
                id: a
            }), await p();
            const w = {
                request: O(R({}, s), {
                    expiryTimestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcExpiry"])(r)
                }),
                chainId: e
            };
            return await Promise.all([
                new Promise(async (m)=>{
                    await this.sendRequest({
                        clientRpcId: a,
                        relayRpcId: l,
                        topic: i,
                        method: d,
                        params: w,
                        expiry: r,
                        throwOnFailedPublish: !0,
                        tvf: this.getTVFParams(a, w)
                    }).catch((S)=>u(S)), this.client.events.emit("session_request_sent", {
                        topic: i,
                        request: s,
                        chainId: e,
                        id: a
                    }), m();
                }),
                new Promise(async (m)=>{
                    var S;
                    if (!((S = n.sessionConfig) != null && S.disableDeepLink)) {
                        const _ = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDeepLink"])(this.client.core.storage, Le);
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleDeeplinkRedirect"])({
                            id: a,
                            topic: i,
                            wcDeepLink: _
                        });
                    }
                    m();
                }),
                p()
            ]).then((m)=>m[2]);
        }), c(this, "respond", async (t)=>{
            this.isInitialized(), await this.isValidRespond(t);
            const { topic: e, response: s } = t, { id: i } = s, r = this.client.session.get(e);
            r.transportType === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSPORT_TYPES"].relay && await this.confirmOnlineStateOrThrow();
            const n = this.getAppLinkIfEnabled(r.peer.metadata, r.transportType);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcResult"])(s) ? await this.sendResult({
                id: i,
                topic: e,
                result: s.result,
                throwOnFailedPublish: !0,
                appLink: n
            }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcError"])(s) && await this.sendError({
                id: i,
                topic: e,
                error: s.error,
                appLink: n
            }), this.cleanupAfterResponse(t);
        }), c(this, "ping", async (t)=>{
            this.isInitialized(), await this.confirmOnlineStateOrThrow();
            try {
                await this.isValidPing(t);
            } catch (s) {
                throw this.client.logger.error("ping() -> isValidPing() failed"), s;
            }
            const { topic: e } = t;
            if (this.client.session.keys.includes(e)) {
                const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["payloadId"])(), i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBigIntRpcId"])().toString(), { done: r, resolve: n, reject: a } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDelayedPromise"])();
                this.events.once((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_ping", s), ({ error: l })=>{
                    l ? a(l) : n();
                }), await Promise.all([
                    this.sendRequest({
                        topic: e,
                        method: "wc_sessionPing",
                        params: {},
                        throwOnFailedPublish: !0,
                        clientRpcId: s,
                        relayRpcId: i
                    }),
                    r()
                ]);
            } else this.client.core.pairing.pairings.keys.includes(e) && (this.client.logger.warn("ping() on pairing topic is deprecated and will be removed in the next major release."), await this.client.core.pairing.ping({
                topic: e
            }));
        }), c(this, "emit", async (t)=>{
            this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidEmit(t);
            const { topic: e, event: s, chainId: i } = t, r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBigIntRpcId"])().toString(), n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["payloadId"])();
            await this.sendRequest({
                topic: e,
                method: "wc_sessionEvent",
                params: {
                    event: s,
                    chainId: i
                },
                throwOnFailedPublish: !0,
                relayRpcId: r,
                clientRpcId: n
            });
        }), c(this, "disconnect", async (t)=>{
            this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidDisconnect(t);
            const { topic: e } = t;
            if (this.client.session.keys.includes(e)) await this.sendRequest({
                topic: e,
                method: "wc_sessionDelete",
                params: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSdkError"])("USER_DISCONNECTED"),
                throwOnFailedPublish: !0
            }), await this.deleteSession({
                topic: e,
                emitEvent: !1
            });
            else if (this.client.core.pairing.pairings.keys.includes(e)) await this.client.core.pairing.disconnect({
                topic: e
            });
            else {
                const { message: s } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISMATCHED_TOPIC", `Session or pairing topic not found: ${e}`);
                throw new Error(s);
            }
        }), c(this, "find", (t)=>(this.isInitialized(), this.client.session.getAll().filter((e)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSessionCompatible"])(e, t)))), c(this, "getPendingSessionRequests", ()=>this.client.pendingRequest.getAll()), c(this, "authenticate", async (t, e)=>{
            var s;
            this.isInitialized(), this.isValidAuthenticate(t);
            const i = e && this.client.core.linkModeSupportedApps.includes(e) && ((s = this.client.metadata.redirect) == null ? void 0 : s.linkMode), r = i ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSPORT_TYPES"].link_mode : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSPORT_TYPES"].relay;
            r === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSPORT_TYPES"].relay && await this.confirmOnlineStateOrThrow();
            const { chains: n, statement: a = "", uri: l, domain: p, nonce: h, type: u, exp: d, nbf: y, methods: w = [], expiry: m } = t, S = [
                ...t.resources || []
            ], { topic: _, uri: b } = await this.client.core.pairing.create({
                methods: [
                    "wc_sessionAuthenticate"
                ],
                transportType: r
            });
            this.client.logger.info({
                message: "Generated new pairing",
                pairing: {
                    topic: _,
                    uri: b
                }
            });
            const C = await this.client.core.crypto.generateKeyPair(), I = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashKey"])(C);
            if (await Promise.all([
                this.client.auth.authKeys.set(pe, {
                    responseTopic: I,
                    publicKey: C
                }),
                this.client.auth.pairingTopics.set(I, {
                    topic: I,
                    pairingTopic: _
                })
            ]), await this.client.core.relayer.subscribe(I, {
                transportType: r
            }), this.client.logger.info(`sending request to new pairing topic: ${_}`), w.length > 0) {
                const { namespace: A } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseChainId"])(n[0]);
                let k = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createEncodedRecap"])(A, "request", w);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRecapFromResources"])(S) && (k = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeEncodedRecaps"])(k, S.pop())), S.push(k);
            }
            const T = m && m > P.wc_sessionAuthenticate.req.ttl ? m : P.wc_sessionAuthenticate.req.ttl, $ = {
                authPayload: {
                    type: u ?? "caip122",
                    chains: n,
                    statement: a,
                    aud: l,
                    domain: p,
                    version: "1",
                    nonce: h,
                    iat: new Date().toISOString(),
                    exp: d,
                    nbf: y,
                    resources: S
                },
                requester: {
                    publicKey: C,
                    metadata: this.client.metadata
                },
                expiryTimestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcExpiry"])(T)
            }, Ee = {
                eip155: {
                    chains: n,
                    methods: [
                        ...new Set([
                            "personal_sign",
                            ...w
                        ])
                    ],
                    events: [
                        "chainChanged",
                        "accountsChanged"
                    ]
                }
            }, N = {
                requiredNamespaces: {},
                optionalNamespaces: Ee,
                relays: [
                    {
                        protocol: "irn"
                    }
                ],
                pairingTopic: _,
                proposer: {
                    publicKey: C,
                    metadata: this.client.metadata
                },
                expiryTimestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcExpiry"])(P.wc_sessionPropose.req.ttl),
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["payloadId"])()
            }, { done: Tt, resolve: Ue, reject: Se } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDelayedPromise"])(T, "Request expired"), se = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["payloadId"])(), he = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_connect", N.id), Re = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_request", se), de = async ({ error: A, session: k })=>{
                this.events.off(Re, ve), A ? Se(A) : k && Ue({
                    session: k
                });
            }, ve = async (A)=>{
                var k, Ge, je;
                if (await this.deletePendingAuthRequest(se, {
                    message: "fulfilled",
                    code: 0
                }), A.error) {
                    const re = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSdkError"])("WC_METHOD_UNSUPPORTED", "wc_sessionAuthenticate");
                    return A.error.code === re.code ? void 0 : (this.events.off(he, de), Se(A.error.message));
                }
                await this.deleteProposal(N.id), this.events.off(he, de);
                const { cacaos: Fe, responder: H } = A.result, Te = [], Qe = [];
                for (const re of Fe){
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateSignedCacao"])({
                        cacao: re,
                        projectId: this.client.core.projectId
                    }) || (this.client.logger.error(re, "Signature verification failed"), Se((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSdkError"])("SESSION_SETTLEMENT_FAILED", "Signature verification failed")));
                    const { p: qe } = re, Pe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRecapFromResources"])(qe.resources), He = [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNamespacedDidChainId"])(qe.iss)
                    ], qt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDidAddress"])(qe.iss);
                    if (Pe) {
                        const Ne = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMethodsFromRecap"])(Pe), Pt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChainsFromRecap"])(Pe);
                        Te.push(...Ne), He.push(...Pt);
                    }
                    for (const Ne of He)Qe.push(`${Ne}:${qt}`);
                }
                const ie = await this.client.core.crypto.generateSharedKey(C, H.publicKey);
                let ue;
                Te.length > 0 && (ue = {
                    topic: ie,
                    acknowledged: !0,
                    self: {
                        publicKey: C,
                        metadata: this.client.metadata
                    },
                    peer: H,
                    controller: H.publicKey,
                    expiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcExpiry"])(B),
                    requiredNamespaces: {},
                    optionalNamespaces: {},
                    relay: {
                        protocol: "irn"
                    },
                    pairingTopic: _,
                    namespaces: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildNamespacesFromAuth"])([
                        ...new Set(Te)
                    ], [
                        ...new Set(Qe)
                    ]),
                    transportType: r
                }, await this.client.core.relayer.subscribe(ie, {
                    transportType: r
                }), await this.client.session.set(ie, ue), _ && await this.client.core.pairing.updateMetadata({
                    topic: _,
                    metadata: H.metadata
                }), ue = this.client.session.get(ie)), (k = this.client.metadata.redirect) != null && k.linkMode && (Ge = H.metadata.redirect) != null && Ge.linkMode && (je = H.metadata.redirect) != null && je.universal && e && (this.client.core.addLinkModeSupportedApp(H.metadata.redirect.universal), this.client.session.update(ie, {
                    transportType: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSPORT_TYPES"].link_mode
                })), Ue({
                    auths: Fe,
                    session: ue
                });
            };
            this.events.once(he, de), this.events.once(Re, ve);
            let Ie;
            try {
                if (i) {
                    const A = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatJsonRpcRequest"])("wc_sessionAuthenticate", $, se);
                    this.client.core.history.set(_, A);
                    const k = await this.client.core.crypto.encode("", A, {
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE_2"],
                        encoding: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE64URL"]
                    });
                    Ie = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLinkModeURL"])(e, _, k);
                } else await Promise.all([
                    this.sendRequest({
                        topic: _,
                        method: "wc_sessionAuthenticate",
                        params: $,
                        expiry: t.expiry,
                        throwOnFailedPublish: !0,
                        clientRpcId: se
                    }),
                    this.sendRequest({
                        topic: _,
                        method: "wc_sessionPropose",
                        params: N,
                        expiry: P.wc_sessionPropose.req.ttl,
                        throwOnFailedPublish: !0,
                        clientRpcId: N.id
                    })
                ]);
            } catch (A) {
                throw this.events.off(he, de), this.events.off(Re, ve), A;
            }
            return await this.setProposal(N.id, N), await this.setAuthRequest(se, {
                request: O(R({}, $), {
                    verifyContext: {}
                }),
                pairingTopic: _,
                transportType: r
            }), {
                uri: Ie ?? b,
                response: Tt
            };
        }), c(this, "approveSessionAuthenticate", async (t)=>{
            const { id: e, auths: s } = t, i = this.client.core.eventClient.createEvent({
                properties: {
                    topic: e.toString(),
                    trace: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_AUTHENTICATE_TRACES"].authenticated_session_approve_started
                    ]
                }
            });
            try {
                this.isInitialized();
            } catch (m) {
                throw i.setError(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_AUTHENTICATE_ERRORS"].no_internet_connection), m;
            }
            const r = this.getPendingAuthRequest(e);
            if (!r) throw i.setError(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_AUTHENTICATE_ERRORS"].authenticated_session_pending_request_not_found), new Error(`Could not find pending auth request with id ${e}`);
            const n = r.transportType || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSPORT_TYPES"].relay;
            n === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSPORT_TYPES"].relay && await this.confirmOnlineStateOrThrow();
            const a = r.requester.publicKey, l = await this.client.core.crypto.generateKeyPair(), p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashKey"])(a), h = {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE_1"],
                receiverPublicKey: a,
                senderPublicKey: l
            }, u = [], d = [];
            for (const m of s){
                if (!await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateSignedCacao"])({
                    cacao: m,
                    projectId: this.client.core.projectId
                })) {
                    i.setError(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_AUTHENTICATE_ERRORS"].invalid_cacao);
                    const I = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSdkError"])("SESSION_SETTLEMENT_FAILED", "Signature verification failed");
                    throw await this.sendError({
                        id: e,
                        topic: p,
                        error: I,
                        encodeOpts: h
                    }), new Error(I.message);
                }
                i.addTrace(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_AUTHENTICATE_TRACES"].cacaos_verified);
                const { p: S } = m, _ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRecapFromResources"])(S.resources), b = [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNamespacedDidChainId"])(S.iss)
                ], C = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDidAddress"])(S.iss);
                if (_) {
                    const I = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMethodsFromRecap"])(_), T = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChainsFromRecap"])(_);
                    u.push(...I), b.push(...T);
                }
                for (const I of b)d.push(`${I}:${C}`);
            }
            const y = await this.client.core.crypto.generateSharedKey(l, a);
            i.addTrace(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_AUTHENTICATE_TRACES"].create_authenticated_session_topic);
            let w;
            if (u?.length > 0) {
                w = {
                    topic: y,
                    acknowledged: !0,
                    self: {
                        publicKey: l,
                        metadata: this.client.metadata
                    },
                    peer: {
                        publicKey: a,
                        metadata: r.requester.metadata
                    },
                    controller: a,
                    expiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcExpiry"])(B),
                    authentication: s,
                    requiredNamespaces: {},
                    optionalNamespaces: {},
                    relay: {
                        protocol: "irn"
                    },
                    pairingTopic: r.pairingTopic,
                    namespaces: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildNamespacesFromAuth"])([
                        ...new Set(u)
                    ], [
                        ...new Set(d)
                    ]),
                    transportType: n
                }, i.addTrace(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_AUTHENTICATE_TRACES"].subscribing_authenticated_session_topic);
                try {
                    await this.client.core.relayer.subscribe(y, {
                        transportType: n
                    });
                } catch (m) {
                    throw i.setError(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_AUTHENTICATE_ERRORS"].subscribe_authenticated_session_topic_failure), m;
                }
                i.addTrace(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_AUTHENTICATE_TRACES"].subscribe_authenticated_session_topic_success), await this.client.session.set(y, w), i.addTrace(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_AUTHENTICATE_TRACES"].store_authenticated_session), await this.client.core.pairing.updateMetadata({
                    topic: r.pairingTopic,
                    metadata: r.requester.metadata
                });
            }
            i.addTrace(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_AUTHENTICATE_TRACES"].publishing_authenticated_session_approve);
            try {
                await this.sendResult({
                    topic: p,
                    id: e,
                    result: {
                        cacaos: s,
                        responder: {
                            publicKey: l,
                            metadata: this.client.metadata
                        }
                    },
                    encodeOpts: h,
                    throwOnFailedPublish: !0,
                    appLink: this.getAppLinkIfEnabled(r.requester.metadata, n)
                });
            } catch (m) {
                throw i.setError(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_AUTHENTICATE_ERRORS"].authenticated_session_approve_publish_failure), m;
            }
            return await this.client.auth.requests.delete(e, {
                message: "fulfilled",
                code: 0
            }), await this.client.core.pairing.activate({
                topic: r.pairingTopic
            }), this.client.core.eventClient.deleteEvent({
                eventId: i.eventId
            }), {
                session: w
            };
        }), c(this, "rejectSessionAuthenticate", async (t)=>{
            this.isInitialized();
            const { id: e, reason: s } = t, i = this.getPendingAuthRequest(e);
            if (!i) throw new Error(`Could not find pending auth request with id ${e}`);
            i.transportType === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSPORT_TYPES"].relay && await this.confirmOnlineStateOrThrow();
            const r = i.requester.publicKey, n = await this.client.core.crypto.generateKeyPair(), a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashKey"])(r), l = {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE_1"],
                receiverPublicKey: r,
                senderPublicKey: n
            };
            await this.sendError({
                id: e,
                topic: a,
                error: s,
                encodeOpts: l,
                rpcOpts: P.wc_sessionAuthenticate.reject,
                appLink: this.getAppLinkIfEnabled(i.requester.metadata, i.transportType)
            }), await this.client.auth.requests.delete(e, {
                message: "rejected",
                code: 0
            }), await this.deleteProposal(e);
        }), c(this, "formatAuthMessage", (t)=>{
            this.isInitialized();
            const { request: e, iss: s } = t;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMessage"])(e, s);
        }), c(this, "processRelayMessageCache", ()=>{
            setTimeout(async ()=>{
                if (this.relayMessageCache.length !== 0) for(; this.relayMessageCache.length > 0;)try {
                    const t = this.relayMessageCache.shift();
                    t && await this.onRelayMessage(t);
                } catch (t) {
                    this.client.logger.error(t);
                }
            }, 50);
        }), c(this, "cleanupDuplicatePairings", async (t)=>{
            if (t.pairingTopic) try {
                const e = this.client.core.pairing.pairings.get(t.pairingTopic), s = this.client.core.pairing.pairings.getAll().filter((i)=>{
                    var r, n;
                    return ((r = i.peerMetadata) == null ? void 0 : r.url) && ((n = i.peerMetadata) == null ? void 0 : n.url) === t.peer.metadata.url && i.topic && i.topic !== e.topic;
                });
                if (s.length === 0) return;
                this.client.logger.info(`Cleaning up ${s.length} duplicate pairing(s)`), await Promise.all(s.map((i)=>this.client.core.pairing.disconnect({
                        topic: i.topic
                    }))), this.client.logger.info("Duplicate pairings clean up finished");
            } catch (e) {
                this.client.logger.error(e);
            }
        }), c(this, "deleteSession", async (t)=>{
            var e;
            const { topic: s, expirerHasDeleted: i = !1, emitEvent: r = !0, id: n = 0 } = t, { self: a } = this.client.session.get(s);
            await this.client.core.relayer.unsubscribe(s), await this.client.session.delete(s, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSdkError"])("USER_DISCONNECTED")), this.addToRecentlyDeleted(s, "session"), this.client.core.crypto.keychain.has(a.publicKey) && await this.client.core.crypto.deleteKeyPair(a.publicKey), this.client.core.crypto.keychain.has(s) && await this.client.core.crypto.deleteSymKey(s), i || this.client.core.expirer.del(s), this.client.core.storage.removeItem(Le).catch((l)=>this.client.logger.warn(l)), this.getPendingSessionRequests().forEach((l)=>{
                l.topic === s && this.deletePendingSessionRequest(l.id, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSdkError"])("USER_DISCONNECTED"));
            }), s === ((e = this.sessionRequestQueue.queue[0]) == null ? void 0 : e.topic) && (this.sessionRequestQueue.state = M.idle), r && this.client.events.emit("session_delete", {
                id: n,
                topic: s
            });
        }), c(this, "deleteProposal", async (t, e)=>{
            if (e) try {
                const s = this.client.proposal.get(t), i = this.client.core.eventClient.getEvent({
                    topic: s.pairingTopic
                });
                i?.setError(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_SESSION_ERRORS"].proposal_expired);
            } catch  {}
            await Promise.all([
                this.client.proposal.delete(t, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSdkError"])("USER_DISCONNECTED")),
                e ? Promise.resolve() : this.client.core.expirer.del(t)
            ]), this.addToRecentlyDeleted(t, "proposal");
        }), c(this, "deletePendingSessionRequest", async (t, e, s = !1)=>{
            await Promise.all([
                this.client.pendingRequest.delete(t, e),
                s ? Promise.resolve() : this.client.core.expirer.del(t)
            ]), this.addToRecentlyDeleted(t, "request"), this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((i)=>i.id !== t), s && (this.sessionRequestQueue.state = M.idle, this.client.events.emit("session_request_expire", {
                id: t
            }));
        }), c(this, "deletePendingAuthRequest", async (t, e, s = !1)=>{
            await Promise.all([
                this.client.auth.requests.delete(t, e),
                s ? Promise.resolve() : this.client.core.expirer.del(t)
            ]);
        }), c(this, "setExpiry", async (t, e)=>{
            this.client.session.keys.includes(t) && (this.client.core.expirer.set(t, e), await this.client.session.update(t, {
                expiry: e
            }));
        }), c(this, "setProposal", async (t, e)=>{
            this.client.core.expirer.set(t, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcExpiry"])(P.wc_sessionPropose.req.ttl)), await this.client.proposal.set(t, e);
        }), c(this, "setAuthRequest", async (t, e)=>{
            const { request: s, pairingTopic: i, transportType: r = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSPORT_TYPES"].relay } = e;
            this.client.core.expirer.set(t, s.expiryTimestamp), await this.client.auth.requests.set(t, {
                authPayload: s.authPayload,
                requester: s.requester,
                expiryTimestamp: s.expiryTimestamp,
                id: t,
                pairingTopic: i,
                verifyContext: s.verifyContext,
                transportType: r
            });
        }), c(this, "setPendingSessionRequest", async (t)=>{
            const { id: e, topic: s, params: i, verifyContext: r } = t, n = i.request.expiryTimestamp || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcExpiry"])(P.wc_sessionRequest.req.ttl);
            this.client.core.expirer.set(e, n), await this.client.pendingRequest.set(e, {
                id: e,
                topic: s,
                params: i,
                verifyContext: r
            });
        }), c(this, "sendRequest", async (t)=>{
            const { topic: e, method: s, params: i, expiry: r, relayRpcId: n, clientRpcId: a, throwOnFailedPublish: l, appLink: p, tvf: h, publishOpts: u = {} } = t, d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatJsonRpcRequest"])(s, i, a);
            let y;
            const w = !!p;
            try {
                const _ = w ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE64URL"] : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE64"];
                y = await this.client.core.crypto.encode(e, d, {
                    encoding: _
                });
            } catch (_) {
                throw await this.cleanup(), this.client.logger.error(`sendRequest() -> core.crypto.encode() for topic ${e} failed`), _;
            }
            let m;
            if (mt.includes(s)) {
                const _ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashMessage"])(JSON.stringify(d)), b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashMessage"])(y);
                m = await this.client.core.verify.register({
                    id: b,
                    decryptedId: _
                });
            }
            const S = R(R({}, P[s].req), u);
            if (S.attestation = m, r && (S.ttl = r), n && (S.id = n), this.client.core.history.set(e, d), w) {
                const _ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLinkModeURL"])(p, e, y);
                await /*TURBOPACK member replacement*/ __turbopack_context__.g.Linking.openURL(_, this.client.name);
            } else S.tvf = O(R({}, h), {
                correlationId: d.id
            }), l ? (S.internal = O(R({}, S.internal), {
                throwOnFailedPublish: !0
            }), await this.client.core.relayer.publish(e, y, S)) : this.client.core.relayer.publish(e, y, S).catch((_)=>this.client.logger.error(_));
            return d.id;
        }), c(this, "sendProposeSession", async (t)=>{
            const { proposal: e, publishOpts: s } = t, i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatJsonRpcRequest"])("wc_sessionPropose", e, e.id);
            this.client.core.history.set(e.pairingTopic, i);
            const r = await this.client.core.crypto.encode(e.pairingTopic, i, {
                encoding: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE64"]
            }), n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashMessage"])(JSON.stringify(i)), a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashMessage"])(r), l = await this.client.core.verify.register({
                id: a,
                decryptedId: n
            });
            await this.client.core.relayer.publishCustom({
                payload: {
                    pairingTopic: e.pairingTopic,
                    sessionProposal: r
                },
                opts: O(R({}, s), {
                    publishMethod: "wc_proposeSession",
                    attestation: l
                })
            });
        }), c(this, "sendApproveSession", async (t)=>{
            const { sessionTopic: e, pairingProposalResponse: s, proposal: i, sessionSettleRequest: r, publishOpts: n } = t, a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatJsonRpcResult"])(i.id, s), l = await this.client.core.crypto.encode(i.pairingTopic, a, {
                encoding: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE64"]
            }), p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatJsonRpcRequest"])("wc_sessionSettle", r, n?.id), h = await this.client.core.crypto.encode(e, p, {
                encoding: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE64"]
            });
            this.client.core.history.set(e, p), await this.client.core.relayer.publishCustom({
                payload: {
                    sessionTopic: e,
                    pairingTopic: i.pairingTopic,
                    sessionProposalResponse: l,
                    sessionSettlementRequest: h
                },
                opts: O(R({}, n), {
                    publishMethod: "wc_approveSession"
                })
            });
        }), c(this, "sendResult", async (t)=>{
            const { id: e, topic: s, result: i, throwOnFailedPublish: r, encodeOpts: n, appLink: a } = t, l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatJsonRpcResult"])(e, i);
            let p;
            const h = a && typeof (/*TURBOPACK member replacement*/ __turbopack_context__.g == null ? void 0 : /*TURBOPACK member replacement*/ __turbopack_context__.g.Linking) < "u";
            try {
                const y = h ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE64URL"] : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE64"];
                p = await this.client.core.crypto.encode(s, l, O(R({}, n || {}), {
                    encoding: y
                }));
            } catch (y) {
                throw await this.cleanup(), this.client.logger.error(`sendResult() -> core.crypto.encode() for topic ${s} failed`), y;
            }
            let u, d;
            try {
                u = await this.client.core.history.get(s, e);
                const y = u.request;
                try {
                    d = this.getTVFParams(e, y.params, i);
                } catch (w) {
                    this.client.logger.warn(`sendResult() -> getTVFParams() failed: ${w?.message}`);
                }
            } catch (y) {
                throw this.client.logger.error(`sendResult() -> history.get(${s}, ${e}) failed`), y;
            }
            if (h) {
                const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLinkModeURL"])(a, s, p);
                await /*TURBOPACK member replacement*/ __turbopack_context__.g.Linking.openURL(y, this.client.name);
            } else {
                const y = u.request.method, w = P[y].res;
                w.tvf = O(R({}, d), {
                    correlationId: e
                }), r ? (w.internal = O(R({}, w.internal), {
                    throwOnFailedPublish: !0
                }), await this.client.core.relayer.publish(s, p, w)) : this.client.core.relayer.publish(s, p, w).catch((m)=>this.client.logger.error(m));
            }
            await this.client.core.history.resolve(l);
        }), c(this, "sendError", async (t)=>{
            const { id: e, topic: s, error: i, encodeOpts: r, rpcOpts: n, appLink: a } = t, l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatJsonRpcError"])(e, i);
            let p;
            const h = a && typeof (/*TURBOPACK member replacement*/ __turbopack_context__.g == null ? void 0 : /*TURBOPACK member replacement*/ __turbopack_context__.g.Linking) < "u";
            try {
                const d = h ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE64URL"] : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE64"];
                p = await this.client.core.crypto.encode(s, l, O(R({}, r || {}), {
                    encoding: d
                }));
            } catch (d) {
                throw await this.cleanup(), this.client.logger.error(`sendError() -> core.crypto.encode() for topic ${s} failed`), d;
            }
            let u;
            try {
                u = await this.client.core.history.get(s, e);
            } catch (d) {
                throw this.client.logger.error(`sendError() -> history.get(${s}, ${e}) failed`), d;
            }
            if (h) {
                const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLinkModeURL"])(a, s, p);
                await /*TURBOPACK member replacement*/ __turbopack_context__.g.Linking.openURL(d, this.client.name);
            } else {
                const d = u.request.method, y = n || P[d].res;
                this.client.core.relayer.publish(s, p, y);
            }
            await this.client.core.history.resolve(l);
        }), c(this, "cleanup", async ()=>{
            const t = [], e = [];
            this.client.session.getAll().forEach((s)=>{
                let i = !1;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isExpired"])(s.expiry) && (i = !0), this.client.core.crypto.keychain.has(s.topic) || (i = !0), i && t.push(s.topic);
            }), this.client.proposal.getAll().forEach((s)=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isExpired"])(s.expiryTimestamp) && e.push(s.id);
            }), await Promise.all([
                ...t.map((s)=>this.deleteSession({
                        topic: s
                    })),
                ...e.map((s)=>this.deleteProposal(s))
            ]);
        }), c(this, "onProviderMessageEvent", async (t)=>{
            !this.initialized || this.relayMessageCache.length > 0 ? this.relayMessageCache.push(t) : await this.onRelayMessage(t);
        }), c(this, "onRelayEventRequest", async (t)=>{
            this.requestQueue.queue.push(t), await this.processRequestsQueue();
        }), c(this, "processRequestsQueue", async ()=>{
            if (this.requestQueue.state === M.active) {
                this.client.logger.info("Request queue already active, skipping...");
                return;
            }
            for(this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0;){
                this.requestQueue.state = M.active;
                const t = this.requestQueue.queue.shift();
                if (t) try {
                    await this.processRequest(t);
                } catch (e) {
                    this.client.logger.warn(e);
                }
            }
            this.requestQueue.state = M.idle;
        }), c(this, "processRequest", async (t)=>{
            const { topic: e, payload: s, attestation: i, transportType: r, encryptedId: n } = t, a = s.method;
            if (!this.shouldIgnorePairingRequest({
                topic: e,
                requestMethod: a
            })) switch(a){
                case "wc_sessionPropose":
                    return await this.onSessionProposeRequest({
                        topic: e,
                        payload: s,
                        attestation: i,
                        encryptedId: n
                    });
                case "wc_sessionSettle":
                    return await this.onSessionSettleRequest(e, s);
                case "wc_sessionUpdate":
                    return await this.onSessionUpdateRequest(e, s);
                case "wc_sessionExtend":
                    return await this.onSessionExtendRequest(e, s);
                case "wc_sessionPing":
                    return await this.onSessionPingRequest(e, s);
                case "wc_sessionDelete":
                    return await this.onSessionDeleteRequest(e, s);
                case "wc_sessionRequest":
                    return await this.onSessionRequest({
                        topic: e,
                        payload: s,
                        attestation: i,
                        encryptedId: n,
                        transportType: r
                    });
                case "wc_sessionEvent":
                    return await this.onSessionEventRequest(e, s);
                case "wc_sessionAuthenticate":
                    return await this.onSessionAuthenticateRequest({
                        topic: e,
                        payload: s,
                        attestation: i,
                        encryptedId: n,
                        transportType: r
                    });
                default:
                    return this.client.logger.info(`Unsupported request method ${a}`);
            }
        }), c(this, "onRelayEventResponse", async (t)=>{
            const { topic: e, payload: s, transportType: i } = t, r = (await this.client.core.history.get(e, s.id)).request.method;
            switch(r){
                case "wc_sessionPropose":
                    return this.onSessionProposeResponse(e, s, i);
                case "wc_sessionSettle":
                    return this.onSessionSettleResponse(e, s);
                case "wc_sessionUpdate":
                    return this.onSessionUpdateResponse(e, s);
                case "wc_sessionExtend":
                    return this.onSessionExtendResponse(e, s);
                case "wc_sessionPing":
                    return this.onSessionPingResponse(e, s);
                case "wc_sessionRequest":
                    return this.onSessionRequestResponse(e, s);
                case "wc_sessionAuthenticate":
                    return this.onSessionAuthenticateResponse(e, s);
                default:
                    return this.client.logger.info(`Unsupported response method ${r}`);
            }
        }), c(this, "onRelayEventUnknownPayload", (t)=>{
            const { topic: e } = t, { message: s } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `Decoded payload on topic ${e} is not identifiable as a JSON-RPC request or a response.`);
            throw new Error(s);
        }), c(this, "shouldIgnorePairingRequest", (t)=>{
            const { topic: e, requestMethod: s } = t, i = this.expectedPairingMethodMap.get(e);
            return !i || i.includes(s) ? !1 : !!(i.includes("wc_sessionAuthenticate") && this.client.events.listenerCount("session_authenticate") > 0);
        }), c(this, "onSessionProposeRequest", async (t)=>{
            const { topic: e, payload: s, attestation: i, encryptedId: r } = t, { params: n, id: a } = s;
            try {
                const l = this.client.core.eventClient.getEvent({
                    topic: e
                });
                this.client.events.listenerCount("session_proposal") === 0 && (console.warn("No listener for session_proposal event"), l?.setError(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_PAIRING_ERRORS"].proposal_listener_not_found)), this.isValidConnect(R({}, s.params));
                const p = n.expiryTimestamp || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcExpiry"])(P.wc_sessionPropose.req.ttl), h = R({
                    id: a,
                    pairingTopic: e,
                    expiryTimestamp: p,
                    attestation: i,
                    encryptedId: r
                }, n);
                await this.setProposal(a, h);
                const u = await this.getVerifyContext({
                    attestationId: i,
                    hash: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashMessage"])(JSON.stringify(s)),
                    encryptedId: r,
                    metadata: h.proposer.metadata
                });
                l?.addTrace(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EVENT_CLIENT_PAIRING_TRACES"].emit_session_proposal), this.client.events.emit("session_proposal", {
                    id: a,
                    params: h,
                    verifyContext: u
                });
            } catch (l) {
                await this.sendError({
                    id: a,
                    topic: e,
                    error: l,
                    rpcOpts: P.wc_sessionPropose.autoReject
                }), this.client.logger.error(l);
            }
        }), c(this, "onSessionProposeResponse", async (t, e, s)=>{
            const { id: i } = e;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcResult"])(e)) {
                const { result: r } = e;
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    result: r
                });
                const n = this.client.proposal.get(i);
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    proposal: n
                });
                const a = n.proposer.publicKey;
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    selfPublicKey: a
                });
                const l = r.responderPublicKey;
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    peerPublicKey: l
                });
                const p = await this.client.core.crypto.generateSharedKey(a, l);
                this.pendingSessions.set(i, {
                    sessionTopic: p,
                    pairingTopic: t,
                    proposalId: i,
                    publicKey: a
                });
                const h = await this.client.core.relayer.subscribe(p, {
                    transportType: s
                });
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    subscriptionId: h
                }), await this.client.core.pairing.activate({
                    topic: t
                });
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcError"])(e)) {
                await this.deleteProposal(i);
                const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_connect", i);
                if (this.events.listenerCount(r) === 0) throw new Error(`emitting ${r} without any listeners, 954`);
                this.events.emit(r, {
                    error: e.error
                });
            }
        }), c(this, "onSessionSettleRequest", async (t, e)=>{
            const { id: s, params: i } = e;
            try {
                this.isValidSessionSettleRequest(i);
                const { relay: r, controller: n, expiry: a, namespaces: l, sessionProperties: p, scopedProperties: h, sessionConfig: u } = e.params, d = [
                    ...this.pendingSessions.values()
                ].find((m)=>m.sessionTopic === t);
                if (!d) return this.client.logger.error(`Pending session not found for topic ${t}`);
                const y = this.client.proposal.get(d.proposalId), w = O(R(R(R({
                    topic: t,
                    relay: r,
                    expiry: a,
                    namespaces: l,
                    acknowledged: !0,
                    pairingTopic: d.pairingTopic,
                    requiredNamespaces: y.requiredNamespaces,
                    optionalNamespaces: y.optionalNamespaces,
                    controller: n.publicKey,
                    self: {
                        publicKey: d.publicKey,
                        metadata: this.client.metadata
                    },
                    peer: {
                        publicKey: n.publicKey,
                        metadata: n.metadata
                    }
                }, p && {
                    sessionProperties: p
                }), h && {
                    scopedProperties: h
                }), u && {
                    sessionConfig: u
                }), {
                    transportType: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSPORT_TYPES"].relay
                });
                await this.client.session.set(w.topic, w), await this.setExpiry(w.topic, w.expiry), await this.client.core.pairing.updateMetadata({
                    topic: d.pairingTopic,
                    metadata: w.peer.metadata
                }), this.client.events.emit("session_connect", {
                    session: w
                }), this.events.emit((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_connect", d.proposalId), {
                    session: w
                }), this.pendingSessions.delete(d.proposalId), this.deleteProposal(d.proposalId, !1), this.cleanupDuplicatePairings(w), await this.sendResult({
                    id: e.id,
                    topic: t,
                    result: !0
                });
            } catch (r) {
                await this.sendError({
                    id: s,
                    topic: t,
                    error: r
                }), this.client.logger.error(r);
            }
        }), c(this, "onSessionSettleResponse", async (t, e)=>{
            const { id: s } = e;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcResult"])(e) ? (await this.client.session.update(t, {
                acknowledged: !0
            }), this.events.emit((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_approve", s), {})) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcError"])(e) && (await this.client.session.delete(t, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSdkError"])("USER_DISCONNECTED")), this.events.emit((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_approve", s), {
                error: e.error
            }));
        }), c(this, "onSessionUpdateRequest", async (t, e)=>{
            const { params: s, id: i } = e;
            try {
                const r = `${t}_session_update`, n = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MemoryStore"].get(r);
                if (n && this.isRequestOutOfSync(n, i)) {
                    this.client.logger.warn(`Discarding out of sync request - ${i}`), this.sendError({
                        id: i,
                        topic: t,
                        error: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSdkError"])("INVALID_UPDATE_REQUEST")
                    });
                    return;
                }
                this.isValidUpdate(R({
                    topic: t
                }, s));
                try {
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MemoryStore"].set(r, i), await this.client.session.update(t, {
                        namespaces: s.namespaces
                    }), await this.sendResult({
                        id: i,
                        topic: t,
                        result: !0
                    });
                } catch (a) {
                    throw __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MemoryStore"].delete(r), a;
                }
                this.client.events.emit("session_update", {
                    id: i,
                    topic: t,
                    params: s
                });
            } catch (r) {
                await this.sendError({
                    id: i,
                    topic: t,
                    error: r
                }), this.client.logger.error(r);
            }
        }), c(this, "isRequestOutOfSync", (t, e)=>e.toString().slice(0, -3) < t.toString().slice(0, -3)), c(this, "onSessionUpdateResponse", (t, e)=>{
            const { id: s } = e, i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_update", s);
            if (this.events.listenerCount(i) === 0) throw new Error(`emitting ${i} without any listeners`);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcResult"])(e) ? this.events.emit((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_update", s), {}) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcError"])(e) && this.events.emit((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_update", s), {
                error: e.error
            });
        }), c(this, "onSessionExtendRequest", async (t, e)=>{
            const { id: s } = e;
            try {
                this.isValidExtend({
                    topic: t
                }), await this.setExpiry(t, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcExpiry"])(B)), await this.sendResult({
                    id: s,
                    topic: t,
                    result: !0
                }), this.client.events.emit("session_extend", {
                    id: s,
                    topic: t
                });
            } catch (i) {
                await this.sendError({
                    id: s,
                    topic: t,
                    error: i
                }), this.client.logger.error(i);
            }
        }), c(this, "onSessionExtendResponse", (t, e)=>{
            const { id: s } = e, i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_extend", s);
            if (this.events.listenerCount(i) === 0) throw new Error(`emitting ${i} without any listeners`);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcResult"])(e) ? this.events.emit((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_extend", s), {}) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcError"])(e) && this.events.emit((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_extend", s), {
                error: e.error
            });
        }), c(this, "onSessionPingRequest", async (t, e)=>{
            const { id: s } = e;
            try {
                this.isValidPing({
                    topic: t
                }), await this.sendResult({
                    id: s,
                    topic: t,
                    result: !0,
                    throwOnFailedPublish: !0
                }), this.client.events.emit("session_ping", {
                    id: s,
                    topic: t
                });
            } catch (i) {
                await this.sendError({
                    id: s,
                    topic: t,
                    error: i
                }), this.client.logger.error(i);
            }
        }), c(this, "onSessionPingResponse", (t, e)=>{
            const { id: s } = e, i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_ping", s);
            setTimeout(()=>{
                if (this.events.listenerCount(i) === 0) throw new Error(`emitting ${i} without any listeners 2176`);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcResult"])(e) ? this.events.emit((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_ping", s), {}) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcError"])(e) && this.events.emit((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_ping", s), {
                    error: e.error
                });
            }, 500);
        }), c(this, "onSessionDeleteRequest", async (t, e)=>{
            const { id: s } = e;
            try {
                this.isValidDisconnect({
                    topic: t,
                    reason: e.params
                }), await Promise.all([
                    new Promise((i)=>{
                        this.client.core.relayer.once(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RELAYER_EVENTS"].publish, async ()=>{
                            i(await this.deleteSession({
                                topic: t,
                                id: s
                            }));
                        });
                    }),
                    this.sendResult({
                        id: s,
                        topic: t,
                        result: !0
                    }),
                    this.cleanupPendingSentRequestsForTopic({
                        topic: t,
                        error: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSdkError"])("USER_DISCONNECTED")
                    })
                ]).catch((i)=>this.client.logger.error(i));
            } catch (i) {
                this.client.logger.error(i);
            }
        }), c(this, "onSessionRequest", async (t)=>{
            var e, s, i;
            const { topic: r, payload: n, attestation: a, encryptedId: l, transportType: p } = t, { id: h, params: u } = n;
            try {
                await this.isValidRequest(R({
                    topic: r
                }, u));
                const d = this.client.session.get(r), y = await this.getVerifyContext({
                    attestationId: a,
                    hash: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashMessage"])(JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatJsonRpcRequest"])("wc_sessionRequest", u, h))),
                    encryptedId: l,
                    metadata: d.peer.metadata,
                    transportType: p
                }), w = {
                    id: h,
                    topic: r,
                    params: u,
                    verifyContext: y
                };
                await this.setPendingSessionRequest(w), p === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSPORT_TYPES"].link_mode && (e = d.peer.metadata.redirect) != null && e.universal && this.client.core.addLinkModeSupportedApp((s = d.peer.metadata.redirect) == null ? void 0 : s.universal), (i = this.client.signConfig) != null && i.disableRequestQueue ? this.emitSessionRequest(w) : (this.addSessionRequestToSessionRequestQueue(w), this.processSessionRequestQueue());
            } catch (d) {
                await this.sendError({
                    id: h,
                    topic: r,
                    error: d
                }), this.client.logger.error(d);
            }
        }), c(this, "onSessionRequestResponse", (t, e)=>{
            const { id: s } = e, i = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_request", s);
            if (this.events.listenerCount(i) === 0) throw new Error(`emitting ${i} without any listeners`);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcResult"])(e) ? this.events.emit((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_request", s), {
                result: e.result
            }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcError"])(e) && this.events.emit((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_request", s), {
                error: e.error
            });
        }), c(this, "onSessionEventRequest", async (t, e)=>{
            const { id: s, params: i } = e;
            try {
                const r = `${t}_session_event_${i.event.name}`, n = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MemoryStore"].get(r);
                if (n && this.isRequestOutOfSync(n, s)) {
                    this.client.logger.info(`Discarding out of sync request - ${s}`);
                    return;
                }
                this.isValidEmit(R({
                    topic: t
                }, i)), this.client.events.emit("session_event", {
                    id: s,
                    topic: t,
                    params: i
                }), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MemoryStore"].set(r, s);
            } catch (r) {
                await this.sendError({
                    id: s,
                    topic: t,
                    error: r
                }), this.client.logger.error(r);
            }
        }), c(this, "onSessionAuthenticateResponse", (t, e)=>{
            const { id: s } = e;
            this.client.logger.trace({
                type: "method",
                method: "onSessionAuthenticateResponse",
                topic: t,
                payload: e
            }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcResult"])(e) ? this.events.emit((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_request", s), {
                result: e.result
            }) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcError"])(e) && this.events.emit((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_request", s), {
                error: e.error
            });
        }), c(this, "onSessionAuthenticateRequest", async (t)=>{
            var e;
            const { topic: s, payload: i, attestation: r, encryptedId: n, transportType: a } = t;
            try {
                const { requester: l, authPayload: p, expiryTimestamp: h } = i.params, u = await this.getVerifyContext({
                    attestationId: r,
                    hash: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashMessage"])(JSON.stringify(i)),
                    encryptedId: n,
                    metadata: l.metadata,
                    transportType: a
                }), d = {
                    requester: l,
                    pairingTopic: s,
                    id: i.id,
                    authPayload: p,
                    verifyContext: u,
                    expiryTimestamp: h
                };
                await this.setAuthRequest(i.id, {
                    request: d,
                    pairingTopic: s,
                    transportType: a
                }), a === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSPORT_TYPES"].link_mode && (e = l.metadata.redirect) != null && e.universal && this.client.core.addLinkModeSupportedApp(l.metadata.redirect.universal), this.client.events.emit("session_authenticate", {
                    topic: s,
                    params: i.params,
                    id: i.id,
                    verifyContext: u
                });
            } catch (l) {
                this.client.logger.error(l);
                const p = i.params.requester.publicKey, h = await this.client.core.crypto.generateKeyPair(), u = this.getAppLinkIfEnabled(i.params.requester.metadata, a), d = {
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE_1"],
                    receiverPublicKey: p,
                    senderPublicKey: h
                };
                await this.sendError({
                    id: i.id,
                    topic: s,
                    error: l,
                    encodeOpts: d,
                    rpcOpts: P.wc_sessionAuthenticate.autoReject,
                    appLink: u
                });
            }
        }), c(this, "addSessionRequestToSessionRequestQueue", (t)=>{
            this.sessionRequestQueue.queue.push(t);
        }), c(this, "cleanupAfterResponse", (t)=>{
            this.deletePendingSessionRequest(t.response.id, {
                message: "fulfilled",
                code: 0
            }), setTimeout(()=>{
                this.sessionRequestQueue.state = M.idle, this.processSessionRequestQueue();
            }, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMiliseconds"])(this.requestQueueDelay));
        }), c(this, "cleanupPendingSentRequestsForTopic", ({ topic: t, error: e })=>{
            const s = this.client.core.history.pending;
            s.length > 0 && s.filter((i)=>i.topic === t && i.request.method === "wc_sessionRequest").forEach((i)=>{
                const r = i.request.id, n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_request", r);
                if (this.events.listenerCount(n) === 0) throw new Error(`emitting ${n} without any listeners`);
                this.events.emit((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["engineEvent"])("session_request", i.request.id), {
                    error: e
                });
            });
        }), c(this, "processSessionRequestQueue", ()=>{
            if (this.sessionRequestQueue.state === M.active) {
                this.client.logger.info("session request queue is already active.");
                return;
            }
            const t = this.sessionRequestQueue.queue[0];
            if (!t) {
                this.client.logger.info("session request queue is empty.");
                return;
            }
            try {
                this.emitSessionRequest(t);
            } catch (e) {
                this.client.logger.error(e);
            }
        }), c(this, "emitSessionRequest", (t)=>{
            if (this.emittedSessionRequests.has(t.id)) {
                this.client.logger.warn({
                    id: t.id
                }, `Skipping emitting \`session_request\` event for duplicate request. id: ${t.id}`);
                return;
            }
            this.sessionRequestQueue.state = M.active, this.emittedSessionRequests.add(t.id), this.client.events.emit("session_request", t);
        }), c(this, "onPairingCreated", (t)=>{
            if (t.methods && this.expectedPairingMethodMap.set(t.topic, t.methods), t.active) return;
            const e = this.client.proposal.getAll().find((s)=>s.pairingTopic === t.topic);
            e && this.onSessionProposeRequest({
                topic: t.topic,
                payload: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatJsonRpcRequest"])("wc_sessionPropose", O(R({}, e), {
                    requiredNamespaces: e.requiredNamespaces,
                    optionalNamespaces: e.optionalNamespaces,
                    relays: e.relays,
                    proposer: e.proposer,
                    sessionProperties: e.sessionProperties,
                    scopedProperties: e.scopedProperties
                }), e.id),
                attestation: e.attestation,
                encryptedId: e.encryptedId
            });
        }), c(this, "isValidConnect", async (t)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidParams"])(t)) {
                const { message: l } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(t)}`);
                throw new Error(l);
            }
            const { pairingTopic: e, requiredNamespaces: s, optionalNamespaces: i, sessionProperties: r, scopedProperties: n, relays: a } = t;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUndefined"])(e) || await this.isValidPairingTopic(e), !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidRelays"])(a, !0)) {
                const { message: l } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `connect() relays: ${a}`);
                throw new Error(l);
            }
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUndefined"])(s) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidObject"])(s) !== 0) {
                const l = "requiredNamespaces are deprecated and are automatically assigned to optionalNamespaces";
                [
                    "fatal",
                    "error",
                    "silent"
                ].includes(this.client.logger.level) ? console.warn(l) : this.client.logger.warn(l), this.validateNamespaces(s, "requiredNamespaces");
            }
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUndefined"])(i) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidObject"])(i) !== 0 && this.validateNamespaces(i, "optionalNamespaces"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUndefined"])(r) || this.validateSessionProps(r, "sessionProperties"), !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUndefined"])(n)) {
                this.validateSessionProps(n, "scopedProperties");
                const l = Object.keys(s || {}).concat(Object.keys(i || {}));
                if (!Object.keys(n).every((p)=>l.includes(p.split(":")[0]))) throw new Error(`Scoped properties must be a subset of required/optional namespaces, received: ${JSON.stringify(n)}, required/optional namespaces: ${JSON.stringify(l)}`);
            }
        }), c(this, "validateNamespaces", (t, e)=>{
            const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidRequiredNamespaces"])(t, "connect()", e);
            if (s) throw new Error(s.message);
        }), c(this, "isValidApprove", async (t)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidParams"])(t)) throw new Error((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `approve() params: ${t}`).message);
            const { id: e, namespaces: s, relayProtocol: i, sessionProperties: r, scopedProperties: n } = t;
            this.checkRecentlyDeleted(e), await this.isValidProposalId(e);
            const a = this.client.proposal.get(e), l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidNamespaces"])(s, "approve()");
            if (l) throw new Error(l.message);
            const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isConformingNamespaces"])(a.requiredNamespaces, s, "approve()");
            if (p) throw new Error(p.message);
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidString"])(i, !0)) {
                const { message: h } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `approve() relayProtocol: ${i}`);
                throw new Error(h);
            }
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUndefined"])(r) || this.validateSessionProps(r, "sessionProperties"), !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUndefined"])(n)) {
                this.validateSessionProps(n, "scopedProperties");
                const h = new Set(Object.keys(s));
                if (!Object.keys(n).every((u)=>h.has(u.split(":")[0]))) throw new Error(`Scoped properties must be a subset of approved namespaces, received: ${JSON.stringify(n)}, approved namespaces: ${Array.from(h).join(", ")}`);
            }
        }), c(this, "isValidReject", async (t)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidParams"])(t)) {
                const { message: i } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `reject() params: ${t}`);
                throw new Error(i);
            }
            const { id: e, reason: s } = t;
            if (this.checkRecentlyDeleted(e), await this.isValidProposalId(e), !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidErrorReason"])(s)) {
                const { message: i } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(s)}`);
                throw new Error(i);
            }
        }), c(this, "isValidSessionSettleRequest", (t)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidParams"])(t)) {
                const { message: l } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${t}`);
                throw new Error(l);
            }
            const { relay: e, controller: s, namespaces: i, expiry: r } = t;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidRelay"])(e)) {
                const { message: l } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
                throw new Error(l);
            }
            const n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidController"])(s, "onSessionSettleRequest()");
            if (n) throw new Error(n.message);
            const a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidNamespaces"])(i, "onSessionSettleRequest()");
            if (a) throw new Error(a.message);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isExpired"])(r)) {
                const { message: l } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("EXPIRED", "onSessionSettleRequest()");
                throw new Error(l);
            }
        }), c(this, "isValidUpdate", async (t)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidParams"])(t)) {
                const { message: a } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `update() params: ${t}`);
                throw new Error(a);
            }
            const { topic: e, namespaces: s } = t;
            this.checkRecentlyDeleted(e), await this.isValidSessionTopic(e);
            const i = this.client.session.get(e), r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidNamespaces"])(s, "update()");
            if (r) throw new Error(r.message);
            const n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isConformingNamespaces"])(i.requiredNamespaces, s, "update()");
            if (n) throw new Error(n.message);
        }), c(this, "isValidExtend", async (t)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidParams"])(t)) {
                const { message: s } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `extend() params: ${t}`);
                throw new Error(s);
            }
            const { topic: e } = t;
            this.checkRecentlyDeleted(e), await this.isValidSessionTopic(e);
        }), c(this, "isValidRequest", async (t)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidParams"])(t)) {
                const { message: a } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `request() params: ${t}`);
                throw new Error(a);
            }
            const { topic: e, request: s, chainId: i, expiry: r } = t;
            this.checkRecentlyDeleted(e), await this.isValidSessionTopic(e);
            const { namespaces: n } = this.client.session.get(e);
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidNamespacesChainId"])(n, i)) {
                const { message: a } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `request() chainId: ${i}`);
                throw new Error(a);
            }
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidRequest"])(s)) {
                const { message: a } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `request() ${JSON.stringify(s)}`);
                throw new Error(a);
            }
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidNamespacesRequest"])(n, i, s.method)) {
                const { message: a } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `request() method: ${s.method}`);
                throw new Error(a);
            }
            if (r && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidRequestExpiry"])(r, _e)) {
                const { message: a } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `request() expiry: ${r}. Expiry must be a number (in seconds) between ${_e.min} and ${_e.max}`);
                throw new Error(a);
            }
        }), c(this, "isValidRespond", async (t)=>{
            var e;
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidParams"])(t)) {
                const { message: r } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `respond() params: ${t}`);
                throw new Error(r);
            }
            const { topic: s, response: i } = t;
            try {
                await this.isValidSessionTopic(s);
            } catch (r) {
                throw (e = t?.response) != null && e.id && this.cleanupAfterResponse(t), r;
            }
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidResponse"])(i)) {
                const { message: r } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(i)}`);
                throw new Error(r);
            }
        }), c(this, "isValidPing", async (t)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidParams"])(t)) {
                const { message: s } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `ping() params: ${t}`);
                throw new Error(s);
            }
            const { topic: e } = t;
            await this.isValidSessionOrPairingTopic(e);
        }), c(this, "isValidEmit", async (t)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidParams"])(t)) {
                const { message: n } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `emit() params: ${t}`);
                throw new Error(n);
            }
            const { topic: e, event: s, chainId: i } = t;
            await this.isValidSessionTopic(e);
            const { namespaces: r } = this.client.session.get(e);
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidNamespacesChainId"])(r, i)) {
                const { message: n } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `emit() chainId: ${i}`);
                throw new Error(n);
            }
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidEvent"])(s)) {
                const { message: n } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(s)}`);
                throw new Error(n);
            }
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidNamespacesEvent"])(r, i, s.name)) {
                const { message: n } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(s)}`);
                throw new Error(n);
            }
        }), c(this, "isValidDisconnect", async (t)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidParams"])(t)) {
                const { message: s } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `disconnect() params: ${t}`);
                throw new Error(s);
            }
            const { topic: e } = t;
            await this.isValidSessionOrPairingTopic(e);
        }), c(this, "isValidAuthenticate", (t)=>{
            const { chains: e, uri: s, domain: i, nonce: r } = t;
            if (!Array.isArray(e) || e.length === 0) throw new Error("chains is required and must be a non-empty array");
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidString"])(s, !1)) throw new Error("uri is required parameter");
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidString"])(i, !1)) throw new Error("domain is required parameter");
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidString"])(r, !1)) throw new Error("nonce is required parameter");
            if ([
                ...new Set(e.map((a)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseChainId"])(a).namespace))
            ].length > 1) throw new Error("Multi-namespace requests are not supported. Please request single namespace only.");
            const { namespace: n } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseChainId"])(e[0]);
            if (n !== "eip155") throw new Error("Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.");
        }), c(this, "getVerifyContext", async (t)=>{
            const { attestationId: e, hash: s, encryptedId: i, metadata: r, transportType: n } = t, a = {
                verified: {
                    verifyUrl: r.verifyUrl || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VERIFY_SERVER"],
                    validation: "UNKNOWN",
                    origin: r.url || ""
                }
            };
            try {
                if (n === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSPORT_TYPES"].link_mode) {
                    const p = this.getAppLinkIfEnabled(r, n);
                    return a.verified.validation = p && new URL(p).origin === new URL(r.url).origin ? "VALID" : "INVALID", a;
                }
                const l = await this.client.core.verify.resolve({
                    attestationId: e,
                    hash: s,
                    encryptedId: i,
                    verifyUrl: r.verifyUrl
                });
                l && (a.verified.origin = l.origin, a.verified.isScam = l.isScam, a.verified.validation = l.origin === new URL(r.url).origin ? "VALID" : "INVALID");
            } catch (l) {
                this.client.logger.warn(l);
            }
            return this.client.logger.debug(`Verify context: ${JSON.stringify(a)}`), a;
        }), c(this, "validateSessionProps", (t, e)=>{
            Object.values(t).forEach((s, i)=>{
                if (s == null) {
                    const { message: r } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `${e} must contain an existing value for each key. Received: ${s} for key ${Object.keys(t)[i]}`);
                    throw new Error(r);
                }
            });
        }), c(this, "getPendingAuthRequest", (t)=>{
            const e = this.client.auth.requests.get(t);
            return typeof e == "object" ? e : void 0;
        }), c(this, "addToRecentlyDeleted", (t, e)=>{
            if (this.recentlyDeletedMap.set(t, e), this.recentlyDeletedMap.size >= this.recentlyDeletedLimit) {
                let s = 0;
                const i = this.recentlyDeletedLimit / 2;
                for (const r of this.recentlyDeletedMap.keys()){
                    if (s++ >= i) break;
                    this.recentlyDeletedMap.delete(r);
                }
            }
        }), c(this, "checkRecentlyDeleted", (t)=>{
            const e = this.recentlyDeletedMap.get(t);
            if (e) {
                const { message: s } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `Record was recently deleted - ${e}: ${t}`);
                throw new Error(s);
            }
        }), c(this, "isLinkModeEnabled", (t, e)=>{
            var s, i, r, n, a, l, p, h, u;
            return !t || e !== __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSPORT_TYPES"].link_mode ? !1 : ((i = (s = this.client.metadata) == null ? void 0 : s.redirect) == null ? void 0 : i.linkMode) === !0 && ((n = (r = this.client.metadata) == null ? void 0 : r.redirect) == null ? void 0 : n.universal) !== void 0 && ((l = (a = this.client.metadata) == null ? void 0 : a.redirect) == null ? void 0 : l.universal) !== "" && ((p = t?.redirect) == null ? void 0 : p.universal) !== void 0 && ((h = t?.redirect) == null ? void 0 : h.universal) !== "" && ((u = t?.redirect) == null ? void 0 : u.linkMode) === !0 && this.client.core.linkModeSupportedApps.includes(t.redirect.universal) && typeof (/*TURBOPACK member replacement*/ __turbopack_context__.g == null ? void 0 : /*TURBOPACK member replacement*/ __turbopack_context__.g.Linking) < "u";
        }), c(this, "getAppLinkIfEnabled", (t, e)=>{
            var s;
            return this.isLinkModeEnabled(t, e) ? (s = t?.redirect) == null ? void 0 : s.universal : void 0;
        }), c(this, "handleLinkModeMessage", ({ url: t })=>{
            if (!t || !t.includes("wc_ev") || !t.includes("topic")) return;
            const e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSearchParamFromURL"])(t, "topic") || "", s = decodeURIComponent((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSearchParamFromURL"])(t, "wc_ev") || ""), i = this.client.session.keys.includes(e);
            i && this.client.session.update(e, {
                transportType: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSPORT_TYPES"].link_mode
            }), this.client.core.dispatchEnvelope({
                topic: e,
                message: s,
                sessionExists: i
            });
        }), c(this, "registerLinkModeListeners", async ()=>{
            var t;
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTestRun"])() || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isReactNative"])() && (t = this.client.metadata.redirect) != null && t.linkMode) {
                const e = /*TURBOPACK member replacement*/ __turbopack_context__.g == null ? void 0 : /*TURBOPACK member replacement*/ __turbopack_context__.g.Linking;
                if (typeof e < "u") {
                    e.addEventListener("url", this.handleLinkModeMessage, this.client.name);
                    const s = await e.getInitialURL();
                    s && setTimeout(()=>{
                        this.handleLinkModeMessage({
                            url: s
                        });
                    }, 50);
                }
            }
        }), c(this, "getTVFParams", (t, e, s)=>{
            var i, r, n;
            if (!((i = e.request) != null && i.method)) return {};
            const a = {
                correlationId: t,
                rpcMethods: [
                    e.request.method
                ],
                chainId: e.chainId
            };
            try {
                const l = this.extractTxHashesFromResult(e.request, s);
                a.txHashes = l, a.contractAddresses = this.isValidContractData(e.request.params) ? [
                    (n = (r = e.request.params) == null ? void 0 : r[0]) == null ? void 0 : n.to
                ] : [];
            } catch (l) {
                this.client.logger.warn("Error getting TVF params", l);
            }
            return a;
        }), c(this, "isValidContractData", (t)=>{
            var e;
            if (!t) return !1;
            try {
                const s = t?.data || ((e = t?.[0]) == null ? void 0 : e.data);
                if (!s.startsWith("0x")) return !1;
                const i = s.slice(2);
                return /^[0-9a-fA-F]*$/.test(i) ? i.length % 2 === 0 : !1;
            } catch  {}
            return !1;
        }), c(this, "extractTxHashesFromResult", (t, e)=>{
            var s;
            try {
                if (!e) return [];
                const i = t.method, r = yt[i];
                if (i === "sui_signTransaction") return [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSuiDigest"])(e.transactionBytes)
                ];
                if (i === "near_signTransaction") return [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNearTransactionIdFromSignedTransaction"])(e)
                ];
                if (i === "near_signTransactions") return e.map((a)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getNearTransactionIdFromSignedTransaction"])(a));
                if (i === "xrpl_signTransactionFor" || i === "xrpl_signTransaction") return [
                    (s = e.tx_json) == null ? void 0 : s.hash
                ];
                if (i === "polkadot_signTransaction") return [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSignedExtrinsicHash"])({
                        transaction: t.params.transactionPayload,
                        signature: e.signature
                    })
                ];
                if (i === "algo_signTxn") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidArray"])(e) ? e.map((a)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlgorandTransactionId"])(a)) : [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlgorandTransactionId"])(e)
                ];
                if (i === "cosmos_signDirect") return [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSignDirectHash"])(e)
                ];
                if (typeof e == "string") return [
                    e
                ];
                const n = e[r.key];
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidArray"])(n)) return i === "solana_signAllTransactions" ? n.map((a)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractSolanaTransactionId"])(a)) : n;
                if (typeof n == "string") return [
                    n
                ];
            } catch (i) {
                this.client.logger.warn("Error extracting tx hashes from result", i);
            }
            return [];
        });
    }
    async processPendingMessageEvents() {
        try {
            const o = this.client.session.keys, t = this.client.core.relayer.messages.getWithoutAck(o);
            for (const [e, s] of Object.entries(t))for (const i of s)try {
                await this.onProviderMessageEvent({
                    topic: e,
                    message: i,
                    publishedAt: Date.now()
                });
            } catch  {
                this.client.logger.warn(`Error processing pending message event for topic: ${e}, message: ${i}`);
            }
        } catch (o) {
            this.client.logger.warn("processPendingMessageEvents failed", o);
        }
    }
    isInitialized() {
        if (!this.initialized) {
            const { message: o } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("NOT_INITIALIZED", this.name);
            throw new Error(o);
        }
    }
    async confirmOnlineStateOrThrow() {
        await this.client.core.relayer.confirmOnlineStateOrThrow();
    }
    registerRelayerEvents() {
        this.client.core.relayer.on(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RELAYER_EVENTS"].message, (o)=>{
            this.onProviderMessageEvent(o);
        });
    }
    async onRelayMessage(o) {
        const { topic: t, message: e, attestation: s, transportType: i } = o, { publicKey: r } = this.client.auth.authKeys.keys.includes(pe) ? this.client.auth.authKeys.get(pe) : {
            responseTopic: void 0,
            publicKey: void 0
        };
        try {
            const n = await this.client.core.crypto.decode(t, e, {
                receiverPublicKey: r,
                encoding: i === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSPORT_TYPES"].link_mode ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE64URL"] : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE64"]
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcRequest"])(n) ? (this.client.core.history.set(t, n), await this.onRelayEventRequest({
                topic: t,
                payload: n,
                attestation: s,
                transportType: i,
                encryptedId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashMessage"])(e)
            })) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isJsonRpcResponse"])(n) ? (await this.client.core.history.resolve(n), await this.onRelayEventResponse({
                topic: t,
                payload: n,
                transportType: i
            }), this.client.core.history.delete(t, n.id)) : await this.onRelayEventUnknownPayload({
                topic: t,
                payload: n,
                transportType: i
            }), await this.client.core.relayer.messages.ack(t, e);
        } catch (n) {
            this.client.logger.error(n);
        }
    }
    registerExpirerEvents() {
        this.client.core.expirer.on(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EXPIRER_EVENTS"].expired, async (o)=>{
            const { topic: t, id: e } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseExpirerTarget"])(o.target);
            if (e && this.client.pendingRequest.keys.includes(e)) return await this.deletePendingSessionRequest(e, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("EXPIRED"), !0);
            if (e && this.client.auth.requests.keys.includes(e)) return await this.deletePendingAuthRequest(e, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("EXPIRED"), !0);
            t ? this.client.session.keys.includes(t) && (await this.deleteSession({
                topic: t,
                expirerHasDeleted: !0
            }), this.client.events.emit("session_expire", {
                topic: t
            })) : e && (await this.deleteProposal(e, !0), this.client.events.emit("proposal_expire", {
                id: e
            }));
        });
    }
    registerPairingEvents() {
        this.client.core.pairing.events.on(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAIRING_EVENTS"].create, (o)=>this.onPairingCreated(o)), this.client.core.pairing.events.on(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAIRING_EVENTS"].delete, (o)=>{
            this.addToRecentlyDeleted(o.topic, "pairing");
        });
    }
    isValidPairingTopic(o) {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidString"])(o, !1)) {
            const { message: t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `pairing topic should be a string: ${o}`);
            throw new Error(t);
        }
        if (!this.client.core.pairing.pairings.keys.includes(o)) {
            const { message: t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("NO_MATCHING_KEY", `pairing topic doesn't exist: ${o}`);
            throw new Error(t);
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isExpired"])(this.client.core.pairing.pairings.get(o).expiry)) {
            const { message: t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("EXPIRED", `pairing topic: ${o}`);
            throw new Error(t);
        }
    }
    async isValidSessionTopic(o) {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidString"])(o, !1)) {
            const { message: t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `session topic should be a string: ${o}`);
            throw new Error(t);
        }
        if (this.checkRecentlyDeleted(o), !this.client.session.keys.includes(o)) {
            const { message: t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("NO_MATCHING_KEY", `session topic doesn't exist: ${o}`);
            throw new Error(t);
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isExpired"])(this.client.session.get(o).expiry)) {
            await this.deleteSession({
                topic: o
            });
            const { message: t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("EXPIRED", `session topic: ${o}`);
            throw new Error(t);
        }
        if (!this.client.core.crypto.keychain.has(o)) {
            const { message: t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `session topic does not exist in keychain: ${o}`);
            throw await this.deleteSession({
                topic: o
            }), new Error(t);
        }
    }
    async isValidSessionOrPairingTopic(o) {
        if (this.checkRecentlyDeleted(o), this.client.session.keys.includes(o)) await this.isValidSessionTopic(o);
        else if (this.client.core.pairing.pairings.keys.includes(o)) this.isValidPairingTopic(o);
        else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidString"])(o, !1)) {
            const { message: t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${o}`);
            throw new Error(t);
        } else {
            const { message: t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `session or pairing topic should be a string: ${o}`);
            throw new Error(t);
        }
    }
    async isValidProposalId(o) {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidId"])(o)) {
            const { message: t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("MISSING_OR_INVALID", `proposal id should be a number: ${o}`);
            throw new Error(t);
        }
        if (!this.client.proposal.keys.includes(o)) {
            const { message: t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("NO_MATCHING_KEY", `proposal id doesn't exist: ${o}`);
            throw new Error(t);
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isExpired"])(this.client.proposal.get(o).expiryTimestamp)) {
            await this.deleteProposal(o);
            const { message: t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInternalError"])("EXPIRED", `proposal id: ${o}`);
            throw new Error(t);
        }
    }
}
class ks extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Store"] {
    constructor(o, t){
        super(o, t, dt, we), this.core = o, this.logger = t;
    }
}
class It extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Store"] {
    constructor(o, t){
        super(o, t, ut, we), this.core = o, this.logger = t;
    }
}
class Ds extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Store"] {
    constructor(o, t){
        super(o, t, wt, we, (e)=>e.id), this.core = o, this.logger = t;
    }
}
class Ls extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Store"] {
    constructor(o, t){
        super(o, t, Et, le, ()=>pe), this.core = o, this.logger = t;
    }
}
class Ms extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Store"] {
    constructor(o, t){
        super(o, t, St, le), this.core = o, this.logger = t;
    }
}
class $s extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Store"] {
    constructor(o, t){
        super(o, t, Rt, le, (e)=>e.id), this.core = o, this.logger = t;
    }
}
var Ks = Object.defineProperty, Us = (E, o, t)=>o in E ? Ks(E, o, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : E[o] = t, Ke = (E, o, t)=>Us(E, typeof o != "symbol" ? o + "" : o, t);
class Gs {
    constructor(o, t){
        this.core = o, this.logger = t, Ke(this, "authKeys"), Ke(this, "pairingTopics"), Ke(this, "requests"), this.authKeys = new Ls(this.core, this.logger), this.pairingTopics = new Ms(this.core, this.logger), this.requests = new $s(this.core, this.logger);
    }
    async init() {
        await this.authKeys.init(), await this.pairingTopics.init(), await this.requests.init();
    }
}
var js = Object.defineProperty, Fs = (E, o, t)=>o in E ? js(E, o, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : E[o] = t, f = (E, o, t)=>Fs(E, typeof o != "symbol" ? o + "" : o, t);
class fe extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$types$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ISignClient"] {
    constructor(o){
        super(o), f(this, "protocol", Ce), f(this, "version", ke), f(this, "name", me.name), f(this, "metadata"), f(this, "core"), f(this, "logger"), f(this, "events", new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EventEmitter"]), f(this, "engine"), f(this, "session"), f(this, "proposal"), f(this, "pendingRequest"), f(this, "auth"), f(this, "signConfig"), f(this, "on", (e, s)=>this.events.on(e, s)), f(this, "once", (e, s)=>this.events.once(e, s)), f(this, "off", (e, s)=>this.events.off(e, s)), f(this, "removeListener", (e, s)=>this.events.removeListener(e, s)), f(this, "removeAllListeners", (e)=>this.events.removeAllListeners(e)), f(this, "connect", async (e)=>{
            try {
                return await this.engine.connect(e);
            } catch (s) {
                throw this.logger.error(s.message), s;
            }
        }), f(this, "pair", async (e)=>{
            try {
                return await this.engine.pair(e);
            } catch (s) {
                throw this.logger.error(s.message), s;
            }
        }), f(this, "approve", async (e)=>{
            try {
                return await this.engine.approve(e);
            } catch (s) {
                throw this.logger.error(s.message), s;
            }
        }), f(this, "reject", async (e)=>{
            try {
                return await this.engine.reject(e);
            } catch (s) {
                throw this.logger.error(s.message), s;
            }
        }), f(this, "update", async (e)=>{
            try {
                return await this.engine.update(e);
            } catch (s) {
                throw this.logger.error(s.message), s;
            }
        }), f(this, "extend", async (e)=>{
            try {
                return await this.engine.extend(e);
            } catch (s) {
                throw this.logger.error(s.message), s;
            }
        }), f(this, "request", async (e)=>{
            try {
                return await this.engine.request(e);
            } catch (s) {
                throw this.logger.error(s.message), s;
            }
        }), f(this, "respond", async (e)=>{
            try {
                return await this.engine.respond(e);
            } catch (s) {
                throw this.logger.error(s.message), s;
            }
        }), f(this, "ping", async (e)=>{
            try {
                return await this.engine.ping(e);
            } catch (s) {
                throw this.logger.error(s.message), s;
            }
        }), f(this, "emit", async (e)=>{
            try {
                return await this.engine.emit(e);
            } catch (s) {
                throw this.logger.error(s.message), s;
            }
        }), f(this, "disconnect", async (e)=>{
            try {
                return await this.engine.disconnect(e);
            } catch (s) {
                throw this.logger.error(s.message), s;
            }
        }), f(this, "find", (e)=>{
            try {
                return this.engine.find(e);
            } catch (s) {
                throw this.logger.error(s.message), s;
            }
        }), f(this, "getPendingSessionRequests", ()=>{
            try {
                return this.engine.getPendingSessionRequests();
            } catch (e) {
                throw this.logger.error(e.message), e;
            }
        }), f(this, "authenticate", async (e, s)=>{
            try {
                return await this.engine.authenticate(e, s);
            } catch (i) {
                throw this.logger.error(i.message), i;
            }
        }), f(this, "formatAuthMessage", (e)=>{
            try {
                return this.engine.formatAuthMessage(e);
            } catch (s) {
                throw this.logger.error(s.message), s;
            }
        }), f(this, "approveSessionAuthenticate", async (e)=>{
            try {
                return await this.engine.approveSessionAuthenticate(e);
            } catch (s) {
                throw this.logger.error(s.message), s;
            }
        }), f(this, "rejectSessionAuthenticate", async (e)=>{
            try {
                return await this.engine.rejectSessionAuthenticate(e);
            } catch (s) {
                throw this.logger.error(s.message), s;
            }
        }), this.name = o?.name || me.name, this.metadata = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["populateAppMetadata"])(o?.metadata), this.signConfig = o?.signConfig;
        const t = typeof o?.logger < "u" && typeof o?.logger != "string" ? o.logger : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__pino$3e$__["pino"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDefaultLoggerOptions"])({
            level: o?.logger || me.logger
        }));
        this.core = o?.core || new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Core"](o), this.logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateChildLogger"])(t, this.name), this.session = new It(this.core, this.logger), this.proposal = new ks(this.core, this.logger), this.pendingRequest = new Ds(this.core, this.logger), this.engine = new Cs(this), this.auth = new Gs(this.core, this.logger);
    }
    static async init(o) {
        const t = new fe(o);
        return await t.initialize(), t;
    }
    get context() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLoggerContext"])(this.logger);
    }
    get pairing() {
        return this.core.pairing.pairings;
    }
    async initialize() {
        this.logger.trace("Initialized");
        try {
            await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.auth.init(), await this.engine.init(), this.logger.info("SignClient Initialization Success");
        } catch (o) {
            throw this.logger.info("SignClient Initialization Failure"), this.logger.error(o.message), o;
        }
    }
}
const Qs = It, Hs = fe;
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/universal-provider/dist/index.es.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UniversalProvider",
    ()=>Bs,
    "default",
    ()=>J
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/frontend/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$sign$2d$client$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/sign-client/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/utils/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/@walletconnect/logger/dist/index.es.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__pino$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/thirdweb/node_modules/pino/browser.js [app-client] (ecmascript) <export default as pino>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-http-connection/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-provider/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/events/events.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
const pe = "error", We = "wss://relay.walletconnect.org", Ke = "wc", Ve = "universal_provider", x = `${Ke}@2:${Ve}:`, de = "https://rpc.walletconnect.org/v1/", ue = "generic", Ye = `${de}bundler`, $ = "call_status", Xe = 86400, m = {
    DEFAULT_CHAIN_CHANGED: "default_chain_changed"
};
function K(s) {
    return s == null || typeof s != "object" && typeof s != "function";
}
function le(s) {
    return Object.getOwnPropertySymbols(s).filter((e)=>Object.prototype.propertyIsEnumerable.call(s, e));
}
function fe(s) {
    return s == null ? s === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(s);
}
const Qe = "[object RegExp]", me = "[object String]", ve = "[object Number]", ge = "[object Boolean]", Pe = "[object Arguments]", Ze = "[object Symbol]", Te = "[object Date]", et = "[object Map]", tt = "[object Set]", st = "[object Array]", it = "[object ArrayBuffer]", rt = "[object Object]", nt = "[object DataView]", at = "[object Uint8Array]", ct = "[object Uint8ClampedArray]", ot = "[object Uint16Array]", ht = "[object Uint32Array]", pt = "[object Int8Array]", dt = "[object Int16Array]", ut = "[object Int32Array]", lt = "[object Float32Array]", ft = "[object Float64Array]";
function V(s) {
    return ArrayBuffer.isView(s) && !(s instanceof DataView);
}
function mt(s, e) {
    return O(s, void 0, s, new Map, e);
}
function O(s, e, t, i = new Map, n = void 0) {
    const a = n?.(s, e, t, i);
    if (a != null) return a;
    if (K(s)) return s;
    if (i.has(s)) return i.get(s);
    if (Array.isArray(s)) {
        const r = new Array(s.length);
        i.set(s, r);
        for(let c = 0; c < s.length; c++)r[c] = O(s[c], c, t, i, n);
        return Object.hasOwn(s, "index") && (r.index = s.index), Object.hasOwn(s, "input") && (r.input = s.input), r;
    }
    if (s instanceof Date) return new Date(s.getTime());
    if (s instanceof RegExp) {
        const r = new RegExp(s.source, s.flags);
        return r.lastIndex = s.lastIndex, r;
    }
    if (s instanceof Map) {
        const r = new Map;
        i.set(s, r);
        for (const [c, o] of s)r.set(c, O(o, c, t, i, n));
        return r;
    }
    if (s instanceof Set) {
        const r = new Set;
        i.set(s, r);
        for (const c of s)r.add(O(c, void 0, t, i, n));
        return r;
    }
    if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"] < "u" && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].isBuffer(s)) return s.subarray();
    if (V(s)) {
        const r = new (Object.getPrototypeOf(s)).constructor(s.length);
        i.set(s, r);
        for(let c = 0; c < s.length; c++)r[c] = O(s[c], c, t, i, n);
        return r;
    }
    if (s instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && s instanceof SharedArrayBuffer) return s.slice(0);
    if (s instanceof DataView) {
        const r = new DataView(s.buffer.slice(0), s.byteOffset, s.byteLength);
        return i.set(s, r), y(r, s, t, i, n), r;
    }
    if (typeof File < "u" && s instanceof File) {
        const r = new File([
            s
        ], s.name, {
            type: s.type
        });
        return i.set(s, r), y(r, s, t, i, n), r;
    }
    if (s instanceof Blob) {
        const r = new Blob([
            s
        ], {
            type: s.type
        });
        return i.set(s, r), y(r, s, t, i, n), r;
    }
    if (s instanceof Error) {
        const r = new s.constructor;
        return i.set(s, r), r.message = s.message, r.name = s.name, r.stack = s.stack, r.cause = s.cause, y(r, s, t, i, n), r;
    }
    if (typeof s == "object" && vt(s)) {
        const r = Object.create(Object.getPrototypeOf(s));
        return i.set(s, r), y(r, s, t, i, n), r;
    }
    return s;
}
function y(s, e, t = s, i, n) {
    const a = [
        ...Object.keys(e),
        ...le(e)
    ];
    for(let r = 0; r < a.length; r++){
        const c = a[r], o = Object.getOwnPropertyDescriptor(s, c);
        (o == null || o.writable) && (s[c] = O(e[c], c, t, i, n));
    }
}
function vt(s) {
    switch(fe(s)){
        case Pe:
        case st:
        case it:
        case nt:
        case ge:
        case Te:
        case lt:
        case ft:
        case pt:
        case dt:
        case ut:
        case et:
        case ve:
        case rt:
        case Qe:
        case tt:
        case me:
        case Ze:
        case at:
        case ct:
        case ot:
        case ht:
            return !0;
        default:
            return !1;
    }
}
function gt(s, e) {
    return mt(s, (t, i, n, a)=>{
        const r = e?.(t, i, n, a);
        if (r != null) return r;
        if (typeof s == "object") switch(Object.prototype.toString.call(s)){
            case ve:
            case me:
            case ge:
                {
                    const c = new s.constructor(s?.valueOf());
                    return y(c, s), c;
                }
            case Pe:
                {
                    const c = {};
                    return y(c, s), c.length = s.length, c[Symbol.iterator] = s[Symbol.iterator], c;
                }
            default:
                return;
        }
    });
}
function we(s) {
    return gt(s);
}
function ye(s) {
    return s !== null && typeof s == "object" && fe(s) === "[object Arguments]";
}
function be(s) {
    return typeof s == "object" && s !== null;
}
function Pt() {}
function wt(s) {
    return V(s);
}
function yt(s) {
    if (typeof s != "object" || s == null) return !1;
    if (Object.getPrototypeOf(s) === null) return !0;
    if (Object.prototype.toString.call(s) !== "[object Object]") {
        const t = s[Symbol.toStringTag];
        return t == null || !Object.getOwnPropertyDescriptor(s, Symbol.toStringTag)?.writable ? !1 : s.toString() === `[object ${t}]`;
    }
    let e = s;
    for(; Object.getPrototypeOf(e) !== null;)e = Object.getPrototypeOf(e);
    return Object.getPrototypeOf(s) === e;
}
function bt(s) {
    if (K(s)) return s;
    if (Array.isArray(s) || V(s) || s instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && s instanceof SharedArrayBuffer) return s.slice(0);
    const e = Object.getPrototypeOf(s), t = e.constructor;
    if (s instanceof Date || s instanceof Map || s instanceof Set) return new t(s);
    if (s instanceof RegExp) {
        const i = new t(s);
        return i.lastIndex = s.lastIndex, i;
    }
    if (s instanceof DataView) return new t(s.buffer.slice(0));
    if (s instanceof Error) {
        const i = new t(s.message);
        return i.stack = s.stack, i.name = s.name, i.cause = s.cause, i;
    }
    if (typeof File < "u" && s instanceof File) return new t([
        s
    ], s.name, {
        type: s.type,
        lastModified: s.lastModified
    });
    if (typeof s == "object") {
        const i = Object.create(e);
        return Object.assign(i, s);
    }
    return s;
}
function It(s, ...e) {
    const t = e.slice(0, -1), i = e[e.length - 1];
    let n = s;
    for(let a = 0; a < t.length; a++){
        const r = t[a];
        n = L(n, r, i, new Map);
    }
    return n;
}
function L(s, e, t, i) {
    if (K(s) && (s = Object(s)), e == null || typeof e != "object") return s;
    if (i.has(e)) return bt(i.get(e));
    if (i.set(e, s), Array.isArray(e)) {
        e = e.slice();
        for(let a = 0; a < e.length; a++)e[a] = e[a] ?? void 0;
    }
    const n = [
        ...Object.keys(e),
        ...le(e)
    ];
    for(let a = 0; a < n.length; a++){
        const r = n[a];
        let c = e[r], o = s[r];
        if (ye(c) && (c = {
            ...c
        }), ye(o) && (o = {
            ...o
        }), typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"] < "u" && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].isBuffer(c) && (c = we(c)), Array.isArray(c)) if (typeof o == "object" && o != null) {
            const u = [], p = Reflect.ownKeys(o);
            for(let w = 0; w < p.length; w++){
                const l = p[w];
                u[l] = o[l];
            }
            o = u;
        } else o = [];
        const d = t(o, c, r, s, e, i);
        d != null ? s[r] = d : Array.isArray(c) || be(o) && be(c) ? s[r] = L(o, c, t, i) : o == null && yt(c) ? s[r] = L({}, c, t, i) : o == null && wt(c) ? s[r] = we(c) : (o === void 0 || c !== void 0) && (s[r] = c);
    }
    return s;
}
function $t(s, ...e) {
    return It(s, ...e, Pt);
}
var Ot = Object.defineProperty, Ct = Object.defineProperties, At = Object.getOwnPropertyDescriptors, Ie = Object.getOwnPropertySymbols, Et = Object.prototype.hasOwnProperty, Ht = Object.prototype.propertyIsEnumerable, $e = (s, e, t)=>e in s ? Ot(s, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : s[e] = t, M = (s, e)=>{
    for(var t in e || (e = {}))Et.call(e, t) && $e(s, t, e[t]);
    if (Ie) for (var t of Ie(e))Ht.call(e, t) && $e(s, t, e[t]);
    return s;
}, St = (s, e)=>Ct(s, At(e));
function f(s, e, t) {
    var i;
    const n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseChainId"])(s);
    return ((i = e.rpcMap) == null ? void 0 : i[n.reference]) || `${de}?chainId=${n.namespace}:${n.reference}&projectId=${t}`;
}
function b(s) {
    return s.includes(":") ? s.split(":")[1] : s;
}
function Oe(s) {
    return s.map((e)=>`${e.split(":")[0]}:${e.split(":")[1]}`);
}
function Nt(s, e) {
    const t = Object.keys(e.namespaces).filter((n)=>n.includes(s));
    if (!t.length) return [];
    const i = [];
    return t.forEach((n)=>{
        const a = e.namespaces[n].accounts;
        i.push(...a);
    }), i;
}
function Ce(s) {
    return Object.fromEntries(Object.entries(s).filter(([e, t])=>{
        var i, n;
        return ((i = t?.chains) == null ? void 0 : i.length) && ((n = t?.chains) == null ? void 0 : n.length) > 0;
    }));
}
function B(s = {}, e = {}) {
    const t = Ce(Ae(s)), i = Ce(Ae(e));
    return $t(t, i);
}
function Ae(s) {
    var e, t, i, n, a;
    const r = {};
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidObject"])(s)) return r;
    for (const [c, o] of Object.entries(s)){
        const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCaipNamespace"])(c) ? [
            c
        ] : o.chains, u = o.methods || [], p = o.events || [], w = o.rpcMap || {}, l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(c);
        r[l] = St(M(M({}, r[l]), o), {
            chains: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeArrays"])(d, (e = r[l]) == null ? void 0 : e.chains),
            methods: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeArrays"])(u, (t = r[l]) == null ? void 0 : t.methods),
            events: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeArrays"])(p, (i = r[l]) == null ? void 0 : i.events)
        }), ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidObject"])(w) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidObject"])(((n = r[l]) == null ? void 0 : n.rpcMap) || {})) && (r[l].rpcMap = M(M({}, w), (a = r[l]) == null ? void 0 : a.rpcMap));
    }
    return r;
}
function Ee(s) {
    return s.includes(":") ? s.split(":")[2] : s;
}
function He(s) {
    const e = {};
    for (const [t, i] of Object.entries(s)){
        const n = i.methods || [], a = i.events || [], r = i.accounts || [], c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCaipNamespace"])(t) ? [
            t
        ] : i.chains ? i.chains : Oe(i.accounts);
        e[t] = {
            chains: c,
            methods: n,
            events: a,
            accounts: r
        };
    }
    return e;
}
function Y(s) {
    return typeof s == "number" ? s : s.includes("0x") ? parseInt(s, 16) : (s = s.includes(":") ? s.split(":")[1] : s, isNaN(Number(s)) ? s : Number(s));
}
function qt(s) {
    try {
        const e = JSON.parse(s);
        return typeof e == "object" && e !== null && !Array.isArray(e);
    } catch  {
        return !1;
    }
}
const Se = {}, h = (s)=>Se[s], X = (s, e)=>{
    Se[s] = e;
};
var Dt = Object.defineProperty, Ne = Object.getOwnPropertySymbols, jt = Object.prototype.hasOwnProperty, Rt = Object.prototype.propertyIsEnumerable, qe = (s, e, t)=>e in s ? Dt(s, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : s[e] = t, De = (s, e)=>{
    for(var t in e || (e = {}))jt.call(e, t) && qe(s, t, e[t]);
    if (Ne) for (var t of Ne(e))Rt.call(e, t) && qe(s, t, e[t]);
    return s;
};
const je = "eip155", _t = [
    "atomic",
    "flow-control",
    "paymasterService",
    "sessionKeys",
    "auxiliaryFunds"
], Ft = (s)=>s && s.startsWith("0x") ? BigInt(s).toString(10) : s, Q = (s)=>s && s.startsWith("0x") ? s : `0x${BigInt(s).toString(16)}`, Re = (s)=>Object.keys(s).filter((e)=>_t.includes(e)).reduce((e, t)=>(e[t] = Ut(s[t]), e), {}), Ut = (s)=>typeof s == "string" && qt(s) ? JSON.parse(s) : s, xt = (s, e, t)=>{
    const { sessionProperties: i = {}, scopedProperties: n = {} } = s, a = {};
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidObject"])(n) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidObject"])(i)) return;
    const r = Re(i);
    for (const c of t){
        const o = Ft(c);
        if (!o) continue;
        a[Q(o)] = r;
        const d = n?.[`${je}:${o}`];
        if (d) {
            const u = d?.[`${je}:${o}:${e}`];
            a[Q(o)] = De(De({}, a[Q(o)]), Re(u || d));
        }
    }
    for (const [c, o] of Object.entries(a))Object.keys(o).length === 0 && delete a[c];
    return Object.keys(a).length > 0 ? a : void 0;
};
var Lt = Object.defineProperty, Mt = (s, e, t)=>e in s ? Lt(s, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : s[e] = t, Bt = (s, e, t)=>Mt(s, typeof e != "symbol" ? e + "" : e, t);
let Z;
class re {
    constructor(e){
        Bt(this, "storage"), this.storage = e;
    }
    async getItem(e) {
        return await this.storage.getItem(e);
    }
    async setItem(e, t) {
        return await this.storage.setItem(e, t);
    }
    async removeItem(e) {
        return await this.storage.removeItem(e);
    }
    static getStorage(e) {
        return Z || (Z = new re(e)), Z;
    }
}
var Gt = Object.defineProperty, Jt = Object.defineProperties, zt = Object.getOwnPropertyDescriptors, _e = Object.getOwnPropertySymbols, kt = Object.prototype.hasOwnProperty, Wt = Object.prototype.propertyIsEnumerable, Fe = (s, e, t)=>e in s ? Gt(s, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : s[e] = t, Kt = (s, e)=>{
    for(var t in e || (e = {}))kt.call(e, t) && Fe(s, t, e[t]);
    if (_e) for (var t of _e(e))Wt.call(e, t) && Fe(s, t, e[t]);
    return s;
}, Vt = (s, e)=>Jt(s, zt(e));
async function Yt(s, e) {
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseChainId"])(s.result.capabilities.caip345.caip2), i = s.result.capabilities.caip345.transactionHashes, n = await Promise.allSettled(i.map((p)=>Xt(t.reference, p, e))), a = n.filter((p)=>p.status === "fulfilled").map((p)=>p.value).filter((p)=>p);
    n.filter((p)=>p.status === "rejected").forEach((p)=>console.warn("Failed to fetch transaction receipt:", p.reason));
    const r = !a.length || a.some((p)=>!p), c = a.every((p)=>p?.status === "0x1"), o = a.every((p)=>p?.status === "0x0"), d = a.some((p)=>p?.status === "0x0");
    let u;
    return r ? u = 100 : c ? u = 200 : o ? u = 500 : d && (u = 600), {
        id: s.result.id,
        version: s.request.version,
        atomic: s.request.atomicRequired,
        chainId: s.request.chainId,
        capabilities: s.result.capabilities,
        receipts: a,
        status: u
    };
}
async function Xt(s, e, t) {
    return await t(parseInt(s)).request((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatJsonRpcRequest"])("eth_getTransactionReceipt", [
        e
    ]));
}
async function Qt({ sendCalls: s, storage: e }) {
    const t = await e.getItem($);
    await e.setItem($, Vt(Kt({}, t), {
        [s.result.id]: {
            request: s.request,
            result: s.result,
            expiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcExpiry"])(Xe)
        }
    }));
}
async function Zt({ resultId: s, storage: e }) {
    const t = await e.getItem($);
    if (t) {
        delete t[s], await e.setItem($, t);
        for(const i in t)(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isExpired"])(t[i].expiry) && delete t[i];
        await e.setItem($, t);
    }
}
async function Tt({ resultId: s, storage: e }) {
    const t = await e.getItem($), i = t?.[s];
    if (i && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isExpired"])(i.expiry)) return i;
    await Zt({
        resultId: s,
        storage: e
    });
}
var es = Object.defineProperty, ts = (s, e, t)=>e in s ? es(s, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : s[e] = t, C = (s, e, t)=>ts(s, typeof e != "symbol" ? e + "" : e, t);
class ss {
    constructor(e){
        C(this, "name", "polkadot"), C(this, "client"), C(this, "httpProviders"), C(this, "events"), C(this, "namespace"), C(this, "chainId"), this.namespace = e.namespace, this.events = h("events"), this.client = h("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(e) {
        this.namespace = Object.assign(this.namespace, e);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const e = this.namespace.chains[0];
        if (!e) throw new Error("ChainId not found");
        return e.split(":")[1];
    }
    request(e) {
        return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
    }
    setDefaultChain(e, t) {
        this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(m.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
    }
    getAccounts() {
        const e = this.namespace.accounts;
        return e ? e.filter((t)=>t.split(":")[1] === this.chainId.toString()).map((t)=>t.split(":")[2]) || [] : [];
    }
    createHttpProviders() {
        const e = {};
        return this.namespace.chains.forEach((t)=>{
            var i;
            const n = b(t);
            e[n] = this.createHttpProvider(n, (i = this.namespace.rpcMap) == null ? void 0 : i[t]);
        }), e;
    }
    getHttpProvider() {
        const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
        if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
        return t;
    }
    setHttpProvider(e, t) {
        const i = this.createHttpProvider(e, t);
        i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, t) {
        const i = t || f(e, this.namespace, this.client.core.projectId);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i, h("disableProviderPing")));
    }
}
var is = Object.defineProperty, rs = Object.defineProperties, ns = Object.getOwnPropertyDescriptors, Ue = Object.getOwnPropertySymbols, as = Object.prototype.hasOwnProperty, cs = Object.prototype.propertyIsEnumerable, T = (s, e, t)=>e in s ? is(s, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : s[e] = t, ee = (s, e)=>{
    for(var t in e || (e = {}))as.call(e, t) && T(s, t, e[t]);
    if (Ue) for (var t of Ue(e))cs.call(e, t) && T(s, t, e[t]);
    return s;
}, te = (s, e)=>rs(s, ns(e)), I = (s, e, t)=>T(s, typeof e != "symbol" ? e + "" : e, t);
class os {
    constructor(e){
        I(this, "name", "eip155"), I(this, "client"), I(this, "chainId"), I(this, "namespace"), I(this, "httpProviders"), I(this, "events"), I(this, "storage"), this.namespace = e.namespace, this.events = h("events"), this.client = h("client"), this.httpProviders = this.createHttpProviders(), this.chainId = parseInt(this.getDefaultChain()), this.storage = re.getStorage(this.client.core.storage);
    }
    async request(e) {
        switch(e.request.method){
            case "eth_requestAccounts":
                return this.getAccounts();
            case "eth_accounts":
                return this.getAccounts();
            case "wallet_switchEthereumChain":
                return await this.handleSwitchChain(e);
            case "eth_chainId":
                return parseInt(this.getDefaultChain());
            case "wallet_getCapabilities":
                return await this.getCapabilities(e);
            case "wallet_getCallsStatus":
                return await this.getCallStatus(e);
            case "wallet_sendCalls":
                return await this.sendCalls(e);
        }
        return this.namespace.methods.includes(e.request.method) ? await this.client.request(e) : this.getHttpProvider().request(e.request);
    }
    updateNamespace(e) {
        this.namespace = Object.assign(this.namespace, e);
    }
    setDefaultChain(e, t) {
        this.httpProviders[e] || this.setHttpProvider(parseInt(e), t), this.chainId = parseInt(e), this.events.emit(m.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId.toString();
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const e = this.namespace.chains[0];
        if (!e) throw new Error("ChainId not found");
        return e.split(":")[1];
    }
    createHttpProvider(e, t) {
        const i = t || f(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HttpConnection"](i, h("disableProviderPing")));
    }
    setHttpProvider(e, t) {
        const i = this.createHttpProvider(e, t);
        i && (this.httpProviders[e] = i);
    }
    createHttpProviders() {
        const e = {};
        return this.namespace.chains.forEach((t)=>{
            var i;
            const n = parseInt(b(t));
            e[n] = this.createHttpProvider(n, (i = this.namespace.rpcMap) == null ? void 0 : i[t]);
        }), e;
    }
    getAccounts() {
        const e = this.namespace.accounts;
        return e ? [
            ...new Set(e.filter((t)=>t.split(":")[1] === this.chainId.toString()).map((t)=>t.split(":")[2]))
        ] : [];
    }
    getHttpProvider(e) {
        const t = e || this.chainId;
        return this.httpProviders[t] || (this.httpProviders = te(ee({}, this.httpProviders), {
            [t]: this.createHttpProvider(t)
        }), this.httpProviders[t]);
    }
    async handleSwitchChain(e) {
        var t, i;
        let n = e.request.params ? (t = e.request.params[0]) == null ? void 0 : t.chainId : "0x0";
        n = n.startsWith("0x") ? n : `0x${n}`;
        const a = parseInt(n, 16);
        if (this.isChainApproved(a)) this.setDefaultChain(`${a}`);
        else if (this.namespace.methods.includes("wallet_switchEthereumChain")) await this.client.request({
            topic: e.topic,
            request: {
                method: e.request.method,
                params: [
                    {
                        chainId: n
                    }
                ]
            },
            chainId: (i = this.namespace.chains) == null ? void 0 : i[0]
        }), this.setDefaultChain(`${a}`);
        else throw new Error(`Failed to switch to chain 'eip155:${a}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`);
        return null;
    }
    isChainApproved(e) {
        return this.namespace.chains.includes(`${this.name}:${e}`);
    }
    async getCapabilities(e) {
        var t, i, n, a, r;
        const c = (i = (t = e.request) == null ? void 0 : t.params) == null ? void 0 : i[0], o = ((a = (n = e.request) == null ? void 0 : n.params) == null ? void 0 : a[1]) || [];
        if (!c) throw new Error("Missing address parameter in `wallet_getCapabilities` request");
        const d = this.client.session.get(e.topic), u = ((r = d?.sessionProperties) == null ? void 0 : r.capabilities) || {}, p = `${c}${o.join(",")}`, w = u?.[p];
        if (w) return w;
        let l;
        try {
            l = xt(d, c, o);
        } catch (z) {
            console.warn("Failed to extract capabilities from session", z);
        }
        if (l) return l;
        const ne = await this.client.request(e);
        try {
            await this.client.session.update(e.topic, {
                sessionProperties: te(ee({}, d.sessionProperties || {}), {
                    capabilities: te(ee({}, u || {}), {
                        [p]: ne
                    })
                })
            });
        } catch (z) {
            console.warn("Failed to update session with capabilities", z);
        }
        return ne;
    }
    async getCallStatus(e) {
        var t, i, n;
        const a = this.client.session.get(e.topic), r = (t = a.sessionProperties) == null ? void 0 : t.bundler_name;
        if (r) {
            const d = this.getBundlerUrl(e.chainId, r);
            try {
                return await this.getUserOperationReceipt(d, e);
            } catch (u) {
                console.warn("Failed to fetch call status from bundler", u, d);
            }
        }
        const c = (i = a.sessionProperties) == null ? void 0 : i.bundler_url;
        if (c) try {
            return await this.getUserOperationReceipt(c, e);
        } catch (d) {
            console.warn("Failed to fetch call status from custom bundler", d, c);
        }
        const o = await Tt({
            resultId: (n = e.request.params) == null ? void 0 : n[0],
            storage: this.storage
        });
        if (o) try {
            return await Yt(o, this.getHttpProvider.bind(this));
        } catch (d) {
            console.warn("Failed to fetch call status from stored send calls", d, o);
        }
        if (this.namespace.methods.includes(e.request.method)) return await this.client.request(e);
        throw new Error("Fetching call status not approved by the wallet.");
    }
    async getUserOperationReceipt(e, t) {
        var i;
        const n = new URL(e), a = await fetch(n, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatJsonRpcRequest"])("eth_getUserOperationReceipt", [
                (i = t.request.params) == null ? void 0 : i[0]
            ]))
        });
        if (!a.ok) throw new Error(`Failed to fetch user operation receipt - ${a.status}`);
        return await a.json();
    }
    getBundlerUrl(e, t) {
        return `${Ye}?projectId=${this.client.core.projectId}&chainId=${e}&bundler=${t}`;
    }
    async sendCalls(e) {
        var t, i, n;
        const a = await this.client.request(e), r = (t = e.request.params) == null ? void 0 : t[0], c = a?.id, o = a?.capabilities || {}, d = (i = o?.caip345) == null ? void 0 : i.caip2, u = (n = o?.caip345) == null ? void 0 : n.transactionHashes;
        return !c || !d || !(u != null && u.length) || await Qt({
            sendCalls: {
                request: r,
                result: a
            },
            storage: this.storage
        }), a;
    }
}
var hs = Object.defineProperty, ps = (s, e, t)=>e in s ? hs(s, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : s[e] = t, A = (s, e, t)=>ps(s, typeof e != "symbol" ? e + "" : e, t);
class ds {
    constructor(e){
        A(this, "name", "solana"), A(this, "client"), A(this, "httpProviders"), A(this, "events"), A(this, "namespace"), A(this, "chainId"), this.namespace = e.namespace, this.events = h("events"), this.client = h("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(e) {
        this.namespace = Object.assign(this.namespace, e);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    request(e) {
        return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
    }
    setDefaultChain(e, t) {
        this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(m.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const e = this.namespace.chains[0];
        if (!e) throw new Error("ChainId not found");
        return e.split(":")[1];
    }
    getAccounts() {
        const e = this.namespace.accounts;
        return e ? [
            ...new Set(e.filter((t)=>t.split(":")[1] === this.chainId.toString()).map((t)=>t.split(":")[2]))
        ] : [];
    }
    createHttpProviders() {
        const e = {};
        return this.namespace.chains.forEach((t)=>{
            var i;
            const n = b(t);
            e[n] = this.createHttpProvider(n, (i = this.namespace.rpcMap) == null ? void 0 : i[t]);
        }), e;
    }
    getHttpProvider() {
        const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
        if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
        return t;
    }
    setHttpProvider(e, t) {
        const i = this.createHttpProvider(e, t);
        i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, t) {
        const i = t || f(e, this.namespace, this.client.core.projectId);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i, h("disableProviderPing")));
    }
}
var us = Object.defineProperty, ls = (s, e, t)=>e in s ? us(s, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : s[e] = t, E = (s, e, t)=>ls(s, typeof e != "symbol" ? e + "" : e, t);
class fs {
    constructor(e){
        E(this, "name", "cosmos"), E(this, "client"), E(this, "httpProviders"), E(this, "events"), E(this, "namespace"), E(this, "chainId"), this.namespace = e.namespace, this.events = h("events"), this.client = h("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(e) {
        this.namespace = Object.assign(this.namespace, e);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const e = this.namespace.chains[0];
        if (!e) throw new Error("ChainId not found");
        return e.split(":")[1];
    }
    request(e) {
        return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
    }
    setDefaultChain(e, t) {
        this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(m.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
    }
    getAccounts() {
        const e = this.namespace.accounts;
        return e ? [
            ...new Set(e.filter((t)=>t.split(":")[1] === this.chainId.toString()).map((t)=>t.split(":")[2]))
        ] : [];
    }
    createHttpProviders() {
        const e = {};
        return this.namespace.chains.forEach((t)=>{
            var i;
            const n = b(t);
            e[n] = this.createHttpProvider(n, (i = this.namespace.rpcMap) == null ? void 0 : i[t]);
        }), e;
    }
    getHttpProvider() {
        const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
        if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
        return t;
    }
    setHttpProvider(e, t) {
        const i = this.createHttpProvider(e, t);
        i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, t) {
        const i = t || f(e, this.namespace, this.client.core.projectId);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i, h("disableProviderPing")));
    }
}
var ms = Object.defineProperty, vs = (s, e, t)=>e in s ? ms(s, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : s[e] = t, H = (s, e, t)=>vs(s, typeof e != "symbol" ? e + "" : e, t);
class gs {
    constructor(e){
        H(this, "name", "algorand"), H(this, "client"), H(this, "httpProviders"), H(this, "events"), H(this, "namespace"), H(this, "chainId"), this.namespace = e.namespace, this.events = h("events"), this.client = h("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(e) {
        this.namespace = Object.assign(this.namespace, e);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    request(e) {
        return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
    }
    setDefaultChain(e, t) {
        if (!this.httpProviders[e]) {
            const i = t || f(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            this.setHttpProvider(e, i);
        }
        this.chainId = e, this.events.emit(m.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const e = this.namespace.chains[0];
        if (!e) throw new Error("ChainId not found");
        return e.split(":")[1];
    }
    getAccounts() {
        const e = this.namespace.accounts;
        return e ? [
            ...new Set(e.filter((t)=>t.split(":")[1] === this.chainId.toString()).map((t)=>t.split(":")[2]))
        ] : [];
    }
    createHttpProviders() {
        const e = {};
        return this.namespace.chains.forEach((t)=>{
            var i;
            e[t] = this.createHttpProvider(t, (i = this.namespace.rpcMap) == null ? void 0 : i[t]);
        }), e;
    }
    getHttpProvider() {
        const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
        if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
        return t;
    }
    setHttpProvider(e, t) {
        const i = this.createHttpProvider(e, t);
        i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, t) {
        const i = t || f(e, this.namespace, this.client.core.projectId);
        return typeof i > "u" ? void 0 : new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i, h("disableProviderPing")));
    }
}
var Ps = Object.defineProperty, ws = (s, e, t)=>e in s ? Ps(s, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : s[e] = t, S = (s, e, t)=>ws(s, typeof e != "symbol" ? e + "" : e, t);
class ys {
    constructor(e){
        S(this, "name", "cip34"), S(this, "client"), S(this, "httpProviders"), S(this, "events"), S(this, "namespace"), S(this, "chainId"), this.namespace = e.namespace, this.events = h("events"), this.client = h("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(e) {
        this.namespace = Object.assign(this.namespace, e);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const e = this.namespace.chains[0];
        if (!e) throw new Error("ChainId not found");
        return e.split(":")[1];
    }
    request(e) {
        return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
    }
    setDefaultChain(e, t) {
        this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(m.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
    }
    getAccounts() {
        const e = this.namespace.accounts;
        return e ? [
            ...new Set(e.filter((t)=>t.split(":")[1] === this.chainId.toString()).map((t)=>t.split(":")[2]))
        ] : [];
    }
    createHttpProviders() {
        const e = {};
        return this.namespace.chains.forEach((t)=>{
            const i = this.getCardanoRPCUrl(t), n = b(t);
            e[n] = this.createHttpProvider(n, i);
        }), e;
    }
    getHttpProvider() {
        const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
        if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
        return t;
    }
    getCardanoRPCUrl(e) {
        const t = this.namespace.rpcMap;
        if (t) return t[e];
    }
    setHttpProvider(e, t) {
        const i = this.createHttpProvider(e, t);
        i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, t) {
        const i = t || this.getCardanoRPCUrl(e);
        if (!i) throw new Error(`No RPC url provided for chainId: ${e}`);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i, h("disableProviderPing")));
    }
}
var bs = Object.defineProperty, Is = (s, e, t)=>e in s ? bs(s, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : s[e] = t, N = (s, e, t)=>Is(s, typeof e != "symbol" ? e + "" : e, t);
class $s {
    constructor(e){
        N(this, "name", "elrond"), N(this, "client"), N(this, "httpProviders"), N(this, "events"), N(this, "namespace"), N(this, "chainId"), this.namespace = e.namespace, this.events = h("events"), this.client = h("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(e) {
        this.namespace = Object.assign(this.namespace, e);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    request(e) {
        return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
    }
    setDefaultChain(e, t) {
        this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(m.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const e = this.namespace.chains[0];
        if (!e) throw new Error("ChainId not found");
        return e.split(":")[1];
    }
    getAccounts() {
        const e = this.namespace.accounts;
        return e ? [
            ...new Set(e.filter((t)=>t.split(":")[1] === this.chainId.toString()).map((t)=>t.split(":")[2]))
        ] : [];
    }
    createHttpProviders() {
        const e = {};
        return this.namespace.chains.forEach((t)=>{
            var i;
            const n = b(t);
            e[n] = this.createHttpProvider(n, (i = this.namespace.rpcMap) == null ? void 0 : i[t]);
        }), e;
    }
    getHttpProvider() {
        const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
        if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
        return t;
    }
    setHttpProvider(e, t) {
        const i = this.createHttpProvider(e, t);
        i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, t) {
        const i = t || f(e, this.namespace, this.client.core.projectId);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i, h("disableProviderPing")));
    }
}
var Os = Object.defineProperty, Cs = (s, e, t)=>e in s ? Os(s, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : s[e] = t, q = (s, e, t)=>Cs(s, typeof e != "symbol" ? e + "" : e, t);
class As {
    constructor(e){
        q(this, "name", "multiversx"), q(this, "client"), q(this, "httpProviders"), q(this, "events"), q(this, "namespace"), q(this, "chainId"), this.namespace = e.namespace, this.events = h("events"), this.client = h("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(e) {
        this.namespace = Object.assign(this.namespace, e);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    request(e) {
        return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
    }
    setDefaultChain(e, t) {
        this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(m.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const e = this.namespace.chains[0];
        if (!e) throw new Error("ChainId not found");
        return e.split(":")[1];
    }
    getAccounts() {
        const e = this.namespace.accounts;
        return e ? [
            ...new Set(e.filter((t)=>t.split(":")[1] === this.chainId.toString()).map((t)=>t.split(":")[2]))
        ] : [];
    }
    createHttpProviders() {
        const e = {};
        return this.namespace.chains.forEach((t)=>{
            var i;
            const n = b(t);
            e[n] = this.createHttpProvider(n, (i = this.namespace.rpcMap) == null ? void 0 : i[t]);
        }), e;
    }
    getHttpProvider() {
        const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
        if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
        return t;
    }
    setHttpProvider(e, t) {
        const i = this.createHttpProvider(e, t);
        i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, t) {
        const i = t || f(e, this.namespace, this.client.core.projectId);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i, h("disableProviderPing")));
    }
}
var Es = Object.defineProperty, Hs = (s, e, t)=>e in s ? Es(s, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : s[e] = t, D = (s, e, t)=>Hs(s, typeof e != "symbol" ? e + "" : e, t);
class Ss {
    constructor(e){
        D(this, "name", "near"), D(this, "client"), D(this, "httpProviders"), D(this, "events"), D(this, "namespace"), D(this, "chainId"), this.namespace = e.namespace, this.events = h("events"), this.client = h("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(e) {
        this.namespace = Object.assign(this.namespace, e);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const e = this.namespace.chains[0];
        if (!e) throw new Error("ChainId not found");
        return e.split(":")[1];
    }
    request(e) {
        return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
    }
    setDefaultChain(e, t) {
        if (this.chainId = e, !this.httpProviders[e]) {
            const i = t || f(`${this.name}:${e}`, this.namespace);
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            this.setHttpProvider(e, i);
        }
        this.events.emit(m.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
    }
    getAccounts() {
        const e = this.namespace.accounts;
        return e ? e.filter((t)=>t.split(":")[1] === this.chainId.toString()).map((t)=>t.split(":")[2]) || [] : [];
    }
    createHttpProviders() {
        const e = {};
        return this.namespace.chains.forEach((t)=>{
            var i;
            e[t] = this.createHttpProvider(t, (i = this.namespace.rpcMap) == null ? void 0 : i[t]);
        }), e;
    }
    getHttpProvider() {
        const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
        if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
        return t;
    }
    setHttpProvider(e, t) {
        const i = this.createHttpProvider(e, t);
        i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, t) {
        const i = t || f(e, this.namespace);
        return typeof i > "u" ? void 0 : new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i, h("disableProviderPing")));
    }
}
var Ns = Object.defineProperty, qs = (s, e, t)=>e in s ? Ns(s, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : s[e] = t, j = (s, e, t)=>qs(s, typeof e != "symbol" ? e + "" : e, t);
class Ds {
    constructor(e){
        j(this, "name", "tezos"), j(this, "client"), j(this, "httpProviders"), j(this, "events"), j(this, "namespace"), j(this, "chainId"), this.namespace = e.namespace, this.events = h("events"), this.client = h("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(e) {
        this.namespace = Object.assign(this.namespace, e);
    }
    requestAccounts() {
        return this.getAccounts();
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const e = this.namespace.chains[0];
        if (!e) throw new Error("ChainId not found");
        return e.split(":")[1];
    }
    request(e) {
        return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
    }
    setDefaultChain(e, t) {
        if (this.chainId = e, !this.httpProviders[e]) {
            const i = t || f(`${this.name}:${e}`, this.namespace);
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            this.setHttpProvider(e, i);
        }
        this.events.emit(m.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
    }
    getAccounts() {
        const e = this.namespace.accounts;
        return e ? e.filter((t)=>t.split(":")[1] === this.chainId.toString()).map((t)=>t.split(":")[2]) || [] : [];
    }
    createHttpProviders() {
        const e = {};
        return this.namespace.chains.forEach((t)=>{
            e[t] = this.createHttpProvider(t);
        }), e;
    }
    getHttpProvider() {
        const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
        if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
        return t;
    }
    setHttpProvider(e, t) {
        const i = this.createHttpProvider(e, t);
        i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, t) {
        const i = t || f(e, this.namespace);
        return typeof i > "u" ? void 0 : new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i));
    }
}
var js = Object.defineProperty, Rs = (s, e, t)=>e in s ? js(s, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : s[e] = t, R = (s, e, t)=>Rs(s, typeof e != "symbol" ? e + "" : e, t);
class _s {
    constructor(e){
        R(this, "name", ue), R(this, "client"), R(this, "httpProviders"), R(this, "events"), R(this, "namespace"), R(this, "chainId"), this.namespace = e.namespace, this.events = h("events"), this.client = h("client"), this.chainId = this.getDefaultChain(), this.name = this.getNamespaceName(), this.httpProviders = this.createHttpProviders();
    }
    updateNamespace(e) {
        this.namespace.chains = [
            ...new Set((this.namespace.chains || []).concat(e.chains || []))
        ], this.namespace.accounts = [
            ...new Set((this.namespace.accounts || []).concat(e.accounts || []))
        ], this.namespace.methods = [
            ...new Set((this.namespace.methods || []).concat(e.methods || []))
        ], this.namespace.events = [
            ...new Set((this.namespace.events || []).concat(e.events || []))
        ], this.httpProviders = this.createHttpProviders();
    }
    requestAccounts() {
        return this.getAccounts();
    }
    request(e) {
        return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider(e.chainId).request(e.request);
    }
    setDefaultChain(e, t) {
        this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(m.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
    }
    getDefaultChain() {
        if (this.chainId) return this.chainId;
        if (this.namespace.defaultChain) return this.namespace.defaultChain;
        const e = this.namespace.chains[0];
        if (!e) throw new Error("ChainId not found");
        return e.split(":")[1];
    }
    getNamespaceName() {
        const e = this.namespace.chains[0];
        if (!e) throw new Error("ChainId not found");
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseChainId"])(e).namespace;
    }
    getAccounts() {
        const e = this.namespace.accounts;
        return e ? [
            ...new Set(e.filter((t)=>t.split(":")[1] === this.chainId.toString()).map((t)=>t.split(":")[2]))
        ] : [];
    }
    createHttpProviders() {
        var e, t;
        const i = {};
        return (t = (e = this.namespace) == null ? void 0 : e.accounts) == null || t.forEach((n)=>{
            const a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseChainId"])(n);
            i[a.reference] = this.createHttpProvider(n);
        }), i;
    }
    getHttpProvider(e) {
        const t = this.httpProviders[e];
        if (typeof t > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
        return t;
    }
    setHttpProvider(e, t) {
        const i = this.createHttpProvider(e, t);
        i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, t) {
        const i = t || f(e, this.namespace, this.client.core.projectId);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"](i, h("disableProviderPing")));
    }
}
var Fs = Object.defineProperty, Us = Object.defineProperties, xs = Object.getOwnPropertyDescriptors, xe = Object.getOwnPropertySymbols, Ls = Object.prototype.hasOwnProperty, Ms = Object.prototype.propertyIsEnumerable, se = (s, e, t)=>e in s ? Fs(s, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : s[e] = t, G = (s, e)=>{
    for(var t in e || (e = {}))Ls.call(e, t) && se(s, t, e[t]);
    if (xe) for (var t of xe(e))Ms.call(e, t) && se(s, t, e[t]);
    return s;
}, ie = (s, e)=>Us(s, xs(e)), v = (s, e, t)=>se(s, typeof e != "symbol" ? e + "" : e, t);
class J {
    constructor(e){
        v(this, "client"), v(this, "namespaces"), v(this, "optionalNamespaces"), v(this, "sessionProperties"), v(this, "scopedProperties"), v(this, "events", new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$events$2f$events$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]), v(this, "rpcProviders", {}), v(this, "session"), v(this, "providerOpts"), v(this, "logger"), v(this, "uri"), v(this, "disableProviderPing", !1), this.providerOpts = e, this.logger = typeof e?.logger < "u" && typeof e?.logger != "string" ? e.logger : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f$pino$2f$browser$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__pino$3e$__["pino"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDefaultLoggerOptions"])({
            level: e?.logger || pe
        })), this.disableProviderPing = e?.disableProviderPing || !1;
    }
    static async init(e) {
        const t = new J(e);
        return await t.initialize(), t;
    }
    async request(e, t, i) {
        const [n, a] = this.validateChain(t);
        if (!this.session) throw new Error("Please call connect() before request()");
        return await this.getProvider(n).request({
            request: G({}, e),
            chainId: `${n}:${a}`,
            topic: this.session.topic,
            expiry: i
        });
    }
    sendAsync(e, t, i, n) {
        const a = new Date().getTime();
        this.request(e, i, n).then((r)=>t(null, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatJsonRpcResult"])(a, r))).catch((r)=>t(r, void 0));
    }
    async enable() {
        if (!this.client) throw new Error("Sign Client not initialized");
        return this.session || await this.connect({
            namespaces: this.namespaces,
            optionalNamespaces: this.optionalNamespaces,
            sessionProperties: this.sessionProperties,
            scopedProperties: this.scopedProperties
        }), await this.requestAccounts();
    }
    async disconnect() {
        var e;
        if (!this.session) throw new Error("Please call connect() before enable()");
        await this.client.disconnect({
            topic: (e = this.session) == null ? void 0 : e.topic,
            reason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSdkError"])("USER_DISCONNECTED")
        }), await this.cleanup();
    }
    async connect(e) {
        if (!this.client) throw new Error("Sign Client not initialized");
        if (this.setNamespaces(e), this.cleanupPendingPairings(), !e.skipPairing) return await this.pair(e.pairingTopic);
    }
    async authenticate(e, t) {
        if (!this.client) throw new Error("Sign Client not initialized");
        this.setNamespaces(e), await this.cleanupPendingPairings();
        const { uri: i, response: n } = await this.client.authenticate(e, t);
        i && (this.uri = i, this.events.emit("display_uri", i));
        const a = await n();
        if (this.session = a.session, this.session) {
            const r = He(this.session.namespaces);
            this.namespaces = B(this.namespaces, r), await this.persist("namespaces", this.namespaces), this.onConnect();
        }
        return a;
    }
    on(e, t) {
        this.events.on(e, t);
    }
    once(e, t) {
        this.events.once(e, t);
    }
    removeListener(e, t) {
        this.events.removeListener(e, t);
    }
    off(e, t) {
        this.events.off(e, t);
    }
    get isWalletConnect() {
        return !0;
    }
    async pair(e) {
        const { uri: t, approval: i } = await this.client.connect({
            pairingTopic: e,
            requiredNamespaces: this.namespaces,
            optionalNamespaces: this.optionalNamespaces,
            sessionProperties: this.sessionProperties,
            scopedProperties: this.scopedProperties
        });
        t && (this.uri = t, this.events.emit("display_uri", t));
        const n = await i();
        this.session = n;
        const a = He(n.namespaces);
        return this.namespaces = B(this.namespaces, a), await this.persist("namespaces", this.namespaces), await this.persist("optionalNamespaces", this.optionalNamespaces), this.onConnect(), this.session;
    }
    setDefaultChain(e, t) {
        try {
            if (!this.session) return;
            const [i, n] = this.validateChain(e);
            this.getProvider(i).setDefaultChain(n, t);
        } catch (i) {
            if (!/Please call connect/.test(i.message)) throw i;
        }
    }
    async cleanupPendingPairings(e = {}) {
        try {
            this.logger.info("Cleaning up inactive pairings...");
            const t = this.client.pairing.getAll();
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidArray"])(t)) return;
            for (const i of t)e.deletePairings ? this.client.core.expirer.set(i.topic, 0) : await this.client.core.relayer.subscriber.unsubscribe(i.topic);
            this.logger.info(`Inactive pairings cleared: ${t.length}`);
        } catch (t) {
            this.logger.warn("Failed to cleanup pending pairings", t);
        }
    }
    abortPairingAttempt() {
        this.logger.warn("abortPairingAttempt is deprecated. This is now a no-op.");
    }
    async checkStorage() {
        this.namespaces = await this.getFromStore("namespaces") || {}, this.optionalNamespaces = await this.getFromStore("optionalNamespaces") || {}, this.session && this.createProviders();
    }
    async initialize() {
        this.logger.trace("Initialized"), await this.createClient(), await this.checkStorage(), this.registerEventListeners();
    }
    async createClient() {
        var e, t;
        if (this.client = this.providerOpts.client || await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$sign$2d$client$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].init({
            core: this.providerOpts.core,
            logger: this.providerOpts.logger || pe,
            relayUrl: this.providerOpts.relayUrl || We,
            projectId: this.providerOpts.projectId,
            metadata: this.providerOpts.metadata,
            storageOptions: this.providerOpts.storageOptions,
            storage: this.providerOpts.storage,
            name: this.providerOpts.name,
            customStoragePrefix: this.providerOpts.customStoragePrefix,
            telemetryEnabled: this.providerOpts.telemetryEnabled
        }), this.providerOpts.session) try {
            this.session = this.client.session.get(this.providerOpts.session.topic);
        } catch (i) {
            throw this.logger.error("Failed to get session", i), new Error(`The provided session: ${(t = (e = this.providerOpts) == null ? void 0 : e.session) == null ? void 0 : t.topic} doesn't exist in the Sign client`);
        }
        else {
            const i = this.client.session.getAll();
            this.session = i[0];
        }
        this.logger.trace("SignClient Initialized");
    }
    createProviders() {
        if (!this.client) throw new Error("Sign Client not initialized");
        if (!this.session) throw new Error("Session not initialized. Please call connect() before enable()");
        const e = [
            ...new Set(Object.keys(this.session.namespaces).map((t)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(t)))
        ];
        X("client", this.client), X("events", this.events), X("disableProviderPing", this.disableProviderPing), e.forEach((t)=>{
            if (!this.session) return;
            const i = Nt(t, this.session);
            if (i?.length === 0) return;
            const n = Oe(i), a = B(this.namespaces, this.optionalNamespaces), r = ie(G({}, a[t]), {
                accounts: i,
                chains: n
            });
            switch(t){
                case "eip155":
                    this.rpcProviders[t] = new os({
                        namespace: r
                    });
                    break;
                case "algorand":
                    this.rpcProviders[t] = new gs({
                        namespace: r
                    });
                    break;
                case "solana":
                    this.rpcProviders[t] = new ds({
                        namespace: r
                    });
                    break;
                case "cosmos":
                    this.rpcProviders[t] = new fs({
                        namespace: r
                    });
                    break;
                case "polkadot":
                    this.rpcProviders[t] = new ss({
                        namespace: r
                    });
                    break;
                case "cip34":
                    this.rpcProviders[t] = new ys({
                        namespace: r
                    });
                    break;
                case "elrond":
                    this.rpcProviders[t] = new $s({
                        namespace: r
                    });
                    break;
                case "multiversx":
                    this.rpcProviders[t] = new As({
                        namespace: r
                    });
                    break;
                case "near":
                    this.rpcProviders[t] = new Ss({
                        namespace: r
                    });
                    break;
                case "tezos":
                    this.rpcProviders[t] = new Ds({
                        namespace: r
                    });
                    break;
                default:
                    this.rpcProviders[t] = new _s({
                        namespace: r
                    });
            }
        });
    }
    registerEventListeners() {
        if (typeof this.client > "u") throw new Error("Sign Client is not initialized");
        this.client.on("session_ping", (e)=>{
            var t;
            const { topic: i } = e;
            i === ((t = this.session) == null ? void 0 : t.topic) && this.events.emit("session_ping", e);
        }), this.client.on("session_event", (e)=>{
            var t;
            const { params: i, topic: n } = e;
            if (n !== ((t = this.session) == null ? void 0 : t.topic)) return;
            const { event: a } = i;
            if (a.name === "accountsChanged") {
                const r = a.data;
                r && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidArray"])(r) && this.events.emit("accountsChanged", r.map(Ee));
            } else if (a.name === "chainChanged") {
                const r = i.chainId, c = i.event.data, o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(r), d = Y(r) !== Y(c) ? `${o}:${Y(c)}` : r;
                this.onChainChanged(d);
            } else this.events.emit(a.name, a.data);
            this.events.emit("session_event", e);
        }), this.client.on("session_update", ({ topic: e, params: t })=>{
            var i, n;
            if (e !== ((i = this.session) == null ? void 0 : i.topic)) return;
            const { namespaces: a } = t, r = (n = this.client) == null ? void 0 : n.session.get(e);
            this.session = ie(G({}, r), {
                namespaces: a
            }), this.onSessionUpdate(), this.events.emit("session_update", {
                topic: e,
                params: t
            });
        }), this.client.on("session_delete", async (e)=>{
            var t;
            e.topic === ((t = this.session) == null ? void 0 : t.topic) && (await this.cleanup(), this.events.emit("session_delete", e), this.events.emit("disconnect", ie(G({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSdkError"])("USER_DISCONNECTED")), {
                data: e.topic
            })));
        }), this.on(m.DEFAULT_CHAIN_CHANGED, (e)=>{
            this.onChainChanged(e, !0);
        });
    }
    getProvider(e) {
        return this.rpcProviders[e] || this.rpcProviders[ue];
    }
    onSessionUpdate() {
        Object.keys(this.rpcProviders).forEach((e)=>{
            var t;
            this.getProvider(e).updateNamespace((t = this.session) == null ? void 0 : t.namespaces[e]);
        });
    }
    setNamespaces(e) {
        const { namespaces: t = {}, optionalNamespaces: i = {}, sessionProperties: n, scopedProperties: a } = e;
        this.optionalNamespaces = B(t, i), this.sessionProperties = n, this.scopedProperties = a;
    }
    validateChain(e) {
        const [t, i] = e?.split(":") || [
            "",
            ""
        ];
        if (!this.namespaces || !Object.keys(this.namespaces).length) return [
            t,
            i
        ];
        if (t && !Object.keys(this.namespaces || {}).map((r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(r)).includes(t)) throw new Error(`Namespace '${t}' is not configured. Please call connect() first with namespace config.`);
        if (t && i) return [
            t,
            i
        ];
        const n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(Object.keys(this.namespaces)[0]), a = this.rpcProviders[n].getDefaultChain();
        return [
            n,
            a
        ];
    }
    async requestAccounts() {
        const [e] = this.validateChain();
        return await this.getProvider(e).requestAccounts();
    }
    async onChainChanged(e, t = !1) {
        if (!this.namespaces) return;
        const [i, n] = this.validateChain(e);
        if (!n) return;
        this.updateNamespaceChain(i, n);
        const a = this.getProvider(i).getDefaultChain();
        t ? (this.events.emit("chainChanged", n), this.emitAccountsChangedOnChainChange({
            namespace: i,
            previousChainId: a,
            newChainId: e
        })) : this.getProvider(i).setDefaultChain(n), await this.persist("namespaces", this.namespaces);
    }
    emitAccountsChangedOnChainChange({ namespace: e, previousChainId: t, newChainId: i }) {
        var n, a;
        try {
            if (t === i) return;
            const r = (a = (n = this.session) == null ? void 0 : n.namespaces[e]) == null ? void 0 : a.accounts;
            if (!r) return;
            const c = r.filter((o)=>o.includes(`${i}:`)).map(Ee);
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$thirdweb$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidArray"])(c)) return;
            this.events.emit("accountsChanged", c);
        } catch (r) {
            this.logger.warn("Failed to emit accountsChanged on chain change", r);
        }
    }
    updateNamespaceChain(e, t) {
        if (!this.namespaces) return;
        const i = this.namespaces[e] ? e : `${e}:${t}`, n = {
            chains: [],
            methods: [],
            events: [],
            defaultChain: t
        };
        this.namespaces[i] ? this.namespaces[i] && (this.namespaces[i].defaultChain = t) : this.namespaces[i] = n;
    }
    onConnect() {
        this.createProviders(), this.events.emit("connect", {
            session: this.session
        });
    }
    async cleanup() {
        this.namespaces = void 0, this.optionalNamespaces = void 0, this.sessionProperties = void 0, await this.deleteFromStore("namespaces"), await this.deleteFromStore("optionalNamespaces"), await this.deleteFromStore("sessionProperties"), this.session = void 0, this.cleanupPendingPairings({
            deletePairings: !0
        }), await this.cleanupStorage();
    }
    async persist(e, t) {
        var i;
        const n = ((i = this.session) == null ? void 0 : i.topic) || "";
        await this.client.core.storage.setItem(`${x}/${e}${n}`, t);
    }
    async getFromStore(e) {
        var t;
        const i = ((t = this.session) == null ? void 0 : t.topic) || "";
        return await this.client.core.storage.getItem(`${x}/${e}${i}`);
    }
    async deleteFromStore(e) {
        var t;
        const i = ((t = this.session) == null ? void 0 : t.topic) || "";
        await this.client.core.storage.removeItem(`${x}/${e}${i}`);
    }
    async cleanupStorage() {
        var e;
        try {
            if (((e = this.client) == null ? void 0 : e.session.length) > 0) return;
            const t = await this.client.core.storage.getKeys();
            for (const i of t)i.startsWith(x) && await this.client.core.storage.removeItem(i);
        } catch (t) {
            this.logger.warn("Failed to cleanup storage", t);
        }
    }
}
const Bs = J;
;
 //# sourceMappingURL=index.es.js.map
}),
]);

//# sourceMappingURL=e890e_f70065a8._.js.map