import mongoose from 'mongoose';
import app from './app';
import Configs from './app/configs';
import { Loggers } from './winston/winston.logger';
import { Server } from 'node:http';

process.on('uncaughtException', (error) => {
  Loggers.errorLogger.error('uncaught exception is detected!');
  Loggers.errorLogger.error(error.message);
  process.exit(1);
});
// console.log(x);

let server: Server;
async function main() {
  try {
    await mongoose.connect(Configs.dbUrl!);
    Loggers.infoLogger.info('db connected!');
    server = app.listen(Configs.port, () =>
      Loggers.infoLogger.info(`server started ${Configs.port}`),
    );
  } catch (error) {
    if (error instanceof Error) {
      Loggers.errorLogger.error(error.message);
    }
  }

  process.on('unhandledRejection', (error) => {
    if (error instanceof Error) {
      Loggers.errorLogger.error(error.message);
    }
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

process.on('SIGTERM', () => {
  Loggers.infoLogger.info('sigterm received closing server');
  if (server) {
    server.close();
  }
});
main().catch((err) => Loggers.errorLogger.error(err));
