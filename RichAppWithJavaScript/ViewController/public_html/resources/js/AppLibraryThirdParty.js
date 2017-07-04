function init(event) {
    // reference: http://www.dynamicdrive.com/dynamicindex4/powerzoomer.htm
    var imageId = "vaticanPicture";
    jQuery(document).ready(function($){ $('#'+imageId).addpowerzoom({ defaultpower: 3, powerrange: [2,5], largeimage: null, magnifiersize: [140,140] }) });
}