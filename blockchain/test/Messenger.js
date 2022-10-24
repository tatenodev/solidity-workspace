const { ethers } = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Messenger", () => {
  const deployContract = async () => {
    const [owner, otherAccount] = await ethers.getSigners();
    const funds = 100;

    const Messenger = await ethers.getContractFactory("Messenger");
    const messenger = await Messenger.deploy({
      value: funds
    });

    return { messenger, funds, owner, otherAccount };
  }

  describe("Post", () => {
    it("Should send the correct amount of tokens", async () => {
      const { messenger, owner, otherAccount} = await loadFixture(deployContract);
      const test_deposit = 10;

      await expect(
        messenger.post("text", otherAccount.address, {
          value: test_deposit,
        })
      ).to.changeEtherBalances(
        [owner, messenger],
        [-test_deposit, test_deposit]
      );
    });

    it("Should set the right Message", async () => {
      const { messenger, owner, otherAccount} = await loadFixture(deployContract);
      const test_deposit = 1;
      const test_text = "text";

      await messenger.post(test_text, otherAccount.address, {
        value: test_deposit,
      });
      const messages = await messenger.connect(otherAccount).getOwnMessages();
      const message = messages[0];
      expect(message.depositInWei).to.equal(test_deposit);
      expect(message.text).to.equal(test_text);
      expect(message.isPending).to.equal(true);
      expect(message.sender).to.equal(owner.address);
      expect(message.receiver).to.equal(otherAccount.address);
    });
  });

  describe("Accept", function () {
      it("isPending must be changed", async function () {
        const { messenger, otherAccount } = await loadFixture(deployContract);
        const first_index = 0;
    
        await messenger.post("text", otherAccount.address);
        let messages = await messenger.connect(otherAccount).getOwnMessages();
        expect(messages[0].isPending).to.equal(true);
    
        await messenger.connect(otherAccount).accept(first_index);
        messages = await messenger.connect(otherAccount).getOwnMessages();
        expect(messages[0].isPending).to.equal(false);
      });
    
      it("Should send the correct amount of tokens", async function () {
        const { messenger, otherAccount } = await loadFixture(deployContract);
        const test_deposit = 10;
    
        await messenger.post("text", otherAccount.address, {
          value: test_deposit,
        });
    
        const first_index = 0;
        await expect(
          messenger.connect(otherAccount).accept(first_index)
        ).to.changeEtherBalances(
          [messenger, otherAccount],
          [-test_deposit, test_deposit]
        );
      });
    
      it("Should revert with the right error if called in duplicate", async function () {
        const { messenger, otherAccount } = await loadFixture(deployContract);
    
        await messenger.post("text", otherAccount.address, { value: 1 });
        await messenger.connect(otherAccount).accept(0);
        await expect(
          messenger.connect(otherAccount).accept(0)
        ).to.be.revertedWith("This message has already been confirmed");
      });
    });
    
    describe("Deny", function () {
      it("isPending must be changed", async function () {
        const { messenger, otherAccount } = await loadFixture(deployContract);
        const first_index = 0;
    
        await messenger.post("text", otherAccount.address);
        let messages = await messenger.connect(otherAccount).getOwnMessages();
        expect(messages[0].isPending).to.equal(true);
    
        await messenger.connect(otherAccount).deny(first_index);
        messages = await messenger.connect(otherAccount).getOwnMessages();
        expect(messages[0].isPending).to.equal(false);
      });
    
      it("Should send the correct amount of tokens", async function () {
        const { messenger, owner, otherAccount } = await loadFixture(
          deployContract
        );
        const test_deposit = 10;
    
        await messenger.post("text", otherAccount.address, {
          value: test_deposit,
        });
    
        const first_index = 0;
        await expect(
          messenger.connect(otherAccount).deny(first_index)
        ).to.changeEtherBalances(
          [messenger, owner],
          [-test_deposit, test_deposit]
        );
      });
    
      it("Should revert with the right error if called in duplicate", async function () {
        const { messenger, otherAccount } = await loadFixture(deployContract);
    
        await messenger.post("text", otherAccount.address, { value: 1 });
        await messenger.connect(otherAccount).deny(0);
        await expect(messenger.connect(otherAccount).deny(0)).to.be.revertedWith(
          "This message has already been confirmed"
        );
      });
    });
});
