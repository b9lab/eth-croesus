pragma solidity >=0.4.25 <0.6.0;

import { Croesus } from "./Croesus.sol";

contract CroesusFactory {
    mapping (address => bool) public winners;
    
    event LogWon(address indexed sender, address indexed croesus);

    function tryToWin() public {
        winners[msg.sender] = true;
        emit LogWon(msg.sender, address(new Croesus()));
    }
}