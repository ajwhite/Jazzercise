var DEV = false;

Titanium.include('/scripts/geolocate.js');
var win = Titanium.UI.currentWindow;
win.backgroundImage = '/images/cody1.png';


var actInd = Titanium.UI.createActivityIndicator({
        width:'80%',
        height:'30%',
        message : 'Loading....',
        color : '#fff',
        backgroundColor : 'black',
	    opacity:0.4,
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
actInd.show();

var location = win.jazz_location;
var rowData = [];
geocode(location);

function geocode(address){
	 var url="http://maps.google.com/maps/api/geocode/json?address="+ address +"&sensor=true";
	xhr = Titanium.Network.createHTTPClient();
	xhr.open('GET',url);
	xhr.onload = function(){
	    var json = this.responseText;
	    var gotitems = eval('(' + json + ')');
	    var addr = gotitems.results[0].geometry.location;
	 	search(addr);
	}
	xhr.send(); 
}

var distanceStorage = new Array();
var tableView = null;

function search(addr){
	var url = "http://jcls.jazzercise.com/search/getmarkers";
	var lat = "42.599093";
	var lng = "-71.362896";
	var distance = "30";
	var returnvalue = "json";
	
	if (addr){
		lat = addr.lat;
		lng = addr.lng;
	}
	 
	//?search=chelmsford&lat=42.599093&lng=-71.362896&distance=30&returnvalue=json"
	url += "?search=" + location;
	url += "&lat=" + lat;
	url += "&lng=" + lng;
	url += "&distance=" + distance;
	url += "&returnvalue=" + returnvalue;	
	params = {};
	
	//var params = {email:email, password:pass};
	var buzzHTTP = Titanium.Network.createHTTPClient();
	if (!DEV){
		buzzHTTP.open("POST", url);
		buzzHTTP.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		buzzHTTP.send(params);
	} else {
		buzzHTTP.open("POST", "http://jazzercise.atticuswhite.com/api.php");
		buzzHTTP.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		buzzHTTP.send({action: 'search', dev:'true'});
	}
	buzzHTTP.onload = function(){
		actInd.hide();
		//Titanium.API.log(this.responseText);
		var result = eval('(' + this.responseText + ')');
		Titanium.API.log(result);
		Titanium.API.log("END DISPLAY");
		for (var i=0; i<result.length; i++){
			var current = result[i];
			var row = Titanium.UI.createTableViewRow({
				height: '50', hasChild: true,
				childWindow: 'profile.js', 
				jazz_slug: current.slug, 
				jazz_name: current.name,
				jazz_id: current.id,
				jazz_address: current.address,
				jazz_citystatezip: current.citystatezip,
				jazz_phone: current.phone,
				lat: current.lat,
				lng: current.lng
			});
			
			
			var post_view = Titanium.UI.createView({height:'45',top:8, right:5, bottom:5, left:5});
			var distance = Titanium.UI.createLabel({
				text:"", left:1, top:12, color:"#333333", height:16, width:35, font:{fontSize:18, fontWeight:'bold'}, textAlign:'right'
			});
			
			
			var mile = Titanium.UI.createLabel({
				text: "", left:5, top:28, color:"#333333", height:10, width:30, font:{fontSize:11, fontWeight:'bold'}, textAlign:'right'
			});
			
			distanceStorage[i] = { lat: current.lat, lng: current.lng, index: i, element: distance, mi: mile};
			
			
			var name = Titanium.UI.createLabel({
				text: current.name, left:45, top:8, width:'auto', height:'25',color:"#cc2870",
				font:{fontFamily:'Arial', fontSize:16, fontWeight:'bold'}
			});
			
			post_view.add(distance);
			post_view.add(mile);
			post_view.add(name);
			row.add(post_view);
			row.className = 'item' +i;
			rowData[i] = row;
		}
		
		tableView = Titanium.UI.createTableView({data:rowData, backgroundColor:'#ffffff'});
		tableView.addEventListener('click', function(e){
			if (e.rowData.childWindow) {
				var winChild = Titanium.UI.createWindow({
					url:e.rowData.childWindow,
					title:'Jazzercise ',
					barColor: "#be0056",
					jazz_slug: e.rowData.jazz_slug,
					jazz_name: e.rowData.jazz_name,
					jazz_id: e.rowData.jazz_id,
					jazz_address: e.rowData.jazz_address,
					jazz_citystatezip: e.rowData.jazz_citystatezip,
					jazz_phone: e.rowData.jazz_phone,
					jazz_lat: e.rowData.lat,
					jazz_lng: e.rowData.lng
				});
				Titanium.UI.currentTab.open(winChild,{animated:true});
			}
		});
		
		win.add(tableView);

		getLocation();
		
	}
}



function openDirections(lat, lng){
	if (tableView == null) return;
	updateDistances(lat, lng)
	
}

function updateDistances(lat, lng){
	for (var i=0; i<distanceStorage.length; i++){
		var d = getDistance(lat, lng, distanceStorage[i].lat, distanceStorage[i].lng);
		distanceStorage[i].element.text = d;
		distanceStorage[i].mi = "mi";
	}
}
