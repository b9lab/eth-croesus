pragma solidity 0.5.0;

contract Croesus {
    constructor() public {
        require(address(this).balance > 0);
    }
}