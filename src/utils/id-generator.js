export class IdGenerator {
  #value = -1;

  generateId() {
    this.#value++;
    return this.#value;
  }
}
