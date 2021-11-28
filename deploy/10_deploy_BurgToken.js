require('dotenv').config()

const fs = require("fs");
const rfs = require("recursive-fs");
const fetch = require("node-fetch");

const func = async function (hre) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  const network = await hre.getChainId();

  const contractDeployed = await deploy('BurgToken', {
    from: deployer,
<<<<<<< HEAD
    args: [
    ],
    log: true,
    proxy: true
=======
    args: [],
    log: true,
    proxy: {
      proxyContract: 'OpenZeppelinTransparentProxy',
    },
>>>>>>> proxy
  });

    


  console.log('Verify:');
  console.log('npx hardhat verify --network ' + hre.network.name + ' ' + contractDeployed.address);

};

module.exports = func;
func.tags = ['BurgToken'];
