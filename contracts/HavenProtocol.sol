// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC1820Registry.sol";
import "@openzeppelin/contracts/interfaces/IERC777Recipient.sol";
import "./Haven.sol";
import "./HavenToken.sol";

contract HavenProtocol is Ownable, IERC777Recipient {
    IERC1820Registry private _erc1820 = IERC1820Registry(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24);
    bytes32 constant private TOKENS_RECIPIENT_INTERFACE_HASH = keccak256("ERC777TokensRecipient");

    mapping(address => address[]) public ownerToHavens;

    mapping(address => bool) public havens;

    struct Subscriber {
        bool isSubscribed;
        bool hasAccess;
    }
    uint256 public protocolFeeBasisPoints;
    mapping(address => mapping(address => Subscriber)) public havenToSubscriber;

    HavenToken public havenToken;

    event HavenCreated(address indexed owner, address havenAddress);

    event UserSubscribed(address indexed havenAddress, address subscriber, uint256 subscriptionFee);
    event UserUnsubscribed(address indexed havenAddress, address subscriber);

    constructor(address _havenToken, uint256 _protocolFeeBasisPoints) {
        havenToken = HavenToken(_havenToken);
        protocolFeeBasisPoints = _protocolFeeBasisPoints;

        _erc1820.setInterfaceImplementer(address(this), TOKENS_RECIPIENT_INTERFACE_HASH, address(this));
    }

    function createHaven(uint256 _subscriptionFee) public {
        Haven newHaven = new Haven(_subscriptionFee);
        newHaven.transferOwnership(msg.sender);
        ownerToHavens[msg.sender].push(address(newHaven));
        havens[address(newHaven)] = true;
        emit HavenCreated(msg.sender, address(newHaven));
    }

    function subscribe(address havenAddress) public {
        require(havenToken.isOperatorFor(address(this), msg.sender), "Haven Protocol is not an authorized operator!");
        require(havens[havenAddress], "Invalid haven address!");
        uint256 subFee = Haven(havenAddress).subscriptionFee();
        require(havenToken.balanceOf(msg.sender) >= subFee, "Insufficient haven token balance!");
        require(!havenToSubscriber[havenAddress][msg.sender].isSubscribed, "You are already subscribed!");
        address havenOwner = Haven(havenAddress).owner();
        uint256 protFee = subFee * protocolFeeBasisPoints / 10000;
        uint256 ownerFee = subFee - protFee;
        havenToSubscriber[havenAddress][msg.sender] = Subscriber(true, true);
        havenToken.operatorSend(msg.sender, address(this), subFee, "","");
        havenToken.send(havenOwner, ownerFee, "");
        emit UserSubscribed(havenAddress, msg.sender, subFee);
    }

    function unsubscribe(address havenAddress) public {
        require(havenToSubscriber[havenAddress][msg.sender].isSubscribed, "You are not subscribed!");
        Subscriber storage sub = havenToSubscriber[havenAddress][msg.sender];
        sub.isSubscribed = false;
        emit UserUnsubscribed(havenAddress, msg.sender);
    }

    function tokensReceived(
        address operator,
        address,
        address,
        uint256,
        bytes calldata,
        bytes calldata
    ) override external view  {
        require(msg.sender == address(havenToken), "Simple777Recipient: Invalid token");
        require(operator == address(this), "Please don't send your haven tokens here");
    }
}