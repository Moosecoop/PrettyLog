const chalk = require('chalk');
const moment = require('moment');
const { inspect } = require('util');

module.exports = class Logger {
    static log(...args) {
        this._log(0, ...args);
    }

    static info(...args) {
        this._log(1, ...args);
    }

    static debug(...args) {
        this._log(2, ...args);
    }

    static warn(...args) {
        this._log(3, ...args);
    }

    static error(...args) {
        this._log(4, ...args);
    }
    
    static _log(level, ...args) {
        const texts = this._cleanArgs(args);

        const time = chalk.cyan(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`);
        const tag = chalk.bold(`[${this.LogLevel(level)}]:`);
        const colored = chalk[this.LogColor(level)](texts);

        if (level == 4) return process.stderr.write(`${time} ${tag} ${colored}\n`);
        process.stdout.write(`${time} ${tag} ${colored}\n`);
    }
    
    static _cleanArgs(args) {
        const texts = [];

        for (const arg of args) {
            if (typeof arg == 'string') {
                texts.push(arg);
                continue;
            }
            texts.push(inspect(arg));
        }
        return texts.join(' ');
    }
    
    static logLevel(level) {
        return ['Log', 'Status', 'Debug', 'Error'][level];
    }
    
    static logColor(level) {
        return ['grey', 'green', 'yellow', 'red'][level];
    }
}
