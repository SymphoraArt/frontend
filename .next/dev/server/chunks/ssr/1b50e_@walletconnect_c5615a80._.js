module.exports = [
"[project]/Desktop/frontend/node_modules/@walletconnect/time/node_modules/tslib/tslib.es6.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__assign",
    ()=>__assign,
    "__asyncDelegator",
    ()=>__asyncDelegator,
    "__asyncGenerator",
    ()=>__asyncGenerator,
    "__asyncValues",
    ()=>__asyncValues,
    "__await",
    ()=>__await,
    "__awaiter",
    ()=>__awaiter,
    "__classPrivateFieldGet",
    ()=>__classPrivateFieldGet,
    "__classPrivateFieldSet",
    ()=>__classPrivateFieldSet,
    "__createBinding",
    ()=>__createBinding,
    "__decorate",
    ()=>__decorate,
    "__exportStar",
    ()=>__exportStar,
    "__extends",
    ()=>__extends,
    "__generator",
    ()=>__generator,
    "__importDefault",
    ()=>__importDefault,
    "__importStar",
    ()=>__importStar,
    "__makeTemplateObject",
    ()=>__makeTemplateObject,
    "__metadata",
    ()=>__metadata,
    "__param",
    ()=>__param,
    "__read",
    ()=>__read,
    "__rest",
    ()=>__rest,
    "__spread",
    ()=>__spread,
    "__spreadArrays",
    ()=>__spreadArrays,
    "__values",
    ()=>__values
]);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise */ var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}
function __exportStar(m, exports) {
    for(var p in m)if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
;
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        if (g[n]) i[n] = function(v) {
            return new Promise(function(a, b) {
                q.push([
                    n,
                    v,
                    a,
                    b
                ]) > 1 || resume(n, v);
            });
        };
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: n === "return"
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    //TURBOPACK unreachable
    ;
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
            value: raw
        });
    } else {
        cooked.raw = raw;
    }
    return cooked;
}
;
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result.default = mod;
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/environment/node_modules/tslib/tslib.es6.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__assign",
    ()=>__assign,
    "__asyncDelegator",
    ()=>__asyncDelegator,
    "__asyncGenerator",
    ()=>__asyncGenerator,
    "__asyncValues",
    ()=>__asyncValues,
    "__await",
    ()=>__await,
    "__awaiter",
    ()=>__awaiter,
    "__classPrivateFieldGet",
    ()=>__classPrivateFieldGet,
    "__classPrivateFieldSet",
    ()=>__classPrivateFieldSet,
    "__createBinding",
    ()=>__createBinding,
    "__decorate",
    ()=>__decorate,
    "__exportStar",
    ()=>__exportStar,
    "__extends",
    ()=>__extends,
    "__generator",
    ()=>__generator,
    "__importDefault",
    ()=>__importDefault,
    "__importStar",
    ()=>__importStar,
    "__makeTemplateObject",
    ()=>__makeTemplateObject,
    "__metadata",
    ()=>__metadata,
    "__param",
    ()=>__param,
    "__read",
    ()=>__read,
    "__rest",
    ()=>__rest,
    "__spread",
    ()=>__spread,
    "__spreadArrays",
    ()=>__spreadArrays,
    "__values",
    ()=>__values
]);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise */ var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return extendStatics(d, b);
};
function __extends(d, b) {
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}
function __exportStar(m, exports) {
    for(var p in m)if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}
function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function __spread() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __spreadArrays() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
;
function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        if (g[n]) i[n] = function(v) {
            return new Promise(function(a, b) {
                q.push([
                    n,
                    v,
                    a,
                    b
                ]) > 1 || resume(n, v);
            });
        };
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    //TURBOPACK unreachable
    ;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: __await(o[n](v)),
                done: n === "return"
            } : f ? f(v) : v;
        } : f;
    }
}
function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    //TURBOPACK unreachable
    ;
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", {
            value: raw
        });
    } else {
        cooked.raw = raw;
    }
    return cooked;
}
;
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result.default = mod;
    return result;
}
function __importDefault(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/utils/delay.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.delay = void 0;
function delay(timeout) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(true);
        }, timeout);
    });
}
exports.delay = delay; //# sourceMappingURL=delay.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/constants/misc.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ONE_THOUSAND = exports.ONE_HUNDRED = void 0;
exports.ONE_HUNDRED = 100;
exports.ONE_THOUSAND = 1000; //# sourceMappingURL=misc.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/constants/time.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ONE_YEAR = exports.FOUR_WEEKS = exports.THREE_WEEKS = exports.TWO_WEEKS = exports.ONE_WEEK = exports.THIRTY_DAYS = exports.SEVEN_DAYS = exports.FIVE_DAYS = exports.THREE_DAYS = exports.ONE_DAY = exports.TWENTY_FOUR_HOURS = exports.TWELVE_HOURS = exports.SIX_HOURS = exports.THREE_HOURS = exports.ONE_HOUR = exports.SIXTY_MINUTES = exports.THIRTY_MINUTES = exports.TEN_MINUTES = exports.FIVE_MINUTES = exports.ONE_MINUTE = exports.SIXTY_SECONDS = exports.THIRTY_SECONDS = exports.TEN_SECONDS = exports.FIVE_SECONDS = exports.ONE_SECOND = void 0;
exports.ONE_SECOND = 1;
exports.FIVE_SECONDS = 5;
exports.TEN_SECONDS = 10;
exports.THIRTY_SECONDS = 30;
exports.SIXTY_SECONDS = 60;
exports.ONE_MINUTE = exports.SIXTY_SECONDS;
exports.FIVE_MINUTES = exports.ONE_MINUTE * 5;
exports.TEN_MINUTES = exports.ONE_MINUTE * 10;
exports.THIRTY_MINUTES = exports.ONE_MINUTE * 30;
exports.SIXTY_MINUTES = exports.ONE_MINUTE * 60;
exports.ONE_HOUR = exports.SIXTY_MINUTES;
exports.THREE_HOURS = exports.ONE_HOUR * 3;
exports.SIX_HOURS = exports.ONE_HOUR * 6;
exports.TWELVE_HOURS = exports.ONE_HOUR * 12;
exports.TWENTY_FOUR_HOURS = exports.ONE_HOUR * 24;
exports.ONE_DAY = exports.TWENTY_FOUR_HOURS;
exports.THREE_DAYS = exports.ONE_DAY * 3;
exports.FIVE_DAYS = exports.ONE_DAY * 5;
exports.SEVEN_DAYS = exports.ONE_DAY * 7;
exports.THIRTY_DAYS = exports.ONE_DAY * 30;
exports.ONE_WEEK = exports.SEVEN_DAYS;
exports.TWO_WEEKS = exports.ONE_WEEK * 2;
exports.THREE_WEEKS = exports.ONE_WEEK * 3;
exports.FOUR_WEEKS = exports.ONE_WEEK * 4;
exports.ONE_YEAR = exports.ONE_DAY * 365; //# sourceMappingURL=time.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/constants/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = __turbopack_context__.r("[project]/Desktop/frontend/node_modules/@walletconnect/time/node_modules/tslib/tslib.es6.js [app-ssr] (ecmascript)");
tslib_1.__exportStar(__turbopack_context__.r("[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/constants/misc.js [app-ssr] (ecmascript)"), exports);
tslib_1.__exportStar(__turbopack_context__.r("[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/constants/time.js [app-ssr] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/utils/convert.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fromMiliseconds = exports.toMiliseconds = void 0;
const constants_1 = __turbopack_context__.r("[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/constants/index.js [app-ssr] (ecmascript)");
function toMiliseconds(seconds) {
    return seconds * constants_1.ONE_THOUSAND;
}
exports.toMiliseconds = toMiliseconds;
function fromMiliseconds(miliseconds) {
    return Math.floor(miliseconds / constants_1.ONE_THOUSAND);
}
exports.fromMiliseconds = fromMiliseconds; //# sourceMappingURL=convert.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/utils/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = __turbopack_context__.r("[project]/Desktop/frontend/node_modules/@walletconnect/time/node_modules/tslib/tslib.es6.js [app-ssr] (ecmascript)");
tslib_1.__exportStar(__turbopack_context__.r("[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/utils/delay.js [app-ssr] (ecmascript)"), exports);
tslib_1.__exportStar(__turbopack_context__.r("[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/utils/convert.js [app-ssr] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/watch.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Watch = void 0;
class Watch {
    constructor(){
        this.timestamps = new Map();
    }
    start(label) {
        if (this.timestamps.has(label)) {
            throw new Error(`Watch already started for label: ${label}`);
        }
        this.timestamps.set(label, {
            started: Date.now()
        });
    }
    stop(label) {
        const timestamp = this.get(label);
        if (typeof timestamp.elapsed !== "undefined") {
            throw new Error(`Watch already stopped for label: ${label}`);
        }
        const elapsed = Date.now() - timestamp.started;
        this.timestamps.set(label, {
            started: timestamp.started,
            elapsed
        });
    }
    get(label) {
        const timestamp = this.timestamps.get(label);
        if (typeof timestamp === "undefined") {
            throw new Error(`No timestamp found for label: ${label}`);
        }
        return timestamp;
    }
    elapsed(label) {
        const timestamp = this.get(label);
        const elapsed = timestamp.elapsed || Date.now() - timestamp.started;
        return elapsed;
    }
}
exports.Watch = Watch;
exports.default = Watch; //# sourceMappingURL=watch.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/types/watch.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IWatch = void 0;
class IWatch {
}
exports.IWatch = IWatch; //# sourceMappingURL=watch.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/types/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = __turbopack_context__.r("[project]/Desktop/frontend/node_modules/@walletconnect/time/node_modules/tslib/tslib.es6.js [app-ssr] (ecmascript)");
tslib_1.__exportStar(__turbopack_context__.r("[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/types/watch.js [app-ssr] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = __turbopack_context__.r("[project]/Desktop/frontend/node_modules/@walletconnect/time/node_modules/tslib/tslib.es6.js [app-ssr] (ecmascript)");
tslib_1.__exportStar(__turbopack_context__.r("[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/utils/index.js [app-ssr] (ecmascript)"), exports);
tslib_1.__exportStar(__turbopack_context__.r("[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/watch.js [app-ssr] (ecmascript)"), exports);
tslib_1.__exportStar(__turbopack_context__.r("[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/types/index.js [app-ssr] (ecmascript)"), exports);
tslib_1.__exportStar(__turbopack_context__.r("[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/constants/index.js [app-ssr] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/window-getters/dist/cjs/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLocalStorage = exports.getLocalStorageOrThrow = exports.getCrypto = exports.getCryptoOrThrow = exports.getLocation = exports.getLocationOrThrow = exports.getNavigator = exports.getNavigatorOrThrow = exports.getDocument = exports.getDocumentOrThrow = exports.getFromWindowOrThrow = exports.getFromWindow = void 0;
function getFromWindow(name) {
    let res = undefined;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return res;
}
exports.getFromWindow = getFromWindow;
function getFromWindowOrThrow(name) {
    const res = getFromWindow(name);
    if (!res) {
        throw new Error(`${name} is not defined in Window`);
    }
    return res;
}
exports.getFromWindowOrThrow = getFromWindowOrThrow;
function getDocumentOrThrow() {
    return getFromWindowOrThrow("document");
}
exports.getDocumentOrThrow = getDocumentOrThrow;
function getDocument() {
    return getFromWindow("document");
}
exports.getDocument = getDocument;
function getNavigatorOrThrow() {
    return getFromWindowOrThrow("navigator");
}
exports.getNavigatorOrThrow = getNavigatorOrThrow;
function getNavigator() {
    return getFromWindow("navigator");
}
exports.getNavigator = getNavigator;
function getLocationOrThrow() {
    return getFromWindowOrThrow("location");
}
exports.getLocationOrThrow = getLocationOrThrow;
function getLocation() {
    return getFromWindow("location");
}
exports.getLocation = getLocation;
function getCryptoOrThrow() {
    return getFromWindowOrThrow("crypto");
}
exports.getCryptoOrThrow = getCryptoOrThrow;
function getCrypto() {
    return getFromWindow("crypto");
}
exports.getCrypto = getCrypto;
function getLocalStorageOrThrow() {
    return getFromWindowOrThrow("localStorage");
}
exports.getLocalStorageOrThrow = getLocalStorageOrThrow;
function getLocalStorage() {
    return getFromWindow("localStorage");
}
exports.getLocalStorage = getLocalStorage; //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/window-metadata/dist/cjs/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getWindowMetadata = void 0;
const window_getters_1 = __turbopack_context__.r("[project]/Desktop/frontend/node_modules/@walletconnect/window-getters/dist/cjs/index.js [app-ssr] (ecmascript)");
function getWindowMetadata() {
    let doc;
    let loc;
    try {
        doc = window_getters_1.getDocumentOrThrow();
        loc = window_getters_1.getLocationOrThrow();
    } catch (e) {
        return null;
    }
    function getIcons() {
        const links = doc.getElementsByTagName("link");
        const icons = [];
        for(let i = 0; i < links.length; i++){
            const link = links[i];
            const rel = link.getAttribute("rel");
            if (rel) {
                if (rel.toLowerCase().indexOf("icon") > -1) {
                    const href = link.getAttribute("href");
                    if (href) {
                        if (href.toLowerCase().indexOf("https:") === -1 && href.toLowerCase().indexOf("http:") === -1 && href.indexOf("//") !== 0) {
                            let absoluteHref = loc.protocol + "//" + loc.host;
                            if (href.indexOf("/") === 0) {
                                absoluteHref += href;
                            } else {
                                const path = loc.pathname.split("/");
                                path.pop();
                                const finalPath = path.join("/");
                                absoluteHref += finalPath + "/" + href;
                            }
                            icons.push(absoluteHref);
                        } else if (href.indexOf("//") === 0) {
                            const absoluteUrl = loc.protocol + href;
                            icons.push(absoluteUrl);
                        } else {
                            icons.push(href);
                        }
                    }
                }
            }
        }
        return icons;
    }
    function getWindowMetadataOfAny(...args) {
        const metaTags = doc.getElementsByTagName("meta");
        for(let i = 0; i < metaTags.length; i++){
            const tag = metaTags[i];
            const attributes = [
                "itemprop",
                "property",
                "name"
            ].map((target)=>tag.getAttribute(target)).filter((attr)=>{
                if (attr) {
                    return args.includes(attr);
                }
                return false;
            });
            if (attributes.length && attributes) {
                const content = tag.getAttribute("content");
                if (content) {
                    return content;
                }
            }
        }
        return "";
    }
    function getName() {
        let name = getWindowMetadataOfAny("name", "og:site_name", "og:title", "twitter:title");
        if (!name) {
            name = doc.title;
        }
        return name;
    }
    function getDescription() {
        const description = getWindowMetadataOfAny("description", "og:description", "twitter:description", "keywords");
        return description;
    }
    const name = getName();
    const description = getDescription();
    const url = loc.origin;
    const icons = getIcons();
    const meta = {
        description,
        url,
        icons,
        name
    };
    return meta;
}
exports.getWindowMetadata = getWindowMetadata; //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/safe-json/dist/esm/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "safeJsonParse",
    ()=>safeJsonParse,
    "safeJsonStringify",
    ()=>safeJsonStringify
]);
const JSONStringify = (data)=>JSON.stringify(data, (_, value)=>typeof value === "bigint" ? value.toString() + "n" : value);
const JSONParse = (json)=>{
    const numbersBiggerThanMaxInt = /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g;
    const serializedData = json.replace(numbersBiggerThanMaxInt, "$1\"$2n\"$3");
    return JSON.parse(serializedData, (_, value)=>{
        const isCustomFormatBigInt = typeof value === "string" && value.match(/^\d+n$/);
        if (isCustomFormatBigInt) return BigInt(value.substring(0, value.length - 1));
        return value;
    });
};
function safeJsonParse(value) {
    if (typeof value !== "string") {
        throw new Error(`Cannot safe json parse value of type ${typeof value}`);
    }
    try {
        return JSONParse(value);
    } catch (_a) {
        return value;
    }
}
function safeJsonStringify(value) {
    return typeof value === "string" ? value : JSONStringify(value) || "";
} //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/relay-auth/dist/index.es.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DATA_ENCODING",
    ()=>xt,
    "DID_DELIMITER",
    ()=>Vt,
    "DID_METHOD",
    ()=>Jt,
    "DID_PREFIX",
    ()=>Yt,
    "JSON_ENCODING",
    ()=>Gt,
    "JWT_DELIMITER",
    ()=>ut,
    "JWT_ENCODING",
    ()=>Dt,
    "JWT_IRIDIUM_ALG",
    ()=>jt,
    "JWT_IRIDIUM_TYP",
    ()=>Zt,
    "KEY_PAIR_SEED_LENGTH",
    ()=>Ne,
    "MULTICODEC_ED25519_BASE",
    ()=>Kt,
    "MULTICODEC_ED25519_ENCODING",
    ()=>dt,
    "MULTICODEC_ED25519_HEADER",
    ()=>Wt,
    "MULTICODEC_ED25519_LENGTH",
    ()=>Fe,
    "decodeData",
    ()=>Xo,
    "decodeIss",
    ()=>tn,
    "decodeJSON",
    ()=>lt,
    "decodeJWT",
    ()=>sn,
    "decodeSig",
    ()=>nn,
    "encodeData",
    ()=>rn,
    "encodeIss",
    ()=>Qe,
    "encodeJSON",
    ()=>bt,
    "encodeJWT",
    ()=>on,
    "encodeSig",
    ()=>en,
    "generateKeyPair",
    ()=>Po,
    "signJWT",
    ()=>Qo,
    "verifyJWT",
    ()=>ts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/safe-json/dist/esm/index.js [app-ssr] (ecmascript)");
;
;
function En(t) {
    return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function fe(t, ...e) {
    if (!En(t)) throw new Error("Uint8Array expected");
    if (e.length > 0 && !e.includes(t.length)) throw new Error("Uint8Array expected of length " + e + ", got length=" + t.length);
}
function De(t, e = !0) {
    if (t.destroyed) throw new Error("Hash instance has been destroyed");
    if (e && t.finished) throw new Error("Hash#digest() has already been called");
}
function gn(t, e) {
    fe(t);
    const n = e.outputLen;
    if (t.length < n) throw new Error("digestInto() expects output buffer of length at least " + n);
}
const it = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0; /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ 
const _t = (t)=>new DataView(t.buffer, t.byteOffset, t.byteLength);
function yn(t) {
    if (typeof t != "string") throw new Error("utf8ToBytes expected string, got " + typeof t);
    return new Uint8Array(new TextEncoder().encode(t));
}
function de(t) {
    return typeof t == "string" && (t = yn(t)), fe(t), t;
}
class xn {
    clone() {
        return this._cloneInto();
    }
}
function Bn(t) {
    const e = (r)=>t().update(de(r)).digest(), n = t();
    return e.outputLen = n.outputLen, e.blockLen = n.blockLen, e.create = ()=>t(), e;
}
function he(t = 32) {
    if (it && typeof it.getRandomValues == "function") return it.getRandomValues(new Uint8Array(t));
    if (it && typeof it.randomBytes == "function") return it.randomBytes(t);
    throw new Error("crypto.getRandomValues must be defined");
}
function Cn(t, e, n, r) {
    if (typeof t.setBigUint64 == "function") return t.setBigUint64(e, n, r);
    const o = BigInt(32), s = BigInt(4294967295), a = Number(n >> o & s), u = Number(n & s), i = r ? 4 : 0, D = r ? 0 : 4;
    t.setUint32(e + i, a, r), t.setUint32(e + D, u, r);
}
class An extends xn {
    constructor(e, n, r, o){
        super(), this.blockLen = e, this.outputLen = n, this.padOffset = r, this.isLE = o, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(e), this.view = _t(this.buffer);
    }
    update(e) {
        De(this);
        const { view: n, buffer: r, blockLen: o } = this;
        e = de(e);
        const s = e.length;
        for(let a = 0; a < s;){
            const u = Math.min(o - this.pos, s - a);
            if (u === o) {
                const i = _t(e);
                for(; o <= s - a; a += o)this.process(i, a);
                continue;
            }
            r.set(e.subarray(a, a + u), this.pos), this.pos += u, a += u, this.pos === o && (this.process(n, 0), this.pos = 0);
        }
        return this.length += e.length, this.roundClean(), this;
    }
    digestInto(e) {
        De(this), gn(e, this), this.finished = !0;
        const { buffer: n, view: r, blockLen: o, isLE: s } = this;
        let { pos: a } = this;
        n[a++] = 128, this.buffer.subarray(a).fill(0), this.padOffset > o - a && (this.process(r, 0), a = 0);
        for(let l = a; l < o; l++)n[l] = 0;
        Cn(r, o - 8, BigInt(this.length * 8), s), this.process(r, 0);
        const u = _t(e), i = this.outputLen;
        if (i % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
        const D = i / 4, c = this.get();
        if (D > c.length) throw new Error("_sha2: outputLen bigger than state");
        for(let l = 0; l < D; l++)u.setUint32(4 * l, c[l], s);
    }
    digest() {
        const { buffer: e, outputLen: n } = this;
        this.digestInto(e);
        const r = e.slice(0, n);
        return this.destroy(), r;
    }
    _cloneInto(e) {
        e || (e = new this.constructor), e.set(...this.get());
        const { blockLen: n, buffer: r, length: o, finished: s, destroyed: a, pos: u } = this;
        return e.length = o, e.pos = u, e.finished = s, e.destroyed = a, o % n && e.buffer.set(r), e;
    }
}
const wt = BigInt(2 ** 32 - 1), St = BigInt(32);
function le(t, e = !1) {
    return e ? {
        h: Number(t & wt),
        l: Number(t >> St & wt)
    } : {
        h: Number(t >> St & wt) | 0,
        l: Number(t & wt) | 0
    };
}
function mn(t, e = !1) {
    let n = new Uint32Array(t.length), r = new Uint32Array(t.length);
    for(let o = 0; o < t.length; o++){
        const { h: s, l: a } = le(t[o], e);
        [n[o], r[o]] = [
            s,
            a
        ];
    }
    return [
        n,
        r
    ];
}
const _n = (t, e)=>BigInt(t >>> 0) << St | BigInt(e >>> 0), Sn = (t, e, n)=>t >>> n, vn = (t, e, n)=>t << 32 - n | e >>> n, In = (t, e, n)=>t >>> n | e << 32 - n, Un = (t, e, n)=>t << 32 - n | e >>> n, Tn = (t, e, n)=>t << 64 - n | e >>> n - 32, Fn = (t, e, n)=>t >>> n - 32 | e << 64 - n, Nn = (t, e)=>e, Ln = (t, e)=>t, On = (t, e, n)=>t << n | e >>> 32 - n, Hn = (t, e, n)=>e << n | t >>> 32 - n, zn = (t, e, n)=>e << n - 32 | t >>> 64 - n, Mn = (t, e, n)=>t << n - 32 | e >>> 64 - n;
function qn(t, e, n, r) {
    const o = (e >>> 0) + (r >>> 0);
    return {
        h: t + n + (o / 2 ** 32 | 0) | 0,
        l: o | 0
    };
}
const $n = (t, e, n)=>(t >>> 0) + (e >>> 0) + (n >>> 0), kn = (t, e, n, r)=>e + n + r + (t / 2 ** 32 | 0) | 0, Rn = (t, e, n, r)=>(t >>> 0) + (e >>> 0) + (n >>> 0) + (r >>> 0), jn = (t, e, n, r, o)=>e + n + r + o + (t / 2 ** 32 | 0) | 0, Zn = (t, e, n, r, o)=>(t >>> 0) + (e >>> 0) + (n >>> 0) + (r >>> 0) + (o >>> 0), Gn = (t, e, n, r, o, s)=>e + n + r + o + s + (t / 2 ** 32 | 0) | 0, x = {
    fromBig: le,
    split: mn,
    toBig: _n,
    shrSH: Sn,
    shrSL: vn,
    rotrSH: In,
    rotrSL: Un,
    rotrBH: Tn,
    rotrBL: Fn,
    rotr32H: Nn,
    rotr32L: Ln,
    rotlSH: On,
    rotlSL: Hn,
    rotlBH: zn,
    rotlBL: Mn,
    add: qn,
    add3L: $n,
    add3H: kn,
    add4L: Rn,
    add4H: jn,
    add5H: Gn,
    add5L: Zn
}, [Vn, Yn] = (()=>x.split([
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
    ].map((t)=>BigInt(t))))(), P = new Uint32Array(80), Q = new Uint32Array(80);
class Jn extends An {
    constructor(){
        super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
    }
    get() {
        const { Ah: e, Al: n, Bh: r, Bl: o, Ch: s, Cl: a, Dh: u, Dl: i, Eh: D, El: c, Fh: l, Fl: p, Gh: w, Gl: h, Hh: g, Hl: S } = this;
        return [
            e,
            n,
            r,
            o,
            s,
            a,
            u,
            i,
            D,
            c,
            l,
            p,
            w,
            h,
            g,
            S
        ];
    }
    set(e, n, r, o, s, a, u, i, D, c, l, p, w, h, g, S) {
        this.Ah = e | 0, this.Al = n | 0, this.Bh = r | 0, this.Bl = o | 0, this.Ch = s | 0, this.Cl = a | 0, this.Dh = u | 0, this.Dl = i | 0, this.Eh = D | 0, this.El = c | 0, this.Fh = l | 0, this.Fl = p | 0, this.Gh = w | 0, this.Gl = h | 0, this.Hh = g | 0, this.Hl = S | 0;
    }
    process(e, n) {
        for(let d = 0; d < 16; d++, n += 4)P[d] = e.getUint32(n), Q[d] = e.getUint32(n += 4);
        for(let d = 16; d < 80; d++){
            const m = P[d - 15] | 0, F = Q[d - 15] | 0, q = x.rotrSH(m, F, 1) ^ x.rotrSH(m, F, 8) ^ x.shrSH(m, F, 7), z = x.rotrSL(m, F, 1) ^ x.rotrSL(m, F, 8) ^ x.shrSL(m, F, 7), I = P[d - 2] | 0, O = Q[d - 2] | 0, ot = x.rotrSH(I, O, 19) ^ x.rotrBH(I, O, 61) ^ x.shrSH(I, O, 6), tt = x.rotrSL(I, O, 19) ^ x.rotrBL(I, O, 61) ^ x.shrSL(I, O, 6), st = x.add4L(z, tt, Q[d - 7], Q[d - 16]), at = x.add4H(st, q, ot, P[d - 7], P[d - 16]);
            P[d] = at | 0, Q[d] = st | 0;
        }
        let { Ah: r, Al: o, Bh: s, Bl: a, Ch: u, Cl: i, Dh: D, Dl: c, Eh: l, El: p, Fh: w, Fl: h, Gh: g, Gl: S, Hh: v, Hl: L } = this;
        for(let d = 0; d < 80; d++){
            const m = x.rotrSH(l, p, 14) ^ x.rotrSH(l, p, 18) ^ x.rotrBH(l, p, 41), F = x.rotrSL(l, p, 14) ^ x.rotrSL(l, p, 18) ^ x.rotrBL(l, p, 41), q = l & w ^ ~l & g, z = p & h ^ ~p & S, I = x.add5L(L, F, z, Yn[d], Q[d]), O = x.add5H(I, v, m, q, Vn[d], P[d]), ot = I | 0, tt = x.rotrSH(r, o, 28) ^ x.rotrBH(r, o, 34) ^ x.rotrBH(r, o, 39), st = x.rotrSL(r, o, 28) ^ x.rotrBL(r, o, 34) ^ x.rotrBL(r, o, 39), at = r & s ^ r & u ^ s & u, Ct = o & a ^ o & i ^ a & i;
            v = g | 0, L = S | 0, g = w | 0, S = h | 0, w = l | 0, h = p | 0, ({ h: l, l: p } = x.add(D | 0, c | 0, O | 0, ot | 0)), D = u | 0, c = i | 0, u = s | 0, i = a | 0, s = r | 0, a = o | 0;
            const At = x.add3L(ot, st, Ct);
            r = x.add3H(At, O, tt, at), o = At | 0;
        }
        ({ h: r, l: o } = x.add(this.Ah | 0, this.Al | 0, r | 0, o | 0)), ({ h: s, l: a } = x.add(this.Bh | 0, this.Bl | 0, s | 0, a | 0)), ({ h: u, l: i } = x.add(this.Ch | 0, this.Cl | 0, u | 0, i | 0)), ({ h: D, l: c } = x.add(this.Dh | 0, this.Dl | 0, D | 0, c | 0)), ({ h: l, l: p } = x.add(this.Eh | 0, this.El | 0, l | 0, p | 0)), ({ h: w, l: h } = x.add(this.Fh | 0, this.Fl | 0, w | 0, h | 0)), ({ h: g, l: S } = x.add(this.Gh | 0, this.Gl | 0, g | 0, S | 0)), ({ h: v, l: L } = x.add(this.Hh | 0, this.Hl | 0, v | 0, L | 0)), this.set(r, o, s, a, u, i, D, c, l, p, w, h, g, S, v, L);
    }
    roundClean() {
        P.fill(0), Q.fill(0);
    }
    destroy() {
        this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
}
const Kn = Bn(()=>new Jn); /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ 
const vt = BigInt(0), be = BigInt(1), Wn = BigInt(2);
function It(t) {
    return t instanceof Uint8Array || ArrayBuffer.isView(t) && t.constructor.name === "Uint8Array";
}
function Ut(t) {
    if (!It(t)) throw new Error("Uint8Array expected");
}
function Tt(t, e) {
    if (typeof e != "boolean") throw new Error(t + " boolean expected, got " + e);
}
const Xn = Array.from({
    length: 256
}, (t, e)=>e.toString(16).padStart(2, "0"));
function Ft(t) {
    Ut(t);
    let e = "";
    for(let n = 0; n < t.length; n++)e += Xn[t[n]];
    return e;
}
function pe(t) {
    if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
    return t === "" ? vt : BigInt("0x" + t);
}
const K = {
    _0: 48,
    _9: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102
};
function we(t) {
    if (t >= K._0 && t <= K._9) return t - K._0;
    if (t >= K.A && t <= K.F) return t - (K.A - 10);
    if (t >= K.a && t <= K.f) return t - (K.a - 10);
}
function Ee(t) {
    if (typeof t != "string") throw new Error("hex string expected, got " + typeof t);
    const e = t.length, n = e / 2;
    if (e % 2) throw new Error("hex string expected, got unpadded hex of length " + e);
    const r = new Uint8Array(n);
    for(let o = 0, s = 0; o < n; o++, s += 2){
        const a = we(t.charCodeAt(s)), u = we(t.charCodeAt(s + 1));
        if (a === void 0 || u === void 0) {
            const i = t[s] + t[s + 1];
            throw new Error('hex string expected, got non-hex character "' + i + '" at index ' + s);
        }
        r[o] = a * 16 + u;
    }
    return r;
}
function Pn(t) {
    return pe(Ft(t));
}
function Et(t) {
    return Ut(t), pe(Ft(Uint8Array.from(t).reverse()));
}
function ge(t, e) {
    return Ee(t.toString(16).padStart(e * 2, "0"));
}
function Nt(t, e) {
    return ge(t, e).reverse();
}
function W(t, e, n) {
    let r;
    if (typeof e == "string") try {
        r = Ee(e);
    } catch (s) {
        throw new Error(t + " must be hex string or Uint8Array, cause: " + s);
    }
    else if (It(e)) r = Uint8Array.from(e);
    else throw new Error(t + " must be hex string or Uint8Array");
    const o = r.length;
    if (typeof n == "number" && o !== n) throw new Error(t + " of length " + n + " expected, got " + o);
    return r;
}
function ye(...t) {
    let e = 0;
    for(let r = 0; r < t.length; r++){
        const o = t[r];
        Ut(o), e += o.length;
    }
    const n = new Uint8Array(e);
    for(let r = 0, o = 0; r < t.length; r++){
        const s = t[r];
        n.set(s, o), o += s.length;
    }
    return n;
}
const Lt = (t)=>typeof t == "bigint" && vt <= t;
function Qn(t, e, n) {
    return Lt(t) && Lt(e) && Lt(n) && e <= t && t < n;
}
function ft(t, e, n, r) {
    if (!Qn(e, n, r)) throw new Error("expected valid " + t + ": " + n + " <= n < " + r + ", got " + e);
}
function tr(t) {
    let e;
    for(e = 0; t > vt; t >>= be, e += 1);
    return e;
}
const er = (t)=>(Wn << BigInt(t - 1)) - be, nr = {
    bigint: (t)=>typeof t == "bigint",
    function: (t)=>typeof t == "function",
    boolean: (t)=>typeof t == "boolean",
    string: (t)=>typeof t == "string",
    stringOrUint8Array: (t)=>typeof t == "string" || It(t),
    isSafeInteger: (t)=>Number.isSafeInteger(t),
    array: (t)=>Array.isArray(t),
    field: (t, e)=>e.Fp.isValid(t),
    hash: (t)=>typeof t == "function" && Number.isSafeInteger(t.outputLen)
};
function Ot(t, e, n = {}) {
    const r = (o, s, a)=>{
        const u = nr[s];
        if (typeof u != "function") throw new Error("invalid validator function");
        const i = t[o];
        if (!(a && i === void 0) && !u(i, t)) throw new Error("param " + String(o) + " is invalid. Expected " + s + ", got " + i);
    };
    for (const [o, s] of Object.entries(e))r(o, s, !1);
    for (const [o, s] of Object.entries(n))r(o, s, !0);
    return t;
}
function xe(t) {
    const e = new WeakMap;
    return (n, ...r)=>{
        const o = e.get(n);
        if (o !== void 0) return o;
        const s = t(n, ...r);
        return e.set(n, s), s;
    };
}
const M = BigInt(0), N = BigInt(1), nt = BigInt(2), rr = BigInt(3), Ht = BigInt(4), Be = BigInt(5), Ce = BigInt(8);
function H(t, e) {
    const n = t % e;
    return n >= M ? n : e + n;
}
function or(t, e, n) {
    if (e < M) throw new Error("invalid exponent, negatives unsupported");
    if (n <= M) throw new Error("invalid modulus");
    if (n === N) return M;
    let r = N;
    for(; e > M;)e & N && (r = r * t % n), t = t * t % n, e >>= N;
    return r;
}
function J(t, e, n) {
    let r = t;
    for(; e-- > M;)r *= r, r %= n;
    return r;
}
function Ae(t, e) {
    if (t === M) throw new Error("invert: expected non-zero number");
    if (e <= M) throw new Error("invert: expected positive modulus, got " + e);
    let n = H(t, e), r = e, o = M, s = N;
    for(; n !== M;){
        const u = r / n, i = r % n, D = o - s * u;
        r = n, n = i, o = s, s = D;
    }
    if (r !== N) throw new Error("invert: does not exist");
    return H(o, e);
}
function sr(t) {
    const e = (t - N) / nt;
    let n, r, o;
    for(n = t - N, r = 0; n % nt === M; n /= nt, r++);
    for(o = nt; o < t && or(o, e, t) !== t - N; o++)if (o > 1e3) throw new Error("Cannot find square root: likely non-prime P");
    if (r === 1) {
        const a = (t + N) / Ht;
        return function(i, D) {
            const c = i.pow(D, a);
            if (!i.eql(i.sqr(c), D)) throw new Error("Cannot find square root");
            return c;
        };
    }
    const s = (n + N) / nt;
    return function(u, i) {
        if (u.pow(i, e) === u.neg(u.ONE)) throw new Error("Cannot find square root");
        let D = r, c = u.pow(u.mul(u.ONE, o), n), l = u.pow(i, s), p = u.pow(i, n);
        for(; !u.eql(p, u.ONE);){
            if (u.eql(p, u.ZERO)) return u.ZERO;
            let w = 1;
            for(let g = u.sqr(p); w < D && !u.eql(g, u.ONE); w++)g = u.sqr(g);
            const h = u.pow(c, N << BigInt(D - w - 1));
            c = u.sqr(h), l = u.mul(l, h), p = u.mul(p, c), D = w;
        }
        return l;
    };
}
function ir(t) {
    if (t % Ht === rr) {
        const e = (t + N) / Ht;
        return function(r, o) {
            const s = r.pow(o, e);
            if (!r.eql(r.sqr(s), o)) throw new Error("Cannot find square root");
            return s;
        };
    }
    if (t % Ce === Be) {
        const e = (t - Be) / Ce;
        return function(r, o) {
            const s = r.mul(o, nt), a = r.pow(s, e), u = r.mul(o, a), i = r.mul(r.mul(u, nt), a), D = r.mul(u, r.sub(i, r.ONE));
            if (!r.eql(r.sqr(D), o)) throw new Error("Cannot find square root");
            return D;
        };
    }
    return sr(t);
}
const ur = (t, e)=>(H(t, e) & N) === N, cr = [
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
function ar(t) {
    const e = {
        ORDER: "bigint",
        MASK: "bigint",
        BYTES: "isSafeInteger",
        BITS: "isSafeInteger"
    }, n = cr.reduce((r, o)=>(r[o] = "function", r), e);
    return Ot(t, n);
}
function fr(t, e, n) {
    if (n < M) throw new Error("invalid exponent, negatives unsupported");
    if (n === M) return t.ONE;
    if (n === N) return e;
    let r = t.ONE, o = e;
    for(; n > M;)n & N && (r = t.mul(r, o)), o = t.sqr(o), n >>= N;
    return r;
}
function Dr(t, e) {
    const n = new Array(e.length), r = e.reduce((s, a, u)=>t.is0(a) ? s : (n[u] = s, t.mul(s, a)), t.ONE), o = t.inv(r);
    return e.reduceRight((s, a, u)=>t.is0(a) ? s : (n[u] = t.mul(s, n[u]), t.mul(s, a)), o), n;
}
function me(t, e) {
    const n = e !== void 0 ? e : t.toString(2).length, r = Math.ceil(n / 8);
    return {
        nBitLength: n,
        nByteLength: r
    };
}
function _e(t, e, n = !1, r = {}) {
    if (t <= M) throw new Error("invalid field: expected ORDER > 0, got " + t);
    const { nBitLength: o, nByteLength: s } = me(t, e);
    if (s > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
    let a;
    const u = Object.freeze({
        ORDER: t,
        isLE: n,
        BITS: o,
        BYTES: s,
        MASK: er(o),
        ZERO: M,
        ONE: N,
        create: (i)=>H(i, t),
        isValid: (i)=>{
            if (typeof i != "bigint") throw new Error("invalid field element: expected bigint, got " + typeof i);
            return M <= i && i < t;
        },
        is0: (i)=>i === M,
        isOdd: (i)=>(i & N) === N,
        neg: (i)=>H(-i, t),
        eql: (i, D)=>i === D,
        sqr: (i)=>H(i * i, t),
        add: (i, D)=>H(i + D, t),
        sub: (i, D)=>H(i - D, t),
        mul: (i, D)=>H(i * D, t),
        pow: (i, D)=>fr(u, i, D),
        div: (i, D)=>H(i * Ae(D, t), t),
        sqrN: (i)=>i * i,
        addN: (i, D)=>i + D,
        subN: (i, D)=>i - D,
        mulN: (i, D)=>i * D,
        inv: (i)=>Ae(i, t),
        sqrt: r.sqrt || ((i)=>(a || (a = ir(t)), a(u, i))),
        invertBatch: (i)=>Dr(u, i),
        cmov: (i, D, c)=>c ? D : i,
        toBytes: (i)=>n ? Nt(i, s) : ge(i, s),
        fromBytes: (i)=>{
            if (i.length !== s) throw new Error("Field.fromBytes: expected " + s + " bytes, got " + i.length);
            return n ? Et(i) : Pn(i);
        }
    });
    return Object.freeze(u);
}
const Se = BigInt(0), gt = BigInt(1);
function zt(t, e) {
    const n = e.negate();
    return t ? n : e;
}
function ve(t, e) {
    if (!Number.isSafeInteger(t) || t <= 0 || t > e) throw new Error("invalid window size, expected [1.." + e + "], got W=" + t);
}
function Mt(t, e) {
    ve(t, e);
    const n = Math.ceil(e / t) + 1, r = 2 ** (t - 1);
    return {
        windows: n,
        windowSize: r
    };
}
function dr(t, e) {
    if (!Array.isArray(t)) throw new Error("array expected");
    t.forEach((n, r)=>{
        if (!(n instanceof e)) throw new Error("invalid point at index " + r);
    });
}
function hr(t, e) {
    if (!Array.isArray(t)) throw new Error("array of scalars expected");
    t.forEach((n, r)=>{
        if (!e.isValid(n)) throw new Error("invalid scalar at index " + r);
    });
}
const qt = new WeakMap, Ie = new WeakMap;
function $t(t) {
    return Ie.get(t) || 1;
}
function lr(t, e) {
    return {
        constTimeNegate: zt,
        hasPrecomputes (n) {
            return $t(n) !== 1;
        },
        unsafeLadder (n, r, o = t.ZERO) {
            let s = n;
            for(; r > Se;)r & gt && (o = o.add(s)), s = s.double(), r >>= gt;
            return o;
        },
        precomputeWindow (n, r) {
            const { windows: o, windowSize: s } = Mt(r, e), a = [];
            let u = n, i = u;
            for(let D = 0; D < o; D++){
                i = u, a.push(i);
                for(let c = 1; c < s; c++)i = i.add(u), a.push(i);
                u = i.double();
            }
            return a;
        },
        wNAF (n, r, o) {
            const { windows: s, windowSize: a } = Mt(n, e);
            let u = t.ZERO, i = t.BASE;
            const D = BigInt(2 ** n - 1), c = 2 ** n, l = BigInt(n);
            for(let p = 0; p < s; p++){
                const w = p * a;
                let h = Number(o & D);
                o >>= l, h > a && (h -= c, o += gt);
                const g = w, S = w + Math.abs(h) - 1, v = p % 2 !== 0, L = h < 0;
                h === 0 ? i = i.add(zt(v, r[g])) : u = u.add(zt(L, r[S]));
            }
            return {
                p: u,
                f: i
            };
        },
        wNAFUnsafe (n, r, o, s = t.ZERO) {
            const { windows: a, windowSize: u } = Mt(n, e), i = BigInt(2 ** n - 1), D = 2 ** n, c = BigInt(n);
            for(let l = 0; l < a; l++){
                const p = l * u;
                if (o === Se) break;
                let w = Number(o & i);
                if (o >>= c, w > u && (w -= D, o += gt), w === 0) continue;
                let h = r[p + Math.abs(w) - 1];
                w < 0 && (h = h.negate()), s = s.add(h);
            }
            return s;
        },
        getPrecomputes (n, r, o) {
            let s = qt.get(r);
            return s || (s = this.precomputeWindow(r, n), n !== 1 && qt.set(r, o(s))), s;
        },
        wNAFCached (n, r, o) {
            const s = $t(n);
            return this.wNAF(s, this.getPrecomputes(s, n, o), r);
        },
        wNAFCachedUnsafe (n, r, o, s) {
            const a = $t(n);
            return a === 1 ? this.unsafeLadder(n, r, s) : this.wNAFUnsafe(a, this.getPrecomputes(a, n, o), r, s);
        },
        setWindowSize (n, r) {
            ve(r, e), Ie.set(n, r), qt.delete(n);
        }
    };
}
function br(t, e, n, r) {
    if (dr(n, t), hr(r, e), n.length !== r.length) throw new Error("arrays of points and scalars must have equal length");
    const o = t.ZERO, s = tr(BigInt(n.length)), a = s > 12 ? s - 3 : s > 4 ? s - 2 : s ? 2 : 1, u = (1 << a) - 1, i = new Array(u + 1).fill(o), D = Math.floor((e.BITS - 1) / a) * a;
    let c = o;
    for(let l = D; l >= 0; l -= a){
        i.fill(o);
        for(let w = 0; w < r.length; w++){
            const h = r[w], g = Number(h >> BigInt(l) & BigInt(u));
            i[g] = i[g].add(n[w]);
        }
        let p = o;
        for(let w = i.length - 1, h = o; w > 0; w--)h = h.add(i[w]), p = p.add(h);
        if (c = c.add(p), l !== 0) for(let w = 0; w < a; w++)c = c.double();
    }
    return c;
}
function pr(t) {
    return ar(t.Fp), Ot(t, {
        n: "bigint",
        h: "bigint",
        Gx: "field",
        Gy: "field"
    }, {
        nBitLength: "isSafeInteger",
        nByteLength: "isSafeInteger"
    }), Object.freeze({
        ...me(t.n, t.nBitLength),
        ...t,
        p: t.Fp.ORDER
    });
}
const G = BigInt(0), j = BigInt(1), yt = BigInt(2), wr = BigInt(8), Er = {
    zip215: !0
};
function gr(t) {
    const e = pr(t);
    return Ot(t, {
        hash: "function",
        a: "bigint",
        d: "bigint",
        randomBytes: "function"
    }, {
        adjustScalarBytes: "function",
        domain: "function",
        uvRatio: "function",
        mapToCurve: "function"
    }), Object.freeze({
        ...e
    });
}
function yr(t) {
    const e = gr(t), { Fp: n, n: r, prehash: o, hash: s, randomBytes: a, nByteLength: u, h: i } = e, D = yt << BigInt(u * 8) - j, c = n.create, l = _e(e.n, e.nBitLength), p = e.uvRatio || ((y, f)=>{
        try {
            return {
                isValid: !0,
                value: n.sqrt(y * n.inv(f))
            };
        } catch  {
            return {
                isValid: !1,
                value: G
            };
        }
    }), w = e.adjustScalarBytes || ((y)=>y), h = e.domain || ((y, f, b)=>{
        if (Tt("phflag", b), f.length || b) throw new Error("Contexts/pre-hash are not supported");
        return y;
    });
    function g(y, f) {
        ft("coordinate " + y, f, G, D);
    }
    function S(y) {
        if (!(y instanceof d)) throw new Error("ExtendedPoint expected");
    }
    const v = xe((y, f)=>{
        const { ex: b, ey: E, ez: B } = y, C = y.is0();
        f == null && (f = C ? wr : n.inv(B));
        const A = c(b * f), U = c(E * f), _ = c(B * f);
        if (C) return {
            x: G,
            y: j
        };
        if (_ !== j) throw new Error("invZ was invalid");
        return {
            x: A,
            y: U
        };
    }), L = xe((y)=>{
        const { a: f, d: b } = e;
        if (y.is0()) throw new Error("bad point: ZERO");
        const { ex: E, ey: B, ez: C, et: A } = y, U = c(E * E), _ = c(B * B), T = c(C * C), $ = c(T * T), R = c(U * f), V = c(T * c(R + _)), Y = c($ + c(b * c(U * _)));
        if (V !== Y) throw new Error("bad point: equation left != right (1)");
        const Z = c(E * B), X = c(C * A);
        if (Z !== X) throw new Error("bad point: equation left != right (2)");
        return !0;
    });
    class d {
        constructor(f, b, E, B){
            this.ex = f, this.ey = b, this.ez = E, this.et = B, g("x", f), g("y", b), g("z", E), g("t", B), Object.freeze(this);
        }
        get x() {
            return this.toAffine().x;
        }
        get y() {
            return this.toAffine().y;
        }
        static fromAffine(f) {
            if (f instanceof d) throw new Error("extended point not allowed");
            const { x: b, y: E } = f || {};
            return g("x", b), g("y", E), new d(b, E, j, c(b * E));
        }
        static normalizeZ(f) {
            const b = n.invertBatch(f.map((E)=>E.ez));
            return f.map((E, B)=>E.toAffine(b[B])).map(d.fromAffine);
        }
        static msm(f, b) {
            return br(d, l, f, b);
        }
        _setWindowSize(f) {
            q.setWindowSize(this, f);
        }
        assertValidity() {
            L(this);
        }
        equals(f) {
            S(f);
            const { ex: b, ey: E, ez: B } = this, { ex: C, ey: A, ez: U } = f, _ = c(b * U), T = c(C * B), $ = c(E * U), R = c(A * B);
            return _ === T && $ === R;
        }
        is0() {
            return this.equals(d.ZERO);
        }
        negate() {
            return new d(c(-this.ex), this.ey, this.ez, c(-this.et));
        }
        double() {
            const { a: f } = e, { ex: b, ey: E, ez: B } = this, C = c(b * b), A = c(E * E), U = c(yt * c(B * B)), _ = c(f * C), T = b + E, $ = c(c(T * T) - C - A), R = _ + A, V = R - U, Y = _ - A, Z = c($ * V), X = c(R * Y), et = c($ * Y), pt = c(V * R);
            return new d(Z, X, pt, et);
        }
        add(f) {
            S(f);
            const { a: b, d: E } = e, { ex: B, ey: C, ez: A, et: U } = this, { ex: _, ey: T, ez: $, et: R } = f;
            if (b === BigInt(-1)) {
                const re = c((C - B) * (T + _)), oe = c((C + B) * (T - _)), mt = c(oe - re);
                if (mt === G) return this.double();
                const se = c(A * yt * R), ie = c(U * yt * $), ue = ie + se, ce = oe + re, ae = ie - se, Dn = c(ue * mt), dn = c(ce * ae), hn = c(ue * ae), ln = c(mt * ce);
                return new d(Dn, dn, ln, hn);
            }
            const V = c(B * _), Y = c(C * T), Z = c(U * E * R), X = c(A * $), et = c((B + C) * (_ + T) - V - Y), pt = X - Z, ee = X + Z, ne = c(Y - b * V), un = c(et * pt), cn = c(ee * ne), an = c(et * ne), fn = c(pt * ee);
            return new d(un, cn, fn, an);
        }
        subtract(f) {
            return this.add(f.negate());
        }
        wNAF(f) {
            return q.wNAFCached(this, f, d.normalizeZ);
        }
        multiply(f) {
            const b = f;
            ft("scalar", b, j, r);
            const { p: E, f: B } = this.wNAF(b);
            return d.normalizeZ([
                E,
                B
            ])[0];
        }
        multiplyUnsafe(f, b = d.ZERO) {
            const E = f;
            return ft("scalar", E, G, r), E === G ? F : this.is0() || E === j ? this : q.wNAFCachedUnsafe(this, E, d.normalizeZ, b);
        }
        isSmallOrder() {
            return this.multiplyUnsafe(i).is0();
        }
        isTorsionFree() {
            return q.unsafeLadder(this, r).is0();
        }
        toAffine(f) {
            return v(this, f);
        }
        clearCofactor() {
            const { h: f } = e;
            return f === j ? this : this.multiplyUnsafe(f);
        }
        static fromHex(f, b = !1) {
            const { d: E, a: B } = e, C = n.BYTES;
            f = W("pointHex", f, C), Tt("zip215", b);
            const A = f.slice(), U = f[C - 1];
            A[C - 1] = U & -129;
            const _ = Et(A), T = b ? D : n.ORDER;
            ft("pointHex.y", _, G, T);
            const $ = c(_ * _), R = c($ - j), V = c(E * $ - B);
            let { isValid: Y, value: Z } = p(R, V);
            if (!Y) throw new Error("Point.fromHex: invalid y coordinate");
            const X = (Z & j) === j, et = (U & 128) !== 0;
            if (!b && Z === G && et) throw new Error("Point.fromHex: x=0 and x_0=1");
            return et !== X && (Z = c(-Z)), d.fromAffine({
                x: Z,
                y: _
            });
        }
        static fromPrivateKey(f) {
            return O(f).point;
        }
        toRawBytes() {
            const { x: f, y: b } = this.toAffine(), E = Nt(b, n.BYTES);
            return E[E.length - 1] |= f & j ? 128 : 0, E;
        }
        toHex() {
            return Ft(this.toRawBytes());
        }
    }
    d.BASE = new d(e.Gx, e.Gy, j, c(e.Gx * e.Gy)), d.ZERO = new d(G, j, j, G);
    const { BASE: m, ZERO: F } = d, q = lr(d, u * 8);
    function z(y) {
        return H(y, r);
    }
    function I(y) {
        return z(Et(y));
    }
    function O(y) {
        const f = n.BYTES;
        y = W("private key", y, f);
        const b = W("hashed private key", s(y), 2 * f), E = w(b.slice(0, f)), B = b.slice(f, 2 * f), C = I(E), A = m.multiply(C), U = A.toRawBytes();
        return {
            head: E,
            prefix: B,
            scalar: C,
            point: A,
            pointBytes: U
        };
    }
    function ot(y) {
        return O(y).pointBytes;
    }
    function tt(y = new Uint8Array, ...f) {
        const b = ye(...f);
        return I(s(h(b, W("context", y), !!o)));
    }
    function st(y, f, b = {}) {
        y = W("message", y), o && (y = o(y));
        const { prefix: E, scalar: B, pointBytes: C } = O(f), A = tt(b.context, E, y), U = m.multiply(A).toRawBytes(), _ = tt(b.context, U, C, y), T = z(A + _ * B);
        ft("signature.s", T, G, r);
        const $ = ye(U, Nt(T, n.BYTES));
        return W("result", $, n.BYTES * 2);
    }
    const at = Er;
    function Ct(y, f, b, E = at) {
        const { context: B, zip215: C } = E, A = n.BYTES;
        y = W("signature", y, 2 * A), f = W("message", f), b = W("publicKey", b, A), C !== void 0 && Tt("zip215", C), o && (f = o(f));
        const U = Et(y.slice(A, 2 * A));
        let _, T, $;
        try {
            _ = d.fromHex(b, C), T = d.fromHex(y.slice(0, A), C), $ = m.multiplyUnsafe(U);
        } catch  {
            return !1;
        }
        if (!C && _.isSmallOrder()) return !1;
        const R = tt(B, T.toRawBytes(), _.toRawBytes(), f);
        return T.add(_.multiplyUnsafe(R)).subtract($).clearCofactor().equals(d.ZERO);
    }
    return m._setWindowSize(8), {
        CURVE: e,
        getPublicKey: ot,
        sign: st,
        verify: Ct,
        ExtendedPoint: d,
        utils: {
            getExtendedPublicKey: O,
            randomPrivateKey: ()=>a(n.BYTES),
            precompute (y = 8, f = d.BASE) {
                return f._setWindowSize(y), f.multiply(BigInt(3)), f;
            }
        }
    };
}
BigInt(0), BigInt(1);
const kt = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949"), Ue = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
BigInt(0);
const xr = BigInt(1), Te = BigInt(2);
BigInt(3);
const Br = BigInt(5), Cr = BigInt(8);
function Ar(t) {
    const e = BigInt(10), n = BigInt(20), r = BigInt(40), o = BigInt(80), s = kt, u = t * t % s * t % s, i = J(u, Te, s) * u % s, D = J(i, xr, s) * t % s, c = J(D, Br, s) * D % s, l = J(c, e, s) * c % s, p = J(l, n, s) * l % s, w = J(p, r, s) * p % s, h = J(w, o, s) * w % s, g = J(h, o, s) * w % s, S = J(g, e, s) * c % s;
    return {
        pow_p_5_8: J(S, Te, s) * t % s,
        b2: u
    };
}
function mr(t) {
    return t[0] &= 248, t[31] &= 127, t[31] |= 64, t;
}
function _r(t, e) {
    const n = kt, r = H(e * e * e, n), o = H(r * r * e, n), s = Ar(t * o).pow_p_5_8;
    let a = H(t * r * s, n);
    const u = H(e * a * a, n), i = a, D = H(a * Ue, n), c = u === t, l = u === H(-t, n), p = u === H(-t * Ue, n);
    return c && (a = i), (l || p) && (a = D), ur(a, n) && (a = H(-a, n)), {
        isValid: c || l,
        value: a
    };
}
const Sr = (()=>_e(kt, void 0, !0))(), vr = (()=>({
        a: BigInt(-1),
        d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
        Fp: Sr,
        n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"),
        h: Cr,
        Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
        Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"),
        hash: Kn,
        randomBytes: he,
        adjustScalarBytes: mr,
        uvRatio: _r
    }))(), Rt = (()=>yr(vr))(), jt = "EdDSA", Zt = "JWT", ut = ".", Dt = "base64url", Gt = "utf8", xt = "utf8", Vt = ":", Yt = "did", Jt = "key", dt = "base58btc", Kt = "z", Wt = "K36", Fe = 32, Ne = 32;
function Xt(t) {
    return globalThis.Buffer != null ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : t;
}
function Le(t = 0) {
    return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? Xt(globalThis.Buffer.allocUnsafe(t)) : new Uint8Array(t);
}
function Oe(t, e) {
    e || (e = t.reduce((o, s)=>o + s.length, 0));
    const n = Le(e);
    let r = 0;
    for (const o of t)n.set(o, r), r += o.length;
    return Xt(n);
}
function Ir(t, e) {
    if (t.length >= 255) throw new TypeError("Alphabet too long");
    for(var n = new Uint8Array(256), r = 0; r < n.length; r++)n[r] = 255;
    for(var o = 0; o < t.length; o++){
        var s = t.charAt(o), a = s.charCodeAt(0);
        if (n[a] !== 255) throw new TypeError(s + " is ambiguous");
        n[a] = o;
    }
    var u = t.length, i = t.charAt(0), D = Math.log(u) / Math.log(256), c = Math.log(256) / Math.log(u);
    function l(h) {
        if (h instanceof Uint8Array || (ArrayBuffer.isView(h) ? h = new Uint8Array(h.buffer, h.byteOffset, h.byteLength) : Array.isArray(h) && (h = Uint8Array.from(h))), !(h instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
        if (h.length === 0) return "";
        for(var g = 0, S = 0, v = 0, L = h.length; v !== L && h[v] === 0;)v++, g++;
        for(var d = (L - v) * c + 1 >>> 0, m = new Uint8Array(d); v !== L;){
            for(var F = h[v], q = 0, z = d - 1; (F !== 0 || q < S) && z !== -1; z--, q++)F += 256 * m[z] >>> 0, m[z] = F % u >>> 0, F = F / u >>> 0;
            if (F !== 0) throw new Error("Non-zero carry");
            S = q, v++;
        }
        for(var I = d - S; I !== d && m[I] === 0;)I++;
        for(var O = i.repeat(g); I < d; ++I)O += t.charAt(m[I]);
        return O;
    }
    function p(h) {
        if (typeof h != "string") throw new TypeError("Expected String");
        if (h.length === 0) return new Uint8Array;
        var g = 0;
        if (h[g] !== " ") {
            for(var S = 0, v = 0; h[g] === i;)S++, g++;
            for(var L = (h.length - g) * D + 1 >>> 0, d = new Uint8Array(L); h[g];){
                var m = n[h.charCodeAt(g)];
                if (m === 255) return;
                for(var F = 0, q = L - 1; (m !== 0 || F < v) && q !== -1; q--, F++)m += u * d[q] >>> 0, d[q] = m % 256 >>> 0, m = m / 256 >>> 0;
                if (m !== 0) throw new Error("Non-zero carry");
                v = F, g++;
            }
            if (h[g] !== " ") {
                for(var z = L - v; z !== L && d[z] === 0;)z++;
                for(var I = new Uint8Array(S + (L - z)), O = S; z !== L;)I[O++] = d[z++];
                return I;
            }
        }
    }
    function w(h) {
        var g = p(h);
        if (g) return g;
        throw new Error(`Non-${e} character`);
    }
    return {
        encode: l,
        decodeUnsafe: p,
        decode: w
    };
}
var Ur = Ir, Tr = Ur;
const He = (t)=>{
    if (t instanceof Uint8Array && t.constructor.name === "Uint8Array") return t;
    if (t instanceof ArrayBuffer) return new Uint8Array(t);
    if (ArrayBuffer.isView(t)) return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
    throw new Error("Unknown type, must be binary type");
}, Fr = (t)=>new TextEncoder().encode(t), Nr = (t)=>new TextDecoder().decode(t);
class Lr {
    constructor(e, n, r){
        this.name = e, this.prefix = n, this.baseEncode = r;
    }
    encode(e) {
        if (e instanceof Uint8Array) return `${this.prefix}${this.baseEncode(e)}`;
        throw Error("Unknown type, must be binary type");
    }
}
class Or {
    constructor(e, n, r){
        if (this.name = e, this.prefix = n, n.codePointAt(0) === void 0) throw new Error("Invalid prefix character");
        this.prefixCodePoint = n.codePointAt(0), this.baseDecode = r;
    }
    decode(e) {
        if (typeof e == "string") {
            if (e.codePointAt(0) !== this.prefixCodePoint) throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
            return this.baseDecode(e.slice(this.prefix.length));
        } else throw Error("Can only multibase decode strings");
    }
    or(e) {
        return ze(this, e);
    }
}
class Hr {
    constructor(e){
        this.decoders = e;
    }
    or(e) {
        return ze(this, e);
    }
    decode(e) {
        const n = e[0], r = this.decoders[n];
        if (r) return r.decode(e);
        throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
}
const ze = (t, e)=>new Hr({
        ...t.decoders || {
            [t.prefix]: t
        },
        ...e.decoders || {
            [e.prefix]: e
        }
    });
class zr {
    constructor(e, n, r, o){
        this.name = e, this.prefix = n, this.baseEncode = r, this.baseDecode = o, this.encoder = new Lr(e, n, r), this.decoder = new Or(e, n, o);
    }
    encode(e) {
        return this.encoder.encode(e);
    }
    decode(e) {
        return this.decoder.decode(e);
    }
}
const Bt = ({ name: t, prefix: e, encode: n, decode: r })=>new zr(t, e, n, r), ht = ({ prefix: t, name: e, alphabet: n })=>{
    const { encode: r, decode: o } = Tr(n, e);
    return Bt({
        prefix: t,
        name: e,
        encode: r,
        decode: (s)=>He(o(s))
    });
}, Mr = (t, e, n, r)=>{
    const o = {};
    for(let c = 0; c < e.length; ++c)o[e[c]] = c;
    let s = t.length;
    for(; t[s - 1] === "=";)--s;
    const a = new Uint8Array(s * n / 8 | 0);
    let u = 0, i = 0, D = 0;
    for(let c = 0; c < s; ++c){
        const l = o[t[c]];
        if (l === void 0) throw new SyntaxError(`Non-${r} character`);
        i = i << n | l, u += n, u >= 8 && (u -= 8, a[D++] = 255 & i >> u);
    }
    if (u >= n || 255 & i << 8 - u) throw new SyntaxError("Unexpected end of data");
    return a;
}, qr = (t, e, n)=>{
    const r = e[e.length - 1] === "=", o = (1 << n) - 1;
    let s = "", a = 0, u = 0;
    for(let i = 0; i < t.length; ++i)for(u = u << 8 | t[i], a += 8; a > n;)a -= n, s += e[o & u >> a];
    if (a && (s += e[o & u << n - a]), r) for(; s.length * n & 7;)s += "=";
    return s;
}, k = ({ name: t, prefix: e, bitsPerChar: n, alphabet: r })=>Bt({
        prefix: e,
        name: t,
        encode (o) {
            return qr(o, r, n);
        },
        decode (o) {
            return Mr(o, r, n, t);
        }
    }), $r = Bt({
    prefix: "\0",
    name: "identity",
    encode: (t)=>Nr(t),
    decode: (t)=>Fr(t)
});
var kr = Object.freeze({
    __proto__: null,
    identity: $r
});
const Rr = k({
    prefix: "0",
    name: "base2",
    alphabet: "01",
    bitsPerChar: 1
});
var jr = Object.freeze({
    __proto__: null,
    base2: Rr
});
const Zr = k({
    prefix: "7",
    name: "base8",
    alphabet: "01234567",
    bitsPerChar: 3
});
var Gr = Object.freeze({
    __proto__: null,
    base8: Zr
});
const Vr = ht({
    prefix: "9",
    name: "base10",
    alphabet: "0123456789"
});
var Yr = Object.freeze({
    __proto__: null,
    base10: Vr
});
const Jr = k({
    prefix: "f",
    name: "base16",
    alphabet: "0123456789abcdef",
    bitsPerChar: 4
}), Kr = k({
    prefix: "F",
    name: "base16upper",
    alphabet: "0123456789ABCDEF",
    bitsPerChar: 4
});
var Wr = Object.freeze({
    __proto__: null,
    base16: Jr,
    base16upper: Kr
});
const Xr = k({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5
}), Pr = k({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5
}), Qr = k({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5
}), to = k({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5
}), eo = k({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5
}), no = k({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5
}), ro = k({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5
}), oo = k({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5
}), so = k({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5
});
var io = Object.freeze({
    __proto__: null,
    base32: Xr,
    base32upper: Pr,
    base32pad: Qr,
    base32padupper: to,
    base32hex: eo,
    base32hexupper: no,
    base32hexpad: ro,
    base32hexpadupper: oo,
    base32z: so
});
const uo = ht({
    prefix: "k",
    name: "base36",
    alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
}), co = ht({
    prefix: "K",
    name: "base36upper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});
var ao = Object.freeze({
    __proto__: null,
    base36: uo,
    base36upper: co
});
const fo = ht({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
}), Do = ht({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
var ho = Object.freeze({
    __proto__: null,
    base58btc: fo,
    base58flickr: Do
});
const lo = k({
    prefix: "m",
    name: "base64",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    bitsPerChar: 6
}), bo = k({
    prefix: "M",
    name: "base64pad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    bitsPerChar: 6
}), po = k({
    prefix: "u",
    name: "base64url",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bitsPerChar: 6
}), wo = k({
    prefix: "U",
    name: "base64urlpad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    bitsPerChar: 6
});
var Eo = Object.freeze({
    __proto__: null,
    base64: lo,
    base64pad: bo,
    base64url: po,
    base64urlpad: wo
});
const Me = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}"), go = Me.reduce((t, e, n)=>(t[n] = e, t), []), yo = Me.reduce((t, e, n)=>(t[e.codePointAt(0)] = n, t), []);
function xo(t) {
    return t.reduce((e, n)=>(e += go[n], e), "");
}
function Bo(t) {
    const e = [];
    for (const n of t){
        const r = yo[n.codePointAt(0)];
        if (r === void 0) throw new Error(`Non-base256emoji character: ${n}`);
        e.push(r);
    }
    return new Uint8Array(e);
}
const Co = Bt({
    prefix: "\u{1F680}",
    name: "base256emoji",
    encode: xo,
    decode: Bo
});
var Ao = Object.freeze({
    __proto__: null,
    base256emoji: Co
}), mo = $e, qe = 128, _o = 127, So = ~_o, vo = Math.pow(2, 31);
function $e(t, e, n) {
    e = e || [], n = n || 0;
    for(var r = n; t >= vo;)e[n++] = t & 255 | qe, t /= 128;
    for(; t & So;)e[n++] = t & 255 | qe, t >>>= 7;
    return e[n] = t | 0, $e.bytes = n - r + 1, e;
}
var Io = Pt, Uo = 128, ke = 127;
function Pt(t, r) {
    var n = 0, r = r || 0, o = 0, s = r, a, u = t.length;
    do {
        if (s >= u) throw Pt.bytes = 0, new RangeError("Could not decode varint");
        a = t[s++], n += o < 28 ? (a & ke) << o : (a & ke) * Math.pow(2, o), o += 7;
    }while (a >= Uo)
    return Pt.bytes = s - r, n;
}
var To = Math.pow(2, 7), Fo = Math.pow(2, 14), No = Math.pow(2, 21), Lo = Math.pow(2, 28), Oo = Math.pow(2, 35), Ho = Math.pow(2, 42), zo = Math.pow(2, 49), Mo = Math.pow(2, 56), qo = Math.pow(2, 63), $o = function(t) {
    return t < To ? 1 : t < Fo ? 2 : t < No ? 3 : t < Lo ? 4 : t < Oo ? 5 : t < Ho ? 6 : t < zo ? 7 : t < Mo ? 8 : t < qo ? 9 : 10;
}, ko = {
    encode: mo,
    decode: Io,
    encodingLength: $o
}, Re = ko;
const je = (t, e, n = 0)=>(Re.encode(t, e, n), e), Ze = (t)=>Re.encodingLength(t), Qt = (t, e)=>{
    const n = e.byteLength, r = Ze(t), o = r + Ze(n), s = new Uint8Array(o + n);
    return je(t, s, 0), je(n, s, r), s.set(e, o), new Ro(t, n, e, s);
};
class Ro {
    constructor(e, n, r, o){
        this.code = e, this.size = n, this.digest = r, this.bytes = o;
    }
}
const Ge = ({ name: t, code: e, encode: n })=>new jo(t, e, n);
class jo {
    constructor(e, n, r){
        this.name = e, this.code = n, this.encode = r;
    }
    digest(e) {
        if (e instanceof Uint8Array) {
            const n = this.encode(e);
            return n instanceof Uint8Array ? Qt(this.code, n) : n.then((r)=>Qt(this.code, r));
        } else throw Error("Unknown type, must be binary type");
    }
}
const Ve = (t)=>async (e)=>new Uint8Array(await crypto.subtle.digest(t, e)), Zo = Ge({
    name: "sha2-256",
    code: 18,
    encode: Ve("SHA-256")
}), Go = Ge({
    name: "sha2-512",
    code: 19,
    encode: Ve("SHA-512")
});
var Vo = Object.freeze({
    __proto__: null,
    sha256: Zo,
    sha512: Go
});
const Ye = 0, Yo = "identity", Je = He, Jo = (t)=>Qt(Ye, Je(t)), Ko = {
    code: Ye,
    name: Yo,
    encode: Je,
    digest: Jo
};
var Wo = Object.freeze({
    __proto__: null,
    identity: Ko
});
new TextEncoder, new TextDecoder;
const Ke = {
    ...kr,
    ...jr,
    ...Gr,
    ...Yr,
    ...Wr,
    ...io,
    ...ao,
    ...ho,
    ...Eo,
    ...Ao
};
({
    ...Vo,
    ...Wo
});
function We(t, e, n, r) {
    return {
        name: t,
        prefix: e,
        encoder: {
            name: t,
            prefix: e,
            encode: n
        },
        decoder: {
            decode: r
        }
    };
}
const Xe = We("utf8", "u", (t)=>"u" + new TextDecoder("utf8").decode(t), (t)=>new TextEncoder().encode(t.substring(1))), te = We("ascii", "a", (t)=>{
    let e = "a";
    for(let n = 0; n < t.length; n++)e += String.fromCharCode(t[n]);
    return e;
}, (t)=>{
    t = t.substring(1);
    const e = Le(t.length);
    for(let n = 0; n < t.length; n++)e[n] = t.charCodeAt(n);
    return e;
}), Pe = {
    utf8: Xe,
    "utf-8": Xe,
    hex: Ke.base16,
    latin1: te,
    ascii: te,
    binary: te,
    ...Ke
};
function ct(t, e = "utf8") {
    const n = Pe[e];
    if (!n) throw new Error(`Unsupported encoding "${e}"`);
    return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(t.buffer, t.byteOffset, t.byteLength).toString("utf8") : n.encoder.encode(t).substring(1);
}
function rt(t, e = "utf8") {
    const n = Pe[e];
    if (!n) throw new Error(`Unsupported encoding "${e}"`);
    return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? Xt(globalThis.Buffer.from(t, "utf-8")) : n.decoder.decode(`${n.prefix}${t}`);
}
function lt(t) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeJsonParse"])(ct(rt(t, Dt), Gt));
}
function bt(t) {
    return ct(rt((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeJsonStringify"])(t), Gt), Dt);
}
function Qe(t) {
    const e = rt(Wt, dt), n = Kt + ct(Oe([
        e,
        t
    ]), dt);
    return [
        Yt,
        Jt,
        n
    ].join(Vt);
}
function tn(t) {
    const [e, n, r] = t.split(Vt);
    if (e !== Yt || n !== Jt) throw new Error('Issuer must be a DID with method "key"');
    if (r.slice(0, 1) !== Kt) throw new Error("Issuer must be a key in mulicodec format");
    const o = rt(r.slice(1), dt);
    if (ct(o.slice(0, 2), dt) !== Wt) throw new Error('Issuer must be a public key with type "Ed25519"');
    const s = o.slice(2);
    if (s.length !== Fe) throw new Error("Issuer must be a public key with length 32 bytes");
    return s;
}
function en(t) {
    return ct(t, Dt);
}
function nn(t) {
    return rt(t, Dt);
}
function rn(t) {
    return rt([
        bt(t.header),
        bt(t.payload)
    ].join(ut), xt);
}
function Xo(t) {
    const e = ct(t, xt).split(ut), n = lt(e[0]), r = lt(e[1]);
    return {
        header: n,
        payload: r
    };
}
function on(t) {
    return [
        bt(t.header),
        bt(t.payload),
        en(t.signature)
    ].join(ut);
}
function sn(t) {
    const e = t.split(ut), n = lt(e[0]), r = lt(e[1]), o = nn(e[2]), s = rt(e.slice(0, 2).join(ut), xt);
    return {
        header: n,
        payload: r,
        signature: o,
        data: s
    };
}
function Po(t = he(Ne)) {
    const e = Rt.getPublicKey(t);
    return {
        secretKey: Oe([
            t,
            e
        ]),
        publicKey: e
    };
}
async function Qo(t, e, n, r, o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fromMiliseconds"])(Date.now())) {
    const s = {
        alg: jt,
        typ: Zt
    }, a = Qe(r.publicKey), u = o + n, i = {
        iss: a,
        sub: t,
        aud: e,
        iat: o,
        exp: u
    }, D = rn({
        header: s,
        payload: i
    }), c = Rt.sign(D, r.secretKey.slice(0, 32));
    return on({
        header: s,
        payload: i,
        signature: c
    });
}
async function ts(t) {
    const { header: e, payload: n, data: r, signature: o } = sn(t);
    if (e.alg !== jt || e.typ !== Zt) throw new Error("JWT must use EdDSA algorithm");
    const s = tn(n.iss);
    return Rt.verify(o, r, s);
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/relay-api/dist/index.es.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RELAY_JSONRPC",
    ()=>C,
    "isPublishMethod",
    ()=>c,
    "isPublishParams",
    ()=>h,
    "isPublishRequest",
    ()=>P,
    "isSubscribeMethod",
    ()=>b,
    "isSubscribeParams",
    ()=>a,
    "isSubscribeRequest",
    ()=>R,
    "isSubscriptionMethod",
    ()=>m,
    "isSubscriptionParams",
    ()=>d,
    "isSubscriptionRequest",
    ()=>S,
    "isUnsubscribeMethod",
    ()=>o,
    "isUnsubscribeParams",
    ()=>p,
    "isUnsubscribeRequest",
    ()=>_,
    "parsePublishRequest",
    ()=>q,
    "parseSubscribeRequest",
    ()=>g,
    "parseSubscriptionRequest",
    ()=>k,
    "parseUnsubscribeRequest",
    ()=>E
]);
function e(s, r, i = "string") {
    if (!s[r] || typeof s[r] !== i) throw new Error(`Missing or invalid "${r}" param`);
}
function l(s, r) {
    let i = !0;
    return r.forEach((t)=>{
        t in s || (i = !1);
    }), i;
}
function f(s, r) {
    return Array.isArray(s) ? s.length === r : Object.keys(s).length === r;
}
function w(s, r) {
    return Array.isArray(s) ? s.length >= r : Object.keys(s).length >= r;
}
function u(s, r, i) {
    return (i.length ? w(s, r.length) : f(s, r.length)) ? l(s, r) : !1;
}
function n(s, r, i = "_") {
    const t = s.split(i);
    return t[t.length - 1].trim().toLowerCase() === r.trim().toLowerCase();
}
function R(s) {
    return b(s.method) && a(s.params);
}
function b(s) {
    return n(s, "subscribe");
}
function a(s) {
    return u(s, [
        "topic"
    ], []);
}
function P(s) {
    return c(s.method) && h(s.params);
}
function c(s) {
    return n(s, "publish");
}
function h(s) {
    return u(s, [
        "message",
        "topic",
        "ttl"
    ], [
        "prompt",
        "tag"
    ]);
}
function _(s) {
    return o(s.method) && p(s.params);
}
function o(s) {
    return n(s, "unsubscribe");
}
function p(s) {
    return u(s, [
        "id",
        "topic"
    ], []);
}
function S(s) {
    return m(s.method) && d(s.params);
}
function m(s) {
    return n(s, "subscription");
}
function d(s) {
    return u(s, [
        "id",
        "data"
    ], []);
}
function g(s) {
    if (!b(s.method)) throw new Error("JSON-RPC Request has invalid subscribe method");
    if (!a(s.params)) throw new Error("JSON-RPC Request has invalid subscribe params");
    const r = s.params;
    return e(r, "topic"), r;
}
function q(s) {
    if (!c(s.method)) throw new Error("JSON-RPC Request has invalid publish method");
    if (!h(s.params)) throw new Error("JSON-RPC Request has invalid publish params");
    const r = s.params;
    return e(r, "topic"), e(r, "message"), e(r, "ttl", "number"), r;
}
function E(s) {
    if (!o(s.method)) throw new Error("JSON-RPC Request has invalid unsubscribe method");
    if (!p(s.params)) throw new Error("JSON-RPC Request has invalid unsubscribe params");
    const r = s.params;
    return e(r, "id"), r;
}
function k(s) {
    if (!m(s.method)) throw new Error("JSON-RPC Request has invalid subscription method");
    if (!d(s.params)) throw new Error("JSON-RPC Request has invalid subscription params");
    const r = s.params;
    return e(r, "id"), e(r, "data"), r;
}
const C = {
    waku: {
        publish: "waku_publish",
        batchPublish: "waku_batchPublish",
        subscribe: "waku_subscribe",
        batchSubscribe: "waku_batchSubscribe",
        subscription: "waku_subscription",
        unsubscribe: "waku_unsubscribe",
        batchUnsubscribe: "waku_batchUnsubscribe",
        batchFetchMessages: "waku_batchFetchMessages"
    },
    irn: {
        publish: "irn_publish",
        batchPublish: "irn_batchPublish",
        subscribe: "irn_subscribe",
        batchSubscribe: "irn_batchSubscribe",
        subscription: "irn_subscription",
        unsubscribe: "irn_unsubscribe",
        batchUnsubscribe: "irn_batchUnsubscribe",
        batchFetchMessages: "irn_batchFetchMessages"
    },
    iridium: {
        publish: "iridium_publish",
        batchPublish: "iridium_batchPublish",
        subscribe: "iridium_subscribe",
        batchSubscribe: "iridium_batchSubscribe",
        subscription: "iridium_subscription",
        unsubscribe: "iridium_unsubscribe",
        batchUnsubscribe: "iridium_batchUnsubscribe",
        batchFetchMessages: "iridium_batchFetchMessages"
    }
};
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/logger/dist/index.es.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MAX_LOG_SIZE_IN_BYTES_DEFAULT",
    ()=>i,
    "PINO_CUSTOM_CONTEXT_KEY",
    ()=>l,
    "PINO_LOGGER_DEFAULTS",
    ()=>b,
    "formatChildLoggerContext",
    ()=>m,
    "generateChildLogger",
    ()=>X,
    "generateClientLogger",
    ()=>I,
    "generatePlatformLogger",
    ()=>Y,
    "generateServerLogger",
    ()=>O,
    "getDefaultLoggerOptions",
    ()=>D,
    "getLoggerContext",
    ()=>w,
    "setLoggerContext",
    ()=>y
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$pino$29$__ = __turbopack_context__.i("[externals]/pino [external] (pino, cjs, [project]/Desktop/frontend/node_modules/pino)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/safe-json/dist/esm/index.js [app-ssr] (ecmascript)");
;
;
;
const b = {
    level: "info"
}, l = "custom_context", i = 1e3 * 1024;
var C = Object.defineProperty, B = (r, e, t)=>e in r ? C(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, s = (r, e, t)=>B(r, typeof e != "symbol" ? e + "" : e, t);
class S {
    constructor(e){
        s(this, "nodeValue"), s(this, "sizeInBytes"), s(this, "next"), this.nodeValue = e, this.sizeInBytes = new TextEncoder().encode(this.nodeValue).length, this.next = null;
    }
    get value() {
        return this.nodeValue;
    }
    get size() {
        return this.sizeInBytes;
    }
}
class v {
    constructor(e){
        s(this, "lengthInNodes"), s(this, "sizeInBytes"), s(this, "head"), s(this, "tail"), s(this, "maxSizeInBytes"), this.head = null, this.tail = null, this.lengthInNodes = 0, this.maxSizeInBytes = e, this.sizeInBytes = 0;
    }
    append(e) {
        const t = new S(e);
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
var _ = Object.defineProperty, x = (r, e, t)=>e in r ? _(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, a = (r, e, t)=>x(r, typeof e != "symbol" ? e + "" : e, t);
class L {
    constructor(e, t = i){
        a(this, "logs"), a(this, "level"), a(this, "levelValue"), a(this, "MAX_LOG_SIZE_IN_BYTES"), this.level = e ?? "error", this.levelValue = __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$pino$29$__["levels"].values[this.level], this.MAX_LOG_SIZE_IN_BYTES = t, this.logs = new v(this.MAX_LOG_SIZE_IN_BYTES);
    }
    forwardToConsole(e, t) {
        t === __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$pino$29$__["levels"].values.error ? console.error(e) : t === __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$pino$29$__["levels"].values.warn ? console.warn(e) : t === __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$pino$29$__["levels"].values.debug ? console.debug(e) : t === __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$pino$29$__["levels"].values.trace ? console.trace(e) : console.log(e);
    }
    appendToLogs(e) {
        this.logs.append((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeJsonStringify"])({
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
        this.logs = new v(this.MAX_LOG_SIZE_IN_BYTES);
    }
    getLogArray() {
        return Array.from(this.logs);
    }
    logsToBlob(e) {
        const t = this.getLogArray();
        return t.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeJsonStringify"])({
            extraMetadata: e
        })), new Blob(t, {
            type: "application/json"
        });
    }
}
var z = Object.defineProperty, T = (r, e, t)=>e in r ? z(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, k = (r, e, t)=>T(r, typeof e != "symbol" ? e + "" : e, t);
class E {
    constructor(e, t = i){
        k(this, "baseChunkLogger"), this.baseChunkLogger = new L(e, t);
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
var A = Object.defineProperty, $ = (r, e, t)=>e in r ? A(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, N = (r, e, t)=>$(r, typeof e != "symbol" ? e + "" : e, t);
class j {
    constructor(e, t = i){
        N(this, "baseChunkLogger"), this.baseChunkLogger = new L(e, t);
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
var P = Object.defineProperty, V = Object.defineProperties, G = Object.getOwnPropertyDescriptors, p = Object.getOwnPropertySymbols, M = Object.prototype.hasOwnProperty, U = Object.prototype.propertyIsEnumerable, f = (r, e, t)=>e in r ? P(r, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
    }) : r[e] = t, g = (r, e)=>{
    for(var t in e || (e = {}))M.call(e, t) && f(r, t, e[t]);
    if (p) for (var t of p(e))U.call(e, t) && f(r, t, e[t]);
    return r;
}, h = (r, e)=>V(r, G(e));
function D(r) {
    return h(g({}, r), {
        level: r?.level || b.level
    });
}
function y(r, e, t = l) {
    return r[t] = e, r;
}
function w(r, e = l) {
    return r[e] || "";
}
function m(r, e, t = l) {
    const o = w(r, t);
    return o.trim() ? `${o}/${e}` : e;
}
function X(r, e, t = l) {
    const o = m(r, e, t), u = r.child({
        context: o
    });
    return y(u, o, t);
}
function I(r) {
    var e, t;
    const o = new E((e = r.opts) == null ? void 0 : e.level, r.maxSizeInBytes);
    return {
        logger: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$pino$29$__["default"])(h(g({}, r.opts), {
            level: "trace",
            browser: h(g({}, (t = r.opts) == null ? void 0 : t.browser), {
                write: (u)=>o.write(u)
            })
        })),
        chunkLoggerController: o
    };
}
function O(r) {
    var e;
    const t = new j((e = r.opts) == null ? void 0 : e.level, r.maxSizeInBytes);
    return {
        logger: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$pino$29$__["default"])(h(g({}, r.opts), {
            level: "trace"
        }), t),
        chunkLoggerController: t
    };
}
function Y(r) {
    return typeof r.loggerOverride < "u" && typeof r.loggerOverride != "string" ? {
        logger: r.loggerOverride,
        chunkLoggerController: null
    } : ("TURBOPACK compile-time value", "undefined") < "u" ? I(r) : O(r);
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/events/dist/esm/events.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IEvents",
    ()=>IEvents
]);
class IEvents {
} //# sourceMappingURL=events.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/events/dist/esm/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/events/dist/esm/events.js [app-ssr] (ecmascript)"); //# sourceMappingURL=index.js.map
;
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/heartbeat/dist/index.es.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HEARTBEAT_EVENTS",
    ()=>r,
    "HEARTBEAT_INTERVAL",
    ()=>s,
    "HeartBeat",
    ()=>i,
    "IHeartBeat",
    ()=>n
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$events__$5b$external$5d$__$28$events$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/events [external] (events, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/time/dist/cjs/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/events/dist/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/events/dist/esm/events.js [app-ssr] (ecmascript)");
;
;
;
class n extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(e){
        super();
    }
}
const s = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FIVE_SECONDS"], r = {
    pulse: "heartbeat_pulse"
};
class i extends n {
    constructor(e){
        super(e), this.events = new __TURBOPACK__imported__module__$5b$externals$5d2f$events__$5b$external$5d$__$28$events$2c$__cjs$29$__["EventEmitter"], this.interval = s, this.interval = e?.interval || s;
    }
    static async init(e) {
        const t = new i(e);
        return await t.init(), t;
    }
    async init() {
        await this.initialize();
    }
    stop() {
        clearInterval(this.intervalRef);
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
    async initialize() {
        this.intervalRef = setInterval(()=>this.pulse(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$time$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toMiliseconds"])(this.interval));
    }
    pulse() {
        this.events.emit(r.pulse);
    }
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/keyvaluestorage/dist/index.es.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KeyValueStorage",
    ()=>h,
    "default",
    ()=>h
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$unstorage$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/unstorage/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/idb-keyval/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/safe-json/dist/esm/index.js [app-ssr] (ecmascript)");
;
;
;
function C(i) {
    return i;
}
const x = "idb-keyval";
var z = (i = {})=>{
    const t = i.base && i.base.length > 0 ? `${i.base}:` : "", e = (s)=>t + s;
    let n;
    return i.dbName && i.storeName && (n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createStore"])(i.dbName, i.storeName)), {
        name: x,
        options: i,
        async hasItem (s) {
            return !(typeof await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["get"])(e(s), n) > "u");
        },
        async getItem (s) {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["get"])(e(s), n) ?? null;
        },
        setItem (s, a) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["set"])(e(s), a, n);
        },
        removeItem (s) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["del"])(e(s), n);
        },
        getKeys () {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keys"])(n);
        },
        clear () {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clear"])(n);
        }
    };
};
const D = "WALLET_CONNECT_V2_INDEXED_DB", E = "keyvaluestorage";
class _ {
    constructor(){
        this.indexedDb = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$unstorage$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createStorage"])({
            driver: z({
                dbName: D,
                storeName: E
            })
        });
    }
    async getKeys() {
        return this.indexedDb.getKeys();
    }
    async getEntries() {
        return (await this.indexedDb.getItems(await this.indexedDb.getKeys())).map((t)=>[
                t.key,
                t.value
            ]);
    }
    async getItem(t) {
        const e = await this.indexedDb.getItem(t);
        if (e !== null) return e;
    }
    async setItem(t, e) {
        await this.indexedDb.setItem(t, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeJsonStringify"])(e));
    }
    async removeItem(t) {
        await this.indexedDb.removeItem(t);
    }
}
var l = typeof globalThis < "u" ? globalThis : ("TURBOPACK compile-time value", "undefined") < "u" ? window : ("TURBOPACK compile-time value", "object") < "u" ? /*TURBOPACK member replacement*/ __turbopack_context__.g : typeof self < "u" ? self : {}, c = {
    exports: {}
};
(function() {
    let i;
    function t() {}
    i = t, i.prototype.getItem = function(e) {
        return this.hasOwnProperty(e) ? String(this[e]) : null;
    }, i.prototype.setItem = function(e, n) {
        this[e] = String(n);
    }, i.prototype.removeItem = function(e) {
        delete this[e];
    }, i.prototype.clear = function() {
        const e = this;
        Object.keys(e).forEach(function(n) {
            e[n] = void 0, delete e[n];
        });
    }, i.prototype.key = function(e) {
        return e = e || 0, Object.keys(this)[e];
    }, i.prototype.__defineGetter__("length", function() {
        return Object.keys(this).length;
    }), typeof l < "u" && l.localStorage ? c.exports = l.localStorage : ("TURBOPACK compile-time value", "undefined") < "u" && window.localStorage ? c.exports = window.localStorage : c.exports = new t;
})();
function k(i) {
    var t;
    return [
        i[0],
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeJsonParse"])((t = i[1]) != null ? t : "")
    ];
}
class K {
    constructor(){
        this.localStorage = c.exports;
    }
    async getKeys() {
        return Object.keys(this.localStorage);
    }
    async getEntries() {
        return Object.entries(this.localStorage).map(k);
    }
    async getItem(t) {
        const e = this.localStorage.getItem(t);
        if (e !== null) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeJsonParse"])(e);
    }
    async setItem(t, e) {
        this.localStorage.setItem(t, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeJsonStringify"])(e));
    }
    async removeItem(t) {
        this.localStorage.removeItem(t);
    }
}
const N = "wc_storage_version", y = 1, O = async (i, t, e)=>{
    const n = N, s = await t.getItem(n);
    if (s && s >= y) {
        e(t);
        return;
    }
    const a = await i.getKeys();
    if (!a.length) {
        e(t);
        return;
    }
    const m = [];
    for(; a.length;){
        const r = a.shift();
        if (!r) continue;
        const o = r.toLowerCase();
        if (o.includes("wc@") || o.includes("walletconnect") || o.includes("wc_") || o.includes("wallet_connect")) {
            const f = await i.getItem(r);
            await t.setItem(r, f), m.push(r);
        }
    }
    await t.setItem(n, y), e(t), j(i, m);
}, j = async (i, t)=>{
    t.length && t.forEach(async (e)=>{
        await i.removeItem(e);
    });
};
class h {
    constructor(){
        this.initialized = !1, this.setInitialized = (e)=>{
            this.storage = e, this.initialized = !0;
        };
        const t = new K;
        this.storage = t;
        try {
            const e = new _;
            O(t, e, this.setInitialized);
        } catch  {
            this.initialized = !0;
        }
    }
    async getKeys() {
        return await this.initialize(), this.storage.getKeys();
    }
    async getEntries() {
        return await this.initialize(), this.storage.getEntries();
    }
    async getItem(t) {
        return await this.initialize(), this.storage.getItem(t);
    }
    async setItem(t, e) {
        return await this.initialize(), this.storage.setItem(t, e);
    }
    async removeItem(t) {
        return await this.initialize(), this.storage.removeItem(t);
    }
    async initialize() {
        this.initialized || await new Promise((t)=>{
            const e = setInterval(()=>{
                this.initialized && (clearInterval(e), t());
            }, 20);
        });
    }
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/types/dist/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/events/dist/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/events/dist/esm/events.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$events__$5b$external$5d$__$28$events$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/events [external] (events, cjs)");
;
;
var a = Object.defineProperty, u = (e, s, r)=>s in e ? a(e, s, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : e[s] = r, c = (e, s, r)=>u(e, typeof s != "symbol" ? s + "" : s, r);
class h extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IEvents"] {
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
class I extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(s, r){
        super(), this.core = s, this.logger = r, v(this, "records", new Map);
    }
}
class y {
    constructor(s, r){
        this.logger = s, this.core = r;
    }
}
class m extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(s, r){
        super(), this.relayer = s, this.logger = r;
    }
}
class d extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IEvents"] {
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
class P extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IEvents"] {
    constructor(s, r){
        super(), this.relayer = s, this.logger = r;
    }
}
class j {
    constructor(s, r){
        this.core = s, this.logger = r;
    }
}
class S extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$events$2f$dist$2f$esm$2f$events$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IEvents"] {
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
class H extends __TURBOPACK__imported__module__$5b$externals$5d2f$events__$5b$external$5d$__$28$events$2c$__cjs$29$__["default"] {
    constructor(){
        super();
    }
}
class J {
    constructor(s){
        this.opts = s, i(this, "protocol", "wc"), i(this, "version", 2);
    }
}
class K extends __TURBOPACK__imported__module__$5b$externals$5d2f$events__$5b$external$5d$__$28$events$2c$__cjs$29$__["EventEmitter"] {
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
 //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_ERROR",
    ()=>DEFAULT_ERROR,
    "INTERNAL_ERROR",
    ()=>INTERNAL_ERROR,
    "INVALID_PARAMS",
    ()=>INVALID_PARAMS,
    "INVALID_REQUEST",
    ()=>INVALID_REQUEST,
    "METHOD_NOT_FOUND",
    ()=>METHOD_NOT_FOUND,
    "PARSE_ERROR",
    ()=>PARSE_ERROR,
    "RESERVED_ERROR_CODES",
    ()=>RESERVED_ERROR_CODES,
    "SERVER_ERROR",
    ()=>SERVER_ERROR,
    "SERVER_ERROR_CODE_RANGE",
    ()=>SERVER_ERROR_CODE_RANGE,
    "STANDARD_ERROR_MAP",
    ()=>STANDARD_ERROR_MAP
]);
const PARSE_ERROR = "PARSE_ERROR";
const INVALID_REQUEST = "INVALID_REQUEST";
const METHOD_NOT_FOUND = "METHOD_NOT_FOUND";
const INVALID_PARAMS = "INVALID_PARAMS";
const INTERNAL_ERROR = "INTERNAL_ERROR";
const SERVER_ERROR = "SERVER_ERROR";
const RESERVED_ERROR_CODES = [
    -32700,
    -32600,
    -32601,
    -32602,
    -32603
];
const SERVER_ERROR_CODE_RANGE = [
    -32000,
    -32099
];
const STANDARD_ERROR_MAP = {
    [PARSE_ERROR]: {
        code: -32700,
        message: "Parse error"
    },
    [INVALID_REQUEST]: {
        code: -32600,
        message: "Invalid Request"
    },
    [METHOD_NOT_FOUND]: {
        code: -32601,
        message: "Method not found"
    },
    [INVALID_PARAMS]: {
        code: -32602,
        message: "Invalid params"
    },
    [INTERNAL_ERROR]: {
        code: -32603,
        message: "Internal error"
    },
    [SERVER_ERROR]: {
        code: -32000,
        message: "Server error"
    }
};
const DEFAULT_ERROR = SERVER_ERROR; //# sourceMappingURL=constants.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getError",
    ()=>getError,
    "getErrorByCode",
    ()=>getErrorByCode,
    "isReservedErrorCode",
    ()=>isReservedErrorCode,
    "isServerErrorCode",
    ()=>isServerErrorCode,
    "isValidErrorCode",
    ()=>isValidErrorCode,
    "parseConnectionError",
    ()=>parseConnectionError,
    "validateJsonRpcError",
    ()=>validateJsonRpcError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js [app-ssr] (ecmascript)");
;
function isServerErrorCode(code) {
    return code <= __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERVER_ERROR_CODE_RANGE"][0] && code >= __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERVER_ERROR_CODE_RANGE"][1];
}
function isReservedErrorCode(code) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RESERVED_ERROR_CODES"].includes(code);
}
function isValidErrorCode(code) {
    return typeof code === "number";
}
function getError(type) {
    if (!Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STANDARD_ERROR_MAP"]).includes(type)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STANDARD_ERROR_MAP"][__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_ERROR"]];
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STANDARD_ERROR_MAP"][type];
}
function getErrorByCode(code) {
    const match = Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STANDARD_ERROR_MAP"]).find((e)=>e.code === code);
    if (!match) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STANDARD_ERROR_MAP"][__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_ERROR"]];
    }
    return match;
}
function validateJsonRpcError(response) {
    if (typeof response.error.code === "undefined") {
        return {
            valid: false,
            error: "Missing code for JSON-RPC error"
        };
    }
    if (typeof response.error.message === "undefined") {
        return {
            valid: false,
            error: "Missing message for JSON-RPC error"
        };
    }
    if (!isValidErrorCode(response.error.code)) {
        return {
            valid: false,
            error: `Invalid error code type for JSON-RPC: ${response.error.code}`
        };
    }
    if (isReservedErrorCode(response.error.code)) {
        const error = getErrorByCode(response.error.code);
        if (error.message !== __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STANDARD_ERROR_MAP"][__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_ERROR"]].message && response.error.message === error.message) {
            return {
                valid: false,
                error: `Invalid error code message for JSON-RPC: ${response.error.code}`
            };
        }
    }
    return {
        valid: true
    };
}
function parseConnectionError(e, url, type) {
    return e.message.includes("getaddrinfo ENOTFOUND") || e.message.includes("connect ECONNREFUSED") ? new Error(`Unavailable ${type} RPC url at ${url}`) : e;
} //# sourceMappingURL=error.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/env.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isNodeJs",
    ()=>isNodeJs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$environment$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/environment/dist/cjs/index.js [app-ssr] (ecmascript)");
;
const isNodeJs = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$environment$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"];
;
 //# sourceMappingURL=env.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatErrorMessage",
    ()=>formatErrorMessage,
    "formatJsonRpcError",
    ()=>formatJsonRpcError,
    "formatJsonRpcRequest",
    ()=>formatJsonRpcRequest,
    "formatJsonRpcResult",
    ()=>formatJsonRpcResult,
    "getBigIntRpcId",
    ()=>getBigIntRpcId,
    "payloadId",
    ()=>payloadId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js [app-ssr] (ecmascript)");
;
;
function payloadId(entropy = 3) {
    const date = Date.now() * Math.pow(10, entropy);
    const extra = Math.floor(Math.random() * Math.pow(10, entropy));
    return date + extra;
}
function getBigIntRpcId(entropy = 6) {
    return BigInt(payloadId(entropy));
}
function formatJsonRpcRequest(method, params, id) {
    return {
        id: id || payloadId(),
        jsonrpc: "2.0",
        method,
        params
    };
}
function formatJsonRpcResult(id, result) {
    return {
        id,
        jsonrpc: "2.0",
        result
    };
}
function formatJsonRpcError(id, error, data) {
    return {
        id,
        jsonrpc: "2.0",
        error: formatErrorMessage(error, data)
    };
}
function formatErrorMessage(error, data) {
    if (typeof error === "undefined") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getError"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INTERNAL_ERROR"]);
    }
    if (typeof error === "string") {
        error = Object.assign(Object.assign({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getError"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SERVER_ERROR"])), {
            message: error
        });
    }
    if (typeof data !== "undefined") {
        error.data = data;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isReservedErrorCode"])(error.code)) {
        error = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getErrorByCode"])(error.code);
    }
    return error;
} //# sourceMappingURL=format.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/routing.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isValidDefaultRoute",
    ()=>isValidDefaultRoute,
    "isValidLeadingWildcardRoute",
    ()=>isValidLeadingWildcardRoute,
    "isValidRoute",
    ()=>isValidRoute,
    "isValidTrailingWildcardRoute",
    ()=>isValidTrailingWildcardRoute,
    "isValidWildcardRoute",
    ()=>isValidWildcardRoute
]);
function isValidRoute(route) {
    if (route.includes("*")) {
        return isValidWildcardRoute(route);
    }
    if (/\W/g.test(route)) {
        return false;
    }
    return true;
}
function isValidDefaultRoute(route) {
    return route === "*";
}
function isValidWildcardRoute(route) {
    if (isValidDefaultRoute(route)) {
        return true;
    }
    if (!route.includes("*")) {
        return false;
    }
    if (route.split("*").length !== 2) {
        return false;
    }
    if (route.split("*").filter((x)=>x.trim() === "").length !== 1) {
        return false;
    }
    return true;
}
function isValidLeadingWildcardRoute(route) {
    return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[0].trim();
}
function isValidTrailingWildcardRoute(route) {
    return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[1].trim();
} //# sourceMappingURL=routing.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/types.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$types$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-types/dist/index.es.js [app-ssr] (ecmascript)"); //# sourceMappingURL=types.js.map
;
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/url.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isHttpUrl",
    ()=>isHttpUrl,
    "isLocalhostUrl",
    ()=>isLocalhostUrl,
    "isWsUrl",
    ()=>isWsUrl
]);
const HTTP_REGEX = "^https?:";
const WS_REGEX = "^wss?:";
function getUrlProtocol(url) {
    const matches = url.match(new RegExp(/^\w+:/, "gi"));
    if (!matches || !matches.length) return;
    return matches[0];
}
function matchRegexProtocol(url, regex) {
    const protocol = getUrlProtocol(url);
    if (typeof protocol === "undefined") return false;
    return new RegExp(regex).test(protocol);
}
function isHttpUrl(url) {
    return matchRegexProtocol(url, HTTP_REGEX);
}
function isWsUrl(url) {
    return matchRegexProtocol(url, WS_REGEX);
}
function isLocalhostUrl(url) {
    return new RegExp("wss?://localhost(:d{2,5})?").test(url);
} //# sourceMappingURL=url.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/validators.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isJsonRpcError",
    ()=>isJsonRpcError,
    "isJsonRpcPayload",
    ()=>isJsonRpcPayload,
    "isJsonRpcRequest",
    ()=>isJsonRpcRequest,
    "isJsonRpcResponse",
    ()=>isJsonRpcResponse,
    "isJsonRpcResult",
    ()=>isJsonRpcResult,
    "isJsonRpcValidationInvalid",
    ()=>isJsonRpcValidationInvalid
]);
function isJsonRpcPayload(payload) {
    return typeof payload === "object" && "id" in payload && "jsonrpc" in payload && payload.jsonrpc === "2.0";
}
function isJsonRpcRequest(payload) {
    return isJsonRpcPayload(payload) && "method" in payload;
}
function isJsonRpcResponse(payload) {
    return isJsonRpcPayload(payload) && (isJsonRpcResult(payload) || isJsonRpcError(payload));
}
function isJsonRpcResult(payload) {
    return "result" in payload;
}
function isJsonRpcError(payload) {
    return "error" in payload;
}
function isJsonRpcValidationInvalid(validation) {
    return "error" in validation && validation.valid === false;
} //# sourceMappingURL=validators.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$env$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/env.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$routing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/routing.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$types$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/types.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$url$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/url.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/validators.js [app-ssr] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
;
;
;
;
;
;
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/environment/dist/cjs/crypto.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isBrowserCryptoAvailable = exports.getSubtleCrypto = exports.getBrowerCrypto = void 0;
function getBrowerCrypto() {
    return (/*TURBOPACK member replacement*/ __turbopack_context__.g === null || /*TURBOPACK member replacement*/ __turbopack_context__.g === void 0 ? void 0 : /*TURBOPACK member replacement*/ __turbopack_context__.g.crypto) || (/*TURBOPACK member replacement*/ __turbopack_context__.g === null || /*TURBOPACK member replacement*/ __turbopack_context__.g === void 0 ? void 0 : /*TURBOPACK member replacement*/ __turbopack_context__.g.msCrypto) || {};
}
exports.getBrowerCrypto = getBrowerCrypto;
function getSubtleCrypto() {
    const browserCrypto = getBrowerCrypto();
    return browserCrypto.subtle || browserCrypto.webkitSubtle;
}
exports.getSubtleCrypto = getSubtleCrypto;
function isBrowserCryptoAvailable() {
    return !!getBrowerCrypto() && !!getSubtleCrypto();
}
exports.isBrowserCryptoAvailable = isBrowserCryptoAvailable; //# sourceMappingURL=crypto.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/environment/dist/cjs/env.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isBrowser = exports.isNode = exports.isReactNative = void 0;
function isReactNative() {
    return typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative";
}
exports.isReactNative = isReactNative;
function isNode() {
    return typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined";
}
exports.isNode = isNode;
function isBrowser() {
    return !isReactNative() && !isNode();
}
exports.isBrowser = isBrowser; //# sourceMappingURL=env.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/environment/dist/cjs/index.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = __turbopack_context__.r("[project]/Desktop/frontend/node_modules/@walletconnect/environment/node_modules/tslib/tslib.es6.js [app-ssr] (ecmascript)");
tslib_1.__exportStar(__turbopack_context__.r("[project]/Desktop/frontend/node_modules/@walletconnect/environment/dist/cjs/crypto.js [app-ssr] (ecmascript)"), exports);
tslib_1.__exportStar(__turbopack_context__.r("[project]/Desktop/frontend/node_modules/@walletconnect/environment/dist/cjs/env.js [app-ssr] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-types/dist/index.es.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IBaseJsonRpcProvider",
    ()=>n,
    "IEvents",
    ()=>e,
    "IJsonRpcConnection",
    ()=>o,
    "IJsonRpcProvider",
    ()=>r
]);
class e {
}
class o extends e {
    constructor(c){
        super();
    }
}
class n extends e {
    constructor(){
        super();
    }
}
class r extends n {
    constructor(c){
        super();
    }
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-provider/dist/index.es.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JsonRpcProvider",
    ()=>o,
    "default",
    ()=>o
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$events__$5b$external$5d$__$28$events$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/events [external] (events, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$types$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-types/dist/index.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/validators.js [app-ssr] (ecmascript)");
;
;
class o extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$types$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IJsonRpcProvider"] {
    constructor(t){
        super(t), this.events = new __TURBOPACK__imported__module__$5b$externals$5d2f$events__$5b$external$5d$__$28$events$2c$__cjs$29$__["EventEmitter"], this.hasRegisteredEventListeners = !1, this.connection = this.setConnection(t), this.connection.connected && this.registerEventListeners();
    }
    async connect(t = this.connection) {
        await this.open(t);
    }
    async disconnect() {
        await this.close();
    }
    on(t, e) {
        this.events.on(t, e);
    }
    once(t, e) {
        this.events.once(t, e);
    }
    off(t, e) {
        this.events.off(t, e);
    }
    removeListener(t, e) {
        this.events.removeListener(t, e);
    }
    async request(t, e) {
        return this.requestStrict((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatJsonRpcRequest"])(t.method, t.params || [], t.id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBigIntRpcId"])().toString()), e);
    }
    async requestStrict(t, e) {
        return new Promise(async (i, s)=>{
            if (!this.connection.connected) try {
                await this.open();
            } catch (n) {
                s(n);
            }
            this.events.on(`${t.id}`, (n)=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isJsonRpcError"])(n) ? s(n.error) : i(n.result);
            });
            try {
                await this.connection.send(t, e);
            } catch (n) {
                s(n);
            }
        });
    }
    setConnection(t = this.connection) {
        return t;
    }
    onPayload(t) {
        this.events.emit("payload", t), (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$validators$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isJsonRpcResponse"])(t) ? this.events.emit(`${t.id}`, t) : this.events.emit("message", {
            type: t.method,
            data: t.params
        });
    }
    onClose(t) {
        t && t.code === 3e3 && this.events.emit("error", new Error(`WebSocket connection closed abnormally with code: ${t.code} ${t.reason ? `(${t.reason})` : ""}`)), this.events.emit("disconnect");
    }
    async open(t = this.connection) {
        this.connection === t && this.connection.connected || (this.connection.connected && this.close(), typeof t == "string" && (await this.connection.open(t), t = this.connection), this.connection = this.setConnection(t), await this.connection.open(), this.registerEventListeners(), this.events.emit("connect"));
    }
    async close() {
        await this.connection.close();
    }
    registerEventListeners() {
        this.hasRegisteredEventListeners || (this.connection.on("payload", (t)=>this.onPayload(t)), this.connection.on("close", (t)=>this.onClose(t)), this.connection.on("error", (t)=>this.events.emit("error", t)), this.connection.on("register_error", (t)=>this.onClose()), this.hasRegisteredEventListeners = !0);
    }
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-ws-connection/dist/index.es.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WsConnection",
    ()=>f,
    "default",
    ()=>f
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$events__$5b$external$5d$__$28$events$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/events [external] (events, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/safe-json/dist/esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$url$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/url.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$environment$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/environment/dist/cjs/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js [app-ssr] (ecmascript)");
;
;
;
const v = ()=>typeof WebSocket < "u" ? WebSocket : ("TURBOPACK compile-time value", "object") < "u" && typeof /*TURBOPACK member replacement*/ __turbopack_context__.g.WebSocket < "u" ? /*TURBOPACK member replacement*/ __turbopack_context__.g.WebSocket : ("TURBOPACK compile-time value", "undefined") < "u" && typeof window.WebSocket < "u" ? window.WebSocket : typeof self < "u" && typeof self.WebSocket < "u" ? self.WebSocket : __turbopack_context__.r("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-ws-connection/node_modules/ws/index.js [app-ssr] (ecmascript)"), w = ()=>typeof WebSocket < "u" || ("TURBOPACK compile-time value", "object") < "u" && typeof /*TURBOPACK member replacement*/ __turbopack_context__.g.WebSocket < "u" || ("TURBOPACK compile-time value", "undefined") < "u" && typeof window.WebSocket < "u" || typeof self < "u" && typeof self.WebSocket < "u", d = (r)=>r.split("?")[0], h = 10, b = v();
class f {
    constructor(e){
        if (this.url = e, this.events = new __TURBOPACK__imported__module__$5b$externals$5d2f$events__$5b$external$5d$__$28$events$2c$__cjs$29$__["EventEmitter"], this.registering = !1, !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$url$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isWsUrl"])(e)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${e}`);
        this.url = e;
    }
    get connected() {
        return typeof this.socket < "u";
    }
    get connecting() {
        return this.registering;
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
    async open(e = this.url) {
        await this.register(e);
    }
    async close() {
        return new Promise((e, t)=>{
            if (typeof this.socket > "u") {
                t(new Error("Connection already closed"));
                return;
            }
            this.socket.onclose = (n)=>{
                this.onClose(n), e();
            }, this.socket.close();
        });
    }
    async send(e) {
        typeof this.socket > "u" && (this.socket = await this.register());
        try {
            this.socket.send((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeJsonStringify"])(e));
        } catch (t) {
            this.onError(e.id, t);
        }
    }
    register(e = this.url) {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$url$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isWsUrl"])(e)) throw new Error(`Provided URL is not compatible with WebSocket connection: ${e}`);
        if (this.registering) {
            const t = this.events.getMaxListeners();
            return (this.events.listenerCount("register_error") >= t || this.events.listenerCount("open") >= t) && this.events.setMaxListeners(t + 1), new Promise((n, s)=>{
                this.events.once("register_error", (o)=>{
                    this.resetMaxListeners(), s(o);
                }), this.events.once("open", ()=>{
                    if (this.resetMaxListeners(), typeof this.socket > "u") return s(new Error("WebSocket connection is missing or invalid"));
                    n(this.socket);
                });
            });
        }
        return this.url = e, this.registering = !0, new Promise((t, n)=>{
            const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$environment$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isReactNative"])() ? void 0 : {
                rejectUnauthorized: !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$url$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isLocalhostUrl"])(e)
            }, o = new b(e, [], s);
            w() ? o.onerror = (i)=>{
                const a = i;
                n(this.emitError(a.error));
            } : o.on("error", (i)=>{
                n(this.emitError(i));
            }), o.onopen = ()=>{
                this.onOpen(o), t(o);
            };
        });
    }
    onOpen(e) {
        e.onmessage = (t)=>this.onPayload(t), e.onclose = (t)=>this.onClose(t), this.socket = e, this.registering = !1, this.events.emit("open");
    }
    onClose(e) {
        this.socket = void 0, this.registering = !1, this.events.emit("close", e);
    }
    onPayload(e) {
        if (typeof e.data > "u") return;
        const t = typeof e.data == "string" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeJsonParse"])(e.data) : e.data;
        this.events.emit("payload", t);
    }
    onError(e, t) {
        const n = this.parseError(t), s = n.message || n.toString(), o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatJsonRpcError"])(e, s);
        this.events.emit("payload", o);
    }
    parseError(e, t = this.url) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseConnectionError"])(e, d(t), "WS");
    }
    resetMaxListeners() {
        this.events.getMaxListeners() > h && this.events.setMaxListeners(h);
    }
    emitError(e) {
        const t = this.parseError(new Error(e?.message || `WebSocket connection failed for host: ${d(this.url)}`));
        return this.events.emit("register_error", t), t;
    }
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-http-connection/dist/index.es.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HttpConnection",
    ()=>f,
    "default",
    ()=>f
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$events__$5b$external$5d$__$28$events$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/events [external] (events, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$cross$2d$fetch$2f$dist$2f$node$2d$ponyfill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/cross-fetch/dist/node-ponyfill.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/safe-json/dist/esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$url$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/url.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js [app-ssr] (ecmascript)");
;
;
;
;
var P = Object.defineProperty, w = Object.defineProperties, E = Object.getOwnPropertyDescriptors, c = Object.getOwnPropertySymbols, L = Object.prototype.hasOwnProperty, O = Object.prototype.propertyIsEnumerable, l = (r, t, e)=>t in r ? P(r, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e
    }) : r[t] = e, p = (r, t)=>{
    for(var e in t || (t = {}))L.call(t, e) && l(r, e, t[e]);
    if (c) for (var e of c(t))O.call(t, e) && l(r, e, t[e]);
    return r;
}, v = (r, t)=>w(r, E(t));
const j = {
    Accept: "application/json",
    "Content-Type": "application/json"
}, T = "POST", d = {
    headers: j,
    method: T
}, g = 10;
class f {
    constructor(t, e = !1){
        if (this.url = t, this.disableProviderPing = e, this.events = new __TURBOPACK__imported__module__$5b$externals$5d2f$events__$5b$external$5d$__$28$events$2c$__cjs$29$__["EventEmitter"], this.isAvailable = !1, this.registering = !1, !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$url$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHttpUrl"])(t)) throw new Error(`Provided URL is not compatible with HTTP connection: ${t}`);
        this.url = t, this.disableProviderPing = e;
    }
    get connected() {
        return this.isAvailable;
    }
    get connecting() {
        return this.registering;
    }
    on(t, e) {
        this.events.on(t, e);
    }
    once(t, e) {
        this.events.once(t, e);
    }
    off(t, e) {
        this.events.off(t, e);
    }
    removeListener(t, e) {
        this.events.removeListener(t, e);
    }
    async open(t = this.url) {
        await this.register(t);
    }
    async close() {
        if (!this.isAvailable) throw new Error("Connection already closed");
        this.onClose();
    }
    async send(t) {
        this.isAvailable || await this.register();
        try {
            const e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeJsonStringify"])(t), s = await (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$cross$2d$fetch$2f$dist$2f$node$2d$ponyfill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(this.url, v(p({}, d), {
                body: e
            }))).json();
            this.onPayload({
                data: s
            });
        } catch (e) {
            this.onError(t.id, e);
        }
    }
    async register(t = this.url) {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$url$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isHttpUrl"])(t)) throw new Error(`Provided URL is not compatible with HTTP connection: ${t}`);
        if (this.registering) {
            const e = this.events.getMaxListeners();
            return (this.events.listenerCount("register_error") >= e || this.events.listenerCount("open") >= e) && this.events.setMaxListeners(e + 1), new Promise((s, i)=>{
                this.events.once("register_error", (n)=>{
                    this.resetMaxListeners(), i(n);
                }), this.events.once("open", ()=>{
                    if (this.resetMaxListeners(), typeof this.isAvailable > "u") return i(new Error("HTTP connection is missing or invalid"));
                    s();
                });
            });
        }
        this.url = t, this.registering = !0;
        try {
            if (!this.disableProviderPing) {
                const e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeJsonStringify"])({
                    id: 1,
                    jsonrpc: "2.0",
                    method: "test",
                    params: []
                });
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$cross$2d$fetch$2f$dist$2f$node$2d$ponyfill$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(t, v(p({}, d), {
                    body: e
                }));
            }
            this.onOpen();
        } catch (e) {
            const s = this.parseError(e);
            throw this.events.emit("register_error", s), this.onClose(), s;
        }
    }
    onOpen() {
        this.isAvailable = !0, this.registering = !1, this.events.emit("open");
    }
    onClose() {
        this.isAvailable = !1, this.registering = !1, this.events.emit("close");
    }
    onPayload(t) {
        if (typeof t.data > "u") return;
        const e = typeof t.data == "string" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["safeJsonParse"])(t.data) : t.data;
        this.events.emit("payload", e);
    }
    onError(t, e) {
        const s = this.parseError(e), i = s.message || s.toString(), n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatJsonRpcError"])(t, i);
        this.events.emit("payload", n);
    }
    parseError(t, e = this.url) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$error$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseConnectionError"])(t, e, "HTTP");
    }
    resetMaxListeners() {
        this.events.getMaxListeners() > g && this.events.setMaxListeners(g);
    }
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/universal-provider/dist/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UniversalProvider",
    ()=>ns,
    "default",
    ()=>N
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$sign$2d$client$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/sign-client/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/utils/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-provider/dist/index.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/jsonrpc-http-connection/dist/index.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$events__$5b$external$5d$__$28$events$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/events [external] (events, cjs)");
;
;
;
;
;
;
function _(t) {
    return t == null || typeof t != "object" && typeof t != "function";
}
function Z(t) {
    return Object.getOwnPropertySymbols(t).filter((e)=>Object.prototype.propertyIsEnumerable.call(t, e));
}
function T(t) {
    return t == null ? t === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(t);
}
const Fe = "[object RegExp]", ee = "[object String]", te = "[object Number]", se = "[object Boolean]", ie = "[object Arguments]", He = "[object Symbol]", Ue = "[object Date]", Be = "[object Map]", Le = "[object Set]", Me = "[object Array]", ze = "[object ArrayBuffer]", Ge = "[object Object]", We = "[object DataView]", Je = "[object Uint8Array]", Ke = "[object Uint8ClampedArray]", Ve = "[object Uint16Array]", Ye = "[object Uint32Array]", Xe = "[object Int8Array]", ke = "[object Int16Array]", Qe = "[object Int32Array]", Ze = "[object Float32Array]", Te = "[object Float64Array]";
function x(t) {
    return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function et(t, e) {
    return y(t, void 0, t, new Map, e);
}
function y(t, e, s, i = new Map, r = void 0) {
    const a = r?.(t, e, s, i);
    if (a != null) return a;
    if (_(t)) return t;
    if (i.has(t)) return i.get(t);
    if (Array.isArray(t)) {
        const n = new Array(t.length);
        i.set(t, n);
        for(let c = 0; c < t.length; c++)n[c] = y(t[c], c, s, i, r);
        return Object.hasOwn(t, "index") && (n.index = t.index), Object.hasOwn(t, "input") && (n.input = t.input), n;
    }
    if (t instanceof Date) return new Date(t.getTime());
    if (t instanceof RegExp) {
        const n = new RegExp(t.source, t.flags);
        return n.lastIndex = t.lastIndex, n;
    }
    if (t instanceof Map) {
        const n = new Map;
        i.set(t, n);
        for (const [c, o] of t)n.set(c, y(o, c, s, i, r));
        return n;
    }
    if (t instanceof Set) {
        const n = new Set;
        i.set(t, n);
        for (const c of t)n.add(y(c, void 0, s, i, r));
        return n;
    }
    if (typeof Buffer < "u" && Buffer.isBuffer(t)) return t.subarray();
    if (x(t)) {
        const n = new (Object.getPrototypeOf(t)).constructor(t.length);
        i.set(t, n);
        for(let c = 0; c < t.length; c++)n[c] = y(t[c], c, s, i, r);
        return n;
    }
    if (t instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer) return t.slice(0);
    if (t instanceof DataView) {
        const n = new DataView(t.buffer.slice(0), t.byteOffset, t.byteLength);
        return i.set(t, n), m(n, t, s, i, r), n;
    }
    if (typeof File < "u" && t instanceof File) {
        const n = new File([
            t
        ], t.name, {
            type: t.type
        });
        return i.set(t, n), m(n, t, s, i, r), n;
    }
    if (t instanceof Blob) {
        const n = new Blob([
            t
        ], {
            type: t.type
        });
        return i.set(t, n), m(n, t, s, i, r), n;
    }
    if (t instanceof Error) {
        const n = new t.constructor;
        return i.set(t, n), n.message = t.message, n.name = t.name, n.stack = t.stack, n.cause = t.cause, m(n, t, s, i, r), n;
    }
    if (typeof t == "object" && tt(t)) {
        const n = Object.create(Object.getPrototypeOf(t));
        return i.set(t, n), m(n, t, s, i, r), n;
    }
    return t;
}
function m(t, e, s = t, i, r) {
    const a = [
        ...Object.keys(e),
        ...Z(e)
    ];
    for(let n = 0; n < a.length; n++){
        const c = a[n], o = Object.getOwnPropertyDescriptor(t, c);
        (o == null || o.writable) && (t[c] = y(e[c], c, s, i, r));
    }
}
function tt(t) {
    switch(T(t)){
        case ie:
        case Me:
        case ze:
        case We:
        case se:
        case Ue:
        case Ze:
        case Te:
        case Xe:
        case ke:
        case Qe:
        case Be:
        case te:
        case Ge:
        case Fe:
        case Le:
        case ee:
        case He:
        case Je:
        case Ke:
        case Ve:
        case Ye:
            return !0;
        default:
            return !1;
    }
}
function st(t, e) {
    return et(t, (s, i, r, a)=>{
        const n = e?.(s, i, r, a);
        if (n != null) return n;
        if (typeof t == "object") switch(Object.prototype.toString.call(t)){
            case te:
            case ee:
            case se:
                {
                    const c = new t.constructor(t?.valueOf());
                    return m(c, t), c;
                }
            case ie:
                {
                    const c = {};
                    return m(c, t), c.length = t.length, c[Symbol.iterator] = t[Symbol.iterator], c;
                }
            default:
                return;
        }
    });
}
function ne(t) {
    return st(t);
}
function re(t) {
    return t !== null && typeof t == "object" && T(t) === "[object Arguments]";
}
function ae(t) {
    return typeof t == "object" && t !== null;
}
function it() {}
function nt(t) {
    return x(t);
}
function rt(t) {
    if (typeof t != "object" || t == null) return !1;
    if (Object.getPrototypeOf(t) === null) return !0;
    if (Object.prototype.toString.call(t) !== "[object Object]") {
        const s = t[Symbol.toStringTag];
        return s == null || !Object.getOwnPropertyDescriptor(t, Symbol.toStringTag)?.writable ? !1 : t.toString() === `[object ${s}]`;
    }
    let e = t;
    for(; Object.getPrototypeOf(e) !== null;)e = Object.getPrototypeOf(e);
    return Object.getPrototypeOf(t) === e;
}
function at(t) {
    if (_(t)) return t;
    if (Array.isArray(t) || x(t) || t instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer) return t.slice(0);
    const e = Object.getPrototypeOf(t), s = e.constructor;
    if (t instanceof Date || t instanceof Map || t instanceof Set) return new s(t);
    if (t instanceof RegExp) {
        const i = new s(t);
        return i.lastIndex = t.lastIndex, i;
    }
    if (t instanceof DataView) return new s(t.buffer.slice(0));
    if (t instanceof Error) {
        const i = new s(t.message);
        return i.stack = t.stack, i.name = t.name, i.cause = t.cause, i;
    }
    if (typeof File < "u" && t instanceof File) return new s([
        t
    ], t.name, {
        type: t.type,
        lastModified: t.lastModified
    });
    if (typeof t == "object") {
        const i = Object.create(e);
        return Object.assign(i, t);
    }
    return t;
}
function ct(t, ...e) {
    const s = e.slice(0, -1), i = e[e.length - 1];
    let r = t;
    for(let a = 0; a < s.length; a++){
        const n = s[a];
        r = $(r, n, i, new Map);
    }
    return r;
}
function $(t, e, s, i) {
    if (_(t) && (t = Object(t)), e == null || typeof e != "object") return t;
    if (i.has(e)) return at(i.get(e));
    if (i.set(e, t), Array.isArray(e)) {
        e = e.slice();
        for(let a = 0; a < e.length; a++)e[a] = e[a] ?? void 0;
    }
    const r = [
        ...Object.keys(e),
        ...Z(e)
    ];
    for(let a = 0; a < r.length; a++){
        const n = r[a];
        let c = e[n], o = t[n];
        if (re(c) && (c = {
            ...c
        }), re(o) && (o = {
            ...o
        }), typeof Buffer < "u" && Buffer.isBuffer(c) && (c = ne(c)), Array.isArray(c)) if (typeof o == "object" && o != null) {
            const l = [], p = Reflect.ownKeys(o);
            for(let f = 0; f < p.length; f++){
                const u = p[f];
                l[u] = o[u];
            }
            o = l;
        } else o = [];
        const h = s(o, c, n, t, e, i);
        h != null ? t[n] = h : Array.isArray(c) || ae(o) && ae(c) ? t[n] = $(o, c, s, i) : o == null && rt(c) ? t[n] = $({}, c, s, i) : o == null && nt(c) ? t[n] = ne(c) : (o === void 0 || c !== void 0) && (t[n] = c);
    }
    return t;
}
function ot(t, ...e) {
    return ct(t, ...e, it);
}
const ce = "error", pt = "wss://relay.walletconnect.org", ht = "wc", oe = "universal_provider", A = `${ht}@2:${oe}:`, pe = "https://rpc.walletconnect.org/v1/", he = "generic", lt = `${pe}bundler`, v = "call_status", ut = 86400, F = {
    DEFAULT_CHAIN_CHANGED: "default_chain_changed"
};
var dt = Object.defineProperty, ft = Object.defineProperties, mt = Object.getOwnPropertyDescriptors, le = Object.getOwnPropertySymbols, gt = Object.prototype.hasOwnProperty, yt = Object.prototype.propertyIsEnumerable, ue = (t, e, s)=>e in t ? dt(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : t[e] = s, E = (t, e)=>{
    for(var s in e || (e = {}))gt.call(e, s) && ue(t, s, e[s]);
    if (le) for (var s of le(e))yt.call(e, s) && ue(t, s, e[s]);
    return t;
}, vt = (t, e)=>ft(t, mt(e));
function de(t, e, s) {
    var i;
    const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseChainId"])(t);
    return ((i = e.rpcMap) == null ? void 0 : i[r.reference]) || `${pe}?chainId=${r.namespace}:${r.reference}&projectId=${s}`;
}
function wt(t) {
    return t.includes(":") ? t.split(":")[1] : t;
}
function fe(t) {
    return t.map((e)=>`${e.split(":")[0]}:${e.split(":")[1]}`);
}
function bt(t, e) {
    const s = Object.keys(e.namespaces).filter((r)=>r.includes(t));
    if (!s.length) return [];
    const i = [];
    return s.forEach((r)=>{
        const a = e.namespaces[r].accounts;
        i.push(...a);
    }), i;
}
function me(t) {
    return Object.fromEntries(Object.entries(t).filter(([e, s])=>{
        var i, r;
        return ((i = s?.chains) == null ? void 0 : i.length) && ((r = s?.chains) == null ? void 0 : r.length) > 0;
    }));
}
function C(t = {}, e = {}) {
    const s = me(ge(t)), i = me(ge(e));
    return ot(s, i);
}
function ge(t) {
    var e, s, i, r, a;
    const n = {};
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidObject"])(t)) return n;
    for (const [c, o] of Object.entries(t)){
        const h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCaipNamespace"])(c) ? [
            c
        ] : o.chains, l = o.methods || [], p = o.events || [], f = o.rpcMap || {}, u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(c);
        n[u] = vt(E(E({}, n[u]), o), {
            chains: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeArrays"])(h, (e = n[u]) == null ? void 0 : e.chains),
            methods: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeArrays"])(l, (s = n[u]) == null ? void 0 : s.methods),
            events: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeArrays"])(p, (i = n[u]) == null ? void 0 : i.events)
        }), ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidObject"])(f) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidObject"])(((r = n[u]) == null ? void 0 : r.rpcMap) || {})) && (n[u].rpcMap = E(E({}, f), (a = n[u]) == null ? void 0 : a.rpcMap));
    }
    return n;
}
function ye(t) {
    return t.includes(":") ? t.split(":")[2] : t;
}
function ve(t) {
    const e = {};
    for (const [s, i] of Object.entries(t)){
        const r = i.methods || [], a = i.events || [], n = i.accounts || [], c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCaipNamespace"])(s) ? [
            s
        ] : i.chains ? i.chains : fe(i.accounts);
        e[s] = {
            chains: c,
            methods: r,
            events: a,
            accounts: n
        };
    }
    return e;
}
function H(t) {
    return typeof t == "number" ? t : t.includes("0x") ? parseInt(t, 16) : (t = t.includes(":") ? t.split(":")[1] : t, isNaN(Number(t)) ? t : Number(t));
}
function Pt(t) {
    try {
        const e = JSON.parse(t);
        return typeof e == "object" && e !== null && !Array.isArray(e);
    } catch  {
        return !1;
    }
}
const we = {}, w = (t)=>we[t], U = (t, e)=>{
    we[t] = e;
};
var Ot = Object.defineProperty, be = Object.getOwnPropertySymbols, It = Object.prototype.hasOwnProperty, St = Object.prototype.propertyIsEnumerable, Pe = (t, e, s)=>e in t ? Ot(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : t[e] = s, Oe = (t, e)=>{
    for(var s in e || (e = {}))It.call(e, s) && Pe(t, s, e[s]);
    if (be) for (var s of be(e))St.call(e, s) && Pe(t, s, e[s]);
    return t;
};
const Ie = "eip155", $t = [
    "atomic",
    "flow-control",
    "paymasterService",
    "sessionKeys",
    "auxiliaryFunds"
], At = (t)=>t && t.startsWith("0x") ? BigInt(t).toString(10) : t, B = (t)=>t && t.startsWith("0x") ? t : `0x${BigInt(t).toString(16)}`, Se = (t)=>Object.keys(t).filter((e)=>$t.includes(e)).reduce((e, s)=>(e[s] = Et(t[s]), e), {}), Et = (t)=>typeof t == "string" && Pt(t) ? JSON.parse(t) : t, Ct = (t, e, s)=>{
    const { sessionProperties: i = {}, scopedProperties: r = {} } = t, a = {};
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidObject"])(r) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidObject"])(i)) return;
    const n = Se(i);
    for (const c of s){
        const o = At(c);
        if (!o) continue;
        a[B(o)] = n;
        const h = r?.[`${Ie}:${o}`];
        if (h) {
            const l = h?.[`${Ie}:${o}:${e}`];
            a[B(o)] = Oe(Oe({}, a[B(o)]), Se(l || h));
        }
    }
    for (const [c, o] of Object.entries(a))Object.keys(o).length === 0 && delete a[c];
    return Object.keys(a).length > 0 ? a : void 0;
};
var jt = Object.defineProperty, Nt = (t, e, s)=>e in t ? jt(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : t[e] = s, qt = (t, e, s)=>Nt(t, typeof e != "symbol" ? e + "" : e, s);
let L;
class J {
    constructor(e){
        qt(this, "storage"), this.storage = e;
    }
    async getItem(e) {
        return await this.storage.getItem(e);
    }
    async setItem(e, s) {
        return await this.storage.setItem(e, s);
    }
    async removeItem(e) {
        return await this.storage.removeItem(e);
    }
    static getStorage(e) {
        return L || (L = new J(e)), L;
    }
}
var Dt = Object.defineProperty, Rt = Object.defineProperties, _t = Object.getOwnPropertyDescriptors, $e = Object.getOwnPropertySymbols, xt = Object.prototype.hasOwnProperty, Ft = Object.prototype.propertyIsEnumerable, Ae = (t, e, s)=>e in t ? Dt(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : t[e] = s, Ht = (t, e)=>{
    for(var s in e || (e = {}))xt.call(e, s) && Ae(t, s, e[s]);
    if ($e) for (var s of $e(e))Ft.call(e, s) && Ae(t, s, e[s]);
    return t;
}, Ut = (t, e)=>Rt(t, _t(e));
async function Bt(t, e) {
    const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseChainId"])(t.result.capabilities.caip345.caip2), i = t.result.capabilities.caip345.transactionHashes, r = await Promise.allSettled(i.map((p)=>Lt(s.reference, p, e))), a = r.filter((p)=>p.status === "fulfilled").map((p)=>p.value).filter((p)=>p);
    r.filter((p)=>p.status === "rejected").forEach((p)=>console.warn("Failed to fetch transaction receipt:", p.reason));
    const n = !a.length || a.some((p)=>!p), c = a.every((p)=>p?.status === "0x1"), o = a.every((p)=>p?.status === "0x0"), h = a.some((p)=>p?.status === "0x0");
    let l;
    return n ? l = 100 : c ? l = 200 : o ? l = 500 : h && (l = 600), {
        id: t.result.id,
        version: t.request.version,
        atomic: t.request.atomicRequired,
        chainId: t.request.chainId,
        capabilities: t.result.capabilities,
        receipts: a,
        status: l
    };
}
async function Lt(t, e, s) {
    return await s(parseInt(t)).request((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatJsonRpcRequest"])("eth_getTransactionReceipt", [
        e
    ]));
}
async function Mt({ sendCalls: t, storage: e }) {
    const s = await e.getItem(v);
    await e.setItem(v, Ut(Ht({}, s), {
        [t.result.id]: {
            request: t.request,
            result: t.result,
            expiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calcExpiry"])(ut)
        }
    }));
}
async function zt({ resultId: t, storage: e }) {
    const s = await e.getItem(v);
    if (s) {
        delete s[t], await e.setItem(v, s);
        for(const i in s)(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isExpired"])(s[i].expiry) && delete s[i];
        await e.setItem(v, s);
    }
}
async function Gt({ resultId: t, storage: e }) {
    const s = await e.getItem(v), i = s?.[t];
    if (i && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isExpired"])(i.expiry)) return i;
    await zt({
        resultId: t,
        storage: e
    });
}
var Wt = Object.defineProperty, Jt = Object.defineProperties, Kt = Object.getOwnPropertyDescriptors, Ee = Object.getOwnPropertySymbols, Vt = Object.prototype.hasOwnProperty, Yt = Object.prototype.propertyIsEnumerable, M = (t, e, s)=>e in t ? Wt(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : t[e] = s, z = (t, e)=>{
    for(var s in e || (e = {}))Vt.call(e, s) && M(t, s, e[s]);
    if (Ee) for (var s of Ee(e))Yt.call(e, s) && M(t, s, e[s]);
    return t;
}, G = (t, e)=>Jt(t, Kt(e)), g = (t, e, s)=>M(t, typeof e != "symbol" ? e + "" : e, s);
class Xt {
    constructor(e){
        g(this, "name", "eip155"), g(this, "client"), g(this, "chainId"), g(this, "namespace"), g(this, "httpProviders"), g(this, "events"), g(this, "storage"), this.namespace = e.namespace, this.events = w("events"), this.client = w("client"), this.httpProviders = this.createHttpProviders(), this.chainId = parseInt(this.getDefaultChain()), this.storage = J.getStorage(this.client.core.storage);
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
    setDefaultChain(e, s) {
        this.httpProviders[e] || this.setHttpProvider(parseInt(e), s);
        const i = this.chainId;
        this.chainId = parseInt(e), this.events.emit(F.DEFAULT_CHAIN_CHANGED, {
            currentCaipChainId: `${this.name}:${e}`,
            previousCaipChainId: `${this.name}:${i}`
        });
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
    createHttpProvider(e, s) {
        const i = s || de(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HttpConnection"](i, w("disableProviderPing")));
    }
    setHttpProvider(e, s) {
        const i = this.createHttpProvider(e, s);
        i && (this.httpProviders[e] = i);
    }
    createHttpProviders() {
        const e = {};
        return this.namespace.chains.forEach((s)=>{
            var i;
            const r = parseInt(wt(s));
            e[r] = this.createHttpProvider(r, (i = this.namespace.rpcMap) == null ? void 0 : i[s]);
        }), e;
    }
    getAccounts() {
        const e = this.namespace.accounts;
        return e ? [
            ...new Set(e.filter((s)=>s.split(":")[1] === this.chainId.toString()).map((s)=>s.split(":")[2]))
        ] : [];
    }
    getHttpProvider(e) {
        const s = e || this.chainId;
        return this.httpProviders[s] || (this.httpProviders = G(z({}, this.httpProviders), {
            [s]: this.createHttpProvider(s)
        }), this.httpProviders[s]);
    }
    async handleSwitchChain(e) {
        var s, i;
        let r = e.request.params ? (s = e.request.params[0]) == null ? void 0 : s.chainId : "0x0";
        r = r.startsWith("0x") ? r : `0x${r}`;
        const a = parseInt(r, 16);
        if (this.isChainApproved(a)) this.setDefaultChain(`${a}`);
        else if (this.namespace.methods.includes("wallet_switchEthereumChain")) await this.client.request({
            topic: e.topic,
            request: {
                method: e.request.method,
                params: [
                    {
                        chainId: r
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
        var s, i, r, a, n;
        const c = (i = (s = e.request) == null ? void 0 : s.params) == null ? void 0 : i[0], o = ((a = (r = e.request) == null ? void 0 : r.params) == null ? void 0 : a[1]) || [];
        if (!c) throw new Error("Missing address parameter in `wallet_getCapabilities` request");
        const h = this.client.session.get(e.topic), l = ((n = h?.sessionProperties) == null ? void 0 : n.capabilities) || {}, p = `${c}${o.join(",")}`, f = l?.[p];
        if (f) return f;
        let u;
        try {
            u = Ct(h, c, o);
        } catch (q) {
            console.warn("Failed to extract capabilities from session", q);
        }
        if (u) return u;
        const K = await this.client.request(e);
        try {
            await this.client.session.update(e.topic, {
                sessionProperties: G(z({}, h.sessionProperties || {}), {
                    capabilities: G(z({}, l || {}), {
                        [p]: K
                    })
                })
            });
        } catch (q) {
            console.warn("Failed to update session with capabilities", q);
        }
        return K;
    }
    async getCallStatus(e) {
        var s, i, r;
        const a = this.client.session.get(e.topic), n = (s = a.sessionProperties) == null ? void 0 : s.bundler_name;
        if (n) {
            const h = this.getBundlerUrl(e.chainId, n);
            try {
                return await this.getUserOperationReceipt(h, e);
            } catch (l) {
                console.warn("Failed to fetch call status from bundler", l, h);
            }
        }
        const c = (i = a.sessionProperties) == null ? void 0 : i.bundler_url;
        if (c) try {
            return await this.getUserOperationReceipt(c, e);
        } catch (h) {
            console.warn("Failed to fetch call status from custom bundler", h, c);
        }
        const o = await Gt({
            resultId: (r = e.request.params) == null ? void 0 : r[0],
            storage: this.storage
        });
        if (o) try {
            return await Bt(o, this.getHttpProvider.bind(this));
        } catch (h) {
            console.warn("Failed to fetch call status from stored send calls", h, o);
        }
        if (this.namespace.methods.includes(e.request.method)) return await this.client.request(e);
        throw new Error("Fetching call status not approved by the wallet.");
    }
    async getUserOperationReceipt(e, s) {
        var i;
        const r = new URL(e), a = await fetch(r, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatJsonRpcRequest"])("eth_getUserOperationReceipt", [
                (i = s.request.params) == null ? void 0 : i[0]
            ]))
        });
        if (!a.ok) throw new Error(`Failed to fetch user operation receipt - ${a.status}`);
        return await a.json();
    }
    getBundlerUrl(e, s) {
        return `${lt}?projectId=${this.client.core.projectId}&chainId=${e}&bundler=${s}`;
    }
    async sendCalls(e) {
        var s, i, r;
        const a = await this.client.request(e), n = (s = e.request.params) == null ? void 0 : s[0], c = a?.id, o = a?.capabilities || {}, h = (i = o?.caip345) == null ? void 0 : i.caip2, l = (r = o?.caip345) == null ? void 0 : r.transactionHashes;
        return !c || !h || !(l != null && l.length) || await Mt({
            sendCalls: {
                request: n,
                result: a
            },
            storage: this.storage
        }), a;
    }
}
var kt = Object.defineProperty, Qt = (t, e, s)=>e in t ? kt(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : t[e] = s, b = (t, e, s)=>Qt(t, typeof e != "symbol" ? e + "" : e, s);
class Zt {
    constructor(e){
        b(this, "name", he), b(this, "client"), b(this, "httpProviders"), b(this, "events"), b(this, "namespace"), b(this, "chainId"), this.namespace = e.namespace, this.events = w("events"), this.client = w("client"), this.chainId = this.getDefaultChain(), this.name = this.getNamespaceName(), this.httpProviders = this.createHttpProviders();
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
    setDefaultChain(e, s) {
        this.httpProviders[e] || this.setHttpProvider(e, s);
        const i = this.chainId;
        this.chainId = e, this.events.emit(F.DEFAULT_CHAIN_CHANGED, {
            currentCaipChainId: `${this.name}:${e}`,
            previousCaipChainId: `${this.name}:${i}`
        });
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
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseChainId"])(e).namespace;
    }
    getAccounts() {
        const e = this.namespace.accounts;
        return e ? [
            ...new Set(e.filter((s)=>s.split(":")[1] === this.chainId.toString()).map((s)=>s.split(":")[2]))
        ] : [];
    }
    createHttpProviders() {
        var e, s;
        const i = {};
        return (s = (e = this.namespace) == null ? void 0 : e.accounts) == null || s.forEach((r)=>{
            var a, n;
            const c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseChainId"])(r), o = (n = (a = this.namespace) == null ? void 0 : a.rpcMap) == null ? void 0 : n[`${c.namespace}:${c.reference}`];
            i[c.reference] = this.createHttpProvider(r, o);
        }), i;
    }
    getHttpProvider(e) {
        const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseChainId"])(e).reference, i = this.httpProviders[s];
        if (typeof i > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
        return i;
    }
    setHttpProvider(e, s) {
        const i = this.createHttpProvider(e, s);
        i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, s) {
        const i = s || de(e, this.namespace, this.client.core.projectId);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](i, w("disableProviderPing")));
    }
}
var Tt = Object.defineProperty, es = Object.defineProperties, ts = Object.getOwnPropertyDescriptors, Ce = Object.getOwnPropertySymbols, ss = Object.prototype.hasOwnProperty, is = Object.prototype.propertyIsEnumerable, W = (t, e, s)=>e in t ? Tt(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : t[e] = s, S = (t, e)=>{
    for(var s in e || (e = {}))ss.call(e, s) && W(t, s, e[s]);
    if (Ce) for (var s of Ce(e))is.call(e, s) && W(t, s, e[s]);
    return t;
}, j = (t, e)=>es(t, ts(e)), d = (t, e, s)=>W(t, typeof e != "symbol" ? e + "" : e, s);
class N {
    constructor(e){
        d(this, "client"), d(this, "namespaces"), d(this, "optionalNamespaces"), d(this, "sessionProperties"), d(this, "scopedProperties"), d(this, "events", new __TURBOPACK__imported__module__$5b$externals$5d2f$events__$5b$external$5d$__$28$events$2c$__cjs$29$__["default"]), d(this, "rpcProviders", {}), d(this, "session"), d(this, "providerOpts"), d(this, "logger"), d(this, "uri"), d(this, "disableProviderPing", !1);
        var s, i;
        this.providerOpts = e, this.logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createLogger"])({
            logger: (s = e.logger) != null ? s : ce,
            name: (i = this.providerOpts.name) != null ? i : oe
        }), this.disableProviderPing = e?.disableProviderPing || !1;
    }
    static async init(e) {
        const s = new N(e);
        return await s.initialize(), s;
    }
    async request(e, s, i) {
        const [r, a] = this.validateChain(s);
        if (!this.session) throw new Error("Please call connect() before request()");
        return await this.getProvider(r).request({
            request: S({}, e),
            chainId: `${r}:${a}`,
            topic: this.session.topic,
            expiry: i
        });
    }
    sendAsync(e, s, i, r) {
        const a = new Date().getTime();
        this.request(e, i, r).then((n)=>s(null, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatJsonRpcResult"])(a, n))).catch((n)=>s(n, void 0));
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
            reason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSdkError"])("USER_DISCONNECTED")
        }), await this.cleanup();
    }
    async connect(e) {
        if (!this.client) throw new Error("Sign Client not initialized");
        if (this.setNamespaces(e), this.cleanupPendingPairings(), !e.skipPairing) return await this.pair(e.pairingTopic);
    }
    async authenticate(e, s) {
        if (!this.client) throw new Error("Sign Client not initialized");
        this.setNamespaces(e), await this.cleanupPendingPairings();
        const { uri: i, response: r } = await this.client.authenticate(e, s);
        i && (this.uri = i, this.events.emit("display_uri", i));
        const a = await r();
        if (this.session = a.session, this.session) {
            const n = ve(this.session.namespaces);
            this.namespaces = C(this.namespaces, n), await this.persist("namespaces", this.namespaces), this.onConnect();
        }
        return a;
    }
    on(e, s) {
        this.events.on(e, s);
    }
    once(e, s) {
        this.events.once(e, s);
    }
    removeListener(e, s) {
        this.events.removeListener(e, s);
    }
    off(e, s) {
        this.events.off(e, s);
    }
    get isWalletConnect() {
        return !0;
    }
    async pair(e) {
        const { uri: s, approval: i } = await this.client.connect({
            pairingTopic: e,
            requiredNamespaces: this.namespaces,
            optionalNamespaces: this.optionalNamespaces,
            sessionProperties: this.sessionProperties,
            scopedProperties: this.scopedProperties
        });
        s && (this.uri = s, this.events.emit("display_uri", s));
        const r = await i();
        this.session = r;
        const a = ve(r.namespaces);
        return this.namespaces = C(this.namespaces, a), await this.persist("namespaces", this.namespaces), await this.persist("optionalNamespaces", this.optionalNamespaces), this.onConnect(), this.session;
    }
    setDefaultChain(e, s) {
        try {
            if (!this.session) return;
            const [i, r] = this.validateChain(e);
            this.getProvider(i).setDefaultChain(r, s);
        } catch (i) {
            if (!/Please call connect/.test(i.message)) throw i;
        }
    }
    async cleanupPendingPairings(e = {}) {
        try {
            this.logger.info("Cleaning up inactive pairings...");
            const s = this.client.pairing.getAll();
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidArray"])(s)) return;
            for (const i of s)e.deletePairings ? this.client.core.expirer.set(i.topic, 0) : await this.client.core.relayer.subscriber.unsubscribe(i.topic);
            this.logger.info(`Inactive pairings cleared: ${s.length}`);
        } catch (s) {
            this.logger.warn(s, "Failed to cleanup pending pairings");
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
        var e, s;
        if (this.client = this.providerOpts.client || await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$sign$2d$client$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SignClient"].init({
            core: this.providerOpts.core,
            logger: this.providerOpts.logger || ce,
            relayUrl: this.providerOpts.relayUrl || pt,
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
            throw this.logger.error(i, "Failed to get session"), new Error(`The provided session: ${(s = (e = this.providerOpts) == null ? void 0 : e.session) == null ? void 0 : s.topic} doesn't exist in the Sign client`);
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
            ...new Set(Object.keys(this.session.namespaces).map((s)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(s)))
        ];
        U("client", this.client), U("events", this.events), U("disableProviderPing", this.disableProviderPing), e.forEach((s)=>{
            if (!this.session) return;
            const i = bt(s, this.session);
            if (i?.length === 0) return;
            const r = fe(i), a = C(this.namespaces, this.optionalNamespaces), n = j(S({}, a[s]), {
                accounts: i,
                chains: r
            });
            switch(s){
                case "eip155":
                    this.rpcProviders[s] = new Xt({
                        namespace: n
                    });
                    break;
                default:
                    this.rpcProviders[s] = new Zt({
                        namespace: n
                    });
            }
        });
    }
    registerEventListeners() {
        if (typeof this.client > "u") throw new Error("Sign Client is not initialized");
        this.client.on("session_ping", (e)=>{
            var s;
            const { topic: i } = e;
            i === ((s = this.session) == null ? void 0 : s.topic) && this.events.emit("session_ping", e);
        }), this.client.on("session_event", (e)=>{
            var s;
            const { params: i, topic: r } = e;
            if (r !== ((s = this.session) == null ? void 0 : s.topic)) return;
            const { event: a } = i;
            if (a.name === "accountsChanged") {
                const n = a.data;
                n && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidArray"])(n) && this.events.emit("accountsChanged", n.map(ye));
            } else if (a.name === "chainChanged") {
                const n = i.chainId, c = i.event.data, o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(n), h = H(n) !== H(c) ? `${o}:${H(c)}` : n;
                this.onChainChanged({
                    currentCaipChainId: h
                });
            } else this.events.emit(a.name, a.data);
            this.events.emit("session_event", e);
        }), this.client.on("session_update", ({ topic: e, params: s })=>{
            var i, r;
            if (e !== ((i = this.session) == null ? void 0 : i.topic)) return;
            const { namespaces: a } = s, n = (r = this.client) == null ? void 0 : r.session.get(e);
            this.session = j(S({}, n), {
                namespaces: a
            }), this.onSessionUpdate(), this.events.emit("session_update", {
                topic: e,
                params: s
            });
        }), this.client.on("session_delete", async (e)=>{
            var s;
            e.topic === ((s = this.session) == null ? void 0 : s.topic) && (await this.cleanup(), this.events.emit("session_delete", e), this.events.emit("disconnect", j(S({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSdkError"])("USER_DISCONNECTED")), {
                data: e.topic
            })));
        }), this.on(F.DEFAULT_CHAIN_CHANGED, (e)=>{
            this.onChainChanged(j(S({}, e), {
                internal: !0
            }));
        });
    }
    getProvider(e) {
        return this.rpcProviders[e] || this.rpcProviders[he];
    }
    onSessionUpdate() {
        Object.keys(this.rpcProviders).forEach((e)=>{
            var s;
            this.getProvider(e).updateNamespace((s = this.session) == null ? void 0 : s.namespaces[e]);
        });
    }
    setNamespaces(e) {
        const { namespaces: s = {}, optionalNamespaces: i = {}, sessionProperties: r, scopedProperties: a } = e;
        this.optionalNamespaces = C(s, i), this.sessionProperties = r, this.scopedProperties = a;
    }
    validateChain(e) {
        const [s, i] = e?.split(":") || [
            "",
            ""
        ];
        if (!this.namespaces || !Object.keys(this.namespaces).length) return [
            s,
            i
        ];
        if (s && !Object.keys(this.namespaces || {}).map((n)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(n)).includes(s)) throw new Error(`Namespace '${s}' is not configured. Please call connect() first with namespace config.`);
        if (s && i) return [
            s,
            i
        ];
        const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(Object.keys(this.namespaces)[0]), a = this.rpcProviders[r].getDefaultChain();
        return [
            r,
            a
        ];
    }
    async requestAccounts() {
        const [e] = this.validateChain();
        return await this.getProvider(e).requestAccounts();
    }
    async onChainChanged({ currentCaipChainId: e, previousCaipChainId: s, internal: i = !1 }) {
        if (!this.namespaces) return;
        const [r, a] = this.validateChain(e);
        a && (this.updateNamespaceChain(r, a), i ? (this.events.emit("chainChanged", a), this.emitAccountsChangedOnChainChange({
            namespace: r,
            currentCaipChainId: e,
            previousCaipChainId: s
        })) : this.getProvider(r).setDefaultChain(a), await this.persist("namespaces", this.namespaces));
    }
    emitAccountsChangedOnChainChange({ namespace: e, currentCaipChainId: s, previousCaipChainId: i }) {
        var r, a;
        try {
            if (i === s) return;
            const n = (a = (r = this.session) == null ? void 0 : r.namespaces[e]) == null ? void 0 : a.accounts;
            if (!n) return;
            const c = n.filter((o)=>o.includes(`${s}:`)).map(ye);
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidArray"])(c)) return;
            this.events.emit("accountsChanged", c);
        } catch (n) {
            this.logger.warn(n, "Failed to emit accountsChanged on chain change");
        }
    }
    updateNamespaceChain(e, s) {
        if (!this.namespaces) return;
        const i = this.namespaces[e] ? e : `${e}:${s}`, r = {
            chains: [],
            methods: [],
            events: [],
            defaultChain: s
        };
        this.namespaces[i] ? this.namespaces[i] && (this.namespaces[i].defaultChain = s) : this.namespaces[i] = r;
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
    async persist(e, s) {
        var i;
        const r = ((i = this.session) == null ? void 0 : i.topic) || "";
        await this.client.core.storage.setItem(`${A}/${e}${r}`, s);
    }
    async getFromStore(e) {
        var s;
        const i = ((s = this.session) == null ? void 0 : s.topic) || "";
        return await this.client.core.storage.getItem(`${A}/${e}${i}`);
    }
    async deleteFromStore(e) {
        var s;
        const i = ((s = this.session) == null ? void 0 : s.topic) || "";
        await this.client.core.storage.removeItem(`${A}/${e}${i}`);
    }
    async cleanupStorage() {
        var e;
        try {
            if (((e = this.client) == null ? void 0 : e.session.length) > 0) return;
            const s = await this.client.core.storage.getKeys();
            for (const i of s)i.startsWith(A) && await this.client.core.storage.removeItem(i);
        } catch (s) {
            this.logger.warn(s, "Failed to cleanup storage");
        }
    }
}
const ns = N;
;
 //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/frontend/node_modules/@walletconnect/ethereum-provider/dist/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EthereumProvider",
    ()=>G,
    "OPTIONAL_EVENTS",
    ()=>P,
    "OPTIONAL_METHODS",
    ()=>A,
    "REQUIRED_EVENTS",
    ()=>C,
    "REQUIRED_METHODS",
    ()=>f,
    "default",
    ()=>E
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$events__$5b$external$5d$__$28$events$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/events [external] (events, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/utils/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$universal$2d$provider$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/universal-provider/dist/index.js [app-ssr] (ecmascript)");
;
;
;
const $ = "wc", k = "ethereum_provider", q = `${$}@2:${k}:`, U = "https://rpc.walletconnect.org/v1/", f = [
    "eth_sendTransaction",
    "personal_sign"
], A = [
    "eth_accounts",
    "eth_requestAccounts",
    "eth_sendRawTransaction",
    "eth_sign",
    "eth_signTransaction",
    "eth_signTypedData",
    "eth_signTypedData_v3",
    "eth_signTypedData_v4",
    "eth_sendTransaction",
    "personal_sign",
    "wallet_switchEthereumChain",
    "wallet_addEthereumChain",
    "wallet_getPermissions",
    "wallet_requestPermissions",
    "wallet_registerOnboarding",
    "wallet_watchAsset",
    "wallet_scanQRCode",
    "wallet_sendCalls",
    "wallet_getCapabilities",
    "wallet_getCallsStatus",
    "wallet_showCallsStatus"
], C = [
    "chainChanged",
    "accountsChanged"
], P = [
    "chainChanged",
    "accountsChanged",
    "message",
    "disconnect",
    "connect"
], D = async ()=>{
    const { createAppKit: s } = await __turbopack_context__.A("[project]/Desktop/frontend/node_modules/@reown/appkit/dist/esm/exports/core.js [app-ssr] (ecmascript, async loader)");
    return s;
};
var z = Object.defineProperty, L = Object.defineProperties, K = Object.getOwnPropertyDescriptors, M = Object.getOwnPropertySymbols, Q = Object.prototype.hasOwnProperty, V = Object.prototype.propertyIsEnumerable, _ = (s, t, e)=>t in s ? z(s, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e
    }) : s[t] = e, v = (s, t)=>{
    for(var e in t || (t = {}))Q.call(t, e) && _(s, e, t[e]);
    if (M) for (var e of M(t))V.call(t, e) && _(s, e, t[e]);
    return s;
}, w = (s, t)=>L(s, K(t)), p = (s, t, e)=>_(s, typeof t != "symbol" ? t + "" : t, e);
function I(s) {
    return Number(s[0].split(":")[1]);
}
function b(s) {
    return `0x${s.toString(16)}`;
}
function F(s) {
    const { chains: t, optionalChains: e, methods: n, optionalMethods: i, events: a, optionalEvents: r, rpcMap: u } = s;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidArray"])(t)) throw new Error("Invalid chains");
    const c = {
        chains: t,
        methods: n || f,
        events: a || C,
        rpcMap: v({}, t.length ? {
            [I(t)]: u[I(t)]
        } : {})
    }, l = a?.filter((d)=>!C.includes(d)), o = n?.filter((d)=>!f.includes(d));
    if (!e && !r && !i && !(l != null && l.length) && !(o != null && o.length)) return {
        required: t.length ? c : void 0
    };
    const m = l?.length && o?.length || !e, h = {
        chains: [
            ...new Set(m ? c.chains.concat(e || []) : e)
        ],
        methods: [
            ...new Set(c.methods.concat(i != null && i.length ? i : A))
        ],
        events: [
            ...new Set(c.events.concat(r != null && r.length ? r : P))
        ],
        rpcMap: u
    };
    return {
        required: t.length ? c : void 0,
        optional: e.length ? h : void 0
    };
}
class E {
    constructor(){
        p(this, "events", new __TURBOPACK__imported__module__$5b$externals$5d2f$events__$5b$external$5d$__$28$events$2c$__cjs$29$__["EventEmitter"]), p(this, "namespace", "eip155"), p(this, "accounts", []), p(this, "signer"), p(this, "chainId", 1), p(this, "modal"), p(this, "rpc"), p(this, "STORAGE_KEY", q), p(this, "on", (t, e)=>(this.events.on(t, e), this)), p(this, "once", (t, e)=>(this.events.once(t, e), this)), p(this, "removeListener", (t, e)=>(this.events.removeListener(t, e), this)), p(this, "off", (t, e)=>(this.events.off(t, e), this)), p(this, "parseAccount", (t)=>this.isCompatibleChainId(t) ? this.parseAccountId(t).address : t), this.signer = {}, this.rpc = {};
    }
    static async init(t) {
        const e = new E;
        return await e.initialize(t), e;
    }
    async request(t, e) {
        return await this.signer.request(t, this.formatChainId(this.chainId), e);
    }
    sendAsync(t, e, n) {
        this.signer.sendAsync(t, e, this.formatChainId(this.chainId), n);
    }
    get connected() {
        return this.signer.client ? this.signer.client.core.relayer.connected : !1;
    }
    get connecting() {
        return this.signer.client ? this.signer.client.core.relayer.connecting : !1;
    }
    async enable() {
        return this.session || await this.connect(), await this.request({
            method: "eth_requestAccounts"
        });
    }
    async connect(t) {
        var e;
        if (!this.signer.client) throw new Error("Provider not initialized. Call init() first");
        this.loadConnectOpts(t);
        const { required: n, optional: i } = F(this.rpc);
        try {
            const a = await new Promise(async (u, c)=>{
                var l, o;
                this.rpc.showQrModal && ((l = this.modal) == null || l.open(), (o = this.modal) == null || o.subscribeState((h)=>{
                    !h.open && !this.signer.session && (this.signer.abortPairingAttempt(), c(new Error("Connection request reset. Please try again.")));
                }));
                const m = t != null && t.scopedProperties ? {
                    [this.namespace]: t.scopedProperties
                } : void 0;
                await this.signer.connect(w(v({
                    namespaces: v({}, n && {
                        [this.namespace]: n
                    })
                }, i && {
                    optionalNamespaces: {
                        [this.namespace]: i
                    }
                }), {
                    pairingTopic: t?.pairingTopic,
                    scopedProperties: m
                })).then((h)=>{
                    u(h);
                }).catch((h)=>{
                    var d;
                    (d = this.modal) == null || d.showErrorMessage("Unable to connect"), c(new Error(h.message));
                });
            });
            if (!a) return;
            const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAccountsFromNamespaces"])(a.namespaces, [
                this.namespace
            ]);
            this.setChainIds(this.rpc.chains.length ? this.rpc.chains : r), this.setAccounts(r), this.events.emit("connect", {
                chainId: b(this.chainId)
            });
        } catch (a) {
            throw this.signer.logger.error(a), a;
        } finally{
            (e = this.modal) == null || e.close();
        }
    }
    async authenticate(t, e) {
        var n;
        if (!this.signer.client) throw new Error("Provider not initialized. Call init() first");
        this.loadConnectOpts({
            chains: t?.chains
        });
        try {
            const i = await new Promise(async (r, u)=>{
                var c, l;
                this.rpc.showQrModal && ((c = this.modal) == null || c.open(), (l = this.modal) == null || l.subscribeState((o)=>{
                    !o.open && !this.signer.session && (this.signer.abortPairingAttempt(), u(new Error("Connection request reset. Please try again.")));
                })), await this.signer.authenticate(w(v({}, t), {
                    chains: this.rpc.chains
                }), e).then((o)=>{
                    r(o);
                }).catch((o)=>{
                    var m;
                    (m = this.modal) == null || m.showErrorMessage("Unable to connect"), u(new Error(o.message));
                });
            }), a = i.session;
            if (a) {
                const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAccountsFromNamespaces"])(a.namespaces, [
                    this.namespace
                ]);
                this.setChainIds(this.rpc.chains.length ? this.rpc.chains : r), this.setAccounts(r), this.events.emit("connect", {
                    chainId: b(this.chainId)
                });
            }
            return i;
        } catch (i) {
            throw this.signer.logger.error(i), i;
        } finally{
            (n = this.modal) == null || n.close();
        }
    }
    async disconnect() {
        this.session && await this.signer.disconnect(), this.reset();
    }
    get isWalletConnect() {
        return !0;
    }
    get session() {
        return this.signer.session;
    }
    registerEventListeners() {
        this.signer.on("session_event", (t)=>{
            const { params: e } = t, { event: n } = e;
            n.name === "accountsChanged" ? (this.accounts = this.parseAccounts(n.data), this.events.emit("accountsChanged", this.accounts)) : n.name === "chainChanged" ? this.setChainId(this.formatChainId(n.data)) : this.events.emit(n.name, n.data), this.events.emit("session_event", t);
        }), this.signer.on("accountsChanged", (t)=>{
            this.accounts = this.parseAccounts(t), this.events.emit("accountsChanged", this.accounts);
        }), this.signer.on("chainChanged", (t)=>{
            const e = parseInt(t);
            this.chainId = e, this.events.emit("chainChanged", b(this.chainId)), this.persist();
        }), this.signer.on("session_update", (t)=>{
            this.events.emit("session_update", t);
        }), this.signer.on("session_delete", (t)=>{
            this.reset(), this.events.emit("session_delete", t), this.events.emit("disconnect", w(v({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSdkError"])("USER_DISCONNECTED")), {
                data: t.topic,
                name: "USER_DISCONNECTED"
            }));
        }), this.signer.on("display_uri", (t)=>{
            this.events.emit("display_uri", t);
        });
    }
    switchEthereumChain(t) {
        this.request({
            method: "wallet_switchEthereumChain",
            params: [
                {
                    chainId: t.toString(16)
                }
            ]
        });
    }
    isCompatibleChainId(t) {
        return typeof t == "string" ? t.startsWith(`${this.namespace}:`) : !1;
    }
    formatChainId(t) {
        return `${this.namespace}:${t}`;
    }
    parseChainId(t) {
        return Number(t.split(":")[1]);
    }
    setChainIds(t) {
        const e = t.filter((n)=>this.isCompatibleChainId(n)).map((n)=>this.parseChainId(n));
        e.length && (this.chainId = e[0], this.events.emit("chainChanged", b(this.chainId)), this.persist());
    }
    setChainId(t) {
        if (this.isCompatibleChainId(t)) {
            const e = this.parseChainId(t);
            this.chainId = e, this.switchEthereumChain(e);
        }
    }
    parseAccountId(t) {
        const [e, n, i] = t.split(":");
        return {
            chainId: `${e}:${n}`,
            address: i
        };
    }
    setAccounts(t) {
        this.accounts = t.filter((e)=>this.parseChainId(this.parseAccountId(e).chainId) === this.chainId).map((e)=>this.parseAccountId(e).address), this.events.emit("accountsChanged", this.accounts);
    }
    getRpcConfig(t) {
        var e, n;
        const i = (e = t?.chains) != null ? e : [], a = (n = t?.optionalChains) != null ? n : [], r = i.concat(a);
        if (!r.length) throw new Error("No chains specified in either `chains` or `optionalChains`");
        const u = i.length ? t?.methods || f : [], c = i.length ? t?.events || C : [], l = t?.optionalMethods || [], o = t?.optionalEvents || [], m = t?.rpcMap || this.buildRpcMap(r, t.projectId), h = t?.qrModalOptions || void 0;
        return {
            chains: i?.map((d)=>this.formatChainId(d)),
            optionalChains: a.map((d)=>this.formatChainId(d)),
            methods: u,
            events: c,
            optionalMethods: l,
            optionalEvents: o,
            rpcMap: m,
            showQrModal: !!(t != null && t.showQrModal),
            qrModalOptions: h,
            projectId: t.projectId,
            metadata: t.metadata
        };
    }
    buildRpcMap(t, e) {
        const n = {};
        return t.forEach((i)=>{
            n[i] = this.getRpcUrl(i, e);
        }), n;
    }
    async initialize(t) {
        var e;
        if (this.rpc = this.getRpcConfig(t), this.chainId = this.rpc.chains.length ? I(this.rpc.chains) : I(this.rpc.optionalChains), this.signer = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$universal$2d$provider$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UniversalProvider"].init({
            projectId: this.rpc.projectId,
            metadata: this.rpc.metadata,
            disableProviderPing: t.disableProviderPing,
            relayUrl: t.relayUrl,
            storage: t.storage,
            storageOptions: t.storageOptions,
            customStoragePrefix: t.customStoragePrefix,
            telemetryEnabled: t.telemetryEnabled,
            logger: t.logger
        }), this.registerEventListeners(), await this.loadPersistedSession(), this.rpc.showQrModal) {
            let n;
            try {
                const i = await D(), { convertWCMToAppKitOptions: a } = await Promise.resolve().then(function() {
                    return nt;
                }), r = a(w(v({}, this.rpc.qrModalOptions), {
                    chains: [
                        ...new Set([
                            ...this.rpc.chains,
                            ...this.rpc.optionalChains
                        ])
                    ],
                    metadata: this.rpc.metadata,
                    projectId: this.rpc.projectId
                }));
                if (!r.networks.length) throw new Error("No networks found for WalletConnect\xB7");
                n = i(w(v({}, r), {
                    universalProvider: this.signer,
                    manualWCControl: !0,
                    enableMobileFullScreen: ((e = this.rpc.qrModalOptions) == null ? void 0 : e.enableMobileFullScreen) === !0
                }));
            } catch (i) {
                throw console.warn(i), new Error("To use QR modal, please install @reown/appkit package");
            }
            if (n) try {
                this.modal = n;
            } catch (i) {
                throw this.signer.logger.error(i), new Error("Could not generate WalletConnectModal Instance");
            }
        }
    }
    loadConnectOpts(t) {
        if (!t) return;
        const { chains: e, optionalChains: n, rpcMap: i } = t;
        e && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidArray"])(e) && (this.rpc.chains = e.map((a)=>this.formatChainId(a)), e.forEach((a)=>{
            this.rpc.rpcMap[a] = i?.[a] || this.getRpcUrl(a);
        })), n && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidArray"])(n) && (this.rpc.optionalChains = [], this.rpc.optionalChains = n?.map((a)=>this.formatChainId(a)), n.forEach((a)=>{
            this.rpc.rpcMap[a] = i?.[a] || this.getRpcUrl(a);
        }));
    }
    getRpcUrl(t, e) {
        var n;
        return ((n = this.rpc.rpcMap) == null ? void 0 : n[t]) || `${U}?chainId=eip155:${t}&projectId=${e || this.rpc.projectId}`;
    }
    async loadPersistedSession() {
        if (this.session) try {
            const t = await this.signer.client.core.storage.getItem(`${this.STORAGE_KEY}/chainId`), e = this.session.namespaces[`${this.namespace}:${t}`] ? this.session.namespaces[`${this.namespace}:${t}`] : this.session.namespaces[this.namespace];
            this.setChainIds(t ? [
                this.formatChainId(t)
            ] : e?.accounts), this.setAccounts(e?.accounts);
        } catch (t) {
            this.signer.logger.error("Failed to load persisted session, clearing state..."), this.signer.logger.error(t), await this.disconnect().catch((e)=>this.signer.logger.warn(e));
        }
    }
    reset() {
        this.chainId = 1, this.accounts = [];
    }
    persist() {
        this.session && this.signer.client.core.storage.setItem(`${this.STORAGE_KEY}/chainId`, this.chainId);
    }
    parseAccounts(t) {
        return typeof t == "string" || t instanceof String ? [
            this.parseAccount(t)
        ] : t.map((e)=>this.parseAccount(e));
    }
}
const G = E;
var Y = Object.defineProperty, H = Object.defineProperties, B = Object.getOwnPropertyDescriptors, S = Object.getOwnPropertySymbols, X = Object.prototype.hasOwnProperty, J = Object.prototype.propertyIsEnumerable, T = (s, t, e)=>t in s ? Y(s, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: e
    }) : s[t] = e, R = (s, t)=>{
    for(var e in t || (t = {}))X.call(t, e) && T(s, e, t[e]);
    if (S) for (var e of S(t))J.call(t, e) && T(s, e, t[e]);
    return s;
}, Z = (s, t)=>H(s, B(t));
function tt(s) {
    if (s) return {
        "--w3m-font-family": s["--wcm-font-family"],
        "--w3m-accent": s["--wcm-accent-color"],
        "--w3m-color-mix": s["--wcm-background-color"],
        "--w3m-z-index": s["--wcm-z-index"] ? Number(s["--wcm-z-index"]) : void 0,
        "--w3m-qr-color": s["--wcm-accent-color"],
        "--w3m-font-size-master": s["--wcm-text-medium-regular-size"],
        "--w3m-border-radius-master": s["--wcm-container-border-radius"],
        "--w3m-color-mix-strength": 0
    };
}
const et = (s)=>{
    const [t, e] = s.split(":");
    return W({
        id: e,
        caipNetworkId: s,
        chainNamespace: t,
        name: "",
        nativeCurrency: {
            name: "",
            symbol: "",
            decimals: 8
        },
        rpcUrls: {
            default: {
                http: [
                    "https://rpc.walletconnect.org/v1"
                ]
            }
        }
    });
};
function st(s) {
    var t, e, n, i, a, r, u;
    const c = (t = s.chains) == null ? void 0 : t.map(et).filter(Boolean);
    if (c.length === 0) throw new Error("At least one chain must be specified");
    const l = c.find((m)=>{
        var h;
        return m.id === ((h = s.defaultChain) == null ? void 0 : h.id);
    }), o = {
        projectId: s.projectId,
        networks: c,
        themeMode: s.themeMode,
        themeVariables: tt(s.themeVariables),
        chainImages: s.chainImages,
        connectorImages: s.walletImages,
        defaultNetwork: l,
        metadata: Z(R({}, s.metadata), {
            name: ((e = s.metadata) == null ? void 0 : e.name) || "WalletConnect",
            description: ((n = s.metadata) == null ? void 0 : n.description) || "Connect to WalletConnect-compatible wallets",
            url: ((i = s.metadata) == null ? void 0 : i.url) || "https://walletconnect.org",
            icons: ((a = s.metadata) == null ? void 0 : a.icons) || [
                "https://walletconnect.org/walletconnect-logo.png"
            ]
        }),
        showWallets: !0,
        featuredWalletIds: s.explorerRecommendedWalletIds === "NONE" ? [] : Array.isArray(s.explorerRecommendedWalletIds) ? s.explorerRecommendedWalletIds : [],
        excludeWalletIds: s.explorerExcludedWalletIds === "ALL" ? [] : Array.isArray(s.explorerExcludedWalletIds) ? s.explorerExcludedWalletIds : [],
        enableEIP6963: !1,
        enableInjected: !1,
        enableCoinbase: !0,
        enableWalletConnect: !0,
        features: {
            email: !1,
            socials: !1
        }
    };
    if ((r = s.mobileWallets) != null && r.length || (u = s.desktopWallets) != null && u.length) {
        const m = [
            ...(s.mobileWallets || []).map((g)=>({
                    id: g.id,
                    name: g.name,
                    links: g.links
                })),
            ...(s.desktopWallets || []).map((g)=>({
                    id: g.id,
                    name: g.name,
                    links: {
                        native: g.links.native,
                        universal: g.links.universal
                    }
                }))
        ], h = [
            ...o.featuredWalletIds || [],
            ...o.excludeWalletIds || []
        ], d = m.filter((g)=>!h.includes(g.id));
        d.length && (o.customWallets = d);
    }
    return o;
}
function W(s) {
    return R({
        formatters: void 0,
        fees: void 0,
        serializers: void 0
    }, s);
}
var nt = Object.freeze({
    __proto__: null,
    convertWCMToAppKitOptions: st,
    defineChain: W
});
;
 //# sourceMappingURL=index.js.map
}),
];

//# sourceMappingURL=1b50e_%40walletconnect_c5615a80._.js.map