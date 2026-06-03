import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool;

export const connectDB = async () => {

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });

  const DB_NAME = process.env.DB_NAME;

  await conn.query(
    `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``
  );

  await conn.end();

  pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
  });

  console.log("Pool Created");

  return pool;
};

export { pool };