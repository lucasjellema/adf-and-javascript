//API reference: http://docs.oracle.com/middleware/1221/adf/api-reference-javascript-faces/toc.htm 

var jsonData = {};

function handeJsonPayloadContainer(container) {
    // from the HTML element we get the element id and use that as the input for the findComponentByAbsoluteId call that returns the actual ADF Faces AdfRichSelectOneRadio object
    var adfContainer = AdfPage.PAGE.findComponentByAbsoluteId(container.id);
    var clientAttributes = adfContainer.getProperty('jsonPayloadAttributes');
    // replace all single quotes with double quotes    
    var json = clientAttributes.replace(/[']/g, "\"");
    // get a list of the names of the client attributes that this container has that should all be processed
    var clientAtts = JSON.parse(json).attributes;
    //loop over all clientAttribute names and fetch the value for each of them
    for (i = 0; i < clientAtts .length; i++) {
        // get the value for a specific Client Attribute 
        var value = JSON.parse(adfContainer.getProperty(clientAtts[i]));
        // here is the place and time to pass the JSON payload to a place where JET can access it (or store in a global JS variable)
        jsonData[clientAtts[i]]= value;
        alert(JSON.stringify(jsonData[clientAtts[i]].attributes));
    };//for
    
}

function initializeJsonPayloads() {

    // get hold of all ADF Faces Client Side object that have the styleClass jsonPayload
    // (these all have a clientAttribute that contains a JSON payload that we want to have access to in the client)
    var jsonContainers = document.getElementsByClassName("jsonPayload");
    for (i = 0; i < jsonContainers.length; i++) {
      handeJsonPayloadContainer(jsonContainers[i]);
    };//for
}

