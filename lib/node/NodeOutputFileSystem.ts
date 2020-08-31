import mkdirp from 'mkdirp'
import fs from 'fs'
import path from 'path'

export default class NodeOutputFileSystem {
    mkdirp: any
    mkdir: Function
    rmdir: Function
    join: Function
    writeFile: Function
    constructor() {
        this.mkdirp = mkdirp;
        this.mkdir = fs.mkdir.bind(fs);
        this.rmdir = fs.rmdir.bind(fs);
        this.join = path.join.bind(path);
        this.writeFile = fs.writeFile.bind(fs);
    }
}
