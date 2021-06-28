const winston = require('winston');
module.exports.logger = winston.createLogger({
    'transports': [
        new winston.transports.File({
            level:'info',
            filename:'./logs/info.log',
            json:true,
            format:winston.format.combine(winston.format.timestamp(),winston.format.json())
        }),
        new winston.transports.File({
            level:'error',
            filename:'./logs/error.log',
            json:true,
            format:winston.format.combine(winston.format.timestamp(),winston.format.json())
        })
    ]
});