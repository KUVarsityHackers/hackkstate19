
// [START app]
const express = require('express');
const path = require('path');
const body_parser = require('body-parser');
const HashMap = require('hashmap')
const { Wallet, XRPAmount, XpringClient, Utils } = require('xpring-js')
const uniqid = require('uniqid')
const fs = require('fs');
const readline = require('readline');
const {Encode, Decode} = require('xrpl-tagged-address-codec')

const app = express();

const remoteURL = "grpc.xpring.tech:80";
const xpringClient = XpringClient.xpringClientWithEndpoint(remoteURL);

const TEST_NET = true;

const unused_wallets = [];
const used_wallets = [];

const sessions = new HashMap();
const instructors = new HashMap();

const readInterface = readline.createInterface({
  input: fs.createReadStream('seeds.txt')
});

readInterface.on('line', function(line) {
  const w = Wallet.generateWalletFromMnemonic(line);
  unused_wallets.push(w);
});

// parse JSON (application/json content-type)
// app.use(body_parser.json());

// returns a new wallet
const reserveWallet = () => {
  const generationResult = Wallet.generateRandomWallet();
  let newWallet = generationResult.wallet;
  used_wallets[newWallet.getAddress()] = newWallet;
  return newWallet.getAddress();
}

const convertAddress = (address) => (address.charAt(0) == 'r') ? Encode({account: address, testnet: TEST_NET}) : address

//returns available balance of a given address in XRP
const getAvailableBalance = async (address) => {
  address = convertAddress(address);

  if(!addressValid(address)) {
    return "Invalid address";
  }
  let balDrops;
  try {
    balDrops = await xpringClient.getBalance(address);
  }
  catch (e) {
    console.log(e);
  }
  
  const balXRP = Number(balDrops)/1000000;
  const availableBalance = balXRP - 20;
  return availableBalance;
}

//returns whether the given address is valid
const addressValid = (address) => {
  address = convertAddress(address);
  return Utils.isValidAddress(address);
}

//sends transfer_amount form wallet_from to address_to
const sendRipple = async (address_to, wallet_from, transfer_amount) => {
  address_to = convertAddress(address_to);
  if(!addressValid(address_to) || !addressValid(wallet_from.getAddress())) {
    throw "Invalid address";
  }
  if(getAvailableBalance(wallet_from.getAddress()) < transfer_amount) {
    throw "Insufficient funds";
  }
  
  const amount =  new XRPAmount();
  amount.setDrops(transfer_amount);

  return await xpringClient.send(amount, address_to, wallet_from);  
}

app.post("/session", (req, res) => {
  const {instructor, subject, title, price} = req.body;
  const {address, name} = instructor;
  const id = uniqid();

  const session = {
    instructor: {address, name},
    title,
    subject,
    price,
    subject,
    id
  }

  if(!instructors.has(address)) {
    instructors.set(address, {address, name});
  }

  sessions.set(id, session);
  res.json(id);
});

app.get("/session", (req, res) => {
  res.json(sessions.values());
});

app.get('/balance/:address', async (req,res) => {
  let {address} = req.params;
  try{
    const bal = Number(await getAvailableBalance(address));
    res.send(String(bal));
  } catch(e) {
    res.send(e);
  }
});

app.get('/session/:sessionId/address/:address/', async (req,res) => {
  const {sessionId, address} = req.params;
  const mySession = sessions.get(sessionId);
  const pricePerHour = mySession.price;
  const transactionDrops = pricePerHour * 1000000;
  if(address !== mySession.instructor.address) {
    try{
      await sendRipple(mySession.instructor.address, src_wallets[address], transactionDrops);
    } catch(e) {
      const balDrops = await getAvailableBalance(address);
      // Return the potential balance if the transaction would have been successful
      res.send( Number(balDrops)/1000000 - transactionDrops);
      res.send(e);
    }
  }
  const balDrops = await getAvailableBalance(address);
  res.send(balDrops/1000000);
});

app.get('/wallet', (req,res) => {
  res.send(reserveWallet());
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'hack-kstate-2019/build')));

// Handles any requests that don't match the ones above
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname+'/hack-kstate-2019/build/index.html'));
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

// [END app]

module.exports = app;
