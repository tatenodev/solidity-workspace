const { expect } = require("chai");

describe("Messenger", () => {
  it("construct", async () => {
    const Messenger = await hre.ethers.getContractFactory("Messenger");
    const messenger = await Messenger.deploy();
    expect(await messenger.state()).to.equal(1);
  });
});
