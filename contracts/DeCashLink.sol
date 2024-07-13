// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DeCashLink {
    // Structure to hold payment link information
    struct PaymentLink {
        address creator;
        uint256 amount;
        bool claimed;
    }

    // Mapping to store payment links using a unique identifier
    mapping(uint256 => PaymentLink) public paymentLinks;

    // Mapping to store the links created by each user
    mapping(address => uint256[]) public linksCreated;

    // Mapping to store the links claimed by each user
    mapping(address => uint256[]) public linksClaimed;

    // Event to be emitted when a payment link is created
    event PaymentLinkCreated(uint256 indexed linkId, address indexed creator, uint256 amount);

    // Event to be emitted when a payment link is claimed
    event PaymentLinkClaimed(uint256 indexed linkId, address indexed claimer, address indexed destination);

    // Function to create a new payment link
    function createPaymentLink(uint256 linkId) external payable {
        require(msg.value > 0, "Amount must be greater than zero");
        require(paymentLinks[linkId].creator == address(0), "Link already exists");

        paymentLinks[linkId] = PaymentLink({
            creator: msg.sender,
            amount: msg.value,
            claimed: false
        });

        linksCreated[msg.sender].push(linkId);

        emit PaymentLinkCreated(linkId, msg.sender, msg.value);
    }

    // Function to claim a payment link and assign a destination address
    function claimPaymentLink(uint256 linkId, address destination) external {
        PaymentLink storage link = paymentLinks[linkId];
        require(link.creator != address(0), "Link does not exist");
        require(!link.claimed, "Link already claimed");
        require(destination != address(0), "Invalid destination address");

        link.claimed = true;
        linksClaimed[msg.sender].push(linkId);
        payable(destination).transfer(link.amount);

        emit PaymentLinkClaimed(linkId, msg.sender, destination);
    }

    // Function to get all links created by a user
    function getLinksCreated(address user) external view returns (uint256[] memory) {
        return linksCreated[user];
    }

    // Function to get all links claimed by a user
    function getLinksClaimed(address user) external view returns (uint256[] memory) {
        return linksClaimed[user];
    }

    // Function to check if a link has been claimed
    function isClaimed(uint256 linkId) external view returns (bool) {
        return paymentLinks[linkId].claimed;
    }
}
