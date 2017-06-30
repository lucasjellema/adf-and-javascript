function toUpper(event) {
    var inputComp = event.getCurrentTarget();
    inputComp.setValue(inputComp.getSubmittedValue().toUpperCase());
}

