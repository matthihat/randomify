import { IdGenerator } from "../../src/id-generator.js";
import { IllegalIdException } from "../../src/models/exceptions/IllegalIdException.js";
import { UserRegistry } from "../../src/user-registry.js";

var userRegistry;
const idGenerator = new IdGenerator();

beforeEach(() => {
  userRegistry = new UserRegistry(idGenerator);
});

describe("User registry tests", () => {
  it("Should add user to list of users", () => {
    userRegistry.createUser("namn");

    expect(userRegistry.getNrOfUsers()).toEqual(1);
  });

  it("Should add users with unique id's to list of users", () => {
    userRegistry.createUser("anv1");
    userRegistry.createUser("anv2");
    const userOne = userRegistry.findUserByIndex(0);
    const userTwo = userRegistry.findUserByIndex(1);

    expect(userRegistry.getNrOfUsers()).toEqual(2);
    expect(userOne.id).toEqual(1);
    expect(userTwo.id).toEqual(2);
  });

  it("Should add user to list with provided id", () => {
    userRegistry.createUserWith(1, "anv1");
    const userOne = userRegistry.findUserByIndex(0);

    expect(userOne.id).toEqual(1);
  });

  it("Should throw error when adding a user with id that already exists", () => {
    userRegistry.createUserWith(1, "anv1");

    expect(() => {
      userRegistry.createUserWith(1, "anv2");
    }).toThrow(new IllegalIdException("Id already exists"));
    expect(userRegistry.getNrOfUsers()).toEqual(1);
  });

  it("Should remove user by given id", () => {
    userRegistry.createUserWith(1, "anv1");
    userRegistry.removeUserBy(1);

    expect(userRegistry.getNrOfUsers()).toEqual(0);
  });
});
