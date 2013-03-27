function studydetails_addListItem() {

	var listItem, container, dataList = document.getElementById('dataListStudies');
	timeLog = "";
    var i = 0;
    var logLength = localStorage.length - 1;

    for (i = 0; i <= logLength; i++) {

        var itemKey = localStorage.key(i);
		var itemCategories = itemKey.split("_");
		var itemCategory = itemCategories[0];

        if (itemCategory == 'sp') {

            var values = localStorage.getItem(itemKey);
            values = values.split(";");

            var date = values[0];
            var student = values[1];
            var publication = values[2];
            var pub_pg = values[3];

			// Create our list item
			listItem = document.createElement('div');
			listItem.setAttribute('data-bb-type', 'item');
			listItem.setAttribute('data-bb-img', 'images/icons/icon15.png');
			// The title goes here - format the date nicely
			listItem.setAttribute('data-bb-title', student);
			// Set the onclick action
			listItem.setAttribute('onclick', 'sp_id = "' + itemKey + '";bb.pushScreen("studyprogress.html", "editstudy");');
			// The summary of time goes here
			listItem.innerHTML = pub_pg + ' - ' + publication;
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