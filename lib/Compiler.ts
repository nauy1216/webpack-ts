import Tapable from './tapable'
import Parser from './Parser'
import Resolver from './Resolver'
import {WebpackOptions, OutputOpts} from './types/WebpackOptions'

export default class Compiler extends Tapable {
    parser: Parser
    outputFileSystem: any /**TODO */
    outputPath: string
    outputOptions: OutputOpts | undefined
    options!: WebpackOptions
    resolver: {[key: string]: Resolver}
    children: any[]
    records: any
    name: string

    constructor() {
        super()
        console.log('create Compiler')
        this.parser = new Parser();
        this.outputFileSystem = null;
        this.outputPath = '';
        this.outputOptions = this.options && this.options.output;
        this.resolver = {
            normal: new Resolver(null),
            loader: new Resolver(null),
            context: new Resolver(null)
        }
        this.children = [];
        this.options = {};
        this.records = {};
        this.name = '';
    }

    /**TODO */
    getParams() {

    }

    /**TODO */
    getStats() {
    }

    /**TODO */
    newCompilation() {
    }

    /**TODO */
    run() {
    }

    /**TODO */
    watch() {
    }

    /**TODO */
    runAsChild() {
    }

    /**TODO */
    createChildCompiler() {
    }

    /**TODO */
    compile() {
    }

    /**TODO */
    emitAssets() {
    }
}