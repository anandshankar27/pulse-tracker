const winston = require('winston');

function pulseTracker(options = {}) {
    const logger = winston.createLogger({
        format: winston.format.printf(info => JSON.stringify(info.message)),
        transports: [
            options.useFileLogging
                ? new winston.transports.File({ filename: 'pulse-tracker.log' })
                : new winston.transports.Console()
        ]
    });

    return function (req, res, next) {
        const startHrTime = process.hrtime();

        res.on('finish', () => {
            const elapsedHrTime = process.hrtime(startHrTime);
            const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;

            const memoryUsage = process.memoryUsage();
            const usedMemoryInMb = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2);
            const totalMemoryInMb = Math.round((memoryUsage.heapTotal / 1024 / 1024) * 100) / 100;

            const logData = {
                'DATETIME': formatDate(new Date()),
                URL: req.protocol + '://' + req.get('host') + req.originalUrl,
                Method: req.method,
                Status: res.statusCode,
                'Time used(ms)': elapsedTimeInMs.toFixed(2),
                'Memory used(MB)': usedMemoryInMb,
                'Total memory(MB)': totalMemoryInMb
            };

            logger.info(logData);
        });

        next();
    };
}

function formatDate(date) {
    const options = { month: 'short' };
    const day = String(date.getDate()).padStart(2, '0');
    const month = new Intl.DateTimeFormat('en-US', options).format(date);
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

module.exports = pulseTracker;