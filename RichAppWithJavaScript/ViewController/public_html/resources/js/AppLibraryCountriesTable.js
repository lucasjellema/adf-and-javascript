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

// all code below is to support data list on continent filter field

function addOption(datalist, value) {
    var option = document.createElement("option");
    option.value = value;
    datalist.appendChild(option);
}

var datalist;

function addDataList() {
    // programmatically create datalist and link to input elements fruit and basket
    datalist = document.createElement("DATALIST");
    datalist.setAttribute("id", "continentList");
    document.getElementById("f1").appendChild(datalist);
}

function addDataListToContinent(continentFilterField) {
    var clientId = continentFilterField.getClientId();
    var continentFilter = document.getElementById(clientId+"::content");
    continentFilter.setAttribute("list", "continentList");
}

function populate_datalist_from_array(list_id, values) {
    clearChildren(list_id);
    var arr = values;
    for (var i = 0;i < arr.length;i++) {
        var opt = document.createElement('option');
        opt.innerHTML = arr[i];
        opt.value = arr[i];
        document.getElementById(list_id).appendChild(opt);
    }
}

function clearChildren(parent_id) {
    var node = document.getElementById(parent_id);
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function enterContinentFilter(event) {
    var source = event.getSource();
    //associate datalist with continent filter field (after partial page refresh of table, the association is lost again, better always set it when entering the field)
    var table = source.getParent();
    //input text in continent column = it3
    // alternative is to fetch list of distinct values from server??
    //pc1:t1:1:it3::content
    // all continent elements are richinputtext
    // table.getClientId() + 0..max + it3
    var i=0;
        while (true) {
        var id = table.getClientId() +":" + i+ ":it3";
        var colComp = AdfPage.PAGE.findComponent( id);
        if (!colComp) break;
        var colValue = colComp.getValue();
        console.log(colValue);
        i++;    
    }//while

    
    addDataListToContinent(source);
    // TODO:  scan table.column for all distinct values of continent
    // OR: ask server to all distinct values
    // remove all options from datalist and populate afresh
    populate_datalist_from_array("continentList", ["Africa", "Europe", "Asia","South America","North America","Oceania","Central America","Antartica"]);

}

function init(event) {
    addDataList();
}