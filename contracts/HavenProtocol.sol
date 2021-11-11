// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Haven.sol";

contract HavenProtocol is Ownable {
    mapping(address => address[]) public ownerToHavens;
    event HavenCreated(address indexed owner, address havenAddress);
    function createHaven(uint256 _subscriptionFee) public {
        Haven newHaven = new Haven(_subscriptionFee);
        newHaven.transferOwnership(msg.sender);
        ownerToHavens[msg.sender].push(address(newHaven));
        emit HavenCreated(msg.sender, address(newHaven));
    }
}