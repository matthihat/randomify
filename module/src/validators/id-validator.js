import { IllegalIdException } from "../models/exceptions/IllegalIdException.js";

export class IdValidator {
  static validateUniqueIdIn(usersArray, id) {
    const alreadyExists = usersArray.some((user) => user.id === id);
    if (alreadyExists) {
      throw new IllegalIdException("Id already exists");
    }
    return;
  }
}
