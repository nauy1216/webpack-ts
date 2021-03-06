import {WebpackOptions} from './types/WebpackOptions'
export default class WebpackOptionsDefaulter {
    config!: {[key: string]: any}
    defaults!: {[key: string]: any}

    constructor() {
        this.config = {};
        this.defaults = {};
        
        this.set('devtool', false);
        this.set('context', process.cwd());
        this.set('module', 'call', (value: any) => Object.assign({}, value));
        this.set('module.rules', []);
        this.set('resolve', 'call', (value: any) => Object.assign({}, value));
        this.set('resolve.unsafeCache', true);
        this.set('resolve.cacheWithContext', false);
        this.set('resolve.cacheWithContext', false);
        this.set('resolve.modules', ["node_modules"]);
        this.set('resolve.extensions', [".js", ".json"]);
        this.set('resolve.mainFiles', ["index"]);
        this.set('resolve.mainFields', ["browser", "module", "main"]);
        this.set('resolve.aliasFields', ["browser"]);
        this.set('resolveLoader', 'call', (value: any) => Object.assign({}, value));
        this.set('resolveLoader.cacheWithContext', false);
        this.set('resolveLoader.unsafeCache', true);
        this.set('resolveLoader.mainFields', ["loader", "main"]);
        this.set('resolveLoader.extensions', [".js", ".json"]);
        this.set('resolveLoader.mainFiles', ["index"]);
        this.set('output', 'call', (value: any) => {
            if (typeof value === 'string') {
                return {
                    filename: value
                }
            } else {
                return Object.assign({}, value)
            }
        });
        this.set('output.filename', '[name].js');
        this.set('output.chunkFilename', '');
        this.set('output.jsonpFunction', 'webpackJsonp');
        this.set('output.sourceMapFilename', '[file].map[query]');
        this.set('output.publicPath', '/');
        this.set("output.path", process.cwd());
        this.set('output.hashFunction', 'md5');
        this.set('output.hashDigest', 'hex');
        this.set('output.hotUpdateChunkFilename', '[id].[hash].hot-update.js');
        this.set('output.hotUpdateMainFilename', '[hash].hot-update.json');
        this.set('output.hotUpdateFunction', 'webpackHotUpdate');
        this.set("node", "call", (value: any) => {
            if(typeof value === "boolean") {
                return value;
            } else {
                return Object.assign({}, value);
            }
        });
        this.set("node.console", false);
    }


    setProperty(obj: any, keyname: string, value: any) {
        var name = keyname.split('.');
        for (let i = 0; i < name.length - 1; i++) {
            if (!obj[name[i]]) {
                obj[name[i]] = {};
            }
            obj = obj[name[i]];
        }
        obj[name.pop() as string] = value;
    }

    getProperty(obj: any, keyname: string) {
        var name = keyname.split('.');
        for (let i = 0; i < name.length - 1; i++) {
            obj = obj[name[i]];
            if (typeof obj !== 'object') {
                return
            }
        }
        return obj[name.pop() as string];
    }


    process(options: WebpackOptions): WebpackOptions{
        options = Object.assign({}, options);
        for (let name in this.defaults) {
            const config = this.config[name];
            switch (config) { 
                case undefined: // 当config的值为undefined并且options上未定义时才会使用默认值
                    if (this.getProperty(options, name) === undefined) {
                        this.setProperty(options, name, this.defaults[name]);
                    }
                    break;
                case 'call': // 当config的值为call时
                    this.setProperty(options, name, this.defaults[name].call(this, this.getProperty(options, name)))
                    break;
                default:
                    throw new Error('OptionsDefaulter error')
            }
        }

        return options
    }

    set(name: string, config: any, def?: any) {
        if (arguments.length === 3) {
            this.config[name] = config;
            this.defaults[name] = def;
        } else {
            this.defaults[name] = config;
        }
    }
}