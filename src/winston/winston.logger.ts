import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'node:path';
import configs from '../app/configs';
const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  const dateObj = new Date(timestamp);
  const dateFormat = `[📆${dateObj.toLocaleString('en-US', {
    month: 'short',
  })}-${dateObj.getDate()}-${dateObj.getFullYear()}]--[⌚${dateObj.toLocaleString(
    'en-US',
    {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    },
  )}]`;

  return `${dateFormat}--[${level}]: ${message}\n`;
});

const infoLoggerTransport: DailyRotateFile = new DailyRotateFile({
  filename: path.join(process.cwd(), 'logs', 'successes', 'success-%DATE%.log'),
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});
const errorLoggerTransport: DailyRotateFile = new DailyRotateFile({
  filename: path.join(process.cwd(), 'logs', 'errors', 'errors-%DATE%.log'),
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const infoLogger = createLogger({
  format: combine(timestamp(), colorize(), myFormat),
  transports: [],
});

const errorLogger = createLogger({
  format: combine(timestamp(), colorize(), myFormat),
  transports: [],
});
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (configs.env === 'production') {
  infoLogger.add(infoLoggerTransport);
  errorLogger.add(errorLoggerTransport);
} else {
  infoLogger.add(new transports.Console({ format: myFormat }));
  errorLogger.add(new transports.Console({ format: myFormat }));
}
export const Loggers = {
  infoLogger,
  errorLogger,
};
