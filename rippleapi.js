'use strict';
const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({
  server: 'wss://s.altnet.rippletest.net'
});
api.connect().then(() => {
  /* begin custom code ------------------------------------ */
  const myAddress = 'rpVDn4PcYXgUL4wsXvJLBX3RuzkSCeHyjJ';

  console.log('getting account info for', myAddress);
  return api.getAccountObjects(myAddress);

}).then(info => {
  console.log(info);
  console.log('getAccountInfo done');

  /* end custom code -------------------------------------- */
}).then(() => {
  return api.disconnect();
}).then(() => {
  console.log('done and disconnected.');
}).catch(console.error);