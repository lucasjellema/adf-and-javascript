subscribeToEvent("color-picker-tf-colorSelectionEvent", handleColorSelection);

function handleColorSelection(payload) {
    console.log("ColorSelectionEvent consumed " + JSON.stringify(payload));
    var color = payload.selectedColor;
    console.log("selected color " + color);
    // invoke function to handle server side synchronization
    informServerAboutColorSelection(color);

    // get hold of ADF Faces Client Side AdfRichSelectOneRadio object
    // we use a trick that assumes only one element is rendered in the entire page with a css style class colorRadio
    // (that also means that page fragment can be included only once and so can the taskflow that this fragment is included in;
    // for this simple example, that is an acceptable limitation)
    var htmlElementForRadio = document.getElementsByClassName("colorRadio");
    // from the HTML element we get the element id and use that as the input for the findComponentByAbsoluteId call that returns the actual ADF Faces AdfRichSelectOneRadio object
    var radio = AdfPage.PAGE.findComponentByAbsoluteId(htmlElementForRadio[0].id);
    // the radio group has multiple select items; their labels and values can be retrieved 
    var sis = radio.getSelectItems();
    // now we can lookup the value of the select item with the label corresponding to the selected color:
    for (i = sis.length - 1;i >= 0;i--) {
        var si = sis[i];
        if (si.getLabel().toLowerCase() == color) {
            radio.setValue(si.getValue());
            break;
        }
        //if
    }
    //for
}
//handleColorSelection

function informServerAboutColorSelection(color) {
    // get hold of the component that contains the serverListener - the select one radio
    // get hold of ADF Faces Client Side AdfRichSelectOneRadio object
    // we use a trick that assumes only one element is rendered in the entire page with a css style class colorRadio
    // (that also means that page fragment can be included only once and so can the taskflow that this fragment is included in;
    // for this simple example, that is an acceptable limitation)
    var htmlElementForRadio = document.getElementsByClassName("colorRadio");
    // from the HTML element we get the element id and use that as the input for the findComponentByAbsoluteId call that returns the actual ADF Faces AdfRichSelectOneRadio object
    var radio = AdfPage.PAGE.findComponentByAbsoluteId(htmlElementForRadio[0].id);

    AdfCustomEvent.queue(radio, "menuColorSelectionEvent", 
    {
        "newColor" : color
    },
    true);
}