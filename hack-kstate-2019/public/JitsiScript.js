const options = {
    "roomName": document.currentScript.getAttribute('arg'),
    "width": 700,
    "height": 700,
    "parentNode": undefined,
    "configOverwrite": {},
    "interfaceConfigOverwrite": {
    "filmStripOnly": false
    }
};
console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
console.log(document.currentScript.getAttribute('arg'));
console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
const domain = "meet.jit.si";
const api = new JitsiMeetExternalAPI(domain, options);
