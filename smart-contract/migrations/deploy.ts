// Deployment script for Hope Rise smart contract
const anchor = require("@coral-xyz/anchor");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
module.exports = async function (provider: any) {
  anchor.setProvider(provider);

  // Add deployment logic here if needed
  console.log("Deploying Hope Rise to", provider.connection.rpcEndpoint);
};
