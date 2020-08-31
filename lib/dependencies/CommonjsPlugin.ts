// const CommonjsRequireDependencyParserPlugin = require('./CommonjsRequireDependencyParserPlugin');
// const RequireEnsureBlockDependencyParserPlugin = require('./RequireEnsureBlockDependencyParserPlugin');
// const CommonjsRequireDependency = require('./CommonjsRequireDependency');
// const RequireHeaderDependency = require('./RequireHeaderDependency');
// const AbstractPlugin = require('../AbstractPlugin');

// import Compiler from '../Compiler'

// class CommonjsPlugin extends AbstractPlugin {
//     constructor(props: any) {
//         super(props);
//     }

//     apply(compiler: Compiler) {
//         compiler.plugin('compilation', function (compilation, params) {
//             const {nullFactory,normalModuleFactory} = params;
//             compilation.dependencyTemplates.set(CommonjsRequireDependency, new CommonjsRequireDependency.Template())
//             compilation.dependencyFactories.set(CommonjsRequireDependency, normalModuleFactory); // 模块创建工厂
//             compilation.dependencyFactories.set(RequireHeaderDependency, nullFactory);
//             compilation.dependencyTemplates.set(RequireHeaderDependency, new RequireHeaderDependency.Template())

//         });
//         compiler.parser.apply(new CommonjsRequireDependencyParserPlugin()); // 给parser安装插件
//         compiler.parser.apply(new RequireEnsureBlockDependencyParserPlugin());
//     }
// }

// module.exports = CommonjsPlugin;