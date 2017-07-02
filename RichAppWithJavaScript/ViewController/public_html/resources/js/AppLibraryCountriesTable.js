//programmatically show popup 
function showPopup(popup, launchingComponent) {
    if (!popup.isPopupVisible()) {
        var hints = {
        };
        hints[AdfRichPopup.HINT_LAUNCH_ID] = launchingComponent.getClientId();
        popup.show(hints);
    }
}

function handleTableDoubleClick(event) {
    var table = event.getSource();
    //AdfCustomEvent.queue(table, "TableDoubleClickEvent",{}, true);         
    var popup = table.findComponent("::countryDetails");
    showPopup(popup, table);
    event.cancel();
    //<af:showPopupBehavior triggerType="dblClick" popupId="::countryDetails"/>
}

function init(event) {
}