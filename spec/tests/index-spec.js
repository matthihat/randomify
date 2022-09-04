import { Randomizer } from "../../src/index.js";

var sut;

beforeEach(() => {
  sut = new Randomizer();
});

describe("Randomizer test", () => {
  it("should be able to get a user", () => {
    sut.addUser("namn");

    const user = sut.getRandomUser();
    expect(user.name).toEqual("namn");
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
