exports.log = (content, type = "log") => {
    const timestamp = `[${Date().toString().substring(0, Date().toString().length-22)} JST]:`;
    switch (type) {
        case "log": {
            return console.log(`${timestamp} ${content} `);
        }
        case "warn": {
            return console.log(`${timestamp} ${content} `);
        }
        case "error": {
            return console.log(`${timestamp} ${content} `);
        }
        case "debug": {
            return console.log(`${timestamp} ${content} `);
        }
        case "cmd": {
            return console.log(`${timestamp} ${content}`);
        }
        case "ready": {
            return console.log(`${timestamp} ${content}`);
        }
        default: console.error("Logger type must be either warn, debug, log, ready, cmd or error.");
    }
};

exports.error = (...args) => this.log(...args, "error");

exports.warn = (...args) => this.log(...args, "warn");

exports.debug = (...args) => this.log(...args, "debug");

exports.cmd = (...args) => this.log(...args, "cmd");
