pragma solidity >=0.4.25 <0.6.0;

import { Croesus } from "./Croesus.sol";

contract CroesusFactory {
    mapping (address => bool) public winners;
    
    event LogWon(address indexed sender, address indexed croesus, bytes32 braggingRights);

    function tryToWin(bytes32 braggingRights) public {
        winners[msg.sender] = true;
        emit LogWon(msg.sender, address(new Croesus()), braggingRights);
    }
}