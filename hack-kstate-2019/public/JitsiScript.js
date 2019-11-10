const options = {
    "roomName": document.currentScript.getAttribute('arg'),
    "width": "80%",
    "height": "80%", 
    "parentNode": document.getElementById("scriptId"),
    "configOverwrite": {},
    "interfaceConfigOverwrite": {
    "filmStripOnly": false
    }
};
const domain = "meet.jit.si";
const api = new JitsiMeetExternalAPI(domain, options);
