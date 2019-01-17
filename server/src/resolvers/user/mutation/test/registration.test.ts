import { testConn } from "../../../../test-utils/testConn";
import { Connection } from "typeorm";
import { gCall } from "../../../../test-utils/gCall";

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const registrationMutation = `
mutation Registration ($userData:RegisterInput!){
	registration(userData:$userData){
    id
    firstName
    lastName
    age
    email
    name
  }
}
`;

describe("Registration", () => {
  it("create user", async () => {
    console.log(
      await gCall({
        source: registrationMutation,
        variableValues: {
          userData: {
            firstName: "momo",
            lastName: "dahyun",
            email: "momo@dahyun.com",
            age: 20,
            password: "blbbjbabala"
          }
        }
      })
    );
  });
});
