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
