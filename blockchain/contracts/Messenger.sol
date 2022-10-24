// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract Messenger {
  uint256 public state;
  
  constructor() {
    console.log('Here is my messenger smart contract.');
    state = 1;
  }
}
