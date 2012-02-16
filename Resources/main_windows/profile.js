Titanium.include('/scripts/bookmark.js');
Titanium.include('/scripts/geolocate.js');
var win = Titanium.UI.currentWindow;
var id = win.jazz_id;


/**** BOOKMARK BUTTON ****/
var bookmark_btn;

function setDeleteButton(){
	bookmark_btn = Titanium.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.TRASH
	});
	bookmark_btn.addEventListener("click", function(){
		setBookmarkButton();
		removeBookmark(id);
	});
	win.setRightNavButton(bookmark_btn);
}

function setBookmarkButton(){
	bookmark_btn = Titanium.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.SAVE
	});
	bookmark_btn.addEventListener("click", function(){
		setDeleteButton();
		saveBookmark(id, win.jazz_name, win.jazz_address, win.jazz_citystatezip, win.jazz_phone, win.jazz_slug, win.jazz_lat, win.jazz_lng);
	});
	win.setRightNavButton(bookmark_btn);
}

if (!isBookmarked(id)){
	setBookmarkButton();
} else {
	setDeleteButton();
}





/***** INDICATOR OVERLAY ******/
var actInd = Titanium.UI.createActivityIndicator({
        width:'50%',
        height:'20%',
        bottom: '80',
        message : 'Loading Schedule',
        color : '#fff',
        backgroundColor : 'black',
	    opacity:0.3,
	    borderRadius:5,
        font : {
            fontFamily : 'Helvetica Neue',
            fontSize : 20,
            fontWeight:'bold'
        },
        textAlign: 'center',
        style : Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN,
        zIndex : 20
    });
win.add(actInd);
actInd.show();




//win.backgroundImage = '/images/cody2.png';

var wrapper = Titanium.UI.createView({
	height:'100%', width:'100%', backgroundColor:"#ffffff", top:0, left:0
});

var infoView = Titanium.UI.createView({
	left:10, top:10, width:'97%', height:'100', backgroundColor:"#ffffff"
});

var jazz_title = Titanium.UI.createLabel({
    text:win.jazz_name,
    top:0, left:0,
    height:'20',
    width:'auto',
    color:'#bd0054',
    font:{fontSize:18}
});

var map_icon = Titanium.UI.createImageView({
	url:'/images/map_icon_sm.png', top: 30, left:0, width: 36, height:37,
	backgroundColor:'transparent'
});

var jazz_location = Titanium.UI.createLabel({
	text:win.jazz_address + "\n" + win.jazz_citystatezip + "\n" + win.jazz_phone,
	top:30, left:50,
	height:'auto', width:'auto', color:'#000',
	font:{fontSize:12}
});

var phone_button = Titanium.UI.createButton({
	title:'Call', height:'25', width:'83', right:10, top:30,
	backgroundImage: '/images/button.png', font:{fontSize:12, fontWeight:'bold'}
});
var directions_button = Titanium.UI.createButton({
	title:'Directions', height:'25', width:'83', right:10, top:60,
	backgroundImage: '/images/button.png', font:{fontSize:12, fontWeight:'bold'}
});

infoView.add(jazz_title);
infoView.add(map_icon);
infoView.add(jazz_location);
infoView.add(phone_button);
infoView.add(directions_button);


var scheduleView = Titanium.UI.createView({
	left:10, top:110, width:'97%', height:'auto', backgroundColor:"#ffffff"
});

var scheduleTitle =Titanium.UI.createLabel({
    text:"Schedule",
    top:0, left:0,
    height:'auto',
    width:'auto',
    color:'#bd0054',
    font:{fontSize:18}
});
scheduleView.add(scheduleTitle);


var rowData= [];

var count = 0;

var createCustomView = function(title) {
    var view = Ti.UI.createView({
        backgroundColor: 'ecb0ca',
        height: 20
    });
    var text = Ti.UI.createLabel({
        text: title,
        left: 20,
        color: '#fff',
        font:{fontSize:12, fontWeight:'bold'}
    });
    view.add(text);
    return view;
};

var tableView;
var sections = new Array();
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
for (var i=0; i<7; i++){
	sections[i] = { 
		section: Ti.UI.createTableViewSection({
			headerView: createCustomView(days[i])
		}),
		count: 0
	};
}





var url = "http://jazzercise.atticuswhite.com/api.php";
var params = {
	action: 'schedule',
	id: win.jazz_id,
	p: 0
};
//var params = {email:email, password:pass};
var buzzHTTP = Titanium.Network.createHTTPClient();
Titanium.API.log("URL: " + url);
Titanium.API.log("id: " + params.id);
buzzHTTP.open("POST", url);
buzzHTTP.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
buzzHTTP.send(params);

buzzHTTP.onload = function(){
	Titanium.API.log("calling atticus web service");
	Titanium.API.log("RESPONSE: " + this.responseText);
	var result = eval('(' + this.responseText + ')');
	buildTableView(result);
	//Titanium.API.log(result.length);
	
};





var sectionRows = new Array();

function buildTableView(result){
	for (var i=0; i<result.length; i++){
		for(var c=0; c<result[i].classes.length; c++){
			Titanium.API.log("Loop number; " + c);
			var current = result[i].classes[c];
			Titanium.API.log("instructor value: " + current.instructor + " time: " + current.time + " name: " + current.name);
			
			if (current.time == null){
				Titanium.API.log("Skipping");
				continue;
			}	
			Titanium.API.log("running");
		
			var row = Titanium.UI.createTableViewRow({
				height: '42', className: 'schedule' 
			});
			
			var post_view = Titanium.UI.createView({height:'40', width:'300',top:5, right:5, bottom:5, left:5});
			
			var time = Titanium.UI.createLabel({
				text: current.time, left:1, top:1, color: "#333333", width: '35', height:'40',
				font:{fontFamily:'Arial', fontSize:12, fontWeight:'bold'}, textAlign:'right'
			});
			var name = Titanium.UI.createLabel({
				text:  current.name, left:55, top:8, bottom:5, color:"#cc2870", width:'170', height:'auto',
				font:{fontFamily:'Arial', fontSize:16, fontWeight:'bold'}
			});
			
			
			var instructor_name = current.instructor;
			if (instructor_name != "Instructor Varies"){
				instructor_name = "with " + instructor_name; 
			}
			
			var instructor = Titanium.UI.createLabel({
				text: instructor_name, left: 200, top:8, height:'25', color:"#333333",
				font:{fontFamily:'Arial', fontSize:12, fontWeight:'bold'}
			});
			
			post_view.add(time);
			post_view.add(name);
			post_view.add(instructor);
			row.add(post_view);
			
				Titanium.API.log("IS THIS REACHED");
				
			sections[i].section.add(row);
			sections[i].count++;
		}
		//data:[section1,section2,section3,section4,section5,section6],
		if (i == result.length -1){
			addTableSections();
		}
	}
	actInd.hide();
}
	
function addTableSections(){
	var _sections = new Array();
	for (var i=0;i<sections.length;i++){
		if (sections[i].count == 0){
			var row = Titanium.UI.createTableViewRow({
				height: '20', className: 'schedule' 
			});
			
			var post_view = Titanium.UI.createView({height:'20', width:'300',top:5, right:5, bottom:5, left:5});
			
			var label = Titanium.UI.createLabel({
				text: "No classes this day", left:50, top:1, color: "#333333", width: '200', height:'20',
				font:{fontFamily:'Arial', fontSize:10, fontStyle:'italic'}, textAlign:'center'
			});
			
			post_view.add(label);
			row.add(post_view)
			sections[i].section.add(row);
		}
		_sections.push(sections[i].section);
	}
	tableView = Ti.UI.createTableView({
	    data:_sections,
	    top:20, left: 0,  width:'97%', height:'240'
	});
	scheduleView.add(tableView);	
}
	
	
//var tableView = Titanium.UI.createTableView({data:rowData, top:20, left: 0,  width:'97%', height:'240'});






var modalWin = Titanium.UI.createWindow({
	backgroundColor:"#ffffff",
	barColor: "#be0056",
	title: "Jazzercise Map"
});

var modal_close = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.DONE
});
modalWin.setRightNavButton(modal_close);


modal_close.addEventListener("click", function(){
	modalWin.close();
});
directions_button.addEventListener("click", function(){
	
	var jazz_pin = Titanium.Map.createAnnotation({
		latitude:win.jazz_lat,
		longitude:win.jazz_lng,
		title:win.jazz_name,
		subtitle:'Click for Directions',
		pincolor:Titanium.Map.ANNOTATION_GREEN,
		rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
		animate:true,
		myid:2 // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
	});
	
	
	var mapview = Titanium.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		region:{latitude:win.jazz_lat, longitude:win.jazz_lng, latitudeDelta:0.2, longitudeDelta:0.2},
		animate:true,
		regionFit:true,
		userLocation:true,
		annotations:[jazz_pin]
	});
	mapview.addEventListener('click', function(evt){
		if (evt.clicksource == 'rightButton'){
			getLocation();
		}
	});
	mapview.selectAnnotation(jazz_pin);
	modalWin.add(mapview);
	modalWin.open({modal:true});
});


function openDirections(latitude, longitude){
	Ti.Platform.openURL('http://maps.google.com/maps?t=m&saddr=' + latitude + ',' + longitude + '&daddr=' + win.jazz_lat + ',' + win.jazz_lng);
}

phone_button.addEventListener("click", function(){
	 Ti.Platform.openURL('tel:' + win.jazz_phone);
});











wrapper.add(infoView);
wrapper.add(scheduleView);
win.add(wrapper);







