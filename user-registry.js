import { User } from "./models/user";
import { IdValidator } from "./validators/id-validator";

export class UserRegistry {
  #users;
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
    return this.#users.length();
  }

  /**
   *
   * @param {*} userId
   * @returns
   */
  findUserById(userId) {
    return this.#users.find((user) => user.userId === userId);
  }

  findUserByIndex() {}
}
