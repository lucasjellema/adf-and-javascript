function changeGroupLayout(evt) {
    var pgl = AdfPage.PAGE.findComponent('pgl2');
    if ("horizontal" == pgl.getProperty("layout")) {
        pgl.setProperty("layout", "vertical");
        pgl.setProperty("inlineStyle", "background-color:red");
    }
    else {
        pgl.setProperty("layout", "horizontal");
        pgl.setProperty("inlineStyle", "background-color:white");
    }
}

function changeInputText(evt) {
    var iText = AdfPage.PAGE.findComponent('it1');
    iText.setProperty("value", "ADF Faces & JavaScript Fun");
    iText.setProperty("contentStyle", "background-color:red;color:white;font-weight:bold;");
}

function unchangeInputText(evt) {
    var iText = AdfPage.PAGE.findComponent('it1');
    iText.setProperty("value", "Not a clue");
    iText.setProperty("contentStyle", "background-color:gray;color:black;font-weight:normal;");
}