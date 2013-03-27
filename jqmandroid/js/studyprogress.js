function insertDate() {
    var today = new Date();
    document.getElementById('date').value = (today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate());
}

function doSaveProgress() {

    var progressvalues = new Array();
    var newDate = new Date();
	
	if (sp_id != '') {
		var itemId = sp_id;
	} else {
		var itemId = 'sp_' + newDate.getTime();
	}
	
    var date = document.getElementById('date').value;
    var student = document.getElementById('student').value;
    var publication = document.getElementById('publication').value;
    var pub_pg = document.getElementById('pub_pg').value;
    var pub_section = document.getElementById('pub_section').value;
    var pub_notes = document.getElementById('pub_notes').value;

    progressvalues.push(date);
    progressvalues.push(student);
    progressvalues.push(publication);
    progressvalues.push(pub_pg);
    progressvalues.push(pub_section);
    progressvalues.push(pub_notes);

    try {
        localStorage.setItem(itemId, progressvalues.join(";"));
		sp_id = '';
		bb.popScreen();
    } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            alert("Quota exceeded!");
        }
    }

}

function editstudy_updateInputs() {

    var i = 0;
    var logLength = localStorage.length - 1;

    for (i = 0; i <= logLength; i++) {

        var itemKey = localStorage.key(i);

        if (itemKey == sp_id) {

            var values = localStorage.getItem(itemKey);
            values = values.split(";");

            var date = values[0];
            var student = values[1];
            var publication = values[2];
            var pub_pg = values[3];
            var pub_section = values[4];
            var pub_notes = values[5];

			document.getElementById('date').value = date;
			document.getElementById('student').value = student;
			document.getElementById('publication').value = publication;
			document.getElementById('pub_pg').value = pub_pg;
			document.getElementById('pub_section').value = pub_section;
			document.getElementById('pub_notes').value = pub_notes;
			
        }
    }
	
}