// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Haven is Ownable{
    struct Post {
        uint256 id;
        string post_uri;
        uint256 timestamp;
    }

    event PostCreated(uint256 indexed postId, string post_uri, uint256 timestamp);

    uint256 public subscriptionFee;

    Post[] public posts;

    constructor(uint256 _subscriptionFee) {
        subscriptionFee = _subscriptionFee;
    }

    function post(
        string memory _post_uri
    ) public onlyOwner returns(uint256) {
        uint256 postId = posts.length;
        uint256 timeStamp = block.timestamp;
        posts.push(Post(postId, _post_uri, timeStamp));
        emit PostCreated(postId, _post_uri, timeStamp);
        return postId;
    }

    function setConfig(string memory _config_uri) public {}

    function setSubscriptionFee(uint256 _fee) public onlyOwner {}

    function subscribe() public {}

    function unsubscribe() public {}
}
