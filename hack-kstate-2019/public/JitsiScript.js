var options = {
    "roomName": document.currentScript.getAttribute('arg'),
    "width": "100%",
    "height": "100%", 
    "parentNode": document.getElementById("scriptId"),
    "configOverwrite": {},
    "interfaceConfigOverwrite": {
    "filmStripOnly": false
    }
};
var domain = "meet.jit.si";
var api = new JitsiMeetExternalAPI(domain, options);
