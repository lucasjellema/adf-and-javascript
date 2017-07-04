subscribeToEvent("newBackgroundColorEvent", handleBackgroundColorSelection);

function handleBackgroundColorSelection(payload) {
    console.log("BackgroundColorSelectionEvent consumed in panelboxtaskflow" + JSON.stringify(payload));
    //r3:0:pbyellow
      //find panelbox component for selected color 
    var panelBox = AdfPage.PAGE.findComponentByAbsoluteId("r3:0:pb"+payload.color);
    panelBox.scrollIntoView(true,null);
    panelBox.setDisclosed(true);
    

}
