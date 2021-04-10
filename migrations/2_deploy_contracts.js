var EDU = artifacts.require("./EDUContract.sol");

module.exports = function(deployer) {
  deployer.deploy(EDU);
};
