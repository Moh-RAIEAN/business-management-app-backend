import mongoose from 'mongoose';
import app from './app';
import Configs from './app/configs';

async function main() {
  await mongoose.connect(Configs.dbUrl!);
  console.log('db connected!');
  app.listen(Configs.port, () => console.log(`server started ${Configs.port}`));
}

main().catch((err) => console.log(err));
