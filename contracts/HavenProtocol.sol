// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Haven.sol";
import "./HavenToken.sol";

contract HavenProtocol is Ownable {
    mapping(address => address[]) public ownerToHavens;

    mapping(address => bool) public havens;

    struct Subscriber {
        bool isSubscribed;
        uint256 balance;
    }

    mapping(address => mapping(address => Subscriber)) public havenToSubscriber;

    HavenToken public havenToken;

    event HavenCreated(address indexed owner, address havenAddress);

    event UserSubscribed(address indexed havenAddress, address subscriber, uint256 subscriptionFee);

    constructor(address _havenToken) {
        havenToken = HavenToken(_havenToken);
    }

    function createHaven(uint256 _subscriptionFee) public {
        Haven newHaven = new Haven(_subscriptionFee);
        newHaven.transferOwnership(msg.sender);
        ownerToHavens[msg.sender].push(address(newHaven));
        havens[address(newHaven)] = true;
        emit HavenCreated(msg.sender, address(newHaven));
    }

    function subscribe(uint256 subscriptionAmount, address havenAddress) public {
        require(havens[havenAddress], "Invalid haven address!");
        require(Haven(havenAddress).subscriptionFee() <= subscriptionAmount, "Insufficient subscription amount!");
        require(!havenToSubscriber[havenAddress][msg.sender].isSubscribed, "You are already subscribed!");
        havenToken.transferFrom(msg.sender, address(this), subscriptionAmount);
        havenToSubscriber[havenAddress][msg.sender] = Subscriber(true, subscriptionAmount);
        emit UserSubscribed(havenAddress, msg.sender, subscriptionAmount);
    }

    function unsubscribe() public {}
}