import { IdGenerator } from "./id-generator";
import { UserRegistry } from "./user-registry";

export class Randomizer {
  #idGenerator = IdGenerator();
  #userRegistry = new UserRegistry(this.#idGenerator);

  constructor() {}

addUser(name) {}

  shouldRemoveUserWhenChosen(boolean) {}

  getRandomUser()
}
