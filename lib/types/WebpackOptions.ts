import {WebpackPlugin} from '../tapable'

interface DevServerOpts {

}

interface EntryOpts {

}

interface Module {
    rules: any[]
}

export interface OutputOpts {
    path: string            // bundle输出的目录
    filename: string        // 输出的文件名
    /**TODO 这里后期需要去掉一个 */
    fileName: string        // 输出的文件名 
}

export interface WebpackOptions {
    context?: string
    devServer?: DevServerOpts
    devtool?: boolean
    entry?: EntryOpts
    module?: Module
    node?: any
    output?: OutputOpts
    plugins?: WebpackPlugin[]
    resolve?: any
    resolveLoader?: any
}