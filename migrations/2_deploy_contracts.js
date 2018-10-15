var HouseInfo = artifacts.require("HouseInfo");
var ArrayStorage = artifacts.require("ArrayStorage");
module.exports = function (deployer) {
    deployer.deploy(HouseInfo);
    deployer.deploy(ArrayStorage);
};
