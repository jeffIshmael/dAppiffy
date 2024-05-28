const hre = require("hardhat");

async function main() {
  //compile the contract to get the latest bytecode and ABI
  await hre.run("compile");

  //get the smart contract
  const dappify = await hre.ethers.getContractFactory("dAppify");

  //deploy the dAppify smart contract
  const deployeddApp = await dappify.deploy();
  await deployeddApp.waitForDeployment();
  console.log("dAppify deployed to:", await deployeddApp.getAddress());
}

//handle errors from main()
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
