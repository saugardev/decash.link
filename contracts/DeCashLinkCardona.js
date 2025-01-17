export default [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "linkId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "claimer",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "destination",
                type: "address",
            },
        ],
        name: "PaymentLinkClaimed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "linkId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "creator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "targetPrice",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "hasTarget",
                type: "bool",
            },
        ],
        name: "PaymentLinkCreated",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "linkId",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "destination",
                type: "address",
            },
        ],
        name: "claimPaymentLink",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "linkId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "targetPrice",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "hasTarget",
                type: "bool",
            },
        ],
        name: "createPaymentLink",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "linkId",
                type: "uint256",
            },
        ],
        name: "createPaymentLink",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "user",
                type: "address",
            },
        ],
        name: "getLinksClaimed",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "user",
                type: "address",
            },
        ],
        name: "getLinksCreated",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "linkId",
                type: "uint256",
            },
        ],
        name: "isClaimed",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "linksClaimed",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "linksCreated",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "originAddress",
                type: "address",
            },
            {
                internalType: "uint32",
                name: "originNetwork",
                type: "uint32",
            },
            {
                internalType: "bytes",
                name: "metadata",
                type: "bytes",
            },
        ],
        name: "onMessageReceived",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "paymentLinks",
        outputs: [
            {
                internalType: "address",
                name: "creator",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "claimed",
                type: "bool",
            },
            {
                internalType: "uint256",
                name: "targetPrice",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "hasTarget",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];