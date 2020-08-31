import Compiler from './Compiler'
import {WebpackOptions} from './types/WebpackOptions'
import WebpackOptionsDefaulter from './WebpackOptionsDefaulter'
// const WebpackOptionsApply = require('./WebpackOptionsApply');
// const WebpackOptionsDefaulter = require('./WebpackOptionsDefaulter');
// const validateSchema = require('./validateSchema');

export default function webpack(options: WebpackOptions) {
    debugger
    // 创建编译器对象
    const compiler = new Compiler();
    // 处理options
    options = new WebpackOptionsDefaulter().process(options);
    // 编译器的上下文，
    compiler.context = options.context!;
    compiler.options = options;
    // new WebpackOptionsApply().process(options, compiler);
    return compiler
}

// function exportPlugins(obj, mapping) {
//     Object.keys(mapping).forEach(key => {
//         Object.defineProperty(obj, key, {
//             configurable: false,
//             enumerable: true,
//             get: mapping[key],
//         })
//     })
// }

// exportPlugins(exports, {
//     "SourceMapDevToolPlugin": () => require("./SourceMapDevToolPlugin"),
//     "HotModuleReplacementPlugin": () => require("./HotModuleReplacementPlugin")
// });

// webpack.validateSchema = validateSchema;