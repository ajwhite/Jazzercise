function getLocation(callback){
	if (Titanium.Geolocation.locationServicesEnabled === false)
	{
		Titanium.UI.createAlertDialog({title:'Justine..', message:'Turn your GPS on :)'}).show();
	} else {
		var authorization = Titanium.Geolocation.locationServicesAuthorization;
		if (authorization == Titanium.Geolocation.AUTHORIZATION_RESTRICTED){
			Titanium.UI.createAlertDialog({title:'Justine..', message:'You need to update this apps ability to use GPS (check settings)'}).show();
		} else {
			Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
			Titanium.Geolocation.getCurrentPosition(function(e)
			{
				if (!e.success || e.error){ alert('Sorry, couldn\'t detect your location'); return;}
		
				var longitude = e.coords.longitude;
				var latitude = e.coords.latitude;
				
				openDirections(latitude, longitude);
			});
			
		}
	}
}



function toRad(deg)
{
	var multiplier = 0.0174532925;
	var rad = deg * multiplier;
	return rad
}

function getDistance(lat1, lon1, lat2, lon2)
{
	lat1 = toRad(lat1);
	lon1 = toRad(lon1);
	lat2 = toRad(lat2);
	lon2 = toRad(lon2);
	
	var d_lat = lat2 - lat1;
	var d_lon = lon2 - lon1;
	
	
	var temp = (Math.pow(Math.sin(d_lat/2.0), 2) + 
				Math.cos(lat1) * Math.cos(lat2) * 
				Math.pow(Math.sin(d_lon/2.0), 2));

	var distance = 3956 * 2 * Math.atan2(Math.sqrt(temp), Math.sqrt(1-temp));

	distance = distance.toFixed(1);
	
	return distance;
}