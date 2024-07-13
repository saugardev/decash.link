// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

// Interface to read from Chronicle oracles
interface IChronicle {
    function read() external view returns (uint256 value);
}

interface ISelfKisser {
    function selfKiss(address oracle) external;
}

contract DeCashLink {
    IChronicle public chronicle = IChronicle(address(0xdd6D76262Fd7BdDe428dcfCd94386EbAe0151603));
    ISelfKisser public selfKisser = ISelfKisser(address(0x0Dcc19657007713483A5cA76e6A7bbe5f56EA37d));

    constructor() {
        selfKisser.selfKiss(address(chronicle));
    }

    struct PaymentLink {
        address creator;
        uint256 amount;
        bool claimed;
        uint256 targetPrice;
        bool hasTarget;
    }

    mapping(uint256 => PaymentLink) public paymentLinks;
    mapping(address => uint256[]) public linksCreated;
    mapping(address => uint256[]) public linksClaimed;

    event PaymentLinkCreated(uint256 indexed linkId, address indexed creator, uint256 amount, uint256 targetPrice, bool hasTarget);
    event PaymentLinkClaimed(uint256 indexed linkId, address indexed claimer, address indexed destination);

    function createPaymentLink(uint256 linkId, uint256 targetPrice, bool hasTarget) external payable {
        require(msg.value > 0, "Amount must be greater than zero");
        require(paymentLinks[linkId].creator == address(0), "Link already exists");

        paymentLinks[linkId] = PaymentLink({
            creator: msg.sender,
            amount: msg.value,
            claimed: false,
            targetPrice: targetPrice,
            hasTarget: hasTarget
        });

        linksCreated[msg.sender].push(linkId);

        emit PaymentLinkCreated(linkId, msg.sender, msg.value, targetPrice, hasTarget);
    }

    function readPrice() external view returns (uint256) {
        return chronicle.read();
    } 

    function claimPaymentLink(uint256 linkId, address destination) external {
        PaymentLink storage link = paymentLinks[linkId];
        require(link.creator != address(0), "Link does not exist");
        require(!link.claimed, "Link already claimed");
        require(destination != address(0), "Invalid destination address");
        if (link.hasTarget) {
            uint256 ethPrice = chronicle.read();
            require(ethPrice >= link.targetPrice, "Ethereum price target not met");
        }

        link.claimed = true;
        linksClaimed[msg.sender].push(linkId);
        payable(destination).transfer(link.amount);

        emit PaymentLinkClaimed(linkId, msg.sender, destination);
    }

    function getLinksCreated(address user) external view returns (uint256[] memory) {
        return linksCreated[user];
    }

    function getLinksClaimed(address user) external view returns (uint256[] memory) {
        return linksClaimed[user];
    }

    function isClaimed(uint256 linkId) external view returns (bool) {
        return paymentLinks[linkId].claimed;
    }
}
