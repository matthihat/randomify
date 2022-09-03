import { IdGenerator } from "../../src/id-generator.js";
import { UserRegistry } from "../../src/user-registry.js";

var userRegistry;
const idGenerator = new IdGenerator();

beforeEach(() => {
  userRegistry = new UserRegistry(idGenerator);
});

describe("User registry tests", () => {
  it("Should add user", () => {
    userRegistry.createUser("namn");

    expect(userRegistry.getNrOfUsers()).toEqual(1);
  });
});
