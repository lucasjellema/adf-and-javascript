var originalField;// holds the field for which the extended editor is launched
var extendedField;// holds the extended editor field
// to be called when the user tabs out of the extended field editor
function copyExtendedEditorValueToOriginal() {
    // value from extended field
    //    var extendedField = event.getSource();
    var value = extendedField.getSubmittedValue();
    // now set this value on the original field
    originalField.setValue(value);
}

// to be called when the Extended Editor popup is opening
// find out from which component the popup is opening
// copy value from that component to the popup extended field
function extendedFieldPopupOpening(event) {
    var hints = event.getHints();
    var launchId = hints.launchId;
    originalField = AdfPage.PAGE.findComponentByAbsoluteId(launchId);
    var orginalValue = originalField.getSubmittedValue();
    extendedField = AdfPage.PAGE.findComponentByAbsoluteId("theExtendedField");
    extendedField.setValue(orginalValue);

}

function handleDialogEvent(event) {
    var dialog = event.getSource();
    var outcome = event.getOutcome();
    if ("ok" == outcome) {
        copyExtendedEditorValueToOriginal();
    }
}

//programmatically show popup for input field
function showPopup(component) {
    var popupId = "p1";
    var popup = AdfPage.PAGE.findComponentByAbsoluteId(popupId);

    if (!popup.isPopupVisible()) {
        var hints = {
        };
        hints[AdfRichPopup.HINT_LAUNCH_ID] = component.getClientId();
        hints[AdfRichPopup.HINT_ALIGN_ID] = component.getClientId();
        hints[AdfRichPopup.HINT_ALIGN] = AdfRichPopup.ALIGN_START_AFTER;

        popup.show(hints);
    }
}

var keyRegistry = new Array();
keyRegistry.push("alt E");

function registerKeyBoardHandler(event) {
    for (var i = keyRegistry.length - 1;i >= 0;i--) {
        var keyStroke = AdfKeyStroke.getKeyStrokeFromMarshalledString(keyRegistry[i]);
        AdfRichUIPeer.registerKeyStroke(event.getSource(), keyStroke, callBack);
    }
}

function callBack(keyCode) {
    var marshalledKeyCode = keyCode.toMarshalledString(keyCode);
    var extendedEditor = marshalledKeyCode == "alt E";
    var ac = AdfPage.PAGE.getActiveComponent();

    if (extendedEditor && ac instanceof AdfRichInputText) {
        showPopup(ac)
    }
}

function init(event) {
    registerKeyBoardHandler(event);
}