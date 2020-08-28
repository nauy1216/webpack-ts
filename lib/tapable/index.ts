type PluginParam = any
type PluginsWaterfallInitVal = any
type PluginCallback = Function
type PluginError = any

type PluginFunc = (param1?: PluginsWaterfallInitVal | PluginParam, ...others: PluginParam[]) => any

interface PluginClass {
    apply(tap: Tapable, ...args: any[]): any
}

export type WebpackPlugin = PluginClass | PluginFunc

// 如果当前模块没有导出则默认为全局定义， 在其他文件可不导入使用这里定义的类型声明
export default class Tapable {
    private _plugins: {[key: string]: WebpackPlugin[]}

    constructor() {
        this._plugins = {}
    }

    // 调用插件
    applyPlugins(name: string) {
        if(!this._plugins[name]) return
        var args = Array.prototype.slice.call(arguments, 1)
        var plugins = this._plugins[name]
        for(var i = 0; i < plugins.length; i++) {
            (plugins[i] as PluginClass).apply(this, args)
        }
    }

    applyPlugins0(name: string) {
        var plugins = this._plugins[name]
        if(!plugins) return
        for(var i = 0; i < plugins.length; i++) {
            (plugins[i] as PluginFunc).call(this)
        }
    }

    applyPlugins1(name: string, param: PluginParam) {
        var plugins = this._plugins[name]
        if(!plugins) return
        for(var i = 0; i < plugins.length; i++) {
            (plugins[i] as PluginFunc).call(this, param)
        }
    }

    applyPlugins2(name: string, param1: PluginParam, param2: PluginParam) {
        var plugins = this._plugins[name]
        if(!plugins) return
        for(var i = 0; i < plugins.length; i++) {
            (plugins[i] as PluginFunc).call(this, param1, param2)
        }
    }

    applyPluginsWaterfall(name: string, init: PluginsWaterfallInitVal) {
        if(!this._plugins[name]) return init
        var args = Array.prototype.slice.call(arguments, 1)
        var plugins = this._plugins[name]
        var current = init
        for(var i = 0; i < plugins.length; i++) {
            args[0] = current
            current = (plugins[i] as PluginClass).apply(this, args)
        }
        return current
    }

    applyPluginsWaterfall0(name: string, init: PluginsWaterfallInitVal) {
        var plugins = this._plugins[name]
        if(!plugins) return init
        var current = init
        for(var i = 0; i < plugins.length; i++) {
            current = (plugins[i] as PluginFunc).call(this, current)
        }
        return current
    }

    applyPluginsWaterfall1(name: string, init: PluginsWaterfallInitVal, param: PluginParam) {
        var plugins = this._plugins[name]
        if(!plugins) return init
        var current = init
        for(var i = 0; i < plugins.length; i++) {
            current = (plugins[i] as PluginFunc).call(this, current, param)
        }
        return current
    }

    applyPluginsWaterfall2(name: string, init: PluginsWaterfallInitVal, param1: PluginParam, param2: PluginParam) {
        var plugins = this._plugins[name];
        if(!plugins) return init;
        var current = init;
        for(var i = 0; i < plugins.length; i++)
            current = (plugins[i] as PluginFunc).call(this, current, param1, param2);
        return current;
    }

    applyPluginsBailResult(name: string) {
        if(!this._plugins[name]) return
        var args = Array.prototype.slice.call(arguments, 1)
        var plugins = this._plugins[name]
        for(var i = 0; i < plugins.length; i++) {
            var result = (plugins[i] as PluginClass).apply(this, args)
            // 其中一个返回了结果后面的将不在执行
            if(typeof result !== "undefined") {
                return result
            }
        }
    }

    applyPluginsBailResult1(name: string, param: PluginParam) {
        if(!this._plugins[name]) return
        var plugins = this._plugins[name]
        for(var i = 0; i < plugins.length; i++) {
            var result = (plugins[i] as PluginFunc).call(this, param)
            if(typeof result !== "undefined") {
                return result
            }
        }
    }

    applyPluginsBailResult2(name: string, param1: PluginParam, param2: PluginParam) {
        if(!this._plugins[name]) return
        var plugins = this._plugins[name]
        for(var i = 0; i < plugins.length; i++) {
            var result = (plugins[i] as PluginFunc).call(this, param1, param2)
            if(typeof result !== "undefined") {
                return result
            }
        }
    }

    applyPluginsBailResult3(name: string, param1: PluginParam, param2: PluginParam, param3: PluginParam) {
        if(!this._plugins[name]) return
        var plugins = this._plugins[name]
        for(var i = 0; i < plugins.length; i++) {
            var result = (plugins[i] as PluginFunc).call(this, param1, param2, param3)
            if(typeof result !== "undefined") {
                return result
            }
        }
    }

    applyPluginsBailResult4(name: string, param1: PluginParam, param2: PluginParam, param3: PluginParam, param4: PluginParam) {
        if(!this._plugins[name]) return;
        var plugins = this._plugins[name];
        for(var i = 0; i < plugins.length; i++) {
            var result = (plugins[i] as PluginFunc).call(this, param1, param2, param3, param4);
            if(typeof result !== "undefined") {
                return result;
            }
        }
    }

    applyPluginsBailResult5(name: string, param1: PluginParam, param2: PluginParam, param3: PluginParam, param4: PluginParam, param5: PluginParam) {
        if(!this._plugins[name]) return
        var plugins = this._plugins[name]
        for(var i = 0; i < plugins.length; i++) {
            var result = (plugins[i] as PluginFunc).call(this, param1, param2, param3, param4, param5)
            if(typeof result !== "undefined") {
                return result
            }
        }
    }

    applyPluginsAsyncSeries(name: string) {
        var args = Array.prototype.slice.call(arguments, 1)
        var callback = args.pop()
        var plugins = this._plugins[name]
        if(!plugins || plugins.length === 0) return callback()
        var i = 0
        var _this = this
        args.push(Tapable.copyProperties(callback, function next(err: PluginError) {
            if(err) return callback(err)
            i++
            if(i >= plugins.length) {
                return callback()
            }
            (plugins[i] as PluginClass).apply(_this, args)
        }));
        (plugins[0]  as PluginClass).apply(this, args)
    }

    applyPluginsAsync(name: string) {
        this.applyPluginsAsyncSeries(name)
    }

    applyPluginsAsyncSeries1(name: string, param: PluginParam, callback: PluginCallback) {
        var plugins = this._plugins[name]
        if(!plugins || plugins.length === 0) return callback()
        var i = 0
        var _this = this
        var innerCallback = Tapable.copyProperties(callback, function next(err: PluginError) {
            if(err) return callback(err)
            i++
            if(i >= plugins.length) {
                return callback()
            }
            (plugins[i] as PluginFunc).call(_this, param, innerCallback)
        });
        (plugins[0] as PluginFunc).call(this, param, innerCallback)
    }

    applyPluginsAsyncSeriesBailResult(name: string) {
        var args = Array.prototype.slice.call(arguments, 1);
        var callback = args.pop();
        if(!this._plugins[name] || this._plugins[name].length === 0) return callback();
        var plugins = this._plugins[name];
        var i = 0;
        var _this = this;
        args.push(Tapable.copyProperties(callback, function next() {
            if(arguments.length > 0) return callback.apply(null, arguments);
            i++;
            if(i >= plugins.length) {
                return callback();
            }
            (plugins[i] as PluginClass).apply(_this, args);
        }));
        (plugins[0] as PluginClass).apply(this, args);
    }

    applyPluginsAsyncSeriesBailResult1(name: string, param: PluginParam, callback: PluginCallback) {
        var plugins = this._plugins[name];
        if(!plugins || plugins.length === 0) return callback();
        var i = 0;
        var _this = this;
        var innerCallback = Tapable.copyProperties(callback, function next(err: PluginError, result: any) {
            if(arguments.length > 0) return callback(err, result);
            i++;
            if(i >= plugins.length) {
                return callback();
            }
            (plugins[i] as PluginFunc).call(_this, param, innerCallback);
        });
        (plugins[0] as PluginFunc).call(this, param, innerCallback);
    }

    applyPluginsAsyncWaterfall(name: string, init: PluginsWaterfallInitVal, callback: PluginCallback) {
        if(!this._plugins[name] || this._plugins[name].length === 0) return callback(null, init);
        var plugins = this._plugins[name];
        var i = 0;
        var _this = this;
        var next = Tapable.copyProperties(callback, function(err: PluginError, value: PluginsWaterfallInitVal) {
            if(err) return callback(err);
            i++;
            if(i >= plugins.length) {
                return callback(null, value);
            }
            (plugins[i] as PluginFunc).call(_this, value, next);
        });
        (plugins[0] as PluginFunc).call(this, init, next);
    }

    applyPluginsParallel(name: string) {
        var args = Array.prototype.slice.call(arguments, 1);
        var callback = args.pop();
        if(!this._plugins[name] || this._plugins[name].length === 0) return callback();
        var plugins = this._plugins[name];
        var remaining = plugins.length;
        args.push(Tapable.copyProperties(callback, function(err: PluginError) {
            if(remaining < 0) return; // ignore
            if(err) {
                remaining = -1;
                return callback(err);
            }
            remaining--;
            if(remaining === 0) {
                return callback();
            }
        }));
        for(var i = 0; i < plugins.length; i++) {
            (plugins[i] as PluginClass).apply(this, args);
            if(remaining < 0) return;
        }
    }

    applyPluginsParallelBailResult(name: string) {
        var args = Array.prototype.slice.call(arguments, 1);
        var callback = args[args.length - 1];
        if(!this._plugins[name] || this._plugins[name].length === 0) return callback();
        var plugins = this._plugins[name];
        var currentPos = plugins.length;
        // TODO: 类型
        var currentResult: any;
        var done: any[] = [];
        for(var i = 0; i < plugins.length; i++) {
            args[args.length - 1] = (function(i) {
                return Tapable.copyProperties(callback, function() {
                    if(i >= currentPos) return; // ignore
                    done.push(i);
                    if(arguments.length > 0) {
                        currentPos = i + 1;
                        done = Tapable.fastFilter.call(done, function(item: any) {
                            return item <= i;
                        });
                        currentResult = Array.prototype.slice.call(arguments);
                    }
                    if(done.length === currentPos) {
                        callback.apply(null, currentResult);
                        currentPos = 0;
                    }
                });
            }(i));
            (plugins[i] as PluginClass).apply(this, args);
        }
    }

    applyPluginsParallelBailResult1(name: string, param: PluginParam, callback: PluginCallback) {
        var plugins = this._plugins[name];
        if(!plugins || plugins.length === 0) return callback();
        var currentPos = plugins.length;
        var currentResult: any;
        var done: any[] = [];
        for(var i = 0; i < plugins.length; i++) {
            var innerCallback = (function(i) {
                return Tapable.copyProperties(callback, function() {
                    if(i >= currentPos) return; // ignore
                    done.push(i);
                    if(arguments.length > 0) {
                        currentPos = i + 1;
                        done = Tapable.fastFilter.call(done, function(item: any) {
                            return item <= i;
                        });
                        currentResult = Array.prototype.slice.call(arguments);
                    }
                    if(done.length === currentPos) {
                        callback.apply(null, currentResult);
                        currentPos = 0;
                    }
                });
            }(i));
            (plugins[i] as PluginFunc).call(this, param, innerCallback);
        }
    }

    hasPlugins(name: string): boolean {
        var plugins = this._plugins[name];
        return plugins && plugins.length > 0;
    }

    plugin(name: string, fn: WebpackPlugin) {
        if(Array.isArray(name)) {
            name.forEach(name => {
                this.plugin(name, fn);
            }, this);
            return;
        }
        if(!this._plugins[name]) this._plugins[name] = [fn];
        else this._plugins[name].push(fn);
    }

    apply() {
        for(var i = 0; i < arguments.length; i++) {
            arguments[i].apply(this)
        }
    }

    static copyProperties(from: any, to: any) {
        for (var key in from) {
		    to[key] = from[key]
        }
	    return to
    }

    static mixinTapable(pt: any) {
        this.copyProperties(Tapable.prototype, pt)
    }

    static fastFilter(this: any[], fun: Function) {
        'use strict';
    
        if (this === void 0 || this === null) {
            throw new TypeError();
        }
    
        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== 'function') {
            throw new TypeError();
        }
    
        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i];
    
                // NOTE: Technically this should Object.defineProperty at
                //       the next index, as push can be affected by
                //       properties on Object.prototype and Array.prototype.
                //       But that method's new, and collisions should be
                //       rare, so use the more-compatible alternative.
                if (fun.call(thisArg, val, i, t)) {
                    res.push(val);
                }
            }
        }
    
        return res;
    }
}