const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const { interface, bytecode } = require('./compile');
const provider = new HDWalletProvider(
  'grain inner breeze orphan face kingdom ozone clap net wasp task drastic',
  'https://rinkeby.infura.io/DhhqmbDzpN4Dw2YHu0kQ'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(`attempting to deploy from the account ${accounts}`);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['hello there !!'] })
    .send({ gas: '1000000', from: accounts[0] });
  console.log(`contract deployed to ${result.options.address}`)
}
deploy();

