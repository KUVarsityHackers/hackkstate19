var options = {
    "roomName": document.currentScript.getAttribute('arg'),
    "width": "80%",
    "height": "80%", 
    "parentNode": document.getElementById("scriptId"),
    "configOverwrite": {},
    "interfaceConfigOverwrite": {
    "filmStripOnly": false
    }
};
var domain = "meet.jit.si";
var api = new JitsiMeetExternalAPI(domain, options);
