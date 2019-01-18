const Croesus = artifacts.require("Croesus");

const Promise = require("bluebird");
const ethUtil = require('ethereumjs-util/');
const expectedExceptionPromise = require("../utils/expectedExceptionPromise.js");
const MAX_GAS = 3000000;

if (typeof web3.eth.getAccountsPromise !== "function") {
    Promise.promisifyAll(web3.eth, { suffix: "Promise" });
}

contract('Croesus', (accounts) => {

    it('should not deploy without balance', () => {
        return expectedExceptionPromise(
            () => Croesus.new({ from: accounts[0], gas: MAX_GAS }),
            MAX_GAS);
    });

    it('should deploy with a balance', async () => {
        const currentNonce = await web3.eth.getTransactionCountPromise(accounts[0]);
        const futureAddress = ethUtil.bufferToHex(ethUtil.generateAddress(accounts[0], currentNonce + 1));
        await web3.eth.sendTransactionPromise({ from: accounts[0], to: futureAddress, value: 1 });
        const croesus = await Croesus.new({ from: accounts[0] });

        assert.strictEqual(croesus.address.toLowerCase(), futureAddress);
    });

});
