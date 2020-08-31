import Watchpack from 'watchpack'

export default class NodeWatchFileSystem {
    inputFileSystem: any 
    watcher: Watchpack

    constructor(inputFileSystem: any) {
        this.inputFileSystem = inputFileSystem;
        this.watcher = new Watchpack({
            aggregateTimeout: 0
        });
    }

    watch(files: any, dirs: any, missing:any, startTime: any, options: any, callback: any) {
        const oldWatcher = this.watcher;
        this.watcher = new Watchpack(options);
        this.watcher.watch(files.concat(missing), dirs.concat(missing), startTime);
        this.watcher.once('aggregated', changes => {
            if (this.inputFileSystem && this.inputFileSystem.purge) {
                this.inputFileSystem.purge(changes);
            }
            callback(changes)
        });

        if (oldWatcher) {
            oldWatcher.close();
        }
    }
}