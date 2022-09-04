import { IdGenerator } from "../../src/id-generator.js";
import { IllegalIdException } from "../../src/models/exceptions/IllegalIdException.js";
import { NotFoundException } from "../../src/models/exceptions/NotFoundException.js";
import { UserRegistry } from "../../src/user-registry.js";

var sut;

beforeEach(() => {
  const idGenerator = new IdGenerator();
  sut = new UserRegistry(idGenerator);
});

describe("User registry tests", () => {
  it("Should add user to list of users", () => {
    sut.createUser("namn");

    expect(sut.getNrOfUsers()).toEqual(1);
  });

  it("Should add users with unique id's to list of users", () => {
    sut.createUser("anv1");
    sut.createUser("anv2");
    const userOne = sut.findUserByIndex(0);
    const userTwo = sut.findUserByIndex(1);

    expect(sut.getNrOfUsers()).toEqual(2);
    expect(userOne.id).toEqual(0);
    expect(userTwo.id).toEqual(1);
  });

  it("Should add user to list with provided id", () => {
    sut.createUserWith(1, "anv1");
    const userOne = sut.findUserByIndex(0);

    expect(userOne.id).toEqual(1);
  });

  it("Should throw error when adding a user with id that already exists", () => {
    sut.createUserWith(1, "anv1");

    expect(() => {
      sut.createUserWith(1, "anv2");
    }).toThrow(new IllegalIdException("Id already exists"));
    expect(sut.getNrOfUsers()).toEqual(1);
  });

  it("Should remove user by given id", () => {
    sut.createUserWith(1, "anv1");
    sut.removeUserBy(1);

    expect(sut.getNrOfUsers()).toEqual(0);
  });

  it("Should throw error when removing a user with an id that does not exist", () => {
    expect(() => {
      sut.removeUserBy(1);
    }).toThrow(new NotFoundException("User does not exist"));
  });

  it("Should remove user by given index", () => {
    sut.createUser("anv1");
    sut.removeUserByIndex(0);

    expect(sut.getNrOfUsers()).toEqual(0);
  });

  it("Should throw error when removing user at index which does not exist", () => {
    expect(() => {
      sut.removeUserByIndex(1);
    }).toThrow(new NotFoundException("User does not exist"));
  });

  it("Should return the number of users", () => {
    sut.createUser("anv1");

    expect(sut.getNrOfUsers()).toEqual(1);
  });

  it("Should find user by id", () => {
    sut.createUserWith(1, "anv1");
    const user = sut.findUserById(1);

    expect(user.id).toBe(1);
    expect(user.name).toBe("anv1");
  });

  it("Should throw error when id of user does not exist", () => {
    expect(() => {
      sut.findUserById(1);
    }).toThrow(new NotFoundException("User does not exist"));
  });

  it("Should find user by index", () => {
    sut.createUserWith(1, "anv1");
    const user = sut.findUserByIndex(0);

    expect(user.id).toBe(1);
    expect(user.name).toBe("anv1");
  });

  it("Should throw error when user at the provided index does not exist", () => {
    expect(() => {
      sut.findUserByIndex(0);
    }).toThrow(new NotFoundException("User does not exist"));
  });
});
