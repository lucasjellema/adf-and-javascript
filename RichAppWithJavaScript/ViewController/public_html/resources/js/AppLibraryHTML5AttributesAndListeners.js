function addAttribute(elementId, attributeName, attributeValue) {
    var elem = document.getElementById(elementId);
    elem.setAttribute(attributeName, attributeValue);
}

function addListener(elementId, type, functionRef) {
    var el = document.getElementById(elementId);
    el.addEventListener(type, functionRef, false);
}

function handleSelectionEvent(e) {
    var elem = e.currentTarget;
    var obj = elem.selectionStart;
    var obj2 = elem.selectionEnd;
    //  elem.setSelectionRange(2,5)
    console.log('selection made in component ' + obj + '-' + obj2);
}

function handlePasteEvent(e) {
    var elem = e.currentTarget;
    console.log('paste performed from clipboard on in component ' + elem.id + ": " + e.clipboardData.getData("text/plain"));
}

function addListenersToTheFields() {
    var id = "theField::content";
    addListener(id, "select", function (e) {
        handleSelectionEvent(e)
    })
    addListener(id, "paste", function (e) {
        handlePasteEvent(e)
    })
}

function addAttributesToTheFields() {
    var id = "theField::content";
    addAttribute(id, "maxlength", 5);
    addAttribute(id, "placeholder", "enter");

    id = "theNumberField::content";
    addAttribute(id, "type", "number");
    addAttribute(id, "min", "0");
    addAttribute(id, "max", "10");
    addAttribute(id, "step", "2");

    id = "theRangeField::content";
    addAttribute(id, "type", "range");
    addAttribute(id, "min", "0");
    addAttribute(id, "max", "10");
    addAttribute(id, "step", "2");

    id = "theListField::content";
    addAttribute(id, "list", "fruitList");

}

function addOption(datalist, value) {
    var option = document.createElement("option");
    option.value = value;
    datalist.appendChild(option);
}

function addDataList() {
    // programmatically create datalist and link to input elements fruit and basket
    var datalist = document.createElement("DATALIST");
    datalist.setAttribute("id", "fruitList");
    document.getElementById("f1").appendChild(datalist);
    addOption(datalist, "Apples");
    addOption(datalist, "Pears");
    addOption(datalist, "Oranges");
}

function init() {
    addDataList();
    addAttributesToTheFields();
    addListenersToTheFields();
}

function handleContextMenuEvent(event) {
    var inputComponent = event.getSource();
    inputComponent.setValue("fresh");
    // stop the event from bubbling
    event.cancel();
}