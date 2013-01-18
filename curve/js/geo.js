function create_map(){

	// create a map in the "map" div, set the view to a given place and zoom
	if (rv_id != '') {
		
		var values = gps_c;
		values = values.split(",");
		document.getElementById('waiting').style.display = 'none';
		displayLocationInfo(values[0], values[1]);
	} else {
	    document.getElementById('waiting').style.display = 'none';
		getPosition({enableHighAccuracy : true});
	}
	
}

function getPosition(params)
{
	try
	{
		//First test to verify that the browser supports the Geolocation API
		if (navigator.geolocation !== null)
		{
			//Configure optional parameters
			var options;
			if (params)
			{
				options = eval("options = " + params + ";");
			} 
			else {
				// Uncomment the following line to retrieve the most accurate coordinates available
				// options = { enableHighAccuracy : true, timeout : 60000, maximumAge : 0 };
			}
			navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, options);
		} 
		else {
			errorMessage("HTML5 geolocation is not supported.");
		}
	} 
	catch (e) {
		errorMessage("exception (getPosition): " + e);
	}
}

function displayLocationInfo(lat, lon, alt)
{
	try
	{
		var textCoords = lat + ', ' + lon;
		
		if (use_i.length == 0) {
			var map = new L.map('map').setView([lat, lon], 13);

			// add a CloudMade tile layer with style #997
			L.tileLayer('http://{s}.tile.cloudmade.com/a521d36622f24a73b244c810c43c7f50/997/256/{z}/{x}/{y}.png', { attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'}).addTo(map);

			// add a marker in the given location, attach some popup content to it and open the popup
			L.marker([lat, lon]).addTo(map);
			//.bindPopup('A pretty CSS3 popup. <br> Easily customizable.').openPopup();		
			
		} else {

			// Display the coords in the input as a value
			var ele = document.getElementById(use_i);
			if (ele)
			{
				ele.value = textCoords;
			}
		}
	
	} 
	catch (e) {
		errorMessage("exception (displayLocationInfo): " + e);
	}
}

function geolocationSuccess(position) 
{
	try
	{

		var coordinates = position.coords;
		var lat = coordinates.latitude;
		var lon = coordinates.longitude;
		var alt = coordinates.altitude;
		
		displayLocationInfo(lat, lon, alt);
				
	} 
	catch (e) {
		errorMessage("exception (geolocationSuccess): " + e);
	}
}

function geolocationError(posError)
{
	try
	{
		if (posError)
		{
			switch(posError.code)
			{
				case posError.TIMEOUT:
					errorMessage("TIMEOUT: " + posError.message);
					break;
				case posError.PERMISSION_DENIED:
					errorMessage("PERMISSION DENIED: " + posError.message);
					break;
				case posError.POSITION_UNAVAILABLE:
					errorMessage("POSITION UNAVAILABLE: " + posError.message);
					break;
				default:
					errorMessage("UNHANDLED MESSAGE CODE (" + posError.code + "): " + posError.message);
					break;
			}
		}
	} 
	catch (e) {
		errorMessage("Exception (geolocationError): " + e);
	}
}

function clearOutput()
{
	/*var ele = document.getElementById("geolocationInfo");
	if (ele)
	{
		ele.innerHTML = "";
	}*/
}

function errorMessage(msg)
{
	//displayOutput("<span class='color:red'><b>Error</b>:" + msg + "</span>");
}

function doRefreshGPS() {

    getPosition({ enableHighAccuracy: true });

    document.getElementById('waiting').style.display = 'none';

}