const CroesusFactory = artifacts.require("CroesusFactory");

const ethUtil = require('ethereumjs-util/');
const expectedExceptionPromise = require("../utils/expectedExceptionPromise.js");
const MAX_GAS = 3000000;

contract('CroesusFactory', (accounts) => {

    let factory;

    beforeEach("should create a factory", async function() {
        factory = await CroesusFactory.new({ from: accounts[0] });
    });

    it('should fail to win without balance', () => {
        return expectedExceptionPromise(
            () => factory.tryToWin(web3.utils.fromUtf8("tadaaa"), { from: accounts[0], gas: MAX_GAS }),
            MAX_GAS);
    });

    it('should win with a balance', async () => {
        const currentFactoryNonce = await web3.eth.getTransactionCount(factory.address);
        const futureAddress = ethUtil.bufferToHex(ethUtil.generateAddress(factory.address, currentFactoryNonce));
        await web3.eth.sendTransaction({ from: accounts[0], to: futureAddress, value: 1 });
        const txObjWin = await factory.tryToWin(web3.utils.fromUtf8("tadaaa"), { from: accounts[0] });
        const won = await factory.winners(accounts[0]);
        
        assert.isTrue(txObjWin.receipt.status);
        assert.isTrue(won);
        assert.strictEqual(txObjWin.logs.length, 1);

        const event = txObjWin.logs[0];

        assert.strictEqual(event.args.sender, accounts[0]);
        assert.strictEqual(event.args.croesus.toLowerCase(), futureAddress);
        assert.strictEqual(web3.utils.toUtf8(event.args.braggingRights), "tadaaa");
    });

});
