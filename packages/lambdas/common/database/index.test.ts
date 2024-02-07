import { describe, expect, jest, test } from "@jest/globals";
import { callProcedure } from "./index";
import mysql from "mysql2/promise";

jest.mock("@aws-sdk/rds-signer", () => ({
  Signer: jest.fn().mockReturnValue({
    getAuthToken: jest.fn().mockReturnValue("auth-token"),
  }),
}));

jest.mock("mysql2/promise", () => ({
  ...(jest.requireActual("mysql2/promise") as any),
  __esModule: true,
  default: {
    createConnection: jest.fn().mockReturnValue({
      connect: jest.fn(),
      end: jest.fn(),
      query: jest.fn().mockReturnValue([]),
    }),
  },
}));

describe("Given the callProcedure", () => {
  test("it should create a database connection", async () => {
    const createConnectionSpy = jest.spyOn(mysql, "createConnection");

    await callProcedure("procedure-name", "param1", "param2");

    expect(createConnectionSpy).toHaveBeenCalledWith({
      database: "chat",
      host: "tprzytula.c9d131dccpig.eu-west-2.rds.amazonaws.com",
      multipleStatements: true,
      password: "auth-token",
      ssl: "Amazon RDS",
      user: "rds_storage_read_write",
    });
  });

  test("it should connect to the database", async () => {
    const connectMock = jest.fn();

    (mysql.createConnection as jest.Mock).mockReturnValue({
      connect: connectMock,
      end: jest.fn(),
      query: jest.fn().mockReturnValue([]),
    });

    await callProcedure("procedure-name", "param1");

    expect(connectMock).toBeCalled();
  });

  test("it should correctly call the stored procedure", async () => {
    const queryMock = jest.fn().mockReturnValue([]);

    (mysql.createConnection as jest.Mock).mockReturnValue({
      connect: jest.fn(),
      end: jest.fn(),
      query: queryMock,
    });

    await callProcedure("procedure-name", "param1", "param2", "param3");

    expect(queryMock).toHaveBeenCalledWith(
      "CALL procedure-name(param1, param2, param3)"
    );
  });

  test("it should return the result", async () => {
    const queryMock = jest.fn().mockReturnValue(["meow"]);

    (mysql.createConnection as jest.Mock).mockReturnValue({
      connect: jest.fn(),
      end: jest.fn(),
      query: queryMock,
    });

    const result = await callProcedure(
      "procedure-name",
      "param1",
      "param2",
      "param3"
    );

    expect(result).toBe("meow");
  });

  test("it should end the connection", async () => {
    const endMock = jest.fn();

    (mysql.createConnection as jest.Mock).mockReturnValue({
      connect: jest.fn(),
      end: endMock,
      query: jest.fn().mockReturnValue([]),
    });

    await callProcedure("procedure-name", "param1");

    expect(endMock).toBeCalled();
  });
});
