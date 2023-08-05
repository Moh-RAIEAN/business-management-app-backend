import dotEnv from 'dotenv';
import path from 'path';

dotEnv.config({ path: path.join(process.cwd(), '.env') });

const Configs = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  env: process.env.NODE_ENV,
  adminId: process.env.ADMIN_ID,
};

export default Configs;
