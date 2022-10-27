// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract Domains {
  mapping (string => address) public domains;
  
  constructor() {
    console.log("This is my domains contract.");
  }

  function register(string calldata name) public {
    domains[name] = msg.sender;
    console.log("%s has registerd a domain!", msg.sender);
  }

  function getAddress(string calldata name) public view returns (address) {
    return domains[name];
  }
}
