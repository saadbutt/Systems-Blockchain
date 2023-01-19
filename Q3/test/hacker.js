const { ethers } = require("hardhat");
const { expect } = require("chai");

// const { BN } = require("@openzeppelin/test-helpers");
// const { expect, assert } = require("chai");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
let targetContract, hackerContract;

beforeEach(async function () {

  [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();

  targetContractdep = await ethers.getContractFactory("CoinFlip");
  targetContract = await targetContractdep.deploy();

  hackerContractdep = await ethers.getContractFactory("Hacker");
  hackerContract = await hackerContractdep.deploy();

});

describe("Hacker", function () {

  it("should win always", async function () {

        await hackerContract.attack(targetContract.address);

        const consecutiveWins = await targetContract.consecutiveWins();
        expect(Number(consecutiveWins)).to.be.equal(1);

    
  });
});
