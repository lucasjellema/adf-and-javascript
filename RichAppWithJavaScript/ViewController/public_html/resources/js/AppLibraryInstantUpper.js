
// https://technology.amis.nl/2016/06/30/force-text-to-uppercase-in-richinputtext-as-the-user-is-typing-make-sure-the-cursor-stays-in-one-place/
/* source: http://stackoverflow.com/questions/2897155/get-cursor-position-in-characters-within-a-text-input-field */
function getCaretPosition(oField) {

    // Initialize
    var iCaretPos = 0;

    // IE Support
    if (document.selection) {

        // Set focus on the element
        oField.focus();

        // To get cursor position, get empty selection range
        var oSel = document.selection.createRange();

        // Move selection start to 0 position
        oSel.moveStart('character',  - oField.value.length);

        // The caret position is selection length
        iCaretPos = oSel.text.length;
    }

    // Firefox support
    else if (oField.selectionStart || oField.selectionStart == '0')
        iCaretPos = oField.selectionStart;

    // Return results
    return iCaretPos;
}

/* source:  http://stackoverflow.com/questions/512528/set-cursor-position-in-html-textbox */

function setCaretPosition(elem, caretPos) {

    if (elem != null) {
        if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if (elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else 
                elem.focus();
        }
    }
}

function forceUppercase(evt) {
    //TODO filter on evt.getKeyCode() represents a lower case character and otherwise do nothing
    // extract the ADF Faces Rich Client Component - presumably a RichInputText
    var comp = evt.getSource();
    // get the rich client component id - because from it we can derive the identitier for the DOM input element
    var adfComponentClientId = comp.getClientId();
    // get hold of the DOM element into which the user is typing text
    var elem = document.getElementById(adfComponentClientId + '::content');
    // find the current position of the cursor in the input element
    var currentCaret = getCaretPosition(elem);
    // turn the value in the RichInputText to Uppercase; NOTE: this will place the cursor after the last character in the field 
    comp.setValue(comp.getSubmittedValue().toUpperCase());
    // return the cursor to the position it was at
    setCaretPosition(elem, currentCaret);
}

function toUpperKeyInput(evt) {
    var comp = evt.getSource();
    comp.setValue(comp.getSubmittedValue().toUpperCase());
}
