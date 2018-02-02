
export interface 服务器 {
    listen: (p: number) => any
}
export interface 进程 {
    on(事件: string, 监听: (代码: number) => void):void
}


export interface System {
    新行: string;
    读文件(path: string, 不解码?: boolean): string | Buffer | undefined;
    写文件(path: string, data: string, writeByteOrderMark?: boolean): void;
    追写文件(path: string, data: string | Buffer): void;
    文件存在(path: string): boolean;
    目录存在(path: string): boolean;
    创建目录(path: string): void;
    解析路径(path: string): string
    结合路径(...path: string[]): string
    临时目录(): string
    创建服务(): 服务器
    创建子进程(命令: string, 参数: string[]): 进程
}

export let 系统: System = (function () {
    function getNodeSystem(): System {
        const _fs = require("fs")
        const _path = require("path")
        const _os = require("os")
        const _net = require("net")
        const _cp = require("child_process")
        function 读文件(fileName: string, 不解码 = false): string | undefined {
            if (!文件存在(fileName)) {
                return undefined;
            }
            const buffer = _fs.readFileSync(fileName);
            if (不解码) return buffer
            let len = buffer.length;
            if (len >= 2 && buffer[0] === 0xFE && buffer[1] === 0xFF) {
                // Big endian UTF-16 byte order mark detected. Since big endian is not supported by node.js,
                // flip all byte pairs and treat as little endian.
                len &= ~1; // Round down to a multiple of 2
                for (let i = 0; i < len; i += 2) {
                    const temp = buffer[i];
                    buffer[i] = buffer[i + 1];
                    buffer[i + 1] = temp;
                }
                return buffer.toString("utf16le", 2);
            }
            if (len >= 2 && buffer[0] === 0xFF && buffer[1] === 0xFE) {
                // Little endian UTF-16 byte order mark detected
                return buffer.toString("utf16le", 2);
            }
            if (len >= 3 && buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
                // UTF-8 byte order mark detected
                return buffer.toString("utf8", 3);
            }
            // Default is UTF-8 with no byte order mark
            return buffer.toString("utf8");
        }

        function 写文件(fileName: string, data: string, writeByteOrderMark?: boolean): void {
            // If a BOM is required, emit one
            if (writeByteOrderMark) {
                data = "\uFEFF" + data;
            }

            let fd: number;

            try {
                fd = _fs.openSync(fileName, "w");
                _fs.writeSync(fd, data, /*position*/ undefined, "utf8");
            }
            finally {
                if (fd !== undefined) {
                    _fs.closeSync(fd);
                }
            }
        }

        const enum FileSystemEntryKind {
            File,
            Directory
        }

        function 文件系统条目存在(path: string, entryKind: FileSystemEntryKind): boolean {
            try {
                const stat = _fs.statSync(path);
                switch (entryKind) {
                    case FileSystemEntryKind.File: return stat.isFile();
                    case FileSystemEntryKind.Directory: return stat.isDirectory();
                }
            }
            catch (e) {
                return false;
            }
        }

        function 文件存在(path: string): boolean {
            return 文件系统条目存在(path, FileSystemEntryKind.File);
        }

        function 目录存在(path: string): boolean {
            return 文件系统条目存在(path, FileSystemEntryKind.Directory);
        }
        function 追写文件(path: string, data: string | Buffer) {
            _fs.appendFileSync(path, data)
        }
        function 创建目录(directoryName: string) {
            if (!nodeSystem.目录存在(directoryName)) {
                _fs.mkdirSync(directoryName);
            }
        }
        function 创建子进程(命令: string, 参数: string[]): 进程 {
            return _cp.spawn(命令, 参数, {
                detached: true
            })
        }

        const nodeSystem: System = {
            新行: _os.EOL,
            读文件,
            写文件,
            追写文件,
            文件存在,
            目录存在,
            创建服务: _net.createServer,
            结合路径: (...path: string[]) => _path.join(...path),
            解析路径: path => _path.resolve(__dirname, path),
            临时目录: _os.tmpdir,
            创建子进程,
            创建目录,
        };
        return nodeSystem;
    }

    let sys: System;
    if (typeof process !== "undefined" && process.nextTick && typeof require !== "undefined") {
        sys = getNodeSystem();
    }
    return sys;

})();
