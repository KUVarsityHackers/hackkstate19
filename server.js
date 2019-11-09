
// [START app]
const express = require('express');
const path = require('path');
const body_parser = require('body-parser');
const { Wallet, XRPAmount, XpringClient, Utils } = require('xpring-js')
const uniqid = require('uniqid')

const app = express();

const remoteURL = "grpc.xpring.tech:80";
const xpringClient = XpringClient.xpringClientWithEndpoint(remoteURL);

const sessions = [];
const instructors = {};

const src_wallets = [];
const dest_address = [];
const running_streams = [];


// parse JSON (application/json content-type)
app.use(body_parser.json());

//returns a new wallet WORKING
const createNewWallet = () => {
  const generationResult = Wallet.generateRandomWallet();
  let newWallet = generationResult.wallet;
  src_wallets[newWallet.getAddress()] = newWallet;
  return newWallet.getAddress();
}

//returns balance of a given address WORKING
//can throw, returns a bigint
const getBalance = async (address) => {
  if(!addressValid(address)) {
    return "Invalid address";
  }
  console.log("Valid addr " + address);
  return await xpringClient.getBalance(address);
}

//returns whether the given address is valid WORKING
const addressValid = (address) => {
  return Utils.isValidAddress(address);
}

//sends transfer_amount form wallet_from to address_to
//can throw
const sendRipple = async (address_to, wallet_from, transfer_amount) => {
  if(!addressValid(address_to) || !addressValid(wallet_from.getAddress())) {
    throw "Invalid address";
  }
  console.log("Valid addr " + address_to + " and " + wallet_from.getAddress());
  const amount =  new XRPAmount();
  amount.setDrops(transfer_amount);
  return await xpringClient.send(amount, address_to, wallet_from);  
}

//starts the money stream from wallet_from to addr_to at rate per minute
//Can throw
const startMoneyStream = (addr_to, wallet_from, rate) => {
  const tickerInterval = setInterval(() => {
    sendRipple(addr_to, wallet_from, rate);
  }, 60000);
  return tickerInterval;
}

//clears the ticker interval
const stopMoneyStream = (moneyStream) => {
  clearInterval(moneyStream);
}

app.post("/session", (req, res) => {

  const {instructor, subject, title, price} = req.body;

  const sessionID = uniqid();

  const item = {
    subject,
    title,
    price,
    instructor,
    id: sessionID
  }
  if(!instructors[instructor.publickey]) {
    instructors[instructor.publickey] = {name: instructor.name, sessionID}
  }
  sessions.push(item);
  dest_address[sessionID] = item;

  res.json(sessionID);
});

app.get("/session", (req, res) => {
  res.json(sessions);
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'hack-kstate-2019/build')));

app.post('/checkbalance', async (req,res) => {
  const {addr} = req.body;
  try{
    const x = Number(await getBalance(addr));
    res.send(String(x/1000000));
  } catch(e) {
    console.log(e);
    res.send(e);
  }
});

app.post('/send', async (req,res) => {
  const {dest, src, amt} = req.body;
  const amtDrops = Number(amt)*1000000;
  try{
    const result = await sendRipple(dest, src_wallets[src], amtDrops);
    res.send(result);
  } catch(e) {
    res.send(e);
  }
});

app.get('/createwallet', (req,res) => {
  res.send(createNewWallet());
});

app.post('/startstream', (req,res) => {
  const {session_id, src_pub_key} = req.body;;
  running_streams[src_pub_key] = startMoneyStream(dest_address[session_id].instructor.publickey, src_wallets[src_pub_key], Number(dest_address[session_id].price)*1000000);
  res.send(src_pub_key);
});

app.post('/stopstream', (req,res) => {
  const {src_pub_key} = req.body;
  stopMoneyStream(running_streams[src_pub_key]);
  res.send(src_pub_key);
});

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
