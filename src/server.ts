import mongoose from 'mongoose';
import app from './app';
import Configs from './app/configs';
import { Loggers } from './winston/winston.logger';

async function main() {
  await mongoose.connect(Configs.dbUrl!);
  Loggers.infoLogger.info('db connected!');
  app.listen(Configs.port, () => Loggers.infoLogger.info(`server started ${Configs.port}`));
}

main().catch((err) => Loggers.errorLogger.error(err));
