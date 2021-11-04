require('dotenv').config()

const MAINNET = "1"
const ROPSTEN = "3";
const RINKBY = "4";
const KOVAN = "42";

const fs = require("fs");
const rfs = require("recursive-fs");
const fetch = require("node-fetch");

const func = async function (hre) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  
  const {deployer} = await getNamedAccounts();
  const network = await hre.getChainId();
 

  await deploy('Burger', {
    from: deployer,
    args: [
    ],
    log: true
  });
};

module.exports = func;
func.tags = ['Burger'];