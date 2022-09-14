import { InvalidTypeException } from "../models/exceptions/InvalidTypeException.js";

export class TypeValidator {
  validateNameShouldBeString(name) {
    if (typeof name !== "string") {
      throw new InvalidTypeException(`Name must be a string`);
    }
    return;
  }

  validateUserIdShouldBeANumber(userId) {
    if (typeof userId !== "number") {
      throw new InvalidTypeException(`UserId must be a number`);
    }
    return;
  }

  validateIndexShouldBeANumber(userId) {
    if (typeof userId !== "number") {
      throw new InvalidTypeException(`Index must be a number`);
    }
    return;
  }

  validateTypeValidatorShouldBeATypeValidator(typeValidator) {
    if (typeValidator instanceof TypeValidator !== true) {
      throw new InvalidTypeException(
        "TypeValidator must be an instance of TypeValidator class"
      );
    }
    return;
  }
}
