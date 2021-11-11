// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Haven.sol";

contract HavenProtocol is Ownable {
    mapping(address => address) public ownerToHaven;
    address[] public havens;
    event HavenCreated(uint256 indexed havenId, address havenAddress, address owner);
    function createHaven(uint256 _subscriptionFee) public  {
        uint256 havenId = havens.length;
        Haven newHaven = new Haven(_subscriptionFee);
        newHaven.transferOwnership(msg.sender);
        ownerToHaven[msg.sender] = address(newHaven);
        emit HavenCreated(havenId, address(newHaven), msg.sender);
    }
}