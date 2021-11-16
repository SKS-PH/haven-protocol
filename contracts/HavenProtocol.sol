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
        bool hasAccess;
    }
    uint256 public protocolFeeBasisPoints;
    mapping(address => mapping(address => Subscriber)) public havenToSubscriber;

    HavenToken public havenToken;

    event HavenCreated(address indexed owner, address havenAddress);

    event UserSubscribed(address indexed havenAddress, address subscriber, uint256 subscriptionAmount, uint256 subscriptionFee);
    event UserUnsubscribed(address indexed havenAddress, address subscriber);

    constructor(address _havenToken, uint256 _protocolFeeBasisPoints) {
        havenToken = HavenToken(_havenToken);
        protocolFeeBasisPoints = _protocolFeeBasisPoints;
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
        uint256 subFee = Haven(havenAddress).subscriptionFee();
        address havenOwner = Haven(havenAddress).owner();
        uint256 protFee = subFee * protocolFeeBasisPoints / 10000;
        uint256 ownerFee = subFee - protFee;
        uint256 balance = subscriptionAmount - subFee;
        havenToken.transfer(havenOwner, ownerFee);
        havenToSubscriber[havenAddress][msg.sender] = Subscriber(true,  balance, true);
        emit UserSubscribed(havenAddress, msg.sender, subscriptionAmount, subFee);
    }

    function unsubscribe(address havenAddress) public {
        require(havenToSubscriber[havenAddress][msg.sender].isSubscribed, "You are not subscribed!");
        Subscriber storage sub = havenToSubscriber[havenAddress][msg.sender];
        if(sub.balance > 0) {
            havenToken.transfer(msg.sender, sub.balance);
            sub.balance = 0;
        }
        sub.isSubscribed = false;
        emit UserUnsubscribed(havenAddress, msg.sender);
    }
}