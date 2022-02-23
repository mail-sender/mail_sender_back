const winston = require('winston') ;
const winstonDaily = require('winston-daily-rotate-file');

const logDir = './logs';

const format = winston.format.combine(
    winston.format.timestamp({ format: ' YYYY-MM-DD HH:MM:SS ||' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} [ ${info.level} ] ▶ ${info.message}`,
    ),
)

const logger = winston.createLogger({
    format,
    transports: [
        // info 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir+'/info',
            filename: `%DATE%.info.log`,
            maxFiles: 30,  // 30일치 로그 파일 저장
            zippedArchive: true,
            handleExceptions: true,
        }),
        // warn 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'warn',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir+'/warn',
            filename: `%DATE%.warn.log`,
            maxFiles: 30,
            zippedArchive: true, 
            handleExceptions: true,
        }),
        // error 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir+'/error',
            filename: `%DATE%.error.log`,
            maxFiles: 30,
            zippedArchive: true,
            handleExceptions: true,
        }),
        // debug 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'debug',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir+'/debug',
            filename: `%DATE%.debug.log`,
            maxFiles: 30,
            zippedArchive: true,
            handleExceptions: true,
        }),
        // http 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'http',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir+'/http',
            filename: `%DATE%.http.log`,
            maxFiles: 30,
            zippedArchive: true,
            handleExceptions: true,
        })
    ]
});

module.exports = logger;