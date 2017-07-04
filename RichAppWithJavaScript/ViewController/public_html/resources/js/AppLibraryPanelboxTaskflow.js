subscribeToEvent("newBackgroundColorEvent", handleBackgroundColorSelection);

// client identifier of the localAnchor in this panelBox taskflow
var localAnchorPanelBox ;
function handleBackgroundColorSelection(payload) {
    console.log("BackgroundColorSelectionEvent consumed in panelboxtaskflow" + JSON.stringify(payload));
    // find anchor component based on client identifier for localAnchor       
    var anchor = AdfPage.PAGE.findComponentByAbsoluteId(localAnchorPanelBox);  
      //find panelbox component for selected color in the same naming container as the anchor
    var panelBox = anchor.findComponent("pb"+payload.color);
    panelBox.setDisclosed(true);
    panelBox.scrollIntoView(true,null);    
}
