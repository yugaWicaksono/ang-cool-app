import { createConnection } from "typeorm";

export const testConn = (drop: boolean = false) => {
  return createConnection({
    name: "test",
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "admin",
    password: "supersecret2019password",
    database: "angular_cool_test",
    synchronize: drop,
    dropSchema: drop,
    logging: true,
    multipleStatements: true,
    entities: [__dirname + "/../entities/*.*"]
  });
};
