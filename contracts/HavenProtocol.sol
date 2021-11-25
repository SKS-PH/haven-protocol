// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC1820Registry.sol";
import "@openzeppelin/contracts/interfaces/IERC777Recipient.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";
import "./Haven.sol";
import "./HavenToken.sol";
import "hardhat/console.sol";

contract HavenProtocol is Ownable, IERC777Recipient, KeeperCompatibleInterface {
    IERC1820Registry private _erc1820 =
        IERC1820Registry(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24);
    bytes32 private constant TOKENS_RECIPIENT_INTERFACE_HASH =
        keccak256("ERC777TokensRecipient");
    uint256 private constant SUBSCRIPTION_DURATION = 30 * 86400; // can parameterize if there is any reason to

    mapping(address => address[]) public ownerToHavens;

    mapping(address => bool) public havens;

    struct Subscription {
        uint256 id;
        address haven;
        address subscriber;
        uint256 initialSubTimestamp;
        uint256 lastRenewalTimestamp;
    }
    uint256 public protocolFeeBasisPoints;
    Subscription[] public subscriptions;
    mapping(address => mapping(address => uint256)) public havenToSubscriptionId;
    mapping(address => mapping(address => bool)) public havenToSubscriptionStatus;

    HavenToken public havenToken;

    event HavenCreated(address indexed owner, address havenAddress);

    event UserSubscribed(
        address indexed havenAddress,
        address subscriber,
        uint256 subscriptionFee
    );
    event UserUnsubscribed(address indexed havenAddress, address subscriber);

    constructor(address _havenToken, uint256 _protocolFeeBasisPoints) {
        havenToken = HavenToken(_havenToken);
        protocolFeeBasisPoints = _protocolFeeBasisPoints;

        _erc1820.setInterfaceImplementer(
            address(this),
            TOKENS_RECIPIENT_INTERFACE_HASH,
            address(this)
        );
    }

    function createHaven(uint256 _subscriptionFee) public {
        Haven newHaven = new Haven(_subscriptionFee);
        newHaven.transferOwnership(msg.sender);
        ownerToHavens[msg.sender].push(address(newHaven));
        havens[address(newHaven)] = true;
        emit HavenCreated(msg.sender, address(newHaven));
    }

    function subscribe(address havenAddress) public {
        require(
            havenToken.isOperatorFor(address(this), msg.sender),
            "Haven Protocol is not an authorized operator!"
        );
        require(havens[havenAddress], "Invalid haven address!");
        uint256 subFee = Haven(havenAddress).subscriptionFee();
        require(
            havenToken.balanceOf(msg.sender) >= subFee,
            "Insufficient haven token balance!"
        );
        require(!havenToSubscriptionStatus[havenAddress][msg.sender], "You are already subscribed!");
        uint256 id = subscriptions.length;
        subscriptions.push(Subscription(id, havenAddress, msg.sender, block.timestamp, block.timestamp));
        havenToSubscriptionId[havenAddress][msg.sender] = id;
        havenToSubscriptionStatus[havenAddress][msg.sender] = true;
        billSubscriber(havenAddress, msg.sender);
        emit UserSubscribed(havenAddress, msg.sender, subFee);
    }

    function billSubscriber(address haven, address subscriber) private {
        uint256 subFee = Haven(haven).subscriptionFee();
        address havenOwner = Haven(haven).owner();
        uint256 protFee = (subFee * protocolFeeBasisPoints) / 10000;
        uint256 ownerFee = subFee - protFee;
        havenToken.operatorSend(subscriber, address(this), subFee, "", "");
        havenToken.send(havenOwner, ownerFee, "");
    }

    function unsubscribe(address havenAddress) public {
        require(
            havenToSubscriptionStatus[havenAddress][msg.sender],
            "You are not subscribed!"
        );
        havenToSubscriptionStatus[havenAddress][msg.sender] = false;
        emit UserUnsubscribed(havenAddress, msg.sender);
    }

    function tokensReceived(
        address operator,
        address,
        address,
        uint256,
        bytes calldata,
        bytes calldata
    ) external view override {
        require(
            msg.sender == address(havenToken),
            "Simple777Recipient: Invalid token"
        );
        require(
            operator == address(this),
            "Please don't send your haven tokens here"
        );
    }

    function checkUpkeep(bytes calldata /* checkData */)
        external
        override
        view
        returns (bool upkeepNeeded, bytes memory performData)
    {
        uint256 toRenewLength = 0;
        uint256 counter= 0;
  
        // count first
        for(uint256 i = 0; i < subscriptions.length; i++) {
            if(subscriptions[i].lastRenewalTimestamp + (SUBSCRIPTION_DURATION) <= block.timestamp) {
                toRenewLength++;
            } 
        }
        uint256[] memory toRenewIndexes = new uint256[](toRenewLength);

        for(uint256 i = 0; i < subscriptions.length; i++) {
            if(subscriptions[i].lastRenewalTimestamp + (SUBSCRIPTION_DURATION) <= block.timestamp) {
                toRenewIndexes[counter] = subscriptions[i].id;
                counter++;
            } 
        }

        upkeepNeeded = toRenewLength > 0;
        performData = abi.encode(toRenewIndexes);
    }

    function performUpkeep(bytes calldata performData) external override {
        (uint256[] memory toRenew) = abi.decode(performData, (uint256[]));
        for(uint256 i = 0; i < toRenew.length; i++) {
            Subscription storage sub = subscriptions[toRenew[i]];
            bool canRenew = havenToken.balanceOf(sub.subscriber) >= Haven(sub.haven).subscriptionFee();
            bool shouldRenew = sub.lastRenewalTimestamp + SUBSCRIPTION_DURATION <= block.timestamp;
            if(!shouldRenew) {
                revert("Subscription not yet expired!");
            }
            if(canRenew) {
                sub.lastRenewalTimestamp = block.timestamp;
                billSubscriber(sub.haven, sub.subscriber);
            } 
            havenToSubscriptionStatus[sub.haven][sub.subscriber] = canRenew;
        }
    }
}
