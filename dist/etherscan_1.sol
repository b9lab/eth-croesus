pragma solidity >=0.4.25 <0.6.0;

// MAINNET
// With Txn 0x534730325e0a20276f6f3176684a80dbfcec3c4d0973666eb2e3cd20b79f67cf
// At address 0x18C1eacb4Ee22DaD44276770ed0a887920c9cb08
// Constructor argument: None
// Compiler v0.5.0+commit.1d4f565a, no optimisation

contract Croesus {
    constructor() public {
        require(address(this).balance > 0);
    }
}

contract CroesusFactory {
    mapping (address => bool) public winners;
    
    event LogWon(address indexed sender, address indexed croesus, bytes32 braggingRights);

    function tryToWin(bytes32 braggingRights) public {
        winners[msg.sender] = true;
        emit LogWon(msg.sender, address(new Croesus()), braggingRights);
    }
}