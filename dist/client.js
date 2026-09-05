window.__ModuleLoader__.load({
	id: "deepseek-harness-chat-ui",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
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
		function pick$1(schema, mask) {
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
		function merge(a, b) {
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
					return merge(this, other);
				},
				pick(mask) {
					return pick$1(this, mask);
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
				"archivedAt": number().readonly().optional()
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
		const _deepseek_ai_dsh_experimental_workbuddy_skill_catalog_workbuddySkills_list_result$schema = object({ "contacts": array(object({
			"id": string().readonly(),
			"name": string().readonly(),
			"description": string().readonly(),
			"whenToUse": string().readonly().optional(),
			"source": literal("workbuddy").readonly(),
			"originId": string().readonly(),
			"originLabel": string().readonly(),
			"plugin": string().readonly(),
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
				"archivedAt": number().readonly().optional()
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
				"archivedAt": number().readonly().optional()
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
					"archivedAt": number().readonly().optional()
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
						"line": 231,
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
						"line": 407,
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
						"line": 354,
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
						"line": 416,
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
						"line": 221,
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
						"line": 183,
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
						"line": 292,
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
						"line": 434,
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
						"line": 259,
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
						"line": 453,
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
						"line": 189,
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
						"line": 399,
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
						"line": 314,
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
						"line": 365,
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
		//#region lib/types/client/ui/avatar.js
		/** Coat, main and ink. Ordered so neighbouring entries are not near-duplicates. */
		const AVATAR_PALETTES = [
			[
				"#fff1e8",
				"#f07f62",
				"#7b3e31"
			],
			[
				"#e9f8ef",
				"#55b783",
				"#245b40"
			],
			[
				"#eef1ff",
				"#7d82d8",
				"#3f4278"
			],
			[
				"#fff5d9",
				"#dfaa3f",
				"#76530f"
			],
			[
				"#e7f5fb",
				"#51a7c8",
				"#245e73"
			],
			[
				"#faeaf3",
				"#d779aa",
				"#713652"
			],
			[
				"#ecfbf7",
				"#3fb8a6",
				"#175c53"
			],
			[
				"#fdeee6",
				"#e0894a",
				"#7a4318"
			],
			[
				"#f2edfd",
				"#9c7ae0",
				"#4a3178"
			],
			[
				"#e8f4e6",
				"#79ae5c",
				"#37552a"
			],
			[
				"#fdecec",
				"#e0655f",
				"#7a2c28"
			],
			[
				"#e9eff5",
				"#6f89a8",
				"#31445a"
			],
			[
				"#fff8e1",
				"#c9a227",
				"#6b5410"
			],
			[
				"#efe9e3",
				"#a2846b",
				"#4f3c2d"
			],
			[
				"#e6f7ff",
				"#4f9ae8",
				"#1f4d80"
			],
			[
				"#f7ecff",
				"#b96fd4",
				"#5f2d70"
			]
		];
		/** Silhouettes, ordered so the library reads as a varied grid rather than a gradient. */
		const AVATAR_SPECIES = [
			"fox",
			"cat",
			"bear",
			"rabbit",
			"owl",
			"panda",
			"otter",
			"deer",
			"seal",
			"dog",
			"mouse",
			"tiger",
			"frog",
			"penguin",
			"koala",
			"hamster",
			"wolf",
			"pig",
			"sheep",
			"monkey",
			"chick",
			"bat",
			"raccoon",
			"axolotl"
		];
		/** Every pickable identity: one entry per species and palette pair. */
		const AVATAR_LIBRARY = AVATAR_SPECIES.flatMap((species) => AVATAR_PALETTES.map((_, index) => `${species}-${index}`));
		/** FNV-style string hash; stable across runs and platforms. */
		function seedOf(value) {
			let hash = 2166136261;
			for (const char of value) {
				hash ^= char.codePointAt(0) ?? 0;
				hash = Math.imul(hash, 16777619) >>> 0;
			}
			return hash;
		}
		/** Pull an independent small integer out of one seed. */
		function pick(seed, slot, size) {
			return (Math.imul(seed ^ Math.imul(slot + 1, 2654435761), 2246822519) >>> 8) % size;
		}
		/**
		* Resolve an avatar id into the species and palette it names. Ids are written
		* `species-palette`; anything unrecognised falls back to a hash of the id so a
		* legacy or hand-typed value still draws something stable.
		* @param avatarId - the stored identity.
		* @returns species name and palette index.
		*/
		function resolve(avatarId) {
			const [head, tail] = avatarId.split("-");
			const named = AVATAR_SPECIES.find((item) => item === head);
			const index = Number.parseInt(tail ?? "", 10);
			const seed = seedOf(avatarId);
			return {
				species: named ?? AVATAR_SPECIES[seed % AVATAR_SPECIES.length] ?? "fox",
				palette: Number.isNaN(index) ? seed % AVATAR_PALETTES.length : Math.abs(index) % AVATAR_PALETTES.length
			};
		}
		/**
		* Head geometry per species. A single circle for everyone was the main reason
		* the old set read as one face: the silhouette is what the eye resolves first
		* at 30px, so it has to differ before the ears do.
		*/
		const HEADS = {
			fox: {
				rx: 17,
				ry: 16,
				cy: 26
			},
			wolf: {
				rx: 16.5,
				ry: 17,
				cy: 26
			},
			cat: {
				rx: 17,
				ry: 15.5,
				cy: 27
			},
			bear: {
				rx: 18,
				ry: 17,
				cy: 27
			},
			panda: {
				rx: 18,
				ry: 17,
				cy: 27
			},
			rabbit: {
				rx: 15,
				ry: 16,
				cy: 28
			},
			owl: {
				rx: 18,
				ry: 16,
				cy: 26
			},
			otter: {
				rx: 17,
				ry: 15,
				cy: 28
			},
			deer: {
				rx: 14.5,
				ry: 17,
				cy: 28
			},
			seal: {
				rx: 16,
				ry: 17,
				cy: 27
			},
			dog: {
				rx: 16,
				ry: 16.5,
				cy: 27
			},
			mouse: {
				rx: 14.5,
				ry: 14.5,
				cy: 29
			},
			tiger: {
				rx: 18,
				ry: 16.5,
				cy: 27
			},
			frog: {
				rx: 19,
				ry: 14,
				cy: 30
			},
			penguin: {
				rx: 15,
				ry: 17.5,
				cy: 27
			},
			koala: {
				rx: 16,
				ry: 15,
				cy: 28
			},
			hamster: {
				rx: 17.5,
				ry: 15,
				cy: 28
			},
			pig: {
				rx: 18,
				ry: 15.5,
				cy: 27
			},
			sheep: {
				rx: 14.5,
				ry: 15,
				cy: 29
			},
			monkey: {
				rx: 16,
				ry: 16,
				cy: 27
			},
			chick: {
				rx: 16,
				ry: 15,
				cy: 28
			},
			bat: {
				rx: 16.5,
				ry: 14.5,
				cy: 28
			},
			raccoon: {
				rx: 17.5,
				ry: 15.5,
				cy: 27
			},
			axolotl: {
				rx: 17,
				ry: 15,
				cy: 28
			}
		};
		function EarLayer({ species }) {
			switch (species) {
				case "fox":
				case "wolf": return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("path", { d: "M8 18 L12 2 L23 12 Z" }), (0, react_jsx_runtime.jsx)("path", { d: "M40 18 L36 2 L25 12 Z" })] });
				case "cat": return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("path", { d: "M10 17 L11 4 L23 13 Z" }), (0, react_jsx_runtime.jsx)("path", { d: "M38 17 L37 4 L25 13 Z" })] });
				case "bear":
				case "panda": return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("circle", {
					cx: "11",
					cy: "12",
					r: "8"
				}), (0, react_jsx_runtime.jsx)("circle", {
					cx: "37",
					cy: "12",
					r: "8"
				})] });
				case "rabbit": return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("ellipse", {
					cx: "16",
					cy: "7",
					rx: "5",
					ry: "12"
				}), (0, react_jsx_runtime.jsx)("ellipse", {
					cx: "32",
					cy: "7",
					rx: "5",
					ry: "12"
				})] });
				case "owl": return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("path", { d: "M9 14 L14 4 L21 11 Z" }), (0, react_jsx_runtime.jsx)("path", { d: "M39 14 L34 4 L27 11 Z" })] });
				case "otter":
				case "hamster": return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("circle", {
					cx: "12",
					cy: "15",
					r: "6"
				}), (0, react_jsx_runtime.jsx)("circle", {
					cx: "36",
					cy: "15",
					r: "6"
				})] });
				case "deer": return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
					(0, react_jsx_runtime.jsx)("path", {
						d: "M15 12 L12 2 M12 6 L7 3 M33 12 L36 2 M36 6 L41 3",
						stroke: "currentColor",
						strokeWidth: "2.6",
						strokeLinecap: "round",
						fill: "none"
					}),
					(0, react_jsx_runtime.jsx)("ellipse", {
						cx: "11",
						cy: "17",
						rx: "4",
						ry: "6"
					}),
					(0, react_jsx_runtime.jsx)("ellipse", {
						cx: "37",
						cy: "17",
						rx: "4",
						ry: "6"
					})
				] });
				case "dog": return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("ellipse", {
					cx: "9",
					cy: "24",
					rx: "6",
					ry: "11"
				}), (0, react_jsx_runtime.jsx)("ellipse", {
					cx: "39",
					cy: "24",
					rx: "6",
					ry: "11"
				})] });
				case "mouse": return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("circle", {
					cx: "11",
					cy: "14",
					r: "10"
				}), (0, react_jsx_runtime.jsx)("circle", {
					cx: "37",
					cy: "14",
					r: "10"
				})] });
				case "tiger": return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("circle", {
					cx: "12",
					cy: "13",
					r: "7"
				}), (0, react_jsx_runtime.jsx)("circle", {
					cx: "36",
					cy: "13",
					r: "7"
				})] });
				case "koala": return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
					(0, react_jsx_runtime.jsx)("circle", {
						cx: "9",
						cy: "19",
						r: "10"
					}),
					(0, react_jsx_runtime.jsx)("circle", {
						cx: "39",
						cy: "19",
						r: "10"
					}),
					(0, react_jsx_runtime.jsx)("circle", {
						className: "avatarInner",
						cx: "9",
						cy: "19",
						r: "6"
					}),
					(0, react_jsx_runtime.jsx)("circle", {
						className: "avatarInner",
						cx: "39",
						cy: "19",
						r: "6"
					})
				] });
				case "pig": return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("path", { d: "M11 20 L10 8 L22 14 Z" }), (0, react_jsx_runtime.jsx)("path", { d: "M37 20 L38 8 L26 14 Z" })] });
				case "sheep": return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
					(0, react_jsx_runtime.jsx)("circle", {
						cx: "13",
						cy: "12",
						r: "7"
					}),
					(0, react_jsx_runtime.jsx)("circle", {
						cx: "35",
						cy: "12",
						r: "7"
					}),
					(0, react_jsx_runtime.jsx)("circle", {
						cx: "24",
						cy: "8",
						r: "8"
					}),
					(0, react_jsx_runtime.jsx)("ellipse", {
						cx: "8",
						cy: "21",
						rx: "4",
						ry: "6"
					}),
					(0, react_jsx_runtime.jsx)("ellipse", {
						cx: "40",
						cy: "21",
						rx: "4",
						ry: "6"
					})
				] });
				case "monkey": return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("circle", {
					cx: "8",
					cy: "26",
					r: "7"
				}), (0, react_jsx_runtime.jsx)("circle", {
					cx: "40",
					cy: "26",
					r: "7"
				})] });
				case "bat": return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("path", { d: "M6 16 L10 1 L24 13 Z" }), (0, react_jsx_runtime.jsx)("path", { d: "M42 16 L38 1 L24 13 Z" })] });
				case "raccoon": return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("path", { d: "M10 16 L13 4 L23 12 Z" }), (0, react_jsx_runtime.jsx)("path", { d: "M38 16 L35 4 L25 12 Z" })] });
				case "chick": return (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: (0, react_jsx_runtime.jsx)("path", { d: "M22 9 L24 1 L27 9 Z" }) });
				case "frog": return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("circle", {
					cx: "14",
					cy: "12",
					r: "8"
				}), (0, react_jsx_runtime.jsx)("circle", {
					cx: "34",
					cy: "12",
					r: "8"
				})] });
				case "seal":
				case "penguin":
				case "axolotl": return null;
				default: return null;
			}
		}
		/** Markings that sit on top of the face and define the species as much as the ears do. */
		function MarkLayer({ species }) {
			switch (species) {
				case "panda": return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("ellipse", {
					className: "avatarPatch",
					cx: "17",
					cy: "24",
					rx: "5.4",
					ry: "6.4"
				}), (0, react_jsx_runtime.jsx)("ellipse", {
					className: "avatarPatch",
					cx: "31",
					cy: "24",
					rx: "5.4",
					ry: "6.4"
				})] });
				case "raccoon": return (0, react_jsx_runtime.jsx)("path", {
					className: "avatarPatch",
					d: "M10 24 Q24 18 38 24 Q34 31 24 30 Q14 31 10 24 Z"
				});
				case "tiger": return (0, react_jsx_runtime.jsx)("path", {
					className: "avatarInk",
					d: "M18 13 L16 18 M24 12 L24 17 M30 13 L32 18",
					strokeWidth: "2.2",
					strokeLinecap: "round",
					fill: "none",
					stroke: "currentColor"
				});
				case "penguin": return (0, react_jsx_runtime.jsx)("ellipse", {
					className: "avatarPatch",
					cx: "24",
					cy: "29",
					rx: "12",
					ry: "13"
				});
				case "owl": return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("circle", {
					className: "avatarPatch",
					cx: "17",
					cy: "25",
					r: "7"
				}), (0, react_jsx_runtime.jsx)("circle", {
					className: "avatarPatch",
					cx: "31",
					cy: "25",
					r: "7"
				})] });
				case "dog": return (0, react_jsx_runtime.jsx)("ellipse", {
					className: "avatarPatch",
					cx: "24",
					cy: "33",
					rx: "9",
					ry: "7"
				});
				case "cat": return (0, react_jsx_runtime.jsx)("path", {
					className: "avatarInk",
					d: "M4 27 L13 28 M4 32 L13 31 M44 27 L35 28 M44 32 L35 31",
					strokeWidth: "1.6",
					strokeLinecap: "round",
					fill: "none",
					stroke: "currentColor"
				});
				case "axolotl": return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
					(0, react_jsx_runtime.jsx)("path", {
						d: "M6 20 L1 14 M6 26 L0 26 M42 20 L47 14 M42 26 L48 26",
						stroke: "currentColor",
						strokeWidth: "2.4",
						strokeLinecap: "round",
						fill: "none"
					}),
					(0, react_jsx_runtime.jsx)("circle", {
						className: "avatarPatch",
						cx: "15",
						cy: "32",
						r: "3"
					}),
					(0, react_jsx_runtime.jsx)("circle", {
						className: "avatarPatch",
						cx: "33",
						cy: "32",
						r: "3"
					})
				] });
				case "sheep": return (0, react_jsx_runtime.jsx)("ellipse", {
					className: "avatarPatch",
					cx: "24",
					cy: "31",
					rx: "10",
					ry: "8"
				});
				case "monkey": return (0, react_jsx_runtime.jsx)("ellipse", {
					className: "avatarPatch",
					cx: "24",
					cy: "30",
					rx: "11",
					ry: "10"
				});
				case "hamster": return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("circle", {
					className: "avatarPatch",
					cx: "12",
					cy: "31",
					r: "5"
				}), (0, react_jsx_runtime.jsx)("circle", {
					className: "avatarPatch",
					cx: "36",
					cy: "31",
					r: "5"
				})] });
				case "frog": return (0, react_jsx_runtime.jsx)("path", {
					className: "avatarInk",
					d: "M14 33 Q24 40 34 33",
					strokeWidth: "2.2",
					strokeLinecap: "round",
					fill: "none",
					stroke: "currentColor"
				});
				default: return null;
			}
		}
		const EYE_Y = 25;
		function Eyes({ variant, species }) {
			const y = species === "frog" ? 13 : EYE_Y;
			const [left, right] = species === "frog" ? [14, 34] : [17, 31];
			switch (variant) {
				case 0: return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("circle", {
					className: "avatarEye",
					cx: left,
					cy: y,
					r: "2.4"
				}), (0, react_jsx_runtime.jsx)("circle", {
					className: "avatarEye",
					cx: right,
					cy: y,
					r: "2.4"
				})] });
				case 1: return (0, react_jsx_runtime.jsx)("path", {
					className: "avatarEye",
					d: `M${left - 3} ${y + 1} Q${left} ${y - 3} ${left + 3} ${y + 1} M${right - 3} ${y + 1} Q${right} ${y - 3} ${right + 3} ${y + 1}`,
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round"
				});
				case 2: return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)("circle", {
					className: "avatarEye",
					cx: left,
					cy: y,
					r: "2.4"
				}), (0, react_jsx_runtime.jsx)("path", {
					className: "avatarEye",
					d: `M${right - 3} ${y} Q${right} ${y - 3} ${right + 3} ${y}`,
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round"
				})] });
				case 3: return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
					(0, react_jsx_runtime.jsx)("circle", {
						className: "avatarEye",
						cx: left,
						cy: y,
						r: "3.2"
					}),
					(0, react_jsx_runtime.jsx)("circle", {
						className: "avatarEye",
						cx: right,
						cy: y,
						r: "3.2"
					}),
					(0, react_jsx_runtime.jsx)("circle", {
						className: "avatarGlint",
						cx: left + 1.2,
						cy: y - 1.2,
						r: "1"
					}),
					(0, react_jsx_runtime.jsx)("circle", {
						className: "avatarGlint",
						cx: right + 1.2,
						cy: y - 1.2,
						r: "1"
					})
				] });
				case 4: return (0, react_jsx_runtime.jsx)("path", {
					className: "avatarEye",
					d: `M${left - 3} ${y} L${left + 3} ${y} M${right - 3} ${y} L${right + 3} ${y}`,
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					strokeLinecap: "round"
				});
				default: return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
					(0, react_jsx_runtime.jsx)("circle", {
						className: "avatarEye",
						cx: left,
						cy: y,
						r: "2.6"
					}),
					(0, react_jsx_runtime.jsx)("circle", {
						className: "avatarEye",
						cx: right,
						cy: y,
						r: "2.6"
					}),
					(0, react_jsx_runtime.jsx)("path", {
						className: "avatarGlint",
						d: `M${left + 2} ${y - 3} l1 1 -1 1 -1 -1 z M${right + 2} ${y - 3} l1 1 -1 1 -1 -1 z`
					})
				] });
			}
		}
		function Mouth({ variant, species }) {
			if (species === "chick" || species === "penguin" || species === "owl") return (0, react_jsx_runtime.jsx)("path", {
				className: "avatarBeak",
				d: "M20 30 L24 36 L28 30 Z"
			});
			if (species === "pig") return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
				(0, react_jsx_runtime.jsx)("ellipse", {
					className: "avatarNose",
					cx: "24",
					cy: "31",
					rx: "6",
					ry: "4.6"
				}),
				(0, react_jsx_runtime.jsx)("circle", {
					className: "avatarInk",
					cx: "22",
					cy: "31",
					r: "1"
				}),
				(0, react_jsx_runtime.jsx)("circle", {
					className: "avatarInk",
					cx: "26",
					cy: "31",
					r: "1"
				})
			] });
			const nose = (0, react_jsx_runtime.jsx)("circle", {
				className: "avatarNose",
				cx: "24",
				cy: "30",
				r: "2.2"
			});
			switch (variant) {
				case 0: return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [nose, (0, react_jsx_runtime.jsx)("path", {
					className: "avatarMuzzle",
					d: "M20 33 Q24 36.5 28 33"
				})] });
				case 1: return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [nose, (0, react_jsx_runtime.jsx)("path", {
					className: "avatarMuzzle",
					d: "M19 33 Q24 39 29 33"
				})] });
				case 2: return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [nose, (0, react_jsx_runtime.jsx)("path", {
					className: "avatarMuzzle",
					d: "M21 34 Q24 35.5 27 34"
				})] });
				case 3: return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [nose, (0, react_jsx_runtime.jsx)("ellipse", {
					className: "avatarInk",
					cx: "24",
					cy: "35",
					rx: "3.4",
					ry: "2.6"
				})] });
				default: return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [nose, (0, react_jsx_runtime.jsx)("path", {
					className: "avatarMuzzle",
					d: "M24 32 L24 34 M21 35 Q24 37.5 27 35"
				})] });
			}
		}
		function Accessory({ variant }) {
			switch (variant) {
				case 1: return (0, react_jsx_runtime.jsxs)("g", {
					className: "avatarGear",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.8",
					children: [
						(0, react_jsx_runtime.jsx)("circle", {
							cx: "17",
							cy: "25",
							r: "5"
						}),
						(0, react_jsx_runtime.jsx)("circle", {
							cx: "31",
							cy: "25",
							r: "5"
						}),
						(0, react_jsx_runtime.jsx)("path", { d: "M22 25 L26 25" })
					]
				});
				case 2: return (0, react_jsx_runtime.jsxs)("g", {
					className: "avatarGear",
					children: [
						(0, react_jsx_runtime.jsx)("path", {
							d: "M8 26 A16 16 0 0 1 40 26",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2.4"
						}),
						(0, react_jsx_runtime.jsx)("rect", {
							x: "4",
							y: "24",
							width: "7",
							height: "11",
							rx: "3.5"
						}),
						(0, react_jsx_runtime.jsx)("rect", {
							x: "37",
							y: "24",
							width: "7",
							height: "11",
							rx: "3.5"
						})
					]
				});
				case 3: return (0, react_jsx_runtime.jsx)("g", {
					className: "avatarGear",
					children: (0, react_jsx_runtime.jsx)("path", { d: "M9 39 Q24 46 39 39 L39 44 Q24 50 9 44 Z" })
				});
				case 4: return (0, react_jsx_runtime.jsxs)("g", {
					className: "avatarGear",
					children: [(0, react_jsx_runtime.jsx)("path", { d: "M7 15 Q24 -1 41 15 L41 18 L7 18 Z" }), (0, react_jsx_runtime.jsx)("rect", {
						x: "3",
						y: "16",
						width: "20",
						height: "4",
						rx: "2"
					})]
				});
				case 5: return (0, react_jsx_runtime.jsxs)("g", {
					className: "avatarGear",
					children: [
						(0, react_jsx_runtime.jsx)("circle", {
							cx: "38",
							cy: "11",
							r: "2.6"
						}),
						(0, react_jsx_runtime.jsx)("circle", {
							cx: "43",
							cy: "11",
							r: "2.6"
						}),
						(0, react_jsx_runtime.jsx)("circle", {
							cx: "40.5",
							cy: "7",
							r: "2.6"
						}),
						(0, react_jsx_runtime.jsx)("circle", {
							cx: "40.5",
							cy: "15",
							r: "2.6"
						}),
						(0, react_jsx_runtime.jsx)("circle", {
							className: "avatarGlint",
							cx: "40.5",
							cy: "11",
							r: "1.6"
						})
					]
				});
				case 6: return (0, react_jsx_runtime.jsxs)("g", {
					className: "avatarGear",
					children: [
						(0, react_jsx_runtime.jsx)("path", { d: "M17 42 L23 39 L23 45 Z" }),
						(0, react_jsx_runtime.jsx)("path", { d: "M31 42 L25 39 L25 45 Z" }),
						(0, react_jsx_runtime.jsx)("rect", {
							x: "22.4",
							y: "40.4",
							width: "3.2",
							height: "3.2",
							rx: "1"
						})
					]
				});
				case 7: return (0, react_jsx_runtime.jsxs)("g", {
					className: "avatarGear",
					children: [(0, react_jsx_runtime.jsx)("path", {
						d: "M24 8 L24 2",
						stroke: "currentColor",
						strokeWidth: "2",
						fill: "none"
					}), (0, react_jsx_runtime.jsx)("circle", {
						cx: "24",
						cy: "1.6",
						r: "2.4"
					})]
				});
				default: return null;
			}
		}
		/**
		* Draw one avatar.
		* @param props - identity, seed and presentation.
		* @returns the inline SVG portrait.
		*/
		function CartoonAvatar({ avatarId, seed, size = 40, title, className }) {
			const { species, palette } = resolve(avatarId);
			const colors = AVATAR_PALETTES[palette] ?? AVATAR_PALETTES[0];
			const head = HEADS[species] ?? {
				rx: 17,
				ry: 16,
				cy: 27
			};
			const faceSeed = seedOf(seed ?? avatarId);
			const eyes = pick(faceSeed, 0, 6);
			const mouth = pick(faceSeed, 1, 5);
			const accessory = pick(faceSeed, 2, 12) < 8 ? 0 : pick(faceSeed, 3, 7) + 1;
			return (0, react_jsx_runtime.jsx)("span", {
				className,
				title,
				style: {
					"--avatar-size": `${size}px`,
					"--avatar-bg": colors[0],
					"--avatar-main": colors[1],
					"--avatar-ink": colors[2]
				},
				"data-avatar-species": species,
				children: (0, react_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 48 48",
					"aria-hidden": "true",
					children: [
						(0, react_jsx_runtime.jsx)("g", {
							className: "avatarEars",
							children: (0, react_jsx_runtime.jsx)(EarLayer, { species })
						}),
						(0, react_jsx_runtime.jsx)("ellipse", {
							className: "avatarFace",
							cx: "24",
							cy: head.cy,
							rx: head.rx,
							ry: head.ry
						}),
						(0, react_jsx_runtime.jsx)(MarkLayer, { species }),
						(0, react_jsx_runtime.jsx)(Eyes, {
							variant: eyes,
							species
						}),
						(0, react_jsx_runtime.jsx)(Mouth, {
							variant: mouth,
							species
						}),
						(0, react_jsx_runtime.jsx)(Accessory, { variant: accessory })
					]
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
				avatarId: ANIMAL_AVATARS[(hash >>> 5) % ANIMAL_AVATARS.length] ?? "fox-0",
				originalName: contact.name,
				roleLabel: contact.source === "harness" ? "项目内 AI 同事" : contact.source === "workbuddy" ? "WorkBuddy 专家" : "社区 Skill 专家",
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
				const staleAvatar = current.customizedAvatar !== true && !ANIMAL_AVATARS.includes(current.avatarId);
				const refreshed = {
					...current,
					...staleAvatar ? { avatarId: generated.avatarId } : {},
					...current.customizedName ? {} : { displayName: generatedName },
					originalName: contact.name,
					bio: contact.description,
					capabilities: capabilityList(contact),
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
		const css$2 = ":root{--ds-chat-font:-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"PingFang SC\", \"Helvetica Neue\", system-ui, sans-serif;--ds-chat-font-mono:ui-monospace, SFMono-Regular, \"SF Mono\", Menlo, monospace;--ds-chat-text-caption:11px;--ds-chat-text-footnote:12px;--ds-chat-text-body:13px;--ds-chat-text-callout:14px;--ds-chat-text-title3:15px;--ds-chat-text-title2:17px;--ds-chat-text-title1:20px;--ds-chat-weight-regular:400;--ds-chat-weight-medium:500;--ds-chat-weight-semibold:600;--ds-chat-weight-bold:700;--ds-chat-leading-tight:1.25;--ds-chat-leading-normal:1.45;--ds-chat-leading-relaxed:1.6;--ds-chat-tracking-title:-.022em;--ds-chat-tracking-body:-.008em;--ds-chat-tracking-caption:0;--ds-chat-space-1:4px;--ds-chat-space-2:8px;--ds-chat-space-3:12px;--ds-chat-space-4:16px;--ds-chat-space-5:20px;--ds-chat-space-6:24px;--ds-chat-space-8:32px;--ds-chat-radius-xs:6px;--ds-chat-radius-sm:8px;--ds-chat-radius-control:10px;--ds-chat-radius-md:12px;--ds-chat-radius-lg:16px;--ds-chat-radius-xl:20px;--ds-chat-radius-round:999px;color-scheme:light;--ds-chat-hairline:.5px;--ds-chat-border:#0000001a;--ds-chat-border-strong:#0000001f;--ds-chat-surface:Canvas;--ds-chat-surface-raised:Canvas;--ds-chat-surface-sunken:var(--ds-chat-fill-quaternary);--ds-chat-fill-primary:#78788033;--ds-chat-fill-secondary:#78788024;--ds-chat-fill-tertiary:#7676801a;--ds-chat-fill-quaternary:#7474800f;--ds-chat-hover:#2631480f;--ds-chat-pressed:var(--ds-chat-fill-tertiary);--ds-chat-text-color:CanvasText;--ds-chat-text-secondary:color-mix(in srgb, CanvasText 68%, transparent);--ds-chat-muted:color-mix(in srgb, CanvasText 46%, transparent);--ds-chat-accent-solid:#12a05f;--ds-chat-accent-hover:#0e8a50;--ds-chat-accent-text:var(--ds-chat-accent-solid);--ds-chat-on-accent:#fff;--ds-chat-accent-soft:color-mix(in srgb, var(--ds-chat-accent-solid) 10%, transparent);--ds-chat-accent-soft-strong:color-mix(in srgb, var(--ds-chat-accent-solid) 16%, transparent);--ds-chat-accent-border:color-mix(in srgb, var(--ds-chat-accent-solid) 28%, transparent);--ds-chat-focus:color-mix(in srgb, var(--ds-chat-accent-solid) 70%, transparent);--ds-chat-accent:var(--ds-chat-accent-solid);--ds-chat-accent-faint:var(--ds-chat-accent-soft);--ds-chat-avatar-gradient:var(--ds-chat-accent-soft-strong);--ds-chat-row-hover:var(--ds-chat-hover);--ds-chat-row-selected:var(--ds-chat-accent-soft-strong);--ds-chat-user-bubble:var(--ds-chat-accent-solid);--ds-chat-shadow:var(--ds-chat-shadow-2);--ds-chat-accent-bright:#32d583;--ds-chat-code-bg:#0d1218;--ds-chat-code-bg-raised:#151b22;--ds-chat-code-fg:#d9e2ea;--ds-chat-code-muted:#8995a3;--ds-chat-code-border:#ffffff1f;--ds-chat-danger:#d0342c;--ds-chat-danger-soft:color-mix(in srgb, var(--ds-chat-danger) 10%, transparent);--ds-chat-warning:#b25000;--ds-chat-warning-soft:color-mix(in srgb, var(--ds-chat-warning) 12%, transparent);--ds-chat-info:#3b6fd4;--ds-chat-info-soft:color-mix(in srgb, var(--ds-chat-info) 12%, transparent);--ds-chat-shadow-1:0 1px 2px #0000000d;--ds-chat-shadow-2:0 4px 14px #00000014;--ds-chat-shadow-3:0 16px 40px #00000024;--ds-chat-scrim:#00000038;--ds-chat-ease:cubic-bezier(.32, .72, 0, 1);--ds-chat-duration-fast:.12s;--ds-chat-duration:.2s}body{--ds-chat-surface:var(--dsw-alias-bg-base);--ds-chat-surface-raised:var(--dsw-alias-bg-layer-2);--ds-chat-border:var(--dsw-alias-border-l2);--ds-chat-border-strong:var(--dsw-alias-border-l3);--ds-chat-hover:var(--dsw-alias-interactive-bg-hover);--ds-chat-text-color:var(--dsw-alias-label-primary);--ds-chat-text-secondary:var(--dsw-alias-label-secondary);--ds-chat-muted:var(--dsw-alias-label-tertiary)}body[data-ds-dark-theme]{color-scheme:dark;--ds-chat-hover:#ffffff14;--ds-chat-fill-primary:#8e8e9352;--ds-chat-fill-secondary:#8e8e933d;--ds-chat-fill-tertiary:#8e8e932e;--ds-chat-fill-quaternary:#8e8e931f;--ds-chat-accent-solid:#32d583;--ds-chat-accent-hover:#4ade9b;--ds-chat-on-accent:#06231a;--ds-chat-accent-soft:color-mix(in srgb, var(--ds-chat-accent-solid) 16%, transparent);--ds-chat-accent-soft-strong:color-mix(in srgb, var(--ds-chat-accent-solid) 24%, transparent);--ds-chat-danger:#ff6961;--ds-chat-warning:#ffb340;--ds-chat-info:#6ea8fe;--ds-chat-shadow-1:0 1px 2px #0000004d;--ds-chat-shadow-2:0 4px 14px #0006;--ds-chat-shadow-3:0 16px 40px #0000008c;--ds-chat-scrim:#00000080}[data-avatar-species] svg{width:92%;height:92%;overflow:visible}[data-avatar-species] .avatarEars{fill:color-mix(in srgb, var(--avatar-main) 78%, var(--avatar-ink));color:var(--avatar-ink)}[data-avatar-species] .avatarFace{fill:var(--avatar-main)}[data-avatar-species] .avatarInner{fill:color-mix(in srgb, var(--avatar-bg) 70%, var(--avatar-main))}[data-avatar-species] .avatarPatch{fill:var(--avatar-ink);opacity:.42}[data-avatar-species] .avatarInk{color:var(--avatar-ink);fill:var(--avatar-ink)}[data-avatar-species] .avatarEye{fill:var(--avatar-ink);color:var(--avatar-ink)}[data-avatar-species] .avatarGlint{fill:var(--avatar-bg)}[data-avatar-species] .avatarNose{fill:var(--avatar-ink)}[data-avatar-species] .avatarBeak{fill:#f0a63c}[data-avatar-species] .avatarMuzzle{fill:none;stroke:var(--avatar-ink);stroke-width:1.8px;stroke-linecap:round}[data-avatar-species] .avatarGear{fill:var(--avatar-ink);color:var(--avatar-ink)}[data-chat-flow-kind=assistant-step],[data-chat-flow-kind=tool-call]{padding-left:var(--ds-chat-space-3);border-left:2px solid var(--ds-chat-accent-border);background:var(--ds-chat-accent-soft);font-size:var(--ds-chat-text-footnote);margin-left:34px;position:relative}[data-chat-flow-kind=assistant-step]+[data-chat-flow-kind=assistant-step],[data-chat-flow-kind=assistant-step]+[data-chat-flow-kind=tool-call],[data-chat-flow-kind=tool-call]+[data-chat-flow-kind=tool-call],[data-chat-flow-kind=tool-call]+[data-chat-flow-kind=assistant-step]{margin-top:0}[data-chat-flow-kind=assistant-step]>*,[data-chat-flow-kind=tool-call]>*{opacity:.62}[data-chat-flow-kind=assistant-step]:hover>*,[data-chat-flow-kind=tool-call]:hover>*,[data-chat-flow-kind=assistant-step]:focus-within>*,[data-chat-flow-kind=tool-call]:focus-within>*{opacity:1}[data-chat-flow-kind=user]+[data-chat-flow-kind=assistant-step],[data-chat-flow-kind=user]+[data-chat-flow-kind=tool-call]{margin-top:var(--ds-chat-space-2);border-top-left-radius:var(--ds-chat-radius-sm)}[data-chat-flow-kind=user]{margin-block:var(--ds-chat-space-3)}@media (prefers-reduced-motion:reduce){[data-chat-flow-kind=assistant-step]>*,[data-chat-flow-kind=tool-call]>*{transition:none}}";
		const tagId$2 = "deepseek-harness-chat-ui/theme.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "deepseek-harness-chat-ui";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region \0dsh-css:/Users/lileilei/workspace/deepseek-harness/packages/experimental/client-ui-skill-chat/src/client/SkillContactsBrowser.module.css.mjs
		const css$1 = ".GlbDda_root{height:100%;min-height:0;color:var(--ds-chat-text-color);flex-direction:column;display:flex}.GlbDda_dsChatBrand{color:var(--ds-chat-text-color);font-size:var(--ds-chat-text-title2);font-weight:var(--ds-chat-weight-bold);letter-spacing:-.02em}.GlbDda_workspaceIcon{color:var(--ds-chat-accent-solid);font-size:var(--ds-chat-text-title3);place-items:center;display:grid}.GlbDda_rail{flex-direction:column;align-items:center;gap:10px;height:100%;padding-top:10px;display:flex}.GlbDda_railButton{width:36px;height:36px;color:var(--ds-chat-text-secondary);cursor:pointer;font:inherit;background:0 0;border:0;border-radius:12px}.GlbDda_railButton:hover{background:var(--ds-chat-hover);color:var(--ds-chat-text-color)}.GlbDda_tabs{background:var(--ds-chat-fill-quaternary);border-radius:12px;grid-template-columns:repeat(3,1fr);gap:4px;margin:4px 12px 10px;padding:4px;display:grid}.GlbDda_groupAvatar{aspect-ratio:1;border-radius:50%;flex:none;width:46px;min-width:46px;max-width:46px;height:46px;min-height:46px;max-height:46px;position:relative}.GlbDda_groupAvatar[data-small=true]{width:32px;min-width:32px;max-width:32px;height:32px;min-height:32px;max-height:32px}.GlbDda_groupAvatar .GlbDda_animalAvatar{width:100%;height:100%}.GlbDda_roomAvatarStack{background:var(--ds-chat-fill-quaternary);width:46px;height:46px;box-shadow:var(--ds-chat-shadow-2);border-radius:50%;flex:none;justify-content:center;align-items:center;padding:2px;display:flex}.GlbDda_roomAvatarStack>*{margin-left:-10px}.GlbDda_roomAvatarStack>:first-child{margin-left:0}.GlbDda_roomAvatarStackCompact{width:32px;height:32px;padding:1px}.GlbDda_roomAvatarStackCompact>*{margin-left:-7px}.GlbDda_groupMark{box-sizing:border-box;border:2px solid var(--ds-chat-surface);width:18px;min-width:18px;height:18px;color:var(--ds-chat-on-accent);background:var(--ds-chat-info);box-shadow:0 2px 6px var(--ds-chat-info-soft);letter-spacing:-1px;border-radius:999px;place-items:center;padding:0;font-size:5px;display:grid;position:absolute;bottom:-1px;right:-2px}.GlbDda_avatarStatusWrap{place-items:center;width:54px;display:grid;position:relative}.GlbDda_unreadBadge{box-sizing:border-box;border:2px solid var(--ds-chat-surface);min-width:18px;height:18px;color:var(--ds-chat-on-accent);background:var(--ds-chat-danger);box-shadow:0 2px 7px color-mix(in srgb, var(--ds-chat-danger) 30%, transparent);font-size:var(--ds-chat-text-caption);font-weight:var(--ds-chat-weight-bold);border-radius:999px;place-items:center;padding:0 5px;display:grid;position:absolute;top:-4px;right:-2px}.GlbDda_roomRow{border:var(--ds-chat-hairline) solid transparent;width:100%;min-height:62px;color:inherit;text-align:left;cursor:pointer;font:inherit;background:0 0;border-radius:17px;grid-template-columns:54px minmax(0,1fr) auto;align-items:center;gap:10px;margin:3px 0;padding:8px 10px;transition:transform .12s,background .12s,box-shadow .12s;display:grid}.GlbDda_roomRow:hover{background:var(--ds-chat-hover);box-shadow:none;border-color:#0000}.GlbDda_roomRow:active{box-shadow:var(--ds-chat-shadow-2)}.GlbDda_roomRow[data-current=true]{border-color:var(--ds-chat-accent-border,color-mix(in srgb, var(--ds-chat-accent-solid) 28%, transparent));background:var(--ds-chat-accent-soft);box-shadow:0 8px 20px color-mix(in srgb, var(--ds-chat-accent-solid) 10%, transparent), inset 3px 0 var(--ds-chat-accent-solid)}.GlbDda_sectionHeading{justify-content:space-between;align-items:center;gap:12px;padding:4px 14px 9px;display:flex}.GlbDda_sectionHeading>div{gap:2px;min-width:0;display:grid}.GlbDda_sectionHeading strong{font-size:var(--ds-chat-text-body)}.GlbDda_sectionHeading small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_sectionHeading>button{border:var(--ds-chat-hairline) solid var(--ds-chat-border);color:var(--ds-chat-text-secondary);background:var(--ds-chat-fill-quaternary);cursor:pointer;font:inherit;font-size:var(--ds-chat-text-caption);border-radius:10px;padding:6px 9px;box-shadow:0 2px 6px #0000000f}.GlbDda_emptyCard{border:1px dashed color-mix(in srgb, var(--ds-chat-border-strong) 80%, transparent);color:var(--ds-chat-muted);background:var(--ds-chat-fill-quaternary);text-align:center;font-size:var(--ds-chat-text-footnote);border-radius:18px;margin:8px;padding:24px 18px;line-height:1.6}.GlbDda_headerTools{align-items:center;gap:5px;min-width:0;display:flex}.GlbDda_blankRoomDock{z-index:24;box-sizing:border-box;border:var(--ds-chat-hairline) solid var(--ds-chat-border);background:var(--ds-chat-surface);min-height:40px;box-shadow:var(--ds-chat-shadow-2);border-radius:14px;justify-content:flex-end;align-items:center;padding:4px 8px;display:flex;position:fixed;top:10px;left:min(318px,30vw);right:18px}.GlbDda_headerDivider{background:var(--ds-chat-border-strong);width:1px;height:20px}.GlbDda_headerIconButton,.GlbDda_headerTextButton,.GlbDda_headerNewButton{border:var(--ds-chat-hairline) solid var(--ds-chat-border);height:30px;color:var(--ds-chat-text-secondary);background:var(--ds-chat-fill-quaternary);box-shadow:var(--ds-chat-shadow-1);cursor:pointer;font:inherit;font-size:var(--ds-chat-text-caption);border-radius:10px;place-items:center;display:inline-grid}.GlbDda_headerIconButton{width:30px;padding:0}.GlbDda_headerTextButton{padding:0 9px}.GlbDda_headerNewButton{border-color:var(--ds-chat-accent-solid);color:var(--ds-chat-on-accent);background:var(--ds-chat-accent,var(--ds-chat-accent-solid));padding:0 11px}.GlbDda_headerIconButton:hover,.GlbDda_headerTextButton:hover{color:var(--ds-chat-text-color)}.GlbDda_headerNewButton:hover{box-shadow:0 5px 12px var(--ds-chat-accent-soft)}.GlbDda_headerIconButton:active,.GlbDda_headerTextButton:active,.GlbDda_headerNewButton:active{box-shadow:inset 0 2px 4px #0000001f}.GlbDda_headerMenuWrap{position:relative}.GlbDda_headerHistoryMenu{z-index:40;border:var(--ds-chat-hairline) solid var(--ds-chat-border);background-color:canvas;background-image:linear-gradient(var(--ds-chat-surface), var(--ds-chat-surface));width:min(320px,70vw);max-height:340px;box-shadow:var(--ds-chat-shadow-3);border-radius:16px;padding:7px;position:absolute;top:calc(100% + 7px);right:0;overflow-y:auto}.GlbDda_headerHistoryMenu button{width:100%;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:11px;gap:3px;padding:9px 10px;display:grid}.GlbDda_headerHistoryMenu button:hover,.GlbDda_headerHistoryMenu button[data-active=true]{background:var(--ds-chat-hover)}.GlbDda_headerHistoryMenu small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_avatarLibrary{background:var(--ds-chat-fill-quaternary);border-radius:16px;grid-template-columns:repeat(6,1fr);gap:8px;max-height:230px;margin:12px 0;padding:10px;display:grid;overflow-y:auto}.GlbDda_avatarLibrary button{cursor:pointer;background:0 0;border:2px solid #0000;border-radius:50%;place-items:center;padding:3px;display:grid}.GlbDda_avatarLibrary button[data-selected=true]{border-color:var(--ds-chat-accent-solid);background:var(--ds-chat-row-selected)}.GlbDda_field{color:var(--ds-chat-text-secondary);font-size:var(--ds-chat-text-caption);gap:6px;margin:12px 0;display:grid}.GlbDda_field input,.GlbDda_field textarea,.GlbDda_field select{box-sizing:border-box;border:var(--ds-chat-hairline) solid var(--ds-chat-border);width:100%;color:var(--ds-chat-text-color);background:var(--ds-chat-surface);font:inherit;border-radius:12px;outline:none;padding:10px 12px}.GlbDda_field textarea{resize:vertical;min-height:110px}.GlbDda_field input:focus,.GlbDda_field textarea:focus,.GlbDda_field select:focus{border-color:var(--ds-chat-accent-solid);box-shadow:0 0 0 3px color-mix(in srgb, var(--ds-chat-accent-solid) 12%, transparent)}.GlbDda_scheduleChoice{background:var(--ds-chat-fill-quaternary);border-radius:12px;grid-template-columns:1fr 1fr;gap:6px;padding:4px;display:grid}.GlbDda_scheduleChoice button{color:var(--ds-chat-text-secondary);cursor:pointer;font:inherit;background:0 0;border:0;border-radius:9px;padding:8px}.GlbDda_scheduleChoice button[data-active=true]{color:var(--ds-chat-accent-text);background:var(--ds-chat-surface);box-shadow:0 3px 10px var(--ds-chat-accent-soft)}.GlbDda_repeatFields{grid-template-columns:1fr 1fr;gap:10px;display:grid}.GlbDda_originCard,.GlbDda_automationSummary{border:var(--ds-chat-hairline) solid var(--ds-chat-border);background:var(--ds-chat-fill-quaternary);border-radius:14px;gap:3px;margin:14px 0;padding:12px;display:grid}.GlbDda_originCard span,.GlbDda_automationSummary span,.GlbDda_originCard small,.GlbDda_automationSummary small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_automationCard{border:var(--ds-chat-hairline) solid var(--ds-chat-border);background:var(--ds-chat-fill-quaternary);box-shadow:var(--ds-chat-shadow-1);border-radius:17px;gap:10px;margin:7px 4px;padding:14px;display:grid}.GlbDda_automationCard>div{gap:3px;display:grid}.GlbDda_automationCard small,.GlbDda_automationCard p{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_automationCard p{margin:0;line-height:1.45}.GlbDda_automationCard footer{align-items:center;gap:6px;display:flex}.GlbDda_automationCard footer span{color:var(--ds-chat-accent-text);font-size:var(--ds-chat-text-caption);margin-right:auto}.GlbDda_automationCard footer button{border:var(--ds-chat-hairline) solid var(--ds-chat-border);color:var(--ds-chat-text-secondary);background:var(--ds-chat-surface);cursor:pointer;font:inherit;font-size:var(--ds-chat-text-caption);border-radius:9px;padding:6px 8px}.GlbDda_automationDialog{box-sizing:border-box;overscroll-behavior:contain;border:var(--ds-chat-hairline) solid var(--ds-chat-border);border-radius:var(--ds-chat-radius-xl);background-color:canvas;background-image:linear-gradient(var(--ds-chat-surface), var(--ds-chat-surface));width:min(520px,100vw - 32px);max-height:min(720px,100vh - 40px);box-shadow:var(--ds-chat-shadow-3);padding:22px;overflow-y:auto}.GlbDda_automationDialog .GlbDda_groupHeader{padding:20px 22px 12px}.GlbDda_automationDialog .GlbDda_field{margin:8px 0}.GlbDda_automationDialog .GlbDda_field textarea{min-height:88px}.GlbDda_automationDialog .GlbDda_groupFooter{padding:12px 0 0}.GlbDda_roomMemberGrid{gap:7px;max-height:390px;margin:12px 0;display:grid;overflow-y:auto}.GlbDda_roomMemberItem{border:var(--ds-chat-hairline) solid transparent;background:var(--ds-chat-fill-quaternary);opacity:.72;border-radius:14px;align-items:center;gap:8px;padding:7px;display:flex}.GlbDda_roomMemberItem[data-included=true]{border-color:var(--ds-chat-accent-border,color-mix(in srgb, var(--ds-chat-accent-solid) 28%, transparent));background:color-mix(in srgb, var(--ds-chat-accent-soft) 55%, var(--ds-chat-surface));opacity:1}.GlbDda_memberPersona{min-width:0;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;flex:1;align-items:center;gap:9px;display:flex}.GlbDda_memberPersona>span:last-child{gap:2px;min-width:0;display:grid}.GlbDda_memberPersona small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_memberToggle{border:var(--ds-chat-hairline) solid var(--ds-chat-border);width:30px;height:30px;color:var(--ds-chat-text-secondary);background:var(--ds-chat-surface);cursor:pointer;border-radius:10px}.GlbDda_marketAvatar{width:38px;height:38px;color:var(--ds-chat-accent-text);background:var(--ds-chat-info-soft);box-shadow:inset 0 1px 0 white, 0 4px 10px var(--ds-chat-info-soft);border-radius:50%;place-items:center;display:grid}@media (prefers-reduced-motion:reduce){.GlbDda_roomRow{transition:none}}.GlbDda_tab{height:32px;color:var(--ds-chat-text-secondary);cursor:pointer;font:inherit;font-size:var(--ds-chat-text-body);background:0 0;border:0;border-radius:9px}.GlbDda_tab[data-active=true]{color:var(--ds-chat-text-color);background:var(--ds-chat-surface);box-shadow:0 1px 4px #00000014}.GlbDda_search{box-sizing:border-box;border:var(--ds-chat-hairline) solid transparent;width:100%;height:36px;color:var(--ds-chat-text-color);background:var(--ds-chat-fill-quaternary);font:inherit;font-size:var(--ds-chat-text-body);border-radius:12px;outline:none;padding:0 12px}.GlbDda_search:focus{border-color:color-mix(in srgb, var(--ds-chat-accent-solid) 55%, transparent);background:var(--ds-chat-surface)}.GlbDda_list{content-visibility:auto;min-height:0;padding:0 8px 16px;overflow-y:auto}.GlbDda_row{width:100%;color:inherit;text-align:left;cursor:pointer;font:inherit;background:0 0;border:0;border-radius:14px;grid-template-columns:42px minmax(0,1fr) auto;align-items:center;gap:10px;padding:9px 8px;display:grid}.GlbDda_row:hover,.GlbDda_row[data-current=true]{background:var(--ds-chat-hover)}.GlbDda_row[data-current=true]{box-shadow:inset 2px 0 var(--ds-chat-accent-solid)}.GlbDda_avatar{width:38px;height:38px;color:var(--ds-chat-accent-text);background:var(--contact-color,var(--ds-chat-accent-soft-strong));box-shadow:inset 0 0 0 var(--ds-chat-hairline) #00000014;font-size:var(--ds-chat-text-body);font-weight:var(--ds-chat-weight-bold);letter-spacing:-.03em;border-radius:50%;place-items:center;display:grid}.GlbDda_copy{min-width:0}.GlbDda_name,.GlbDda_description{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.GlbDda_name{font-size:var(--ds-chat-text-callout);font-weight:var(--ds-chat-weight-semibold)}.GlbDda_nameLine{align-items:center;gap:7px;min-width:0;display:flex}.GlbDda_source{color:var(--ds-chat-muted);background:var(--ds-chat-fill-quaternary);font-size:var(--ds-chat-text-caption);font-weight:var(--ds-chat-weight-semibold);border-radius:999px;flex:none;padding:2px 6px}.GlbDda_source[data-source=workbuddy]{color:var(--ds-chat-warning);background:var(--ds-chat-warning-soft)}.GlbDda_description{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-footnote);margin-top:3px}.GlbDda_time{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);align-self:start;padding-top:3px}.GlbDda_status{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-body);text-align:center;padding:18px 14px}.GlbDda_backdrop{z-index:1000;background:var(--ds-chat-scrim);backdrop-filter:blur(3px);justify-content:flex-end;display:flex;position:fixed;inset:0}.GlbDda_panel{box-sizing:border-box;width:min(380px,100vw - 24px);height:100%;color:var(--ds-chat-text-color);background:var(--ds-chat-surface);padding:24px;overflow-y:auto;box-shadow:-18px 0 50px #0000001f}.GlbDda_panelTop{justify-content:space-between;align-items:center;gap:16px;display:flex}.GlbDda_close{width:32px;height:32px;color:var(--ds-chat-text-secondary);background:var(--ds-chat-fill-quaternary);cursor:pointer;border:0;border-radius:10px}.GlbDda_panelTitle{letter-spacing:-.03em;margin:18px 0 4px;font-size:22px}.GlbDda_primary{width:100%;height:42px;color:var(--ds-chat-on-accent);background:var(--ds-chat-accent-solid);cursor:pointer;font:inherit;font-weight:var(--ds-chat-weight-semibold);border:0;border-radius:13px;margin-top:28px}.GlbDda_primary:hover{background:var(--ds-chat-accent-solid)}.GlbDda_primary:disabled{color:var(--ds-chat-muted);background:var(--ds-chat-fill-quaternary);cursor:not-allowed}.GlbDda_topbar{align-items:center;gap:6px;padding-right:10px;display:flex}.GlbDda_topbar .GlbDda_tabs{flex:1;grid-template-columns:repeat(3,minmax(0,1fr))}.GlbDda_addGroup{width:34px;height:34px;color:var(--ds-chat-text-color);cursor:pointer;background:0 0;border:0;border-radius:10px;font-size:24px;line-height:1}.GlbDda_addGroup:hover{background:var(--ds-chat-hover)}.GlbDda_groupBackdrop{z-index:1100;background:var(--ds-chat-scrim);backdrop-filter:blur(5px);place-items:center;padding:24px;display:grid;position:fixed;inset:0}.GlbDda_groupDialog{box-sizing:border-box;overscroll-behavior:contain;border:var(--ds-chat-hairline) solid var(--ds-chat-border);width:min(860px,100vw - 48px);max-height:min(720px,100vh - 48px);color:var(--ds-chat-text-color);background-color:canvas;background-image:linear-gradient(var(--ds-chat-surface), var(--ds-chat-surface));border-radius:24px;flex-direction:column;display:flex;overflow:hidden;box-shadow:0 28px 90px #00000038}.GlbDda_groupFormGrid{grid-template-columns:minmax(0,1fr) minmax(0,1.45fr);gap:0 16px;padding:0 28px;display:grid}.GlbDda_groupFormGrid .GlbDda_generatePrompt{grid-column:2;justify-self:end;margin-top:-6px}.GlbDda_groupIdentityEditor{align-items:center;gap:12px;padding:4px 0 8px;display:flex}.GlbDda_groupIdentityEditor>div{gap:2px;display:grid}.GlbDda_groupIdentityEditor strong{font-size:var(--ds-chat-text-body)}.GlbDda_groupIdentityEditor small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_groupAvatarLibrary{gap:7px;padding:4px 2px 10px;display:flex;overflow-x:auto}.GlbDda_groupAvatarLibrary button{box-sizing:border-box;cursor:pointer;background:0 0;border:2px solid #0000;border-radius:50%;flex:0 0 40px;place-items:center;width:40px;height:40px;padding:3px;display:grid}.GlbDda_groupAvatarLibrary button[data-selected=true]{border-color:var(--ds-chat-info);background:color-mix(in srgb, var(--ds-chat-info) 10%, transparent)}.GlbDda_workspaceBindings{border:var(--ds-chat-hairline) solid var(--ds-chat-border);background:color-mix(in srgb, var(--ds-chat-fill-quaternary) 72%, transparent);border-radius:16px;grid-column:1/-1;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin-top:12px;padding:12px;display:grid}.GlbDda_bindingHeader{grid-column:1/-1;justify-content:space-between;align-items:center;gap:12px;margin-bottom:2px;display:flex}.GlbDda_bindingHeader>span{gap:2px;min-width:0;display:grid}.GlbDda_bindingHeader strong{font-size:var(--ds-chat-text-footnote)}.GlbDda_bindingHeader small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_bindingHeader button{color:var(--ds-chat-accent-solid);cursor:pointer;font:inherit;font-size:var(--ds-chat-text-caption);background:0 0;border:0}.GlbDda_workspaceBindings>button:not(.GlbDda_bindingHeader){border:var(--ds-chat-hairline) solid var(--ds-chat-border);min-width:0;color:inherit;background:var(--ds-chat-surface);text-align:left;cursor:pointer;font:inherit;border-radius:12px;grid-template-columns:24px minmax(0,1fr) 20px;align-items:center;gap:8px;padding:9px;display:grid}.GlbDda_workspaceBindings>button[data-selected=true]{border-color:var(--ds-chat-accent-border);background:var(--ds-chat-accent-soft)}.GlbDda_workspaceBindings>button>span{gap:2px;min-width:0;display:grid}.GlbDda_workspaceBindings>button strong,.GlbDda_workspaceBindings>button small{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.GlbDda_workspaceBindings>button strong{font-size:var(--ds-chat-text-caption)}.GlbDda_workspaceBindings>button small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_workspaceBindings>button b{color:var(--ds-chat-accent-solid);text-align:center}.GlbDda_generatePrompt{border:1px solid var(--ds-chat-accent-border);min-height:32px;color:var(--ds-chat-accent-text);background:var(--ds-chat-accent-soft);cursor:pointer;font:inherit;font-size:var(--ds-chat-text-caption);font-weight:var(--ds-chat-weight-semibold);border-radius:10px;padding:0 11px}.GlbDda_generatePrompt:disabled{opacity:.45;cursor:not-allowed}.GlbDda_memberToolbar{align-items:center;gap:14px;padding:16px 28px 10px;display:flex}.GlbDda_memberToolbar>div{gap:2px;min-width:0;display:grid}.GlbDda_memberToolbar strong{font-size:var(--ds-chat-text-body)}.GlbDda_memberToolbar small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_memberToolbar input{border:var(--ds-chat-hairline) solid var(--ds-chat-border);min-width:180px;height:36px;color:inherit;background:var(--ds-chat-fill-quaternary);font:inherit;font-size:var(--ds-chat-text-caption);border-radius:11px;outline:none;margin-left:auto;padding:0 12px}.GlbDda_memberToolbar input:focus{border-color:var(--ds-chat-accent-solid);box-shadow:0 0 0 3px var(--ds-chat-accent-soft)}.GlbDda_groupHeader{justify-content:space-between;padding:26px 28px 18px;display:flex}.GlbDda_groupHeader h2{margin:0;font-size:22px}.GlbDda_groupHeader p{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-body);margin:8px 0 0}.GlbDda_groupCandidates,.GlbDda_groupSelected{min-height:0;padding:4px 28px 16px;overflow-y:auto}.GlbDda_pickRow{border:var(--ds-chat-hairline) solid transparent;width:100%;color:inherit;text-align:left;cursor:pointer;background:0 0;border-radius:14px;grid-template-columns:38px minmax(0,1fr) 34px;align-items:center;gap:10px;margin-bottom:6px;padding:9px;display:grid}.GlbDda_pickRow:hover{background:var(--ds-chat-hover)}.GlbDda_pickRow[data-included=true]{border-color:var(--ds-chat-accent-border);background:var(--ds-chat-accent-soft)}.GlbDda_pickRow>b{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-title1);text-align:center;font-weight:400}.GlbDda_pickRow[data-disabled=true]{opacity:.52;cursor:not-allowed}.GlbDda_pickCopy{gap:2px;min-width:0;display:grid}.GlbDda_pickCopy strong,.GlbDda_pickCopy small{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.GlbDda_pickCopy strong{font-size:var(--ds-chat-text-body)}.GlbDda_pickCopy small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_groupFooter{justify-content:flex-end;gap:10px;padding:20px 28px 24px;display:flex}.GlbDda_secondary,.GlbDda_create{min-width:86px;height:38px;font:inherit;font-weight:var(--ds-chat-weight-semibold);cursor:pointer;border:0;border-radius:12px}.GlbDda_secondary{color:var(--ds-chat-text-secondary);background:0 0}.GlbDda_create{color:var(--ds-chat-on-accent);background:var(--ds-chat-accent-solid)}.GlbDda_create:disabled{opacity:.42;cursor:not-allowed}.GlbDda_marketResult{border:1px dashed var(--ds-chat-accent-border);background:color-mix(in srgb, var(--ds-chat-fill-quaternary) 74%, transparent);border-radius:14px;grid-template-columns:38px minmax(0,1fr) auto;align-items:center;gap:10px;margin-bottom:6px;padding:9px;display:grid}.GlbDda_marketResult .GlbDda_copy{gap:2px;min-width:0;display:grid}.GlbDda_marketResult strong,.GlbDda_marketResult small{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.GlbDda_marketResult strong{font-size:var(--ds-chat-text-footnote)}.GlbDda_marketResult small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_marketActions{gap:6px;display:flex}.GlbDda_marketActions button{border:var(--ds-chat-hairline) solid var(--ds-chat-border);height:30px;color:var(--ds-chat-text-secondary);background:var(--ds-chat-surface);cursor:pointer;font:inherit;font-size:var(--ds-chat-text-caption);border-radius:9px;padding:0 9px}.GlbDda_marketActions .GlbDda_installJoin{color:var(--ds-chat-on-accent);border-color:var(--ds-chat-accent-solid);background:var(--ds-chat-accent-solid)}.GlbDda_marketActions button:disabled{opacity:.5;cursor:default}.GlbDda_hoverProfile{gap:7px;max-width:300px;line-height:1.45;display:grid}.GlbDda_hoverProfile strong{color:var(--ds-chat-on-accent);font-size:var(--ds-chat-text-body)}.GlbDda_hoverProfile span{color:var(--ds-chat-code-fg);font-size:var(--ds-chat-text-caption)}.GlbDda_hoverProfile small{color:var(--ds-chat-code-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_hoverProfile a{color:var(--ds-chat-accent-bright);font-size:var(--ds-chat-text-caption);text-decoration:none}.GlbDda_projectPanelIcon{width:44px;height:44px;color:var(--ds-chat-accent-solid);background:var(--ds-chat-row-selected);border-radius:15px;place-items:center;display:grid}.GlbDda_projectFileList{gap:5px;margin-top:18px;display:grid}.GlbDda_projectFileList button{color:inherit;text-align:left;cursor:pointer;font:inherit;font-size:var(--ds-chat-text-footnote);background:0 0;border:0;border-radius:11px;grid-template-columns:22px minmax(0,1fr);align-items:center;gap:8px;padding:10px;display:grid}.GlbDda_projectFileList button:hover{background:var(--ds-chat-hover)}.GlbDda_headerTools{z-index:12;box-sizing:border-box;border:var(--ds-chat-hairline) solid var(--ds-chat-border);background-color:canvas;background-image:linear-gradient(var(--ds-chat-surface), var(--ds-chat-surface));width:max-content;max-width:calc(100% - 120px);min-height:48px;box-shadow:var(--ds-chat-shadow-2);border-radius:18px;justify-content:space-between;align-items:center;gap:14px;padding:5px 8px 5px 12px;display:flex;position:absolute;top:8px;left:auto;right:12px}.GlbDda_headerIdentity,.GlbDda_headerActionsCluster{align-items:center;min-width:0;display:flex}.GlbDda_headerIdentity{display:none}.GlbDda_headerActionsCluster{flex:none;gap:6px}.GlbDda_headerAvatarStack{align-items:center;min-width:42px;padding-left:3px;display:flex}.GlbDda_headerAvatarStack>span{margin-left:-8px;display:inline-flex}.GlbDda_headerAvatarStack>span:first-child{margin-left:0}.GlbDda_headerAvatarStack .GlbDda_animalAvatar{width:34px;height:34px;box-shadow:var(--ds-chat-shadow-2)}.GlbDda_headerIdentityCopy{gap:2px;min-width:0;display:grid}.GlbDda_headerIdentityCopy strong{color:var(--ds-chat-text-color);font-size:var(--ds-chat-text-callout);font-weight:var(--ds-chat-weight-bold);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.GlbDda_headerIdentityCopy small{max-width:260px;color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.GlbDda_workbenchDrawer,.GlbDda_sidecarDrawer{box-sizing:border-box;border-left:var(--ds-chat-hairline) solid var(--ds-chat-border);background-color:canvas;background-image:linear-gradient(var(--ds-chat-surface), var(--ds-chat-surface));width:min(760px,100vw - 84px);height:100%;box-shadow:var(--ds-chat-shadow-2);flex-direction:column;display:flex}.GlbDda_workbenchHeader,.GlbDda_sidecarHeader{border-bottom:var(--ds-chat-hairline) solid var(--ds-chat-border);grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:12px;min-height:66px;padding:10px 14px;display:grid}.GlbDda_workbenchHeader>span:nth-child(2),.GlbDda_sidecarHeader>span:first-child{gap:2px;min-width:0;display:grid}.GlbDda_workbenchHeader strong,.GlbDda_sidecarHeader strong{font-size:var(--ds-chat-text-callout)}.GlbDda_workbenchHeader small,.GlbDda_sidecarHeader small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.GlbDda_fileWorkbench{flex:1;grid-template-columns:minmax(210px,34%) minmax(0,1fr);min-height:0;display:grid}.GlbDda_fileBrowser{border-right:var(--ds-chat-hairline) solid var(--ds-chat-border);background:var(--ds-chat-fill-quaternary);min-width:0;padding:12px;overflow:auto}.GlbDda_pathBar{color:var(--ds-chat-muted);background:var(--ds-chat-surface);text-overflow:ellipsis;white-space:nowrap;border-radius:10px;margin-bottom:10px;padding:8px 10px;font:11px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;overflow:hidden}.GlbDda_projectFileList{margin-top:0}.GlbDda_projectFileList button[data-selected=true]{color:var(--ds-chat-accent-text);background:var(--ds-chat-accent-soft)}.GlbDda_filePreview{background:var(--ds-chat-code-bg);min-width:0;color:var(--ds-chat-code-fg);flex-direction:column;display:flex;overflow:auto}.GlbDda_filePreviewMeta{border-bottom:var(--ds-chat-hairline) solid var(--ds-chat-code-border);background:var(--ds-chat-code-bg-raised);justify-content:space-between;align-items:center;gap:12px;padding:11px 14px;display:flex}.GlbDda_filePreviewMeta strong{font-size:var(--ds-chat-text-footnote);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.GlbDda_filePreviewMeta small{color:var(--ds-chat-code-muted);font-size:var(--ds-chat-text-caption);flex:none}.GlbDda_filePreview pre,.GlbDda_terminalOutput{white-space:pre-wrap;overflow-wrap:anywhere;flex:1;margin:0;padding:16px;font:12px/1.65 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;overflow:auto}.GlbDda_drawerEmpty{color:var(--ds-chat-code-muted);font-size:var(--ds-chat-text-footnote);text-align:center;flex:1;place-items:center;padding:24px;display:grid}.GlbDda_terminalWorkbench{background:var(--ds-chat-code-bg);min-height:0;color:var(--ds-chat-code-fg);flex-direction:column;flex:1;display:flex}.GlbDda_terminalOutput{min-height:0;color:var(--ds-chat-code-fg)}.GlbDda_terminalComposer{border-top:1px solid var(--ds-chat-code-border);background:var(--ds-chat-code-bg-raised);grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:8px;padding:10px 12px;display:grid}.GlbDda_terminalComposer span{color:var(--ds-chat-accent-bright);font:13px ui-monospace,SFMono-Regular,Menlo,monospace}.GlbDda_terminalComposer input{min-width:0;color:var(--ds-chat-code-fg);background:0 0;border:0;outline:0;font:12px ui-monospace,SFMono-Regular,Menlo,monospace}.GlbDda_terminalComposer button,.GlbDda_browserBar button{border:var(--ds-chat-hairline) solid var(--ds-chat-code-border);height:32px;color:var(--ds-chat-code-fg);background:var(--ds-chat-code-bg-raised);cursor:pointer;border-radius:9px;padding:0 11px}.GlbDda_terminalComposer button:disabled,.GlbDda_browserBar button:disabled{opacity:.42;cursor:default}.GlbDda_browserWorkbench{background:var(--ds-chat-fill-quaternary);flex-direction:column;flex:1;min-height:0;display:flex}.GlbDda_browserBar{border-bottom:var(--ds-chat-hairline) solid var(--ds-chat-border);background:var(--ds-chat-surface);grid-template-columns:34px 34px 34px minmax(0,1fr) auto;gap:6px;padding:10px;display:grid}.GlbDda_browserBar button{color:var(--ds-chat-text-color);background:var(--ds-chat-fill-quaternary)}.GlbDda_browserBar input{border:var(--ds-chat-hairline) solid var(--ds-chat-border);min-width:0;color:inherit;background:var(--ds-chat-fill-quaternary);border-radius:10px;outline:0;padding:0 11px;font:12px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace}.GlbDda_browserFrame{background:canvas;border:0;flex:1;width:100%;min-height:0}.GlbDda_workbenchFootnote{border-top:var(--ds-chat-hairline) solid var(--ds-chat-border);color:var(--ds-chat-muted);background:var(--ds-chat-surface);font-size:var(--ds-chat-text-caption);padding:8px 12px}.GlbDda_workbenchFootnote a{color:var(--ds-chat-accent-solid)}.GlbDda_sidecarDrawer{z-index:54;width:min(390px,100vw - 64px);position:fixed;top:0;right:0}.GlbDda_sidecarMessages{background:color-mix(in srgb, var(--ds-chat-fill-quaternary) 74%, var(--ds-chat-surface));flex-direction:column;flex:1;gap:10px;min-height:0;padding:16px;display:flex;overflow:auto}.GlbDda_sidecarMessage{border:var(--ds-chat-hairline) solid var(--ds-chat-border);background:var(--ds-chat-surface);max-width:88%;box-shadow:var(--ds-chat-shadow-1);font-size:var(--ds-chat-text-body);white-space:pre-wrap;border-radius:16px 16px 16px 5px;padding:10px 12px;line-height:1.55}.GlbDda_sidecarMessage[data-role=user]{border-color:var(--ds-chat-accent-soft-strong);background:var(--ds-chat-accent-soft);border-radius:16px 16px 5px;align-self:flex-end}.GlbDda_sidecarThinking,.GlbDda_sidecarError{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-footnote);align-self:flex-start}.GlbDda_sidecarError{color:var(--ds-chat-danger)}.GlbDda_sidecarWelcome{color:var(--ds-chat-text-secondary);text-align:center;place-items:center;margin:auto;padding:28px;display:grid}.GlbDda_sidecarWelcome>span{width:46px;height:46px;color:var(--ds-chat-on-accent);background:var(--ds-chat-accent-solid);box-shadow:0 10px 22px color-mix(in srgb, var(--ds-chat-accent-solid) 24%, transparent);font-size:var(--ds-chat-text-title1);border-radius:50%;place-items:center;margin-bottom:12px;display:grid}.GlbDda_sidecarWelcome strong{font-size:var(--ds-chat-text-title3)}.GlbDda_sidecarWelcome p{max-width:260px;color:var(--ds-chat-muted);font-size:var(--ds-chat-text-footnote);margin:7px 0 0;line-height:1.55}.GlbDda_sidecarComposer{border-top:var(--ds-chat-hairline) solid var(--ds-chat-border);background:var(--ds-chat-surface);gap:9px;padding:12px;display:grid}.GlbDda_sidecarComposer textarea{resize:none;border:var(--ds-chat-hairline) solid var(--ds-chat-border);min-height:78px;color:inherit;background:var(--ds-chat-fill-quaternary);border-radius:14px;outline:0;padding:11px 12px;font:13px/1.5 inherit}.GlbDda_sidecarComposer button{min-width:72px;height:34px;color:var(--ds-chat-on-accent);background:var(--ds-chat-accent,var(--ds-chat-accent-solid));box-shadow:0 5px 12px color-mix(in srgb, var(--ds-chat-accent-solid) 20%, transparent);cursor:pointer;font:inherit;font-size:var(--ds-chat-text-footnote);font-weight:var(--ds-chat-weight-semibold);border:0;border-radius:10px;justify-self:end}.GlbDda_sidecarComposer button:disabled{opacity:.45;cursor:default}html[data-skill-chat-sidecar=true] [data-slot=conversation]{margin-right:min(390px,100vw - 64px);transition:margin-right .18s}@media (width<=860px){.GlbDda_headerIdentityCopy small{display:none}.GlbDda_headerActionsCluster{gap:4px}.GlbDda_headerTools{max-width:calc(100% - 96px);left:auto;right:8px}.GlbDda_headerTextButton{display:none}.GlbDda_fileWorkbench{grid-template-columns:42% minmax(0,1fr)}}@media (width<=680px){.GlbDda_headerIdentityCopy,.GlbDda_headerAvatarStack{display:none}.GlbDda_headerTools{justify-content:flex-end}.GlbDda_workbenchDrawer{width:100vw}.GlbDda_fileWorkbench{grid-template-rows:minmax(180px,38%) minmax(0,1fr);grid-template-columns:1fr}.GlbDda_fileBrowser{border-right:0;border-bottom:var(--ds-chat-hairline) solid var(--ds-chat-border)}.GlbDda_sidecarDrawer{width:calc(100vw - 40px)}html[data-skill-chat-sidecar=true] [data-slot=conversation]{margin-right:0}}.GlbDda_panel.GlbDda_groupSettingsPanel[data-level=raised]{border-color:color-mix(in srgb, var(--ds-chat-border-strong) 88%, transparent);background-color:canvas;background-image:linear-gradient(var(--ds-chat-surface), var(--ds-chat-surface));width:min(620px,100vw - 32px);box-shadow:var(--ds-chat-shadow-3);backdrop-filter:none}.GlbDda_panel.GlbDda_skillProfileDialog[data-level=raised]{background-color:canvas;background-image:linear-gradient(var(--ds-chat-surface), var(--ds-chat-surface));width:min(460px,100vw - 32px);height:auto;max-height:min(680px,100vh - 32px);box-shadow:var(--ds-chat-shadow-3);backdrop-filter:none}.GlbDda_groupSettingsPanel .GlbDda_field,.GlbDda_groupSettingsPanel .GlbDda_generatePrompt,.GlbDda_groupSettingsPanel .GlbDda_workspaceBindings,.GlbDda_groupSettingsPanel .GlbDda_panelHint,.GlbDda_groupSettingsPanel .GlbDda_profileActions{margin-left:20px;margin-right:20px}.GlbDda_groupSettingsPanel .GlbDda_panelTop{min-height:46px;margin:0 20px 14px}.GlbDda_groupSettingsPanel .GlbDda_groupAvatarLibrary{margin:0 20px 4px}.GlbDda_groupSettingsPanel .GlbDda_memberToolbar{padding-left:20px;padding-right:20px}.GlbDda_groupSettingsPanel .GlbDda_roomMemberGrid{padding:0 12px 12px}@media (width<=720px){.GlbDda_groupFormGrid{grid-template-columns:1fr}.GlbDda_groupFormGrid .GlbDda_generatePrompt{grid-column:1}.GlbDda_workspaceBindings{grid-template-columns:1fr}.GlbDda_memberToolbar{flex-direction:column;align-items:stretch}.GlbDda_memberToolbar input{box-sizing:border-box;width:100%;margin-left:0}.GlbDda_marketResult{grid-template-columns:34px minmax(0,1fr)}.GlbDda_marketActions{grid-column:1/-1;justify-content:flex-end}}@media (width<=1120px){.GlbDda_headerRoomMeta{display:none}.GlbDda_headerTools{gap:3px;max-width:calc(100% - 140px)}.GlbDda_headerIdentity,.GlbDda_headerDivider:first-of-type{display:none}.GlbDda_headerTextButton{text-overflow:ellipsis;white-space:nowrap;max-width:76px;overflow:hidden}}@media (width<=760px){.GlbDda_blankRoomDock{left:64px;right:8px}.GlbDda_headerTextButton{display:none}}[data-slot=conversation]{background:var(--ds-chat-fill-quaternary)}[data-slot=\"conversation.session.header\"]{background:var(--ds-chat-surface);backdrop-filter:none}[data-conversation-scroll]{background:radial-gradient(circle at 10% 20%, var(--ds-chat-accent-soft), transparent 24%), var(--ds-chat-fill-quaternary)}[data-chat-flow]{padding-block:20px 28px}[data-chat-flow-kind=assistant-step]:has([data-assistant-reply]){border:var(--ds-chat-hairline) solid var(--ds-chat-border);background:var(--ds-chat-surface);width:fit-content;max-width:78%;box-shadow:var(--ds-chat-shadow-1);border-radius:18px 18px 18px 6px;padding:12px 16px}[data-composer-seat]{background:linear-gradient(180deg, transparent, var(--ds-chat-fill-quaternary) 28%)}@media (width<=760px){.GlbDda_groupBackdrop{place-items:stretch stretch;padding:0}.GlbDda_groupDialog{border-radius:0;width:100%;max-height:100%}.GlbDda_groupPicker{grid-template-columns:1fr}.GlbDda_groupSelected{display:none}.GlbDda_groupName{grid-template-columns:1fr}}.GlbDda_modeBar{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);align-items:center;gap:4px;padding:0 14px 10px;display:flex}.GlbDda_modeBar span{margin-right:auto}.GlbDda_modeBar button,.GlbDda_subtabs button{color:var(--ds-chat-muted);font:inherit;cursor:pointer;background:0 0;border:0;border-radius:999px;padding:4px 8px}.GlbDda_subtabs{gap:6px;padding:0 12px 10px;display:flex}.GlbDda_subtabs button{font-size:var(--ds-chat-text-footnote);border-radius:10px;flex:1;padding:7px 10px}.GlbDda_notice{color:var(--ds-chat-warning);background:var(--ds-chat-warning-soft);font:inherit;font-size:var(--ds-chat-text-caption);text-align:left;cursor:pointer;border:0;border-radius:10px;margin:0 12px 10px;padding:8px 10px}.GlbDda_favoriteMark{color:var(--ds-chat-warning);font-size:var(--ds-chat-text-body)}.GlbDda_avatar[data-persona=true]{font-size:var(--ds-chat-text-title1)}.GlbDda_externalRow .GlbDda_copy{overflow:hidden}.GlbDda_externalRow .GlbDda_name{font-size:var(--ds-chat-text-footnote);display:block}.GlbDda_externalRow .GlbDda_description{font-size:var(--ds-chat-text-caption);gap:6px;display:flex}.GlbDda_externalRow .GlbDda_description b{color:var(--ds-chat-accent-solid);font-weight:var(--ds-chat-weight-semibold)}.GlbDda_panelHint{color:var(--ds-chat-accent-text);background:var(--ds-chat-accent-soft);font-size:var(--ds-chat-text-caption);border-radius:12px;margin-top:18px;padding:10px 12px;line-height:1.5}.GlbDda_danger{width:100%;color:var(--ds-chat-danger);font:inherit;cursor:pointer;background:0 0;border:0;margin-top:10px}[data-chat-flow-kind=assistant-step]:has([data-assistant-reply]){margin-left:46px;position:relative;margin-top:30px!important}[data-chat-flow-kind=assistant-step]:has([data-assistant-reply]):before{content:var(--skill-chat-active-avatar,\"🤖\");clip-path:circle(50%);background:var(--ds-chat-accent-soft-strong);width:34px;height:34px;box-shadow:inset 0 0 0 var(--ds-chat-hairline) var(--ds-chat-accent-border);font-size:var(--ds-chat-text-title2);border:0;border-radius:50%;place-items:center;line-height:1;display:grid;position:absolute;top:0;left:-46px}[data-chat-flow-kind=assistant-step][data-skill-responder]:has([data-assistant-reply]):after{content:attr(data-skill-responder);z-index:2;box-sizing:border-box;width:max-content;max-width:calc(100% - 12px);min-height:18px;color:var(--ds-chat-muted);background:var(--ds-chat-fill-quaternary);font-size:var(--ds-chat-text-caption);font-weight:var(--ds-chat-weight-semibold);text-align:left;white-space:nowrap;padding:1px 8px 1px 0;line-height:16px;position:absolute;top:-24px;left:0}[data-assistant-reply] [data-assistant-reasoning]{display:none}[data-chat-flow-kind=system-prompt],[data-chat-flow-kind=context],[data-chat-flow-kind=turn-tail]{display:none}[data-chat-flow-kind=user]{margin-right:46px;position:relative}[data-chat-flow-kind=user]:after{content:\"我\";clip-path:circle(50%);width:34px;height:34px;color:var(--ds-chat-accent-text);background:var(--ds-chat-accent-soft-strong);box-shadow:inset 0 0 0 var(--ds-chat-hairline) #00000014;font-size:var(--ds-chat-text-footnote);font-weight:var(--ds-chat-weight-bold);border-radius:50%;place-items:center;display:grid;position:absolute;top:0;right:-46px}[data-chat-flow-kind=turn-error]{border:var(--ds-chat-hairline) solid color-mix(in srgb, var(--ds-chat-danger) 24%, transparent);background:var(--ds-chat-surface);width:fit-content;max-width:78%;box-shadow:var(--ds-chat-shadow-1);border-radius:18px 18px 18px 6px;margin-left:46px;padding:12px 16px;position:relative}[data-chat-flow-kind=turn-error]:before{content:var(--skill-chat-active-avatar,\"🤖\");background:var(--ds-chat-accent-soft-strong);width:34px;height:34px;box-shadow:inset 0 0 0 var(--ds-chat-hairline) var(--ds-chat-accent-border);font-size:var(--ds-chat-text-title2);border:0;border-radius:50%;place-items:center;line-height:1;display:grid;position:absolute;top:0;left:-46px}.GlbDda_root{width:100%;min-width:0;overflow:hidden}.GlbDda_workspaceSection{min-width:0;margin:2px 8px 8px}.GlbDda_workspaceSection .GlbDda_workspaceBar{border-color:color-mix(in srgb, var(--ds-chat-border-strong) 78%, transparent);background:color-mix(in srgb, var(--ds-chat-surface) 86%, transparent);min-width:0;height:38px;box-shadow:0 1px 2px var(--ds-chat-accent-soft);border-radius:10px;margin:0;padding:0 7px 0 9px}.GlbDda_workspaceSection .GlbDda_workspaceBar select{width:100%;font-size:var(--ds-chat-text-body);font-weight:var(--ds-chat-weight-medium);text-overflow:ellipsis;overflow:hidden}.GlbDda_workspaceSection .GlbDda_workspaceBar button{background:0 0;border-radius:7px;width:26px;height:26px}.GlbDda_topbar{border-bottom:var(--ds-chat-hairline) solid color-mix(in srgb, var(--ds-chat-border-strong) 70%, transparent);gap:4px;min-width:0;padding:0 8px}.GlbDda_topbar .GlbDda_tabs{background:0 0;border-radius:0;gap:0;height:38px;margin:0;padding:0}.GlbDda_topbar .GlbDda_tab{height:38px;font-size:var(--ds-chat-text-body);border-radius:0;position:relative}.GlbDda_topbar .GlbDda_tab[data-active=true]{color:var(--ds-chat-text-color);box-shadow:none;font-weight:var(--ds-chat-weight-semibold);background:0 0}.GlbDda_topbar .GlbDda_tab[data-active=true]:after{content:\"\";background:var(--ds-chat-accent-solid);border-radius:999px;height:2px;position:absolute;bottom:-1px;left:22%;right:22%}.GlbDda_addGroup{width:30px;height:30px;font-size:var(--ds-chat-text-title1);border-radius:8px}.GlbDda_modeBar{border-bottom:var(--ds-chat-hairline) solid color-mix(in srgb, var(--ds-chat-border-strong) 45%, transparent);min-width:0;padding:9px 12px 8px}.GlbDda_modeBar button,.GlbDda_subtabs button{border-radius:7px}.GlbDda_modeBar button[data-active=true],.GlbDda_subtabs button[data-active=true]{color:var(--ds-chat-accent-solid);background:var(--ds-chat-accent-soft)}.GlbDda_list{flex:1;min-width:0;padding:0 6px 16px;overflow-x:hidden}.GlbDda_row{box-sizing:border-box;border-radius:9px;grid-template-columns:40px minmax(0,1fr) auto;gap:10px;min-width:0;padding:8px;overflow:hidden}.GlbDda_row[data-current=true]{box-shadow:none;background:color-mix(in srgb, var(--ds-chat-accent-solid) 10%, var(--ds-chat-surface))}.GlbDda_avatar{aspect-ratio:1;clip-path:circle(50%);width:40px;min-width:40px;max-width:40px;height:40px;min-height:40px;max-height:40px;box-shadow:none;border-radius:9999px}.GlbDda_copy,.GlbDda_nameLine,.GlbDda_name,.GlbDda_description{min-width:0;max-width:100%}.GlbDda_nameLine{overflow:hidden}.GlbDda_name{flex:auto}.GlbDda_source{text-overflow:ellipsis;white-space:nowrap;max-width:72px;overflow:hidden}.GlbDda_description{display:block}.GlbDda_groupAvatar{aspect-ratio:1;letter-spacing:0;border-radius:50%;width:46px;min-width:46px;max-width:46px;height:46px;min-height:46px;max-height:46px}.GlbDda_search{border-radius:9px;height:34px}.GlbDda_subtabs{padding:0 10px 8px}.GlbDda_notice{border-radius:8px;margin:8px 10px 0}.GlbDda_memberPicker .GlbDda_avatar,.GlbDda_memberRow .GlbDda_avatar{width:34px;height:34px;font-size:var(--ds-chat-text-title2);border-radius:50%;flex:none}.GlbDda_profileCover .GlbDda_close{background:var(--ds-chat-fill-primary);position:absolute;top:12px;right:12px}.GlbDda_profileActions{grid-template-columns:1fr 1fr;gap:8px;margin-top:20px;display:grid}.GlbDda_profileActions .GlbDda_primary{margin:0}.GlbDda_secondaryAction{border:var(--ds-chat-hairline) solid var(--ds-chat-border);color:var(--ds-chat-text-color);background:var(--ds-chat-surface);cursor:pointer;font:inherit;font-size:var(--ds-chat-text-footnote);font-weight:var(--ds-chat-weight-semibold);border-radius:11px}[data-chat-flow-kind=assistant-step]:has([data-assistant-reply]):before{content:var(--skill-message-avatar,var(--skill-chat-active-avatar,\"🤖\"))}@media (width<=1100px){.GlbDda_conversationGroupPanel{display:none}}.GlbDda_workspacePicker{grid-template-columns:minmax(0,1fr) 34px;gap:8px;display:grid;position:relative}.GlbDda_workspaceTrigger,.GlbDda_workspaceAdd{border:var(--ds-chat-hairline) solid color-mix(in srgb, var(--ds-chat-border-strong) 82%, var(--ds-chat-accent-solid));min-width:0;height:42px;color:var(--ds-chat-text-color);background:var(--ds-chat-surface);box-shadow:var(--ds-chat-shadow-1);font:inherit;cursor:pointer;border-radius:14px}.GlbDda_workspaceTrigger{text-align:left;grid-template-columns:24px minmax(0,1fr) 18px;align-items:center;gap:8px;padding:0 11px;display:grid}.GlbDda_workspaceTrigger>span:nth-child(2){font-size:var(--ds-chat-text-footnote);font-weight:var(--ds-chat-weight-semibold);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.GlbDda_chevron{color:var(--ds-chat-muted);text-align:center}.GlbDda_workspaceMenu{z-index:40;border:var(--ds-chat-hairline) solid var(--ds-chat-border);background:var(--ds-chat-surface);box-shadow:0 16px 36px var(--ds-chat-accent-soft);border-radius:14px;gap:4px;padding:6px;display:grid;position:absolute;top:48px;left:0;right:42px}.GlbDda_workspaceMenu button{min-width:0;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:10px;grid-template-columns:20px minmax(0,1fr) 18px;align-items:center;gap:7px;padding:9px;display:grid}.GlbDda_workspaceMenu button:hover,.GlbDda_workspaceMenu button[data-active=true]{background:var(--ds-chat-hover)}.GlbDda_workspaceMenu strong{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.GlbDda_workspaceMenu b{color:var(--ds-chat-accent-solid)}.GlbDda_generalAvatar{border:1px solid var(--ds-chat-accent-border,var(--ds-chat-accent-border));width:36px;height:36px;color:var(--ds-chat-accent-solid);background:var(--ds-chat-avatar-gradient,var(--ds-chat-accent-soft-strong));box-shadow:none;font-size:var(--ds-chat-text-title2);border-radius:50%;flex:none;place-items:center;display:grid}.GlbDda_generalAvatar[data-compact=true]{width:30px;height:30px;font-size:var(--ds-chat-text-title3)}.GlbDda_historyRow .GlbDda_avatar,.GlbDda_historyRow .GlbDda_generalAvatar{width:32px;height:32px}.GlbDda_profileActions>button{box-sizing:border-box;width:100%;min-height:42px}.GlbDda_profileActions>button:last-child:nth-child(3){grid-column:1/-1}[data-skill-chat-root] button:focus-visible,[data-skill-chat-root] input:focus-visible,[data-skill-chat-root] textarea:focus-visible{outline:2px solid var(--ds-chat-accent-border);outline-offset:2px}@media (prefers-reduced-motion:reduce){.GlbDda_generalChatButton{transition:none}}[data-skill-chat-welcome]{border:1px solid var(--ds-chat-accent-border);background:var(--ds-chat-surface);width:min(620px,100vw - 380px);box-shadow:var(--ds-chat-shadow-2);border-radius:24px;padding:26px 28px 18px}[data-skill-chat-welcome]:after{content:attr(data-skill-chat-hint);color:var(--ds-chat-muted);font-size:var(--ds-chat-text-footnote);text-align:center;margin-top:8px;display:block}[data-skill-chat-welcome] [class*=headline]{justify-content:center}@media (width<=760px){[data-skill-chat-welcome]{width:calc(100vw - 32px);padding:20px 16px 14px}}.GlbDda_root{font-family:var(--ds-chat-font);letter-spacing:var(--ds-chat-tracking-body);-webkit-font-smoothing:antialiased}.GlbDda_sectionHeading{padding:var(--ds-chat-space-3) var(--ds-chat-space-3) var(--ds-chat-space-1);align-items:baseline}.GlbDda_sectionHeading>div{gap:0}.GlbDda_sectionHeading strong{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);font-weight:var(--ds-chat-weight-semibold);letter-spacing:.06em;text-transform:uppercase}.GlbDda_sectionHeading small{font-size:var(--ds-chat-text-caption);letter-spacing:var(--ds-chat-tracking-caption)}.GlbDda_historySection{border-top:0;margin-top:0;padding-top:0}.GlbDda_name,.GlbDda_historyRow strong,.GlbDda_roomRow .GlbDda_name{font-size:var(--ds-chat-text-body);font-weight:var(--ds-chat-weight-semibold);letter-spacing:var(--ds-chat-tracking-body)}.GlbDda_description,.GlbDda_historyRow small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-footnote);font-weight:var(--ds-chat-weight-regular);line-height:var(--ds-chat-leading-normal)}.GlbDda_workspaceSection{margin:0 var(--ds-chat-space-2) var(--ds-chat-space-2)}.GlbDda_modeBar{margin:0 var(--ds-chat-space-3) var(--ds-chat-space-2);border-radius:var(--ds-chat-radius-sm);background:var(--ds-chat-fill-quaternary);border:0;padding:3px}.GlbDda_modeBar span{padding-left:var(--ds-chat-space-2);font-size:var(--ds-chat-text-caption)}.GlbDda_modeBar button{padding:4px var(--ds-chat-space-2);border-radius:var(--ds-chat-radius-xs);font-size:var(--ds-chat-text-caption)}.GlbDda_modeBar button[data-active=true]{color:var(--ds-chat-text-color);background:var(--ds-chat-surface);box-shadow:var(--ds-chat-shadow-1)}.GlbDda_roomList{overscroll-behavior:contain;min-height:0;padding:var(--ds-chat-space-1) var(--ds-chat-space-2) var(--ds-chat-space-2);flex:1;overflow-y:auto}.GlbDda_roomList>*{content-visibility:auto;contain-intrinsic-size:auto 56px}.GlbDda_list>*{content-visibility:auto;contain-intrinsic-size:auto 58px}.GlbDda_createWrap{display:inline-flex;position:relative}.GlbDda_createMenu{z-index:30;width:216px;padding:var(--ds-chat-space-1);border:var(--ds-chat-hairline) solid var(--ds-chat-border);border-radius:var(--ds-chat-radius-md);background:var(--ds-chat-surface);box-shadow:var(--ds-chat-shadow-3);gap:2px;display:grid;position:absolute;top:calc(100% + 6px);right:0}.GlbDda_createMenu button{padding:var(--ds-chat-space-2);border-radius:var(--ds-chat-radius-sm);color:inherit;text-align:left;cursor:pointer;font:inherit;background:0 0;border:0;gap:1px;display:grid}.GlbDda_createMenu button:hover{background:var(--ds-chat-hover)}.GlbDda_createMenu strong{font-size:var(--ds-chat-text-body);font-weight:var(--ds-chat-weight-semibold)}.GlbDda_createMenu small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_workspaceMenuSep{height:var(--ds-chat-hairline);margin:var(--ds-chat-space-1) 0;background:var(--ds-chat-border)}.GlbDda_searchWrap{padding:0 var(--ds-chat-space-3) var(--ds-chat-space-2)}.GlbDda_search{box-sizing:border-box;border:var(--ds-chat-hairline) solid transparent;border-radius:var(--ds-chat-radius-control);width:100%;padding:6px var(--ds-chat-space-3);color:var(--ds-chat-text-color);background:var(--ds-chat-fill-quaternary);font:inherit;font-size:var(--ds-chat-text-footnote);outline:0}.GlbDda_search::placeholder{color:var(--ds-chat-muted)}.GlbDda_time{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);font-variant-numeric:tabular-nums;white-space:nowrap}.GlbDda_root>[data-slot-name=\"ds-chat.settings.section\"],.GlbDda_root>:last-child:not(.GlbDda_roomList):not(.GlbDda_list){margin-top:auto}.GlbDda_root{touch-action:manipulation}.GlbDda_unreadBadge,.GlbDda_sectionHeading small,.GlbDda_workspaceMeta{font-variant-numeric:tabular-nums}.GlbDda_groupFormGrid{grid-template-columns:minmax(0,1fr);gap:0}.GlbDda_groupBody{flex-direction:column;flex:auto;min-height:0;display:flex}.GlbDda_groupBody .GlbDda_groupFormGrid,.GlbDda_groupBody .GlbDda_memberToolbar{flex:none}.GlbDda_groupBody .GlbDda_groupCandidates{overscroll-behavior:contain;flex:auto;min-height:192px;overflow-y:auto}.GlbDda_groupFormGrid .GlbDda_generatePrompt{margin-top:0;margin-bottom:var(--ds-chat-space-2);grid-column:1;justify-self:start}.GlbDda_groupFormGrid .GlbDda_field textarea{min-height:84px}.GlbDda_workspaceBindings{overscroll-behavior:contain;max-height:168px;overflow-y:auto}.GlbDda_groupHeader,.GlbDda_memberToolbar,.GlbDda_groupFooter{flex:none}.GlbDda_groupCandidates>*{content-visibility:auto;contain-intrinsic-size:auto 64px}.GlbDda_memberToolbar input{font-variant-numeric:tabular-nums}.GlbDda_confirmDialog{width:min(400px,100vw - 32px);padding:var(--ds-chat-space-6)}.GlbDda_confirmDialog h2{margin:0 0 var(--ds-chat-space-2);font-size:var(--ds-chat-text-title2)}.GlbDda_confirmDialog p{color:var(--ds-chat-text-secondary);font-size:var(--ds-chat-text-body);line-height:var(--ds-chat-leading-relaxed);margin:0}.GlbDda_confirmActions{justify-content:flex-end;gap:var(--ds-chat-space-2);margin-top:var(--ds-chat-space-5);display:flex}.GlbDda_groupMore{align-items:baseline;gap:var(--ds-chat-space-2);margin:0 28px var(--ds-chat-space-2);padding:var(--ds-chat-space-2) var(--ds-chat-space-3);border:var(--ds-chat-hairline) solid var(--ds-chat-border);border-radius:var(--ds-chat-radius-control);color:inherit;background:var(--ds-chat-fill-quaternary);cursor:pointer;font:inherit;font-size:var(--ds-chat-text-body);display:flex}.GlbDda_groupMore span{font-weight:var(--ds-chat-weight-semibold)}.GlbDda_groupMore small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption)}.GlbDda_groupMore b{color:var(--ds-chat-muted);margin-left:auto;font-weight:400}.GlbDda_groupMore:hover{background:var(--ds-chat-hover)}.GlbDda_groupMorePanel{overscroll-behavior:contain;flex:0 auto;min-height:0;max-height:40vh;padding:0 28px;overflow-y:auto}.GlbDda_groupMorePanel .GlbDda_workspaceBindings{max-height:none;overflow:visible}.GlbDda_root{box-sizing:border-box;padding-left:2px;padding-right:14px}.GlbDda_root>*{box-sizing:border-box}.GlbDda_workspaceSection,.GlbDda_topbar,.GlbDda_searchWrap,.GlbDda_subtabs,.GlbDda_modeBar,.GlbDda_roomList,.GlbDda_list,.GlbDda_sectionHeading{margin-left:0;margin-right:0;padding-left:0;padding-right:0}.GlbDda_workspacePicker{grid-template-columns:minmax(0,1fr)}.GlbDda_roomList,.GlbDda_list,.GlbDda_searchWrap,.GlbDda_subtabs{padding-bottom:var(--ds-chat-space-2)}.GlbDda_modeBar{margin-bottom:var(--ds-chat-space-2)}";
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
			"automationCard": "GlbDda_automationCard",
			"automationDialog": "GlbDda_automationDialog",
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
			"chevron": "GlbDda_chevron",
			"close": "GlbDda_close",
			"confirmActions": "GlbDda_confirmActions",
			"confirmDialog": "GlbDda_confirmDialog",
			"conversationGroupPanel": "GlbDda_conversationGroupPanel",
			"copy": "GlbDda_copy",
			"create": "GlbDda_create",
			"createMenu": "GlbDda_createMenu",
			"createWrap": "GlbDda_createWrap",
			"danger": "GlbDda_danger",
			"description": "GlbDda_description",
			"drawerEmpty": "GlbDda_drawerEmpty",
			"dsChatBrand": "GlbDda_dsChatBrand",
			"emptyCard": "GlbDda_emptyCard",
			"externalRow": "GlbDda_externalRow",
			"favoriteMark": "GlbDda_favoriteMark",
			"field": "GlbDda_field",
			"fileBrowser": "GlbDda_fileBrowser",
			"filePreview": "GlbDda_filePreview",
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
			"groupSelected": "GlbDda_groupSelected",
			"groupSettingsPanel": "GlbDda_groupSettingsPanel",
			"headerActionsCluster": "GlbDda_headerActionsCluster",
			"headerAvatarStack": "GlbDda_headerAvatarStack",
			"headerDivider": "GlbDda_headerDivider",
			"headerHistoryMenu": "GlbDda_headerHistoryMenu",
			"headerIconButton": "GlbDda_headerIconButton",
			"headerIdentity": "GlbDda_headerIdentity",
			"headerIdentityCopy": "GlbDda_headerIdentityCopy",
			"headerMenuWrap": "GlbDda_headerMenuWrap",
			"headerNewButton": "GlbDda_headerNewButton",
			"headerRoomMeta": "GlbDda_headerRoomMeta",
			"headerTextButton": "GlbDda_headerTextButton",
			"headerTools": "GlbDda_headerTools",
			"historyRow": "GlbDda_historyRow",
			"historySection": "GlbDda_historySection",
			"hoverProfile": "GlbDda_hoverProfile",
			"installJoin": "GlbDda_installJoin",
			"list": "GlbDda_list",
			"marketActions": "GlbDda_marketActions",
			"marketAvatar": "GlbDda_marketAvatar",
			"marketResult": "GlbDda_marketResult",
			"memberPersona": "GlbDda_memberPersona",
			"memberPicker": "GlbDda_memberPicker",
			"memberRow": "GlbDda_memberRow",
			"memberToggle": "GlbDda_memberToggle",
			"memberToolbar": "GlbDda_memberToolbar",
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
			"primary": "GlbDda_primary",
			"profileActions": "GlbDda_profileActions",
			"profileCover": "GlbDda_profileCover",
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
			"roomRow": "GlbDda_roomRow",
			"root": "GlbDda_root",
			"row": "GlbDda_row",
			"scheduleChoice": "GlbDda_scheduleChoice",
			"search": "GlbDda_search",
			"searchWrap": "GlbDda_searchWrap",
			"secondary": "GlbDda_secondary",
			"secondaryAction": "GlbDda_secondaryAction",
			"sectionHeading": "GlbDda_sectionHeading",
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
			"status": "GlbDda_status",
			"subtabs": "GlbDda_subtabs",
			"tab": "GlbDda_tab",
			"tabs": "GlbDda_tabs",
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
		function responderForMessage(members, leaderId, text, mode) {
			const mentioned = members.filter((member) => {
				const display = displayOf(member, mode);
				return text.includes(`@${display.name}`) || text.includes(`@${member.name}`);
			});
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
		function generatedGroupPrompt(name, members) {
			const roster = members.map((member) => `- ${member.name}：${member.description}`).join("\n");
			return `你是「${name || "协作群组"}」的协调者。根据用户目标组织以下 Skill 协作，优先给出明确、可执行且可验证的结果。\n\n成员能力：\n${roster}\n\n工作规则：没有明确 @ 时由协调者拆解任务并选择合适成员；有 @ 时优先由指定成员处理；不要声称发生了真实并行执行。`;
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
		function SkillChatHeaderTools({ sessionId }) {
			const bridge = useHeaderBridge();
			const [historyOpen, setHistoryOpen] = (0, react.useState)(false);
			if (bridge === null || bridge.sessionId !== sessionId) return null;
			const room = bridge.room;
			const history = room.sessionIds.toReversed().flatMap((id) => bridge.roomSessions.find((item) => item.roomSessionId === id) ?? []);
			const toolButton = (tool, label, icon) => (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
				label,
				side: "bottom",
				children: (0, react_jsx_runtime.jsx)(IconButton, {
					className: SkillContactsBrowser_module_css_default.headerIconButton,
					variant: "ghost",
					"aria-label": label,
					onClick: () => {
						bridge.onProjectTool(tool);
					},
					children: icon
				})
			});
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
								size: 30
							})
						}, member.id))
					}), (0, react_jsx_runtime.jsxs)("span", {
						className: SkillContactsBrowser_module_css_default.headerIdentityCopy,
						children: [(0, react_jsx_runtime.jsx)("strong", { children: room.title }), (0, react_jsx_runtime.jsx)("small", { children: room.type === "group" ? `${room.memberIds.length} 名成员 · ${bridge.coordinatorName ?? "协调者"} 协调` : `${bridge.workspaceTitle} · 直接对话` })]
					})]
				}), (0, react_jsx_runtime.jsxs)("span", {
					className: SkillContactsBrowser_module_css_default.headerActionsCluster,
					children: [
						toolButton("files", "项目文件", (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpenOutline16, {})),
						toolButton("terminal", "终端", (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCodeOutline16, {})),
						toolButton("diff", "查看 Diff", (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconBranchOutline16, {})),
						toolButton("browser", "浏览器", (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconGlobeOutline14, {})),
						(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
							label: "临时对话",
							side: "bottom",
							children: (0, react_jsx_runtime.jsx)(IconButton, {
								className: SkillContactsBrowser_module_css_default.headerIconButton,
								variant: "ghost",
								"aria-label": "临时对话",
								onClick: bridge.onTemporaryChat,
								children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconNewChatOutline16, {})
							})
						}),
						(0, react_jsx_runtime.jsx)("span", { className: SkillContactsBrowser_module_css_default.headerDivider }),
						bridge.headerActions,
						room.type === "group" ? (0, react_jsx_runtime.jsx)("button", {
							className: SkillContactsBrowser_module_css_default.headerTextButton,
							type: "button",
							onClick: bridge.onSettings,
							children: "成员与职能"
						}) : null,
						(0, react_jsx_runtime.jsxs)("span", {
							className: SkillContactsBrowser_module_css_default.headerMenuWrap,
							children: [(0, react_jsx_runtime.jsxs)("button", {
								className: SkillContactsBrowser_module_css_default.headerTextButton,
								type: "button",
								"aria-expanded": historyOpen,
								onClick: () => {
									setHistoryOpen((open) => !open);
								},
								children: ["历史 ", history.length]
							}), historyOpen ? (0, react_jsx_runtime.jsx)("span", {
								className: SkillContactsBrowser_module_css_default.headerHistoryMenu,
								children: history.map((item) => (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									"data-active": item.harnessSessionId === sessionId,
									onClick: () => {
										bridge.onHistory(item);
										setHistoryOpen(false);
									},
									children: [(0, react_jsx_runtime.jsx)("span", { children: item.title }), (0, react_jsx_runtime.jsx)("small", { children: new Date(item.updatedAt).toLocaleString() })]
								}, item.roomSessionId))
							}) : null]
						}),
						(0, react_jsx_runtime.jsx)(Button, {
							className: SkillContactsBrowser_module_css_default.headerNewButton,
							variant: "primary",
							size: "small",
							onClick: bridge.onNewSession,
							children: "＋ 新对话"
						})
					]
				})]
			});
		}
		function WorkbenchDrawer(props) {
			const title = props.tool === "files" ? "项目文件" : props.tool === "terminal" ? "终端" : props.tool === "diff" ? "代码变更" : "浏览器";
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
							children: [(0, react_jsx_runtime.jsx)("div", {
								className: SkillContactsBrowser_module_css_default.pathBar,
								children: props.listing?.path ?? props.workspacePath
							}), (0, react_jsx_runtime.jsx)("div", {
								className: SkillContactsBrowser_module_css_default.projectFileList,
								children: props.error !== null ? (0, react_jsx_runtime.jsx)("div", {
									className: SkillContactsBrowser_module_css_default.status,
									children: props.error
								}) : props.listing === null ? (0, react_jsx_runtime.jsx)("div", {
									className: SkillContactsBrowser_module_css_default.status,
									children: "正在读取目录…"
								}) : (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [props.listing.parent === void 0 ? null : (0, react_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										props.onBrowse(props.listing?.parent);
									},
									children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpenOutline16, {}), (0, react_jsx_runtime.jsx)("span", { children: ".. 返回上级" })]
								}), props.listing.entries.filter((entry) => !entry.hidden).map((entry) => (0, react_jsx_runtime.jsxs)("button", {
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
								children: "选择文件即可在这里预览"
							}) : (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.filePreviewMeta,
								children: [(0, react_jsx_runtime.jsx)("strong", { children: props.file.name }), (0, react_jsx_runtime.jsxs)("small", { children: [
									props.file.language,
									" · ",
									Math.max(1, Math.round(props.file.size / 1024)),
									" KB",
									props.file.truncated ? " · 已截断" : ""
								] })]
							}), props.file.binary ? (0, react_jsx_runtime.jsx)("div", {
								className: SkillContactsBrowser_module_css_default.drawerEmpty,
								children: "这是二进制文件，无法直接预览。"
							}) : (0, react_jsx_runtime.jsx)("pre", { children: props.file.content })] })
						})]
					}) : null,
					props.tool === "terminal" || props.tool === "diff" ? (0, react_jsx_runtime.jsxs)("div", {
						className: SkillContactsBrowser_module_css_default.terminalWorkbench,
						children: [(0, react_jsx_runtime.jsx)("pre", {
							className: SkillContactsBrowser_module_css_default.terminalOutput,
							children: props.error ?? props.terminal?.text ?? (props.terminalBusy ? "正在启动终端…" : "终端尚未启动")
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
									children: "运行"
								})
							]
						}) : (0, react_jsx_runtime.jsx)("div", {
							className: SkillContactsBrowser_module_css_default.workbenchFootnote,
							children: "显示当前项目的真实 `git diff` 输出。"
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
										children: "打开"
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
								children: ["若目标页面禁止嵌入，可在新窗口打开：", (0, react_jsx_runtime.jsx)("a", {
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
						children: [(0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)("strong", { children: "临时对话" }), (0, react_jsx_runtime.jsxs)("small", { children: [
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
								children: "可以追问、比较方案或验证细节；主对话会保持原位。"
							}) : props.messages.map((message) => (0, react_jsx_runtime.jsx)(ChatBubble, {
								className: SkillContactsBrowser_module_css_default.sidecarMessage,
								role: message.role,
								children: message.text
							}, message.id)),
							props.busy ? (0, react_jsx_runtime.jsx)("div", {
								className: SkillContactsBrowser_module_css_default.sidecarThinking,
								children: "正在思考…"
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
							children: "发送"
						})]
					})
				]
			});
		}
		function SkillContactsBrowser(props) {
			const { wide, expandSidebar, useSessions, useWorkspaces, loadContacts, searchExternal, openSession, renameSession, startSession, addWorkspace, chooseContact, chooseGroup, loadState, saveState, runAutomation: runAutomationRemote, browseProject, readProjectFile, openTerminal, sendTerminal, closeTerminal, startSidecar, sendSidecar, closeSidecar, renderSlot, t } = props;
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
			const [groupMoreOpen, setGroupMoreOpen] = (0, react.useState)(false);
			const [archiveConfirm, setArchiveConfirm] = (0, react.useState)(null);
			const [groupName, setGroupName] = (0, react.useState)("");
			const [groupPrompt, setGroupPrompt] = (0, react.useState)("");
			const [groupAvatar, setGroupAvatar] = (0, react.useState)("bear-honey");
			const [groupMembers, setGroupMembers] = (0, react.useState)([]);
			const [groupWorkspaceIds, setGroupWorkspaceIds] = (0, react.useState)([]);
			const [memberQuery, setMemberQuery] = (0, react.useState)("");
			const deferredMemberQuery = (0, react.useDeferredValue)(memberQuery.trim().toLocaleLowerCase());
			const [workspaceOpen, setWorkspaceOpen] = (0, react.useState)(false);
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
			const visibleRooms = (0, react.useMemo)(() => state.rooms.filter((room) => room.workspaceId === workspaceId && room.archivedAt === void 0).sort((a, b) => b.updatedAt - a.updatedAt), [state.rooms, workspaceId]);
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
			const activeMembers = activeRoom?.memberIds.flatMap((id) => allContacts.find((contact) => contact.id === id) ?? []) ?? [];
			const activeCoordinator = activeMembers.find((member) => member.id === activeRoom?.coordinatorId) ?? activeMembers[0];
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
					const localHasData = state.rooms.length > 0 || Object.keys(state.personas).length > 0 || state.automations.length > 0;
					replaceState(remoteState.rooms.length === 0 && localHasData ? stateRef.current : remoteState);
					setStateReady(true);
				}, () => {
					if (!abort.signal.aborted) setStateReady(true);
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
					...migrated
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
						const responder = responderForMessage(activeMembers, activeRoom.coordinatorId, user?.textContent ?? "", mode);
						if (responder === void 0) continue;
						const display = displayOf(responder, mode, state.personas);
						reply.dataset.skillResponder = display.name;
						reply.style.setProperty("--skill-message-avatar", `'${display.name.slice(0, 1)}'`);
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
				headline.textContent = activeRoom.type === "general" ? "开始一段新对话" : `和「${activeRoom.title}」一起开始`;
				welcome.dataset.skillChatWelcome = activeRoom.type;
				welcome.dataset.skillChatHint = activeRoom.type === "general" ? "直接输入问题，不调用任何 Skill" : activeRoom.type === "group" ? "输入消息，或用 @ 指定群组成员" : "输入消息，当前 Skill 会协助处理";
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
				const sessionId = activeHarnessSession(room, stateRef.current.roomSessions);
				if (sessionId !== void 0 && sessions.byId[sessionId] !== void 0) {
					openSession(sessionId);
					return;
				}
				await createRoomSession(room);
			};
			const beginContactChat = async (contact) => {
				if (workspaceId === void 0) {
					setNotice(t("workspaceRequired"));
					return;
				}
				const existing = state.rooms.find((room) => room.type === "direct" && room.workspaceId === workspaceId && room.memberIds[0] === contact.id && room.archivedAt === void 0);
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
					title: "普通对话",
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
				const memberIds = activeRoom.memberIds.includes(skillId) ? activeRoom.memberIds.filter((id) => id !== skillId) : [...activeRoom.memberIds, skillId];
				if (memberIds.length < 2) {
					setNotice(t("groupNeedsMember"));
					return;
				}
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
					name: automationName.trim() || "新自动化",
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
					setNotice("自动化已创建，可立即运行");
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
					setNotice("自动化已在后台创建并启动独立会话");
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
			const roomAvatar = (room, compact = false) => {
				if (room.type === "general") return (0, react_jsx_runtime.jsx)("span", {
					className: SkillContactsBrowser_module_css_default.generalAvatar,
					"data-compact": compact || void 0,
					children: "✦"
				});
				if (room.type === "group") {
					const members = room.memberIds.slice(0, 4).flatMap((id) => {
						const contact = allContacts.find((item) => item.id === id);
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
					return (0, react_jsx_runtime.jsx)(AvatarStack, {
						className: `${SkillContactsBrowser_module_css_default.roomAvatarStack} ${compact ? SkillContactsBrowser_module_css_default.roomAvatarStackCompact : ""}`,
						overlap: compact ? 7 : 10,
						children: members.map((member) => (0, react_jsx_runtime.jsx)(Avatar, {
							avatarId: member.avatar,
							label: member.name,
							size: compact ? 20 : 28
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
						return await sendTerminal(currentSessionId, opened.terminalId, "git diff --stat && git diff -- .", abort.signal);
					}).then(setTerminal, (error) => {
						if (!abort.signal.aborted) setProjectListingError(error instanceof Error ? error.message : String(error));
					}).finally(() => {
						if (!abort.signal.aborted) setTerminalBusy(false);
					});
				}
			};
			const browseCurrentProject = (path) => {
				if (activeWorkspace === void 0) {
					setProjectListingError("请先选择项目目录");
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
					workspaceTitle: activeWorkspace?.title ?? "当前项目",
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
					}
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
				renderSlot,
				state.personas,
				state.roomSessions
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
						(0, react_jsx_runtime.jsx)("span", { children: result.description ?? "来自 skills.sh 的社区 Skill，可安装到当前项目。" }),
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
							children: "查看 skills.sh 主页 ↗"
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
									children: installed !== void 0 ? "已安装" : installingId === result.id ? "安装中" : "安装"
								}), target !== void 0 ? (0, react_jsx_runtime.jsx)("button", {
									className: SkillContactsBrowser_module_css_default.installJoin,
									type: "button",
									disabled: included || installingId === result.id,
									onClick: installAndJoin,
									children: included ? "已加入" : installed === void 0 ? "安装并加入" : "加入"
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
				const meta = room.type === "group" ? `${room.memberIds.length} 人` : "";
				const sessionTitle = latest?.title === room.title ? void 0 : latest?.title;
				const preview = running ? "正在输入中…" : sessionTitle ?? (room.type === "group" ? coordinator === void 0 ? "未设置协调者" : `${displayOf(coordinator, "persona", state.personas).name} 协调` : room.sessionIds.length > 1 ? `${room.sessionIds.length} 个会话` : "还没有消息");
				const hover = (0, react_jsx_runtime.jsxs)("div", {
					className: SkillContactsBrowser_module_css_default.hoverProfile,
					children: [
						(0, react_jsx_runtime.jsx)("strong", { children: room.title }),
						(0, react_jsx_runtime.jsx)("span", { children: room.systemPrompt?.trim() || (room.type === "group" ? "固定 Skill 团队协作空间；未指定 @ 时由协调者处理。" : "直接对话，不启用群组职能。") }),
						(0, react_jsx_runtime.jsxs)("small", { children: [
							room.sessionIds.length,
							" 个会话",
							room.type === "group" ? ` · ${room.memberIds.length} 名成员` : ""
						] }),
						(0, react_jsx_runtime.jsxs)("small", { children: ["项目：", linked.join("、") || "未绑定"] })
					]
				});
				return (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.HoverCard, {
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
							(0, react_jsx_runtime.jsx)("span", {
								className: SkillContactsBrowser_module_css_default.time,
								children: roomTime(room.updatedAt)
							})
						]
					}),
					content: hover,
					copyLabel: "复制会话信息",
					copiedLabel: "已复制"
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
								children: "查看主页 ↗"
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
					(0, react_jsx_runtime.jsx)("div", {
						className: SkillContactsBrowser_module_css_default.workspaceSection,
						children: (0, react_jsx_runtime.jsxs)("div", {
							className: SkillContactsBrowser_module_css_default.workspacePicker,
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
								"contacts",
								"automations"
							].map((item) => (0, react_jsx_runtime.jsx)("button", {
								className: SkillContactsBrowser_module_css_default.tab,
								"data-active": view === item,
								type: "button",
								role: "tab",
								"aria-selected": view === item,
								onClick: () => {
									setView(item);
								},
								children: item === "automations" ? "自动化" : t(item)
							}, item))
						}), (0, react_jsx_runtime.jsxs)("span", {
							className: SkillContactsBrowser_module_css_default.createWrap,
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
										label: "普通对话",
										hint: "不启用 Skill，直接与模型交流",
										run: () => {
											beginGeneralChat();
										}
									},
									{
										id: "group",
										label: "群聊",
										hint: "把常用 Skill 组织成固定协作空间",
										run: openGroupCreator
									},
									{
										id: "workspace",
										label: "项目目录",
										hint: "添加一个新的工作区",
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
							placeholder: view === "contacts" ? t("searchAll") : "搜索对话…",
							"aria-label": view === "contacts" ? t("searchAll") : "搜索对话",
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
					view === "contacts" ? (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
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
						children: [(0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("strong", { children: "自动化" }), (0, react_jsx_runtime.jsx)("small", { children: "按计划在目标对话中创建独立会话" })] }), (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: activeRoom === void 0,
							onClick: () => {
								setAutomationOpen(true);
							},
							children: "＋ 新建"
						})]
					}), (0, react_jsx_runtime.jsx)("div", {
						className: SkillContactsBrowser_module_css_default.list,
						children: state.automations.filter((item) => item.workspaceId === workspaceId).length === 0 ? (0, react_jsx_runtime.jsx)("div", {
							className: SkillContactsBrowser_module_css_default.emptyCard,
							children: activeRoom === void 0 ? "先打开一个普通对话、Skill 对话或群组，再为它创建自动化。" : `当前没有自动化，点击“新建”即可绑定到「${activeRoom.title}」。`
						}) : state.automations.filter((item) => item.workspaceId === workspaceId).map((automation) => (0, react_jsx_runtime.jsxs)("article", {
							className: SkillContactsBrowser_module_css_default.automationCard,
							children: [
								(0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("strong", { children: automation.name }), (0, react_jsx_runtime.jsxs)("small", { children: [
									state.rooms.find((room) => room.roomId === automation.roomId)?.title ?? "已归档 Room",
									" · ",
									automation.schedule.kind === "once" ? "单次" : `每 ${automation.schedule.rule.slice(6)}`
								] })] }),
								(0, react_jsx_runtime.jsx)("p", { children: automation.prompt }),
								(0, react_jsx_runtime.jsxs)("footer", { children: [
									(0, react_jsx_runtime.jsx)("span", {
										"data-status": automation.status,
										children: automation.status === "active" ? "等待运行" : automation.status === "paused" ? "已暂停" : automation.status === "completed" ? "已完成" : "失败"
									}),
									(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											runAutomation(automation);
										},
										children: "立即运行"
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
										children: automation.status === "paused" ? "恢复" : "暂停"
									})
								] })
							]
						}, automation.automationId))
					})] }) : (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: (0, react_jsx_runtime.jsx)("div", {
						className: SkillContactsBrowser_module_css_default.roomList,
						children: roomResults.length === 0 ? query.trim() === "" ? (0, react_jsx_runtime.jsx)(EmptyState, {
							className: SkillContactsBrowser_module_css_default.emptyCard,
							title: "还没有对话",
							children: "用右上角的 ＋ 开始一段普通对话，或建一个 Skill 群组。"
						}) : (0, react_jsx_runtime.jsx)(EmptyState, {
							className: SkillContactsBrowser_module_css_default.emptyCard,
							title: "没有匹配的对话",
							children: "换个关键词，或到「联系人」里找 Skill。"
						}) : roomResults.map(roomRow)
					}) }),
					renderSlot("ds-chat.sidebar.after-rooms", {
						view,
						...workspaceId === void 0 ? {} : { workspaceId }
					}),
					renderSlot("ds-chat.settings.section", {
						view,
						...workspaceId === void 0 ? {} : { workspaceId }
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
						label: "Skill 资料",
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
								children: [(0, react_jsx_runtime.jsx)("span", { children: "昵称" }), (0, react_jsx_runtime.jsx)("input", {
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
									children: "保存身份"
								}), (0, react_jsx_runtime.jsx)(Button, {
									className: SkillContactsBrowser_module_css_default.secondaryAction,
									onClick: resetPersona,
									children: "恢复默认"
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
							(0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.originCard,
								children: [
									(0, react_jsx_runtime.jsx)("span", { children: "原始 Skill" }),
									(0, react_jsx_runtime.jsx)("strong", { children: selected.name }),
									(0, react_jsx_runtime.jsx)("small", { children: selected.sourceLabel })
								]
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
										children: "继续对话"
									}),
									(0, react_jsx_runtime.jsx)(Button, {
										className: SkillContactsBrowser_module_css_default.secondaryAction,
										onClick: () => {
											setEditingPersona(true);
										},
										children: "编辑昵称与头像"
									}),
									(0, react_jsx_runtime.jsx)(Button, {
										className: SkillContactsBrowser_module_css_default.secondaryAction,
										onClick: () => {
											toggleFavorite(selected.id);
										},
										children: favorites.includes(selected.id) ? `★ ${t("frequentContact")}` : `☆ ${t("addFrequent")}`
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
												label: groupName || "新群组"
											}), (0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("strong", { children: "群组头像" }), (0, react_jsx_runtime.jsx)("small", { children: "独立圆形标识，与成员 Skill 清晰区分" })] })]
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
											(0, react_jsx_runtime.jsx)("span", { children: "更多设置" }),
											(0, react_jsx_runtime.jsx)("small", { children: "头像、群组职能与项目目录" }),
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
												children: [(0, react_jsx_runtime.jsx)("span", { children: "群组职能" }), (0, react_jsx_runtime.jsx)("textarea", {
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
													setGroupPrompt(generatedGroupPrompt(groupName.trim() || "协作群组", members));
												},
												children: "✦ 根据成员辅助生成"
											}),
											(0, react_jsx_runtime.jsxs)("div", {
												className: SkillContactsBrowser_module_css_default.workspaceBindings,
												children: [(0, react_jsx_runtime.jsxs)("div", {
													className: SkillContactsBrowser_module_css_default.bindingHeader,
													children: [(0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)("strong", { children: "绑定项目目录" }), (0, react_jsx_runtime.jsx)("small", { children: "默认绑定当前项目；新对话使用第一个项目作为主目录" })] }), (0, react_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => {
															addLinkedWorkspace("create");
														},
														children: "＋ 添加目录"
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
										children: [(0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("strong", { children: "选择成员" }), (0, react_jsx_runtime.jsxs)("small", { children: [
											"已选 ",
											groupMembers.length,
											" 个，点击成员可加入或剔出"
										] })] }), (0, react_jsx_runtime.jsx)("input", {
											value: memberQuery,
											onChange: (event) => {
												setMemberQuery(event.target.value);
											},
											placeholder: "搜索昵称、原始 Skill、能力或 skills.sh…",
											"aria-label": "搜索成员",
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
									children: [(0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("h2", { children: "新建自动化" }), (0, react_jsx_runtime.jsxs)("p", { children: ["目标对话：", activeRoom.title] })] }), (0, react_jsx_runtime.jsx)("button", {
										className: SkillContactsBrowser_module_css_default.close,
										onClick: () => {
											setAutomationOpen(false);
										},
										children: "×"
									})]
								}),
								(0, react_jsx_runtime.jsxs)("label", {
									className: SkillContactsBrowser_module_css_default.field,
									children: [(0, react_jsx_runtime.jsx)("span", { children: "名称" }), (0, react_jsx_runtime.jsx)("input", {
										value: automationName,
										onChange: (event) => {
											setAutomationName(event.target.value);
										},
										placeholder: "例如：每周研究简报…"
									})]
								}),
								(0, react_jsx_runtime.jsxs)("label", {
									className: SkillContactsBrowser_module_css_default.field,
									children: [(0, react_jsx_runtime.jsx)("span", { children: "任务提示词" }), (0, react_jsx_runtime.jsx)("textarea", {
										value: automationPrompt,
										onChange: (event) => {
											setAutomationPrompt(event.target.value);
										},
										placeholder: "描述需要团队完成的任务…"
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
										children: "单次运行"
									}), (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										"data-active": automationSchedule === "recurring",
										onClick: () => {
											setAutomationSchedule("recurring");
										},
										children: "周期运行"
									})]
								}),
								(0, react_jsx_runtime.jsxs)("label", {
									className: SkillContactsBrowser_module_css_default.field,
									children: [(0, react_jsx_runtime.jsx)("span", { children: automationSchedule === "once" ? "运行时间" : "首次运行时间" }), (0, react_jsx_runtime.jsx)("input", {
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
										children: [(0, react_jsx_runtime.jsx)("span", { children: "间隔" }), (0, react_jsx_runtime.jsx)("input", {
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
										children: [(0, react_jsx_runtime.jsx)("span", { children: "单位" }), (0, react_jsx_runtime.jsxs)("select", {
											value: automationUnit,
											onChange: (event) => {
												setAutomationUnit(event.target.value === "h" ? "h" : "d");
											},
											children: [(0, react_jsx_runtime.jsx)("option", {
												value: "h",
												children: "小时"
											}), (0, react_jsx_runtime.jsx)("option", {
												value: "d",
												children: "天"
											})]
										})]
									})]
								}) : null,
								(0, react_jsx_runtime.jsxs)("div", {
									className: SkillContactsBrowser_module_css_default.automationSummary,
									children: [
										(0, react_jsx_runtime.jsx)("span", { children: "团队" }),
										(0, react_jsx_runtime.jsx)("strong", { children: activeRoom.memberIds.length === 0 ? "普通对话（不启用 Skill）" : activeRoom.memberIds.map((id) => state.personas[id]?.displayName ?? id).join("、") }),
										(0, react_jsx_runtime.jsx)("small", { children: activeRoom.memberIds.length === 0 ? "按普通用户提示词执行" : "未指定 @ 时由协调者处理" })
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
										children: "创建自动化"
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
					archiveConfirm !== null ? (0, react_jsx_runtime.jsxs)(Dialog, {
						className: SkillContactsBrowser_module_css_default.confirmDialog,
						label: "归档群组",
						onClose: () => {
							setArchiveConfirm(null);
						},
						children: [
							(0, react_jsx_runtime.jsx)("h2", { children: "归档这个群组？" }),
							(0, react_jsx_runtime.jsx)("p", { children: "群组会从列表中移除，历史会话仍保留在项目里。此操作没有撤销入口。" }),
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
						label: "群组设置",
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
								children: [(0, react_jsx_runtime.jsx)("span", { children: "群组名称" }), (0, react_jsx_runtime.jsx)("input", {
									value: roomTitleDraft,
									onChange: (event) => {
										setRoomTitleDraft(event.target.value);
									}
								})]
							}),
							(0, react_jsx_runtime.jsxs)("label", {
								className: SkillContactsBrowser_module_css_default.field,
								children: [(0, react_jsx_runtime.jsx)("span", { children: "群组职能 · System Prompt" }), (0, react_jsx_runtime.jsx)("textarea", {
									value: roomPromptDraft,
									onChange: (event) => {
										setRoomPromptDraft(event.target.value);
									},
									placeholder: "定义群组目标、协作方式和输出标准…"
								})]
							}),
							(0, react_jsx_runtime.jsx)("button", {
								className: SkillContactsBrowser_module_css_default.generatePrompt,
								type: "button",
								onClick: () => {
									setRoomPromptDraft(generatedGroupPrompt(roomTitleDraft.trim() || activeRoom.title, activeMembers));
								},
								children: "✦ 根据当前成员重新生成"
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.workspaceBindings,
								children: [(0, react_jsx_runtime.jsxs)("div", {
									className: SkillContactsBrowser_module_css_default.bindingHeader,
									children: [(0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)("strong", { children: "绑定项目目录" }), (0, react_jsx_runtime.jsx)("small", { children: "可新增、移除并调整新会话使用的主项目" })] }), (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											addLinkedWorkspace("settings");
										},
										children: "＋ 添加目录"
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
								children: "点击已加入成员可设为协调者；＋ 加入，− 剔出。新对话与历史对话都会读取当前群组职能。"
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: SkillContactsBrowser_module_css_default.memberToolbar,
								children: [(0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("strong", { children: "全部成员" }), (0, react_jsx_runtime.jsxs)("small", { children: [activeRoom.memberIds.length, " 个已加入"] })] }), (0, react_jsx_runtime.jsx)("input", {
									value: memberQuery,
									onChange: (event) => {
										setMemberQuery(event.target.value);
									},
									placeholder: "搜索昵称、Skill 或能力…",
									"aria-label": "搜索成员",
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
												}), (0, react_jsx_runtime.jsxs)("span", { children: [(0, react_jsx_runtime.jsx)("strong", { children: display.name }), (0, react_jsx_runtime.jsx)("small", { children: coordinator ? "协调者" : contact.name })] })]
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
									children: "保存群组"
								}), (0, react_jsx_runtime.jsx)(Button, {
									className: SkillContactsBrowser_module_css_default.danger,
									variant: "danger",
									onClick: () => {
										setArchiveConfirm(activeRoom.roomId);
									},
									children: "归档群组"
								})]
							})
						]
					}) : null
				]
			});
		}
		function DSChatBrand() {
			return (0, react_jsx_runtime.jsx)("span", {
				className: SkillContactsBrowser_module_css_default.dsChatBrand,
				children: "DS Chat"
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
		const BUILTIN_SKINS = [{
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
		}, {
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
		}];
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
		const css = ".J1eEvW_trigger{justify-content:flex-start;width:calc(100% - 24px);margin:0 12px 10px}.J1eEvW_panel{padding:18px}.J1eEvW_header{justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:16px;display:flex}.J1eEvW_header span{gap:3px;display:grid}.J1eEvW_header strong{font-size:var(--ds-chat-text-title2)}.J1eEvW_header small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);line-height:1.45}.J1eEvW_grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;display:grid}.J1eEvW_card{border:var(--ds-chat-hairline) solid var(--ds-chat-border);border-radius:var(--ds-chat-radius-lg);min-width:0;color:inherit;background:var(--ds-chat-surface-raised,var(--ds-chat-surface));box-shadow:var(--ds-chat-shadow-1);text-align:left;cursor:pointer;font:inherit;gap:10px;padding:12px;display:grid}.J1eEvW_card[data-active=true]{border-color:var(--ds-chat-accent-border);box-shadow:0 10px 25px color-mix(in srgb, var(--ds-chat-accent-solid) 16%, transparent)}.J1eEvW_preview{background:color-mix(in srgb, var(--skin-accent) 8%, var(--ds-chat-fill-quaternary));border-radius:13px;grid-template-columns:32% 1fr;gap:8px;height:112px;padding:9px;display:grid;overflow:hidden}.J1eEvW_preview aside{background:color-mix(in srgb, var(--skin-accent) 16%, var(--ds-chat-surface));border-radius:9px}.J1eEvW_preview main{align-content:center;gap:7px;display:grid}.J1eEvW_preview i{background:color-mix(in srgb, var(--skin-accent) 22%, var(--ds-chat-surface));border-radius:999px;height:12px;display:block}.J1eEvW_preview i:nth-child(2){width:74%}.J1eEvW_preview i:nth-child(3){background:var(--skin-accent);width:52%}.J1eEvW_copy{gap:3px;display:grid}.J1eEvW_copy strong{font-size:var(--ds-chat-text-body)}.J1eEvW_copy small{color:var(--ds-chat-muted);font-size:var(--ds-chat-text-caption);line-height:1.45}.J1eEvW_footer{justify-content:space-between;align-items:center;gap:12px;margin-top:16px;display:flex}.J1eEvW_diagnostic{color:var(--ds-chat-warning);font-size:var(--ds-chat-text-caption)}@media (width<=620px){.J1eEvW_grid{grid-template-columns:1fr}}";
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
							style: { "--skin-accent": skin.manifest.accent },
							children: [(0, react_jsx_runtime.jsxs)(Surface, {
								level: "sunken",
								className: SkinCenter_module_css_default.preview,
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
			addToCurrentGroup: "加入当前群聊"
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
			addToCurrentGroup: "Add to current group"
		};
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
			const mentionSource = {
				trigger: "@",
				name: "skill-contact",
				order: -20,
				showGroupTitle: false,
				candidates(session, { query, signal }) {
					signal.throwIfAborted();
					const binding = readStored(CHAT_BINDINGS_KEY, {})[session.sessionId];
					if (binding === void 0) return Promise.resolve([]);
					const mode = readStored(MODE_KEY, "persona");
					const normalized = query.trim().toLocaleLowerCase();
					return Promise.resolve(binding.members.flatMap((contact) => {
						const display = displayOf(contact, mode);
						if (normalized.length > 0 && !`${display.name} ${contact.name} ${contact.description}`.toLocaleLowerCase().includes(normalized)) return [];
						return [{
							name: display.name,
							description: contact.description,
							...binding.kind === "group" ? { section: binding.name } : {},
							value: JSON.stringify({
								name: display.name,
								skill: contact.name,
								description: contact.description
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