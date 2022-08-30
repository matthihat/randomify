export class User {
  #id;
  #name;

  constructor(name, id) {
    this.#name = name;
    this.#id = id;
    this.freeze();
  }

  get name() {
    return this.#name;
  }

  get id() {
    return this.#id;
  }
}
