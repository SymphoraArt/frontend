module.exports = [
"[project]/Desktop/frontend/node_modules/proxy-compare/dist/index.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "affectedToPathList",
    ()=>affectedToPathList,
    "createProxy",
    ()=>createProxy,
    "getUntracked",
    ()=>getUntracked,
    "isChanged",
    ()=>isChanged,
    "markToTrack",
    ()=>markToTrack,
    "replaceNewProxy",
    ()=>replaceNewProxy,
    "trackMemo",
    ()=>trackMemo
]);
/* eslint @typescript-eslint/no-explicit-any: off */ // symbols
const TRACK_MEMO_SYMBOL = Symbol();
const GET_ORIGINAL_SYMBOL = Symbol();
// properties
const AFFECTED_PROPERTY = 'a';
const IS_TARGET_COPIED_PROPERTY = 'f';
const PROXY_PROPERTY = 'p';
const PROXY_CACHE_PROPERTY = 'c';
const TARGET_CACHE_PROPERTY = 't';
const HAS_KEY_PROPERTY = 'h';
const ALL_OWN_KEYS_PROPERTY = 'w';
const HAS_OWN_KEY_PROPERTY = 'o';
const KEYS_PROPERTY = 'k';
// function to create a new bare proxy
let newProxy = (target, handler)=>new Proxy(target, handler);
// get object prototype
const getProto = Object.getPrototypeOf;
const objectsToTrack = new WeakMap();
// check if obj is a plain object or an array
const isObjectToTrack = (obj)=>obj && (objectsToTrack.has(obj) ? objectsToTrack.get(obj) : getProto(obj) === Object.prototype || getProto(obj) === Array.prototype);
// check if it is object
const isObject = (x)=>typeof x === 'object' && x !== null;
// Properties that are both non-configurable and non-writable will break
// the proxy get trap when we try to return a recursive/child compare proxy
// from them. We can avoid this by making a copy of the target object with
// all descriptors marked as configurable, see `copyTargetObject`.
// See: https://github.com/dai-shi/proxy-compare/pull/8
const needsToCopyTargetObject = (obj)=>Object.values(Object.getOwnPropertyDescriptors(obj)).some((descriptor)=>!descriptor.configurable && !descriptor.writable);
// Make a copy with all descriptors marked as configurable.
const copyTargetObject = (obj)=>{
    if (Array.isArray(obj)) {
        // Arrays need a special way to copy
        return Array.from(obj);
    }
    // For non-array objects, we create a new object keeping the prototype
    // with changing all configurable options (otherwise, proxies will complain)
    const descriptors = Object.getOwnPropertyDescriptors(obj);
    Object.values(descriptors).forEach((desc)=>{
        desc.configurable = true;
    });
    return Object.create(getProto(obj), descriptors);
};
const createProxyHandler = (origObj, isTargetCopied)=>{
    const state = {
        [IS_TARGET_COPIED_PROPERTY]: isTargetCopied
    };
    let trackObject = false; // for trackMemo
    const recordUsage = (type, key)=>{
        if (!trackObject) {
            let used = state[AFFECTED_PROPERTY].get(origObj);
            if (!used) {
                used = {};
                state[AFFECTED_PROPERTY].set(origObj, used);
            }
            if (type === ALL_OWN_KEYS_PROPERTY) {
                used[ALL_OWN_KEYS_PROPERTY] = true;
            } else {
                let set = used[type];
                if (!set) {
                    set = new Set();
                    used[type] = set;
                }
                set.add(key);
            }
        }
    };
    const recordObjectAsUsed = ()=>{
        trackObject = true;
        state[AFFECTED_PROPERTY].delete(origObj);
    };
    const handler = {
        get (target, key) {
            if (key === GET_ORIGINAL_SYMBOL) {
                return origObj;
            }
            recordUsage(KEYS_PROPERTY, key);
            return createProxy(Reflect.get(target, key), state[AFFECTED_PROPERTY], state[PROXY_CACHE_PROPERTY], state[TARGET_CACHE_PROPERTY]);
        },
        has (target, key) {
            if (key === TRACK_MEMO_SYMBOL) {
                recordObjectAsUsed();
                return true;
            }
            recordUsage(HAS_KEY_PROPERTY, key);
            return Reflect.has(target, key);
        },
        getOwnPropertyDescriptor (target, key) {
            recordUsage(HAS_OWN_KEY_PROPERTY, key);
            return Reflect.getOwnPropertyDescriptor(target, key);
        },
        ownKeys (target) {
            recordUsage(ALL_OWN_KEYS_PROPERTY);
            return Reflect.ownKeys(target);
        }
    };
    if (isTargetCopied) {
        handler.set = handler.deleteProperty = ()=>false;
    }
    return [
        handler,
        state
    ];
};
const getOriginalObject = (obj)=>// unwrap proxy
    obj[GET_ORIGINAL_SYMBOL] || // otherwise
    obj;
const createProxy = (obj, affected, proxyCache, targetCache)=>{
    if (!isObjectToTrack(obj)) return obj;
    let targetAndCopied = targetCache && targetCache.get(obj);
    if (!targetAndCopied) {
        const target = getOriginalObject(obj);
        if (needsToCopyTargetObject(target)) {
            targetAndCopied = [
                target,
                copyTargetObject(target)
            ];
        } else {
            targetAndCopied = [
                target
            ];
        }
        targetCache === null || targetCache === void 0 ? void 0 : targetCache.set(obj, targetAndCopied);
    }
    const [target, copiedTarget] = targetAndCopied;
    let handlerAndState = proxyCache && proxyCache.get(target);
    if (!handlerAndState || handlerAndState[1][IS_TARGET_COPIED_PROPERTY] !== !!copiedTarget) {
        handlerAndState = createProxyHandler(target, !!copiedTarget);
        handlerAndState[1][PROXY_PROPERTY] = newProxy(copiedTarget || target, handlerAndState[0]);
        if (proxyCache) {
            proxyCache.set(target, handlerAndState);
        }
    }
    handlerAndState[1][AFFECTED_PROPERTY] = affected;
    handlerAndState[1][PROXY_CACHE_PROPERTY] = proxyCache;
    handlerAndState[1][TARGET_CACHE_PROPERTY] = targetCache;
    return handlerAndState[1][PROXY_PROPERTY];
};
const isAllOwnKeysChanged = (prevObj, nextObj)=>{
    const prevKeys = Reflect.ownKeys(prevObj);
    const nextKeys = Reflect.ownKeys(nextObj);
    return prevKeys.length !== nextKeys.length || prevKeys.some((k, i)=>k !== nextKeys[i]);
};
const isChanged = (prevObj, nextObj, affected, cache, isEqual = Object.is)=>{
    if (isEqual(prevObj, nextObj)) {
        return false;
    }
    if (!isObject(prevObj) || !isObject(nextObj)) return true;
    const used = affected.get(getOriginalObject(prevObj));
    if (!used) return true;
    if (cache) {
        const hit = cache.get(prevObj);
        if (hit === nextObj) {
            return false;
        }
        // for object with cycles
        cache.set(prevObj, nextObj);
    }
    let changed = null;
    for (const key of used[HAS_KEY_PROPERTY] || []){
        changed = Reflect.has(prevObj, key) !== Reflect.has(nextObj, key);
        if (changed) return changed;
    }
    if (used[ALL_OWN_KEYS_PROPERTY] === true) {
        changed = isAllOwnKeysChanged(prevObj, nextObj);
        if (changed) return changed;
    } else {
        for (const key of used[HAS_OWN_KEY_PROPERTY] || []){
            const hasPrev = !!Reflect.getOwnPropertyDescriptor(prevObj, key);
            const hasNext = !!Reflect.getOwnPropertyDescriptor(nextObj, key);
            changed = hasPrev !== hasNext;
            if (changed) return changed;
        }
    }
    for (const key of used[KEYS_PROPERTY] || []){
        changed = isChanged(prevObj[key], nextObj[key], affected, cache, isEqual);
        if (changed) return changed;
    }
    if (changed === null) throw new Error('invalid used');
    return changed;
};
const trackMemo = (obj)=>{
    if (isObjectToTrack(obj)) {
        return TRACK_MEMO_SYMBOL in obj;
    }
    return false;
};
const getUntracked = (obj)=>{
    if (isObjectToTrack(obj)) {
        return obj[GET_ORIGINAL_SYMBOL] || null;
    }
    return null;
};
const markToTrack = (obj, mark = true)=>{
    objectsToTrack.set(obj, mark);
};
const affectedToPathList = (obj, affected, onlyWithValues)=>{
    const list = [];
    const seen = new WeakSet();
    const walk = (x, path)=>{
        var _a, _b, _c;
        if (seen.has(x)) {
            // for object with cycles
            return;
        }
        if (isObject(x)) {
            seen.add(x);
        }
        const used = isObject(x) && affected.get(getOriginalObject(x));
        if (used) {
            (_a = used[HAS_KEY_PROPERTY]) === null || _a === void 0 ? void 0 : _a.forEach((key)=>{
                const segment = `:has(${String(key)})`;
                list.push(path ? [
                    ...path,
                    segment
                ] : [
                    segment
                ]);
            });
            if (used[ALL_OWN_KEYS_PROPERTY] === true) {
                const segment = ':ownKeys';
                list.push(path ? [
                    ...path,
                    segment
                ] : [
                    segment
                ]);
            } else {
                (_b = used[HAS_OWN_KEY_PROPERTY]) === null || _b === void 0 ? void 0 : _b.forEach((key)=>{
                    const segment = `:hasOwn(${String(key)})`;
                    list.push(path ? [
                        ...path,
                        segment
                    ] : [
                        segment
                    ]);
                });
            }
            (_c = used[KEYS_PROPERTY]) === null || _c === void 0 ? void 0 : _c.forEach((key)=>{
                if (!onlyWithValues || 'value' in (Object.getOwnPropertyDescriptor(x, key) || {})) {
                    walk(x[key], path ? [
                        ...path,
                        key
                    ] : [
                        key
                    ]);
                }
            });
        } else if (path) {
            list.push(path);
        }
    };
    walk(obj);
    return list;
};
const replaceNewProxy = (fn)=>{
    newProxy = fn;
};
}),
"[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getVersion",
    ()=>getVersion,
    "proxy",
    ()=>proxy,
    "ref",
    ()=>ref,
    "snapshot",
    ()=>snapshot,
    "subscribe",
    ()=>subscribe,
    "unstable_getInternalStates",
    ()=>unstable_getInternalStates,
    "unstable_replaceInternalFunction",
    ()=>unstable_replaceInternalFunction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$proxy$2d$compare$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/proxy-compare/dist/index.js [app-ssr] (ecmascript)");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("Desktop/frontend/node_modules/valtio/esm/vanilla.mjs")}`;
    }
};
;
const isObject = (x)=>typeof x === "object" && x !== null;
const canProxyDefault = (x)=>isObject(x) && !refSet.has(x) && (Array.isArray(x) || !(Symbol.iterator in x)) && !(x instanceof WeakMap) && !(x instanceof WeakSet) && !(x instanceof Error) && !(x instanceof Number) && !(x instanceof Date) && !(x instanceof String) && !(x instanceof RegExp) && !(x instanceof ArrayBuffer) && !(x instanceof Promise);
const createSnapshotDefault = (target, version)=>{
    const cache = snapCache.get(target);
    if ((cache == null ? void 0 : cache[0]) === version) {
        return cache[1];
    }
    const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$proxy$2d$compare$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["markToTrack"])(snap, true);
    snapCache.set(target, [
        version,
        snap
    ]);
    Reflect.ownKeys(target).forEach((key)=>{
        if (Object.getOwnPropertyDescriptor(snap, key)) {
            return;
        }
        const value = Reflect.get(target, key);
        const { enumerable } = Reflect.getOwnPropertyDescriptor(target, key);
        const desc = {
            value,
            enumerable,
            // This is intentional to avoid copying with proxy-compare.
            // It's still non-writable, so it avoids assigning a value.
            configurable: true
        };
        if (refSet.has(value)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$proxy$2d$compare$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["markToTrack"])(value, false);
        } else if (proxyStateMap.has(value)) {
            const [target2, ensureVersion] = proxyStateMap.get(value);
            desc.value = createSnapshotDefault(target2, ensureVersion());
        }
        Object.defineProperty(snap, key, desc);
    });
    return Object.preventExtensions(snap);
};
const createHandlerDefault = (isInitializing, addPropListener, removePropListener, notifyUpdate)=>({
        deleteProperty (target, prop) {
            const prevValue = Reflect.get(target, prop);
            removePropListener(prop);
            const deleted = Reflect.deleteProperty(target, prop);
            if (deleted) {
                notifyUpdate([
                    "delete",
                    [
                        prop
                    ],
                    prevValue
                ]);
            }
            return deleted;
        },
        set (target, prop, value, receiver) {
            const hasPrevValue = !isInitializing() && Reflect.has(target, prop);
            const prevValue = Reflect.get(target, prop, receiver);
            if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
                return true;
            }
            removePropListener(prop);
            if (isObject(value)) {
                value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$proxy$2d$compare$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUntracked"])(value) || value;
            }
            const nextValue = !proxyStateMap.has(value) && canProxy(value) ? proxy(value) : value;
            addPropListener(prop, nextValue);
            Reflect.set(target, prop, nextValue, receiver);
            notifyUpdate([
                "set",
                [
                    prop
                ],
                value,
                prevValue
            ]);
            return true;
        }
    });
const proxyStateMap = /* @__PURE__ */ new WeakMap();
const refSet = /* @__PURE__ */ new WeakSet();
const snapCache = /* @__PURE__ */ new WeakMap();
const versionHolder = [
    1
];
const proxyCache = /* @__PURE__ */ new WeakMap();
let objectIs = Object.is;
let newProxy = (target, handler)=>new Proxy(target, handler);
let canProxy = canProxyDefault;
let createSnapshot = createSnapshotDefault;
let createHandler = createHandlerDefault;
function proxy(baseObject = {}) {
    if (!isObject(baseObject)) {
        throw new Error("object required");
    }
    const found = proxyCache.get(baseObject);
    if (found) {
        return found;
    }
    let version = versionHolder[0];
    const listeners = /* @__PURE__ */ new Set();
    const notifyUpdate = (op, nextVersion = ++versionHolder[0])=>{
        if (version !== nextVersion) {
            checkVersion = version = nextVersion;
            listeners.forEach((listener)=>listener(op, nextVersion));
        }
    };
    let checkVersion = version;
    const ensureVersion = (nextCheckVersion = versionHolder[0])=>{
        if (checkVersion !== nextCheckVersion) {
            checkVersion = nextCheckVersion;
            propProxyStates.forEach(([propProxyState])=>{
                const propVersion = propProxyState[1](nextCheckVersion);
                if (propVersion > version) {
                    version = propVersion;
                }
            });
        }
        return version;
    };
    const createPropListener = (prop)=>(op, nextVersion)=>{
            const newOp = [
                ...op
            ];
            newOp[1] = [
                prop,
                ...newOp[1]
            ];
            notifyUpdate(newOp, nextVersion);
        };
    const propProxyStates = /* @__PURE__ */ new Map();
    const addPropListener = (prop, propValue)=>{
        const propProxyState = !refSet.has(propValue) && proxyStateMap.get(propValue);
        if (propProxyState) {
            if ((__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production" && propProxyStates.has(prop)) {
                throw new Error("prop listener already exists");
            }
            if (listeners.size) {
                const remove = propProxyState[2](createPropListener(prop));
                propProxyStates.set(prop, [
                    propProxyState,
                    remove
                ]);
            } else {
                propProxyStates.set(prop, [
                    propProxyState
                ]);
            }
        }
    };
    const removePropListener = (prop)=>{
        var _a;
        const entry = propProxyStates.get(prop);
        if (entry) {
            propProxyStates.delete(prop);
            (_a = entry[1]) == null ? void 0 : _a.call(entry);
        }
    };
    const addListener = (listener)=>{
        listeners.add(listener);
        if (listeners.size === 1) {
            propProxyStates.forEach(([propProxyState, prevRemove], prop)=>{
                if ((__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production" && prevRemove) {
                    throw new Error("remove already exists");
                }
                const remove = propProxyState[2](createPropListener(prop));
                propProxyStates.set(prop, [
                    propProxyState,
                    remove
                ]);
            });
        }
        const removeListener = ()=>{
            listeners.delete(listener);
            if (listeners.size === 0) {
                propProxyStates.forEach(([propProxyState, remove], prop)=>{
                    if (remove) {
                        remove();
                        propProxyStates.set(prop, [
                            propProxyState
                        ]);
                    }
                });
            }
        };
        return removeListener;
    };
    let initializing = true;
    const handler = createHandler(()=>initializing, addPropListener, removePropListener, notifyUpdate);
    const proxyObject = newProxy(baseObject, handler);
    proxyCache.set(baseObject, proxyObject);
    const proxyState = [
        baseObject,
        ensureVersion,
        addListener
    ];
    proxyStateMap.set(proxyObject, proxyState);
    Reflect.ownKeys(baseObject).forEach((key)=>{
        const desc = Object.getOwnPropertyDescriptor(baseObject, key);
        if ("value" in desc && desc.writable) {
            proxyObject[key] = baseObject[key];
        }
    });
    initializing = false;
    return proxyObject;
}
function getVersion(proxyObject) {
    const proxyState = proxyStateMap.get(proxyObject);
    return proxyState == null ? void 0 : proxyState[1]();
}
function subscribe(proxyObject, callback, notifyInSync) {
    const proxyState = proxyStateMap.get(proxyObject);
    if ((__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production" && !proxyState) {
        console.warn("Please use proxy object");
    }
    let promise;
    const ops = [];
    const addListener = proxyState[2];
    let isListenerActive = false;
    const listener = (op)=>{
        ops.push(op);
        if (notifyInSync) {
            callback(ops.splice(0));
            return;
        }
        if (!promise) {
            promise = Promise.resolve().then(()=>{
                promise = void 0;
                if (isListenerActive) {
                    callback(ops.splice(0));
                }
            });
        }
    };
    const removeListener = addListener(listener);
    isListenerActive = true;
    return ()=>{
        isListenerActive = false;
        removeListener();
    };
}
function snapshot(proxyObject) {
    const proxyState = proxyStateMap.get(proxyObject);
    if ((__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production" && !proxyState) {
        console.warn("Please use proxy object");
    }
    const [target, ensureVersion] = proxyState;
    return createSnapshot(target, ensureVersion());
}
function ref(obj) {
    refSet.add(obj);
    return obj;
}
function unstable_getInternalStates() {
    return {
        proxyStateMap,
        refSet,
        snapCache,
        versionHolder,
        proxyCache
    };
}
function unstable_replaceInternalFunction(name, fn) {
    switch(name){
        case "objectIs":
            objectIs = fn(objectIs);
            break;
        case "newProxy":
            newProxy = fn(newProxy);
            break;
        case "canProxy":
            canProxy = fn(canProxy);
            break;
        case "createSnapshot":
            createSnapshot = fn(createSnapshot);
            break;
        case "createHandler":
            createHandler = fn(createHandler);
            break;
        default:
            throw new Error("unknown function");
    }
}
;
}),
"[project]/Desktop/frontend/node_modules/valtio/esm/vanilla/utils.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deepClone",
    ()=>deepClone,
    "devtools",
    ()=>devtools,
    "proxyMap",
    ()=>proxyMap,
    "proxySet",
    ()=>proxySet,
    "subscribeKey",
    ()=>subscribeKey,
    "watch",
    ()=>watch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/valtio/esm/vanilla.mjs [app-ssr] (ecmascript)");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("Desktop/frontend/node_modules/valtio/esm/vanilla/utils.mjs")}`;
    }
};
;
function subscribeKey(proxyObject, key, callback, notifyInSync) {
    let prevValue = proxyObject[key];
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribe"])(proxyObject, ()=>{
        const nextValue = proxyObject[key];
        if (!Object.is(prevValue, nextValue)) {
            callback(prevValue = nextValue);
        }
    }, notifyInSync);
}
let currentCleanups;
function watch(callback, options) {
    let alive = true;
    const cleanups = /* @__PURE__ */ new Set();
    const subscriptions = /* @__PURE__ */ new Map();
    const cleanup = ()=>{
        if (alive) {
            alive = false;
            cleanups.forEach((clean)=>clean());
            cleanups.clear();
            subscriptions.forEach((unsubscribe)=>unsubscribe());
            subscriptions.clear();
        }
    };
    const revalidate = async ()=>{
        if (!alive) {
            return;
        }
        cleanups.forEach((clean)=>clean());
        cleanups.clear();
        const proxiesToSubscribe = /* @__PURE__ */ new Set();
        const parent = currentCleanups;
        currentCleanups = cleanups;
        try {
            const promiseOrPossibleCleanup = callback((proxyObject)=>{
                proxiesToSubscribe.add(proxyObject);
                if (alive && !subscriptions.has(proxyObject)) {
                    const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribe"])(proxyObject, revalidate, options == null ? void 0 : options.sync);
                    subscriptions.set(proxyObject, unsubscribe);
                }
                return proxyObject;
            });
            const couldBeCleanup = promiseOrPossibleCleanup && promiseOrPossibleCleanup instanceof Promise ? await promiseOrPossibleCleanup : promiseOrPossibleCleanup;
            if (couldBeCleanup) {
                if (alive) {
                    cleanups.add(couldBeCleanup);
                } else {
                    cleanup();
                }
            }
        } finally{
            currentCleanups = parent;
        }
        subscriptions.forEach((unsubscribe, proxyObject)=>{
            if (!proxiesToSubscribe.has(proxyObject)) {
                subscriptions.delete(proxyObject);
                unsubscribe();
            }
        });
    };
    if (currentCleanups) {
        currentCleanups.add(cleanup);
    }
    revalidate();
    return cleanup;
}
const DEVTOOLS = Symbol();
function devtools(proxyObject, options) {
    const { enabled, name = "", ...rest } = options || {};
    let extension;
    try {
        extension = (enabled != null ? enabled : (__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
    } catch (e) {}
    if (!extension) {
        if ((__TURBOPACK__import$2e$meta__.env ? __TURBOPACK__import$2e$meta__.env.MODE : void 0) !== "production" && enabled) {
            console.warn("[Warning] Please install/enable Redux devtools extension");
        }
        return;
    }
    let isTimeTraveling = false;
    const devtools2 = extension.connect({
        name,
        ...rest
    });
    const unsub1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subscribe"])(proxyObject, (ops)=>{
        const action = ops.filter(([_, path])=>path[0] !== DEVTOOLS).map(([op, path])=>`${op}:${path.map(String).join(".")}`).join(", ");
        if (!action) {
            return;
        }
        if (isTimeTraveling) {
            isTimeTraveling = false;
        } else {
            const snapWithoutDevtools = Object.assign({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["snapshot"])(proxyObject));
            delete snapWithoutDevtools[DEVTOOLS];
            devtools2.send({
                type: action,
                updatedAt: /* @__PURE__ */ new Date().toLocaleString()
            }, snapWithoutDevtools);
        }
    });
    const unsub2 = devtools2.subscribe((message)=>{
        var _a, _b, _c, _d, _e, _f;
        if (message.type === "ACTION" && message.payload) {
            try {
                Object.assign(proxyObject, JSON.parse(message.payload));
            } catch (e) {
                console.error("please dispatch a serializable value that JSON.parse() and proxy() support\n", e);
            }
        }
        if (message.type === "DISPATCH" && message.state) {
            if (((_a = message.payload) == null ? void 0 : _a.type) === "JUMP_TO_ACTION" || ((_b = message.payload) == null ? void 0 : _b.type) === "JUMP_TO_STATE") {
                isTimeTraveling = true;
                const state = JSON.parse(message.state);
                Object.assign(proxyObject, state);
            }
            proxyObject[DEVTOOLS] = message;
        } else if (message.type === "DISPATCH" && ((_c = message.payload) == null ? void 0 : _c.type) === "COMMIT") {
            devtools2.init((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["snapshot"])(proxyObject));
        } else if (message.type === "DISPATCH" && ((_d = message.payload) == null ? void 0 : _d.type) === "IMPORT_STATE") {
            const actions = (_e = message.payload.nextLiftedState) == null ? void 0 : _e.actionsById;
            const computedStates = ((_f = message.payload.nextLiftedState) == null ? void 0 : _f.computedStates) || [];
            isTimeTraveling = true;
            computedStates.forEach(({ state }, index)=>{
                const action = actions[index] || "No action found";
                Object.assign(proxyObject, state);
                if (index === 0) {
                    devtools2.init((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["snapshot"])(proxyObject));
                } else {
                    devtools2.send(action, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["snapshot"])(proxyObject));
                }
            });
        }
    });
    devtools2.init((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["snapshot"])(proxyObject));
    return ()=>{
        unsub1();
        unsub2 == null ? void 0 : unsub2();
    };
}
const { proxyStateMap: proxyStateMap$1, snapCache: snapCache$1 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unstable_getInternalStates"])();
const isProxy$1 = (x)=>proxyStateMap$1.has(x);
const isProxyMap = (obj)=>{
    return Symbol.toStringTag in obj && obj[Symbol.toStringTag] === "Map" && proxyStateMap$1.has(obj);
};
function proxyMap(entries) {
    const initialData = [];
    let initialIndex = 0;
    const indexMap = /* @__PURE__ */ new Map();
    const snapMapCache = /* @__PURE__ */ new WeakMap();
    const registerSnapMap = ()=>{
        const cache = snapCache$1.get(vObject);
        const latestSnap = cache == null ? void 0 : cache[1];
        if (latestSnap && !snapMapCache.has(latestSnap)) {
            const clonedMap = new Map(indexMap);
            snapMapCache.set(latestSnap, clonedMap);
        }
    };
    const getMapForThis = (x)=>snapMapCache.get(x) || indexMap;
    if (entries) {
        if (typeof entries[Symbol.iterator] !== "function") {
            throw new TypeError("proxyMap:\n	initial state must be iterable\n		tip: structure should be [[key, value]]");
        }
        for (const [key, value] of entries){
            indexMap.set(key, initialIndex);
            initialData[initialIndex++] = value;
        }
    }
    const vObject = {
        data: initialData,
        index: initialIndex,
        epoch: 0,
        get size () {
            if (!isProxy$1(this)) {
                registerSnapMap();
            }
            const map = getMapForThis(this);
            return map.size;
        },
        get (key) {
            const map = getMapForThis(this);
            const index = map.get(key);
            if (index === void 0) {
                this.epoch;
                return void 0;
            }
            return this.data[index];
        },
        has (key) {
            const map = getMapForThis(this);
            this.epoch;
            return map.has(key);
        },
        set (key, value) {
            if (!isProxy$1(this)) {
                throw new Error("Cannot perform mutations on a snapshot");
            }
            const index = indexMap.get(key);
            if (index === void 0) {
                indexMap.set(key, this.index);
                this.data[this.index++] = value;
            } else {
                this.data[index] = value;
            }
            this.epoch++;
            return this;
        },
        delete (key) {
            if (!isProxy$1(this)) {
                throw new Error("Cannot perform mutations on a snapshot");
            }
            const index = indexMap.get(key);
            if (index === void 0) {
                return false;
            }
            delete this.data[index];
            indexMap.delete(key);
            this.epoch++;
            return true;
        },
        clear () {
            if (!isProxy$1(this)) {
                throw new Error("Cannot perform mutations on a snapshot");
            }
            this.data.length = 0;
            this.index = 0;
            this.epoch++;
            indexMap.clear();
        },
        forEach (cb) {
            this.epoch;
            const map = getMapForThis(this);
            map.forEach((index, key)=>{
                cb(this.data[index], key, this);
            });
        },
        *entries () {
            this.epoch;
            const map = getMapForThis(this);
            for (const [key, index] of map){
                yield [
                    key,
                    this.data[index]
                ];
            }
        },
        *keys () {
            this.epoch;
            const map = getMapForThis(this);
            for (const key of map.keys()){
                yield key;
            }
        },
        *values () {
            this.epoch;
            const map = getMapForThis(this);
            for (const index of map.values()){
                yield this.data[index];
            }
        },
        [Symbol.iterator] () {
            return this.entries();
        },
        get [Symbol.toStringTag] () {
            return "Map";
        },
        toJSON () {
            return new Map(this.entries());
        }
    };
    const proxiedObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["proxy"])(vObject);
    Object.defineProperties(proxiedObject, {
        size: {
            enumerable: false
        },
        index: {
            enumerable: false
        },
        epoch: {
            enumerable: false
        },
        data: {
            enumerable: false
        },
        toJSON: {
            enumerable: false
        }
    });
    Object.seal(proxiedObject);
    return proxiedObject;
}
const { proxyStateMap, snapCache } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unstable_getInternalStates"])();
const maybeProxify = (x)=>typeof x === "object" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["proxy"])({
        x
    }).x : x;
const isProxy = (x)=>proxyStateMap.has(x);
const isProxySet = (obj)=>{
    return Symbol.toStringTag in obj && obj[Symbol.toStringTag] === "Set" && proxyStateMap.has(obj);
};
function proxySet(initialValues) {
    const initialData = [];
    const indexMap = /* @__PURE__ */ new Map();
    let initialIndex = 0;
    const snapMapCache = /* @__PURE__ */ new WeakMap();
    const registerSnapMap = ()=>{
        const cache = snapCache.get(vObject);
        const latestSnap = cache == null ? void 0 : cache[1];
        if (latestSnap && !snapMapCache.has(latestSnap)) {
            const clonedMap = new Map(indexMap);
            snapMapCache.set(latestSnap, clonedMap);
        }
    };
    const getMapForThis = (x)=>snapMapCache.get(x) || indexMap;
    if (initialValues) {
        if (typeof initialValues[Symbol.iterator] !== "function") {
            throw new TypeError("not iterable");
        }
        for (const value of initialValues){
            if (!indexMap.has(value)) {
                const v = maybeProxify(value);
                indexMap.set(v, initialIndex);
                initialData[initialIndex++] = v;
            }
        }
    }
    const vObject = {
        data: initialData,
        index: initialIndex,
        epoch: 0,
        get size () {
            if (!isProxy(this)) {
                registerSnapMap();
            }
            return indexMap.size;
        },
        has (value) {
            const map = getMapForThis(this);
            const v = maybeProxify(value);
            this.epoch;
            return map.has(v);
        },
        add (value) {
            if (!isProxy(this)) {
                throw new Error("Cannot perform mutations on a snapshot");
            }
            const v = maybeProxify(value);
            if (!indexMap.has(v)) {
                indexMap.set(v, this.index);
                this.data[this.index++] = v;
                this.epoch++;
            }
            return this;
        },
        delete (value) {
            if (!isProxy(this)) {
                throw new Error("Cannot perform mutations on a snapshot");
            }
            const v = maybeProxify(value);
            const index = indexMap.get(v);
            if (index === void 0) {
                return false;
            }
            delete this.data[index];
            indexMap.delete(v);
            this.epoch++;
            return true;
        },
        clear () {
            if (!isProxy(this)) {
                throw new Error("Cannot perform mutations on a snapshot");
            }
            this.data.length = 0;
            this.index = 0;
            this.epoch++;
            indexMap.clear();
        },
        forEach (cb) {
            this.epoch;
            const map = getMapForThis(this);
            map.forEach((index)=>{
                cb(this.data[index], this.data[index], this);
            });
        },
        *values () {
            this.epoch;
            const map = getMapForThis(this);
            for (const index of map.values()){
                yield this.data[index];
            }
        },
        keys () {
            this.epoch;
            return this.values();
        },
        *entries () {
            this.epoch;
            const map = getMapForThis(this);
            for (const index of map.values()){
                const value = this.data[index];
                yield [
                    value,
                    value
                ];
            }
        },
        toJSON () {
            return new Set(this.values());
        },
        [Symbol.iterator] () {
            return this.values();
        },
        get [Symbol.toStringTag] () {
            return "Set";
        },
        intersection (other) {
            this.epoch;
            const otherSet = proxySet(other);
            const resultSet = proxySet();
            for (const value of this.values()){
                if (otherSet.has(value)) {
                    resultSet.add(value);
                }
            }
            return proxySet(resultSet);
        },
        union (other) {
            this.epoch;
            const resultSet = proxySet();
            const otherSet = proxySet(other);
            for (const value of this.values()){
                resultSet.add(value);
            }
            for (const value of otherSet){
                resultSet.add(value);
            }
            return proxySet(resultSet);
        },
        difference (other) {
            this.epoch;
            const resultSet = proxySet();
            const otherSet = proxySet(other);
            for (const value of this.values()){
                if (!otherSet.has(value)) {
                    resultSet.add(value);
                }
            }
            return proxySet(resultSet);
        },
        symmetricDifference (other) {
            this.epoch;
            const resultSet = proxySet();
            const otherSet = proxySet(other);
            for (const value of this.values()){
                if (!otherSet.has(value)) {
                    resultSet.add(value);
                }
            }
            for (const value of otherSet.values()){
                if (!this.has(value)) {
                    resultSet.add(value);
                }
            }
            return proxySet(resultSet);
        },
        isSubsetOf (other) {
            this.epoch;
            const otherSet = proxySet(other);
            return this.size <= other.size && [
                ...this.values()
            ].every((value)=>otherSet.has(value));
        },
        isSupersetOf (other) {
            this.epoch;
            const otherSet = proxySet(other);
            return this.size >= other.size && [
                ...otherSet
            ].every((value)=>this.has(value));
        },
        isDisjointFrom (other) {
            this.epoch;
            const otherSet = proxySet(other);
            return [
                ...this.values()
            ].every((value)=>!otherSet.has(value));
        }
    };
    const proxiedObject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["proxy"])(vObject);
    Object.defineProperties(proxiedObject, {
        size: {
            enumerable: false
        },
        data: {
            enumerable: false
        },
        index: {
            enumerable: false
        },
        epoch: {
            enumerable: false
        },
        toJSON: {
            enumerable: false
        }
    });
    Object.seal(proxiedObject);
    return proxiedObject;
}
const isObject = (x)=>typeof x === "object" && x !== null;
let defaultRefSet;
const getDefaultRefSet = ()=>{
    if (!defaultRefSet) {
        defaultRefSet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$valtio$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unstable_getInternalStates"])().refSet;
    }
    return defaultRefSet;
};
function deepClone(obj, getRefSet = getDefaultRefSet) {
    if (!isObject(obj) || getRefSet().has(obj)) {
        return obj;
    }
    if (isProxySet(obj)) {
        return proxySet([
            ...obj
        ]);
    }
    if (isProxyMap(obj)) {
        return proxyMap([
            ...obj.entries()
        ]);
    }
    const baseObject = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
    Reflect.ownKeys(obj).forEach((key)=>{
        baseObject[key] = deepClone(obj[key], getRefSet);
    });
    return baseObject;
}
;
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConstantsUtil",
    ()=>ConstantsUtil
]);
const ConstantsUtil = {
    WC_NAME_SUFFIX: '.reown.id',
    WC_NAME_SUFFIX_LEGACY: '.wcn.id',
    BLOCKCHAIN_API_RPC_URL: 'https://rpc.walletconnect.org',
    PULSE_API_URL: 'https://pulse.walletconnect.org',
    W3M_API_URL: 'https://api.web3modal.org',
    CONNECTOR_ID: {
        WALLET_CONNECT: 'walletConnect',
        INJECTED: 'injected',
        WALLET_STANDARD: 'announced',
        COINBASE: 'coinbaseWallet',
        COINBASE_SDK: 'coinbaseWalletSDK',
        SAFE: 'safe',
        LEDGER: 'ledger',
        OKX: 'okx',
        EIP6963: 'eip6963',
        AUTH: 'ID_AUTH'
    },
    CONNECTOR_NAMES: {
        AUTH: 'Auth'
    },
    AUTH_CONNECTOR_SUPPORTED_CHAINS: [
        'eip155',
        'solana'
    ],
    LIMITS: {
        PENDING_TRANSACTIONS: 99
    },
    CHAIN: {
        EVM: 'eip155',
        SOLANA: 'solana',
        POLKADOT: 'polkadot',
        BITCOIN: 'bip122'
    },
    CHAIN_NAME_MAP: {
        eip155: 'EVM Networks',
        solana: 'Solana',
        polkadot: 'Polkadot',
        bip122: 'Bitcoin',
        cosmos: 'Cosmos',
        sui: 'Sui',
        stacks: 'Stacks'
    },
    ADAPTER_TYPES: {
        BITCOIN: 'bitcoin',
        SOLANA: 'solana',
        WAGMI: 'wagmi',
        ETHERS: 'ethers',
        ETHERS5: 'ethers5'
    },
    USDT_CONTRACT_ADDRESSES: [
        '0xdac17f958d2ee523a2206206994597c13d831ec7',
        '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
        '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7',
        '0x919C1c267BC06a7039e03fcc2eF738525769109c',
        '0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e',
        '0x55d398326f99059fF775485246999027B3197955',
        '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9'
    ],
    SOLANA_SPL_TOKEN_ADDRESSES: {
        SOL: 'So11111111111111111111111111111111111111112'
    },
    HTTP_STATUS_CODES: {
        SERVER_ERROR: 500,
        TOO_MANY_REQUESTS: 429,
        SERVICE_UNAVAILABLE: 503,
        FORBIDDEN: 403
    },
    UNSUPPORTED_NETWORK_NAME: 'Unknown Network',
    SECURE_SITE_SDK_ORIGIN: (typeof process !== 'undefined' && typeof process.env !== 'undefined' ? process.env['NEXT_PUBLIC_SECURE_SITE_ORIGIN'] : undefined) || 'https://secure.walletconnect.org',
    REMOTE_FEATURES_ALERTS: {
        MULTI_WALLET_NOT_ENABLED: {
            DEFAULT: {
                displayMessage: 'Multi-Wallet Not Enabled',
                debugMessage: 'Multi-wallet support is not enabled. Please enable it in your AppKit configuration at cloud.reown.com.'
            },
            CONNECTIONS_HOOK: {
                displayMessage: 'Multi-Wallet Not Enabled',
                debugMessage: 'Multi-wallet support is not enabled. Please enable it in your AppKit configuration at cloud.reown.com to use the useAppKitConnections hook.'
            },
            CONNECTION_HOOK: {
                displayMessage: 'Multi-Wallet Not Enabled',
                debugMessage: 'Multi-wallet support is not enabled. Please enable it in your AppKit configuration at cloud.reown.com to use the useAppKitConnection hook.'
            }
        }
    },
    IS_DEVELOPMENT: typeof process !== 'undefined' && ("TURBOPACK compile-time value", "development") === 'development'
}; //# sourceMappingURL=ConstantsUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/NetworkUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AVAILABLE_NAMESPACES",
    ()=>AVAILABLE_NAMESPACES,
    "NetworkUtil",
    ()=>NetworkUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-ssr] (ecmascript)");
;
const NetworkUtil = {
    caipNetworkIdToNumber (caipnetworkId) {
        return caipnetworkId ? Number(caipnetworkId.split(':')[1]) : undefined;
    },
    parseEvmChainId (chainId) {
        return typeof chainId === 'string' ? this.caipNetworkIdToNumber(chainId) : chainId;
    },
    getNetworksByNamespace (networks, namespace) {
        return networks?.filter((network)=>network.chainNamespace === namespace) || [];
    },
    getFirstNetworkByNamespace (networks, namespace) {
        return this.getNetworksByNamespace(networks, namespace)[0];
    },
    getNetworkNameByCaipNetworkId (caipNetworks, caipNetworkId) {
        if (!caipNetworkId) {
            return undefined;
        }
        const caipNetwork = caipNetworks.find((network)=>network.caipNetworkId === caipNetworkId);
        if (caipNetwork) {
            return caipNetwork.name;
        }
        const [namespace] = caipNetworkId.split(':');
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN_NAME_MAP?.[namespace] || undefined;
    }
};
const AVAILABLE_NAMESPACES = [
    'eip155',
    'solana',
    'polkadot',
    'bip122',
    'cosmos',
    'sui',
    'stacks'
]; //# sourceMappingURL=NetworkUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ParseUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ParseUtil",
    ()=>ParseUtil
]);
const ParseUtil = {
    validateCaipAddress (address) {
        if (address.split(':')?.length !== 3) {
            throw new Error('Invalid CAIP Address');
        }
        return address;
    },
    parseCaipAddress (caipAddress) {
        const parts = caipAddress.split(':');
        if (parts.length !== 3) {
            throw new Error(`Invalid CAIP-10 address: ${caipAddress}`);
        }
        const [chainNamespace, chainId, address] = parts;
        if (!chainNamespace || !chainId || !address) {
            throw new Error(`Invalid CAIP-10 address: ${caipAddress}`);
        }
        return {
            chainNamespace: chainNamespace,
            chainId: chainId,
            address
        };
    },
    parseCaipNetworkId (caipNetworkId) {
        const parts = caipNetworkId.split(':');
        if (parts.length !== 2) {
            throw new Error(`Invalid CAIP-2 network id: ${caipNetworkId}`);
        }
        const [chainNamespace, chainId] = parts;
        if (!chainNamespace || !chainId) {
            throw new Error(`Invalid CAIP-2 network id: ${caipNetworkId}`);
        }
        return {
            chainNamespace: chainNamespace,
            chainId: chainId
        };
    }
}; //# sourceMappingURL=ParseUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/SafeLocalStorage.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SafeLocalStorage",
    ()=>SafeLocalStorage,
    "SafeLocalStorageKeys",
    ()=>SafeLocalStorageKeys,
    "getSafeConnectorIdKey",
    ()=>getSafeConnectorIdKey,
    "isSafe",
    ()=>isSafe
]);
const SafeLocalStorageKeys = {
    WALLET_ID: '@appkit/wallet_id',
    WALLET_NAME: '@appkit/wallet_name',
    SOLANA_WALLET: '@appkit/solana_wallet',
    SOLANA_CAIP_CHAIN: '@appkit/solana_caip_chain',
    ACTIVE_CAIP_NETWORK_ID: '@appkit/active_caip_network_id',
    CONNECTED_SOCIAL: '@appkit/connected_social',
    CONNECTED_SOCIAL_USERNAME: '@appkit-wallet/SOCIAL_USERNAME',
    RECENT_WALLETS: '@appkit/recent_wallets',
    RECENT_WALLET: '@appkit/recent_wallet',
    DEEPLINK_CHOICE: 'WALLETCONNECT_DEEPLINK_CHOICE',
    ACTIVE_NAMESPACE: '@appkit/active_namespace',
    CONNECTED_NAMESPACES: '@appkit/connected_namespaces',
    CONNECTION_STATUS: '@appkit/connection_status',
    SIWX_AUTH_TOKEN: '@appkit/siwx-auth-token',
    SIWX_NONCE_TOKEN: '@appkit/siwx-nonce-token',
    TELEGRAM_SOCIAL_PROVIDER: '@appkit/social_provider',
    NATIVE_BALANCE_CACHE: '@appkit/native_balance_cache',
    PORTFOLIO_CACHE: '@appkit/portfolio_cache',
    ENS_CACHE: '@appkit/ens_cache',
    IDENTITY_CACHE: '@appkit/identity_cache',
    PREFERRED_ACCOUNT_TYPES: '@appkit/preferred_account_types',
    CONNECTIONS: '@appkit/connections',
    DISCONNECTED_CONNECTOR_IDS: '@appkit/disconnected_connector_ids',
    HISTORY_TRANSACTIONS_CACHE: '@appkit/history_transactions_cache',
    TOKEN_PRICE_CACHE: '@appkit/token_price_cache',
    RECENT_EMAILS: '@appkit/recent_emails',
    LATEST_APPKIT_VERSION: '@appkit/latest_version'
};
function getSafeConnectorIdKey(namespace) {
    if (!namespace) {
        throw new Error('Namespace is required for CONNECTED_CONNECTOR_ID');
    }
    return `@appkit/${namespace}:connected_connector_id`;
}
const SafeLocalStorage = {
    setItem (key, value) {
        if (isSafe() && value !== undefined) //TURBOPACK unreachable
        ;
    },
    getItem (key) {
        if (isSafe()) //TURBOPACK unreachable
        ;
        return undefined;
    },
    removeItem (key) {
        if (isSafe()) //TURBOPACK unreachable
        ;
    },
    clear () {
        if (isSafe()) //TURBOPACK unreachable
        ;
    }
};
function isSafe() {
    return ("TURBOPACK compile-time value", "undefined") !== 'undefined' && typeof localStorage !== 'undefined';
} //# sourceMappingURL=SafeLocalStorage.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ThemeUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getW3mThemeVariables",
    ()=>getW3mThemeVariables
]);
function getW3mThemeVariables(themeVariables, themeType) {
    if (themeType === 'light') {
        return {
            '--w3m-accent': themeVariables?.['--w3m-accent'] || 'hsla(231, 100%, 70%, 1)',
            '--w3m-background': '#fff'
        };
    }
    return {
        '--w3m-accent': themeVariables?.['--w3m-accent'] || 'hsla(230, 100%, 67%, 1)',
        '--w3m-background': '#202020'
    };
} //# sourceMappingURL=ThemeUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ErrorUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorUtil",
    ()=>ErrorUtil,
    "ProviderRpcError",
    ()=>ProviderRpcError,
    "UserRejectedRequestError",
    ()=>UserRejectedRequestError
]);
const ErrorUtil = {
    RPC_ERROR_CODE: {
        USER_REJECTED_REQUEST: 4001
    },
    PROVIDER_RPC_ERROR_NAME: {
        PROVIDER_RPC: 'ProviderRpcError',
        USER_REJECTED_REQUEST: 'UserRejectedRequestError'
    },
    isRpcProviderError (error) {
        try {
            if (typeof error === 'object' && error !== null) {
                const objErr = error;
                const hasMessage = typeof objErr['message'] === 'string';
                const hasCode = typeof objErr['code'] === 'number';
                return hasMessage && hasCode;
            }
            return false;
        } catch  {
            return false;
        }
    },
    isUserRejectedMessage (message) {
        return message.toLowerCase().includes('user rejected') || message.toLowerCase().includes('user cancelled') || message.toLowerCase().includes('user canceled');
    },
    isUserRejectedRequestError (error) {
        if (ErrorUtil.isRpcProviderError(error)) {
            const isUserRejectedCode = error.code === ErrorUtil.RPC_ERROR_CODE.USER_REJECTED_REQUEST;
            return isUserRejectedCode || ErrorUtil.isUserRejectedMessage(error.message);
        }
        if (error instanceof Error) {
            return ErrorUtil.isUserRejectedMessage(error.message);
        }
        return false;
    }
};
class ProviderRpcError extends Error {
    constructor(cause, options){
        super(options.message, {
            cause
        });
        this.name = ErrorUtil.PROVIDER_RPC_ERROR_NAME.PROVIDER_RPC;
        this.code = options.code;
    }
}
class UserRejectedRequestError extends ProviderRpcError {
    constructor(cause){
        super(cause, {
            code: ErrorUtil.RPC_ERROR_CODE.USER_REJECTED_REQUEST,
            message: 'User rejected the request'
        });
        this.name = ErrorUtil.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST;
    }
} //# sourceMappingURL=ErrorUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/NumberUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NumberUtil",
    ()=>NumberUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/big.js/big.mjs [app-ssr] (ecmascript)");
;
const NumberUtil = {
    bigNumber (value) {
        if (!value) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](0);
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](value);
    },
    multiply (a, b) {
        if (a === undefined || b === undefined) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](0);
        }
        const aBigNumber = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](a);
        const bBigNumber = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](b);
        return aBigNumber.times(bBigNumber);
    },
    toFixed (value, decimals = 2) {
        if (value === undefined || value === '') {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](0).toFixed(decimals);
        }
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](value).toFixed(decimals);
    },
    formatNumberToLocalString (value, decimals = 2) {
        if (value === undefined || value === '') {
            return '0.00';
        }
        if (typeof value === 'number') {
            return value.toLocaleString('en-US', {
                maximumFractionDigits: decimals,
                minimumFractionDigits: decimals,
                roundingMode: 'floor'
            });
        }
        return parseFloat(value).toLocaleString('en-US', {
            maximumFractionDigits: decimals,
            minimumFractionDigits: decimals,
            roundingMode: 'floor'
        });
    },
    parseLocalStringToNumber (value) {
        if (value === undefined || value === '') {
            return 0;
        }
        const sanitizedValue = value.replace(/,/gu, '');
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$big$2e$js$2f$big$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](sanitizedValue).toNumber();
    }
}; //# sourceMappingURL=NumberUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/contracts/erc20.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "erc20ABI",
    ()=>erc20ABI
]);
const erc20ABI = [
    {
        type: 'function',
        name: 'transfer',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: '_to',
                type: 'address'
            },
            {
                name: '_value',
                type: 'uint256'
            }
        ],
        outputs: [
            {
                name: '',
                type: 'bool'
            }
        ]
    },
    {
        type: 'function',
        name: 'transferFrom',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: '_from',
                type: 'address'
            },
            {
                name: '_to',
                type: 'address'
            },
            {
                name: '_value',
                type: 'uint256'
            }
        ],
        outputs: [
            {
                name: '',
                type: 'bool'
            }
        ]
    }
]; //# sourceMappingURL=erc20.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/contracts/swap.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "swapABI",
    ()=>swapABI
]);
const swapABI = [
    {
        type: 'function',
        name: 'approve',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'spender',
                type: 'address'
            },
            {
                name: 'amount',
                type: 'uint256'
            }
        ],
        outputs: [
            {
                type: 'bool'
            }
        ]
    }
]; //# sourceMappingURL=swap.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/contracts/usdt.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usdtABI",
    ()=>usdtABI
]);
const usdtABI = [
    {
        type: 'function',
        name: 'transfer',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'recipient',
                type: 'address'
            },
            {
                name: 'amount',
                type: 'uint256'
            }
        ],
        outputs: []
    },
    {
        type: 'function',
        name: 'transferFrom',
        stateMutability: 'nonpayable',
        inputs: [
            {
                name: 'sender',
                type: 'address'
            },
            {
                name: 'recipient',
                type: 'address'
            },
            {
                name: 'amount',
                type: 'uint256'
            }
        ],
        outputs: [
            {
                name: '',
                type: 'bool'
            }
        ]
    }
]; //# sourceMappingURL=usdt.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ContractUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContractUtil",
    ()=>ContractUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$contracts$2f$erc20$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/contracts/erc20.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$contracts$2f$swap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/contracts/swap.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$contracts$2f$usdt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/contracts/usdt.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-ssr] (ecmascript)");
;
;
;
;
const ContractUtil = {
    getERC20Abi: (tokenAddress)=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].USDT_CONTRACT_ADDRESSES.includes(tokenAddress)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$contracts$2f$usdt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usdtABI"];
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$contracts$2f$erc20$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["erc20ABI"];
    },
    getSwapAbi: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$contracts$2f$swap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swapABI"]
}; //# sourceMappingURL=ContractUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/DateUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DateUtil",
    ()=>DateUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/dayjs/dayjs.min.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$dayjs$2f$locale$2f$en$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/dayjs/locale/en.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$dayjs$2f$plugin$2f$relativeTime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/dayjs/plugin/relativeTime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$dayjs$2f$plugin$2f$updateLocale$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/dayjs/plugin/updateLocale.js [app-ssr] (ecmascript)");
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$dayjs$2f$plugin$2f$relativeTime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].extend(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$dayjs$2f$plugin$2f$updateLocale$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
const localeObject = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$dayjs$2f$locale$2f$en$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    name: 'en-web3-modal',
    relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s: '%d sec',
        m: '1 min',
        mm: '%d min',
        h: '1 hr',
        hh: '%d hrs',
        d: '1 d',
        dd: '%d d',
        M: '1 mo',
        MM: '%d mo',
        y: '1 yr',
        yy: '%d yr'
    }
};
const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].locale('en-web3-modal', localeObject);
const DateUtil = {
    getMonthNameByIndex (monthIndex) {
        return MONTH_NAMES[monthIndex];
    },
    getYear (date = new Date().toISOString()) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(date).year();
    },
    getRelativeDateFromNow (date) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(date).locale('en-web3-modal').fromNow(true);
    },
    formatDate (date, format = 'DD MMM') {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(date).format(format);
    }
}; //# sourceMappingURL=DateUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-wallet/dist/esm/src/W3mFrameConstants.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_LOG_LEVEL",
    ()=>DEFAULT_LOG_LEVEL,
    "SECURE_SITE_SDK",
    ()=>SECURE_SITE_SDK,
    "SECURE_SITE_SDK_VERSION",
    ()=>SECURE_SITE_SDK_VERSION,
    "W3mFrameConstants",
    ()=>W3mFrameConstants,
    "W3mFrameRpcConstants",
    ()=>W3mFrameRpcConstants
]);
const DEFAULT_SDK_URL = 'https://secure.walletconnect.org/sdk';
const SECURE_SITE_SDK = (typeof process !== 'undefined' && typeof process.env !== 'undefined' ? process.env['NEXT_PUBLIC_SECURE_SITE_SDK_URL'] : undefined) || DEFAULT_SDK_URL;
const DEFAULT_LOG_LEVEL = (typeof process !== 'undefined' && typeof process.env !== 'undefined' ? process.env['NEXT_PUBLIC_DEFAULT_LOG_LEVEL'] : undefined) || 'error';
const SECURE_SITE_SDK_VERSION = (typeof process !== 'undefined' && typeof process.env !== 'undefined' ? process.env['NEXT_PUBLIC_SECURE_SITE_SDK_VERSION'] : undefined) || '4';
const W3mFrameConstants = {
    APP_EVENT_KEY: '@w3m-app/',
    FRAME_EVENT_KEY: '@w3m-frame/',
    RPC_METHOD_KEY: 'RPC_',
    STORAGE_KEY: '@appkit-wallet/',
    SESSION_TOKEN_KEY: 'SESSION_TOKEN_KEY',
    EMAIL_LOGIN_USED_KEY: 'EMAIL_LOGIN_USED_KEY',
    LAST_USED_CHAIN_KEY: 'LAST_USED_CHAIN_KEY',
    LAST_EMAIL_LOGIN_TIME: 'LAST_EMAIL_LOGIN_TIME',
    EMAIL: 'EMAIL',
    PREFERRED_ACCOUNT_TYPE: 'PREFERRED_ACCOUNT_TYPE',
    SMART_ACCOUNT_ENABLED: 'SMART_ACCOUNT_ENABLED',
    SMART_ACCOUNT_ENABLED_NETWORKS: 'SMART_ACCOUNT_ENABLED_NETWORKS',
    SOCIAL_USERNAME: 'SOCIAL_USERNAME',
    APP_SWITCH_NETWORK: '@w3m-app/SWITCH_NETWORK',
    APP_CONNECT_EMAIL: '@w3m-app/CONNECT_EMAIL',
    APP_CONNECT_DEVICE: '@w3m-app/CONNECT_DEVICE',
    APP_CONNECT_OTP: '@w3m-app/CONNECT_OTP',
    APP_CONNECT_SOCIAL: '@w3m-app/CONNECT_SOCIAL',
    APP_GET_SOCIAL_REDIRECT_URI: '@w3m-app/GET_SOCIAL_REDIRECT_URI',
    APP_GET_USER: '@w3m-app/GET_USER',
    APP_SIGN_OUT: '@w3m-app/SIGN_OUT',
    APP_IS_CONNECTED: '@w3m-app/IS_CONNECTED',
    APP_GET_CHAIN_ID: '@w3m-app/GET_CHAIN_ID',
    APP_RPC_REQUEST: '@w3m-app/RPC_REQUEST',
    APP_UPDATE_EMAIL: '@w3m-app/UPDATE_EMAIL',
    APP_UPDATE_EMAIL_PRIMARY_OTP: '@w3m-app/UPDATE_EMAIL_PRIMARY_OTP',
    APP_UPDATE_EMAIL_SECONDARY_OTP: '@w3m-app/UPDATE_EMAIL_SECONDARY_OTP',
    APP_AWAIT_UPDATE_EMAIL: '@w3m-app/AWAIT_UPDATE_EMAIL',
    APP_SYNC_THEME: '@w3m-app/SYNC_THEME',
    APP_SYNC_DAPP_DATA: '@w3m-app/SYNC_DAPP_DATA',
    APP_GET_SMART_ACCOUNT_ENABLED_NETWORKS: '@w3m-app/GET_SMART_ACCOUNT_ENABLED_NETWORKS',
    APP_INIT_SMART_ACCOUNT: '@w3m-app/INIT_SMART_ACCOUNT',
    APP_SET_PREFERRED_ACCOUNT: '@w3m-app/SET_PREFERRED_ACCOUNT',
    APP_CONNECT_FARCASTER: '@w3m-app/CONNECT_FARCASTER',
    APP_GET_FARCASTER_URI: '@w3m-app/GET_FARCASTER_URI',
    APP_RELOAD: '@w3m-app/RELOAD',
    APP_RPC_ABORT: '@w3m-app/RPC_ABORT',
    FRAME_SWITCH_NETWORK_ERROR: '@w3m-frame/SWITCH_NETWORK_ERROR',
    FRAME_SWITCH_NETWORK_SUCCESS: '@w3m-frame/SWITCH_NETWORK_SUCCESS',
    FRAME_CONNECT_EMAIL_ERROR: '@w3m-frame/CONNECT_EMAIL_ERROR',
    FRAME_CONNECT_EMAIL_SUCCESS: '@w3m-frame/CONNECT_EMAIL_SUCCESS',
    FRAME_CONNECT_DEVICE_ERROR: '@w3m-frame/CONNECT_DEVICE_ERROR',
    FRAME_CONNECT_DEVICE_SUCCESS: '@w3m-frame/CONNECT_DEVICE_SUCCESS',
    FRAME_CONNECT_OTP_SUCCESS: '@w3m-frame/CONNECT_OTP_SUCCESS',
    FRAME_CONNECT_OTP_ERROR: '@w3m-frame/CONNECT_OTP_ERROR',
    FRAME_CONNECT_SOCIAL_SUCCESS: '@w3m-frame/CONNECT_SOCIAL_SUCCESS',
    FRAME_CONNECT_SOCIAL_ERROR: '@w3m-frame/CONNECT_SOCIAL_ERROR',
    FRAME_CONNECT_FARCASTER_SUCCESS: '@w3m-frame/CONNECT_FARCASTER_SUCCESS',
    FRAME_CONNECT_FARCASTER_ERROR: '@w3m-frame/CONNECT_FARCASTER_ERROR',
    FRAME_GET_FARCASTER_URI_SUCCESS: '@w3m-frame/GET_FARCASTER_URI_SUCCESS',
    FRAME_GET_FARCASTER_URI_ERROR: '@w3m-frame/GET_FARCASTER_URI_ERROR',
    FRAME_GET_SOCIAL_REDIRECT_URI_SUCCESS: '@w3m-frame/GET_SOCIAL_REDIRECT_URI_SUCCESS',
    FRAME_GET_SOCIAL_REDIRECT_URI_ERROR: '@w3m-frame/GET_SOCIAL_REDIRECT_URI_ERROR',
    FRAME_GET_USER_SUCCESS: '@w3m-frame/GET_USER_SUCCESS',
    FRAME_GET_USER_ERROR: '@w3m-frame/GET_USER_ERROR',
    FRAME_SIGN_OUT_SUCCESS: '@w3m-frame/SIGN_OUT_SUCCESS',
    FRAME_SIGN_OUT_ERROR: '@w3m-frame/SIGN_OUT_ERROR',
    FRAME_IS_CONNECTED_SUCCESS: '@w3m-frame/IS_CONNECTED_SUCCESS',
    FRAME_IS_CONNECTED_ERROR: '@w3m-frame/IS_CONNECTED_ERROR',
    FRAME_GET_CHAIN_ID_SUCCESS: '@w3m-frame/GET_CHAIN_ID_SUCCESS',
    FRAME_GET_CHAIN_ID_ERROR: '@w3m-frame/GET_CHAIN_ID_ERROR',
    FRAME_RPC_REQUEST_SUCCESS: '@w3m-frame/RPC_REQUEST_SUCCESS',
    FRAME_RPC_REQUEST_ERROR: '@w3m-frame/RPC_REQUEST_ERROR',
    FRAME_SESSION_UPDATE: '@w3m-frame/SESSION_UPDATE',
    FRAME_UPDATE_EMAIL_SUCCESS: '@w3m-frame/UPDATE_EMAIL_SUCCESS',
    FRAME_UPDATE_EMAIL_ERROR: '@w3m-frame/UPDATE_EMAIL_ERROR',
    FRAME_UPDATE_EMAIL_PRIMARY_OTP_SUCCESS: '@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_SUCCESS',
    FRAME_UPDATE_EMAIL_PRIMARY_OTP_ERROR: '@w3m-frame/UPDATE_EMAIL_PRIMARY_OTP_ERROR',
    FRAME_UPDATE_EMAIL_SECONDARY_OTP_SUCCESS: '@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_SUCCESS',
    FRAME_UPDATE_EMAIL_SECONDARY_OTP_ERROR: '@w3m-frame/UPDATE_EMAIL_SECONDARY_OTP_ERROR',
    FRAME_SYNC_THEME_SUCCESS: '@w3m-frame/SYNC_THEME_SUCCESS',
    FRAME_SYNC_THEME_ERROR: '@w3m-frame/SYNC_THEME_ERROR',
    FRAME_SYNC_DAPP_DATA_SUCCESS: '@w3m-frame/SYNC_DAPP_DATA_SUCCESS',
    FRAME_SYNC_DAPP_DATA_ERROR: '@w3m-frame/SYNC_DAPP_DATA_ERROR',
    FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS: '@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_SUCCESS',
    FRAME_GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR: '@w3m-frame/GET_SMART_ACCOUNT_ENABLED_NETWORKS_ERROR',
    FRAME_INIT_SMART_ACCOUNT_SUCCESS: '@w3m-frame/INIT_SMART_ACCOUNT_SUCCESS',
    FRAME_INIT_SMART_ACCOUNT_ERROR: '@w3m-frame/INIT_SMART_ACCOUNT_ERROR',
    FRAME_SET_PREFERRED_ACCOUNT_SUCCESS: '@w3m-frame/SET_PREFERRED_ACCOUNT_SUCCESS',
    FRAME_SET_PREFERRED_ACCOUNT_ERROR: '@w3m-frame/SET_PREFERRED_ACCOUNT_ERROR',
    FRAME_READY: '@w3m-frame/READY',
    FRAME_RELOAD_SUCCESS: '@w3m-frame/RELOAD_SUCCESS',
    FRAME_RELOAD_ERROR: '@w3m-frame/RELOAD_ERROR',
    FRAME_RPC_ABORT_SUCCESS: '@w3m-frame/RPC_ABORT_SUCCESS',
    FRAME_RPC_ABORT_ERROR: '@w3m-frame/RPC_ABORT_ERROR',
    RPC_RESPONSE_TYPE_ERROR: 'RPC_RESPONSE_ERROR',
    RPC_RESPONSE_TYPE_TX: 'RPC_RESPONSE_TRANSACTION_HASH',
    RPC_RESPONSE_TYPE_OBJECT: 'RPC_RESPONSE_OBJECT'
};
const W3mFrameRpcConstants = {
    SAFE_RPC_METHODS: [
        'eth_accounts',
        'eth_blockNumber',
        'eth_call',
        'eth_chainId',
        'eth_estimateGas',
        'eth_feeHistory',
        'eth_gasPrice',
        'eth_getAccount',
        'eth_getBalance',
        'eth_getBlockByHash',
        'eth_getBlockByNumber',
        'eth_getBlockReceipts',
        'eth_getBlockTransactionCountByHash',
        'eth_getBlockTransactionCountByNumber',
        'eth_getCode',
        'eth_getFilterChanges',
        'eth_getFilterLogs',
        'eth_getLogs',
        'eth_getProof',
        'eth_getStorageAt',
        'eth_getTransactionByBlockHashAndIndex',
        'eth_getTransactionByBlockNumberAndIndex',
        'eth_getTransactionByHash',
        'eth_getTransactionCount',
        'eth_getTransactionReceipt',
        'eth_getUncleCountByBlockHash',
        'eth_getUncleCountByBlockNumber',
        'eth_maxPriorityFeePerGas',
        'eth_newBlockFilter',
        'eth_newFilter',
        'eth_newPendingTransactionFilter',
        'eth_sendRawTransaction',
        'eth_syncing',
        'eth_uninstallFilter',
        'wallet_getCapabilities',
        'wallet_getCallsStatus',
        'eth_getUserOperationReceipt',
        'eth_estimateUserOperationGas',
        'eth_getUserOperationByHash',
        'eth_supportedEntryPoints',
        'wallet_getAssets'
    ],
    NOT_SAFE_RPC_METHODS: [
        'personal_sign',
        'eth_signTypedData_v4',
        'eth_sendTransaction',
        'solana_signMessage',
        'solana_signTransaction',
        'solana_signAllTransactions',
        'solana_signAndSendTransaction',
        'wallet_sendCalls',
        'wallet_grantPermissions',
        'wallet_revokePermissions',
        'eth_sendUserOperation'
    ],
    GET_CHAIN_ID: 'eth_chainId',
    RPC_METHOD_NOT_ALLOWED_MESSAGE: 'Requested RPC call is not allowed',
    RPC_METHOD_NOT_ALLOWED_UI_MESSAGE: 'Action not allowed',
    ACCOUNT_TYPES: {
        EOA: 'eoa',
        SMART_ACCOUNT: 'smartAccount'
    }
}; //# sourceMappingURL=W3mFrameConstants.js.map
}),
"[project]/Desktop/frontend/node_modules/big.js/big.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Big",
    ()=>Big,
    "default",
    ()=>__TURBOPACK__default__export__
]);
/*
 *  big.js v6.2.2
 *  A small, fast, easy-to-use library for arbitrary-precision decimal arithmetic.
 *  Copyright (c) 2024 Michael Mclaughlin
 *  https://github.com/MikeMcl/big.js/LICENCE.md
 */ /************************************** EDITABLE DEFAULTS *****************************************/ // The default values below must be integers within the stated ranges.
/*
   * The maximum number of decimal places (DP) of the results of operations involving division:
   * div and sqrt, and pow with negative exponents.
   */ var DP = 20, /*
   * The rounding mode (RM) used when rounding to the above decimal places.
   *
   *  0  Towards zero (i.e. truncate, no rounding).       (ROUND_DOWN)
   *  1  To nearest neighbour. If equidistant, round up.  (ROUND_HALF_UP)
   *  2  To nearest neighbour. If equidistant, to even.   (ROUND_HALF_EVEN)
   *  3  Away from zero.                                  (ROUND_UP)
   */ RM = 1, // The maximum value of DP and Big.DP.
MAX_DP = 1E6, // The maximum magnitude of the exponent argument to the pow method.
MAX_POWER = 1E6, /*
   * The negative exponent (NE) at and beneath which toString returns exponential notation.
   * (JavaScript numbers: -7)
   * -1000000 is the minimum recommended exponent value of a Big.
   */ NE = -7, /*
   * The positive exponent (PE) at and above which toString returns exponential notation.
   * (JavaScript numbers: 21)
   * 1000000 is the maximum recommended exponent value of a Big, but this limit is not enforced.
   */ PE = 21, /*
   * When true, an error will be thrown if a primitive number is passed to the Big constructor,
   * or if valueOf is called, or if toNumber is called on a Big which cannot be converted to a
   * primitive number without a loss of precision.
   */ STRICT = false, /**************************************************************************************************/ // Error messages.
NAME = '[big.js] ', INVALID = NAME + 'Invalid ', INVALID_DP = INVALID + 'decimal places', INVALID_RM = INVALID + 'rounding mode', DIV_BY_ZERO = NAME + 'Division by zero', // The shared prototype object.
P = {}, UNDEFINED = void 0, NUMERIC = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
/*
 * Create and return a Big constructor.
 */ function _Big_() {
    /*
   * The Big constructor and exported function.
   * Create and return a new instance of a Big number object.
   *
   * n {number|string|Big} A numeric value.
   */ function Big(n) {
        var x = this;
        // Enable constructor usage without new.
        if (!(x instanceof Big)) return n === UNDEFINED ? _Big_() : new Big(n);
        // Duplicate.
        if (n instanceof Big) {
            x.s = n.s;
            x.e = n.e;
            x.c = n.c.slice();
        } else {
            if (typeof n !== 'string') {
                if (Big.strict === true && typeof n !== 'bigint') {
                    throw TypeError(INVALID + 'value');
                }
                // Minus zero?
                n = n === 0 && 1 / n < 0 ? '-0' : String(n);
            }
            parse(x, n);
        }
        // Retain a reference to this Big constructor.
        // Shadow Big.prototype.constructor which points to Object.
        x.constructor = Big;
    }
    Big.prototype = P;
    Big.DP = DP;
    Big.RM = RM;
    Big.NE = NE;
    Big.PE = PE;
    Big.strict = STRICT;
    Big.roundDown = 0;
    Big.roundHalfUp = 1;
    Big.roundHalfEven = 2;
    Big.roundUp = 3;
    return Big;
}
/*
 * Parse the number or string value passed to a Big constructor.
 *
 * x {Big} A Big number instance.
 * n {number|string} A numeric value.
 */ function parse(x, n) {
    var e, i, nl;
    if (!NUMERIC.test(n)) {
        throw Error(INVALID + 'number');
    }
    // Determine sign.
    x.s = n.charAt(0) == '-' ? (n = n.slice(1), -1) : 1;
    // Decimal point?
    if ((e = n.indexOf('.')) > -1) n = n.replace('.', '');
    // Exponential form?
    if ((i = n.search(/e/i)) > 0) {
        // Determine exponent.
        if (e < 0) e = i;
        e += +n.slice(i + 1);
        n = n.substring(0, i);
    } else if (e < 0) {
        // Integer.
        e = n.length;
    }
    nl = n.length;
    // Determine leading zeros.
    for(i = 0; i < nl && n.charAt(i) == '0';)++i;
    if (i == nl) {
        // Zero.
        x.c = [
            x.e = 0
        ];
    } else {
        // Determine trailing zeros.
        for(; nl > 0 && n.charAt(--nl) == '0';);
        x.e = e - i - 1;
        x.c = [];
        // Convert string to array of digits without leading/trailing zeros.
        for(e = 0; i <= nl;)x.c[e++] = +n.charAt(i++);
    }
    return x;
}
/*
 * Round Big x to a maximum of sd significant digits using rounding mode rm.
 *
 * x {Big} The Big to round.
 * sd {number} Significant digits: integer, 0 to MAX_DP inclusive.
 * rm {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 * [more] {boolean} Whether the result of division was truncated.
 */ function round(x, sd, rm, more) {
    var xc = x.c;
    if (rm === UNDEFINED) rm = x.constructor.RM;
    if (rm !== 0 && rm !== 1 && rm !== 2 && rm !== 3) {
        throw Error(INVALID_RM);
    }
    if (sd < 1) {
        more = rm === 3 && (more || !!xc[0]) || sd === 0 && (rm === 1 && xc[0] >= 5 || rm === 2 && (xc[0] > 5 || xc[0] === 5 && (more || xc[1] !== UNDEFINED)));
        xc.length = 1;
        if (more) {
            // 1, 0.1, 0.01, 0.001, 0.0001 etc.
            x.e = x.e - sd + 1;
            xc[0] = 1;
        } else {
            // Zero.
            xc[0] = x.e = 0;
        }
    } else if (sd < xc.length) {
        // xc[sd] is the digit after the digit that may be rounded up.
        more = rm === 1 && xc[sd] >= 5 || rm === 2 && (xc[sd] > 5 || xc[sd] === 5 && (more || xc[sd + 1] !== UNDEFINED || xc[sd - 1] & 1)) || rm === 3 && (more || !!xc[0]);
        // Remove any digits after the required precision.
        xc.length = sd;
        // Round up?
        if (more) {
            // Rounding up may mean the previous digit has to be rounded up.
            for(; ++xc[--sd] > 9;){
                xc[sd] = 0;
                if (sd === 0) {
                    ++x.e;
                    xc.unshift(1);
                    break;
                }
            }
        }
        // Remove trailing zeros.
        for(sd = xc.length; !xc[--sd];)xc.pop();
    }
    return x;
}
/*
 * Return a string representing the value of Big x in normal or exponential notation.
 * Handles P.toExponential, P.toFixed, P.toJSON, P.toPrecision, P.toString and P.valueOf.
 */ function stringify(x, doExponential, isNonzero) {
    var e = x.e, s = x.c.join(''), n = s.length;
    // Exponential notation?
    if (doExponential) {
        s = s.charAt(0) + (n > 1 ? '.' + s.slice(1) : '') + (e < 0 ? 'e' : 'e+') + e;
    // Normal notation.
    } else if (e < 0) {
        for(; ++e;)s = '0' + s;
        s = '0.' + s;
    } else if (e > 0) {
        if (++e > n) {
            for(e -= n; e--;)s += '0';
        } else if (e < n) {
            s = s.slice(0, e) + '.' + s.slice(e);
        }
    } else if (n > 1) {
        s = s.charAt(0) + '.' + s.slice(1);
    }
    return x.s < 0 && isNonzero ? '-' + s : s;
}
// Prototype/instance methods
/*
 * Return a new Big whose value is the absolute value of this Big.
 */ P.abs = function() {
    var x = new this.constructor(this);
    x.s = 1;
    return x;
};
/*
 * Return 1 if the value of this Big is greater than the value of Big y,
 *       -1 if the value of this Big is less than the value of Big y, or
 *        0 if they have the same value.
 */ P.cmp = function(y) {
    var isneg, x = this, xc = x.c, yc = (y = new x.constructor(y)).c, i = x.s, j = y.s, k = x.e, l = y.e;
    // Either zero?
    if (!xc[0] || !yc[0]) return !xc[0] ? !yc[0] ? 0 : -j : i;
    // Signs differ?
    if (i != j) return i;
    isneg = i < 0;
    // Compare exponents.
    if (k != l) return k > l ^ isneg ? 1 : -1;
    j = (k = xc.length) < (l = yc.length) ? k : l;
    // Compare digit by digit.
    for(i = -1; ++i < j;){
        if (xc[i] != yc[i]) return xc[i] > yc[i] ^ isneg ? 1 : -1;
    }
    // Compare lengths.
    return k == l ? 0 : k > l ^ isneg ? 1 : -1;
};
/*
 * Return a new Big whose value is the value of this Big divided by the value of Big y, rounded,
 * if necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
 */ P.div = function(y) {
    var x = this, Big = x.constructor, a = x.c, b = (y = new Big(y)).c, k = x.s == y.s ? 1 : -1, dp = Big.DP;
    if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
        throw Error(INVALID_DP);
    }
    // Divisor is zero?
    if (!b[0]) {
        throw Error(DIV_BY_ZERO);
    }
    // Dividend is 0? Return +-0.
    if (!a[0]) {
        y.s = k;
        y.c = [
            y.e = 0
        ];
        return y;
    }
    var bl, bt, n, cmp, ri, bz = b.slice(), ai = bl = b.length, al = a.length, r = a.slice(0, bl), rl = r.length, q = y, qc = q.c = [], qi = 0, p = dp + (q.e = x.e - y.e) + 1; // precision of the result
    q.s = k;
    k = p < 0 ? 0 : p;
    // Create version of divisor with leading zero.
    bz.unshift(0);
    // Add zeros to make remainder as long as divisor.
    for(; rl++ < bl;)r.push(0);
    do {
        // n is how many times the divisor goes into current remainder.
        for(n = 0; n < 10; n++){
            // Compare divisor and remainder.
            if (bl != (rl = r.length)) {
                cmp = bl > rl ? 1 : -1;
            } else {
                for(ri = -1, cmp = 0; ++ri < bl;){
                    if (b[ri] != r[ri]) {
                        cmp = b[ri] > r[ri] ? 1 : -1;
                        break;
                    }
                }
            }
            // If divisor < remainder, subtract divisor from remainder.
            if (cmp < 0) {
                // Remainder can't be more than 1 digit longer than divisor.
                // Equalise lengths using divisor with extra leading zero?
                for(bt = rl == bl ? b : bz; rl;){
                    if (r[--rl] < bt[rl]) {
                        ri = rl;
                        for(; ri && !r[--ri];)r[ri] = 9;
                        --r[ri];
                        r[rl] += 10;
                    }
                    r[rl] -= bt[rl];
                }
                for(; !r[0];)r.shift();
            } else {
                break;
            }
        }
        // Add the digit n to the result array.
        qc[qi++] = cmp ? n : ++n;
        // Update the remainder.
        if (r[0] && cmp) r[rl] = a[ai] || 0;
        else r = [
            a[ai]
        ];
    }while ((ai++ < al || r[0] !== UNDEFINED) && k--)
    // Leading zero? Do not remove if result is simply zero (qi == 1).
    if (!qc[0] && qi != 1) {
        // There can't be more than one zero.
        qc.shift();
        q.e--;
        p--;
    }
    // Round?
    if (qi > p) round(q, p, Big.RM, r[0] !== UNDEFINED);
    return q;
};
/*
 * Return true if the value of this Big is equal to the value of Big y, otherwise return false.
 */ P.eq = function(y) {
    return this.cmp(y) === 0;
};
/*
 * Return true if the value of this Big is greater than the value of Big y, otherwise return
 * false.
 */ P.gt = function(y) {
    return this.cmp(y) > 0;
};
/*
 * Return true if the value of this Big is greater than or equal to the value of Big y, otherwise
 * return false.
 */ P.gte = function(y) {
    return this.cmp(y) > -1;
};
/*
 * Return true if the value of this Big is less than the value of Big y, otherwise return false.
 */ P.lt = function(y) {
    return this.cmp(y) < 0;
};
/*
 * Return true if the value of this Big is less than or equal to the value of Big y, otherwise
 * return false.
 */ P.lte = function(y) {
    return this.cmp(y) < 1;
};
/*
 * Return a new Big whose value is the value of this Big minus the value of Big y.
 */ P.minus = P.sub = function(y) {
    var i, j, t, xlty, x = this, Big = x.constructor, a = x.s, b = (y = new Big(y)).s;
    // Signs differ?
    if (a != b) {
        y.s = -b;
        return x.plus(y);
    }
    var xc = x.c.slice(), xe = x.e, yc = y.c, ye = y.e;
    // Either zero?
    if (!xc[0] || !yc[0]) {
        if (yc[0]) {
            y.s = -b;
        } else if (xc[0]) {
            y = new Big(x);
        } else {
            y.s = 1;
        }
        return y;
    }
    // Determine which is the bigger number. Prepend zeros to equalise exponents.
    if (a = xe - ye) {
        if (xlty = a < 0) {
            a = -a;
            t = xc;
        } else {
            ye = xe;
            t = yc;
        }
        t.reverse();
        for(b = a; b--;)t.push(0);
        t.reverse();
    } else {
        // Exponents equal. Check digit by digit.
        j = ((xlty = xc.length < yc.length) ? xc : yc).length;
        for(a = b = 0; b < j; b++){
            if (xc[b] != yc[b]) {
                xlty = xc[b] < yc[b];
                break;
            }
        }
    }
    // x < y? Point xc to the array of the bigger number.
    if (xlty) {
        t = xc;
        xc = yc;
        yc = t;
        y.s = -y.s;
    }
    /*
   * Append zeros to xc if shorter. No need to add zeros to yc if shorter as subtraction only
   * needs to start at yc.length.
   */ if ((b = (j = yc.length) - (i = xc.length)) > 0) for(; b--;)xc[i++] = 0;
    // Subtract yc from xc.
    for(b = i; j > a;){
        if (xc[--j] < yc[j]) {
            for(i = j; i && !xc[--i];)xc[i] = 9;
            --xc[i];
            xc[j] += 10;
        }
        xc[j] -= yc[j];
    }
    // Remove trailing zeros.
    for(; xc[--b] === 0;)xc.pop();
    // Remove leading zeros and adjust exponent accordingly.
    for(; xc[0] === 0;){
        xc.shift();
        --ye;
    }
    if (!xc[0]) {
        // n - n = +0
        y.s = 1;
        // Result must be zero.
        xc = [
            ye = 0
        ];
    }
    y.c = xc;
    y.e = ye;
    return y;
};
/*
 * Return a new Big whose value is the value of this Big modulo the value of Big y.
 */ P.mod = function(y) {
    var ygtx, x = this, Big = x.constructor, a = x.s, b = (y = new Big(y)).s;
    if (!y.c[0]) {
        throw Error(DIV_BY_ZERO);
    }
    x.s = y.s = 1;
    ygtx = y.cmp(x) == 1;
    x.s = a;
    y.s = b;
    if (ygtx) return new Big(x);
    a = Big.DP;
    b = Big.RM;
    Big.DP = Big.RM = 0;
    x = x.div(y);
    Big.DP = a;
    Big.RM = b;
    return this.minus(x.times(y));
};
/*
 * Return a new Big whose value is the value of this Big negated.
 */ P.neg = function() {
    var x = new this.constructor(this);
    x.s = -x.s;
    return x;
};
/*
 * Return a new Big whose value is the value of this Big plus the value of Big y.
 */ P.plus = P.add = function(y) {
    var e, k, t, x = this, Big = x.constructor;
    y = new Big(y);
    // Signs differ?
    if (x.s != y.s) {
        y.s = -y.s;
        return x.minus(y);
    }
    var xe = x.e, xc = x.c, ye = y.e, yc = y.c;
    // Either zero?
    if (!xc[0] || !yc[0]) {
        if (!yc[0]) {
            if (xc[0]) {
                y = new Big(x);
            } else {
                y.s = x.s;
            }
        }
        return y;
    }
    xc = xc.slice();
    // Prepend zeros to equalise exponents.
    // Note: reverse faster than unshifts.
    if (e = xe - ye) {
        if (e > 0) {
            ye = xe;
            t = yc;
        } else {
            e = -e;
            t = xc;
        }
        t.reverse();
        for(; e--;)t.push(0);
        t.reverse();
    }
    // Point xc to the longer array.
    if (xc.length - yc.length < 0) {
        t = yc;
        yc = xc;
        xc = t;
    }
    e = yc.length;
    // Only start adding at yc.length - 1 as the further digits of xc can be left as they are.
    for(k = 0; e; xc[e] %= 10)k = (xc[--e] = xc[e] + yc[e] + k) / 10 | 0;
    // No need to check for zero, as +x + +y != 0 && -x + -y != 0
    if (k) {
        xc.unshift(k);
        ++ye;
    }
    // Remove trailing zeros.
    for(e = xc.length; xc[--e] === 0;)xc.pop();
    y.c = xc;
    y.e = ye;
    return y;
};
/*
 * Return a Big whose value is the value of this Big raised to the power n.
 * If n is negative, round to a maximum of Big.DP decimal places using rounding
 * mode Big.RM.
 *
 * n {number} Integer, -MAX_POWER to MAX_POWER inclusive.
 */ P.pow = function(n) {
    var x = this, one = new x.constructor('1'), y = one, isneg = n < 0;
    if (n !== ~~n || n < -MAX_POWER || n > MAX_POWER) {
        throw Error(INVALID + 'exponent');
    }
    if (isneg) n = -n;
    for(;;){
        if (n & 1) y = y.times(x);
        n >>= 1;
        if (!n) break;
        x = x.times(x);
    }
    return isneg ? one.div(y) : y;
};
/*
 * Return a new Big whose value is the value of this Big rounded to a maximum precision of sd
 * significant digits using rounding mode rm, or Big.RM if rm is not specified.
 *
 * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */ P.prec = function(sd, rm) {
    if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
        throw Error(INVALID + 'precision');
    }
    return round(new this.constructor(this), sd, rm);
};
/*
 * Return a new Big whose value is the value of this Big rounded to a maximum of dp decimal places
 * using rounding mode rm, or Big.RM if rm is not specified.
 * If dp is negative, round to an integer which is a multiple of 10**-dp.
 * If dp is not specified, round to 0 decimal places.
 *
 * dp? {number} Integer, -MAX_DP to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */ P.round = function(dp, rm) {
    if (dp === UNDEFINED) dp = 0;
    else if (dp !== ~~dp || dp < -MAX_DP || dp > MAX_DP) {
        throw Error(INVALID_DP);
    }
    return round(new this.constructor(this), dp + this.e + 1, rm);
};
/*
 * Return a new Big whose value is the square root of the value of this Big, rounded, if
 * necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
 */ P.sqrt = function() {
    var r, c, t, x = this, Big = x.constructor, s = x.s, e = x.e, half = new Big('0.5');
    // Zero?
    if (!x.c[0]) return new Big(x);
    // Negative?
    if (s < 0) {
        throw Error(NAME + 'No square root');
    }
    // Estimate.
    s = Math.sqrt(+stringify(x, true, true));
    // Math.sqrt underflow/overflow?
    // Re-estimate: pass x coefficient to Math.sqrt as integer, then adjust the result exponent.
    if (s === 0 || s === 1 / 0) {
        c = x.c.join('');
        if (!(c.length + e & 1)) c += '0';
        s = Math.sqrt(c);
        e = ((e + 1) / 2 | 0) - (e < 0 || e & 1);
        r = new Big((s == 1 / 0 ? '5e' : (s = s.toExponential()).slice(0, s.indexOf('e') + 1)) + e);
    } else {
        r = new Big(s + '');
    }
    e = r.e + (Big.DP += 4);
    // Newton-Raphson iteration.
    do {
        t = r;
        r = half.times(t.plus(x.div(t)));
    }while (t.c.slice(0, e).join('') !== r.c.slice(0, e).join(''))
    return round(r, (Big.DP -= 4) + r.e + 1, Big.RM);
};
/*
 * Return a new Big whose value is the value of this Big times the value of Big y.
 */ P.times = P.mul = function(y) {
    var c, x = this, Big = x.constructor, xc = x.c, yc = (y = new Big(y)).c, a = xc.length, b = yc.length, i = x.e, j = y.e;
    // Determine sign of result.
    y.s = x.s == y.s ? 1 : -1;
    // Return signed 0 if either 0.
    if (!xc[0] || !yc[0]) {
        y.c = [
            y.e = 0
        ];
        return y;
    }
    // Initialise exponent of result as x.e + y.e.
    y.e = i + j;
    // If array xc has fewer digits than yc, swap xc and yc, and lengths.
    if (a < b) {
        c = xc;
        xc = yc;
        yc = c;
        j = a;
        a = b;
        b = j;
    }
    // Initialise coefficient array of result with zeros.
    for(c = new Array(j = a + b); j--;)c[j] = 0;
    // Multiply.
    // i is initially xc.length.
    for(i = b; i--;){
        b = 0;
        // a is yc.length.
        for(j = a + i; j > i;){
            // Current sum of products at this digit position, plus carry.
            b = c[j] + yc[i] * xc[j - i - 1] + b;
            c[j--] = b % 10;
            // carry
            b = b / 10 | 0;
        }
        c[j] = b;
    }
    // Increment result exponent if there is a final carry, otherwise remove leading zero.
    if (b) ++y.e;
    else c.shift();
    // Remove trailing zeros.
    for(i = c.length; !c[--i];)c.pop();
    y.c = c;
    return y;
};
/*
 * Return a string representing the value of this Big in exponential notation rounded to dp fixed
 * decimal places using rounding mode rm, or Big.RM if rm is not specified.
 *
 * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */ P.toExponential = function(dp, rm) {
    var x = this, n = x.c[0];
    if (dp !== UNDEFINED) {
        if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
            throw Error(INVALID_DP);
        }
        x = round(new x.constructor(x), ++dp, rm);
        for(; x.c.length < dp;)x.c.push(0);
    }
    return stringify(x, true, !!n);
};
/*
 * Return a string representing the value of this Big in normal notation rounded to dp fixed
 * decimal places using rounding mode rm, or Big.RM if rm is not specified.
 *
 * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 *
 * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
 * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
 */ P.toFixed = function(dp, rm) {
    var x = this, n = x.c[0];
    if (dp !== UNDEFINED) {
        if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
            throw Error(INVALID_DP);
        }
        x = round(new x.constructor(x), dp + x.e + 1, rm);
        // x.e may have changed if the value is rounded up.
        for(dp = dp + x.e + 1; x.c.length < dp;)x.c.push(0);
    }
    return stringify(x, false, !!n);
};
/*
 * Return a string representing the value of this Big.
 * Return exponential notation if this Big has a positive exponent equal to or greater than
 * Big.PE, or a negative exponent equal to or less than Big.NE.
 * Omit the sign for negative zero.
 */ P[Symbol.for('nodejs.util.inspect.custom')] = P.toJSON = P.toString = function() {
    var x = this, Big = x.constructor;
    return stringify(x, x.e <= Big.NE || x.e >= Big.PE, !!x.c[0]);
};
/*
 * Return the value of this Big as a primitve number.
 */ P.toNumber = function() {
    var n = +stringify(this, true, true);
    if (this.constructor.strict === true && !this.eq(n.toString())) {
        throw Error(NAME + 'Imprecise conversion');
    }
    return n;
};
/*
 * Return a string representing the value of this Big rounded to sd significant digits using
 * rounding mode rm, or Big.RM if rm is not specified.
 * Use exponential notation if sd is less than the number of digits necessary to represent
 * the integer part of the value in normal notation.
 *
 * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */ P.toPrecision = function(sd, rm) {
    var x = this, Big = x.constructor, n = x.c[0];
    if (sd !== UNDEFINED) {
        if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
            throw Error(INVALID + 'precision');
        }
        x = round(new Big(x), sd, rm);
        for(; x.c.length < sd;)x.c.push(0);
    }
    return stringify(x, sd <= x.e || x.e <= Big.NE || x.e >= Big.PE, !!n);
};
/*
 * Return a string representing the value of this Big.
 * Return exponential notation if this Big has a positive exponent equal to or greater than
 * Big.PE, or a negative exponent equal to or less than Big.NE.
 * Include the sign for negative zero.
 */ P.valueOf = function() {
    var x = this, Big = x.constructor;
    if (Big.strict === true) {
        throw Error(NAME + 'valueOf disallowed');
    }
    return stringify(x, x.e <= Big.NE || x.e >= Big.PE, true);
};
var Big = _Big_();
const __TURBOPACK__default__export__ = Big;
}),
"[externals]/pino [external] (pino, cjs, [project]/Desktop/frontend/node_modules/@reown/appkit/node_modules/pino)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("pino-4955c9878a62dc6e", () => require("pino-4955c9878a62dc6e"));

module.exports = mod;
}),
"[externals]/pino [external] (pino, cjs, [project]/Desktop/frontend/node_modules/@reown/appkit-controllers/node_modules/pino)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("pino-70e6b067255e347f", () => require("pino-70e6b067255e347f"));

module.exports = mod;
}),
"[externals]/pino [external] (pino, cjs, [project]/Desktop/frontend/node_modules/@reown/appkit-utils/node_modules/pino)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("pino-0871477eb9d84b16", () => require("pino-0871477eb9d84b16"));

module.exports = mod;
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/node_modules/@walletconnect/logger/dist/index.es.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f$pino$29$__ = __turbopack_context__.i("[externals]/pino [external] (pino, cjs, [project]/Desktop/frontend/node_modules/@reown/appkit/node_modules/pino)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/safe-json/dist/esm/index.js [app-ssr] (ecmascript)");
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
        this.level = e ?? "error", this.levelValue = __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f$pino$29$__["levels"].values[this.level], this.MAX_LOG_SIZE_IN_BYTES = t, this.logs = new d(this.MAX_LOG_SIZE_IN_BYTES);
    }
    forwardToConsole(e, t) {
        t === __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f$pino$29$__["levels"].values.error ? console.error(e) : t === __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f$pino$29$__["levels"].values.warn ? console.warn(e) : t === __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f$pino$29$__["levels"].values.debug ? console.debug(e) : t === __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f$pino$29$__["levels"].values.trace ? console.trace(e) : console.log(e);
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
        this.logs = new d(this.MAX_LOG_SIZE_IN_BYTES);
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
        logger: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f$pino$29$__["default"])(g(i({}, r.opts), {
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
        logger: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f$pino$29$__["default"])(g(i({}, r.opts), {
            level: "trace"
        }), t),
        chunkLoggerController: t
    };
}
function A(r) {
    return typeof r.loggerOverride < "u" && typeof r.loggerOverride != "string" ? {
        logger: r.loggerOverride,
        chunkLoggerController: null
    } : ("TURBOPACK compile-time value", "undefined") < "u" ? C(r) : I(r);
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/node_modules/@walletconnect/logger/dist/index.es.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f$pino$29$__ = __turbopack_context__.i("[externals]/pino [external] (pino, cjs, [project]/Desktop/frontend/node_modules/@reown/appkit-controllers/node_modules/pino)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/safe-json/dist/esm/index.js [app-ssr] (ecmascript)");
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
        this.level = e ?? "error", this.levelValue = __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f$pino$29$__["levels"].values[this.level], this.MAX_LOG_SIZE_IN_BYTES = t, this.logs = new d(this.MAX_LOG_SIZE_IN_BYTES);
    }
    forwardToConsole(e, t) {
        t === __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f$pino$29$__["levels"].values.error ? console.error(e) : t === __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f$pino$29$__["levels"].values.warn ? console.warn(e) : t === __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f$pino$29$__["levels"].values.debug ? console.debug(e) : t === __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f$pino$29$__["levels"].values.trace ? console.trace(e) : console.log(e);
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
        this.logs = new d(this.MAX_LOG_SIZE_IN_BYTES);
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
        logger: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f$pino$29$__["default"])(g(i({}, r.opts), {
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
        logger: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f$pino$29$__["default"])(g(i({}, r.opts), {
            level: "trace"
        }), t),
        chunkLoggerController: t
    };
}
function A(r) {
    return typeof r.loggerOverride < "u" && typeof r.loggerOverride != "string" ? {
        logger: r.loggerOverride,
        chunkLoggerController: null
    } : ("TURBOPACK compile-time value", "undefined") < "u" ? C(r) : I(r);
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-utils/node_modules/@walletconnect/logger/dist/index.es.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$node_modules$2f$pino$29$__ = __turbopack_context__.i("[externals]/pino [external] (pino, cjs, [project]/Desktop/frontend/node_modules/@reown/appkit-utils/node_modules/pino)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$safe$2d$json$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@walletconnect/safe-json/dist/esm/index.js [app-ssr] (ecmascript)");
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
        this.level = e ?? "error", this.levelValue = __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$node_modules$2f$pino$29$__["levels"].values[this.level], this.MAX_LOG_SIZE_IN_BYTES = t, this.logs = new d(this.MAX_LOG_SIZE_IN_BYTES);
    }
    forwardToConsole(e, t) {
        t === __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$node_modules$2f$pino$29$__["levels"].values.error ? console.error(e) : t === __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$node_modules$2f$pino$29$__["levels"].values.warn ? console.warn(e) : t === __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$node_modules$2f$pino$29$__["levels"].values.debug ? console.debug(e) : t === __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$node_modules$2f$pino$29$__["levels"].values.trace ? console.trace(e) : console.log(e);
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
        this.logs = new d(this.MAX_LOG_SIZE_IN_BYTES);
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
        logger: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$node_modules$2f$pino$29$__["default"])(g(i({}, r.opts), {
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
        logger: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$node_modules$2f$pino$29$__["default"])(g(i({}, r.opts), {
            level: "trace"
        }), t),
        chunkLoggerController: t
    };
}
function A(r) {
    return typeof r.loggerOverride < "u" && typeof r.loggerOverride != "string" ? {
        logger: r.loggerOverride,
        chunkLoggerController: null
    } : ("TURBOPACK compile-time value", "undefined") < "u" ? C(r) : I(r);
}
;
 //# sourceMappingURL=index.es.js.map
}),
"[externals]/pino [external] (pino, cjs, [project]/Desktop/frontend/node_modules/@reown/appkit/node_modules/pino) <export default as pino>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pino",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f$pino$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f$pino$29$__ = __turbopack_context__.i("[externals]/pino [external] (pino, cjs, [project]/Desktop/frontend/node_modules/@reown/appkit/node_modules/pino)");
}),
"[externals]/pino [external] (pino, cjs, [project]/Desktop/frontend/node_modules/@reown/appkit-controllers/node_modules/pino) <export default as pino>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pino",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f$pino$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f$pino$29$__ = __turbopack_context__.i("[externals]/pino [external] (pino, cjs, [project]/Desktop/frontend/node_modules/@reown/appkit-controllers/node_modules/pino)");
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/node_modules/@walletconnect/types/dist/index.es.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/node_modules/@walletconnect/types/dist/index.es.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/node_modules/@noble/hashes/esm/_u64.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Desktop/frontend/node_modules/@reown/appkit/node_modules/@noble/hashes/esm/cryptoNode.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "crypto",
    ()=>crypto
]);
/**
 * Internal webcrypto alias.
 * We prefer WebCrypto aka globalThis.crypto, which exists in node.js 16+.
 * Falls back to Node.js built-in crypto for Node.js <=v14.
 * See utils.ts for details.
 * @module
 */ // @ts-ignore
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
;
const crypto = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ && typeof __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ === 'object' && 'webcrypto' in __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ ? __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__.webcrypto : __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ && typeof __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ === 'object' && 'randomBytes' in __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ ? __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ : undefined; //# sourceMappingURL=cryptoNode.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/node_modules/@noble/hashes/esm/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$cryptoNode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/node_modules/@noble/hashes/esm/cryptoNode.js [app-ssr] (ecmascript)");
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
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$cryptoNode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["crypto"] && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$cryptoNode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["crypto"].getRandomValues === 'function') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$cryptoNode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["crypto"].getRandomValues(new Uint8Array(bytesLength));
    }
    // Legacy Node.js compatibility
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$cryptoNode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["crypto"] && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$cryptoNode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["crypto"].randomBytes === 'function') {
        return Uint8Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$cryptoNode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["crypto"].randomBytes(bytesLength));
    }
    throw new Error('crypto.getRandomValues must be defined');
} //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/node_modules/@noble/hashes/esm/sha3.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/node_modules/@noble/hashes/esm/_u64.js [app-ssr] (ecmascript)");
// prettier-ignore
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/node_modules/@noble/hashes/esm/utils.js [app-ssr] (ecmascript)");
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
const IOTAS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["split"])(_SHA3_IOTA, true);
const SHA3_IOTA_H = IOTAS[0];
const SHA3_IOTA_L = IOTAS[1];
// Left rotation (without 0, 32, 64)
const rotlH = (h, l, s)=>s > 32 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotlBH"])(h, l, s) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotlSH"])(h, l, s);
const rotlL = (h, l, s)=>s > 32 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotlBL"])(h, l, s) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotlSL"])(h, l, s);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clean"])(B);
}
class Keccak extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Hash"] {
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["anumber"])(outputLen);
        // 1600 = 5x5 matrix of 64bit.  1600 bits === 200 bytes
        // 0 < blockLen < 200
        if (!(0 < blockLen && blockLen < 200)) throw new Error('only keccak-f1600 function is supported');
        this.state = new Uint8Array(200);
        this.state32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u32"])(this.state);
    }
    clone() {
        return this._cloneInto();
    }
    keccak() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap32IfBE"])(this.state32);
        keccakP(this.state32, this.rounds);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap32IfBE"])(this.state32);
        this.posOut = 0;
        this.pos = 0;
    }
    update(data) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["aexists"])(this);
        data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBytes"])(data);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["abytes"])(data);
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["aexists"])(this, false);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["abytes"])(out);
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["anumber"])(bytes);
        return this.xofInto(new Uint8Array(bytes));
    }
    digestInto(out) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["aoutput"])(out, this);
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clean"])(this.state);
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
const gen = (suffix, blockLen, outputLen)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createHasher"])(()=>new Keccak(blockLen, suffix, outputLen));
const sha3_224 = /* @__PURE__ */ (()=>gen(0x06, 144, 224 / 8))();
const sha3_256 = /* @__PURE__ */ (()=>gen(0x06, 136, 256 / 8))();
const sha3_384 = /* @__PURE__ */ (()=>gen(0x06, 104, 384 / 8))();
const sha3_512 = /* @__PURE__ */ (()=>gen(0x06, 72, 512 / 8))();
const keccak_224 = /* @__PURE__ */ (()=>gen(0x01, 144, 224 / 8))();
const keccak_256 = /* @__PURE__ */ (()=>gen(0x01, 136, 256 / 8))();
const keccak_384 = /* @__PURE__ */ (()=>gen(0x01, 104, 384 / 8))();
const keccak_512 = /* @__PURE__ */ (()=>gen(0x01, 72, 512 / 8))();
const genShake = (suffix, blockLen, outputLen)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createXOFer"])((opts = {})=>new Keccak(blockLen, suffix, opts.dkLen === undefined ? outputLen : opts.dkLen, true));
const shake128 = /* @__PURE__ */ (()=>genShake(0x1f, 168, 128 / 8))();
const shake256 = /* @__PURE__ */ (()=>genShake(0x1f, 136, 256 / 8))(); //# sourceMappingURL=sha3.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/node_modules/@noble/hashes/esm/_u64.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/node_modules/@noble/hashes/esm/cryptoNode.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "crypto",
    ()=>crypto
]);
/**
 * Internal webcrypto alias.
 * We prefer WebCrypto aka globalThis.crypto, which exists in node.js 16+.
 * Falls back to Node.js built-in crypto for Node.js <=v14.
 * See utils.ts for details.
 * @module
 */ // @ts-ignore
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
;
const crypto = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ && typeof __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ === 'object' && 'webcrypto' in __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ ? __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__.webcrypto : __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ && typeof __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ === 'object' && 'randomBytes' in __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ ? __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ : undefined; //# sourceMappingURL=cryptoNode.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/node_modules/@noble/hashes/esm/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$cryptoNode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/node_modules/@noble/hashes/esm/cryptoNode.js [app-ssr] (ecmascript)");
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
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$cryptoNode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["crypto"] && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$cryptoNode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["crypto"].getRandomValues === 'function') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$cryptoNode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["crypto"].getRandomValues(new Uint8Array(bytesLength));
    }
    // Legacy Node.js compatibility
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$cryptoNode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["crypto"] && typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$cryptoNode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["crypto"].randomBytes === 'function') {
        return Uint8Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$cryptoNode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["crypto"].randomBytes(bytesLength));
    }
    throw new Error('crypto.getRandomValues must be defined');
} //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/node_modules/@noble/hashes/esm/sha3.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/node_modules/@noble/hashes/esm/_u64.js [app-ssr] (ecmascript)");
// prettier-ignore
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/node_modules/@noble/hashes/esm/utils.js [app-ssr] (ecmascript)");
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
const IOTAS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["split"])(_SHA3_IOTA, true);
const SHA3_IOTA_H = IOTAS[0];
const SHA3_IOTA_L = IOTAS[1];
// Left rotation (without 0, 32, 64)
const rotlH = (h, l, s)=>s > 32 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotlBH"])(h, l, s) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotlSH"])(h, l, s);
const rotlL = (h, l, s)=>s > 32 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotlBL"])(h, l, s) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotlSL"])(h, l, s);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clean"])(B);
}
class Keccak extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Hash"] {
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["anumber"])(outputLen);
        // 1600 = 5x5 matrix of 64bit.  1600 bits === 200 bytes
        // 0 < blockLen < 200
        if (!(0 < blockLen && blockLen < 200)) throw new Error('only keccak-f1600 function is supported');
        this.state = new Uint8Array(200);
        this.state32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u32"])(this.state);
    }
    clone() {
        return this._cloneInto();
    }
    keccak() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap32IfBE"])(this.state32);
        keccakP(this.state32, this.rounds);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["swap32IfBE"])(this.state32);
        this.posOut = 0;
        this.pos = 0;
    }
    update(data) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["aexists"])(this);
        data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBytes"])(data);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["abytes"])(data);
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["aexists"])(this, false);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["abytes"])(out);
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["anumber"])(bytes);
        return this.xofInto(new Uint8Array(bytes));
    }
    digestInto(out) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["aoutput"])(out, this);
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clean"])(this.state);
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
const gen = (suffix, blockLen, outputLen)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createHasher"])(()=>new Keccak(blockLen, suffix, outputLen));
const sha3_224 = /* @__PURE__ */ (()=>gen(0x06, 144, 224 / 8))();
const sha3_256 = /* @__PURE__ */ (()=>gen(0x06, 136, 256 / 8))();
const sha3_384 = /* @__PURE__ */ (()=>gen(0x06, 104, 384 / 8))();
const sha3_512 = /* @__PURE__ */ (()=>gen(0x06, 72, 512 / 8))();
const keccak_224 = /* @__PURE__ */ (()=>gen(0x01, 144, 224 / 8))();
const keccak_256 = /* @__PURE__ */ (()=>gen(0x01, 136, 256 / 8))();
const keccak_384 = /* @__PURE__ */ (()=>gen(0x01, 104, 384 / 8))();
const keccak_512 = /* @__PURE__ */ (()=>gen(0x01, 72, 512 / 8))();
const genShake = (suffix, blockLen, outputLen)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createXOFer"])((opts = {})=>new Keccak(blockLen, suffix, opts.dkLen === undefined ? outputLen : opts.dkLen, true));
const shake128 = /* @__PURE__ */ (()=>genShake(0x1f, 168, 128 / 8))();
const shake256 = /* @__PURE__ */ (()=>genShake(0x1f, 136, 256 / 8))(); //# sourceMappingURL=sha3.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit/node_modules/@walletconnect/universal-provider/dist/index.es.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UniversalProvider",
    ()=>rs,
    "default",
    ()=>N
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$sign$2d$client$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/node_modules/@walletconnect/sign-client/dist/index.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/node_modules/@walletconnect/utils/dist/index.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit/node_modules/@walletconnect/logger/dist/index.es.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f$pino$29$__$3c$export__default__as__pino$3e$__ = __turbopack_context__.i("[externals]/pino [external] (pino, cjs, [project]/Desktop/frontend/node_modules/@reown/appkit/node_modules/pino) <export default as pino>");
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
;
const Z = "error", Fe = "wss://relay.walletconnect.org", He = "wc", Ue = "universal_provider", $ = `${He}@2:${Ue}:`, T = "https://rpc.walletconnect.org/v1/", ee = "generic", Be = `${T}bundler`, y = "call_status", Le = 86400, _ = {
    DEFAULT_CHAIN_CHANGED: "default_chain_changed"
};
function x(t) {
    return t == null || typeof t != "object" && typeof t != "function";
}
function te(t) {
    return Object.getOwnPropertySymbols(t).filter((e)=>Object.prototype.propertyIsEnumerable.call(t, e));
}
function se(t) {
    return t == null ? t === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(t);
}
const Me = "[object RegExp]", ie = "[object String]", ne = "[object Number]", re = "[object Boolean]", ae = "[object Arguments]", ze = "[object Symbol]", Ge = "[object Date]", We = "[object Map]", Je = "[object Set]", Ke = "[object Array]", Ve = "[object ArrayBuffer]", Ye = "[object Object]", Xe = "[object DataView]", ke = "[object Uint8Array]", Qe = "[object Uint8ClampedArray]", Ze = "[object Uint16Array]", Te = "[object Uint32Array]", et = "[object Int8Array]", tt = "[object Int16Array]", st = "[object Int32Array]", it = "[object Float32Array]", nt = "[object Float64Array]";
function F(t) {
    return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function rt(t, e) {
    return v(t, void 0, t, new Map, e);
}
function v(t, e, s, i = new Map, r = void 0) {
    const a = r?.(t, e, s, i);
    if (a != null) return a;
    if (x(t)) return t;
    if (i.has(t)) return i.get(t);
    if (Array.isArray(t)) {
        const n = new Array(t.length);
        i.set(t, n);
        for(let c = 0; c < t.length; c++)n[c] = v(t[c], c, s, i, r);
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
        for (const [c, o] of t)n.set(c, v(o, c, s, i, r));
        return n;
    }
    if (t instanceof Set) {
        const n = new Set;
        i.set(t, n);
        for (const c of t)n.add(v(c, void 0, s, i, r));
        return n;
    }
    if (typeof Buffer < "u" && Buffer.isBuffer(t)) return t.subarray();
    if (F(t)) {
        const n = new (Object.getPrototypeOf(t)).constructor(t.length);
        i.set(t, n);
        for(let c = 0; c < t.length; c++)n[c] = v(t[c], c, s, i, r);
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
    if (typeof t == "object" && at(t)) {
        const n = Object.create(Object.getPrototypeOf(t));
        return i.set(t, n), m(n, t, s, i, r), n;
    }
    return t;
}
function m(t, e, s = t, i, r) {
    const a = [
        ...Object.keys(e),
        ...te(e)
    ];
    for(let n = 0; n < a.length; n++){
        const c = a[n], o = Object.getOwnPropertyDescriptor(t, c);
        (o == null || o.writable) && (t[c] = v(e[c], c, s, i, r));
    }
}
function at(t) {
    switch(se(t)){
        case ae:
        case Ke:
        case Ve:
        case Xe:
        case re:
        case Ge:
        case it:
        case nt:
        case et:
        case tt:
        case st:
        case We:
        case ne:
        case Ye:
        case Me:
        case Je:
        case ie:
        case ze:
        case ke:
        case Qe:
        case Ze:
        case Te:
            return !0;
        default:
            return !1;
    }
}
function ct(t, e) {
    return rt(t, (s, i, r, a)=>{
        const n = e?.(s, i, r, a);
        if (n != null) return n;
        if (typeof t == "object") switch(Object.prototype.toString.call(t)){
            case ne:
            case ie:
            case re:
                {
                    const c = new t.constructor(t?.valueOf());
                    return m(c, t), c;
                }
            case ae:
                {
                    const c = {};
                    return m(c, t), c.length = t.length, c[Symbol.iterator] = t[Symbol.iterator], c;
                }
            default:
                return;
        }
    });
}
function ce(t) {
    return ct(t);
}
function oe(t) {
    return t !== null && typeof t == "object" && se(t) === "[object Arguments]";
}
function pe(t) {
    return typeof t == "object" && t !== null;
}
function ot() {}
function pt(t) {
    return F(t);
}
function ht(t) {
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
function lt(t) {
    if (x(t)) return t;
    if (Array.isArray(t) || F(t) || t instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer) return t.slice(0);
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
function ut(t, ...e) {
    const s = e.slice(0, -1), i = e[e.length - 1];
    let r = t;
    for(let a = 0; a < s.length; a++){
        const n = s[a];
        r = A(r, n, i, new Map);
    }
    return r;
}
function A(t, e, s, i) {
    if (x(t) && (t = Object(t)), e == null || typeof e != "object") return t;
    if (i.has(e)) return lt(i.get(e));
    if (i.set(e, t), Array.isArray(e)) {
        e = e.slice();
        for(let a = 0; a < e.length; a++)e[a] = e[a] ?? void 0;
    }
    const r = [
        ...Object.keys(e),
        ...te(e)
    ];
    for(let a = 0; a < r.length; a++){
        const n = r[a];
        let c = e[n], o = t[n];
        if (oe(c) && (c = {
            ...c
        }), oe(o) && (o = {
            ...o
        }), typeof Buffer < "u" && Buffer.isBuffer(c) && (c = ce(c)), Array.isArray(c)) if (typeof o == "object" && o != null) {
            const l = [], p = Reflect.ownKeys(o);
            for(let f = 0; f < p.length; f++){
                const u = p[f];
                l[u] = o[u];
            }
            o = l;
        } else o = [];
        const h = s(o, c, n, t, e, i);
        h != null ? t[n] = h : Array.isArray(c) || pe(o) && pe(c) ? t[n] = A(o, c, s, i) : o == null && ht(c) ? t[n] = A({}, c, s, i) : o == null && pt(c) ? t[n] = ce(c) : (o === void 0 || c !== void 0) && (t[n] = c);
    }
    return t;
}
function dt(t, ...e) {
    return ut(t, ...e, ot);
}
var ft = Object.defineProperty, mt = Object.defineProperties, gt = Object.getOwnPropertyDescriptors, he = Object.getOwnPropertySymbols, yt = Object.prototype.hasOwnProperty, vt = Object.prototype.propertyIsEnumerable, le = (t, e, s)=>e in t ? ft(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : t[e] = s, E = (t, e)=>{
    for(var s in e || (e = {}))yt.call(e, s) && le(t, s, e[s]);
    if (he) for (var s of he(e))vt.call(e, s) && le(t, s, e[s]);
    return t;
}, wt = (t, e)=>mt(t, gt(e));
function ue(t, e, s) {
    var i;
    const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseChainId"])(t);
    return ((i = e.rpcMap) == null ? void 0 : i[r.reference]) || `${T}?chainId=${r.namespace}:${r.reference}&projectId=${s}`;
}
function bt(t) {
    return t.includes(":") ? t.split(":")[1] : t;
}
function de(t) {
    return t.map((e)=>`${e.split(":")[0]}:${e.split(":")[1]}`);
}
function Pt(t, e) {
    const s = Object.keys(e.namespaces).filter((r)=>r.includes(t));
    if (!s.length) return [];
    const i = [];
    return s.forEach((r)=>{
        const a = e.namespaces[r].accounts;
        i.push(...a);
    }), i;
}
function fe(t) {
    return Object.fromEntries(Object.entries(t).filter(([e, s])=>{
        var i, r;
        return ((i = s?.chains) == null ? void 0 : i.length) && ((r = s?.chains) == null ? void 0 : r.length) > 0;
    }));
}
function j(t = {}, e = {}) {
    const s = fe(me(t)), i = fe(me(e));
    return dt(s, i);
}
function me(t) {
    var e, s, i, r, a;
    const n = {};
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidObject"])(t)) return n;
    for (const [c, o] of Object.entries(t)){
        const h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCaipNamespace"])(c) ? [
            c
        ] : o.chains, l = o.methods || [], p = o.events || [], f = o.rpcMap || {}, u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(c);
        n[u] = wt(E(E({}, n[u]), o), {
            chains: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeArrays"])(h, (e = n[u]) == null ? void 0 : e.chains),
            methods: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeArrays"])(l, (s = n[u]) == null ? void 0 : s.methods),
            events: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeArrays"])(p, (i = n[u]) == null ? void 0 : i.events)
        }), ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidObject"])(f) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidObject"])(((r = n[u]) == null ? void 0 : r.rpcMap) || {})) && (n[u].rpcMap = E(E({}, f), (a = n[u]) == null ? void 0 : a.rpcMap));
    }
    return n;
}
function ge(t) {
    return t.includes(":") ? t.split(":")[2] : t;
}
function ye(t) {
    const e = {};
    for (const [s, i] of Object.entries(t)){
        const r = i.methods || [], a = i.events || [], n = i.accounts || [], c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCaipNamespace"])(s) ? [
            s
        ] : i.chains ? i.chains : de(i.accounts);
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
function Ot(t) {
    try {
        const e = JSON.parse(t);
        return typeof e == "object" && e !== null && !Array.isArray(e);
    } catch  {
        return !1;
    }
}
const ve = {}, w = (t)=>ve[t], U = (t, e)=>{
    ve[t] = e;
};
var It = Object.defineProperty, we = Object.getOwnPropertySymbols, St = Object.prototype.hasOwnProperty, $t = Object.prototype.propertyIsEnumerable, be = (t, e, s)=>e in t ? It(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : t[e] = s, Pe = (t, e)=>{
    for(var s in e || (e = {}))St.call(e, s) && be(t, s, e[s]);
    if (we) for (var s of we(e))$t.call(e, s) && be(t, s, e[s]);
    return t;
};
const Oe = "eip155", At = [
    "atomic",
    "flow-control",
    "paymasterService",
    "sessionKeys",
    "auxiliaryFunds"
], Et = (t)=>t && t.startsWith("0x") ? BigInt(t).toString(10) : t, B = (t)=>t && t.startsWith("0x") ? t : `0x${BigInt(t).toString(16)}`, Ie = (t)=>Object.keys(t).filter((e)=>At.includes(e)).reduce((e, s)=>(e[s] = jt(t[s]), e), {}), jt = (t)=>typeof t == "string" && Ot(t) ? JSON.parse(t) : t, Ct = (t, e, s)=>{
    const { sessionProperties: i = {}, scopedProperties: r = {} } = t, a = {};
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidObject"])(r) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidObject"])(i)) return;
    const n = Ie(i);
    for (const c of s){
        const o = Et(c);
        if (!o) continue;
        a[B(o)] = n;
        const h = r?.[`${Oe}:${o}`];
        if (h) {
            const l = h?.[`${Oe}:${o}:${e}`];
            a[B(o)] = Pe(Pe({}, a[B(o)]), Ie(l || h));
        }
    }
    for (const [c, o] of Object.entries(a))Object.keys(o).length === 0 && delete a[c];
    return Object.keys(a).length > 0 ? a : void 0;
};
var Nt = Object.defineProperty, Dt = (t, e, s)=>e in t ? Nt(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : t[e] = s, qt = (t, e, s)=>Dt(t, typeof e != "symbol" ? e + "" : e, s);
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
var Rt = Object.defineProperty, _t = Object.defineProperties, xt = Object.getOwnPropertyDescriptors, Se = Object.getOwnPropertySymbols, Ft = Object.prototype.hasOwnProperty, Ht = Object.prototype.propertyIsEnumerable, $e = (t, e, s)=>e in t ? Rt(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : t[e] = s, Ut = (t, e)=>{
    for(var s in e || (e = {}))Ft.call(e, s) && $e(t, s, e[s]);
    if (Se) for (var s of Se(e))Ht.call(e, s) && $e(t, s, e[s]);
    return t;
}, Bt = (t, e)=>_t(t, xt(e));
async function Lt(t, e) {
    const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseChainId"])(t.result.capabilities.caip345.caip2), i = t.result.capabilities.caip345.transactionHashes, r = await Promise.allSettled(i.map((p)=>Mt(s.reference, p, e))), a = r.filter((p)=>p.status === "fulfilled").map((p)=>p.value).filter((p)=>p);
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
async function Mt(t, e, s) {
    return await s(parseInt(t)).request((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatJsonRpcRequest"])("eth_getTransactionReceipt", [
        e
    ]));
}
async function zt({ sendCalls: t, storage: e }) {
    const s = await e.getItem(y);
    await e.setItem(y, Bt(Ut({}, s), {
        [t.result.id]: {
            request: t.request,
            result: t.result,
            expiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calcExpiry"])(Le)
        }
    }));
}
async function Gt({ resultId: t, storage: e }) {
    const s = await e.getItem(y);
    if (s) {
        delete s[t], await e.setItem(y, s);
        for(const i in s)(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isExpired"])(s[i].expiry) && delete s[i];
        await e.setItem(y, s);
    }
}
async function Wt({ resultId: t, storage: e }) {
    const s = await e.getItem(y), i = s?.[t];
    if (i && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isExpired"])(i.expiry)) return i;
    await Gt({
        resultId: t,
        storage: e
    });
}
var Jt = Object.defineProperty, Kt = Object.defineProperties, Vt = Object.getOwnPropertyDescriptors, Ae = Object.getOwnPropertySymbols, Yt = Object.prototype.hasOwnProperty, Xt = Object.prototype.propertyIsEnumerable, M = (t, e, s)=>e in t ? Jt(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : t[e] = s, z = (t, e)=>{
    for(var s in e || (e = {}))Yt.call(e, s) && M(t, s, e[s]);
    if (Ae) for (var s of Ae(e))Xt.call(e, s) && M(t, s, e[s]);
    return t;
}, G = (t, e)=>Kt(t, Vt(e)), g = (t, e, s)=>M(t, typeof e != "symbol" ? e + "" : e, s);
class kt {
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
        this.chainId = parseInt(e), this.events.emit(_.DEFAULT_CHAIN_CHANGED, {
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
        const i = s || ue(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
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
            const r = parseInt(bt(s));
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
        } catch (D) {
            console.warn("Failed to extract capabilities from session", D);
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
        } catch (D) {
            console.warn("Failed to update session with capabilities", D);
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
        const o = await Wt({
            resultId: (r = e.request.params) == null ? void 0 : r[0],
            storage: this.storage
        });
        if (o) try {
            return await Lt(o, this.getHttpProvider.bind(this));
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
        return `${Be}?projectId=${this.client.core.projectId}&chainId=${e}&bundler=${s}`;
    }
    async sendCalls(e) {
        var s, i, r;
        const a = await this.client.request(e), n = (s = e.request.params) == null ? void 0 : s[0], c = a?.id, o = a?.capabilities || {}, h = (i = o?.caip345) == null ? void 0 : i.caip2, l = (r = o?.caip345) == null ? void 0 : r.transactionHashes;
        return !c || !h || !(l != null && l.length) || await zt({
            sendCalls: {
                request: n,
                result: a
            },
            storage: this.storage
        }), a;
    }
}
var Qt = Object.defineProperty, Zt = (t, e, s)=>e in t ? Qt(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : t[e] = s, b = (t, e, s)=>Zt(t, typeof e != "symbol" ? e + "" : e, s);
class Tt {
    constructor(e){
        b(this, "name", ee), b(this, "client"), b(this, "httpProviders"), b(this, "events"), b(this, "namespace"), b(this, "chainId"), this.namespace = e.namespace, this.events = w("events"), this.client = w("client"), this.chainId = this.getDefaultChain(), this.name = this.getNamespaceName(), this.httpProviders = this.createHttpProviders();
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
        this.chainId = e, this.events.emit(_.DEFAULT_CHAIN_CHANGED, {
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
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseChainId"])(e).namespace;
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
            const c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseChainId"])(r), o = (n = (a = this.namespace) == null ? void 0 : a.rpcMap) == null ? void 0 : n[`${c.namespace}:${c.reference}`];
            i[c.reference] = this.createHttpProvider(r, o);
        }), i;
    }
    getHttpProvider(e) {
        const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseChainId"])(e).reference, i = this.httpProviders[s];
        if (typeof i > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
        return i;
    }
    setHttpProvider(e, s) {
        const i = this.createHttpProvider(e, s);
        i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, s) {
        const i = s || ue(e, this.namespace, this.client.core.projectId);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](i, w("disableProviderPing")));
    }
}
var es = Object.defineProperty, ts = Object.defineProperties, ss = Object.getOwnPropertyDescriptors, Ee = Object.getOwnPropertySymbols, is = Object.prototype.hasOwnProperty, ns = Object.prototype.propertyIsEnumerable, W = (t, e, s)=>e in t ? es(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : t[e] = s, S = (t, e)=>{
    for(var s in e || (e = {}))is.call(e, s) && W(t, s, e[s]);
    if (Ee) for (var s of Ee(e))ns.call(e, s) && W(t, s, e[s]);
    return t;
}, C = (t, e)=>ts(t, ss(e)), d = (t, e, s)=>W(t, typeof e != "symbol" ? e + "" : e, s);
class N {
    constructor(e){
        d(this, "client"), d(this, "namespaces"), d(this, "optionalNamespaces"), d(this, "sessionProperties"), d(this, "scopedProperties"), d(this, "events", new __TURBOPACK__imported__module__$5b$externals$5d2f$events__$5b$external$5d$__$28$events$2c$__cjs$29$__["default"]), d(this, "rpcProviders", {}), d(this, "session"), d(this, "providerOpts"), d(this, "logger"), d(this, "uri"), d(this, "disableProviderPing", !1), this.providerOpts = e, this.logger = typeof e?.logger < "u" && typeof e?.logger != "string" ? e.logger : (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f$pino$29$__$3c$export__default__as__pino$3e$__["pino"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDefaultLoggerOptions"])({
            level: e?.logger || Z
        })), this.disableProviderPing = e?.disableProviderPing || !1;
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
            reason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSdkError"])("USER_DISCONNECTED")
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
            const n = ye(this.session.namespaces);
            this.namespaces = j(this.namespaces, n), await this.persist("namespaces", this.namespaces), this.onConnect();
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
        const a = ye(r.namespaces);
        return this.namespaces = j(this.namespaces, a), await this.persist("namespaces", this.namespaces), await this.persist("optionalNamespaces", this.optionalNamespaces), this.onConnect(), this.session;
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
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidArray"])(s)) return;
            for (const i of s)e.deletePairings ? this.client.core.expirer.set(i.topic, 0) : await this.client.core.relayer.subscriber.unsubscribe(i.topic);
            this.logger.info(`Inactive pairings cleared: ${s.length}`);
        } catch (s) {
            this.logger.warn("Failed to cleanup pending pairings", s);
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
        if (this.client = this.providerOpts.client || await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$sign$2d$client$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].init({
            core: this.providerOpts.core,
            logger: this.providerOpts.logger || Z,
            relayUrl: this.providerOpts.relayUrl || Fe,
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
            throw this.logger.error("Failed to get session", i), new Error(`The provided session: ${(s = (e = this.providerOpts) == null ? void 0 : e.session) == null ? void 0 : s.topic} doesn't exist in the Sign client`);
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
            ...new Set(Object.keys(this.session.namespaces).map((s)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(s)))
        ];
        U("client", this.client), U("events", this.events), U("disableProviderPing", this.disableProviderPing), e.forEach((s)=>{
            if (!this.session) return;
            const i = Pt(s, this.session);
            if (i?.length === 0) return;
            const r = de(i), a = j(this.namespaces, this.optionalNamespaces), n = C(S({}, a[s]), {
                accounts: i,
                chains: r
            });
            switch(s){
                case "eip155":
                    this.rpcProviders[s] = new kt({
                        namespace: n
                    });
                    break;
                default:
                    this.rpcProviders[s] = new Tt({
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
                n && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidArray"])(n) && this.events.emit("accountsChanged", n.map(ge));
            } else if (a.name === "chainChanged") {
                const n = i.chainId, c = i.event.data, o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(n), h = H(n) !== H(c) ? `${o}:${H(c)}` : n;
                this.onChainChanged({
                    currentCaipChainId: h
                });
            } else this.events.emit(a.name, a.data);
            this.events.emit("session_event", e);
        }), this.client.on("session_update", ({ topic: e, params: s })=>{
            var i, r;
            if (e !== ((i = this.session) == null ? void 0 : i.topic)) return;
            const { namespaces: a } = s, n = (r = this.client) == null ? void 0 : r.session.get(e);
            this.session = C(S({}, n), {
                namespaces: a
            }), this.onSessionUpdate(), this.events.emit("session_update", {
                topic: e,
                params: s
            });
        }), this.client.on("session_delete", async (e)=>{
            var s;
            e.topic === ((s = this.session) == null ? void 0 : s.topic) && (await this.cleanup(), this.events.emit("session_delete", e), this.events.emit("disconnect", C(S({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSdkError"])("USER_DISCONNECTED")), {
                data: e.topic
            })));
        }), this.on(_.DEFAULT_CHAIN_CHANGED, (e)=>{
            this.onChainChanged(C(S({}, e), {
                internal: !0
            }));
        });
    }
    getProvider(e) {
        return this.rpcProviders[e] || this.rpcProviders[ee];
    }
    onSessionUpdate() {
        Object.keys(this.rpcProviders).forEach((e)=>{
            var s;
            this.getProvider(e).updateNamespace((s = this.session) == null ? void 0 : s.namespaces[e]);
        });
    }
    setNamespaces(e) {
        const { namespaces: s = {}, optionalNamespaces: i = {}, sessionProperties: r, scopedProperties: a } = e;
        this.optionalNamespaces = j(s, i), this.sessionProperties = r, this.scopedProperties = a;
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
        if (s && !Object.keys(this.namespaces || {}).map((n)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(n)).includes(s)) throw new Error(`Namespace '${s}' is not configured. Please call connect() first with namespace config.`);
        if (s && i) return [
            s,
            i
        ];
        const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(Object.keys(this.namespaces)[0]), a = this.rpcProviders[r].getDefaultChain();
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
            const c = n.filter((o)=>o.includes(`${s}:`)).map(ge);
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidArray"])(c)) return;
            this.events.emit("accountsChanged", c);
        } catch (n) {
            this.logger.warn("Failed to emit accountsChanged on chain change", n);
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
        await this.client.core.storage.setItem(`${$}/${e}${r}`, s);
    }
    async getFromStore(e) {
        var s;
        const i = ((s = this.session) == null ? void 0 : s.topic) || "";
        return await this.client.core.storage.getItem(`${$}/${e}${i}`);
    }
    async deleteFromStore(e) {
        var s;
        const i = ((s = this.session) == null ? void 0 : s.topic) || "";
        await this.client.core.storage.removeItem(`${$}/${e}${i}`);
    }
    async cleanupStorage() {
        var e;
        try {
            if (((e = this.client) == null ? void 0 : e.session.length) > 0) return;
            const s = await this.client.core.storage.getKeys();
            for (const i of s)i.startsWith($) && await this.client.core.storage.removeItem(i);
        } catch (s) {
            this.logger.warn("Failed to cleanup storage", s);
        }
    }
}
const rs = N;
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/node_modules/@walletconnect/universal-provider/dist/index.es.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UniversalProvider",
    ()=>rs,
    "default",
    ()=>N
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$sign$2d$client$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/node_modules/@walletconnect/sign-client/dist/index.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/node_modules/@walletconnect/utils/dist/index.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/node_modules/@walletconnect/logger/dist/index.es.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f$pino$29$__$3c$export__default__as__pino$3e$__ = __turbopack_context__.i("[externals]/pino [external] (pino, cjs, [project]/Desktop/frontend/node_modules/@reown/appkit-controllers/node_modules/pino) <export default as pino>");
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
;
const Z = "error", Fe = "wss://relay.walletconnect.org", He = "wc", Ue = "universal_provider", $ = `${He}@2:${Ue}:`, T = "https://rpc.walletconnect.org/v1/", ee = "generic", Be = `${T}bundler`, y = "call_status", Le = 86400, _ = {
    DEFAULT_CHAIN_CHANGED: "default_chain_changed"
};
function x(t) {
    return t == null || typeof t != "object" && typeof t != "function";
}
function te(t) {
    return Object.getOwnPropertySymbols(t).filter((e)=>Object.prototype.propertyIsEnumerable.call(t, e));
}
function se(t) {
    return t == null ? t === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(t);
}
const Me = "[object RegExp]", ie = "[object String]", ne = "[object Number]", re = "[object Boolean]", ae = "[object Arguments]", ze = "[object Symbol]", Ge = "[object Date]", We = "[object Map]", Je = "[object Set]", Ke = "[object Array]", Ve = "[object ArrayBuffer]", Ye = "[object Object]", Xe = "[object DataView]", ke = "[object Uint8Array]", Qe = "[object Uint8ClampedArray]", Ze = "[object Uint16Array]", Te = "[object Uint32Array]", et = "[object Int8Array]", tt = "[object Int16Array]", st = "[object Int32Array]", it = "[object Float32Array]", nt = "[object Float64Array]";
function F(t) {
    return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function rt(t, e) {
    return v(t, void 0, t, new Map, e);
}
function v(t, e, s, i = new Map, r = void 0) {
    const a = r?.(t, e, s, i);
    if (a != null) return a;
    if (x(t)) return t;
    if (i.has(t)) return i.get(t);
    if (Array.isArray(t)) {
        const n = new Array(t.length);
        i.set(t, n);
        for(let c = 0; c < t.length; c++)n[c] = v(t[c], c, s, i, r);
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
        for (const [c, o] of t)n.set(c, v(o, c, s, i, r));
        return n;
    }
    if (t instanceof Set) {
        const n = new Set;
        i.set(t, n);
        for (const c of t)n.add(v(c, void 0, s, i, r));
        return n;
    }
    if (typeof Buffer < "u" && Buffer.isBuffer(t)) return t.subarray();
    if (F(t)) {
        const n = new (Object.getPrototypeOf(t)).constructor(t.length);
        i.set(t, n);
        for(let c = 0; c < t.length; c++)n[c] = v(t[c], c, s, i, r);
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
    if (typeof t == "object" && at(t)) {
        const n = Object.create(Object.getPrototypeOf(t));
        return i.set(t, n), m(n, t, s, i, r), n;
    }
    return t;
}
function m(t, e, s = t, i, r) {
    const a = [
        ...Object.keys(e),
        ...te(e)
    ];
    for(let n = 0; n < a.length; n++){
        const c = a[n], o = Object.getOwnPropertyDescriptor(t, c);
        (o == null || o.writable) && (t[c] = v(e[c], c, s, i, r));
    }
}
function at(t) {
    switch(se(t)){
        case ae:
        case Ke:
        case Ve:
        case Xe:
        case re:
        case Ge:
        case it:
        case nt:
        case et:
        case tt:
        case st:
        case We:
        case ne:
        case Ye:
        case Me:
        case Je:
        case ie:
        case ze:
        case ke:
        case Qe:
        case Ze:
        case Te:
            return !0;
        default:
            return !1;
    }
}
function ct(t, e) {
    return rt(t, (s, i, r, a)=>{
        const n = e?.(s, i, r, a);
        if (n != null) return n;
        if (typeof t == "object") switch(Object.prototype.toString.call(t)){
            case ne:
            case ie:
            case re:
                {
                    const c = new t.constructor(t?.valueOf());
                    return m(c, t), c;
                }
            case ae:
                {
                    const c = {};
                    return m(c, t), c.length = t.length, c[Symbol.iterator] = t[Symbol.iterator], c;
                }
            default:
                return;
        }
    });
}
function ce(t) {
    return ct(t);
}
function oe(t) {
    return t !== null && typeof t == "object" && se(t) === "[object Arguments]";
}
function pe(t) {
    return typeof t == "object" && t !== null;
}
function ot() {}
function pt(t) {
    return F(t);
}
function ht(t) {
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
function lt(t) {
    if (x(t)) return t;
    if (Array.isArray(t) || F(t) || t instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer) return t.slice(0);
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
function ut(t, ...e) {
    const s = e.slice(0, -1), i = e[e.length - 1];
    let r = t;
    for(let a = 0; a < s.length; a++){
        const n = s[a];
        r = A(r, n, i, new Map);
    }
    return r;
}
function A(t, e, s, i) {
    if (x(t) && (t = Object(t)), e == null || typeof e != "object") return t;
    if (i.has(e)) return lt(i.get(e));
    if (i.set(e, t), Array.isArray(e)) {
        e = e.slice();
        for(let a = 0; a < e.length; a++)e[a] = e[a] ?? void 0;
    }
    const r = [
        ...Object.keys(e),
        ...te(e)
    ];
    for(let a = 0; a < r.length; a++){
        const n = r[a];
        let c = e[n], o = t[n];
        if (oe(c) && (c = {
            ...c
        }), oe(o) && (o = {
            ...o
        }), typeof Buffer < "u" && Buffer.isBuffer(c) && (c = ce(c)), Array.isArray(c)) if (typeof o == "object" && o != null) {
            const l = [], p = Reflect.ownKeys(o);
            for(let f = 0; f < p.length; f++){
                const u = p[f];
                l[u] = o[u];
            }
            o = l;
        } else o = [];
        const h = s(o, c, n, t, e, i);
        h != null ? t[n] = h : Array.isArray(c) || pe(o) && pe(c) ? t[n] = A(o, c, s, i) : o == null && ht(c) ? t[n] = A({}, c, s, i) : o == null && pt(c) ? t[n] = ce(c) : (o === void 0 || c !== void 0) && (t[n] = c);
    }
    return t;
}
function dt(t, ...e) {
    return ut(t, ...e, ot);
}
var ft = Object.defineProperty, mt = Object.defineProperties, gt = Object.getOwnPropertyDescriptors, he = Object.getOwnPropertySymbols, yt = Object.prototype.hasOwnProperty, vt = Object.prototype.propertyIsEnumerable, le = (t, e, s)=>e in t ? ft(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : t[e] = s, E = (t, e)=>{
    for(var s in e || (e = {}))yt.call(e, s) && le(t, s, e[s]);
    if (he) for (var s of he(e))vt.call(e, s) && le(t, s, e[s]);
    return t;
}, wt = (t, e)=>mt(t, gt(e));
function ue(t, e, s) {
    var i;
    const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseChainId"])(t);
    return ((i = e.rpcMap) == null ? void 0 : i[r.reference]) || `${T}?chainId=${r.namespace}:${r.reference}&projectId=${s}`;
}
function bt(t) {
    return t.includes(":") ? t.split(":")[1] : t;
}
function de(t) {
    return t.map((e)=>`${e.split(":")[0]}:${e.split(":")[1]}`);
}
function Pt(t, e) {
    const s = Object.keys(e.namespaces).filter((r)=>r.includes(t));
    if (!s.length) return [];
    const i = [];
    return s.forEach((r)=>{
        const a = e.namespaces[r].accounts;
        i.push(...a);
    }), i;
}
function fe(t) {
    return Object.fromEntries(Object.entries(t).filter(([e, s])=>{
        var i, r;
        return ((i = s?.chains) == null ? void 0 : i.length) && ((r = s?.chains) == null ? void 0 : r.length) > 0;
    }));
}
function j(t = {}, e = {}) {
    const s = fe(me(t)), i = fe(me(e));
    return dt(s, i);
}
function me(t) {
    var e, s, i, r, a;
    const n = {};
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidObject"])(t)) return n;
    for (const [c, o] of Object.entries(t)){
        const h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCaipNamespace"])(c) ? [
            c
        ] : o.chains, l = o.methods || [], p = o.events || [], f = o.rpcMap || {}, u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(c);
        n[u] = wt(E(E({}, n[u]), o), {
            chains: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeArrays"])(h, (e = n[u]) == null ? void 0 : e.chains),
            methods: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeArrays"])(l, (s = n[u]) == null ? void 0 : s.methods),
            events: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeArrays"])(p, (i = n[u]) == null ? void 0 : i.events)
        }), ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidObject"])(f) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidObject"])(((r = n[u]) == null ? void 0 : r.rpcMap) || {})) && (n[u].rpcMap = E(E({}, f), (a = n[u]) == null ? void 0 : a.rpcMap));
    }
    return n;
}
function ge(t) {
    return t.includes(":") ? t.split(":")[2] : t;
}
function ye(t) {
    const e = {};
    for (const [s, i] of Object.entries(t)){
        const r = i.methods || [], a = i.events || [], n = i.accounts || [], c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCaipNamespace"])(s) ? [
            s
        ] : i.chains ? i.chains : de(i.accounts);
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
function Ot(t) {
    try {
        const e = JSON.parse(t);
        return typeof e == "object" && e !== null && !Array.isArray(e);
    } catch  {
        return !1;
    }
}
const ve = {}, w = (t)=>ve[t], U = (t, e)=>{
    ve[t] = e;
};
var It = Object.defineProperty, we = Object.getOwnPropertySymbols, St = Object.prototype.hasOwnProperty, $t = Object.prototype.propertyIsEnumerable, be = (t, e, s)=>e in t ? It(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : t[e] = s, Pe = (t, e)=>{
    for(var s in e || (e = {}))St.call(e, s) && be(t, s, e[s]);
    if (we) for (var s of we(e))$t.call(e, s) && be(t, s, e[s]);
    return t;
};
const Oe = "eip155", At = [
    "atomic",
    "flow-control",
    "paymasterService",
    "sessionKeys",
    "auxiliaryFunds"
], Et = (t)=>t && t.startsWith("0x") ? BigInt(t).toString(10) : t, B = (t)=>t && t.startsWith("0x") ? t : `0x${BigInt(t).toString(16)}`, Ie = (t)=>Object.keys(t).filter((e)=>At.includes(e)).reduce((e, s)=>(e[s] = jt(t[s]), e), {}), jt = (t)=>typeof t == "string" && Ot(t) ? JSON.parse(t) : t, Ct = (t, e, s)=>{
    const { sessionProperties: i = {}, scopedProperties: r = {} } = t, a = {};
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidObject"])(r) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidObject"])(i)) return;
    const n = Ie(i);
    for (const c of s){
        const o = Et(c);
        if (!o) continue;
        a[B(o)] = n;
        const h = r?.[`${Oe}:${o}`];
        if (h) {
            const l = h?.[`${Oe}:${o}:${e}`];
            a[B(o)] = Pe(Pe({}, a[B(o)]), Ie(l || h));
        }
    }
    for (const [c, o] of Object.entries(a))Object.keys(o).length === 0 && delete a[c];
    return Object.keys(a).length > 0 ? a : void 0;
};
var Nt = Object.defineProperty, Dt = (t, e, s)=>e in t ? Nt(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : t[e] = s, qt = (t, e, s)=>Dt(t, typeof e != "symbol" ? e + "" : e, s);
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
var Rt = Object.defineProperty, _t = Object.defineProperties, xt = Object.getOwnPropertyDescriptors, Se = Object.getOwnPropertySymbols, Ft = Object.prototype.hasOwnProperty, Ht = Object.prototype.propertyIsEnumerable, $e = (t, e, s)=>e in t ? Rt(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : t[e] = s, Ut = (t, e)=>{
    for(var s in e || (e = {}))Ft.call(e, s) && $e(t, s, e[s]);
    if (Se) for (var s of Se(e))Ht.call(e, s) && $e(t, s, e[s]);
    return t;
}, Bt = (t, e)=>_t(t, xt(e));
async function Lt(t, e) {
    const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseChainId"])(t.result.capabilities.caip345.caip2), i = t.result.capabilities.caip345.transactionHashes, r = await Promise.allSettled(i.map((p)=>Mt(s.reference, p, e))), a = r.filter((p)=>p.status === "fulfilled").map((p)=>p.value).filter((p)=>p);
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
async function Mt(t, e, s) {
    return await s(parseInt(t)).request((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$utils$2f$dist$2f$esm$2f$format$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatJsonRpcRequest"])("eth_getTransactionReceipt", [
        e
    ]));
}
async function zt({ sendCalls: t, storage: e }) {
    const s = await e.getItem(y);
    await e.setItem(y, Bt(Ut({}, s), {
        [t.result.id]: {
            request: t.request,
            result: t.result,
            expiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calcExpiry"])(Le)
        }
    }));
}
async function Gt({ resultId: t, storage: e }) {
    const s = await e.getItem(y);
    if (s) {
        delete s[t], await e.setItem(y, s);
        for(const i in s)(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isExpired"])(s[i].expiry) && delete s[i];
        await e.setItem(y, s);
    }
}
async function Wt({ resultId: t, storage: e }) {
    const s = await e.getItem(y), i = s?.[t];
    if (i && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isExpired"])(i.expiry)) return i;
    await Gt({
        resultId: t,
        storage: e
    });
}
var Jt = Object.defineProperty, Kt = Object.defineProperties, Vt = Object.getOwnPropertyDescriptors, Ae = Object.getOwnPropertySymbols, Yt = Object.prototype.hasOwnProperty, Xt = Object.prototype.propertyIsEnumerable, M = (t, e, s)=>e in t ? Jt(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : t[e] = s, z = (t, e)=>{
    for(var s in e || (e = {}))Yt.call(e, s) && M(t, s, e[s]);
    if (Ae) for (var s of Ae(e))Xt.call(e, s) && M(t, s, e[s]);
    return t;
}, G = (t, e)=>Kt(t, Vt(e)), g = (t, e, s)=>M(t, typeof e != "symbol" ? e + "" : e, s);
class kt {
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
        this.chainId = parseInt(e), this.events.emit(_.DEFAULT_CHAIN_CHANGED, {
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
        const i = s || ue(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
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
            const r = parseInt(bt(s));
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
        } catch (D) {
            console.warn("Failed to extract capabilities from session", D);
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
        } catch (D) {
            console.warn("Failed to update session with capabilities", D);
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
        const o = await Wt({
            resultId: (r = e.request.params) == null ? void 0 : r[0],
            storage: this.storage
        });
        if (o) try {
            return await Lt(o, this.getHttpProvider.bind(this));
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
        return `${Be}?projectId=${this.client.core.projectId}&chainId=${e}&bundler=${s}`;
    }
    async sendCalls(e) {
        var s, i, r;
        const a = await this.client.request(e), n = (s = e.request.params) == null ? void 0 : s[0], c = a?.id, o = a?.capabilities || {}, h = (i = o?.caip345) == null ? void 0 : i.caip2, l = (r = o?.caip345) == null ? void 0 : r.transactionHashes;
        return !c || !h || !(l != null && l.length) || await zt({
            sendCalls: {
                request: n,
                result: a
            },
            storage: this.storage
        }), a;
    }
}
var Qt = Object.defineProperty, Zt = (t, e, s)=>e in t ? Qt(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : t[e] = s, b = (t, e, s)=>Zt(t, typeof e != "symbol" ? e + "" : e, s);
class Tt {
    constructor(e){
        b(this, "name", ee), b(this, "client"), b(this, "httpProviders"), b(this, "events"), b(this, "namespace"), b(this, "chainId"), this.namespace = e.namespace, this.events = w("events"), this.client = w("client"), this.chainId = this.getDefaultChain(), this.name = this.getNamespaceName(), this.httpProviders = this.createHttpProviders();
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
        this.chainId = e, this.events.emit(_.DEFAULT_CHAIN_CHANGED, {
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
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseChainId"])(e).namespace;
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
            const c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseChainId"])(r), o = (n = (a = this.namespace) == null ? void 0 : a.rpcMap) == null ? void 0 : n[`${c.namespace}:${c.reference}`];
            i[c.reference] = this.createHttpProvider(r, o);
        }), i;
    }
    getHttpProvider(e) {
        const s = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseChainId"])(e).reference, i = this.httpProviders[s];
        if (typeof i > "u") throw new Error(`JSON-RPC provider for ${e} not found`);
        return i;
    }
    setHttpProvider(e, s) {
        const i = this.createHttpProvider(e, s);
        i && (this.httpProviders[e] = i);
    }
    createHttpProvider(e, s) {
        const i = s || ue(e, this.namespace, this.client.core.projectId);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$provider$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JsonRpcProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$walletconnect$2f$jsonrpc$2d$http$2d$connection$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"](i, w("disableProviderPing")));
    }
}
var es = Object.defineProperty, ts = Object.defineProperties, ss = Object.getOwnPropertyDescriptors, Ee = Object.getOwnPropertySymbols, is = Object.prototype.hasOwnProperty, ns = Object.prototype.propertyIsEnumerable, W = (t, e, s)=>e in t ? es(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: s
    }) : t[e] = s, S = (t, e)=>{
    for(var s in e || (e = {}))is.call(e, s) && W(t, s, e[s]);
    if (Ee) for (var s of Ee(e))ns.call(e, s) && W(t, s, e[s]);
    return t;
}, C = (t, e)=>ts(t, ss(e)), d = (t, e, s)=>W(t, typeof e != "symbol" ? e + "" : e, s);
class N {
    constructor(e){
        d(this, "client"), d(this, "namespaces"), d(this, "optionalNamespaces"), d(this, "sessionProperties"), d(this, "scopedProperties"), d(this, "events", new __TURBOPACK__imported__module__$5b$externals$5d2f$events__$5b$external$5d$__$28$events$2c$__cjs$29$__["default"]), d(this, "rpcProviders", {}), d(this, "session"), d(this, "providerOpts"), d(this, "logger"), d(this, "uri"), d(this, "disableProviderPing", !1), this.providerOpts = e, this.logger = typeof e?.logger < "u" && typeof e?.logger != "string" ? e.logger : (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$2c$__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f$pino$29$__$3c$export__default__as__pino$3e$__["pino"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDefaultLoggerOptions"])({
            level: e?.logger || Z
        })), this.disableProviderPing = e?.disableProviderPing || !1;
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
            reason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSdkError"])("USER_DISCONNECTED")
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
            const n = ye(this.session.namespaces);
            this.namespaces = j(this.namespaces, n), await this.persist("namespaces", this.namespaces), this.onConnect();
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
        const a = ye(r.namespaces);
        return this.namespaces = j(this.namespaces, a), await this.persist("namespaces", this.namespaces), await this.persist("optionalNamespaces", this.optionalNamespaces), this.onConnect(), this.session;
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
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidArray"])(s)) return;
            for (const i of s)e.deletePairings ? this.client.core.expirer.set(i.topic, 0) : await this.client.core.relayer.subscriber.unsubscribe(i.topic);
            this.logger.info(`Inactive pairings cleared: ${s.length}`);
        } catch (s) {
            this.logger.warn("Failed to cleanup pending pairings", s);
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
        if (this.client = this.providerOpts.client || await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$sign$2d$client$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].init({
            core: this.providerOpts.core,
            logger: this.providerOpts.logger || Z,
            relayUrl: this.providerOpts.relayUrl || Fe,
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
            throw this.logger.error("Failed to get session", i), new Error(`The provided session: ${(s = (e = this.providerOpts) == null ? void 0 : e.session) == null ? void 0 : s.topic} doesn't exist in the Sign client`);
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
            ...new Set(Object.keys(this.session.namespaces).map((s)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(s)))
        ];
        U("client", this.client), U("events", this.events), U("disableProviderPing", this.disableProviderPing), e.forEach((s)=>{
            if (!this.session) return;
            const i = Pt(s, this.session);
            if (i?.length === 0) return;
            const r = de(i), a = j(this.namespaces, this.optionalNamespaces), n = C(S({}, a[s]), {
                accounts: i,
                chains: r
            });
            switch(s){
                case "eip155":
                    this.rpcProviders[s] = new kt({
                        namespace: n
                    });
                    break;
                default:
                    this.rpcProviders[s] = new Tt({
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
                n && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidArray"])(n) && this.events.emit("accountsChanged", n.map(ge));
            } else if (a.name === "chainChanged") {
                const n = i.chainId, c = i.event.data, o = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(n), h = H(n) !== H(c) ? `${o}:${H(c)}` : n;
                this.onChainChanged({
                    currentCaipChainId: h
                });
            } else this.events.emit(a.name, a.data);
            this.events.emit("session_event", e);
        }), this.client.on("session_update", ({ topic: e, params: s })=>{
            var i, r;
            if (e !== ((i = this.session) == null ? void 0 : i.topic)) return;
            const { namespaces: a } = s, n = (r = this.client) == null ? void 0 : r.session.get(e);
            this.session = C(S({}, n), {
                namespaces: a
            }), this.onSessionUpdate(), this.events.emit("session_update", {
                topic: e,
                params: s
            });
        }), this.client.on("session_delete", async (e)=>{
            var s;
            e.topic === ((s = this.session) == null ? void 0 : s.topic) && (await this.cleanup(), this.events.emit("session_delete", e), this.events.emit("disconnect", C(S({}, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSdkError"])("USER_DISCONNECTED")), {
                data: e.topic
            })));
        }), this.on(_.DEFAULT_CHAIN_CHANGED, (e)=>{
            this.onChainChanged(C(S({}, e), {
                internal: !0
            }));
        });
    }
    getProvider(e) {
        return this.rpcProviders[e] || this.rpcProviders[ee];
    }
    onSessionUpdate() {
        Object.keys(this.rpcProviders).forEach((e)=>{
            var s;
            this.getProvider(e).updateNamespace((s = this.session) == null ? void 0 : s.namespaces[e]);
        });
    }
    setNamespaces(e) {
        const { namespaces: s = {}, optionalNamespaces: i = {}, sessionProperties: r, scopedProperties: a } = e;
        this.optionalNamespaces = j(s, i), this.sessionProperties = r, this.scopedProperties = a;
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
        if (s && !Object.keys(this.namespaces || {}).map((n)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(n)).includes(s)) throw new Error(`Namespace '${s}' is not configured. Please call connect() first with namespace config.`);
        if (s && i) return [
            s,
            i
        ];
        const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseNamespaceKey"])(Object.keys(this.namespaces)[0]), a = this.rpcProviders[r].getDefaultChain();
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
            const c = n.filter((o)=>o.includes(`${s}:`)).map(ge);
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$node_modules$2f40$walletconnect$2f$utils$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidArray"])(c)) return;
            this.events.emit("accountsChanged", c);
        } catch (n) {
            this.logger.warn("Failed to emit accountsChanged on chain change", n);
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
        await this.client.core.storage.setItem(`${$}/${e}${r}`, s);
    }
    async getFromStore(e) {
        var s;
        const i = ((s = this.session) == null ? void 0 : s.topic) || "";
        return await this.client.core.storage.getItem(`${$}/${e}${i}`);
    }
    async deleteFromStore(e) {
        var s;
        const i = ((s = this.session) == null ? void 0 : s.topic) || "";
        await this.client.core.storage.removeItem(`${$}/${e}${i}`);
    }
    async cleanupStorage() {
        var e;
        try {
            if (((e = this.client) == null ? void 0 : e.session.length) > 0) return;
            const s = await this.client.core.storage.getKeys();
            for (const i of s)i.startsWith($) && await this.client.core.storage.removeItem(i);
        } catch (s) {
            this.logger.warn("Failed to cleanup storage", s);
        }
    }
}
const rs = N;
;
 //# sourceMappingURL=index.es.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/ConstantsUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConstantsUtil",
    ()=>ConstantsUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-ssr] (ecmascript)");
;
const ConstantsUtil = {
    /* Connector names */ METMASK_CONNECTOR_NAME: 'MetaMask',
    TRUST_CONNECTOR_NAME: 'Trust Wallet',
    SOLFLARE_CONNECTOR_NAME: 'Solflare',
    PHANTOM_CONNECTOR_NAME: 'Phantom',
    COIN98_CONNECTOR_NAME: 'Coin98',
    MAGIC_EDEN_CONNECTOR_NAME: 'Magic Eden',
    BACKPACK_CONNECTOR_NAME: 'Backpack',
    BITGET_CONNECTOR_NAME: 'Bitget Wallet',
    FRONTIER_CONNECTOR_NAME: 'Frontier',
    XVERSE_CONNECTOR_NAME: 'Xverse Wallet',
    LEATHER_CONNECTOR_NAME: 'Leather',
    OKX_CONNECTOR_NAME: 'OKX Wallet',
    EIP155: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM,
    ADD_CHAIN_METHOD: 'wallet_addEthereumChain',
    EIP6963_ANNOUNCE_EVENT: 'eip6963:announceProvider',
    EIP6963_REQUEST_EVENT: 'eip6963:requestProvider',
    CONNECTOR_RDNS_MAP: {
        coinbaseWallet: 'com.coinbase.wallet',
        coinbaseWalletSDK: 'com.coinbase.wallet'
    },
    CONNECTOR_TYPE_EXTERNAL: 'EXTERNAL',
    CONNECTOR_TYPE_WALLET_CONNECT: 'WALLET_CONNECT',
    CONNECTOR_TYPE_INJECTED: 'INJECTED',
    CONNECTOR_TYPE_ANNOUNCED: 'ANNOUNCED',
    CONNECTOR_TYPE_AUTH: 'AUTH',
    CONNECTOR_TYPE_MULTI_CHAIN: 'MULTI_CHAIN',
    CONNECTOR_TYPE_W3M_AUTH: 'ID_AUTH',
    getSDKVersionWarningMessage (currentVersion, latestVersion) {
        return `
     @@@@@@@           @@@@@@@@@@@@@@@@@@      
   @@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@@@@@   
  @@@@@@@@@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@  
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@  
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@@@   @@@@@@@@@@@ 
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@@   @@@@@@@@@@@@ 
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@@  @@@@@@@@@@@@@
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@   @@@@@@@@@@@@@    
 @@@@@@   @@@@@@  @@@@@@@@@@@   @@@@@@@@@@@@@@    
 @@@@@@   @@@@@@  @@@@@@@@@@@  @@@@@@@@@@@@@@@ 
 @@@@@@@@@@@@@@@  @@@@@@@@@@   @@@@@@@@@@@@@@@ 
 @@@@@@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@  
  @@@@@@@@@@@@@    @@@@@@@@@@@@@@@@@@@@@@@@@@  
   @@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@@@@@   
      @@@@@            @@@@@@@@@@@@@@@@@@  
      
AppKit SDK version ${currentVersion} is outdated. Latest version is ${latestVersion}. Please update to the latest version for bug fixes and new features.
            
Changelog: https://github.com/reown-com/appkit/releases
NPM Registry: https://www.npmjs.com/package/@reown/appkit`;
    }
}; //# sourceMappingURL=ConstantsUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/HelpersUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HelpersUtil",
    ()=>HelpersUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/StorageUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/ConstantsUtil.js [app-ssr] (ecmascript)");
;
;
;
const HelpersUtil = {
    getCaipTokens (tokens) {
        if (!tokens) {
            return undefined;
        }
        const caipTokens = {};
        Object.entries(tokens).forEach(([id, token])=>{
            caipTokens[`${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].EIP155}:${id}`] = token;
        });
        return caipTokens;
    },
    isLowerCaseMatch (str1, str2) {
        return str1?.toLowerCase() === str2?.toLowerCase();
    },
    /**
     * Iterates the Auth connector supported chains and returns the namespace that is last connected to the active chain.
     * @returns ChainNamespace | undefined
     */ getActiveNamespaceConnectedToAuth () {
        const activeChain = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].AUTH_CONNECTOR_SUPPORTED_CHAINS.find((chain)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectorId(chain) === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH && chain === activeChain);
    },
    /**
     * Runs a condition function again and again until it returns true or the max number of tries is reached.
     *
     * @param conditionFn - A function (can be async) that returns true when the condition is met.
     * @param intervalMs - Time to wait between tries, in milliseconds.
     * @param maxRetries - Maximum number of times to try before stopping.
     * @returns A Promise that resolves to true if the condition becomes true in time, or false if it doesn't.
     */ withRetry ({ conditionFn, intervalMs, maxRetries }) {
        let attempts = 0;
        return new Promise((resolve)=>{
            async function tryCheck() {
                attempts += 1;
                const result = await conditionFn();
                if (result) {
                    return resolve(true);
                }
                if (attempts >= maxRetries) {
                    return resolve(false);
                }
                setTimeout(tryCheck, intervalMs);
                return null;
            }
            tryCheck();
        });
    },
    /**
     * Returns the chain namespace from user's chainId which is returned from Auth provider.
     * @param chainId - The chainId to parse.
     * @returns The chain namespace.
     */ userChainIdToChainNamespace (chainId) {
        if (typeof chainId === 'number') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM;
        }
        const [namespace] = chainId.split(':');
        return namespace;
    },
    /**
     * Get all auth namespaces except the active one
     * @param activeNamespace - The active namespace
     * @returns All auth namespaces except the active one
     */ getOtherAuthNamespaces (activeNamespace) {
        if (!activeNamespace) {
            return [];
        }
        const authNamespaces = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].AUTH_CONNECTOR_SUPPORTED_CHAINS;
        const otherAuthNamespaces = authNamespaces.filter((ns)=>ns !== activeNamespace);
        return otherAuthNamespaces;
    },
    /**
     * Gets the storage info for a connector
     * @param connectorId - The ID of the connector
     * @param namespace - The namespace of the connector
     * @returns
     */ getConnectorStorageInfo (connectorId, namespace) {
        const storageConnectionsByNamespace = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StorageUtil"].getConnections();
        const storageConnections = storageConnectionsByNamespace[namespace] ?? [];
        return {
            hasDisconnected: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StorageUtil"].isConnectorDisconnected(connectorId, namespace),
            hasConnected: storageConnections.some((c)=>HelpersUtil.isLowerCaseMatch(c.connectorId, connectorId))
        };
    }
}; //# sourceMappingURL=HelpersUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/PresetsUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PresetsUtil",
    ()=>PresetsUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/ConstantsUtil.js [app-ssr] (ecmascript)");
;
;
const PresetsUtil = {
    ConnectorExplorerIds: {
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.COINBASE]: 'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.COINBASE_SDK]: 'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.SAFE]: '225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.LEDGER]: '19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.OKX]: '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
        /* Connector names */ [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].METMASK_CONNECTOR_NAME]: 'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].TRUST_CONNECTOR_NAME]: '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].SOLFLARE_CONNECTOR_NAME]: '1ca0bdd4747578705b1939af023d120677c64fe6ca76add81fda36e350605e79',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].PHANTOM_CONNECTOR_NAME]: 'a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].COIN98_CONNECTOR_NAME]: '2a3c89040ac3b723a1972a33a125b1db11e258a6975d3a61252cd64e6ea5ea01',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].MAGIC_EDEN_CONNECTOR_NAME]: '8b830a2b724a9c3fbab63af6f55ed29c9dfa8a55e732dc88c80a196a2ba136c6',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].BACKPACK_CONNECTOR_NAME]: '2bd8c14e035c2d48f184aaa168559e86b0e3433228d3c4075900a221785019b0',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].BITGET_CONNECTOR_NAME]: '38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].FRONTIER_CONNECTOR_NAME]: '85db431492aa2e8672e93f4ea7acf10c88b97b867b0d373107af63dc4880f041',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].XVERSE_CONNECTOR_NAME]: '2a87d74ae02e10bdd1f51f7ce6c4e1cc53cd5f2c0b6b5ad0d7b3007d2b13de7b',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].LEATHER_CONNECTOR_NAME]: '483afe1df1df63daf313109971ff3ef8356ddf1cc4e45877d205eee0b7893a13',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].OKX_CONNECTOR_NAME]: '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709'
    },
    NetworkImageIds: {
        // Ethereum
        1: 'ba0ba0cd-17c6-4806-ad93-f9d174f17900',
        // Arbitrum
        42161: '3bff954d-5cb0-47a0-9a23-d20192e74600',
        // Avalanche
        43114: '30c46e53-e989-45fb-4549-be3bd4eb3b00',
        // Binance Smart Chain
        56: '93564157-2e8e-4ce7-81df-b264dbee9b00',
        // Fantom
        250: '06b26297-fe0c-4733-5d6b-ffa5498aac00',
        // Optimism
        10: 'ab9c186a-c52f-464b-2906-ca59d760a400',
        // Polygon
        137: '41d04d42-da3b-4453-8506-668cc0727900',
        // Mantle
        5000: 'e86fae9b-b770-4eea-e520-150e12c81100',
        // Hedera Mainnet
        295: '6a97d510-cac8-4e58-c7ce-e8681b044c00',
        // Sepolia
        11_155_111: 'e909ea0a-f92a-4512-c8fc-748044ea6800',
        // Base Sepolia
        84532: 'a18a7ecd-e307-4360-4746-283182228e00',
        // Unichain Sepolia
        1301: '4eeea7ef-0014-4649-5d1d-07271a80f600',
        // Unichain Mainnet
        130: '2257980a-3463-48c6-cbac-a42d2a956e00',
        // Monad Testnet
        10_143: '0a728e83-bacb-46db-7844-948f05434900',
        // Gnosis
        100: '02b53f6a-e3d4-479e-1cb4-21178987d100',
        // EVMos
        9001: 'f926ff41-260d-4028-635e-91913fc28e00',
        // ZkSync
        324: 'b310f07f-4ef7-49f3-7073-2a0a39685800',
        // Filecoin
        314: '5a73b3dd-af74-424e-cae0-0de859ee9400',
        // Iotx
        4689: '34e68754-e536-40da-c153-6ef2e7188a00',
        // Metis,
        1088: '3897a66d-40b9-4833-162f-a2c90531c900',
        // Moonbeam
        1284: '161038da-44ae-4ec7-1208-0ea569454b00',
        // Moonriver
        1285: 'f1d73bb6-5450-4e18-38f7-fb6484264a00',
        // Zora
        7777777: '845c60df-d429-4991-e687-91ae45791600',
        // Celo
        42220: 'ab781bbc-ccc6-418d-d32d-789b15da1f00',
        // Base
        8453: '7289c336-3981-4081-c5f4-efc26ac64a00',
        // Aurora
        1313161554: '3ff73439-a619-4894-9262-4470c773a100',
        // Ronin Mainnet
        2020: 'b8101fc0-9c19-4b6f-ec65-f6dfff106e00',
        // Saigon Testnet (a.k.a. Ronin)
        2021: 'b8101fc0-9c19-4b6f-ec65-f6dfff106e00',
        // Berachain Mainnet
        80094: 'e329c2c9-59b0-4a02-83e4-212ff3779900',
        // Abstract Mainnet
        2741: 'fc2427d1-5af9-4a9c-8da5-6f94627cd900',
        // Solana networks
        '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp': 'a1b58899-f671-4276-6a5e-56ca5bd59700',
        '4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z': 'a1b58899-f671-4276-6a5e-56ca5bd59700',
        EtWTRABZaYq6iMfeYKouRu166VU2xqa1: 'a1b58899-f671-4276-6a5e-56ca5bd59700',
        // Bitcoin
        '000000000019d6689c085ae165831e93': '0b4838db-0161-4ffe-022d-532bf03dba00',
        // Bitcoin Testnet
        '000000000933ea01ad0ee984209779ba': '39354064-d79b-420b-065d-f980c4b78200',
        // Bitcoin Signet
        '00000008819873e925422c1ff0f99f7c': 'b3406e4a-bbfc-44fb-e3a6-89673c78b700'
    },
    ConnectorImageIds: {
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.COINBASE]: '0c2840c3-5b04-4c44-9661-fbd4b49e1800',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.COINBASE_SDK]: '0c2840c3-5b04-4c44-9661-fbd4b49e1800',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.SAFE]: '461db637-8616-43ce-035a-d89b8a1d5800',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.LEDGER]: '54a1aa77-d202-4f8d-0fb2-5d2bb6db0300',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT]: 'ef1a1fcf-7fe8-4d69-bd6d-fda1345b4400',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.INJECTED]: '07ba87ed-43aa-4adf-4540-9e6a2b9cae00'
    },
    ConnectorNamesMap: {
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.INJECTED]: 'Browser Wallet',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT]: 'WalletConnect',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.COINBASE]: 'Coinbase',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.COINBASE_SDK]: 'Coinbase',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.LEDGER]: 'Ledger',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.SAFE]: 'Safe'
    },
    ConnectorTypesMap: {
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.INJECTED]: 'INJECTED',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT]: 'WALLET_CONNECT',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.EIP6963]: 'ANNOUNCED',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH]: 'AUTH',
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_TYPE_AUTH]: 'AUTH'
    },
    WalletConnectRpcChainIds: [
        // Ethereum
        1,
        // Ethereum Goerli
        5,
        // Ethereum Sepolia
        11155111,
        // Optimism
        10,
        // Optimism Goerli
        420,
        // Arbitrum
        42161,
        // Arbitrum Goerli
        421613,
        // Polygon
        137,
        // Polygon Mumbai
        80001,
        // Celo Mainnet
        42220,
        // Aurora
        1313161554,
        // Aurora Testnet
        1313161555,
        // Binance Smart Chain
        56,
        // Binance Smart Chain Testnet
        97,
        // Avalanche C-Chain
        43114,
        // Avalanche Fuji Testnet
        43113,
        // Gnosis Chain
        100,
        // Base
        8453,
        // Base Goerli
        84531,
        // Zora
        7777777,
        // Zora Goerli
        999,
        // ZkSync Era Mainnet
        324,
        // ZkSync Era Testnet
        280
    ]
}; //# sourceMappingURL=PresetsUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/CaipNetworkUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CaipNetworksUtil",
    ()=>CaipNetworksUtil,
    "getBlockchainApiRpcUrl",
    ()=>getBlockchainApiRpcUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$fallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/transports/fallback.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/viem/_esm/clients/transports/http.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/StorageUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$PresetsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/PresetsUtil.js [app-ssr] (ecmascript)");
;
;
;
;
const RPC_URL_HOST = 'rpc.walletconnect.org';
function getBlockchainApiRpcUrl(caipNetworkId, projectId) {
    const url = new URL('https://rpc.walletconnect.org/v1/');
    url.searchParams.set('chainId', caipNetworkId);
    url.searchParams.set('projectId', projectId);
    return url.toString();
}
const WC_HTTP_RPC_SUPPORTED_CHAINS = [
    'near:mainnet',
    'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
    'eip155:1101',
    'eip155:56',
    'eip155:42161',
    'eip155:7777777',
    'eip155:59144',
    'eip155:324',
    'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
    'eip155:5000',
    'solana:4sgjmw1sunhzsxgspuhpqldx6wiyjntz',
    'eip155:80084',
    'eip155:5003',
    'eip155:100',
    'eip155:8453',
    'eip155:42220',
    'eip155:1313161555',
    'eip155:17000',
    'eip155:1',
    'eip155:300',
    'eip155:1313161554',
    'eip155:1329',
    'eip155:84532',
    'eip155:421614',
    'eip155:11155111',
    'eip155:8217',
    'eip155:43114',
    'solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z',
    'eip155:999999999',
    'eip155:11155420',
    'eip155:80002',
    'eip155:97',
    'eip155:43113',
    'eip155:137',
    'eip155:10',
    'eip155:1301',
    'eip155:80094',
    'eip155:80069',
    'eip155:560048',
    'eip155:31',
    'eip155:2818',
    'eip155:57054',
    'eip155:911867',
    'eip155:534351',
    'eip155:1112',
    'eip155:534352',
    'eip155:1111',
    'eip155:146',
    'eip155:130',
    'eip155:1284',
    'eip155:30',
    'eip155:2810',
    'bip122:000000000019d6689c085ae165831e93',
    'bip122:000000000933ea01ad0ee984209779ba'
];
const CaipNetworksUtil = {
    /**
     * Extends the RPC URL with the project ID if the RPC URL is a Reown URL
     * @param rpcUrl - The RPC URL to extend
     * @param projectId - The project ID to extend the RPC URL with
     * @returns The extended RPC URL
     */ extendRpcUrlWithProjectId (rpcUrl, projectId) {
        let isReownUrl = false;
        try {
            const url = new URL(rpcUrl);
            isReownUrl = url.host === RPC_URL_HOST;
        } catch (e) {
            isReownUrl = false;
        }
        if (isReownUrl) {
            const url = new URL(rpcUrl);
            if (!url.searchParams.has('projectId')) {
                url.searchParams.set('projectId', projectId);
            }
            return url.toString();
        }
        return rpcUrl;
    },
    isCaipNetwork (network) {
        return 'chainNamespace' in network && 'caipNetworkId' in network;
    },
    getChainNamespace (network) {
        if (this.isCaipNetwork(network)) {
            return network.chainNamespace;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM;
    },
    getCaipNetworkId (network) {
        if (this.isCaipNetwork(network)) {
            return network.caipNetworkId;
        }
        return `${__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CHAIN.EVM}:${network.id}`;
    },
    // eslint-disable-next-line max-params
    getDefaultRpcUrl (caipNetwork, caipNetworkId, projectId) {
        const defaultRpcUrl = caipNetwork.rpcUrls?.default?.http?.[0];
        if (WC_HTTP_RPC_SUPPORTED_CHAINS.includes(caipNetworkId)) {
            return getBlockchainApiRpcUrl(caipNetworkId, projectId);
        }
        return defaultRpcUrl || '';
    },
    /**
     * Extends the CaipNetwork object with the image ID and image URL if the image ID is not provided
     * @param params - The parameters object
     * @param params.caipNetwork - The CaipNetwork object to extend
     * @param params.networkImageIds - The network image IDs
     * @param params.customNetworkImageUrls - The custom network image URLs
     * @param params.projectId - The project ID
     * @param params.customRpc - Boolean to indicate if the custom RPC URL should be used
     * @param params.customRpcUrls - The map of chain and custom RPC URLs to be used by the AppKit
     * @returns The extended array of CaipNetwork objects
     */ extendCaipNetwork (caipNetwork, { customNetworkImageUrls, projectId, customRpcUrls }) {
        const chainNamespace = this.getChainNamespace(caipNetwork);
        const caipNetworkId = this.getCaipNetworkId(caipNetwork);
        const networkDefaultRpcUrl = caipNetwork.rpcUrls?.default?.http?.[0];
        const reownRpcUrl = this.getDefaultRpcUrl(caipNetwork, caipNetworkId, projectId);
        const chainDefaultRpcUrl = caipNetwork?.rpcUrls?.['chainDefault']?.http?.[0] || networkDefaultRpcUrl;
        const customRpcUrlsOfNetwork = customRpcUrls?.[caipNetworkId]?.map((i)=>i.url) || [];
        const rpcUrls = [
            ...customRpcUrlsOfNetwork,
            ...reownRpcUrl ? [
                reownRpcUrl
            ] : []
        ];
        const rpcUrlsWithoutReown = [
            ...customRpcUrlsOfNetwork
        ];
        if (chainDefaultRpcUrl && !rpcUrlsWithoutReown.includes(chainDefaultRpcUrl)) {
            rpcUrlsWithoutReown.push(chainDefaultRpcUrl);
        }
        return {
            ...caipNetwork,
            chainNamespace,
            caipNetworkId,
            assets: {
                imageId: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$PresetsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PresetsUtil"].NetworkImageIds[caipNetwork.id],
                imageUrl: customNetworkImageUrls?.[caipNetwork.id]
            },
            rpcUrls: {
                ...caipNetwork.rpcUrls,
                default: {
                    http: rpcUrls
                },
                // Save the networks original RPC URL default
                chainDefault: {
                    http: rpcUrlsWithoutReown
                }
            }
        };
    },
    /**
     * Extends the array of CaipNetwork objects with the image ID and image URL if the image ID is not provided
     * @param caipNetworks - The array of CaipNetwork objects to extend
     * @param params - The parameters object
     * @param params.networkImageIds - The network image IDs
     * @param params.customNetworkImageUrls - The custom network image URLs
     * @param params.customRpcUrls - The map of chain and custom RPC URLs to be used by the AppKit
     * @param params.projectId - The project ID
     * @returns The extended array of CaipNetwork objects
     */ extendCaipNetworks (caipNetworks, { customNetworkImageUrls, projectId, customRpcUrls }) {
        return caipNetworks.map((caipNetwork)=>CaipNetworksUtil.extendCaipNetwork(caipNetwork, {
                customNetworkImageUrls,
                customRpcUrls,
                projectId
            }));
    },
    getViemTransport (caipNetwork, projectId, customRpcUrls) {
        const transports = [];
        // Add custom RPC URLs
        customRpcUrls?.forEach((rpcUrl)=>{
            transports.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"])(rpcUrl.url, rpcUrl.config));
        });
        // Add Reown RPC URL
        if (WC_HTTP_RPC_SUPPORTED_CHAINS.includes(caipNetwork.caipNetworkId)) {
            transports.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"])(getBlockchainApiRpcUrl(caipNetwork.caipNetworkId, projectId), {
                /*
                 * The Blockchain API uses "Content-Type: text/plain" to avoid OPTIONS preflight requests
                 * It will only work for viem >= 2.17.7
                 */ fetchOptions: {
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                }
            }));
        }
        // Add original fallback transports
        caipNetwork?.rpcUrls?.default?.http?.forEach((rpcUrl)=>{
            transports.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"])(rpcUrl));
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$fallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallback"])(transports);
    },
    extendWagmiTransports (caipNetwork, projectId, transport) {
        if (WC_HTTP_RPC_SUPPORTED_CHAINS.includes(caipNetwork.caipNetworkId)) {
            const reownRpcUrl = this.getDefaultRpcUrl(caipNetwork, caipNetwork.caipNetworkId, projectId);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$fallback$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fallback"])([
                transport,
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["http"])(reownRpcUrl)
            ]);
        }
        return transport;
    },
    /**
     * Generates the unsupported network object with the given CaipNetwork ID
     * @param caipNetworkId - The CAIP network ID
     * @returns The unsupported CAIP network object
     */ getUnsupportedNetwork (caipNetworkId) {
        return {
            id: caipNetworkId.split(':')[1],
            caipNetworkId,
            name: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].UNSUPPORTED_NETWORK_NAME,
            chainNamespace: caipNetworkId.split(':')[0],
            nativeCurrency: {
                name: '',
                decimals: 0,
                symbol: ''
            },
            rpcUrls: {
                default: {
                    http: []
                }
            }
        };
    },
    /**
     * Gets the CaipNetwork object from the storage if `@appkit/active_caip_network_id` is being set
     * @returns CaipNetwork or undefined
     */ getCaipNetworkFromStorage (defaultCaipNetwork) {
        const caipNetworkIdFromStorage = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StorageUtil"].getActiveCaipNetworkId();
        const caipNetworks = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChainController"].getAllRequestedCaipNetworks();
        const availableNamespaces = Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChainController"].state.chains?.keys() || []);
        const namespace = caipNetworkIdFromStorage?.split(':')[0];
        const isNamespaceAvailable = namespace ? availableNamespaces.includes(namespace) : false;
        const caipNetwork = caipNetworks?.find((cn)=>cn.caipNetworkId === caipNetworkIdFromStorage);
        const isUnsupportedNetwork = isNamespaceAvailable && !caipNetwork && caipNetworkIdFromStorage;
        if (isUnsupportedNetwork) {
            return this.getUnsupportedNetwork(caipNetworkIdFromStorage);
        }
        if (caipNetwork) {
            return caipNetwork;
        }
        if (defaultCaipNetwork) {
            return defaultCaipNetwork;
        }
        return caipNetworks?.[0];
    }
}; //# sourceMappingURL=CaipNetworkUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/ErrorUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorUtil",
    ()=>ErrorUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/SafeLocalStorage.js [app-ssr] (ecmascript)");
;
const abortController = new AbortController();
const ErrorUtil = {
    EmbeddedWalletAbortController: abortController,
    /**
     * Universal Provider errors. Make sure the `message` is matching with the errors thrown by the Universal Provider.
     * We use the `alertErrorKey` to map the error to the correct AppKit alert error.
     */ UniversalProviderErrors: {
        UNAUTHORIZED_DOMAIN_NOT_ALLOWED: {
            message: 'Unauthorized: origin not allowed',
            alertErrorKey: 'ORIGIN_NOT_ALLOWED'
        },
        JWT_VALIDATION_ERROR: {
            message: 'JWT validation error: JWT Token is not yet valid',
            alertErrorKey: 'JWT_TOKEN_NOT_VALID'
        },
        INVALID_KEY: {
            message: 'Unauthorized: invalid key',
            alertErrorKey: 'INVALID_PROJECT_ID'
        }
    },
    ALERT_ERRORS: {
        SWITCH_NETWORK_NOT_FOUND: {
            code: 'APKT001',
            displayMessage: 'Network Not Found',
            debugMessage: 'The specified network is not recognized. Please ensure it is included in the `networks` array of your `createAppKit` configuration.'
        },
        ORIGIN_NOT_ALLOWED: {
            code: 'APKT002',
            displayMessage: 'Invalid App Configuration',
            debugMessage: ()=>`The origin ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$SafeLocalStorage$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSafe"])() ? window.origin : 'unknown'} is not in your allow list. Please update your allowed domains at https://dashboard.reown.com.`
        },
        IFRAME_LOAD_FAILED: {
            code: 'APKT003',
            displayMessage: 'Network Error: Wallet Load Failed',
            debugMessage: ()=>'Failed to load the embedded wallet. This may be due to network issues or server downtime. Please check your network connection and try again shortly. Contact support if the issue persists.'
        },
        IFRAME_REQUEST_TIMEOUT: {
            code: 'APKT004',
            displayMessage: 'Wallet Request Timeout',
            debugMessage: ()=>'The request to the embedded wallet timed out. Please check your network connection and try again shortly. Contact support if the issue persists.'
        },
        UNVERIFIED_DOMAIN: {
            code: 'APKT005',
            displayMessage: 'Unverified Domain',
            debugMessage: ()=>'Embedded wallet load failed. Ensure your domain is verified in https://dashboard.reown.com.'
        },
        JWT_TOKEN_NOT_VALID: {
            code: 'APKT006',
            displayMessage: 'Session Expired',
            debugMessage: 'Your session is invalid or expired. Please check your system’s date and time settings, then reconnect.'
        },
        INVALID_PROJECT_ID: {
            code: 'APKT007',
            displayMessage: 'Invalid Project ID',
            debugMessage: 'The specified project ID is invalid. Please visit https://dashboard.reown.com to obtain a valid project ID.'
        },
        PROJECT_ID_NOT_CONFIGURED: {
            code: 'APKT008',
            displayMessage: 'Project ID Missing',
            debugMessage: 'No project ID is configured. You can create and configure a project ID at https://dashboard.reown.com.'
        },
        SERVER_ERROR_APP_CONFIGURATION: {
            code: 'APKT009',
            displayMessage: 'Server Error',
            debugMessage: (errorMessage)=>`Unable to fetch App Configuration. ${errorMessage}. Please check your network connection and try again shortly. Contact support if the issue persists.`
        },
        RATE_LIMITED_APP_CONFIGURATION: {
            code: 'APKT010',
            displayMessage: 'Rate Limited',
            debugMessage: 'You have been rate limited while retrieving App Configuration. Please wait a few minutes and try again. Contact support if the issue persists.'
        }
    },
    ALERT_WARNINGS: {
        LOCAL_CONFIGURATION_IGNORED: {
            debugMessage: (warningMessage)=>`[Reown Config Notice] ${warningMessage}`
        },
        INACTIVE_NAMESPACE_NOT_CONNECTED: {
            code: 'APKTW001',
            displayMessage: 'Inactive Namespace Not Connected',
            debugMessage: (namespace, errorMessage)=>`An error occurred while connecting an inactive namespace ${namespace}: "${errorMessage}"`
        },
        INVALID_EMAIL: {
            code: 'APKTW002',
            displayMessage: 'Invalid Email Address',
            debugMessage: 'Please enter a valid email address'
        }
    }
}; //# sourceMappingURL=ErrorUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/LoggerUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoggerUtil",
    ()=>LoggerUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-utils/node_modules/@walletconnect/logger/dist/index.es.js [app-ssr] (ecmascript) <locals>");
;
const LoggerUtil = {
    createLogger (onError, level = 'error') {
        const loggerOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDefaultLoggerOptions"])({
            level
        });
        const { logger } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$node_modules$2f40$walletconnect$2f$logger$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generatePlatformLogger"])({
            opts: loggerOptions
        });
        logger.error = (...args)=>{
            for (const arg of args){
                if (arg instanceof Error) {
                    onError(arg, ...args);
                    return;
                }
            }
            onError(undefined, ...args);
        };
        return logger;
    }
}; //# sourceMappingURL=LoggerUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/SemVerUtils.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SemVerUtils",
    ()=>SemVerUtils
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/StorageUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/ConstantsUtil.js [app-ssr] (ecmascript)");
;
;
;
const SemVerUtils = {
    extractVersion (version) {
        if (!version || typeof version !== 'string') {
            return null;
        }
        /*
         * Match semantic version patterns with optional pre-release suffixes and version range operators
         * Examples: 1.7.1, 1.7.1-canary.3, 1.7.1-beta.1, 1.7, 1, ^1.8.3, >=1.x.x, <=1.x.x, etc.
         */ const versionRegex = /(?:[~^>=<]+\s*)?(?<version>\d+(?:\.\d+){0,2})(?:-[a-zA-Z]+\.\d+)?/u;
        const match = version.match(versionRegex);
        return match?.groups?.['version'] || null;
    },
    checkSDKVersion (version) {
        const packageVersion = this.extractVersion(version);
        const isDevelopment = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].IS_DEVELOPMENT;
        if (!packageVersion || !isDevelopment) {
            return;
        }
        const appKitVersionStorage = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StorageUtil"].getLatestAppKitVersion();
        if (this.isValidVersion(appKitVersionStorage)) {
            if (this.isOlder(packageVersion, appKitVersionStorage)) {
                console.warn(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].getSDKVersionWarningMessage(packageVersion, appKitVersionStorage));
                return;
            }
        }
        try {
            fetch('https://registry.npmjs.org/@reown/appkit/latest').then((response)=>response.json()).then((data)=>{
                const latestVersion = data.version;
                if (this.isOlder(packageVersion, latestVersion)) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StorageUtil"].updateLatestAppKitVersion({
                        timestamp: Date.now(),
                        version: latestVersion
                    });
                    console.warn(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].getSDKVersionWarningMessage(packageVersion, latestVersion));
                }
            });
        } catch (error) {
        // Ignore error
        }
    },
    isValidVersion (version) {
        return typeof version === 'string' && /^\d+\.\d+\.\d+$/u.test(version);
    },
    isOlder (currentVersion, latestVersion) {
        const currentVersionNumber = this.extractVersion(currentVersion);
        const latestVersionNumber = this.extractVersion(latestVersion);
        if (!currentVersionNumber || !latestVersionNumber) {
            return false;
        }
        // Normalize versions to ensure they have at least 3 parts
        function normalizeVersion(version) {
            const parts = version.split('.').map(Number);
            while(parts.length < 3){
                parts.push(0);
            }
            return parts;
        }
        const current = normalizeVersion(currentVersionNumber);
        const latest = normalizeVersion(latestVersionNumber);
        for(let i = 0; i < Math.max(current.length, latest.length); i += 1){
            const currentPart = current[i] || 0;
            const latestPart = latest[i] || 0;
            if (currentPart < latestPart) {
                return true;
            } else if (currentPart > latestPart) {
                return false;
            }
        }
        return false;
    }
}; //# sourceMappingURL=SemVerUtils.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/TokenUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TokenUtil",
    ()=>TokenUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ExchangeUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/ExchangeUtil.js [app-ssr] (ecmascript)");
;
const TokenUtil = {
    TOKEN_ADDRESSES_BY_SYMBOL: {
        USDC: {
            8453: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ExchangeUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["baseUSDC"].asset,
            84532: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$ExchangeUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["baseSepoliaUSDC"].asset
        }
    },
    getTokenSymbolByAddress (tokenAddress) {
        if (!tokenAddress) {
            return undefined;
        }
        const [symbol] = Object.entries(TokenUtil.TOKEN_ADDRESSES_BY_SYMBOL).find(([_, addressesByChain])=>Object.values(addressesByChain).includes(tokenAddress)) ?? [];
        return symbol;
    }
}; //# sourceMappingURL=TokenUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/ethers/EthersHelpersUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EthersHelpersUtil",
    ()=>EthersHelpersUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$PresetsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/PresetsUtil.js [app-ssr] (ecmascript)");
;
const EthersHelpersUtil = {
    hexStringToNumber (value) {
        const string = value.startsWith('0x') ? value.slice(2) : value;
        const number = parseInt(string, 16);
        return number;
    },
    numberToHexString (value) {
        return `0x${value.toString(16)}`;
    },
    async getUserInfo (provider) {
        const [addresses, chainId] = await Promise.all([
            EthersHelpersUtil.getAddresses(provider),
            EthersHelpersUtil.getChainId(provider)
        ]);
        return {
            chainId,
            addresses
        };
    },
    async getChainId (provider) {
        const chainId = await provider.request({
            method: 'eth_chainId'
        });
        return Number(chainId);
    },
    async getAddress (provider) {
        const [address] = await provider.request({
            method: 'eth_accounts'
        });
        return address;
    },
    async getAddresses (provider) {
        const addresses = await provider.request({
            method: 'eth_accounts'
        });
        return addresses;
    },
    async addEthereumChain (provider, caipNetwork) {
        const rpcUrls = caipNetwork.rpcUrls['chainDefault']?.http || [];
        await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
                {
                    chainId: EthersHelpersUtil.numberToHexString(caipNetwork.id),
                    rpcUrls: [
                        ...rpcUrls
                    ],
                    chainName: caipNetwork.name,
                    nativeCurrency: {
                        name: caipNetwork.nativeCurrency.name,
                        decimals: caipNetwork.nativeCurrency.decimals,
                        symbol: caipNetwork.nativeCurrency.symbol
                    },
                    blockExplorerUrls: [
                        caipNetwork.blockExplorers?.default.url
                    ],
                    iconUrls: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$PresetsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PresetsUtil"].NetworkImageIds[caipNetwork.id]
                    ]
                }
            ]
        });
    }
}; //# sourceMappingURL=EthersHelpersUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/bitcoin/BitcoinConstantsUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BitcoinConstantsUtil",
    ()=>BitcoinConstantsUtil
]);
const BitcoinConstantsUtil = {
    ACCOUNT_INDEXES: {
        PAYMENT: 0,
        ORDINAL: 1
    }
}; //# sourceMappingURL=BitcoinConstantsUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/ConstantsUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConstantsUtil",
    ()=>ConstantsUtil
]);
const ConstantsUtil = {
    ACCOUNT_TABS: [
        {
            label: 'Tokens'
        },
        {
            label: 'Activity'
        }
    ],
    SECURE_SITE_ORIGIN: (typeof process !== 'undefined' && typeof process.env !== 'undefined' ? process.env['NEXT_PUBLIC_SECURE_SITE_ORIGIN'] : undefined) || 'https://secure.walletconnect.org',
    VIEW_DIRECTION: {
        Next: 'next',
        Prev: 'prev'
    },
    DEFAULT_CONNECT_METHOD_ORDER: [
        'email',
        'social',
        'wallet'
    ],
    ANIMATION_DURATIONS: {
        HeaderText: 120,
        ModalHeight: 150,
        ViewTransition: 150
    },
    VIEWS_WITH_LEGAL_FOOTER: [
        'Connect',
        'ConnectWallets',
        'OnRampTokenSelect',
        'OnRampFiatSelect',
        'OnRampProviders'
    ],
    VIEWS_WITH_DEFAULT_FOOTER: [
        'Networks'
    ]
}; //# sourceMappingURL=ConstantsUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/WalletUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletUtil",
    ()=>WalletUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ApiController.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/StorageUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/HelpersUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectorUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/ConnectorUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/ConstantsUtil.js [app-ssr] (ecmascript)");
;
;
;
;
const WalletUtil = {
    filterOutDuplicatesByRDNS (wallets) {
        const connectors = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OptionsController"].state.enableEIP6963 ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectorController"].state.connectors : [];
        const recent = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StorageUtil"].getRecentWallets();
        const connectorRDNSs = connectors.map((connector)=>connector.info?.rdns).filter(Boolean);
        const recentRDNSs = recent.map((wallet)=>wallet.rdns).filter(Boolean);
        const allRDNSs = connectorRDNSs.concat(recentRDNSs);
        if (allRDNSs.includes('io.metamask.mobile') && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isMobile()) {
            const index = allRDNSs.indexOf('io.metamask.mobile');
            allRDNSs[index] = 'io.metamask';
        }
        const filtered = wallets.filter((wallet)=>{
            if (wallet?.rdns && allRDNSs.includes(String(wallet.rdns))) {
                return false;
            }
            if (!wallet?.rdns) {
                const hasMatchingConnectorName = connectors.some((connector)=>connector.name === wallet.name);
                if (hasMatchingConnectorName) {
                    return false;
                }
            }
            return true;
        });
        return filtered;
    },
    filterOutDuplicatesByIds (wallets) {
        const connectors = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectorController"].state.connectors.filter((connector)=>connector.type === 'ANNOUNCED' || connector.type === 'INJECTED');
        const recent = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StorageUtil"].getRecentWallets();
        const connectorIds = connectors.map((connector)=>connector.explorerId);
        const recentIds = recent.map((wallet)=>wallet.id);
        const allIds = connectorIds.concat(recentIds);
        const filtered = wallets.filter((wallet)=>!allIds.includes(wallet?.id));
        return filtered;
    },
    filterOutDuplicateWallets (wallets) {
        const uniqueByRDNS = this.filterOutDuplicatesByRDNS(wallets);
        const uniqueWallets = this.filterOutDuplicatesByIds(uniqueByRDNS);
        return uniqueWallets;
    },
    markWalletsAsInstalled (wallets) {
        const { connectors } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectorController"].state;
        const { featuredWalletIds } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OptionsController"].state;
        const installedWalletRdnsMap = connectors.filter((connector)=>connector.type === 'ANNOUNCED').reduce((rdnsMap, connector)=>{
            if (!connector.info?.rdns) {
                return rdnsMap;
            }
            rdnsMap[connector.info.rdns] = true;
            return rdnsMap;
        }, {});
        const walletsWithInstallationStatus = wallets.map((wallet)=>({
                ...wallet,
                installed: Boolean(wallet.rdns) && Boolean(installedWalletRdnsMap[wallet.rdns ?? ''])
            }));
        const sortedWallets = walletsWithInstallationStatus.sort((walletA, walletB)=>{
            const installationComparison = Number(walletB.installed) - Number(walletA.installed);
            if (installationComparison !== 0) {
                return installationComparison;
            }
            if (featuredWalletIds?.length) {
                const walletAFeaturedIndex = featuredWalletIds.indexOf(walletA.id);
                const walletBFeaturedIndex = featuredWalletIds.indexOf(walletB.id);
                if (walletAFeaturedIndex !== -1 && walletBFeaturedIndex !== -1) {
                    return walletAFeaturedIndex - walletBFeaturedIndex;
                }
                if (walletAFeaturedIndex !== -1) {
                    return -1;
                }
                if (walletBFeaturedIndex !== -1) {
                    return 1;
                }
            }
            return 0;
        });
        return sortedWallets;
    },
    getConnectOrderMethod (_features, _connectors) {
        const connectMethodOrder = _features?.connectMethodsOrder || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OptionsController"].state.features?.connectMethodsOrder;
        const connectors = _connectors || __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectorController"].state.connectors;
        if (connectMethodOrder) {
            return connectMethodOrder;
        }
        const { injected, announced } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectorUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectorUtil"].getConnectorsByType(connectors, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiController"].state.recommended, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiController"].state.featured);
        const shownInjected = injected.filter(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectorUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectorUtil"].showConnector);
        const shownAnnounced = announced.filter(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectorUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectorUtil"].showConnector);
        if (shownInjected.length || shownAnnounced.length) {
            return [
                'wallet',
                'email',
                'social'
            ];
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].DEFAULT_CONNECT_METHOD_ORDER;
    },
    isExcluded (wallet) {
        const isRDNSExcluded = Boolean(wallet.rdns) && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiController"].state.excludedWallets.some((w)=>w.rdns === wallet.rdns);
        const isNameExcluded = Boolean(wallet.name) && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiController"].state.excludedWallets.some((w)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HelpersUtil"].isLowerCaseMatch(w.name, wallet.name));
        return isRDNSExcluded || isNameExcluded;
    },
    markWalletsWithDisplayIndex (wallets) {
        return wallets.map((w, index)=>({
                ...w,
                display_index: index
            }));
    }
}; //# sourceMappingURL=WalletUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/ConnectorUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConnectorUtil",
    ()=>ConnectorUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/ConstantsUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ApiController.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ChainController.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectionController.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/ConnectorController.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/CoreHelperUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/controllers/OptionsController.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$OptionsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/OptionsUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-controllers/dist/esm/src/utils/StorageUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-utils/dist/esm/src/HelpersUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WalletUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/WalletUtil.js [app-ssr] (ecmascript)");
;
;
;
;
const ConnectorUtil = {
    getConnectorsByType (connectors, recommended, featured) {
        const { customWallets } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OptionsController"].state;
        const recent = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StorageUtil"].getRecentWallets();
        const filteredRecommended = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WalletUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WalletUtil"].filterOutDuplicateWallets(recommended);
        const filteredFeatured = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WalletUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WalletUtil"].filterOutDuplicateWallets(featured);
        const multiChain = connectors.filter((connector)=>connector.type === 'MULTI_CHAIN');
        const announced = connectors.filter((connector)=>connector.type === 'ANNOUNCED');
        const injected = connectors.filter((connector)=>connector.type === 'INJECTED');
        const external = connectors.filter((connector)=>connector.type === 'EXTERNAL');
        return {
            custom: customWallets,
            recent,
            external,
            multiChain,
            announced,
            injected,
            recommended: filteredRecommended,
            featured: filteredFeatured
        };
    },
    showConnector (connector) {
        const rdns = connector.info?.rdns;
        const isRDNSExcluded = Boolean(rdns) && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiController"].state.excludedWallets.some((wallet)=>Boolean(wallet.rdns) && wallet.rdns === rdns);
        const isNameExcluded = Boolean(connector.name) && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ApiController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiController"].state.excludedWallets.some((wallet)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$utils$2f$dist$2f$esm$2f$src$2f$HelpersUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HelpersUtil"].isLowerCaseMatch(wallet.name, connector.name));
        if (connector.type === 'INJECTED') {
            const isBrowserWallet = connector.name === 'Browser Wallet';
            if (isBrowserWallet) {
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isMobile()) {
                    return false;
                }
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isMobile() && !rdns && !__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectionController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectionController"].checkInstalled()) {
                    return false;
                }
            }
            if (isRDNSExcluded || isNameExcluded) {
                return false;
            }
        }
        if ((connector.type === 'ANNOUNCED' || connector.type === 'EXTERNAL') && (isRDNSExcluded || isNameExcluded)) {
            return false;
        }
        return true;
    },
    getIsConnectedWithWC () {
        const chains = Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChainController"].state.chains.values());
        const isConnectedWithWC = chains.some((chain)=>{
            const connectorId = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectorController"].getConnectorId(chain.namespace);
            return connectorId === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.WALLET_CONNECT;
        });
        return isConnectedWithWC;
    },
    getConnectorTypeOrder ({ recommended, featured, custom, recent, announced, injected, multiChain, external, overriddenConnectors = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OptionsController"].state.features?.connectorTypeOrder ?? [] }) {
        const allConnectors = [
            {
                type: 'walletConnect',
                isEnabled: true
            },
            {
                type: 'recent',
                isEnabled: recent.length > 0
            },
            {
                type: 'injected',
                isEnabled: [
                    ...injected,
                    ...announced,
                    ...multiChain
                ].length > 0
            },
            {
                type: 'featured',
                isEnabled: featured.length > 0
            },
            {
                type: 'custom',
                isEnabled: custom && custom.length > 0
            },
            {
                type: 'external',
                isEnabled: external.length > 0
            },
            {
                type: 'recommended',
                isEnabled: recommended.length > 0
            }
        ];
        const enabledConnectors = allConnectors.filter((option)=>option.isEnabled);
        const enabledConnectorTypes = new Set(enabledConnectors.map((option)=>option.type));
        const prioritizedConnectors = overriddenConnectors.filter((type)=>enabledConnectorTypes.has(type)).map((type)=>({
                type,
                isEnabled: true
            }));
        const remainingConnectors = enabledConnectors.filter(({ type: enabledConnectorType })=>{
            const hasPrioritizedConnector = prioritizedConnectors.some(({ type: prioritizedConnectorType })=>prioritizedConnectorType === enabledConnectorType);
            return !hasPrioritizedConnector;
        });
        return Array.from(new Set([
            ...prioritizedConnectors,
            ...remainingConnectors
        ].map(({ type })=>type)));
    },
    sortConnectorsByExplorerWallet (connectors) {
        return [
            ...connectors
        ].sort((a, b)=>{
            if (a.explorerWallet && b.explorerWallet) {
                return (a.explorerWallet.order ?? 0) - (b.explorerWallet.order ?? 0);
            }
            if (a.explorerWallet) {
                return -1;
            }
            if (b.explorerWallet) {
                return 1;
            }
            return 0;
        });
    },
    getAuthName ({ email, socialUsername, socialProvider }) {
        if (socialUsername) {
            if (socialProvider && socialProvider === 'discord' && socialUsername.endsWith('0')) {
                return socialUsername.slice(0, -1);
            }
            return socialUsername;
        }
        return email.length > 30 ? `${email.slice(0, -3)}...` : email;
    },
    async fetchProviderData (connector) {
        try {
            if (connector.name === 'Browser Wallet' && !__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isMobile()) {
                return {
                    accounts: [],
                    chainId: undefined
                };
            }
            if (connector.id === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConstantsUtil"].CONNECTOR_ID.AUTH) {
                return {
                    accounts: [],
                    chainId: undefined
                };
            }
            const [accounts, chainId] = await Promise.all([
                connector.provider?.request({
                    method: 'eth_accounts'
                }),
                connector.provider?.request({
                    method: 'eth_chainId'
                }).then((hexChainId)=>Number(hexChainId))
            ]);
            return {
                accounts,
                chainId
            };
        } catch (err) {
            console.warn(`Failed to fetch provider data for ${connector.name}`, err);
            return {
                accounts: [],
                chainId: undefined
            };
        }
    },
    getFilteredCustomWallets (wallets) {
        const recent = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StorageUtil"].getRecentWallets();
        const connectorRDNSs = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectorController"].state.connectors.map((connector)=>connector.info?.rdns).filter(Boolean);
        const recentRDNSs = recent.map((wallet)=>wallet.rdns).filter(Boolean);
        const allRDNSs = connectorRDNSs.concat(recentRDNSs);
        if (allRDNSs.includes('io.metamask.mobile') && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$CoreHelperUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CoreHelperUtil"].isMobile()) {
            const index = allRDNSs.indexOf('io.metamask.mobile');
            allRDNSs[index] = 'io.metamask';
        }
        const filtered = wallets.filter((wallet)=>!allRDNSs.includes(String(wallet?.rdns)));
        return filtered;
    },
    hasWalletConnector (wallet) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectorController"].state.connectors.some((connector)=>connector.id === wallet.id || connector.name === wallet.name);
    },
    isWalletCompatibleWithCurrentChain (wallet) {
        const currentNamespace = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ChainController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChainController"].state.activeChain;
        if (currentNamespace && wallet.chains) {
            return wallet.chains.some((c)=>{
                const chainNamespace = c.split(':')[0];
                return currentNamespace === chainNamespace;
            });
        }
        return true;
    },
    getFilteredRecentWallets () {
        const recentWallets = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$StorageUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StorageUtil"].getRecentWallets();
        const filteredRecentWallets = recentWallets.filter((wallet)=>!__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WalletUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WalletUtil"].isExcluded(wallet)).filter((wallet)=>!this.hasWalletConnector(wallet)).filter((wallet)=>this.isWalletCompatibleWithCurrentChain(wallet));
        return filteredRecentWallets;
    },
    getCappedRecommendedWallets (wallets) {
        const { connectors } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$ConnectorController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConnectorController"].state;
        const { customWallets, featuredWalletIds } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$controllers$2f$OptionsController$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OptionsController"].state;
        const wcConnector = connectors.find((c)=>c.id === 'walletConnect');
        const injectedConnectors = connectors.filter((c)=>c.type === 'INJECTED' || c.type === 'ANNOUNCED' || c.type === 'MULTI_CHAIN');
        if (!wcConnector && !injectedConnectors.length && !customWallets?.length) {
            return [];
        }
        const isEmailEnabled = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$OptionsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OptionsUtil"].isEmailEnabled();
        const isSocialsEnabled = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$controllers$2f$dist$2f$esm$2f$src$2f$utils$2f$OptionsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OptionsUtil"].isSocialsEnabled();
        const injectedWallets = injectedConnectors.filter((i)=>i.name !== 'Browser Wallet');
        const featuredWalletAmount = featuredWalletIds?.length || 0;
        const customWalletAmount = customWallets?.length || 0;
        const injectedWalletAmount = injectedWallets.length || 0;
        const emailWalletAmount = isEmailEnabled ? 1 : 0;
        const socialWalletAmount = isSocialsEnabled ? 1 : 0;
        const walletsDisplayed = featuredWalletAmount + customWalletAmount + injectedWalletAmount + emailWalletAmount + socialWalletAmount;
        const DISPLAYED_WALLETS_AMOUNT = 4;
        const sliceAmount = Math.max(0, DISPLAYED_WALLETS_AMOUNT - walletsDisplayed);
        if (sliceAmount <= 0) {
            return [];
        }
        const filtered = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WalletUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WalletUtil"].filterOutDuplicateWallets(wallets);
        return filtered.slice(0, sliceAmount);
    }
}; //# sourceMappingURL=ConnectorUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/exports/utils.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ConnectorUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/ConnectorUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/ConstantsUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$scaffold$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WalletUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-scaffold-ui/dist/esm/src/utils/WalletUtil.js [app-ssr] (ecmascript)"); //# sourceMappingURL=utils.js.map
;
;
;
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/MathUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MathUtil",
    ()=>MathUtil
]);
const MathUtil = {
    interpolate (inputRange, outputRange, value) {
        if (inputRange.length !== 2 || outputRange.length !== 2) {
            throw new Error('inputRange and outputRange must be an array of length 2');
        }
        const originalRangeMin = inputRange[0] || 0;
        const originalRangeMax = inputRange[1] || 0;
        const newRangeMin = outputRange[0] || 0;
        const newRangeMax = outputRange[1] || 0;
        if (value < originalRangeMin) {
            return newRangeMin;
        }
        if (value > originalRangeMax) {
            return newRangeMax;
        }
        return (newRangeMax - newRangeMin) / (originalRangeMax - originalRangeMin) * (value - originalRangeMin) + newRangeMin;
    }
}; //# sourceMappingURL=MathUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeConstantsUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "borderRadius",
    ()=>borderRadius,
    "colors",
    ()=>colors,
    "spacing",
    ()=>spacing,
    "styles",
    ()=>styles,
    "tokens",
    ()=>tokens
]);
const colors = {
    black: '#202020',
    white: '#FFFFFF',
    white010: 'rgba(255, 255, 255, 0.1)',
    accent010: 'rgba(9, 136, 240, 0.1)',
    accent020: 'rgba(9, 136, 240, 0.2)',
    accent030: 'rgba(9, 136, 240, 0.3)',
    accent040: 'rgba(9, 136, 240, 0.4)',
    accent050: 'rgba(9, 136, 240, 0.5)',
    accent060: 'rgba(9, 136, 240, 0.6)',
    accent070: 'rgba(9, 136, 240, 0.7)',
    accent080: 'rgba(9, 136, 240, 0.8)',
    accent090: 'rgba(9, 136, 240, 0.9)',
    accent100: 'rgba(9, 136, 240, 1.0)',
    accentSecondary010: 'rgba(199, 185, 148, 0.1)',
    accentSecondary020: 'rgba(199, 185, 148, 0.2)',
    accentSecondary030: 'rgba(199, 185, 148, 0.3)',
    accentSecondary040: 'rgba(199, 185, 148, 0.4)',
    accentSecondary050: 'rgba(199, 185, 148, 0.5)',
    accentSecondary060: 'rgba(199, 185, 148, 0.6)',
    accentSecondary070: 'rgba(199, 185, 148, 0.7)',
    accentSecondary080: 'rgba(199, 185, 148, 0.8)',
    accentSecondary090: 'rgba(199, 185, 148, 0.9)',
    accentSecondary100: 'rgba(199, 185, 148, 1.0)',
    productWalletKit: '#FFB800',
    productAppKit: '#FF573B',
    productCloud: '#0988F0',
    productDocumentation: '#008847',
    neutrals050: '#F6F6F6',
    neutrals100: '#F3F3F3',
    neutrals200: '#E9E9E9',
    neutrals300: '#D0D0D0',
    neutrals400: '#BBB',
    neutrals500: '#9A9A9A',
    neutrals600: '#6C6C6C',
    neutrals700: '#4F4F4F',
    neutrals800: '#363636',
    neutrals900: '#2A2A2A',
    neutrals1000: '#252525',
    semanticSuccess010: 'rgba(48, 164, 107, 0.1)',
    semanticSuccess020: 'rgba(48, 164, 107, 0.2)',
    semanticSuccess030: 'rgba(48, 164, 107, 0.3)',
    semanticSuccess040: 'rgba(48, 164, 107, 0.4)',
    semanticSuccess050: 'rgba(48, 164, 107, 0.5)',
    semanticSuccess060: 'rgba(48, 164, 107, 0.6)',
    semanticSuccess070: 'rgba(48, 164, 107, 0.7)',
    semanticSuccess080: 'rgba(48, 164, 107, 0.8)',
    semanticSuccess090: 'rgba(48, 164, 107, 0.9)',
    semanticSuccess100: 'rgba(48, 164, 107, 1.0)',
    semanticError010: 'rgba(223, 74, 52, 0.1)',
    semanticError020: 'rgba(223, 74, 52, 0.2)',
    semanticError030: 'rgba(223, 74, 52, 0.3)',
    semanticError040: 'rgba(223, 74, 52, 0.4)',
    semanticError050: 'rgba(223, 74, 52, 0.5)',
    semanticError060: 'rgba(223, 74, 52, 0.6)',
    semanticError070: 'rgba(223, 74, 52, 0.7)',
    semanticError080: 'rgba(223, 74, 52, 0.8)',
    semanticError090: 'rgba(223, 74, 52, 0.9)',
    semanticError100: 'rgba(223, 74, 52, 1.0)',
    semanticWarning010: 'rgba(243, 161, 63, 0.1)',
    semanticWarning020: 'rgba(243, 161, 63, 0.2)',
    semanticWarning030: 'rgba(243, 161, 63, 0.3)',
    semanticWarning040: 'rgba(243, 161, 63, 0.4)',
    semanticWarning050: 'rgba(243, 161, 63, 0.5)',
    semanticWarning060: 'rgba(243, 161, 63, 0.6)',
    semanticWarning070: 'rgba(243, 161, 63, 0.7)',
    semanticWarning080: 'rgba(243, 161, 63, 0.8)',
    semanticWarning090: 'rgba(243, 161, 63, 0.9)',
    semanticWarning100: 'rgba(243, 161, 63, 1.0)'
};
const tokens = {
    core: {
        backgroundAccentPrimary: '#0988F0',
        backgroundAccentCertified: '#C7B994',
        backgroundWalletKit: '#FFB800',
        backgroundAppKit: '#FF573B',
        backgroundCloud: '#0988F0',
        backgroundDocumentation: '#008847',
        backgroundSuccess: 'rgba(48, 164, 107, 0.20)',
        backgroundError: 'rgba(223, 74, 52, 0.20)',
        backgroundWarning: 'rgba(243, 161, 63, 0.20)',
        textAccentPrimary: '#0988F0',
        textAccentCertified: '#C7B994',
        textWalletKit: '#FFB800',
        textAppKit: '#FF573B',
        textCloud: '#0988F0',
        textDocumentation: '#008847',
        textSuccess: '#30A46B',
        textError: '#DF4A34',
        textWarning: '#F3A13F',
        borderAccentPrimary: '#0988F0',
        borderSecondary: '#C7B994',
        borderSuccess: '#30A46B',
        borderError: '#DF4A34',
        borderWarning: '#F3A13F',
        foregroundAccent010: 'rgba(9, 136, 240, 0.1)',
        foregroundAccent020: 'rgba(9, 136, 240, 0.2)',
        foregroundAccent040: 'rgba(9, 136, 240, 0.4)',
        foregroundAccent060: 'rgba(9, 136, 240, 0.6)',
        foregroundSecondary020: 'rgba(199, 185, 148, 0.2)',
        foregroundSecondary040: 'rgba(199, 185, 148, 0.4)',
        foregroundSecondary060: 'rgba(199, 185, 148, 0.6)',
        iconAccentPrimary: '#0988F0',
        iconAccentCertified: '#C7B994',
        iconSuccess: '#30A46B',
        iconError: '#DF4A34',
        iconWarning: '#F3A13F',
        glass010: 'rgba(255, 255, 255, 0.1)',
        zIndex: '9999'
    },
    dark: {
        overlay: 'rgba(0, 0, 0, 0.50)',
        backgroundPrimary: '#202020',
        backgroundInvert: '#FFFFFF',
        textPrimary: '#FFFFFF',
        textSecondary: '#9A9A9A',
        textTertiary: '#BBBBBB',
        textInvert: '#202020',
        borderPrimary: '#2A2A2A',
        borderPrimaryDark: '#363636',
        borderSecondary: '#4F4F4F',
        foregroundPrimary: '#252525',
        foregroundSecondary: '#2A2A2A',
        foregroundTertiary: '#363636',
        iconDefault: '#9A9A9A',
        iconInverse: '#FFFFFF'
    },
    light: {
        overlay: 'rgba(230 , 230, 230, 0.5)',
        backgroundPrimary: '#FFFFFF',
        borderPrimaryDark: '#E9E9E9',
        backgroundInvert: '#202020',
        textPrimary: '#202020',
        textSecondary: '#9A9A9A',
        textTertiary: '#6C6C6C',
        textInvert: '#FFFFFF',
        borderPrimary: '#E9E9E9',
        borderSecondary: '#D0D0D0',
        foregroundPrimary: '#F3F3F3',
        foregroundSecondary: '#E9E9E9',
        foregroundTertiary: '#D0D0D0',
        iconDefault: '#9A9A9A',
        iconInverse: '#202020'
    }
};
const borderRadius = {
    '1': '4px',
    '2': '8px',
    '10': '10px',
    '3': '12px',
    '4': '16px',
    '6': '24px',
    '5': '20px',
    '8': '32px',
    '16': '64px',
    '20': '80px',
    '32': '128px',
    '64': '256px',
    '128': '512px',
    round: '9999px'
};
const spacing = {
    '0': '0px',
    '01': '2px',
    '1': '4px',
    '2': '8px',
    '3': '12px',
    '4': '16px',
    '5': '20px',
    '6': '24px',
    '7': '28px',
    '8': '32px',
    '9': '36px',
    '10': '40px',
    '12': '48px',
    '14': '56px',
    '16': '64px',
    '20': '80px',
    '32': '128px',
    '64': '256px'
};
const fontFamily = {
    regular: 'KHTeka',
    mono: 'KHTekaMono'
};
const fontWeight = {
    regular: '400',
    medium: '500'
};
const textSize = {
    h1: '50px',
    h2: '44px',
    h3: '38px',
    h4: '32px',
    h5: '26px',
    h6: '20px',
    large: '16px',
    medium: '14px',
    small: '12px'
};
const typography = {
    'h1-regular-mono': {
        lineHeight: '50px',
        letterSpacing: '-3px'
    },
    'h1-regular': {
        lineHeight: '50px',
        letterSpacing: '-1px'
    },
    'h1-medium': {
        lineHeight: '50px',
        letterSpacing: '-0.84px'
    },
    'h2-regular-mono': {
        lineHeight: '44px',
        letterSpacing: '-2.64px'
    },
    'h2-regular': {
        lineHeight: '44px',
        letterSpacing: '-0.88px'
    },
    'h2-medium': {
        lineHeight: '44px',
        letterSpacing: '-0.88px'
    },
    'h3-regular-mono': {
        lineHeight: '38px',
        letterSpacing: '-2.28px'
    },
    'h3-regular': {
        lineHeight: '38px',
        letterSpacing: '-0.76px'
    },
    'h3-medium': {
        lineHeight: '38px',
        letterSpacing: '-0.76px'
    },
    'h4-regular-mono': {
        lineHeight: '32px',
        letterSpacing: '-1.92px'
    },
    'h4-regular': {
        lineHeight: '32px',
        letterSpacing: '-0.32px'
    },
    'h4-medium': {
        lineHeight: '32px',
        letterSpacing: '-0.32px'
    },
    'h5-regular-mono': {
        lineHeight: '26px',
        letterSpacing: '-1.56px'
    },
    'h5-regular': {
        lineHeight: '26px',
        letterSpacing: '-0.26px'
    },
    'h5-medium': {
        lineHeight: '26px',
        letterSpacing: '-0.26px'
    },
    'h6-regular-mono': {
        lineHeight: '20px',
        letterSpacing: '-1.2px'
    },
    'h6-regular': {
        lineHeight: '20px',
        letterSpacing: '-0.6px'
    },
    'h6-medium': {
        lineHeight: '20px',
        letterSpacing: '-0.6px'
    },
    'lg-regular-mono': {
        lineHeight: '16px',
        letterSpacing: '-0.96px'
    },
    'lg-regular': {
        lineHeight: '18px',
        letterSpacing: '-0.16px'
    },
    'lg-medium': {
        lineHeight: '18px',
        letterSpacing: '-0.16px'
    },
    'md-regular-mono': {
        lineHeight: '14px',
        letterSpacing: '-0.84px'
    },
    'md-regular': {
        lineHeight: '16px',
        letterSpacing: '-0.14px'
    },
    'md-medium': {
        lineHeight: '16px',
        letterSpacing: '-0.14px'
    },
    'sm-regular-mono': {
        lineHeight: '12px',
        letterSpacing: '-0.72px'
    },
    'sm-regular': {
        lineHeight: '14px',
        letterSpacing: '-0.12px'
    },
    'sm-medium': {
        lineHeight: '14px',
        letterSpacing: '-0.12px'
    }
};
const easings = {
    'ease-out-power-2': 'cubic-bezier(0.23, 0.09, 0.08, 1.13)',
    'ease-out-power-1': 'cubic-bezier(0.12, 0.04, 0.2, 1.06)',
    'ease-in-power-2': 'cubic-bezier(0.92, -0.13, 0.77, 0.91)',
    'ease-in-power-1': 'cubic-bezier(0.88, -0.06, 0.8, 0.96)',
    'ease-inout-power-2': 'cubic-bezier(0.77, 0.09, 0.23, 1.13)',
    'ease-inout-power-1': 'cubic-bezier(0.88, 0.04, 0.12, 1.06)'
};
const durations = {
    xl: '400ms',
    lg: '200ms',
    md: '125ms',
    sm: '75ms'
};
const styles = {
    colors,
    fontFamily,
    fontWeight,
    textSize,
    typography,
    tokens: {
        core: tokens.core,
        theme: tokens.dark
    },
    borderRadius,
    spacing,
    durations,
    easings
}; //# sourceMappingURL=ThemeConstantsUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeHelperUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeHelperUtil",
    ()=>ThemeHelperUtil,
    "css",
    ()=>css,
    "vars",
    ()=>vars
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/lit/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@lit/reactive-element/node/development/reactive-element.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeConstantsUtil.js [app-ssr] (ecmascript)");
;
;
const PREFIX_VAR = '--apkt';
const ThemeHelperUtil = {
    createCSSVariables (styles) {
        const cssVariables = {};
        const cssVariablesVarPrefix = {};
        function createVars(_styles, parent, currentVar = '') {
            for (const [styleKey, styleValue] of Object.entries(_styles)){
                const variable = currentVar ? `${currentVar}-${styleKey}` : styleKey;
                if (styleValue && typeof styleValue === 'object' && Object.keys(styleValue).length) {
                    parent[styleKey] = {};
                    createVars(styleValue, parent[styleKey], variable);
                } else if (typeof styleValue === 'string') {
                    parent[styleKey] = `${PREFIX_VAR}-${variable}`;
                }
            }
        }
        function addVarsPrefix(_styles, parent) {
            for (const [key, value] of Object.entries(_styles)){
                if (value && typeof value === 'object') {
                    parent[key] = {};
                    addVarsPrefix(value, parent[key]);
                } else if (typeof value === 'string') {
                    parent[key] = `var(${value})`;
                }
            }
        }
        createVars(styles, cssVariables);
        addVarsPrefix(cssVariables, cssVariablesVarPrefix);
        return {
            cssVariables,
            cssVariablesVarPrefix
        };
    },
    assignCSSVariables (vars, styles) {
        const assignedCSSVariables = {};
        function assignVars(_vars, _styles, variable) {
            for (const [varKey, varValue] of Object.entries(_vars)){
                const nextVariable = variable ? `${variable}-${varKey}` : varKey;
                const styleValues = _styles[varKey];
                if (varValue && typeof varValue === 'object') {
                    assignVars(varValue, styleValues, nextVariable);
                } else if (typeof styleValues === 'string') {
                    assignedCSSVariables[`${PREFIX_VAR}-${nextVariable}`] = styleValues;
                }
            }
        }
        assignVars(vars, styles);
        return assignedCSSVariables;
    },
    createRootStyles (theme, themeVariables) {
        const styles = {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styles"],
            tokens: {
                ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styles"].tokens,
                theme: theme === 'light' ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tokens"].light : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["tokens"].dark
            }
        };
        const { cssVariables } = ThemeHelperUtil.createCSSVariables(styles);
        const assignedCSSVariables = ThemeHelperUtil.assignCSSVariables(cssVariables, styles);
        const w3mVariables = ThemeHelperUtil.generateW3MVariables(themeVariables);
        const w3mOverrides = ThemeHelperUtil.generateW3MOverrides(themeVariables);
        const scaledVariables = ThemeHelperUtil.generateScaledVariables(themeVariables);
        const baseVariables = ThemeHelperUtil.generateBaseVariables(assignedCSSVariables);
        const allVariables = {
            ...assignedCSSVariables,
            ...baseVariables,
            ...w3mVariables,
            ...w3mOverrides,
            ...scaledVariables
        };
        const colorMixVariables = ThemeHelperUtil.applyColorMixToVariables(themeVariables, allVariables);
        const finalVariables = {
            ...allVariables,
            ...colorMixVariables
        };
        const rootStyles = Object.entries(finalVariables).map(([key, style])=>`${key}:${style.replace('/[:;{}</>]/g', '')};`).join('');
        return `:root {${rootStyles}}`;
    },
    generateW3MVariables (themeVariables) {
        if (!themeVariables) {
            return {};
        }
        const variables = {};
        variables['--w3m-font-family'] = themeVariables['--w3m-font-family'] || 'KHTeka';
        variables['--w3m-accent'] = themeVariables['--w3m-accent'] || '#0988F0';
        variables['--w3m-color-mix'] = themeVariables['--w3m-color-mix'] || '#000';
        variables['--w3m-color-mix-strength'] = `${themeVariables['--w3m-color-mix-strength'] || 0}%`;
        variables['--w3m-font-size-master'] = themeVariables['--w3m-font-size-master'] || '10px';
        variables['--w3m-border-radius-master'] = themeVariables['--w3m-border-radius-master'] || '4px';
        return variables;
    },
    generateW3MOverrides (themeVariables) {
        if (!themeVariables) {
            return {};
        }
        const overrides = {};
        if (themeVariables['--w3m-accent']) {
            const accentColor = themeVariables['--w3m-accent'];
            overrides['--apkt-tokens-core-iconAccentPrimary'] = accentColor;
            overrides['--apkt-tokens-core-borderAccentPrimary'] = accentColor;
            overrides['--apkt-tokens-core-textAccentPrimary'] = accentColor;
            overrides['--apkt-tokens-core-backgroundAccentPrimary'] = accentColor;
        }
        if (themeVariables['--w3m-font-family']) {
            overrides['--apkt-fontFamily-regular'] = themeVariables['--w3m-font-family'];
        }
        if (themeVariables['--w3m-z-index']) {
            overrides['--apkt-tokens-core-zIndex'] = `${themeVariables['--w3m-z-index']}`;
        }
        return overrides;
    },
    generateScaledVariables (themeVariables) {
        if (!themeVariables) {
            return {};
        }
        const scaledVars = {};
        if (themeVariables['--w3m-font-size-master']) {
            const masterSize = parseFloat(themeVariables['--w3m-font-size-master'].replace('px', ''));
            scaledVars['--apkt-textSize-h1'] = `${Number(masterSize) * 5}px`;
            scaledVars['--apkt-textSize-h2'] = `${Number(masterSize) * 4.4}px`;
            scaledVars['--apkt-textSize-h3'] = `${Number(masterSize) * 3.8}px`;
            scaledVars['--apkt-textSize-h4'] = `${Number(masterSize) * 3.2}px`;
            scaledVars['--apkt-textSize-h5'] = `${Number(masterSize) * 2.6}px`;
            scaledVars['--apkt-textSize-h6'] = `${Number(masterSize) * 2}px`;
            scaledVars['--apkt-textSize-large'] = `${Number(masterSize) * 1.6}px`;
            scaledVars['--apkt-textSize-medium'] = `${Number(masterSize) * 1.4}px`;
            scaledVars['--apkt-textSize-small'] = `${Number(masterSize) * 1.2}px`;
        }
        if (themeVariables['--w3m-border-radius-master']) {
            const masterRadius = parseFloat(themeVariables['--w3m-border-radius-master'].replace('px', ''));
            scaledVars['--apkt-borderRadius-1'] = `${Number(masterRadius)}px`;
            scaledVars['--apkt-borderRadius-2'] = `${Number(masterRadius) * 2}px`;
            scaledVars['--apkt-borderRadius-3'] = `${Number(masterRadius) * 3}px`;
            scaledVars['--apkt-borderRadius-4'] = `${Number(masterRadius) * 4}px`;
            scaledVars['--apkt-borderRadius-5'] = `${Number(masterRadius) * 5}px`;
            scaledVars['--apkt-borderRadius-6'] = `${Number(masterRadius) * 6}px`;
            scaledVars['--apkt-borderRadius-8'] = `${Number(masterRadius) * 8}px`;
            scaledVars['--apkt-borderRadius-16'] = `${Number(masterRadius) * 16}px`;
            scaledVars['--apkt-borderRadius-20'] = `${Number(masterRadius) * 20}px`;
            scaledVars['--apkt-borderRadius-32'] = `${Number(masterRadius) * 32}px`;
            scaledVars['--apkt-borderRadius-64'] = `${Number(masterRadius) * 64}px`;
            scaledVars['--apkt-borderRadius-128'] = `${Number(masterRadius) * 128}px`;
        }
        return scaledVars;
    },
    generateColorMixCSS (themeVariables, allVariables) {
        if (!themeVariables?.['--w3m-color-mix'] || !themeVariables['--w3m-color-mix-strength']) {
            return '';
        }
        const colorMix = themeVariables['--w3m-color-mix'];
        const strength = themeVariables['--w3m-color-mix-strength'];
        if (!strength || strength === 0) {
            return '';
        }
        const colorVariables = Object.keys(allVariables || {}).filter((key)=>{
            const isColorToken = key.includes('-tokens-core-background') || key.includes('-tokens-core-text') || key.includes('-tokens-core-border') || key.includes('-tokens-core-foreground') || key.includes('-tokens-core-icon') || key.includes('-tokens-theme-background') || key.includes('-tokens-theme-text') || key.includes('-tokens-theme-border') || key.includes('-tokens-theme-foreground') || key.includes('-tokens-theme-icon');
            const isDimensional = key.includes('-borderRadius-') || key.includes('-spacing-') || key.includes('-textSize-') || key.includes('-fontFamily-') || key.includes('-fontWeight-') || key.includes('-typography-') || key.includes('-duration-') || key.includes('-ease-') || key.includes('-path-') || key.includes('-width-') || key.includes('-height-') || key.includes('-visual-size-') || key.includes('-modal-width') || key.includes('-cover');
            return isColorToken && !isDimensional;
        });
        if (colorVariables.length === 0) {
            return '';
        }
        const colorMixVariables = colorVariables.map((key)=>{
            const originalValue = allVariables?.[key] || '';
            if (originalValue.includes('color-mix') || originalValue.startsWith('#') || originalValue.startsWith('rgb')) {
                return `${key}: color-mix(in srgb, ${colorMix} ${strength}%, ${originalValue});`;
            }
            return `${key}: color-mix(in srgb, ${colorMix} ${strength}%, var(${key}-base, ${originalValue}));`;
        }).join('');
        return ` @supports (background: color-mix(in srgb, white 50%, black)) {
      :root {
        ${colorMixVariables}
      }
    }`;
    },
    generateBaseVariables (assignedCSSVariables) {
        const baseVariables = {};
        const themeBackgroundPrimary = assignedCSSVariables['--apkt-tokens-theme-backgroundPrimary'];
        if (themeBackgroundPrimary) {
            baseVariables['--apkt-tokens-theme-backgroundPrimary-base'] = themeBackgroundPrimary;
        }
        const coreBackgroundAccentPrimary = assignedCSSVariables['--apkt-tokens-core-backgroundAccentPrimary'];
        if (coreBackgroundAccentPrimary) {
            baseVariables['--apkt-tokens-core-backgroundAccentPrimary-base'] = coreBackgroundAccentPrimary;
        }
        return baseVariables;
    },
    applyColorMixToVariables (themeVariables, allVariables) {
        const colorMixVariables = {};
        if (allVariables?.['--apkt-tokens-theme-backgroundPrimary']) {
            colorMixVariables['--apkt-tokens-theme-backgroundPrimary'] = 'var(--apkt-tokens-theme-backgroundPrimary-base)';
        }
        if (allVariables?.['--apkt-tokens-core-backgroundAccentPrimary']) {
            colorMixVariables['--apkt-tokens-core-backgroundAccentPrimary'] = 'var(--apkt-tokens-core-backgroundAccentPrimary-base)';
        }
        if (!themeVariables?.['--w3m-color-mix'] || !themeVariables['--w3m-color-mix-strength']) {
            return colorMixVariables;
        }
        const colorMix = themeVariables['--w3m-color-mix'];
        const strength = themeVariables['--w3m-color-mix-strength'];
        if (!strength || strength === 0) {
            return colorMixVariables;
        }
        const colorVariables = Object.keys(allVariables || {}).filter((key)=>{
            const isColorToken = key.includes('-tokens-core-background') || key.includes('-tokens-core-text') || key.includes('-tokens-core-border') || key.includes('-tokens-core-foreground') || key.includes('-tokens-core-icon') || key.includes('-tokens-theme-background') || key.includes('-tokens-theme-text') || key.includes('-tokens-theme-border') || key.includes('-tokens-theme-foreground') || key.includes('-tokens-theme-icon') || key.includes('-tokens-theme-overlay');
            const isDimensional = key.includes('-borderRadius-') || key.includes('-spacing-') || key.includes('-textSize-') || key.includes('-fontFamily-') || key.includes('-fontWeight-') || key.includes('-typography-') || key.includes('-duration-') || key.includes('-ease-') || key.includes('-path-') || key.includes('-width-') || key.includes('-height-') || key.includes('-visual-size-') || key.includes('-modal-width') || key.includes('-cover');
            return isColorToken && !isDimensional;
        });
        if (colorVariables.length === 0) {
            return colorMixVariables;
        }
        colorVariables.forEach((key)=>{
            const originalValue = allVariables?.[key] || '';
            if (key.endsWith('-base')) {
                return;
            }
            if (key === '--apkt-tokens-theme-backgroundPrimary' || key === '--apkt-tokens-core-backgroundAccentPrimary') {
                colorMixVariables[key] = `color-mix(in srgb, ${colorMix} ${strength}%, var(${key}-base))`;
            } else if (originalValue.includes('color-mix') || originalValue.startsWith('#') || originalValue.startsWith('rgb')) {
                colorMixVariables[key] = `color-mix(in srgb, ${colorMix} ${strength}%, ${originalValue})`;
            } else {
                colorMixVariables[key] = `color-mix(in srgb, ${colorMix} ${strength}%, var(${key}-base, ${originalValue}))`;
            }
        });
        return colorMixVariables;
    }
};
const { cssVariablesVarPrefix: vars } = ThemeHelperUtil.createCSSVariables(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["styles"]);
function css(strings, ...values) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["css"])(strings, ...values.map((value)=>typeof value === 'function' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unsafeCSS"])(value(vars)) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unsafeCSS"])(value)));
}
;
 //# sourceMappingURL=ThemeHelperUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createRootStyles",
    ()=>createRootStyles,
    "elementStyles",
    ()=>elementStyles,
    "initializeTheming",
    ()=>initializeTheming,
    "resetStyles",
    ()=>resetStyles,
    "setColorTheme",
    ()=>setColorTheme,
    "setThemeVariables",
    ()=>setThemeVariables
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$lit$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/lit/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@lit/reactive-element/node/development/reactive-element.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeHelperUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeHelperUtil.js [app-ssr] (ecmascript)");
;
;
let apktTag = undefined;
let themeTag = undefined;
let darkModeTag = undefined;
let lightModeTag = undefined;
let currentThemeVariables = undefined;
const fonts = {
    'KHTeka-500-woff2': 'https://fonts.reown.com/KHTeka-Medium.woff2',
    'KHTeka-400-woff2': 'https://fonts.reown.com/KHTeka-Regular.woff2',
    'KHTeka-300-woff2': 'https://fonts.reown.com/KHTeka-Light.woff2',
    'KHTekaMono-400-woff2': 'https://fonts.reown.com/KHTekaMono-Regular.woff2',
    'KHTeka-500-woff': 'https://fonts.reown.com/KHTeka-Light.woff',
    'KHTeka-400-woff': 'https://fonts.reown.com/KHTeka-Regular.woff',
    'KHTeka-300-woff': 'https://fonts.reown.com/KHTeka-Light.woff',
    'KHTekaMono-400-woff': 'https://fonts.reown.com/KHTekaMono-Regular.woff'
};
function createAppKitTheme(themeVariables, theme = 'dark') {
    if (apktTag) {
        document.head.removeChild(apktTag);
    }
    apktTag = document.createElement('style');
    apktTag.textContent = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeHelperUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeHelperUtil"].createRootStyles(theme, themeVariables);
    document.head.appendChild(apktTag);
}
function initializeTheming(themeVariables, themeMode = 'dark') {
    currentThemeVariables = themeVariables;
    themeTag = document.createElement('style');
    darkModeTag = document.createElement('style');
    lightModeTag = document.createElement('style');
    themeTag.textContent = createRootStyles(themeVariables).core.cssText;
    darkModeTag.textContent = createRootStyles(themeVariables).dark.cssText;
    lightModeTag.textContent = createRootStyles(themeVariables).light.cssText;
    document.head.appendChild(themeTag);
    document.head.appendChild(darkModeTag);
    document.head.appendChild(lightModeTag);
    createAppKitTheme(themeVariables, themeMode);
    setColorTheme(themeMode);
    if (!themeVariables?.['--w3m-font-family']) {
        for (const [key, url] of Object.entries(fonts)){
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = url;
            link.as = 'font';
            link.type = key.includes('woff2') ? 'font/woff2' : 'font/woff';
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        }
    }
    setColorTheme(themeMode);
}
function setColorTheme(themeMode = 'dark') {
    if (darkModeTag && lightModeTag && apktTag) {
        if (themeMode === 'light') {
            createAppKitTheme(currentThemeVariables, themeMode);
            darkModeTag.removeAttribute('media');
            lightModeTag.media = 'enabled';
        } else {
            createAppKitTheme(currentThemeVariables, themeMode);
            lightModeTag.removeAttribute('media');
            darkModeTag.media = 'enabled';
        }
    }
}
function setThemeVariables(_themeVariables) {
    currentThemeVariables = _themeVariables;
    if (themeTag && darkModeTag && lightModeTag) {
        themeTag.textContent = createRootStyles(_themeVariables).core.cssText;
        darkModeTag.textContent = createRootStyles(_themeVariables).dark.cssText;
        lightModeTag.textContent = createRootStyles(_themeVariables).light.cssText;
        if (_themeVariables?.['--w3m-font-family']) {
            const fontFamily = _themeVariables['--w3m-font-family'];
            themeTag.textContent = themeTag.textContent?.replace('font-family: KHTeka', `font-family: ${fontFamily}`);
            darkModeTag.textContent = darkModeTag.textContent?.replace('font-family: KHTeka', `font-family: ${fontFamily}`);
            lightModeTag.textContent = lightModeTag.textContent?.replace('font-family: KHTeka', `font-family: ${fontFamily}`);
        }
    }
    if (apktTag) {
        const currentMode = lightModeTag?.media === 'enabled' ? 'light' : 'dark';
        createAppKitTheme(_themeVariables, currentMode);
    }
}
function createRootStyles(_themeVariables) {
    const hasCustomFontFamily = Boolean(_themeVariables?.['--w3m-font-family']);
    return {
        core: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["css"]`
      ${hasCustomFontFamily ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["css"]`` : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["css"]`
            @font-face {
              font-family: 'KHTeka';
              src:
                url(${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unsafeCSS"])(fonts['KHTeka-400-woff2'])}) format('woff2'),
                url(${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unsafeCSS"])(fonts['KHTeka-400-woff'])}) format('woff');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }

            @font-face {
              font-family: 'KHTeka';
              src:
                url(${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unsafeCSS"])(fonts['KHTeka-300-woff2'])}) format('woff2'),
                url(${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unsafeCSS"])(fonts['KHTeka-300-woff'])}) format('woff');
              font-weight: 300;
              font-style: normal;
            }

            @font-face {
              font-family: 'KHTekaMono';
              src:
                url(${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unsafeCSS"])(fonts['KHTekaMono-400-woff2'])}) format('woff2'),
                url(${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unsafeCSS"])(fonts['KHTekaMono-400-woff'])}) format('woff');
              font-weight: 400;
              font-style: normal;
            }

            @font-face {
              font-family: 'KHTeka';
              src:
                url(${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unsafeCSS"])(fonts['KHTeka-400-woff2'])}) format('woff2'),
                url(${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unsafeCSS"])(fonts['KHTeka-400-woff'])}) format('woff');
              font-weight: 400;
              font-style: normal;
            }
          `}

      @keyframes w3m-shake {
        0% {
          transform: scale(1) rotate(0deg);
        }
        20% {
          transform: scale(1) rotate(-1deg);
        }
        40% {
          transform: scale(1) rotate(1.5deg);
        }
        60% {
          transform: scale(1) rotate(-1.5deg);
        }
        80% {
          transform: scale(1) rotate(1deg);
        }
        100% {
          transform: scale(1) rotate(0deg);
        }
      }
      @keyframes w3m-iframe-fade-out {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      @keyframes w3m-iframe-zoom-in {
        0% {
          transform: translateY(50px);
          opacity: 0;
        }
        100% {
          transform: translateY(0px);
          opacity: 1;
        }
      }
      @keyframes w3m-iframe-zoom-in-mobile {
        0% {
          transform: scale(0.95);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      :root {
        --apkt-modal-width: 370px;

        --apkt-visual-size-inherit: inherit;
        --apkt-visual-size-sm: 40px;
        --apkt-visual-size-md: 55px;
        --apkt-visual-size-lg: 80px;

        --apkt-path-network-sm: path(
          'M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z'
        );

        --apkt-path-network-md: path(
          'M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z'
        );

        --apkt-path-network-lg: path(
          'M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z'
        );

        --apkt-width-network-sm: 36px;
        --apkt-width-network-md: 48px;
        --apkt-width-network-lg: 86px;

        --apkt-duration-dynamic: 0ms;
        --apkt-height-network-sm: 40px;
        --apkt-height-network-md: 54px;
        --apkt-height-network-lg: 96px;
      }
    `,
        dark: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["css"]`
      :root {
      }
    `,
        light: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["css"]`
      :root {
      }
    `
    };
}
const resetStyles = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["css"]`
  div,
  span,
  iframe,
  a,
  img,
  form,
  button,
  label,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-style: normal;
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    backface-visibility: hidden;
  }

  :host {
    font-family: var(--apkt-fontFamily-regular);
  }
`;
const elementStyles = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["css"]`
  button,
  a {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
    outline: none;
    border: none;
    text-decoration: none;
    transition:
      background-color var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      color var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      border var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      box-shadow var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      width var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      height var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      transform var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      opacity var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      scale var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2),
      border-radius var(--apkt-durations-lg) var(--apkt-easings-ease-out-power-2);
    will-change:
      background-color, color, border, box-shadow, width, height, transform, opacity, scale,
      border-radius;
  }

  a:active:not([disabled]),
  button:active:not([disabled]) {
    scale: 0.975;
    transform-origin: center;
  }

  button:disabled {
    cursor: default;
  }

  input {
    border: none;
    outline: none;
    appearance: none;
  }
`; //# sourceMappingURL=ThemeUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/UiHelperUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UiHelperUtil",
    ()=>UiHelperUtil
]);
const DECIMAL_POINT = '.';
const UiHelperUtil = {
    getSpacingStyles (spacing, index) {
        if (Array.isArray(spacing)) {
            return spacing[index] ? `var(--apkt-spacing-${spacing[index]})` : undefined;
        } else if (typeof spacing === 'string') {
            return `var(--apkt-spacing-${spacing})`;
        }
        return undefined;
    },
    getFormattedDate (date) {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric'
        }).format(date);
    },
    formatCurrency (amount = 0, options = {}) {
        const numericAmount = Number(amount);
        if (isNaN(numericAmount)) {
            return '$0.00';
        }
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            ...options
        });
        return formatter.format(numericAmount);
    },
    getHostName (url) {
        try {
            const newUrl = new URL(url);
            return newUrl.hostname;
        } catch (error) {
            return '';
        }
    },
    getTruncateString ({ string, charsStart, charsEnd, truncate }) {
        if (string.length <= charsStart + charsEnd) {
            return string;
        }
        if (truncate === 'end') {
            return `${string.substring(0, charsStart)}...`;
        } else if (truncate === 'start') {
            return `...${string.substring(string.length - charsEnd)}`;
        }
        return `${string.substring(0, Math.floor(charsStart))}...${string.substring(string.length - Math.floor(charsEnd))}`;
    },
    generateAvatarColors (address) {
        const hash = address.toLowerCase().replace(/^0x/iu, '').replace(/[^a-f0-9]/gu, '');
        const baseColor = hash.substring(0, 6).padEnd(6, '0');
        const rgbColor = this.hexToRgb(baseColor);
        const masterBorderRadius = getComputedStyle(document.documentElement).getPropertyValue('--w3m-border-radius-master');
        const radius = Number(masterBorderRadius?.replace('px', ''));
        const edge = 100 - 3 * radius;
        const gradientCircle = `${edge}% ${edge}% at 65% 40%`;
        const colors = [];
        for(let i = 0; i < 5; i += 1){
            const tintedColor = this.tintColor(rgbColor, 0.15 * i);
            colors.push(`rgb(${tintedColor[0]}, ${tintedColor[1]}, ${tintedColor[2]})`);
        }
        return `
    --local-color-1: ${colors[0]};
    --local-color-2: ${colors[1]};
    --local-color-3: ${colors[2]};
    --local-color-4: ${colors[3]};
    --local-color-5: ${colors[4]};
    --local-radial-circle: ${gradientCircle}
   `;
    },
    hexToRgb (hex) {
        const bigint = parseInt(hex, 16);
        const r = bigint >> 16 & 255;
        const g = bigint >> 8 & 255;
        const b = bigint & 255;
        return [
            r,
            g,
            b
        ];
    },
    tintColor (rgb, tint) {
        const [r, g, b] = rgb;
        const tintedR = Math.round(r + (255 - r) * tint);
        const tintedG = Math.round(g + (255 - g) * tint);
        const tintedB = Math.round(b + (255 - b) * tint);
        return [
            tintedR,
            tintedG,
            tintedB
        ];
    },
    isNumber (character) {
        const regex = {
            number: /^[0-9]+$/u
        };
        return regex.number.test(character);
    },
    getColorTheme (theme) {
        if (theme) {
            return theme;
        } else if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return 'dark';
    },
    splitBalance (input) {
        const parts = input.split('.');
        if (parts.length === 2) {
            return [
                parts[0],
                parts[1]
            ];
        }
        return [
            '0',
            '00'
        ];
    },
    roundNumber (number, threshold, fixed) {
        const roundedNumber = number.toString().length >= threshold ? Number(number).toFixed(fixed) : number;
        return roundedNumber;
    },
    cssDurationToNumber (duration) {
        if (duration.endsWith('s')) {
            return Number(duration.replace('s', '')) * 1000;
        } else if (duration.endsWith('ms')) {
            return Number(duration.replace('ms', ''));
        }
        return 0;
    },
    maskInput ({ value, decimals, integers }) {
        value = value.replace(',', '.');
        if (value === DECIMAL_POINT) {
            return `0${DECIMAL_POINT}`;
        }
        const [integerPart = '', decimalsPart] = value.split(DECIMAL_POINT).map((p)=>p.replace(/[^0-9]/gu, ''));
        const limitedInteger = integers ? integerPart.substring(0, integers) : integerPart;
        const cleanIntegerPart = limitedInteger.length === 2 ? String(Number(limitedInteger)) : limitedInteger;
        const cleanDecimalsPart = typeof decimals === 'number' ? decimalsPart?.substring(0, decimals) : decimalsPart;
        const canIncludeDecimals = typeof decimals !== 'number' || decimals > 0;
        const maskValue = typeof cleanDecimalsPart === 'string' && canIncludeDecimals ? [
            cleanIntegerPart,
            cleanDecimalsPart
        ].join(DECIMAL_POINT) : cleanIntegerPart;
        return maskValue ?? '';
    },
    capitalize (value) {
        if (!value) {
            return '';
        }
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
}; //# sourceMappingURL=UiHelperUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/TransactionUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TransactionUtil",
    ()=>TransactionUtil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$DateUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-common/dist/esm/src/utils/DateUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$UiHelperUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/UiHelperUtil.js [app-ssr] (ecmascript)");
;
;
const FLOAT_FIXED_VALUE = 3;
const GAS_FEE_THRESHOLD = 0.1;
const plusTypes = [
    'receive',
    'deposit',
    'borrow',
    'claim'
];
const minusTypes = [
    'withdraw',
    'repay',
    'burn'
];
const TransactionUtil = {
    getTransactionGroupTitle (year, month) {
        const currentYear = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$DateUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DateUtil"].getYear();
        const monthName = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$common$2f$dist$2f$esm$2f$src$2f$utils$2f$DateUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DateUtil"].getMonthNameByIndex(month);
        const isCurrentYear = year === currentYear;
        const groupTitle = isCurrentYear ? monthName : `${monthName} ${year}`;
        return groupTitle;
    },
    getTransactionImages (transfers) {
        const [transfer] = transfers;
        const hasMultipleTransfers = transfers?.length > 1;
        if (hasMultipleTransfers) {
            return transfers.map((item)=>this.getTransactionImage(item));
        }
        return [
            this.getTransactionImage(transfer)
        ];
    },
    getTransactionImage (transfer) {
        return {
            type: TransactionUtil.getTransactionTransferTokenType(transfer),
            url: TransactionUtil.getTransactionImageURL(transfer)
        };
    },
    getTransactionImageURL (transfer) {
        let imageURL = undefined;
        const isNFT = Boolean(transfer?.nft_info);
        const isFungible = Boolean(transfer?.fungible_info);
        if (transfer && isNFT) {
            imageURL = transfer?.nft_info?.content?.preview?.url;
        } else if (transfer && isFungible) {
            imageURL = transfer?.fungible_info?.icon?.url;
        }
        return imageURL;
    },
    getTransactionTransferTokenType (transfer) {
        if (transfer?.fungible_info) {
            return 'FUNGIBLE';
        } else if (transfer?.nft_info) {
            return 'NFT';
        }
        return undefined;
    },
    getTransactionDescriptions (transaction, mergedTransfers) {
        const type = transaction?.metadata?.operationType;
        const transfers = mergedTransfers || transaction?.transfers;
        const hasTransfer = transfers?.length > 0;
        const hasMultipleTransfers = transfers?.length > 1;
        const isFungible = hasTransfer && transfers?.every((transfer)=>Boolean(transfer?.fungible_info));
        const [firstTransfer, secondTransfer] = transfers;
        let firstDescription = this.getTransferDescription(firstTransfer);
        let secondDescription = this.getTransferDescription(secondTransfer);
        if (!hasTransfer) {
            const isSendOrReceive = type === 'send' || type === 'receive';
            if (isSendOrReceive && isFungible) {
                firstDescription = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$UiHelperUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UiHelperUtil"].getTruncateString({
                    string: transaction?.metadata.sentFrom,
                    charsStart: 4,
                    charsEnd: 6,
                    truncate: 'middle'
                });
                secondDescription = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$UiHelperUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UiHelperUtil"].getTruncateString({
                    string: transaction?.metadata.sentTo,
                    charsStart: 4,
                    charsEnd: 6,
                    truncate: 'middle'
                });
                return [
                    firstDescription,
                    secondDescription
                ];
            }
            return [
                transaction.metadata.status
            ];
        }
        if (hasMultipleTransfers) {
            return transfers.map((item)=>this.getTransferDescription(item));
        }
        let prefix = '';
        if (plusTypes.includes(type)) {
            prefix = '+';
        } else if (minusTypes.includes(type)) {
            prefix = '-';
        }
        firstDescription = prefix.concat(firstDescription);
        return [
            firstDescription
        ];
    },
    getTransferDescription (transfer) {
        let description = '';
        if (!transfer) {
            return description;
        }
        if (transfer?.nft_info) {
            description = transfer?.nft_info?.name || '-';
        } else if (transfer?.fungible_info) {
            description = this.getFungibleTransferDescription(transfer) || '-';
        }
        return description;
    },
    getFungibleTransferDescription (transfer) {
        if (!transfer) {
            return null;
        }
        const quantity = this.getQuantityFixedValue(transfer?.quantity.numeric);
        const description = [
            quantity,
            transfer?.fungible_info?.symbol
        ].join(' ').trim();
        return description;
    },
    mergeTransfers (transfers) {
        if (transfers?.length <= 1) {
            return transfers;
        }
        const filteredTransfers = this.filterGasFeeTransfers(transfers);
        const mergedTransfers = filteredTransfers.reduce((acc, t)=>{
            const name = t?.fungible_info?.name;
            const existingTransfer = acc.find(({ fungible_info, direction })=>name && name === fungible_info?.name && direction === t.direction);
            if (existingTransfer) {
                const quantity = Number(existingTransfer.quantity.numeric) + Number(t.quantity.numeric);
                existingTransfer.quantity.numeric = quantity.toString();
                existingTransfer.value = (existingTransfer.value || 0) + (t.value || 0);
            } else {
                acc.push(t);
            }
            return acc;
        }, []);
        let finalTransfers = mergedTransfers;
        if (mergedTransfers.length > 2) {
            finalTransfers = mergedTransfers.sort((a, b)=>(b.value || 0) - (a.value || 0)).slice(0, 2);
        }
        finalTransfers = finalTransfers.sort((a, b)=>{
            if (a.direction === 'out' && b.direction === 'in') {
                return -1;
            }
            if (a.direction === 'in' && b.direction === 'out') {
                return 1;
            }
            return 0;
        });
        return finalTransfers;
    },
    filterGasFeeTransfers (transfers) {
        const tokenGroups = transfers.reduce((groups, transfer)=>{
            const tokenName = transfer?.fungible_info?.name;
            if (tokenName) {
                if (!groups[tokenName]) {
                    groups[tokenName] = [];
                }
                groups[tokenName].push(transfer);
            }
            return groups;
        }, {});
        const filteredTransfers = [];
        Object.values(tokenGroups).forEach((tokenTransfers)=>{
            if (tokenTransfers.length === 1) {
                const firstTransfer = tokenTransfers[0];
                if (firstTransfer) {
                    filteredTransfers.push(firstTransfer);
                }
            } else {
                const inTransfers = tokenTransfers.filter((t)=>t.direction === 'in');
                const outTransfers = tokenTransfers.filter((t)=>t.direction === 'out');
                if (inTransfers.length === 1 && outTransfers.length === 1) {
                    const inTransfer = inTransfers[0];
                    const outTransfer = outTransfers[0];
                    let didApplyGasFeeFilter = false;
                    if (inTransfer && outTransfer) {
                        const inAmount = Number(inTransfer.quantity.numeric);
                        const outAmount = Number(outTransfer.quantity.numeric);
                        if (outAmount < inAmount * GAS_FEE_THRESHOLD) {
                            filteredTransfers.push(inTransfer);
                            didApplyGasFeeFilter = true;
                        } else if (inAmount < outAmount * GAS_FEE_THRESHOLD) {
                            filteredTransfers.push(outTransfer);
                            didApplyGasFeeFilter = true;
                        }
                    }
                    if (!didApplyGasFeeFilter) {
                        filteredTransfers.push(...tokenTransfers);
                    }
                } else {
                    const significantTransfers = this.filterGasFeesFromTokenGroup(tokenTransfers);
                    filteredTransfers.push(...significantTransfers);
                }
            }
        });
        transfers.forEach((transfer)=>{
            if (!transfer?.fungible_info?.name) {
                filteredTransfers.push(transfer);
            }
        });
        return filteredTransfers;
    },
    filterGasFeesFromTokenGroup (tokenTransfers) {
        if (tokenTransfers.length <= 1) {
            return tokenTransfers;
        }
        const amounts = tokenTransfers.map((t)=>Number(t.quantity.numeric));
        const maxAmount = Math.max(...amounts);
        const minAmount = Math.min(...amounts);
        const extremeGasThreshold = 0.01;
        if (minAmount < maxAmount * extremeGasThreshold) {
            const filtered = tokenTransfers.filter((t)=>{
                const amount = Number(t.quantity.numeric);
                return amount >= maxAmount * extremeGasThreshold;
            });
            return filtered;
        }
        const inTransfers = tokenTransfers.filter((t)=>t.direction === 'in');
        const outTransfers = tokenTransfers.filter((t)=>t.direction === 'out');
        if (inTransfers.length === 1 && outTransfers.length === 1) {
            const inTransfer = inTransfers[0];
            const outTransfer = outTransfers[0];
            if (inTransfer && outTransfer) {
                const inAmount = Number(inTransfer.quantity.numeric);
                const outAmount = Number(outTransfer.quantity.numeric);
                if (outAmount < inAmount * GAS_FEE_THRESHOLD) {
                    return [
                        inTransfer
                    ];
                } else if (inAmount < outAmount * GAS_FEE_THRESHOLD) {
                    return [
                        outTransfer
                    ];
                }
            }
        }
        return tokenTransfers;
    },
    getQuantityFixedValue (value) {
        if (!value) {
            return null;
        }
        const parsedValue = parseFloat(value);
        return parsedValue.toFixed(FLOAT_FIXED_VALUE);
    }
}; //# sourceMappingURL=TransactionUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "customElement",
    ()=>customElement
]);
function standardCustomElement(tagName, descriptor) {
    const { kind, elements } = descriptor;
    return {
        kind,
        elements,
        finisher (clazz) {
            if (!customElements.get(tagName)) {
                customElements.define(tagName, clazz);
            }
        }
    };
}
function legacyCustomElement(tagName, clazz) {
    if (!customElements.get(tagName)) {
        customElements.define(tagName, clazz);
    }
    return clazz;
}
function customElement(tagName) {
    return function create(classOrDescriptor) {
        return typeof classOrDescriptor === 'function' ? legacyCustomElement(tagName, classOrDescriptor) : standardCustomElement(tagName, classOrDescriptor);
    };
} //# sourceMappingURL=WebComponentsUtil.js.map
}),
"[project]/Desktop/frontend/node_modules/@reown/appkit-ui/dist/esm/exports/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$MathUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/MathUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$UiHelperUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/UiHelperUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$TransactionUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/TransactionUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$WebComponentsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/WebComponentsUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeConstantsUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeConstantsUtil.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$reown$2f$appkit$2d$ui$2f$dist$2f$esm$2f$src$2f$utils$2f$ThemeHelperUtil$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@reown/appkit-ui/dist/esm/src/utils/ThemeHelperUtil.js [app-ssr] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
;
;
;
;
;
}),
"[project]/Desktop/frontend/node_modules/@lit-labs/ssr-dom-shim/lib/element-internals.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ /**
 * Map of ARIAMixin properties to attributes
 */ __turbopack_context__.s([
    "ElementInternals",
    ()=>ElementInternalsShimWithRealType,
    "ElementInternalsShim",
    ()=>ElementInternalsShim,
    "HYDRATE_INTERNALS_ATTR_PREFIX",
    ()=>HYDRATE_INTERNALS_ATTR_PREFIX,
    "ariaMixinAttributes",
    ()=>ariaMixinAttributes
]);
const ariaMixinAttributes = {
    ariaAtomic: 'aria-atomic',
    ariaAutoComplete: 'aria-autocomplete',
    ariaBrailleLabel: 'aria-braillelabel',
    ariaBrailleRoleDescription: 'aria-brailleroledescription',
    ariaBusy: 'aria-busy',
    ariaChecked: 'aria-checked',
    ariaColCount: 'aria-colcount',
    ariaColIndex: 'aria-colindex',
    ariaColIndexText: 'aria-colindextext',
    ariaColSpan: 'aria-colspan',
    ariaCurrent: 'aria-current',
    ariaDescription: 'aria-description',
    ariaDisabled: 'aria-disabled',
    ariaExpanded: 'aria-expanded',
    ariaHasPopup: 'aria-haspopup',
    ariaHidden: 'aria-hidden',
    ariaInvalid: 'aria-invalid',
    ariaKeyShortcuts: 'aria-keyshortcuts',
    ariaLabel: 'aria-label',
    ariaLevel: 'aria-level',
    ariaLive: 'aria-live',
    ariaModal: 'aria-modal',
    ariaMultiLine: 'aria-multiline',
    ariaMultiSelectable: 'aria-multiselectable',
    ariaOrientation: 'aria-orientation',
    ariaPlaceholder: 'aria-placeholder',
    ariaPosInSet: 'aria-posinset',
    ariaPressed: 'aria-pressed',
    ariaReadOnly: 'aria-readonly',
    ariaRelevant: 'aria-relevant',
    ariaRequired: 'aria-required',
    ariaRoleDescription: 'aria-roledescription',
    ariaRowCount: 'aria-rowcount',
    ariaRowIndex: 'aria-rowindex',
    ariaRowIndexText: 'aria-rowindextext',
    ariaRowSpan: 'aria-rowspan',
    ariaSelected: 'aria-selected',
    ariaSetSize: 'aria-setsize',
    ariaSort: 'aria-sort',
    ariaValueMax: 'aria-valuemax',
    ariaValueMin: 'aria-valuemin',
    ariaValueNow: 'aria-valuenow',
    ariaValueText: 'aria-valuetext',
    role: 'role'
};
const ElementInternalsShim = class ElementInternals {
    get shadowRoot() {
        // Grab the shadow root instance from the Element shim
        // to ensure that the shadow root is always available
        // to the internals instance even if the mode is 'closed'
        return this.__host.__shadowRoot;
    }
    constructor(_host){
        this.ariaActiveDescendantElement = null;
        this.ariaAtomic = '';
        this.ariaAutoComplete = '';
        this.ariaBrailleLabel = '';
        this.ariaBrailleRoleDescription = '';
        this.ariaBusy = '';
        this.ariaChecked = '';
        this.ariaColCount = '';
        this.ariaColIndex = '';
        this.ariaColIndexText = '';
        this.ariaColSpan = '';
        this.ariaControlsElements = null;
        this.ariaCurrent = '';
        this.ariaDescribedByElements = null;
        this.ariaDescription = '';
        this.ariaDetailsElements = null;
        this.ariaDisabled = '';
        this.ariaErrorMessageElements = null;
        this.ariaExpanded = '';
        this.ariaFlowToElements = null;
        this.ariaHasPopup = '';
        this.ariaHidden = '';
        this.ariaInvalid = '';
        this.ariaKeyShortcuts = '';
        this.ariaLabel = '';
        this.ariaLabelledByElements = null;
        this.ariaLevel = '';
        this.ariaLive = '';
        this.ariaModal = '';
        this.ariaMultiLine = '';
        this.ariaMultiSelectable = '';
        this.ariaOrientation = '';
        this.ariaOwnsElements = null;
        this.ariaPlaceholder = '';
        this.ariaPosInSet = '';
        this.ariaPressed = '';
        this.ariaReadOnly = '';
        this.ariaRelevant = '';
        this.ariaRequired = '';
        this.ariaRoleDescription = '';
        this.ariaRowCount = '';
        this.ariaRowIndex = '';
        this.ariaRowIndexText = '';
        this.ariaRowSpan = '';
        this.ariaSelected = '';
        this.ariaSetSize = '';
        this.ariaSort = '';
        this.ariaValueMax = '';
        this.ariaValueMin = '';
        this.ariaValueNow = '';
        this.ariaValueText = '';
        this.role = '';
        this.form = null;
        this.labels = [];
        this.states = new Set();
        this.validationMessage = '';
        this.validity = {};
        this.willValidate = true;
        this.__host = _host;
    }
    checkValidity() {
        // TODO(augustjk) Consider actually implementing logic.
        // See https://github.com/lit/lit/issues/3740
        console.warn('`ElementInternals.checkValidity()` was called on the server.' + 'This method always returns true.');
        return true;
    }
    reportValidity() {
        return true;
    }
    setFormValue() {}
    setValidity() {}
};
const ElementInternalsShimWithRealType = ElementInternalsShim;
;
const HYDRATE_INTERNALS_ATTR_PREFIX = 'hydrate-internals-'; //# sourceMappingURL=element-internals.js.map
}),
"[project]/Desktop/frontend/node_modules/@lit-labs/ssr-dom-shim/lib/events.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CustomEvent",
    ()=>CustomEventShimWithRealType,
    "CustomEventShim",
    ()=>CustomEventShimWithRealType,
    "Event",
    ()=>EventShimWithRealType,
    "EventShim",
    ()=>EventShimWithRealType,
    "EventTarget",
    ()=>EventTargetShimWithRealType,
    "EventTargetShim",
    ()=>EventTargetShimWithRealType
]);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var __classPrivateFieldSet = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Event_cancelable, _Event_bubbles, _Event_composed, _Event_defaultPrevented, _Event_timestamp, _Event_propagationStopped, _Event_type, _Event_target, _Event_isBeingDispatched, _a, _CustomEvent_detail, _b;
const isCaptureEventListener = (options)=>typeof options === 'boolean' ? options : options?.capture ?? false;
// Event phases
const NONE = 0;
const CAPTURING_PHASE = 1;
const AT_TARGET = 2;
const BUBBLING_PHASE = 3;
// Shim the global EventTarget object
class EventTarget {
    constructor(){
        this.__eventListeners = new Map();
        this.__captureEventListeners = new Map();
    }
    addEventListener(type, callback, options) {
        if (callback === undefined || callback === null) {
            return;
        }
        const eventListenersMap = isCaptureEventListener(options) ? this.__captureEventListeners : this.__eventListeners;
        let eventListeners = eventListenersMap.get(type);
        if (eventListeners === undefined) {
            eventListeners = new Map();
            eventListenersMap.set(type, eventListeners);
        } else if (eventListeners.has(callback)) {
            return;
        }
        const normalizedOptions = typeof options === 'object' && options ? options : {};
        normalizedOptions.signal?.addEventListener('abort', ()=>this.removeEventListener(type, callback, options));
        eventListeners.set(callback, normalizedOptions ?? {});
    }
    removeEventListener(type, callback, options) {
        if (callback === undefined || callback === null) {
            return;
        }
        const eventListenersMap = isCaptureEventListener(options) ? this.__captureEventListeners : this.__eventListeners;
        const eventListeners = eventListenersMap.get(type);
        if (eventListeners !== undefined) {
            eventListeners.delete(callback);
            if (!eventListeners.size) {
                eventListenersMap.delete(type);
            }
        }
    }
    dispatchEvent(event) {
        const composedPath = [
            this
        ];
        let parent = this.__eventTargetParent;
        if (event.composed) {
            while(parent){
                composedPath.push(parent);
                parent = parent.__eventTargetParent;
            }
        } else {
            // If the event is not composed and the event was dispatched inside
            // shadow DOM, we need to stop before the host of the shadow DOM.
            while(parent && parent !== this.__host){
                composedPath.push(parent);
                parent = parent.__eventTargetParent;
            }
        }
        // We need to patch various properties that would either be empty or wrong
        // in this scenario.
        let stopPropagation = false;
        let stopImmediatePropagation = false;
        let eventPhase = NONE;
        let target = null;
        let tmpTarget = null;
        let currentTarget = null;
        const originalStopPropagation = event.stopPropagation;
        const originalStopImmediatePropagation = event.stopImmediatePropagation;
        Object.defineProperties(event, {
            target: {
                get () {
                    return target ?? tmpTarget;
                },
                ...enumerableProperty
            },
            srcElement: {
                get () {
                    return event.target;
                },
                ...enumerableProperty
            },
            currentTarget: {
                get () {
                    return currentTarget;
                },
                ...enumerableProperty
            },
            eventPhase: {
                get () {
                    return eventPhase;
                },
                ...enumerableProperty
            },
            composedPath: {
                value: ()=>composedPath,
                ...enumerableProperty
            },
            stopPropagation: {
                value: ()=>{
                    stopPropagation = true;
                    originalStopPropagation.call(event);
                },
                ...enumerableProperty
            },
            stopImmediatePropagation: {
                value: ()=>{
                    stopImmediatePropagation = true;
                    originalStopImmediatePropagation.call(event);
                },
                ...enumerableProperty
            }
        });
        // An event handler can either be a function, an object with a handleEvent
        // method or null. This function takes care to call the event handler
        // correctly.
        const invokeEventListener = (listener, options, eventListenerMap)=>{
            if (typeof listener === 'function') {
                listener(event);
            } else if (typeof listener?.handleEvent === 'function') {
                listener.handleEvent(event);
            }
            if (options.once) {
                eventListenerMap.delete(listener);
            }
        };
        // When an event is finished being dispatched, which can be after the event
        // tree has been traversed or stopPropagation/stopImmediatePropagation has
        // been called. Once that is the case, the currentTarget and eventPhase
        // need to be reset and a value, representing whether the event has not
        // been prevented, needs to be returned.
        const finishDispatch = ()=>{
            currentTarget = null;
            eventPhase = NONE;
            return !event.defaultPrevented;
        };
        // An event starts with the capture order, where it starts from the top.
        // This is done even if bubbles is set to false, which is the default.
        const captureEventPath = composedPath.slice().reverse();
        // If the event target, which dispatches the event, is either in the light DOM
        // or the event is not composed, the target is always itself. If that is not
        // the case, the target needs to be retargeted: https://dom.spec.whatwg.org/#retarget
        target = !this.__host || !event.composed ? this : null;
        const retarget = (eventTargets)=>{
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            tmpTarget = this;
            while(tmpTarget.__host && eventTargets.includes(tmpTarget.__host)){
                tmpTarget = tmpTarget.__host;
            }
        };
        for (const eventTarget of captureEventPath){
            if (!target && (!tmpTarget || tmpTarget === eventTarget.__host)) {
                retarget(captureEventPath.slice(captureEventPath.indexOf(eventTarget)));
            }
            currentTarget = eventTarget;
            eventPhase = eventTarget === event.target ? AT_TARGET : CAPTURING_PHASE;
            const captureEventListeners = eventTarget.__captureEventListeners.get(event.type);
            if (captureEventListeners) {
                for (const [listener, options] of captureEventListeners){
                    invokeEventListener(listener, options, captureEventListeners);
                    if (stopImmediatePropagation) {
                        // Event.stopImmediatePropagation() stops any following invocation
                        // of an event handler even on the same event target.
                        return finishDispatch();
                    }
                }
            }
            if (stopPropagation) {
                // Event.stopPropagation() stops any following invocation
                // of an event handler for any following event targets.
                return finishDispatch();
            }
        }
        const bubbleEventPath = event.bubbles ? composedPath : [
            this
        ];
        tmpTarget = null;
        for (const eventTarget of bubbleEventPath){
            if (!target && (!tmpTarget || eventTarget === tmpTarget.__host)) {
                retarget(bubbleEventPath.slice(0, bubbleEventPath.indexOf(eventTarget) + 1));
            }
            currentTarget = eventTarget;
            eventPhase = eventTarget === event.target ? AT_TARGET : BUBBLING_PHASE;
            const captureEventListeners = eventTarget.__eventListeners.get(event.type);
            if (captureEventListeners) {
                for (const [listener, options] of captureEventListeners){
                    invokeEventListener(listener, options, captureEventListeners);
                    if (stopImmediatePropagation) {
                        // Event.stopImmediatePropagation() stops any following invocation
                        // of an event handler even on the same event target.
                        return finishDispatch();
                    }
                }
            }
            if (stopPropagation) {
                // Event.stopPropagation() stops any following invocation
                // of an event handler for any following event targets.
                return finishDispatch();
            }
        }
        return finishDispatch();
    }
}
const EventTargetShimWithRealType = EventTarget;
;
const enumerableProperty = {
    __proto__: null
};
enumerableProperty.enumerable = true;
Object.freeze(enumerableProperty);
// TODO: Remove this when we remove support for vm modules (--experimental-vm-modules).
const EventShim = (_a = class Event {
    constructor(type, options = {}){
        _Event_cancelable.set(this, false);
        _Event_bubbles.set(this, false);
        _Event_composed.set(this, false);
        _Event_defaultPrevented.set(this, false);
        _Event_timestamp.set(this, Date.now());
        _Event_propagationStopped.set(this, false);
        _Event_type.set(this, void 0);
        _Event_target.set(this, void 0);
        _Event_isBeingDispatched.set(this, void 0);
        this.NONE = NONE;
        this.CAPTURING_PHASE = CAPTURING_PHASE;
        this.AT_TARGET = AT_TARGET;
        this.BUBBLING_PHASE = BUBBLING_PHASE;
        if (arguments.length === 0) throw new Error(`The type argument must be specified`);
        if (typeof options !== 'object' || !options) {
            throw new Error(`The "options" argument must be an object`);
        }
        const { bubbles, cancelable, composed } = options;
        __classPrivateFieldSet(this, _Event_cancelable, !!cancelable, "f");
        __classPrivateFieldSet(this, _Event_bubbles, !!bubbles, "f");
        __classPrivateFieldSet(this, _Event_composed, !!composed, "f");
        __classPrivateFieldSet(this, _Event_type, `${type}`, "f");
        __classPrivateFieldSet(this, _Event_target, null, "f");
        __classPrivateFieldSet(this, _Event_isBeingDispatched, false, "f");
    }
    initEvent(_type, _bubbles, _cancelable) {
        throw new Error('Method not implemented.');
    }
    stopImmediatePropagation() {
        this.stopPropagation();
    }
    preventDefault() {
        __classPrivateFieldSet(this, _Event_defaultPrevented, true, "f");
    }
    get target() {
        return __classPrivateFieldGet(this, _Event_target, "f");
    }
    get currentTarget() {
        return __classPrivateFieldGet(this, _Event_target, "f");
    }
    get srcElement() {
        return __classPrivateFieldGet(this, _Event_target, "f");
    }
    get type() {
        return __classPrivateFieldGet(this, _Event_type, "f");
    }
    get cancelable() {
        return __classPrivateFieldGet(this, _Event_cancelable, "f");
    }
    get defaultPrevented() {
        return __classPrivateFieldGet(this, _Event_cancelable, "f") && __classPrivateFieldGet(this, _Event_defaultPrevented, "f");
    }
    get timeStamp() {
        return __classPrivateFieldGet(this, _Event_timestamp, "f");
    }
    composedPath() {
        return __classPrivateFieldGet(this, _Event_isBeingDispatched, "f") ? [
            __classPrivateFieldGet(this, _Event_target, "f")
        ] : [];
    }
    get returnValue() {
        return !__classPrivateFieldGet(this, _Event_cancelable, "f") || !__classPrivateFieldGet(this, _Event_defaultPrevented, "f");
    }
    get bubbles() {
        return __classPrivateFieldGet(this, _Event_bubbles, "f");
    }
    get composed() {
        return __classPrivateFieldGet(this, _Event_composed, "f");
    }
    get eventPhase() {
        return __classPrivateFieldGet(this, _Event_isBeingDispatched, "f") ? _a.AT_TARGET : _a.NONE;
    }
    get cancelBubble() {
        return __classPrivateFieldGet(this, _Event_propagationStopped, "f");
    }
    set cancelBubble(value) {
        if (value) {
            __classPrivateFieldSet(this, _Event_propagationStopped, true, "f");
        }
    }
    stopPropagation() {
        __classPrivateFieldSet(this, _Event_propagationStopped, true, "f");
    }
    get isTrusted() {
        return false;
    }
}, _Event_cancelable = new WeakMap(), _Event_bubbles = new WeakMap(), _Event_composed = new WeakMap(), _Event_defaultPrevented = new WeakMap(), _Event_timestamp = new WeakMap(), _Event_propagationStopped = new WeakMap(), _Event_type = new WeakMap(), _Event_target = new WeakMap(), _Event_isBeingDispatched = new WeakMap(), _a.NONE = NONE, _a.CAPTURING_PHASE = CAPTURING_PHASE, _a.AT_TARGET = AT_TARGET, _a.BUBBLING_PHASE = BUBBLING_PHASE, _a);
Object.defineProperties(EventShim.prototype, {
    initEvent: enumerableProperty,
    stopImmediatePropagation: enumerableProperty,
    preventDefault: enumerableProperty,
    target: enumerableProperty,
    currentTarget: enumerableProperty,
    srcElement: enumerableProperty,
    type: enumerableProperty,
    cancelable: enumerableProperty,
    defaultPrevented: enumerableProperty,
    timeStamp: enumerableProperty,
    composedPath: enumerableProperty,
    returnValue: enumerableProperty,
    bubbles: enumerableProperty,
    composed: enumerableProperty,
    eventPhase: enumerableProperty,
    cancelBubble: enumerableProperty,
    stopPropagation: enumerableProperty,
    isTrusted: enumerableProperty
});
// TODO: Remove this when we remove support for vm modules (--experimental-vm-modules).
const CustomEventShim = (_b = class CustomEvent extends EventShim {
    constructor(type, options = {}){
        super(type, options);
        _CustomEvent_detail.set(this, void 0);
        __classPrivateFieldSet(this, _CustomEvent_detail, options?.detail ?? null, "f");
    }
    initCustomEvent(_type, _bubbles, _cancelable, _detail) {
        throw new Error('Method not implemented.');
    }
    get detail() {
        return __classPrivateFieldGet(this, _CustomEvent_detail, "f");
    }
}, _CustomEvent_detail = new WeakMap(), _b);
Object.defineProperties(CustomEventShim.prototype, {
    detail: enumerableProperty
});
const EventShimWithRealType = EventShim;
const CustomEventShimWithRealType = CustomEventShim;
;
 //# sourceMappingURL=events.js.map
}),
"[project]/Desktop/frontend/node_modules/@lit-labs/ssr-dom-shim/lib/css.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CSSRule",
    ()=>CSSRuleShimWithRealType,
    "CSSRuleList",
    ()=>CSSRuleListShimWithRealType,
    "CSSStyleSheet",
    ()=>CSSStyleSheetShimWithRealType,
    "CSSStyleSheetShim",
    ()=>CSSStyleSheetShimWithRealType,
    "MediaList",
    ()=>MediaListShimWithRealType,
    "StyleSheet",
    ()=>StyleSheetShimWithRealType
]);
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var _a;
const MediaListShim = class MediaList extends Array {
    get mediaText() {
        return this.join(', ');
    }
    toString() {
        return this.mediaText;
    }
    appendMedium(medium) {
        if (!this.includes(medium)) {
            this.push(medium);
        }
    }
    deleteMedium(medium) {
        const index = this.indexOf(medium);
        if (index !== -1) {
            this.splice(index, 1);
        }
    }
    item(index) {
        return this[index] ?? null;
    }
};
const MediaListShimWithRealType = MediaListShim;
;
const StyleSheetShim = class StyleSheet {
    constructor(){
        this.__media = new MediaListShim();
        this.disabled = false;
    }
    get href() {
        return null;
    }
    get media() {
        return this.__media;
    }
    get ownerNode() {
        return null;
    }
    get parentStyleSheet() {
        return null;
    }
    get title() {
        return null;
    }
    get type() {
        return 'text/css';
    }
};
const StyleSheetShimWithRealType = StyleSheetShim;
;
const CSSRuleShim = (_a = class CSSRule {
    constructor(){
        this.STYLE_RULE = 1;
        this.CHARSET_RULE = 2;
        this.IMPORT_RULE = 3;
        this.MEDIA_RULE = 4;
        this.FONT_FACE_RULE = 5;
        this.PAGE_RULE = 6;
        this.NAMESPACE_RULE = 10;
        this.KEYFRAMES_RULE = 7;
        this.KEYFRAME_RULE = 8;
        this.SUPPORTS_RULE = 12;
        this.COUNTER_STYLE_RULE = 11;
        this.FONT_FEATURE_VALUES_RULE = 14;
        this.__parentStyleSheet = null;
        this.cssText = '';
    }
    get parentRule() {
        return null;
    }
    get parentStyleSheet() {
        return this.__parentStyleSheet;
    }
    get type() {
        return 0;
    }
}, _a.STYLE_RULE = 1, _a.CHARSET_RULE = 2, _a.IMPORT_RULE = 3, _a.MEDIA_RULE = 4, _a.FONT_FACE_RULE = 5, _a.PAGE_RULE = 6, _a.NAMESPACE_RULE = 10, _a.KEYFRAMES_RULE = 7, _a.KEYFRAME_RULE = 8, _a.SUPPORTS_RULE = 12, _a.COUNTER_STYLE_RULE = 11, _a.FONT_FEATURE_VALUES_RULE = 14, _a);
const CSSRuleShimWithRealType = CSSRuleShim;
;
const CSSRuleListShim = class CSSRuleList extends Array {
    item(index) {
        return this[index] ?? null;
    }
};
const CSSRuleListShimWithRealType = CSSRuleListShim;
;
const CSSStyleSheetShim = class CSSStyleSheet extends StyleSheetShim {
    constructor(){
        super(...arguments);
        this.__rules = new CSSRuleListShim();
    }
    get cssRules() {
        return this.__rules;
    }
    get ownerRule() {
        return null;
    }
    get rules() {
        return this.cssRules;
    }
    addRule(_selector, _style, _index) {
        throw new Error('Method not implemented.');
    }
    deleteRule(_index) {
        throw new Error('Method not implemented.');
    }
    insertRule(_rule, _index) {
        throw new Error('Method not implemented.');
    }
    removeRule(_index) {
        throw new Error('Method not implemented.');
    }
    replace(text) {
        this.replaceSync(text);
        return Promise.resolve(this);
    }
    replaceSync(text) {
        this.__rules.length = 0;
        const rule = new CSSRuleShim();
        rule.cssText = text;
        this.__rules.push(rule);
    }
};
const CSSStyleSheetShimWithRealType = CSSStyleSheetShim;
;
 //# sourceMappingURL=css.js.map
}),
"[project]/Desktop/frontend/node_modules/@lit-labs/ssr-dom-shim/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CustomElementRegistry",
    ()=>CustomElementRegistryShimWithRealType,
    "Element",
    ()=>ElementShimWithRealType,
    "HTMLElement",
    ()=>HTMLElementShimWithRealType,
    "customElements",
    ()=>customElements
]);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2d$labs$2f$ssr$2d$dom$2d$shim$2f$lib$2f$element$2d$internals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@lit-labs/ssr-dom-shim/lib/element-internals.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2d$labs$2f$ssr$2d$dom$2d$shim$2f$lib$2f$events$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@lit-labs/ssr-dom-shim/lib/events.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2d$labs$2f$ssr$2d$dom$2d$shim$2f$lib$2f$css$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@lit-labs/ssr-dom-shim/lib/css.js [app-ssr] (ecmascript)");
;
;
;
;
;
// In an empty Node.js vm, we need to patch the global context.
// TODO: Remove these globalThis assignments when we remove support
// for vm modules (--experimental-vm-modules).
globalThis.Event ??= __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2d$labs$2f$ssr$2d$dom$2d$shim$2f$lib$2f$events$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EventShim"];
globalThis.CustomEvent ??= __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2d$labs$2f$ssr$2d$dom$2d$shim$2f$lib$2f$events$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CustomEventShim"];
const attributes = new WeakMap();
const attributesForElement = (element)=>{
    let attrs = attributes.get(element);
    if (attrs === undefined) {
        attributes.set(element, attrs = new Map());
    }
    return attrs;
};
// The typings around the exports below are a little funky:
//
// 1. We want the `name` of the shim classes to match the real ones at runtime,
//    hence e.g. `class Element`.
// 2. We can't shadow the global types with a simple class declaration, because
//    then we can't reference the global types for casting, hence e.g.
//    `const ElementShim = class Element`.
// 3. We want to export the classes typed as the real ones, hence e.g.
//    `const ElementShimWithRealType = ElementShim as object as typeof Element;`.
// 4. We want the exported names to match the real ones, hence e.g.
//    `export {ElementShimWithRealType as Element}`.
const ElementShim = class Element extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2d$labs$2f$ssr$2d$dom$2d$shim$2f$lib$2f$events$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EventTargetShim"] {
    constructor(){
        super(...arguments);
        this.__shadowRootMode = null;
        this.__shadowRoot = null;
        this.__internals = null;
    }
    get attributes() {
        return Array.from(attributesForElement(this)).map(([name, value])=>({
                name,
                value
            }));
    }
    get shadowRoot() {
        if (this.__shadowRootMode === 'closed') {
            return null;
        }
        return this.__shadowRoot;
    }
    get localName() {
        return this.constructor.__localName;
    }
    get tagName() {
        return this.localName?.toUpperCase();
    }
    setAttribute(name, value) {
        // Emulate browser behavior that silently casts all values to string. E.g.
        // `42` becomes `"42"` and `{}` becomes `"[object Object]""`.
        attributesForElement(this).set(name, String(value));
    }
    removeAttribute(name) {
        attributesForElement(this).delete(name);
    }
    toggleAttribute(name, force) {
        // Steps reference https://dom.spec.whatwg.org/#dom-element-toggleattribute
        if (this.hasAttribute(name)) {
            // Step 5
            if (force === undefined || !force) {
                this.removeAttribute(name);
                return false;
            }
        } else {
            // Step 4
            if (force === undefined || force) {
                // Step 4.1
                this.setAttribute(name, '');
                return true;
            } else {
                // Step 4.2
                return false;
            }
        }
        // Step 6
        return true;
    }
    hasAttribute(name) {
        return attributesForElement(this).has(name);
    }
    attachShadow(init) {
        const shadowRoot = {
            host: this
        };
        this.__shadowRootMode = init.mode;
        if (init && init.mode === 'open') {
            this.__shadowRoot = shadowRoot;
        }
        return shadowRoot;
    }
    attachInternals() {
        if (this.__internals !== null) {
            throw new Error(`Failed to execute 'attachInternals' on 'HTMLElement': ` + `ElementInternals for the specified element was already attached.`);
        }
        const internals = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2d$labs$2f$ssr$2d$dom$2d$shim$2f$lib$2f$element$2d$internals$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ElementInternalsShim"](this);
        this.__internals = internals;
        return internals;
    }
    getAttribute(name) {
        const value = attributesForElement(this).get(name);
        return value ?? null;
    }
};
const ElementShimWithRealType = ElementShim;
;
const HTMLElementShim = class HTMLElement extends ElementShim {
};
const HTMLElementShimWithRealType = HTMLElementShim;
;
// For convenience, we provide a global instance of a HTMLElement as an event
// target. This facilitates registering global event handlers
// (e.g. for @lit/context ContextProvider).
// We use this in in the SSR render function.
// Note, this is a bespoke element and not simply `document` or `window` since
// user code relies on these being undefined in the server environment.
globalThis.litServerRoot ??= Object.defineProperty(new HTMLElementShimWithRealType(), 'localName', {
    // Patch localName (and tagName) to return a unique name.
    get () {
        return 'lit-server-root';
    }
});
function promiseWithResolvers() {
    let resolve;
    let reject;
    const promise = new Promise((res, rej)=>{
        resolve = res;
        reject = rej;
    });
    return {
        promise,
        resolve: resolve,
        reject: reject
    };
}
class CustomElementRegistry {
    constructor(){
        this.__definitions = new Map();
        this.__reverseDefinitions = new Map();
        this.__pendingWhenDefineds = new Map();
    }
    define(name, ctor) {
        if (this.__definitions.has(name)) {
            if ("TURBOPACK compile-time truthy", 1) {
                console.warn(`'CustomElementRegistry' already has "${name}" defined. ` + `This may have been caused by live reload or hot module ` + `replacement in which case it can be safely ignored.\n` + `Make sure to test your application with a production build as ` + `repeat registrations will throw in production.`);
            } else //TURBOPACK unreachable
            ;
        }
        if (this.__reverseDefinitions.has(ctor)) {
            throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': ` + `the constructor has already been used with this registry for the ` + `tag name ${this.__reverseDefinitions.get(ctor)}`);
        }
        // Provide tagName and localName for the component.
        ctor.__localName = name;
        this.__definitions.set(name, {
            ctor,
            // Note it's important we read `observedAttributes` in case it is a getter
            // with side-effects, as is the case in Lit, where it triggers class
            // finalization.
            //
            // TODO(aomarks) To be spec compliant, we should also capture the
            // registration-time lifecycle methods like `connectedCallback`. For them
            // to be actually accessible to e.g. the Lit SSR element renderer, though,
            // we'd need to introduce a new API for accessing them (since `get` only
            // returns the constructor).
            observedAttributes: ctor.observedAttributes ?? []
        });
        this.__reverseDefinitions.set(ctor, name);
        this.__pendingWhenDefineds.get(name)?.resolve(ctor);
        this.__pendingWhenDefineds.delete(name);
    }
    get(name) {
        const definition = this.__definitions.get(name);
        return definition?.ctor;
    }
    getName(ctor) {
        return this.__reverseDefinitions.get(ctor) ?? null;
    }
    upgrade(_element) {
        // In SSR this doesn't make a lot of sense, so we do nothing.
        throw new Error(`customElements.upgrade is not currently supported in SSR. ` + `Please file a bug if you need it.`);
    }
    async whenDefined(name) {
        const definition = this.__definitions.get(name);
        if (definition) {
            return definition.ctor;
        }
        let withResolvers = this.__pendingWhenDefineds.get(name);
        if (!withResolvers) {
            withResolvers = promiseWithResolvers();
            this.__pendingWhenDefineds.set(name, withResolvers);
        }
        return withResolvers.promise;
    }
}
const CustomElementRegistryShimWithRealType = CustomElementRegistry;
;
const customElements = new CustomElementRegistryShimWithRealType(); //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/frontend/node_modules/@lit/reactive-element/node/development/css-tag.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CSSResult",
    ()=>CSSResult,
    "adoptStyles",
    ()=>adoptStyles,
    "css",
    ()=>css,
    "getCompatibleStyle",
    ()=>getCompatibleStyle,
    "supportsAdoptingStyleSheets",
    ()=>supportsAdoptingStyleSheets,
    "unsafeCSS",
    ()=>unsafeCSS
]);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ // Allows minifiers to rename references to globalThis
const global = globalThis;
/**
 * Whether the current browser supports `adoptedStyleSheets`.
 */ const supportsAdoptingStyleSheets = global.ShadowRoot && (global.ShadyCSS === undefined || global.ShadyCSS.nativeShadow) && 'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype;
const constructionToken = Symbol();
const cssTagCache = new WeakMap();
/**
 * A container for a string of CSS text, that may be used to create a CSSStyleSheet.
 *
 * CSSResult is the return value of `css`-tagged template literals and
 * `unsafeCSS()`. In order to ensure that CSSResults are only created via the
 * `css` tag and `unsafeCSS()`, CSSResult cannot be constructed directly.
 */ class CSSResult {
    constructor(cssText, strings, safeToken){
        // This property needs to remain unminified.
        this['_$cssResult$'] = true;
        if (safeToken !== constructionToken) {
            throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
        }
        this.cssText = cssText;
        this._strings = strings;
    }
    // This is a getter so that it's lazy. In practice, this means stylesheets
    // are not created until the first element instance is made.
    get styleSheet() {
        // If `supportsAdoptingStyleSheets` is true then we assume CSSStyleSheet is
        // constructable.
        let styleSheet = this._styleSheet;
        const strings = this._strings;
        if (supportsAdoptingStyleSheets && styleSheet === undefined) {
            const cacheable = strings !== undefined && strings.length === 1;
            if (cacheable) {
                styleSheet = cssTagCache.get(strings);
            }
            if (styleSheet === undefined) {
                (this._styleSheet = styleSheet = new CSSStyleSheet()).replaceSync(this.cssText);
                if (cacheable) {
                    cssTagCache.set(strings, styleSheet);
                }
            }
        }
        return styleSheet;
    }
    toString() {
        return this.cssText;
    }
}
const textFromCSSResult = (value)=>{
    // This property needs to remain unminified.
    if (value['_$cssResult$'] === true) {
        return value.cssText;
    } else if (typeof value === 'number') {
        return value;
    } else {
        throw new Error(`Value passed to 'css' function must be a 'css' function result: ` + `${value}. Use 'unsafeCSS' to pass non-literal values, but take care ` + `to ensure page security.`);
    }
};
/**
 * Wrap a value for interpolation in a {@linkcode css} tagged template literal.
 *
 * This is unsafe because untrusted CSS text can be used to phone home
 * or exfiltrate data to an attacker controlled site. Take care to only use
 * this with trusted input.
 */ const unsafeCSS = (value)=>new CSSResult(typeof value === 'string' ? value : String(value), undefined, constructionToken);
/**
 * A template literal tag which can be used with LitElement's
 * {@linkcode LitElement.styles} property to set element styles.
 *
 * For security reasons, only literal string values and number may be used in
 * embedded expressions. To incorporate non-literal values {@linkcode unsafeCSS}
 * may be used inside an expression.
 */ const css = (strings, ...values)=>{
    const cssText = strings.length === 1 ? strings[0] : values.reduce((acc, v, idx)=>acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
    return new CSSResult(cssText, strings, constructionToken);
};
/**
 * Applies the given styles to a `shadowRoot`. When Shadow DOM is
 * available but `adoptedStyleSheets` is not, styles are appended to the
 * `shadowRoot` to [mimic the native feature](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/adoptedStyleSheets).
 * Note, when shimming is used, any styles that are subsequently placed into
 * the shadowRoot should be placed *before* any shimmed adopted styles. This
 * will match spec behavior that gives adopted sheets precedence over styles in
 * shadowRoot.
 */ const adoptStyles = (renderRoot, styles)=>{
    if (supportsAdoptingStyleSheets) {
        renderRoot.adoptedStyleSheets = styles.map((s)=>s instanceof CSSStyleSheet ? s : s.styleSheet);
    } else {
        for (const s of styles){
            const style = document.createElement('style');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const nonce = global['litNonce'];
            if (nonce !== undefined) {
                style.setAttribute('nonce', nonce);
            }
            style.textContent = s.cssText;
            renderRoot.appendChild(style);
        }
    }
};
const cssResultFromStyleSheet = (sheet)=>{
    let cssText = '';
    for (const rule of sheet.cssRules){
        cssText += rule.cssText;
    }
    return unsafeCSS(cssText);
};
const getCompatibleStyle = supportsAdoptingStyleSheets || global.CSSStyleSheet === undefined ? (s)=>s : (s)=>s instanceof CSSStyleSheet ? cssResultFromStyleSheet(s) : s;
;
 //# sourceMappingURL=css-tag.js.map
}),
"[project]/Desktop/frontend/node_modules/@lit/reactive-element/node/development/reactive-element.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReactiveElement",
    ()=>ReactiveElement,
    "defaultConverter",
    ()=>defaultConverter,
    "notEqual",
    ()=>notEqual
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2d$labs$2f$ssr$2d$dom$2d$shim$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@lit-labs/ssr-dom-shim/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@lit/reactive-element/node/development/css-tag.js [app-ssr] (ecmascript)");
;
;
;
// TODO (justinfagnani): Add `hasOwn` here when we ship ES2022
const { is, defineProperty, getOwnPropertyDescriptor, getOwnPropertyNames, getOwnPropertySymbols, getPrototypeOf } = Object;
// Lets a minifier replace globalThis references with a minified name
const global = globalThis;
{
    global.customElements ??= __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2d$labs$2f$ssr$2d$dom$2d$shim$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["customElements"];
}let issueWarning;
const trustedTypes = global.trustedTypes;
// Temporary workaround for https://crbug.com/993268
// Currently, any attribute starting with "on" is considered to be a
// TrustedScript source. Such boolean attributes must be set to the equivalent
// trusted emptyScript value.
const emptyStringForBooleanAttribute = trustedTypes ? trustedTypes.emptyScript : '';
const polyfillSupport = global.reactiveElementPolyfillSupportDevMode;
{
    // Ensure warnings are issued only 1x, even if multiple versions of Lit
    // are loaded.
    global.litIssuedWarnings ??= new Set();
    /**
     * Issue a warning if we haven't already, based either on `code` or `warning`.
     * Warnings are disabled automatically only by `warning`; disabling via `code`
     * can be done by users.
     */ issueWarning = (code, warning)=>{
        warning += ` See https://lit.dev/msg/${code} for more information.`;
        if (!global.litIssuedWarnings.has(warning) && !global.litIssuedWarnings.has(code)) {
            console.warn(warning);
            global.litIssuedWarnings.add(warning);
        }
    };
    queueMicrotask(()=>{
        issueWarning('dev-mode', `Lit is in dev mode. Not recommended for production!`);
        // Issue polyfill support warning.
        if (global.ShadyDOM?.inUse && polyfillSupport === undefined) {
            issueWarning('polyfill-support-missing', `Shadow DOM is being polyfilled via \`ShadyDOM\` but ` + `the \`polyfill-support\` module has not been loaded.`);
        }
    });
}/**
 * Useful for visualizing and logging insights into what the Lit template system is doing.
 *
 * Compiled out of prod mode builds.
 */ const debugLogEvent = (event)=>{
    const shouldEmit = global.emitLitDebugLogEvents;
    if (!shouldEmit) {
        return;
    }
    global.dispatchEvent(new CustomEvent('lit-debug', {
        detail: event
    }));
};
/*
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */ /*@__INLINE__*/ const JSCompiler_renameProperty = (prop, _obj)=>prop;
const defaultConverter = {
    toAttribute (value, type) {
        switch(type){
            case Boolean:
                value = value ? emptyStringForBooleanAttribute : null;
                break;
            case Object:
            case Array:
                // if the value is `null` or `undefined` pass this through
                // to allow removing/no change behavior.
                value = value == null ? value : JSON.stringify(value);
                break;
        }
        return value;
    },
    fromAttribute (value, type) {
        let fromValue = value;
        switch(type){
            case Boolean:
                fromValue = value !== null;
                break;
            case Number:
                fromValue = value === null ? null : Number(value);
                break;
            case Object:
            case Array:
                // Do *not* generate exception when invalid JSON is set as elements
                // don't normally complain on being mis-configured.
                // TODO(sorvell): Do generate exception in *dev mode*.
                try {
                    // Assert to adhere to Bazel's "must type assert JSON parse" rule.
                    fromValue = JSON.parse(value);
                } catch (e) {
                    fromValue = null;
                }
                break;
        }
        return fromValue;
    }
};
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */ const notEqual = (value, old)=>!is(value, old);
const defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: defaultConverter,
    reflect: false,
    useDefault: false,
    hasChanged: notEqual
};
// Ensure metadata is enabled. TypeScript does not polyfill
// Symbol.metadata, so we must ensure that it exists.
Symbol.metadata ??= Symbol('metadata');
// Map from a class's metadata object to property options
// Note that we must use nullish-coalescing assignment so that we only use one
// map even if we load multiple version of this module.
global.litPropertyMetadata ??= new WeakMap();
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclasses to render updates as desired.
 * @noInheritDoc
 */ class ReactiveElement extends (globalThis.HTMLElement ?? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2d$labs$2f$ssr$2d$dom$2d$shim$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["HTMLElement"]) {
    /**
     * Adds an initializer function to the class that is called during instance
     * construction.
     *
     * This is useful for code that runs against a `ReactiveElement`
     * subclass, such as a decorator, that needs to do work for each
     * instance, such as setting up a `ReactiveController`.
     *
     * ```ts
     * const myDecorator = (target: typeof ReactiveElement, key: string) => {
     *   target.addInitializer((instance: ReactiveElement) => {
     *     // This is run during construction of the element
     *     new MyController(instance);
     *   });
     * }
     * ```
     *
     * Decorating a field will then cause each instance to run an initializer
     * that adds a controller:
     *
     * ```ts
     * class MyElement extends LitElement {
     *   @myDecorator foo;
     * }
     * ```
     *
     * Initializers are stored per-constructor. Adding an initializer to a
     * subclass does not add it to a superclass. Since initializers are run in
     * constructors, initializers will run in order of the class hierarchy,
     * starting with superclasses and progressing to the instance's class.
     *
     * @nocollapse
     */ static addInitializer(initializer) {
        this.__prepare();
        (this._initializers ??= []).push(initializer);
    }
    /**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     * @category attributes
     */ static get observedAttributes() {
        // Ensure we've created all properties
        this.finalize();
        // this.__attributeToPropertyMap is only undefined after finalize() in
        // ReactiveElement itself. ReactiveElement.observedAttributes is only
        // accessed with ReactiveElement as the receiver when a subclass or mixin
        // calls super.observedAttributes
        return this.__attributeToPropertyMap && [
            ...this.__attributeToPropertyMap.keys()
        ];
    }
    /**
     * Creates a property accessor on the element prototype if one does not exist
     * and stores a {@linkcode PropertyDeclaration} for the property with the
     * given options. The property setter calls the property's `hasChanged`
     * property option or uses a strict identity check to determine whether or not
     * to request an update.
     *
     * This method may be overridden to customize properties; however,
     * when doing so, it's important to call `super.createProperty` to ensure
     * the property is setup correctly. This method calls
     * `getPropertyDescriptor` internally to get a descriptor to install.
     * To customize what properties do when they are get or set, override
     * `getPropertyDescriptor`. To customize the options for a property,
     * implement `createProperty` like this:
     *
     * ```ts
     * static createProperty(name, options) {
     *   options = Object.assign(options, {myOption: true});
     *   super.createProperty(name, options);
     * }
     * ```
     *
     * @nocollapse
     * @category properties
     */ static createProperty(name, options = defaultPropertyDeclaration) {
        // If this is a state property, force the attribute to false.
        if (options.state) {
            options.attribute = false;
        }
        this.__prepare();
        // Whether this property is wrapping accessors.
        // Helps control the initial value change and reflection logic.
        if (this.prototype.hasOwnProperty(name)) {
            options = Object.create(options);
            options.wrapped = true;
        }
        this.elementProperties.set(name, options);
        if (!options.noAccessor) {
            const key = // when doing HMR.
            Symbol.for(`${String(name)} (@property() cache)`);
            const descriptor = this.getPropertyDescriptor(name, key, options);
            if (descriptor !== undefined) {
                defineProperty(this.prototype, name, descriptor);
            }
        }
    }
    /**
     * Returns a property descriptor to be defined on the given named property.
     * If no descriptor is returned, the property will not become an accessor.
     * For example,
     *
     * ```ts
     * class MyElement extends LitElement {
     *   static getPropertyDescriptor(name, key, options) {
     *     const defaultDescriptor =
     *         super.getPropertyDescriptor(name, key, options);
     *     const setter = defaultDescriptor.set;
     *     return {
     *       get: defaultDescriptor.get,
     *       set(value) {
     *         setter.call(this, value);
     *         // custom action.
     *       },
     *       configurable: true,
     *       enumerable: true
     *     }
     *   }
     * }
     * ```
     *
     * @nocollapse
     * @category properties
     */ static getPropertyDescriptor(name, key, options) {
        const { get, set } = getOwnPropertyDescriptor(this.prototype, name) ?? {
            get () {
                return this[key];
            },
            set (v) {
                this[key] = v;
            }
        };
        if (get == null) {
            if ('value' in (getOwnPropertyDescriptor(this.prototype, name) ?? {})) {
                throw new Error(`Field ${JSON.stringify(String(name))} on ` + `${this.name} was declared as a reactive property ` + `but it's actually declared as a value on the prototype. ` + `Usually this is due to using @property or @state on a method.`);
            }
            issueWarning('reactive-property-without-getter', `Field ${JSON.stringify(String(name))} on ` + `${this.name} was declared as a reactive property ` + `but it does not have a getter. This will be an error in a ` + `future version of Lit.`);
        }
        return {
            get,
            set (value) {
                const oldValue = get?.call(this);
                set?.call(this, value);
                this.requestUpdate(name, oldValue, options);
            },
            configurable: true,
            enumerable: true
        };
    }
    /**
     * Returns the property options associated with the given property.
     * These options are defined with a `PropertyDeclaration` via the `properties`
     * object or the `@property` decorator and are registered in
     * `createProperty(...)`.
     *
     * Note, this method should be considered "final" and not overridden. To
     * customize the options for a given property, override
     * {@linkcode createProperty}.
     *
     * @nocollapse
     * @final
     * @category properties
     */ static getPropertyOptions(name) {
        return this.elementProperties.get(name) ?? defaultPropertyDeclaration;
    }
    /**
     * Initializes static own properties of the class used in bookkeeping
     * for element properties, initializers, etc.
     *
     * Can be called multiple times by code that needs to ensure these
     * properties exist before using them.
     *
     * This method ensures the superclass is finalized so that inherited
     * property metadata can be copied down.
     * @nocollapse
     */ static __prepare() {
        if (this.hasOwnProperty(JSCompiler_renameProperty('elementProperties'))) {
            // Already prepared
            return;
        }
        // Finalize any superclasses
        const superCtor = getPrototypeOf(this);
        superCtor.finalize();
        // Create own set of initializers for this class if any exist on the
        // superclass and copy them down. Note, for a small perf boost, avoid
        // creating initializers unless needed.
        if (superCtor._initializers !== undefined) {
            this._initializers = [
                ...superCtor._initializers
            ];
        }
        // Initialize elementProperties from the superclass
        this.elementProperties = new Map(superCtor.elementProperties);
    }
    /**
     * Finishes setting up the class so that it's ready to be registered
     * as a custom element and instantiated.
     *
     * This method is called by the ReactiveElement.observedAttributes getter.
     * If you override the observedAttributes getter, you must either call
     * super.observedAttributes to trigger finalization, or call finalize()
     * yourself.
     *
     * @nocollapse
     */ static finalize() {
        if (this.hasOwnProperty(JSCompiler_renameProperty('finalized'))) {
            return;
        }
        this.finalized = true;
        this.__prepare();
        // Create properties from the static properties block:
        if (this.hasOwnProperty(JSCompiler_renameProperty('properties'))) {
            const props = this.properties;
            const propKeys = [
                ...getOwnPropertyNames(props),
                ...getOwnPropertySymbols(props)
            ];
            for (const p of propKeys){
                this.createProperty(p, props[p]);
            }
        }
        // Create properties from standard decorator metadata:
        const metadata = this[Symbol.metadata];
        if (metadata !== null) {
            const properties = litPropertyMetadata.get(metadata);
            if (properties !== undefined) {
                for (const [p, options] of properties){
                    this.elementProperties.set(p, options);
                }
            }
        }
        // Create the attribute-to-property map
        this.__attributeToPropertyMap = new Map();
        for (const [p, options] of this.elementProperties){
            const attr = this.__attributeNameForProperty(p, options);
            if (attr !== undefined) {
                this.__attributeToPropertyMap.set(attr, p);
            }
        }
        this.elementStyles = this.finalizeStyles(this.styles);
        {
            if (this.hasOwnProperty('createProperty')) {
                issueWarning('no-override-create-property', 'Overriding ReactiveElement.createProperty() is deprecated. ' + 'The override will not be called with standard decorators');
            }
            if (this.hasOwnProperty('getPropertyDescriptor')) {
                issueWarning('no-override-get-property-descriptor', 'Overriding ReactiveElement.getPropertyDescriptor() is deprecated. ' + 'The override will not be called with standard decorators');
            }
        }
    }
    /**
     * Takes the styles the user supplied via the `static styles` property and
     * returns the array of styles to apply to the element.
     * Override this method to integrate into a style management system.
     *
     * Styles are deduplicated preserving the _last_ instance in the list. This
     * is a performance optimization to avoid duplicated styles that can occur
     * especially when composing via subclassing. The last item is kept to try
     * to preserve the cascade order with the assumption that it's most important
     * that last added styles override previous styles.
     *
     * @nocollapse
     * @category styles
     */ static finalizeStyles(styles) {
        const elementStyles = [];
        if (Array.isArray(styles)) {
            // Dedupe the flattened array in reverse order to preserve the last items.
            // Casting to Array<unknown> works around TS error that
            // appears to come from trying to flatten a type CSSResultArray.
            const set = new Set(styles.flat(Infinity).reverse());
            // Then preserve original order by adding the set items in reverse order.
            for (const s of set){
                elementStyles.unshift((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCompatibleStyle"])(s));
            }
        } else if (styles !== undefined) {
            elementStyles.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCompatibleStyle"])(styles));
        }
        return elementStyles;
    }
    /**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */ static __attributeNameForProperty(name, options) {
        const attribute = options.attribute;
        return attribute === false ? undefined : typeof attribute === 'string' ? attribute : typeof name === 'string' ? name.toLowerCase() : undefined;
    }
    constructor(){
        super();
        this.__instanceProperties = undefined;
        /**
         * True if there is a pending update as a result of calling `requestUpdate()`.
         * Should only be read.
         * @category updates
         */ this.isUpdatePending = false;
        /**
         * Is set to `true` after the first update. The element code cannot assume
         * that `renderRoot` exists before the element `hasUpdated`.
         * @category updates
         */ this.hasUpdated = false;
        /**
         * Name of currently reflecting property
         */ this.__reflectingProperty = null;
        this.__initialize();
    }
    /**
     * Internal only override point for customizing work done when elements
     * are constructed.
     */ __initialize() {
        this.__updatePromise = new Promise((res)=>this.enableUpdating = res);
        this._$changedProperties = new Map();
        // This enqueues a microtask that must run before the first update, so it
        // must be called before requestUpdate()
        this.__saveInstanceProperties();
        // ensures first update will be caught by an early access of
        // `updateComplete`
        this.requestUpdate();
        this.constructor._initializers?.forEach((i)=>i(this));
    }
    /**
     * Registers a `ReactiveController` to participate in the element's reactive
     * update cycle. The element automatically calls into any registered
     * controllers during its lifecycle callbacks.
     *
     * If the element is connected when `addController()` is called, the
     * controller's `hostConnected()` callback will be immediately called.
     * @category controllers
     */ addController(controller) {
        (this.__controllers ??= new Set()).add(controller);
        // If a controller is added after the element has been connected,
        // call hostConnected. Note, re-using existence of `renderRoot` here
        // (which is set in connectedCallback) to avoid the need to track a
        // first connected state.
        if (this.renderRoot !== undefined && this.isConnected) {
            controller.hostConnected?.();
        }
    }
    /**
     * Removes a `ReactiveController` from the element.
     * @category controllers
     */ removeController(controller) {
        this.__controllers?.delete(controller);
    }
    /**
     * Fixes any properties set on the instance before upgrade time.
     * Otherwise these would shadow the accessor and break these properties.
     * The properties are stored in a Map which is played back after the
     * constructor runs.
     */ __saveInstanceProperties() {
        const instanceProperties = new Map();
        const elementProperties = this.constructor.elementProperties;
        for (const p of elementProperties.keys()){
            if (this.hasOwnProperty(p)) {
                instanceProperties.set(p, this[p]);
                delete this[p];
            }
        }
        if (instanceProperties.size > 0) {
            this.__instanceProperties = instanceProperties;
        }
    }
    /**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     *
     * @return Returns a node into which to render.
     * @category rendering
     */ createRenderRoot() {
        const renderRoot = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["adoptStyles"])(renderRoot, this.constructor.elementStyles);
        return renderRoot;
    }
    /**
     * On first connection, creates the element's renderRoot, sets up
     * element styling, and enables updating.
     * @category lifecycle
     */ connectedCallback() {
        // Create renderRoot before controllers `hostConnected`
        this.renderRoot ??= this.createRenderRoot();
        this.enableUpdating(true);
        this.__controllers?.forEach((c)=>c.hostConnected?.());
    }
    /**
     * Note, this method should be considered final and not overridden. It is
     * overridden on the element instance with a function that triggers the first
     * update.
     * @category updates
     */ enableUpdating(_requestedUpdate) {}
    /**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     * @category lifecycle
     */ disconnectedCallback() {
        this.__controllers?.forEach((c)=>c.hostDisconnected?.());
    }
    /**
     * Synchronizes property values when attributes change.
     *
     * Specifically, when an attribute is set, the corresponding property is set.
     * You should rarely need to implement this callback. If this method is
     * overridden, `super.attributeChangedCallback(name, _old, value)` must be
     * called.
     *
     * See [responding to attribute changes](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes)
     * on MDN for more information about the `attributeChangedCallback`.
     * @category attributes
     */ attributeChangedCallback(name, _old, value) {
        this._$attributeToProperty(name, value);
    }
    __propertyToAttribute(name, value) {
        const elemProperties = this.constructor.elementProperties;
        const options = elemProperties.get(name);
        const attr = this.constructor.__attributeNameForProperty(name, options);
        if (attr !== undefined && options.reflect === true) {
            const converter = options.converter?.toAttribute !== undefined ? options.converter : defaultConverter;
            const attrValue = converter.toAttribute(value, options.type);
            if (this.constructor.enabledWarnings.includes('migration') && attrValue === undefined) {
                issueWarning('undefined-attribute-value', `The attribute value for the ${name} property is ` + `undefined on element ${this.localName}. The attribute will be ` + `removed, but in the previous version of \`ReactiveElement\`, ` + `the attribute would not have changed.`);
            }
            // Track if the property is being reflected to avoid
            // setting the property again via `attributeChangedCallback`. Note:
            // 1. this takes advantage of the fact that the callback is synchronous.
            // 2. will behave incorrectly if multiple attributes are in the reaction
            // stack at time of calling. However, since we process attributes
            // in `update` this should not be possible (or an extreme corner case
            // that we'd like to discover).
            // mark state reflecting
            this.__reflectingProperty = name;
            if (attrValue == null) {
                this.removeAttribute(attr);
            } else {
                this.setAttribute(attr, attrValue);
            }
            // mark state not reflecting
            this.__reflectingProperty = null;
        }
    }
    /** @internal */ _$attributeToProperty(name, value) {
        const ctor = this.constructor;
        // Note, hint this as an `AttributeMap` so closure clearly understands
        // the type; it has issues with tracking types through statics
        const propName = ctor.__attributeToPropertyMap.get(name);
        // Use tracking info to avoid reflecting a property value to an attribute
        // if it was just set because the attribute changed.
        if (propName !== undefined && this.__reflectingProperty !== propName) {
            const options = ctor.getPropertyOptions(propName);
            const converter = typeof options.converter === 'function' ? {
                fromAttribute: options.converter
            } : options.converter?.fromAttribute !== undefined ? options.converter : defaultConverter;
            // mark state reflecting
            this.__reflectingProperty = propName;
            const convertedValue = converter.fromAttribute(value, options.type);
            this[propName] = convertedValue ?? this.__defaultValues?.get(propName) ?? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            convertedValue;
            // mark state not reflecting
            this.__reflectingProperty = null;
        }
    }
    /**
     * Requests an update which is processed asynchronously. This should be called
     * when an element should update based on some state not triggered by setting
     * a reactive property. In this case, pass no arguments. It should also be
     * called when manually implementing a property setter. In this case, pass the
     * property `name` and `oldValue` to ensure that any configured property
     * options are honored.
     *
     * @param name name of requesting property
     * @param oldValue old value of requesting property
     * @param options property options to use instead of the previously
     *     configured options
     * @param useNewValue if true, the newValue argument is used instead of
     *     reading the property value. This is important to use if the reactive
     *     property is a standard private accessor, as opposed to a plain
     *     property, since private members can't be dynamically read by name.
     * @param newValue the new value of the property. This is only used if
     *     `useNewValue` is true.
     * @category updates
     */ requestUpdate(name, oldValue, options, useNewValue = false, newValue) {
        // If we have a property key, perform property update steps.
        if (name !== undefined) {
            if (name instanceof Event) {
                issueWarning(``, `The requestUpdate() method was called with an Event as the property name. This is probably a mistake caused by binding this.requestUpdate as an event listener. Instead bind a function that will call it with no arguments: () => this.requestUpdate()`);
            }
            const ctor = this.constructor;
            if (useNewValue === false) {
                newValue = this[name];
            }
            options ??= ctor.getPropertyOptions(name);
            const changed = (options.hasChanged ?? notEqual)(newValue, oldValue) || options.useDefault && options.reflect && newValue === this.__defaultValues?.get(name) && !this.hasAttribute(ctor.__attributeNameForProperty(name, options));
            if (changed) {
                this._$changeProperty(name, oldValue, options);
            } else {
                // Abort the request if the property should not be considered changed.
                return;
            }
        }
        if (this.isUpdatePending === false) {
            this.__updatePromise = this.__enqueueUpdate();
        }
    }
    /**
     * @internal
     */ _$changeProperty(name, oldValue, { useDefault, reflect, wrapped }, initializeValue) {
        // Record default value when useDefault is used. This allows us to
        // restore this value when the attribute is removed.
        if (useDefault && !(this.__defaultValues ??= new Map()).has(name)) {
            this.__defaultValues.set(name, initializeValue ?? oldValue ?? this[name]);
            // if this is not wrapping an accessor, it must be an initial setting
            // and in this case we do not want to record the change or reflect.
            if (wrapped !== true || initializeValue !== undefined) {
                return;
            }
        }
        // TODO (justinfagnani): Create a benchmark of Map.has() + Map.set(
        // vs just Map.set()
        if (!this._$changedProperties.has(name)) {
            // On the initial change, the old value should be `undefined`, except
            // with `useDefault`
            if (!this.hasUpdated && !useDefault) {
                oldValue = undefined;
            }
            this._$changedProperties.set(name, oldValue);
        }
        // Add to reflecting properties set.
        // Note, it's important that every change has a chance to add the
        // property to `__reflectingProperties`. This ensures setting
        // attribute + property reflects correctly.
        if (reflect === true && this.__reflectingProperty !== name) {
            (this.__reflectingProperties ??= new Set()).add(name);
        }
    }
    /**
     * Sets up the element to asynchronously update.
     */ async __enqueueUpdate() {
        this.isUpdatePending = true;
        try {
            // Ensure any previous update has resolved before updating.
            // This `await` also ensures that property changes are batched.
            await this.__updatePromise;
        } catch (e) {
            // Refire any previous errors async so they do not disrupt the update
            // cycle. Errors are refired so developers have a chance to observe
            // them, and this can be done by implementing
            // `window.onunhandledrejection`.
            Promise.reject(e);
        }
        const result = this.scheduleUpdate();
        // If `scheduleUpdate` returns a Promise, we await it. This is done to
        // enable coordinating updates with a scheduler. Note, the result is
        // checked to avoid delaying an additional microtask unless we need to.
        if (result != null) {
            await result;
        }
        return !this.isUpdatePending;
    }
    /**
     * Schedules an element update. You can override this method to change the
     * timing of updates by returning a Promise. The update will await the
     * returned Promise, and you should resolve the Promise to allow the update
     * to proceed. If this method is overridden, `super.scheduleUpdate()`
     * must be called.
     *
     * For instance, to schedule updates to occur just before the next frame:
     *
     * ```ts
     * override protected async scheduleUpdate(): Promise<unknown> {
     *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
     *   super.scheduleUpdate();
     * }
     * ```
     * @category updates
     */ scheduleUpdate() {
        const result = this.performUpdate();
        if (this.constructor.enabledWarnings.includes('async-perform-update') && typeof result?.then === 'function') {
            issueWarning('async-perform-update', `Element ${this.localName} returned a Promise from performUpdate(). ` + `This behavior is deprecated and will be removed in a future ` + `version of ReactiveElement.`);
        }
        return result;
    }
    /**
     * Performs an element update. Note, if an exception is thrown during the
     * update, `firstUpdated` and `updated` will not be called.
     *
     * Call `performUpdate()` to immediately process a pending update. This should
     * generally not be needed, but it can be done in rare cases when you need to
     * update synchronously.
     *
     * @category updates
     */ performUpdate() {
        // Abort any update if one is not pending when this is called.
        // This can happen if `performUpdate` is called early to "flush"
        // the update.
        if (!this.isUpdatePending) {
            return;
        }
        debugLogEvent?.({
            kind: 'update'
        });
        if (!this.hasUpdated) {
            // Create renderRoot before first update. This occurs in `connectedCallback`
            // but is done here to support out of tree calls to `enableUpdating`/`performUpdate`.
            this.renderRoot ??= this.createRenderRoot();
            {
                // Produce warning if any reactive properties on the prototype are
                // shadowed by class fields. Instance fields set before upgrade are
                // deleted by this point, so any own property is caused by class field
                // initialization in the constructor.
                const ctor = this.constructor;
                const shadowedProperties = [
                    ...ctor.elementProperties.keys()
                ].filter((p)=>this.hasOwnProperty(p) && p in getPrototypeOf(this));
                if (shadowedProperties.length) {
                    throw new Error(`The following properties on element ${this.localName} will not ` + `trigger updates as expected because they are set using class ` + `fields: ${shadowedProperties.join(', ')}. ` + `Native class fields and some compiled output will overwrite ` + `accessors used for detecting changes. See ` + `https://lit.dev/msg/class-field-shadowing ` + `for more information.`);
                }
            }
            // Mixin instance properties once, if they exist.
            if (this.__instanceProperties) {
                // TODO (justinfagnani): should we use the stored value? Could a new value
                // have been set since we stored the own property value?
                for (const [p, value] of this.__instanceProperties){
                    this[p] = value;
                }
                this.__instanceProperties = undefined;
            }
            // Trigger initial value reflection and populate the initial
            // `changedProperties` map, but only for the case of properties created
            // via `createProperty` on accessors, which will not have already
            // populated the `changedProperties` map since they are not set.
            // We can't know if these accessors had initializers, so we just set
            // them anyway - a difference from experimental decorators on fields and
            // standard decorators on auto-accessors.
            // For context see:
            // https://github.com/lit/lit/pull/4183#issuecomment-1711959635
            const elementProperties = this.constructor.elementProperties;
            if (elementProperties.size > 0) {
                for (const [p, options] of elementProperties){
                    const { wrapped } = options;
                    const value = this[p];
                    if (wrapped === true && !this._$changedProperties.has(p) && value !== undefined) {
                        this._$changeProperty(p, undefined, options, value);
                    }
                }
            }
        }
        let shouldUpdate = false;
        const changedProperties = this._$changedProperties;
        try {
            shouldUpdate = this.shouldUpdate(changedProperties);
            if (shouldUpdate) {
                this.willUpdate(changedProperties);
                this.__controllers?.forEach((c)=>c.hostUpdate?.());
                this.update(changedProperties);
            } else {
                this.__markUpdated();
            }
        } catch (e) {
            // Prevent `firstUpdated` and `updated` from running when there's an
            // update exception.
            shouldUpdate = false;
            // Ensure element can accept additional updates after an exception.
            this.__markUpdated();
            throw e;
        }
        // The update is no longer considered pending and further updates are now allowed.
        if (shouldUpdate) {
            this._$didUpdate(changedProperties);
        }
    }
    /**
     * Invoked before `update()` to compute values needed during the update.
     *
     * Implement `willUpdate` to compute property values that depend on other
     * properties and are used in the rest of the update process.
     *
     * ```ts
     * willUpdate(changedProperties) {
     *   // only need to check changed properties for an expensive computation.
     *   if (changedProperties.has('firstName') || changedProperties.has('lastName')) {
     *     this.sha = computeSHA(`${this.firstName} ${this.lastName}`);
     *   }
     * }
     *
     * render() {
     *   return html`SHA: ${this.sha}`;
     * }
     * ```
     *
     * @category updates
     */ willUpdate(_changedProperties) {}
    // Note, this is an override point for polyfill-support.
    // @internal
    _$didUpdate(changedProperties) {
        this.__controllers?.forEach((c)=>c.hostUpdated?.());
        if (!this.hasUpdated) {
            this.hasUpdated = true;
            this.firstUpdated(changedProperties);
        }
        this.updated(changedProperties);
        if (this.isUpdatePending && this.constructor.enabledWarnings.includes('change-in-update')) {
            issueWarning('change-in-update', `Element ${this.localName} scheduled an update ` + `(generally because a property was set) ` + `after an update completed, causing a new update to be scheduled. ` + `This is inefficient and should be avoided unless the next update ` + `can only be scheduled as a side effect of the previous update.`);
        }
    }
    __markUpdated() {
        this._$changedProperties = new Map();
        this.isUpdatePending = false;
    }
    /**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. If the Promise is rejected, an
     * exception was thrown during the update.
     *
     * To await additional asynchronous work, override the `getUpdateComplete`
     * method. For example, it is sometimes useful to await a rendered element
     * before fulfilling this Promise. To do this, first await
     * `super.getUpdateComplete()`, then any subsequent state.
     *
     * @return A promise of a boolean that resolves to true if the update completed
     *     without triggering another update.
     * @category updates
     */ get updateComplete() {
        return this.getUpdateComplete();
    }
    /**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     * ```ts
     * class MyElement extends LitElement {
     *   override async getUpdateComplete() {
     *     const result = await super.getUpdateComplete();
     *     await this._myChild.updateComplete;
     *     return result;
     *   }
     * }
     * ```
     *
     * @return A promise of a boolean that resolves to true if the update completed
     *     without triggering another update.
     * @category updates
     */ getUpdateComplete() {
        return this.__updatePromise;
    }
    /**
     * Controls whether or not `update()` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * @param _changedProperties Map of changed properties with old values
     * @category updates
     */ shouldUpdate(_changedProperties) {
        return true;
    }
    /**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * @param _changedProperties Map of changed properties with old values
     * @category updates
     */ update(_changedProperties) {
        // The forEach() expression will only run when __reflectingProperties is
        // defined, and it returns undefined, setting __reflectingProperties to
        // undefined
        this.__reflectingProperties &&= this.__reflectingProperties.forEach((p)=>this.__propertyToAttribute(p, this[p]));
        this.__markUpdated();
    }
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     * @category updates
     */ updated(_changedProperties) {}
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * ```ts
     * firstUpdated() {
     *   this.renderRoot.getElementById('my-text-area').focus();
     * }
     * ```
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     * @category updates
     */ firstUpdated(_changedProperties) {}
}
/**
 * Memoized list of all element styles.
 * Created lazily on user subclasses when finalizing the class.
 * @nocollapse
 * @category styles
 */ ReactiveElement.elementStyles = [];
/**
 * Options used when calling `attachShadow`. Set this property to customize
 * the options for the shadowRoot; for example, to create a closed
 * shadowRoot: `{mode: 'closed'}`.
 *
 * Note, these options are used in `createRenderRoot`. If this method
 * is customized, options should be respected if possible.
 * @nocollapse
 * @category rendering
 */ ReactiveElement.shadowRootOptions = {
    mode: 'open'
};
// Assigned here to work around a jscompiler bug with static fields
// when compiling to ES5.
// https://github.com/google/closure-compiler/issues/3177
ReactiveElement[JSCompiler_renameProperty('elementProperties')] = new Map();
ReactiveElement[JSCompiler_renameProperty('finalized')] = new Map();
// Apply polyfills if available
polyfillSupport?.({
    ReactiveElement
});
// Dev mode warnings...
{
    // Default warning set.
    ReactiveElement.enabledWarnings = [
        'change-in-update',
        'async-perform-update'
    ];
    const ensureOwnWarnings = function(ctor) {
        if (!ctor.hasOwnProperty(JSCompiler_renameProperty('enabledWarnings'))) {
            ctor.enabledWarnings = ctor.enabledWarnings.slice();
        }
    };
    ReactiveElement.enableWarning = function(warning) {
        ensureOwnWarnings(this);
        if (!this.enabledWarnings.includes(warning)) {
            this.enabledWarnings.push(warning);
        }
    };
    ReactiveElement.disableWarning = function(warning) {
        ensureOwnWarnings(this);
        const i = this.enabledWarnings.indexOf(warning);
        if (i >= 0) {
            this.enabledWarnings.splice(i, 1);
        }
    };
}// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for ReactiveElement usage.
(global.reactiveElementVersions ??= []).push('2.1.2');
if (global.reactiveElementVersions.length > 1) {
    queueMicrotask(()=>{
        issueWarning('multiple-versions', `Multiple versions of Lit loaded. Loading multiple versions ` + `is not recommended.`);
    });
}
;
 //# sourceMappingURL=reactive-element.js.map
}),
"[project]/Desktop/frontend/node_modules/@lit/reactive-element/node/development/reactive-element.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CSSResult",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CSSResult"],
    "ReactiveElement",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ReactiveElement"],
    "adoptStyles",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["adoptStyles"],
    "css",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["css"],
    "defaultConverter",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["defaultConverter"],
    "getCompatibleStyle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCompatibleStyle"],
    "notEqual",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["notEqual"],
    "supportsAdoptingStyleSheets",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supportsAdoptingStyleSheets"],
    "unsafeCSS",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["unsafeCSS"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@lit/reactive-element/node/development/reactive-element.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$css$2d$tag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@lit/reactive-element/node/development/css-tag.js [app-ssr] (ecmascript)");
}),
"[project]/Desktop/frontend/node_modules/lit-html/node/development/lit-html.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_$LH",
    ()=>_$LH,
    "html",
    ()=>html,
    "mathml",
    ()=>mathml,
    "noChange",
    ()=>noChange,
    "nothing",
    ()=>nothing,
    "render",
    ()=>render,
    "svg",
    ()=>svg
]);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ // Allows minifiers to rename references to globalThis
const global = globalThis;
/**
 * Useful for visualizing and logging insights into what the Lit template system is doing.
 *
 * Compiled out of prod mode builds.
 */ const debugLogEvent = (event)=>{
    const shouldEmit = global.emitLitDebugLogEvents;
    if (!shouldEmit) {
        return;
    }
    global.dispatchEvent(new CustomEvent('lit-debug', {
        detail: event
    }));
};
// Used for connecting beginRender and endRender events when there are nested
// renders when errors are thrown preventing an endRender event from being
// called.
let debugLogRenderId = 0;
let issueWarning;
{
    global.litIssuedWarnings ??= new Set();
    /**
     * Issue a warning if we haven't already, based either on `code` or `warning`.
     * Warnings are disabled automatically only by `warning`; disabling via `code`
     * can be done by users.
     */ issueWarning = (code, warning)=>{
        warning += code ? ` See https://lit.dev/msg/${code} for more information.` : '';
        if (!global.litIssuedWarnings.has(warning) && !global.litIssuedWarnings.has(code)) {
            console.warn(warning);
            global.litIssuedWarnings.add(warning);
        }
    };
    queueMicrotask(()=>{
        issueWarning('dev-mode', `Lit is in dev mode. Not recommended for production!`);
    });
}const wrap = (node)=>node;
const trustedTypes = global.trustedTypes;
/**
 * Our TrustedTypePolicy for HTML which is declared using the html template
 * tag function.
 *
 * That HTML is a developer-authored constant, and is parsed with innerHTML
 * before any untrusted expressions have been mixed in. Therefor it is
 * considered safe by construction.
 */ const policy = trustedTypes ? trustedTypes.createPolicy('lit-html', {
    createHTML: (s)=>s
}) : undefined;
const identityFunction = (value)=>value;
const noopSanitizer = (_node, _name, _type)=>identityFunction;
/** Sets the global sanitizer factory. */ const setSanitizer = (newSanitizer)=>{
    if (sanitizerFactoryInternal !== noopSanitizer) {
        throw new Error(`Attempted to overwrite existing lit-html security policy.` + ` setSanitizeDOMValueFactory should be called at most once.`);
    }
    sanitizerFactoryInternal = newSanitizer;
};
/**
 * Only used in internal tests, not a part of the public API.
 */ const _testOnlyClearSanitizerFactoryDoNotCallOrElse = ()=>{
    sanitizerFactoryInternal = noopSanitizer;
};
const createSanitizer = (node, name, type)=>{
    return sanitizerFactoryInternal(node, name, type);
};
// Added to an attribute name to mark the attribute as bound so we can find
// it easily.
const boundAttributeSuffix = '$lit$';
// This marker is used in many syntactic positions in HTML, so it must be
// a valid element name and attribute name. We don't support dynamic names (yet)
// but this at least ensures that the parse tree is closer to the template
// intention.
const marker = `lit$${Math.random().toFixed(9).slice(2)}$`;
// String used to tell if a comment is a marker comment
const markerMatch = '?' + marker;
// Text used to insert a comment marker node. We use processing instruction
// syntax because it's slightly smaller, but parses as a comment node.
const nodeMarker = `<${markerMatch}>`;
const d = global.document === undefined ? {
    createTreeWalker () {
        return {};
    }
} : document;
// Creates a dynamic marker. We never have to search for these in the DOM.
const createMarker = ()=>d.createComment('');
const isPrimitive = (value)=>value === null || typeof value != 'object' && typeof value != 'function';
const isArray = Array.isArray;
const isIterable = (value)=>isArray(value) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof value?.[Symbol.iterator] === 'function';
const SPACE_CHAR = `[ \t\n\f\r]`;
const ATTR_VALUE_CHAR = `[^ \t\n\f\r"'\`<>=]`;
const NAME_CHAR = `[^\\s"'>=/]`;
// These regexes represent the five parsing states that we care about in the
// Template's HTML scanner. They match the *end* of the state they're named
// after.
// Depending on the match, we transition to a new state. If there's no match,
// we stay in the same state.
// Note that the regexes are stateful. We utilize lastIndex and sync it
// across the multiple regexes used. In addition to the five regexes below
// we also dynamically create a regex to find the matching end tags for raw
// text elements.
/**
 * End of text is: `<` followed by:
 *   (comment start) or (tag) or (dynamic tag binding)
 */ const textEndRegex = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
const COMMENT_START = 1;
const TAG_NAME = 2;
const DYNAMIC_TAG_NAME = 3;
const commentEndRegex = /-->/g;
/**
 * Comments not started with <!--, like </{, can be ended by a single `>`
 */ const comment2EndRegex = />/g;
/**
 * The tagEnd regex matches the end of the "inside an opening" tag syntax
 * position. It either matches a `>`, an attribute-like sequence, or the end
 * of the string after a space (attribute-name position ending).
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \t\n\f\r" are HTML space characters:
 * https://infra.spec.whatwg.org/#ascii-whitespace
 *
 * So an attribute is:
 *  * The name: any character except a whitespace character, ("), ('), ">",
 *    "=", or "/". Note: this is different from the HTML spec which also excludes control characters.
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */ const tagEndRegex = new RegExp(`>|${SPACE_CHAR}(?:(${NAME_CHAR}+)(${SPACE_CHAR}*=${SPACE_CHAR}*(?:${ATTR_VALUE_CHAR}|("|')|))|$)`, 'g');
const ENTIRE_MATCH = 0;
const ATTRIBUTE_NAME = 1;
const SPACES_AND_EQUALS = 2;
const QUOTE_CHAR = 3;
const singleQuoteAttrEndRegex = /'/g;
const doubleQuoteAttrEndRegex = /"/g;
/**
 * Matches the raw text elements.
 *
 * Comments are not parsed within raw text elements, so we need to search their
 * text content for marker strings.
 */ const rawTextElement = /^(?:script|style|textarea|title)$/i;
/** TemplateResult types */ const HTML_RESULT = 1;
const SVG_RESULT = 2;
const MATHML_RESULT = 3;
// TemplatePart types
// IMPORTANT: these must match the values in PartType
const ATTRIBUTE_PART = 1;
const CHILD_PART = 2;
const PROPERTY_PART = 3;
const BOOLEAN_ATTRIBUTE_PART = 4;
const EVENT_PART = 5;
const ELEMENT_PART = 6;
const COMMENT_PART = 7;
/**
 * Generates a template literal tag function that returns a TemplateResult with
 * the given result type.
 */ const tag = (type)=>(strings, ...values)=>{
        // Warn against templates octal escape sequences
        // We do this here rather than in render so that the warning is closer to the
        // template definition.
        if (strings.some((s)=>s === undefined)) {
            console.warn('Some template strings are undefined.\n' + 'This is probably caused by illegal octal escape sequences.');
        }
        {
            // Import static-html.js results in a circular dependency which g3 doesn't
            // handle. Instead we know that static values must have the field
            // `_$litStatic$`.
            if (values.some((val)=>val?.['_$litStatic$'])) {
                issueWarning('', `Static values 'literal' or 'unsafeStatic' cannot be used as values to non-static templates.\n` + `Please use the static 'html' tag function. See https://lit.dev/docs/templates/expressions/#static-expressions`);
            }
        }
        return {
            // This property needs to remain unminified.
            ['_$litType$']: type,
            strings,
            values
        };
    };
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 *
 * ```ts
 * const header = (title: string) => html`<h1>${title}</h1>`;
 * ```
 *
 * The `html` tag returns a description of the DOM to render as a value. It is
 * lazy, meaning no work is done until the template is rendered. When rendering,
 * if a template comes from the same expression as a previously rendered result,
 * it's efficiently updated instead of replaced.
 */ const html = tag(HTML_RESULT);
/**
 * Interprets a template literal as an SVG fragment that can efficiently render
 * to and update a container.
 *
 * ```ts
 * const rect = svg`<rect width="10" height="10"></rect>`;
 *
 * const myImage = html`
 *   <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
 *     ${rect}
 *   </svg>`;
 * ```
 *
 * The `svg` *tag function* should only be used for SVG fragments, or elements
 * that would be contained **inside** an `<svg>` HTML element. A common error is
 * placing an `<svg>` *element* in a template tagged with the `svg` tag
 * function. The `<svg>` element is an HTML element and should be used within a
 * template tagged with the {@linkcode html} tag function.
 *
 * In LitElement usage, it's invalid to return an SVG fragment from the
 * `render()` method, as the SVG fragment will be contained within the element's
 * shadow root and thus not be properly contained within an `<svg>` HTML
 * element.
 */ const svg = tag(SVG_RESULT);
/**
 * Interprets a template literal as MathML fragment that can efficiently render
 * to and update a container.
 *
 * ```ts
 * const num = mathml`<mn>1</mn>`;
 *
 * const eq = html`
 *   <math>
 *     ${num}
 *   </math>`;
 * ```
 *
 * The `mathml` *tag function* should only be used for MathML fragments, or
 * elements that would be contained **inside** a `<math>` HTML element. A common
 * error is placing a `<math>` *element* in a template tagged with the `mathml`
 * tag function. The `<math>` element is an HTML element and should be used
 * within a template tagged with the {@linkcode html} tag function.
 *
 * In LitElement usage, it's invalid to return an MathML fragment from the
 * `render()` method, as the MathML fragment will be contained within the
 * element's shadow root and thus not be properly contained within a `<math>`
 * HTML element.
 */ const mathml = tag(MATHML_RESULT);
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */ const noChange = Symbol.for('lit-noChange');
/**
 * A sentinel value that signals a ChildPart to fully clear its content.
 *
 * ```ts
 * const button = html`${
 *  user.isAdmin
 *    ? html`<button>DELETE</button>`
 *    : nothing
 * }`;
 * ```
 *
 * Prefer using `nothing` over other falsy values as it provides a consistent
 * behavior between various expression binding contexts.
 *
 * In child expressions, `undefined`, `null`, `''`, and `nothing` all behave the
 * same and render no nodes. In attribute expressions, `nothing` _removes_ the
 * attribute, while `undefined` and `null` will render an empty string. In
 * property expressions `nothing` becomes `undefined`.
 */ const nothing = Symbol.for('lit-nothing');
/**
 * The cache of prepared templates, keyed by the tagged TemplateStringsArray
 * and _not_ accounting for the specific template tag used. This means that
 * template tags cannot be dynamic - they must statically be one of html, svg,
 * or attr. This restriction simplifies the cache lookup, which is on the hot
 * path for rendering.
 */ const templateCache = new WeakMap();
const walker = d.createTreeWalker(d, 129 /* NodeFilter.SHOW_{ELEMENT|COMMENT} */ );
let sanitizerFactoryInternal = noopSanitizer;
function trustFromTemplateString(tsa, stringFromTSA) {
    // A security check to prevent spoofing of Lit template results.
    // In the future, we may be able to replace this with Array.isTemplateObject,
    // though we might need to make that check inside of the html and svg
    // functions, because precompiled templates don't come in as
    // TemplateStringArray objects.
    if (!isArray(tsa) || !tsa.hasOwnProperty('raw')) {
        let message = 'invalid template strings array';
        {
            message = `
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.
          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `.trim().replace(/\n */g, '\n');
        }
        throw new Error(message);
    }
    return policy !== undefined ? policy.createHTML(stringFromTSA) : stringFromTSA;
}
/**
 * Returns an HTML string for the given TemplateStringsArray and result type
 * (HTML or SVG), along with the case-sensitive bound attribute names in
 * template order. The HTML contains comment markers denoting the `ChildPart`s
 * and suffixes on bound attributes denoting the `AttributeParts`.
 *
 * @param strings template strings array
 * @param type HTML or SVG
 * @return Array containing `[html, attrNames]` (array returned for terseness,
 *     to avoid object fields since this code is shared with non-minified SSR
 *     code)
 */ const getTemplateHtml = (strings, type)=>{
    // Insert makers into the template HTML to represent the position of
    // bindings. The following code scans the template strings to determine the
    // syntactic position of the bindings. They can be in text position, where
    // we insert an HTML comment, attribute value position, where we insert a
    // sentinel string and re-write the attribute name, or inside a tag where
    // we insert the sentinel string.
    const l = strings.length - 1;
    // Stores the case-sensitive bound attribute names in the order of their
    // parts. ElementParts are also reflected in this array as undefined
    // rather than a string, to disambiguate from attribute bindings.
    const attrNames = [];
    let html = type === SVG_RESULT ? '<svg>' : type === MATHML_RESULT ? '<math>' : '';
    // When we're inside a raw text tag (not it's text content), the regex
    // will still be tagRegex so we can find attributes, but will switch to
    // this regex when the tag ends.
    let rawTextEndRegex;
    // The current parsing state, represented as a reference to one of the
    // regexes
    let regex = textEndRegex;
    for(let i = 0; i < l; i++){
        const s = strings[i];
        // The index of the end of the last attribute name. When this is
        // positive at end of a string, it means we're in an attribute value
        // position and need to rewrite the attribute name.
        // We also use a special value of -2 to indicate that we encountered
        // the end of a string in attribute name position.
        let attrNameEndIndex = -1;
        let attrName;
        let lastIndex = 0;
        let match;
        // The conditions in this loop handle the current parse state, and the
        // assignments to the `regex` variable are the state transitions.
        while(lastIndex < s.length){
            // Make sure we start searching from where we previously left off
            regex.lastIndex = lastIndex;
            match = regex.exec(s);
            if (match === null) {
                break;
            }
            lastIndex = regex.lastIndex;
            if (regex === textEndRegex) {
                if (match[COMMENT_START] === '!--') {
                    regex = commentEndRegex;
                } else if (match[COMMENT_START] !== undefined) {
                    // We started a weird comment, like </{
                    regex = comment2EndRegex;
                } else if (match[TAG_NAME] !== undefined) {
                    if (rawTextElement.test(match[TAG_NAME])) {
                        // Record if we encounter a raw-text element. We'll switch to
                        // this regex at the end of the tag.
                        rawTextEndRegex = new RegExp(`</${match[TAG_NAME]}`, 'g');
                    }
                    regex = tagEndRegex;
                } else if (match[DYNAMIC_TAG_NAME] !== undefined) {
                    {
                        throw new Error('Bindings in tag names are not supported. Please use static templates instead. ' + 'See https://lit.dev/docs/templates/expressions/#static-expressions');
                    }
                }
            } else if (regex === tagEndRegex) {
                if (match[ENTIRE_MATCH] === '>') {
                    // End of a tag. If we had started a raw-text element, use that
                    // regex
                    regex = rawTextEndRegex ?? textEndRegex;
                    // We may be ending an unquoted attribute value, so make sure we
                    // clear any pending attrNameEndIndex
                    attrNameEndIndex = -1;
                } else if (match[ATTRIBUTE_NAME] === undefined) {
                    // Attribute name position
                    attrNameEndIndex = -2;
                } else {
                    attrNameEndIndex = regex.lastIndex - match[SPACES_AND_EQUALS].length;
                    attrName = match[ATTRIBUTE_NAME];
                    regex = match[QUOTE_CHAR] === undefined ? tagEndRegex : match[QUOTE_CHAR] === '"' ? doubleQuoteAttrEndRegex : singleQuoteAttrEndRegex;
                }
            } else if (regex === doubleQuoteAttrEndRegex || regex === singleQuoteAttrEndRegex) {
                regex = tagEndRegex;
            } else if (regex === commentEndRegex || regex === comment2EndRegex) {
                regex = textEndRegex;
            } else {
                // Not one of the five state regexes, so it must be the dynamically
                // created raw text regex and we're at the close of that element.
                regex = tagEndRegex;
                rawTextEndRegex = undefined;
            }
        }
        {
            // If we have a attrNameEndIndex, which indicates that we should
            // rewrite the attribute name, assert that we're in a valid attribute
            // position - either in a tag, or a quoted attribute value.
            console.assert(attrNameEndIndex === -1 || regex === tagEndRegex || regex === singleQuoteAttrEndRegex || regex === doubleQuoteAttrEndRegex, 'unexpected parse state B');
        }
        // We have four cases:
        //  1. We're in text position, and not in a raw text element
        //     (regex === textEndRegex): insert a comment marker.
        //  2. We have a non-negative attrNameEndIndex which means we need to
        //     rewrite the attribute name to add a bound attribute suffix.
        //  3. We're at the non-first binding in a multi-binding attribute, use a
        //     plain marker.
        //  4. We're somewhere else inside the tag. If we're in attribute name
        //     position (attrNameEndIndex === -2), add a sequential suffix to
        //     generate a unique attribute name.
        // Detect a binding next to self-closing tag end and insert a space to
        // separate the marker from the tag end:
        const end = regex === tagEndRegex && strings[i + 1].startsWith('/>') ? ' ' : '';
        html += regex === textEndRegex ? s + nodeMarker : attrNameEndIndex >= 0 ? (attrNames.push(attrName), s.slice(0, attrNameEndIndex) + boundAttributeSuffix + s.slice(attrNameEndIndex)) + marker + end : s + marker + (attrNameEndIndex === -2 ? i : end);
    }
    const htmlResult = html + (strings[l] || '<?>') + (type === SVG_RESULT ? '</svg>' : type === MATHML_RESULT ? '</math>' : '');
    // Returned as an array for terseness
    return [
        trustFromTemplateString(strings, htmlResult),
        attrNames
    ];
};
class Template {
    constructor(// This property needs to remain unminified.
    { strings, ['_$litType$']: type }, options){
        this.parts = [];
        let node;
        let nodeIndex = 0;
        let attrNameIndex = 0;
        const partCount = strings.length - 1;
        const parts = this.parts;
        // Create template element
        const [html, attrNames] = getTemplateHtml(strings, type);
        this.el = Template.createElement(html, options);
        walker.currentNode = this.el.content;
        // Re-parent SVG or MathML nodes into template root
        if (type === SVG_RESULT || type === MATHML_RESULT) {
            const wrapper = this.el.content.firstChild;
            wrapper.replaceWith(...wrapper.childNodes);
        }
        // Walk the template to find binding markers and create TemplateParts
        while((node = walker.nextNode()) !== null && parts.length < partCount){
            if (node.nodeType === 1) {
                {
                    const tag = node.localName;
                    // Warn if `textarea` includes an expression and throw if `template`
                    // does since these are not supported. We do this by checking
                    // innerHTML for anything that looks like a marker. This catches
                    // cases like bindings in textarea there markers turn into text nodes.
                    if (/^(?:textarea|template)$/i.test(tag) && node.innerHTML.includes(marker)) {
                        const m = `Expressions are not supported inside \`${tag}\` ` + `elements. See https://lit.dev/msg/expression-in-${tag} for more ` + `information.`;
                        if (tag === 'template') {
                            throw new Error(m);
                        } else issueWarning('', m);
                    }
                }
                // TODO (justinfagnani): for attempted dynamic tag names, we don't
                // increment the bindingIndex, and it'll be off by 1 in the element
                // and off by two after it.
                if (node.hasAttributes()) {
                    for (const name of node.getAttributeNames()){
                        if (name.endsWith(boundAttributeSuffix)) {
                            const realName = attrNames[attrNameIndex++];
                            const value = node.getAttribute(name);
                            const statics = value.split(marker);
                            const m = /([.?@])?(.*)/.exec(realName);
                            parts.push({
                                type: ATTRIBUTE_PART,
                                index: nodeIndex,
                                name: m[2],
                                strings: statics,
                                ctor: m[1] === '.' ? PropertyPart : m[1] === '?' ? BooleanAttributePart : m[1] === '@' ? EventPart : AttributePart
                            });
                            node.removeAttribute(name);
                        } else if (name.startsWith(marker)) {
                            parts.push({
                                type: ELEMENT_PART,
                                index: nodeIndex
                            });
                            node.removeAttribute(name);
                        }
                    }
                }
                // TODO (justinfagnani): benchmark the regex against testing for each
                // of the 3 raw text element names.
                if (rawTextElement.test(node.tagName)) {
                    // For raw text elements we need to split the text content on
                    // markers, create a Text node for each segment, and create
                    // a TemplatePart for each marker.
                    const strings = node.textContent.split(marker);
                    const lastIndex = strings.length - 1;
                    if (lastIndex > 0) {
                        node.textContent = trustedTypes ? trustedTypes.emptyScript : '';
                        // Generate a new text node for each literal section
                        // These nodes are also used as the markers for child parts
                        for(let i = 0; i < lastIndex; i++){
                            node.append(strings[i], createMarker());
                            // Walk past the marker node we just added
                            walker.nextNode();
                            parts.push({
                                type: CHILD_PART,
                                index: ++nodeIndex
                            });
                        }
                        // Note because this marker is added after the walker's current
                        // node, it will be walked to in the outer loop (and ignored), so
                        // we don't need to adjust nodeIndex here
                        node.append(strings[lastIndex], createMarker());
                    }
                }
            } else if (node.nodeType === 8) {
                const data = node.data;
                if (data === markerMatch) {
                    parts.push({
                        type: CHILD_PART,
                        index: nodeIndex
                    });
                } else {
                    let i = -1;
                    while((i = node.data.indexOf(marker, i + 1)) !== -1){
                        // Comment node has a binding marker inside, make an inactive part
                        // The binding won't work, but subsequent bindings will
                        parts.push({
                            type: COMMENT_PART,
                            index: nodeIndex
                        });
                        // Move to the end of the match
                        i += marker.length - 1;
                    }
                }
            }
            nodeIndex++;
        }
        {
            // If there was a duplicate attribute on a tag, then when the tag is
            // parsed into an element the attribute gets de-duplicated. We can detect
            // this mismatch if we haven't precisely consumed every attribute name
            // when preparing the template. This works because `attrNames` is built
            // from the template string and `attrNameIndex` comes from processing the
            // resulting DOM.
            if (attrNames.length !== attrNameIndex) {
                throw new Error(`Detected duplicate attribute bindings. This occurs if your template ` + `has duplicate attributes on an element tag. For example ` + `"<input ?disabled=\${true} ?disabled=\${false}>" contains a ` + `duplicate "disabled" attribute. The error was detected in ` + `the following template: \n` + '`' + strings.join('${...}') + '`');
            }
        }
        // We could set walker.currentNode to another node here to prevent a memory
        // leak, but every time we prepare a template, we immediately render it
        // and re-use the walker in new TemplateInstance._clone().
        debugLogEvent && debugLogEvent({
            kind: 'template prep',
            template: this,
            clonableTemplate: this.el,
            parts: this.parts,
            strings
        });
    }
    // Overridden via `litHtmlPolyfillSupport` to provide platform support.
    /** @nocollapse */ static createElement(html, _options) {
        const el = d.createElement('template');
        el.innerHTML = html;
        return el;
    }
}
function resolveDirective(part, value, parent = part, attributeIndex) {
    // Bail early if the value is explicitly noChange. Note, this means any
    // nested directive is still attached and is not run.
    if (value === noChange) {
        return value;
    }
    let currentDirective = attributeIndex !== undefined ? parent.__directives?.[attributeIndex] : parent.__directive;
    const nextDirectiveConstructor = isPrimitive(value) ? undefined : value['_$litDirective$'];
    if (currentDirective?.constructor !== nextDirectiveConstructor) {
        // This property needs to remain unminified.
        currentDirective?.['_$notifyDirectiveConnectionChanged']?.(false);
        if (nextDirectiveConstructor === undefined) {
            currentDirective = undefined;
        } else {
            currentDirective = new nextDirectiveConstructor(part);
            currentDirective._$initialize(part, parent, attributeIndex);
        }
        if (attributeIndex !== undefined) {
            (parent.__directives ??= [])[attributeIndex] = currentDirective;
        } else {
            parent.__directive = currentDirective;
        }
    }
    if (currentDirective !== undefined) {
        value = resolveDirective(part, currentDirective._$resolve(part, value.values), currentDirective, attributeIndex);
    }
    return value;
}
/**
 * An updateable instance of a Template. Holds references to the Parts used to
 * update the template instance.
 */ class TemplateInstance {
    constructor(template, parent){
        this._$parts = [];
        /** @internal */ this._$disconnectableChildren = undefined;
        this._$template = template;
        this._$parent = parent;
    }
    // Called by ChildPart parentNode getter
    get parentNode() {
        return this._$parent.parentNode;
    }
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        return this._$parent._$isConnected;
    }
    // This method is separate from the constructor because we need to return a
    // DocumentFragment and we don't want to hold onto it with an instance field.
    _clone(options) {
        const { el: { content }, parts: parts } = this._$template;
        const fragment = (options?.creationScope ?? d).importNode(content, true);
        walker.currentNode = fragment;
        let node = walker.nextNode();
        let nodeIndex = 0;
        let partIndex = 0;
        let templatePart = parts[0];
        while(templatePart !== undefined){
            if (nodeIndex === templatePart.index) {
                let part;
                if (templatePart.type === CHILD_PART) {
                    part = new ChildPart(node, node.nextSibling, this, options);
                } else if (templatePart.type === ATTRIBUTE_PART) {
                    part = new templatePart.ctor(node, templatePart.name, templatePart.strings, this, options);
                } else if (templatePart.type === ELEMENT_PART) {
                    part = new ElementPart(node, this, options);
                }
                this._$parts.push(part);
                templatePart = parts[++partIndex];
            }
            if (nodeIndex !== templatePart?.index) {
                node = walker.nextNode();
                nodeIndex++;
            }
        }
        // We need to set the currentNode away from the cloned tree so that we
        // don't hold onto the tree even if the tree is detached and should be
        // freed.
        walker.currentNode = d;
        return fragment;
    }
    _update(values) {
        let i = 0;
        for (const part of this._$parts){
            if (part !== undefined) {
                debugLogEvent && debugLogEvent({
                    kind: 'set part',
                    part,
                    value: values[i],
                    valueIndex: i,
                    values,
                    templateInstance: this
                });
                if (part.strings !== undefined) {
                    part._$setValue(values, part, i);
                    // The number of values the part consumes is part.strings.length - 1
                    // since values are in between template spans. We increment i by 1
                    // later in the loop, so increment it by part.strings.length - 2 here
                    i += part.strings.length - 2;
                } else {
                    part._$setValue(values[i]);
                }
            }
            i++;
        }
    }
}
class ChildPart {
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        // ChildParts that are not at the root should always be created with a
        // parent; only RootChildNode's won't, so they return the local isConnected
        // state
        return this._$parent?._$isConnected ?? this.__isConnected;
    }
    constructor(startNode, endNode, parent, options){
        this.type = CHILD_PART;
        this._$committedValue = nothing;
        // The following fields will be patched onto ChildParts when required by
        // AsyncDirective
        /** @internal */ this._$disconnectableChildren = undefined;
        this._$startNode = startNode;
        this._$endNode = endNode;
        this._$parent = parent;
        this.options = options;
        // Note __isConnected is only ever accessed on RootParts (i.e. when there is
        // no _$parent); the value on a non-root-part is "don't care", but checking
        // for parent would be more code
        this.__isConnected = options?.isConnected ?? true;
        {
            // Explicitly initialize for consistent class shape.
            this._textSanitizer = undefined;
        }
    }
    /**
     * The parent node into which the part renders its content.
     *
     * A ChildPart's content consists of a range of adjacent child nodes of
     * `.parentNode`, possibly bordered by 'marker nodes' (`.startNode` and
     * `.endNode`).
     *
     * - If both `.startNode` and `.endNode` are non-null, then the part's content
     * consists of all siblings between `.startNode` and `.endNode`, exclusively.
     *
     * - If `.startNode` is non-null but `.endNode` is null, then the part's
     * content consists of all siblings following `.startNode`, up to and
     * including the last child of `.parentNode`. If `.endNode` is non-null, then
     * `.startNode` will always be non-null.
     *
     * - If both `.endNode` and `.startNode` are null, then the part's content
     * consists of all child nodes of `.parentNode`.
     */ get parentNode() {
        let parentNode = wrap(this._$startNode).parentNode;
        const parent = this._$parent;
        if (parent !== undefined && parentNode?.nodeType === 11 /* Node.DOCUMENT_FRAGMENT */ ) {
            // If the parentNode is a DocumentFragment, it may be because the DOM is
            // still in the cloned fragment during initial render; if so, get the real
            // parentNode the part will be committed into by asking the parent.
            parentNode = parent.parentNode;
        }
        return parentNode;
    }
    /**
     * The part's leading marker node, if any. See `.parentNode` for more
     * information.
     */ get startNode() {
        return this._$startNode;
    }
    /**
     * The part's trailing marker node, if any. See `.parentNode` for more
     * information.
     */ get endNode() {
        return this._$endNode;
    }
    _$setValue(value, directiveParent = this) {
        if (this.parentNode === null) {
            throw new Error(`This \`ChildPart\` has no \`parentNode\` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's \`innerHTML\` or \`textContent\` can do this.`);
        }
        value = resolveDirective(this, value, directiveParent);
        if (isPrimitive(value)) {
            // Non-rendering child values. It's important that these do not render
            // empty text nodes to avoid issues with preventing default <slot>
            // fallback content.
            if (value === nothing || value == null || value === '') {
                if (this._$committedValue !== nothing) {
                    debugLogEvent && debugLogEvent({
                        kind: 'commit nothing to child',
                        start: this._$startNode,
                        end: this._$endNode,
                        parent: this._$parent,
                        options: this.options
                    });
                    this._$clear();
                }
                this._$committedValue = nothing;
            } else if (value !== this._$committedValue && value !== noChange) {
                this._commitText(value);
            }
        // This property needs to remain unminified.
        } else if (value['_$litType$'] !== undefined) {
            this._commitTemplateResult(value);
        } else if (value.nodeType !== undefined) {
            if (this.options?.host === value) {
                this._commitText(`[probable mistake: rendered a template's host in itself ` + `(commonly caused by writing \${this} in a template]`);
                console.warn(`Attempted to render the template host`, value, `inside itself. This is almost always a mistake, and in dev mode `, `we render some warning text. In production however, we'll `, `render it, which will usually result in an error, and sometimes `, `in the element disappearing from the DOM.`);
                return;
            }
            this._commitNode(value);
        } else if (isIterable(value)) {
            this._commitIterable(value);
        } else {
            // Fallback, will render the string representation
            this._commitText(value);
        }
    }
    _insert(node) {
        return wrap(wrap(this._$startNode).parentNode).insertBefore(node, this._$endNode);
    }
    _commitNode(value) {
        if (this._$committedValue !== value) {
            this._$clear();
            if (sanitizerFactoryInternal !== noopSanitizer) {
                const parentNodeName = this._$startNode.parentNode?.nodeName;
                if (parentNodeName === 'STYLE' || parentNodeName === 'SCRIPT') {
                    let message = 'Forbidden';
                    {
                        if (parentNodeName === 'STYLE') {
                            message = `Lit does not support binding inside style nodes. ` + `This is a security risk, as style injection attacks can ` + `exfiltrate data and spoof UIs. ` + `Consider instead using css\`...\` literals ` + `to compose styles, and do dynamic styling with ` + `css custom properties, ::parts, <slot>s, ` + `and by mutating the DOM rather than stylesheets.`;
                        } else {
                            message = `Lit does not support binding inside script nodes. ` + `This is a security risk, as it could allow arbitrary ` + `code execution.`;
                        }
                    }
                    throw new Error(message);
                }
            }
            debugLogEvent && debugLogEvent({
                kind: 'commit node',
                start: this._$startNode,
                parent: this._$parent,
                value: value,
                options: this.options
            });
            this._$committedValue = this._insert(value);
        }
    }
    _commitText(value) {
        // If the committed value is a primitive it means we called _commitText on
        // the previous render, and we know that this._$startNode.nextSibling is a
        // Text node. We can now just replace the text content (.data) of the node.
        if (this._$committedValue !== nothing && isPrimitive(this._$committedValue)) {
            const node = wrap(this._$startNode).nextSibling;
            {
                if (this._textSanitizer === undefined) {
                    this._textSanitizer = createSanitizer(node, 'data', 'property');
                }
                value = this._textSanitizer(value);
            }
            debugLogEvent && debugLogEvent({
                kind: 'commit text',
                node,
                value,
                options: this.options
            });
            node.data = value;
        } else {
            {
                const textNode = d.createTextNode('');
                this._commitNode(textNode);
                // When setting text content, for security purposes it matters a lot
                // what the parent is. For example, <style> and <script> need to be
                // handled with care, while <span> does not. So first we need to put a
                // text node into the document, then we can sanitize its content.
                if (this._textSanitizer === undefined) {
                    this._textSanitizer = createSanitizer(textNode, 'data', 'property');
                }
                value = this._textSanitizer(value);
                debugLogEvent && debugLogEvent({
                    kind: 'commit text',
                    node: textNode,
                    value,
                    options: this.options
                });
                textNode.data = value;
            }
        }
        this._$committedValue = value;
    }
    _commitTemplateResult(result) {
        // This property needs to remain unminified.
        const { values, ['_$litType$']: type } = result;
        // If $litType$ is a number, result is a plain TemplateResult and we get
        // the template from the template cache. If not, result is a
        // CompiledTemplateResult and _$litType$ is a CompiledTemplate and we need
        // to create the <template> element the first time we see it.
        const template = typeof type === 'number' ? this._$getTemplate(result) : (type.el === undefined && (type.el = Template.createElement(trustFromTemplateString(type.h, type.h[0]), this.options)), type);
        if (this._$committedValue?._$template === template) {
            debugLogEvent && debugLogEvent({
                kind: 'template updating',
                template,
                instance: this._$committedValue,
                parts: this._$committedValue._$parts,
                options: this.options,
                values
            });
            this._$committedValue._update(values);
        } else {
            const instance = new TemplateInstance(template, this);
            const fragment = instance._clone(this.options);
            debugLogEvent && debugLogEvent({
                kind: 'template instantiated',
                template,
                instance,
                parts: instance._$parts,
                options: this.options,
                fragment,
                values
            });
            instance._update(values);
            debugLogEvent && debugLogEvent({
                kind: 'template instantiated and updated',
                template,
                instance,
                parts: instance._$parts,
                options: this.options,
                fragment,
                values
            });
            this._commitNode(fragment);
            this._$committedValue = instance;
        }
    }
    // Overridden via `litHtmlPolyfillSupport` to provide platform support.
    /** @internal */ _$getTemplate(result) {
        let template = templateCache.get(result.strings);
        if (template === undefined) {
            templateCache.set(result.strings, template = new Template(result));
        }
        return template;
    }
    _commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If value is an array, then the previous render was of an
        // iterable and value will contain the ChildParts from the previous
        // render. If value is not an array, clear this part and make a new
        // array for ChildParts.
        if (!isArray(this._$committedValue)) {
            this._$committedValue = [];
            this._$clear();
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this._$committedValue;
        let partIndex = 0;
        let itemPart;
        for (const item of value){
            if (partIndex === itemParts.length) {
                // If no existing part, create a new one
                // TODO (justinfagnani): test perf impact of always creating two parts
                // instead of sharing parts between nodes
                // https://github.com/lit/lit/issues/1266
                itemParts.push(itemPart = new ChildPart(this._insert(createMarker()), this._insert(createMarker()), this, this.options));
            } else {
                // Reuse an existing part
                itemPart = itemParts[partIndex];
            }
            itemPart._$setValue(item);
            partIndex++;
        }
        if (partIndex < itemParts.length) {
            // itemParts always have end nodes
            this._$clear(itemPart && wrap(itemPart._$endNode).nextSibling, partIndex);
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
        }
    }
    /**
     * Removes the nodes contained within this Part from the DOM.
     *
     * @param start Start node to clear from, for clearing a subset of the part's
     *     DOM (used when truncating iterables)
     * @param from  When `start` is specified, the index within the iterable from
     *     which ChildParts are being removed, used for disconnecting directives
     *     in those Parts.
     *
     * @internal
     */ _$clear(start = wrap(this._$startNode).nextSibling, from) {
        this._$notifyConnectionChanged?.(false, true, from);
        while(start !== this._$endNode){
            // The non-null assertion is safe because if _$startNode.nextSibling is
            // null, then _$endNode is also null, and we would not have entered this
            // loop.
            const n = wrap(start).nextSibling;
            wrap(start).remove();
            start = n;
        }
    }
    /**
     * Implementation of RootPart's `isConnected`. Note that this method
     * should only be called on `RootPart`s (the `ChildPart` returned from a
     * top-level `render()` call). It has no effect on non-root ChildParts.
     * @param isConnected Whether to set
     * @internal
     */ setConnected(isConnected) {
        if (this._$parent === undefined) {
            this.__isConnected = isConnected;
            this._$notifyConnectionChanged?.(isConnected);
        } else {
            throw new Error('part.setConnected() may only be called on a ' + 'RootPart returned from render().');
        }
    }
}
class AttributePart {
    get tagName() {
        return this.element.tagName;
    }
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        return this._$parent._$isConnected;
    }
    constructor(element, name, strings, parent, options){
        this.type = ATTRIBUTE_PART;
        /** @internal */ this._$committedValue = nothing;
        /** @internal */ this._$disconnectableChildren = undefined;
        this.element = element;
        this.name = name;
        this._$parent = parent;
        this.options = options;
        if (strings.length > 2 || strings[0] !== '' || strings[1] !== '') {
            this._$committedValue = new Array(strings.length - 1).fill(new String());
            this.strings = strings;
        } else {
            this._$committedValue = nothing;
        }
        {
            this._sanitizer = undefined;
        }
    }
    /**
     * Sets the value of this part by resolving the value from possibly multiple
     * values and static strings and committing it to the DOM.
     * If this part is single-valued, `this._strings` will be undefined, and the
     * method will be called with a single value argument. If this part is
     * multi-value, `this._strings` will be defined, and the method is called
     * with the value array of the part's owning TemplateInstance, and an offset
     * into the value array from which the values should be read.
     * This method is overloaded this way to eliminate short-lived array slices
     * of the template instance values, and allow a fast-path for single-valued
     * parts.
     *
     * @param value The part value, or an array of values for multi-valued parts
     * @param valueIndex the index to start reading values from. `undefined` for
     *   single-valued parts
     * @param noCommit causes the part to not commit its value to the DOM. Used
     *   in hydration to prime attribute parts with their first-rendered value,
     *   but not set the attribute, and in SSR to no-op the DOM operation and
     *   capture the value for serialization.
     *
     * @internal
     */ _$setValue(value, directiveParent = this, valueIndex, noCommit) {
        const strings = this.strings;
        // Whether any of the values has changed, for dirty-checking
        let change = false;
        if (strings === undefined) {
            // Single-value binding case
            value = resolveDirective(this, value, directiveParent, 0);
            change = !isPrimitive(value) || value !== this._$committedValue && value !== noChange;
            if (change) {
                this._$committedValue = value;
            }
        } else {
            // Interpolation case
            const values = value;
            value = strings[0];
            let i, v;
            for(i = 0; i < strings.length - 1; i++){
                v = resolveDirective(this, values[valueIndex + i], directiveParent, i);
                if (v === noChange) {
                    // If the user-provided value is `noChange`, use the previous value
                    v = this._$committedValue[i];
                }
                change ||= !isPrimitive(v) || v !== this._$committedValue[i];
                if (v === nothing) {
                    value = nothing;
                } else if (value !== nothing) {
                    value += (v ?? '') + strings[i + 1];
                }
                // We always record each value, even if one is `nothing`, for future
                // change detection.
                this._$committedValue[i] = v;
            }
        }
        if (change && !noCommit) {
            this._commitValue(value);
        }
    }
    /** @internal */ _commitValue(value) {
        if (value === nothing) {
            wrap(this.element).removeAttribute(this.name);
        } else {
            {
                if (this._sanitizer === undefined) {
                    this._sanitizer = sanitizerFactoryInternal(this.element, this.name, 'attribute');
                }
                value = this._sanitizer(value ?? '');
            }
            debugLogEvent && debugLogEvent({
                kind: 'commit attribute',
                element: this.element,
                name: this.name,
                value,
                options: this.options
            });
            wrap(this.element).setAttribute(this.name, value ?? '');
        }
    }
}
class PropertyPart extends AttributePart {
    constructor(){
        super(...arguments);
        this.type = PROPERTY_PART;
    }
    /** @internal */ _commitValue(value) {
        {
            if (this._sanitizer === undefined) {
                this._sanitizer = sanitizerFactoryInternal(this.element, this.name, 'property');
            }
            value = this._sanitizer(value);
        }
        debugLogEvent && debugLogEvent({
            kind: 'commit property',
            element: this.element,
            name: this.name,
            value,
            options: this.options
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.element[this.name] = value === nothing ? undefined : value;
    }
}
class BooleanAttributePart extends AttributePart {
    constructor(){
        super(...arguments);
        this.type = BOOLEAN_ATTRIBUTE_PART;
    }
    /** @internal */ _commitValue(value) {
        debugLogEvent && debugLogEvent({
            kind: 'commit boolean attribute',
            element: this.element,
            name: this.name,
            value: !!(value && value !== nothing),
            options: this.options
        });
        wrap(this.element).toggleAttribute(this.name, !!value && value !== nothing);
    }
}
class EventPart extends AttributePart {
    constructor(element, name, strings, parent, options){
        super(element, name, strings, parent, options);
        this.type = EVENT_PART;
        if (this.strings !== undefined) {
            throw new Error(`A \`<${element.localName}>\` has a \`@${name}=...\` listener with ` + 'invalid content. Event listeners in templates must have exactly ' + 'one expression and no surrounding text.');
        }
    }
    // EventPart does not use the base _$setValue/_resolveValue implementation
    // since the dirty checking is more complex
    /** @internal */ _$setValue(newListener, directiveParent = this) {
        newListener = resolveDirective(this, newListener, directiveParent, 0) ?? nothing;
        if (newListener === noChange) {
            return;
        }
        const oldListener = this._$committedValue;
        // If the new value is nothing or any options change we have to remove the
        // part as a listener.
        const shouldRemoveListener = newListener === nothing && oldListener !== nothing || newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive;
        // If the new value is not nothing and we removed the listener, we have
        // to add the part as a listener.
        const shouldAddListener = newListener !== nothing && (oldListener === nothing || shouldRemoveListener);
        debugLogEvent && debugLogEvent({
            kind: 'commit event listener',
            element: this.element,
            name: this.name,
            value: newListener,
            options: this.options,
            removeListener: shouldRemoveListener,
            addListener: shouldAddListener,
            oldListener
        });
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.name, this, oldListener);
        }
        if (shouldAddListener) {
            this.element.addEventListener(this.name, this, newListener);
        }
        this._$committedValue = newListener;
    }
    handleEvent(event) {
        if (typeof this._$committedValue === 'function') {
            this._$committedValue.call(this.options?.host ?? this.element, event);
        } else {
            this._$committedValue.handleEvent(event);
        }
    }
}
class ElementPart {
    constructor(element, parent, options){
        this.element = element;
        this.type = ELEMENT_PART;
        /** @internal */ this._$disconnectableChildren = undefined;
        this._$parent = parent;
        this.options = options;
    }
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        return this._$parent._$isConnected;
    }
    _$setValue(value) {
        debugLogEvent && debugLogEvent({
            kind: 'commit to element binding',
            element: this.element,
            value,
            options: this.options
        });
        resolveDirective(this, value);
    }
}
/**
 * END USERS SHOULD NOT RELY ON THIS OBJECT.
 *
 * Private exports for use by other Lit packages, not intended for use by
 * external users.
 *
 * We currently do not make a mangled rollup build of the lit-ssr code. In order
 * to keep a number of (otherwise private) top-level exports mangled in the
 * client side code, we export a _$LH object containing those members (or
 * helper methods for accessing private fields of those members), and then
 * re-export them for use in lit-ssr. This keeps lit-ssr agnostic to whether the
 * client-side code is being used in `dev` mode or `prod` mode.
 *
 * This has a unique name, to disambiguate it from private exports in
 * lit-element, which re-exports all of lit-html.
 *
 * @private
 */ const _$LH = {
    // Used in lit-ssr
    _boundAttributeSuffix: boundAttributeSuffix,
    _marker: marker,
    _markerMatch: markerMatch,
    _HTML_RESULT: HTML_RESULT,
    _getTemplateHtml: getTemplateHtml,
    // Used in tests and private-ssr-support
    _TemplateInstance: TemplateInstance,
    _isIterable: isIterable,
    _resolveDirective: resolveDirective,
    _ChildPart: ChildPart,
    _AttributePart: AttributePart,
    _BooleanAttributePart: BooleanAttributePart,
    _EventPart: EventPart,
    _PropertyPart: PropertyPart,
    _ElementPart: ElementPart
};
// Apply polyfills if available
const polyfillSupport = global.litHtmlPolyfillSupportDevMode;
polyfillSupport?.(Template, ChildPart);
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
(global.litHtmlVersions ??= []).push('3.3.2');
if (global.litHtmlVersions.length > 1) {
    queueMicrotask(()=>{
        issueWarning('multiple-versions', `Multiple versions of Lit loaded. ` + `Loading multiple versions is not recommended.`);
    });
}
/**
 * Renders a value, usually a lit-html TemplateResult, to the container.
 *
 * This example renders the text "Hello, Zoe!" inside a paragraph tag, appending
 * it to the container `document.body`.
 *
 * ```js
 * import {html, render} from 'lit';
 *
 * const name = "Zoe";
 * render(html`<p>Hello, ${name}!</p>`, document.body);
 * ```
 *
 * @param value Any [renderable
 *   value](https://lit.dev/docs/templates/expressions/#child-expressions),
 *   typically a {@linkcode TemplateResult} created by evaluating a template tag
 *   like {@linkcode html} or {@linkcode svg}.
 * @param container A DOM container to render to. The first render will append
 *   the rendered value to the container, and subsequent renders will
 *   efficiently update the rendered value if the same result type was
 *   previously rendered there.
 * @param options See {@linkcode RenderOptions} for options documentation.
 * @see
 * {@link https://lit.dev/docs/libraries/standalone-templates/#rendering-lit-html-templates| Rendering Lit HTML Templates}
 */ const render = (value, container, options)=>{
    if (container == null) {
        // Give a clearer error message than
        //     Uncaught TypeError: Cannot read properties of null (reading
        //     '_$litPart$')
        // which reads like an internal Lit error.
        throw new TypeError(`The container to render into may not be ${container}`);
    }
    const renderId = debugLogRenderId++;
    const partOwnerNode = options?.renderBefore ?? container;
    // This property needs to remain unminified.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let part = partOwnerNode['_$litPart$'];
    debugLogEvent && debugLogEvent({
        kind: 'begin render',
        id: renderId,
        value,
        container,
        options,
        part
    });
    if (part === undefined) {
        const endNode = options?.renderBefore ?? null;
        // This property needs to remain unminified.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        partOwnerNode['_$litPart$'] = part = new ChildPart(container.insertBefore(createMarker(), endNode), endNode, undefined, options ?? {});
    }
    part._$setValue(value);
    debugLogEvent && debugLogEvent({
        kind: 'end render',
        id: renderId,
        value,
        container,
        options,
        part
    });
    return part;
};
{
    render.setSanitizer = setSanitizer;
    render.createSanitizer = createSanitizer;
    {
        render._testOnlyClearSanitizerFactoryDoNotCallOrElse = _testOnlyClearSanitizerFactoryDoNotCallOrElse;
    }
};
 //# sourceMappingURL=lit-html.js.map
}),
"[project]/Desktop/frontend/node_modules/lit-html/node/development/is-server.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isServer",
    ()=>isServer
]);
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ /**
 * @fileoverview
 *
 * This file exports a boolean const whose value will depend on what environment
 * the module is being imported from.
 */ const NODE_MODE = true;
/**
 * A boolean that will be `true` in server environments like Node, and `false`
 * in browser environments. Note that your server environment or toolchain must
 * support the `"node"` export condition for this to be `true`.
 *
 * This can be used when authoring components to change behavior based on
 * whether or not the component is executing in an SSR context.
 */ const isServer = NODE_MODE;
;
 //# sourceMappingURL=is-server.js.map
}),
"[project]/Desktop/frontend/node_modules/lit-element/development/lit-element.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LitElement",
    ()=>LitElement,
    "_$LE",
    ()=>_$LE
]);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ /**
 * The main LitElement module, which defines the {@linkcode LitElement} base
 * class and related APIs.
 *
 * LitElement components can define a template and a set of observed
 * properties. Changing an observed property triggers a re-render of the
 * element.
 *
 * Import {@linkcode LitElement} and {@linkcode html} from this module to
 * create a component:
 *
 *  ```js
 * import {LitElement, html} from 'lit-element';
 *
 * class MyElement extends LitElement {
 *
 *   // Declare observed properties
 *   static get properties() {
 *     return {
 *       adjective: {}
 *     }
 *   }
 *
 *   constructor() {
 *     this.adjective = 'awesome';
 *   }
 *
 *   // Define the element's template
 *   render() {
 *     return html`<p>your ${adjective} template here</p>`;
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 * ```
 *
 * `LitElement` extends {@linkcode ReactiveElement} and adds lit-html
 * templating. The `ReactiveElement` class is provided for users that want to
 * build their own custom element base classes that don't use lit-html.
 *
 * @packageDocumentation
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@lit/reactive-element/node/development/reactive-element.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$lit$2d$html$2f$node$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/lit-html/node/development/lit-html.js [app-ssr] (ecmascript)");
;
;
;
;
/*
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */ /*@__INLINE__*/ const JSCompiler_renameProperty = (prop, _obj)=>prop;
const DEV_MODE = true;
// Allows minifiers to rename references to globalThis
const global = globalThis;
let issueWarning;
if ("TURBOPACK compile-time truthy", 1) {
    // Ensure warnings are issued only 1x, even if multiple versions of Lit
    // are loaded.
    global.litIssuedWarnings ??= new Set();
    /**
     * Issue a warning if we haven't already, based either on `code` or `warning`.
     * Warnings are disabled automatically only by `warning`; disabling via `code`
     * can be done by users.
     */ issueWarning = (code, warning)=>{
        warning += ` See https://lit.dev/msg/${code} for more information.`;
        if (!global.litIssuedWarnings.has(warning) && !global.litIssuedWarnings.has(code)) {
            console.warn(warning);
            global.litIssuedWarnings.add(warning);
        }
    };
}
class LitElement extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ReactiveElement"] {
    constructor(){
        super(...arguments);
        /**
         * @category rendering
         */ this.renderOptions = {
            host: this
        };
        this.__childPart = undefined;
    }
    /**
     * @category rendering
     */ createRenderRoot() {
        const renderRoot = super.createRenderRoot();
        // When adoptedStyleSheets are shimmed, they are inserted into the
        // shadowRoot by createRenderRoot. Adjust the renderBefore node so that
        // any styles in Lit content render before adoptedStyleSheets. This is
        // important so that adoptedStyleSheets have precedence over styles in
        // the shadowRoot.
        this.renderOptions.renderBefore ??= renderRoot.firstChild;
        return renderRoot;
    }
    /**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * @param changedProperties Map of changed properties with old values
     * @category updates
     */ update(changedProperties) {
        // Setting properties in `render` should not trigger an update. Since
        // updates are allowed after super.update, it's important to call `render`
        // before that.
        const value = this.render();
        if (!this.hasUpdated) {
            this.renderOptions.isConnected = this.isConnected;
        }
        super.update(changedProperties);
        this.__childPart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$lit$2d$html$2f$node$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["render"])(value, this.renderRoot, this.renderOptions);
    }
    /**
     * Invoked when the component is added to the document's DOM.
     *
     * In `connectedCallback()` you should setup tasks that should only occur when
     * the element is connected to the document. The most common of these is
     * adding event listeners to nodes external to the element, like a keydown
     * event handler added to the window.
     *
     * ```ts
     * connectedCallback() {
     *   super.connectedCallback();
     *   addEventListener('keydown', this._handleKeydown);
     * }
     * ```
     *
     * Typically, anything done in `connectedCallback()` should be undone when the
     * element is disconnected, in `disconnectedCallback()`.
     *
     * @category lifecycle
     */ connectedCallback() {
        super.connectedCallback();
        this.__childPart?.setConnected(true);
    }
    /**
     * Invoked when the component is removed from the document's DOM.
     *
     * This callback is the main signal to the element that it may no longer be
     * used. `disconnectedCallback()` should ensure that nothing is holding a
     * reference to the element (such as event listeners added to nodes external
     * to the element), so that it is free to be garbage collected.
     *
     * ```ts
     * disconnectedCallback() {
     *   super.disconnectedCallback();
     *   window.removeEventListener('keydown', this._handleKeydown);
     * }
     * ```
     *
     * An element may be re-connected after being disconnected.
     *
     * @category lifecycle
     */ disconnectedCallback() {
        super.disconnectedCallback();
        this.__childPart?.setConnected(false);
    }
    /**
     * Invoked on each update to perform rendering tasks. This method may return
     * any value renderable by lit-html's `ChildPart` - typically a
     * `TemplateResult`. Setting properties inside this method will *not* trigger
     * the element to update.
     * @category rendering
     */ render() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$lit$2d$html$2f$node$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["noChange"];
    }
}
// This property needs to remain unminified.
LitElement['_$litElement$'] = true;
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 *
 * Note this property name is a string to prevent breaking Closure JS Compiler
 * optimizations. See @lit/reactive-element for more information.
 */ LitElement[JSCompiler_renameProperty('finalized', LitElement)] = true;
// Install hydration if available
global.litElementHydrateSupport?.({
    LitElement
});
// Apply polyfills if available
const polyfillSupport = ("TURBOPACK compile-time truthy", 1) ? global.litElementPolyfillSupportDevMode : "TURBOPACK unreachable";
polyfillSupport?.({
    LitElement
});
const _$LE = {
    _$attributeToProperty: (el, name, value)=>{
        // eslint-disable-next-line
        el._$attributeToProperty(name, value);
    },
    // eslint-disable-next-line
    _$changedProperties: (el)=>el._$changedProperties
};
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for LitElement usage.
(global.litElementVersions ??= []).push('4.2.2');
if (DEV_MODE && global.litElementVersions.length > 1) {
    queueMicrotask(()=>{
        issueWarning('multiple-versions', `Multiple versions of Lit loaded. Loading multiple versions ` + `is not recommended.`);
    });
} //# sourceMappingURL=lit-element.js.map
}),
"[project]/Desktop/frontend/node_modules/lit/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f40$lit$2f$reactive$2d$element$2f$node$2f$development$2f$reactive$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/@lit/reactive-element/node/development/reactive-element.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$lit$2d$html$2f$node$2f$development$2f$lit$2d$html$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/lit-html/node/development/lit-html.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$lit$2d$element$2f$development$2f$lit$2d$element$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/lit-element/development/lit-element.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$frontend$2f$node_modules$2f$lit$2d$html$2f$node$2f$development$2f$is$2d$server$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/frontend/node_modules/lit-html/node/development/is-server.js [app-ssr] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
;
;
}),
"[project]/Desktop/frontend/node_modules/dayjs/dayjs.min.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

!function(t, e) {
    ("TURBOPACK compile-time truthy", 1) ? module.exports = e() : "TURBOPACK unreachable";
}(/*TURBOPACK member replacement*/ __turbopack_context__.e, function() {
    "use strict";
    var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = {
        name: "en",
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        ordinal: function(t) {
            var e = [
                "th",
                "st",
                "nd",
                "rd"
            ], n = t % 100;
            return "[" + t + (e[(n - 20) % 10] || e[n] || e[0]) + "]";
        }
    }, m = function(t, e, n) {
        var r = String(t);
        return !r || r.length >= e ? t : "" + Array(e + 1 - r.length).join(n) + t;
    }, v = {
        s: m,
        z: function(t) {
            var e = -t.utcOffset(), n = Math.abs(e), r = Math.floor(n / 60), i = n % 60;
            return (e <= 0 ? "+" : "-") + m(r, 2, "0") + ":" + m(i, 2, "0");
        },
        m: function t(e, n) {
            if (e.date() < n.date()) return -t(n, e);
            var r = 12 * (n.year() - e.year()) + (n.month() - e.month()), i = e.clone().add(r, c), s = n - i < 0, u = e.clone().add(r + (s ? -1 : 1), c);
            return +(-(r + (n - i) / (s ? i - u : u - i)) || 0);
        },
        a: function(t) {
            return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
        },
        p: function(t) {
            return ({
                M: c,
                y: h,
                w: o,
                d: a,
                D: d,
                h: u,
                m: s,
                s: i,
                ms: r,
                Q: f
            })[t] || String(t || "").toLowerCase().replace(/s$/, "");
        },
        u: function(t) {
            return void 0 === t;
        }
    }, g = "en", D = {};
    D[g] = M;
    var p = "$isDayjsObject", S = function(t) {
        return t instanceof _ || !(!t || !t[p]);
    }, w = function t(e, n, r) {
        var i;
        if (!e) return g;
        if ("string" == typeof e) {
            var s = e.toLowerCase();
            D[s] && (i = s), n && (D[s] = n, i = s);
            var u = e.split("-");
            if (!i && u.length > 1) return t(u[0]);
        } else {
            var a = e.name;
            D[a] = e, i = a;
        }
        return !r && i && (g = i), i || !r && g;
    }, O = function(t, e) {
        if (S(t)) return t.clone();
        var n = "object" == typeof e ? e : {};
        return n.date = t, n.args = arguments, new _(n);
    }, b = v;
    b.l = w, b.i = S, b.w = function(t, e) {
        return O(t, {
            locale: e.$L,
            utc: e.$u,
            x: e.$x,
            $offset: e.$offset
        });
    };
    var _ = function() {
        function M(t) {
            this.$L = w(t.locale, null, !0), this.parse(t), this.$x = this.$x || t.x || {}, this[p] = !0;
        }
        var m = M.prototype;
        return m.parse = function(t) {
            this.$d = function(t) {
                var e = t.date, n = t.utc;
                if (null === e) return new Date(NaN);
                if (b.u(e)) return new Date;
                if (e instanceof Date) return new Date(e);
                if ("string" == typeof e && !/Z$/i.test(e)) {
                    var r = e.match($);
                    if (r) {
                        var i = r[2] - 1 || 0, s = (r[7] || "0").substring(0, 3);
                        return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s);
                    }
                }
                return new Date(e);
            }(t), this.init();
        }, m.init = function() {
            var t = this.$d;
            this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
        }, m.$utils = function() {
            return b;
        }, m.isValid = function() {
            return !(this.$d.toString() === l);
        }, m.isSame = function(t, e) {
            var n = O(t);
            return this.startOf(e) <= n && n <= this.endOf(e);
        }, m.isAfter = function(t, e) {
            return O(t) < this.startOf(e);
        }, m.isBefore = function(t, e) {
            return this.endOf(e) < O(t);
        }, m.$g = function(t, e, n) {
            return b.u(t) ? this[e] : this.set(n, t);
        }, m.unix = function() {
            return Math.floor(this.valueOf() / 1e3);
        }, m.valueOf = function() {
            return this.$d.getTime();
        }, m.startOf = function(t, e) {
            var n = this, r = !!b.u(e) || e, f = b.p(t), l = function(t, e) {
                var i = b.w(n.$u ? Date.UTC(n.$y, e, t) : new Date(n.$y, e, t), n);
                return r ? i : i.endOf(a);
            }, $ = function(t, e) {
                return b.w(n.toDate()[t].apply(n.toDate("s"), (r ? [
                    0,
                    0,
                    0,
                    0
                ] : [
                    23,
                    59,
                    59,
                    999
                ]).slice(e)), n);
            }, y = this.$W, M = this.$M, m = this.$D, v = "set" + (this.$u ? "UTC" : "");
            switch(f){
                case h:
                    return r ? l(1, 0) : l(31, 11);
                case c:
                    return r ? l(1, M) : l(0, M + 1);
                case o:
                    var g = this.$locale().weekStart || 0, D = (y < g ? y + 7 : y) - g;
                    return l(r ? m - D : m + (6 - D), M);
                case a:
                case d:
                    return $(v + "Hours", 0);
                case u:
                    return $(v + "Minutes", 1);
                case s:
                    return $(v + "Seconds", 2);
                case i:
                    return $(v + "Milliseconds", 3);
                default:
                    return this.clone();
            }
        }, m.endOf = function(t) {
            return this.startOf(t, !1);
        }, m.$set = function(t, e) {
            var n, o = b.p(t), f = "set" + (this.$u ? "UTC" : ""), l = (n = {}, n[a] = f + "Date", n[d] = f + "Date", n[c] = f + "Month", n[h] = f + "FullYear", n[u] = f + "Hours", n[s] = f + "Minutes", n[i] = f + "Seconds", n[r] = f + "Milliseconds", n)[o], $ = o === a ? this.$D + (e - this.$W) : e;
            if (o === c || o === h) {
                var y = this.clone().set(d, 1);
                y.$d[l]($), y.init(), this.$d = y.set(d, Math.min(this.$D, y.daysInMonth())).$d;
            } else l && this.$d[l]($);
            return this.init(), this;
        }, m.set = function(t, e) {
            return this.clone().$set(t, e);
        }, m.get = function(t) {
            return this[b.p(t)]();
        }, m.add = function(r, f) {
            var d, l = this;
            r = Number(r);
            var $ = b.p(f), y = function(t) {
                var e = O(l);
                return b.w(e.date(e.date() + Math.round(t * r)), l);
            };
            if ($ === c) return this.set(c, this.$M + r);
            if ($ === h) return this.set(h, this.$y + r);
            if ($ === a) return y(1);
            if ($ === o) return y(7);
            var M = (d = {}, d[s] = e, d[u] = n, d[i] = t, d)[$] || 1, m = this.$d.getTime() + r * M;
            return b.w(m, this);
        }, m.subtract = function(t, e) {
            return this.add(-1 * t, e);
        }, m.format = function(t) {
            var e = this, n = this.$locale();
            if (!this.isValid()) return n.invalidDate || l;
            var r = t || "YYYY-MM-DDTHH:mm:ssZ", i = b.z(this), s = this.$H, u = this.$m, a = this.$M, o = n.weekdays, c = n.months, f = n.meridiem, h = function(t, n, i, s) {
                return t && (t[n] || t(e, r)) || i[n].slice(0, s);
            }, d = function(t) {
                return b.s(s % 12 || 12, t, "0");
            }, $ = f || function(t, e, n) {
                var r = t < 12 ? "AM" : "PM";
                return n ? r.toLowerCase() : r;
            };
            return r.replace(y, function(t, r) {
                return r || function(t) {
                    switch(t){
                        case "YY":
                            return String(e.$y).slice(-2);
                        case "YYYY":
                            return b.s(e.$y, 4, "0");
                        case "M":
                            return a + 1;
                        case "MM":
                            return b.s(a + 1, 2, "0");
                        case "MMM":
                            return h(n.monthsShort, a, c, 3);
                        case "MMMM":
                            return h(c, a);
                        case "D":
                            return e.$D;
                        case "DD":
                            return b.s(e.$D, 2, "0");
                        case "d":
                            return String(e.$W);
                        case "dd":
                            return h(n.weekdaysMin, e.$W, o, 2);
                        case "ddd":
                            return h(n.weekdaysShort, e.$W, o, 3);
                        case "dddd":
                            return o[e.$W];
                        case "H":
                            return String(s);
                        case "HH":
                            return b.s(s, 2, "0");
                        case "h":
                            return d(1);
                        case "hh":
                            return d(2);
                        case "a":
                            return $(s, u, !0);
                        case "A":
                            return $(s, u, !1);
                        case "m":
                            return String(u);
                        case "mm":
                            return b.s(u, 2, "0");
                        case "s":
                            return String(e.$s);
                        case "ss":
                            return b.s(e.$s, 2, "0");
                        case "SSS":
                            return b.s(e.$ms, 3, "0");
                        case "Z":
                            return i;
                    }
                    return null;
                }(t) || i.replace(":", "");
            });
        }, m.utcOffset = function() {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m.diff = function(r, d, l) {
            var $, y = this, M = b.p(d), m = O(r), v = (m.utcOffset() - this.utcOffset()) * e, g = this - m, D = function() {
                return b.m(y, m);
            };
            switch(M){
                case h:
                    $ = D() / 12;
                    break;
                case c:
                    $ = D();
                    break;
                case f:
                    $ = D() / 3;
                    break;
                case o:
                    $ = (g - v) / 6048e5;
                    break;
                case a:
                    $ = (g - v) / 864e5;
                    break;
                case u:
                    $ = g / n;
                    break;
                case s:
                    $ = g / e;
                    break;
                case i:
                    $ = g / t;
                    break;
                default:
                    $ = g;
            }
            return l ? $ : b.a($);
        }, m.daysInMonth = function() {
            return this.endOf(c).$D;
        }, m.$locale = function() {
            return D[this.$L];
        }, m.locale = function(t, e) {
            if (!t) return this.$L;
            var n = this.clone(), r = w(t, e, !0);
            return r && (n.$L = r), n;
        }, m.clone = function() {
            return b.w(this.$d, this);
        }, m.toDate = function() {
            return new Date(this.valueOf());
        }, m.toJSON = function() {
            return this.isValid() ? this.toISOString() : null;
        }, m.toISOString = function() {
            return this.$d.toISOString();
        }, m.toString = function() {
            return this.$d.toUTCString();
        }, M;
    }(), k = _.prototype;
    return O.prototype = k, [
        [
            "$ms",
            r
        ],
        [
            "$s",
            i
        ],
        [
            "$m",
            s
        ],
        [
            "$H",
            u
        ],
        [
            "$W",
            a
        ],
        [
            "$M",
            c
        ],
        [
            "$y",
            h
        ],
        [
            "$D",
            d
        ]
    ].forEach(function(t) {
        k[t[1]] = function(e) {
            return this.$g(e, t[0], t[1]);
        };
    }), O.extend = function(t, e) {
        return t.$i || (t(e, _, O), t.$i = !0), O;
    }, O.locale = w, O.isDayjs = S, O.unix = function(t) {
        return O(1e3 * t);
    }, O.en = D[g], O.Ls = D, O.p = {}, O;
});
}),
"[project]/Desktop/frontend/node_modules/dayjs/locale/en.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

!function(e, n) {
    ("TURBOPACK compile-time truthy", 1) ? module.exports = n() : "TURBOPACK unreachable";
}(/*TURBOPACK member replacement*/ __turbopack_context__.e, function() {
    "use strict";
    return {
        name: "en",
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        ordinal: function(e) {
            var n = [
                "th",
                "st",
                "nd",
                "rd"
            ], t = e % 100;
            return "[" + e + (n[(t - 20) % 10] || n[t] || n[0]) + "]";
        }
    };
});
}),
"[project]/Desktop/frontend/node_modules/dayjs/plugin/relativeTime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

!function(r, e) {
    ("TURBOPACK compile-time truthy", 1) ? module.exports = e() : "TURBOPACK unreachable";
}(/*TURBOPACK member replacement*/ __turbopack_context__.e, function() {
    "use strict";
    return function(r, e, t) {
        r = r || {};
        var n = e.prototype, o = {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        };
        function i(r, e, t, o) {
            return n.fromToBase(r, e, t, o);
        }
        t.en.relativeTime = o, n.fromToBase = function(e, n, i, d, u) {
            for(var f, a, s, l = i.$locale().relativeTime || o, h = r.thresholds || [
                {
                    l: "s",
                    r: 44,
                    d: "second"
                },
                {
                    l: "m",
                    r: 89
                },
                {
                    l: "mm",
                    r: 44,
                    d: "minute"
                },
                {
                    l: "h",
                    r: 89
                },
                {
                    l: "hh",
                    r: 21,
                    d: "hour"
                },
                {
                    l: "d",
                    r: 35
                },
                {
                    l: "dd",
                    r: 25,
                    d: "day"
                },
                {
                    l: "M",
                    r: 45
                },
                {
                    l: "MM",
                    r: 10,
                    d: "month"
                },
                {
                    l: "y",
                    r: 17
                },
                {
                    l: "yy",
                    d: "year"
                }
            ], m = h.length, c = 0; c < m; c += 1){
                var y = h[c];
                y.d && (f = d ? t(e).diff(i, y.d, !0) : i.diff(e, y.d, !0));
                var p = (r.rounding || Math.round)(Math.abs(f));
                if (s = f > 0, p <= y.r || !y.r) {
                    p <= 1 && c > 0 && (y = h[c - 1]);
                    var v = l[y.l];
                    u && (p = u("" + p)), a = "string" == typeof v ? v.replace("%d", p) : v(p, n, y.l, s);
                    break;
                }
            }
            if (n) return a;
            var M = s ? l.future : l.past;
            return "function" == typeof M ? M(a) : M.replace("%s", a);
        }, n.to = function(r, e) {
            return i(r, e, this, !0);
        }, n.from = function(r, e) {
            return i(r, e, this);
        };
        var d = function(r) {
            return r.$u ? t.utc() : t();
        };
        n.toNow = function(r) {
            return this.to(d(this), r);
        }, n.fromNow = function(r) {
            return this.from(d(this), r);
        };
    };
});
}),
"[project]/Desktop/frontend/node_modules/dayjs/plugin/updateLocale.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

!function(e, n) {
    ("TURBOPACK compile-time truthy", 1) ? module.exports = n() : "TURBOPACK unreachable";
}(/*TURBOPACK member replacement*/ __turbopack_context__.e, function() {
    "use strict";
    return function(e, n, t) {
        t.updateLocale = function(e, n) {
            var o = t.Ls[e];
            if (o) return (n ? Object.keys(n) : []).forEach(function(e) {
                o[e] = n[e];
            }), o;
        };
    };
});
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__597a50ac._.js.map