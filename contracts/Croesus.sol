pragma solidity >=0.4.25 <0.6.0;

contract Croesus {
    constructor() public {
        require(address(this).balance > 0);
    }
}