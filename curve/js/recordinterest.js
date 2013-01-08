function doSaveInterest() {

    var interestvalues = new Array();
    var newDate = new Date();
	
	if (rv_id != '') {
		var itemId = rv_id;
	} else {
		var itemId = 'rv_' + newDate.getTime();
	}
	
    var date = document.getElementById('date').value;
    var contact = document.getElementById('contact').value;
    var address = document.getElementById('address').value;
    var topic = document.getElementById('topic').value;
    var scriptures = document.getElementById('scriptures').value;
    var language = document.getElementById('_language').value;
    var publication = document.getElementById('publication').value;
    var notes = document.getElementById('notes').value;
    var gpscoords = document.getElementById('gpscoords').value;

    interestvalues.push(date);
    interestvalues.push(contact);
    interestvalues.push(address);
    interestvalues.push(topic);
    interestvalues.push(scriptures);
    interestvalues.push(language);
    interestvalues.push(publication);
    interestvalues.push(notes);
    interestvalues.push(gpscoords);

    try {
        localStorage.setItem(itemId, interestvalues.join(";"));
		rv_id = '';
		bb.popScreen();
    } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            alert("Quota exceeded!");
        }
    }

}

function editinterest_updateInputs() {

    var i = 0;
    var logLength = localStorage.length - 1;

    for (i = 0; i <= logLength; i++) {

        var itemKey = localStorage.key(i);

        if (itemKey == rv_id) {

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
			
			document.getElementById('date').value = date;
			document.getElementById('contact').value = contact;
			document.getElementById('address').value = address;
			document.getElementById('topic').value = topic;
			document.getElementById('scriptures').value = scriptures;
			document.getElementById('_language').value = _language;
			document.getElementById('publication').value = publication;
			document.getElementById('notes').value = notes;
			document.getElementById('gpscoords').value = gpscoords;

        }
    }
	
}