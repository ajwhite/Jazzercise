Titanium.include('/scripts/bookmark.js');
var win = Titanium.UI.currentWindow;

win.addEventListener('focus', loadWindow);

function loadWindow(){
	
	var bookmarks = getBookmarks();
	var rowData = new Array();
	for (var i=0; i<bookmarks.length; i++){
		var current = bookmarks[i];
		var row = Titanium.UI.createTableViewRow({
			height: '50', hasChild: true,
			childWindow: 'profile.js', 
			jazz_slug: current.slug, 
			jazz_name: current.name,
			jazz_id: current.id,
			jazz_address: current.address,
			jazz_citystatezip: current.citystatezip,
			jazz_phone: current.phone,
			jazz_lat: current.lat,
			jazz_lng: current.lng
		});
		
		var demoDistance2 = Math.floor(1 + Math.random() * 8);
		
		Titanium.API.log("random dist: " + demoDistance2);
		
		var post_view = Titanium.UI.createView({height:'45',top:8, right:5, bottom:5, left:5});
		var distance = Titanium.UI.createLabel({
			text: i < 10 ? i + "." + demoDistance2 : i, left:5, top:12, color:"#333333", height:16, width:30, font:{fontSize:18, fontWeight:'bold'}, textAlign:'right'
		});
		var mile = Titanium.UI.createLabel({
			text: "mi", left:5, top:28, color:"#333333", height:10, width:30, font:{fontSize:11, fontWeight:'bold'}, textAlign:'right'
		});
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
			
	var tableView = Titanium.UI.createTableView({data:rowData, backgroundColor:'#ffffff'});
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
				jazz_lat: e.rowData.jazz_lat,
				jazz_lng: e.rowData.jazz_lng
			});
			Titanium.UI.currentTab.open(winChild,{animated:true});
		}
	});
	win.add(tableView);
}