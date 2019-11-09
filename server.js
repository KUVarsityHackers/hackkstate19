import uniqid from "uniqid";
import express from "express";
import path from "path";
import body_parser from "body-parser";
import { Wallet, XRPAmount, XpringClient, Utils } from "xpring-js"


// [START app]
const app = express();

const remoteURL = "grpc.xpring.tech:80";
const xpringClient = XpringClient.xpringClientWithEndpoint(remoteURL);

<<<<<<< HEAD
const express = require('express');
const path = require('path');
const body_parser = require('body-parser');
const sessions = [];
const src_wallets = [];
const dest_address = [];
const running_streams = [];
const app = express();
=======
>>>>>>> e50e449301aba110a6526e48e4125571f997208f

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
  const item = {name, subject, title, price} = req.body;
  const sessionID = uniqid();
  sessions.push(item)
  res.json({code: "AWBSEW"});
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
  const {session_id, src_pub_key, rate} = req.body;
  running_streams[src_pub_key] = startMoneyStream(dest_addresss[session_id], src_wallets[src_pub_key], rate);
  res.send(src_pub_key);
});

app.post('/stopstream', (req,res) => {
  stopMoneyStream(running_streams[src_pub_key]);
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
