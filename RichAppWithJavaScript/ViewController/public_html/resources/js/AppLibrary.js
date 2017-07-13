function toUpper(event) {
    var inputComp = event.getCurrentTarget();
    inputComp.setValue(inputComp.getSubmittedValue().toUpperCase());
}


function recalc(event) {
    var sourceComp = event.getCurrentTarget();
    var inputA = sourceComp.findComponent("numberFieldA");
    var inputB = sourceComp.findComponent("numberFieldB");
    var totalField = sourceComp.findComponent("totalNumberField");
    var total = parseInt(inputA.getSubmittedValue()) + parseInt(inputB.getSubmittedValue());
    totalField.setValue(total);
}

// based on http://www.awasthiashish.com/2014/09/show-message-invoke-facesmessage-using.html#sthash.5msYPNe7.dpbs
function doNotLeaveRequiredField(event) {
    var element = event.getSource();
    var val = element.getValue();
    var cid = element.getClientId();
    AdfPage.PAGE.clearAllMessages();
    if (val == null || val.length == 0) {
        element.focus();
        event.cancel();
        AdfPage.PAGE.addMessage(cid, new AdfFacesMessage(AdfFacesMessage.TYPE_ERROR, "Required Value Missing", "Enter a value please"));
        AdfPage.PAGE.showMessages(cid);
    }
}

// based on http://www.awasthiashish.com/2014/09/show-message-invoke-facesmessage-using.html#sthash.5msYPNe7.dpbs
function setFocusWhenValidateFail(event) {
    var element = event.getSource();
    var val = element.getValue();
    var cid = element.getClientId();
    AdfPage.PAGE.clearAllMessages();
    if (val == null || val.length == 0) {
        element.focus();
        event.cancel();
        AdfPage.PAGE.addMessage(cid, new AdfFacesMessage(AdfFacesMessage.TYPE_ERROR, "Required Value Missing", "Enter a value please"));
        AdfPage.PAGE.showMessages(cid);
    }
    else {
        console.log("caller with " + cid + " and " + val)
        //call bean method validateServerListener
        AdfCustomEvent.queue(element, "validateServerListener", 
        {
            fcid : cid, fvalue : val
        },
        false);
        event.cancel();
    }
}


function init(event) {
//  addListener("smartDate::content", "blur", handleSmartDate)
}