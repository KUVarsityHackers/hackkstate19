import uniqid from "uniqid";
import express from "express";
import path from "path";
import body_parser from "body-parser";
import { Wallet, XRPAmount, XpringClient, Utils } from "xpring-js"


// [START app]
const app = express();

const remoteURL = "grpc.xpring.tech:80";
const xpringClient = XpringClient.xpringClientWithEndpoint(remoteURL);



// parse JSON (application/json content-type)
app.use(body_parser.json());

//returns a new wallet WORKING
const createNewWallet = () => {
  const generationResult = Wallet.generateRandomWallet();
  return generationResult.wallet;
}

//returns balance of a given address WORKING
//can throw, returns a bigint
const getBalance = async (address) => {
  if(!addressValid(address)) {
    return "Invalid address";
  }

  return await xpringClient.getBalance(address);
}

//returns whether the given address is valid WORKING
const addressValid = (address) => {
  return Utils.isValidAddress(address);
}

//sends transfer_amount form wallet_from to address_to
//can throw
const sendRipple = async (address_to, wallet_from, transfer_amount) => {
  if(!addressValid(address_to)) {
    return "Invalid address to";
  }

  const amount = XRPAmount.new(transfer_amount);
  amount.setDrops(transfer_amount);
  return await xpringClient.send(amount, address_to, wallet_from);  
}

//starts the money stream from wallet_from to addr_to at rate per minute
//Can throw
const startMoneyStream = (addr_to, wallet_from, rate) => {
  const tickerInterval = setInterval(() => {
    //sendRipple(addr_to, wallet_from, rate);
  }, 60000);
  return tickerInterval;
}

//clears the ticker interval
const stopMoneyStream = (moneyStream) => {
  clearInterval(moneyStream);
}

let x = startMoneyStream("","","");
stopMoneyStream(x);


app.post("/session", (req, res) => {
<<<<<<< Updated upstream
  const {instructor, subject, title, price} = req.body;
  const item = {
    subject,
    title,
    price,
    instructor
  }
=======
  const item = {name, subject, title, price} = req.body;
  const sessionID = uniqid();
>>>>>>> Stashed changes
  sessions.push(item)
  res.json({code: "AWBSEW"});
});

app.get("/session", (req, res) => {
  res.json(sessions);
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'hack-kstate-2019/build')));

app.get('/checkbal', async (req,res) => {
  let x = Number(await getBalance("XV4drF7fLvCsixD8iy3RoeSNLzeFThLoaEZ5CBL1B2nAnfy"));
  console.log(x);
  let y = String(x/1000000);
  res.send(y);
});

app.get('/send', async (req,res) => {
  //sendRipple("XV4drF7fLvCsixD8iy3RoeSNLzeFThLoaEZ5CBL1B2nAnfy", w, 100);
  x = startMoneyStream("","","");
  res.send("H");
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
