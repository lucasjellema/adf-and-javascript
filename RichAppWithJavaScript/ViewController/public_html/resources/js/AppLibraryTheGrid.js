// based on https://technology.amis.nl/2016/03/15/navigating-adf-editable-table-arrow-keys/ 
// defines the keys that are registered to be handled by the callback function in this script
var keyRegistry = new Array();
keyRegistry.push("UP");// UP is giving me a problem, so I use shift UP instead
keyRegistry.push("shift UP");
keyRegistry.push("shift DOWN");
keyRegistry.push("shift LEFT");
keyRegistry.push("shift RIGHT");

var maxCol = 9;// column H is the last one that is enterable
// call from onload event on document
function registerKeyBoardHandler(event) {
    for (var i = keyRegistry.length - 1;i > 0;i--) {
        var keyStroke = AdfKeyStroke.getKeyStrokeFromMarshalledString(keyRegistry[i]);
        AdfRichUIPeer.registerKeyStroke(event.getSource(), keyStroke, callBack);
    }
}

function callBack(keyCode) {
    var ac = AdfPage.PAGE.getActiveComponent();
    var marshalledKeyCode = keyCode.toMarshalledString(keyCode);
    var verticalMovement = marshalledKeyCode == "shift UP" || marshalledKeyCode == "shift DOWN";
    var horizontalMovement = marshalledKeyCode == "shift LEFT" || marshalledKeyCode == "shift RIGHT";
    if (horizontalMovement || verticalMovement) {
        // Let's try and find out if we are in a table
        var parent = ac.getParent();
        while (parent) {
            if (parent instanceof AdfRichTable) {
                break;
            }
            parent = parent.getParent();
        }
        //while
        // Did we find a table?
        if (parent instanceof AdfRichTable) {
            //using a matcher to split up the clientId 
            // so we can calculate the new clientId we want to navigate to
            var clientId = ac.getClientId().match("(.*):([0-9]+)(:[^:]+)");
            var newRowKey
            var tablePeer = parent.getPeer();
            // see JS Doc on Peer:  https://docs.oracle.com/middleware/1221/adf/api-reference-javascript-faces/toc.htm 
            tablePeer.bind(parent);

            // Check if page is ready (cancel navigation if not)
            // Otherwise when holding down the arrow keys the navigation gets out of sync
            if (!AdfPage.PAGE.isSynchronizedWithServer()) {
                return true;
            }

            if (verticalMovement) {
                // ask for the previous/next rowkey
                switch (marshalledKeyCode) {
                    case "shift UP":
                        newRowKey = tablePeer._getPreviousRowKeyAndRow(clientId[2]).rowKey;
                        break;
                    case "shift DOWN":
                        newRowKey = tablePeer._getNextRowKeyAndRow(clientId[2]).rowKey;
                        break;
                }
                // Handle the table row selection (but not the focus to the input field)
                tablePeer._handleTableBodyArrowUpDown(marshalledKeyCode == "shift UP", false, false);
            }
            // verticalMovement
            if (!tablePeer._isClickToEdit()) {
                // Edit all mode
                // We use the beginning and the end of our old clientId and replace the rowKey part
                var newComp;
                if (verticalMovement) {
                    newComp = AdfPage.PAGE.findComponent(clientId[1] + ":" + newRowKey + clientId[3]);
                }
                if (horizontalMovement) {
                    // get the column number for the current element ; for example t1:3:it4 is in column 4
                    var currentColumn = parseInt(clientId[3].substring(clientId[3].length - 1));
                    var newCol = currentColumn;
                    // move left or wrap around to the last item on the same row
                    if (marshalledKeyCode == "shift LEFT") {
                        newCol = currentColumn > 2 ? currentColumn - 1 : maxCol;
                    }
                    // move right or wrap around to the first item on the same row
                    if (marshalledKeyCode == "shift RIGHT") {
                        newCol = currentColumn < maxCol ? currentColumn + 1 : 2;
                    }
                    var clientId3 = clientId[3].slice(0,  - 1) + newCol;
                    newComp = AdfPage.PAGE.findComponent(clientId[1] + ":" + clientId[2] + clientId3);
                }

                // If we can find the component, set focus
                if (newComp != null) {
                    newCompPeer = newComp.getPeer();
                    newCompPeer.bind(newComp);
                    // find the html input element, set focus and select the value 
                    // (so you can edit it immediately)
                    var inputElem = newCompPeer.getDomContentElement().firstElementChild;
                    inputElem.focus();
                    inputElem.select();
                    var counter = 0;
                    // Check every 10ms if the page is ready (in case of PPR focus gets lost)
                    var interval = setInterval(function () {
                        if (++counter === 100 || AdfPage.PAGE.isSynchronizedWithServer()) {
                            inputElem.focus();
                            inputElem.select();
                            clearInterval(interval);
                        }
                    },
                    10);
                }
            }
        }
        return true;
    }
    // We are not in a table, handle as usual.
    return false;
}

function aggregate(event) {
    var component = event.getSource();
    var clientId = component.getClientId();
    var rowTotal = 0;
    // loop over all colummns in the current row, add values 
    for (var i = 2;i <= maxCol;i++) {
        var colComp = AdfPage.PAGE.findComponent(clientId.slice(0,  - 1) + i);
        var colValue = colComp.getValue();
        if (colValue && !isNaN(colValue))
            rowTotal = rowTotal + colValue;
    }
    // update total for this row
    var totalcompid = clientId.slice(0,  - 1) + "10";
    var totalComp = AdfPage.PAGE.findComponent(totalcompid);
    totalComp.setValue(rowTotal);

    // column total
    //using a matcher to split up the clientId 
    // so we can calculate the new clientId we want to navigate to
    var clientIdArray = clientId.match("(.*):([0-9]+)(:[^:]+)");

    var columnTotal = 0;
    // loop over all rows in the current column, add values 
    var i = 0;
    while (true) {
        var colComp = AdfPage.PAGE.findComponent(clientIdArray[1] +":" + i+ clientIdArray[3] );
        if (!colComp) break;
        var colValue = colComp.getValue();
        if (colValue && !isNaN(colValue))
            columnTotal = columnTotal + colValue;
        i++;    
    }//while


    var columnTotalId = clientIdArray[1] +  clientIdArray[3] + "f";
    var columnTotalComp = AdfPage.PAGE.findComponent(columnTotalId);
    columnTotalComp.setValue(columnTotal);

}

function init(event) {
    registerKeyBoardHandler(event);
}