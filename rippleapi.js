'use strict';


const api = new RippleAPI({
  server: 'wss://s.altnet.rippletest.net'
});
api.connect().then(() => {
  /* begin custom code ------------------------------------ */
  const myAddress = 'rpVDn4PcYXgUL4wsXvJLBX3RuzkSCeHyjJ';

  console.log('getting account info for', myAddress);
  return api.getAccountInfo(myAddress);

}).then(info => {
  return api.getTransaction(info.previousAffectingTransactionID);


  /* end custom code -------------------------------------- */
}).then(info => {
    console.log(info.specification.source.address);
    console.log('getAccountInfo done');
  
    /* end custom code -------------------------------------- */
}).then(() => {
  return api.disconnect();
}).then(() => {
  console.log('done and disconnected.');
}).catch(console.error);