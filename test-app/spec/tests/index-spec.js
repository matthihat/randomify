import UserRandomizer from "../../../module/src/index.js";
import { NotFoundException } from "../../../module/src/models/exceptions/NotFoundException.js";
import { User } from "../../../module/src/models/user.js";

var sut;

beforeEach(() => {
  sut = new UserRandomizer();
});

describe("Randomizer test", () => {
  it("Should be able to get a user with a list of one user", () => {
    sut.addUser("namn");

    const user = sut.getRandomUser();
    expect(user.name).toEqual("namn");
    expect(user instanceof User).toBeTrue();
  });

  it("Should be able to get a user with a list of many users", () => {
    sut.addUser("namn1");
    sut.addUser("namn2");
    sut.addUser("namn3");

    const user = sut.getRandomUser();
    expect(user instanceof User).toBeTrue();
  });

  it("Should get null if no users are present", () => {
    expect(() => {
      sut.getRandomUser();
    }).toThrow(new NotFoundException("No user to be found"));
  });

  it("Should get execution mode", () => {
    expect(sut.getExecutionMode()).toBeFalse();
  });

  it("Should set execution mode", () => {
    sut.shouldRemoveUserWhenChosen(true);

    expect(sut.getExecutionMode()).toBeTrue();
  });

  it("Should remove user when chosen", () => {
    sut.addUser("namn");
    sut.addUser("namn2");
    sut.shouldRemoveUserWhenChosen(true);

    const user = sut.getRandomUser();
    const user2 = sut.getRandomUser();

    expect(sut.getExecutionMode()).toBeTrue();
    expect(user.id).not.toEqual(user2.id);
  });
});
