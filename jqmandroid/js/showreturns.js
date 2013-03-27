function returndetails_addListItem() {

	var listItem, container, dataList = document.getElementById('dataListReturns');
	timeLog = "";
    var i = 0;
    var logLength = localStorage.length - 1;

    for (i = 0; i <= logLength; i++) {

        var itemKey = localStorage.key(i);
		var itemCategories = itemKey.split("_");
		var itemCategory = itemCategories[0];

        if (itemCategory == 'rv') {

            var values = localStorage.getItem(itemKey);
            values = values.split(";");

            var date = values[0];
            var contact = values[1];
            var address = values[2];
            var topic = values[3];
            var scriptures = values[4];
            var _language = values[5];
            var publication = values[6];
            var notes = values[7];
            var gpscoords = values[8];

			// Create our list item
			listItem = document.createElement('div');
			listItem.setAttribute('data-bb-type', 'item');
			listItem.setAttribute('data-bb-img', 'images/icons/icon15.png');
			// The title goes here - format the date nicely
			listItem.setAttribute('data-bb-title', contact);
			// Set the onclick action
			listItem.setAttribute('onclick', 'rv_id = "' + itemKey + '";bb.pushScreen("recordinterest.html", "editinterest");');
			// The summary of time goes here
			listItem.innerHTML = '(' + _language + ') - ' + publication + ' - ' + topic;
			// Create a dummy container
			container = document.createElement('div');
			container.appendChild(listItem);
			// Apply the styling
			bb.imageList.apply([container]);
			// Append the item
			dataList.appendChild(container.firstChild);
			// re-compute the scrolling area
			if (bb.scroller) {
				bb.scroller.refresh();
			}
        
        }
    }
	
	document.getElementById('waiting').style.display = 'none';
}