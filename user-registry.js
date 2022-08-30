import { User } from "./models/user";
import { IdGenerator } from "./id-generator";

export class UserRegistry {
  #users;
  #idGenerator;

  constructor(idGenerator) {
    this.#idGenerator = idGenerator;
  }

  createUser(name) {
    const id = this.#idGenerator.generateId();
    const user = new User(name, id);
    this.#users.push(user);
  }

  /*     removeUser(User) {
        this.#users.
    } */
}
