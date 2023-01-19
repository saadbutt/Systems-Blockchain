const { ethers } = require("hardhat");
const { expect } = require("chai");

var erc20Contract;
var erc20ContractDeployment;
var totalSupply;
// `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    [owner, recipient, spender] = await ethers.getSigners();
    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    
    erc20Contract = await ethers.getContractFactory("ERC20");
        var name = "token";
        var symbol = "tx";
        var decimals = "18";
        totalSupply = "100000000000000000000";
        erc20ContractDeployment = await erc20Contract.deploy(name, symbol, decimals, totalSupply);
  });

  describe("My ERC20 Contract", async function () {

    it("should deploy the contract", async () => {
        expect(erc20ContractDeployment.address).to.not.be.null;
      });

    it("should have the correct totalSupply", async () => {
      const totalSupply = await erc20ContractDeployment.totalSupply();
      expect(totalSupply.toString()).to.equal(totalSupply);
    });

    it("should have the correct balance for the deployer", async () => {
      const balance = await erc20ContractDeployment.balanceOf(owner.address);
      expect(balance.toString()).to.equal(totalSupply);
    });

    it("should transfer tokens correctly", async () => {
    
        // Transfer some tokens
        await erc20ContractDeployment.transfer(recipient.address, "100");
    
        // Check the recipient's balance
        const recipientBalance = await erc20ContractDeployment.balanceOf(recipient.address);
        expect(recipientBalance.toString()).to.equal("100");
    
        // Check the deployer's balance
        const deployerBalance = await erc20ContractDeployment.balanceOf(owner.address);
        expect(deployerBalance.toString()).to.equal("99999999999999999900");
      });

      it("should approve and transferFrom correctly", async () => {
    
        // Approve the spender to transfer some tokens
        await erc20ContractDeployment.approve(spender.address, "100");
    
        // Check the allowance
        let allowance = await erc20ContractDeployment.allowance(owner.address, spender.address);
        expect(allowance.toString()).to.equal("100");
    
        // Increase the allowance
        await erc20ContractDeployment.increaseAllowance(spender.address, "50");
    
        // Check the allowance
        allowance = await erc20ContractDeployment.allowance(owner.address, spender.address);
        expect(allowance.toString()).to.equal("150");
    
        // Spender transfer tokens from owner to recipient
        await erc20ContractDeployment.connect(spender).transferFrom(owner.address, recipient.address, "100");
    
        // Check the recipient's balance
        const recipientBalance = await erc20ContractDeployment.balanceOf(recipient.address);
        expect(recipientBalance.toString()).to.equal("100");
    
        // Check the deployer's balance
        const deployerBalance = await erc20ContractDeployment.balanceOf(owner.address);
        expect(deployerBalance.toString()).to.equal("99999999999999999900");
      });  
    
  });