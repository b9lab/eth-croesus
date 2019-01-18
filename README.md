# Croesus expects money

You need to make sure that the next `Croesus` contract deployed by the `CroesusFactory` already has a strictly positive at its address.

## Goals

* The exercise serves to show that it is possible to send Ether to a contract before it is even deployed.
* In effect, there is no way to know that any address you see on Etherscan is not the address of a future contract.
* Additionally, it shows that the future address can be calculated beforehand.
* An additional complication is that the future address has to be computed with the factory's address.
