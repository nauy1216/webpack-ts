import {WebpackPlugin} from '../tapable'

interface DevServerOpts {

}

interface EntryOpts {

}

interface Module {

}

export interface OutputOpts {

}

export interface WebpackOptions {
    context?: string
    devServer?: DevServerOpts
    evtool?: boolean
    entry?: EntryOpts
    module?: Module
    node?: any
    output?: OutputOpts
    plugins?: WebpackPlugin[]
    resolve?: any
    resolveLoader?: any
}