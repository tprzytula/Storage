import { Signer } from "@aws-sdk/rds-signer";
import mysql, { ConnectionOptions } from "mysql2/promise";
import { CallProcedureFn } from "./types";

const DATABASE_HOST = "tprzytula.c9d131dccpig.eu-west-2.rds.amazonaws.com";
const DATABASE_PORT = 3306;
const REGION = "eu-west-2";
const USERNAME = "rds_storage_read_write";

const signer = new Signer({
  region: REGION,
  hostname: DATABASE_HOST,
  port: DATABASE_PORT,
  username: USERNAME,
});

const options: ConnectionOptions = {
  host: DATABASE_HOST,
  user: USERNAME,
  database: "chat",
  ssl: "Amazon RDS",
  multipleStatements: true,
};

const createConnection = async () => {
  const password = await signer.getAuthToken();
  const connection = await mysql.createConnection({
    ...options,
    password,
  });

  await connection.connect();

  return connection;
};

const buildProcedureParameters = (...params: any[]) => {
  if (params.length === 0) {
    return "";
  }

  return params.join(", ");
};

export const callProcedure: CallProcedureFn = async (name, ...params) => {
  const connection = await createConnection();
  const parameters = buildProcedureParameters(...params);
  const sql = `CALL ${name}(${parameters})`;
  const [results] = await connection.query(sql);

  connection.end();

  return results;
};
