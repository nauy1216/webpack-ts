import Compiler from '../Compiler'
import NodeJsInputFileSystem from 'enhanced-resolve/lib/NodeJsInputFileSystem'
import CachedInputFileSystem from 'enhanced-resolve/lib/CachedInputFileSystem'
import NodeOutputFileSystem from './NodeOutputFileSystem'
import NodeWatchFileSystem from './NodeWatchFileSystem'

export default class NodeEnviromentPlugin {
    apply(compiler: Compiler) {
        compiler.inputFileSystem = new CachedInputFileSystem(new NodeJsInputFileSystem(), 60000);
        compiler.outputFileSystem = new NodeOutputFileSystem();
        compiler.watchFileSystem=new NodeWatchFileSystem(compiler.inputFileSystem);
    }
}