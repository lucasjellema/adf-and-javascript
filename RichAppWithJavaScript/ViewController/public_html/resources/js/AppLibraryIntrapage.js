// server side scroll into view described in: https://blogs.oracle.com/groundside/programmatic-ui-scrolling-in-adf-faces
//scroll to end by publishing action event on button (that has scrollComponentIntoViewBehavior child)
function gotoEnd(activeComponent) {
    var commandButton = AdfPage.PAGE.findComponent("b2");
    AdfActionEvent.queue(commandButton, false);
}
//scroll to begin by publishing action event on button (that has scrollComponentIntoViewBehavior child)
function gotoBegin(activeComponent) {
    var commandButton = AdfPage.PAGE.findComponent("b1");
    AdfActionEvent.queue(commandButton, false);
}

var keyRegistry = new Array();
keyRegistry.push("alt E");
keyRegistry.push("alt T");

function registerKeyBoardHandler(event) {
    for (var i = keyRegistry.length - 1;i >= 0;i--) {
        var keyStroke = AdfKeyStroke.getKeyStrokeFromMarshalledString(keyRegistry[i]);
        AdfRichUIPeer.registerKeyStroke(event.getSource(), keyStroke, callBack);
    }
}

function callBack(keyCode) {
    var marshalledKeyCode = keyCode.toMarshalledString(keyCode);
    var scrollToEnd = marshalledKeyCode == "alt E";
    var scrollToBegin = marshalledKeyCode == "alt T";
    var ac = AdfPage.PAGE.getActiveComponent();

    if (scrollToEnd) {
        gotoEnd(ac);
    }
    if (scrollToBegin) {
        gotoBegin(ac);
    }
}

function init(event) {
    registerKeyBoardHandler(event);
}