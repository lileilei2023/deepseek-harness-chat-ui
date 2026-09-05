window.__ModuleLoader__.load({
	id: "deepseek-harness-chat-ui",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region \0rolldown/runtime.js
		var __defProp = Object.defineProperty;
		var __exportAll = (all, no_symbols) => {
			let target = {};
			for (var name in all) __defProp(target, name, {
				get: all[name],
				enumerable: true
			});
			if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
			return target;
		};
		//#endregion
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/core.js
		var _a$1;
		function $constructor(name, initializer, params) {
			function init(inst, def) {
				if (!inst._zod) Object.defineProperty(inst, "_zod", {
					value: {
						def,
						constr: _,
						traits: /* @__PURE__ */ new Set()
					},
					enumerable: false
				});
				if (inst._zod.traits.has(name)) return;
				inst._zod.traits.add(name);
				initializer(inst, def);
				const proto = _.prototype;
				const keys = Object.keys(proto);
				for (let i = 0; i < keys.length; i++) {
					const k = keys[i];
					if (!(k in inst)) inst[k] = proto[k].bind(inst);
				}
			}
			const Parent = params?.Parent ?? Object;
			class Definition extends Parent {}
			Object.defineProperty(Definition, "name", { value: name });
			function _(def) {
				var _a;
				const inst = params?.Parent ? new Definition() : this;
				init(inst, def);
				(_a = inst._zod).deferred ?? (_a.deferred = []);
				for (const fn of inst._zod.deferred) fn();
				return inst;
			}
			Object.defineProperty(_, "init", { value: init });
			Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
				if (params?.Parent && inst instanceof params.Parent) return true;
				return inst?._zod?.traits?.has(name);
			} });
			Object.defineProperty(_, "name", { value: name });
			return _;
		}
		var $ZodAsyncError = class extends Error {
			constructor() {
				super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
			}
		};
		var $ZodEncodeError = class extends Error {
			constructor(name) {
				super(`Encountered unidirectional transform during encode: ${name}`);
				this.name = "ZodEncodeError";
			}
		};
		(_a$1 = globalThis).__zod_globalConfig ?? (_a$1.__zod_globalConfig = {});
		const globalConfig = globalThis.__zod_globalConfig;
		function config(newConfig) {
			if (newConfig) Object.assign(globalConfig, newConfig);
			return globalConfig;
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/util.js
		function getEnumValues(entries) {
			const numericValues = Object.values(entries).filter((v) => typeof v === "number");
			return Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
		}
		function jsonStringifyReplacer(_, value) {
			if (typeof value === "bigint") return value.toString();
			return value;
		}
		function cached(getter) {
			return { get value() {
				{
					const value = getter();
					Object.defineProperty(this, "value", { value });
					return value;
				}
				throw new Error("cached value already set");
			} };
		}
		function nullish(input) {
			return input === null || input === void 0;
		}
		function cleanRegex(source) {
			const start = source.startsWith("^") ? 1 : 0;
			const end = source.endsWith("$") ? source.length - 1 : source.length;
			return source.slice(start, end);
		}
		function floatSafeRemainder(val, step) {
			const ratio = val / step;
			const roundedRatio = Math.round(ratio);
			const tolerance = Number.EPSILON * Math.max(Math.abs(ratio), 1);
			if (Math.abs(ratio - roundedRatio) < tolerance) return 0;
			return ratio - roundedRatio;
		}
		const EVALUATING = /* @__PURE__*/ Symbol("evaluating");
		function defineLazy(object, key, getter) {
			let value = void 0;
			Object.defineProperty(object, key, {
				get() {
					if (value === EVALUATING) return;
					if (value === void 0) {
						value = EVALUATING;
						value = getter();
					}
					return value;
				},
				set(v) {
					Object.defineProperty(object, key, { value: v });
				},
				configurable: true
			});
		}
		function assignProp(target, prop, value) {
			Object.defineProperty(target, prop, {
				value,
				writable: true,
				enumerable: true,
				configurable: true
			});
		}
		function mergeDefs(...defs) {
			const mergedDescriptors = {};
			for (const def of defs) Object.assign(mergedDescriptors, Object.getOwnPropertyDescriptors(def));
			return Object.defineProperties({}, mergedDescriptors);
		}
		function esc(str) {
			return JSON.stringify(str);
		}
		function slugify(input) {
			return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
		}
		const captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
		function isObject(data) {
			return typeof data === "object" && data !== null && !Array.isArray(data);
		}
		const allowsEval = /* @__PURE__*/ cached(() => {
			if (globalConfig.jitless) return false;
			if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
			try {
				new Function("");
				return true;
			} catch (_) {
				return false;
			}
		});
		function isPlainObject(o) {
			if (isObject(o) === false) return false;
			const ctor = o.constructor;
			if (ctor === void 0) return true;
			if (typeof ctor !== "function") return true;
			const prot = ctor.prototype;
			if (isObject(prot) === false) return false;
			if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) return false;
			return true;
		}
		function shallowClone(o) {
			if (isPlainObject(o)) return { ...o };
			if (Array.isArray(o)) return [...o];
			if (o instanceof Map) return new Map(o);
			if (o instanceof Set) return new Set(o);
			return o;
		}
		const propertyKeyTypes = /* @__PURE__*/ new Set([
			"string",
			"number",
			"symbol"
		]);
		function escapeRegex(str) {
			return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}
		function clone(inst, def, params) {
			const cl = new inst._zod.constr(def ?? inst._zod.def);
			if (!def || params?.parent) cl._zod.parent = inst;
			return cl;
		}
		function normalizeParams(_params) {
			const params = _params;
			if (!params) return {};
			if (typeof params === "string") return { error: () => params };
			if (params?.message !== void 0) {
				if (params?.error !== void 0) throw new Error("Cannot specify both `message` and `error` params");
				params.error = params.message;
			}
			delete params.message;
			if (typeof params.error === "string") return {
				...params,
				error: () => params.error
			};
			return params;
		}
		function optionalKeys(shape) {
			return Object.keys(shape).filter((k) => {
				return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
			});
		}
		const NUMBER_FORMAT_RANGES = {
			safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
			int32: [-2147483648, 2147483647],
			uint32: [0, 4294967295],
			float32: [-34028234663852886e22, 34028234663852886e22],
			float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
		};
		function pick(schema, mask) {
			const currDef = schema._zod.def;
			const checks = currDef.checks;
			if (checks && checks.length > 0) throw new Error(".pick() cannot be used on object schemas containing refinements");
			return clone(schema, mergeDefs(schema._zod.def, {
				get shape() {
					const newShape = {};
					for (const key in mask) {
						if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
						if (!mask[key]) continue;
						newShape[key] = currDef.shape[key];
					}
					assignProp(this, "shape", newShape);
					return newShape;
				},
				checks: []
			}));
		}
		function omit(schema, mask) {
			const currDef = schema._zod.def;
			const checks = currDef.checks;
			if (checks && checks.length > 0) throw new Error(".omit() cannot be used on object schemas containing refinements");
			return clone(schema, mergeDefs(schema._zod.def, {
				get shape() {
					const newShape = { ...schema._zod.def.shape };
					for (const key in mask) {
						if (!(key in currDef.shape)) throw new Error(`Unrecognized key: "${key}"`);
						if (!mask[key]) continue;
						delete newShape[key];
					}
					assignProp(this, "shape", newShape);
					return newShape;
				},
				checks: []
			}));
		}
		function extend(schema, shape) {
			if (!isPlainObject(shape)) throw new Error("Invalid input to extend: expected a plain object");
			const checks = schema._zod.def.checks;
			if (checks && checks.length > 0) {
				const existingShape = schema._zod.def.shape;
				for (const key in shape) if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
			}
			return clone(schema, mergeDefs(schema._zod.def, { get shape() {
				const _shape = {
					...schema._zod.def.shape,
					...shape
				};
				assignProp(this, "shape", _shape);
				return _shape;
			} }));
		}
		function safeExtend(schema, shape) {
			if (!isPlainObject(shape)) throw new Error("Invalid input to safeExtend: expected a plain object");
			return clone(schema, mergeDefs(schema._zod.def, { get shape() {
				const _shape = {
					...schema._zod.def.shape,
					...shape
				};
				assignProp(this, "shape", _shape);
				return _shape;
			} }));
		}
		function merge$1(a, b) {
			if (a._zod.def.checks?.length) throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
			return clone(a, mergeDefs(a._zod.def, {
				get shape() {
					const _shape = {
						...a._zod.def.shape,
						...b._zod.def.shape
					};
					assignProp(this, "shape", _shape);
					return _shape;
				},
				get catchall() {
					return b._zod.def.catchall;
				},
				checks: b._zod.def.checks ?? []
			}));
		}
		function partial(Class, schema, mask) {
			const checks = schema._zod.def.checks;
			if (checks && checks.length > 0) throw new Error(".partial() cannot be used on object schemas containing refinements");
			return clone(schema, mergeDefs(schema._zod.def, {
				get shape() {
					const oldShape = schema._zod.def.shape;
					const shape = { ...oldShape };
					if (mask) for (const key in mask) {
						if (!(key in oldShape)) throw new Error(`Unrecognized key: "${key}"`);
						if (!mask[key]) continue;
						shape[key] = Class ? new Class({
							type: "optional",
							innerType: oldShape[key]
						}) : oldShape[key];
					}
					else for (const key in oldShape) shape[key] = Class ? new Class({
						type: "optional",
						innerType: oldShape[key]
					}) : oldShape[key];
					assignProp(this, "shape", shape);
					return shape;
				},
				checks: []
			}));
		}
		function required(Class, schema, mask) {
			return clone(schema, mergeDefs(schema._zod.def, { get shape() {
				const oldShape = schema._zod.def.shape;
				const shape = { ...oldShape };
				if (mask) for (const key in mask) {
					if (!(key in shape)) throw new Error(`Unrecognized key: "${key}"`);
					if (!mask[key]) continue;
					shape[key] = new Class({
						type: "nonoptional",
						innerType: oldShape[key]
					});
				}
				else for (const key in oldShape) shape[key] = new Class({
					type: "nonoptional",
					innerType: oldShape[key]
				});
				assignProp(this, "shape", shape);
				return shape;
			} }));
		}
		function aborted(x, startIndex = 0) {
			if (x.aborted === true) return true;
			for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue !== true) return true;
			return false;
		}
		function explicitlyAborted(x, startIndex = 0) {
			if (x.aborted === true) return true;
			for (let i = startIndex; i < x.issues.length; i++) if (x.issues[i]?.continue === false) return true;
			return false;
		}
		function prefixIssues(path, issues) {
			return issues.map((iss) => {
				var _a;
				(_a = iss).path ?? (_a.path = []);
				iss.path.unshift(path);
				return iss;
			});
		}
		function unwrapMessage(message) {
			return typeof message === "string" ? message : message?.message;
		}
		function finalizeIssue(iss, ctx, config) {
			const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
			const { inst: _inst, continue: _continue, input: _input, ...rest } = iss;
			rest.path ?? (rest.path = []);
			rest.message = message;
			if (ctx?.reportInput) rest.input = _input;
			return rest;
		}
		function getLengthableOrigin(input) {
			if (Array.isArray(input)) return "array";
			if (typeof input === "string") return "string";
			return "unknown";
		}
		function issue(...args) {
			const [iss, input, inst] = args;
			if (typeof iss === "string") return {
				message: iss,
				code: "custom",
				input,
				inst
			};
			return { ...iss };
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/errors.js
		const initializer$1 = (inst, def) => {
			inst.name = "$ZodError";
			Object.defineProperty(inst, "_zod", {
				value: inst._zod,
				enumerable: false
			});
			Object.defineProperty(inst, "issues", {
				value: def,
				enumerable: false
			});
			inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
			Object.defineProperty(inst, "toString", {
				value: () => inst.message,
				enumerable: false
			});
		};
		const $ZodError = $constructor("$ZodError", initializer$1);
		const $ZodRealError = $constructor("$ZodError", initializer$1, { Parent: Error });
		function flattenError(error, mapper = (issue) => issue.message) {
			const fieldErrors = {};
			const formErrors = [];
			for (const sub of error.issues) if (sub.path.length > 0) {
				fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
				fieldErrors[sub.path[0]].push(mapper(sub));
			} else formErrors.push(mapper(sub));
			return {
				formErrors,
				fieldErrors
			};
		}
		function formatError(error, mapper = (issue) => issue.message) {
			const fieldErrors = { _errors: [] };
			const processError = (error, path = []) => {
				for (const issue of error.issues) if (issue.code === "invalid_union" && issue.errors.length) issue.errors.map((issues) => processError({ issues }, [...path, ...issue.path]));
				else if (issue.code === "invalid_key") processError({ issues: issue.issues }, [...path, ...issue.path]);
				else if (issue.code === "invalid_element") processError({ issues: issue.issues }, [...path, ...issue.path]);
				else {
					const fullpath = [...path, ...issue.path];
					if (fullpath.length === 0) fieldErrors._errors.push(mapper(issue));
					else {
						let curr = fieldErrors;
						let i = 0;
						while (i < fullpath.length) {
							const el = fullpath[i];
							if (!(i === fullpath.length - 1)) curr[el] = curr[el] || { _errors: [] };
							else {
								curr[el] = curr[el] || { _errors: [] };
								curr[el]._errors.push(mapper(issue));
							}
							curr = curr[el];
							i++;
						}
					}
				}
			};
			processError(error);
			return fieldErrors;
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/parse.js
		const _parse = (_Err) => (schema, value, _ctx, _params) => {
			const ctx = _ctx ? {
				..._ctx,
				async: false
			} : { async: false };
			const result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) throw new $ZodAsyncError();
			if (result.issues.length) {
				const e = new ((_params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
				captureStackTrace(e, _params?.callee);
				throw e;
			}
			return result.value;
		};
		const _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
			const ctx = _ctx ? {
				..._ctx,
				async: true
			} : { async: true };
			let result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) result = await result;
			if (result.issues.length) {
				const e = new ((params?.Err) ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
				captureStackTrace(e, params?.callee);
				throw e;
			}
			return result.value;
		};
		const _safeParse = (_Err) => (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				async: false
			} : { async: false };
			const result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) throw new $ZodAsyncError();
			return result.issues.length ? {
				success: false,
				error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
			} : {
				success: true,
				data: result.value
			};
		};
		const safeParse$1 = /* @__PURE__*/ _safeParse($ZodRealError);
		const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				async: true
			} : { async: true };
			let result = schema._zod.run({
				value,
				issues: []
			}, ctx);
			if (result instanceof Promise) result = await result;
			return result.issues.length ? {
				success: false,
				error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
			} : {
				success: true,
				data: result.value
			};
		};
		const safeParseAsync$1 = /* @__PURE__*/ _safeParseAsync($ZodRealError);
		const _encode = (_Err) => (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _parse(_Err)(schema, value, ctx);
		};
		const _decode = (_Err) => (schema, value, _ctx) => {
			return _parse(_Err)(schema, value, _ctx);
		};
		const _encodeAsync = (_Err) => async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _parseAsync(_Err)(schema, value, ctx);
		};
		const _decodeAsync = (_Err) => async (schema, value, _ctx) => {
			return _parseAsync(_Err)(schema, value, _ctx);
		};
		const _safeEncode = (_Err) => (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _safeParse(_Err)(schema, value, ctx);
		};
		const _safeDecode = (_Err) => (schema, value, _ctx) => {
			return _safeParse(_Err)(schema, value, _ctx);
		};
		const _safeEncodeAsync = (_Err) => async (schema, value, _ctx) => {
			const ctx = _ctx ? {
				..._ctx,
				direction: "backward"
			} : { direction: "backward" };
			return _safeParseAsync(_Err)(schema, value, ctx);
		};
		const _safeDecodeAsync = (_Err) => async (schema, value, _ctx) => {
			return _safeParseAsync(_Err)(schema, value, _ctx);
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/regexes.js
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link cuid2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const cuid = /^[cC][0-9a-z]{6,}$/;
		const cuid2 = /^[0-9a-z]+$/;
		const ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
		const xid = /^[0-9a-vA-V]{20}$/;
		const ksuid = /^[A-Za-z0-9]{27}$/;
		const nanoid = /^[a-zA-Z0-9_-]{21}$/;
		/** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
		const duration$1 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
		/** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
		const guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
		/** Returns a regex for validating an RFC 9562/4122 UUID.
		*
		* @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
		const uuid = (version) => {
			if (!version) return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
			return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
		};
		/** Practical email validation */
		const email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
		const _emoji$1 = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
		function emoji() {
			return new RegExp(_emoji$1, "u");
		}
		const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
		const ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
		const cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
		const cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
		const base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
		const base64url = /^[A-Za-z0-9_-]*$/;
		const httpProtocol = /^https?$/;
		const e164 = /^\+[1-9]\d{6,14}$/;
		const dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
		const date$1 = /*@__PURE__*/ new RegExp(`^${dateSource}$`);
		function timeSource(args) {
			const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
			return typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
		}
		function time$1(args) {
			return new RegExp(`^${timeSource(args)}$`);
		}
		function datetime$1(args) {
			const time = timeSource({ precision: args.precision });
			const opts = ["Z"];
			if (args.local) opts.push("");
			if (args.offset) opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
			const timeRegex = `${time}(?:${opts.join("|")})`;
			return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
		}
		const string$1 = (params) => {
			const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
			return new RegExp(`^${regex}$`);
		};
		const integer = /^-?\d+$/;
		const number$1 = /^-?\d+(?:\.\d+)?$/;
		const boolean$1 = /^(?:true|false)$/i;
		const lowercase = /^[^A-Z]*$/;
		const uppercase = /^[^a-z]*$/;
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/checks.js
		const $ZodCheck = /*@__PURE__*/ $constructor("$ZodCheck", (inst, def) => {
			var _a;
			inst._zod ?? (inst._zod = {});
			inst._zod.def = def;
			(_a = inst._zod).onattach ?? (_a.onattach = []);
		});
		const numericOriginMap = {
			number: "number",
			bigint: "bigint",
			object: "date"
		};
		const $ZodCheckLessThan = /*@__PURE__*/ $constructor("$ZodCheckLessThan", (inst, def) => {
			$ZodCheck.init(inst, def);
			const origin = numericOriginMap[typeof def.value];
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
				if (def.value < curr) if (def.inclusive) bag.maximum = def.value;
				else bag.exclusiveMaximum = def.value;
			});
			inst._zod.check = (payload) => {
				if (def.inclusive ? payload.value <= def.value : payload.value < def.value) return;
				payload.issues.push({
					origin,
					code: "too_big",
					maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
					input: payload.value,
					inclusive: def.inclusive,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckGreaterThan = /*@__PURE__*/ $constructor("$ZodCheckGreaterThan", (inst, def) => {
			$ZodCheck.init(inst, def);
			const origin = numericOriginMap[typeof def.value];
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
				if (def.value > curr) if (def.inclusive) bag.minimum = def.value;
				else bag.exclusiveMinimum = def.value;
			});
			inst._zod.check = (payload) => {
				if (def.inclusive ? payload.value >= def.value : payload.value > def.value) return;
				payload.issues.push({
					origin,
					code: "too_small",
					minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
					input: payload.value,
					inclusive: def.inclusive,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMultipleOf = /*@__PURE__*/ $constructor("$ZodCheckMultipleOf", (inst, def) => {
			$ZodCheck.init(inst, def);
			inst._zod.onattach.push((inst) => {
				var _a;
				(_a = inst._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
			});
			inst._zod.check = (payload) => {
				if (typeof payload.value !== typeof def.value) throw new Error("Cannot mix number and bigint in multiple_of check.");
				if (typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0) return;
				payload.issues.push({
					origin: typeof payload.value,
					code: "not_multiple_of",
					divisor: def.value,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckNumberFormat = /*@__PURE__*/ $constructor("$ZodCheckNumberFormat", (inst, def) => {
			$ZodCheck.init(inst, def);
			def.format = def.format || "float64";
			const isInt = def.format?.includes("int");
			const origin = isInt ? "int" : "number";
			const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.format = def.format;
				bag.minimum = minimum;
				bag.maximum = maximum;
				if (isInt) bag.pattern = integer;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				if (isInt) {
					if (!Number.isInteger(input)) {
						payload.issues.push({
							expected: origin,
							format: def.format,
							code: "invalid_type",
							continue: false,
							input,
							inst
						});
						return;
					}
					if (!Number.isSafeInteger(input)) {
						if (input > 0) payload.issues.push({
							input,
							code: "too_big",
							maximum: Number.MAX_SAFE_INTEGER,
							note: "Integers must be within the safe integer range.",
							inst,
							origin,
							inclusive: true,
							continue: !def.abort
						});
						else payload.issues.push({
							input,
							code: "too_small",
							minimum: Number.MIN_SAFE_INTEGER,
							note: "Integers must be within the safe integer range.",
							inst,
							origin,
							inclusive: true,
							continue: !def.abort
						});
						return;
					}
				}
				if (input < minimum) payload.issues.push({
					origin: "number",
					input,
					code: "too_small",
					minimum,
					inclusive: true,
					inst,
					continue: !def.abort
				});
				if (input > maximum) payload.issues.push({
					origin: "number",
					input,
					code: "too_big",
					maximum,
					inclusive: true,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMaxLength = /*@__PURE__*/ $constructor("$ZodCheckMaxLength", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = (payload) => {
				const val = payload.value;
				return !nullish(val) && val.length !== void 0;
			});
			inst._zod.onattach.push((inst) => {
				const curr = inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
				if (def.maximum < curr) inst._zod.bag.maximum = def.maximum;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				if (input.length <= def.maximum) return;
				const origin = getLengthableOrigin(input);
				payload.issues.push({
					origin,
					code: "too_big",
					maximum: def.maximum,
					inclusive: true,
					input,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckMinLength = /*@__PURE__*/ $constructor("$ZodCheckMinLength", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = (payload) => {
				const val = payload.value;
				return !nullish(val) && val.length !== void 0;
			});
			inst._zod.onattach.push((inst) => {
				const curr = inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
				if (def.minimum > curr) inst._zod.bag.minimum = def.minimum;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				if (input.length >= def.minimum) return;
				const origin = getLengthableOrigin(input);
				payload.issues.push({
					origin,
					code: "too_small",
					minimum: def.minimum,
					inclusive: true,
					input,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckLengthEquals = /*@__PURE__*/ $constructor("$ZodCheckLengthEquals", (inst, def) => {
			var _a;
			$ZodCheck.init(inst, def);
			(_a = inst._zod.def).when ?? (_a.when = (payload) => {
				const val = payload.value;
				return !nullish(val) && val.length !== void 0;
			});
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.minimum = def.length;
				bag.maximum = def.length;
				bag.length = def.length;
			});
			inst._zod.check = (payload) => {
				const input = payload.value;
				const length = input.length;
				if (length === def.length) return;
				const origin = getLengthableOrigin(input);
				const tooBig = length > def.length;
				payload.issues.push({
					origin,
					...tooBig ? {
						code: "too_big",
						maximum: def.length
					} : {
						code: "too_small",
						minimum: def.length
					},
					inclusive: true,
					exact: true,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckStringFormat = /*@__PURE__*/ $constructor("$ZodCheckStringFormat", (inst, def) => {
			var _a, _b;
			$ZodCheck.init(inst, def);
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.format = def.format;
				if (def.pattern) {
					bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
					bag.patterns.add(def.pattern);
				}
			});
			if (def.pattern) (_a = inst._zod).check ?? (_a.check = (payload) => {
				def.pattern.lastIndex = 0;
				if (def.pattern.test(payload.value)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: def.format,
					input: payload.value,
					...def.pattern ? { pattern: def.pattern.toString() } : {},
					inst,
					continue: !def.abort
				});
			});
			else (_b = inst._zod).check ?? (_b.check = () => {});
		});
		const $ZodCheckRegex = /*@__PURE__*/ $constructor("$ZodCheckRegex", (inst, def) => {
			$ZodCheckStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				def.pattern.lastIndex = 0;
				if (def.pattern.test(payload.value)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "regex",
					input: payload.value,
					pattern: def.pattern.toString(),
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckLowerCase = /*@__PURE__*/ $constructor("$ZodCheckLowerCase", (inst, def) => {
			def.pattern ?? (def.pattern = lowercase);
			$ZodCheckStringFormat.init(inst, def);
		});
		const $ZodCheckUpperCase = /*@__PURE__*/ $constructor("$ZodCheckUpperCase", (inst, def) => {
			def.pattern ?? (def.pattern = uppercase);
			$ZodCheckStringFormat.init(inst, def);
		});
		const $ZodCheckIncludes = /*@__PURE__*/ $constructor("$ZodCheckIncludes", (inst, def) => {
			$ZodCheck.init(inst, def);
			const escapedRegex = escapeRegex(def.includes);
			const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
			def.pattern = pattern;
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
				bag.patterns.add(pattern);
			});
			inst._zod.check = (payload) => {
				if (payload.value.includes(def.includes, def.position)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "includes",
					includes: def.includes,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckStartsWith = /*@__PURE__*/ $constructor("$ZodCheckStartsWith", (inst, def) => {
			$ZodCheck.init(inst, def);
			const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
			def.pattern ?? (def.pattern = pattern);
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
				bag.patterns.add(pattern);
			});
			inst._zod.check = (payload) => {
				if (payload.value.startsWith(def.prefix)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "starts_with",
					prefix: def.prefix,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckEndsWith = /*@__PURE__*/ $constructor("$ZodCheckEndsWith", (inst, def) => {
			$ZodCheck.init(inst, def);
			const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
			def.pattern ?? (def.pattern = pattern);
			inst._zod.onattach.push((inst) => {
				const bag = inst._zod.bag;
				bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
				bag.patterns.add(pattern);
			});
			inst._zod.check = (payload) => {
				if (payload.value.endsWith(def.suffix)) return;
				payload.issues.push({
					origin: "string",
					code: "invalid_format",
					format: "ends_with",
					suffix: def.suffix,
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodCheckOverwrite = /*@__PURE__*/ $constructor("$ZodCheckOverwrite", (inst, def) => {
			$ZodCheck.init(inst, def);
			inst._zod.check = (payload) => {
				payload.value = def.tx(payload.value);
			};
		});
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/doc.js
		var Doc = class {
			constructor(args = []) {
				this.content = [];
				this.indent = 0;
				if (this) this.args = args;
			}
			indented(fn) {
				this.indent += 1;
				fn(this);
				this.indent -= 1;
			}
			write(arg) {
				if (typeof arg === "function") {
					arg(this, { execution: "sync" });
					arg(this, { execution: "async" });
					return;
				}
				const lines = arg.split("\n").filter((x) => x);
				const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
				const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
				for (const line of dedented) this.content.push(line);
			}
			compile() {
				const F = Function;
				const args = this?.args;
				const lines = [...(this?.content ?? [``]).map((x) => `  ${x}`)];
				return new F(...args, lines.join("\n"));
			}
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/versions.js
		const version = {
			major: 4,
			minor: 4,
			patch: 3
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/schemas.js
		const $ZodType = /*@__PURE__*/ $constructor("$ZodType", (inst, def) => {
			var _a;
			inst ?? (inst = {});
			inst._zod.def = def;
			inst._zod.bag = inst._zod.bag || {};
			inst._zod.version = version;
			const checks = [...inst._zod.def.checks ?? []];
			if (inst._zod.traits.has("$ZodCheck")) checks.unshift(inst);
			for (const ch of checks) for (const fn of ch._zod.onattach) fn(inst);
			if (checks.length === 0) {
				(_a = inst._zod).deferred ?? (_a.deferred = []);
				inst._zod.deferred?.push(() => {
					inst._zod.run = inst._zod.parse;
				});
			} else {
				const runChecks = (payload, checks, ctx) => {
					let isAborted = aborted(payload);
					let asyncResult;
					for (const ch of checks) {
						if (ch._zod.def.when) {
							if (explicitlyAborted(payload)) continue;
							if (!ch._zod.def.when(payload)) continue;
						} else if (isAborted) continue;
						const currLen = payload.issues.length;
						const _ = ch._zod.check(payload);
						if (_ instanceof Promise && ctx?.async === false) throw new $ZodAsyncError();
						if (asyncResult || _ instanceof Promise) asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
							await _;
							if (payload.issues.length === currLen) return;
							if (!isAborted) isAborted = aborted(payload, currLen);
						});
						else {
							if (payload.issues.length === currLen) continue;
							if (!isAborted) isAborted = aborted(payload, currLen);
						}
					}
					if (asyncResult) return asyncResult.then(() => {
						return payload;
					});
					return payload;
				};
				const handleCanaryResult = (canary, payload, ctx) => {
					if (aborted(canary)) {
						canary.aborted = true;
						return canary;
					}
					const checkResult = runChecks(payload, checks, ctx);
					if (checkResult instanceof Promise) {
						if (ctx.async === false) throw new $ZodAsyncError();
						return checkResult.then((checkResult) => inst._zod.parse(checkResult, ctx));
					}
					return inst._zod.parse(checkResult, ctx);
				};
				inst._zod.run = (payload, ctx) => {
					if (ctx.skipChecks) return inst._zod.parse(payload, ctx);
					if (ctx.direction === "backward") {
						const canary = inst._zod.parse({
							value: payload.value,
							issues: []
						}, {
							...ctx,
							skipChecks: true
						});
						if (canary instanceof Promise) return canary.then((canary) => {
							return handleCanaryResult(canary, payload, ctx);
						});
						return handleCanaryResult(canary, payload, ctx);
					}
					const result = inst._zod.parse(payload, ctx);
					if (result instanceof Promise) {
						if (ctx.async === false) throw new $ZodAsyncError();
						return result.then((result) => runChecks(result, checks, ctx));
					}
					return runChecks(result, checks, ctx);
				};
			}
			defineLazy(inst, "~standard", () => ({
				validate: (value) => {
					try {
						const r = safeParse$1(inst, value);
						return r.success ? { value: r.data } : { issues: r.error?.issues };
					} catch (_) {
						return safeParseAsync$1(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
					}
				},
				vendor: "zod",
				version: 1
			}));
		});
		const $ZodString = /*@__PURE__*/ $constructor("$ZodString", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string$1(inst._zod.bag);
			inst._zod.parse = (payload, _) => {
				if (def.coerce) try {
					payload.value = String(payload.value);
				} catch (_) {}
				if (typeof payload.value === "string") return payload;
				payload.issues.push({
					expected: "string",
					code: "invalid_type",
					input: payload.value,
					inst
				});
				return payload;
			};
		});
		const $ZodStringFormat = /*@__PURE__*/ $constructor("$ZodStringFormat", (inst, def) => {
			$ZodCheckStringFormat.init(inst, def);
			$ZodString.init(inst, def);
		});
		const $ZodGUID = /*@__PURE__*/ $constructor("$ZodGUID", (inst, def) => {
			def.pattern ?? (def.pattern = guid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodUUID = /*@__PURE__*/ $constructor("$ZodUUID", (inst, def) => {
			if (def.version) {
				const v = {
					v1: 1,
					v2: 2,
					v3: 3,
					v4: 4,
					v5: 5,
					v6: 6,
					v7: 7,
					v8: 8
				}[def.version];
				if (v === void 0) throw new Error(`Invalid UUID version: "${def.version}"`);
				def.pattern ?? (def.pattern = uuid(v));
			} else def.pattern ?? (def.pattern = uuid());
			$ZodStringFormat.init(inst, def);
		});
		const $ZodEmail = /*@__PURE__*/ $constructor("$ZodEmail", (inst, def) => {
			def.pattern ?? (def.pattern = email);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodURL = /*@__PURE__*/ $constructor("$ZodURL", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				try {
					const trimmed = payload.value.trim();
					if (!def.normalize && def.protocol?.source === httpProtocol.source) {
						if (!/^https?:\/\//i.test(trimmed)) {
							payload.issues.push({
								code: "invalid_format",
								format: "url",
								note: "Invalid URL format",
								input: payload.value,
								inst,
								continue: !def.abort
							});
							return;
						}
					}
					const url = new URL(trimmed);
					if (def.hostname) {
						def.hostname.lastIndex = 0;
						if (!def.hostname.test(url.hostname)) payload.issues.push({
							code: "invalid_format",
							format: "url",
							note: "Invalid hostname",
							pattern: def.hostname.source,
							input: payload.value,
							inst,
							continue: !def.abort
						});
					}
					if (def.protocol) {
						def.protocol.lastIndex = 0;
						if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) payload.issues.push({
							code: "invalid_format",
							format: "url",
							note: "Invalid protocol",
							pattern: def.protocol.source,
							input: payload.value,
							inst,
							continue: !def.abort
						});
					}
					if (def.normalize) payload.value = url.href;
					else payload.value = trimmed;
					return;
				} catch (_) {
					payload.issues.push({
						code: "invalid_format",
						format: "url",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
			};
		});
		const $ZodEmoji = /*@__PURE__*/ $constructor("$ZodEmoji", (inst, def) => {
			def.pattern ?? (def.pattern = emoji());
			$ZodStringFormat.init(inst, def);
		});
		const $ZodNanoID = /*@__PURE__*/ $constructor("$ZodNanoID", (inst, def) => {
			def.pattern ?? (def.pattern = nanoid);
			$ZodStringFormat.init(inst, def);
		});
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link $ZodCUID2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const $ZodCUID = /*@__PURE__*/ $constructor("$ZodCUID", (inst, def) => {
			def.pattern ?? (def.pattern = cuid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodCUID2 = /*@__PURE__*/ $constructor("$ZodCUID2", (inst, def) => {
			def.pattern ?? (def.pattern = cuid2);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodULID = /*@__PURE__*/ $constructor("$ZodULID", (inst, def) => {
			def.pattern ?? (def.pattern = ulid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodXID = /*@__PURE__*/ $constructor("$ZodXID", (inst, def) => {
			def.pattern ?? (def.pattern = xid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodKSUID = /*@__PURE__*/ $constructor("$ZodKSUID", (inst, def) => {
			def.pattern ?? (def.pattern = ksuid);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODateTime = /*@__PURE__*/ $constructor("$ZodISODateTime", (inst, def) => {
			def.pattern ?? (def.pattern = datetime$1(def));
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODate = /*@__PURE__*/ $constructor("$ZodISODate", (inst, def) => {
			def.pattern ?? (def.pattern = date$1);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISOTime = /*@__PURE__*/ $constructor("$ZodISOTime", (inst, def) => {
			def.pattern ?? (def.pattern = time$1(def));
			$ZodStringFormat.init(inst, def);
		});
		const $ZodISODuration = /*@__PURE__*/ $constructor("$ZodISODuration", (inst, def) => {
			def.pattern ?? (def.pattern = duration$1);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodIPv4 = /*@__PURE__*/ $constructor("$ZodIPv4", (inst, def) => {
			def.pattern ?? (def.pattern = ipv4);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.format = `ipv4`;
		});
		const $ZodIPv6 = /*@__PURE__*/ $constructor("$ZodIPv6", (inst, def) => {
			def.pattern ?? (def.pattern = ipv6);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.format = `ipv6`;
			inst._zod.check = (payload) => {
				try {
					new URL(`http://[${payload.value}]`);
				} catch {
					payload.issues.push({
						code: "invalid_format",
						format: "ipv6",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
			};
		});
		const $ZodCIDRv4 = /*@__PURE__*/ $constructor("$ZodCIDRv4", (inst, def) => {
			def.pattern ?? (def.pattern = cidrv4);
			$ZodStringFormat.init(inst, def);
		});
		const $ZodCIDRv6 = /*@__PURE__*/ $constructor("$ZodCIDRv6", (inst, def) => {
			def.pattern ?? (def.pattern = cidrv6);
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				const parts = payload.value.split("/");
				try {
					if (parts.length !== 2) throw new Error();
					const [address, prefix] = parts;
					if (!prefix) throw new Error();
					const prefixNum = Number(prefix);
					if (`${prefixNum}` !== prefix) throw new Error();
					if (prefixNum < 0 || prefixNum > 128) throw new Error();
					new URL(`http://[${address}]`);
				} catch {
					payload.issues.push({
						code: "invalid_format",
						format: "cidrv6",
						input: payload.value,
						inst,
						continue: !def.abort
					});
				}
			};
		});
		function isValidBase64(data) {
			if (data === "") return true;
			if (/\s/.test(data)) return false;
			if (data.length % 4 !== 0) return false;
			try {
				atob(data);
				return true;
			} catch {
				return false;
			}
		}
		const $ZodBase64 = /*@__PURE__*/ $constructor("$ZodBase64", (inst, def) => {
			def.pattern ?? (def.pattern = base64);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.contentEncoding = "base64";
			inst._zod.check = (payload) => {
				if (isValidBase64(payload.value)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "base64",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		function isValidBase64URL(data) {
			if (!base64url.test(data)) return false;
			const base64 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
			return isValidBase64(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
		}
		const $ZodBase64URL = /*@__PURE__*/ $constructor("$ZodBase64URL", (inst, def) => {
			def.pattern ?? (def.pattern = base64url);
			$ZodStringFormat.init(inst, def);
			inst._zod.bag.contentEncoding = "base64url";
			inst._zod.check = (payload) => {
				if (isValidBase64URL(payload.value)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "base64url",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodE164 = /*@__PURE__*/ $constructor("$ZodE164", (inst, def) => {
			def.pattern ?? (def.pattern = e164);
			$ZodStringFormat.init(inst, def);
		});
		function isValidJWT(token, algorithm = null) {
			try {
				const tokensParts = token.split(".");
				if (tokensParts.length !== 3) return false;
				const [header] = tokensParts;
				if (!header) return false;
				const parsedHeader = JSON.parse(atob(header));
				if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT") return false;
				if (!parsedHeader.alg) return false;
				if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm)) return false;
				return true;
			} catch {
				return false;
			}
		}
		const $ZodJWT = /*@__PURE__*/ $constructor("$ZodJWT", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			inst._zod.check = (payload) => {
				if (isValidJWT(payload.value, def.alg)) return;
				payload.issues.push({
					code: "invalid_format",
					format: "jwt",
					input: payload.value,
					inst,
					continue: !def.abort
				});
			};
		});
		const $ZodNumber = /*@__PURE__*/ $constructor("$ZodNumber", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = inst._zod.bag.pattern ?? number$1;
			inst._zod.parse = (payload, _ctx) => {
				if (def.coerce) try {
					payload.value = Number(payload.value);
				} catch (_) {}
				const input = payload.value;
				if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) return payload;
				const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
				payload.issues.push({
					expected: "number",
					code: "invalid_type",
					input,
					inst,
					...received ? { received } : {}
				});
				return payload;
			};
		});
		const $ZodNumberFormat = /*@__PURE__*/ $constructor("$ZodNumberFormat", (inst, def) => {
			$ZodCheckNumberFormat.init(inst, def);
			$ZodNumber.init(inst, def);
		});
		const $ZodBoolean = /*@__PURE__*/ $constructor("$ZodBoolean", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.pattern = boolean$1;
			inst._zod.parse = (payload, _ctx) => {
				if (def.coerce) try {
					payload.value = Boolean(payload.value);
				} catch (_) {}
				const input = payload.value;
				if (typeof input === "boolean") return payload;
				payload.issues.push({
					expected: "boolean",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodUnknown = /*@__PURE__*/ $constructor("$ZodUnknown", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload) => payload;
		});
		const $ZodNever = /*@__PURE__*/ $constructor("$ZodNever", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, _ctx) => {
				payload.issues.push({
					expected: "never",
					code: "invalid_type",
					input: payload.value,
					inst
				});
				return payload;
			};
		});
		const $ZodVoid = /*@__PURE__*/ $constructor("$ZodVoid", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, _ctx) => {
				const input = payload.value;
				if (typeof input === "undefined") return payload;
				payload.issues.push({
					expected: "void",
					code: "invalid_type",
					input,
					inst
				});
				return payload;
			};
		});
		function handleArrayResult(result, final, index) {
			if (result.issues.length) final.issues.push(...prefixIssues(index, result.issues));
			final.value[index] = result.value;
		}
		const $ZodArray = /*@__PURE__*/ $constructor("$ZodArray", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, ctx) => {
				const input = payload.value;
				if (!Array.isArray(input)) {
					payload.issues.push({
						expected: "array",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				payload.value = Array(input.length);
				const proms = [];
				for (let i = 0; i < input.length; i++) {
					const item = input[i];
					const result = def.element._zod.run({
						value: item,
						issues: []
					}, ctx);
					if (result instanceof Promise) proms.push(result.then((result) => handleArrayResult(result, payload, i)));
					else handleArrayResult(result, payload, i);
				}
				if (proms.length) return Promise.all(proms).then(() => payload);
				return payload;
			};
		});
		function handlePropertyResult(result, final, key, input, isOptionalIn, isOptionalOut) {
			const isPresent = key in input;
			if (result.issues.length) {
				if (isOptionalIn && isOptionalOut && !isPresent) return;
				final.issues.push(...prefixIssues(key, result.issues));
			}
			if (!isPresent && !isOptionalIn) {
				if (!result.issues.length) final.issues.push({
					code: "invalid_type",
					expected: "nonoptional",
					input: void 0,
					path: [key]
				});
				return;
			}
			if (result.value === void 0) {
				if (isPresent) final.value[key] = void 0;
			} else final.value[key] = result.value;
		}
		function normalizeDef(def) {
			const keys = Object.keys(def.shape);
			for (const k of keys) if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
			const okeys = optionalKeys(def.shape);
			return {
				...def,
				keys,
				keySet: new Set(keys),
				numKeys: keys.length,
				optionalKeys: new Set(okeys)
			};
		}
		function handleCatchall(proms, input, payload, ctx, def, inst) {
			const unrecognized = [];
			const keySet = def.keySet;
			const _catchall = def.catchall._zod;
			const t = _catchall.def.type;
			const isOptionalIn = _catchall.optin === "optional";
			const isOptionalOut = _catchall.optout === "optional";
			for (const key in input) {
				if (key === "__proto__") continue;
				if (keySet.has(key)) continue;
				if (t === "never") {
					unrecognized.push(key);
					continue;
				}
				const r = _catchall.run({
					value: input[key],
					issues: []
				}, ctx);
				if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
				else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
			}
			if (unrecognized.length) payload.issues.push({
				code: "unrecognized_keys",
				keys: unrecognized,
				input,
				inst
			});
			if (!proms.length) return payload;
			return Promise.all(proms).then(() => {
				return payload;
			});
		}
		const $ZodObject = /*@__PURE__*/ $constructor("$ZodObject", (inst, def) => {
			$ZodType.init(inst, def);
			if (!Object.getOwnPropertyDescriptor(def, "shape")?.get) {
				const sh = def.shape;
				Object.defineProperty(def, "shape", { get: () => {
					const newSh = { ...sh };
					Object.defineProperty(def, "shape", { value: newSh });
					return newSh;
				} });
			}
			const _normalized = cached(() => normalizeDef(def));
			defineLazy(inst._zod, "propValues", () => {
				const shape = def.shape;
				const propValues = {};
				for (const key in shape) {
					const field = shape[key]._zod;
					if (field.values) {
						propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
						for (const v of field.values) propValues[key].add(v);
					}
				}
				return propValues;
			});
			const isObject$1 = isObject;
			const catchall = def.catchall;
			let value;
			inst._zod.parse = (payload, ctx) => {
				value ?? (value = _normalized.value);
				const input = payload.value;
				if (!isObject$1(input)) {
					payload.issues.push({
						expected: "object",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				payload.value = {};
				const proms = [];
				const shape = value.shape;
				for (const key of value.keys) {
					const el = shape[key];
					const isOptionalIn = el._zod.optin === "optional";
					const isOptionalOut = el._zod.optout === "optional";
					const r = el._zod.run({
						value: input[key],
						issues: []
					}, ctx);
					if (r instanceof Promise) proms.push(r.then((r) => handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut)));
					else handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
				}
				if (!catchall) return proms.length ? Promise.all(proms).then(() => payload) : payload;
				return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
			};
		});
		const $ZodObjectJIT = /*@__PURE__*/ $constructor("$ZodObjectJIT", (inst, def) => {
			$ZodObject.init(inst, def);
			const superParse = inst._zod.parse;
			const _normalized = cached(() => normalizeDef(def));
			const generateFastpass = (shape) => {
				const doc = new Doc([
					"shape",
					"payload",
					"ctx"
				]);
				const normalized = _normalized.value;
				const parseStr = (key) => {
					const k = esc(key);
					return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
				};
				doc.write(`const input = payload.value;`);
				const ids = Object.create(null);
				let counter = 0;
				for (const key of normalized.keys) ids[key] = `key_${counter++}`;
				doc.write(`const newResult = {};`);
				for (const key of normalized.keys) {
					const id = ids[key];
					const k = esc(key);
					const schema = shape[key];
					const isOptionalIn = schema?._zod?.optin === "optional";
					const isOptionalOut = schema?._zod?.optout === "optional";
					doc.write(`const ${id} = ${parseStr(key)};`);
					if (isOptionalIn && isOptionalOut) doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }

        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }

      `);
					else if (!isOptionalIn) doc.write(`
        const ${id}_present = ${k} in input;
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        if (!${id}_present && !${id}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
        }

        if (${id}_present) {
          if (${id}.value === undefined) {
            newResult[${k}] = undefined;
          } else {
            newResult[${k}] = ${id}.value;
          }
        }

      `);
					else doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }

        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }

      `);
				}
				doc.write(`payload.value = newResult;`);
				doc.write(`return payload;`);
				const fn = doc.compile();
				return (payload, ctx) => fn(shape, payload, ctx);
			};
			let fastpass;
			const isObject$2 = isObject;
			const jit = !globalConfig.jitless;
			const fastEnabled = jit && allowsEval.value;
			const catchall = def.catchall;
			let value;
			inst._zod.parse = (payload, ctx) => {
				value ?? (value = _normalized.value);
				const input = payload.value;
				if (!isObject$2(input)) {
					payload.issues.push({
						expected: "object",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
					if (!fastpass) fastpass = generateFastpass(def.shape);
					payload = fastpass(payload, ctx);
					if (!catchall) return payload;
					return handleCatchall([], input, payload, ctx, value, inst);
				}
				return superParse(payload, ctx);
			};
		});
		function handleUnionResults(results, final, inst, ctx) {
			for (const result of results) if (result.issues.length === 0) {
				final.value = result.value;
				return final;
			}
			const nonaborted = results.filter((r) => !aborted(r));
			if (nonaborted.length === 1) {
				final.value = nonaborted[0].value;
				return nonaborted[0];
			}
			final.issues.push({
				code: "invalid_union",
				input: final.value,
				inst,
				errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
			});
			return final;
		}
		const $ZodUnion = /*@__PURE__*/ $constructor("$ZodUnion", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
			defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
			defineLazy(inst._zod, "values", () => {
				if (def.options.every((o) => o._zod.values)) return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
			});
			defineLazy(inst._zod, "pattern", () => {
				if (def.options.every((o) => o._zod.pattern)) {
					const patterns = def.options.map((o) => o._zod.pattern);
					return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
				}
			});
			const first = def.options.length === 1 ? def.options[0]._zod.run : null;
			inst._zod.parse = (payload, ctx) => {
				if (first) return first(payload, ctx);
				let async = false;
				const results = [];
				for (const option of def.options) {
					const result = option._zod.run({
						value: payload.value,
						issues: []
					}, ctx);
					if (result instanceof Promise) {
						results.push(result);
						async = true;
					} else {
						if (result.issues.length === 0) return result;
						results.push(result);
					}
				}
				if (!async) return handleUnionResults(results, payload, inst, ctx);
				return Promise.all(results).then((results) => {
					return handleUnionResults(results, payload, inst, ctx);
				});
			};
		});
		const $ZodIntersection = /*@__PURE__*/ $constructor("$ZodIntersection", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, ctx) => {
				const input = payload.value;
				const left = def.left._zod.run({
					value: input,
					issues: []
				}, ctx);
				const right = def.right._zod.run({
					value: input,
					issues: []
				}, ctx);
				if (left instanceof Promise || right instanceof Promise) return Promise.all([left, right]).then(([left, right]) => {
					return handleIntersectionResults(payload, left, right);
				});
				return handleIntersectionResults(payload, left, right);
			};
		});
		function mergeValues(a, b) {
			if (a === b) return {
				valid: true,
				data: a
			};
			if (a instanceof Date && b instanceof Date && +a === +b) return {
				valid: true,
				data: a
			};
			if (isPlainObject(a) && isPlainObject(b)) {
				const bKeys = Object.keys(b);
				const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
				const newObj = {
					...a,
					...b
				};
				for (const key of sharedKeys) {
					const sharedValue = mergeValues(a[key], b[key]);
					if (!sharedValue.valid) return {
						valid: false,
						mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
					};
					newObj[key] = sharedValue.data;
				}
				return {
					valid: true,
					data: newObj
				};
			}
			if (Array.isArray(a) && Array.isArray(b)) {
				if (a.length !== b.length) return {
					valid: false,
					mergeErrorPath: []
				};
				const newArray = [];
				for (let index = 0; index < a.length; index++) {
					const itemA = a[index];
					const itemB = b[index];
					const sharedValue = mergeValues(itemA, itemB);
					if (!sharedValue.valid) return {
						valid: false,
						mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
					};
					newArray.push(sharedValue.data);
				}
				return {
					valid: true,
					data: newArray
				};
			}
			return {
				valid: false,
				mergeErrorPath: []
			};
		}
		function handleIntersectionResults(result, left, right) {
			const unrecKeys = /* @__PURE__ */ new Map();
			let unrecIssue;
			for (const iss of left.issues) if (iss.code === "unrecognized_keys") {
				unrecIssue ?? (unrecIssue = iss);
				for (const k of iss.keys) {
					if (!unrecKeys.has(k)) unrecKeys.set(k, {});
					unrecKeys.get(k).l = true;
				}
			} else result.issues.push(iss);
			for (const iss of right.issues) if (iss.code === "unrecognized_keys") for (const k of iss.keys) {
				if (!unrecKeys.has(k)) unrecKeys.set(k, {});
				unrecKeys.get(k).r = true;
			}
			else result.issues.push(iss);
			const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
			if (bothKeys.length && unrecIssue) result.issues.push({
				...unrecIssue,
				keys: bothKeys
			});
			if (aborted(result)) return result;
			const merged = mergeValues(left.value, right.value);
			if (!merged.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
			result.value = merged.data;
			return result;
		}
		const $ZodRecord = /*@__PURE__*/ $constructor("$ZodRecord", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, ctx) => {
				const input = payload.value;
				if (!isPlainObject(input)) {
					payload.issues.push({
						expected: "record",
						code: "invalid_type",
						input,
						inst
					});
					return payload;
				}
				const proms = [];
				const values = def.keyType._zod.values;
				if (values) {
					payload.value = {};
					const recordKeys = /* @__PURE__ */ new Set();
					for (const key of values) if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
						recordKeys.add(typeof key === "number" ? key.toString() : key);
						const keyResult = def.keyType._zod.run({
							value: key,
							issues: []
						}, ctx);
						if (keyResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
						if (keyResult.issues.length) {
							payload.issues.push({
								code: "invalid_key",
								origin: "record",
								issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
								input: key,
								path: [key],
								inst
							});
							continue;
						}
						const outKey = keyResult.value;
						const result = def.valueType._zod.run({
							value: input[key],
							issues: []
						}, ctx);
						if (result instanceof Promise) proms.push(result.then((result) => {
							if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
							payload.value[outKey] = result.value;
						}));
						else {
							if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
							payload.value[outKey] = result.value;
						}
					}
					let unrecognized;
					for (const key in input) if (!recordKeys.has(key)) {
						unrecognized = unrecognized ?? [];
						unrecognized.push(key);
					}
					if (unrecognized && unrecognized.length > 0) payload.issues.push({
						code: "unrecognized_keys",
						input,
						inst,
						keys: unrecognized
					});
				} else {
					payload.value = {};
					for (const key of Reflect.ownKeys(input)) {
						if (key === "__proto__") continue;
						if (!Object.prototype.propertyIsEnumerable.call(input, key)) continue;
						let keyResult = def.keyType._zod.run({
							value: key,
							issues: []
						}, ctx);
						if (keyResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
						if (typeof key === "string" && number$1.test(key) && keyResult.issues.length) {
							const retryResult = def.keyType._zod.run({
								value: Number(key),
								issues: []
							}, ctx);
							if (retryResult instanceof Promise) throw new Error("Async schemas not supported in object keys currently");
							if (retryResult.issues.length === 0) keyResult = retryResult;
						}
						if (keyResult.issues.length) {
							if (def.mode === "loose") payload.value[key] = input[key];
							else payload.issues.push({
								code: "invalid_key",
								origin: "record",
								issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
								input: key,
								path: [key],
								inst
							});
							continue;
						}
						const result = def.valueType._zod.run({
							value: input[key],
							issues: []
						}, ctx);
						if (result instanceof Promise) proms.push(result.then((result) => {
							if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
							payload.value[keyResult.value] = result.value;
						}));
						else {
							if (result.issues.length) payload.issues.push(...prefixIssues(key, result.issues));
							payload.value[keyResult.value] = result.value;
						}
					}
				}
				if (proms.length) return Promise.all(proms).then(() => payload);
				return payload;
			};
		});
		const $ZodEnum = /*@__PURE__*/ $constructor("$ZodEnum", (inst, def) => {
			$ZodType.init(inst, def);
			const values = getEnumValues(def.entries);
			const valuesSet = new Set(values);
			inst._zod.values = valuesSet;
			inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
			inst._zod.parse = (payload, _ctx) => {
				const input = payload.value;
				if (valuesSet.has(input)) return payload;
				payload.issues.push({
					code: "invalid_value",
					values,
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodLiteral = /*@__PURE__*/ $constructor("$ZodLiteral", (inst, def) => {
			$ZodType.init(inst, def);
			if (def.values.length === 0) throw new Error("Cannot create literal schema with no valid values");
			const values = new Set(def.values);
			inst._zod.values = values;
			inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$`);
			inst._zod.parse = (payload, _ctx) => {
				const input = payload.value;
				if (values.has(input)) return payload;
				payload.issues.push({
					code: "invalid_value",
					values: def.values,
					input,
					inst
				});
				return payload;
			};
		});
		const $ZodTransform = /*@__PURE__*/ $constructor("$ZodTransform", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
				const _out = def.transform(payload.value, payload);
				if (ctx.async) return (_out instanceof Promise ? _out : Promise.resolve(_out)).then((output) => {
					payload.value = output;
					payload.fallback = true;
					return payload;
				});
				if (_out instanceof Promise) throw new $ZodAsyncError();
				payload.value = _out;
				payload.fallback = true;
				return payload;
			};
		});
		function handleOptionalResult(result, input) {
			if (input === void 0 && (result.issues.length || result.fallback)) return {
				issues: [],
				value: void 0
			};
			return result;
		}
		const $ZodOptional = /*@__PURE__*/ $constructor("$ZodOptional", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			inst._zod.optout = "optional";
			defineLazy(inst._zod, "values", () => {
				return def.innerType._zod.values ? new Set([...def.innerType._zod.values, void 0]) : void 0;
			});
			defineLazy(inst._zod, "pattern", () => {
				const pattern = def.innerType._zod.pattern;
				return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				if (def.innerType._zod.optin === "optional") {
					const input = payload.value;
					const result = def.innerType._zod.run(payload, ctx);
					if (result instanceof Promise) return result.then((r) => handleOptionalResult(r, input));
					return handleOptionalResult(result, input);
				}
				if (payload.value === void 0) return payload;
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodExactOptional = /*@__PURE__*/ $constructor("$ZodExactOptional", (inst, def) => {
			$ZodOptional.init(inst, def);
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
			inst._zod.parse = (payload, ctx) => {
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodNullable = /*@__PURE__*/ $constructor("$ZodNullable", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
			defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
			defineLazy(inst._zod, "pattern", () => {
				const pattern = def.innerType._zod.pattern;
				return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
			});
			defineLazy(inst._zod, "values", () => {
				return def.innerType._zod.values ? new Set([...def.innerType._zod.values, null]) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				if (payload.value === null) return payload;
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodDefault = /*@__PURE__*/ $constructor("$ZodDefault", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				if (payload.value === void 0) {
					payload.value = def.defaultValue;
					/**
					* $ZodDefault returns the default value immediately in forward direction.
					* It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
					return payload;
				}
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((result) => handleDefaultResult(result, def));
				return handleDefaultResult(result, def);
			};
		});
		function handleDefaultResult(payload, def) {
			if (payload.value === void 0) payload.value = def.defaultValue;
			return payload;
		}
		const $ZodPrefault = /*@__PURE__*/ $constructor("$ZodPrefault", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				if (payload.value === void 0) payload.value = def.defaultValue;
				return def.innerType._zod.run(payload, ctx);
			};
		});
		const $ZodNonOptional = /*@__PURE__*/ $constructor("$ZodNonOptional", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "values", () => {
				const v = def.innerType._zod.values;
				return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
			});
			inst._zod.parse = (payload, ctx) => {
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((result) => handleNonOptionalResult(result, inst));
				return handleNonOptionalResult(result, inst);
			};
		});
		function handleNonOptionalResult(payload, inst) {
			if (!payload.issues.length && payload.value === void 0) payload.issues.push({
				code: "invalid_type",
				expected: "nonoptional",
				input: payload.value,
				inst
			});
			return payload;
		}
		const $ZodCatch = /*@__PURE__*/ $constructor("$ZodCatch", (inst, def) => {
			$ZodType.init(inst, def);
			inst._zod.optin = "optional";
			defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then((result) => {
					payload.value = result.value;
					if (result.issues.length) {
						payload.value = def.catchValue({
							...payload,
							error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
							input: payload.value
						});
						payload.issues = [];
						payload.fallback = true;
					}
					return payload;
				});
				payload.value = result.value;
				if (result.issues.length) {
					payload.value = def.catchValue({
						...payload,
						error: { issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config())) },
						input: payload.value
					});
					payload.issues = [];
					payload.fallback = true;
				}
				return payload;
			};
		});
		const $ZodPipe = /*@__PURE__*/ $constructor("$ZodPipe", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "values", () => def.in._zod.values);
			defineLazy(inst._zod, "optin", () => def.in._zod.optin);
			defineLazy(inst._zod, "optout", () => def.out._zod.optout);
			defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") {
					const right = def.out._zod.run(payload, ctx);
					if (right instanceof Promise) return right.then((right) => handlePipeResult(right, def.in, ctx));
					return handlePipeResult(right, def.in, ctx);
				}
				const left = def.in._zod.run(payload, ctx);
				if (left instanceof Promise) return left.then((left) => handlePipeResult(left, def.out, ctx));
				return handlePipeResult(left, def.out, ctx);
			};
		});
		function handlePipeResult(left, next, ctx) {
			if (left.issues.length) {
				left.aborted = true;
				return left;
			}
			return next._zod.run({
				value: left.value,
				issues: left.issues,
				fallback: left.fallback
			}, ctx);
		}
		const $ZodReadonly = /*@__PURE__*/ $constructor("$ZodReadonly", (inst, def) => {
			$ZodType.init(inst, def);
			defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
			defineLazy(inst._zod, "values", () => def.innerType._zod.values);
			defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
			defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
			inst._zod.parse = (payload, ctx) => {
				if (ctx.direction === "backward") return def.innerType._zod.run(payload, ctx);
				const result = def.innerType._zod.run(payload, ctx);
				if (result instanceof Promise) return result.then(handleReadonlyResult);
				return handleReadonlyResult(result);
			};
		});
		function handleReadonlyResult(payload) {
			payload.value = Object.freeze(payload.value);
			return payload;
		}
		const $ZodCustom = /*@__PURE__*/ $constructor("$ZodCustom", (inst, def) => {
			$ZodCheck.init(inst, def);
			$ZodType.init(inst, def);
			inst._zod.parse = (payload, _) => {
				return payload;
			};
			inst._zod.check = (payload) => {
				const input = payload.value;
				const r = def.fn(input);
				if (r instanceof Promise) return r.then((r) => handleRefineResult(r, payload, input, inst));
				handleRefineResult(r, payload, input, inst);
			};
		});
		function handleRefineResult(result, payload, input, inst) {
			if (!result) {
				const _iss = {
					code: "custom",
					input,
					inst,
					path: [...inst._zod.def.path ?? []],
					continue: !inst._zod.def.abort
				};
				if (inst._zod.def.params) _iss.params = inst._zod.def.params;
				payload.issues.push(issue(_iss));
			}
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/registries.js
		var _a;
		var $ZodRegistry = class {
			constructor() {
				this._map = /* @__PURE__ */ new WeakMap();
				this._idmap = /* @__PURE__ */ new Map();
			}
			add(schema, ..._meta) {
				const meta = _meta[0];
				this._map.set(schema, meta);
				if (meta && typeof meta === "object" && "id" in meta) this._idmap.set(meta.id, schema);
				return this;
			}
			clear() {
				this._map = /* @__PURE__ */ new WeakMap();
				this._idmap = /* @__PURE__ */ new Map();
				return this;
			}
			remove(schema) {
				const meta = this._map.get(schema);
				if (meta && typeof meta === "object" && "id" in meta) this._idmap.delete(meta.id);
				this._map.delete(schema);
				return this;
			}
			get(schema) {
				const p = schema._zod.parent;
				if (p) {
					const pm = { ...this.get(p) ?? {} };
					delete pm.id;
					const f = {
						...pm,
						...this._map.get(schema)
					};
					return Object.keys(f).length ? f : void 0;
				}
				return this._map.get(schema);
			}
			has(schema) {
				return this._map.has(schema);
			}
		};
		function registry() {
			return new $ZodRegistry();
		}
		(_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
		const globalRegistry = globalThis.__zod_globalRegistry;
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/api.js
		// @__NO_SIDE_EFFECTS__
		function _string(Class, params) {
			return new Class({
				type: "string",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _email(Class, params) {
			return new Class({
				type: "string",
				format: "email",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _guid(Class, params) {
			return new Class({
				type: "string",
				format: "guid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuid(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv4(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v4",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv6(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v6",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uuidv7(Class, params) {
			return new Class({
				type: "string",
				format: "uuid",
				check: "string_format",
				abort: false,
				version: "v7",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _url(Class, params) {
			return new Class({
				type: "string",
				format: "url",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _emoji(Class, params) {
			return new Class({
				type: "string",
				format: "emoji",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _nanoid(Class, params) {
			return new Class({
				type: "string",
				format: "nanoid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link _cuid2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		// @__NO_SIDE_EFFECTS__
		function _cuid(Class, params) {
			return new Class({
				type: "string",
				format: "cuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cuid2(Class, params) {
			return new Class({
				type: "string",
				format: "cuid2",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ulid(Class, params) {
			return new Class({
				type: "string",
				format: "ulid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _xid(Class, params) {
			return new Class({
				type: "string",
				format: "xid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ksuid(Class, params) {
			return new Class({
				type: "string",
				format: "ksuid",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ipv4(Class, params) {
			return new Class({
				type: "string",
				format: "ipv4",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _ipv6(Class, params) {
			return new Class({
				type: "string",
				format: "ipv6",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cidrv4(Class, params) {
			return new Class({
				type: "string",
				format: "cidrv4",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _cidrv6(Class, params) {
			return new Class({
				type: "string",
				format: "cidrv6",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _base64(Class, params) {
			return new Class({
				type: "string",
				format: "base64",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _base64url(Class, params) {
			return new Class({
				type: "string",
				format: "base64url",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _e164(Class, params) {
			return new Class({
				type: "string",
				format: "e164",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _jwt(Class, params) {
			return new Class({
				type: "string",
				format: "jwt",
				check: "string_format",
				abort: false,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDateTime(Class, params) {
			return new Class({
				type: "string",
				format: "datetime",
				check: "string_format",
				offset: false,
				local: false,
				precision: null,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDate(Class, params) {
			return new Class({
				type: "string",
				format: "date",
				check: "string_format",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoTime(Class, params) {
			return new Class({
				type: "string",
				format: "time",
				check: "string_format",
				precision: null,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _isoDuration(Class, params) {
			return new Class({
				type: "string",
				format: "duration",
				check: "string_format",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _number(Class, params) {
			return new Class({
				type: "number",
				checks: [],
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _int(Class, params) {
			return new Class({
				type: "number",
				check: "number_format",
				abort: false,
				format: "safeint",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _boolean(Class, params) {
			return new Class({
				type: "boolean",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _unknown(Class) {
			return new Class({ type: "unknown" });
		}
		// @__NO_SIDE_EFFECTS__
		function _never(Class, params) {
			return new Class({
				type: "never",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _void$1(Class, params) {
			return new Class({
				type: "void",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lt(value, params) {
			return new $ZodCheckLessThan({
				check: "less_than",
				...normalizeParams(params),
				value,
				inclusive: false
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lte(value, params) {
			return new $ZodCheckLessThan({
				check: "less_than",
				...normalizeParams(params),
				value,
				inclusive: true
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _gt(value, params) {
			return new $ZodCheckGreaterThan({
				check: "greater_than",
				...normalizeParams(params),
				value,
				inclusive: false
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _gte(value, params) {
			return new $ZodCheckGreaterThan({
				check: "greater_than",
				...normalizeParams(params),
				value,
				inclusive: true
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _multipleOf(value, params) {
			return new $ZodCheckMultipleOf({
				check: "multiple_of",
				...normalizeParams(params),
				value
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _maxLength(maximum, params) {
			return new $ZodCheckMaxLength({
				check: "max_length",
				...normalizeParams(params),
				maximum
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _minLength(minimum, params) {
			return new $ZodCheckMinLength({
				check: "min_length",
				...normalizeParams(params),
				minimum
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _length(length, params) {
			return new $ZodCheckLengthEquals({
				check: "length_equals",
				...normalizeParams(params),
				length
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _regex(pattern, params) {
			return new $ZodCheckRegex({
				check: "string_format",
				format: "regex",
				...normalizeParams(params),
				pattern
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _lowercase(params) {
			return new $ZodCheckLowerCase({
				check: "string_format",
				format: "lowercase",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _uppercase(params) {
			return new $ZodCheckUpperCase({
				check: "string_format",
				format: "uppercase",
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _includes(includes, params) {
			return new $ZodCheckIncludes({
				check: "string_format",
				format: "includes",
				...normalizeParams(params),
				includes
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _startsWith(prefix, params) {
			return new $ZodCheckStartsWith({
				check: "string_format",
				format: "starts_with",
				...normalizeParams(params),
				prefix
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _endsWith(suffix, params) {
			return new $ZodCheckEndsWith({
				check: "string_format",
				format: "ends_with",
				...normalizeParams(params),
				suffix
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _overwrite(tx) {
			return new $ZodCheckOverwrite({
				check: "overwrite",
				tx
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _normalize(form) {
			return /* @__PURE__ */ _overwrite((input) => input.normalize(form));
		}
		// @__NO_SIDE_EFFECTS__
		function _trim() {
			return /* @__PURE__ */ _overwrite((input) => input.trim());
		}
		// @__NO_SIDE_EFFECTS__
		function _toLowerCase() {
			return /* @__PURE__ */ _overwrite((input) => input.toLowerCase());
		}
		// @__NO_SIDE_EFFECTS__
		function _toUpperCase() {
			return /* @__PURE__ */ _overwrite((input) => input.toUpperCase());
		}
		// @__NO_SIDE_EFFECTS__
		function _slugify() {
			return /* @__PURE__ */ _overwrite((input) => slugify(input));
		}
		// @__NO_SIDE_EFFECTS__
		function _array(Class, element, params) {
			return new Class({
				type: "array",
				element,
				...normalizeParams(params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _refine(Class, fn, _params) {
			return new Class({
				type: "custom",
				check: "custom",
				fn,
				...normalizeParams(_params)
			});
		}
		// @__NO_SIDE_EFFECTS__
		function _superRefine(fn, params) {
			const ch = /* @__PURE__ */ _check((payload) => {
				payload.addIssue = (issue$2) => {
					if (typeof issue$2 === "string") payload.issues.push(issue(issue$2, payload.value, ch._zod.def));
					else {
						const _issue = issue$2;
						if (_issue.fatal) _issue.continue = false;
						_issue.code ?? (_issue.code = "custom");
						_issue.input ?? (_issue.input = payload.value);
						_issue.inst ?? (_issue.inst = ch);
						_issue.continue ?? (_issue.continue = !ch._zod.def.abort);
						payload.issues.push(issue(_issue));
					}
				};
				return fn(payload.value, payload);
			}, params);
			return ch;
		}
		// @__NO_SIDE_EFFECTS__
		function _check(fn, params) {
			const ch = new $ZodCheck({
				check: "custom",
				...normalizeParams(params)
			});
			ch._zod.check = fn;
			return ch;
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/to-json-schema.js
		function initializeContext(params) {
			let target = params?.target ?? "draft-2020-12";
			if (target === "draft-4") target = "draft-04";
			if (target === "draft-7") target = "draft-07";
			return {
				processors: params.processors ?? {},
				metadataRegistry: params?.metadata ?? globalRegistry,
				target,
				unrepresentable: params?.unrepresentable ?? "throw",
				override: params?.override ?? (() => {}),
				io: params?.io ?? "output",
				counter: 0,
				seen: /* @__PURE__ */ new Map(),
				cycles: params?.cycles ?? "ref",
				reused: params?.reused ?? "inline",
				external: params?.external ?? void 0
			};
		}
		function process(schema, ctx, _params = {
			path: [],
			schemaPath: []
		}) {
			var _a;
			const def = schema._zod.def;
			const seen = ctx.seen.get(schema);
			if (seen) {
				seen.count++;
				if (_params.schemaPath.includes(schema)) seen.cycle = _params.path;
				return seen.schema;
			}
			const result = {
				schema: {},
				count: 1,
				cycle: void 0,
				path: _params.path
			};
			ctx.seen.set(schema, result);
			const overrideSchema = schema._zod.toJSONSchema?.();
			if (overrideSchema) result.schema = overrideSchema;
			else {
				const params = {
					..._params,
					schemaPath: [..._params.schemaPath, schema],
					path: _params.path
				};
				if (schema._zod.processJSONSchema) schema._zod.processJSONSchema(ctx, result.schema, params);
				else {
					const _json = result.schema;
					const processor = ctx.processors[def.type];
					if (!processor) throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
					processor(schema, ctx, _json, params);
				}
				const parent = schema._zod.parent;
				if (parent) {
					if (!result.ref) result.ref = parent;
					process(parent, ctx, params);
					ctx.seen.get(parent).isParent = true;
				}
			}
			const meta = ctx.metadataRegistry.get(schema);
			if (meta) Object.assign(result.schema, meta);
			if (ctx.io === "input" && isTransforming(schema)) {
				delete result.schema.examples;
				delete result.schema.default;
			}
			if (ctx.io === "input" && "_prefault" in result.schema) (_a = result.schema).default ?? (_a.default = result.schema._prefault);
			delete result.schema._prefault;
			return ctx.seen.get(schema).schema;
		}
		function extractDefs(ctx, schema) {
			const root = ctx.seen.get(schema);
			if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
			const idToSchema = /* @__PURE__ */ new Map();
			for (const entry of ctx.seen.entries()) {
				const id = ctx.metadataRegistry.get(entry[0])?.id;
				if (id) {
					const existing = idToSchema.get(id);
					if (existing && existing !== entry[0]) throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
					idToSchema.set(id, entry[0]);
				}
			}
			const makeURI = (entry) => {
				const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
				if (ctx.external) {
					const externalId = ctx.external.registry.get(entry[0])?.id;
					const uriGenerator = ctx.external.uri ?? ((id) => id);
					if (externalId) return { ref: uriGenerator(externalId) };
					const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
					entry[1].defId = id;
					return {
						defId: id,
						ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}`
					};
				}
				if (entry[1] === root) return { ref: "#" };
				const defUriPrefix = `#/${defsSegment}/`;
				const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
				return {
					defId,
					ref: defUriPrefix + defId
				};
			};
			const extractToDef = (entry) => {
				if (entry[1].schema.$ref) return;
				const seen = entry[1];
				const { ref, defId } = makeURI(entry);
				seen.def = { ...seen.schema };
				if (defId) seen.defId = defId;
				const schema = seen.schema;
				for (const key in schema) delete schema[key];
				schema.$ref = ref;
			};
			if (ctx.cycles === "throw") for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (seen.cycle) throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
			}
			for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (schema === entry[0]) {
					extractToDef(entry);
					continue;
				}
				if (ctx.external) {
					const ext = ctx.external.registry.get(entry[0])?.id;
					if (schema !== entry[0] && ext) {
						extractToDef(entry);
						continue;
					}
				}
				if (ctx.metadataRegistry.get(entry[0])?.id) {
					extractToDef(entry);
					continue;
				}
				if (seen.cycle) {
					extractToDef(entry);
					continue;
				}
				if (seen.count > 1) {
					if (ctx.reused === "ref") {
						extractToDef(entry);
						continue;
					}
				}
			}
		}
		function finalize(ctx, schema) {
			const root = ctx.seen.get(schema);
			if (!root) throw new Error("Unprocessed schema. This is a bug in Zod.");
			const flattenRef = (zodSchema) => {
				const seen = ctx.seen.get(zodSchema);
				if (seen.ref === null) return;
				const schema = seen.def ?? seen.schema;
				const _cached = { ...schema };
				const ref = seen.ref;
				seen.ref = null;
				if (ref) {
					flattenRef(ref);
					const refSeen = ctx.seen.get(ref);
					const refSchema = refSeen.schema;
					if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
						schema.allOf = schema.allOf ?? [];
						schema.allOf.push(refSchema);
					} else Object.assign(schema, refSchema);
					Object.assign(schema, _cached);
					if (zodSchema._zod.parent === ref) for (const key in schema) {
						if (key === "$ref" || key === "allOf") continue;
						if (!(key in _cached)) delete schema[key];
					}
					if (refSchema.$ref && refSeen.def) for (const key in schema) {
						if (key === "$ref" || key === "allOf") continue;
						if (key in refSeen.def && JSON.stringify(schema[key]) === JSON.stringify(refSeen.def[key])) delete schema[key];
					}
				}
				const parent = zodSchema._zod.parent;
				if (parent && parent !== ref) {
					flattenRef(parent);
					const parentSeen = ctx.seen.get(parent);
					if (parentSeen?.schema.$ref) {
						schema.$ref = parentSeen.schema.$ref;
						if (parentSeen.def) for (const key in schema) {
							if (key === "$ref" || key === "allOf") continue;
							if (key in parentSeen.def && JSON.stringify(schema[key]) === JSON.stringify(parentSeen.def[key])) delete schema[key];
						}
					}
				}
				ctx.override({
					zodSchema,
					jsonSchema: schema,
					path: seen.path ?? []
				});
			};
			for (const entry of [...ctx.seen.entries()].reverse()) flattenRef(entry[0]);
			const result = {};
			if (ctx.target === "draft-2020-12") result.$schema = "https://json-schema.org/draft/2020-12/schema";
			else if (ctx.target === "draft-07") result.$schema = "http://json-schema.org/draft-07/schema#";
			else if (ctx.target === "draft-04") result.$schema = "http://json-schema.org/draft-04/schema#";
			else if (ctx.target === "openapi-3.0") {}
			if (ctx.external?.uri) {
				const id = ctx.external.registry.get(schema)?.id;
				if (!id) throw new Error("Schema is missing an `id` property");
				result.$id = ctx.external.uri(id);
			}
			Object.assign(result, root.def ?? root.schema);
			const rootMetaId = ctx.metadataRegistry.get(schema)?.id;
			if (rootMetaId !== void 0 && result.id === rootMetaId) delete result.id;
			const defs = ctx.external?.defs ?? {};
			for (const entry of ctx.seen.entries()) {
				const seen = entry[1];
				if (seen.def && seen.defId) {
					if (seen.def.id === seen.defId) delete seen.def.id;
					defs[seen.defId] = seen.def;
				}
			}
			if (ctx.external) {} else if (Object.keys(defs).length > 0) if (ctx.target === "draft-2020-12") result.$defs = defs;
			else result.definitions = defs;
			try {
				const finalized = JSON.parse(JSON.stringify(result));
				Object.defineProperty(finalized, "~standard", {
					value: {
						...schema["~standard"],
						jsonSchema: {
							input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
							output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
						}
					},
					enumerable: false,
					writable: false
				});
				return finalized;
			} catch (_err) {
				throw new Error("Error converting schema to JSON.");
			}
		}
		function isTransforming(_schema, _ctx) {
			const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
			if (ctx.seen.has(_schema)) return false;
			ctx.seen.add(_schema);
			const def = _schema._zod.def;
			if (def.type === "transform") return true;
			if (def.type === "array") return isTransforming(def.element, ctx);
			if (def.type === "set") return isTransforming(def.valueType, ctx);
			if (def.type === "lazy") return isTransforming(def.getter(), ctx);
			if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") return isTransforming(def.innerType, ctx);
			if (def.type === "intersection") return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
			if (def.type === "record" || def.type === "map") return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
			if (def.type === "pipe") {
				if (_schema._zod.traits.has("$ZodCodec")) return true;
				return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
			}
			if (def.type === "object") {
				for (const key in def.shape) if (isTransforming(def.shape[key], ctx)) return true;
				return false;
			}
			if (def.type === "union") {
				for (const option of def.options) if (isTransforming(option, ctx)) return true;
				return false;
			}
			if (def.type === "tuple") {
				for (const item of def.items) if (isTransforming(item, ctx)) return true;
				if (def.rest && isTransforming(def.rest, ctx)) return true;
				return false;
			}
			return false;
		}
		/**
		* Creates a toJSONSchema method for a schema instance.
		* This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
		*/
		const createToJSONSchemaMethod = (schema, processors = {}) => (params) => {
			const ctx = initializeContext({
				...params,
				processors
			});
			process(schema, ctx);
			extractDefs(ctx, schema);
			return finalize(ctx, schema);
		};
		const createStandardJSONSchemaMethod = (schema, io, processors = {}) => (params) => {
			const { libraryOptions, target } = params ?? {};
			const ctx = initializeContext({
				...libraryOptions ?? {},
				target,
				io,
				processors
			});
			process(schema, ctx);
			extractDefs(ctx, schema);
			return finalize(ctx, schema);
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/core/json-schema-processors.js
		const formatMap = {
			guid: "uuid",
			url: "uri",
			datetime: "date-time",
			json_string: "json-string",
			regex: ""
		};
		const stringProcessor = (schema, ctx, _json, _params) => {
			const json = _json;
			json.type = "string";
			const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
			if (typeof minimum === "number") json.minLength = minimum;
			if (typeof maximum === "number") json.maxLength = maximum;
			if (format) {
				json.format = formatMap[format] ?? format;
				if (json.format === "") delete json.format;
				if (format === "time") delete json.format;
			}
			if (contentEncoding) json.contentEncoding = contentEncoding;
			if (patterns && patterns.size > 0) {
				const regexes = [...patterns];
				if (regexes.length === 1) json.pattern = regexes[0].source;
				else if (regexes.length > 1) json.allOf = [...regexes.map((regex) => ({
					...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
					pattern: regex.source
				}))];
			}
		};
		const numberProcessor = (schema, ctx, _json, _params) => {
			const json = _json;
			const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
			if (typeof format === "string" && format.includes("int")) json.type = "integer";
			else json.type = "number";
			const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
			const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
			const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";
			if (exMin) if (legacy) {
				json.minimum = exclusiveMinimum;
				json.exclusiveMinimum = true;
			} else json.exclusiveMinimum = exclusiveMinimum;
			else if (typeof minimum === "number") json.minimum = minimum;
			if (exMax) if (legacy) {
				json.maximum = exclusiveMaximum;
				json.exclusiveMaximum = true;
			} else json.exclusiveMaximum = exclusiveMaximum;
			else if (typeof maximum === "number") json.maximum = maximum;
			if (typeof multipleOf === "number") json.multipleOf = multipleOf;
		};
		const booleanProcessor = (_schema, _ctx, json, _params) => {
			json.type = "boolean";
		};
		const voidProcessor = (_schema, ctx, _json, _params) => {
			if (ctx.unrepresentable === "throw") throw new Error("Void cannot be represented in JSON Schema");
		};
		const neverProcessor = (_schema, _ctx, json, _params) => {
			json.not = {};
		};
		const enumProcessor = (schema, _ctx, json, _params) => {
			const def = schema._zod.def;
			const values = getEnumValues(def.entries);
			if (values.every((v) => typeof v === "number")) json.type = "number";
			if (values.every((v) => typeof v === "string")) json.type = "string";
			json.enum = values;
		};
		const literalProcessor = (schema, ctx, json, _params) => {
			const def = schema._zod.def;
			const vals = [];
			for (const val of def.values) if (val === void 0) {
				if (ctx.unrepresentable === "throw") throw new Error("Literal `undefined` cannot be represented in JSON Schema");
			} else if (typeof val === "bigint") if (ctx.unrepresentable === "throw") throw new Error("BigInt literals cannot be represented in JSON Schema");
			else vals.push(Number(val));
			else vals.push(val);
			if (vals.length === 0) {} else if (vals.length === 1) {
				const val = vals[0];
				json.type = val === null ? "null" : typeof val;
				if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") json.enum = [val];
				else json.const = val;
			} else {
				if (vals.every((v) => typeof v === "number")) json.type = "number";
				if (vals.every((v) => typeof v === "string")) json.type = "string";
				if (vals.every((v) => typeof v === "boolean")) json.type = "boolean";
				if (vals.every((v) => v === null)) json.type = "null";
				json.enum = vals;
			}
		};
		const customProcessor = (_schema, ctx, _json, _params) => {
			if (ctx.unrepresentable === "throw") throw new Error("Custom types cannot be represented in JSON Schema");
		};
		const transformProcessor = (_schema, ctx, _json, _params) => {
			if (ctx.unrepresentable === "throw") throw new Error("Transforms cannot be represented in JSON Schema");
		};
		const arrayProcessor = (schema, ctx, _json, params) => {
			const json = _json;
			const def = schema._zod.def;
			const { minimum, maximum } = schema._zod.bag;
			if (typeof minimum === "number") json.minItems = minimum;
			if (typeof maximum === "number") json.maxItems = maximum;
			json.type = "array";
			json.items = process(def.element, ctx, {
				...params,
				path: [...params.path, "items"]
			});
		};
		const objectProcessor = (schema, ctx, _json, params) => {
			const json = _json;
			const def = schema._zod.def;
			json.type = "object";
			json.properties = {};
			const shape = def.shape;
			for (const key in shape) json.properties[key] = process(shape[key], ctx, {
				...params,
				path: [
					...params.path,
					"properties",
					key
				]
			});
			const allKeys = new Set(Object.keys(shape));
			const requiredKeys = new Set([...allKeys].filter((key) => {
				const v = def.shape[key]._zod;
				if (ctx.io === "input") return v.optin === void 0;
				else return v.optout === void 0;
			}));
			if (requiredKeys.size > 0) json.required = Array.from(requiredKeys);
			if (def.catchall?._zod.def.type === "never") json.additionalProperties = false;
			else if (!def.catchall) {
				if (ctx.io === "output") json.additionalProperties = false;
			} else if (def.catchall) json.additionalProperties = process(def.catchall, ctx, {
				...params,
				path: [...params.path, "additionalProperties"]
			});
		};
		const unionProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const isExclusive = def.inclusive === false;
			const options = def.options.map((x, i) => process(x, ctx, {
				...params,
				path: [
					...params.path,
					isExclusive ? "oneOf" : "anyOf",
					i
				]
			}));
			if (isExclusive) json.oneOf = options;
			else json.anyOf = options;
		};
		const intersectionProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const a = process(def.left, ctx, {
				...params,
				path: [
					...params.path,
					"allOf",
					0
				]
			});
			const b = process(def.right, ctx, {
				...params,
				path: [
					...params.path,
					"allOf",
					1
				]
			});
			const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
			json.allOf = [...isSimpleIntersection(a) ? a.allOf : [a], ...isSimpleIntersection(b) ? b.allOf : [b]];
		};
		const recordProcessor = (schema, ctx, _json, params) => {
			const json = _json;
			const def = schema._zod.def;
			json.type = "object";
			const keyType = def.keyType;
			const patterns = keyType._zod.bag?.patterns;
			if (def.mode === "loose" && patterns && patterns.size > 0) {
				const valueSchema = process(def.valueType, ctx, {
					...params,
					path: [
						...params.path,
						"patternProperties",
						"*"
					]
				});
				json.patternProperties = {};
				for (const pattern of patterns) json.patternProperties[pattern.source] = valueSchema;
			} else {
				if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") json.propertyNames = process(def.keyType, ctx, {
					...params,
					path: [...params.path, "propertyNames"]
				});
				json.additionalProperties = process(def.valueType, ctx, {
					...params,
					path: [...params.path, "additionalProperties"]
				});
			}
			const keyValues = keyType._zod.values;
			if (keyValues) {
				const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
				if (validKeyValues.length > 0) json.required = validKeyValues;
			}
		};
		const nullableProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			const inner = process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			if (ctx.target === "openapi-3.0") {
				seen.ref = def.innerType;
				json.nullable = true;
			} else json.anyOf = [inner, { type: "null" }];
		};
		const nonoptionalProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
		};
		const defaultProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			json.default = JSON.parse(JSON.stringify(def.defaultValue));
		};
		const prefaultProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			if (ctx.io === "input") json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
		};
		const catchProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			let catchValue;
			try {
				catchValue = def.catchValue(void 0);
			} catch {
				throw new Error("Dynamic catch values are not supported in JSON Schema");
			}
			json.default = catchValue;
		};
		const pipeProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			const inIsTransform = def.in._zod.traits.has("$ZodTransform");
			const innerType = ctx.io === "input" ? inIsTransform ? def.out : def.in : def.out;
			process(innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = innerType;
		};
		const readonlyProcessor = (schema, ctx, json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
			json.readOnly = true;
		};
		const optionalProcessor = (schema, ctx, _json, params) => {
			const def = schema._zod.def;
			process(def.innerType, ctx, params);
			const seen = ctx.seen.get(schema);
			seen.ref = def.innerType;
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/iso.js
		const ZodISODateTime = /*@__PURE__*/ $constructor("ZodISODateTime", (inst, def) => {
			$ZodISODateTime.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function datetime(params) {
			return /* @__PURE__ */ _isoDateTime(ZodISODateTime, params);
		}
		const ZodISODate = /*@__PURE__*/ $constructor("ZodISODate", (inst, def) => {
			$ZodISODate.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function date(params) {
			return /* @__PURE__ */ _isoDate(ZodISODate, params);
		}
		const ZodISOTime = /*@__PURE__*/ $constructor("ZodISOTime", (inst, def) => {
			$ZodISOTime.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function time(params) {
			return /* @__PURE__ */ _isoTime(ZodISOTime, params);
		}
		const ZodISODuration = /*@__PURE__*/ $constructor("ZodISODuration", (inst, def) => {
			$ZodISODuration.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		function duration(params) {
			return /* @__PURE__ */ _isoDuration(ZodISODuration, params);
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/errors.js
		const initializer = (inst, issues) => {
			$ZodError.init(inst, issues);
			inst.name = "ZodError";
			Object.defineProperties(inst, {
				format: { value: (mapper) => formatError(inst, mapper) },
				flatten: { value: (mapper) => flattenError(inst, mapper) },
				addIssue: { value: (issue) => {
					inst.issues.push(issue);
					inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
				} },
				addIssues: { value: (issues) => {
					inst.issues.push(...issues);
					inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
				} },
				isEmpty: { get() {
					return inst.issues.length === 0;
				} }
			});
		};
		const ZodRealError = /*@__PURE__*/ $constructor("ZodError", initializer, { Parent: Error });
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/parse.js
		const parse = /* @__PURE__ */ _parse(ZodRealError);
		const parseAsync = /* @__PURE__ */ _parseAsync(ZodRealError);
		const safeParse = /* @__PURE__ */ _safeParse(ZodRealError);
		const safeParseAsync = /* @__PURE__ */ _safeParseAsync(ZodRealError);
		const encode = /* @__PURE__ */ _encode(ZodRealError);
		const decode = /* @__PURE__ */ _decode(ZodRealError);
		const encodeAsync = /* @__PURE__ */ _encodeAsync(ZodRealError);
		const decodeAsync = /* @__PURE__ */ _decodeAsync(ZodRealError);
		const safeEncode = /* @__PURE__ */ _safeEncode(ZodRealError);
		const safeDecode = /* @__PURE__ */ _safeDecode(ZodRealError);
		const safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
		const safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);
		//#endregion
		//#region ../../../node_modules/.pnpm/zod@4.4.3/node_modules/zod/v4/classic/schemas.js
		const _installedGroups = /* @__PURE__ */ new WeakMap();
		function _installLazyMethods(inst, group, methods) {
			const proto = Object.getPrototypeOf(inst);
			let installed = _installedGroups.get(proto);
			if (!installed) {
				installed = /* @__PURE__ */ new Set();
				_installedGroups.set(proto, installed);
			}
			if (installed.has(group)) return;
			installed.add(group);
			for (const key in methods) {
				const fn = methods[key];
				Object.defineProperty(proto, key, {
					configurable: true,
					enumerable: false,
					get() {
						const bound = fn.bind(this);
						Object.defineProperty(this, key, {
							configurable: true,
							writable: true,
							enumerable: true,
							value: bound
						});
						return bound;
					},
					set(v) {
						Object.defineProperty(this, key, {
							configurable: true,
							writable: true,
							enumerable: true,
							value: v
						});
					}
				});
			}
		}
		const ZodType = /*@__PURE__*/ $constructor("ZodType", (inst, def) => {
			$ZodType.init(inst, def);
			Object.assign(inst["~standard"], { jsonSchema: {
				input: createStandardJSONSchemaMethod(inst, "input"),
				output: createStandardJSONSchemaMethod(inst, "output")
			} });
			inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
			inst.def = def;
			inst.type = def.type;
			Object.defineProperty(inst, "_def", { value: def });
			inst.parse = (data, params) => parse(inst, data, params, { callee: inst.parse });
			inst.safeParse = (data, params) => safeParse(inst, data, params);
			inst.parseAsync = async (data, params) => parseAsync(inst, data, params, { callee: inst.parseAsync });
			inst.safeParseAsync = async (data, params) => safeParseAsync(inst, data, params);
			inst.spa = inst.safeParseAsync;
			inst.encode = (data, params) => encode(inst, data, params);
			inst.decode = (data, params) => decode(inst, data, params);
			inst.encodeAsync = async (data, params) => encodeAsync(inst, data, params);
			inst.decodeAsync = async (data, params) => decodeAsync(inst, data, params);
			inst.safeEncode = (data, params) => safeEncode(inst, data, params);
			inst.safeDecode = (data, params) => safeDecode(inst, data, params);
			inst.safeEncodeAsync = async (data, params) => safeEncodeAsync(inst, data, params);
			inst.safeDecodeAsync = async (data, params) => safeDecodeAsync(inst, data, params);
			_installLazyMethods(inst, "ZodType", {
				check(...chks) {
					const def = this.def;
					return this.clone(mergeDefs(def, { checks: [...def.checks ?? [], ...chks.map((ch) => typeof ch === "function" ? { _zod: {
						check: ch,
						def: { check: "custom" },
						onattach: []
					} } : ch)] }), { parent: true });
				},
				with(...chks) {
					return this.check(...chks);
				},
				clone(def, params) {
					return clone(this, def, params);
				},
				brand() {
					return this;
				},
				register(reg, meta) {
					reg.add(this, meta);
					return this;
				},
				refine(check, params) {
					return this.check(refine(check, params));
				},
				superRefine(refinement, params) {
					return this.check(superRefine(refinement, params));
				},
				overwrite(fn) {
					return this.check(/* @__PURE__ */ _overwrite(fn));
				},
				optional() {
					return optional(this);
				},
				exactOptional() {
					return exactOptional(this);
				},
				nullable() {
					return nullable(this);
				},
				nullish() {
					return optional(nullable(this));
				},
				nonoptional(params) {
					return nonoptional(this, params);
				},
				array() {
					return array(this);
				},
				or(arg) {
					return union([this, arg]);
				},
				and(arg) {
					return intersection(this, arg);
				},
				transform(tx) {
					return pipe(this, transform(tx));
				},
				default(d) {
					return _default(this, d);
				},
				prefault(d) {
					return prefault(this, d);
				},
				catch(params) {
					return _catch(this, params);
				},
				pipe(target) {
					return pipe(this, target);
				},
				readonly() {
					return readonly(this);
				},
				describe(description) {
					const cl = this.clone();
					globalRegistry.add(cl, { description });
					return cl;
				},
				meta(...args) {
					if (args.length === 0) return globalRegistry.get(this);
					const cl = this.clone();
					globalRegistry.add(cl, args[0]);
					return cl;
				},
				isOptional() {
					return this.safeParse(void 0).success;
				},
				isNullable() {
					return this.safeParse(null).success;
				},
				apply(fn) {
					return fn(this);
				}
			});
			Object.defineProperty(inst, "description", {
				get() {
					return globalRegistry.get(inst)?.description;
				},
				configurable: true
			});
			return inst;
		});
		/** @internal */
		const _ZodString = /*@__PURE__*/ $constructor("_ZodString", (inst, def) => {
			$ZodString.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => stringProcessor(inst, ctx, json, params);
			const bag = inst._zod.bag;
			inst.format = bag.format ?? null;
			inst.minLength = bag.minimum ?? null;
			inst.maxLength = bag.maximum ?? null;
			_installLazyMethods(inst, "_ZodString", {
				regex(...args) {
					return this.check(/* @__PURE__ */ _regex(...args));
				},
				includes(...args) {
					return this.check(/* @__PURE__ */ _includes(...args));
				},
				startsWith(...args) {
					return this.check(/* @__PURE__ */ _startsWith(...args));
				},
				endsWith(...args) {
					return this.check(/* @__PURE__ */ _endsWith(...args));
				},
				min(...args) {
					return this.check(/* @__PURE__ */ _minLength(...args));
				},
				max(...args) {
					return this.check(/* @__PURE__ */ _maxLength(...args));
				},
				length(...args) {
					return this.check(/* @__PURE__ */ _length(...args));
				},
				nonempty(...args) {
					return this.check(/* @__PURE__ */ _minLength(1, ...args));
				},
				lowercase(params) {
					return this.check(/* @__PURE__ */ _lowercase(params));
				},
				uppercase(params) {
					return this.check(/* @__PURE__ */ _uppercase(params));
				},
				trim() {
					return this.check(/* @__PURE__ */ _trim());
				},
				normalize(...args) {
					return this.check(/* @__PURE__ */ _normalize(...args));
				},
				toLowerCase() {
					return this.check(/* @__PURE__ */ _toLowerCase());
				},
				toUpperCase() {
					return this.check(/* @__PURE__ */ _toUpperCase());
				},
				slugify() {
					return this.check(/* @__PURE__ */ _slugify());
				}
			});
		});
		const ZodString = /*@__PURE__*/ $constructor("ZodString", (inst, def) => {
			$ZodString.init(inst, def);
			_ZodString.init(inst, def);
			inst.email = (params) => inst.check(/* @__PURE__ */ _email(ZodEmail, params));
			inst.url = (params) => inst.check(/* @__PURE__ */ _url(ZodURL, params));
			inst.jwt = (params) => inst.check(/* @__PURE__ */ _jwt(ZodJWT, params));
			inst.emoji = (params) => inst.check(/* @__PURE__ */ _emoji(ZodEmoji, params));
			inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
			inst.uuid = (params) => inst.check(/* @__PURE__ */ _uuid(ZodUUID, params));
			inst.uuidv4 = (params) => inst.check(/* @__PURE__ */ _uuidv4(ZodUUID, params));
			inst.uuidv6 = (params) => inst.check(/* @__PURE__ */ _uuidv6(ZodUUID, params));
			inst.uuidv7 = (params) => inst.check(/* @__PURE__ */ _uuidv7(ZodUUID, params));
			inst.nanoid = (params) => inst.check(/* @__PURE__ */ _nanoid(ZodNanoID, params));
			inst.guid = (params) => inst.check(/* @__PURE__ */ _guid(ZodGUID, params));
			inst.cuid = (params) => inst.check(/* @__PURE__ */ _cuid(ZodCUID, params));
			inst.cuid2 = (params) => inst.check(/* @__PURE__ */ _cuid2(ZodCUID2, params));
			inst.ulid = (params) => inst.check(/* @__PURE__ */ _ulid(ZodULID, params));
			inst.base64 = (params) => inst.check(/* @__PURE__ */ _base64(ZodBase64, params));
			inst.base64url = (params) => inst.check(/* @__PURE__ */ _base64url(ZodBase64URL, params));
			inst.xid = (params) => inst.check(/* @__PURE__ */ _xid(ZodXID, params));
			inst.ksuid = (params) => inst.check(/* @__PURE__ */ _ksuid(ZodKSUID, params));
			inst.ipv4 = (params) => inst.check(/* @__PURE__ */ _ipv4(ZodIPv4, params));
			inst.ipv6 = (params) => inst.check(/* @__PURE__ */ _ipv6(ZodIPv6, params));
			inst.cidrv4 = (params) => inst.check(/* @__PURE__ */ _cidrv4(ZodCIDRv4, params));
			inst.cidrv6 = (params) => inst.check(/* @__PURE__ */ _cidrv6(ZodCIDRv6, params));
			inst.e164 = (params) => inst.check(/* @__PURE__ */ _e164(ZodE164, params));
			inst.datetime = (params) => inst.check(datetime(params));
			inst.date = (params) => inst.check(date(params));
			inst.time = (params) => inst.check(time(params));
			inst.duration = (params) => inst.check(duration(params));
		});
		function string(params) {
			return /* @__PURE__ */ _string(ZodString, params);
		}
		const ZodStringFormat = /*@__PURE__*/ $constructor("ZodStringFormat", (inst, def) => {
			$ZodStringFormat.init(inst, def);
			_ZodString.init(inst, def);
		});
		const ZodEmail = /*@__PURE__*/ $constructor("ZodEmail", (inst, def) => {
			$ZodEmail.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodGUID = /*@__PURE__*/ $constructor("ZodGUID", (inst, def) => {
			$ZodGUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodUUID = /*@__PURE__*/ $constructor("ZodUUID", (inst, def) => {
			$ZodUUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodURL = /*@__PURE__*/ $constructor("ZodURL", (inst, def) => {
			$ZodURL.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodEmoji = /*@__PURE__*/ $constructor("ZodEmoji", (inst, def) => {
			$ZodEmoji.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodNanoID = /*@__PURE__*/ $constructor("ZodNanoID", (inst, def) => {
			$ZodNanoID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		/**
		* @deprecated CUID v1 is deprecated by its authors due to information leakage
		* (timestamps embedded in the id). Use {@link ZodCUID2} instead.
		* See https://github.com/paralleldrive/cuid.
		*/
		const ZodCUID = /*@__PURE__*/ $constructor("ZodCUID", (inst, def) => {
			$ZodCUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCUID2 = /*@__PURE__*/ $constructor("ZodCUID2", (inst, def) => {
			$ZodCUID2.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodULID = /*@__PURE__*/ $constructor("ZodULID", (inst, def) => {
			$ZodULID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodXID = /*@__PURE__*/ $constructor("ZodXID", (inst, def) => {
			$ZodXID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodKSUID = /*@__PURE__*/ $constructor("ZodKSUID", (inst, def) => {
			$ZodKSUID.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodIPv4 = /*@__PURE__*/ $constructor("ZodIPv4", (inst, def) => {
			$ZodIPv4.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodIPv6 = /*@__PURE__*/ $constructor("ZodIPv6", (inst, def) => {
			$ZodIPv6.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCIDRv4 = /*@__PURE__*/ $constructor("ZodCIDRv4", (inst, def) => {
			$ZodCIDRv4.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodCIDRv6 = /*@__PURE__*/ $constructor("ZodCIDRv6", (inst, def) => {
			$ZodCIDRv6.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodBase64 = /*@__PURE__*/ $constructor("ZodBase64", (inst, def) => {
			$ZodBase64.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodBase64URL = /*@__PURE__*/ $constructor("ZodBase64URL", (inst, def) => {
			$ZodBase64URL.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodE164 = /*@__PURE__*/ $constructor("ZodE164", (inst, def) => {
			$ZodE164.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodJWT = /*@__PURE__*/ $constructor("ZodJWT", (inst, def) => {
			$ZodJWT.init(inst, def);
			ZodStringFormat.init(inst, def);
		});
		const ZodNumber = /*@__PURE__*/ $constructor("ZodNumber", (inst, def) => {
			$ZodNumber.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => numberProcessor(inst, ctx, json, params);
			_installLazyMethods(inst, "ZodNumber", {
				gt(value, params) {
					return this.check(/* @__PURE__ */ _gt(value, params));
				},
				gte(value, params) {
					return this.check(/* @__PURE__ */ _gte(value, params));
				},
				min(value, params) {
					return this.check(/* @__PURE__ */ _gte(value, params));
				},
				lt(value, params) {
					return this.check(/* @__PURE__ */ _lt(value, params));
				},
				lte(value, params) {
					return this.check(/* @__PURE__ */ _lte(value, params));
				},
				max(value, params) {
					return this.check(/* @__PURE__ */ _lte(value, params));
				},
				int(params) {
					return this.check(int(params));
				},
				safe(params) {
					return this.check(int(params));
				},
				positive(params) {
					return this.check(/* @__PURE__ */ _gt(0, params));
				},
				nonnegative(params) {
					return this.check(/* @__PURE__ */ _gte(0, params));
				},
				negative(params) {
					return this.check(/* @__PURE__ */ _lt(0, params));
				},
				nonpositive(params) {
					return this.check(/* @__PURE__ */ _lte(0, params));
				},
				multipleOf(value, params) {
					return this.check(/* @__PURE__ */ _multipleOf(value, params));
				},
				step(value, params) {
					return this.check(/* @__PURE__ */ _multipleOf(value, params));
				},
				finite() {
					return this;
				}
			});
			const bag = inst._zod.bag;
			inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
			inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
			inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? .5);
			inst.isFinite = true;
			inst.format = bag.format ?? null;
		});
		function number(params) {
			return /* @__PURE__ */ _number(ZodNumber, params);
		}
		const ZodNumberFormat = /*@__PURE__*/ $constructor("ZodNumberFormat", (inst, def) => {
			$ZodNumberFormat.init(inst, def);
			ZodNumber.init(inst, def);
		});
		function int(params) {
			return /* @__PURE__ */ _int(ZodNumberFormat, params);
		}
		const ZodBoolean = /*@__PURE__*/ $constructor("ZodBoolean", (inst, def) => {
			$ZodBoolean.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => booleanProcessor(inst, ctx, json, params);
		});
		function boolean(params) {
			return /* @__PURE__ */ _boolean(ZodBoolean, params);
		}
		const ZodUnknown = /*@__PURE__*/ $constructor("ZodUnknown", (inst, def) => {
			$ZodUnknown.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => void 0;
		});
		function unknown() {
			return /* @__PURE__ */ _unknown(ZodUnknown);
		}
		const ZodNever = /*@__PURE__*/ $constructor("ZodNever", (inst, def) => {
			$ZodNever.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => neverProcessor(inst, ctx, json, params);
		});
		function never(params) {
			return /* @__PURE__ */ _never(ZodNever, params);
		}
		const ZodVoid = /*@__PURE__*/ $constructor("ZodVoid", (inst, def) => {
			$ZodVoid.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => voidProcessor(inst, ctx, json, params);
		});
		function _void(params) {
			return /* @__PURE__ */ _void$1(ZodVoid, params);
		}
		const ZodArray = /*@__PURE__*/ $constructor("ZodArray", (inst, def) => {
			$ZodArray.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => arrayProcessor(inst, ctx, json, params);
			inst.element = def.element;
			_installLazyMethods(inst, "ZodArray", {
				min(n, params) {
					return this.check(/* @__PURE__ */ _minLength(n, params));
				},
				nonempty(params) {
					return this.check(/* @__PURE__ */ _minLength(1, params));
				},
				max(n, params) {
					return this.check(/* @__PURE__ */ _maxLength(n, params));
				},
				length(n, params) {
					return this.check(/* @__PURE__ */ _length(n, params));
				},
				unwrap() {
					return this.element;
				}
			});
		});
		function array(element, params) {
			return /* @__PURE__ */ _array(ZodArray, element, params);
		}
		const ZodObject = /*@__PURE__*/ $constructor("ZodObject", (inst, def) => {
			$ZodObjectJIT.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => objectProcessor(inst, ctx, json, params);
			defineLazy(inst, "shape", () => {
				return def.shape;
			});
			_installLazyMethods(inst, "ZodObject", {
				keyof() {
					return _enum(Object.keys(this._zod.def.shape));
				},
				catchall(catchall) {
					return this.clone({
						...this._zod.def,
						catchall
					});
				},
				passthrough() {
					return this.clone({
						...this._zod.def,
						catchall: unknown()
					});
				},
				loose() {
					return this.clone({
						...this._zod.def,
						catchall: unknown()
					});
				},
				strict() {
					return this.clone({
						...this._zod.def,
						catchall: never()
					});
				},
				strip() {
					return this.clone({
						...this._zod.def,
						catchall: void 0
					});
				},
				extend(incoming) {
					return extend(this, incoming);
				},
				safeExtend(incoming) {
					return safeExtend(this, incoming);
				},
				merge(other) {
					return merge$1(this, other);
				},
				pick(mask) {
					return pick(this, mask);
				},
				omit(mask) {
					return omit(this, mask);
				},
				partial(...args) {
					return partial(ZodOptional, this, args[0]);
				},
				required(...args) {
					return required(ZodNonOptional, this, args[0]);
				}
			});
		});
		function object(shape, params) {
			return new ZodObject({
				type: "object",
				shape: shape ?? {},
				...normalizeParams(params)
			});
		}
		const ZodUnion = /*@__PURE__*/ $constructor("ZodUnion", (inst, def) => {
			$ZodUnion.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => unionProcessor(inst, ctx, json, params);
			inst.options = def.options;
		});
		function union(options, params) {
			return new ZodUnion({
				type: "union",
				options,
				...normalizeParams(params)
			});
		}
		const ZodIntersection = /*@__PURE__*/ $constructor("ZodIntersection", (inst, def) => {
			$ZodIntersection.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => intersectionProcessor(inst, ctx, json, params);
		});
		function intersection(left, right) {
			return new ZodIntersection({
				type: "intersection",
				left,
				right
			});
		}
		const ZodRecord = /*@__PURE__*/ $constructor("ZodRecord", (inst, def) => {
			$ZodRecord.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => recordProcessor(inst, ctx, json, params);
			inst.keyType = def.keyType;
			inst.valueType = def.valueType;
		});
		function record(keyType, valueType, params) {
			if (!valueType || !valueType._zod) return new ZodRecord({
				type: "record",
				keyType: string(),
				valueType: keyType,
				...normalizeParams(valueType)
			});
			return new ZodRecord({
				type: "record",
				keyType,
				valueType,
				...normalizeParams(params)
			});
		}
		const ZodEnum = /*@__PURE__*/ $constructor("ZodEnum", (inst, def) => {
			$ZodEnum.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => enumProcessor(inst, ctx, json, params);
			inst.enum = def.entries;
			inst.options = Object.values(def.entries);
			const keys = new Set(Object.keys(def.entries));
			inst.extract = (values, params) => {
				const newEntries = {};
				for (const value of values) if (keys.has(value)) newEntries[value] = def.entries[value];
				else throw new Error(`Key ${value} not found in enum`);
				return new ZodEnum({
					...def,
					checks: [],
					...normalizeParams(params),
					entries: newEntries
				});
			};
			inst.exclude = (values, params) => {
				const newEntries = { ...def.entries };
				for (const value of values) if (keys.has(value)) delete newEntries[value];
				else throw new Error(`Key ${value} not found in enum`);
				return new ZodEnum({
					...def,
					checks: [],
					...normalizeParams(params),
					entries: newEntries
				});
			};
		});
		function _enum(values, params) {
			return new ZodEnum({
				type: "enum",
				entries: Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values,
				...normalizeParams(params)
			});
		}
		const ZodLiteral = /*@__PURE__*/ $constructor("ZodLiteral", (inst, def) => {
			$ZodLiteral.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => literalProcessor(inst, ctx, json, params);
			inst.values = new Set(def.values);
			Object.defineProperty(inst, "value", { get() {
				if (def.values.length > 1) throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
				return def.values[0];
			} });
		});
		function literal(value, params) {
			return new ZodLiteral({
				type: "literal",
				values: Array.isArray(value) ? value : [value],
				...normalizeParams(params)
			});
		}
		const ZodTransform = /*@__PURE__*/ $constructor("ZodTransform", (inst, def) => {
			$ZodTransform.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => transformProcessor(inst, ctx, json, params);
			inst._zod.parse = (payload, _ctx) => {
				if (_ctx.direction === "backward") throw new $ZodEncodeError(inst.constructor.name);
				payload.addIssue = (issue$1) => {
					if (typeof issue$1 === "string") payload.issues.push(issue(issue$1, payload.value, def));
					else {
						const _issue = issue$1;
						if (_issue.fatal) _issue.continue = false;
						_issue.code ?? (_issue.code = "custom");
						_issue.input ?? (_issue.input = payload.value);
						_issue.inst ?? (_issue.inst = inst);
						payload.issues.push(issue(_issue));
					}
				};
				const output = def.transform(payload.value, payload);
				if (output instanceof Promise) return output.then((output) => {
					payload.value = output;
					payload.fallback = true;
					return payload;
				});
				payload.value = output;
				payload.fallback = true;
				return payload;
			};
		});
		function transform(fn) {
			return new ZodTransform({
				type: "transform",
				transform: fn
			});
		}
		const ZodOptional = /*@__PURE__*/ $constructor("ZodOptional", (inst, def) => {
			$ZodOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function optional(innerType) {
			return new ZodOptional({
				type: "optional",
				innerType
			});
		}
		const ZodExactOptional = /*@__PURE__*/ $constructor("ZodExactOptional", (inst, def) => {
			$ZodExactOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => optionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function exactOptional(innerType) {
			return new ZodExactOptional({
				type: "optional",
				innerType
			});
		}
		const ZodNullable = /*@__PURE__*/ $constructor("ZodNullable", (inst, def) => {
			$ZodNullable.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => nullableProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function nullable(innerType) {
			return new ZodNullable({
				type: "nullable",
				innerType
			});
		}
		const ZodDefault = /*@__PURE__*/ $constructor("ZodDefault", (inst, def) => {
			$ZodDefault.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => defaultProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
			inst.removeDefault = inst.unwrap;
		});
		function _default(innerType, defaultValue) {
			return new ZodDefault({
				type: "default",
				innerType,
				get defaultValue() {
					return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
				}
			});
		}
		const ZodPrefault = /*@__PURE__*/ $constructor("ZodPrefault", (inst, def) => {
			$ZodPrefault.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => prefaultProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function prefault(innerType, defaultValue) {
			return new ZodPrefault({
				type: "prefault",
				innerType,
				get defaultValue() {
					return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
				}
			});
		}
		const ZodNonOptional = /*@__PURE__*/ $constructor("ZodNonOptional", (inst, def) => {
			$ZodNonOptional.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => nonoptionalProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function nonoptional(innerType, params) {
			return new ZodNonOptional({
				type: "nonoptional",
				innerType,
				...normalizeParams(params)
			});
		}
		const ZodCatch = /*@__PURE__*/ $constructor("ZodCatch", (inst, def) => {
			$ZodCatch.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => catchProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
			inst.removeCatch = inst.unwrap;
		});
		function _catch(innerType, catchValue) {
			return new ZodCatch({
				type: "catch",
				innerType,
				catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
			});
		}
		const ZodPipe = /*@__PURE__*/ $constructor("ZodPipe", (inst, def) => {
			$ZodPipe.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => pipeProcessor(inst, ctx, json, params);
			inst.in = def.in;
			inst.out = def.out;
		});
		function pipe(in_, out) {
			return new ZodPipe({
				type: "pipe",
				in: in_,
				out
			});
		}
		const ZodReadonly = /*@__PURE__*/ $constructor("ZodReadonly", (inst, def) => {
			$ZodReadonly.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => readonlyProcessor(inst, ctx, json, params);
			inst.unwrap = () => inst._zod.def.innerType;
		});
		function readonly(innerType) {
			return new ZodReadonly({
				type: "readonly",
				innerType
			});
		}
		const ZodCustom = /*@__PURE__*/ $constructor("ZodCustom", (inst, def) => {
			$ZodCustom.init(inst, def);
			ZodType.init(inst, def);
			inst._zod.processJSONSchema = (ctx, json, params) => customProcessor(inst, ctx, json, params);
		});
		function refine(fn, _params = {}) {
			return /* @__PURE__ */ _refine(ZodCustom, fn, _params);
		}
		function superRefine(fn, params) {
			return /* @__PURE__ */ _superRefine(fn, params);
		}
		//#endregion
		//#region ../workbuddy-skill-catalog/lib/typert.remote-client.js
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_browseProject_parameter_0$schema = object({
			"workspaceId": string().readonly(),
			"path": string().readonly().optional()
		});
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_browseProject_result$schema = object({
			"path": string().readonly(),
			"root": string().readonly(),
			"parent": string().readonly().optional(),
			"entries": array(object({
				"name": string().readonly(),
				"path": string().readonly(),
				"kind": union([literal("file"), literal("directory")]).readonly(),
				"hidden": boolean().readonly()
			})).readonly()
		});
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_closeSkillChatSidecar_parameter_0$schema = string();
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_closeSkillChatSidecar_result$schema = _void();
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_closeSkillChatTerminal_parameter_0$schema = object({
			"sessionId": string().readonly(),
			"terminalId": string().readonly()
		});
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_closeSkillChatTerminal_result$schema = _void();
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_getSkillChatState_result$schema = object({
			"version": literal(2).readonly(),
			"rooms": array(object({
				"roomId": string().readonly(),
				"type": union([
					literal("general"),
					literal("direct"),
					literal("group")
				]).readonly(),
				"workspaceId": string().readonly(),
				"workspaceIds": array(string()).readonly().optional(),
				"avatarId": string().readonly().optional(),
				"title": string().readonly(),
				"memberIds": array(string()).readonly(),
				"coordinatorId": string().readonly(),
				"systemPrompt": string().readonly().optional(),
				"sessionIds": array(string()).readonly(),
				"activeSessionId": string().readonly().optional(),
				"createdAt": number().readonly(),
				"updatedAt": number().readonly(),
				"archivedAt": number().readonly().optional(),
				"pinnedAt": number().readonly().optional(),
				"order": number().readonly().optional()
			})).readonly(),
			"roomSessions": array(object({
				"roomSessionId": string().readonly(),
				"roomId": string().readonly(),
				"harnessSessionId": string().readonly(),
				"title": string().readonly(),
				"memberSnapshot": array(object({
					"skillId": string().readonly(),
					"displayName": string().readonly(),
					"avatarId": string().readonly(),
					"originalName": string().readonly()
				})).readonly(),
				"createdAt": number().readonly(),
				"updatedAt": number().readonly(),
				"archivedAt": number().readonly().optional()
			})).readonly(),
			"personas": record(string(), object({
				"skillId": string().readonly(),
				"displayName": string().readonly(),
				"avatarId": string().readonly(),
				"originalName": string().readonly(),
				"roleLabel": string().readonly(),
				"bio": string().readonly(),
				"capabilities": array(string()).readonly(),
				"source": string().readonly(),
				"homepage": string().readonly().optional(),
				"repository": string().readonly().optional(),
				"customizedName": boolean().readonly(),
				"customizedAvatar": boolean().readonly(),
				"updatedAt": number().readonly()
			})).readonly().readonly(),
			"automations": array(object({
				"automationId": string().readonly(),
				"name": string().readonly(),
				"workspaceId": string().readonly(),
				"roomId": string().readonly(),
				"intent": union([
					literal("research"),
					literal("create"),
					literal("review"),
					literal("operate"),
					literal("custom")
				]).readonly(),
				"prompt": string().readonly(),
				"memberIds": array(string()).readonly(),
				"coordinatorId": string().readonly(),
				"schedule": union([object({
					"kind": literal("once").readonly(),
					"runAt": string().readonly()
				}), object({
					"kind": literal("recurring").readonly(),
					"rule": string().readonly(),
					"timezone": string().readonly()
				})]).readonly(),
				"lifecycle": union([literal("run-once"), literal("continuous")]).readonly(),
				"status": union([
					literal("completed"),
					literal("active"),
					literal("paused"),
					literal("failed")
				]).readonly(),
				"createdAt": number().readonly(),
				"updatedAt": number().readonly(),
				"lastRunAt": number().readonly().optional(),
				"nextRunAt": number().readonly().optional()
			})).readonly(),
			"migratedAt": number().readonly().optional()
		});
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_installExternal_parameter_0$schema = object({
			"workspaceId": string().readonly(),
			"id": string().readonly(),
			"skillId": string().readonly(),
			"source": string().readonly()
		});
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_installExternal_result$schema = object({
			"contact": object({
				"id": string().readonly(),
				"name": string().readonly(),
				"description": string().readonly(),
				"whenToUse": string().readonly().optional(),
				"source": literal("skills-sh").readonly(),
				"sourceLabel": string().readonly(),
				"repository": string().readonly(),
				"homepage": string().readonly(),
				"invocable": literal(true).readonly(),
				"modelInvocable": literal(true).readonly()
			}).readonly(),
			"path": string().readonly()
		});
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_linkSkill_parameter_0$schema = object({
			"path": string().readonly(),
			"name": string().readonly()
		});
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_linkSkill_result$schema = object({
			"name": string().readonly(),
			"source": string().readonly(),
			"target": string().readonly()
		});
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_list_result$schema = object({ "contacts": array(object({
			"id": string().readonly(),
			"name": string().readonly(),
			"description": string().readonly(),
			"whenToUse": string().readonly().optional(),
			"source": literal("workbuddy").readonly(),
			"originId": string().readonly(),
			"originLabel": string().readonly(),
			"plugin": string().readonly(),
			"path": string().readonly().optional(),
			"version": string().readonly().optional(),
			"invocable": literal(false).readonly()
		})).readonly() });
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_openSkillChatTerminal_parameter_0$schema = object({
			"sessionId": string().readonly(),
			"workspaceId": string().readonly()
		});
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_openSkillChatTerminal_result$schema = object({
			"terminalId": string().readonly(),
			"text": string().readonly(),
			"status": union([literal("running"), literal("exited")]).readonly(),
			"truncated": boolean().readonly()
		});
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_putSkillChatState_parameter_0$schema = object({
			"version": literal(2).readonly(),
			"rooms": array(object({
				"roomId": string().readonly(),
				"type": union([
					literal("general"),
					literal("direct"),
					literal("group")
				]).readonly(),
				"workspaceId": string().readonly(),
				"workspaceIds": array(string()).readonly().optional(),
				"avatarId": string().readonly().optional(),
				"title": string().readonly(),
				"memberIds": array(string()).readonly(),
				"coordinatorId": string().readonly(),
				"systemPrompt": string().readonly().optional(),
				"sessionIds": array(string()).readonly(),
				"activeSessionId": string().readonly().optional(),
				"createdAt": number().readonly(),
				"updatedAt": number().readonly(),
				"archivedAt": number().readonly().optional(),
				"pinnedAt": number().readonly().optional(),
				"order": number().readonly().optional()
			})).readonly(),
			"roomSessions": array(object({
				"roomSessionId": string().readonly(),
				"roomId": string().readonly(),
				"harnessSessionId": string().readonly(),
				"title": string().readonly(),
				"memberSnapshot": array(object({
					"skillId": string().readonly(),
					"displayName": string().readonly(),
					"avatarId": string().readonly(),
					"originalName": string().readonly()
				})).readonly(),
				"createdAt": number().readonly(),
				"updatedAt": number().readonly(),
				"archivedAt": number().readonly().optional()
			})).readonly(),
			"personas": record(string(), object({
				"skillId": string().readonly(),
				"displayName": string().readonly(),
				"avatarId": string().readonly(),
				"originalName": string().readonly(),
				"roleLabel": string().readonly(),
				"bio": string().readonly(),
				"capabilities": array(string()).readonly(),
				"source": string().readonly(),
				"homepage": string().readonly().optional(),
				"repository": string().readonly().optional(),
				"customizedName": boolean().readonly(),
				"customizedAvatar": boolean().readonly(),
				"updatedAt": number().readonly()
			})).readonly().readonly(),
			"automations": array(object({
				"automationId": string().readonly(),
				"name": string().readonly(),
				"workspaceId": string().readonly(),
				"roomId": string().readonly(),
				"intent": union([
					literal("research"),
					literal("create"),
					literal("review"),
					literal("operate"),
					literal("custom")
				]).readonly(),
				"prompt": string().readonly(),
				"memberIds": array(string()).readonly(),
				"coordinatorId": string().readonly(),
				"schedule": union([object({
					"kind": literal("once").readonly(),
					"runAt": string().readonly()
				}), object({
					"kind": literal("recurring").readonly(),
					"rule": string().readonly(),
					"timezone": string().readonly()
				})]).readonly(),
				"lifecycle": union([literal("run-once"), literal("continuous")]).readonly(),
				"status": union([
					literal("completed"),
					literal("active"),
					literal("paused"),
					literal("failed")
				]).readonly(),
				"createdAt": number().readonly(),
				"updatedAt": number().readonly(),
				"lastRunAt": number().readonly().optional(),
				"nextRunAt": number().readonly().optional()
			})).readonly(),
			"migratedAt": number().readonly().optional()
		});
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_putSkillChatState_result$schema = object({
			"version": literal(2).readonly(),
			"rooms": array(object({
				"roomId": string().readonly(),
				"type": union([
					literal("general"),
					literal("direct"),
					literal("group")
				]).readonly(),
				"workspaceId": string().readonly(),
				"workspaceIds": array(string()).readonly().optional(),
				"avatarId": string().readonly().optional(),
				"title": string().readonly(),
				"memberIds": array(string()).readonly(),
				"coordinatorId": string().readonly(),
				"systemPrompt": string().readonly().optional(),
				"sessionIds": array(string()).readonly(),
				"activeSessionId": string().readonly().optional(),
				"createdAt": number().readonly(),
				"updatedAt": number().readonly(),
				"archivedAt": number().readonly().optional(),
				"pinnedAt": number().readonly().optional(),
				"order": number().readonly().optional()
			})).readonly(),
			"roomSessions": array(object({
				"roomSessionId": string().readonly(),
				"roomId": string().readonly(),
				"harnessSessionId": string().readonly(),
				"title": string().readonly(),
				"memberSnapshot": array(object({
					"skillId": string().readonly(),
					"displayName": string().readonly(),
					"avatarId": string().readonly(),
					"originalName": string().readonly()
				})).readonly(),
				"createdAt": number().readonly(),
				"updatedAt": number().readonly(),
				"archivedAt": number().readonly().optional()
			})).readonly(),
			"personas": record(string(), object({
				"skillId": string().readonly(),
				"displayName": string().readonly(),
				"avatarId": string().readonly(),
				"originalName": string().readonly(),
				"roleLabel": string().readonly(),
				"bio": string().readonly(),
				"capabilities": array(string()).readonly(),
				"source": string().readonly(),
				"homepage": string().readonly().optional(),
				"repository": string().readonly().optional(),
				"customizedName": boolean().readonly(),
				"customizedAvatar": boolean().readonly(),
				"updatedAt": number().readonly()
			})).readonly().readonly(),
			"automations": array(object({
				"automationId": string().readonly(),
				"name": string().readonly(),
				"workspaceId": string().readonly(),
				"roomId": string().readonly(),
				"intent": union([
					literal("research"),
					literal("create"),
					literal("review"),
					literal("operate"),
					literal("custom")
				]).readonly(),
				"prompt": string().readonly(),
				"memberIds": array(string()).readonly(),
				"coordinatorId": string().readonly(),
				"schedule": union([object({
					"kind": literal("once").readonly(),
					"runAt": string().readonly()
				}), object({
					"kind": literal("recurring").readonly(),
					"rule": string().readonly(),
					"timezone": string().readonly()
				})]).readonly(),
				"lifecycle": union([literal("run-once"), literal("continuous")]).readonly(),
				"status": union([
					literal("completed"),
					literal("active"),
					literal("paused"),
					literal("failed")
				]).readonly(),
				"createdAt": number().readonly(),
				"updatedAt": number().readonly(),
				"lastRunAt": number().readonly().optional(),
				"nextRunAt": number().readonly().optional()
			})).readonly(),
			"migratedAt": number().readonly().optional()
		});
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_readProjectFile_parameter_0$schema = object({
			"workspaceId": string().readonly(),
			"path": string().readonly()
		});
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_readProjectFile_result$schema = object({
			"path": string().readonly(),
			"name": string().readonly(),
			"content": string().readonly().optional(),
			"size": number().readonly(),
			"language": string().readonly(),
			"binary": boolean().readonly(),
			"truncated": boolean().readonly()
		});
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_runSkillChatAutomation_parameter_0$schema = string();
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_runSkillChatAutomation_result$schema = object({
			"sessionId": string().readonly(),
			"state": object({
				"version": literal(2).readonly(),
				"rooms": array(object({
					"roomId": string().readonly(),
					"type": union([
						literal("general"),
						literal("direct"),
						literal("group")
					]).readonly(),
					"workspaceId": string().readonly(),
					"workspaceIds": array(string()).readonly().optional(),
					"avatarId": string().readonly().optional(),
					"title": string().readonly(),
					"memberIds": array(string()).readonly(),
					"coordinatorId": string().readonly(),
					"systemPrompt": string().readonly().optional(),
					"sessionIds": array(string()).readonly(),
					"activeSessionId": string().readonly().optional(),
					"createdAt": number().readonly(),
					"updatedAt": number().readonly(),
					"archivedAt": number().readonly().optional(),
					"pinnedAt": number().readonly().optional(),
					"order": number().readonly().optional()
				})).readonly(),
				"roomSessions": array(object({
					"roomSessionId": string().readonly(),
					"roomId": string().readonly(),
					"harnessSessionId": string().readonly(),
					"title": string().readonly(),
					"memberSnapshot": array(object({
						"skillId": string().readonly(),
						"displayName": string().readonly(),
						"avatarId": string().readonly(),
						"originalName": string().readonly()
					})).readonly(),
					"createdAt": number().readonly(),
					"updatedAt": number().readonly(),
					"archivedAt": number().readonly().optional()
				})).readonly(),
				"personas": record(string(), object({
					"skillId": string().readonly(),
					"displayName": string().readonly(),
					"avatarId": string().readonly(),
					"originalName": string().readonly(),
					"roleLabel": string().readonly(),
					"bio": string().readonly(),
					"capabilities": array(string()).readonly(),
					"source": string().readonly(),
					"homepage": string().readonly().optional(),
					"repository": string().readonly().optional(),
					"customizedName": boolean().readonly(),
					"customizedAvatar": boolean().readonly(),
					"updatedAt": number().readonly()
				})).readonly().readonly(),
				"automations": array(object({
					"automationId": string().readonly(),
					"name": string().readonly(),
					"workspaceId": string().readonly(),
					"roomId": string().readonly(),
					"intent": union([
						literal("research"),
						literal("create"),
						literal("review"),
						literal("operate"),
						literal("custom")
					]).readonly(),
					"prompt": string().readonly(),
					"memberIds": array(string()).readonly(),
					"coordinatorId": string().readonly(),
					"schedule": union([object({
						"kind": literal("once").readonly(),
						"runAt": string().readonly()
					}), object({
						"kind": literal("recurring").readonly(),
						"rule": string().readonly(),
						"timezone": string().readonly()
					})]).readonly(),
					"lifecycle": union([literal("run-once"), literal("continuous")]).readonly(),
					"status": union([
						literal("completed"),
						literal("active"),
						literal("paused"),
						literal("failed")
					]).readonly(),
					"createdAt": number().readonly(),
					"updatedAt": number().readonly(),
					"lastRunAt": number().readonly().optional(),
					"nextRunAt": number().readonly().optional()
				})).readonly(),
				"migratedAt": number().readonly().optional()
			}).readonly()
		});
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_searchExternal_parameter_0$schema = string();
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_searchExternal_result$schema = object({ "contacts": array(object({
			"id": string().readonly(),
			"skillId": string().readonly(),
			"name": string().readonly(),
			"source": string().readonly(),
			"installs": number().readonly(),
			"description": string().readonly().optional(),
			"homepage": string().readonly().optional(),
			"repository": string().readonly().optional()
		})).readonly() });
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_sendSkillChatSidecar_parameter_0$schema = object({
			"sidecarId": string().readonly(),
			"message": string().readonly()
		});
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_sendSkillChatSidecar_result$schema = object({
			"sidecarId": string().readonly(),
			"answer": string().readonly()
		});
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_sendSkillChatTerminal_parameter_0$schema = object({
			"sessionId": string().readonly(),
			"terminalId": string().readonly(),
			"command": string().readonly()
		});
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_sendSkillChatTerminal_result$schema = object({
			"terminalId": string().readonly(),
			"text": string().readonly(),
			"status": union([literal("running"), literal("exited")]).readonly(),
			"truncated": boolean().readonly()
		});
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_startSkillChatSidecar_parameter_0$schema = object({
			"sourceSessionId": string().readonly(),
			"workspaceId": string().readonly(),
			"roomTitle": string().readonly(),
			"roomSystemPrompt": string().readonly().optional(),
			"memberNames": array(string()).readonly(),
			"message": string().readonly()
		});
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_startSkillChatSidecar_result$schema = object({
			"sidecarId": string().readonly(),
			"answer": string().readonly()
		});
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_unlinkSkill_parameter_0$schema = string();
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_unlinkSkill_result$schema = _void();
		const TYPERT_REMOTE = {
			package: "deepseek-harness-chat-ui",
			descriptors: [
				{
					id: "deepseek-harness-chat-ui#workbuddySkills/browseProject",
					service: "workBuddySkillCatalog",
					namespace: "workbuddySkills",
					method: "browseProject",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "deepseek-harness-chat-ui/types#SkillChatProjectBrowseRequest",
							schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_browseProject_parameter_0$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "deepseek-harness-chat-ui/types#SkillChatProjectBrowseValue",
						schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_browseProject_result$schema
					},
					sourceLocation: {
						"file": "packages/experimental/workbuddy-skill-catalog/src/index.ts",
						"line": 328,
						"column": 9
					}
				},
				{
					id: "deepseek-harness-chat-ui#workbuddySkills/closeSkillChatSidecar",
					service: "workBuddySkillCatalog",
					namespace: "workbuddySkills",
					method: "closeSkillChatSidecar",
					invocation: { kind: "direct" },
					parameters: [{
						name: "sidecarId",
						wire: "sidecarId",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "deepseek-harness-chat-ui#workbuddySkills/closeSkillChatSidecar:sidecarId",
							schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_closeSkillChatSidecar_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "deepseek-harness-chat-ui#workbuddySkills/closeSkillChatSidecar:result",
						schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_closeSkillChatSidecar_result$schema
					},
					sourceLocation: {
						"file": "packages/experimental/workbuddy-skill-catalog/src/index.ts",
						"line": 504,
						"column": 9
					}
				},
				{
					id: "deepseek-harness-chat-ui#workbuddySkills/closeSkillChatTerminal",
					service: "workBuddySkillCatalog",
					namespace: "workbuddySkills",
					method: "closeSkillChatTerminal",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "deepseek-harness-chat-ui/types#SkillChatTerminalCloseRequest",
							schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_closeSkillChatTerminal_parameter_0$schema
						}
					}],
					result: {
						mode: "strict",
						typeSymbol: "deepseek-harness-chat-ui#workbuddySkills/closeSkillChatTerminal:result",
						schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_closeSkillChatTerminal_result$schema
					},
					sourceLocation: {
						"file": "packages/experimental/workbuddy-skill-catalog/src/index.ts",
						"line": 451,
						"column": 9
					}
				},
				{
					id: "deepseek-harness-chat-ui#workbuddySkills/getSkillChatState",
					service: "workBuddySkillCatalog",
					namespace: "workbuddySkills",
					method: "getSkillChatState",
					invocation: { kind: "direct" },
					parameters: [],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "deepseek-harness-chat-ui/types#SkillChatStateDocument",
						schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_getSkillChatState_result$schema
					},
					sourceLocation: {
						"file": "packages/experimental/workbuddy-skill-catalog/src/index.ts",
						"line": 513,
						"column": 9
					}
				},
				{
					id: "deepseek-harness-chat-ui#workbuddySkills/installExternal",
					service: "workBuddySkillCatalog",
					namespace: "workbuddySkills",
					method: "installExternal",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "deepseek-harness-chat-ui/types#SkillsShInstallRequest",
							schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_installExternal_parameter_0$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "deepseek-harness-chat-ui/types#SkillsShInstallValue",
						schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_installExternal_result$schema
					},
					sourceLocation: {
						"file": "packages/experimental/workbuddy-skill-catalog/src/index.ts",
						"line": 272,
						"column": 9
					}
				},
				{
					id: "deepseek-harness-chat-ui#workbuddySkills/linkSkill",
					service: "workBuddySkillCatalog",
					namespace: "workbuddySkills",
					method: "linkSkill",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "deepseek-harness-chat-ui/types#SkillLinkRequest",
							schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_linkSkill_parameter_0$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "deepseek-harness-chat-ui/types#SkillLinkValue",
						schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_linkSkill_result$schema
					},
					sourceLocation: {
						"file": "packages/experimental/workbuddy-skill-catalog/src/index.ts",
						"line": 295,
						"column": 9
					}
				},
				{
					id: "deepseek-harness-chat-ui#workbuddySkills/list",
					service: "workBuddySkillCatalog",
					namespace: "workbuddySkills",
					method: "list",
					invocation: { kind: "direct" },
					parameters: [],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "deepseek-harness-chat-ui/types#WorkBuddySkillContactList",
						schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_list_result$schema
					},
					sourceLocation: {
						"file": "packages/experimental/workbuddy-skill-catalog/src/index.ts",
						"line": 234,
						"column": 9
					}
				},
				{
					id: "deepseek-harness-chat-ui#workbuddySkills/openSkillChatTerminal",
					service: "workBuddySkillCatalog",
					namespace: "workbuddySkills",
					method: "openSkillChatTerminal",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "deepseek-harness-chat-ui/types#SkillChatTerminalOpenRequest",
							schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_openSkillChatTerminal_parameter_0$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "deepseek-harness-chat-ui/types#SkillChatTerminalValue",
						schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_openSkillChatTerminal_result$schema
					},
					sourceLocation: {
						"file": "packages/experimental/workbuddy-skill-catalog/src/index.ts",
						"line": 389,
						"column": 9
					}
				},
				{
					id: "deepseek-harness-chat-ui#workbuddySkills/putSkillChatState",
					service: "workBuddySkillCatalog",
					namespace: "workbuddySkills",
					method: "putSkillChatState",
					invocation: { kind: "direct" },
					parameters: [{
						name: "state",
						wire: "state",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "deepseek-harness-chat-ui/types#SkillChatStateDocument",
							schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_putSkillChatState_parameter_0$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "deepseek-harness-chat-ui/types#SkillChatStateDocument",
						schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_putSkillChatState_result$schema
					},
					sourceLocation: {
						"file": "packages/experimental/workbuddy-skill-catalog/src/index.ts",
						"line": 577,
						"column": 9
					}
				},
				{
					id: "deepseek-harness-chat-ui#workbuddySkills/readProjectFile",
					service: "workBuddySkillCatalog",
					namespace: "workbuddySkills",
					method: "readProjectFile",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "deepseek-harness-chat-ui/types#SkillChatProjectFileRequest",
							schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_readProjectFile_parameter_0$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "deepseek-harness-chat-ui/types#SkillChatProjectFileValue",
						schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_readProjectFile_result$schema
					},
					sourceLocation: {
						"file": "packages/experimental/workbuddy-skill-catalog/src/index.ts",
						"line": 356,
						"column": 9
					}
				},
				{
					id: "deepseek-harness-chat-ui#workbuddySkills/runSkillChatAutomation",
					service: "workBuddySkillCatalog",
					namespace: "workbuddySkills",
					method: "runSkillChatAutomation",
					invocation: { kind: "direct" },
					parameters: [{
						name: "automationId",
						wire: "automationId",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "deepseek-harness-chat-ui#workbuddySkills/runSkillChatAutomation:automationId",
							schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_runSkillChatAutomation_parameter_0$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "deepseek-harness-chat-ui/types#SkillChatAutomationRunValue",
						schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_runSkillChatAutomation_result$schema
					},
					sourceLocation: {
						"file": "packages/experimental/workbuddy-skill-catalog/src/index.ts",
						"line": 596,
						"column": 9
					}
				},
				{
					id: "deepseek-harness-chat-ui#workbuddySkills/searchExternal",
					service: "workBuddySkillCatalog",
					namespace: "workbuddySkills",
					method: "searchExternal",
					invocation: { kind: "direct" },
					parameters: [{
						name: "query",
						wire: "query",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "deepseek-harness-chat-ui#workbuddySkills/searchExternal:query",
							schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_searchExternal_parameter_0$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "deepseek-harness-chat-ui/types#SkillsShSearchValue",
						schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_searchExternal_result$schema
					},
					sourceLocation: {
						"file": "packages/experimental/workbuddy-skill-catalog/src/index.ts",
						"line": 240,
						"column": 9
					}
				},
				{
					id: "deepseek-harness-chat-ui#workbuddySkills/sendSkillChatSidecar",
					service: "workBuddySkillCatalog",
					namespace: "workbuddySkills",
					method: "sendSkillChatSidecar",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "deepseek-harness-chat-ui/types#SkillChatSidecarSendRequest",
							schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_sendSkillChatSidecar_parameter_0$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "deepseek-harness-chat-ui/types#SkillChatSidecarValue",
						schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_sendSkillChatSidecar_result$schema
					},
					sourceLocation: {
						"file": "packages/experimental/workbuddy-skill-catalog/src/index.ts",
						"line": 496,
						"column": 9
					}
				},
				{
					id: "deepseek-harness-chat-ui#workbuddySkills/sendSkillChatTerminal",
					service: "workBuddySkillCatalog",
					namespace: "workbuddySkills",
					method: "sendSkillChatTerminal",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "deepseek-harness-chat-ui/types#SkillChatTerminalSendRequest",
							schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_sendSkillChatTerminal_parameter_0$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "deepseek-harness-chat-ui/types#SkillChatTerminalValue",
						schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_sendSkillChatTerminal_result$schema
					},
					sourceLocation: {
						"file": "packages/experimental/workbuddy-skill-catalog/src/index.ts",
						"line": 411,
						"column": 9
					}
				},
				{
					id: "deepseek-harness-chat-ui#workbuddySkills/startSkillChatSidecar",
					service: "workBuddySkillCatalog",
					namespace: "workbuddySkills",
					method: "startSkillChatSidecar",
					invocation: { kind: "direct" },
					parameters: [{
						name: "request",
						wire: "request",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "deepseek-harness-chat-ui/types#SkillChatSidecarStartRequest",
							schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_startSkillChatSidecar_parameter_0$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "deepseek-harness-chat-ui/types#SkillChatSidecarValue",
						schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_startSkillChatSidecar_result$schema
					},
					sourceLocation: {
						"file": "packages/experimental/workbuddy-skill-catalog/src/index.ts",
						"line": 462,
						"column": 9
					}
				},
				{
					id: "deepseek-harness-chat-ui#workbuddySkills/unlinkSkill",
					service: "workBuddySkillCatalog",
					namespace: "workbuddySkills",
					method: "unlinkSkill",
					invocation: { kind: "direct" },
					parameters: [{
						name: "name",
						wire: "name",
						source: "json",
						codec: {
							mode: "strict",
							typeSymbol: "deepseek-harness-chat-ui#workbuddySkills/unlinkSkill:name",
							schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_unlinkSkill_parameter_0$schema
						}
					}],
					cancellation: { parameter: "signal" },
					result: {
						mode: "strict",
						typeSymbol: "deepseek-harness-chat-ui#workbuddySkills/unlinkSkill:result",
						schema: _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_unlinkSkill_result$schema
					},
					sourceLocation: {
						"file": "packages/experimental/workbuddy-skill-catalog/src/index.ts",
						"line": 311,
						"column": 9
					}
				}
			]
		};
		//#endregion
		//#region ../../util/crypto/src/index.ts
		/**
		* Random v4 UUID, minted from `crypto.getRandomValues`.
		* @returns the UUID string.
		*/
		function randomUUID() {
			const bytes = globalThis.crypto.getRandomValues(new Uint8Array(16));
			const hex = Array.from(bytes, (byte, index) => {
				return (index === 6 ? byte & 15 | 64 : index === 8 ? byte & 63 | 128 : byte).toString(16).padStart(2, "0");
			}).join("");
			return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+core@9.4.3/node_modules/@dicebear/core/lib/utils/escape.js
		function xml$1(content) {
			return content.replace(/&/g, "&amp;").replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+core@9.4.3/node_modules/@dicebear/core/lib/utils/license.js
		function xml(style) {
			var _a, _b, _c, _d, _e, _f, _g;
			const title = (_a = style.meta) === null || _a === void 0 ? void 0 : _a.title;
			const creator = (_b = style.meta) === null || _b === void 0 ? void 0 : _b.creator;
			const source = (_c = style.meta) === null || _c === void 0 ? void 0 : _c.source;
			const license = (_e = (_d = style.meta) === null || _d === void 0 ? void 0 : _d.license) === null || _e === void 0 ? void 0 : _e.url;
			const rights = text(style);
			if (!title && !creator && !source && !license && !rights) return "";
			return "<metadata xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:dcterms=\"http://purl.org/dc/terms/\"><rdf:RDF><rdf:Description>" + (title ? `<dc:title>${xml$1(title)}</dc:title>` : "") + (creator ? `<dc:creator>${xml$1(creator)}</dc:creator>` : "") + (source ? `<dc:source xsi:type="dcterms:URI">${xml$1((_g = (_f = style.meta) === null || _f === void 0 ? void 0 : _f.source) !== null && _g !== void 0 ? _g : "")}</dc:source>` : "") + (license ? `<dcterms:license xsi:type="dcterms:URI">${xml$1(license)}</dcterms:license>` : "") + (rights ? `<dc:rights>${xml$1(rights)}</dc:rights>` : "") + "</rdf:Description></rdf:RDF></metadata>";
		}
		function text(style) {
			var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
			let title = ((_a = style.meta) === null || _a === void 0 ? void 0 : _a.title) ? `„${(_b = style.meta) === null || _b === void 0 ? void 0 : _b.title}”` : "Design";
			let creator = `„${(_d = (_c = style.meta) === null || _c === void 0 ? void 0 : _c.creator) !== null && _d !== void 0 ? _d : "Unknown"}”`;
			if ((_e = style.meta) === null || _e === void 0 ? void 0 : _e.source) title += ` (${style.meta.source})`;
			let result = "";
			if (((_g = (_f = style.meta) === null || _f === void 0 ? void 0 : _f.license) === null || _g === void 0 ? void 0 : _g.name) !== "MIT" && ((_h = style.meta) === null || _h === void 0 ? void 0 : _h.creator) !== "DiceBear" && ((_j = style.meta) === null || _j === void 0 ? void 0 : _j.title)) result += "Remix of ";
			result += `${title} by ${creator}`;
			if ((_l = (_k = style.meta) === null || _k === void 0 ? void 0 : _k.license) === null || _l === void 0 ? void 0 : _l.name) {
				result += `, licensed under „${(_o = (_m = style.meta) === null || _m === void 0 ? void 0 : _m.license) === null || _o === void 0 ? void 0 : _o.name}”`;
				if ((_q = (_p = style.meta) === null || _p === void 0 ? void 0 : _p.license) === null || _q === void 0 ? void 0 : _q.url) result += ` (${style.meta.license.url})`;
			}
			return result;
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+core@9.4.3/node_modules/@dicebear/core/lib/utils/prng.js
		const MIN = -2147483648;
		const MAX = 2147483647;
		const MAX_SEED_LENGTH = 1024;
		function xorshift(value) {
			value ^= value << 13;
			value ^= value >> 17;
			value ^= value << 5;
			return value;
		}
		function hashSeed(seed) {
			let hash = 0;
			for (let i = 0; i < seed.length; i++) {
				hash = (hash << 5) - hash + seed.charCodeAt(i) | 0;
				hash = xorshift(hash);
			}
			return hash;
		}
		function create$1(seed = "") {
			seed = seed.toString().slice(0, MAX_SEED_LENGTH);
			let value = hashSeed(seed) || 1;
			const next = () => value = xorshift(value);
			const integer = (min, max) => {
				return Math.floor((next() - MIN) / (MAX - MIN) * (max + 1 - min) + min);
			};
			return {
				seed,
				next,
				bool(likelihood = 50) {
					return integer(1, 100) <= likelihood;
				},
				integer(min, max) {
					return integer(min, max);
				},
				pick(arr, fallback) {
					var _a;
					if (arr.length === 0) {
						next();
						return fallback;
					}
					return (_a = arr[integer(0, arr.length - 1)]) !== null && _a !== void 0 ? _a : fallback;
				},
				shuffle(arr) {
					const internalPrng = create$1(next().toString());
					const workingArray = [...arr];
					for (let i = workingArray.length - 1; i > 0; i--) {
						const j = internalPrng.integer(0, i);
						[workingArray[i], workingArray[j]] = [workingArray[j], workingArray[i]];
					}
					return workingArray;
				},
				string(length, characters = "abcdefghijklmnopqrstuvwxyz1234567890") {
					const internalPrng = create$1(next().toString());
					let str = "";
					for (let i = 0; i < length; i++) str += characters[internalPrng.integer(0, characters.length - 1)];
					return str;
				}
			};
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+core@9.4.3/node_modules/@dicebear/core/lib/utils/svg.js
		function getViewBox(result) {
			let viewBox = result.attributes["viewBox"].split(" ");
			return {
				x: parseInt(viewBox[0]),
				y: parseInt(viewBox[1]),
				width: parseInt(viewBox[2]),
				height: parseInt(viewBox[3])
			};
		}
		function addBackground(result, primaryColor, secondaryColor, type, rotation) {
			let { width, height, x, y } = getViewBox(result);
			const solidBackground = `<rect fill="${xml$1(primaryColor)}" width="${width}" height="${height}" x="${x}" y="${y}" />`;
			switch (type) {
				case "solid": return solidBackground + result.body;
				case "gradientLinear": return `<rect fill="url(#backgroundLinear)" width="${width}" height="${height}" x="${x}" y="${y}" /><defs><linearGradient id="backgroundLinear" gradientTransform="rotate(${rotation} 0.5 0.5)"><stop stop-color="${xml$1(primaryColor)}"/><stop offset="1" stop-color="${xml$1(secondaryColor)}"/></linearGradient></defs>` + result.body;
			}
		}
		function addScale(result, scale) {
			let { width, height, x, y } = getViewBox(result);
			let percent = scale ? (scale - 100) / 100 : 0;
			return `<g transform="translate(${(width / 2 + x) * percent * -1} ${(height / 2 + y) * percent * -1}) scale(${scale / 100})">${result.body}</g>`;
		}
		function addTranslate(result, x, y) {
			let viewBox = getViewBox(result);
			return `<g transform="translate(${(viewBox.width + viewBox.x * 2) * ((x !== null && x !== void 0 ? x : 0) / 100)} ${(viewBox.height + viewBox.y * 2) * ((y !== null && y !== void 0 ? y : 0) / 100)})">${result.body}</g>`;
		}
		function addRotate(result, rotate) {
			let { width, height, x, y } = getViewBox(result);
			return `<g transform="rotate(${xml$1(`${rotate}`)}, ${width / 2 + x}, ${height / 2 + y})">${result.body}</g>`;
		}
		function addFlip(result) {
			let { width, x } = getViewBox(result);
			return `<g transform="scale(-1 1) translate(${width * -1 - x * 2} 0)">${result.body}</g>`;
		}
		function addViewboxMask(result, radius) {
			let { width, height, x, y } = getViewBox(result);
			return `<mask id="viewboxMask"><rect width="${width}" height="${height}" rx="${radius ? width * radius / 100 : 0}" ry="${radius ? height * radius / 100 : 0}" x="${x}" y="${y}" fill="#fff" /></mask><g mask="url(#viewboxMask)">${result.body}</g>`;
		}
		function createAttrString(result) {
			const attributes = {
				xmlns: "http://www.w3.org/2000/svg",
				...result.attributes
			};
			return Object.keys(attributes).map((attr) => `${xml$1(attr)}="${xml$1(attributes[attr])}"`).join(" ");
		}
		function randomizeIds(result) {
			const prng = create$1(Math.random().toString());
			const ids = {};
			return result.body.replace(/(id="|url\(#)([a-z0-9-_]+)([")])/gi, (match, m1, m2, m3) => {
				ids[m2] = ids[m2] || prng.string(8);
				return `${m1}${ids[m2]}${m3}`;
			});
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+core@9.4.3/node_modules/@dicebear/core/lib/schema.js
		const schema$1 = {
			type: "object",
			$schema: "http://json-schema.org/draft-07/schema#",
			properties: {
				seed: { type: "string" },
				flip: {
					type: "boolean",
					default: false
				},
				rotate: {
					type: "integer",
					minimum: 0,
					maximum: 360,
					default: 0
				},
				scale: {
					type: "integer",
					minimum: 0,
					maximum: 200,
					default: 100
				},
				radius: {
					type: "integer",
					minimum: 0,
					maximum: 50,
					default: 0
				},
				size: {
					type: "integer",
					minimum: 1
				},
				backgroundColor: {
					type: "array",
					items: {
						type: "string",
						pattern: "^(transparent|[a-fA-F0-9]{6})$"
					}
				},
				backgroundType: {
					type: "array",
					items: {
						type: "string",
						enum: ["solid", "gradientLinear"]
					},
					default: ["solid"]
				},
				backgroundRotation: {
					type: "array",
					items: {
						type: "integer",
						minimum: -360,
						maximum: 360
					},
					default: [0, 360]
				},
				translateX: {
					type: "integer",
					minimum: -100,
					maximum: 100,
					default: 0
				},
				translateY: {
					type: "integer",
					minimum: -100,
					maximum: 100,
					default: 0
				},
				clip: {
					type: "boolean",
					default: true
				},
				randomizeIds: {
					type: "boolean",
					default: false
				}
			}
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+core@9.4.3/node_modules/@dicebear/core/lib/utils/options.js
		function defaults(schema) {
			var _a;
			let result = {};
			let props = (_a = schema.properties) !== null && _a !== void 0 ? _a : {};
			Object.keys(props).forEach((key) => {
				let val = props[key];
				if (typeof val === "object" && void 0 !== val.default) if (Array.isArray(val.default)) result[key] = [...val.default];
				else if (typeof val.default === "object") result[key] = { ...val.default };
				else result[key] = val.default;
			});
			return result;
		}
		function merge(style, options) {
			var _a;
			let result = {
				...defaults(schema$1),
				...defaults((_a = style.schema) !== null && _a !== void 0 ? _a : {}),
				...options
			};
			return JSON.parse(JSON.stringify(result));
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+core@9.4.3/node_modules/@dicebear/core/lib/utils/color.js
		function convertColor$1(color) {
			return "transparent" === color ? color : `#${color}`;
		}
		function getBackgroundColors(prng, backgroundColor, backgroundType) {
			var _a;
			let shuffledBackgroundColors = prng.shuffle(backgroundColor);
			if (shuffledBackgroundColors.length <= 1) {
				shuffledBackgroundColors = backgroundColor;
				prng.next();
			} else if (backgroundColor.length == 2 && backgroundType == "gradientLinear") {
				shuffledBackgroundColors = backgroundColor;
				prng.next();
			} else shuffledBackgroundColors = prng.shuffle(backgroundColor);
			if (shuffledBackgroundColors.length === 0) shuffledBackgroundColors = ["transparent"];
			const primary = shuffledBackgroundColors[0];
			const secondary = (_a = shuffledBackgroundColors[1]) !== null && _a !== void 0 ? _a : shuffledBackgroundColors[0];
			return {
				primary: convertColor$1(primary),
				secondary: convertColor$1(secondary)
			};
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+core@9.4.3/node_modules/@dicebear/core/lib/core.js
		function createAvatar(style, options = {}) {
			var _a, _b, _c, _d, _e;
			options = merge(style, options);
			const prng = create$1(options.seed);
			const result = style.create({
				prng,
				options
			});
			const backgroundType = prng.pick((_a = options.backgroundType) !== null && _a !== void 0 ? _a : [], "solid");
			const { primary: primaryBackgroundColor, secondary: secondaryBackgroundColor } = getBackgroundColors(prng, (_b = options.backgroundColor) !== null && _b !== void 0 ? _b : [], backgroundType);
			const backgroundRotation = prng.integer(((_c = options.backgroundRotation) === null || _c === void 0 ? void 0 : _c.length) ? Math.min(...options.backgroundRotation) : 0, ((_d = options.backgroundRotation) === null || _d === void 0 ? void 0 : _d.length) ? Math.max(...options.backgroundRotation) : 0);
			if (options.size) {
				result.attributes.width = options.size.toString();
				result.attributes.height = options.size.toString();
			}
			if (options.scale !== void 0 && options.scale !== 100) result.body = addScale(result, options.scale);
			if (options.flip) result.body = addFlip(result);
			if (options.rotate) result.body = addRotate(result, options.rotate);
			if (options.translateX || options.translateY) result.body = addTranslate(result, options.translateX, options.translateY);
			if (primaryBackgroundColor !== "transparent" && secondaryBackgroundColor !== "transparent") result.body = addBackground(result, primaryBackgroundColor, secondaryBackgroundColor, backgroundType, backgroundRotation);
			if (options.radius || options.clip) result.body = addViewboxMask(result, (_e = options.radius) !== null && _e !== void 0 ? _e : 0);
			if (options.randomizeIds) result.body = randomizeIds(result);
			const svg = `<svg ${createAttrString(result)}>${xml(style)}${result.body}</svg>`;
			return {
				toString: () => svg,
				toJson: () => {
					var _a;
					return {
						svg,
						extra: {
							primaryBackgroundColor,
							secondaryBackgroundColor,
							backgroundType,
							backgroundRotation,
							...(_a = result.extra) === null || _a === void 0 ? void 0 : _a.call(result)
						}
					};
				},
				toDataUri: () => {
					return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
				}
			};
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+micah@9.4.2_@dicebear+core@9.4.3/node_modules/@dicebear/micah/lib/components/base.js
		/**
		* Do not change this file manually! This file was generated with the "Dicebear Exporter"-Plugin for Figma.
		*
		* Plugin: https://www.figma.com/community/plugin/1005765655729342787
		* File: https://www.figma.com/file/YHb4ShTgmO8Lqhkz1plLfL
		*/
		const base = { standard: (components, colors) => {
			var _a, _b;
			return `<path d="M154 319.5c-14.4-20-25.67-58.67-27-78L58.5 212 30 319.5h124Z" fill="${xml$1(`${colors.base}`)}" stroke="#000" stroke-width="4"/><path d="M130.37 263.69c-2.1.2-4.22.31-6.37.31-30.78 0-56.05-21.57-58.76-49.1L127 241.5c.38 5.48 1.55 13.32 3.37 22.19Z" fill="#000" style="mix-blend-mode:multiply"/><path d="M181.94 151.37v.01l.1.4.14.65A75.72 75.72 0 0 1 34.93 187.7l-.2-.74L18 117.13l-.06-.29A75.72 75.72 0 0 1 165.2 81.55l.05.21.02.08.05.2.05.2v.01l16.4 68.44.08.34.08.34Z" fill="${xml$1(`${colors.base}`)}" stroke="#000" stroke-width="4"/><g transform="translate(34 102.3)">${(_b = (_a = components.facialHair) === null || _a === void 0 ? void 0 : _a.value(components, colors)) !== null && _b !== void 0 ? _b : ""}</g>`;
		} };
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+micah@9.4.2_@dicebear+core@9.4.3/node_modules/@dicebear/micah/lib/components/mouth.js
		/**
		* Do not change this file manually! This file was generated with the "Dicebear Exporter"-Plugin for Figma.
		*
		* Plugin: https://www.figma.com/community/plugin/1005765655729342787
		* File: https://www.figma.com/file/YHb4ShTgmO8Lqhkz1plLfL
		*/
		const mouth = {
			surprised: (components, colors) => `<path d="M36.37 56.66c12.1-2.2 18.75-15.38 16.42-28.23C50.47 15.6 39.63 5.57 27.52 7.76 15.4 9.95 8.77 23.13 11.09 35.98c2.33 12.85 13.17 22.87 25.28 20.68Z" fill="${xml$1(`${colors.mouth}`)}"/><path d="M17.14 42.66c2.78-5.21 8.14-9.25 14.8-10.45 6.66-1.2 13.1.7 17.53 4.6-1.09 8.3-6.37 15-13.74 16.33-7.37 1.33-14.67-3.1-18.6-10.47Z" fill="#FC909F"/>`,
			laughing: (components, colors) => `<path d="M64.73 25.7a36 36 0 0 0 1.18-12.54 4.98 4.98 0 0 0-6.8-4.2c-4.26 1.67-18.03 6.88-27.62 8.2-10.52 1.44-26.66-.32-31.44-.91a4.98 4.98 0 0 0-5.53 5.74 36 36 0 0 0 70.21 3.7Z" fill="${xml$1(`${colors.mouth}`)}"/><path d="M51.83 39.55a32 32 0 0 1-37.2 4.62 21.5 21.5 0 0 1 37.2-4.62Z" fill="#FC909F"/>`,
			nervous: (components, colors) => `<path d="M68.42 31.57 67.4 17a8.06 8.06 0 0 0-9.74-7.3c-6.95 1.49-20.1 4.1-29.54 4.76-9.43.66-22.82-.1-29.9-.6a8.06 8.06 0 0 0-8.63 8.58L-9.4 37a8.06 8.06 0 0 0 9.73 7.3c6.95-1.48 20.1-4.1 29.54-4.76 9.44-.66 22.82.1 29.91.61a8.06 8.06 0 0 0 8.63-8.58Z" fill="${xml$1(`${colors.mouth}`)}"/><path d="m-.25 17.97 1.6 6.07a6 6 0 0 0 6.22 4.46 6 6 0 0 0-5.54 5.28l-.74 6.23c7.28-1.52 19.34-3.83 28.3-4.46 8.98-.63 21.24-.02 28.66.48l-1.6-6.07a6 6 0 0 0-6.21-4.46 6 6 0 0 0 5.54-5.28l.73-6.24c-7.27 1.53-19.33 3.84-28.3 4.47-8.97.62-21.23.01-28.65-.48Z" fill="#fff"/>`,
			smile: (components, colors) => `<path d="M-.5 17.5c2.5 17 31 25 57 5.5" stroke="${xml$1(`${colors.mouth}`)}" stroke-width="4"/>`,
			sad: (components, colors) => `<path d="M13 46c1.72-7.96 8.07-24.77 19.77-28.35 11.7-3.58 17.7 8.46 19.23 14.92" stroke="${xml$1(`${colors.mouth}`)}" stroke-width="4"/>`,
			pucker: (components, colors) => `<path d="M26 16.7c4.17-2.34 21-5.3 21 1.5 0 8.5-11.5 8-11.5 8s13.04-3.16 10.5 6c-2.5 9-9.5 5.5-11.5 4.5" stroke="${xml$1(`${colors.mouth}`)}" stroke-width="4"/>`,
			frown: (components, colors) => `<path d="M-5 41c3.21-7.96 15.1-24.77 37-28.35 21.9-3.58 33.13 8.46 36 14.92" stroke="${xml$1(`${colors.mouth}`)}" stroke-width="4"/>`,
			smirk: (components, colors) => `<path d="M10 24.16c4.94 6.45 12.43 13.6 23.98 11.96 11.55-1.62 16.68-9.6 15.17-16.04" stroke="${xml$1(`${colors.mouth}`)}" stroke-width="4"/>`
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+micah@9.4.2_@dicebear+core@9.4.3/node_modules/@dicebear/micah/lib/components/eyebrows.js
		/**
		* Do not change this file manually! This file was generated with the "Dicebear Exporter"-Plugin for Figma.
		*
		* Plugin: https://www.figma.com/community/plugin/1005765655729342787
		* File: https://www.figma.com/file/YHb4ShTgmO8Lqhkz1plLfL
		*/
		const eyebrows = {
			up: (components, colors) => `<path d="M99 10.21c5.67-2.66 19-5.1 27 6.5M23.58 35.52c2.07-5.9 9.68-17.12 23.56-14.7" stroke="${xml$1(`${colors.eyebrows}`)}" stroke-width="4" stroke-linecap="round"/>`,
			down: (components, colors) => `<path d="M27 26.5c6.17 2.5 21.1 3 31.5-15M94 4c5.17 5.33 18.1 12.8 28.5 0" stroke="${xml$1(`${colors.eyebrows}`)}" stroke-width="4" stroke-linecap="round"/>`,
			eyelashesUp: (components, colors) => `<path d="M99 10.21c5.67-2.66 19-5.1 27 6.5M23.58 35.52c2.07-5.9 9.68-17.12 23.56-14.7M26.07 29.46l-6.14-5.43M122.96 11.16l6.15-5.43M32.52 23.81l-4.04-7.13M115.51 7.51l4.05-7.13M40.6 20.2l-2.2-7.9M106.44 6.9l2.2-7.9" stroke="${xml$1(`${colors.eyebrows}`)}" stroke-width="4" stroke-linecap="round"/>`,
			eyelashesDown: (components, colors) => `<path d="M27 26.5c6.17 2.5 21.1 3 31.5-15M94 4c5.17 5.33 18.1 12.8 28.5 0M37.15 26.46 31 21.03M116.22 9.44l1.78-8M45.6 22.81l-4.05-7.13M108.14 9.02l.94-8.15M52.67 17.2l-2.2-7.9M100 8.03l-.78-8.16" stroke="${xml$1(`${colors.eyebrows}`)}" stroke-width="4" stroke-linecap="round"/>`
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+micah@9.4.2_@dicebear+core@9.4.3/node_modules/@dicebear/micah/lib/components/hair.js
		/**
		* Do not change this file manually! This file was generated with the "Dicebear Exporter"-Plugin for Figma.
		*
		* Plugin: https://www.figma.com/community/plugin/1005765655729342787
		* File: https://www.figma.com/file/YHb4ShTgmO8Lqhkz1plLfL
		*/
		const hair = {
			fonze: (components, colors) => `<path d="M210.18 49.4c-1.27 6.05-4.6 11.32-9.43 15.9 9.4 34.06 9.6 53.87 4.38 57.65l-14.8-49.99C158.4 91.7 98.65 94.9 83.69 94.9c-1.55.17-3.02.4-4.43.67-14.65 9-2.6 52.12 11.75 70.43l-11 2c-5.14-24.97-17.41-22.92-26.61-21.38l-.32.05c2.2 13.63 6.72 27.74 10.45 39.32.95 2.99 1.86 5.8 2.66 8.4-.79.1-1.48.3-2.12.47-5.5 1.53-7.41 2.06-33.38-61.97-6.47-15.95-6.03-30.16-.97-42.62-4.78-4.8-14.37-7.14-19.71-7.78 10.44-6.12 20.58-4.87 25.54-3.1.5-.75 1.02-1.49 1.56-2.22-.97-4.41-7.96-9.46-12.11-11.82 8.55-4.3 18.6-2.03 22.98-.2C67.63 47.13 97.03 35.05 122 29 170.81 17.17 189.5.5 189.5.5c20.68 8.5 25.62 25.22 20.68 48.9Z" fill="${xml$1(`${colors.hair}`)}" stroke="#000" stroke-width="4"/>`,
			mrT: (components, colors) => `<g fill="${xml$1(`${colors.hair}`)}"><path opacity=".1" d="M187.99 77.18c-8-6.4-21.84-7-27.5-6.5l-8-26.5c13.6 3.2 32 24 35.5 33Z"/><path d="M85.8 11.76S91.52 7.8 115.74 1.7c24.21-6.1 33.04-3.72 33.04-3.72l11.8 72.84s-8.05-.18-28.04 4.19c-20 4.38-29.56 9.67-29.56 9.67l-17.2-72.9Z"/><path d="M48.99 86.68c-6.8-41.6 23.33-68.17 37-75.5l16.98 73.5c-19.2-39.6-45.33-15.17-54 2Z"/><path opacity=".1" d="M67.49 130.68c-7.2-27.2 22-41.84 35.5-46-7-16.34-23-31-42.5-13-18 30.5-11 54-5.5 72l12.5-13Z"/></g>`,
			dougFunny: (components, colors) => `<path d="M140 56c14.67-.67 40.4-8.8 26-36M114 54c14.67-.67 40.4-8.8 26-36M78 65c14.67-.67 40.4-8.8 26-36" stroke="${xml$1(`${colors.hair}`)}" stroke-width="4"/>`,
			mrClean: (components, colors) => `<ellipse cx="147.85" cy="58.18" rx="6.86" ry="18.44" transform="rotate(117 147.85 58.18)" fill="#FCFDFF"/>`,
			dannyPhantom: (components, colors) => `<path d="M123.79 17.49H123.94a96.78 96.78 0 0 1 62.07 24.36c14.06 12.4 22.45 26.87 25.19 36.73-4.06 2.32-11.01 4.31-19.88 5.95-9.68 1.78-21.3 3.08-33.15 4.01-23.7 1.86-48.2 2.2-59.63 1.96l-6.07-.13 4.8 3.71c2.5 1.93 5.83 3.28 9.34 4.22 3.55.95 7.42 1.54 11.14 1.87 3.82.34 7.55.42 10.64.34-10.59 8.16-24.06 14.44-37.35 19.09a225.88 225.88 0 0 1-39.83 9.92l-2.15.32.5 2.11c3.34 14.43 9.5 39.65 13.62 56.57 1.83 7.5 3.26 13.38 3.87 15.94 1.09 4.56 4.5 11.05 8.4 17.03 3.6 5.52 7.78 10.89 11.32 14.2l-7.84 31.81H49.37c8.34-12.71 10.1-27.4 8.4-42.98-1.84-16.87-7.76-35-14-53.17l-1.85-5.36c-5.69-16.46-11.36-32.88-14.43-48.6-3.4-17.44-3.56-33.75 2.83-48.09 10.34-23.21 28.66-36.7 47-44.12 18.37-7.45 36.61-8.76 46.46-7.71Z" fill="${xml$1(`${colors.hair}`)}" stroke="#000" stroke-width="4"/>`,
			full: (components, colors) => `<path d="m-13.4 312.86-.62-1.64c-.56-1.55-1.35-3.84-2.23-6.74a163.21 163.21 0 0 1-5.28-23.98c-2.81-19.77-2.8-45.8 8.4-71.12 1.8-4.09 4.07-8.3 6.52-12.85 9.47-17.6 21.77-40.46 21.77-82.45 0-30.59 14.84-56.35 36.7-74.51 21.88-18.18 50.7-28.66 78.38-28.66 15.13 0 27.3 1.73 37.07 7.64 9.72 5.87 17.37 16.05 23.05 33.58a3.47 3.47 0 0 0 4.36 2.27c11.31-3.67 28.47.04 42.95 9.5 14.42 9.4 25.62 24.15 25.62 41.91 0 15.43-2.64 25.85-5.22 36-3.12 12.3-6.13 24.16-4 43.5.7 6.45 2.15 11.03 4.16 14.82 1.98 3.73 4.48 6.62 7.12 9.66l.05.07c6.28 7.25 9.13 13.22 10.06 18.47.92 5.23-.05 9.98-1.84 14.9-.9 2.48-2 4.97-3.15 7.59l-.1.22c-1.12 2.53-2.3 5.19-3.35 7.98-2.18 5.77-3.89 12.2-3.72 19.83.15 6.48 1.3 10.91 3.01 14.27 1.7 3.32 3.89 5.44 5.8 7.3l.05.05c1.74 1.68 3.2 3.1 4.27 5.1.96 1.78 1.67 4.13 1.79 7.66a172.14 172.14 0 0 1-87.4 23.9 110.86 110.86 0 0 1-7.28-.28c-6.15-9.4-11.75-24.88-16.1-40.8-4.21-15.46-7.18-31.08-8.3-41.4 37.08-10.72 60.32-48.98 54.73-88.46l-.01-.12a5.97 5.97 0 0 0-.08-.47 76.68 76.68 0 0 0-.43-2.25 486.97 486.97 0 0 0-6.53-28.2 276.64 276.64 0 0 0-7.45-24.2c-2.76-7.5-5.83-14.15-9.1-18.24l-.3-.37-.44-.2c-1.93-.83-3.94-1.77-6.03-2.74-9.93-4.62-21.84-10.17-37.26-10.78-18.78-.74-42.56 5.78-74.7 29.09l-2.02 1.46 1.95 1.57c15.92 12.83 19.37 29.86 18.63 44.3a89.2 89.2 0 0 1-5.24 25.1c-1.16-1.69-1.9-3.82-2.45-6.33a85.19 85.19 0 0 1-.96-5.45l-.05-.3c-.3-2-.63-4.08-1.1-6.09-.96-4.01-2.57-8.02-6.14-10.86-3.58-2.84-8.8-4.25-16.4-3.83l-2.22.13.46 2.18 11.36 53.31.02.08.03.09a79.8 79.8 0 0 0 19.91 32.81 65.49 65.49 0 0 1 1.54 2.68c1.01 1.82 2.37 4.38 3.76 7.33 2.82 5.94 5.66 13.24 6.2 19.2.57 6.05-.96 13.86-2.7 20.31a129.63 129.63 0 0 1-2.84 9.14c-5.03-2.4-9.53-2.23-13.38.01-4.16 2.43-7.21 7.06-9.48 12.22-4.15 9.42-6.14 21.64-7.06 29.22A601.65 601.65 0 0 1 6.2 320.1 353.85 353.85 0 0 1-9 314.64a190.8 190.8 0 0 1-4.4-1.77Z" fill="${xml$1(`${colors.hair}`)}" stroke="#000" stroke-width="3.82"/>`,
			turban: (components, colors) => `<g stroke="#000" stroke-width="4"><path d="M222.73 100.8c0-66.1-36.46-110.8-80.87-110.8C84.96-10 27 11.34 27 112.25c0 24.97 10.66 43.58 25.56 57.29a42.88 42.88 0 0 1-3.5-4.92c-2.88-26.98 29.17-47.7 60.54-67.96 16.65-10.75 33.11-21.39 44.05-32.76 9.6 5.43 37.79 28.2 43.16 37.42 2.88 4.94 7.51 21.87 10.67 41.63 10.34-12.42 15.25-24.84 15.25-42.16Z" fill="${xml$1(`${colors.hair}`)}"/><path d="M154.26 63.25c13.18-11.95 32.89-39.21 31.62-56.92"/></g>`,
			pixie: (components, colors) => `<g stroke="#000"><path d="m105.84 88.82 1.88.3v.08l-.04.16-.12.52c-.12.45-.3 1.09-.6 1.9a41.7 41.7 0 0 1-3.4 6.92c-3.17 5.32-8.7 12.66-18.31 21.6 29.97.74 55-8.92 72.82-19.04a156.35 156.35 0 0 0 21.71-14.87 118.43 118.43 0 0 0 7.5-6.7l.1-.1.01-.01 2.29-2.38.93 3.16-1.84.54 1.84-.54v.05l.05.13.15.52a817.06 817.06 0 0 1 2.69 9.28c1.75 6.14 4.14 14.58 6.66 23.77 5.03 18.35 10.6 39.81 12.7 51.97 3.49 20.32-1.91 35.74-5.1 44.87-.63 1.77-1.17 3.3-1.54 4.6.06.04.12.1.22.16.6.42 1.65.91 3.18 1.4 3.02.96 7.32 1.74 11.92 2.19 4.6.44 9.38.53 13.34.14 1.98-.2 3.7-.5 5.08-.92a6.85 6.85 0 0 0 2.58-1.27c.02-.08.03-.29-.02-.68-.1-.78-.4-1.87-.93-3.32-.8-2.15-1.97-4.8-3.35-7.88l-1.46-3.3c-3.93-8.94-8.65-20.56-9.68-32.4-1.15-13.16 1.45-24.42 3.79-34.54l.11-.48c2.39-10.34 4.38-19.32 2.34-28.42-3.1-13.8-7.32-25.3-13.8-33.57-6.42-8.17-15.13-13.27-27.5-14.21l-1.28-.1-.4-1.22c-5.7-17.57-13.38-29.05-23.18-36.17-9.8-7.12-21.96-10.05-36.94-10.05-27.7 0-57.5 10.52-79.88 28.72-22.35 18.18-37.14 43.9-35.2 74.33 2.13 33.6-.3 59.06-5.8 77.72-5 17-12.59 28.46-21.68 35.14 1.19.61 2.78 1.39 4.77 2.27 5.02 2.24 12.59 5.2 22.67 8.03 19.34 5.43 47.95 10.38 85.71 8.89-8.32-7.15-16.72-15.83-23.37-25-7.63-10.53-13.14-21.94-13.3-32.58-.19-12.62.67-45.67.93-52.5.62-15.9 10.82-28.15 20.54-36.3a96.6 96.6 0 0 1 18.96-12.34l.2-.1.13-.06.1-.05h.02v-.01l.8 1.74Zm0 0 1.88.3.56-3.5-3.23 1.46.79 1.74Zm100.23 126.57.03.04-.03-.04Z" fill="${xml$1(`${colors.hair}`)}" stroke-width="3.82"/><path d="M191 58c.5 4.5-.3 13.5-1.5 19.5" stroke-width="4"/></g>`
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+micah@9.4.2_@dicebear+core@9.4.3/node_modules/@dicebear/micah/lib/components/eyes.js
		/**
		* Do not change this file manually! This file was generated with the "Dicebear Exporter"-Plugin for Figma.
		*
		* Plugin: https://www.figma.com/community/plugin/1005765655729342787
		* File: https://www.figma.com/file/YHb4ShTgmO8Lqhkz1plLfL
		*/
		const eyes = {
			eyes: (components, colors) => {
				var _a, _b;
				return `<g fill="${xml$1(`${colors.eyes}`)}"><ellipse cx="16.53" cy="29.4" rx="9" ry="13.5" transform="rotate(-6.78 16.53 29.4)"/><ellipse cx="80.53" cy="19.4" rx="9" ry="13.5" transform="rotate(-6.28 80.53 19.4)"/></g><g transform="translate(-40 -8)">${(_b = (_a = components.glasses) === null || _a === void 0 ? void 0 : _a.value(components, colors)) !== null && _b !== void 0 ? _b : ""}</g>`;
			},
			round: (components, colors) => {
				var _a, _b;
				return `<g fill="${xml$1(`${colors.eyes}`)}"><ellipse cx="16.12" cy="28.93" rx="9" ry="10" transform="rotate(-6.78 16.12 28.93)"/><ellipse cx="80.15" cy="18.92" rx="9" ry="10" transform="rotate(-6.28 80.15 18.92)"/></g><g transform="translate(-40 -8)">${(_b = (_a = components.glasses) === null || _a === void 0 ? void 0 : _a.value(components, colors)) !== null && _b !== void 0 ? _b : ""}</g>`;
			},
			eyesShadow: (components, colors) => {
				var _a, _b;
				return `<circle cx="15.24" cy="20.24" r="12" transform="rotate(-6.28 15.24 20.24)" fill="${xml$1(`${colors.eyeShadow}`)}"/><ellipse cx="16.53" cy="29.4" rx="9" ry="13.5" transform="rotate(-6.78 16.53 29.4)" fill="${xml$1(`${colors.eyes}`)}"/><circle cx="79.02" cy="11.61" r="12" transform="rotate(-6.28 79.02 11.61)" fill="${xml$1(`${colors.eyeShadow}`)}"/><ellipse cx="80.53" cy="19.4" rx="9" ry="13.5" transform="rotate(-6.28 80.53 19.4)" fill="${xml$1(`${colors.eyes}`)}"/><g transform="translate(-40 -8)">${(_b = (_a = components.glasses) === null || _a === void 0 ? void 0 : _a.value(components, colors)) !== null && _b !== void 0 ? _b : ""}</g>`;
			},
			smiling: (components, colors) => {
				var _a, _b;
				return `<path d="M5.29 34.07c.11.82 1.14 1 1.72.41 2.46-2.52 6.25-4.36 10.65-4.89 2.6-.3 5.1-.12 7.32.48.75.2 1.5-.44 1.23-1.17A10.84 10.84 0 0 0 5.3 34.07ZM69.38 24.07c.12.82 1.15 1 1.73.41 2.44-2.48 6.19-4.3 10.54-4.83 2.56-.3 5.03-.12 7.23.47.75.2 1.5-.44 1.23-1.17a10.74 10.74 0 0 0-20.73 5.12Z" fill="${xml$1(`${colors.eyes}`)}"/><g transform="translate(-40 -8)">${(_b = (_a = components.glasses) === null || _a === void 0 ? void 0 : _a.value(components, colors)) !== null && _b !== void 0 ? _b : ""}</g>`;
			},
			smilingShadow: (components, colors) => {
				var _a, _b;
				return `<path d="M26.47 24.36c1.86 6.36-5.04 1.48-11.4 3.33-6.36 1.86-9.78 9.76-11.64 3.4a12 12 0 0 1 23.04-6.73ZM90.26 15.17c1.64 6.42-4.7 1.52-11.11 3.15-6.43 1.64-10.51 9.19-12.15 2.77a12 12 0 1 1 23.26-5.92Z" fill="${xml$1(`${colors.eyeShadow}`)}"/><path d="M5.29 34.07c.11.82 1.14 1 1.72.41 2.46-2.52 6.25-4.36 10.65-4.89 2.6-.3 5.1-.12 7.32.48.75.2 1.5-.44 1.23-1.17A10.84 10.84 0 0 0 5.3 34.07ZM69.38 24.07c.12.82 1.15 1 1.73.41 2.44-2.48 6.19-4.3 10.54-4.83 2.56-.3 5.03-.12 7.23.47.75.2 1.5-.44 1.23-1.17a10.74 10.74 0 0 0-20.73 5.12Z" fill="${xml$1(`${colors.eyes}`)}"/><g transform="translate(-40 -8)">${(_b = (_a = components.glasses) === null || _a === void 0 ? void 0 : _a.value(components, colors)) !== null && _b !== void 0 ? _b : ""}</g>`;
			}
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+micah@9.4.2_@dicebear+core@9.4.3/node_modules/@dicebear/micah/lib/components/nose.js
		/**
		* Do not change this file manually! This file was generated with the "Dicebear Exporter"-Plugin for Figma.
		*
		* Plugin: https://www.figma.com/community/plugin/1005765655729342787
		* File: https://www.figma.com/file/YHb4ShTgmO8Lqhkz1plLfL
		*/
		const nose = {
			curve: (components, colors) => `<path d="M16.5 7c-.33 3.83 0 12.2 4 15 5 3.5-.5 12-10.5 10" stroke="#000" stroke-width="4"/>`,
			pointed: (components, colors) => `<path d="M16.5 3c0 14 7 25 7 25S20 34 10 32" stroke="#000" stroke-width="4"/>`,
			tound: (components, colors) => `<path d="M12.3 12.34c5.45-1.24 14.38.62 12.42 10.54-1.74 8.82-11.1 9.3-13.72 6.82" stroke="#000" stroke-width="4"/>`
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+micah@9.4.2_@dicebear+core@9.4.3/node_modules/@dicebear/micah/lib/components/ears.js
		/**
		* Do not change this file manually! This file was generated with the "Dicebear Exporter"-Plugin for Figma.
		*
		* Plugin: https://www.figma.com/community/plugin/1005765655729342787
		* File: https://www.figma.com/file/YHb4ShTgmO8Lqhkz1plLfL
		*/
		const ears = {
			attached: (components, colors) => {
				var _a, _b;
				return `<path d="M30.5 6.18A23.78 23.78 0 0 0 23.08 5c-10.5 0-19 6.5-18 18.5 1.04 12.5 8.5 17 19 17A19.6 19.6 0 0 0 31 39.23" stroke="#000" stroke-width="8"/><path d="M31.5 39.04a19.38 19.38 0 0 1-7.42 1.46c-10.5 0-17.96-4.5-19-17-1-12 7.5-18.5 18-18.5 3.14 0 6.19.6 8.92 1.73l-.5 32.3Z" fill="${xml$1(`${colors.base}`)}"/><path d="M27.5 13.5c-4-1.83-12.8-2.8-16 8" stroke="#000" stroke-width="4"/><path d="M17 14c2.17 1.83 6.3 7.5 5.5 15.5" stroke="#000" stroke-width="4"/><g transform="translate(3 35)">${(_b = (_a = components.earrings) === null || _a === void 0 ? void 0 : _a.value(components, colors)) !== null && _b !== void 0 ? _b : ""}</g>`;
			},
			detached: (components, colors) => {
				var _a, _b;
				return `<path d="M37 8.25V7.13l-.95-.59A24.91 24.91 0 0 0 23.08 3C17.44 3 12.16 4.75 8.4 8.3c-3.8 3.58-5.86 8.83-5.31 15.37.52 6.37 2.66 11.06 6.2 14.17-.29 1-.37 2.08-.24 3.21a8.98 8.98 0 0 0 4.6 7.08C16.09 49.5 19.2 50 22.52 50c5.48 0 10.29-2.95 13.95-6.89l.53-.57V8.25Z" stroke="#000" stroke-width="4"/><path d="M42.97 23.98c.07-.65.1-1.3.1-1.98 0-10.22-9.5-17-20-17C12.6 5 4.09 11.5 5.09 23.5c.56 6.68 2.95 11.07 6.65 13.72a5.7 5.7 0 0 0-.68 3.6C11.68 46.1 16.19 48 22.52 48c11.1 0 19.9-14.05 20.45-24.02Z" fill="${xml$1(`${colors.base}`)}"/><path d="M27.5 13.5c-4-1.83-12.8-2.8-16 8" stroke="#000" stroke-width="4"/><path d="M17 14c2.17 1.83 6.3 7.5 5.5 15.5" stroke="#000" stroke-width="4"/><g transform="translate(3 42)">${(_b = (_a = components.earrings) === null || _a === void 0 ? void 0 : _a.value(components, colors)) !== null && _b !== void 0 ? _b : ""}</g>`;
			}
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+micah@9.4.2_@dicebear+core@9.4.3/node_modules/@dicebear/micah/lib/components/shirt.js
		/**
		* Do not change this file manually! This file was generated with the "Dicebear Exporter"-Plugin for Figma.
		*
		* Plugin: https://www.figma.com/community/plugin/1005765655729342787
		* File: https://www.figma.com/file/YHb4ShTgmO8Lqhkz1plLfL
		*/
		const shirt = {
			open: (components, colors) => `<path d="M260.37 90.86H-12.54l.1-.2C-7.89 81.38.5 64.31 11.4 49.03c6.2-8.67 13.13-16.65 20.54-22.27 7.41-5.61 15.12-8.73 22.95-8.04 15.06 1.31 28.46 9.56 41.93 17.83l3.83 2.35c14.48 8.82 29.35 17.02 45.72 13.43 5.53-1.2 9.26-3.8 11.6-7.16 2.32-3.3 3.15-7.15 3.3-10.66.14-3.52-.4-6.85-.96-9.26a39.89 39.89 0 0 0-.75-2.78c3.63-3.64 7.47-5.77 11.43-6.73 4.3-1.03 8.89-.73 13.72.7 9.73 2.87 20.14 10.25 30.3 19.73 18.61 17.37 35.69 41.14 45.36 54.68Z" fill="${xml$1(`${colors.shirt}`)}" stroke="#000" stroke-width="4.27"/>`,
			crew: (components, colors) => `<g stroke="#000" stroke-width="4"><path d="M260.7 91H-12.64C3.67 61.66 26.86 42.98 64.44 34.4c16.02-3.65 34.67-5.47 56.56-5.47 9.46 0 16.81 1.44 23.8 3.35 2.58.7 5.18 1.5 7.84 2.3 4.4 1.34 8.97 2.72 13.91 3.86l.14.03.15.01c46.12 3.8 73.78 24.3 93.85 52.5Z" fill="${xml$1(`${colors.shirt}`)}"/><path d="m52.93 36.58 9.15-19.6a1 1 0 0 1 1.25-.51c37.93 13.42 72.43 12.48 104.4 3.57a1 1 0 0 1 1.09.38l13.93 19.05a.98.98 0 0 1-.42 1.5c-33.6 13.2-96.67 10.95-128.91-3.07a.98.98 0 0 1-.49-1.32Z" fill="${xml$1(`${colors.shirt}`)}"/><path opacity=".75" d="m52.93 36.58 9.15-19.6a1 1 0 0 1 1.25-.51c37.93 13.42 72.43 12.48 104.4 3.57a1 1 0 0 1 1.09.38l13.93 19.05a.98.98 0 0 1-.42 1.5c-33.6 13.2-96.67 10.95-128.91-3.07a.98.98 0 0 1-.49-1.32Z" fill="#fff"/></g>`,
			collared: (components, colors) => `<g stroke="#000" stroke-width="4"><path d="M126.77 67.58 128 66l-1.23 1.58 1.72 1.34 1.19-1.83v-.02l.05-.06.04-.05a28.57 28.57 0 0 1 .8-1.18 112.35 112.35 0 0 1 11.5-14.05c3.67-3.78 7.83-7.4 12.13-9.93 4.31-2.53 8.58-3.84 12.53-3.3C209.17 44.2 240.4 63 260.67 91h-273.3c16.3-29.34 39.49-48.02 77.07-56.59 1.6-.36 3.78-.25 6.5.38 2.7.63 5.77 1.73 9.09 3.19 6.62 2.9 14.02 7.16 20.97 11.56a355.78 355.78 0 0 1 25.24 17.63l.4.3.1.08.02.02h.01Z" fill="${xml$1(`${colors.shirt}`)}"/><path d="m52.61 37.08 5.17-19.23c.2-.78 1.22-1 1.76-.4C74.4 33.7 93.16 33.08 99.4 32.33c.84-.1 1.5.82 1.1 1.58L87.34 58.86c-.2.38-.62.6-1.04.5-3.95-.82-23.62-5.63-33.57-21.5a1 1 0 0 1-.12-.78ZM183.2 36.98 171.61 17.5c-.4-.66-1.37-.65-1.79 0-5.73 8.83-15.63 12.9-19.09 14.1-.62.22-.9.96-.57 1.53l13.5 22.81c.2.34.59.53.97.42 2.13-.61 9.46-3.67 18.54-18.34a1 1 0 0 0 .01-1.04Z" fill="${xml$1(`${colors.shirt}`)}"/><path d="m52.61 37.08 5.17-19.23c.2-.78 1.22-1 1.76-.4C74.4 33.7 93.16 33.08 99.4 32.33c.84-.1 1.5.82 1.1 1.58L87.34 58.86c-.2.38-.62.6-1.04.5-3.95-.82-23.62-5.63-33.57-21.5a1 1 0 0 1-.12-.78ZM183.2 36.98 171.61 17.5c-.4-.66-1.37-.65-1.79 0-5.73 8.83-15.63 12.9-19.09 14.1-.62.22-.9.96-.57 1.53l13.5 22.81c.2.34.59.53.97.42 2.13-.61 9.46-3.67 18.54-18.34a1 1 0 0 0 .01-1.04Z" fill="#fff" fill-opacity=".75"/><path d="m109.5 54.5-9-21.5-7 15 16 6.5ZM141 53.5l9-21.5 7 15-16 6.5ZM70.5 14l-12 3 10 6.5 2-9.5ZM160 14l11 3-7 6.5-4-9.5Z" fill="#000" stroke-linejoin="round"/></g>`
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+micah@9.4.2_@dicebear+core@9.4.3/node_modules/@dicebear/micah/lib/components/earrings.js
		/**
		* Do not change this file manually! This file was generated with the "Dicebear Exporter"-Plugin for Figma.
		*
		* Plugin: https://www.figma.com/community/plugin/1005765655729342787
		* File: https://www.figma.com/file/YHb4ShTgmO8Lqhkz1plLfL
		*/
		const earrings = {
			hoop: (components, colors) => `<path d="M24 0A24 24 0 1 1 0 24c0-6.4 3.5-11.5 6.57-16.5L7.5 6" stroke="${xml$1(`${colors.earring}`)}" stroke-width="4"/>`,
			stud: (components, colors) => `<circle cx="25" cy="2" r="4" fill="${xml$1(`${colors.earring}`)}"/><circle cx="26" cy="1" r="1" fill="#fff"/>`
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+micah@9.4.2_@dicebear+core@9.4.3/node_modules/@dicebear/micah/lib/components/glasses.js
		/**
		* Do not change this file manually! This file was generated with the "Dicebear Exporter"-Plugin for Figma.
		*
		* Plugin: https://www.figma.com/community/plugin/1005765655729342787
		* File: https://www.figma.com/file/YHb4ShTgmO8Lqhkz1plLfL
		*/
		const glasses = {
			round: (components, colors) => `<g stroke="${xml$1(`${colors.glasses}`)}" stroke-width="4"><circle cx="122.5" cy="28" r="26"/><circle cx="55.5" cy="37" r="26"/><path d="M97.5 35a8 8 0 0 0-16 0M30 39 0 44.5"/></g>`,
			square: (components, colors) => `<g stroke="${xml$1(`${colors.glasses}`)}" stroke-width="4"><path d="M34.5 42.5 0 49.12" stroke-linecap="round"/><path d="M35.47 18.53 74.2 13.1a6 6 0 0 1 6.77 5.1l5.57 39.62a6 6 0 0 1-5.1 6.78l-34.48 4.84a6 6 0 0 1-6.65-4.48l-9.81-39.01a6 6 0 0 1 4.98-7.4ZM145.92 3.22 107.2 8.66a6 6 0 0 0-5.1 6.78l5.56 39.6a6 6 0 0 0 6.78 5.11l34.47-4.84a6 6 0 0 0 5.16-6.14l-1.32-40.2a6 6 0 0 0-6.83-5.75ZM83.5 37.12l22-3.5"/></g>`
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+micah@9.4.2_@dicebear+core@9.4.3/node_modules/@dicebear/micah/lib/components/facialHair.js
		/**
		* Do not change this file manually! This file was generated with the "Dicebear Exporter"-Plugin for Figma.
		*
		* Plugin: https://www.figma.com/community/plugin/1005765655729342787
		* File: https://www.figma.com/file/YHb4ShTgmO8Lqhkz1plLfL
		*/
		const facialHair = {
			beard: (components, colors) => `<path d="M146.13 49.15A73.74 73.74 0 0 1 27.69 123.4C10.5 107.5 6.5 56 2.7 31.65c14 31.5 49.62 33.94 83.5 28 28.5-5 51.3-6 51.3-45 1.88 2.62 6.97 27.59 8.63 34.5Z" fill="${xml$1(`${colors.facialHair}`)}"/>`,
			scruff: (components, colors) => `<g fill="${xml$1(`${colors.facialHair}`)}"><path d="M31 109a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM83 116a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM79 123a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM99 121a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM100 111a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM120 116a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM130 102a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM21 88a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM54 104a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM51 124a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM69 128a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM103 102a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM117 106a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM109 123a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM123 92a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM30 94a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM54 94a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM54 76a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM58 130a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM85 130a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM96 130a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM113 94a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM113 76a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM133 89a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM33 81a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM43 116a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM39 123a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM79 103a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM91 105a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM77 135a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM100 84a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM100 66a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM124 81a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM131 71a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM42 90a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM42 101a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM63 86a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM63 68a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM75 82a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM87 76a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM100 76a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/><path d="M113 76a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM139 76a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM61 116a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM72 110a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM68 102a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM92 93a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM43 75a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM80 91a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM80 73a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM115 87a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM115 69a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM122 71a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM137 62a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/><path d="M31 109a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM83 116a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM79 123a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM99 121a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM100 111a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM120 116a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM130 102a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM21 88a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM54 104a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM51 124a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM69 128a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM103 102a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM117 106a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM109 123a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM123 92a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM30 94a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM54 94a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM54 76a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM58 130a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM85 130a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM96 130a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM113 94a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM113 76a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM133 89a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM33 81a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM43 116a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM39 123a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM79 103a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM91 105a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM77 135a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM100 84a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM100 66a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM124 81a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM131 71a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM42 90a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM42 101a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM63 86a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM63 68a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM75 82a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM87 76a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM100 76a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" stroke="#000"/><path d="M113 76a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM139 76a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM61 116a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM72 110a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM68 102a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM92 93a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM43 75a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM80 91a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM80 73a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM115 87a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM115 69a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM122 71a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM137 62a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" stroke="#000"/></g>`
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+micah@9.4.2_@dicebear+core@9.4.3/node_modules/@dicebear/micah/lib/components/index.js
		var components_exports = /* @__PURE__ */ __exportAll({
			base: () => base,
			earrings: () => earrings,
			ears: () => ears,
			eyebrows: () => eyebrows,
			eyes: () => eyes,
			facialHair: () => facialHair,
			glasses: () => glasses,
			hair: () => hair,
			mouth: () => mouth,
			nose: () => nose,
			shirt: () => shirt
		});
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+micah@9.4.2_@dicebear+core@9.4.3/node_modules/@dicebear/micah/lib/utils/pickComponent.js
		/**
		* Do not change this file manually! This file was generated with the "Dicebear Exporter"-Plugin for Figma.
		*
		* Plugin: https://www.figma.com/community/plugin/1005765655729342787
		* File: https://www.figma.com/file/YHb4ShTgmO8Lqhkz1plLfL
		*/
		function pickComponent({ prng, group, values = [] }) {
			const componentCollection = components_exports;
			const key = prng.pick(values);
			if (key && componentCollection[group][key]) return {
				name: key,
				value: componentCollection[group][key]
			};
			else return;
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+micah@9.4.2_@dicebear+core@9.4.3/node_modules/@dicebear/micah/lib/utils/getComponents.js
		/**
		* Do not change this file manually! This file was generated with the "Dicebear Exporter"-Plugin for Figma.
		*
		* Plugin: https://www.figma.com/community/plugin/1005765655729342787
		* File: https://www.figma.com/file/YHb4ShTgmO8Lqhkz1plLfL
		*/
		function getComponents({ prng, options }) {
			const baseComponent = pickComponent({
				prng,
				group: "base",
				values: options.base
			});
			const mouthComponent = pickComponent({
				prng,
				group: "mouth",
				values: options.mouth
			});
			const eyebrowsComponent = pickComponent({
				prng,
				group: "eyebrows",
				values: options.eyebrows
			});
			const hairComponent = pickComponent({
				prng,
				group: "hair",
				values: options.hair
			});
			const eyesComponent = pickComponent({
				prng,
				group: "eyes",
				values: options.eyes
			});
			const noseComponent = pickComponent({
				prng,
				group: "nose",
				values: options.nose
			});
			const earsComponent = pickComponent({
				prng,
				group: "ears",
				values: options.ears
			});
			const shirtComponent = pickComponent({
				prng,
				group: "shirt",
				values: options.shirt
			});
			const earringsComponent = pickComponent({
				prng,
				group: "earrings",
				values: options.earrings
			});
			const glassesComponent = pickComponent({
				prng,
				group: "glasses",
				values: options.glasses
			});
			const facialHairComponent = pickComponent({
				prng,
				group: "facialHair",
				values: options.facialHair
			});
			return {
				base: baseComponent,
				mouth: mouthComponent,
				eyebrows: eyebrowsComponent,
				hair: prng.bool(options.hairProbability) ? hairComponent : void 0,
				eyes: eyesComponent,
				nose: noseComponent,
				ears: earsComponent,
				shirt: shirtComponent,
				earrings: prng.bool(options.earringsProbability) ? earringsComponent : void 0,
				glasses: prng.bool(options.glassesProbability) ? glassesComponent : void 0,
				facialHair: prng.bool(options.facialHairProbability) ? facialHairComponent : void 0
			};
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+micah@9.4.2_@dicebear+core@9.4.3/node_modules/@dicebear/micah/lib/utils/convertColor.js
		/**
		* Do not change this file manually! This file was generated with the "Dicebear Exporter"-Plugin for Figma.
		*
		* Plugin: https://www.figma.com/community/plugin/1005765655729342787
		* File: https://www.figma.com/file/YHb4ShTgmO8Lqhkz1plLfL
		*/
		function convertColor(color) {
			return "transparent" === color ? color : `#${color}`;
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+micah@9.4.2_@dicebear+core@9.4.3/node_modules/@dicebear/micah/lib/utils/getColors.js
		/**
		* Do not change this file manually! This file was generated with the "Dicebear Exporter"-Plugin for Figma.
		*
		* Plugin: https://www.figma.com/community/plugin/1005765655729342787
		* File: https://www.figma.com/file/YHb4ShTgmO8Lqhkz1plLfL
		*/
		function getColors({ prng, options }) {
			var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
			return {
				base: convertColor(prng.pick((_a = options.baseColor) !== null && _a !== void 0 ? _a : [], "transparent")),
				earring: convertColor(prng.pick((_b = options.earringColor) !== null && _b !== void 0 ? _b : [], "transparent")),
				eyeShadow: convertColor(prng.pick((_c = options.eyeShadowColor) !== null && _c !== void 0 ? _c : [], "transparent")),
				eyebrows: convertColor(prng.pick((_d = options.eyebrowsColor) !== null && _d !== void 0 ? _d : [], "transparent")),
				facialHair: convertColor(prng.pick((_e = options.facialHairColor) !== null && _e !== void 0 ? _e : [], "transparent")),
				glasses: convertColor(prng.pick((_f = options.glassesColor) !== null && _f !== void 0 ? _f : [], "transparent")),
				hair: convertColor(prng.pick((_g = options.hairColor) !== null && _g !== void 0 ? _g : [], "transparent")),
				mouth: convertColor(prng.pick((_h = options.mouthColor) !== null && _h !== void 0 ? _h : [], "transparent")),
				shirt: convertColor(prng.pick((_j = options.shirtColor) !== null && _j !== void 0 ? _j : [], "transparent")),
				eyes: convertColor(prng.pick((_k = options.eyesColor) !== null && _k !== void 0 ? _k : [], "transparent"))
			};
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+micah@9.4.2_@dicebear+core@9.4.3/node_modules/@dicebear/micah/lib/hooks/onPreCreate.js
		/**
		* Do not change this file manually! This file was generated with the "Dicebear Exporter"-Plugin for Figma.
		*
		* Plugin: https://www.figma.com/community/plugin/1005765655729342787
		* File: https://www.figma.com/file/YHb4ShTgmO8Lqhkz1plLfL
		*/
		function onPreCreate({ prng, options }) {
			var _a;
			options.baseColor = options.baseColor && options.baseColor.length > 0 ? [prng.pick(options.baseColor, "transparent")] : [];
			for (const colorName of [
				"eyebrows",
				"hair",
				"eyes",
				"nose",
				"ears",
				"shirt",
				"earrings",
				"glasses",
				"facialHair"
			]) {
				const colorOption = (_a = options[`${colorName}Color`]) !== null && _a !== void 0 ? _a : [];
				const index = colorOption.indexOf(options.baseColor[0]);
				if (colorOption.length > 1 && index > -1) colorOption.splice(index, 1);
			}
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+micah@9.4.2_@dicebear+core@9.4.3/node_modules/@dicebear/micah/lib/hooks/onPostCreate.js
		/**
		* Do not change this file manually! This file was generated with the "Dicebear Exporter"-Plugin for Figma.
		*
		* Plugin: https://www.figma.com/community/plugin/1005765655729342787
		* File: https://www.figma.com/file/YHb4ShTgmO8Lqhkz1plLfL
		*/
		function onPostCreate({ prng, options, components, colors }) {
			var _a;
			if (((_a = components.facialHair) === null || _a === void 0 ? void 0 : _a.name) === "beard" && colors.facialHair === colors.mouth) colors.mouth = "#ffffff33";
		}
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+micah@9.4.2_@dicebear+core@9.4.3/node_modules/@dicebear/micah/lib/schema.js
		/**
		* Do not change this file manually! This file was generated with the "Dicebear Exporter"-Plugin for Figma.
		*
		* Plugin: https://www.figma.com/community/plugin/1005765655729342787
		* File: https://www.figma.com/file/YHb4ShTgmO8Lqhkz1plLfL
		*/
		const schema = {
			$schema: "http://json-schema.org/draft-07/schema#",
			properties: {
				base: {
					type: "array",
					items: {
						type: "string",
						enum: ["standard"]
					},
					default: ["standard"]
				},
				baseColor: {
					type: "array",
					items: {
						type: "string",
						pattern: "^(transparent|[a-fA-F0-9]{6})$"
					},
					default: [
						"f9c9b6",
						"ac6651",
						"77311d"
					]
				},
				earringColor: {
					type: "array",
					items: {
						type: "string",
						pattern: "^(transparent|[a-fA-F0-9]{6})$"
					},
					default: [
						"f9c9b6",
						"d2eff3",
						"000000",
						"e0ddff",
						"f4d150",
						"ac6651",
						"9287ff",
						"ffeba4",
						"fc909f",
						"ffedef",
						"6bd9e9",
						"77311d",
						"ffffff"
					]
				},
				earrings: {
					type: "array",
					items: {
						type: "string",
						enum: ["hoop", "stud"]
					},
					default: ["hoop", "stud"]
				},
				earringsProbability: {
					type: "integer",
					minimum: 0,
					maximum: 100,
					default: 30
				},
				ears: {
					type: "array",
					items: {
						type: "string",
						enum: ["attached", "detached"]
					},
					default: ["attached", "detached"]
				},
				eyeShadowColor: {
					type: "array",
					items: {
						type: "string",
						pattern: "^(transparent|[a-fA-F0-9]{6})$"
					},
					default: [
						"d2eff3",
						"e0ddff",
						"ffeba4",
						"ffedef",
						"ffffff"
					]
				},
				eyebrows: {
					type: "array",
					items: {
						type: "string",
						enum: [
							"up",
							"down",
							"eyelashesUp",
							"eyelashesDown"
						]
					},
					default: [
						"up",
						"down",
						"eyelashesUp",
						"eyelashesDown"
					]
				},
				eyebrowsColor: {
					type: "array",
					items: {
						type: "string",
						pattern: "^(transparent|[a-fA-F0-9]{6})$"
					},
					default: ["000000"]
				},
				eyes: {
					type: "array",
					items: {
						type: "string",
						enum: [
							"eyes",
							"round",
							"eyesShadow",
							"smiling",
							"smilingShadow"
						]
					},
					default: [
						"eyes",
						"round",
						"eyesShadow",
						"smiling",
						"smilingShadow"
					]
				},
				eyesColor: {
					type: "array",
					items: {
						type: "string",
						pattern: "^(transparent|[a-fA-F0-9]{6})$"
					},
					default: ["000000"]
				},
				facialHair: {
					type: "array",
					items: {
						type: "string",
						enum: ["beard", "scruff"]
					},
					default: ["beard", "scruff"]
				},
				facialHairColor: {
					type: "array",
					items: {
						type: "string",
						pattern: "^(transparent|[a-fA-F0-9]{6})$"
					},
					default: ["000000"]
				},
				facialHairProbability: {
					type: "integer",
					minimum: 0,
					maximum: 100,
					default: 10
				},
				glasses: {
					type: "array",
					items: {
						type: "string",
						enum: ["round", "square"]
					},
					default: ["round", "square"]
				},
				glassesColor: {
					type: "array",
					items: {
						type: "string",
						pattern: "^(transparent|[a-fA-F0-9]{6})$"
					},
					default: [
						"f9c9b6",
						"d2eff3",
						"000000",
						"e0ddff",
						"f4d150",
						"ac6651",
						"9287ff",
						"ffeba4",
						"fc909f",
						"ffedef",
						"6bd9e9",
						"77311d",
						"ffffff"
					]
				},
				glassesProbability: {
					type: "integer",
					minimum: 0,
					maximum: 100,
					default: 30
				},
				hair: {
					type: "array",
					items: {
						type: "string",
						enum: [
							"fonze",
							"mrT",
							"dougFunny",
							"mrClean",
							"dannyPhantom",
							"full",
							"turban",
							"pixie"
						]
					},
					default: [
						"fonze",
						"mrT",
						"dougFunny",
						"mrClean",
						"dannyPhantom",
						"full",
						"turban",
						"pixie"
					]
				},
				hairColor: {
					type: "array",
					items: {
						type: "string",
						pattern: "^(transparent|[a-fA-F0-9]{6})$"
					},
					default: [
						"f9c9b6",
						"d2eff3",
						"000000",
						"e0ddff",
						"f4d150",
						"ac6651",
						"9287ff",
						"ffeba4",
						"fc909f",
						"ffedef",
						"6bd9e9",
						"77311d",
						"ffffff"
					]
				},
				hairProbability: {
					type: "integer",
					minimum: 0,
					maximum: 100,
					default: 100
				},
				mouth: {
					type: "array",
					items: {
						type: "string",
						enum: [
							"surprised",
							"laughing",
							"nervous",
							"smile",
							"sad",
							"pucker",
							"frown",
							"smirk"
						]
					},
					default: [
						"surprised",
						"laughing",
						"nervous",
						"smile",
						"sad",
						"pucker",
						"frown",
						"smirk"
					]
				},
				mouthColor: {
					type: "array",
					items: {
						type: "string",
						pattern: "^(transparent|[a-fA-F0-9]{6})$"
					},
					default: ["000000"]
				},
				nose: {
					type: "array",
					items: {
						type: "string",
						enum: [
							"curve",
							"pointed",
							"tound"
						]
					},
					default: [
						"curve",
						"pointed",
						"tound"
					]
				},
				shirt: {
					type: "array",
					items: {
						type: "string",
						enum: [
							"open",
							"crew",
							"collared"
						]
					},
					default: [
						"open",
						"crew",
						"collared"
					]
				},
				shirtColor: {
					type: "array",
					items: {
						type: "string",
						pattern: "^(transparent|[a-fA-F0-9]{6})$"
					},
					default: [
						"f9c9b6",
						"d2eff3",
						"000000",
						"e0ddff",
						"f4d150",
						"ac6651",
						"9287ff",
						"ffeba4",
						"fc909f",
						"ffedef",
						"6bd9e9",
						"77311d",
						"ffffff"
					]
				}
			}
		};
		//#endregion
		//#region ../../../node_modules/.pnpm/@dicebear+micah@9.4.2_@dicebear+core@9.4.3/node_modules/@dicebear/micah/lib/index.js
		/**
		* Do not change this file manually! This file was generated with the "Dicebear Exporter"-Plugin for Figma.
		*
		* Plugin: https://www.figma.com/community/plugin/1005765655729342787
		* File: https://www.figma.com/file/YHb4ShTgmO8Lqhkz1plLfL
		*/
		var lib_exports = /* @__PURE__ */ __exportAll({
			create: () => create,
			meta: () => meta,
			schema: () => schema
		});
		const meta = {
			title: "Avatar Illustration System",
			creator: "Micah Lanier",
			source: "https://www.figma.com/community/file/829741575478342595",
			homepage: "https://dribbble.com/micahlanier",
			license: {
				name: "CC BY 4.0",
				url: "https://creativecommons.org/licenses/by/4.0/"
			}
		};
		const create = ({ prng, options }) => {
			var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
			onPreCreate({
				prng,
				options
			});
			const components = getComponents({
				prng,
				options
			});
			const colors = getColors({
				prng,
				options
			});
			onPostCreate({
				prng,
				options,
				components,
				colors
			});
			return {
				attributes: {
					viewBox: "0 0 360 360",
					fill: "none",
					"shape-rendering": "auto"
				},
				body: `<g transform="translate(80 23)">${(_b = (_a = components.base) === null || _a === void 0 ? void 0 : _a.value(components, colors)) !== null && _b !== void 0 ? _b : ""}</g><g transform="translate(170 183)">${(_d = (_c = components.mouth) === null || _c === void 0 ? void 0 : _c.value(components, colors)) !== null && _d !== void 0 ? _d : ""}</g><g transform="translate(110 102)">${(_f = (_e = components.eyebrows) === null || _e === void 0 ? void 0 : _e.value(components, colors)) !== null && _f !== void 0 ? _f : ""}</g><g transform="translate(49 11)">${(_h = (_g = components.hair) === null || _g === void 0 ? void 0 : _g.value(components, colors)) !== null && _h !== void 0 ? _h : ""}</g><g transform="translate(142 119)">${(_k = (_j = components.eyes) === null || _j === void 0 ? void 0 : _j.value(components, colors)) !== null && _k !== void 0 ? _k : ""}</g><g transform="rotate(-8 1149.44 -1186.92)">${(_m = (_l = components.nose) === null || _l === void 0 ? void 0 : _l.value(components, colors)) !== null && _m !== void 0 ? _m : ""}</g><g transform="translate(84 154)">${(_p = (_o = components.ears) === null || _o === void 0 ? void 0 : _o.value(components, colors)) !== null && _p !== void 0 ? _p : ""}</g><g transform="translate(53 272)">${(_r = (_q = components.shirt) === null || _q === void 0 ? void 0 : _q.value(components, colors)) !== null && _r !== void 0 ? _r : ""}</g>`,
				extra: () => ({
					...Object.entries(components).reduce((acc, [key, value]) => {
						acc[key] = value === null || value === void 0 ? void 0 : value.name;
						return acc;
					}, {}),
					...Object.entries(colors).reduce((acc, [key, value]) => {
						acc[`${key}Color`] = value;
						return acc;
					}, {})
				})
			};
		};
		//#endregion
		//#region lib/types/client/ui/avatar.js
		/**
		* Skill portraits.
		*
		* These were hand-drawn SVG primitives — circles for heads, triangles for ears
		* — and at 30px in a directory of several hundred Skills they read as the same
		* picture in different colours. Identity is this product's premise, so the
		* artwork now comes from a real illustration set: DiceBear's `micah` style,
		* generated locally from a seed.
		*
		* Two decisions worth keeping:
		*
		* - **`<img>` with a data URI, not inline SVG.** Every DiceBear document
		*   declares `id="viewboxMask"`. Inlining several on one page makes those ids
		*   collide and all but the first render blank — which is exactly what happens
		*   in a 334-row contact list. An `<img>` is its own document, so the ids
		*   cannot clash.
		* - **A deterministic background tint.** Portraits differ by hair, skin and
		*   accessory, which is plenty at 64px and marginal at 30px. The tint carries
		*   the differentiation in a list; the portrait carries the personality.
		*
		* Artwork: Avatar Illustration System by Micah Lanier, CC BY 4.0. The
		* attribution is recorded in the repository README.
		*/
		/** Background tints, one per identity, in the plugin's own palette. */
		const AVATAR_BACKGROUNDS = [
			"fff1e8",
			"e9f8ef",
			"eef1ff",
			"fff5d9",
			"e7f5fb",
			"faeaf3",
			"ecfbf7",
			"fdeee6",
			"f2edfd",
			"e8f4e6",
			"fdecec",
			"e9eff5",
			"fff8e1",
			"efe9e3",
			"e6f7ff",
			"f7ecff"
		];
		/**
		* The same sixteen hues at dark-theme weight.
		*
		* The tint is painted inside the SVG, so a light one cannot be toned down from
		* a stylesheet. Four portraits packed into a 40px group tile therefore merged
		* into one bright block on a dark sidebar. Same hue order as the light list, so
		* an identity keeps its colour across themes.
		*/
		const AVATAR_BACKGROUNDS_DARK = [
			"3b2b21",
			"1f3a2c",
			"262b47",
			"3d3722",
			"1e333f",
			"3a2530",
			"1d3a35",
			"3d2a20",
			"2d2547",
			"24331f",
			"3d2626",
			"242b33",
			"3d3a20",
			"332e28",
			"1f3340",
			"33254a"
		];
		/** Whether the Host currently has its dark theme on. */
		function darkTheme() {
			return document.body.dataset.dsDarkTheme !== void 0;
		}
		/**
		* Every pickable identity. An identity is just a seed: the generator maps it to
		* a portrait, so the library is a list of seeds rather than a list of drawings.
		*/
		const AVATAR_LIBRARY = Array.from({ length: 192 }, (_, index) => `p${index + 1}`);
		/** FNV-style string hash; stable across runs and platforms. */
		function seedOf(value) {
			let hash = 2166136261;
			for (const char of value) {
				hash ^= char.codePointAt(0) ?? 0;
				hash = Math.imul(hash, 16777619) >>> 0;
			}
			return hash;
		}
		/**
		* Generated portraits are pure functions of their inputs and a list re-renders
		* on every keystroke of the search box, so each one is built once and kept.
		*/
		const cache = /* @__PURE__ */ new Map();
		const CACHE_LIMIT = 1024;
		/**
		* Render one identity to a data URI.
		* @param avatarId - the stored identity, used as the generator's seed.
		* @param size - pixel size the SVG declares.
		* @returns a `data:image/svg+xml` URI.
		*/
		function avatarDataUri(avatarId, size, dark = darkTheme()) {
			const key = `${avatarId}@${size}@${dark ? "dark" : "light"}`;
			const hit = cache.get(key);
			if (hit !== void 0) return hit;
			const palette = dark ? AVATAR_BACKGROUNDS_DARK : AVATAR_BACKGROUNDS;
			const uri = createAvatar(lib_exports, {
				seed: avatarId,
				size,
				backgroundColor: [palette[seedOf(avatarId) % palette.length] ?? (dark ? "262b47" : "eef1ff")],
				radius: 50
			}).toDataUri();
			if (cache.size >= CACHE_LIMIT) cache.clear();
			cache.set(key, uri);
			return uri;
		}
		/**
		* Track the Host's theme.
		*
		* The Host marks it with an attribute on `body` rather than the colour-scheme
		* media query — a person can pick dark on a light desktop — so the switch has
		* to be observed rather than queried once.
		* @returns whether the dark theme is on.
		*/
		function useDarkTheme() {
			const [dark, setDark] = (0, react.useState)(darkTheme);
			(0, react.useEffect)(() => {
				const observer = new MutationObserver(() => {
					setDark(darkTheme());
				});
				observer.observe(document.body, {
					attributes: true,
					attributeFilter: ["data-ds-dark-theme"]
				});
				setDark(darkTheme());
				return () => {
					observer.disconnect();
				};
			}, []);
			return dark;
		}
		/**
		* Draw one portrait.
		* @param props - identity and presentation.
		* @returns the avatar image.
		*/
		function CartoonAvatar({ avatarId, size = 40, title, className }) {
			const dark = useDarkTheme();
			const uri = avatarDataUri(avatarId, size * 2, dark);
			return (0, react_jsx_runtime.jsx)("span", {
				className,
				title,
				style: { "--avatar-size": `${size}px` },
				"data-avatar": true,
				children: (0, react_jsx_runtime.jsx)("img", {
					src: uri,
					alt: "",
					width: size,
					height: size,
					draggable: false
				})
			});
		}
		//#endregion
		//#region lib/types/client/model.js
		const EMPTY_SKILL_CHAT_STATE = {
			version: 2,
			rooms: [],
			roomSessions: [],
			personas: {},
			automations: []
		};
		const ANIMAL_AVATARS = AVATAR_LIBRARY;
		/**
		* The given-name pool. Sized against a real Skill directory rather than a demo
		* one: with three Skill roots scanned a machine easily reaches several hundred
		* contacts, and a 24-name pool meant almost every persona carried a
		* disambiguating suffix instead of a name.
		*/
		const FRIENDLY_NAMES = [
			"栗子",
			"团团",
			"阿鹿",
			"小满",
			"布丁",
			"云朵",
			"米粒",
			"松松",
			"桃桃",
			"可可",
			"星野",
			"麦麦",
			"小禾",
			"圆圆",
			"朵朵",
			"木木",
			"豆豆",
			"暖暖",
			"果果",
			"泡泡",
			"小岛",
			"悠悠",
			"橙子",
			"月牙",
			"汤圆",
			"芝麻",
			"花卷",
			"麻薯",
			"元宝",
			"青提",
			"柚子",
			"荔枝",
			"杏仁",
			"山楂",
			"莲子",
			"菱角",
			"笋尖",
			"菌菇",
			"糖糖",
			"蜜蜜",
			"酥酥",
			"脆脆",
			"软软",
			"糯糯",
			"绵绵",
			"云吞",
			"米糕",
			"豆花",
			"银杏",
			"白露",
			"小雪",
			"谷雨",
			"惊蛰",
			"立夏",
			"秋分",
			"冬至",
			"海棠",
			"芦苇",
			"竹影",
			"松针",
			"苔苔",
			"藤藤",
			"荷叶",
			"川川",
			"岭岭",
			"湖心",
			"江南",
			"星尘",
			"月半",
			"拂晓",
			"晚晚",
			"早早",
			"咕咕",
			"呱呱",
			"啾啾",
			"喵喵",
			"汪汪",
			"哞哞",
			"叽叽",
			"嘟嘟",
			"沙沙",
			"露露",
			"霜霜",
			"雾雾",
			"叮叮",
			"咚咚",
			"铃铃",
			"当当",
			"噜噜",
			"呼呼",
			"嗡嗡",
			"滴滴",
			"答答",
			"咔咔",
			"唰唰",
			"哒哒"
		];
		function stableHash(value) {
			let hash = 2166136261;
			for (const char of value) {
				hash ^= char.codePointAt(0) ?? 0;
				hash = Math.imul(hash, 16777619);
			}
			return hash >>> 0;
		}
		function capabilityList(contact) {
			const values = `${contact.description} ${contact.whenToUse ?? ""}`.split(/[。；;,.，\n]/u).map((value) => value.trim()).filter((value) => value.length >= 2).slice(0, 4);
			return values.length === 0 ? [contact.description] : values;
		}
		function defaultPersona(contact, now = Date.now()) {
			const hash = stableHash(contact.id);
			return {
				skillId: contact.id,
				displayName: FRIENDLY_NAMES[hash % FRIENDLY_NAMES.length] ?? "小满",
				avatarId: contact.id,
				originalName: contact.name,
				roleLabel: contact.source === "harness" ? "项目内 AI 同事" : contact.source === "workbuddy" ? `${contact.sourceShort ?? "WorkBuddy"} 专家` : "社区 Skill 专家",
				bio: contact.description,
				capabilities: capabilityList(contact),
				source: contact.sourceLabel,
				...contact.homepage === void 0 ? {} : { homepage: contact.homepage },
				...contact.repository === void 0 ? {} : { repository: contact.repository },
				customizedName: false,
				customizedAvatar: false,
				updatedAt: now
			};
		}
		function ensurePersonas(contacts, personas, now = Date.now()) {
			let changed = false;
			const next = { ...personas };
			const usedNames = new Set(Object.values(personas).filter((persona) => persona.customizedName).map((persona) => persona.displayName));
			for (const contact of contacts.toSorted((left, right) => left.id.localeCompare(right.id))) {
				const current = next[contact.id];
				const generated = defaultPersona(contact, now);
				let generatedName = generated.displayName;
				for (let ordinal = 2; usedNames.has(generatedName); ordinal += 1) generatedName = `${generated.displayName}${ordinal}`;
				usedNames.add(current?.customizedName === true ? current.displayName : generatedName);
				if (current === void 0) {
					next[contact.id] = {
						...generated,
						displayName: generatedName
					};
					changed = true;
					continue;
				}
				const staleAvatar = current.customizedAvatar !== true && current.avatarId !== contact.id;
				const refreshed = {
					...current,
					...staleAvatar ? { avatarId: generated.avatarId } : {},
					...current.customizedName ? {} : { displayName: generatedName },
					originalName: contact.name,
					bio: contact.description,
					capabilities: capabilityList(contact),
					roleLabel: generated.roleLabel,
					source: contact.sourceLabel,
					...contact.homepage === void 0 ? {} : { homepage: contact.homepage },
					...contact.repository === void 0 ? {} : { repository: contact.repository }
				};
				if (JSON.stringify(refreshed) !== JSON.stringify(current)) {
					next[contact.id] = refreshed;
					changed = true;
				}
			}
			return changed ? next : personas;
		}
		function roomForSession(rooms, roomSessions, sessionId) {
			if (sessionId === void 0) return void 0;
			const roomSession = roomSessions.find((item) => item.harnessSessionId === sessionId && item.archivedAt === void 0);
			return roomSession === void 0 ? void 0 : rooms.find((room) => room.roomId === roomSession.roomId);
		}
		function activeHarnessSession(room, roomSessions) {
			return (room.activeSessionId === void 0 ? void 0 : roomSessions.find((item) => item.roomSessionId === room.activeSessionId && item.archivedAt === void 0))?.harnessSessionId;
		}
		/**
		* Order the room list.
		*
		* Pinned rooms form their own band above the rest. Inside a band a room that
		* has been dragged holds its position, and everything else falls back to
		* recency — so arranging two rooms by hand does not freeze the other thirty
		* into whatever order they happened to have that day.
		* @param rooms - the rooms to order.
		* @returns a new array, most relevant first.
		*/
		function orderRooms(rooms) {
			return [...rooms].sort((left, right) => {
				const pinned = Number(right.pinnedAt !== void 0) - Number(left.pinnedAt !== void 0);
				if (pinned !== 0) return pinned;
				const placed = Number(right.order !== void 0) - Number(left.order !== void 0);
				if (placed !== 0) return placed;
				if (left.order !== void 0 && right.order !== void 0) return left.order - right.order;
				return right.updatedAt - left.updatedAt;
			});
		}
		function migrateLegacyState(groups, bindings, sessionWorkspace, sessionUpdatedAt, now = Date.now()) {
			const rooms = /* @__PURE__ */ new Map();
			const roomSessions = [];
			for (const [rawSessionId, binding] of Object.entries(bindings)) {
				const workspaceId = sessionWorkspace[rawSessionId];
				if (workspaceId === void 0) continue;
				const roomId = binding.kind === "group" && binding.groupId !== void 0 ? `room:group:${binding.groupId}` : `room:direct:${workspaceId}:${binding.members[0]?.id ?? rawSessionId}`;
				const group = binding.groupId === void 0 ? void 0 : groups.find((item) => item.id === binding.groupId);
				const members = group?.members ?? binding.members;
				const coordinatorId = group?.leaderId ?? members[0]?.id ?? "unknown";
				const updatedAt = sessionUpdatedAt[rawSessionId] ?? now;
				const roomSessionId = `room-session:${rawSessionId}`;
				roomSessions.push({
					roomSessionId,
					roomId,
					harnessSessionId: rawSessionId,
					title: binding.name,
					memberSnapshot: members.map((member) => ({
						skillId: member.id,
						displayName: member.name,
						avatarId: binding.avatar,
						originalName: member.name
					})),
					createdAt: updatedAt,
					updatedAt
				});
				const existing = rooms.get(roomId);
				const activeSessionId = existing === void 0 || updatedAt >= existing.updatedAt ? roomSessionId : existing.activeSessionId;
				rooms.set(roomId, {
					roomId,
					type: binding.kind === "group" ? "group" : "direct",
					workspaceId,
					workspaceIds: [workspaceId],
					...binding.kind === "group" ? { avatarId: ANIMAL_AVATARS[stableHash(roomId) % ANIMAL_AVATARS.length] } : {},
					title: group?.name ?? binding.name,
					memberIds: members.map((member) => member.id),
					coordinatorId,
					sessionIds: [...existing?.sessionIds ?? [], roomSessionId],
					...activeSessionId === void 0 ? {} : { activeSessionId },
					createdAt: Math.min(existing?.createdAt ?? updatedAt, updatedAt),
					updatedAt: Math.max(existing?.updatedAt ?? updatedAt, updatedAt)
				});
			}
			return {
				rooms: [...rooms.values()],
				roomSessions,
				migratedAt: now
			};
		}
		//#endregion
		//#region \0dsh-css:/Users/lileilei/workspace/deepseek-harness/packages/experimental/client-ui-skill-chat/src/client/ui/ui.module.css.mjs
		const css$3 = ".rdDfcG_surface{box-sizing:border-box;border:var(--ds-chat-hairline) solid var(--ds-chat-border);border-radius:var(--ds-chat-radius-lg);background:var(--ds-chat-surface);box-shadow:var(--ds-chat-shadow-1)}.rdDfcG_surface[data-level=raised]{background:var(--ds-chat-surface-raised);box-shadow:var(--ds-chat-shadow-2)}.rdDfcG_surface[data-level=sunken]{background:var(--ds-chat-fill-quaternary);box-shadow:none;border-color:#0000}.rdDfcG_button,.rdDfcG_iconButton{box-sizing:border-box;border:var(--ds-chat-hairline) solid var(--ds-chat-border);color:var(--ds-chat-text-color);background:var(--ds-chat-surface);cursor:pointer;font-family:var(--ds-chat-font);font-weight:var(--ds-chat-weight-medium);letter-spacing:var(--ds-chat-tracking-body);transition:background var(--ds-chat-duration-fast) var(--ds-chat-ease), border-color var(--ds-chat-duration-fast) var(--ds-chat-ease), opacity var(--ds-chat-duration-fast) var(--ds-chat-ease);justify-content:center;align-items:center;display:inline-flex}.rdDfcG_button{gap:var(--ds-chat-space-2);min-height:32px;padding:0 var(--ds-chat-space-3);border-radius:var(--ds-chat-radius-control);font-size:var(--ds-chat-text-body)}.rdDfcG_button[data-size=small]{min-height:26px;padding:0 var(--ds-chat-space-2);border-radius:var(--ds-chat-radius-sm);font-size:var(--ds-chat-text-footnote)}.rdDfcG_button[data-size=large]{min-height:40px;padding:0 var(--ds-chat-space-4);border-radius:var(--ds-chat-radius-md);font-size:var(--ds-chat-text-callout)}.rdDfcG_iconButton{border-radius:var(--ds-chat-radius-sm);background:0 0;border-color:#0000;width:30px;height:30px;padding:0}.rdDfcG_iconButton[data-size=small]{border-radius:var(--ds-chat-radius-xs);width:26px;height:26px}.rdDfcG_button:hover:not(:disabled),.rdDfcG_iconButton:hover:not(:disabled){background:var(--ds-chat-hover)}.rdDfcG_button:active:not(:disabled),.rdDfcG_iconButton:active:not(:disabled){opacity:.72}.rdDfcG_button:focus-visible,.rdDfcG_iconButton:focus-visible,.rdDfcG_searchInput:focus-visible{outline:2px solid var(--ds-chat-focus);outline-offset:1px}.rdDfcG_button:disabled,.rdDfcG_iconButton:disabled{opacity:.4;cursor:default}.rdDfcG_button[data-variant=primary]{color:var(--ds-chat-on-accent);background:var(--ds-chat-accent-solid);font-weight:var(--ds-chat-weight-semibold);border-color:#0000}.rdDfcG_button[data-variant=primary]:hover:not(:disabled){background:var(--ds-chat-accent-hover)}.rdDfcG_button[data-variant=ghost],.rdDfcG_iconButton[data-variant=ghost]{background:0 0;border-color:#0000}.rdDfcG_button[data-variant=danger]{color:var(--ds-chat-danger);background:var(--ds-chat-danger-soft);border-color:#0000}.rdDfcG_avatar{--avatar-bg:#fff1e8;--avatar-main:#f07f62;--avatar-ink:#7b3e31;width:var(--avatar-size,40px);min-width:var(--avatar-size,40px);max-width:var(--avatar-size,40px);height:var(--avatar-size,40px);min-height:var(--avatar-size,40px);max-height:var(--avatar-size,40px);aspect-ratio:1;box-sizing:border-box;border-radius:var(--ds-chat-radius-round);clip-path:circle(50%);background:var(--avatar-bg);box-shadow:inset 0 0 0 var(--ds-chat-hairline) #00000014;flex:none;place-items:center;display:inline-grid;position:relative;overflow:hidden}.rdDfcG_avatar svg{width:92%;height:92%;fill:var(--avatar-main);overflow:visible}.rdDfcG_avatarFace{fill:var(--avatar-main)}.rdDfcG_avatarPatch{fill:var(--avatar-ink);opacity:.68}.rdDfcG_avatarEye,.rdDfcG_avatarNose{fill:var(--avatar-ink)}.rdDfcG_avatarMuzzle{fill:none;stroke:var(--avatar-ink);stroke-width:1.7px;stroke-linecap:round}.rdDfcG_avatarStack{align-items:center;min-width:0;display:inline-flex}.rdDfcG_avatarStack>*{margin-left:calc(var(--avatar-stack-overlap,8px) * -1)}.rdDfcG_avatarStack>:first-child{margin-left:0}.rdDfcG_backdrop{z-index:50;padding:var(--ds-chat-space-4);background:var(--ds-chat-scrim);backdrop-filter:blur(20px)saturate(140%);place-items:center;display:grid;position:fixed;inset:0}.rdDfcG_surface.rdDfcG_dialog,.rdDfcG_surface.rdDfcG_drawer{background-color:canvas;background-image:linear-gradient(var(--ds-chat-surface), var(--ds-chat-surface));backdrop-filter:none;opacity:1;isolation:isolate}.rdDfcG_dialog{border-radius:var(--ds-chat-radius-xl);overscroll-behavior:contain;width:min(540px,100vw - 32px);max-height:min(760px,100vh - 32px);box-shadow:var(--ds-chat-shadow-3);overflow:auto}.rdDfcG_drawer{z-index:52;border:0;border-left:var(--ds-chat-hairline) solid var(--ds-chat-border);overscroll-behavior:contain;width:min(600px,100vw - 32px);box-shadow:var(--ds-chat-shadow-3);border-radius:0;position:fixed;top:0;bottom:0;right:0;overflow:hidden}.rdDfcG_searchInput{box-sizing:border-box;border:var(--ds-chat-hairline) solid transparent;border-radius:var(--ds-chat-radius-control);width:100%;padding:7px var(--ds-chat-space-3);color:var(--ds-chat-text-color);background:var(--ds-chat-fill-quaternary);font-family:var(--ds-chat-font);font-size:var(--ds-chat-text-body);line-height:var(--ds-chat-leading-normal);letter-spacing:var(--ds-chat-tracking-body);transition:background var(--ds-chat-duration-fast) var(--ds-chat-ease);outline:0}.rdDfcG_searchInput::placeholder{color:var(--ds-chat-muted)}.rdDfcG_searchInput:hover{background:var(--ds-chat-fill-tertiary)}.rdDfcG_emptyState{place-items:center;gap:var(--ds-chat-space-2);padding:var(--ds-chat-space-6) var(--ds-chat-space-4);color:var(--ds-chat-muted);text-align:center;display:grid}.rdDfcG_emptyState strong{color:var(--ds-chat-text-color);font-size:var(--ds-chat-text-body);font-weight:var(--ds-chat-weight-semibold);letter-spacing:var(--ds-chat-tracking-body)}.rdDfcG_emptyState p{max-width:260px;font-size:var(--ds-chat-text-footnote);line-height:var(--ds-chat-leading-relaxed);margin:0}.rdDfcG_chatBubble{max-width:86%;padding:8px var(--ds-chat-space-3);font-size:var(--ds-chat-text-body);line-height:var(--ds-chat-leading-normal);letter-spacing:var(--ds-chat-tracking-body);white-space:pre-wrap;border-radius:18px}.rdDfcG_chatBubble[data-role=assistant]{border-bottom-left-radius:var(--ds-chat-radius-xs);color:var(--ds-chat-text-color);background:var(--ds-chat-fill-quaternary);align-self:flex-start}.rdDfcG_chatBubble[data-role=user]{border-bottom-right-radius:var(--ds-chat-radius-xs);color:var(--ds-chat-on-accent);background:var(--ds-chat-user-bubble);align-self:flex-end}.rdDfcG_roomRow{align-items:center;gap:var(--ds-chat-space-3);width:100%;min-height:56px;padding:var(--ds-chat-space-2) var(--ds-chat-space-2);border-radius:var(--ds-chat-radius-control);color:inherit;text-align:left;cursor:pointer;font-family:var(--ds-chat-font);transition:background var(--ds-chat-duration-fast) var(--ds-chat-ease);background:0 0;border:0;grid-template-columns:auto minmax(0,1fr) auto;display:grid}.rdDfcG_roomRow:hover{background:var(--ds-chat-row-hover)}.rdDfcG_roomRow:active{background:var(--ds-chat-pressed)}.rdDfcG_roomRow[data-selected=true]{background:var(--ds-chat-row-selected)}.rdDfcG_workbenchPanel{background:var(--ds-chat-surface);flex-direction:column;height:100%;display:flex}@media (prefers-reduced-motion:reduce){.rdDfcG_button,.rdDfcG_iconButton,.rdDfcG_roomRow,.rdDfcG_searchInput{transition:none}}";
		const tagId$3 = "deepseek-harness-chat-ui/ui.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$3) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "deepseek-harness-chat-ui";
			tag.dataset.pluginCss = tagId$3;
			tag.textContent = css$3;
			document.head.appendChild(tag);
		}
		var ui_module_css_default = {
			"avatar": "rdDfcG_avatar",
			"avatarEye": "rdDfcG_avatarEye",
			"avatarFace": "rdDfcG_avatarFace",
			"avatarMuzzle": "rdDfcG_avatarMuzzle",
			"avatarNose": "rdDfcG_avatarNose",
			"avatarPatch": "rdDfcG_avatarPatch",
			"avatarStack": "rdDfcG_avatarStack",
			"backdrop": "rdDfcG_backdrop",
			"button": "rdDfcG_button",
			"chatBubble": "rdDfcG_chatBubble",
			"dialog": "rdDfcG_dialog",
			"drawer": "rdDfcG_drawer",
			"emptyState": "rdDfcG_emptyState",
			"iconButton": "rdDfcG_iconButton",
			"roomRow": "rdDfcG_roomRow",
			"searchInput": "rdDfcG_searchInput",
			"surface": "rdDfcG_surface",
			"workbenchPanel": "rdDfcG_workbenchPanel"
		};
		//#endregion
		//#region lib/types/client/ui/index.js
		function classes(...values) {
			return values.filter(Boolean).join(" ");
		}
		function Surface({ as: Tag = "div", level = "base", className, ...props }) {
			return (0, react_jsx_runtime.jsx)(Tag, {
				...props,
				className: classes(ui_module_css_default.surface, className),
				"data-level": level
			});
		}
		function Button({ variant = "default", size = "medium", className, type = "button", ...props }) {
			return (0, react_jsx_runtime.jsx)("button", {
				...props,
				type,
				className: classes(ui_module_css_default.button, className),
				"data-variant": variant,
				"data-size": size
			});
		}
		function IconButton({ variant = "default", size = "medium", className, type = "button", ...props }) {
			return (0, react_jsx_runtime.jsx)("button", {
				...props,
				type,
				className: classes(ui_module_css_default.iconButton, className),
				"data-variant": variant,
				"data-size": size
			});
		}
		function Avatar({ avatarId, label, seed, size = 40, className }) {
			return (0, react_jsx_runtime.jsx)(CartoonAvatar, {
				avatarId,
				...seed === void 0 ? {} : { seed },
				size,
				title: label,
				className: classes(ui_module_css_default.avatar, className)
			});
		}
		function AvatarStack({ children, className, overlap = 9 }) {
			const style = { "--avatar-stack-overlap": `${overlap}px` };
			return (0, react_jsx_runtime.jsx)("span", {
				className: classes(ui_module_css_default.avatarStack, className),
				style,
				children
			});
		}
		function Dialog({ children, className, label, onClose }) {
			return (0, react_jsx_runtime.jsx)("div", {
				className: ui_module_css_default.backdrop,
				onMouseDown: (event) => {
					if (event.target === event.currentTarget) onClose();
				},
				children: (0, react_jsx_runtime.jsx)(Surface, {
					as: "section",
					level: "raised",
					className: classes(ui_module_css_default.dialog, className),
					role: "dialog",
					"aria-modal": "true",
					"aria-label": label,
					children
				})
			});
		}
		function Drawer({ children, className, label, onClose }) {
			return (0, react_jsx_runtime.jsx)("div", {
				className: ui_module_css_default.backdrop,
				onMouseDown: (event) => {
					if (event.target === event.currentTarget) onClose();
				},
				children: (0, react_jsx_runtime.jsx)(Surface, {
					as: "aside",
					level: "raised",
					className: classes(ui_module_css_default.drawer, className),
					role: "dialog",
					"aria-modal": "true",
					"aria-label": label,
					children
				})
			});
		}
		function SearchInput(props) {
			return (0, react_jsx_runtime.jsx)("input", {
				...props,
				className: classes(ui_module_css_default.searchInput, props.className)
			});
		}
		function EmptyState({ title, children, className }) {
			return (0, react_jsx_runtime.jsxs)("div", {
				className: classes(ui_module_css_default.emptyState, className),
				children: [(0, react_jsx_runtime.jsx)("strong", { children: title }), children === void 0 ? null : (0, react_jsx_runtime.jsx)("p", { children })]
			});
		}
		function ChatBubble({ role, children, className }) {
			return (0, react_jsx_runtime.jsx)("div", {
				className: classes(ui_module_css_default.chatBubble, className),
				"data-role": role,
				children
			});
		}
		function RoomRow({ selected = false, className, ...props }) {
			return (0, react_jsx_runtime.jsx)("button", {
				...props,
				type: "button",
				className: classes(ui_module_css_default.roomRow, className),
				"data-selected": selected || void 0
			});
		}
		function WorkbenchPanel({ className, ...props }) {
			return (0, react_jsx_runtime.jsx)("div", {
				...props,
				className: classes(ui_module_css_default.workbenchPanel, className)
			});
		}
		//#endregion
		//#region \0dsh-global-css:/Users/lileilei/workspace/deepseek-harness/packages/experimental/client-ui-skill-chat/src/client/theme.css.mjs
		const css$2 = ":root{--ds-chat-font:-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"PingFang SC\", \"Helvetica Neue\", system-ui, sans-serif;--ds-chat-font-mono:ui-monospace, SFMono-Regular, \"SF Mono\", Menlo, monospace;--ds-chat-text-caption:11px;--ds-chat-text-footnote:12px;--ds-chat-text-body:13px;--ds-chat-text-callout:14px;--ds-chat-text-title3:15px;--ds-chat-text-title2:17px;--ds-chat-text-title1:20px;--ds-chat-weight-regular:400;--ds-chat-weight-medium:500;--ds-chat-weight-semibold:600;--ds-chat-weight-bold:700;--ds-chat-leading-tight:1.25;--ds-chat-leading-normal:1.45;--ds-chat-leading-relaxed:1.6;--ds-chat-tracking-title:-.022em;--ds-chat-tracking-body:-.008em;--ds-chat-tracking-caption:0;--ds-chat-space-1:4px;--ds-chat-space-2:8px;--ds-chat-space-3:12px;--ds-chat-space-4:16px;--ds-chat-space-5:20px;--ds-chat-space-6:24px;--ds-chat-space-8:32px;--ds-chat-radius-xs:6px;--ds-chat-radius-sm:8px;--ds-chat-radius-control:10px;--ds-chat-radius-md:12px;--ds-chat-radius-lg:16px;--ds-chat-radius-xl:20px;--ds-chat-radius-round:999px;color-scheme:light;--ds-chat-hairline:.5px;--ds-chat-border:#0000001a;--ds-chat-border-strong:#0000001f;--ds-chat-surface:Canvas;--ds-chat-surface-raised:Canvas;--ds-chat-surface-sunken:var(--ds-chat-fill-quaternary);--ds-chat-fill-primary:#78788033;--ds-chat-fill-secondary:#78788024;--ds-chat-fill-tertiary:#7676801a;--ds-chat-fill-quaternary:#7474800f;--ds-chat-hover:#2631480f;--ds-chat-pressed:var(--ds-chat-fill-tertiary);--ds-chat-text-color:CanvasText;--ds-chat-text-secondary:color-mix(in srgb, CanvasText 68%, transparent);--ds-chat-muted:color-mix(in srgb, CanvasText 46%, transparent);--ds-chat-accent-solid:#12a05f;--ds-chat-accent-hover:#0e8a50;--ds-chat-accent-text:var(--ds-chat-accent-solid);--ds-chat-on-accent:#fff;--ds-chat-accent-soft:color-mix(in srgb, var(--ds-chat-accent-solid) 10%, transparent);--ds-chat-accent-soft-strong:color-mix(in srgb, var(--ds-chat-accent-solid) 16%, transparent);--ds-chat-accent-border:color-mix(in srgb, var(--ds-chat-accent-solid) 28%, transparent);--ds-chat-focus:color-mix(in srgb, var(--ds-chat-accent-solid) 70%, transparent);--ds-chat-accent:var(--ds-chat-accent-solid);--ds-chat-accent-faint:var(--ds-chat-accent-soft);--ds-chat-avatar-gradient:var(--ds-chat-accent-soft-strong);--ds-chat-row-hover:var(--ds-chat-hover);--ds-chat-row-selected:var(--ds-chat-accent-soft-strong);--ds-chat-user-bubble:var(--ds-chat-accent-solid);--ds-chat-shadow:var(--ds-chat-shadow-2);--ds-chat-accent-bright:#32d583;--ds-chat-code-bg:#0d1218;--ds-chat-code-bg-raised:#151b22;--ds-chat-code-fg:#d9e2ea;--ds-chat-code-muted:#8995a3;--ds-chat-code-border:#ffffff1f;--ds-chat-danger:#d0342c;--ds-chat-danger-soft:color-mix(in srgb, var(--ds-chat-danger) 10%, transparent);--ds-chat-warning:#b25000;--ds-chat-warning-soft:color-mix(in srgb, var(--ds-chat-warning) 12%, transparent);--ds-chat-info:#3b6fd4;--ds-chat-info-soft:color-mix(in srgb, var(--ds-chat-info) 12%, transparent);--ds-chat-shadow-1:0 1px 2px #0000000d;--ds-chat-shadow-2:0 4px 14px #00000014;--ds-chat-shadow-3:0 16px 40px #00000024;--ds-chat-scrim:#00000038;--ds-chat-ease:cubic-bezier(.32, .72, 0, 1);--ds-chat-duration-fast:.12s;--ds-chat-duration:.2s}body{--ds-chat-surface:var(--dsw-alias-bg-base);--ds-chat-surface-raised:var(--dsw-alias-bg-layer-2);--ds-chat-border:var(--dsw-alias-border-l2);--ds-chat-border-strong:var(--dsw-alias-border-l3);--ds-chat-hover:var(--dsw-alias-interactive-bg-hover);--ds-chat-sidebar-ground:color-mix(in srgb, var(--dsw-alias-bg-base) 96%, #4a5568);--ds-chat-trace-ground:var(--ds-chat-accent-soft);--ds-chat-trace-ground-hover:var(--ds-chat-accent-soft-strong);--ds-chat-trace-edge:var(--ds-chat-accent-border);--ds-chat-text-color:var(--dsw-alias-label-primary);--ds-chat-text-secondary:var(--dsw-alias-label-secondary);--ds-chat-muted:var(--dsw-alias-label-tertiary)}body[data-ds-dark-theme]{color-scheme:dark;--ds-chat-sidebar-ground:color-mix(in srgb, var(--dsw-alias-bg-base) 88%, #000);--ds-chat-trace-ground:#ffffff0d;--ds-chat-trace-ground-hover:#ffffff17;--ds-chat-trace-edge:#ffffff29;--ds-chat-hover:#ffffff14;--ds-chat-fill-primary:#8e8e9352;--ds-chat-fill-secondary:#8e8e933d;--ds-chat-fill-tertiary:#8e8e932e;--ds-chat-fill-quaternary:#8e8e931f;--ds-chat-accent-solid:#32d583;--ds-chat-accent-hover:#4ade9b;--ds-chat-on-accent:#06231a;--ds-chat-accent-soft:color-mix(in srgb, var(--ds-chat-accent-solid) 16%, transparent);--ds-chat-accent-soft-strong:color-mix(in srgb, var(--ds-chat-accent-solid) 24%, transparent);--ds-chat-danger:#ff6961;--ds-chat-warning:#ffb340;--ds-chat-info:#6ea8fe;--ds-chat-shadow-1:0 1px 2px #0000004d;--ds-chat-shadow-2:0 4px 14px #0006;--ds-chat-shadow-3:0 16px 40px #0000008c;--ds-chat-scrim:#00000080}[data-avatar]{width:var(--avatar-size,40px);min-width:var(--avatar-size,40px);height:var(--avatar-size,40px);min-height:var(--avatar-size,40px);aspect-ratio:1;border-radius:var(--ds-chat-radius-round);box-shadow:inset 0 0 0 var(--ds-chat-hairline) #00000014;flex:none;display:inline-block;overflow:hidden}[data-avatar] img{border-radius:inherit;-webkit-user-drag:none;width:100%;height:100%;display:block}body[data-ds-dark-theme] [data-chat-flow-kind][data-chat-flow-kind]{background:0 0}body[data-ds-dark-theme] [data-chat-flow-kind][data-chat-flow-kind]>*{background-color:var(--ds-chat-trace-ground)}[data-chat-flow-kind=assistant-step] [data-disclosure-row],[data-chat-flow-kind=tool-call] [data-disclosure-row]{padding-left:var(--ds-chat-space-3);border-left:2px solid var(--ds-chat-trace-edge);color:var(--ds-chat-text-secondary);background:var(--ds-chat-trace-ground);font-size:var(--ds-chat-text-footnote);transition:color var(--ds-chat-duration-fast) var(--ds-chat-ease), background-color var(--ds-chat-duration-fast) var(--ds-chat-ease);margin-left:26px}[data-chat-flow-kind=assistant-step] [data-disclosure-row]:hover,[data-chat-flow-kind=tool-call] [data-disclosure-row]:hover,[data-chat-flow-kind=assistant-step] [data-disclosure-row]:focus-visible,[data-chat-flow-kind=tool-call] [data-disclosure-row]:focus-visible{color:var(--ds-chat-text-color);background:var(--ds-chat-trace-ground-hover)}[data-chat-flow-kind=assistant-step]+[data-chat-flow-kind=assistant-step],[data-chat-flow-kind=assistant-step]+[data-chat-flow-kind=tool-call],[data-chat-flow-kind=tool-call]+[data-chat-flow-kind=tool-call],[data-chat-flow-kind=tool-call]+[data-chat-flow-kind=assistant-step]{margin-top:0}[data-chat-flow-kind=assistant-step] [class*=markdown]{margin-top:var(--ds-chat-space-2)}[data-chat-flow-kind=user]{margin-block:var(--ds-chat-space-3)}@media (prefers-reduced-motion:reduce){[data-chat-flow-kind=assistant-step] [data-disclosure-row],[data-chat-flow-kind=tool-call] [data-disclosure-row]{transition:none}}[data-slot=sidebar\\.settings]>:first-child button{box-sizing:border-box;width:calc(100% - 8px);margin-inline:4px}:root[data-ds-chat-room] [data-chat-flow-kind=assistant-step] [class*=markdown]{max-width:min(760px,100%);margin-top:var(--ds-chat-space-2);padding:var(--ds-chat-space-3) var(--ds-chat-space-4);border:var(--ds-chat-hairline) solid var(--ds-chat-border);border-radius:var(--ds-chat-radius-lg);border-top-left-radius:var(--ds-chat-radius-xs);background:var(--ds-chat-surface);box-shadow:var(--ds-chat-shadow-1);margin-left:44px;position:relative}:root[data-ds-chat-room] [data-chat-flow-kind=assistant-step] [class*=markdown]:before{content:\"\";border-radius:var(--ds-chat-radius-round);background-image:var(--ds-chat-speaker-avatar);width:32px;height:32px;box-shadow:inset 0 0 0 var(--ds-chat-hairline) #00000014;background-position:50%;background-size:cover;position:absolute;top:0;left:-44px}:root[data-ds-chat-room] [data-chat-flow-kind=assistant-step] [data-disclosure-row],:root[data-ds-chat-room] [data-chat-flow-kind=tool-call] [data-disclosure-row]{margin-left:44px}@media (width<=900px){:root[data-ds-chat-room] [data-chat-flow-kind=assistant-step] [class*=markdown]{margin-left:0}:root[data-ds-chat-room] [data-chat-flow-kind=assistant-step] [class*=markdown]:before{display:none}}";
		const tagId$2 = "deepseek-harness-chat-ui/theme.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "deepseek-harness-chat-ui";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region lib/types/client/locales.js
		const NS = "skillChat";
		const zh = {
			chats: "消息",
			contacts: "联系人",
			groups: "群组",
			search: "搜索 Skill 联系人",
			searchEmpty: "没有找到匹配的联系人",
			loading: "正在加载联系人…",
			loadFailed: "联系人加载失败",
			recentChats: "最近会话",
			allContacts: "全部联系人",
			capability: "能力说明",
			whenToUse: "适用场景",
			identifier: "Skill 标识",
			startChat: "新建单聊",
			close: "关闭",
			unavailable: "当前不可用",
			modelInvocable: "Agent 可自动调用",
			userOnly: "仅用户调用",
			catalogOnly: "仅搜索资料",
			importRequired: "需导入 Harness 后使用",
			provider: "来源插件",
			sourceHarnessShort: "Harness",
			sourceWorkBuddyShort: "WorkBuddy",
			hint: "Harness Skill 可直接发消息；WorkBuddy Skill 当前作为只读搜索池。",
			newGroup: "新建群聊",
			groupSubtitle: "选择多个可用 Skill，创建一个协作会话。",
			groupName: "群聊名称",
			groupNamePlaceholder: "输入群聊名称（可选）",
			selectSkills: "选择 Skill",
			selectedCount: "已选 {count}",
			cancel: "取消",
			create: "创建",
			searchAll: "搜索已加入联系人或 skills.sh",
			frequentContacts: "常用联系人",
			frequentContact: "常用联系人",
			addFrequent: "设为常用",
			externalSkills: "外部 Skill",
			searchingExternal: "正在搜索外部 Skill…",
			addContact: "加入",
			installSkill: "安装",
			installing: "安装中…",
			installingSkill: "正在安装 Skill：{name}",
			skillInstalled: "已安装到当前项目：{name}",
			skillInstallFailed: "安装失败：{name}",
			displayMode: "显示模式",
			personaMode: "拟人",
			rawMode: "原始",
			myGroups: "我的群组",
			noGroups: "还没有群组，点击右上角＋创建",
			startGroupChat: "新建群聊会话",
			deleteGroup: "删除群组",
			workspaceRequired: "群组已保存；开始聊天前请先选择工作区",
			replying: "正在回复…",
			workspace: "绑定工作区",
			projectSpace: "项目空间",
			newSession: "新会话",
			groupWorkspace: "群组将创建在「{workspace}」项目空间",
			noWorkspace: "未绑定工作区",
			addWorkspace: "添加工作区",
			workspaceAddFailed: "添加工作区失败",
			joinedContacts: "已加入联系人",
			contactAdded: "已加入联系人：{name}",
			joined: "已加入",
			externalEmpty: "skills.sh 没有更多匹配结果",
			renameGroup: "重命名",
			save: "保存",
			leader: "主导",
			leaderHint: "点击成员可设置主导 Skill；它的头像将用于群聊回复。",
			mentionHint: "进入群聊后，在输入框键入 @ 即可选择群成员。",
			groupMembers: "群成员",
			memberCount: "{count} 名成员",
			addMember: "添加成员",
			removeMember: "移除 {name}",
			groupNeedsMember: "群聊至少需要保留两名成员",
			groupPanelHint: "仅明确 @ 一名成员时由该 Skill 回答；否则由主导 Skill 协调。",
			selfIntroduction: "自我介绍",
			source: "来源",
			status: "状态",
			ready: "已安装，可调用",
			online: "在线",
			homepage: "主页",
			addToCurrentGroup: "加入当前群聊",
			revertHere: "回到这里",
			revertHereHint: "从这条重新开始；之后的内容保留在原分支里",
			forkHere: "分叉",
			forkHereHint: "以这条为起点另开一条对话，原对话不动",
			branchSuffix: "分支",
			branchOutOfWindow: "这条消息不在已加载的范围内，先向上加载更多再试",
			branchFailed: "分支失败",
			working: "处理中…",
			forkedNotice: "已分叉，原对话可在「历史」里找回",
			revertedNotice: "已回到这里，之后的内容保留在原分支",
			noGroupsTitle: "还没有群组",
			noGroupsBody: "用右上角的 ＋ 建一个 Skill 群聊，把常用的 Skill 组织成固定协作空间。",
			groupsSection: "我的群组",
			pin: "置顶",
			saveRoom: "存为常用小组",
			unsaveRoom: "取消常用小组",
			savedRoom: "常用",
			unpin: "取消置顶",
			pinned: "已置顶",
			archive: "归档",
			delete: "删除",
			roomActions: "对话操作",
			copyRoom: "复制会话信息",
			copied: "已复制",
			deleteRoomTitle: "删除这个对话？",
			deleteRoomBody: "对话会从列表中移除，绑定的自动化一并删除。项目里的会话记录本身保留。此操作没有撤销入口。",
			archivedRooms: "已归档",
			restore: "恢复",
			dragHint: "拖拽可调整顺序",
			skillSources: "Skill 来源",
			skillSourcesHint: "这些目录里的 Skill 会作为联系人出现",
			rootMissing: "未找到",
			rootScanned: "已扫描",
			linkExplainer: "联系人只是名片。启用调用会把该 Skill 软链到 Harness 自己的 Skill 目录，让模型真的能加载它——软链不是复制，原目录仍是唯一事实来源，改了立刻生效。",
			noLinkedSkills: "还没有启用任何外部 Skill。",
			unlink: "停用",
			enableSkill: "启用调用",
			enabledSkill: "已启用调用",
			enableSkillFailed: "启用失败",
			noCoordinator: "未设置协调者",
			coordinates: "协调",
			sessionCount: "个会话",
			peopleCount: "人",
			noMessages: "还没有消息",
			projectLabel: "项目",
			unbound: "未绑定",
			directRoomFallback: "直接对话，不启用群组职能。",
			groupRoomFallback: "固定 Skill 团队协作空间；未指定 @ 时由协调者处理。",
			backParent: ".. 返回上级",
			regenerateFromMembers: "✦ 根据当前成员重新生成",
			generateFromMembers: "✦ 根据成员辅助生成",
			diffNeedsGit: "「查看 Diff」比较的是工作区里未提交的改动，需要项目本身是一个 Git 仓库。",
			tempChat: "临时对话",
			homepageLink: "主页 ↗",
			whenToFind: "什么时候找 TA",
			fromTemplate: "从模板开始",
			repositoryLink: "仓库 ↗",
			taskPrompt: "任务提示词",
			saveGroup: "保存群组",
			saveIdentity: "保存身份",
			allMembers: "全部成员",
			createAutomation: "创建自动化",
			unitLabel: "单位",
			runOnce: "单次运行",
			originalSkill: "原始 Skill",
			send: "发送",
			sideChatHint: "可以追问、比较方案或验证细节；主对话会保持原位。",
			bindingHint: "可新增、移除并调整新会话使用的主项目",
			nameLabel: "名称",
			runRecurring: "周期运行",
			teamLabel: "团队",
			inTheseGroups: "在这些群组里",
			unitDay: "天",
			groupMoreHint: "头像、群组职能与项目目录",
			unitHour: "小时",
			workbench: "工作台",
			membersAndRoles: "成员与职能",
			openLabel: "打开",
			automationHint: "按计划在目标对话中创建独立会话",
			emptyWorkspace: "当前工作区是干净的。",
			resetDefault: "恢复默认",
			searchEmptyHint: "换个关键词，或到「联系人」里找 Skill。",
			goodAt: "擅长什么",
			newAutomation: "新建自动化",
			nicknameLabel: "昵称",
			diffExplainer: "显示当前项目的真实 `git diff` 输出。",
			moreSettings: "更多设置",
			skillsShHome: "查看 skills.sh 主页 ↗",
			viewHomepage: "查看主页 ↗",
			thinking: "正在思考…",
			readingDiff: "正在读取改动…",
			readingDir: "正在读取目录…",
			memberPanelHint: "点击已加入成员可设为协调者；＋ 加入，− 剔出。新对话与历史对话都会读取当前群组职能。",
			groupAvatarHint: "独立圆形标识，与成员 Skill 清晰区分",
			emptyRoomsHint: "用右上角的 ＋ 开始一段普通对话，或建一个 Skill 群组。",
			runNow: "立即运行",
			bindProjects: "绑定项目目录",
			continueChat: "继续对话",
			editIdentity: "编辑昵称与头像",
			archiveGroupBody: "群组会从列表中移除，历史会话仍保留在项目里。此操作没有撤销入口。",
			groupNameLabel: "群组名称",
			groupAvatarLabel: "群组头像",
			groupRole: "群组职能",
			groupRolePrompt: "群组职能 · System Prompt",
			embedBlocked: "若目标页面禁止嵌入，可在新窗口打开：",
			runLabel: "运行",
			historySingleHint: "这个房间还只有一段对话。用「＋ 新对话」开始新的一段，旧的会留在这里。",
			binaryFile: "这是二进制文件，无法直接预览。",
			pickMembers: "选择成员",
			pickFileHint: "选择文件即可在这里预览",
			intervalLabel: "间隔",
			bindDefaultHint: "默认绑定当前项目；新对话使用第一个项目作为主目录",
			newConversation: "＋ 新对话",
			newItem: "＋ 新建",
			addDirectory: "＋ 添加目录",
			archiveGroupTitle: "归档这个群组？",
			archiveGroup: "归档群组",
			truncated: " · 已截断",
			noSkillMode: "不启用 Skill，直接与模型交流",
			joinLabel: "加入",
			collabGroup: "协作群组",
			coordinator: "协调者",
			onceLabel: "单次",
			failedLabel: "失败",
			installLabel: "安装",
			installAndJoin: "安装并加入",
			joinedLabel: "已加入",
			installedLabel: "已安装",
			completedLabel: "已完成",
			pausedLabel: "已暂停",
			startNewChat: "开始一段新对话",
			currentChat: "当前对话",
			currentProject: "当前项目",
			restoreLabel: "恢复",
			organizeSkills: "把常用 Skill 组织成固定协作空间",
			coordinatorHandles: "未指定 @ 时由协调者处理",
			skillsShNote: "来自 skills.sh 的社区 Skill，可安装到当前项目。",
			viewDiff: "查看 Diff",
			startingTerminal: "正在启动终端…",
			typing: "正在输入中…",
			browserLabel: "浏览器",
			addWorkspaceHint: "添加一个新的工作区",
			plainChatHint: "直接输入问题，不调用任何 Skill",
			waitingRun: "等待运行",
			terminalLabel: "终端",
			terminalIdle: "终端尚未启动",
			groupChat: "群聊",
			automations: "自动化",
			automationCreated: "自动化已创建，可立即运行",
			automationStarted: "自动化已在后台创建并启动独立会话",
			pickProjectFirst: "请先选择项目目录",
			composerSkill: "输入消息，当前 Skill 会协助处理",
			composerGroup: "输入消息，或用 @ 指定群组成员",
			runAt: "运行时间",
			projectFiles: "项目文件",
			projectDir: "项目目录",
			firstRunAt: "首次运行时间",
			pauseLabel: "暂停",
			untitledAutomation: "新自动化",
			plainChat: "普通对话",
			searchRooms: "搜索对话",
			searchRoomsPlaceholder: "搜索对话…",
			groupSettings: "群组设置",
			skillProfile: "Skill 资料",
			searchMembers: "搜索成员",
			searchMembersPlaceholder: "搜索昵称、Skill 或能力…",
			groupRolePlaceholder: "定义群组目标、协作方式和输出标准…",
			automationNamePlaceholder: "例如：每周研究简报…",
			automationPromptPlaceholder: "描述需要团队完成的任务…",
			plainPromptMode: "按普通用户提示词执行",
			noSkillGroup: "普通对话（不启用 Skill）"
		};
		const en = {
			chats: "Chats",
			contacts: "Contacts",
			groups: "Groups",
			search: "Search Skill contacts",
			searchEmpty: "No matching contacts",
			loading: "Loading contacts…",
			loadFailed: "Could not load contacts",
			recentChats: "Recent chats",
			allContacts: "All contacts",
			capability: "Capabilities",
			whenToUse: "When to use",
			identifier: "Skill ID",
			startChat: "New direct chat",
			close: "Close",
			unavailable: "Unavailable",
			modelInvocable: "Agent can invoke",
			userOnly: "User only",
			catalogOnly: "Search-only catalog",
			importRequired: "Import into Harness to use",
			provider: "Source plugin",
			sourceHarnessShort: "Harness",
			sourceWorkBuddyShort: "WorkBuddy",
			hint: "Harness Skills can be messaged directly; WorkBuddy Skills are currently read-only search results.",
			newGroup: "New group",
			groupSubtitle: "Select multiple available Skills for one collaboration session.",
			groupName: "Group name",
			groupNamePlaceholder: "Optional group name",
			selectSkills: "Select Skills",
			selectedCount: "Selected {count}",
			cancel: "Cancel",
			create: "Create",
			searchAll: "Search joined contacts or skills.sh",
			frequentContacts: "Frequent",
			frequentContact: "Frequent contact",
			addFrequent: "Add to frequent",
			externalSkills: "External Skills",
			searchingExternal: "Searching external Skills…",
			addContact: "Add",
			installSkill: "Install",
			installing: "Installing…",
			installingSkill: "Installing Skill: {name}",
			skillInstalled: "Installed in this project: {name}",
			skillInstallFailed: "Could not install: {name}",
			displayMode: "Display",
			personaMode: "Persona",
			rawMode: "Original",
			myGroups: "My groups",
			noGroups: "No groups yet. Use ＋ to create one.",
			startGroupChat: "New group session",
			deleteGroup: "Delete group",
			workspaceRequired: "The group is saved; select a workspace before chatting",
			replying: "Replying…",
			workspace: "Bound workspace",
			projectSpace: "Project space",
			newSession: "New session",
			groupWorkspace: "This group will belong to “{workspace}”",
			noWorkspace: "No workspace selected",
			addWorkspace: "Add workspace",
			workspaceAddFailed: "Could not add workspace",
			joinedContacts: "Joined contacts",
			contactAdded: "Added contact: {name}",
			joined: "Added",
			externalEmpty: "No more matches from skills.sh",
			renameGroup: "Rename",
			save: "Save",
			leader: "Lead",
			leaderHint: "Choose the lead Skill; its avatar represents group replies.",
			mentionHint: "Type @ in the group composer to mention a member.",
			groupMembers: "Members",
			memberCount: "{count} members",
			addMember: "Add member",
			removeMember: "Remove {name}",
			groupNeedsMember: "A group must keep at least two members",
			groupPanelHint: "One explicit @ mention selects that Skill; otherwise the group lead coordinates the reply.",
			selfIntroduction: "Introduction",
			source: "Source",
			status: "Status",
			ready: "Installed and ready",
			online: "Online",
			homepage: "Profile",
			addToCurrentGroup: "Add to current group",
			revertHere: "Go back here",
			revertHereHint: "Continue from this message; what followed stays on the original branch",
			forkHere: "Branch",
			forkHereHint: "Start a parallel conversation from this message, leaving this one untouched",
			branchSuffix: "branch",
			branchOutOfWindow: "This message is outside the loaded range — load more above and retry",
			branchFailed: "Branch failed",
			working: "Working…",
			forkedNotice: "Branched. The original is under History",
			revertedNotice: "Continuing from here; what followed stays on the original branch",
			noGroupsTitle: "No groups yet",
			noGroupsBody: "Use ＋ above to build one, and keep the Skills you work with as a standing team.",
			groupsSection: "My groups",
			pin: "Pin",
			saveRoom: "Save as team",
			unsaveRoom: "Remove from teams",
			savedRoom: "Saved",
			unpin: "Unpin",
			pinned: "Pinned",
			archive: "Archive",
			delete: "Delete",
			roomActions: "Conversation actions",
			copyRoom: "Copy conversation info",
			copied: "Copied",
			deleteRoomTitle: "Delete this conversation?",
			deleteRoomBody: "The conversation leaves the list and its automations go with it. The Sessions themselves stay in the project. There is no undo.",
			archivedRooms: "Archived",
			restore: "Restore",
			dragHint: "Drag to reorder",
			skillSources: "Skill sources",
			skillSourcesHint: "Skills in these directories appear as contacts",
			rootMissing: "not found",
			rootScanned: "scanned",
			linkExplainer: "A contact is only a name card. Enabling a Skill symlinks it into the Harness’s own Skill directory so the model can actually load it. A link is not a copy: the original stays the single source of truth, and edits take effect at once.",
			noLinkedSkills: "No external Skills enabled yet.",
			unlink: "Disable",
			enableSkill: "Enable for the model",
			enabledSkill: "Enabled for the model",
			enableSkillFailed: "Could not enable",
			noCoordinator: "No coordinator set",
			coordinates: "coordinating",
			sessionCount: "sessions",
			peopleCount: "people",
			noMessages: "No messages yet",
			projectLabel: "Project",
			unbound: "not bound",
			directRoomFallback: "A direct conversation; no group role applies.",
			groupRoomFallback: "A standing Skill team. Without an @ mention the coordinator takes it.",
			backParent: ".. Up one level",
			regenerateFromMembers: "✦ Regenerate from current members",
			generateFromMembers: "✦ Draft from members",
			diffNeedsGit: "Diff compares uncommitted changes in the workspace, so the project has to be a Git repository.",
			tempChat: "Side chat",
			homepageLink: "Homepage ↗",
			whenToFind: "When to call on them",
			fromTemplate: "Start from a template",
			repositoryLink: "Repository ↗",
			taskPrompt: "Task prompt",
			saveGroup: "Save group",
			saveIdentity: "Save identity",
			allMembers: "All members",
			createAutomation: "Create automation",
			unitLabel: "Unit",
			runOnce: "Run once",
			originalSkill: "Original Skill",
			send: "Send",
			sideChatHint: "Ask follow-ups, compare options or check details; the main conversation stays where it is.",
			bindingHint: "Add, remove, and choose which project a new conversation uses",
			nameLabel: "Name",
			runRecurring: "Repeat",
			teamLabel: "Team",
			inTheseGroups: "In these groups",
			unitDay: "days",
			groupMoreHint: "Avatar, group role and project directories",
			unitHour: "hours",
			workbench: "Workbench",
			membersAndRoles: "Members & roles",
			openLabel: "Open",
			automationHint: "Runs on a schedule, in its own Session inside the target conversation",
			emptyWorkspace: "The workspace is clean.",
			resetDefault: "Reset to default",
			searchEmptyHint: "Try another word, or look under Contacts.",
			goodAt: "What they are good at",
			newAutomation: "New automation",
			nicknameLabel: "Nickname",
			diffExplainer: "Shows the project’s real `git diff` output.",
			moreSettings: "More settings",
			skillsShHome: "Open on skills.sh ↗",
			viewHomepage: "Open homepage ↗",
			thinking: "Thinking…",
			readingDiff: "Reading changes…",
			readingDir: "Reading directory…",
			memberPanelHint: "Click a member to make them coordinator; ＋ adds, − removes. New and existing conversations both read the current group role.",
			groupAvatarHint: "Its own mark, distinct from the member portraits",
			emptyRoomsHint: "Use ＋ above to start a plain conversation, or build a Skill group.",
			runNow: "Run now",
			bindProjects: "Linked project directories",
			continueChat: "Continue",
			editIdentity: "Edit nickname and portrait",
			archiveGroupBody: "The group leaves the list; its Sessions stay in the project. There is no undo.",
			groupNameLabel: "Group name",
			groupAvatarLabel: "Group avatar",
			groupRole: "Group role",
			groupRolePrompt: "Group role · system prompt",
			embedBlocked: "If the page refuses to embed, open it in a new window:",
			runLabel: "Run",
			historySingleHint: "This room has one conversation so far. Start another with ＋ New; this one stays here.",
			binaryFile: "A binary file; there is nothing to preview.",
			pickMembers: "Choose members",
			pickFileHint: "Pick a file to preview it here",
			intervalLabel: "Every",
			bindDefaultHint: "Bound to the current project by default; a new conversation uses the first as its main directory",
			newConversation: "＋ New",
			newItem: "＋ New",
			addDirectory: "＋ Add directory",
			archiveGroupTitle: "Archive this group?",
			archiveGroup: "Archive group",
			truncated: " · truncated",
			noSkillMode: "No Skill; talk to the model directly",
			joinLabel: "Add",
			collabGroup: "Working group",
			coordinator: "Coordinator",
			onceLabel: "once",
			failedLabel: "Failed",
			installLabel: "Install",
			installAndJoin: "Install and add",
			joinedLabel: "Added",
			installedLabel: "Installed",
			completedLabel: "Done",
			pausedLabel: "Paused",
			startNewChat: "Start a new conversation",
			currentChat: "Current conversation",
			currentProject: "Current project",
			restoreLabel: "Resume",
			organizeSkills: "Organize the Skills you use into a standing team",
			coordinatorHandles: "Without an @ mention the coordinator takes it",
			skillsShNote: "A community Skill from skills.sh; it can be installed into this project.",
			viewDiff: "View diff",
			startingTerminal: "Starting the terminal…",
			typing: "Typing…",
			browserLabel: "Browser",
			addWorkspaceHint: "Add another workspace",
			plainChatHint: "Just ask; no Skill is involved",
			waitingRun: "Scheduled",
			terminalLabel: "Terminal",
			terminalIdle: "The terminal has not started",
			groupChat: "Group chat",
			automations: "Automations",
			automationCreated: "Automation created; it can run now",
			automationStarted: "The automation started its own Session in the background",
			pickProjectFirst: "Choose a project directory first",
			composerSkill: "Type a message; the current Skill will help",
			composerGroup: "Type a message, or @ a member",
			runAt: "Runs at",
			projectFiles: "Project files",
			projectDir: "Project directory",
			firstRunAt: "First run",
			pauseLabel: "Pause",
			untitledAutomation: "Untitled automation",
			plainChat: "Plain chat",
			searchRooms: "Search conversations",
			searchRoomsPlaceholder: "Search conversations…",
			groupSettings: "Group settings",
			skillProfile: "Skill profile",
			searchMembers: "Search members",
			searchMembersPlaceholder: "Search nickname, Skill or capability…",
			groupRolePlaceholder: "Define the group’s goal, how it works, and what good output looks like…",
			automationNamePlaceholder: "e.g. Weekly research brief…",
			automationPromptPlaceholder: "Describe what the team should do…",
			plainPromptMode: "Runs on the plain user prompt",
			noSkillGroup: "Plain conversation (no Skill)"
		};
		//#endregion
		//#region \0dsh-css:/Users/lileilei/workspace/deepseek-harness/packages/experimental/client-ui-skill-chat/src/client/SkillContactsBrowser.module.css.mjs
		const css$1 = ".GlbDda_root{height:100%;min-height:0;color:var(--ds-chat-text-color);flex-direction:column;display:flex}.GlbDda_dsChatBrand{color:var(--ds-chat-text-color);font-size:var(--ds-chat-text-title2);font-weight:var(--ds-chat-weight-bold);letter-spacing:-.02em}.GlbDda_dsChatBrand b{color:var(--ds-chat-accent-text);font-weight:inherit}.GlbDda_workspaceIcon{color:var(--ds-chat-accent-solid);font-size:var(--ds-chat-text-title3);place-items:center;display:grid}.GlbDda_rail{flex-direction:column;align-items:center;gap:10px;height:100%;padding-top:10px;display:flex}.GlbDda_railButton{width:36px;height:36px;color:var(--ds-chat-text-secondary);cursor:pointer;font:inherit;background:0 0;border:0;border-radius:12px}.GlbDda_railButton:hover{background:var(--ds-chat-hover);color:var(--ds-chat-text-color)}.GlbDda_tabs{background:var(--ds-chat-fill-quaternary);border-radius:12px;grid-template-columns:repeat(3,1fr);gap:4px;margin:4px 12px 10px;padding:4px;display:grid}.GlbDda_groupAvatar{aspect-ratio:1;border-radius:50%;flex:none;width:46px;min-width:46px;max-width:46px;height:46px;min-height:46px;max-height:46px;position:relative}.GlbDda_groupAvatar[data-small=true]{width:32px;min-width:32px;max-width:32px;height:32px;min-height:32px;max-height:32px}.GlbDda_groupAvatar .GlbDda_animalAvatar{width:100%;height:100%}.GlbDda_roomAvatarStack{background:var(--ds-chat-fill-quaternary);width:46px;height:46px;box-shadow:var(--ds-chat-shadow-2);border-radius:50%;flex:none;justify-content:center;align-items:center;padding:2px;display:flex}.GlbDda_roomAvatarStack>*{margin-left:-10px}.GlbDda_roomAvatarStack>:first-child{margin-left:0}.GlbDda_roomAvatarStackCompact{width:32px;height:32px;padding:1px}.GlbDda_roomAvatarStackCompact>*{margin-left:-7px}.GlbDda_groupMark{box-sizing:border-box;border:2px solid var(--ds-chat-surface);width:18px;min-width:18px;height:18px;color:var(--ds-chat-on-accent);background:var(--ds-chat-info);box-shadow:0 2px 6px var(--ds-chat-info-soft);letter-spacing:-1px;border-radius:999px;place-items:center;padding:0;font-size:5px;display:grid;position:absolute;bottom:-1px;right:-2px}.GlbDda_avatarStatusWrap{place-items:center;width:54px;display:grid;position:relative}.GlbDda_unreadBadge{box-sizing:border-box;border:2px solid var(--ds-chat-surface);min-width:18px;height:18px;color:var(--ds-chat-on-accent);background:var(--ds-chat-danger);box-shadow:0 2px 7px color-mix(in srgb, var(--ds-chat-danger) 30%, transparent);font-size:var(--ds-chat-text-caption);font-weight:var(--ds-chat-weight-bold);border-radius:999px;place-items:center;padding:0 5px;display:grid;position:absolute;top:-4px;right:-2px}.GlbDda_roomRow{border:var(--ds-chat-hairline) solid transparent;width:100%;min-height:62px;color:inherit;text-align:left;cursor:pointer;font:inherit;background:0 0;border-radius:17px;grid-template-columns:54px minmax(0,1fr) auto;align-items:center;gap:10px;margin:3px 0;padding:8px 10px;transition:transform .12s,background .12s,box-shadow .12s;display:grid}.GlbDda_roomRow:hover{background:var(--ds-chat-hover);box-shadow:none;border-color:#0000}.GlbDda_roomRow:active{box-shadow:var(--ds-chat-shadow-2)}.GlbDda_roomRow[data-current=true]{border-color:var(--ds-chat-accent-border,color-mix(in srgb, var(--ds-chat-accent-solid) 28%, transparent));background:var(--ds-chat-accent-soft);box-shadow:0 8px 20px color-mix(in srgb, var(--ds-chat-accent-solid) 10%, transparent), inset 3px 0 var(--ds-chat-accent-solid)}.GlbDda_sectionHeading{justify-content:space-between;align-items:center;gap:12px;padding:4px 14px 9px;display:flex}.GlbDda_sectionHeading>div{gap:2px;min-width:0;display:grid}.GlbDda_sectionHeading strong{font-size:var(--ds-chat-text-body)}.GlbDda_sectionHeading small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_sectionHeading>button{border:var(--ds-chat-hairline) solid var(--ds-chat-border);color:var(--ds-chat-text-secondary);background:var(--ds-chat-fill-quaternary);cursor:pointer;font:inherit;font-size:var(--ds-chat-text-caption);border-radius:10px;padding:6px 9px;box-shadow:0 2px 6px #0000000f}.GlbDda_emptyCard{border:1px dashed color-mix(in srgb, var(--ds-chat-border-strong) 80%, transparent);color:var(--ds-chat-muted);background:var(--ds-chat-fill-quaternary);text-align:center;font-size:var(--ds-chat-text-footnote);border-radius:18px;margin:8px;padding:24px 18px;line-height:1.6}.GlbDda_blankRoomDock{z-index:24;box-sizing:border-box;border:var(--ds-chat-hairline) solid var(--ds-chat-border);background:var(--ds-chat-surface);width:max-content;max-width:calc(100% - 340px);min-height:40px;box-shadow:var(--ds-chat-shadow-2);border-radius:14px;justify-content:flex-end;align-items:center;padding:4px 8px;display:flex;position:fixed;top:10px;left:auto;right:18px}.GlbDda_headerDivider{background:var(--ds-chat-border-strong);width:1px;height:20px}.GlbDda_headerIconButton,.GlbDda_headerTextButton,.GlbDda_headerNewButton{border:var(--ds-chat-hairline) solid var(--ds-chat-border);height:30px;color:var(--ds-chat-text-secondary);background:var(--ds-chat-fill-quaternary);box-shadow:var(--ds-chat-shadow-1);cursor:pointer;font:inherit;font-size:var(--ds-chat-text-caption);border-radius:10px;place-items:center;display:inline-grid}.GlbDda_headerIconButton{width:30px;padding:0}.GlbDda_headerTextButton{padding:0 9px}.GlbDda_headerNewButton{border-color:var(--ds-chat-accent-solid);color:var(--ds-chat-on-accent);background:var(--ds-chat-accent,var(--ds-chat-accent-solid));padding:0 11px}.GlbDda_headerIconButton:hover,.GlbDda_headerTextButton:hover{color:var(--ds-chat-text-color)}.GlbDda_headerNewButton:hover{box-shadow:0 5px 12px var(--ds-chat-accent-soft)}.GlbDda_headerIconButton:active,.GlbDda_headerTextButton:active,.GlbDda_headerNewButton:active{box-shadow:inset 0 2px 4px #0000001f}.GlbDda_headerMenuWrap{position:relative}.GlbDda_headerHistoryMenu{z-index:40;border:var(--ds-chat-hairline) solid var(--ds-chat-border);background-color:canvas;background-image:linear-gradient(var(--ds-chat-surface), var(--ds-chat-surface));width:min(320px,70vw);max-height:340px;box-shadow:var(--ds-chat-shadow-3);border-radius:16px;padding:7px;position:absolute;top:calc(100% + 7px);right:0;overflow-y:auto}.GlbDda_headerHistoryMenu button{width:100%;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:11px;gap:3px;padding:9px 10px;display:grid}.GlbDda_headerHistoryMenu button:hover,.GlbDda_headerHistoryMenu button[data-active=true]{background:var(--ds-chat-hover)}.GlbDda_headerHistoryMenu small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_avatarLibrary{background:var(--ds-chat-fill-quaternary);border-radius:16px;grid-template-columns:repeat(6,1fr);gap:8px;max-height:230px;margin:12px 0;padding:10px;display:grid;overflow-y:auto}.GlbDda_avatarLibrary button{cursor:pointer;background:0 0;border:2px solid #0000;border-radius:50%;place-items:center;padding:3px;display:grid}.GlbDda_avatarLibrary button[data-selected=true]{border-color:var(--ds-chat-accent-solid);background:var(--ds-chat-row-selected)}.GlbDda_field{color:var(--ds-chat-text-secondary);font-size:var(--ds-chat-text-caption);gap:6px;margin:12px 0;display:grid}.GlbDda_field input,.GlbDda_field textarea,.GlbDda_field select{box-sizing:border-box;border:var(--ds-chat-hairline) solid var(--ds-chat-border);width:100%;color:var(--ds-chat-text-color);background:var(--ds-chat-surface);font:inherit;border-radius:12px;outline:none;padding:10px 12px}.GlbDda_field textarea{resize:vertical;min-height:110px}.GlbDda_field input:focus,.GlbDda_field textarea:focus,.GlbDda_field select:focus{border-color:var(--ds-chat-accent-solid);box-shadow:0 0 0 3px color-mix(in srgb, var(--ds-chat-accent-solid) 12%, transparent)}.GlbDda_scheduleChoice{background:var(--ds-chat-fill-quaternary);border-radius:12px;grid-template-columns:1fr 1fr;gap:6px;padding:4px;display:grid}.GlbDda_scheduleChoice button{color:var(--ds-chat-text-secondary);cursor:pointer;font:inherit;background:0 0;border:0;border-radius:9px;padding:8px}.GlbDda_scheduleChoice button[data-active=true]{color:var(--ds-chat-accent-text);background:var(--ds-chat-surface);box-shadow:0 3px 10px var(--ds-chat-accent-soft)}.GlbDda_repeatFields{grid-template-columns:1fr 1fr;gap:10px;display:grid}.GlbDda_originCard,.GlbDda_automationSummary{border:var(--ds-chat-hairline) solid var(--ds-chat-border);background:var(--ds-chat-fill-quaternary);border-radius:14px;gap:3px;margin:14px 0;padding:12px;display:grid}.GlbDda_originCard span,.GlbDda_automationSummary span,.GlbDda_originCard small,.GlbDda_automationSummary small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_automationCard{border:var(--ds-chat-hairline) solid var(--ds-chat-border);background:var(--ds-chat-fill-quaternary);box-shadow:var(--ds-chat-shadow-1);border-radius:17px;gap:10px;margin:7px 4px;padding:14px;display:grid}.GlbDda_automationCard>div{gap:3px;display:grid}.GlbDda_automationCard small,.GlbDda_automationCard p{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_automationCard p{margin:0;line-height:1.45}.GlbDda_automationCard footer{align-items:center;gap:6px;display:flex}.GlbDda_automationCard footer span{color:var(--ds-chat-accent-text);font-size:var(--ds-chat-text-caption);margin-right:auto}.GlbDda_automationCard footer button{border:var(--ds-chat-hairline) solid var(--ds-chat-border);color:var(--ds-chat-text-secondary);background:var(--ds-chat-surface);cursor:pointer;font:inherit;font-size:var(--ds-chat-text-caption);border-radius:9px;padding:6px 8px}.GlbDda_automationDialog{box-sizing:border-box;overscroll-behavior:contain;border:var(--ds-chat-hairline) solid var(--ds-chat-border);border-radius:var(--ds-chat-radius-xl);background-color:canvas;background-image:linear-gradient(var(--ds-chat-surface), var(--ds-chat-surface));width:min(520px,100vw - 32px);max-height:min(720px,100vh - 40px);box-shadow:var(--ds-chat-shadow-3);padding:22px;overflow-y:auto}.GlbDda_automationDialog .GlbDda_groupHeader{padding:20px 22px 12px}.GlbDda_automationDialog .GlbDda_field{margin:8px 0}.GlbDda_automationDialog .GlbDda_field textarea{min-height:88px}.GlbDda_automationDialog .GlbDda_groupFooter{padding:12px 0 0}.GlbDda_roomMemberGrid{gap:7px;max-height:390px;margin:12px 0;display:grid;overflow-y:auto}.GlbDda_roomMemberItem{border:var(--ds-chat-hairline) solid transparent;background:var(--ds-chat-fill-quaternary);opacity:.72;border-radius:14px;align-items:center;gap:8px;padding:7px;display:flex}.GlbDda_roomMemberItem[data-included=true]{border-color:var(--ds-chat-accent-border,color-mix(in srgb, var(--ds-chat-accent-solid) 28%, transparent));background:color-mix(in srgb, var(--ds-chat-accent-soft) 55%, var(--ds-chat-surface));opacity:1}.GlbDda_memberPersona{min-width:0;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;flex:1;align-items:center;gap:9px;display:flex}.GlbDda_memberPersona>span:last-child{gap:2px;min-width:0;display:grid}.GlbDda_memberPersona small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_memberToggle{border:var(--ds-chat-hairline) solid var(--ds-chat-border);width:30px;height:30px;color:var(--ds-chat-text-secondary);background:var(--ds-chat-surface);cursor:pointer;border-radius:10px}.GlbDda_marketAvatar{width:38px;height:38px;color:var(--ds-chat-accent-text);background:var(--ds-chat-info-soft);box-shadow:inset 0 1px 0 white, 0 4px 10px var(--ds-chat-info-soft);border-radius:50%;place-items:center;display:grid}@media (prefers-reduced-motion:reduce){.GlbDda_roomRow{transition:none}}.GlbDda_tab{height:32px;color:var(--ds-chat-text-secondary);cursor:pointer;font:inherit;font-size:var(--ds-chat-text-body);background:0 0;border:0;border-radius:9px}.GlbDda_tab[data-active=true]{color:var(--ds-chat-text-color);background:var(--ds-chat-surface);box-shadow:0 1px 4px #00000014}.GlbDda_search{box-sizing:border-box;border:var(--ds-chat-hairline) solid transparent;width:100%;height:36px;color:var(--ds-chat-text-color);background:var(--ds-chat-fill-quaternary);font:inherit;font-size:var(--ds-chat-text-body);border-radius:12px;outline:none;padding:0 12px}.GlbDda_search:focus{border-color:color-mix(in srgb, var(--ds-chat-accent-solid) 55%, transparent);background:var(--ds-chat-surface)}.GlbDda_list{content-visibility:auto;min-height:0;padding:0 8px 28px;overflow-y:auto}.GlbDda_row{width:100%;color:inherit;text-align:left;cursor:pointer;font:inherit;background:0 0;border:0;border-radius:14px;grid-template-columns:42px minmax(0,1fr) auto;align-items:center;gap:10px;padding:9px 8px;display:grid}.GlbDda_row:hover,.GlbDda_row[data-current=true]{background:var(--ds-chat-hover)}.GlbDda_row[data-current=true]{box-shadow:inset 2px 0 var(--ds-chat-accent-solid)}.GlbDda_avatar{width:38px;height:38px;color:var(--ds-chat-accent-text);background:var(--contact-color,var(--ds-chat-accent-soft-strong));box-shadow:inset 0 0 0 var(--ds-chat-hairline) #00000014;font-size:var(--ds-chat-text-body);font-weight:var(--ds-chat-weight-bold);letter-spacing:-.03em;border-radius:50%;place-items:center;display:grid}.GlbDda_copy{min-width:0}.GlbDda_name,.GlbDda_description{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.GlbDda_name{font-size:var(--ds-chat-text-callout);font-weight:var(--ds-chat-weight-semibold)}.GlbDda_nameLine{align-items:center;gap:7px;min-width:0;display:flex}.GlbDda_source{color:var(--ds-chat-muted);background:var(--ds-chat-fill-quaternary);font-size:var(--ds-chat-text-caption);font-weight:var(--ds-chat-weight-semibold);border-radius:999px;flex:none;padding:2px 6px}.GlbDda_source[data-source=workbuddy]{color:var(--ds-chat-warning);background:var(--ds-chat-warning-soft)}.GlbDda_description{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-footnote);margin-top:3px}.GlbDda_time{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);align-self:start;padding-top:3px}.GlbDda_status{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-body);text-align:center;padding:18px 14px}.GlbDda_backdrop{z-index:1000;background:var(--ds-chat-scrim);backdrop-filter:blur(3px);justify-content:flex-end;display:flex;position:fixed;inset:0}.GlbDda_panel{box-sizing:border-box;width:min(380px,100vw - 24px);height:100%;color:var(--ds-chat-text-color);background:var(--ds-chat-surface);padding:24px;overflow-y:auto;box-shadow:-18px 0 50px #0000001f}.GlbDda_panelTop{justify-content:space-between;align-items:center;gap:16px;display:flex}.GlbDda_close{width:32px;height:32px;color:var(--ds-chat-text-secondary);background:var(--ds-chat-fill-quaternary);cursor:pointer;border:0;border-radius:10px}.GlbDda_panelTitle{letter-spacing:-.03em;margin:18px 0 4px;font-size:22px}.GlbDda_primary{width:100%;height:42px;color:var(--ds-chat-on-accent);background:var(--ds-chat-accent-solid);cursor:pointer;font:inherit;font-weight:var(--ds-chat-weight-semibold);border:0;border-radius:13px;margin-top:28px}.GlbDda_primary:hover{background:var(--ds-chat-accent-solid)}.GlbDda_primary:disabled{color:var(--ds-chat-muted);background:var(--ds-chat-fill-quaternary);cursor:not-allowed}.GlbDda_topbar{align-items:center;gap:6px;padding-right:10px;display:flex}.GlbDda_topbar .GlbDda_tabs{flex:1;grid-template-columns:repeat(3,minmax(0,1fr))}.GlbDda_addGroup{width:34px;height:34px;color:var(--ds-chat-text-color);cursor:pointer;background:0 0;border:0;border-radius:10px;font-size:24px;line-height:1}.GlbDda_addGroup:hover{background:var(--ds-chat-hover)}.GlbDda_groupBackdrop{z-index:1100;background:var(--ds-chat-scrim);backdrop-filter:blur(5px);place-items:center;padding:24px;display:grid;position:fixed;inset:0}.GlbDda_groupDialog{box-sizing:border-box;overscroll-behavior:contain;border:var(--ds-chat-hairline) solid var(--ds-chat-border);width:min(860px,100vw - 48px);max-height:min(720px,100vh - 48px);color:var(--ds-chat-text-color);background-color:canvas;background-image:linear-gradient(var(--ds-chat-surface), var(--ds-chat-surface));border-radius:24px;flex-direction:column;display:flex;overflow:hidden;box-shadow:0 28px 90px #00000038}.GlbDda_groupFormGrid{grid-template-columns:minmax(0,1fr) minmax(0,1.45fr);gap:0 16px;padding:0 28px;display:grid}.GlbDda_groupFormGrid .GlbDda_generatePrompt{grid-column:2;justify-self:end;margin-top:-6px}.GlbDda_groupIdentityEditor{align-items:center;gap:12px;padding:4px 0 8px;display:flex}.GlbDda_groupIdentityEditor>div{gap:2px;display:grid}.GlbDda_groupIdentityEditor strong{font-size:var(--ds-chat-text-body)}.GlbDda_groupIdentityEditor small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_groupAvatarLibrary{gap:7px;padding:4px 2px 10px;display:flex;overflow-x:auto}.GlbDda_groupAvatarLibrary button{box-sizing:border-box;cursor:pointer;background:0 0;border:2px solid #0000;border-radius:50%;flex:0 0 40px;place-items:center;width:40px;height:40px;padding:3px;display:grid}.GlbDda_groupAvatarLibrary button[data-selected=true]{border-color:var(--ds-chat-info);background:color-mix(in srgb, var(--ds-chat-info) 10%, transparent)}.GlbDda_workspaceBindings{border:var(--ds-chat-hairline) solid var(--ds-chat-border);background:color-mix(in srgb, var(--ds-chat-fill-quaternary) 72%, transparent);border-radius:16px;grid-column:1/-1;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin-top:12px;padding:12px;display:grid}.GlbDda_bindingHeader{grid-column:1/-1;justify-content:space-between;align-items:center;gap:12px;margin-bottom:2px;display:flex}.GlbDda_bindingHeader>span{gap:2px;min-width:0;display:grid}.GlbDda_bindingHeader strong{font-size:var(--ds-chat-text-footnote)}.GlbDda_bindingHeader small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_bindingHeader button{color:var(--ds-chat-accent-solid);cursor:pointer;font:inherit;font-size:var(--ds-chat-text-caption);background:0 0;border:0}.GlbDda_workspaceBindings>button:not(.GlbDda_bindingHeader){border:var(--ds-chat-hairline) solid var(--ds-chat-border);min-width:0;color:inherit;background:var(--ds-chat-surface);text-align:left;cursor:pointer;font:inherit;border-radius:12px;grid-template-columns:24px minmax(0,1fr) 20px;align-items:center;gap:8px;padding:9px;display:grid}.GlbDda_workspaceBindings>button[data-selected=true]{border-color:var(--ds-chat-accent-border);background:var(--ds-chat-accent-soft)}.GlbDda_workspaceBindings>button>span{gap:2px;min-width:0;display:grid}.GlbDda_workspaceBindings>button strong,.GlbDda_workspaceBindings>button small{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.GlbDda_workspaceBindings>button strong{font-size:var(--ds-chat-text-caption)}.GlbDda_workspaceBindings>button small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_workspaceBindings>button b{color:var(--ds-chat-accent-solid);text-align:center}.GlbDda_generatePrompt{border:1px solid var(--ds-chat-accent-border);min-height:32px;color:var(--ds-chat-accent-text);background:var(--ds-chat-accent-soft);cursor:pointer;font:inherit;font-size:var(--ds-chat-text-caption);font-weight:var(--ds-chat-weight-semibold);border-radius:10px;padding:0 11px}.GlbDda_generatePrompt:disabled{opacity:.45;cursor:not-allowed}.GlbDda_memberToolbar{align-items:center;gap:14px;padding:16px 28px 10px;display:flex}.GlbDda_memberToolbar>div{gap:2px;min-width:0;display:grid}.GlbDda_memberToolbar strong{font-size:var(--ds-chat-text-body)}.GlbDda_memberToolbar small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_memberToolbar input{border:var(--ds-chat-hairline) solid var(--ds-chat-border);min-width:180px;height:36px;color:inherit;background:var(--ds-chat-fill-quaternary);font:inherit;font-size:var(--ds-chat-text-caption);border-radius:11px;outline:none;margin-left:auto;padding:0 12px}.GlbDda_memberToolbar input:focus{border-color:var(--ds-chat-accent-solid);box-shadow:0 0 0 3px var(--ds-chat-accent-soft)}.GlbDda_groupHeader{justify-content:space-between;padding:26px 28px 18px;display:flex}.GlbDda_groupHeader h2{margin:0;font-size:22px}.GlbDda_groupHeader p{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-body);margin:8px 0 0}.GlbDda_groupCandidates,.GlbDda_groupSelected{min-height:0;padding:4px 28px 16px;overflow-y:auto}.GlbDda_pickRow{border:var(--ds-chat-hairline) solid transparent;width:100%;color:inherit;text-align:left;cursor:pointer;background:0 0;border-radius:14px;grid-template-columns:38px minmax(0,1fr) 34px;align-items:center;gap:10px;margin-bottom:6px;padding:9px;display:grid}.GlbDda_pickRow:hover{background:var(--ds-chat-hover)}.GlbDda_pickRow[data-included=true]{border-color:var(--ds-chat-accent-border);background:var(--ds-chat-accent-soft)}.GlbDda_pickRow>b{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-title1);text-align:center;font-weight:400}.GlbDda_pickRow[data-disabled=true]{opacity:.52;cursor:not-allowed}.GlbDda_pickCopy{gap:2px;min-width:0;display:grid}.GlbDda_pickCopy strong,.GlbDda_pickCopy small{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.GlbDda_pickCopy strong{font-size:var(--ds-chat-text-body)}.GlbDda_pickCopy small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_groupFooter{justify-content:flex-end;gap:10px;padding:20px 28px 24px;display:flex}.GlbDda_secondary,.GlbDda_create{min-width:86px;height:38px;font:inherit;font-weight:var(--ds-chat-weight-semibold);cursor:pointer;border:0;border-radius:12px}.GlbDda_secondary{color:var(--ds-chat-text-secondary);background:0 0}.GlbDda_create{color:var(--ds-chat-on-accent);background:var(--ds-chat-accent-solid)}.GlbDda_create:disabled{opacity:.42;cursor:not-allowed}.GlbDda_marketResult{border:1px dashed var(--ds-chat-accent-border);background:color-mix(in srgb, var(--ds-chat-fill-quaternary) 74%, transparent);border-radius:14px;grid-template-columns:38px minmax(0,1fr) auto;align-items:center;gap:10px;margin-bottom:6px;padding:9px;display:grid}.GlbDda_marketResult .GlbDda_copy{gap:2px;min-width:0;display:grid}.GlbDda_marketResult strong,.GlbDda_marketResult small{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.GlbDda_marketResult strong{font-size:var(--ds-chat-text-footnote)}.GlbDda_marketResult small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_marketActions{gap:6px;display:flex}.GlbDda_marketActions button{border:var(--ds-chat-hairline) solid var(--ds-chat-border);height:30px;color:var(--ds-chat-text-secondary);background:var(--ds-chat-surface);cursor:pointer;font:inherit;font-size:var(--ds-chat-text-caption);border-radius:9px;padding:0 9px}.GlbDda_marketActions .GlbDda_installJoin{color:var(--ds-chat-on-accent);border-color:var(--ds-chat-accent-solid);background:var(--ds-chat-accent-solid)}.GlbDda_marketActions button:disabled{opacity:.5;cursor:default}.GlbDda_hoverProfile{gap:7px;max-width:300px;line-height:1.45;display:grid}.GlbDda_hoverProfile strong{color:var(--ds-chat-on-accent);font-size:var(--ds-chat-text-body)}.GlbDda_hoverProfile span{color:var(--ds-chat-code-fg);font-size:var(--ds-chat-text-caption)}.GlbDda_hoverProfile small{color:var(--ds-chat-code-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_hoverProfile a{color:var(--ds-chat-accent-bright);font-size:var(--ds-chat-text-caption);text-decoration:none}.GlbDda_projectPanelIcon{width:44px;height:44px;color:var(--ds-chat-accent-solid);background:var(--ds-chat-row-selected);border-radius:15px;place-items:center;display:grid}.GlbDda_projectFileList{gap:5px;margin-top:18px;display:grid}.GlbDda_projectFileList button{color:inherit;text-align:left;cursor:pointer;font:inherit;font-size:var(--ds-chat-text-footnote);background:0 0;border:0;border-radius:11px;grid-template-columns:22px minmax(0,1fr);align-items:center;gap:8px;padding:10px;display:grid}.GlbDda_projectFileList button:hover{background:var(--ds-chat-hover)}.GlbDda_headerTools{align-items:center;gap:6px;min-width:0;display:flex}.GlbDda_headerIdentity,.GlbDda_headerActionsCluster{align-items:center;min-width:0;display:flex}.GlbDda_headerIdentity{gap:var(--ds-chat-space-2);align-items:center}.GlbDda_headerIdentity .GlbDda_animalAvatar,.GlbDda_headerAvatarStack span>span{box-shadow:0 0 0 2px var(--ds-chat-surface)}.GlbDda_headerActionsCluster{flex:none;gap:6px}.GlbDda_headerAvatarStack{align-items:center;min-width:42px;padding-left:3px;display:flex}.GlbDda_headerAvatarStack>span{margin-left:-8px;display:inline-flex}.GlbDda_headerAvatarStack>span:first-child{margin-left:0}.GlbDda_headerAvatarStack .GlbDda_animalAvatar{width:34px;height:34px;box-shadow:var(--ds-chat-shadow-2)}.GlbDda_headerIdentityCopy{gap:2px;min-width:0;display:grid}.GlbDda_headerIdentityCopy strong{color:var(--ds-chat-text-color);font-size:var(--ds-chat-text-callout);font-weight:var(--ds-chat-weight-bold);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.GlbDda_headerIdentityCopy small{max-width:260px;color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.GlbDda_workbenchDrawer,.GlbDda_sidecarDrawer{box-sizing:border-box;border-left:var(--ds-chat-hairline) solid var(--ds-chat-border);background-color:canvas;background-image:linear-gradient(var(--ds-chat-surface), var(--ds-chat-surface));width:min(760px,100vw - 84px);height:100%;box-shadow:var(--ds-chat-shadow-2);flex-direction:column;display:flex}.GlbDda_workbenchHeader,.GlbDda_sidecarHeader{border-bottom:var(--ds-chat-hairline) solid var(--ds-chat-border);grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:12px;min-height:66px;padding:10px 14px;display:grid}.GlbDda_workbenchHeader>span:nth-child(2),.GlbDda_sidecarHeader>span:first-child{gap:2px;min-width:0;display:grid}.GlbDda_workbenchHeader strong,.GlbDda_sidecarHeader strong{font-size:var(--ds-chat-text-callout)}.GlbDda_workbenchHeader small,.GlbDda_sidecarHeader small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.GlbDda_fileWorkbench{flex:1;grid-template-columns:minmax(210px,34%) minmax(0,1fr);min-height:0;display:grid}.GlbDda_fileBrowser{border-right:var(--ds-chat-hairline) solid var(--ds-chat-border);background:var(--ds-chat-fill-quaternary);min-width:0;padding:12px;overflow:auto}.GlbDda_pathBar{color:var(--ds-chat-muted);background:var(--ds-chat-surface);text-overflow:ellipsis;white-space:nowrap;border-radius:10px;margin-bottom:10px;padding:8px 10px;font:11px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;overflow:hidden}.GlbDda_projectFileList{margin-top:0}.GlbDda_projectFileList button[data-selected=true]{color:var(--ds-chat-accent-text);background:var(--ds-chat-accent-soft)}.GlbDda_filePreview{background:var(--ds-chat-code-bg);min-width:0;color:var(--ds-chat-code-fg);flex-direction:column;display:flex;overflow:auto}.GlbDda_filePreviewMeta{border-bottom:var(--ds-chat-hairline) solid var(--ds-chat-code-border);background:var(--ds-chat-code-bg-raised);justify-content:space-between;align-items:center;gap:12px;padding:11px 14px;display:flex}.GlbDda_filePreviewMeta strong{font-size:var(--ds-chat-text-footnote);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.GlbDda_filePreviewMeta small{color:var(--ds-chat-code-muted);font-size:var(--ds-chat-text-caption);flex:none}.GlbDda_filePreview pre,.GlbDda_terminalOutput{white-space:pre-wrap;overflow-wrap:anywhere;flex:1;margin:0;padding:16px;font:12px/1.65 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;overflow:auto}.GlbDda_drawerEmpty{color:var(--ds-chat-code-muted);font-size:var(--ds-chat-text-footnote);text-align:center;flex:1;place-items:center;padding:24px;display:grid}.GlbDda_terminalWorkbench{background:var(--ds-chat-code-bg);min-height:0;color:var(--ds-chat-code-fg);flex-direction:column;flex:1;display:flex}.GlbDda_terminalOutput{min-height:0;color:var(--ds-chat-code-fg)}.GlbDda_terminalComposer{border-top:1px solid var(--ds-chat-code-border);background:var(--ds-chat-code-bg-raised);grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:8px;padding:10px 12px;display:grid}.GlbDda_terminalComposer span{color:var(--ds-chat-accent-bright);font:13px ui-monospace,SFMono-Regular,Menlo,monospace}.GlbDda_terminalComposer input{min-width:0;color:var(--ds-chat-code-fg);background:0 0;border:0;outline:0;font:12px ui-monospace,SFMono-Regular,Menlo,monospace}.GlbDda_terminalComposer button,.GlbDda_browserBar button{border:var(--ds-chat-hairline) solid var(--ds-chat-code-border);height:32px;color:var(--ds-chat-code-fg);background:var(--ds-chat-code-bg-raised);cursor:pointer;border-radius:9px;padding:0 11px}.GlbDda_terminalComposer button:disabled,.GlbDda_browserBar button:disabled{opacity:.42;cursor:default}.GlbDda_browserWorkbench{background:var(--ds-chat-fill-quaternary);flex-direction:column;flex:1;min-height:0;display:flex}.GlbDda_browserBar{border-bottom:var(--ds-chat-hairline) solid var(--ds-chat-border);background:var(--ds-chat-surface);grid-template-columns:34px 34px 34px minmax(0,1fr) auto;gap:6px;padding:10px;display:grid}.GlbDda_browserBar button{color:var(--ds-chat-text-color);background:var(--ds-chat-fill-quaternary)}.GlbDda_browserBar input{border:var(--ds-chat-hairline) solid var(--ds-chat-border);min-width:0;color:inherit;background:var(--ds-chat-fill-quaternary);border-radius:10px;outline:0;padding:0 11px;font:12px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace}.GlbDda_browserFrame{background:canvas;border:0;flex:1;width:100%;min-height:0}.GlbDda_workbenchFootnote{border-top:var(--ds-chat-hairline) solid var(--ds-chat-border);color:var(--ds-chat-muted);background:var(--ds-chat-surface);font-size:var(--ds-chat-text-caption);padding:8px 12px}.GlbDda_workbenchFootnote a{color:var(--ds-chat-accent-solid)}.GlbDda_sidecarDrawer{z-index:54;width:min(390px,100vw - 64px);position:fixed;top:0;right:0}.GlbDda_sidecarMessages{background:color-mix(in srgb, var(--ds-chat-fill-quaternary) 74%, var(--ds-chat-surface));flex-direction:column;flex:1;gap:10px;min-height:0;padding:16px;display:flex;overflow:auto}.GlbDda_sidecarMessage{border:var(--ds-chat-hairline) solid var(--ds-chat-border);background:var(--ds-chat-surface);max-width:88%;box-shadow:var(--ds-chat-shadow-1);font-size:var(--ds-chat-text-body);white-space:pre-wrap;border-radius:16px 16px 16px 5px;padding:10px 12px;line-height:1.55}.GlbDda_sidecarMessage[data-role=user]{border-color:var(--ds-chat-accent-soft-strong);background:var(--ds-chat-accent-soft);border-radius:16px 16px 5px;align-self:flex-end}.GlbDda_sidecarThinking,.GlbDda_sidecarError{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-footnote);align-self:flex-start}.GlbDda_sidecarError{color:var(--ds-chat-danger)}.GlbDda_sidecarWelcome{color:var(--ds-chat-text-secondary);text-align:center;place-items:center;margin:auto;padding:28px;display:grid}.GlbDda_sidecarWelcome>span{width:46px;height:46px;color:var(--ds-chat-on-accent);background:var(--ds-chat-accent-solid);box-shadow:0 10px 22px color-mix(in srgb, var(--ds-chat-accent-solid) 24%, transparent);font-size:var(--ds-chat-text-title1);border-radius:50%;place-items:center;margin-bottom:12px;display:grid}.GlbDda_sidecarWelcome strong{font-size:var(--ds-chat-text-title3)}.GlbDda_sidecarWelcome p{max-width:260px;color:var(--ds-chat-muted);font-size:var(--ds-chat-text-footnote);margin:7px 0 0;line-height:1.55}.GlbDda_sidecarComposer{border-top:var(--ds-chat-hairline) solid var(--ds-chat-border);background:var(--ds-chat-surface);gap:9px;padding:12px;display:grid}.GlbDda_sidecarComposer textarea{resize:none;border:var(--ds-chat-hairline) solid var(--ds-chat-border);min-height:78px;color:inherit;background:var(--ds-chat-fill-quaternary);border-radius:14px;outline:0;padding:11px 12px;font:13px/1.5 inherit}.GlbDda_sidecarComposer button{min-width:72px;height:34px;color:var(--ds-chat-on-accent);background:var(--ds-chat-accent,var(--ds-chat-accent-solid));box-shadow:0 5px 12px color-mix(in srgb, var(--ds-chat-accent-solid) 20%, transparent);cursor:pointer;font:inherit;font-size:var(--ds-chat-text-footnote);font-weight:var(--ds-chat-weight-semibold);border:0;border-radius:10px;justify-self:end}.GlbDda_sidecarComposer button:disabled{opacity:.45;cursor:default}html[data-skill-chat-sidecar=true] [data-slot=conversation]{margin-right:min(390px,100vw - 64px);transition:margin-right .18s}@media (width<=860px){.GlbDda_headerIdentityCopy small{display:none}.GlbDda_headerActionsCluster{gap:4px}.GlbDda_headerTools{max-width:calc(100% - 96px);left:auto;right:8px}.GlbDda_headerTextButton{display:none}.GlbDda_fileWorkbench{grid-template-columns:42% minmax(0,1fr)}}@media (width<=680px){.GlbDda_headerIdentityCopy,.GlbDda_headerAvatarStack{display:none}.GlbDda_headerTools{justify-content:flex-end}.GlbDda_workbenchDrawer{width:100vw}.GlbDda_fileWorkbench{grid-template-rows:minmax(180px,38%) minmax(0,1fr);grid-template-columns:1fr}.GlbDda_fileBrowser{border-right:0;border-bottom:var(--ds-chat-hairline) solid var(--ds-chat-border)}.GlbDda_sidecarDrawer{width:calc(100vw - 40px)}html[data-skill-chat-sidecar=true] [data-slot=conversation]{margin-right:0}}.GlbDda_panel.GlbDda_groupSettingsPanel[data-level=raised]{border-color:color-mix(in srgb, var(--ds-chat-border-strong) 88%, transparent);background-color:canvas;background-image:linear-gradient(var(--ds-chat-surface), var(--ds-chat-surface));width:min(620px,100vw - 32px);box-shadow:var(--ds-chat-shadow-3);backdrop-filter:none}.GlbDda_panel.GlbDda_skillProfileDialog[data-level=raised]{background-color:canvas;background-image:linear-gradient(var(--ds-chat-surface), var(--ds-chat-surface));width:min(460px,100vw - 32px);height:auto;max-height:min(680px,100vh - 32px);box-shadow:var(--ds-chat-shadow-3);backdrop-filter:none}.GlbDda_groupSettingsPanel .GlbDda_field,.GlbDda_groupSettingsPanel .GlbDda_generatePrompt,.GlbDda_groupSettingsPanel .GlbDda_workspaceBindings,.GlbDda_groupSettingsPanel .GlbDda_panelHint,.GlbDda_groupSettingsPanel .GlbDda_profileActions{margin-left:20px;margin-right:20px}.GlbDda_groupSettingsPanel .GlbDda_panelTop{min-height:46px;margin:0 20px 14px}.GlbDda_groupSettingsPanel .GlbDda_groupAvatarLibrary{margin:0 20px 4px}.GlbDda_groupSettingsPanel .GlbDda_memberToolbar{padding-left:20px;padding-right:20px}.GlbDda_groupSettingsPanel .GlbDda_roomMemberGrid{padding:0 12px 12px}@media (width<=720px){.GlbDda_groupFormGrid{grid-template-columns:1fr}.GlbDda_groupFormGrid .GlbDda_generatePrompt{grid-column:1}.GlbDda_workspaceBindings{grid-template-columns:1fr}.GlbDda_memberToolbar{flex-direction:column;align-items:stretch}.GlbDda_memberToolbar input{box-sizing:border-box;width:100%;margin-left:0}.GlbDda_marketResult{grid-template-columns:34px minmax(0,1fr)}.GlbDda_marketActions{grid-column:1/-1;justify-content:flex-end}}@media (width<=1120px){.GlbDda_headerRoomMeta{display:none}.GlbDda_headerTools{gap:3px;max-width:calc(100% - 140px)}.GlbDda_headerIdentity{gap:var(--ds-chat-space-2);align-items:center}.GlbDda_headerIdentity .GlbDda_animalAvatar,.GlbDda_headerAvatarStack span>span{box-shadow:0 0 0 2px var(--ds-chat-surface)}.GlbDda_headerDivider:first-of-type{display:none}.GlbDda_headerTextButton{text-overflow:ellipsis;white-space:nowrap;max-width:76px;overflow:hidden}}@media (width<=760px){.GlbDda_blankRoomDock{left:64px;right:8px}.GlbDda_headerTextButton{display:none}}[data-slot=conversation]{background:var(--ds-chat-fill-quaternary)}[data-slot=\"conversation.session.header\"]{background:var(--ds-chat-surface);backdrop-filter:none}[data-conversation-scroll]{background:radial-gradient(circle at 10% 20%, var(--ds-chat-accent-soft), transparent 24%), var(--ds-chat-fill-quaternary)}[data-chat-flow]{padding-block:20px 28px}[data-chat-flow-kind=assistant-step]:has([data-assistant-reply]){border:var(--ds-chat-hairline) solid var(--ds-chat-border);background:var(--ds-chat-surface);width:fit-content;max-width:78%;box-shadow:var(--ds-chat-shadow-1);border-radius:18px 18px 18px 6px;padding:12px 16px}[data-composer-seat]{background:linear-gradient(180deg, transparent, var(--ds-chat-fill-quaternary) 28%)}@media (width<=760px){.GlbDda_groupBackdrop{place-items:stretch stretch;padding:0}.GlbDda_groupDialog{border-radius:0;width:100%;max-height:100%}.GlbDda_groupPicker{grid-template-columns:1fr}.GlbDda_groupSelected{display:none}.GlbDda_groupName{grid-template-columns:1fr}}.GlbDda_modeBar{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);align-items:center;gap:4px;padding:0 14px 10px;display:flex}.GlbDda_modeBar span{margin-right:auto}.GlbDda_modeBar button,.GlbDda_subtabs button{color:var(--ds-chat-muted);font:inherit;cursor:pointer;background:0 0;border:0;border-radius:999px;padding:4px 8px}.GlbDda_subtabs{gap:6px;padding:0 12px 10px;display:flex}.GlbDda_subtabs button{font-size:var(--ds-chat-text-footnote);border-radius:10px;flex:1;padding:7px 10px}.GlbDda_notice{color:var(--ds-chat-warning);background:var(--ds-chat-warning-soft);font:inherit;font-size:var(--ds-chat-text-caption);text-align:left;cursor:pointer;border:0;border-radius:10px;margin:0 12px 10px;padding:8px 10px}.GlbDda_favoriteMark{color:var(--ds-chat-warning);font-size:var(--ds-chat-text-body)}.GlbDda_avatar[data-persona=true]{font-size:var(--ds-chat-text-title1)}.GlbDda_externalRow .GlbDda_copy{overflow:hidden}.GlbDda_externalRow .GlbDda_name{font-size:var(--ds-chat-text-footnote);display:block}.GlbDda_externalRow .GlbDda_description{font-size:var(--ds-chat-text-caption);gap:6px;display:flex}.GlbDda_externalRow .GlbDda_description b{color:var(--ds-chat-accent-solid);font-weight:var(--ds-chat-weight-semibold)}.GlbDda_panelHint{color:var(--ds-chat-accent-text);background:var(--ds-chat-accent-soft);font-size:var(--ds-chat-text-caption);border-radius:12px;margin-top:18px;padding:10px 12px;line-height:1.5}.GlbDda_danger{width:100%;color:var(--ds-chat-danger);font:inherit;cursor:pointer;background:0 0;border:0;margin-top:10px}[data-chat-flow-kind=assistant-step]:has([data-assistant-reply]){margin-left:46px;position:relative;margin-top:30px!important}[data-chat-flow-kind=assistant-step]:has([data-assistant-reply]):before{content:var(--skill-chat-active-avatar,\"🤖\");clip-path:circle(50%);background:var(--ds-chat-accent-soft-strong);width:34px;height:34px;box-shadow:inset 0 0 0 var(--ds-chat-hairline) var(--ds-chat-accent-border);font-size:var(--ds-chat-text-title2);border:0;border-radius:50%;place-items:center;line-height:1;display:grid;position:absolute;top:0;left:-46px}[data-chat-flow-kind=assistant-step][data-skill-responder]:has([data-assistant-reply]):after{content:attr(data-skill-responder);z-index:2;box-sizing:border-box;width:max-content;max-width:calc(100% - 12px);min-height:18px;color:var(--ds-chat-muted);background:var(--ds-chat-fill-quaternary);font-size:var(--ds-chat-text-caption);font-weight:var(--ds-chat-weight-semibold);text-align:left;white-space:nowrap;padding:1px 8px 1px 0;line-height:16px;position:absolute;top:-24px;left:0}[data-assistant-reply] [data-assistant-reasoning]{display:none}[data-chat-flow-kind=system-prompt],[data-chat-flow-kind=context],[data-chat-flow-kind=turn-tail]{display:none}[data-chat-flow-kind=user]{margin-right:46px;position:relative}[data-chat-flow-kind=user]:after{content:\"我\";clip-path:circle(50%);width:34px;height:34px;color:var(--ds-chat-accent-text);background:var(--ds-chat-accent-soft-strong);box-shadow:inset 0 0 0 var(--ds-chat-hairline) #00000014;font-size:var(--ds-chat-text-footnote);font-weight:var(--ds-chat-weight-bold);border-radius:50%;place-items:center;display:grid;position:absolute;top:0;right:-46px}[data-chat-flow-kind=turn-error]{border:var(--ds-chat-hairline) solid color-mix(in srgb, var(--ds-chat-danger) 24%, transparent);background:var(--ds-chat-surface);width:fit-content;max-width:78%;box-shadow:var(--ds-chat-shadow-1);border-radius:18px 18px 18px 6px;margin-left:46px;padding:12px 16px;position:relative}[data-chat-flow-kind=turn-error]:before{content:var(--skill-chat-active-avatar,\"🤖\");background:var(--ds-chat-accent-soft-strong);width:34px;height:34px;box-shadow:inset 0 0 0 var(--ds-chat-hairline) var(--ds-chat-accent-border);font-size:var(--ds-chat-text-title2);border:0;border-radius:50%;place-items:center;line-height:1;display:grid;position:absolute;top:0;left:-46px}.GlbDda_root{width:100%;min-width:0;overflow:hidden}.GlbDda_workspaceSection{min-width:0;margin:2px 8px 8px}.GlbDda_workspaceSection .GlbDda_workspaceBar{border-color:color-mix(in srgb, var(--ds-chat-border-strong) 78%, transparent);background:color-mix(in srgb, var(--ds-chat-surface) 86%, transparent);min-width:0;height:38px;box-shadow:0 1px 2px var(--ds-chat-accent-soft);border-radius:10px;margin:0;padding:0 7px 0 9px}.GlbDda_workspaceSection .GlbDda_workspaceBar select{width:100%;font-size:var(--ds-chat-text-body);font-weight:var(--ds-chat-weight-medium);text-overflow:ellipsis;overflow:hidden}.GlbDda_workspaceSection .GlbDda_workspaceBar button{background:0 0;border-radius:7px;width:26px;height:26px}.GlbDda_topbar{border-bottom:var(--ds-chat-hairline) solid color-mix(in srgb, var(--ds-chat-border-strong) 70%, transparent);gap:4px;min-width:0;padding:0 8px}.GlbDda_topbar .GlbDda_tabs{background:0 0;border-radius:0;gap:0;height:38px;margin:0;padding:0}.GlbDda_topbar .GlbDda_tab{height:38px;font-size:var(--ds-chat-text-body);border-radius:0;position:relative}.GlbDda_topbar .GlbDda_tab[data-active=true]{color:var(--ds-chat-text-color);box-shadow:none;font-weight:var(--ds-chat-weight-semibold);background:0 0}.GlbDda_topbar .GlbDda_tab[data-active=true]:after{content:\"\";background:var(--ds-chat-accent-solid);border-radius:999px;height:2px;position:absolute;bottom:-1px;left:22%;right:22%}.GlbDda_addGroup{width:30px;height:30px;font-size:var(--ds-chat-text-title1);border-radius:8px}.GlbDda_modeBar{border-bottom:var(--ds-chat-hairline) solid color-mix(in srgb, var(--ds-chat-border-strong) 45%, transparent);min-width:0;padding:9px 12px 8px}.GlbDda_modeBar button,.GlbDda_subtabs button{border-radius:7px}.GlbDda_modeBar button[data-active=true],.GlbDda_subtabs button[data-active=true]{color:var(--ds-chat-accent-solid);background:var(--ds-chat-accent-soft)}.GlbDda_list{flex:1;min-width:0;padding:0 6px 16px;overflow-x:hidden}.GlbDda_row{box-sizing:border-box;border-radius:9px;grid-template-columns:40px minmax(0,1fr) auto;gap:10px;min-width:0;padding:8px;overflow:hidden}.GlbDda_row[data-current=true]{box-shadow:none;background:color-mix(in srgb, var(--ds-chat-accent-solid) 10%, var(--ds-chat-surface))}.GlbDda_avatar{aspect-ratio:1;clip-path:circle(50%);width:40px;min-width:40px;max-width:40px;height:40px;min-height:40px;max-height:40px;box-shadow:none;border-radius:9999px}.GlbDda_copy,.GlbDda_nameLine,.GlbDda_name,.GlbDda_description{min-width:0;max-width:100%}.GlbDda_nameLine{overflow:hidden}.GlbDda_name{flex:auto}.GlbDda_source{text-overflow:ellipsis;white-space:nowrap;max-width:72px;overflow:hidden}.GlbDda_description{display:block}.GlbDda_groupAvatar{aspect-ratio:1;letter-spacing:0;border-radius:50%;width:46px;min-width:46px;max-width:46px;height:46px;min-height:46px;max-height:46px}.GlbDda_search{border-radius:9px;height:34px}.GlbDda_subtabs{padding:0 10px 8px}.GlbDda_notice{border-radius:8px;margin:8px 10px 0}.GlbDda_memberPicker .GlbDda_avatar,.GlbDda_memberRow .GlbDda_avatar{width:34px;height:34px;font-size:var(--ds-chat-text-title2);border-radius:50%;flex:none}.GlbDda_profileCover .GlbDda_close{background:var(--ds-chat-fill-primary);position:absolute;top:12px;right:12px}.GlbDda_profileActions{grid-template-columns:1fr 1fr;gap:8px;margin-top:20px;display:grid}.GlbDda_profileActions .GlbDda_primary{margin:0}.GlbDda_secondaryAction{border:var(--ds-chat-hairline) solid var(--ds-chat-border);color:var(--ds-chat-text-color);background:var(--ds-chat-surface);cursor:pointer;font:inherit;font-size:var(--ds-chat-text-footnote);font-weight:var(--ds-chat-weight-semibold);border-radius:11px}[data-chat-flow-kind=assistant-step]:has([data-assistant-reply]):before{content:var(--skill-message-avatar,var(--skill-chat-active-avatar,\"🤖\"))}@media (width<=1100px){.GlbDda_conversationGroupPanel{display:none}}.GlbDda_workspacePicker{grid-template-columns:minmax(0,1fr) 34px;gap:8px;display:grid;position:relative}.GlbDda_workspaceTrigger,.GlbDda_workspaceAdd{border:var(--ds-chat-hairline) solid color-mix(in srgb, var(--ds-chat-border-strong) 82%, var(--ds-chat-accent-solid));min-width:0;height:42px;color:var(--ds-chat-text-color);background:var(--ds-chat-surface);box-shadow:var(--ds-chat-shadow-1);font:inherit;cursor:pointer;border-radius:14px}.GlbDda_workspaceTrigger{text-align:left;grid-template-columns:24px minmax(0,1fr) 18px;align-items:center;gap:8px;padding:0 11px;display:grid}.GlbDda_workspaceTrigger>span:nth-child(2){font-size:var(--ds-chat-text-footnote);font-weight:var(--ds-chat-weight-semibold);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.GlbDda_chevron{color:var(--ds-chat-muted);text-align:center}.GlbDda_workspaceMenu{z-index:40;border:var(--ds-chat-hairline) solid var(--ds-chat-border);background:var(--ds-chat-surface);box-shadow:0 16px 36px var(--ds-chat-accent-soft);border-radius:14px;gap:4px;padding:6px;display:grid;position:absolute;top:48px;left:0;right:42px}.GlbDda_workspaceMenu button{min-width:0;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:10px;grid-template-columns:20px minmax(0,1fr) 18px;align-items:center;gap:7px;padding:9px;display:grid}.GlbDda_workspaceMenu button:hover,.GlbDda_workspaceMenu button[data-active=true]{background:var(--ds-chat-hover)}.GlbDda_workspaceMenu strong{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.GlbDda_workspaceMenu b{color:var(--ds-chat-accent-solid)}.GlbDda_generalAvatar{box-sizing:border-box;border:var(--ds-chat-hairline) solid var(--ds-chat-border);width:40px;height:40px;color:var(--ds-chat-accent-text);background:var(--ds-chat-surface-sunken,var(--ds-chat-hover));box-shadow:none;font-size:var(--ds-chat-text-title3);border-radius:12px;flex:none;place-items:center;display:grid}.GlbDda_generalAvatar[data-compact=true]{width:30px;height:30px;font-size:var(--ds-chat-text-body);border-radius:9px}.GlbDda_historyRow .GlbDda_avatar,.GlbDda_historyRow .GlbDda_generalAvatar{width:32px;height:32px}.GlbDda_profileActions>button{box-sizing:border-box;align-self:stretch;width:100%;min-height:42px;margin:0}.GlbDda_profileActions>button:last-child:nth-child(3){grid-column:1/-1}[data-skill-chat-root] button:focus-visible,[data-skill-chat-root] input:focus-visible,[data-skill-chat-root] textarea:focus-visible{outline:2px solid var(--ds-chat-accent-border);outline-offset:2px}@media (prefers-reduced-motion:reduce){.GlbDda_generalChatButton{transition:none}}[data-skill-chat-welcome]{border:var(--ds-chat-hairline) solid var(--ds-chat-border);background:var(--ds-chat-surface);width:min(560px,100vw - 380px);box-shadow:var(--ds-chat-shadow-1);border-radius:18px;padding:22px 28px 18px}html[data-ds-chat-room]:not([data-ds-chat-room=general]) [data-skill-chat-welcome]:before{content:\"\";border:var(--ds-chat-hairline) solid var(--ds-chat-border);background:var(--ds-chat-speaker-avatar) center / cover no-repeat, var(--ds-chat-hover);border-radius:50%;width:52px;height:52px;margin:0 auto 12px;display:block}[data-skill-chat-welcome]:after{content:attr(data-skill-chat-hint);color:var(--ds-chat-muted);font-size:var(--ds-chat-text-footnote);text-align:center;margin-top:8px;display:block}[data-skill-chat-welcome] [class*=headline]{justify-content:center}@media (width<=760px){[data-skill-chat-welcome]{width:calc(100vw - 32px);padding:20px 16px 14px}}.GlbDda_root{font-family:var(--ds-chat-font);letter-spacing:var(--ds-chat-tracking-body);-webkit-font-smoothing:antialiased}.GlbDda_sectionHeading{padding:var(--ds-chat-space-3) var(--ds-chat-space-3) var(--ds-chat-space-1);align-items:baseline}.GlbDda_sectionHeading>div{gap:0}.GlbDda_sectionHeading strong{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);font-weight:var(--ds-chat-weight-semibold);letter-spacing:.06em;text-transform:uppercase}.GlbDda_sectionHeading small{font-size:var(--ds-chat-text-caption);letter-spacing:var(--ds-chat-tracking-caption)}.GlbDda_historySection{border-top:0;margin-top:0;padding-top:0}.GlbDda_name,.GlbDda_historyRow strong,.GlbDda_roomRow .GlbDda_name{font-size:var(--ds-chat-text-body);font-weight:var(--ds-chat-weight-semibold);letter-spacing:var(--ds-chat-tracking-body)}.GlbDda_description,.GlbDda_historyRow small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-footnote);font-weight:var(--ds-chat-weight-regular);line-height:var(--ds-chat-leading-normal)}.GlbDda_workspaceSection{margin:0 var(--ds-chat-space-2) var(--ds-chat-space-2)}.GlbDda_modeBar{margin:0 var(--ds-chat-space-3) var(--ds-chat-space-2);border-radius:var(--ds-chat-radius-sm);background:var(--ds-chat-fill-quaternary);border:0;padding:3px}.GlbDda_modeBar span{padding-left:var(--ds-chat-space-2);font-size:var(--ds-chat-text-caption)}.GlbDda_modeBar button{padding:4px var(--ds-chat-space-2);border-radius:var(--ds-chat-radius-xs);font-size:var(--ds-chat-text-caption)}.GlbDda_modeBar button[data-active=true]{color:var(--ds-chat-text-color);background:var(--ds-chat-surface);box-shadow:var(--ds-chat-shadow-1)}.GlbDda_roomList{overscroll-behavior:contain;min-height:0;padding:var(--ds-chat-space-1) var(--ds-chat-space-2) var(--ds-chat-space-2);flex:1;overflow-y:auto}.GlbDda_roomList>*{content-visibility:auto;contain-intrinsic-size:auto 56px}.GlbDda_list>*{content-visibility:auto;contain-intrinsic-size:auto 58px}.GlbDda_createWrap{display:inline-flex;position:relative}.GlbDda_createMenu{z-index:30;width:216px;padding:var(--ds-chat-space-1);border:var(--ds-chat-hairline) solid var(--ds-chat-border);border-radius:var(--ds-chat-radius-md);background:var(--ds-chat-surface);box-shadow:var(--ds-chat-shadow-3);gap:2px;display:grid;position:absolute;top:calc(100% + 6px);right:0}.GlbDda_createMenu button{padding:var(--ds-chat-space-2);border-radius:var(--ds-chat-radius-sm);color:inherit;text-align:left;cursor:pointer;font:inherit;background:0 0;border:0;gap:1px;display:grid}.GlbDda_createMenu button:hover{background:var(--ds-chat-hover)}.GlbDda_createMenu strong{font-size:var(--ds-chat-text-body);font-weight:var(--ds-chat-weight-semibold)}.GlbDda_createMenu small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_workspaceMenuSep{height:var(--ds-chat-hairline);margin:var(--ds-chat-space-1) 0;background:var(--ds-chat-border)}.GlbDda_searchWrap{padding:0 var(--ds-chat-space-3) var(--ds-chat-space-2)}.GlbDda_search{box-sizing:border-box;border:var(--ds-chat-hairline) solid transparent;border-radius:var(--ds-chat-radius-control);width:100%;padding:6px var(--ds-chat-space-3);color:var(--ds-chat-text-color);background:var(--ds-chat-fill-quaternary);font:inherit;font-size:var(--ds-chat-text-footnote);outline:0}.GlbDda_search::placeholder{color:var(--ds-chat-muted)}.GlbDda_time{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);font-variant-numeric:tabular-nums;white-space:nowrap}.GlbDda_settingsSection,.GlbDda_root>:last-child:not(.GlbDda_roomList):not(.GlbDda_list){margin-top:auto}.GlbDda_settingsSection{border-top:var(--ds-chat-hairline) solid var(--ds-chat-border);padding-top:var(--ds-chat-space-2)}.GlbDda_root{touch-action:manipulation}.GlbDda_unreadBadge,.GlbDda_sectionHeading small,.GlbDda_workspaceMeta{font-variant-numeric:tabular-nums}.GlbDda_groupFormGrid{grid-template-columns:minmax(0,1fr);gap:0}.GlbDda_groupBody{flex-direction:column;flex:auto;min-height:0;display:flex}.GlbDda_groupBody .GlbDda_groupFormGrid,.GlbDda_groupBody .GlbDda_memberToolbar{flex:none}.GlbDda_groupBody .GlbDda_groupCandidates{overscroll-behavior:contain;flex:auto;min-height:192px;overflow-y:auto}.GlbDda_groupFormGrid .GlbDda_generatePrompt{margin-top:0;margin-bottom:var(--ds-chat-space-2);grid-column:1;justify-self:start}.GlbDda_groupFormGrid .GlbDda_field textarea{min-height:84px}.GlbDda_workspaceBindings{overscroll-behavior:contain;max-height:168px;overflow-y:auto}.GlbDda_groupHeader,.GlbDda_memberToolbar,.GlbDda_groupFooter{flex:none}.GlbDda_groupCandidates>*{content-visibility:auto;contain-intrinsic-size:auto 64px}.GlbDda_memberToolbar input{font-variant-numeric:tabular-nums}.GlbDda_confirmDialog{width:min(400px,100vw - 32px);padding:var(--ds-chat-space-6)}.GlbDda_confirmDialog h2{margin:0 0 var(--ds-chat-space-2);font-size:var(--ds-chat-text-title2)}.GlbDda_confirmDialog p{color:var(--ds-chat-text-secondary);font-size:var(--ds-chat-text-body);line-height:var(--ds-chat-leading-relaxed);margin:0}.GlbDda_confirmActions{justify-content:flex-end;gap:var(--ds-chat-space-2);margin-top:var(--ds-chat-space-5);display:flex}.GlbDda_groupMore{align-items:baseline;gap:var(--ds-chat-space-2);margin:0 28px var(--ds-chat-space-2);padding:var(--ds-chat-space-2) var(--ds-chat-space-3);border:var(--ds-chat-hairline) solid var(--ds-chat-border);border-radius:var(--ds-chat-radius-control);color:inherit;background:var(--ds-chat-fill-quaternary);cursor:pointer;font:inherit;font-size:var(--ds-chat-text-body);display:flex}.GlbDda_groupMore span{font-weight:var(--ds-chat-weight-semibold)}.GlbDda_groupMore small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_groupMore b{color:var(--ds-chat-muted);margin-left:auto;font-weight:400}.GlbDda_groupMore:hover{background:var(--ds-chat-hover)}.GlbDda_groupMorePanel{overscroll-behavior:contain;flex:0 auto;min-height:0;max-height:40vh;padding:0 28px;overflow-y:auto}.GlbDda_groupMorePanel .GlbDda_workspaceBindings{max-height:none;overflow:visible}.GlbDda_root{box-sizing:border-box;padding-left:2px;padding-right:14px}.GlbDda_root>*{box-sizing:border-box}.GlbDda_workspaceSection,.GlbDda_topbar,.GlbDda_searchWrap,.GlbDda_subtabs,.GlbDda_modeBar,.GlbDda_roomList,.GlbDda_list,.GlbDda_sectionHeading{margin-left:0;margin-right:0;padding-left:0;padding-right:0}.GlbDda_workspacePicker{grid-template-columns:minmax(0,1fr)}.GlbDda_roomList,.GlbDda_list,.GlbDda_searchWrap,.GlbDda_subtabs{padding-bottom:var(--ds-chat-space-2)}.GlbDda_modeBar{margin-bottom:var(--ds-chat-space-2)}.GlbDda_headerMenu{z-index:40;min-width:184px;padding:var(--ds-chat-space-1);border:var(--ds-chat-hairline) solid var(--ds-chat-border);border-radius:var(--ds-chat-radius-md);background:var(--ds-chat-surface);box-shadow:var(--ds-chat-shadow-3);gap:2px;display:grid;position:absolute;top:calc(100% + 6px);right:0}.GlbDda_headerMenu button{align-items:center;gap:var(--ds-chat-space-2);padding:7px var(--ds-chat-space-2);border-radius:var(--ds-chat-radius-sm);color:inherit;text-align:left;cursor:pointer;font:inherit;font-size:var(--ds-chat-text-body);white-space:nowrap;background:0 0;border:0;display:flex}.GlbDda_headerMenu button:hover{background:var(--ds-chat-hover)}.GlbDda_headerMenu button[data-active=true]{color:var(--ds-chat-accent-text);background:var(--ds-chat-accent-soft)}.GlbDda_headerMenu small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);font-variant-numeric:tabular-nums}.GlbDda_headerMenuSep{height:var(--ds-chat-hairline);margin:var(--ds-chat-space-1) 0;background:var(--ds-chat-border)}.GlbDda_headerMenu button[disabled]{cursor:default;opacity:1}.GlbDda_headerMenu button[disabled] span{color:var(--ds-chat-accent-text);font-weight:var(--ds-chat-weight-semibold)}.GlbDda_headerMenuHint{padding:var(--ds-chat-space-2);color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);line-height:var(--ds-chat-leading-normal);white-space:normal;display:block}.GlbDda_diffWorkbench{background:var(--ds-chat-code-bg);flex-direction:column;flex:1;min-height:0;display:flex;overflow:hidden}.GlbDda_diffView{flex-direction:column;flex:1;min-height:0;display:flex}.GlbDda_diffSummary{border-bottom:var(--ds-chat-hairline) solid var(--ds-chat-code-border);color:var(--ds-chat-code-muted);font-size:var(--ds-chat-text-caption);font-variant-numeric:tabular-nums;flex:none;padding:10px 16px}.GlbDda_diffBody{min-height:0;padding:var(--ds-chat-space-2) 0;font:12px/1.65 var(--ds-chat-font-mono);flex:1;overflow:auto}.GlbDda_diffLine{grid-template-columns:22px minmax(0,1fr);display:grid}.GlbDda_diffGutter{color:var(--ds-chat-code-muted);text-align:center;user-select:none}.GlbDda_diffText{padding-right:var(--ds-chat-space-3);color:var(--ds-chat-code-fg);white-space:pre-wrap;word-break:break-word}.GlbDda_diffLine[data-kind=add]{background:#2ea04329}.GlbDda_diffLine[data-kind=add] .GlbDda_diffText{color:#7ee2a6}.GlbDda_diffLine[data-kind=remove]{background:#f8514924}.GlbDda_diffLine[data-kind=remove] .GlbDda_diffText{color:#ff9d97}.GlbDda_diffLine[data-kind=context] .GlbDda_diffText{color:color-mix(in srgb, var(--ds-chat-code-fg) 72%, transparent)}.GlbDda_diffLine[data-kind=file]{margin-top:var(--ds-chat-space-3);border-top:var(--ds-chat-hairline) solid var(--ds-chat-code-border);background:#ffffff0a;padding:6px 0}.GlbDda_diffLine[data-kind=file] .GlbDda_diffText{color:#cdd9e5;font-weight:var(--ds-chat-weight-semibold)}.GlbDda_diffLine[data-kind=hunk] .GlbDda_diffText{color:#a5b3ff}.GlbDda_diffLine[data-kind=meta] .GlbDda_diffText{color:var(--ds-chat-code-muted)}.GlbDda_pathBar{padding:var(--ds-chat-space-2) var(--ds-chat-space-3);border-bottom:var(--ds-chat-hairline) solid var(--ds-chat-border);font-size:var(--ds-chat-text-caption);flex-wrap:wrap;align-items:center;gap:2px;display:flex}.GlbDda_pathBar button{border-radius:var(--ds-chat-radius-xs);color:var(--ds-chat-text-secondary);cursor:pointer;font:inherit;background:0 0;border:0;padding:2px 5px}.GlbDda_pathBar button:hover{color:var(--ds-chat-text-color);background:var(--ds-chat-hover)}.GlbDda_pathBar b{color:var(--ds-chat-muted);font-weight:400}.GlbDda_filePreviewBody{min-height:0;padding:var(--ds-chat-space-2) 0;font:12px/1.65 var(--ds-chat-font-mono);flex:1;overflow:auto}.GlbDda_codeLine{grid-template-columns:46px minmax(0,1fr);display:grid}.GlbDda_codeLine:hover{background:#ffffff0a}.GlbDda_codeLineNo{padding-right:var(--ds-chat-space-2);color:var(--ds-chat-code-muted);text-align:right;user-select:none;font-variant-numeric:tabular-nums}.GlbDda_codeLineText{padding-right:var(--ds-chat-space-3);color:var(--ds-chat-code-fg);white-space:pre-wrap;word-break:break-word}.GlbDda_root{background:var(--ds-chat-sidebar-ground)}.GlbDda_search{background:var(--ds-chat-surface)}.GlbDda_search:hover{background:var(--ds-chat-surface);border-color:var(--ds-chat-border)}.GlbDda_tabs{background:color-mix(in srgb, var(--ds-chat-surface) 55%, transparent)}.GlbDda_workspaceTrigger{background:var(--ds-chat-surface)}.GlbDda_roomRow[data-selected=true]{background:var(--ds-chat-surface);box-shadow:var(--ds-chat-shadow-1)}.GlbDda_createMenu,.GlbDda_headerMenu{background:var(--ds-chat-surface)}.GlbDda_profileSection{margin-top:var(--ds-chat-space-5)}.GlbDda_profileSection h3{margin:0 0 var(--ds-chat-space-2);color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);font-weight:var(--ds-chat-weight-semibold);letter-spacing:.06em;text-transform:uppercase}.GlbDda_capabilityChips{flex-wrap:wrap;gap:6px;display:flex}.GlbDda_capabilityChips span{border-radius:var(--ds-chat-radius-round);color:var(--ds-chat-accent-text);background:var(--ds-chat-accent-soft);font-size:var(--ds-chat-text-caption);padding:5px 10px}.GlbDda_profileNote{color:var(--ds-chat-text-secondary);font-size:var(--ds-chat-text-body);line-height:var(--ds-chat-leading-relaxed);margin:0}.GlbDda_profileRooms{gap:6px;display:grid}.GlbDda_profileRooms button{align-items:center;gap:var(--ds-chat-space-2);padding:var(--ds-chat-space-2);border:var(--ds-chat-hairline) solid var(--ds-chat-border);border-radius:var(--ds-chat-radius-control);color:inherit;text-align:left;cursor:pointer;font:inherit;font-size:var(--ds-chat-text-body);background:0 0;display:flex}.GlbDda_profileRooms button:hover{background:var(--ds-chat-hover)}.GlbDda_profileRooms small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);font-variant-numeric:tabular-nums;margin-left:auto}.GlbDda_profileLinks{gap:var(--ds-chat-space-3);margin-top:var(--ds-chat-space-3);display:flex}.GlbDda_profileLinks a{color:var(--ds-chat-accent-text);font-size:var(--ds-chat-text-footnote);text-decoration:none}.GlbDda_profileLinks a:hover{text-decoration:underline}.GlbDda_templateList{padding:0 var(--ds-chat-space-1);gap:6px;display:grid}.GlbDda_templateCard{padding:var(--ds-chat-space-3);border:var(--ds-chat-hairline) solid var(--ds-chat-border);border-radius:var(--ds-chat-radius-control);color:inherit;background:var(--ds-chat-surface);text-align:left;cursor:pointer;font:inherit;gap:2px;display:grid}.GlbDda_templateCard:hover:not(:disabled){border-color:var(--ds-chat-accent-border);background:var(--ds-chat-accent-soft)}.GlbDda_templateCard:disabled{opacity:.5;cursor:not-allowed}.GlbDda_templateCard strong{font-size:var(--ds-chat-text-body);font-weight:var(--ds-chat-weight-semibold)}.GlbDda_templateCard small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);line-height:var(--ds-chat-leading-normal)}.GlbDda_templateHeading{padding:var(--ds-chat-space-4) var(--ds-chat-space-1) var(--ds-chat-space-2);color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);font-weight:var(--ds-chat-weight-semibold);letter-spacing:.04em}.GlbDda_roomTile{box-sizing:border-box;border:var(--ds-chat-hairline) solid var(--ds-chat-border);background:var(--ds-chat-surface-sunken,var(--ds-chat-hover));border-radius:12px;flex:none;grid-template-columns:1fr 1fr;place-content:center;gap:1px;width:40px;height:40px;padding:2px;display:grid;overflow:hidden}.GlbDda_roomTile[data-compact]{border-radius:9px;width:30px;height:30px}.GlbDda_roomTile>*{min-width:0;min-height:0}.GlbDda_roomTile[data-count=\"1\"]{grid-template-columns:1fr}.GlbDda_roomTile[data-count=\"1\"]>*{width:100%;height:100%}.GlbDda_roomTile[data-count=\"3\"]>:first-child{grid-column:1/-1;justify-self:center}.GlbDda_roomTile>*{display:block}.GlbDda_roomTile img{border-radius:50%;width:100%;height:100%;display:block}.GlbDda_roomRowWrap{position:relative}.GlbDda_roomRowWrap[data-dragging]{opacity:.4}.GlbDda_roomRowWrap[data-drop]:before{content:\"\";z-index:1;background:var(--ds-chat-accent);border-radius:2px;height:2px;position:absolute;inset:-2px 8px auto}.GlbDda_roomMenuButton{border-radius:var(--ds-chat-radius-control);width:24px;height:24px;color:var(--ds-chat-muted);background:var(--ds-chat-surface);font:inherit;cursor:pointer;border:none;padding:0;line-height:1;display:none;position:absolute;top:6px;right:6px}.GlbDda_roomRowWrap:hover .GlbDda_roomMenuButton,.GlbDda_roomMenuButton:focus-visible{display:block}.GlbDda_roomRowWrap:hover .GlbDda_roomRow [class*=time],.GlbDda_roomRowWrap:focus-within .GlbDda_roomRow [class*=time]{visibility:hidden}.GlbDda_roomMenuButton:hover{color:var(--ds-chat-text-color);background:var(--ds-chat-hover)}.GlbDda_pinMark{color:var(--ds-chat-accent);margin-right:3px}.GlbDda_menuBackdrop{z-index:60;position:fixed;inset:0}.GlbDda_roomMenu{min-width:148px;padding:var(--ds-chat-space-1);border:var(--ds-chat-hairline) solid var(--ds-chat-border);border-radius:var(--ds-chat-radius-control);background:var(--ds-chat-surface);box-shadow:var(--ds-chat-shadow-overlay);display:grid;position:fixed}.GlbDda_roomMenu button{padding:var(--ds-chat-space-2) var(--ds-chat-space-3);border-radius:var(--ds-chat-radius-control);color:inherit;text-align:left;font:inherit;cursor:pointer;background:0 0;border:none}.GlbDda_roomMenu button:hover{background:var(--ds-chat-hover)}.GlbDda_menuDanger{color:var(--ds-chat-danger,#d9534f)}.GlbDda_archivedToggle{width:100%;margin-top:var(--ds-chat-space-3);padding:var(--ds-chat-space-2) var(--ds-chat-space-3);border-radius:var(--ds-chat-radius-control);color:var(--ds-chat-muted);font:inherit;font-size:var(--ds-chat-text-caption);cursor:pointer;background:0 0;border:none;justify-content:space-between;display:flex}.GlbDda_archivedToggle:hover{background:var(--ds-chat-hover)}.GlbDda_archivedRow{gap:var(--ds-chat-space-2);padding:var(--ds-chat-space-2) var(--ds-chat-space-3);color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);align-items:center;display:flex}.GlbDda_archivedRow>span{text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0;overflow:hidden}.GlbDda_archivedRow button{color:var(--ds-chat-accent);font:inherit;cursor:pointer;background:0 0;border:none}.GlbDda_sourcesEntry{width:100%;padding:var(--ds-chat-space-2) var(--ds-chat-space-3);border-radius:var(--ds-chat-radius-control);color:inherit;text-align:left;font:inherit;cursor:pointer;background:0 0;border:none;display:block}.GlbDda_sourcesEntry:hover{background:var(--ds-chat-hover)}.GlbDda_rootsPanel{align-content:start;gap:var(--ds-chat-space-3);display:grid}.GlbDda_rootList{gap:2px;display:grid}.GlbDda_rootRow{gap:var(--ds-chat-space-2);padding:var(--ds-chat-space-2) var(--ds-chat-space-3);border-radius:var(--ds-chat-radius-control);grid-template-columns:minmax(0,1fr) auto auto;align-items:center;display:grid}.GlbDda_rootRow:hover{background:var(--ds-chat-hover)}.GlbDda_rootRow[data-empty]{opacity:.5}.GlbDda_rootMain{gap:1px;min-width:0;display:grid}.GlbDda_rootMain small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.GlbDda_rootCount{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);font-variant-numeric:tabular-nums}.GlbDda_rootFlag{color:var(--ds-chat-accent);font-size:var(--ds-chat-text-caption)}.GlbDda_rootFooter{gap:var(--ds-chat-space-2);padding-top:var(--ds-chat-space-3);border-top:var(--ds-chat-hairline) solid var(--ds-chat-border);color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);line-height:var(--ds-chat-leading-normal);display:grid}.GlbDda_rootPath{color:var(--ds-chat-text-color);font-family:var(--ds-chat-font-mono,ui-monospace, monospace);word-break:break-all}.GlbDda_linkedList{gap:var(--ds-chat-space-1);flex-wrap:wrap;display:flex}.GlbDda_linkedChip{padding:2px var(--ds-chat-space-2);border:var(--ds-chat-hairline) solid var(--ds-chat-accent-border);background:var(--ds-chat-accent-soft);border-radius:999px;align-items:center;gap:4px;display:inline-flex}.GlbDda_linkedChip b{color:var(--ds-chat-text-color);font-weight:var(--ds-chat-weight-semibold)}.GlbDda_linkedChip button{color:var(--ds-chat-muted);font:inherit;cursor:pointer;background:0 0;border:none;line-height:1}.GlbDda_linkedChip button:hover{color:var(--ds-chat-text-color)}.GlbDda_automationEntry{align-items:center;gap:var(--ds-chat-space-2);box-sizing:border-box;width:100%;height:38px;margin-bottom:var(--ds-chat-space-1);border:var(--ds-chat-hairline) solid transparent;border-radius:var(--ds-chat-radius-control);color:var(--ds-chat-text-color);background:var(--ds-chat-hover);font:inherit;font-size:var(--ds-chat-text-body);font-weight:var(--ds-chat-weight-medium);cursor:pointer;padding:0 12px 0 14px;transition:background-color .12s,border-color .12s,color .12s;display:flex}.GlbDda_automationEntry:hover{background:var(--ds-chat-hover-strong,var(--ds-chat-row-selected))}.GlbDda_automationEntry[data-active]{border-color:var(--ds-chat-accent-border);color:var(--ds-chat-accent-text);background:var(--ds-chat-accent-soft)}.GlbDda_automationEntryMark{color:var(--ds-chat-accent-text);flex:none;font-size:15px;line-height:1}.GlbDda_automationEntryCount{background:var(--ds-chat-accent-soft-strong);min-width:20px;color:var(--ds-chat-accent-text);font-size:var(--ds-chat-text-caption);font-weight:var(--ds-chat-weight-semibold);font-variant-numeric:tabular-nums;text-align:center;border-radius:10px;margin-left:auto;padding:1px 6px;line-height:16px}.GlbDda_automationEntry[data-active] .GlbDda_automationEntryCount{background:var(--ds-chat-accent-solid);color:var(--ds-chat-on-accent)}.GlbDda_messageActions{gap:2px;display:inline-flex}.GlbDda_messageActions button{border-radius:var(--ds-chat-radius-pill,999px);color:var(--ds-chat-muted);font:inherit;font-size:var(--ds-chat-text-caption);cursor:pointer;background:0 0;border:none;padding:3px 8px;transition:color .12s,background-color .12s}.GlbDda_messageActions button:hover:not(:disabled){color:var(--ds-chat-text-color);background:var(--ds-chat-hover)}.GlbDda_messageActions button:disabled{opacity:.5;cursor:default}.GlbDda_groupSection{padding:var(--ds-chat-space-2) var(--ds-chat-space-2) 0}.GlbDda_groupSectionHead{align-items:baseline;gap:var(--ds-chat-space-2);padding:0 var(--ds-chat-space-2) var(--ds-chat-space-1);color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);display:flex}.GlbDda_groupSectionHead strong{color:var(--ds-chat-text-secondary);font-weight:var(--ds-chat-weight-semibold)}.GlbDda_groupSectionHead small{font-variant-numeric:tabular-nums}.GlbDda_groupSectionRow{align-items:center;gap:var(--ds-chat-space-2);width:100%;padding:6px var(--ds-chat-space-2);border-radius:var(--ds-chat-radius-control);color:inherit;font:inherit;text-align:left;cursor:pointer;background:0 0;border:none;display:flex}.GlbDda_groupSectionRow:hover{background:var(--ds-chat-hover)}.GlbDda_groupSectionRow>span{min-width:0;display:grid}.GlbDda_groupSectionRow strong{font-size:var(--ds-chat-text-body);font-weight:var(--ds-chat-weight-medium);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.GlbDda_groupSectionRow small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);font-variant-numeric:tabular-nums}.GlbDda_groupSectionRow b{color:var(--ds-chat-accent-text);margin-left:auto}.GlbDda_groupSectionRowWrap{padding-right:var(--ds-chat-space-1);align-items:center;gap:2px;display:flex}.GlbDda_groupSectionRowWrap>.GlbDda_groupSectionRow{flex:1;min-width:0}.GlbDda_groupSectionRowWrap .GlbDda_roomMenuButton{opacity:0}.GlbDda_groupSectionRowWrap:hover .GlbDda_roomMenuButton,.GlbDda_groupSectionRowWrap:focus-within .GlbDda_roomMenuButton{opacity:1}";
		const tagId$1 = "deepseek-harness-chat-ui/SkillContactsBrowser.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "deepseek-harness-chat-ui";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var SkillContactsBrowser_module_css_default = {
			"addGroup": "GlbDda_addGroup",
			"animalAvatar": "GlbDda_animalAvatar",
			"archivedRow": "GlbDda_archivedRow",
			"archivedToggle": "GlbDda_archivedToggle",
			"automationCard": "GlbDda_automationCard",
			"automationDialog": "GlbDda_automationDialog",
			"automationEntry": "GlbDda_automationEntry",
			"automationEntryCount": "GlbDda_automationEntryCount",
			"automationEntryMark": "GlbDda_automationEntryMark",
			"automationSummary": "GlbDda_automationSummary",
			"avatar": "GlbDda_avatar",
			"avatarLibrary": "GlbDda_avatarLibrary",
			"avatarStatusWrap": "GlbDda_avatarStatusWrap",
			"backdrop": "GlbDda_backdrop",
			"bindingHeader": "GlbDda_bindingHeader",
			"blankRoomDock": "GlbDda_blankRoomDock",
			"browserBar": "GlbDda_browserBar",
			"browserFrame": "GlbDda_browserFrame",
			"browserWorkbench": "GlbDda_browserWorkbench",
			"capabilityChips": "GlbDda_capabilityChips",
			"chevron": "GlbDda_chevron",
			"close": "GlbDda_close",
			"codeLine": "GlbDda_codeLine",
			"codeLineNo": "GlbDda_codeLineNo",
			"codeLineText": "GlbDda_codeLineText",
			"confirmActions": "GlbDda_confirmActions",
			"confirmDialog": "GlbDda_confirmDialog",
			"conversationGroupPanel": "GlbDda_conversationGroupPanel",
			"copy": "GlbDda_copy",
			"create": "GlbDda_create",
			"createMenu": "GlbDda_createMenu",
			"createWrap": "GlbDda_createWrap",
			"danger": "GlbDda_danger",
			"description": "GlbDda_description",
			"diffBody": "GlbDda_diffBody",
			"diffGutter": "GlbDda_diffGutter",
			"diffLine": "GlbDda_diffLine",
			"diffSummary": "GlbDda_diffSummary",
			"diffText": "GlbDda_diffText",
			"diffView": "GlbDda_diffView",
			"diffWorkbench": "GlbDda_diffWorkbench",
			"drawerEmpty": "GlbDda_drawerEmpty",
			"dsChatBrand": "GlbDda_dsChatBrand",
			"emptyCard": "GlbDda_emptyCard",
			"externalRow": "GlbDda_externalRow",
			"favoriteMark": "GlbDda_favoriteMark",
			"field": "GlbDda_field",
			"fileBrowser": "GlbDda_fileBrowser",
			"filePreview": "GlbDda_filePreview",
			"filePreviewBody": "GlbDda_filePreviewBody",
			"filePreviewMeta": "GlbDda_filePreviewMeta",
			"fileWorkbench": "GlbDda_fileWorkbench",
			"generalAvatar": "GlbDda_generalAvatar",
			"generalChatButton": "GlbDda_generalChatButton",
			"generatePrompt": "GlbDda_generatePrompt",
			"groupAvatar": "GlbDda_groupAvatar",
			"groupAvatarLibrary": "GlbDda_groupAvatarLibrary",
			"groupBackdrop": "GlbDda_groupBackdrop",
			"groupBody": "GlbDda_groupBody",
			"groupCandidates": "GlbDda_groupCandidates",
			"groupDialog": "GlbDda_groupDialog",
			"groupFooter": "GlbDda_groupFooter",
			"groupFormGrid": "GlbDda_groupFormGrid",
			"groupHeader": "GlbDda_groupHeader",
			"groupIdentityEditor": "GlbDda_groupIdentityEditor",
			"groupMark": "GlbDda_groupMark",
			"groupMore": "GlbDda_groupMore",
			"groupMorePanel": "GlbDda_groupMorePanel",
			"groupName": "GlbDda_groupName",
			"groupPicker": "GlbDda_groupPicker",
			"groupSection": "GlbDda_groupSection",
			"groupSectionHead": "GlbDda_groupSectionHead",
			"groupSectionRow": "GlbDda_groupSectionRow",
			"groupSectionRowWrap": "GlbDda_groupSectionRowWrap",
			"groupSelected": "GlbDda_groupSelected",
			"groupSettingsPanel": "GlbDda_groupSettingsPanel",
			"headerActionsCluster": "GlbDda_headerActionsCluster",
			"headerAvatarStack": "GlbDda_headerAvatarStack",
			"headerDivider": "GlbDda_headerDivider",
			"headerHistoryMenu": "GlbDda_headerHistoryMenu",
			"headerIconButton": "GlbDda_headerIconButton",
			"headerIdentity": "GlbDda_headerIdentity",
			"headerIdentityCopy": "GlbDda_headerIdentityCopy",
			"headerMenu": "GlbDda_headerMenu",
			"headerMenuHint": "GlbDda_headerMenuHint",
			"headerMenuSep": "GlbDda_headerMenuSep",
			"headerMenuWrap": "GlbDda_headerMenuWrap",
			"headerNewButton": "GlbDda_headerNewButton",
			"headerRoomMeta": "GlbDda_headerRoomMeta",
			"headerTextButton": "GlbDda_headerTextButton",
			"headerTools": "GlbDda_headerTools",
			"historyRow": "GlbDda_historyRow",
			"historySection": "GlbDda_historySection",
			"hoverProfile": "GlbDda_hoverProfile",
			"installJoin": "GlbDda_installJoin",
			"linkedChip": "GlbDda_linkedChip",
			"linkedList": "GlbDda_linkedList",
			"list": "GlbDda_list",
			"marketActions": "GlbDda_marketActions",
			"marketAvatar": "GlbDda_marketAvatar",
			"marketResult": "GlbDda_marketResult",
			"memberPersona": "GlbDda_memberPersona",
			"memberPicker": "GlbDda_memberPicker",
			"memberRow": "GlbDda_memberRow",
			"memberToggle": "GlbDda_memberToggle",
			"memberToolbar": "GlbDda_memberToolbar",
			"menuBackdrop": "GlbDda_menuBackdrop",
			"menuDanger": "GlbDda_menuDanger",
			"messageActions": "GlbDda_messageActions",
			"modeBar": "GlbDda_modeBar",
			"name": "GlbDda_name",
			"nameLine": "GlbDda_nameLine",
			"notice": "GlbDda_notice",
			"originCard": "GlbDda_originCard",
			"panel": "GlbDda_panel",
			"panelHint": "GlbDda_panelHint",
			"panelTitle": "GlbDda_panelTitle",
			"panelTop": "GlbDda_panelTop",
			"pathBar": "GlbDda_pathBar",
			"pickCopy": "GlbDda_pickCopy",
			"pickRow": "GlbDda_pickRow",
			"pinMark": "GlbDda_pinMark",
			"primary": "GlbDda_primary",
			"profileActions": "GlbDda_profileActions",
			"profileCover": "GlbDda_profileCover",
			"profileLinks": "GlbDda_profileLinks",
			"profileNote": "GlbDda_profileNote",
			"profileRooms": "GlbDda_profileRooms",
			"profileSection": "GlbDda_profileSection",
			"projectFileList": "GlbDda_projectFileList",
			"projectPanelIcon": "GlbDda_projectPanelIcon",
			"rail": "GlbDda_rail",
			"railButton": "GlbDda_railButton",
			"repeatFields": "GlbDda_repeatFields",
			"roomAvatarStack": "GlbDda_roomAvatarStack",
			"roomAvatarStackCompact": "GlbDda_roomAvatarStackCompact",
			"roomList": "GlbDda_roomList",
			"roomMemberGrid": "GlbDda_roomMemberGrid",
			"roomMemberItem": "GlbDda_roomMemberItem",
			"roomMenu": "GlbDda_roomMenu",
			"roomMenuButton": "GlbDda_roomMenuButton",
			"roomRow": "GlbDda_roomRow",
			"roomRowWrap": "GlbDda_roomRowWrap",
			"roomTile": "GlbDda_roomTile",
			"root": "GlbDda_root",
			"rootCount": "GlbDda_rootCount",
			"rootFlag": "GlbDda_rootFlag",
			"rootFooter": "GlbDda_rootFooter",
			"rootList": "GlbDda_rootList",
			"rootMain": "GlbDda_rootMain",
			"rootPath": "GlbDda_rootPath",
			"rootRow": "GlbDda_rootRow",
			"rootsPanel": "GlbDda_rootsPanel",
			"row": "GlbDda_row",
			"scheduleChoice": "GlbDda_scheduleChoice",
			"search": "GlbDda_search",
			"searchWrap": "GlbDda_searchWrap",
			"secondary": "GlbDda_secondary",
			"secondaryAction": "GlbDda_secondaryAction",
			"sectionHeading": "GlbDda_sectionHeading",
			"settingsSection": "GlbDda_settingsSection",
			"sidecarComposer": "GlbDda_sidecarComposer",
			"sidecarDrawer": "GlbDda_sidecarDrawer",
			"sidecarError": "GlbDda_sidecarError",
			"sidecarHeader": "GlbDda_sidecarHeader",
			"sidecarMessage": "GlbDda_sidecarMessage",
			"sidecarMessages": "GlbDda_sidecarMessages",
			"sidecarThinking": "GlbDda_sidecarThinking",
			"sidecarWelcome": "GlbDda_sidecarWelcome",
			"skillProfileDialog": "GlbDda_skillProfileDialog",
			"source": "GlbDda_source",
			"sourcesEntry": "GlbDda_sourcesEntry",
			"status": "GlbDda_status",
			"subtabs": "GlbDda_subtabs",
			"tab": "GlbDda_tab",
			"tabs": "GlbDda_tabs",
			"templateCard": "GlbDda_templateCard",
			"templateHeading": "GlbDda_templateHeading",
			"templateList": "GlbDda_templateList",
			"terminalComposer": "GlbDda_terminalComposer",
			"terminalOutput": "GlbDda_terminalOutput",
			"terminalWorkbench": "GlbDda_terminalWorkbench",
			"time": "GlbDda_time",
			"topbar": "GlbDda_topbar",
			"unreadBadge": "GlbDda_unreadBadge",
			"workbenchDrawer": "GlbDda_workbenchDrawer",
			"workbenchFootnote": "GlbDda_workbenchFootnote",
			"workbenchHeader": "GlbDda_workbenchHeader",
			"workspaceAdd": "GlbDda_workspaceAdd",
			"workspaceBar": "GlbDda_workspaceBar",
			"workspaceBindings": "GlbDda_workspaceBindings",
			"workspaceIcon": "GlbDda_workspaceIcon",
			"workspaceMenu": "GlbDda_workspaceMenu",
			"workspaceMenuSep": "GlbDda_workspaceMenuSep",
			"workspaceMeta": "GlbDda_workspaceMeta",
			"workspacePicker": "GlbDda_workspacePicker",
			"workspaceSection": "GlbDda_workspaceSection",
			"workspaceTrigger": "GlbDda_workspaceTrigger"
		};
		//#endregion
		//#region lib/types/client/SkillContactsBrowser.js
		/**
		* Starter automations.
		*
		* The tab opened on an empty list and a disabled button, which says what the
		* feature is called but not what it is for. Each entry prefills the dialog so
		* the first automation is one click plus a review, not a blank prompt box.
		*/
		const AUTOMATION_TEMPLATES = [
			{
				id: "briefing",
				name: "每日工作简报",
				hint: "每天早上汇总进展、待办与风险",
				prompt: "汇总这个项目自昨天以来的进展、今天待办、以及需要我决策的风险。按「进展 / 待办 / 风险」三段输出，每段不超过五条。",
				schedule: "recurring",
				interval: "1",
				unit: "d"
			},
			{
				id: "watch",
				name: "竞品 / 行业监测",
				hint: "持续跟踪，有变化就提醒",
				prompt: "检索这个领域最近一天的公开动态，只保留与本项目直接相关的变化，给出「发生了什么 / 对我们意味着什么 / 建议动作」。没有实质变化就明确说没有。",
				schedule: "recurring",
				interval: "1",
				unit: "d"
			},
			{
				id: "review",
				name: "代码变更回顾",
				hint: "每周汇总改动并指出风险",
				prompt: "回顾本周工作区里的代码改动，按模块归纳做了什么，指出其中风险最高的三处并说明理由。",
				schedule: "recurring",
				interval: "7",
				unit: "d"
			},
			{
				id: "research",
				name: "专家团队深研",
				hint: "组织成员就一个问题做一次深入调研",
				prompt: "就下面这个问题做一次深入调研，先拆解成子问题分工，再合并成一份结论：\n\n（在这里写下你的问题）",
				schedule: "once",
				interval: "1",
				unit: "d"
			},
			{
				id: "report",
				name: "产出报告 / 演示稿",
				hint: "把已有材料整理成可发布的文档",
				prompt: "把这个房间里已经讨论过的内容整理成一份可直接发布的报告：结论先行，附关键证据与未决问题。",
				schedule: "once",
				interval: "1",
				unit: "d"
			}
		];
		/**
		* A first-run time for a template.
		*
		* `createAutomation` falls back to "now" when the field is blank, which turns
		* "每天早上汇总" into "every day at whatever o'clock you clicked the card". A
		* recurring template therefore starts at the next 09:00, and a one-off starts
		* an hour out, both rounded to a whole minute the field can display.
		* @param schedule - whether the template repeats.
		* @returns a local `YYYY-MM-DDTHH:mm` string for `<input type="datetime-local">`.
		*/
		function templateRunAt(schedule) {
			const when = /* @__PURE__ */ new Date();
			if (schedule === "recurring") {
				if (when.getHours() >= 9) when.setDate(when.getDate() + 1);
				when.setHours(9, 0, 0, 0);
			} else when.setHours(when.getHours() + 1, 0, 0, 0);
			const pad = (value) => String(value).padStart(2, "0");
			return `${when.getFullYear()}-${pad(when.getMonth() + 1)}-${pad(when.getDate())}T${pad(when.getHours())}:${pad(when.getMinutes())}`;
		}
		/**
		* Whether the browser's cached copy should survive a load.
		*
		* `localStorage` is a first-paint cache, not a replica: the Host document is
		* the record. The one case for keeping the local copy is the first run against
		* a Host that has never stored anything, so that state built before the
		* document existed is not thrown away.
		*
		* Anything looser resurrects deleted data. A browser holding an old snapshot
		* used to win whenever the Host had no rooms — so opening a stale tab pushed
		* its rooms back over the Host's, and the newer state was gone.
		* @param remote - the document the Host returned.
		* @param local - what this browser had cached.
		* @returns true when the local copy should be kept.
		*/
		function preferLocalState(remote, local) {
			const remoteEmpty = remote.rooms.length === 0 && remote.automations.length === 0 && Object.keys(remote.personas).length === 0;
			const localHasData = local.rooms.length > 0 || local.automations.length > 0 || Object.keys(local.personas).length > 0;
			return remoteEmpty && localHasData;
		}
		/**
		* Rooms kept across projects.
		*
		* A room belongs to the project it was made in, which is right for a thread but
		* wrong for a team: the roster, the coordinator and the group's brief are worth
		* reusing on the next project. Saving one lists it in every project, and
		* opening it there binds that project in, so the session runs where you are.
		* Stored outside the Host document because it is this person's shortlist, not
		* part of the room graph.
		*/
		const SAVED_ROOMS_KEY = "dsh.skill-chat.saved-rooms.v1";
		const FAVORITES_KEY = "dsh.skill-chat.favorites.v1";
		const GROUPS_KEY = "dsh.skill-chat.groups.v1";
		const EXTERNAL_KEY = "dsh.skill-chat.external.v1";
		const MODE_KEY = "dsh.skill-chat.mode.v1";
		const CHAT_BINDINGS_KEY = "dsh.skill-chat.bindings.v1";
		const STATE_KEY = "dsh.skill-chat.state.v2";
		const LEGACY_CHAT_IDENTITIES_KEY = "dsh.skill-chat.identities.v1";
		const WORKSPACE_KEY = "dsh.skill-chat.workspace.v1";
		function readStored(key, fallback) {
			try {
				const value = localStorage.getItem(key);
				return value === null ? fallback : JSON.parse(value);
			} catch {
				return fallback;
			}
		}
		function store(key, value) {
			try {
				localStorage.setItem(key, JSON.stringify(value));
			} catch {}
		}
		/**
		* Compact list timestamp, the way a message list shows one: a time for today,
		* a weekday inside the last week, a date beyond that. Formatting goes through
		* `Intl` so it follows the viewer's locale instead of a hardcoded pattern.
		* @param value - epoch milliseconds.
		* @returns the shortest label that still disambiguates.
		*/
		/**
		* Translator for everything outside the browser component.
		*
		* `t` arrives as a prop, which reaches `SkillContactsBrowser` but not the two
		* slot-mounted siblings the Host renders elsewhere, nor the helpers defined at
		* module scope. The Host stamps the chosen locale on `<html lang>`, so reading
		* it there gives the same answer without threading a prop through every one of
		* these call sites.
		* @param key - the message key.
		* @returns the localized string, falling back to Chinese.
		*/
		function tr(key) {
			return (document.documentElement.lang.toLowerCase().startsWith("en") ? en : zh)[key] ?? zh[key];
		}
		/**
		* Close a popover when the pointer goes down outside it, or on Escape.
		*
		* Three menus — create, workbench, project picker — only closed by clicking
		* their own trigger again, which is not how a popover behaves anywhere else:
		* picking nothing left the panel stuck open over the list. One hook rather than
		* three backdrops, because a backdrop also swallows scrolling and the first
		* click that lands on whatever is underneath.
		* @param open - whether the popover is showing.
		* @param close - called once to dismiss it.
		* @returns ref for the popover's own element, so clicks inside are ignored.
		*/
		function useDismiss(open, close) {
			const ref = (0, react.useRef)(null);
			const latest = (0, react.useRef)(close);
			latest.current = close;
			(0, react.useEffect)(() => {
				if (!open) return;
				const onPointerDown = (event) => {
					const node = ref.current;
					if (node !== null && event.target instanceof Node && !node.contains(event.target)) latest.current();
				};
				const onKeyDown = (event) => {
					if (event.key === "Escape") latest.current();
				};
				document.addEventListener("pointerdown", onPointerDown, true);
				document.addEventListener("keydown", onKeyDown);
				return () => {
					document.removeEventListener("pointerdown", onPointerDown, true);
					document.removeEventListener("keydown", onKeyDown);
				};
			}, [open]);
			return ref;
		}
		function roomTime(value) {
			const then = new Date(value);
			const now = /* @__PURE__ */ new Date();
			if (then.toDateString() === now.toDateString()) return new Intl.DateTimeFormat(void 0, {
				hour: "2-digit",
				minute: "2-digit"
			}).format(then);
			if (now.getTime() - value < 8640 * 60 * 1e3) return new Intl.DateTimeFormat(void 0, { weekday: "short" }).format(then);
			return new Intl.DateTimeFormat(void 0, {
				month: "numeric",
				day: "numeric"
			}).format(then);
		}
		function hashOf(value) {
			let hash = 0;
			for (const char of value) hash = hash * 31 + (char.codePointAt(0) ?? 0) >>> 0;
			return hash;
		}
		function AnimalAvatar({ avatarId, label, seed, small = false }) {
			return (0, react_jsx_runtime.jsx)(Avatar, {
				avatarId,
				label,
				...seed === void 0 ? {} : { seed },
				size: small ? 30 : 40
			});
		}
		function persona(contact) {
			const identity = defaultPersona(contact, 0);
			return {
				name: identity.displayName,
				avatar: identity.avatarId
			};
		}
		function displayOf(contact, mode, personas = {}) {
			const identity = personas[contact.id] ?? defaultPersona(contact, 0);
			return {
				name: mode === "persona" ? identity.displayName : contact.name,
				avatar: identity.avatarId
			};
		}
		function matches(skill, query, personas) {
			if (query.length === 0) return true;
			const human = personas[skill.id]?.displayName ?? persona(skill).name;
			return query.split(/\s+/u).every((token) => `${skill.name}\n${human}\n${skill.description}\n${skill.whenToUse ?? ""}\n${skill.sourceLabel}`.toLocaleLowerCase().includes(token));
		}
		function storedGroups() {
			return readStored(GROUPS_KEY, []).flatMap((group) => {
				const first = group.members[0];
				return first === void 0 ? [] : [{
					...group,
					leaderId: group.leaderId || first.id
				}];
			});
		}
		function storedBindings() {
			const current = readStored(CHAT_BINDINGS_KEY, {});
			if (Object.keys(current).length > 0) return current;
			const legacy = readStored(LEGACY_CHAT_IDENTITIES_KEY, {});
			return Object.fromEntries(Object.entries(legacy).map(([sessionId, identity]) => [sessionId, {
				...identity,
				kind: "contact",
				members: []
			}]));
		}
		/**
		* Who a message belongs to.
		*
		* The reply's own opening line wins: the coordinator is asked to start a
		* relayed result with `@nickname`, and that is a statement about authorship,
		* where the user's `@` is only a request. The request is the fallback, and the
		* coordinator answers for anything neither names.
		* @param members - the room's Skills.
		* @param leaderId - the coordinator's contact id.
		* @param text - the user's message for this turn.
		* @param mode - whether names are shown as personas or raw Skill names.
		* @param reply - the assistant's own text, when it has been rendered.
		* @returns the member to attribute the message to.
		*/
		function responderForMessage(members, leaderId, text, mode, reply = "") {
			const named = (source) => members.filter((member) => {
				const display = displayOf(member, mode);
				return source.includes(`@${display.name}`) || source.includes(`@${member.name}`);
			});
			const declared = named(reply.slice(0, 40));
			if (declared.length === 1) return declared[0];
			const mentioned = named(text);
			return mentioned.length === 1 ? mentioned[0] : members.find((member) => member.id === leaderId) ?? members[0];
		}
		function roomGroup(room, contacts) {
			const members = room.memberIds.flatMap((id) => contacts.find((contact) => contact.id === id) ?? []);
			return {
				id: room.roomId.replace("room:group:", ""),
				name: room.title,
				members,
				leaderId: room.coordinatorId,
				...room.systemPrompt === void 0 ? {} : { systemPrompt: room.systemPrompt },
				workspaceId: room.workspaceId,
				createdAt: room.createdAt
			};
		}
		/**
		* The group's brief.
		*
		* This used to end with "do not claim real parallel execution", which was
		* honest while members were personas in a prompt and nothing more. They are
		* now linked into the Harness's own Skill root, and this preset gives the
		* model a `subagent` tool that runs in the background by default and returns
		* immediately — so several members genuinely can work at once, and the
		* instruction to pretend otherwise had become the thing standing in the way.
		*
		* Each relayed result opens with `@nickname` because that line is what the
		* sidebar reads to put the right face on the message.
		* @param name - the room's title.
		* @param members - the Skills in the room.
		* @returns the system prompt.
		*/
		function generatedGroupPrompt(name, members) {
			const roster = members.map((member) => `- @${member.name}：${member.description}`).join("\n");
			return `你是「${name || tr("collabGroup")}」的协调者。根据用户目标组织以下成员协作，优先给出明确、可执行且可验证的结果。

成员：
${roster}

工作规则：
1. 用户明确 @ 某个成员时，交给该成员。
2. 没有明确 @ 时，你先拆解任务，再决定交给谁。
3. 一次需要多个成员时，用 subagent 工具为每个成员各起一个后台子代理并发进行；不要串行等待。给每个子代理的提示里写明「先加载 <成员名> 这个 Skill，再按它的方法完成以下任务」。
4. 单个成员就能完成，或任务很小时，直接自己加载对应 Skill 处理，不必起子代理。
5. 转述某个成员的结果时，该段以「@成员名」开头，再换行写内容。这是界面据以标注发言人的依据。
6. 只陈述真实发生的事：并发就说并发，自己做的就说自己做的。`;
		}
		function GroupAvatar({ avatarId, label, small = false }) {
			return (0, react_jsx_runtime.jsxs)("span", {
				className: SkillContactsBrowser_module_css_default.groupAvatar,
				"data-small": small || void 0,
				children: [(0, react_jsx_runtime.jsx)(Avatar, {
					avatarId,
					label,
					size: small ? 32 : 46
				}), (0, react_jsx_runtime.jsx)("span", {
					className: SkillContactsBrowser_module_css_default.groupMark,
					"aria-hidden": "true",
					children: "●●"
				})]
			});
		}
		let headerBridgeValue = null;
		const headerBridgeListeners = /* @__PURE__ */ new Set();
		function publishHeaderBridge(value) {
			headerBridgeValue = value;
			for (const listener of headerBridgeListeners) listener();
		}
		function useHeaderBridge() {
			return (0, react.useSyncExternalStore)((listener) => {
				headerBridgeListeners.add(listener);
				return () => {
					headerBridgeListeners.delete(listener);
				};
			}, () => headerBridgeValue, () => null);
		}
		/**
		* Who this room is, for the conversation header.
		*
		* Registered on the shell's `conversation.session.header.lineage` slot, which
		* the shell renders in place of the plain text title. A chat client answers
		* "who am I talking to" at the top of the room — the members' faces and how
		* many there are — and the plugin already knows all of it.
		* @param props - the session being displayed.
		* @returns the identity block, or null when this session is not a DS Chat room.
		*/
		function SkillChatHeaderTools({ sessionId }) {
			const bridge = useHeaderBridge();
			const [historyOpen, setHistoryOpen] = (0, react.useState)(false);
			const historyRef = useDismiss(historyOpen, () => {
				setHistoryOpen(false);
			});
			const [workbenchOpen, setWorkbenchOpen] = (0, react.useState)(false);
			const workbenchRef = useDismiss(workbenchOpen, () => {
				setWorkbenchOpen(false);
			});
			if (bridge === null || bridge.sessionId !== sessionId) return null;
			const room = bridge.room;
			const history = room.sessionIds.toReversed().flatMap((id) => bridge.roomSessions.find((item) => item.roomSessionId === id) ?? []);
			const workbenchItems = [
				{
					tool: "files",
					label: tr("projectFiles"),
					icon: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpenOutline16, {})
				},
				{
					tool: "terminal",
					label: tr("terminalLabel"),
					icon: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCodeOutline16, {})
				},
				{
					tool: "diff",
					label: tr("viewDiff"),
					icon: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconBranchOutline16, {})
				},
				{
					tool: "browser",
					label: tr("browserLabel"),
					icon: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconGlobeOutline14, {})
				}
			];
			const detail = room.type === "group" ? `${room.memberIds.length} 名成员 · ${bridge.coordinatorName ?? tr("coordinator")} 协调` : `${bridge.workspaceTitle} · 直接对话`;
			return (0, react_jsx_runtime.jsxs)("div", {
				className: SkillContactsBrowser_module_css_default.headerTools,
				children: [(0, react_jsx_runtime.jsxs)("span", {
					className: SkillContactsBrowser_module_css_default.headerIdentity,
					children: [(0, react_jsx_runtime.jsx)(AvatarStack, {
						className: SkillContactsBrowser_module_css_default.headerAvatarStack,
						overlap: 9,
						children: bridge.memberPersonas.slice(0, 4).map((member, index) => (0, react_jsx_runtime.jsx)("span", {
							style: { zIndex: 5 - index },
							children: (0, react_jsx_runtime.jsx)(Avatar, {
								avatarId: member.avatarId,
								label: member.name,
								seed: member.id,
								size: 24
							})
						}, member.id))
					}), (0, react_jsx_runtime.jsxs)("span", {
						className: SkillContactsBrowser_module_css_default.headerIdentityCopy,
						children: [(0, react_jsx_runtime.jsx)("strong", { children: room.title }), (0, react_jsx_runtime.jsx)("small", { children: detail })]
					})]
				}), (0, react_jsx_runtime.jsxs)("span", {
					className: SkillContactsBrowser_module_css_default.headerActionsCluster,
					children: [
						(0, react_jsx_runtime.jsxs)("span", {
							className: SkillContactsBrowser_module_css_default.headerMenuWrap,
							ref: workbenchRef,
							children: [(0, react_jsx_runtime.jsx)("button", {
								className: SkillContactsBrowser_module_css_default.headerTextButton,
								type: "button",
								"aria-expanded": workbenchOpen,
								onClick: () => {
									setWorkbenchOpen((open) => !open);
								},
								children: tr("workbench")
							}), workbenchOpen ? (0, react_jsx_runtime.jsxs)("span", {
								className: SkillContactsBrowser_module_css_default.headerMenu,
								children: [
									workbenchItems.map((item) => (0, react_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setWorkbenchOpen(false);
											bridge.onProjectTool(item.tool);
										},
										children: [item.icon, (0, react_jsx_runtime.jsx)("span", { children: item.label })]
									}, item.tool)),
									(0, react_jsx_runtime.jsx)("span", { className: SkillContactsBrowser_module_css_default.headerMenuSep }),
									(0, react_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setWorkbenchOpen(false);
											bridge.onTemporaryChat();
										},
										children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconNewChatOutline16, {}), (0, react_jsx_runtime.jsx)("span", { children: tr("tempChat") })]
									})
								]
							}) : null]
						}),
						(0, react_jsx_runtime.jsx)("span", { className: SkillContactsBrowser_module_css_default.headerDivider }),
						bridge.headerActions,
						room.type === "group" ? (0, react_jsx_runtime.jsx)("button", {
							className: SkillContactsBrowser_module_css_default.headerTextButton,
							type: "button",
							onClick: bridge.onSettings,
							children: tr("membersAndRoles")
						}) : null,
						(0, react_jsx_runtime.jsxs)("span", {
							className: SkillContactsBrowser_module_css_default.headerMenuWrap,
							ref: historyRef,
							children: [(0, react_jsx_runtime.jsxs)("button", {
								className: SkillContactsBrowser_module_css_default.headerTextButton,
								type: "button",
								"aria-expanded": historyOpen,
								onClick: () => {
									setHistoryOpen((open) => !open);
								},
								children: ["历史 ", history.length]
							}), historyOpen ? (0, react_jsx_runtime.jsxs)("span", {
								className: SkillContactsBrowser_module_css_default.headerMenu,
								children: [history.map((item) => {
									const current = item.harnessSessionId === sessionId;
									return (0, react_jsx_runtime.jsxs)("button", {
										type: "button",
										"data-active": current,
										disabled: current,
										onClick: () => {
											bridge.onHistory(item);
											setHistoryOpen(false);
										},
										children: [(0, react_jsx_runtime.jsx)("span", { children: item.title }), (0, react_jsx_runtime.jsx)("small", { children: current ? tr("currentChat") : new Date(item.updatedAt).toLocaleString() })]
									}, item.roomSessionId);
								}), history.length <= 1 ? (0, react_jsx_runtime.jsx)("span", {
									className: SkillContactsBrowser_module_css_default.headerMenuHint,
									children: tr("historySingleHint")
								}) : null]
							}) : null]
						}),
						(0, react_jsx_runtime.jsx)(Button, {
							className: SkillContactsBrowser_module_css_default.headerNewButton,
							variant: "primary",
							size: "small",
							onClick: bridge.onNewSession,
							children: tr("newConversation")
						})
					]
				})]
			});
		}
		/**
		* Split unified-diff text into typed lines.
		*
		* The diff arrives as raw terminal output — the command that produced it, a
		* shell prompt and `git diff --stat` all sit above the patch — so everything
		* before the first `diff --git` or `@@` is treated as a preamble and kept as
		* meta rather than being mistaken for context.
		* @param text - raw terminal output.
		* @returns the typed lines, in order.
		*/
		/**
		* Branch actions for one finalized assistant message.
		*
		* The Harness Session log is append-only: there is no truncate and no delete,
		* so "go back to here" cannot mean erasing what followed. It means cutting a
		* fork at that message — the Host's own `fork({ atSeq })`, which copies the
		* prefix into a child Session. The trace follows for free, because the child
		* only ever held those events.
		*
		* Two entries rather than one because the intent differs, and the Host already
		* encodes the difference: reverting continues the same thread from an earlier
		* point and keeps the title, while branching is a deliberate parallel attempt
		* and takes a numbered one (`increaseTitle`). Both leave the original in the
		* room's history, so a fork taken by mistake costs nothing.
		*/
		function SkillChatMessageActions({ messageId }) {
			const bridge = useHeaderBridge();
			const [busy, setBusy] = (0, react.useState)(null);
			if (bridge === null) return null;
			const branch = (kind) => {
				const atSeq = bridge.messageSeq(bridge.sessionId, messageId);
				if (atSeq === void 0) {
					bridge.onNotice(tr("branchOutOfWindow"));
					return;
				}
				setBusy(kind);
				bridge.onBranch(atSeq, kind).catch((error) => {
					bridge.onNotice(`${tr("branchFailed")}：${error instanceof Error ? error.message : String(error)}`);
				}).finally(() => {
					setBusy(null);
				});
			};
			return (0, react_jsx_runtime.jsxs)("span", {
				className: SkillContactsBrowser_module_css_default.messageActions,
				children: [(0, react_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: busy !== null,
					onClick: () => {
						branch("revert");
					},
					title: tr("revertHereHint"),
					children: busy === "revert" ? tr("working") : tr("revertHere")
				}), (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: busy !== null,
					onClick: () => {
						branch("fork");
					},
					title: tr("forkHereHint"),
					children: busy === "fork" ? tr("working") : tr("forkHere")
				})]
			});
		}
		function parseDiff(text) {
			const lines = text.replace(/\r/gu, "").split("\n");
			const start = lines.findIndex((line) => line.startsWith("diff --git") || line.startsWith("@@"));
			const body = start < 0 ? [] : lines.slice(start);
			return [...(start < 0 ? lines : lines.slice(0, start)).filter((line) => line.trim() !== "").map((line) => ({
				kind: "meta",
				text: line
			})), ...body.flatMap((line) => {
				if (line.startsWith("diff --git")) return [{
					kind: "file",
					text: line.replace(/^diff --git a\/(\S+) b\/\S+$/u, "$1")
				}];
				if (line.startsWith("@@")) return [{
					kind: "hunk",
					text: line
				}];
				if (line.startsWith("+++") || line.startsWith("---") || line.startsWith("index ") || line.startsWith("new file") || line.startsWith("deleted file") || line.startsWith("similarity ") || line.startsWith("rename ")) return [];
				if (line.startsWith("+")) return [{
					kind: "add",
					text: line.slice(1)
				}];
				if (line.startsWith("-")) return [{
					kind: "remove",
					text: line.slice(1)
				}];
				return [{
					kind: "context",
					text: line.startsWith(" ") ? line.slice(1) : line
				}];
			})];
		}
		/**
		* Render a unified diff.
		* @param props - the raw diff text.
		* @returns the coloured patch, or an empty state when there is nothing to show.
		*/
		function DiffView({ text }) {
			const lines = (0, react.useMemo)(() => parseDiff(text), [text]);
			const changes = lines.filter((line) => line.kind === "add" || line.kind === "remove").length;
			const patched = lines.some((line) => line.kind === "file" || line.kind === "hunk");
			if (text.includes("__DSCHAT_NO_REPO__")) return (0, react_jsx_runtime.jsx)(EmptyState, {
				className: SkillContactsBrowser_module_css_default.drawerEmpty,
				title: "这个项目不在 Git 仓库里",
				children: tr("diffNeedsGit")
			});
			if (!patched) return (0, react_jsx_runtime.jsx)(EmptyState, {
				className: SkillContactsBrowser_module_css_default.drawerEmpty,
				title: "没有未提交的改动",
				children: tr("emptyWorkspace")
			});
			return (0, react_jsx_runtime.jsxs)("div", {
				className: SkillContactsBrowser_module_css_default.diffView,
				children: [(0, react_jsx_runtime.jsxs)("div", {
					className: SkillContactsBrowser_module_css_default.diffSummary,
					children: [changes, " 行改动"]
				}), (0, react_jsx_runtime.jsx)("div", {
					className: SkillContactsBrowser_module_css_default.diffBody,
					children: lines.map((line, index) => (0, react_jsx_runtime.jsxs)("div", {
						className: SkillContactsBrowser_module_css_default.diffLine,
						"data-kind": line.kind,
						children: [(0, react_jsx_runtime.jsx)("span", {
							className: SkillContactsBrowser_module_css_default.diffGutter,
							children: line.kind === "add" ? "+" : line.kind === "remove" ? "−" : ""
						}), (0, react_jsx_runtime.jsx)("span", {
							className: SkillContactsBrowser_module_css_default.diffText,
							children: line.text || "\xA0"
						})]
					}, index))
				})]
			});
		}
		/** Human-readable byte size for a directory listing. */
		function fileSize(bytes) {
			if (bytes < 1024) return `${bytes} B`;
			if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
			return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
		}
		function WorkbenchDrawer(props) {
			const title = props.tool === "files" ? tr("projectFiles") : props.tool === "terminal" ? tr("terminalLabel") : props.tool === "diff" ? "代码变更" : tr("browserLabel");
			return (0, react_jsx_runtime.jsx)(Drawer, {
				className: SkillContactsBrowser_module_css_default.workbenchDrawer,
				label: title,
				onClose: props.onClose,
				children: (0, react_jsx_runtime.jsxs)(WorkbenchPanel, { children: [
					(0, react_jsx_runtime.jsxs)("header", {
						className: SkillContactsBrowser_module_css_default.workbenchHeader,
						children: [
							(0, react_jsx_runtime.jsx)("span", {
								className: SkillContactsBrowser_module_css_default.projectPanelIcon,
								children: props.tool === "files" ? (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpenOutline16, {}) : props.tool === "terminal" ? (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCodeOutline16, {}) : props.tool === "diff" ? (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconBranchOutline16, {}) : (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconGlobeOutline14, {})
							}),
							(0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)("strong", { children: title }), (0, react_jsx_runtime.jsx)("small", { children: props.workspaceTitle })] }),
							(0, react_jsx_runtime.jsx)(IconButton, {
								className: SkillContactsBrowser_module_css_default.close,
								variant: "ghost",
								"aria-label": "关闭",
								onClick: props.onClose,
								children: "×"
							})
						]
					}),
					props.tool === "files" ? (0, react_jsx_runtime.jsxs)("div", {
						className: SkillContactsBrowser_module_css_default.fileWorkbench,
						children: [(0, react_jsx_runtime.jsxs)("div", {
							className: SkillContactsBrowser_module_css_default.fileBrowser,
							children: [(0, react_jsx_runtime.jsx)("nav", {
								className: SkillContactsBrowser_module_css_default.pathBar,
								"aria-label": "路径",
								children: (() => {
									const current = props.listing?.path ?? props.workspacePath;
									const relative = current.startsWith(props.workspacePath) ? current.slice(props.workspacePath.length).replace(/^\//u, "") : current;
									const parts = relative === "" ? [] : relative.split("/");
									return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											props.onBrowse(void 0);
										},
										children: props.workspaceTitle
									}), parts.map((part, index) => (0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)("b", { children: "/" }), (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											props.onBrowse(`${props.workspacePath}/${parts.slice(0, index + 1).join("/")}`);
										},
										children: part
									})] }, `${part}-${index}`))] });
								})()
							}), (0, react_jsx_runtime.jsx)("div", {
								className: SkillContactsBrowser_module_css_default.projectFileList,
								children: props.error !== null ? (0, react_jsx_runtime.jsx)("div", {
									className: SkillContactsBrowser_module_css_default.status,
									children: props.error
								}) : props.listing === null ? (0, react_jsx_runtime.jsx)("div", {
									className: SkillContactsBrowser_module_css_default.status,
									children: tr("readingDir")
								}) : (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [props.listing.parent === void 0 ? null : (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										props.onBrowse(props.listing?.parent);
									},
									children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpenOutline16, {}), (0, react_jsx_runtime.jsx)("span", { children: tr("backParent") })]
								}), props.listing.entries.filter((entry) => !entry.hidden).toSorted((left, right) => left.kind === right.kind ? left.name.localeCompare(right.name) : left.kind === "directory" ? -1 : 1).map((entry) => (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									"data-selected": props.file?.path === entry.path || void 0,
									onClick: () => {
										if (entry.kind === "directory") props.onBrowse(entry.path);
										else props.onPreviewFile(entry.path);
									},
									children: [entry.kind === "directory" ? (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpenOutline16, {}) : (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCodeOutline16, {}), (0, react_jsx_runtime.jsx)("span", { children: entry.name })]
								}, entry.path))] })
							})]
						}), (0, react_jsx_runtime.jsx)("div", {
							className: SkillContactsBrowser_module_css_default.filePreview,
							children: props.file === null ? (0, react_jsx_runtime.jsx)("div", {
								className: SkillContactsBrowser_module_css_default.drawerEmpty,
								children: tr("pickFileHint")
							}) : (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.filePreviewMeta,
								children: [(0, react_jsx_runtime.jsx)("strong", { children: props.file.name }), (0, react_jsx_runtime.jsxs)("small", { children: [
									props.file.language,
									" · ",
									fileSize(props.file.size),
									props.file.truncated ? tr("truncated") : ""
								] })]
							}), props.file.binary ? (0, react_jsx_runtime.jsx)("div", {
								className: SkillContactsBrowser_module_css_default.drawerEmpty,
								children: tr("binaryFile")
							}) : (0, react_jsx_runtime.jsx)("div", {
								className: SkillContactsBrowser_module_css_default.filePreviewBody,
								children: (props.file.content ?? "").split("\n").map((line, index) => (0, react_jsx_runtime.jsxs)("div", {
									className: SkillContactsBrowser_module_css_default.codeLine,
									children: [(0, react_jsx_runtime.jsx)("span", {
										className: SkillContactsBrowser_module_css_default.codeLineNo,
										children: index + 1
									}), (0, react_jsx_runtime.jsx)("span", {
										className: SkillContactsBrowser_module_css_default.codeLineText,
										children: line || "\xA0"
									})]
								}, index))
							})] })
						})]
					}) : null,
					props.tool === "diff" ? (0, react_jsx_runtime.jsx)("div", {
						className: SkillContactsBrowser_module_css_default.diffWorkbench,
						children: props.error !== null ? (0, react_jsx_runtime.jsx)("div", {
							className: SkillContactsBrowser_module_css_default.status,
							children: props.error
						}) : props.terminalBusy && props.terminal === null ? (0, react_jsx_runtime.jsx)("div", {
							className: SkillContactsBrowser_module_css_default.status,
							children: tr("readingDiff")
						}) : (0, react_jsx_runtime.jsx)(DiffView, { text: props.terminal?.text ?? "" })
					}) : null,
					props.tool === "terminal" ? (0, react_jsx_runtime.jsxs)("div", {
						className: SkillContactsBrowser_module_css_default.terminalWorkbench,
						children: [(0, react_jsx_runtime.jsx)("pre", {
							className: SkillContactsBrowser_module_css_default.terminalOutput,
							ref: (element) => {
								if (element !== null) element.scrollTop = element.scrollHeight;
							},
							children: props.error ?? props.terminal?.text ?? (props.terminalBusy ? tr("startingTerminal") : tr("terminalIdle"))
						}), props.tool === "terminal" ? (0, react_jsx_runtime.jsxs)("form", {
							className: SkillContactsBrowser_module_css_default.terminalComposer,
							onSubmit: (event) => {
								event.preventDefault();
								props.onTerminalSubmit();
							},
							children: [
								(0, react_jsx_runtime.jsx)("span", { children: "$" }),
								(0, react_jsx_runtime.jsx)("input", {
									value: props.terminalCommand,
									onChange: (event) => {
										props.onTerminalCommand(event.target.value);
									},
									placeholder: "输入命令，例如 pnpm test…",
									"aria-label": "终端命令",
									autoComplete: "off",
									spellCheck: false,
									autoFocus: true
								}),
								(0, react_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: props.terminalBusy || props.terminal === null,
									children: tr("runLabel")
								})
							]
						}) : (0, react_jsx_runtime.jsx)("div", {
							className: SkillContactsBrowser_module_css_default.workbenchFootnote,
							children: tr("diffExplainer")
						})]
					}) : null,
					props.tool === "browser" ? (0, react_jsx_runtime.jsxs)("div", {
						className: SkillContactsBrowser_module_css_default.browserWorkbench,
						children: [
							(0, react_jsx_runtime.jsxs)("form", {
								className: SkillContactsBrowser_module_css_default.browserBar,
								onSubmit: (event) => {
									event.preventDefault();
									props.onBrowserNavigate(props.browserDraft);
								},
								children: [
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: !props.canGoBack,
										onClick: props.onBrowserBack,
										children: "←"
									}),
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: !props.canGoForward,
										onClick: props.onBrowserForward,
										children: "→"
									}),
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: props.onBrowserRefresh,
										children: "↻"
									}),
									(0, react_jsx_runtime.jsx)("input", {
										value: props.browserDraft,
										onChange: (event) => {
											props.onBrowserDraft(event.target.value);
										},
										"aria-label": "浏览器地址"
									}),
									(0, react_jsx_runtime.jsx)("button", {
										type: "submit",
										children: tr("openLabel")
									})
								]
							}),
							(0, react_jsx_runtime.jsx)("iframe", {
								className: SkillContactsBrowser_module_css_default.browserFrame,
								src: props.browserUrl,
								title: "项目浏览器预览",
								sandbox: "allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
							}, props.browserKey),
							(0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.workbenchFootnote,
								children: [tr("embedBlocked"), (0, react_jsx_runtime.jsx)("a", {
									href: props.browserUrl,
									target: "_blank",
									rel: "noreferrer",
									children: props.browserUrl
								})]
							})
						]
					}) : null
				] })
			});
		}
		function SidecarDrawer(props) {
			return (0, react_jsx_runtime.jsxs)(Drawer, {
				className: SkillContactsBrowser_module_css_default.sidecarDrawer,
				label: "临时对话",
				onClose: props.onClose,
				children: [
					(0, react_jsx_runtime.jsxs)("header", {
						className: SkillContactsBrowser_module_css_default.sidecarHeader,
						children: [(0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)("strong", { children: tr("tempChat") }), (0, react_jsx_runtime.jsxs)("small", { children: [
							"基于「",
							props.roomTitle,
							"」当前上下文，不影响主会话"
						] })] }), (0, react_jsx_runtime.jsx)(IconButton, {
							className: SkillContactsBrowser_module_css_default.close,
							variant: "ghost",
							"aria-label": "关闭",
							onClick: props.onClose,
							children: "×"
						})]
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: SkillContactsBrowser_module_css_default.sidecarMessages,
						children: [
							props.messages.length === 0 ? (0, react_jsx_runtime.jsx)(EmptyState, {
								className: SkillContactsBrowser_module_css_default.sidecarWelcome,
								title: "开一条旁路思路",
								children: tr("sideChatHint")
							}) : props.messages.map((message) => (0, react_jsx_runtime.jsx)(ChatBubble, {
								className: SkillContactsBrowser_module_css_default.sidecarMessage,
								role: message.role,
								children: message.text
							}, message.id)),
							props.busy ? (0, react_jsx_runtime.jsx)("div", {
								className: SkillContactsBrowser_module_css_default.sidecarThinking,
								children: tr("thinking")
							}) : null,
							props.error === null ? null : (0, react_jsx_runtime.jsx)("div", {
								className: SkillContactsBrowser_module_css_default.sidecarError,
								children: props.error
							})
						]
					}),
					(0, react_jsx_runtime.jsxs)("form", {
						className: SkillContactsBrowser_module_css_default.sidecarComposer,
						onSubmit: (event) => {
							event.preventDefault();
							props.onSubmit();
						},
						children: [(0, react_jsx_runtime.jsx)("textarea", {
							value: props.draft,
							onChange: (event) => {
								props.onDraft(event.target.value);
							},
							placeholder: "在当前上下文旁边继续问…",
							"aria-label": "旁路提问",
							autoComplete: "off"
						}), (0, react_jsx_runtime.jsx)(Button, {
							variant: "primary",
							type: "submit",
							disabled: props.busy || props.draft.trim() === "",
							children: tr("send")
						})]
					})
				]
			});
		}
		function SkillContactsBrowser(props) {
			const { wide, expandSidebar, useSessions, useWorkspaces, loadContacts, searchExternal, openSession, renameSession, startSession, addWorkspace, chooseContact, chooseGroup, loadState, saveState, runAutomation: runAutomationRemote, linkSkill, forkSession, messageSeq, browseProject, readProjectFile, openTerminal, sendTerminal, closeTerminal, startSidecar, sendSidecar, closeSidecar, renderSlot, t } = props;
			const sessions = useSessions((value) => value);
			const workspaces = useWorkspaces((value) => value);
			const [view, setView] = (0, react.useState)("chats");
			const [contactList, setContactList] = (0, react.useState)("frequent");
			const [mode, setMode] = (0, react.useState)(() => readStored(MODE_KEY, "persona"));
			const [query, setQuery] = (0, react.useState)("");
			const deferredQuery = (0, react.useDeferredValue)(query.trim().toLocaleLowerCase());
			const [contacts, setContacts] = (0, react.useState)([]);
			const [externalJoined, setExternalJoined] = (0, react.useState)(() => readStored(EXTERNAL_KEY, []));
			const [externalResults, setExternalResults] = (0, react.useState)([]);
			const [favorites, setFavorites] = (0, react.useState)(() => readStored(FAVORITES_KEY, []));
			const [savedRooms, setSavedRooms] = (0, react.useState)(() => readStored(SAVED_ROOMS_KEY, []));
			const [groups, setGroups] = (0, react.useState)(storedGroups);
			const [chatBindings, setChatBindings] = (0, react.useState)(storedBindings);
			const [state, setState] = (0, react.useState)(() => readStored(STATE_KEY, EMPTY_SKILL_CHAT_STATE));
			const stateRef = (0, react.useRef)(state);
			const [workspaceId, setWorkspaceId] = (0, react.useState)(() => {
				return readStored(WORKSPACE_KEY, null) ?? void 0;
			});
			const [selected, setSelected] = (0, react.useState)(null);
			const [editingPersona, setEditingPersona] = (0, react.useState)(false);
			const [personaName, setPersonaName] = (0, react.useState)("");
			const [personaAvatar, setPersonaAvatar] = (0, react.useState)("fox-coral");
			const [groupOpen, setGroupOpen] = (0, react.useState)(false);
			const [createOpen, setCreateOpen] = (0, react.useState)(false);
			const createRef = useDismiss(createOpen, () => {
				setCreateOpen(false);
			});
			const [groupMoreOpen, setGroupMoreOpen] = (0, react.useState)(false);
			const [archiveConfirm, setArchiveConfirm] = (0, react.useState)(null);
			const [dragRoom, setDragRoom] = (0, react.useState)(null);
			const [dropRoom, setDropRoom] = (0, react.useState)(null);
			const [roomMenu, setRoomMenu] = (0, react.useState)(null);
			const [deleteConfirm, setDeleteConfirm] = (0, react.useState)(null);
			const [showArchived, setShowArchived] = (0, react.useState)(false);
			const [rootBusy, setRootBusy] = (0, react.useState)(null);
			const [groupName, setGroupName] = (0, react.useState)("");
			const [groupPrompt, setGroupPrompt] = (0, react.useState)("");
			const [groupAvatar, setGroupAvatar] = (0, react.useState)("bear-honey");
			const [groupMembers, setGroupMembers] = (0, react.useState)([]);
			const [groupWorkspaceIds, setGroupWorkspaceIds] = (0, react.useState)([]);
			const [memberQuery, setMemberQuery] = (0, react.useState)("");
			const deferredMemberQuery = (0, react.useDeferredValue)(memberQuery.trim().toLocaleLowerCase());
			const [workspaceOpen, setWorkspaceOpen] = (0, react.useState)(false);
			const workspaceRef = useDismiss(workspaceOpen, () => {
				setWorkspaceOpen(false);
			});
			const [roomSettingsOpen, setRoomSettingsOpen] = (0, react.useState)(false);
			const [roomTitleDraft, setRoomTitleDraft] = (0, react.useState)("");
			const [roomPromptDraft, setRoomPromptDraft] = (0, react.useState)("");
			const [roomAvatarDraft, setRoomAvatarDraft] = (0, react.useState)("bear-honey");
			const [roomWorkspaceIds, setRoomWorkspaceIds] = (0, react.useState)([]);
			const [projectTool, setProjectTool] = (0, react.useState)(null);
			const [projectListing, setProjectListing] = (0, react.useState)(null);
			const [projectListingError, setProjectListingError] = (0, react.useState)(null);
			const [projectFile, setProjectFile] = (0, react.useState)(null);
			const [terminal, setTerminal] = (0, react.useState)(null);
			const [terminalCommand, setTerminalCommand] = (0, react.useState)("");
			const [terminalBusy, setTerminalBusy] = (0, react.useState)(false);
			const [browserUrl, setBrowserUrl] = (0, react.useState)("http://127.0.0.1:56517/");
			const [browserDraft, setBrowserDraft] = (0, react.useState)("http://127.0.0.1:56517/");
			const [browserHistory, setBrowserHistory] = (0, react.useState)(["http://127.0.0.1:56517/"]);
			const [browserHistoryIndex, setBrowserHistoryIndex] = (0, react.useState)(0);
			const [browserKey, setBrowserKey] = (0, react.useState)(0);
			const [sidecarOpen, setSidecarOpen] = (0, react.useState)(false);
			const [sidecarId, setSidecarId] = (0, react.useState)(null);
			const [sidecarDraft, setSidecarDraft] = (0, react.useState)("");
			const [sidecarMessages, setSidecarMessages] = (0, react.useState)([]);
			const [sidecarBusy, setSidecarBusy] = (0, react.useState)(false);
			const [sidecarError, setSidecarError] = (0, react.useState)(null);
			const [automationOpen, setAutomationOpen] = (0, react.useState)(false);
			const [automationName, setAutomationName] = (0, react.useState)("");
			const [automationPrompt, setAutomationPrompt] = (0, react.useState)("");
			const [automationWhen, setAutomationWhen] = (0, react.useState)("");
			const [automationSchedule, setAutomationSchedule] = (0, react.useState)("once");
			const [automationInterval, setAutomationInterval] = (0, react.useState)("1");
			const [automationUnit, setAutomationUnit] = (0, react.useState)("d");
			const [phase, setPhase] = (0, react.useState)("idle");
			const [externalPhase, setExternalPhase] = (0, react.useState)("idle");
			const [installingId, setInstallingId] = (0, react.useState)(null);
			const [contactsRevision, setContactsRevision] = (0, react.useState)(0);
			const [notice, setNotice] = (0, react.useState)(null);
			const [stateReady, setStateReady] = (0, react.useState)(false);
			const currentSessionId = sessions.current;
			const allContacts = (0, react.useMemo)(() => [...externalJoined, ...contacts.filter((contact) => !externalJoined.some((item) => item.id === contact.id || item.name === contact.name))], [contacts, externalJoined]);
			const currentWorkspaceId = (0, react.useMemo)(() => workspaces.items.find((workspace) => currentSessionId !== void 0 && workspace.sessionIds.includes(currentSessionId))?.workspaceId, [currentSessionId, workspaces.items]);
			const currentWorkspace = (0, react.useMemo)(() => workspaces.items.find((workspace) => workspace.workspaceId === workspaceId), [workspaceId, workspaces.items]);
			const activeRoom = (0, react.useMemo)(() => roomForSession(state.rooms, state.roomSessions, currentSessionId), [
				currentSessionId,
				state.roomSessions,
				state.rooms
			]);
			const activeWorkspace = (0, react.useMemo)(() => activeRoom === void 0 ? currentWorkspace : workspaces.items.find((workspace) => workspace.workspaceId === activeRoom.workspaceId) ?? currentWorkspace, [
				activeRoom,
				currentWorkspace,
				workspaces.items
			]);
			const archivedRooms = (0, react.useMemo)(() => state.rooms.filter((room) => room.workspaceId === workspaceId && room.archivedAt !== void 0).sort((left, right) => (right.archivedAt ?? 0) - (left.archivedAt ?? 0)), [state.rooms, workspaceId]);
			const visibleRooms = (0, react.useMemo)(() => orderRooms(state.rooms.filter((room) => room.archivedAt === void 0 && (room.workspaceId === workspaceId || (room.workspaceIds ?? []).includes(workspaceId) || savedRooms.includes(room.roomId)))), [
				savedRooms,
				state.rooms,
				workspaceId
			]);
			const filtered = (0, react.useMemo)(() => allContacts.filter((skill) => matches(skill, deferredQuery, state.personas)), [
				allContacts,
				deferredQuery,
				state.personas
			]);
			const frequent = (0, react.useMemo)(() => {
				const pinned = filtered.filter((contact) => favorites.includes(contact.id));
				return pinned.length > 0 ? pinned : filtered.slice(0, 8);
			}, [favorites, filtered]);
			const visibleContacts = contactList === "frequent" && deferredQuery.length === 0 ? frequent : filtered;
			const roomResults = (0, react.useMemo)(() => {
				const needle = deferredQuery.trim().toLowerCase();
				if (needle === "") return visibleRooms;
				return visibleRooms.filter((room) => room.title.toLowerCase().includes(needle) || state.roomSessions.some((session) => session.roomId === room.roomId && session.title.toLowerCase().includes(needle)));
			}, [
				deferredQuery,
				state.roomSessions,
				visibleRooms
			]);
			const visibleMemberContacts = (0, react.useMemo)(() => allContacts.filter((contact) => matches(contact, deferredMemberQuery, state.personas)), [
				allContacts,
				deferredMemberQuery,
				state.personas
			]);
			/**
			* Resolve a stored member id to a contact.
			*
			* A contact id is `<root>:<plugin>:<name>`, so widening the catalog's roster
			* re-keys contacts and orphans ids already stored in rooms. The trailing
			* segment is the Skill's name, which is unique after dedup, so it recovers
			* the member without a migration.
			* @param id - the stored contact id.
			* @returns the contact, or undefined when the Skill is gone entirely.
			*/
			const memberContact = (id) => allContacts.find((contact) => contact.id === id) ?? allContacts.find((contact) => contact.name === id.slice(id.lastIndexOf(":") + 1));
			const activeMembers = activeRoom?.memberIds.flatMap((id) => memberContact(id) ?? []) ?? [];
			const activeCoordinator = activeRoom === void 0 ? void 0 : memberContact(activeRoom.coordinatorId) ?? activeMembers[0];
			const currentSessionBlank = currentSessionId === void 0 ? false : sessions.byId[currentSessionId]?.blank === true;
			const replaceState = (next) => {
				stateRef.current = next;
				setState(next);
				store(STATE_KEY, next);
				return next;
			};
			const updateState = (recipe) => {
				return replaceState(recipe(stateRef.current));
			};
			(0, react.useEffect)(() => {
				const abort = new AbortController();
				loadState(abort.signal).then((remoteState) => {
					if (abort.signal.aborted) return;
					replaceState(preferLocalState(remoteState, stateRef.current) ? stateRef.current : remoteState);
					setStateReady(true);
				}, (error) => {
					if (abort.signal.aborted) return;
					setNotice(`会话状态加载失败，本次改动不会保存：${error instanceof Error ? error.message : String(error)}`);
				});
				return () => {
					abort.abort();
				};
			}, [loadState]);
			(0, react.useEffect)(() => {
				if (!stateReady) return;
				const abort = new AbortController();
				const timer = window.setTimeout(() => {
					saveState(state, abort.signal).catch((error) => {
						if (!abort.signal.aborted) setNotice(`状态保存失败：${error instanceof Error ? error.message : String(error)}`);
					});
				}, 180);
				return () => {
					window.clearTimeout(timer);
					abort.abort();
				};
			}, [
				saveState,
				state,
				stateReady
			]);
			(0, react.useEffect)(() => {
				const abort = new AbortController();
				setPhase("loading");
				loadContacts(currentSessionId, abort.signal).then((next) => {
					if (!abort.signal.aborted) {
						setContacts(next);
						setPhase("ready");
					}
				}, () => {
					if (!abort.signal.aborted) setPhase("error");
				});
				return () => {
					abort.abort();
				};
			}, [
				contactsRevision,
				currentSessionId,
				groupOpen,
				loadContacts,
				view
			]);
			(0, react.useEffect)(() => {
				const next = ensurePersonas(allContacts, state.personas);
				if (next !== state.personas) updateState((current) => ({
					...current,
					personas: next
				}));
			}, [allContacts, state.personas]);
			(0, react.useEffect)(() => {
				if (state.migratedAt !== void 0 || sessions.ids.length === 0) return;
				const migrated = migrateLegacyState(groups, chatBindings, Object.fromEntries(sessions.ids.map((sessionId) => [sessionId, workspaces.items.find((workspace) => workspace.sessionIds.includes(sessionId))?.workspaceId])), Object.fromEntries(sessions.ids.map((sessionId) => [sessionId, sessions.byId[sessionId]?.updatedAt ?? 0])));
				updateState((current) => ({
					...current,
					...migrated,
					rooms: [...current.rooms, ...migrated.rooms.filter((room) => !current.rooms.some((item) => item.roomId === room.roomId))],
					roomSessions: [...current.roomSessions, ...migrated.roomSessions.filter((session) => !current.roomSessions.some((item) => item.roomSessionId === session.roomSessionId))]
				}));
			}, [
				chatBindings,
				groups,
				sessions.byId,
				sessions.ids,
				state.migratedAt,
				workspaces.items
			]);
			(0, react.useEffect)(() => {
				const catalogQuery = view === "contacts" ? deferredQuery : groupOpen || roomSettingsOpen ? deferredMemberQuery : "";
				if (catalogQuery.length < 2) {
					setExternalResults([]);
					setExternalPhase("idle");
					return;
				}
				const abort = new AbortController();
				const timer = window.setTimeout(() => {
					setExternalPhase("loading");
					searchExternal(catalogQuery, abort.signal).then((value) => {
						if (!abort.signal.aborted) {
							setExternalResults(value);
							setExternalPhase("ready");
						}
					}, () => {
						if (!abort.signal.aborted) {
							setExternalResults([]);
							setExternalPhase("ready");
						}
					});
				}, 220);
				return () => {
					window.clearTimeout(timer);
					abort.abort();
				};
			}, [
				deferredMemberQuery,
				deferredQuery,
				groupOpen,
				roomSettingsOpen,
				searchExternal,
				view
			]);
			(0, react.useEffect)(() => {
				store(MODE_KEY, mode);
			}, [mode]);
			(0, react.useEffect)(() => {
				store(FAVORITES_KEY, favorites);
			}, [favorites]);
			(0, react.useEffect)(() => {
				store(SAVED_ROOMS_KEY, savedRooms);
			}, [savedRooms]);
			(0, react.useEffect)(() => {
				store(GROUPS_KEY, groups);
			}, [groups]);
			(0, react.useEffect)(() => {
				store(EXTERNAL_KEY, externalJoined);
			}, [externalJoined]);
			(0, react.useEffect)(() => {
				store(CHAT_BINDINGS_KEY, chatBindings);
			}, [chatBindings]);
			(0, react.useEffect)(() => {
				if (workspaceId !== void 0) store(WORKSPACE_KEY, workspaceId);
			}, [workspaceId]);
			(0, react.useEffect)(() => {
				if (currentWorkspaceId !== void 0) {
					setWorkspaceId(currentWorkspaceId);
					return;
				}
				setWorkspaceId((current) => current !== void 0 && workspaces.items.some((workspace) => workspace.workspaceId === current) ? current : workspaces.items[0]?.workspaceId);
			}, [currentWorkspaceId, workspaces.items]);
			(0, react.useEffect)(() => {
				if (activeRoom === void 0 || activeMembers.length === 0) return;
				const binding = {
					name: activeRoom.title,
					avatar: state.personas[activeRoom.coordinatorId]?.avatarId ?? "fox-coral",
					kind: activeRoom.type === "group" ? "group" : "contact",
					members: activeMembers,
					roomId: activeRoom.roomId,
					...activeRoom.type === "group" ? { groupId: activeRoom.roomId.replace("room:group:", "") } : {}
				};
				if (currentSessionId !== void 0 && chatBindings[currentSessionId]?.roomId !== activeRoom.roomId) setChatBindings((current) => ({
					...current,
					[currentSessionId]: binding
				}));
			}, [
				activeMembers,
				activeRoom,
				chatBindings,
				currentSessionId,
				state.personas
			]);
			(0, react.useEffect)(() => {
				if (activeRoom === void 0) return;
				const assign = () => {
					for (const reply of document.querySelectorAll("[data-chat-flow-kind=\"assistant-step\"]:has([data-assistant-reply])")) {
						const turn = reply.dataset.chatTurn;
						const user = turn === void 0 ? void 0 : [...document.querySelectorAll("[data-chat-flow-kind=\"user\"]")].find((node) => node.dataset.chatTurn === turn);
						const answer = reply.querySelector("[data-assistant-reply]")?.textContent ?? "";
						const responder = responderForMessage(activeMembers, activeRoom.coordinatorId, user?.textContent ?? "", mode, answer);
						if (responder === void 0) continue;
						const display = displayOf(responder, mode, state.personas);
						reply.dataset.skillResponder = display.name;
						reply.style.setProperty("--ds-chat-speaker-avatar", `url("${avatarDataUri(display.avatar, 64)}")`);
					}
				};
				assign();
				const observer = new MutationObserver(assign);
				observer.observe(document.body, {
					childList: true,
					subtree: true,
					characterData: true
				});
				return () => {
					observer.disconnect();
				};
			}, [
				activeMembers,
				activeRoom,
				mode,
				state.personas
			]);
			(0, react.useEffect)(() => {
				if (activeRoom === void 0) return;
				const headline = [...document.querySelectorAll("span")].find((node) => ["Into the Unknown", "探索未至之境"].includes(node.textContent.trim()));
				if (headline === void 0) return;
				const welcome = headline.parentElement?.parentElement;
				if (welcome === null || welcome === void 0) return;
				const original = headline.textContent;
				headline.textContent = activeRoom.type === "general" ? t("startNewChat") : `和「${activeRoom.title}」一起开始`;
				welcome.dataset.skillChatWelcome = activeRoom.type;
				welcome.dataset.skillChatHint = activeRoom.type === "general" ? t("plainChatHint") : activeRoom.type === "group" ? t("composerGroup") : t("composerSkill");
				return () => {
					headline.textContent = original;
					delete welcome.dataset.skillChatWelcome;
					delete welcome.dataset.skillChatHint;
				};
			}, [activeRoom]);
			const bindChat = (sessionId, binding) => {
				setChatBindings((current) => ({
					...current,
					[sessionId]: binding
				}));
			};
			/**
			* Cut a branch of this conversation at one message.
			*
			* The Host copies the prefix into a child Session; recording that child as a
			* Room Session is what keeps it inside the room — same members, same
			* portraits, and reachable from 历史 beside the branch it came from. Nothing
			* is removed: the original stays exactly where it was.
			* @param room - the room the conversation belongs to.
			* @param sessionId - the Session being branched.
			* @param atSeq - log sequence to cut at.
			* @param kind - `revert` keeps the title, `fork` takes a numbered one.
			*/
			const branchRoomSession = async (room, sessionId, atSeq, kind) => {
				const childId = await forkSession(sessionId, atSeq, kind === "fork");
				const members = room.memberIds.flatMap((id) => allContacts.find((contact) => contact.id === id) ?? []);
				const now = Date.now();
				const roomSessionId = `room-session:${childId}`;
				const source = stateRef.current.roomSessions.find((item) => item.harnessSessionId === sessionId);
				const roomSession = {
					roomSessionId,
					roomId: room.roomId,
					harnessSessionId: childId,
					title: kind === "fork" ? `${source?.title ?? room.title} · ${t("branchSuffix")}` : source?.title ?? room.title,
					memberSnapshot: source?.memberSnapshot ?? members.map((member) => {
						const display = displayOf(member, "persona", state.personas);
						return {
							skillId: member.id,
							displayName: display.name,
							avatarId: display.avatar,
							originalName: member.name
						};
					}),
					createdAt: now,
					updatedAt: now
				};
				await saveState(updateState((current) => {
					const stored = current.rooms.find((item) => item.roomId === room.roomId) ?? room;
					return {
						...current,
						roomSessions: [...current.roomSessions, roomSession],
						rooms: current.rooms.map((item) => item.roomId === room.roomId ? {
							...stored,
							sessionIds: [...stored.sessionIds, roomSessionId],
							activeSessionId: roomSessionId,
							updatedAt: now
						} : item)
					};
				}), new AbortController().signal);
				openSession(childId);
				setNotice(kind === "fork" ? t("forkedNotice") : t("revertedNotice"));
			};
			const createRoomSession = async (room, draft = true) => {
				const sessionId = await startSession(room.workspaceId);
				if (room.type === "general") await renameSession(sessionId, room.title);
				const members = room.memberIds.flatMap((id) => allContacts.find((contact) => contact.id === id) ?? []);
				const group = roomGroup(room, allContacts);
				const coordinator = members.find((member) => member.id === room.coordinatorId) ?? members[0];
				const now = Date.now();
				const roomSessionId = `room-session:${sessionId}`;
				const roomSession = {
					roomSessionId,
					roomId: room.roomId,
					harnessSessionId: sessionId,
					title: room.title,
					memberSnapshot: members.map((member) => ({
						skillId: member.id,
						displayName: displayOf(member, "persona", state.personas).name,
						avatarId: displayOf(member, "persona", state.personas).avatar,
						originalName: member.name
					})),
					createdAt: now,
					updatedAt: now
				};
				await saveState(updateState((current) => {
					const storedRoom = current.rooms.find((item) => item.roomId === room.roomId) ?? room;
					const updatedRoom = {
						...storedRoom,
						sessionIds: [...storedRoom.sessionIds, roomSessionId],
						activeSessionId: roomSessionId,
						updatedAt: now
					};
					return {
						...current,
						roomSessions: [...current.roomSessions, roomSession],
						rooms: current.rooms.some((item) => item.roomId === room.roomId) ? current.rooms.map((item) => item.roomId === room.roomId ? updatedRoom : item) : [...current.rooms, updatedRoom]
					};
				}), new AbortController().signal);
				bindChat(sessionId, {
					name: room.title,
					avatar: coordinator === void 0 ? "fox-coral" : displayOf(coordinator, "persona", state.personas).avatar,
					kind: room.type === "group" ? "group" : "contact",
					members,
					roomId: room.roomId,
					...room.type === "group" ? { groupId: group.id } : {}
				});
				openSession(sessionId);
				if (draft && room.type === "direct" && members[0] !== void 0) await chooseContact(sessionId, members[0], displayOf(members[0], mode, state.personas).name);
				if (draft && room.type === "group") await chooseGroup(sessionId, group, members.map((member) => displayOf(member, mode, state.personas).name));
				return sessionId;
			};
			const openRoom = async (room) => {
				if (workspaceId !== void 0 && !(room.workspaceIds ?? [room.workspaceId]).includes(workspaceId)) updateRoom(room.roomId, { workspaceIds: [...room.workspaceIds ?? [room.workspaceId], workspaceId] });
				ensureLinked(room.memberIds);
				const sessionId = activeHarnessSession(room, stateRef.current.roomSessions);
				if (sessionId !== void 0 && sessions.byId[sessionId] !== void 0) {
					openSession(sessionId);
					return;
				}
				await createRoomSession(room);
			};
			/**
			* Make these Skills loadable by the model.
			*
			* A scanned Skill is only a contact card: the Host's Skill service never saw
			* it, so a model that tries to load one gets `skill "X" is unknown or no
			* longer available` — which is what happened whenever a group of imported
			* Skills was actually put to work. Linking the bundle into the Harness's own
			* Skill root registers it for real, and the Host watches that directory, so
			* the catalog updates without a restart.
			*
			* Linking on membership rather than on a button: a Skill in a room is a Skill
			* the person expects to work. Failures are reported once and do not block the
			* room — an unlinked member still participates as a persona.
			* @param ids - contact ids joining a room.
			*/
			const ensureLinked = (ids) => {
				const pending = ids.flatMap((id) => {
					const contact = memberContact(id);
					return contact?.source === "workbuddy" && contact.path !== void 0 ? [{
						path: contact.path,
						name: contact.name
					}] : [];
				});
				if (pending.length === 0) return;
				const abort = new AbortController();
				Promise.allSettled(pending.map((entry) => linkSkill(entry.path, entry.name, abort.signal))).then((results) => {
					const failed = results.filter((result) => result.status === "rejected").length;
					if (failed > 0) setNotice(`${t("enableSkillFailed")}：${failed}/${pending.length}`);
					setContactsRevision((current) => current + 1);
				});
			};
			const beginContactChat = async (contact) => {
				if (workspaceId === void 0) {
					setNotice(t("workspaceRequired"));
					return;
				}
				const existing = state.rooms.find((room) => room.type === "direct" && room.workspaceId === workspaceId && room.memberIds[0] === contact.id && room.archivedAt === void 0);
				ensureLinked([contact.id]);
				const display = displayOf(contact, "persona", state.personas);
				const room = existing ?? {
					roomId: `room:direct:${workspaceId}:${contact.id}`,
					type: "direct",
					workspaceId,
					workspaceIds: [workspaceId],
					title: display.name,
					memberIds: [contact.id],
					coordinatorId: contact.id,
					sessionIds: [],
					createdAt: Date.now(),
					updatedAt: Date.now()
				};
				if (existing === void 0) updateState((current) => ({
					...current,
					rooms: [...current.rooms, room]
				}));
				await openRoom(room);
				setSelected(null);
				setNotice(null);
			};
			const beginGeneralChat = async () => {
				if (workspaceId === void 0) {
					setNotice(t("workspaceRequired"));
					return;
				}
				const now = Date.now();
				const room = {
					roomId: `room:general:${randomUUID()}`,
					type: "general",
					workspaceId,
					workspaceIds: [workspaceId],
					title: t("plainChat"),
					memberIds: [],
					coordinatorId: "",
					sessionIds: [],
					createdAt: now,
					updatedAt: now
				};
				updateState((current) => ({
					...current,
					rooms: [room, ...current.rooms]
				}));
				await createRoomSession(room, false);
				setView("chats");
				setNotice(null);
			};
			const createGroup = () => {
				if (workspaceId === void 0) {
					setNotice(t("workspaceRequired"));
					return;
				}
				const members = allContacts.filter((contact) => groupMembers.includes(contact.id));
				if (members.length < 2) return;
				ensureLinked(members.map((member) => member.id));
				const now = Date.now();
				const roomId = `room:group:${randomUUID()}`;
				const coordinator = members[0];
				if (coordinator === void 0) return;
				const title = groupName.trim() || members.map((member) => displayOf(member, "persona", state.personas).name).join("、");
				const linkedWorkspaces = groupWorkspaceIds.length === 0 ? [workspaceId] : groupWorkspaceIds;
				const room = {
					roomId,
					type: "group",
					workspaceId: linkedWorkspaces[0] ?? workspaceId,
					workspaceIds: linkedWorkspaces,
					avatarId: groupAvatar,
					title,
					memberIds: members.map((member) => member.id),
					coordinatorId: coordinator.id,
					systemPrompt: groupPrompt.trim() || generatedGroupPrompt(title, members),
					sessionIds: [],
					createdAt: now,
					updatedAt: now
				};
				updateState((current) => ({
					...current,
					rooms: [...current.rooms, room]
				}));
				setGroups((current) => [...current, roomGroup(room, allContacts)]);
				setGroupOpen(false);
				setGroupMembers([]);
				setGroupName("");
				setGroupPrompt("");
				setGroupAvatar("bear-honey");
				setGroupWorkspaceIds([]);
				setMemberQuery("");
				setView("chats");
				openRoom(room);
			};
			const savePersona = () => {
				if (selected === null) return;
				const base = state.personas[selected.id] ?? defaultPersona(selected);
				const displayName = personaName.trim() || base.displayName;
				updateState((current) => ({
					...current,
					personas: {
						...current.personas,
						[selected.id]: {
							...base,
							displayName,
							avatarId: personaAvatar,
							customizedName: displayName !== defaultPersona(selected, 0).displayName,
							customizedAvatar: personaAvatar !== defaultPersona(selected, 0).avatarId,
							updatedAt: Date.now()
						}
					},
					rooms: current.rooms.map((room) => room.type === "direct" && room.memberIds[0] === selected.id ? {
						...room,
						title: displayName,
						updatedAt: Date.now()
					} : room)
				}));
				setEditingPersona(false);
			};
			const resetPersona = () => {
				if (selected === null) return;
				const reset = defaultPersona(selected);
				updateState((current) => ({
					...current,
					personas: {
						...current.personas,
						[selected.id]: reset
					},
					rooms: current.rooms.map((room) => room.type === "direct" && room.memberIds[0] === selected.id ? {
						...room,
						title: reset.displayName,
						updatedAt: Date.now()
					} : room)
				}));
				setEditingPersona(false);
			};
			/** Pin or unpin one room. Pinning clears any manual position: the room is
			* moving to the other band, where its old index means nothing. */
			const togglePin = (room) => {
				updateState((current) => ({
					...current,
					rooms: current.rooms.map((item) => {
						if (item.roomId !== room.roomId) return item;
						const { pinnedAt: _pinned, order: _order, ...rest } = item;
						return room.pinnedAt === void 0 ? {
							...rest,
							pinnedAt: Date.now()
						} : rest;
					})
				}));
			};
			/**
			* Move a dragged room in front of another, writing an explicit position for
			* every room in the band. Numbering the whole band rather than the two rows
			* involved keeps one drag from leaving neighbours to fall back to recency
			* and jump around it.
			* @param draggedId - the room being moved.
			* @param targetId - the room it was dropped on.
			*/
			const reorderRooms = (draggedId, targetId) => {
				if (draggedId === targetId) return;
				const dragged = visibleRooms.find((room) => room.roomId === draggedId);
				const target = visibleRooms.find((room) => room.roomId === targetId);
				if (dragged === void 0 || target === void 0) return;
				if (dragged.pinnedAt === void 0 !== (target.pinnedAt === void 0)) return;
				const without = visibleRooms.filter((room) => room.pinnedAt === void 0 === (dragged.pinnedAt === void 0)).filter((room) => room.roomId !== draggedId);
				const at = without.findIndex((room) => room.roomId === targetId);
				const next = [
					...without.slice(0, at),
					dragged,
					...without.slice(at)
				];
				const positions = new Map(next.map((room, index) => [room.roomId, index]));
				updateState((current) => ({
					...current,
					rooms: current.rooms.map((item) => positions.has(item.roomId) ? {
						...item,
						order: positions.get(item.roomId) ?? 0
					} : item)
				}));
			};
			/** Bring an archived room back. The field is dropped rather than set to
			* `undefined`: the stored document is compared by value, and a key holding
			* `undefined` is not the same shape as no key at all. */
			const restoreRoom = (roomId) => {
				updateState((current) => ({
					...current,
					rooms: current.rooms.map((item) => {
						if (item.roomId !== roomId) return item;
						const { archivedAt: _archived, ...rest } = item;
						return {
							...rest,
							updatedAt: Date.now()
						};
					})
				}));
			};
			/** Remove a room and every session record that belonged to it. The Harness
			* Sessions themselves are left alone: they are the project's history, and
			* this only drops the chat-shaped view of them. */
			const deleteRoom = (roomId) => {
				updateState((current) => ({
					...current,
					rooms: current.rooms.filter((item) => item.roomId !== roomId),
					roomSessions: current.roomSessions.filter((item) => item.roomId !== roomId),
					automations: current.automations.filter((item) => item.roomId !== roomId)
				}));
			};
			const updateRoom = (roomId, patch) => {
				updateState((current) => ({
					...current,
					rooms: current.rooms.map((room) => room.roomId === roomId ? {
						...room,
						...patch,
						updatedAt: Date.now()
					} : room)
				}));
			};
			const toggleActiveRoomMember = (skillId) => {
				if (activeRoom === void 0 || activeRoom.type !== "group") return;
				const included = activeRoom.memberIds.includes(skillId);
				const memberIds = included ? activeRoom.memberIds.filter((id) => id !== skillId) : [...activeRoom.memberIds, skillId];
				if (memberIds.length < 2) {
					setNotice(t("groupNeedsMember"));
					return;
				}
				if (!included) ensureLinked([skillId]);
				updateRoom(activeRoom.roomId, {
					memberIds,
					coordinatorId: memberIds.includes(activeRoom.coordinatorId) ? activeRoom.coordinatorId : memberIds[0] ?? activeRoom.coordinatorId
				});
			};
			const createAutomation = async () => {
				if (workspaceId === void 0 || activeRoom === void 0 || automationPrompt.trim() === "") return;
				const timestamp = automationWhen === "" ? Date.now() : Date.parse(automationWhen);
				const interval = Math.max(1, Number.parseInt(automationInterval, 10) || 1);
				const automation = {
					automationId: `automation:${randomUUID()}`,
					name: automationName.trim() || t("untitledAutomation"),
					workspaceId,
					roomId: activeRoom.roomId,
					intent: "custom",
					prompt: automationPrompt.trim(),
					memberIds: activeRoom.memberIds,
					coordinatorId: activeRoom.coordinatorId,
					schedule: automationSchedule === "once" ? {
						kind: "once",
						runAt: new Date(timestamp).toISOString()
					} : {
						kind: "recurring",
						rule: `every:${interval}${automationUnit}`,
						timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
					},
					lifecycle: automationSchedule === "once" ? "run-once" : "continuous",
					status: "active",
					createdAt: Date.now(),
					updatedAt: Date.now(),
					nextRunAt: timestamp
				};
				const next = updateState((current) => ({
					...current,
					automations: [...current.automations, automation]
				}));
				try {
					await saveState(next, new AbortController().signal);
					setAutomationOpen(false);
					setAutomationName("");
					setAutomationPrompt("");
					setAutomationWhen("");
					setAutomationSchedule("once");
					setAutomationInterval("1");
					setAutomationUnit("d");
					setNotice(t("automationCreated"));
				} catch (error) {
					setNotice(`自动化保存失败：${error instanceof Error ? error.message : String(error)}`);
				}
			};
			const runAutomation = async (automation) => {
				const abort = new AbortController();
				try {
					await saveState(stateRef.current, abort.signal);
					const result = await runAutomationRemote(automation.automationId, abort.signal);
					replaceState(result.state);
					openSession(result.sessionId);
					setNotice(t("automationStarted"));
				} catch (error) {
					setNotice(`自动化运行失败：${error instanceof Error ? error.message : String(error)}`);
				}
			};
			const joinExternal = async (contact, target) => {
				if (workspaceId === void 0) {
					setNotice(t("workspaceRequired"));
					return;
				}
				const abort = new AbortController();
				setInstallingId(contact.id);
				try {
					const installed = await props.installExternal(workspaceId, contact, abort.signal);
					setExternalJoined((current) => [...current.filter((item) => item.id !== installed.id), installed]);
					setContactsRevision((value) => value + 1);
					if (target === "draft-group") setGroupMembers((current) => current.includes(installed.id) ? current : [...current, installed.id]);
					else if (target === "active-group" && activeRoom?.type === "group") updateRoom(activeRoom.roomId, { memberIds: activeRoom.memberIds.includes(installed.id) ? activeRoom.memberIds : [...activeRoom.memberIds, installed.id] });
					else selectContact(installed);
					setNotice(`${t("skillInstalled").replace("{name}", installed.name)}${target === void 0 ? "，已加入智能体列表" : "，已加入群组"}`);
				} catch (error) {
					setNotice(`${t("skillInstallFailed").replace("{name}", contact.name)}：${error instanceof Error ? error.message : String(error)}`);
				} finally {
					setInstallingId(null);
				}
			};
			const createWorkspace = async () => {
				try {
					const created = await addWorkspace();
					if (created !== null) setWorkspaceId(created);
				} catch {
					setNotice(t("workspaceAddFailed"));
				}
			};
			const addLinkedWorkspace = async (target) => {
				try {
					const created = await addWorkspace();
					if (created === null) return;
					if (target === "create") setGroupWorkspaceIds((current) => current.includes(created) ? current : [...current, created]);
					else setRoomWorkspaceIds((current) => current.includes(created) ? current : [...current, created]);
				} catch {
					setNotice(t("workspaceAddFailed"));
				}
			};
			const toggleWorkspaceBinding = (target, id) => {
				const update = (current) => current.includes(id) ? current.length > 1 ? current.filter((item) => item !== id) : current : [...current, id];
				if (target === "create") setGroupWorkspaceIds(update);
				else setRoomWorkspaceIds(update);
			};
			const toggleFavorite = (id) => {
				setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
			};
			const selectContact = (contact) => {
				const identity = state.personas[contact.id] ?? defaultPersona(contact);
				setSelected(contact);
				setPersonaName(identity.displayName);
				setPersonaAvatar(identity.avatarId);
				setEditingPersona(false);
			};
			const dueAutomations = state.automations.filter((item) => item.workspaceId === workspaceId && item.status === "active").length;
			const visibleGroups = (0, react.useMemo)(() => visibleRooms.filter((room) => room.type === "group"), [visibleRooms]);
			const groupResults = (0, react.useMemo)(() => {
				const needle = deferredQuery.trim().toLocaleLowerCase();
				if (needle.length === 0) return visibleGroups;
				return visibleGroups.filter((room) => room.title.toLocaleLowerCase().includes(needle));
			}, [deferredQuery, visibleGroups]);
			const roomAvatar = (room, compact = false) => {
				if (room.type === "general") return (0, react_jsx_runtime.jsx)("span", {
					className: SkillContactsBrowser_module_css_default.generalAvatar,
					"data-compact": compact || void 0,
					children: "✦"
				});
				if (room.type === "group") {
					const members = room.memberIds.slice(0, 4).flatMap((id) => {
						const contact = memberContact(id);
						if (contact === void 0) return [];
						return [{
							id,
							...displayOf(contact, "persona", state.personas)
						}];
					});
					if (members.length === 0) return (0, react_jsx_runtime.jsx)(GroupAvatar, {
						avatarId: room.avatarId ?? ANIMAL_AVATARS[hashOf(room.roomId) % ANIMAL_AVATARS.length] ?? "bear-honey",
						label: room.title,
						small: compact
					});
					return (0, react_jsx_runtime.jsx)("span", {
						className: SkillContactsBrowser_module_css_default.roomTile,
						"data-count": members.length,
						"data-compact": compact || void 0,
						title: room.title,
						children: members.map((member) => (0, react_jsx_runtime.jsx)(Avatar, {
							avatarId: member.avatar,
							label: member.name,
							size: compact ? 13 : 17
						}, member.id))
					});
				}
				const contact = allContacts.find((item) => item.id === room.memberIds[0]);
				const identity = contact === void 0 ? {
					name: room.title,
					avatar: "fox-coral"
				} : displayOf(contact, "persona", state.personas);
				return (0, react_jsx_runtime.jsx)(AnimalAvatar, {
					avatarId: identity.avatar,
					label: identity.name,
					small: compact
				});
			};
			const openHistorySession = (room, item) => {
				updateState((current) => ({
					...current,
					rooms: current.rooms.map((candidate) => candidate.roomId === room.roomId ? {
						...candidate,
						activeSessionId: item.roomSessionId,
						updatedAt: Date.now()
					} : candidate)
				}));
				openSession(item.harnessSessionId);
			};
			const openGroupCreator = () => {
				setGroupName("");
				setGroupPrompt("");
				setGroupMembers([]);
				setGroupAvatar(ANIMAL_AVATARS[hashOf(`${workspaceId ?? ""}:${Date.now()}`) % ANIMAL_AVATARS.length] ?? "bear-honey");
				setGroupWorkspaceIds(workspaceId === void 0 ? [] : [workspaceId]);
				setMemberQuery("");
				setGroupOpen(true);
			};
			const openRoomSettings = (room) => {
				setRoomTitleDraft(room.title);
				setRoomPromptDraft(room.systemPrompt ?? generatedGroupPrompt(room.title, room.memberIds.flatMap((id) => allContacts.find((contact) => contact.id === id) ?? [])));
				setRoomAvatarDraft(room.avatarId ?? ANIMAL_AVATARS[hashOf(room.roomId) % ANIMAL_AVATARS.length] ?? "bear-honey");
				setRoomWorkspaceIds(room.workspaceIds ?? [room.workspaceId]);
				setMemberQuery("");
				setRoomSettingsOpen(true);
			};
			const openProjectTool = (tool) => {
				setProjectTool(tool);
				setProjectListing(null);
				setProjectListingError(null);
				setProjectFile(null);
				if (activeWorkspace === void 0 || currentSessionId === void 0) return;
				const abort = new AbortController();
				if (tool === "files") {
					browseProject(activeWorkspace.workspaceId, void 0, abort.signal).then(setProjectListing, (error) => {
						if (!abort.signal.aborted) setProjectListingError(error instanceof Error ? error.message : String(error));
					});
					return;
				}
				if (tool === "terminal" || tool === "diff") {
					setTerminalBusy(true);
					openTerminal(currentSessionId, activeWorkspace.workspaceId, abort.signal).then(async (opened) => {
						if (tool !== "diff") return opened;
						return await sendTerminal(currentSessionId, opened.terminalId, "if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then git --no-pager diff --stat -- . && git --no-pager diff -- .; else echo \"__DSCHAT_NO_REPO__\"; fi", abort.signal);
					}).then(setTerminal, (error) => {
						if (!abort.signal.aborted) setProjectListingError(error instanceof Error ? error.message : String(error));
					}).finally(() => {
						if (!abort.signal.aborted) setTerminalBusy(false);
					});
				}
			};
			const browseCurrentProject = (path) => {
				if (activeWorkspace === void 0) {
					setProjectListingError(t("pickProjectFirst"));
					return;
				}
				const abort = new AbortController();
				browseProject(activeWorkspace.workspaceId, path, abort.signal).then(setProjectListing, (error) => {
					if (!abort.signal.aborted) setProjectListingError(error instanceof Error ? error.message : String(error));
				});
			};
			const previewProjectFile = (path) => {
				if (activeWorkspace === void 0) return;
				setProjectListingError(null);
				const abort = new AbortController();
				readProjectFile(activeWorkspace.workspaceId, path, abort.signal).then(setProjectFile, (error) => {
					if (!abort.signal.aborted) setProjectListingError(error instanceof Error ? error.message : String(error));
				});
			};
			const closeWorkbench = () => {
				const terminalToClose = terminal;
				setProjectTool(null);
				setProjectFile(null);
				setProjectListingError(null);
				setTerminal(null);
				setTerminalCommand("");
				if (terminalToClose !== null && currentSessionId !== void 0) closeTerminal(currentSessionId, terminalToClose.terminalId);
			};
			const submitTerminal = () => {
				if (terminal === null || currentSessionId === void 0 || terminalCommand.trim() === "") return;
				const command = terminalCommand;
				setTerminalCommand("");
				setTerminalBusy(true);
				const abort = new AbortController();
				sendTerminal(currentSessionId, terminal.terminalId, command, abort.signal).then(setTerminal, (error) => {
					if (!abort.signal.aborted) setProjectListingError(error instanceof Error ? error.message : String(error));
				}).finally(() => {
					if (!abort.signal.aborted) setTerminalBusy(false);
				});
			};
			const navigateBrowser = (url) => {
				const trimmed = url.trim();
				if (trimmed === "") return;
				const normalized = /^https?:\/\//iu.test(trimmed) ? trimmed : `http://${trimmed}`;
				setBrowserUrl(normalized);
				setBrowserDraft(normalized);
				setBrowserHistory((current) => [...current.slice(0, browserHistoryIndex + 1), normalized]);
				setBrowserHistoryIndex((index) => index + 1);
			};
			const closeTemporaryChat = () => {
				const current = sidecarId;
				setSidecarOpen(false);
				setSidecarId(null);
				setSidecarMessages([]);
				setSidecarDraft("");
				setSidecarError(null);
				if (current !== null) closeSidecar(current);
			};
			const submitSidecar = () => {
				const message = sidecarDraft.trim();
				if (message === "" || currentSessionId === void 0 || activeWorkspace === void 0 || activeRoom === void 0) return;
				setSidecarDraft("");
				setSidecarBusy(true);
				setSidecarError(null);
				setSidecarMessages((current) => [...current, {
					id: randomUUID(),
					role: "user",
					text: message
				}]);
				const abort = new AbortController();
				(sidecarId === null ? startSidecar({
					sourceSessionId: currentSessionId,
					workspaceId: activeWorkspace.workspaceId,
					roomTitle: activeRoom.title,
					...activeRoom.systemPrompt === void 0 ? {} : { roomSystemPrompt: activeRoom.systemPrompt },
					memberNames: activeMembers.map((member) => displayOf(member, "persona", state.personas).name),
					message
				}, abort.signal) : sendSidecar(sidecarId, message, abort.signal)).then((result) => {
					setSidecarId(result.sidecarId);
					setSidecarMessages((current) => [...current, {
						id: randomUUID(),
						role: "assistant",
						text: result.answer
					}]);
				}, (error) => {
					if (!abort.signal.aborted) setSidecarError(error instanceof Error ? error.message : String(error));
				}).finally(() => {
					if (!abort.signal.aborted) setSidecarBusy(false);
				});
			};
			(0, react.useEffect)(() => {
				if (activeRoom === void 0 || currentSessionId === void 0) {
					publishHeaderBridge(null);
					return;
				}
				publishHeaderBridge({
					sessionId: currentSessionId,
					room: activeRoom,
					roomSessions: state.roomSessions,
					workspaceTitle: activeWorkspace?.title ?? t("currentProject"),
					...activeCoordinator === void 0 ? {} : { coordinatorName: displayOf(activeCoordinator, "persona", state.personas).name },
					memberPersonas: activeMembers.map((member) => {
						const display = displayOf(member, "persona", state.personas);
						return {
							id: member.id,
							name: display.name,
							avatarId: display.avatar
						};
					}),
					headerActions: renderSlot("ds-chat.room.header.actions", {
						roomId: activeRoom.roomId,
						sessionId: currentSessionId
					}),
					onHistory: (item) => {
						openHistorySession(activeRoom, item);
					},
					onNewSession: () => {
						createRoomSession(activeRoom, activeRoom.type !== "general");
					},
					onSettings: () => {
						openRoomSettings(activeRoom);
					},
					onProjectTool: openProjectTool,
					onTemporaryChat: () => {
						setSidecarOpen(true);
					},
					onBranch: (atSeq, kind) => branchRoomSession(activeRoom, currentSessionId, atSeq, kind),
					messageSeq,
					onNotice: setNotice
				});
				return () => {
					if (headerBridgeValue?.sessionId === currentSessionId) publishHeaderBridge(null);
				};
			}, [
				activeCoordinator,
				activeMembers,
				activeRoom,
				activeWorkspace?.title,
				currentSessionId,
				messageSeq,
				renderSlot,
				state.personas,
				state.roomSessions
			]);
			(0, react.useEffect)(() => {
				const speaker = activeCoordinator ?? activeMembers[0];
				const identity = speaker === void 0 ? void 0 : displayOf(speaker, "persona", state.personas);
				const root = document.documentElement;
				if (activeRoom === void 0 || identity === void 0) {
					root.style.removeProperty("--ds-chat-speaker-avatar");
					root.removeAttribute("data-ds-chat-room");
					return;
				}
				root.style.setProperty("--ds-chat-speaker-avatar", `url("${avatarDataUri(identity.avatar, 64)}")`);
				root.setAttribute("data-ds-chat-room", activeRoom.type);
				return () => {
					root.style.removeProperty("--ds-chat-speaker-avatar");
					root.removeAttribute("data-ds-chat-room");
				};
			}, [
				activeCoordinator,
				activeMembers,
				activeRoom,
				state.personas
			]);
			(0, react.useEffect)(() => {
				if (activeRoom === void 0 || currentSessionId === void 0) return;
				document.documentElement.dataset.skillChatRoomHeader = "true";
				return () => {
					delete document.documentElement.dataset.skillChatRoomHeader;
				};
			}, [activeRoom, currentSessionId]);
			(0, react.useEffect)(() => {
				const root = document.documentElement;
				delete root.dataset.skillChatGroupPanel;
				if (sidecarOpen) root.dataset.skillChatSidecar = "true";
				else delete root.dataset.skillChatSidecar;
				return () => {
					delete root.dataset.skillChatSidecar;
				};
			}, [sidecarOpen]);
			const marketplaceRow = (result, target) => {
				const installed = externalJoined.find((item) => item.id === `skills-sh:${result.id}`);
				const included = target === "draft-group" ? installed !== void 0 && groupMembers.includes(installed.id) : target === "active-group" ? installed !== void 0 && activeRoom?.memberIds.includes(installed.id) === true : false;
				const installAndJoin = () => {
					if (installed === void 0) joinExternal(result, target);
					else if (target === "draft-group") setGroupMembers((current) => current.includes(installed.id) ? current : [...current, installed.id]);
					else if (target === "active-group" && activeRoom?.type === "group") updateRoom(activeRoom.roomId, { memberIds: activeRoom.memberIds.includes(installed.id) ? activeRoom.memberIds : [...activeRoom.memberIds, installed.id] });
				};
				const homepage = result.homepage ?? `https://skills.sh/${result.id}`;
				const card = (0, react_jsx_runtime.jsxs)("div", {
					className: SkillContactsBrowser_module_css_default.hoverProfile,
					children: [
						(0, react_jsx_runtime.jsx)("strong", { children: result.name }),
						(0, react_jsx_runtime.jsx)("span", { children: result.description ?? t("skillsShNote") }),
						(0, react_jsx_runtime.jsxs)("small", { children: [
							result.source,
							" · ",
							result.installs.toLocaleString(),
							" 次安装"
						] }),
						(0, react_jsx_runtime.jsx)("a", {
							href: homepage,
							target: "_blank",
							rel: "noreferrer",
							children: t("skillsShHome")
						})
					]
				});
				return (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.HoverCard, {
					anchor: (0, react_jsx_runtime.jsxs)("div", {
						className: SkillContactsBrowser_module_css_default.marketResult,
						children: [
							(0, react_jsx_runtime.jsx)("span", {
								className: SkillContactsBrowser_module_css_default.marketAvatar,
								children: "↗"
							}),
							(0, react_jsx_runtime.jsxs)("span", {
								className: SkillContactsBrowser_module_css_default.copy,
								children: [(0, react_jsx_runtime.jsx)("strong", { children: result.name }), (0, react_jsx_runtime.jsx)("small", { children: result.description ?? `${result.source} · ${result.installs.toLocaleString()} 次安装` })]
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.marketActions,
								children: [(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: installed !== void 0 || installingId === result.id,
									onClick: () => {
										joinExternal(result);
									},
									children: installed !== void 0 ? t("installedLabel") : installingId === result.id ? t("installing") : t("installLabel")
								}), target !== void 0 ? (0, react_jsx_runtime.jsx)("button", {
									className: SkillContactsBrowser_module_css_default.installJoin,
									type: "button",
									disabled: included || installingId === result.id,
									onClick: installAndJoin,
									children: included ? t("joinedLabel") : installed === void 0 ? t("installAndJoin") : t("joinLabel")
								}) : null]
							})
						]
					}),
					content: card,
					copyLabel: "复制 Skill 链接",
					copiedLabel: "已复制",
					copyText: homepage
				}, result.id);
			};
			const roomRow = (room) => {
				const summaries = room.sessionIds.flatMap((id) => {
					const item = state.roomSessions.find((session) => session.roomSessionId === id);
					return item === void 0 ? [] : sessions.byId[item.harnessSessionId] ?? [];
				});
				const running = summaries.some((summary) => summary.running);
				const unread = activeRoom?.roomId === room.roomId ? 0 : summaries.filter((summary) => summary.completed === true).length;
				const coordinator = allContacts.find((contact) => contact.id === room.coordinatorId);
				const linked = (room.workspaceIds ?? [room.workspaceId]).flatMap((id) => workspaces.items.find((item) => item.workspaceId === id)?.title ?? []);
				const latest = state.roomSessions.filter((session) => session.roomId === room.roomId && session.archivedAt === void 0).sort((left, right) => right.updatedAt - left.updatedAt)[0];
				const directContact = room.type === "direct" ? allContacts.find((item) => item.id === room.memberIds[0]) : void 0;
				const meta = room.type === "group" ? `${room.memberIds.length} ${t("peopleCount")}` : "";
				const sessionTitle = latest?.title === room.title ? void 0 : latest?.title;
				const preview = running ? t("typing") : sessionTitle ?? (room.type === "group" ? coordinator === void 0 ? t("noCoordinator") : `${displayOf(coordinator, "persona", state.personas).name} ${t("coordinates")}` : room.sessionIds.length > 1 ? `${room.sessionIds.length} ${t("sessionCount")}` : directContact?.description ?? t("noMessages"));
				const hover = (0, react_jsx_runtime.jsxs)("div", {
					className: SkillContactsBrowser_module_css_default.hoverProfile,
					children: [
						(0, react_jsx_runtime.jsx)("strong", { children: room.title }),
						(0, react_jsx_runtime.jsx)("span", { children: room.type === "direct" ? directContact?.description ?? t("directRoomFallback") : room.systemPrompt?.trim() || t("groupRoomFallback") }),
						directContact === void 0 ? null : (0, react_jsx_runtime.jsxs)("small", {
							translate: "no",
							children: [
								t("identifier"),
								"：",
								directContact.name,
								" · ",
								directContact.sourceLabel
							]
						}),
						(0, react_jsx_runtime.jsxs)("small", { children: [
							room.sessionIds.length,
							" ",
							t("sessionCount"),
							room.type === "group" ? ` · ${room.memberIds.length} ${t("memberCount")}` : ""
						] }),
						(0, react_jsx_runtime.jsxs)("small", { children: [
							t("projectLabel"),
							"：",
							linked.join("、") || t("unbound")
						] })
					]
				});
				const pinned = room.pinnedAt !== void 0;
				return (0, react_jsx_runtime.jsxs)("div", {
					className: SkillContactsBrowser_module_css_default.roomRowWrap,
					"data-dragging": dragRoom === room.roomId || void 0,
					"data-drop": dropRoom === room.roomId || void 0,
					draggable: true,
					onDragStart: (event) => {
						setDragRoom(room.roomId);
						event.dataTransfer.effectAllowed = "move";
					},
					onDragEnd: () => {
						setDragRoom(null);
						setDropRoom(null);
					},
					onDragOver: (event) => {
						if (dragRoom !== null && dragRoom !== room.roomId) {
							event.preventDefault();
							setDropRoom(room.roomId);
						}
					},
					onDragLeave: () => {
						setDropRoom((current) => current === room.roomId ? null : current);
					},
					onDrop: (event) => {
						event.preventDefault();
						if (dragRoom !== null) reorderRooms(dragRoom, room.roomId);
						setDragRoom(null);
						setDropRoom(null);
					},
					onContextMenu: (event) => {
						event.preventDefault();
						setRoomMenu({
							roomId: room.roomId,
							x: event.clientX,
							y: event.clientY
						});
					},
					children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.HoverCard, {
						anchor: (0, react_jsx_runtime.jsxs)(RoomRow, {
							className: SkillContactsBrowser_module_css_default.roomRow,
							selected: activeRoom?.roomId === room.roomId,
							onClick: () => {
								openRoom(room);
							},
							children: [
								(0, react_jsx_runtime.jsxs)("span", {
									className: SkillContactsBrowser_module_css_default.avatarStatusWrap,
									children: [roomAvatar(room), unread > 0 ? (0, react_jsx_runtime.jsx)("span", {
										className: SkillContactsBrowser_module_css_default.unreadBadge,
										children: unread > 99 ? "99+" : unread
									}) : null]
								}),
								(0, react_jsx_runtime.jsxs)("span", {
									className: SkillContactsBrowser_module_css_default.copy,
									children: [(0, react_jsx_runtime.jsxs)("span", {
										className: SkillContactsBrowser_module_css_default.nameLine,
										children: [(0, react_jsx_runtime.jsx)("span", {
											className: SkillContactsBrowser_module_css_default.name,
											children: room.title
										}), (0, react_jsx_runtime.jsx)("span", {
											className: SkillContactsBrowser_module_css_default.source,
											children: meta
										})]
									}), (0, react_jsx_runtime.jsx)("span", {
										className: SkillContactsBrowser_module_css_default.description,
										"data-running": running || void 0,
										children: preview
									})]
								}),
								(0, react_jsx_runtime.jsxs)("span", {
									className: SkillContactsBrowser_module_css_default.time,
									children: [pinned ? (0, react_jsx_runtime.jsx)("span", {
										className: SkillContactsBrowser_module_css_default.pinMark,
										title: t("pinned"),
										children: "▴"
									}) : null, roomTime(room.updatedAt)]
								})
							]
						}),
						content: hover,
						copyLabel: t("copyRoom"),
						copiedLabel: t("copied")
					}), (0, react_jsx_runtime.jsx)("button", {
						className: SkillContactsBrowser_module_css_default.roomMenuButton,
						type: "button",
						"aria-label": t("roomActions"),
						onClick: (event) => {
							event.stopPropagation();
							const box = event.currentTarget.getBoundingClientRect();
							setRoomMenu({
								roomId: room.roomId,
								x: box.right,
								y: box.bottom
							});
						},
						children: "⋯"
					})]
				}, room.roomId);
			};
			if (!wide) return (0, react_jsx_runtime.jsx)("div", {
				className: SkillContactsBrowser_module_css_default.rail,
				children: (0, react_jsx_runtime.jsx)("button", {
					className: SkillContactsBrowser_module_css_default.railButton,
					type: "button",
					onClick: expandSidebar,
					children: "●"
				})
			});
			const contactRow = (contact) => {
				const display = displayOf(contact, mode, state.personas);
				const homepage = contact.homepage ?? contact.repository;
				return (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.HoverCard, {
					anchor: (0, react_jsx_runtime.jsxs)("button", {
						className: SkillContactsBrowser_module_css_default.row,
						type: "button",
						onClick: () => {
							selectContact(contact);
						},
						children: [
							(0, react_jsx_runtime.jsx)(AnimalAvatar, {
								avatarId: display.avatar,
								label: display.name,
								seed: contact.id
							}),
							(0, react_jsx_runtime.jsxs)("span", {
								className: SkillContactsBrowser_module_css_default.copy,
								children: [(0, react_jsx_runtime.jsxs)("span", {
									className: SkillContactsBrowser_module_css_default.nameLine,
									children: [(0, react_jsx_runtime.jsx)("span", {
										className: SkillContactsBrowser_module_css_default.name,
										children: display.name
									}), (0, react_jsx_runtime.jsx)("span", {
										className: SkillContactsBrowser_module_css_default.source,
										"data-source": contact.source,
										children: contact.sourceShort ?? (contact.source === "harness" ? t("sourceHarnessShort") : contact.source === "workbuddy" ? t("sourceWorkBuddyShort") : "skills.sh")
									})]
								}), (0, react_jsx_runtime.jsx)("span", {
									className: SkillContactsBrowser_module_css_default.description,
									children: mode === "persona" ? contact.name : contact.description
								})]
							}),
							favorites.includes(contact.id) ? (0, react_jsx_runtime.jsx)("span", {
								className: SkillContactsBrowser_module_css_default.favoriteMark,
								children: "★"
							}) : null
						]
					}),
					content: (0, react_jsx_runtime.jsxs)("div", {
						className: SkillContactsBrowser_module_css_default.hoverProfile,
						children: [
							(0, react_jsx_runtime.jsx)("strong", { children: display.name }),
							(0, react_jsx_runtime.jsx)("span", { children: contact.description }),
							(0, react_jsx_runtime.jsxs)("small", { children: [
								"原始 Skill：",
								contact.name,
								" · ",
								contact.sourceLabel
							] }),
							homepage === void 0 ? null : (0, react_jsx_runtime.jsx)("a", {
								href: homepage,
								target: "_blank",
								rel: "noreferrer",
								children: t("viewHomepage")
							})
						]
					}),
					copyLabel: "复制 Skill 信息",
					copiedLabel: "已复制",
					copyText: homepage
				}, contact.id);
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				className: SkillContactsBrowser_module_css_default.root,
				"data-skill-chat-root": true,
				children: [
					(0, react_jsx_runtime.jsxs)("button", {
						className: SkillContactsBrowser_module_css_default.automationEntry,
						type: "button",
						"data-active": view === "automations" || void 0,
						onClick: () => {
							setView((current) => current === "automations" ? "chats" : "automations");
						},
						children: [
							(0, react_jsx_runtime.jsx)("span", {
								className: SkillContactsBrowser_module_css_default.automationEntryMark,
								"aria-hidden": "true",
								children: "◷"
							}),
							t("automations"),
							dueAutomations > 0 ? (0, react_jsx_runtime.jsx)("span", {
								className: SkillContactsBrowser_module_css_default.automationEntryCount,
								children: dueAutomations
							}) : null
						]
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: SkillContactsBrowser_module_css_default.workspaceSection,
						children: (0, react_jsx_runtime.jsxs)("div", {
							className: SkillContactsBrowser_module_css_default.workspacePicker,
							ref: workspaceRef,
							children: [(0, react_jsx_runtime.jsxs)("button", {
								className: SkillContactsBrowser_module_css_default.workspaceTrigger,
								type: "button",
								"aria-expanded": workspaceOpen,
								onClick: () => {
									setWorkspaceOpen((current) => !current);
								},
								children: [
									(0, react_jsx_runtime.jsx)("span", {
										className: SkillContactsBrowser_module_css_default.workspaceIcon,
										children: "⌂"
									}),
									(0, react_jsx_runtime.jsx)("span", { children: currentWorkspace?.title ?? t("noWorkspace") }),
									(0, react_jsx_runtime.jsx)("span", {
										className: SkillContactsBrowser_module_css_default.chevron,
										children: "⌄"
									})
								]
							}), workspaceOpen ? (0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.workspaceMenu,
								children: [
									workspaces.items.map((workspace) => (0, react_jsx_runtime.jsxs)("button", {
										type: "button",
										"data-active": workspace.workspaceId === workspaceId,
										onClick: () => {
											setWorkspaceId(workspace.workspaceId);
											setWorkspaceOpen(false);
										},
										children: [
											(0, react_jsx_runtime.jsx)("span", { children: "⌂" }),
											(0, react_jsx_runtime.jsx)("strong", { children: workspace.title }),
											workspace.workspaceId === workspaceId ? (0, react_jsx_runtime.jsx)("b", { children: "✓" }) : null
										]
									}, workspace.workspaceId)),
									(0, react_jsx_runtime.jsx)("span", { className: SkillContactsBrowser_module_css_default.workspaceMenuSep }),
									(0, react_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setWorkspaceOpen(false);
											createWorkspace();
										},
										children: [(0, react_jsx_runtime.jsx)("span", { children: "＋" }), (0, react_jsx_runtime.jsx)("strong", { children: t("addWorkspace") })]
									})
								]
							}) : null]
						})
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: SkillContactsBrowser_module_css_default.topbar,
						children: [(0, react_jsx_runtime.jsx)("div", {
							className: SkillContactsBrowser_module_css_default.tabs,
							role: "tablist",
							children: [
								"chats",
								"groups",
								"contacts"
							].map((item) => (0, react_jsx_runtime.jsx)("button", {
								className: SkillContactsBrowser_module_css_default.tab,
								"data-active": view === item,
								type: "button",
								role: "tab",
								"aria-selected": view === item,
								onClick: () => {
									setView(item);
								},
								children: t(item)
							}, item))
						}), (0, react_jsx_runtime.jsxs)("span", {
							className: SkillContactsBrowser_module_css_default.createWrap,
							ref: createRef,
							children: [(0, react_jsx_runtime.jsx)("button", {
								className: SkillContactsBrowser_module_css_default.addGroup,
								type: "button",
								"aria-label": "新建",
								"aria-expanded": createOpen,
								onClick: () => {
									setCreateOpen((open) => !open);
								},
								children: "＋"
							}), createOpen ? (0, react_jsx_runtime.jsx)("div", {
								className: SkillContactsBrowser_module_css_default.createMenu,
								children: [
									{
										id: "chat",
										label: t("plainChat"),
										hint: t("noSkillMode"),
										run: () => {
											beginGeneralChat();
										}
									},
									{
										id: "group",
										label: t("groupChat"),
										hint: t("organizeSkills"),
										run: openGroupCreator
									},
									{
										id: "workspace",
										label: t("projectDir"),
										hint: t("addWorkspaceHint"),
										run: () => {
											createWorkspace();
										}
									}
								].map((entry) => (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										setCreateOpen(false);
										entry.run();
									},
									children: [(0, react_jsx_runtime.jsx)("strong", { children: entry.label }), (0, react_jsx_runtime.jsx)("small", { children: entry.hint })]
								}, entry.id))
							}) : null]
						})]
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: SkillContactsBrowser_module_css_default.searchWrap,
						children: (0, react_jsx_runtime.jsx)("input", {
							className: SkillContactsBrowser_module_css_default.search,
							value: query,
							onChange: (event) => {
								setQuery(event.target.value);
							},
							placeholder: view === "contacts" ? t("searchAll") : t("searchRoomsPlaceholder"),
							"aria-label": view === "contacts" ? t("searchAll") : t("searchRooms"),
							autoComplete: "off",
							spellCheck: false,
							type: "search"
						})
					}),
					renderSlot("ds-chat.sidebar.before-rooms", {
						view,
						...workspaceId === void 0 ? {} : { workspaceId }
					}),
					notice !== null ? (0, react_jsx_runtime.jsxs)("button", {
						className: SkillContactsBrowser_module_css_default.notice,
						type: "button",
						onClick: () => {
							setNotice(null);
						},
						children: [notice, " ×"]
					}) : null,
					view === "groups" ? (0, react_jsx_runtime.jsx)("div", {
						className: SkillContactsBrowser_module_css_default.roomList,
						children: groupResults.length === 0 ? (0, react_jsx_runtime.jsx)(EmptyState, {
							className: SkillContactsBrowser_module_css_default.emptyCard,
							title: t("noGroupsTitle"),
							children: t("noGroupsBody")
						}) : groupResults.map((room) => (0, react_jsx_runtime.jsxs)("div", {
							className: SkillContactsBrowser_module_css_default.groupSectionRowWrap,
							onContextMenu: (event) => {
								event.preventDefault();
								setRoomMenu({
									roomId: room.roomId,
									x: event.clientX,
									y: event.clientY
								});
							},
							children: [(0, react_jsx_runtime.jsxs)("button", {
								className: SkillContactsBrowser_module_css_default.groupSectionRow,
								type: "button",
								onClick: () => {
									openRoom(room);
								},
								children: [roomAvatar(room, true), (0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)("strong", { children: room.title }), (0, react_jsx_runtime.jsxs)("small", { children: [
									room.memberIds.length,
									" ",
									t("peopleCount"),
									savedRooms.includes(room.roomId) ? ` · ${t("savedRoom")}` : ""
								] })] })]
							}), (0, react_jsx_runtime.jsx)("button", {
								className: SkillContactsBrowser_module_css_default.roomMenuButton,
								type: "button",
								"aria-label": t("roomActions"),
								onClick: (event) => {
									event.stopPropagation();
									const box = event.currentTarget.getBoundingClientRect();
									setRoomMenu({
										roomId: room.roomId,
										x: box.right,
										y: box.bottom
									});
								},
								children: "⋯"
							})]
						}, room.roomId))
					}) : null,
					view === "groups" ? null : view === "contacts" ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
						(0, react_jsx_runtime.jsxs)("div", {
							className: SkillContactsBrowser_module_css_default.subtabs,
							children: [(0, react_jsx_runtime.jsx)("button", {
								"data-active": contactList === "frequent",
								onClick: () => {
									setContactList("frequent");
								},
								children: t("frequentContacts")
							}), (0, react_jsx_runtime.jsx)("button", {
								"data-active": contactList === "all",
								onClick: () => {
									setContactList("all");
								},
								children: t("allContacts")
							})]
						}),
						(0, react_jsx_runtime.jsxs)("div", {
							className: SkillContactsBrowser_module_css_default.modeBar,
							children: [
								(0, react_jsx_runtime.jsx)("span", { children: t("displayMode") }),
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									"data-active": mode === "persona",
									onClick: () => {
										setMode("persona");
									},
									children: t("personaMode")
								}),
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									"data-active": mode === "raw",
									onClick: () => {
										setMode("raw");
									},
									children: t("rawMode")
								})
							]
						}),
						(0, react_jsx_runtime.jsxs)("div", {
							className: SkillContactsBrowser_module_css_default.list,
							children: [
								phase === "loading" ? (0, react_jsx_runtime.jsx)("div", {
									className: SkillContactsBrowser_module_css_default.status,
									children: t("loading")
								}) : phase === "error" ? (0, react_jsx_runtime.jsx)("div", {
									className: SkillContactsBrowser_module_css_default.status,
									children: t("loadFailed")
								}) : visibleContacts.length === 0 ? (0, react_jsx_runtime.jsx)("div", {
									className: SkillContactsBrowser_module_css_default.status,
									children: t("searchEmpty")
								}) : visibleContacts.map(contactRow),
								deferredQuery.length >= 2 && externalPhase === "loading" ? (0, react_jsx_runtime.jsx)("div", {
									className: SkillContactsBrowser_module_css_default.status,
									children: t("searchingExternal")
								}) : null,
								externalResults.map((result) => marketplaceRow(result))
							]
						})
					] }) : view === "automations" ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsxs)("div", {
						className: SkillContactsBrowser_module_css_default.sectionHeading,
						children: [(0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("strong", { children: "自动化" }), (0, react_jsx_runtime.jsx)("small", { children: t("automationHint") })] }), (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: activeRoom === void 0,
							onClick: () => {
								setAutomationOpen(true);
							},
							children: t("newItem")
						})]
					}), (0, react_jsx_runtime.jsxs)("div", {
						className: SkillContactsBrowser_module_css_default.list,
						children: [
							state.automations.filter((item) => item.workspaceId === workspaceId).length === 0 ? (0, react_jsx_runtime.jsx)("div", {
								className: SkillContactsBrowser_module_css_default.emptyCard,
								children: activeRoom === void 0 ? "先打开一个普通对话、Skill 对话或群组，再为它创建自动化。" : `还没有自动化。选一个模板，或点「＋ 新建」从空白开始，都会绑定到「${activeRoom.title}」。`
							}) : state.automations.filter((item) => item.workspaceId === workspaceId).map((automation) => (0, react_jsx_runtime.jsxs)("article", {
								className: SkillContactsBrowser_module_css_default.automationCard,
								children: [
									(0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("strong", { children: automation.name }), (0, react_jsx_runtime.jsxs)("small", { children: [
										state.rooms.find((room) => room.roomId === automation.roomId)?.title ?? "已归档 Room",
										" · ",
										automation.schedule.kind === "once" ? t("onceLabel") : `每 ${automation.schedule.rule.slice(6)}`
									] })] }),
									(0, react_jsx_runtime.jsx)("p", { children: automation.prompt }),
									(0, react_jsx_runtime.jsxs)("footer", { children: [
										(0, react_jsx_runtime.jsx)("span", {
											"data-status": automation.status,
											children: automation.status === "active" ? t("waitingRun") : automation.status === "paused" ? t("pausedLabel") : automation.status === "completed" ? t("completedLabel") : t("failedLabel")
										}),
										(0, react_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												runAutomation(automation);
											},
											children: t("runNow")
										}),
										(0, react_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												updateState((current) => ({
													...current,
													automations: current.automations.map((item) => item.automationId === automation.automationId ? {
														...item,
														status: item.status === "paused" ? "active" : "paused",
														updatedAt: Date.now()
													} : item)
												}));
											},
											children: automation.status === "paused" ? t("restoreLabel") : t("pauseLabel")
										})
									] })
								]
							}, automation.automationId)),
							(0, react_jsx_runtime.jsx)("div", {
								className: SkillContactsBrowser_module_css_default.templateHeading,
								children: t("fromTemplate")
							}),
							(0, react_jsx_runtime.jsx)("div", {
								className: SkillContactsBrowser_module_css_default.templateList,
								children: AUTOMATION_TEMPLATES.map((template) => (0, react_jsx_runtime.jsxs)("button", {
									className: SkillContactsBrowser_module_css_default.templateCard,
									type: "button",
									disabled: activeRoom === void 0,
									onClick: () => {
										setAutomationName(template.name);
										setAutomationPrompt(template.prompt);
										setAutomationSchedule(template.schedule);
										setAutomationInterval(template.interval);
										setAutomationUnit(template.unit);
										setAutomationWhen(templateRunAt(template.schedule));
										setAutomationOpen(true);
									},
									children: [(0, react_jsx_runtime.jsx)("strong", { children: template.name }), (0, react_jsx_runtime.jsx)("small", { children: template.hint })]
								}, template.id))
							})
						]
					})] }) : (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: (0, react_jsx_runtime.jsxs)("div", {
						className: SkillContactsBrowser_module_css_default.roomList,
						children: [roomResults.length === 0 ? query.trim() === "" ? (0, react_jsx_runtime.jsx)(EmptyState, {
							className: SkillContactsBrowser_module_css_default.emptyCard,
							title: "还没有对话",
							children: t("emptyRoomsHint")
						}) : (0, react_jsx_runtime.jsx)(EmptyState, {
							className: SkillContactsBrowser_module_css_default.emptyCard,
							title: "没有匹配的对话",
							children: t("searchEmptyHint")
						}) : roomResults.map(roomRow), archivedRooms.length === 0 ? null : (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsxs)("button", {
							className: SkillContactsBrowser_module_css_default.archivedToggle,
							type: "button",
							onClick: () => {
								setShowArchived((current) => !current);
							},
							children: [
								t("archivedRooms"),
								" · ",
								archivedRooms.length,
								(0, react_jsx_runtime.jsx)("span", { children: showArchived ? "⌃" : "⌄" })
							]
						}), showArchived ? archivedRooms.map((room) => (0, react_jsx_runtime.jsxs)("div", {
							className: SkillContactsBrowser_module_css_default.archivedRow,
							children: [
								(0, react_jsx_runtime.jsx)("span", { children: room.title }),
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										restoreRoom(room.roomId);
									},
									children: t("restore")
								}),
								(0, react_jsx_runtime.jsx)("button", {
									className: SkillContactsBrowser_module_css_default.menuDanger,
									type: "button",
									onClick: () => {
										setDeleteConfirm(room.roomId);
									},
									children: t("delete")
								})
							]
						}, room.roomId)) : null] })]
					}) }),
					renderSlot("ds-chat.sidebar.after-rooms", {
						view,
						...workspaceId === void 0 ? {} : { workspaceId }
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: SkillContactsBrowser_module_css_default.settingsSection,
						children: renderSlot("ds-chat.settings.section", {
							view,
							...workspaceId === void 0 ? {} : { workspaceId }
						})
					}),
					activeRoom !== void 0 && currentSessionId !== void 0 && currentSessionBlank ? (0, react_jsx_runtime.jsx)("aside", {
						className: SkillContactsBrowser_module_css_default.blankRoomDock,
						children: (0, react_jsx_runtime.jsx)(SkillChatHeaderTools, { sessionId: currentSessionId })
					}) : null,
					activeRoom === void 0 ? null : renderSlot("ds-chat.room.drawer", {
						roomId: activeRoom.roomId,
						...currentSessionId === void 0 ? {} : { sessionId: currentSessionId }
					}),
					selected !== null ? (0, react_jsx_runtime.jsxs)(Dialog, {
						className: `${SkillContactsBrowser_module_css_default.panel} ${SkillContactsBrowser_module_css_default.skillProfileDialog}`,
						label: t("skillProfile"),
						onClose: () => {
							setSelected(null);
						},
						children: [(0, react_jsx_runtime.jsxs)("div", {
							className: SkillContactsBrowser_module_css_default.panelTop,
							children: [(0, react_jsx_runtime.jsx)(AnimalAvatar, {
								avatarId: personaAvatar,
								label: personaName
							}), (0, react_jsx_runtime.jsx)(IconButton, {
								className: SkillContactsBrowser_module_css_default.close,
								variant: "ghost",
								"aria-label": "关闭",
								onClick: () => {
									setSelected(null);
								},
								children: "×"
							})]
						}), editingPersona ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
							(0, react_jsx_runtime.jsxs)("label", {
								className: SkillContactsBrowser_module_css_default.field,
								children: [(0, react_jsx_runtime.jsx)("span", { children: t("nicknameLabel") }), (0, react_jsx_runtime.jsx)("input", {
									value: personaName,
									maxLength: 24,
									onChange: (event) => {
										setPersonaName(event.target.value);
									}
								})]
							}),
							(0, react_jsx_runtime.jsx)("div", {
								className: SkillContactsBrowser_module_css_default.avatarLibrary,
								children: ANIMAL_AVATARS.map((avatarId) => (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									"data-selected": personaAvatar === avatarId,
									onClick: () => {
										setPersonaAvatar(avatarId);
									},
									children: (0, react_jsx_runtime.jsx)(AnimalAvatar, {
										avatarId,
										label: avatarId
									})
								}, avatarId))
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.profileActions,
								children: [(0, react_jsx_runtime.jsx)(Button, {
									className: SkillContactsBrowser_module_css_default.primary,
									variant: "primary",
									onClick: savePersona,
									children: t("saveIdentity")
								}), (0, react_jsx_runtime.jsx)(Button, {
									className: SkillContactsBrowser_module_css_default.secondaryAction,
									onClick: resetPersona,
									children: t("resetDefault")
								})]
							})
						] }) : (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
							(0, react_jsx_runtime.jsx)("h2", {
								className: SkillContactsBrowser_module_css_default.panelTitle,
								children: displayOf(selected, mode, state.personas).name
							}),
							(0, react_jsx_runtime.jsx)("div", {
								className: SkillContactsBrowser_module_css_default.role,
								children: state.personas[selected.id]?.roleLabel
							}),
							(0, react_jsx_runtime.jsx)("p", {
								className: SkillContactsBrowser_module_css_default.bio,
								children: selected.description
							}),
							(state.personas[selected.id]?.capabilities ?? []).length === 0 ? null : (0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.profileSection,
								children: [(0, react_jsx_runtime.jsx)("h3", { children: t("goodAt") }), (0, react_jsx_runtime.jsx)("div", {
									className: SkillContactsBrowser_module_css_default.capabilityChips,
									children: (state.personas[selected.id]?.capabilities ?? []).map((item) => (0, react_jsx_runtime.jsx)("span", { children: item }, item))
								})]
							}),
							selected.whenToUse === void 0 ? null : (0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.profileSection,
								children: [(0, react_jsx_runtime.jsx)("h3", { children: t("whenToFind") }), (0, react_jsx_runtime.jsx)("p", {
									className: SkillContactsBrowser_module_css_default.profileNote,
									children: selected.whenToUse
								})]
							}),
							(() => {
								const inRooms = visibleRooms.filter((room) => room.type === "group" && room.memberIds.includes(selected.id));
								return inRooms.length === 0 ? null : (0, react_jsx_runtime.jsxs)("div", {
									className: SkillContactsBrowser_module_css_default.profileSection,
									children: [(0, react_jsx_runtime.jsx)("h3", { children: t("inTheseGroups") }), (0, react_jsx_runtime.jsx)("div", {
										className: SkillContactsBrowser_module_css_default.profileRooms,
										children: inRooms.map((room) => (0, react_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												setSelected(null);
												openRoom(room);
											},
											children: [
												roomAvatar(room, true),
												(0, react_jsx_runtime.jsx)("span", { children: room.title }),
												(0, react_jsx_runtime.jsxs)("small", { children: [room.memberIds.length, " 人"] })
											]
										}, room.roomId))
									})]
								});
							})(),
							(0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.originCard,
								children: [
									(0, react_jsx_runtime.jsx)("span", { children: t("originalSkill") }),
									(0, react_jsx_runtime.jsx)("strong", { children: selected.name }),
									(0, react_jsx_runtime.jsx)("small", { children: selected.sourceLabel })
								]
							}),
							selected.homepage === void 0 && selected.repository === void 0 ? null : (0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.profileLinks,
								children: [selected.homepage === void 0 ? null : (0, react_jsx_runtime.jsx)("a", {
									href: selected.homepage,
									target: "_blank",
									rel: "noreferrer",
									children: t("homepageLink")
								}), selected.repository === void 0 ? null : (0, react_jsx_runtime.jsx)("a", {
									href: selected.repository,
									target: "_blank",
									rel: "noreferrer",
									children: t("repositoryLink")
								})]
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.profileActions,
								children: [
									(0, react_jsx_runtime.jsx)(Button, {
										className: SkillContactsBrowser_module_css_default.primary,
										variant: "primary",
										onClick: () => {
											beginContactChat(selected);
										},
										children: t("continueChat")
									}),
									(0, react_jsx_runtime.jsx)(Button, {
										className: SkillContactsBrowser_module_css_default.secondaryAction,
										onClick: () => {
											setEditingPersona(true);
										},
										children: t("editIdentity")
									}),
									(0, react_jsx_runtime.jsx)(Button, {
										className: SkillContactsBrowser_module_css_default.secondaryAction,
										onClick: () => {
											toggleFavorite(selected.id);
										},
										children: favorites.includes(selected.id) ? `★ ${t("frequentContact")}` : `☆ ${t("addFrequent")}`
									}),
									selected.source !== "workbuddy" || selected.path === void 0 ? null : (0, react_jsx_runtime.jsx)(Button, {
										className: SkillContactsBrowser_module_css_default.secondaryAction,
										disabled: rootBusy === selected.name,
										onClick: () => {
											const path = selected.path;
											if (path === void 0) return;
											setRootBusy(selected.name);
											linkSkill(path, selected.name, new AbortController().signal).then(() => {
												setNotice(`${t("enabledSkill")}：${selected.name}`);
												setContactsRevision((current) => current + 1);
											}, (error) => {
												setNotice(`${t("enableSkillFailed")}：${error instanceof Error ? error.message : String(error)}`);
											}).finally(() => {
												setRootBusy(null);
											});
										},
										children: t("enableSkill")
									})
								]
							})
						] })]
					}) : null,
					groupOpen ? (0, react_jsx_runtime.jsxs)(Dialog, {
						className: SkillContactsBrowser_module_css_default.groupDialog,
						label: t("newGroup"),
						onClose: () => {
							setGroupOpen(false);
						},
						children: [
							(0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.groupHeader,
								children: [(0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("h2", { children: t("newGroup") }), (0, react_jsx_runtime.jsx)("p", { children: t("groupWorkspace").replace("{workspace}", currentWorkspace?.title ?? t("noWorkspace")) })] }), (0, react_jsx_runtime.jsx)(IconButton, {
									className: SkillContactsBrowser_module_css_default.close,
									variant: "ghost",
									"aria-label": "关闭",
									onClick: () => {
										setGroupOpen(false);
									},
									children: "×"
								})]
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.groupBody,
								children: [
									(0, react_jsx_runtime.jsxs)("div", {
										className: SkillContactsBrowser_module_css_default.groupFormGrid,
										children: [(0, react_jsx_runtime.jsxs)("div", {
											className: SkillContactsBrowser_module_css_default.groupIdentityEditor,
											children: [(0, react_jsx_runtime.jsx)(GroupAvatar, {
												avatarId: groupAvatar,
												label: groupName || t("newGroup")
											}), (0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("strong", { children: t("groupAvatarLabel") }), (0, react_jsx_runtime.jsx)("small", { children: t("groupAvatarHint") })] })]
										}), (0, react_jsx_runtime.jsxs)("label", {
											className: SkillContactsBrowser_module_css_default.field,
											children: [(0, react_jsx_runtime.jsx)("span", { children: t("groupName") }), (0, react_jsx_runtime.jsx)("input", {
												value: groupName,
												onChange: (event) => {
													setGroupName(event.target.value);
												},
												placeholder: t("groupNamePlaceholder")
											})]
										})]
									}),
									(0, react_jsx_runtime.jsxs)("button", {
										className: SkillContactsBrowser_module_css_default.groupMore,
										type: "button",
										"aria-expanded": groupMoreOpen,
										onClick: () => {
											setGroupMoreOpen((open) => !open);
										},
										children: [
											(0, react_jsx_runtime.jsx)("span", { children: t("moreSettings") }),
											(0, react_jsx_runtime.jsx)("small", { children: t("groupMoreHint") }),
											(0, react_jsx_runtime.jsx)("b", { children: groupMoreOpen ? "⌃" : "⌄" })
										]
									}),
									groupMoreOpen ? (0, react_jsx_runtime.jsxs)("div", {
										className: SkillContactsBrowser_module_css_default.groupMorePanel,
										children: [
											(0, react_jsx_runtime.jsx)("div", {
												className: SkillContactsBrowser_module_css_default.groupAvatarLibrary,
												children: ANIMAL_AVATARS.map((avatarId) => (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													"data-selected": groupAvatar === avatarId,
													onClick: () => {
														setGroupAvatar(avatarId);
													},
													children: (0, react_jsx_runtime.jsx)(GroupAvatar, {
														avatarId,
														label: avatarId,
														small: true
													})
												}, avatarId))
											}),
											(0, react_jsx_runtime.jsxs)("label", {
												className: SkillContactsBrowser_module_css_default.field,
												children: [(0, react_jsx_runtime.jsx)("span", { children: t("groupRole") }), (0, react_jsx_runtime.jsx)("textarea", {
													value: groupPrompt,
													onChange: (event) => {
														setGroupPrompt(event.target.value);
													},
													placeholder: "描述这个群组负责什么、如何协作以及输出标准。它会作为每次对话的系统提示词…"
												})]
											}),
											(0, react_jsx_runtime.jsx)("button", {
												className: SkillContactsBrowser_module_css_default.generatePrompt,
												type: "button",
												disabled: groupMembers.length === 0,
												onClick: () => {
													const members = allContacts.filter((contact) => groupMembers.includes(contact.id));
													setGroupPrompt(generatedGroupPrompt(groupName.trim() || t("collabGroup"), members));
												},
												children: t("generateFromMembers")
											}),
											(0, react_jsx_runtime.jsxs)("div", {
												className: SkillContactsBrowser_module_css_default.workspaceBindings,
												children: [(0, react_jsx_runtime.jsxs)("div", {
													className: SkillContactsBrowser_module_css_default.bindingHeader,
													children: [(0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)("strong", { children: t("bindProjects") }), (0, react_jsx_runtime.jsx)("small", { children: t("bindDefaultHint") })] }), (0, react_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => {
															addLinkedWorkspace("create");
														},
														children: t("addDirectory")
													})]
												}), workspaces.items.map((workspace) => (0, react_jsx_runtime.jsxs)("button", {
													type: "button",
													"data-selected": groupWorkspaceIds.includes(workspace.workspaceId),
													onClick: () => {
														toggleWorkspaceBinding("create", workspace.workspaceId);
													},
													children: [
														(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpenOutline16, {}),
														(0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)("strong", { children: workspace.title }), (0, react_jsx_runtime.jsx)("small", { children: workspace.path })] }),
														(0, react_jsx_runtime.jsx)("b", { children: groupWorkspaceIds.includes(workspace.workspaceId) ? "✓" : "＋" })
													]
												}, workspace.workspaceId))]
											})
										]
									}) : null,
									(0, react_jsx_runtime.jsxs)("div", {
										className: SkillContactsBrowser_module_css_default.memberToolbar,
										children: [(0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("strong", { children: t("pickMembers") }), (0, react_jsx_runtime.jsxs)("small", { children: [
											"已选 ",
											groupMembers.length,
											" 个，点击成员可加入或剔出"
										] })] }), (0, react_jsx_runtime.jsx)("input", {
											value: memberQuery,
											onChange: (event) => {
												setMemberQuery(event.target.value);
											},
											placeholder: "搜索昵称、原始 Skill、能力或 skills.sh…",
											"aria-label": t("searchMembers"),
											autoComplete: "off",
											spellCheck: false,
											type: "search"
										})]
									}),
									(0, react_jsx_runtime.jsxs)("div", {
										className: SkillContactsBrowser_module_css_default.groupCandidates,
										children: [
											visibleMemberContacts.map((contact) => {
												const display = displayOf(contact, "persona", state.personas);
												const included = groupMembers.includes(contact.id);
												return (0, react_jsx_runtime.jsxs)("button", {
													className: SkillContactsBrowser_module_css_default.pickRow,
													"data-included": included || void 0,
													type: "button",
													onClick: () => {
														setGroupMembers((current) => included ? current.filter((id) => id !== contact.id) : [...current, contact.id]);
													},
													children: [
														(0, react_jsx_runtime.jsx)(AnimalAvatar, {
															avatarId: display.avatar,
															label: display.name
														}),
														(0, react_jsx_runtime.jsxs)("span", {
															className: SkillContactsBrowser_module_css_default.pickCopy,
															children: [(0, react_jsx_runtime.jsx)("strong", { children: display.name }), (0, react_jsx_runtime.jsxs)("small", { children: [
																contact.name,
																" · ",
																contact.description
															] })]
														}),
														(0, react_jsx_runtime.jsx)("b", { children: included ? "−" : "＋" })
													]
												}, contact.id);
											}),
											deferredMemberQuery.length >= 2 && externalPhase === "loading" ? (0, react_jsx_runtime.jsx)("div", {
												className: SkillContactsBrowser_module_css_default.status,
												children: t("searchingExternal")
											}) : null,
											externalResults.map((result) => marketplaceRow(result, "draft-group"))
										]
									})
								]
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.groupFooter,
								children: [(0, react_jsx_runtime.jsx)(Button, {
									className: SkillContactsBrowser_module_css_default.secondary,
									onClick: () => {
										setGroupOpen(false);
									},
									children: t("cancel")
								}), (0, react_jsx_runtime.jsx)(Button, {
									className: SkillContactsBrowser_module_css_default.create,
									variant: "primary",
									disabled: groupMembers.length < 2 || workspaceId === void 0,
									onClick: createGroup,
									children: t("create")
								})]
							})
						]
					}) : null,
					automationOpen && activeRoom !== void 0 ? (0, react_jsx_runtime.jsx)("div", {
						className: SkillContactsBrowser_module_css_default.groupBackdrop,
						onMouseDown: (event) => {
							if (event.target === event.currentTarget) setAutomationOpen(false);
						},
						children: (0, react_jsx_runtime.jsxs)("section", {
							className: SkillContactsBrowser_module_css_default.automationDialog,
							role: "dialog",
							children: [
								(0, react_jsx_runtime.jsxs)("div", {
									className: SkillContactsBrowser_module_css_default.groupHeader,
									children: [(0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("h2", { children: t("newAutomation") }), (0, react_jsx_runtime.jsxs)("p", { children: ["目标对话：", activeRoom.title] })] }), (0, react_jsx_runtime.jsx)("button", {
										className: SkillContactsBrowser_module_css_default.close,
										onClick: () => {
											setAutomationOpen(false);
										},
										children: "×"
									})]
								}),
								(0, react_jsx_runtime.jsxs)("label", {
									className: SkillContactsBrowser_module_css_default.field,
									children: [(0, react_jsx_runtime.jsx)("span", { children: t("nameLabel") }), (0, react_jsx_runtime.jsx)("input", {
										value: automationName,
										onChange: (event) => {
											setAutomationName(event.target.value);
										},
										placeholder: t("automationNamePlaceholder")
									})]
								}),
								(0, react_jsx_runtime.jsxs)("label", {
									className: SkillContactsBrowser_module_css_default.field,
									children: [(0, react_jsx_runtime.jsx)("span", { children: t("taskPrompt") }), (0, react_jsx_runtime.jsx)("textarea", {
										value: automationPrompt,
										onChange: (event) => {
											setAutomationPrompt(event.target.value);
										},
										placeholder: t("automationPromptPlaceholder")
									})]
								}),
								(0, react_jsx_runtime.jsxs)("div", {
									className: SkillContactsBrowser_module_css_default.scheduleChoice,
									children: [(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										"data-active": automationSchedule === "once",
										onClick: () => {
											setAutomationSchedule("once");
										},
										children: t("runOnce")
									}), (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										"data-active": automationSchedule === "recurring",
										onClick: () => {
											setAutomationSchedule("recurring");
										},
										children: t("runRecurring")
									})]
								}),
								(0, react_jsx_runtime.jsxs)("label", {
									className: SkillContactsBrowser_module_css_default.field,
									children: [(0, react_jsx_runtime.jsx)("span", { children: automationSchedule === "once" ? t("runAt") : t("firstRunAt") }), (0, react_jsx_runtime.jsx)("input", {
										type: "datetime-local",
										value: automationWhen,
										onChange: (event) => {
											setAutomationWhen(event.target.value);
										}
									})]
								}),
								automationSchedule === "recurring" ? (0, react_jsx_runtime.jsxs)("div", {
									className: SkillContactsBrowser_module_css_default.repeatFields,
									children: [(0, react_jsx_runtime.jsxs)("label", {
										className: SkillContactsBrowser_module_css_default.field,
										children: [(0, react_jsx_runtime.jsx)("span", { children: t("intervalLabel") }), (0, react_jsx_runtime.jsx)("input", {
											inputMode: "numeric",
											min: "1",
											type: "number",
											value: automationInterval,
											onChange: (event) => {
												setAutomationInterval(event.target.value);
											}
										})]
									}), (0, react_jsx_runtime.jsxs)("label", {
										className: SkillContactsBrowser_module_css_default.field,
										children: [(0, react_jsx_runtime.jsx)("span", { children: t("unitLabel") }), (0, react_jsx_runtime.jsxs)("select", {
											value: automationUnit,
											onChange: (event) => {
												setAutomationUnit(event.target.value === "h" ? "h" : "d");
											},
											children: [(0, react_jsx_runtime.jsx)("option", {
												value: "h",
												children: t("unitHour")
											}), (0, react_jsx_runtime.jsx)("option", {
												value: "d",
												children: t("unitDay")
											})]
										})]
									})]
								}) : null,
								(0, react_jsx_runtime.jsxs)("div", {
									className: SkillContactsBrowser_module_css_default.automationSummary,
									children: [
										(0, react_jsx_runtime.jsx)("span", { children: t("teamLabel") }),
										(0, react_jsx_runtime.jsx)("strong", { children: activeRoom.memberIds.length === 0 ? t("noSkillGroup") : activeRoom.memberIds.map((id) => state.personas[id]?.displayName ?? id).join("、") }),
										(0, react_jsx_runtime.jsx)("small", { children: activeRoom.memberIds.length === 0 ? t("plainPromptMode") : t("coordinatorHandles") })
									]
								}),
								(0, react_jsx_runtime.jsxs)("div", {
									className: SkillContactsBrowser_module_css_default.groupFooter,
									children: [(0, react_jsx_runtime.jsx)("button", {
										className: SkillContactsBrowser_module_css_default.secondary,
										onClick: () => {
											setAutomationOpen(false);
										},
										children: "取消"
									}), (0, react_jsx_runtime.jsx)("button", {
										className: SkillContactsBrowser_module_css_default.create,
										disabled: automationPrompt.trim() === "",
										onClick: () => {
											createAutomation();
										},
										children: t("createAutomation")
									})]
								})
							]
						})
					}) : null,
					projectTool !== null && activeWorkspace !== void 0 ? (0, react_jsx_runtime.jsx)(WorkbenchDrawer, {
						tool: projectTool,
						workspaceTitle: activeWorkspace.title,
						workspacePath: activeWorkspace.path,
						listing: projectListing,
						file: projectFile,
						error: projectListingError,
						terminal,
						terminalCommand,
						terminalBusy,
						browserUrl,
						browserDraft,
						canGoBack: browserHistoryIndex > 0,
						canGoForward: browserHistoryIndex < browserHistory.length - 1,
						browserKey,
						onClose: closeWorkbench,
						onBrowse: browseCurrentProject,
						onPreviewFile: previewProjectFile,
						onTerminalCommand: setTerminalCommand,
						onTerminalSubmit: submitTerminal,
						onBrowserDraft: setBrowserDraft,
						onBrowserNavigate: navigateBrowser,
						onBrowserBack: () => {
							const next = Math.max(0, browserHistoryIndex - 1);
							setBrowserHistoryIndex(next);
							setBrowserUrl(browserHistory[next] ?? browserUrl);
							setBrowserDraft(browserHistory[next] ?? browserUrl);
						},
						onBrowserForward: () => {
							const next = Math.min(browserHistory.length - 1, browserHistoryIndex + 1);
							setBrowserHistoryIndex(next);
							setBrowserUrl(browserHistory[next] ?? browserUrl);
							setBrowserDraft(browserHistory[next] ?? browserUrl);
						},
						onBrowserRefresh: () => {
							setBrowserKey((value) => value + 1);
						}
					}) : null,
					sidecarOpen && activeRoom !== void 0 ? (0, react_jsx_runtime.jsx)(SidecarDrawer, {
						roomTitle: activeRoom.title,
						messages: sidecarMessages,
						draft: sidecarDraft,
						busy: sidecarBusy,
						error: sidecarError,
						onDraft: setSidecarDraft,
						onSubmit: submitSidecar,
						onClose: closeTemporaryChat
					}) : null,
					roomMenu !== null ? (() => {
						const room = state.rooms.find((item) => item.roomId === roomMenu.roomId);
						if (room === void 0) return null;
						const close = () => {
							setRoomMenu(null);
						};
						return (0, react_jsx_runtime.jsx)("div", {
							className: SkillContactsBrowser_module_css_default.menuBackdrop,
							onMouseDown: close,
							children: (0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.roomMenu,
								style: {
									left: `${Math.min(roomMenu.x, window.innerWidth - 190)}px`,
									top: `${Math.min(roomMenu.y, window.innerHeight - 170)}px`
								},
								onMouseDown: (event) => {
									event.stopPropagation();
								},
								children: [
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											togglePin(room);
											close();
										},
										children: room.pinnedAt === void 0 ? t("pin") : t("unpin")
									}),
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setSavedRooms((current) => current.includes(room.roomId) ? current.filter((id) => id !== room.roomId) : [...current, room.roomId]);
											close();
										},
										children: savedRooms.includes(room.roomId) ? t("unsaveRoom") : t("saveRoom")
									}),
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											updateRoom(room.roomId, { archivedAt: Date.now() });
											close();
										},
										children: t("archive")
									}),
									(0, react_jsx_runtime.jsx)("button", {
										className: SkillContactsBrowser_module_css_default.menuDanger,
										type: "button",
										onClick: () => {
											setDeleteConfirm(room.roomId);
											close();
										},
										children: t("delete")
									})
								]
							})
						});
					})() : null,
					deleteConfirm !== null ? (0, react_jsx_runtime.jsxs)(Dialog, {
						className: SkillContactsBrowser_module_css_default.confirmDialog,
						label: t("delete"),
						onClose: () => {
							setDeleteConfirm(null);
						},
						children: [
							(0, react_jsx_runtime.jsx)("h2", { children: t("deleteRoomTitle") }),
							(0, react_jsx_runtime.jsx)("p", { children: t("deleteRoomBody") }),
							(0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.confirmActions,
								children: [(0, react_jsx_runtime.jsx)(Button, {
									onClick: () => {
										setDeleteConfirm(null);
									},
									children: t("cancel")
								}), (0, react_jsx_runtime.jsx)(Button, {
									variant: "danger",
									onClick: () => {
										deleteRoom(deleteConfirm);
										setDeleteConfirm(null);
									},
									children: t("delete")
								})]
							})
						]
					}) : null,
					archiveConfirm !== null ? (0, react_jsx_runtime.jsxs)(Dialog, {
						className: SkillContactsBrowser_module_css_default.confirmDialog,
						label: "归档群组",
						onClose: () => {
							setArchiveConfirm(null);
						},
						children: [
							(0, react_jsx_runtime.jsx)("h2", { children: t("archiveGroupTitle") }),
							(0, react_jsx_runtime.jsx)("p", { children: t("archiveGroupBody") }),
							(0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.confirmActions,
								children: [(0, react_jsx_runtime.jsx)(Button, {
									onClick: () => {
										setArchiveConfirm(null);
									},
									children: "取消"
								}), (0, react_jsx_runtime.jsx)(Button, {
									variant: "danger",
									onClick: () => {
										updateRoom(archiveConfirm, { archivedAt: Date.now() });
										setArchiveConfirm(null);
										setRoomSettingsOpen(false);
									},
									children: "归档"
								})]
							})
						]
					}) : null,
					roomSettingsOpen && activeRoom?.type === "group" ? (0, react_jsx_runtime.jsxs)(Drawer, {
						className: `${SkillContactsBrowser_module_css_default.panel} ${SkillContactsBrowser_module_css_default.groupSettingsPanel}`,
						label: t("groupSettings"),
						onClose: () => {
							setRoomSettingsOpen(false);
						},
						children: [
							(0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.panelTop,
								children: [(0, react_jsx_runtime.jsx)(GroupAvatar, {
									avatarId: roomAvatarDraft,
									label: activeRoom.title
								}), (0, react_jsx_runtime.jsx)(IconButton, {
									className: SkillContactsBrowser_module_css_default.close,
									variant: "ghost",
									"aria-label": "关闭",
									onClick: () => {
										setRoomSettingsOpen(false);
									},
									children: "×"
								})]
							}),
							(0, react_jsx_runtime.jsx)("div", {
								className: SkillContactsBrowser_module_css_default.groupAvatarLibrary,
								children: ANIMAL_AVATARS.map((avatarId) => (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									"data-selected": roomAvatarDraft === avatarId,
									onClick: () => {
										setRoomAvatarDraft(avatarId);
									},
									children: (0, react_jsx_runtime.jsx)(GroupAvatar, {
										avatarId,
										label: avatarId,
										small: true
									})
								}, avatarId))
							}),
							(0, react_jsx_runtime.jsxs)("label", {
								className: SkillContactsBrowser_module_css_default.field,
								children: [(0, react_jsx_runtime.jsx)("span", { children: t("groupNameLabel") }), (0, react_jsx_runtime.jsx)("input", {
									value: roomTitleDraft,
									onChange: (event) => {
										setRoomTitleDraft(event.target.value);
									}
								})]
							}),
							(0, react_jsx_runtime.jsxs)("label", {
								className: SkillContactsBrowser_module_css_default.field,
								children: [(0, react_jsx_runtime.jsx)("span", { children: t("groupRolePrompt") }), (0, react_jsx_runtime.jsx)("textarea", {
									value: roomPromptDraft,
									onChange: (event) => {
										setRoomPromptDraft(event.target.value);
									},
									placeholder: t("groupRolePlaceholder")
								})]
							}),
							(0, react_jsx_runtime.jsx)("button", {
								className: SkillContactsBrowser_module_css_default.generatePrompt,
								type: "button",
								onClick: () => {
									setRoomPromptDraft(generatedGroupPrompt(roomTitleDraft.trim() || activeRoom.title, activeMembers));
								},
								children: t("regenerateFromMembers")
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.workspaceBindings,
								children: [(0, react_jsx_runtime.jsxs)("div", {
									className: SkillContactsBrowser_module_css_default.bindingHeader,
									children: [(0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)("strong", { children: t("bindProjects") }), (0, react_jsx_runtime.jsx)("small", { children: t("bindingHint") })] }), (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											addLinkedWorkspace("settings");
										},
										children: t("addDirectory")
									})]
								}), workspaces.items.map((workspace) => (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									"data-selected": roomWorkspaceIds.includes(workspace.workspaceId),
									onClick: () => {
										toggleWorkspaceBinding("settings", workspace.workspaceId);
									},
									children: [
										(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpenOutline16, {}),
										(0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)("strong", { children: workspace.title }), (0, react_jsx_runtime.jsx)("small", { children: workspace.path })] }),
										(0, react_jsx_runtime.jsx)("b", { children: roomWorkspaceIds.includes(workspace.workspaceId) ? "✓" : "＋" })
									]
								}, workspace.workspaceId))]
							}),
							(0, react_jsx_runtime.jsx)("div", {
								className: SkillContactsBrowser_module_css_default.panelHint,
								children: t("memberPanelHint")
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.memberToolbar,
								children: [(0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("strong", { children: t("allMembers") }), (0, react_jsx_runtime.jsxs)("small", { children: [activeRoom.memberIds.length, " 个已加入"] })] }), (0, react_jsx_runtime.jsx)("input", {
									value: memberQuery,
									onChange: (event) => {
										setMemberQuery(event.target.value);
									},
									placeholder: t("searchMembersPlaceholder"),
									"aria-label": t("searchMembers"),
									autoComplete: "off",
									spellCheck: false,
									type: "search"
								})]
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.roomMemberGrid,
								children: [
									visibleMemberContacts.map((contact) => {
										const included = activeRoom.memberIds.includes(contact.id);
										const coordinator = activeRoom.coordinatorId === contact.id;
										const display = displayOf(contact, "persona", state.personas);
										return (0, react_jsx_runtime.jsxs)("div", {
											className: SkillContactsBrowser_module_css_default.roomMemberItem,
											"data-included": included || void 0,
											children: [(0, react_jsx_runtime.jsxs)("button", {
												type: "button",
												className: SkillContactsBrowser_module_css_default.memberPersona,
												disabled: !included,
												onClick: () => {
													updateRoom(activeRoom.roomId, { coordinatorId: contact.id });
												},
												children: [(0, react_jsx_runtime.jsx)(AnimalAvatar, {
													avatarId: display.avatar,
													label: display.name,
													seed: contact.id
												}), (0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)("strong", { children: display.name }), (0, react_jsx_runtime.jsx)("small", { children: coordinator ? t("coordinator") : contact.name })] })]
											}), (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: SkillContactsBrowser_module_css_default.memberToggle,
												onClick: () => {
													toggleActiveRoomMember(contact.id);
												},
												children: included ? "−" : "＋"
											})]
										}, contact.id);
									}),
									deferredMemberQuery.length >= 2 && externalPhase === "loading" ? (0, react_jsx_runtime.jsx)("div", {
										className: SkillContactsBrowser_module_css_default.status,
										children: t("searchingExternal")
									}) : null,
									externalResults.map((result) => marketplaceRow(result, "active-group"))
								]
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.profileActions,
								children: [(0, react_jsx_runtime.jsx)(Button, {
									className: SkillContactsBrowser_module_css_default.primary,
									variant: "primary",
									onClick: () => {
										const linked = roomWorkspaceIds.length === 0 ? [activeRoom.workspaceId] : roomWorkspaceIds;
										if (roomTitleDraft.trim() !== "") updateRoom(activeRoom.roomId, {
											title: roomTitleDraft.trim(),
											systemPrompt: roomPromptDraft.trim(),
											avatarId: roomAvatarDraft,
											workspaceId: linked[0] ?? activeRoom.workspaceId,
											workspaceIds: linked
										});
										setRoomSettingsOpen(false);
									},
									children: t("saveGroup")
								}), (0, react_jsx_runtime.jsx)(Button, {
									className: SkillContactsBrowser_module_css_default.danger,
									variant: "danger",
									onClick: () => {
										setArchiveConfirm(activeRoom.roomId);
									},
									children: t("archiveGroup")
								})]
							})
						]
					}) : null
				]
			});
		}
		function DSChatBrand() {
			return (0, react_jsx_runtime.jsxs)("span", {
				className: SkillContactsBrowser_module_css_default.dsChatBrand,
				children: ["DS ", (0, react_jsx_runtime.jsx)("b", { children: "Chat" })]
			});
		}
		//#endregion
		//#region lib/types/client/shell/slots.js
		const DS_CHAT_SHELL_CHILDREN = {
			"ds-chat.sidebar.before-rooms": {
				kind: "list",
				scope: "root"
			},
			"ds-chat.sidebar.after-rooms": {
				kind: "list",
				scope: "root"
			},
			"ds-chat.room.header.actions": {
				kind: "list",
				scope: "root"
			},
			"ds-chat.room.drawer": {
				kind: "list",
				scope: "root"
			},
			"ds-chat.composer.before": {
				kind: "list",
				scope: "root"
			},
			"ds-chat.composer.actions": {
				kind: "list",
				scope: "root"
			},
			"ds-chat.message.artifact": {
				kind: "list",
				scope: "root"
			},
			"ds-chat.settings.section": {
				kind: "list",
				scope: "root"
			}
		};
		//#endregion
		//#region lib/types/client/skin/builtins.js
		const BUILTIN_SKINS = [
			{
				source: "builtin",
				manifest: {
					$schema: "https://schemas.linxin666.org/dsh-skin/v2.json",
					skinManifestVersion: 2,
					id: "ds-chat-mint",
					name: "薄荷工作台",
					nameEn: "DS Chat Mint",
					version: "1.0.0",
					author: "DS Chat",
					tagline: "清爽、平整、适合长时间协作",
					description: "DS Chat 默认皮肤：薄荷强调色、平整材质与发丝描边，明暗两种配色均适用。",
					tags: [
						"builtin",
						"mint",
						"light"
					],
					accent: "#17b877",
					order: 0,
					contributes: { stylesheet: "skin.css" }
				},
				css: `html[data-dsh-skin="ds-chat-mint"] {
    /* A skin states its identity and its shape; every tint, stroke, focus ring
       and selection fill is derived from the accent in theme.css, so a skin
       never restates the same green six times. */
    --ds-chat-accent-solid: #17b877;
    --ds-chat-accent-hover: #12a068;
    --ds-chat-radius-control: 12px;
    --ds-chat-radius-lg: 18px;
    --ds-chat-radius-xl: 24px;
  }
  html[data-dsh-skin="ds-chat-mint"] body[data-ds-dark-theme] {
    --ds-chat-accent-solid: #3ddb95;
    --ds-chat-accent-hover: #57e5a7;
    --ds-chat-on-accent: #04231a;
  }`
			},
			{
				source: "builtin",
				manifest: {
					$schema: "https://schemas.linxin666.org/dsh-skin/v2.json",
					skinManifestVersion: 2,
					id: "teamily-soft",
					name: "Teamily 柔光",
					nameEn: "Teamily Soft",
					version: "1.0.0",
					author: "DS Chat",
					tagline: "温暖白底、蓝紫强调与层叠卡片",
					description: "参考 Teamily 协作产品的柔和社交感，同时保留 DS Chat 的工作台密度。",
					tags: [
						"builtin",
						"soft",
						"collaboration"
					],
					accent: "#6c6ce5",
					order: 10,
					contributes: { stylesheet: "skin.css" }
				},
				css: `html[data-dsh-skin="teamily-soft"] {
    --ds-chat-accent-solid: #6c6ce5;
    --ds-chat-accent-hover: #5a5ad6;
    --ds-chat-radius-control: 13px;
    --ds-chat-radius-lg: 20px;
    --ds-chat-radius-xl: 26px;
  }
  html[data-dsh-skin="teamily-soft"] body[data-ds-dark-theme] {
    --ds-chat-accent-solid: #a5a5ff;
    --ds-chat-accent-hover: #b9b9ff;
    --ds-chat-on-accent: #14103a;
  }`
			},
			{
				source: "builtin",
				manifest: {
					$schema: "https://schemas.linxin666.org/dsh-skin/v2.json",
					skinManifestVersion: 2,
					id: "ds-chat-nocturne",
					name: "夜航",
					nameEn: "DS Chat Nocturne",
					version: "2.0.0",
					author: "DS Chat",
					tagline: "蓝紫强调、紧凑圆角，社群聊天风格",
					description: "参考 Discord 的社群聊天观感：蓝紫强调色，圆角更小、层级靠明度而非描边。跟随系统与应用的明暗开关。",
					tags: ["builtin", "community"],
					accent: "#5865f2",
					order: 20,
					contributes: { stylesheet: "skin.css" }
				},
				css: `html[data-dsh-skin="ds-chat-nocturne"] {
    --ds-chat-accent-solid: #5865f2;
    --ds-chat-accent-hover: #4752c4;
    --ds-chat-on-accent: #fff;
    --ds-chat-accent-text: #4752c4;
    --ds-chat-radius-control: 8px;
    --ds-chat-radius-sm: 6px;
    --ds-chat-radius-md: 10px;
    --ds-chat-radius-lg: 12px;
    --ds-chat-radius-xl: 16px;
  }
  html[data-dsh-skin="ds-chat-nocturne"] body[data-ds-dark-theme] {
    --ds-chat-accent-solid: #7d88ff;
    --ds-chat-accent-hover: #99a2ff;
    --ds-chat-accent-text: #c3c8ff;
    --ds-chat-on-accent: #12163a;
  }
  /* Selection reads by lightness rather than a border, which is this skin's
     one structural idea and costs nothing on either ground. */
  html[data-dsh-skin="ds-chat-nocturne"] [data-skill-chat-root] [class*="roomRow"][data-selected="true"] {
    background: var(--ds-chat-accent-soft-strong);
  }`
			}
		];
		//#endregion
		//#region lib/types/client/skin/manifest.js
		const DSH_SKIN_MANIFEST_VERSION = 2;
		const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
		const HEX_PATTERN = /^#[0-9a-f]{6}$/iu;
		function validateSkinPackage(value) {
			if (typeof value !== "object" || value === null) return {
				ok: false,
				diagnostic: {
					id: "unknown",
					message: "Skin package must be an object."
				}
			};
			const skin = value;
			const manifestValue = skin.manifest;
			if (typeof manifestValue !== "object" || manifestValue === null) return {
				ok: false,
				diagnostic: {
					id: "unknown",
					message: "skin.json is missing."
				}
			};
			const manifest = manifestValue;
			const id = typeof manifest.id === "string" ? manifest.id : "unknown";
			if (manifest.skinManifestVersion !== 2) return {
				ok: false,
				diagnostic: {
					id,
					message: "Only dsh-web Skin Manifest v2 is supported."
				}
			};
			if (!ID_PATTERN.test(id)) return {
				ok: false,
				diagnostic: {
					id,
					message: "Skin id must use lowercase kebab-case."
				}
			};
			if (typeof manifest.name !== "string" || manifest.name.trim() === "") return {
				ok: false,
				diagnostic: {
					id,
					message: "Skin name is required."
				}
			};
			if (typeof manifest.version !== "string" || manifest.version.trim() === "") return {
				ok: false,
				diagnostic: {
					id,
					message: "Skin version is required."
				}
			};
			if (typeof manifest.author !== "string" || manifest.author.trim() === "") return {
				ok: false,
				diagnostic: {
					id,
					message: "Skin author is required."
				}
			};
			if (typeof manifest.tagline !== "string" || manifest.tagline.trim() === "") return {
				ok: false,
				diagnostic: {
					id,
					message: "Skin tagline is required."
				}
			};
			if (typeof manifest.accent !== "string" || !HEX_PATTERN.test(manifest.accent)) return {
				ok: false,
				diagnostic: {
					id,
					message: "Skin accent must be a six-digit hex color."
				}
			};
			const contributes = manifest.contributes;
			if (typeof contributes !== "object" || contributes === null || contributes.stylesheet !== "skin.css") return {
				ok: false,
				diagnostic: {
					id,
					message: "Skin v2 stylesheet must be skin.css."
				}
			};
			if (typeof skin.css !== "string" || skin.css.trim() === "") return {
				ok: false,
				diagnostic: {
					id,
					message: "Skin stylesheet is empty."
				}
			};
			if (!skin.css.includes(`html[data-dsh-skin="${id}"]`)) return {
				ok: false,
				diagnostic: {
					id,
					message: `Skin CSS must be scoped to html[data-dsh-skin="${id}"].`
				}
			};
			if (/(@import|url\(\s*["']?(?:https?:)?\/\/|url\(\s*["']?\.\.\/)/iu.test(skin.css)) return {
				ok: false,
				diagnostic: {
					id,
					message: "Remote imports and escaping asset URLs are not allowed."
				}
			};
			return {
				ok: true,
				value
			};
		}
		//#endregion
		//#region lib/types/client/skin/runtime.js
		const SKIN_PREFERENCE_KEY = "dsh.skill-chat.skin.v1";
		const DEFAULT_SKIN_ID = "ds-chat-mint";
		const STYLE_ID = "dsh-skill-chat-skin";
		function storedPreference() {
			try {
				return localStorage.getItem("dsh.skill-chat.skin.v1") ?? DEFAULT_SKIN_ID;
			} catch {
				return DEFAULT_SKIN_ID;
			}
		}
		function writePreference(id) {
			try {
				localStorage.setItem(SKIN_PREFERENCE_KEY, id);
			} catch {}
		}
		function createSkinRuntime(packages = BUILTIN_SKINS) {
			const diagnostics = [];
			const skins = [];
			for (const candidate of packages) {
				const result = validateSkinPackage(candidate);
				if (result.ok) skins.push(result.value);
				else diagnostics.push(result.diagnostic);
			}
			skins.sort((left, right) => (left.manifest.order ?? 0) - (right.manifest.order ?? 0));
			const fallback = skins.find((skin) => skin.manifest.id === DEFAULT_SKIN_ID) ?? skins[0];
			if (fallback === void 0) throw new Error("DS Chat requires at least one valid skin");
			const saved = storedPreference();
			let activeId = skins.some((skin) => skin.manifest.id === saved) ? saved : fallback.manifest.id;
			let previewId;
			let revision = 0;
			let snapshot;
			const listeners = /* @__PURE__ */ new Set();
			const publish = () => {
				revision += 1;
				snapshot = Object.freeze({
					activeId,
					...previewId === void 0 ? {} : { previewId },
					skins: Object.freeze([...skins]),
					diagnostics: Object.freeze([...diagnostics]),
					revision
				});
				for (const listener of listeners) listener();
			};
			const render = () => {
				if (typeof document === "undefined") return;
				const selected = skins.find((skin) => skin.manifest.id === (previewId ?? activeId)) ?? fallback;
				document.documentElement.dataset.dshSkin = selected.manifest.id;
				let style = document.getElementById(STYLE_ID);
				if (style === null) {
					style = document.createElement("style");
					style.id = STYLE_ID;
					document.head.append(style);
				}
				style.textContent = [selected.css, selected.patches ?? ""].filter(Boolean).join("\n");
			};
			const update = () => {
				render();
				publish();
			};
			snapshot = Object.freeze({
				activeId,
				skins: Object.freeze([...skins]),
				diagnostics: Object.freeze([...diagnostics]),
				revision
			});
			render();
			return {
				getSnapshot: () => snapshot,
				subscribe: (listener) => {
					listeners.add(listener);
					return () => {
						listeners.delete(listener);
					};
				},
				apply: (id) => {
					if (!skins.some((skin) => skin.manifest.id === id)) throw new Error(`Unknown DS Chat skin: ${id}`);
					activeId = id;
					previewId = void 0;
					writePreference(id);
					update();
				},
				preview: (id) => {
					if (id !== void 0 && !skins.some((skin) => skin.manifest.id === id)) throw new Error(`Unknown DS Chat skin: ${id}`);
					previewId = id;
					update();
				},
				reset: () => {
					activeId = fallback.manifest.id;
					previewId = void 0;
					writePreference(activeId);
					update();
				},
				dispose: () => {
					if (typeof document !== "undefined") {
						document.getElementById(STYLE_ID)?.remove();
						delete document.documentElement.dataset.dshSkin;
					}
					listeners.clear();
				}
			};
		}
		//#endregion
		//#region \0dsh-css:/Users/lileilei/workspace/deepseek-harness/packages/experimental/client-ui-skill-chat/src/client/skin/SkinCenter.module.css.mjs
		const css = ".J1eEvW_trigger{justify-content:flex-start;width:calc(100% - 24px);margin:0 12px 10px}.J1eEvW_panel{padding:18px}.J1eEvW_header{justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:16px;display:flex}.J1eEvW_header span{gap:3px;display:grid}.J1eEvW_header strong{font-size:var(--ds-chat-text-title2)}.J1eEvW_header small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);line-height:1.45}.J1eEvW_grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;display:grid}.J1eEvW_card{border:var(--ds-chat-hairline) solid var(--ds-chat-border);border-radius:var(--ds-chat-radius-lg);min-width:0;color:inherit;background:var(--ds-chat-surface-raised,var(--ds-chat-surface));box-shadow:var(--ds-chat-shadow-1);text-align:left;cursor:pointer;font:inherit;gap:10px;padding:12px;display:grid}.J1eEvW_card[data-active=true]{border-color:var(--ds-chat-accent-border);box-shadow:0 10px 25px color-mix(in srgb, var(--ds-chat-accent-solid) 16%, transparent)}.J1eEvW_preview{background:color-mix(in srgb, var(--skin-accent) 8%, var(--skin-ground,var(--ds-chat-fill-quaternary)));border-radius:13px;grid-template-columns:32% 1fr;gap:8px;height:112px;padding:9px;display:grid;overflow:hidden}.J1eEvW_preview aside{background:color-mix(in srgb, var(--skin-accent) 16%, var(--skin-ground,var(--ds-chat-surface)));border-radius:9px}.J1eEvW_preview main{align-content:center;gap:7px;display:grid}.J1eEvW_preview i{background:color-mix(in srgb, var(--skin-accent) 22%, var(--skin-ground,var(--ds-chat-surface)));border-radius:999px;height:12px;display:block}.J1eEvW_preview i:nth-child(2){width:74%}.J1eEvW_preview i:nth-child(3){background:var(--skin-accent);width:52%}.J1eEvW_copy{gap:3px;display:grid}.J1eEvW_copy strong{font-size:var(--ds-chat-text-body)}.J1eEvW_copy small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);line-height:1.45}.J1eEvW_footer{justify-content:space-between;align-items:center;gap:12px;margin-top:16px;display:flex}.J1eEvW_diagnostic{color:var(--ds-chat-warning);font-size:var(--ds-chat-text-caption)}@media (width<=620px){.J1eEvW_grid{grid-template-columns:1fr}}.J1eEvW_preview[data-grounded]{background:var(--skin-ground)}.J1eEvW_preview[data-grounded] aside{background:color-mix(in srgb, #fff 10%, var(--skin-ground))}.J1eEvW_preview[data-grounded] i{background:color-mix(in srgb, #fff 22%, var(--skin-ground))}.J1eEvW_preview[data-grounded] i:nth-child(3){background:var(--skin-accent)}";
		const tagId = "deepseek-harness-chat-ui/SkinCenter.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "deepseek-harness-chat-ui";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var SkinCenter_module_css_default = {
			"card": "J1eEvW_card",
			"copy": "J1eEvW_copy",
			"diagnostic": "J1eEvW_diagnostic",
			"footer": "J1eEvW_footer",
			"grid": "J1eEvW_grid",
			"header": "J1eEvW_header",
			"panel": "J1eEvW_panel",
			"preview": "J1eEvW_preview",
			"trigger": "J1eEvW_trigger"
		};
		//#endregion
		//#region lib/types/client/skin/SkinCenter.js
		function SkinCenter({ skinRuntime }) {
			const [open, setOpen] = (0, react.useState)(false);
			const snapshot = (0, react.useSyncExternalStore)(skinRuntime.subscribe, skinRuntime.getSnapshot, skinRuntime.getSnapshot);
			const close = () => {
				skinRuntime.preview(void 0);
				setOpen(false);
			};
			return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)(Button, {
				className: SkinCenter_module_css_default.trigger,
				variant: "ghost",
				size: "small",
				onClick: () => {
					setOpen(true);
				},
				children: "◐ 外观与皮肤"
			}), open ? (0, react_jsx_runtime.jsxs)(Dialog, {
				label: "DS Chat 皮肤中心",
				onClose: close,
				className: SkinCenter_module_css_default.panel,
				children: [
					(0, react_jsx_runtime.jsxs)("header", {
						className: SkinCenter_module_css_default.header,
						children: [(0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)("strong", { children: "皮肤中心" }), (0, react_jsx_runtime.jsx)("small", { children: "兼容 dsh-web Skin Manifest v2；皮肤只改变视觉，不接触 Room、Persona 或自动化逻辑。" })] }), (0, react_jsx_runtime.jsx)(IconButton, {
							variant: "ghost",
							"aria-label": "关闭",
							onClick: close,
							children: "×"
						})]
					}),
					(0, react_jsx_runtime.jsx)("div", {
						className: SkinCenter_module_css_default.grid,
						children: snapshot.skins.map((skin) => (0, react_jsx_runtime.jsxs)("button", {
							className: SkinCenter_module_css_default.card,
							"data-active": snapshot.activeId === skin.manifest.id || void 0,
							type: "button",
							onMouseEnter: () => {
								skinRuntime.preview(skin.manifest.id);
							},
							onMouseLeave: () => {
								skinRuntime.preview(void 0);
							},
							onFocus: () => {
								skinRuntime.preview(skin.manifest.id);
							},
							onBlur: () => {
								skinRuntime.preview(void 0);
							},
							onClick: () => {
								skinRuntime.apply(skin.manifest.id);
							},
							style: {
								"--skin-accent": skin.manifest.accent,
								...skin.manifest.preview?.light === void 0 ? {} : { "--skin-ground": skin.manifest.preview.light }
							},
							children: [(0, react_jsx_runtime.jsxs)(Surface, {
								level: "sunken",
								className: SkinCenter_module_css_default.preview,
								"data-grounded": skin.manifest.preview?.light === void 0 ? void 0 : true,
								children: [(0, react_jsx_runtime.jsx)("aside", {}), (0, react_jsx_runtime.jsxs)("main", { children: [
									(0, react_jsx_runtime.jsx)("i", {}),
									(0, react_jsx_runtime.jsx)("i", {}),
									(0, react_jsx_runtime.jsx)("i", {})
								] })]
							}), (0, react_jsx_runtime.jsxs)("span", {
								className: SkinCenter_module_css_default.copy,
								children: [(0, react_jsx_runtime.jsx)("strong", { children: skin.manifest.name }), (0, react_jsx_runtime.jsx)("small", { children: skin.manifest.tagline })]
							})]
						}, skin.manifest.id))
					}),
					(0, react_jsx_runtime.jsxs)("footer", {
						className: SkinCenter_module_css_default.footer,
						children: [(0, react_jsx_runtime.jsx)("span", {
							className: SkinCenter_module_css_default.diagnostic,
							children: snapshot.diagnostics.length === 0 ? "Manifest 校验通过 · L1/L2 安全模式" : `${snapshot.diagnostics.length} 个无效皮肤已隔离`
						}), (0, react_jsx_runtime.jsx)(Button, {
							onClick: () => {
								skinRuntime.reset();
							},
							children: "恢复默认"
						})]
					})
				]
			}) : null] });
		}
		//#endregion
		//#region lib/types/client/index.js
		function stateFromRemote(value) {
			return value;
		}
		const inject = [
			"slots",
			"sessions",
			"workspaces",
			"uiWorkspace",
			"conversation",
			"inputTriggers",
			"remote",
			"locale"
		];
		function registerUi(ctx) {
			const sessions = ctx.get("sessions");
			const workspaces = ctx.get("workspaces");
			const uiWorkspace = ctx.get("uiWorkspace");
			const conversation = ctx.get("conversation");
			const skinRuntime = createSkinRuntime();
			ctx.effect(() => () => {
				skinRuntime.dispose();
			}, "skill-chat: skin runtime");
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "skill-chat: dictionaries");
			const loadContacts = async (sessionId, signal) => {
				const [nativeResult, workBuddyResult] = await Promise.all([sessionId === void 0 ? void 0 : ctx.remote.skills.list({ sessionId }, signal), ctx.remote.workbuddySkills.list(signal)]);
				if (nativeResult !== void 0 && !nativeResult.ok) throw new Error(nativeResult.error.message);
				if (!workBuddyResult.ok) throw new Error(workBuddyResult.error.message);
				return mergeContacts(nativeResult?.value.skills ?? [], workBuddyResult.value.contacts);
			};
			const searchExternal = async (query, signal) => {
				const result = await ctx.remote.workbuddySkills.searchExternal(query, signal);
				if (!result.ok) throw new Error(result.error.message);
				return result.value.contacts.map((contact) => ({ ...contact }));
			};
			const loadState = async (signal) => {
				const result = await ctx.remote.workbuddySkills.getSkillChatState(signal);
				if (!result.ok) throw new Error(result.error.message);
				return stateFromRemote(result.value);
			};
			const saveState = async (state, signal) => {
				const result = await ctx.remote.workbuddySkills.putSkillChatState(state, signal);
				if (!result.ok) throw new Error(result.error.message);
			};
			const runAutomation = async (automationId, signal) => {
				const result = await ctx.remote.workbuddySkills.runSkillChatAutomation(automationId, signal);
				if (!result.ok) throw new Error(result.error.message);
				return {
					sessionId: result.value.sessionId,
					state: stateFromRemote(result.value.state)
				};
			};
			const installExternal = async (workspaceId, contact, signal) => {
				const result = await ctx.remote.workbuddySkills.installExternal({
					workspaceId,
					...contact
				}, signal);
				if (!result.ok) throw new Error(result.error.message);
				return result.value.contact;
			};
			/**
			* Who can be mentioned in this Session.
			*
			* The Room Session's own member snapshot is the record: it was taken when the
			* Session started, so it survives a catalog whose contact ids shifted. The
			* legacy per-Session binding map is consulted only for conversations that
			* predate Rooms.
			* @param sessionId - the Harness Session the composer belongs to.
			* @returns mentionable members, possibly empty.
			*/
			const roomMembers = (sessionId) => {
				const state = readStored(STATE_KEY, {
					version: 2,
					rooms: [],
					roomSessions: [],
					personas: {},
					automations: []
				});
				const roomSession = state.roomSessions.find((item) => item.harnessSessionId === sessionId);
				const room = roomSession === void 0 ? void 0 : state.rooms.find((item) => item.roomId === roomSession.roomId);
				if (roomSession !== void 0 && roomSession.memberSnapshot.length > 0) return roomSession.memberSnapshot.map((member) => ({
					name: state.personas[member.skillId]?.displayName ?? member.displayName,
					skill: member.originalName,
					description: state.personas[member.skillId]?.bio ?? "",
					...room?.type === "group" ? { section: room.title } : {}
				}));
				if (room !== void 0 && room.memberIds.length > 0) return room.memberIds.map((id) => {
					const persona = state.personas[id];
					const skill = persona?.originalName ?? id.slice(id.lastIndexOf(":") + 1);
					return {
						name: persona?.displayName ?? skill,
						skill,
						description: persona?.bio ?? "",
						...room.type === "group" ? { section: room.title } : {}
					};
				});
				const binding = readStored(CHAT_BINDINGS_KEY, {})[sessionId];
				if (binding === void 0) return [];
				const mode = readStored(MODE_KEY, "persona");
				return binding.members.map((contact) => {
					return {
						name: displayOf(contact, mode).name,
						skill: contact.name,
						description: contact.description,
						...binding.kind === "group" ? { section: binding.name } : {}
					};
				});
			};
			/**
			* The log sequence one assistant message closed at.
			*
			* Forking needs a seq, and the per-message slot hands out a message id only.
			* The Session's own event window carries both, so the lookup is a scan of
			* what the client already holds rather than another round trip.
			* @param sessionId - the Session the message belongs to.
			* @param messageId - the durable message id from the slot.
			* @returns the seq, or undefined when the message is outside the loaded window.
			*/
			const messageSeq = (sessionId, messageId) => {
				const entries = sessions.binding(sessionId)?.eventSource.getSnapshot().entries ?? [];
				for (let index = entries.length - 1; index >= 0; index -= 1) {
					const entry = entries[index];
					if (entry === void 0 || entry.type !== "event") continue;
					const event = entry.event;
					if (event.data?.message?.id === messageId && typeof event.seq === "number") return event.seq;
				}
			};
			const mentionSource = {
				trigger: "@",
				name: "skill-contact",
				order: -20,
				showGroupTitle: false,
				candidates(session, { query, signal }) {
					signal.throwIfAborted();
					const members = roomMembers(session.sessionId);
					if (members.length === 0) return Promise.resolve([]);
					const normalized = query.trim().toLocaleLowerCase();
					return Promise.resolve(members.flatMap((member) => {
						if (normalized.length > 0 && !`${member.name} ${member.skill} ${member.description}`.toLocaleLowerCase().includes(normalized)) return [];
						return [{
							name: member.name,
							description: member.description,
							...member.section === void 0 ? {} : { section: member.section },
							value: JSON.stringify({
								name: member.name,
								skill: member.skill,
								description: member.description
							})
						}];
					}));
				},
				onPick({ candidate }) {
					if (candidate.value === void 0) return void 0;
					const value = JSON.parse(candidate.value);
					return { insert: {
						source: "skill-contact",
						ref: candidate.value,
						label: value.name,
						clipboardText: `@${value.name}`
					} };
				},
				codec: {
					clipboardText(ref) {
						return `@${JSON.parse(ref).name}`;
					},
					serialize(ref) {
						const value = JSON.parse(ref);
						return Promise.resolve(`@${value.name}（原始 Skill：${value.skill}；能力：${value.description}）`);
					}
				}
			};
			ctx.effect(() => ctx.get("inputTriggers").registerSource(mentionSource), "skill-chat: @ contacts");
			ctx.slots.inject("sidebar.workspaces", () => ctx.slots.register({
				name: "sidebar.workspaces",
				priority: -20,
				locale: NS,
				children: DS_CHAT_SHELL_CHILDREN,
				inject: () => ({
					loadContacts,
					searchExternal,
					installExternal,
					openSession: (sessionId) => {
						sessions.open(sessionId);
					},
					renameSession: async (sessionId, name) => {
						const session = sessions.binding(sessionId)?.session;
						if (session === void 0) return;
						const result = await session.rename(name);
						if (!result.ok) throw new Error(result.error.message);
					},
					startSession: (workspaceId) => sessions.create({ workspaceId }),
					forkSession: (sessionId, atSeq, increaseTitle) => sessions.fork({
						sessionId,
						atSeq,
						increaseTitle
					}),
					messageSeq: (sessionId, messageId) => messageSeq(sessionId, messageId),
					addWorkspace: async () => {
						const path = await uiWorkspace.pickDirectory();
						if (path === null) return null;
						return (await workspaces.create({ path })).workspaceId;
					},
					chooseContact: async (sessionId, contact, displayName) => {
						const actx = sessions.scope(sessionId);
						if (actx === void 0) throw new Error(`skill-chat: session "${sessionId}" has no client scope`);
						const draft = contact.invocable ? `/${contact.name} ` : `请以「${displayName}」的身份协助我。原始 Skill：${contact.name}。能力：${contact.description}\n\n我的需求是：`;
						conversation.input.for(actx).setDraft(draft);
						await sessions.binding(sessionId)?.session.rename(displayName);
					},
					chooseGroup: async (sessionId, group, displayNames) => {
						const actx = sessions.scope(sessionId);
						if (actx === void 0) throw new Error(`skill-chat: session "${sessionId}" has no client scope`);
						conversation.input.for(actx).setDraft("");
						await sessions.binding(sessionId)?.session.rename(group.name);
					},
					loadState,
					saveState,
					runAutomation,
					linkSkill: async (path, name, signal) => {
						const result = await ctx.remote.workbuddySkills.linkSkill({
							path,
							name
						}, signal);
						if (!result.ok) throw new Error(result.error.message);
						return result.value;
					},
					unlinkSkill: async (name, signal) => {
						const result = await ctx.remote.workbuddySkills.unlinkSkill(name, signal);
						if (!result.ok) throw new Error(result.error.message);
					},
					browseProject: async (workspaceId, path, signal) => {
						const result = await ctx.remote.workbuddySkills.browseProject({
							workspaceId,
							...path === void 0 ? {} : { path }
						}, signal);
						if (!result.ok) throw new Error(result.error.message);
						return result.value;
					},
					readProjectFile: async (workspaceId, path, signal) => {
						const result = await ctx.remote.workbuddySkills.readProjectFile({
							workspaceId,
							path
						}, signal);
						if (!result.ok) throw new Error(result.error.message);
						return result.value;
					},
					openTerminal: async (sessionId, workspaceId, signal) => {
						const result = await ctx.remote.workbuddySkills.openSkillChatTerminal({
							sessionId,
							workspaceId
						}, signal);
						if (!result.ok) throw new Error(result.error.message);
						return result.value;
					},
					sendTerminal: async (sessionId, terminalId, command, signal) => {
						const result = await ctx.remote.workbuddySkills.sendSkillChatTerminal({
							sessionId,
							terminalId,
							command
						}, signal);
						if (!result.ok) throw new Error(result.error.message);
						return result.value;
					},
					closeTerminal: async (sessionId, terminalId) => {
						const result = await ctx.remote.workbuddySkills.closeSkillChatTerminal({
							sessionId,
							terminalId
						});
						if (!result.ok) throw new Error(result.error.message);
					},
					startSidecar: async (request, signal) => {
						const result = await ctx.remote.workbuddySkills.startSkillChatSidecar(request, signal);
						if (!result.ok) throw new Error(result.error.message);
						return result.value;
					},
					sendSidecar: async (sidecarId, message, signal) => {
						const result = await ctx.remote.workbuddySkills.sendSkillChatSidecar({
							sidecarId,
							message
						}, signal);
						if (!result.ok) throw new Error(result.error.message);
						return result.value;
					},
					closeSidecar: async (sidecarId) => {
						const result = await ctx.remote.workbuddySkills.closeSkillChatSidecar(sidecarId);
						if (!result.ok) throw new Error(result.error.message);
					}
				})
			}, SkillContactsBrowser));
			ctx.slots.inject("ds-chat.settings.section", () => ctx.slots.register({
				name: "ds-chat.settings.section",
				id: "skin-center",
				order: 10,
				inject: () => ({ skinRuntime })
			}, SkinCenter));
			ctx.slots.inject("conversation.session.header.utilities", () => ctx.slots.register({
				name: "conversation.session.header.utilities",
				id: "skill-chat-tools",
				order: 20
			}, SkillChatHeaderTools));
			ctx.slots.inject("sidebar.brand.name", () => ctx.slots.register({
				name: "sidebar.brand.name",
				priority: -30
			}, DSChatBrand));
			ctx.slots.inject("conversation.chat.assistant-actions", () => ctx.slots.register({
				name: "conversation.chat.assistant-actions",
				id: "skill-chat-branch",
				order: 30
			}, SkillChatMessageActions));
		}
		function mergeContacts(nativeSkills, workBuddySkills) {
			const nativeNames = new Set(nativeSkills.map((skill) => skill.name));
			return [...nativeSkills.map((skill) => ({
				id: `harness:${skill.name}`,
				name: skill.name,
				description: skill.description,
				...skill.whenToUse === void 0 ? {} : { whenToUse: skill.whenToUse },
				source: "harness",
				sourceLabel: "DeepSeek Harness",
				invocable: true,
				modelInvocable: skill.modelInvocable
			})), ...workBuddySkills.filter((skill) => !nativeNames.has(skill.name)).map((skill) => ({
				...skill,
				sourceLabel: skill.version === void 0 ? `${skill.originLabel} · ${skill.plugin}` : `${skill.originLabel} · ${skill.plugin} ${skill.version}`,
				sourceShort: skill.originLabel,
				modelInvocable: false
			}))];
		}
		/** Mount the generated WorkBuddy Remote contribution before registering the UI. */
		async function mountSkillChatUi(ctx, contribution) {
			const disposeRemote = await ctx.remote.$mount(contribution);
			const ui = ctx.inject([
				"slots",
				"sessions",
				"workspaces",
				"uiWorkspace",
				"conversation",
				"inputTriggers",
				"remote.skills",
				"remote.workbuddySkills",
				"locale"
			], registerUi);
			try {
				await ui;
			} catch (error) {
				await ui.dispose();
				await disposeRemote();
				throw error;
			}
			return async () => {
				await ui.dispose();
				await disposeRemote();
			};
		}
		async function apply(ctx) {
			return await mountSkillChatUi(ctx, TYPERT_REMOTE);
		}
		//#endregion
		exports.Avatar = Avatar;
		exports.AvatarStack = AvatarStack;
		exports.BUILTIN_SKINS = BUILTIN_SKINS;
		exports.Button = Button;
		exports.ChatBubble = ChatBubble;
		exports.DSH_SKIN_MANIFEST_VERSION = DSH_SKIN_MANIFEST_VERSION;
		exports.DS_CHAT_SHELL_CHILDREN = DS_CHAT_SHELL_CHILDREN;
		exports.Dialog = Dialog;
		exports.Drawer = Drawer;
		exports.EmptyState = EmptyState;
		exports.IconButton = IconButton;
		exports.RoomRow = RoomRow;
		exports.SKIN_PREFERENCE_KEY = SKIN_PREFERENCE_KEY;
		exports.SearchInput = SearchInput;
		exports.SkinCenter = SkinCenter;
		exports.Surface = Surface;
		exports.WorkbenchPanel = WorkbenchPanel;
		exports.apply = apply;
		exports.createSkinRuntime = createSkinRuntime;
		exports.inject = inject;
		exports.mergeContacts = mergeContacts;
		exports.mountSkillChatUi = mountSkillChatUi;
		exports.validateSkinPackage = validateSkinPackage;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map