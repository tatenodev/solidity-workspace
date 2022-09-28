require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      accounts: [
        process.env.SECRETKEY_LOCALHOST
      ]
    },
    goerli: {
      url: process.env.ALCHEMY,
      accounts: [
        process.env.SECRETKEY_GOERLI
      ]
    }
  }
};
