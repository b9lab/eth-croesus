const Croesus = artifacts.require("Croesus");

const ethUtil = require('ethereumjs-util/');
const expectedExceptionPromise = require("../utils/expectedExceptionPromise.js");
const MAX_GAS = 3000000;

contract('Croesus', (accounts) => {

    it('should not deploy without balance', () => {
        return expectedExceptionPromise(
            () => Croesus.new({ from: accounts[0], gas: MAX_GAS }),
            MAX_GAS);
    });

    it('should not deploy with value', () => {
        return expectedExceptionPromise(
            () => Croesus.new({ from: accounts[0], gas: MAX_GAS, value: 1 }),
            MAX_GAS);
    });

    it('should deploy with a balance', async () => {
        const currentNonce = await web3.eth.getTransactionCount(accounts[0]);
        const futureAddress = ethUtil.bufferToHex(ethUtil.generateAddress(accounts[0], currentNonce + 1));
        await web3.eth.sendTransaction({ from: accounts[0], to: futureAddress, value: 1 });
        const croesus = await Croesus.new({ from: accounts[0] });

        assert.strictEqual(croesus.address.toLowerCase(), futureAddress);
    });

});
