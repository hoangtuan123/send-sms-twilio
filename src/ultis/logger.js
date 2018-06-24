const winston = require('winston');
const SPLAT = Symbol.for('splat');

const loggingFormat = winston.format.printf(info => {
    let strParams = '';
    if(info[SPLAT] && info[SPLAT].length){
        for(const splat of info[SPLAT]){
            strParams += JSON.stringify(splat) + ' ';
        }
    }
    return `${info.timestamp} [${process.pid}] [${info.level}]: ${info.message} ` + strParams;
});

const consoleFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.splat(),
    loggingFormat
);

const fileFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.splat(),
    loggingFormat
);

const loggers = winston.createLogger({
    level: process.env.LOG_LEVEL,
    transports: [
        new winston.transports.File({
            filename: 'log/combined.log',
            format: fileFormat
        }),
        new winston.transports.Console({
            handleExceptions: true,
            format: consoleFormat
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: 'log/exceptions.log',
            format: fileFormat
        })
    ]
});

module.exports = loggers;