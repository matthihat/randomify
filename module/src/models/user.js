export class User {
  #id;
  #name;

  constructor(name, id) {
    this.#name = name;
    this.#id = id;
    Object.freeze(this);
  }

  get name() {
    return this.#name;
  }

  get id() {
    return this.#id;
  }
}
