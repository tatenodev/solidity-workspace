const hre = require("hardhat");

const main = async () => {
  const contractFactory = await hre.ethers.getContractFactory("GLDToken");
  const amount = 5000;
  const contract = await contractFactory.deploy(amount);
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
  console.log("totalSupply:", await contract.totalSupply());
  console.log("balanceOf:", await contract.balanceOf("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"));
  console.log("name:", await contract.name());
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
