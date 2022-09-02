import { IdGenerator } from "./id-generator";
import { UserRegistry } from "./user-registry";

export class Randomizer {
  #idGenerator = IdGenerator();
  #userRegistry = new UserRegistry(this.#idGenerator);
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
  addUser(userId, name) {
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
   *
   * @returns {boolean} - A boolean indicating if the user should be removed when picked by the getRandomUser-function.
   */
  getExecutionMode() {
    return this.#shouldRemoveUserWhenChosen;
  }

  /**
   *
   * @returns
   */
  getRandomUser() {
    const nrOfUsers = this.#userRegistry.getNrOfUsers();
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
