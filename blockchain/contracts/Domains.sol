// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import { StringUtils } from "./lib/StringUtils.sol";

import "hardhat/console.sol";

contract Domains {
  string public tld;
  
  mapping (string => address) public domains;
  mapping (string => string) public records;
  
  constructor(string memory _tld) payable {
    tld = _tld;
    console.log("This is my domains contract.");
  }

  function price(string calldata name) public pure returns(uint) {
    uint len = StringUtils.strlen(name);
    require(len > 0);
    if (len == 3) {
      return 0.005 * 10**18;
    } else if (len == 4) {
      return 0.003 * 10**18;
    } else {
      return 0.001 * 10**18;
    }
  }

  function register(string calldata name) public payable {
    require(domains[name] == address(0));
    uint _price = price(name);

    require(msg.value >= _price, "Not enough paid");
    
    domains[name] = msg.sender;
    console.log("%s has registerd a domain!", msg.sender);
  }

  function getAddress(string calldata name) public view returns (address) {
    return domains[name];
  }

  function setRecord(string calldata name, string calldata record) public {
    require(domains[name] == msg.sender);
    records[name] = record;
  }

  function getRecord(string calldata name) public view returns (string memory) {
    return records[name];
  }
}
