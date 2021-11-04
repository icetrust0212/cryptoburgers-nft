// We import Chai to use its asserting functions here.
const {
  expect
} = require("chai");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const { keccak256 } = require("ethers/lib/utils");
const bytes = require("bytes");
require('dotenv').config();
// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("NFT contract", function () {
  // Mocha has four functions that let you hook into the the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.

  let Token;
  let hardhatToken;
  let owner;
  let web3;
  
  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("Burger");
    [owner, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    let API_URL = "https://eth-rinkeby.alchemyapi.io/v2/vAQGLxQXiYIWXYDEjHX_huSpSxhaAJs3";
    web3 = createAlchemyWeb3(API_URL);
    hardhatToken = await Token.deploy();
  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {
    // `it` is another Mocha function. This is the one you use to define your
    // tests. It receives the test name, and a callback function.

    // If the callback function is async, Mocha will `await` it.
    it("Should set the right owner", async function () {
      // Expect receives a value, and wraps it in an Assertion object. These
      // objects have a lot of utility methods to assert values.

      // This test expects the owner variable stored in the contract to be equal
      // to our Signer's owner.
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });
  });

  describe("Set VERIFY_ADDRESS", function() {
    it("set verify address", async function () {
      await hardhatToken.setVerifiedAddress(process.env.ACCOUNT_PUBLIC_KEY);
      expect(await hardhatToken.getVerfiedAddress()).to.equal(process.env.ACCOUNT_PUBLIC_KEY);
    });
  })

  describe("Signature", function () {
    it("sign", async function () {
      await hardhatToken.setVerifiedAddress(process.env.ACCOUNT_PUBLIC_KEY);
      const data = "This is test data";
      let signature =web3.eth.accounts.sign(data, process.env.ACCOUNT_PRIVATE_KEY);
      const verified = await hardhatToken._verify(signature.messageHash, signature.signature);      
      expect(verified).to.equal(true);
    });

    it("verify message: ", async function () {
      const data = "this is test data";
      let signature = web3.eth.accounts.sign(data, process.env.ACCOUNT_PRIVATE_KEY);
    
      // expect(await hardhatToken.verifyMessage(data, signature.messageHash)).to.equal(true);
    })
  });

});