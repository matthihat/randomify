import { NotFoundException } from "./models/exceptions/NotFoundException.js";
import { User } from "./models/user.js";
import { IdValidator } from "./validators/id-validator.js";

export class UserRegistry {
  #users = [];
  #idGenerator;

  constructor(idGenerator) {
    this.#idGenerator = idGenerator;
  }

  /**
   *
   * @param {string} name - The users' name.
   */
  createUser(name) {
    const id = this.#idGenerator.generateId();
    const user = new User(name, id);
    this.#users.push(user);
  }

  /**
   *
   * @param {string} userId  - The users' id.
   * @param {string} name - The users' name.
   * @throws {IllegalIdException} - Error if id is not unique.
   */
  createUserWith(userId, name) {
    // Throws error if id is not unique in array
    IdValidator.validateUniqueIdIn(this.#users, name);
    const user = new User(name, userId);
    this.#users.push(user);
  }

  removeUserBy(userId) {
    this.#users = this.#users.filter((user) => user.id !== userId);
  }

  removeUserByIndex(index) {
    // Kanske kastar fel??
    this.#users = this.#users.splice(index, 1);
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
    const user = this.#users.find((user) => user.userId === userId);
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
    const user = this.#users[index];
    if (!user) {
      throw new NotFoundException("User does not exist");
    }
    return user;
  }
}
