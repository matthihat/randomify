import { IllegalIdException } from "../../../src/models/exceptions/IllegalIdException.js";
import { IdValidator } from "../../../src/validators/id-validator.js";

describe("Id-validator tests", () => {
  it("Should not throw if id is unique", () => {
    const users = [{ id: 1 }, { id: 2 }];

    expect(() => {
      IdValidator.validateUniqueIdIn(users, 3);
    }).not.toThrow();
  });

  it("Should throw exception if id is unique", () => {
    const users = [{ id: 1 }, { id: 2 }];

    expect(() => {
      IdValidator.validateUniqueIdIn(users, 2);
    }).toThrow(new IllegalIdException("Id already exists"));
  });
});
