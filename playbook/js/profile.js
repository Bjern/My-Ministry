//-------------------------------------------------------------------------------

// Profile stuff
//-------------------------------------------------------------------------------

function doSaveProfile() {

    localStorage.removeItem('profile');
    var profilevalues = new Array();

    // Retrieve the values from the form elements
    profilevalues.push(document.getElementById('firstname').value);
    profilevalues.push(document.getElementById('lastname').value);
    profilevalues.push(document.getElementById('email').value);
    profilevalues.push(document.getElementById('overseer').value);
    profilevalues.push(document.getElementById('overseer_tel').value);
    profilevalues.push(document.getElementById('overseer_email').value);

    try {
        localStorage.setItem('profile', profilevalues.join(";"));
		bb.popScreen();
    } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            alert("Quota exceeded!");
        }
    }

}

function doRecallProfile() {

	try {
		var profilevalues = localStorage.getItem('profile');
	    profilevalues = profilevalues.split(";");

    	document.getElementById('firstname').value = profilevalues[0];
	    document.getElementById('lastname').value = profilevalues[1];
    	document.getElementById('email').value = profilevalues[2];
    	document.getElementById('overseer').value = profilevalues[3];
	    document.getElementById('overseer_tel').value = profilevalues[4];
    	document.getElementById('overseer_email').value = profilevalues[5];

	} catch (e) {
		//alert("No profile information, creating new profile.");
	}

}