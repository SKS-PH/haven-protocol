// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HavenToken is ERC20 {
    constructor() public ERC20("Haven Token", "HAVEN") {
        _mint(msg.sender, 1000000* 10**18);
    }
}
