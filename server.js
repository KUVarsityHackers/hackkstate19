
// [START app]
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const HashMap = require('hashmap')
const { Wallet, XRPAmount, XpringClient, Utils } = require('xpring-js')
const uniqid = require('uniqid')
const fs = require('fs');
const readline = require('readline');
const {Encode, Decode} = require('xrpl-tagged-address-codec')
const {RippleAPI} = require('ripple-lib');

const app = express();

const nocache = require('nocache');
app.use(nocache());
app.set('etag', false)

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
  deleteWallet(w);
  console.log(w.getPublicKey());
  unused_wallets.push(w);
});

const schedule = require('node-schedule');
schedule.scheduleJob('0 0 * * *', () => { console.log("Withdrawing all wallets")
      used_wallets.forEach((w) => {
        deleteWallet(w);
        console.log(w.getPublicKey());
        unused_wallets.push(w); });
      })

// parse JSON (application/json content-type)
// app.use(body_parser.json());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// returns a new wallet
const reserveWallet = () => {
  const newWallet = unused_wallets.shift();
  const rAddress = Decode(newWallet.getAddress()).account;
  used_wallets[rAddress] = newWallet;
  return rAddress;
}

const convertAddress = (address) => (addressValid(address) && address.charAt(0) == 'r') ? Encode({account: address}) : address

//returns available balance of a given address in XRP
const getAvailableBalance = async (address) => {
  address = convertAddress(address);

  if(!addressValid(address)) {
    return "Invalid address";
  }
  try {
    const balDrops = await xpringClient.getBalance(address);
    const balXRP = Number(balDrops)/1000000;
    const availableBalance = balXRP - 20;
    return availableBalance;
  }
  catch (e) {
    console.log(e);
    throw "Balance Failed";
  }
}

//returns whether the given address is valid
const addressValid = (address) => {
  return Utils.isValidAddress(address);
}

//sends transfer_amount form wallet_from to address_to in XRP
const sendRipple = async (address_to, wallet_from, transfer_amount) => {
  address_to = convertAddress(address_to);
  if(address_to == wallet_from.getAddress()) {
    throw "Cannot send to self";
  }
  if(!addressValid(address_to) || !addressValid(wallet_from.getAddress())) {
    throw "Invalid address";
  }
  try {
    if((await getAvailableBalance(wallet_from.getAddress())) < transfer_amount) {
      throw "Insufficient funds";
    }
  } catch(e) {
    throw e.message
  }

  const amount =  Math.floor(transfer_amount * 1000000);
  try {
    const response = await xpringClient.send(amount, address_to, wallet_from); 
    return response;
  } catch (err) {
    throw "Pay Error"
  }
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
  const address = req.params.address;
  try{
    const balance = await getAvailableBalance(address);
    res.send(String(balance));
  } catch(e) {
    res.status(400).send(String(e));
  }
});

const deleteWallet = async (wallet) => {
  try {
    console.log("Delete wallet called")
    const address = convertAddress(wallet.getAddress());
    const api = new RippleAPI({server: 'wss://s.altnet.rippletest.net'});
    console.log("Ripple api amde")
    await api.connect();
    console.log("ripple api connection made")
    console.log("Address", address)
    const accountInfo = await api.getAccountInfo(address);
    console.log("have account info")
    const txsInfo = await api.getTransactions(address, {limit:accountInfo.sequence});
    const lsSenders = txsInfo.map((entry) => {if(convertAddress(entry.specification.source.address) != convertAddress(address)) return entry;}, []).filter(function( element ) {
      return element !== undefined;})
    if(lsSenders.length > 0) {
      console.log("senders list non-zero")
      const lastTransactionSender = lsSenders[0].specification.source.address;
      const balance = await getAvailableBalance(address);
      console.log("Balance", balance)
      const xSender = convertAddress(lastTransactionSender);
      console.log("Xsender", xSender)
      if(balance > .2) {
        console.log("Before send ripple")
        const result = await sendRipple(xSender, wallet, balance - .1);  
        console.log("after send ripple")
        await api.disconnect();
        return result;
      }
      await api.disconnect();
    }
  } catch(e) {
    throw (String (e))
  }
  return null;
}

app.delete('/address/:address', async (req,res) => {
  console.log("Delete", req.params.address);
  let wallet = used_wallets[req.params.address];
  if(!wallet) {
    const u_wallet = unused_wallets.find((w) => {return Decode(w.getAddress()).account == req.params.address } )
    wallet = u_wallet;
  }
  if(!wallet) {
    console.log("No Wallet Found")
    res.send("No Wallet found for Address");
    return
  }
  try{
    console.log("Deleting", wallet)
    await deleteWallet(wallet);
    console.log("Done Deleting")
    unused_wallets.push(wallet);
    used_wallets[req.params.address] = undefined;
    console.log("successful delete")
  }
  catch(e) {}
  res.send("OK");
});

app.get('/session/:sessionId/address/:address', async (req,res) => {
  const sessionId = req.params.sessionId;
  const address = req.params.address;
  if(address == "invalid") {
    res.status(200).send(String(-1));
    return
  }

  if(sessions.has(sessionId)) {
    const mySession = sessions.get(sessionId);
    const pricePerHour = mySession.price;
    const secondsPerRequest = 5;
    const pricePerSecond = Number(pricePerHour*secondsPerRequest) / (60*60);
    try{
      const oldBalance = await getAvailableBalance(address);
      if(address != mySession.instructor.address) {
        try {
            if(used_wallets[address])
            await sendRipple(mySession.instructor.address, used_wallets[address], pricePerSecond);
          }
          catch(e) {
            res.status(200).send(String(oldBalance - pricePerSecond));
            return;
          }
      }
      const newBalance = await getAvailableBalance(address);
      res.status(200).send(String(newBalance));
    }
    catch(e) {
      res.status(200).send(String(0 - pricePerSecond));
    }
  }
  else {
    try {
      const balance = await getAvailableBalance(address);
      res.status(200).send(String(balance));
    }
    catch(e) {
      res.status(200).send(String(0));
    }
  }
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
