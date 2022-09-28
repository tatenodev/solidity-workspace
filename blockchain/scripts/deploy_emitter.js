const hre = require("hardhat");

const main = async () => {
  const EmitterFactory = await hre.ethers.getContractFactory("Emitter");
  const Emitter = await EmitterFactory.deploy();
  await Emitter.deployed();
  console.log("Emitter deployed to:", Emitter.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

runMain();
