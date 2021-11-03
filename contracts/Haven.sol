// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Haven {
    struct Post {
        uint256 id;
        string post_uri;
        string title;
        string body;
        uint256 timestamp;
    }

    struct Comment {
        uint256 id;
        string text;
        uint256 timestamp;
    }

    Post[] posts;

    mapping(uint256 => Comment[]) postComments;

    constructor() {}

    function post(
        string memory _post_uri,
        string memory _title,
        string memory _body
    ) public returns (uint256) {
        uint256 postId = posts.length;
        posts.push(Post(postId, _post_uri, _title, _body, block.timestamp));
        return postId;
    }

    function comment(uint256 _post_id, string memory _message) public {
        uint256 commentId = postComments[_post_id].length;
        postComments[_post_id].push(
            Comment(commentId, _message, block.timestamp)
        );
    }

    function setConfig(string memory _config_uri) public {}

    function setSubscriptionFee(uint256 _fee) public {}

    function subscribe() public {}

    function unsubscribe() public {}
}
