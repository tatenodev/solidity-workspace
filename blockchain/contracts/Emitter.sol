// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Emitter {
  struct Transactor {
    address sender;
    address reciever;
    uint256 amount;
  }

  Transactor[] list;

  // 最大3つまでindexed修飾子を追加できる
  event add(address indexed from, address indexed reciever, uint256 amount);

  function addList(address _reciver, uint256 _amount) public {
    list.push(Transactor(msg.sender, _reciver, _amount));
    emit add(msg.sender, _reciver, _amount);
  }
}
