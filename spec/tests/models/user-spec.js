import { User } from "../../../src/models/user.js";

describe("User tests", () => {
  it("Should get name and id", () => {
    const user = new User("namn", 1);

    expect(user.name).toEqual("namn");
    expect(user.id).toBe(1);
  });

  it("Should ", () => {
    const user = new User("namn", 1);

    expect(() => {
      user.id = 2;
    }).toThrow();
  });
});
