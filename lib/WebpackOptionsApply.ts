import {WebpackOptions} from './types/WebpackOptions'
import Compiler from './Compiler'
import NodeEnviromentPlugin from './node/NodeEnviromentPlugin'
class WebpackOptionsApply {
    process(options: WebpackOptions, compiler: Compiler) {
        const {context, entry, plugins, devtool} = options;
        // 编译器的上下文
        compiler.context = context!;
        // 输出路径
        compiler.outputPath = options?.output?.path!;
        // 输出配置
        compiler.outputOptions = options.output;

        // 如果有使用插件则注册插件
        if (Array.isArray(plugins)) {
            compiler.apply.apply(compiler, plugins);
        }

        if (options && options.output) {
            compiler!.outputOptions!.fileName! = options.output!.filename!.replace('[name]', '');
        }
        compiler.rules = options!.module!.rules;
        compiler.apply(new NodeEnviromentPlugin()); // 主动调用插件
        compiler.apply(new CommonjsPlugin());
        compiler.apply(new ConstPlugin());
        compiler.apply(new RequireContextPlugin(options.resolveLoader.extensions));
        compiler.apply(
            new JsonTemplatePlugin()
        );

        compiler.apply(new NodeSourcePlugin(options.node));

        compiler.resolver.normal = ResolverFactory.createResolver(Object.assign({
            fileSystem: compiler.inputFileSystem
        }, options.resolve));
        compiler.resolver.context = ResolverFactory.createResolver(Object.assign({
            fileSystem: compiler.inputFileSystem,
            resolveToContext: true
        }, options.resolve));
        compiler.resolver.loader = ResolverFactory.createResolver(Object.assign({
            fileSystem: compiler.inputFileSystem
        }, options.resolveLoader));

        let evalWarpped;
        let legacy;
        let modern;
        let noSource;
        let hidden;
        let comment;
        let inline;
        const moduleFilenameTemplate = options.output.devtoolModuleFilenameTemplate;
        if (options.devtool && (devtool.indexOf('source-map') > -1 || devtool.indexOf('sourcemap') > -1)) {
            evalWarpped = devtool.indexOf('eval') >= 0;
            legacy = devtool.indexOf('@') >= 0;
            modern = devtool.indexOf('#') >= 0;
            const cheap = options.devtool.indexOf("cheap") >= 0;
            noSource = devtool.indexOf('nosources');
            hidden = devtool.indexOf('hidden') >= 0;
            inline = devtool.indexOf('inline') >= 0;
            comment = legacy && modern ? '\n/*\n//@ sourceMappingURL=[url]\n//# sourceMappingURL=[url]\n*/' : legacy ?
                '\n/*\n//@ sourceMappingURL=[url]\n*/' : modern ? '\n//# sourceMappingURL=[url]' : null;
            let Plugin;
            if (evalWarpped) {
                Plugin = EvalSourceMapDevToolPlugin;
            } else {
                Plugin = SourceMapDevToolPlugin;
            }

            compiler.apply(new Plugin({
                append: hidden ? false : comment,
                columns: cheap ? false : true,
                noSource,
                filename: inline ? null : options.output.sourceMapFilename,
                moduleFilenameTemplate,
                fallbackModuleFilenameTemplate: options.output.devtoolFallbackModuleFilenameTemplate,
            }));

        } else if (options.devtool && devtool.indexOf('eval') > -1) {
            comment = legacy && modern ? '\n//@ sourceURL=[url]\n//# sourceURL=[url]' : legacy ? '\n//@ sourceURL=[url]'
                : modern ? '\n//# sourceURL=[url]' : null;
            compiler.apply(new EvalDevtoolModulePlugin(comment, moduleFilenameTemplate));
        }

        compiler.apply(new EntryOptionPlugin());
        compiler.apply(new TemplatedPathPlugin());
        compiler.applyPlugins('entry-option', options.context, entry);

        compiler.applyPlugins('after-resolvers');
    }
}