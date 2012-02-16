var win = Titanium.UI.currentWindow;
var id = win.jazz_id;
win.backgroundImage = '/images/cody2.png';



var rowData = [];
var url = "http://jazzercise.atticuswhite.com/api.php";
var params = {
	action: 'schedule',
	id: win.jazz_id,
	p: 0
};
//var params = {email:email, password:pass};
var buzzHTTP = Titanium.Network.createHTTPClient();
buzzHTTP.open("POST", url);
buzzHTTP.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
buzzHTTP.send(params);

buzzHTTP.onload = function(){
	Titanium.API.log("calling atticus web service");
	var result = eval('(' + this.responseText + ')');
	Titanium.API.log(result);
	Titanium.API.log(result.length);
	
	for (var i=0; i<result.length; i++){
			var current = result[i];
			var row = Titanium.UI.createTableViewRow({
				height: '75'
			});
			var post_view = Titanium.UI.createView({height:'30', layout:'vertical',top:5, right:5, bottom:5, left:5});
			
			var time = Titanium.UI.createLabel({
				text: current.time, left:0, top:0, height:'15', width:'40',
				font:{fontFamily:'Arial', fontSize:12, fontWeight:'bold'}
			});
			var name = Titanium.UI.createLabel({
				text:  current.name, left:50, top:-15, width:'300', height:'10',
				font:{fontFamily:'Arial', fontSize:12, fontWeight:'bold'}
			});
			
			var instructor = Titanium.UI.createLabel({
				text: current.instructor, left:60, top:0, height:'25',
				font:{fontFamily:'Arial', fontSize:12, fontWeight:'bold'}
			});
			
			
			
			post_view.add(time);
			post_view.add(name);
			post_view.add(instructor);
			row.add(post_view);
			row.className = 'item' +i;
			rowData[i] = row;
	}
	
	
	var tableView = Titanium.UI.createTableView({data:rowData});
	win.add(tableView);
	
};

