import dotEnv from "dotenv";
import path from "path";

dotEnv.config({ path: path.join(process.cwd(), ".env") });

const Configs = {
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
};

export default Configs;
