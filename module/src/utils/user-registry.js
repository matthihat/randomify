import { InvalidTypeException } from "../models/exceptions/InvalidTypeException.js";
import { NotFoundException } from "../models/exceptions/NotFoundException.js";
import { User } from "../models/user.js";
import { IdValidator } from "../validators/id-validator.js";
import { TypeValidator } from "../validators/type-validator.js";
import { IdGenerator } from "./id-generator.js";

export class UserRegistry {
  #users = [];
  #idGenerator;
  #typeValidator;

  constructor(idGenerator, typeValidator) {
    this.#validateIdGenerator(idGenerator);
    this.#validateTypeValidator(typeValidator);

    this.#idGenerator = idGenerator;
    this.#typeValidator = typeValidator;
  }

  /**
   *
   * @param {string} name - The users' name.
   */
  createUser(name) {
    this.#typeValidator.validateNameShouldBeString(name);
    const id = this.#idGenerator.generateId();
    const user = new User(name, id);
    this.#users.push(user);
  }

  /**
   *
   * @param {string} userId  - The users' id.
   * @param {string} name - The users' name.
   * @throws {IllegalIdException, InvalidTypeException} - Error if id is not unique or if types are incompatible.
   */
  createUserWith(userId, name) {
    // this.#typeValidator.validateUserIdShouldBeANumber(userId);
    this.#typeValidator.validateNameShouldBeString(name);

    // Throws error if id is not unique in array
    IdValidator.validateUniqueIdIn(this.#users, userId);
    const user = new User(name, userId);
    this.#users.push(user);
  }

  /**
   * Removes a user by the given id.
   *
   * @param {number} userId - The id of the user to remove.
   * @throws {NotFoundException} - If no user with the given id was found.
   */
  removeUserBy(userId) {
    this.#typeValidator.validateUserIdShouldBeANumber(userId);

    const userExists = this.#users.some((user) => user.id === userId);
    if (!userExists) {
      throw new NotFoundException("User does not exist");
    }
    this.#users = this.#users.filter((user) => user.id !== userId);
  }

  /**
   * Removes a user by the given index.
   *
   * @param {number} userId - The index of the user to remove.
   * @throws {NotFoundException} - If no user with the given index was found.
   */
  removeUserByIndex(index) {
    this.#typeValidator.validateIndexShouldBeANumber(index);

    const userToRemove = this.#users[index];
    if (!userToRemove) {
      throw new NotFoundException("User does not exist");
    }
    this.#users = this.#users.filter((user) => user.id !== userToRemove.id);
  }

  /**
   * Returns the number of users in the registry.
   *
   * @returns {number} - The number of users.
   */
  getNrOfUsers() {
    return this.#users.length;
  }

  /**
   *
   * @param {number} userId
   * @returns {User}
   */
  findUserById(userId) {
    this.#typeValidator.validateUserIdShouldBeANumber(userId);
    const user = this.#users.find((user) => user.id === userId);
    if (!user) {
      throw new NotFoundException("User does not exist");
    }
    return user;
  }

  /**
   * Finds a user at the given index.
   *
   * @param {number} index - The index of the user to remove.
   * @throws {NotFoundException} - If no user was found.
   * @returns {User} - The user that was found.
   */
  findUserByIndex(index) {
    this.#typeValidator.validateIndexShouldBeANumber(index);
    const user = this.#users[index];
    if (!user) {
      throw new NotFoundException("User does not exist");
    }
    return user;
  }

  /**
   * Checks if the parameter is an instance of IdGenerator class.
   *
   * @param {IdGenerator} idGenerator - The IdGenerator.
   * @throws {InvalidTypeException} - If the parameter is not an instance of IdGenerator.
   * @returns {void} - If validation result is ok.
   */
  #validateIdGenerator(idGenerator) {
    if (idGenerator instanceof IdGenerator !== true) {
      throw new InvalidTypeException(
        "Id generator must be an instance of Id Generator class"
      );
    }
    return;
  }

  /**
   * Checks if the parameter is an instance of TypeValidator class.
   *
   * @param {TypeValidator} idGenerator - The TypeValidator.
   * @throws {InvalidTypeException} - If the parameter is not an instance of TypeValidator.
   * @returns {void} - If validation result is ok.
   */
  #validateTypeValidator(typeValidator) {
    if (typeValidator instanceof TypeValidator !== true) {
      throw new InvalidTypeException(
        "TypeValidator must be an instance of TypeValidator class"
      );
    }
    return;
  }
}
