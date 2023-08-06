import dotEnv from 'dotenv';
import path from 'path';

dotEnv.config({ path: path.join(process.cwd(), '.env') });

const Configs = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
  env: process.env.NODE_ENV,
  adminId: process.env.ADMIN_ID,
  jwtTokenSecret: process.env.JWT_TOKEN_SECRET,
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  jwtTokenExpirationDate: process.env.JWT_TOKEN_EXPIRATION_DATE,
  jwtRefreshTokenExpirationDate: process.env.JWT_REFRESH_TOKEN_EXPIRATION_DATE,
};

export default Configs;
