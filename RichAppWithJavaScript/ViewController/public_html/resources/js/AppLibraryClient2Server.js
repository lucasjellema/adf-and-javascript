function helpCallListener(actionEvent) {
    var comp = actionEvent.getSource();
    // the helpTopic is set as a clientAttribute on the button; here we retrieve the value of that clientAttribute
    var topic = comp.getProperty('helpTopic');

    AdfCustomEvent.queue(comp, "callForHelpListener", 
    {
        "helpTopic" : "the topic for help: " + topic
    },
    true);
    actionEvent.noResponseExpected() ;
}




var keyRegistry = new Array();
keyRegistry.push("alt T");

function registerKeyBoardHandler(event) {
    for (var i = keyRegistry.length - 1;i >= 0;i--) {
        var keyStroke = AdfKeyStroke.getKeyStrokeFromMarshalledString(keyRegistry[i]);
        AdfRichUIPeer.registerKeyStroke(event.getSource(), keyStroke, callBack);
    }
}


function callBack(keyCode) {
    var marshalledKeyCode = keyCode.toMarshalledString(keyCode);
    var refreshTime = marshalledKeyCode == "alt T";
    if (refreshTime) {
    // find the document component with id = doc
    var doc= AdfPage.PAGE.findComponentByAbsoluteId("doc");
    
    // trigger the refreshTimeListener server listener on the document component
    AdfCustomEvent.queue(doc, "refreshTimeListener", 
    {
    },
    false);
        
    }
}

function init(event) {
    registerKeyBoardHandler(event);
}