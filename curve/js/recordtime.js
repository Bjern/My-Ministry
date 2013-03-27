function insertDate() {
    var today = new Date();
    document.getElementById('date').value = (today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate());
}

function doSaveTime() {

    var timevalues = new Array();
    var newDate = new Date();
	
	if (fs_id != '') {
		var itemId = fs_id;
	} else {
		var itemId = 'fs_' + newDate.getTime();
	}

    var date = document.getElementById('date').value;
    var hours = document.getElementById('hours').value;
    var books = document.getElementById('books').value;
    var booklets = document.getElementById('booklets').value;
    var mags = document.getElementById('mags').value;
    var returns = document.getElementById('returns').value;

    timevalues.push(date);
    timevalues.push(hours);
    timevalues.push(books);
    timevalues.push(booklets);
    timevalues.push(mags);
    timevalues.push(returns);

    try {
        localStorage.setItem(itemId, timevalues.join(";"));
		fs_id = '';
		bb.popScreen();
    } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            alert("Quota exceeded!");
        }
    }

}

function doRecallTimeDetails(timedate) {

    var timeLog = "";
    var i = 0;
    var logLength = localStorage.length - 1;

    for (i = 0; i <= logLength; i++) {

        var itemKey = localStorage.key(i);
		var itemCategories = itemKey.split("_");
		var itemCategory = itemCategories[0];

        if (itemCategory == 'fs') {

            var values = localStorage.getItem(itemKey);
            values = values.split(";");
            var date = values[0];

            if (date == timedate) {

                var hours = values[1];
                var books = values[2];
                var booklets = values[3];
                var mags = values[4];
                var returns = values[5];

                document.getElementById('date').value = date;
                document.getElementById('hours').value = hours;
                document.getElementById('books').value = books;
                document.getElementById('booklets').value = booklets;
                document.getElementById('mags').value = mags;
                document.getElementById('returns').value = returns;
            }

        }
    }

}

function edittime_updateInputs() {

    var i = 0;
    var logLength = localStorage.length - 1;

    for (i = 0; i <= logLength; i++) {

        var itemKey = localStorage.key(i);

        if (itemKey == fs_id) {

            var values = localStorage.getItem(itemKey);
            values = values.split(";");

            var date = values[0];
            var hours = values[1];
            var books = values[2];
            var booklets = values[3];
            var mags = values[4];
            var returns = values[5];
			
			document.getElementById('date').value = date;
			document.getElementById('hours').value = hours;
			document.getElementById('books').value = books;
			document.getElementById('booklets').value = booklets;
			document.getElementById('mags').value = mags;
			document.getElementById('returns').value = returns;

        }
    }
	
}

// For deleting field service records
function doDeleteTime() {

    if (fs_id != '') {
        var itemId = fs_id;
    } else {
        alert("You cannot delete an empty record! ");
    }

    try {

        localStorage.removeItem(itemId);

    } catch (e) {
        alert("There was a problem deleting time records! " + e);
    }

    bb.popScreen();
}