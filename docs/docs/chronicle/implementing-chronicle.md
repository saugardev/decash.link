---
sidebar_position: 1
id: implementing-chronicle
title: Implementing Chronicle
---

# Chronicle

## Introduction

Chronicle Oracles are decentralized data oracles designed to provide reliable and accurate off-chain data to smart contracts across diverse blockchain networks. Because of their chain-agnostic nature they have the ability to seamlessly operate on different blockchain platforms without being limited to any specific one. This versatility ensures compatibility across a wide range of decentralized applications (DApps) and use cases.  Here is an explanation of how we implemented Chronicle in DeCash

## Interfaces
Here’s a breakdown of the interfaces used in  [DeCashLinkSepolia.sol](https://github.com/saugardev/decash.link/blob/main/contracts/DeCashLinkSepolia.sol#L9):

### Interface definition

The interface `IChronicle` is used to access the data from Chronicle Oracles. It uses the method `read()` which allows smart contracts to acquire data from a Chronicle Oracle.

```solidity
interface IChronicle {
    function read() external view returns (uint256 value);
}
```

### Self-kissing mecanism

One of the main focuses of using Chronicle is ensuring both the security and trustworthiness when fetching data from them. This is done by implementing a self-fetching mecanism using `ISelfKisser` in the contract `DeCashLink`. This security mechanism makes sure that the connection between the Chronicle Oracle and the contract can be fully trusted.

```solidity
interface ISelfKisser {
    function selfKiss(address oracle) external;
}
```

## Chronicle contract

The `DecashLink` contract is the main functionality regarding the use of Chronicle Oracles as it implements the condition of target prices. Here is a detailed overview of its main features:

### Interface variables

At the beggining of the contract, the variables `chronicle ` and `selfKisser ` are initiated :

* **chronicle**: This variable is initiated with an address which corresponds to a contract that implements the interface `IChronicle`
```solidity
    IChronicle public chronicle = IChronicle(address(0xdd6D76262Fd7BdDe428dcfCd94386EbAe0151603));
```

* **sefKisser**: This variable is initiated with an address which corresponds to a contract that implements the interface `ISelfKisser`

```solidity
    ISelfKisser public selfKisser = ISelfKisser(address(0x0Dcc19657007713483A5cA76e6A7bbe5f56EA37d));
```
### Target price check

Inside of the function `claimPaymentLink`, there is this snippet of code which does the comprobation regarding the target price:

```solidity
    if (link.hasTarget) {
        uint256 ethPrice = chronicle.read();
        require(ethPrice >= link.targetPrice, "Ethereum price target not met");
    }
```

If the target price has been set (it has a value), it reads from the Chronicle Oracle. If the token price surpasses or equals the target price then the target is not met, making the deposit of the money not redeemable until the target price is less than the token price

