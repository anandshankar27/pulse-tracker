import winston from "winston";
import fs from "fs";
import winstonDailyRotateFile from "winston-daily-rotate-file";
import { formatDate, getCurrentDate } from "./date.service.js";

let loggerInstance = null;

/**
 * Retrieves the file options for logging to a file.
 * @returns {object} - File options for logging.
 */
const getFileOptions = () => {
  const logDirectory = "./pulse-traces"; // Specify the directory path
  const logFilename = `${getCurrentDate()}-pulse-tracker.log`;

  // Create the directory if it doesn't exist
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
  }

  return {
    dirname: logDirectory,
    filename: logFilename,
  };
};

/**
 * Initializes the logger with the provided configuration.
 * @param {object} config - Logging configuration options.
 * @returns {object} - The logger instance.
 */
export const initLogger = (config) => {
  const fileOptions = getFileOptions();

  loggerInstance = winston.createLogger({
    format: winston.format.printf((info) => JSON.stringify(info.message)),
    transports: [
      config.useFileLogging
        ? new winstonDailyRotateFile(fileOptions)
        : new winston.transports.Console(),
    ],
  });

  return loggerInstance;
};

/**
 * Captures the log information and attaches necessary additional info.
 * @param {object} requestInfo - Log information to capture.
 */
export const captureLog = (requestInfo) => {
  const startHrTime = process.hrtime();

  const elapsedHrTime = process.hrtime(startHrTime);
  const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;

  const memoryUsage = process.memoryUsage();
  const usedMemoryInMb = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2);
  const totalMemoryInMb = (memoryUsage.heapTotal / 1024 / 1024).toFixed(2);

  requestInfo.dateTime = formatDate();
  requestInfo.timeUsed = `${elapsedTimeInMs.toFixed(2)} (Milliseconds)`;
  requestInfo.memoryUsed = `${usedMemoryInMb} (MBs)`;
  requestInfo.totalMemoryUsed = `${totalMemoryInMb} (MBs)`;

  if (!loggerInstance) return;

  loggerInstance.info(requestInfo);
};

export default initLogger;
