function reporttime_addListItem() {

    reporttime_Dashboard();

    var listItem, listHeader, container, mcontainer, dataList = document.getElementById('dataListServiceTime');
    var i = 0;
    var logLength = localStorage.length - 1;
    var monthHeader, monthHeaderNew;

    var lstorage = new Array();
    var intLSCounter = 0;

    // build an array of the recorded field service dates - this is for sorting
    for (i = 0; i <= logLength; i++) {
        var itemKey = localStorage.key(i);
        var itemCategories = itemKey.split("_");
        var itemCategory = itemCategories[0];

        // Add the item key to an array for sorting later
        if (itemCategory == 'fs') {
            var values = localStorage.getItem(itemKey);
            values = values.split(";");
            var date = values[0];
            lstorage[intLSCounter] = date + '_' + itemKey;
            ++intLSCounter;
        }
    }

    var sorted_lstorage = _.sortBy(lstorage, function (str) { return str; });
    var fslength = sorted_lstorage.length - 1;
    var monthArr = new Array();

    for (i = 0; i <= fslength; i++) {

        // Split the sorted keys
        var fs_key = sorted_lstorage[i];
        fs_key = fs_key.split("_");

        // Get the item data based on the sorted key
        var itemKey = fs_key[1] + '_' + fs_key[2];
        var values = localStorage.getItem(itemKey);
        values = values.split(";");

        var timeArray = new Array();
        var date = values[0];
        monthHeaderNew = returnMonth(date);
        monthArr[i] = monthHeaderNew;
        var intCounter = 0;

        if (values[1] > 0) {
            timeArray[intCounter] = values[1] + ' Hours';
            ++intCounter;
        }

        if (values[4] > 0) {
            timeArray[intCounter] = ' ' + values[4] + ' Mags';
            ++intCounter;
        }

        if (values[2] > 0) {
            timeArray[intCounter] = ' ' + values[2] + ' Books';
            ++intCounter;
        }

        if (values[3] > 0) {
            timeArray[intCounter] = ' ' + values[3] + ' Booklets';
            ++intCounter;
        }

        if (values[5] > 0) {
            timeArray[intCounter] = ' ' + values[5] + ' Returns';
            ++intCounter;
        }

        if (i != 0) {
            // Not the first record and maybe not the same month
            monthHeader = monthArr[i - 1];

            if (monthHeaderNew != monthHeader) {
                // Create the month header.
                listHeader = document.createElement('div');
                listHeader.setAttribute('data-bb-type', 'header');
                listHeader.innerHTML = monthHeaderNew;
                // Create a dummy month container
                mcontainer = document.createElement('div');
                mcontainer.appendChild(listHeader);
                bb.imageList.apply([mcontainer]);
                dataList.appendChild(mcontainer.firstChild);
            }

        } else if (i == 0) {
            // Create for the first time the month heading
            monthHeader = monthArr[i];

            // Create the month header.
            listHeader = document.createElement('div');
            listHeader.setAttribute('data-bb-type', 'header');
            listHeader.innerHTML = monthHeader;
            // Create a dummy month container
            mcontainer = document.createElement('div');
            mcontainer.appendChild(listHeader);
            bb.imageList.apply([mcontainer]);
            dataList.appendChild(mcontainer.firstChild);
        }

        // Create our list item
        listItem = document.createElement('div');
        listItem.setAttribute('data-bb-type', 'item');
        listItem.setAttribute('data-bb-img', 'images/icons/icon15.png');
        // The title goes here - format the date nicely
        listItem.setAttribute('data-bb-title', date);
        // Set the onclick action
        listItem.setAttribute('onclick', 'fs_id = "' + itemKey + '";bb.pushScreen("recordtime.html", "edittime");');
        // The summary of time goes here
        listItem.innerHTML = timeArray.join();
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

        //}
    }

    document.getElementById('waiting').style.display = 'none';

}

// For deleting field service records
function doDeleteTime() {

    try {

        document.getElementById('waiting').style.display = 'visible';

        for (var key in localStorage) {
            if (key.indexOf('fs_') > -1) {
                localStorage.removeItem(key);
            }
        }

    } catch (e) {
        alert("There was a problem deleting time records! " + e);
    }

    document.getElementById('waiting').style.display = 'none';
    bb.popScreen();
}

function reporttime_Dashboard() {

    var i = 0;
    var logLength = localStorage.length - 1;
    var chours = 0, hours = 0;
    var cmags = 0, mags = 0;
    var books = 0, cbooks = 0;
    var booklets = 0, cbooklets = 0;
    var returns = 0, creturns = 0;
    var intCounter = 0;
    var arrTimeTotals = new Array();
    var arrTimeCurrent = new Array();
    var currMonth = false;

    // Loop through all the field service records and build totals
    for (i = 0; i <= logLength; i++) {

        var itemKey = localStorage.key(i);
        var itemCategories = itemKey.split("_");
        var itemCategory = itemCategories[0];

        if (itemCategory == 'fs') {

            var values = localStorage.getItem(itemKey);
            values = values.split(";");
            var date = values[0];

            if (returnMonth(date) == returnMonth()) {
                currMonth = true;
            }

            if (values[1] > 0) {
                hours = Number(hours) + Number(values[1]);
                if (currMonth) { chours = Number(chours) + Number(values[1]); }
            }

            if (values[4] > 0) {
                mags = Number(mags) + Number(values[4]);
                if (currMonth) { cmags = Number(cmags) + Number(values[4]); }
            }

            if (values[2] > 0) {
                books = Number(books) + Number(values[2]);
                if (currMonth) { cbooks = Number(cbooks) + Number(values[2]); }
            }

            if (values[3] > 0) {
                booklets = Number(booklets) + Number(values[3]);
                if (currMonth) { cbooklets = Number(cbooklets) + Number(values[3]); }
            }

            if (values[5] > 0) {
                returns = Number(returns) + Number(values[5]);
                if (currMonth) { creturns = Number(creturns) + Number(values[5]); }
            }

        }

        currMonth = false;

    }

    // Build the totals string for display
    if (hours > 0) {
        arrTimeTotals[intCounter] = hours + ' Hours';
        arrTimeCurrent[intCounter] = chours + ' Hours';
        ++intCounter;
    }

    if (mags > 0) {
        arrTimeTotals[intCounter] = ' ' + mags + ' Mags';
        arrTimeCurrent[intCounter] = cmags + ' Mags';
        ++intCounter;
    }

    if (books > 0) {
        arrTimeTotals[intCounter] = ' ' + books + ' Books';
        arrTimeCurrent[intCounter] = cbooks + ' Books';
        ++intCounter;
    }

    if (booklets > 0) {
        arrTimeTotals[intCounter] = ' ' + booklets + ' Booklets';
        arrTimeCurrent[intCounter] = cbooklets + ' Booklets';
        ++intCounter;
    }

    if (returns > 0) {
        arrTimeTotals[intCounter] = ' ' + returns + ' Returns';
        arrTimeCurrent[intCounter] = creturns + ' Returns';
        ++intCounter;
    }

    // Create a dummy container
    document.getElementById('fsTotals').innerHTML = arrTimeTotals.join();
    document.getElementById('fsTotals_current').innerHTML = arrTimeCurrent.join();

    // re-compute the scrolling area
    if (bb.scroller) {
        bb.scroller.refresh();
    }

}

function returnMonth(strDate) {

    if (strDate == null) {
        var today = new Date();
    } else {
        var today = new Date(strDate);
    }
    
	var month = new Array();

	month[0]="January";
	month[1]="February";
	month[2]="March";
	month[3]="April";
	month[4]="May";
	month[5]="June";
	month[6]="July";
	month[7]="August";
	month[8]="September";
	month[9]="October";
	month[10]="November";
	month[11]="December";
		
	var current_month = month[today.getMonth()];
	
	return current_month;
	
}

// For emailing field service records
function doEmailTime() {

    try {

        var profilevalues = localStorage.getItem('profile');
        profilevalues = profilevalues.split(";");

        var message = new blackberry.message.Message();

        // First check the first name is captured
        if (profilevalues[0] != null) {
            var from = profilevalues[0];
        } else {
            alert('You need to fill in your first name in profile.');
            return;
        }

        // Second check the last name is captured
        if (profilevalues[1] != null) {
            from += ' ' + profilevalues[1];
        } else {
            alert('You need to fill in your last name in profile.');
            return;
        }

        // Third check the overseers number is captured
        if ((profilevalues[5] != null) && (profilevalues[5] != undefined)) {
            email_to = profilevalues[5];
        } else {
            alert('You need to fill in your overseers email address in profile.');
            return;
        }

        message.toRecipients = email_to;
        message.subject = "Field Service Report for " + returnMonth();
        message.body = "My field service totals for " + returnMonth() + " are: " + document.getElementById('fsTotals_current').innerHTML + ' - Regards, ' + from;
        message.send();

        alert("Email to " + email_to + " has been sent.");

    } catch (e) {
        alert("There was a problem emailing time records! " + e + " Check your profile settings.");
    }

}

// For SMSing field service records
function doSMSTime() {

    try {

        var profilevalues = localStorage.getItem('profile');
        profilevalues = profilevalues.split(";");

        // First check the first name is captured
        if (profilevalues[0] != null) {
            var from = profilevalues[0];
        } else {
            alert('You need to fill in your first name in profile.');
            return;
        }

        // Second check the last name is captured
        if (profilevalues[1] != null) {
            from += ' ' + profilevalues[1];
        } else {
            alert('You need to fill in your last name in profile.');
            return;
        }

        // Third check the overseers number is captured
        if (profilevalues[4] != null) {
            sms_to = String(profilevalues[4]);
        } else {
            alert('You need to fill in your overseers cell number in profile.');
            return;
        }

        blackberry.message.sms.send("Hi, my field service totals for " + returnMonth() + " are: " + document.getElementById('fsTotals_current').innerHTML + ' - Regards, ' + from, sms_to);

        alert("SMS to " + sms_to + " has been sent.");

    } catch (e) {
        alert("There was a problem smsing time records! " + e);
    }

}

function doNewTime() {

    bb.pushScreen('recordtime.html', 'recordtime');

}