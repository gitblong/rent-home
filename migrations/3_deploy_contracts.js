var RentContractProducter = artifacts.require("RentContractProducter");
// var ArrayStorage = artifacts.require("ArrayStorage");
module.exports = function (deployer) {
    deployer.deploy(RentContractProducter);
    // deployer.deploy(ArrayStorage);
};
