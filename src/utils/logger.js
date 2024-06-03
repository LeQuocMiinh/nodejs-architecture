const winston = require('winston');
const { format } = winston;
const { colorize, combine, printf, label } = format;

const config = {
    levels: {
        error: 0,
        warn: 1,
        ok: 2,
        info: 3,
        network: 4,
        joi: 5,
        debug: 5,
        verbose: 6
    },
    colors: {
        error: 'red',
        warn: 'magenta',
        ok: 'green',
        info: 'cyan',
        network: 'yellow',
        joi: 'bold white blueBG',
        debug: 'grey',
        verbose: 'grey'
    }
};

winston.addColors(config.colors);

const logger = fileName => {
    const myFormat = printf(({ level, message, label }) => {
        return `[${level}] ${message} (in ./${label})`;
    });

    return winston.createLogger({
        levels: config.levels,
        format: combine(
            colorize({
                all: true
            }),
            label({ label: fileName }),
            myFormat
        ),
        transports: [
            new winston.transports.Console({
                level: 'debug',
                prettyPrint: true
            })
        ]
    });
};

module.exports = logger;
