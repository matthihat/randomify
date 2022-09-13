import { IdGenerator } from "./utils/id-generator.js";
import { UserRegistry } from "./utils/user-registry.js";
import { TypeValidator } from "./validators/type-validator.js";
import { User } from "./models/user.js";

export default class UserRandomizer {
  #idGenerator = new IdGenerator();
  #typeValidator = new TypeValidator();
  #userRegistry = new UserRegistry(this.#idGenerator, this.#typeValidator);
  #shouldRemoveUserWhenChosen = false;

  constructor() {}

  addUser(name) {
    this.#userRegistry.createUser(name);
  }

  /**
   * Adds a user using the provided user id and name.
   *
   * @param {string} userId  - The users' id.
   * @param {string} name - The users' name.
   * @throws {IllegalIdException} - Error if id is not unique.
   */
  addUserWith(userId, name) {
    this.#userRegistry.createUserWith(userId, name);
  }

  /**
   * You can use this function if you want the user to be removed when selected by the getRandomUser-function.
   *
   * @param {boolean} shouldRemove - Sets whether a user should be remover or not if is picked by the randomizer.
   */
  shouldRemoveUserWhenChosen(shouldRemove) {
    this.#shouldRemoveUserWhenChosen = shouldRemove;
  }

  /**
   * Returns the execution mode, whether the user should be removed when picked by the getRandomUser-function. Default value is false.
   *
   * @returns {boolean} - A boolean indicating if the user should be removed when picked by the getRandomUser-function.
   */
  getExecutionMode() {
    return this.#shouldRemoveUserWhenChosen;
  }

  /**
   * Randomly selects a user.
   *
   * @throws {NotFoundException} - If no user was to be found.
   * @returns {User} - The user that was randomly picked.
   */
  getRandomUser() {
    const nrOfUsers = this.#userRegistry.getNrOfUsers();
    if (nrOfUsers === 0) {
      return null;
    }

    const randomIndex = this.#getRandomInt(nrOfUsers);
    const user = this.#userRegistry.findUserByIndex(randomIndex);

    if (this.#shouldRemoveUserWhenChosen) {
      this.#userRegistry.removeUserByIndex(randomIndex);
    }
    return user;
  }

  #getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
}
