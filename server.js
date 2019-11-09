/**
 * Copyright 2018, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START app]
const { Wallet, XRPAmount, XpringClient, Utils } = require("xpring-js");
const remoteURL = "grpc.xpring.tech:80";
const xpringClient = XpringClient.xpringClientWithEndpoint(remoteURL);

const express = require('express');
const path = require('path');
const body_parser = require('body-parser');

const app = express();

const testSession1 = {  "subject": "Calc",
                        "instructor": {
                          "name": "Colin",
                          "id": "234234"
                        },
                        "title": "Colin's Crazy Confusing Calc Classroom",
                        "price": "5.0",
                      };
const testSession2 = { 
                      "instructor": {
                        "name": "Colin",
                        "id": "234234"
                      },
                      "subject": "Astronomy",
                      "name": "Andre",
                      "title": "Andre's Awesome Astronomy Articulation",
                      "price": "75.0",
                    };

const sessions = [testSession1, testSession2];

// parse JSON (application/json content-type)
app.use(body_parser.json());

//returns a new wallet
const createNewWallet = () => {
  const generationResult = Wallet.generateRandomWallet();
  return generationResult.wallet;
}

//returns balance of a given address
//can throw
const getBalance = async (address) => {
  if(!addressValid(address)) {
    throw "Invalid address";
  }
  return await (xpringClient.getBalance(address)).getDrops();
}

//returns whether the given address is valid
const addressValid = (address) => {
  return Utils.isAddressValid(address);
}

//sends transfer_amount form wallet_from to address_to
//can throw
const sendRipple = async (address_to, wallet_from, transfer_amount) => {
  if(!addressValid(address_to)) {
    throw "Invalid address to";
  }

  const amount = XRPAmount.new(transfer_amount);
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
  const item = {
    subject,
    title,
    price,
    instructor
  }
  sessions.push(item)
  res.json({code: "AWBSEW"});
});

app.get("/session", (req, res) => {
  res.json(sessions);
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'hack-kstate-2019/build')));

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/hack-kstate-2019/build/index.html'));
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

// [END app]

module.exports = app;
