const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //constuctor function
const { interface, bytecode } = require('../compile');
const provider = ganache.provider();
const web3 = new Web3(provider);
const INITIAL_STRING = 'hello there';
let accounts;
let inbox;
beforeEach(async () => {
  // get a  list of all accounts
  accounts = await web3.eth.getAccounts()
  //use one of the accounts to deploy the contracts
  inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({
    data: bytecode,
    arguments: [INITIAL_STRING]
  }).send({
    from: accounts[0],
    gas: '1000000'
  });
  inbox.setProvider(provider);

});

describe('Inbox', () => {
  it('deploys a contract', () => {
    // console.log(inbox)
    assert.ok(inbox.options.address); //check if the address is defined ie not null or undefined

  });
  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });
  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert(message, 'bye');
  })
});