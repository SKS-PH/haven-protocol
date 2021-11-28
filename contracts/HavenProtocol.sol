// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC1820Registry.sol";
import "@openzeppelin/contracts/interfaces/IERC777Recipient.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";
import "./HavenToken.sol";
import "hardhat/console.sol";

contract HavenProtocol is Ownable, IERC777Recipient, KeeperCompatibleInterface {
    IERC1820Registry private _erc1820 =
        IERC1820Registry(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24);
    bytes32 private constant TOKENS_RECIPIENT_INTERFACE_HASH =
        keccak256("ERC777TokensRecipient");
    uint256 private constant SUBSCRIPTION_DURATION = 30 * 86400; // can parameterize if there is any reason to

    mapping(address => uint256[]) public ownerToHavens;

    mapping(uint256 => bool) public havenExists;

    Haven[] public havens;

    mapping(uint256 => Post[]) public posts;

    struct Subscription {
        uint256 id;
        uint256 havenId;
        address subscriber;
        uint256 initialSubTimestamp;
        uint256 lastRenewalTimestamp;
    }

    struct Post {
        uint256 id;
        string post_uri;
        uint256 timestamp;
    }

    struct Haven {
        uint256 id;
        address owner;
        uint256 subscriptionFee;
    }
    uint256 public protocolFeeBasisPoints;
    Subscription[] public subscriptions;
    mapping(uint256 => mapping(address => uint256)) public havenToSubscriptionId;
    mapping(uint256 => mapping(address => bool)) public havenToSubscriptionStatus;

    HavenToken public havenToken;

    event HavenCreated(address indexed owner, uint256 havenId);

    event PostCreated(uint256 indexed postId, string post_uri, uint256 timestamp);

    event UserSubscribed(
        uint256 indexed havenId,
        address subscriber,
        uint256 subscriptionFee
    );
    event UserUnsubscribed(uint256 indexed havenId, address subscriber);

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
        uint256 havenId = havens.length;
        havens.push(Haven(havenId, msg.sender, _subscriptionFee));
        ownerToHavens[msg.sender].push(havenId);
        havenExists[havenId] = true;
        emit HavenCreated(msg.sender, havenId);
    }

    function post(
        uint256 havenId,
        string memory _post_uri
    ) public returns(uint256) {
        require(havenExists[havenId], "Haven doesnt exist");
        require(havens[havenId].owner == msg.sender, "You are not the owner of this haven");
        uint256 postId = posts[havenId].length;
        uint256 timeStamp = block.timestamp;
        posts[havenId].push(Post(postId, _post_uri, timeStamp));
        emit PostCreated(postId, _post_uri, timeStamp);
        return postId;
    }

    function subscribe(uint256 havenId) public {
        require(
            havenToken.isOperatorFor(address(this), msg.sender),
            "Haven Protocol is not an authorized operator!"
        );
        require(havenExists[havenId], "Invalid haven address!");
        uint256 subFee = havens[havenId].subscriptionFee;
        require(
            havenToken.balanceOf(msg.sender) >= subFee,
            "Insufficient haven token balance!"
        );
        require(!havenToSubscriptionStatus[havenId][msg.sender], "You are already subscribed!");
        uint256 id = subscriptions.length;
        subscriptions.push(Subscription(id, havenId, msg.sender, block.timestamp, block.timestamp));
        havenToSubscriptionId[havenId][msg.sender] = id;
        havenToSubscriptionStatus[havenId][msg.sender] = true;
        billSubscriber(havenId, msg.sender);
        emit UserSubscribed(havenId, msg.sender, subFee);
    }

    function billSubscriber(uint256 havenId, address subscriber) private {
        uint256 subFee = havens[havenId].subscriptionFee;
        address havenOwner = havens[havenId].owner;
        uint256 protFee = (subFee * protocolFeeBasisPoints) / 10000;
        uint256 ownerFee = subFee - protFee;
        havenToken.operatorSend(subscriber, address(this), subFee, "", "");
        havenToken.send(havenOwner, ownerFee, "");
    }

    function unsubscribe(uint256 havenId) public {
        require(
            havenToSubscriptionStatus[havenId][msg.sender],
            "You are not subscribed!"
        );
        havenToSubscriptionStatus[havenId][msg.sender] = false;
        emit UserUnsubscribed(havenId, msg.sender);
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
            bool canRenew = havenToken.balanceOf(sub.subscriber) >= havens[sub.havenId].subscriptionFee;
            bool shouldRenew = sub.lastRenewalTimestamp + SUBSCRIPTION_DURATION <= block.timestamp;
            if(!shouldRenew) {
                revert("Subscription not yet expired!");
            }
            if(canRenew) {
                sub.lastRenewalTimestamp = block.timestamp;
                billSubscriber(sub.havenId, sub.subscriber);
            } 
            havenToSubscriptionStatus[sub.havenId][sub.subscriber] = canRenew;
        }
    }
}
