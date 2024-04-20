import { createPool, Pool } from "mysql2/promise";

export let pool: Pool | null = null;

export const connectMySQL = () => {
  try {
    pool = createPool({
      connectionLimit: 10,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.RDS_PORT!, 10),
    });
    console.log("MySQL Connected");
  } catch (e) {
    console.log(e);
  }
};
