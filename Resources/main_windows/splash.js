var win = Titanium.UI.currentWindow;
win.backgroundImage = '/images/splash2.png';


// var scrollView = Titanium.UI.createScrollView({
// 	
	// contentWidth: 'auto', contentHeight: 'auto',
	// top: 0, height:'400', width:'322'
// });
var scrollView = Titanium.UI.createScrollView({
    contentWidth:'auto',
    contentHeight:'auto',
    top:0,
    showVerticalScrollIndicator:true,
    showHorizontalScrollIndicator:true
});

var actInd = Titanium.UI.createActivityIndicator({
        width:'80%',
        height:'40%',
        message : 'Reverse Geolocating....',
        color : '#fff',
        backgroundColor : 'black',
	    opacity:0.7,
	    borderRadius:5,
        font : {
            fontFamily : 'Helvetica Neue',
            fontSize : 20,
            fontWeight:'bold'
        },
        style : Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN,
        zIndex : 20
    });
win.add(actInd);

var fieldView = Titanium.UI.createView({
	top:220, height:'120', width: '322',  left:0, backgroundImage: '/images/splash_box.png'
});

var location = Titanium.UI.createTextField({
	color:'#336699', height:35, top:45, left:20, width:280,
	hintText: "City",
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
	returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED

});

var search_button = Titanium.UI.createButton({
	title:'Search', height:'25', width:'83', right:25, top:85,
	backgroundImage: '/images/button.png', font:{fontSize:12}
});
var GPS_button = Titanium.UI.createButton({
	title:'GPS', height:'25', width:'83', right:120, top:85,
	backgroundImage: '/images/button.png', font:{fontSize:12}
});

location.addEventListener('focus', function(){
	//fieldView.top = 20;
});
location.addEventListener('blur', function(){
	fieldView.top = 220;
});

search_button.addEventListener('click', function()
{
	search(location.value);
});

GPS_button.addEventListener('click', function(){
	actInd.show();
	if (Titanium.Geolocation.locationServicesEnabled === false)
	{
		Titanium.UI.createAlertDialog({title:'Justine..', message:'Turn your GPS on silly!'}).show();
	} else {
		var authorization = Titanium.Geolocation.locationServicesAuthorization;
		if (authorization == Titanium.Geolocation.AUTHORIZATION_RESTRICTED){
			Titanium.UI.createAlertDialog({title:'Justine..', message:'You need to update this apps ability to use GPS (check settings)'}).show();
		} else {
			Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
			Titanium.Geolocation.getCurrentPosition(function(e)
			{
				if (!e.success || e.error){ alert('error'); return;}
		
				var longitude = e.coords.longitude;
				var latitude = e.coords.latitude;
				var altitude = e.coords.altitude;
				var heading = e.coords.heading;
				var accuracy = e.coords.accuracy;
				var speed = e.coords.speed;
				var timestamp = e.coords.timestamp;
				var altitudeAccuracy = e.coords.altitudeAccuracy;
				var currentLocation= 'long:' + longitude + ' lat: ' + latitude;
				    var url="http://maps.google.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&sensor=true";
				    xhr = Titanium.Network.createHTTPClient();
				    xhr.open('GET',url);
				    xhr.onload = function(){
				        var json = this.responseText;
				        var gotitems = eval('(' + json + ')');
				        var addr = gotitems.results[0].formatted_address;
				 		search(addr);
				    }
				xhr.send(); 
				
			});
			
		}
	}
})

// build views
fieldView.add(location);
fieldView.add(search_button);
fieldView.add(GPS_button);
scrollView.add(fieldView);

win.add(scrollView);

//search('chelmsford, ma');
var rowData = [];
function search(location){
	
	var winChild = Titanium.UI.createWindow({
		url:'/main_windows/search.js',
		title:'Find Jazzercise',
		barColor: "#be0056",
		jazz_location: location
	});
	actInd.hide();
	Titanium.UI.currentTab.open(winChild,{animated:true});
}
