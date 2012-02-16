//http://jcls.jazzercise.com/search/getmarkers?search=chelmsford&lat=42.599093&lng=-71.362896&distance=30&returnvalue=json

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Justine\'s Jazzercise',
    backroundImage: 'images/splash.png',
	url: 'main_windows/splash.js',
	barColor: "#be0056"
});

var tab1 = Titanium.UI.createTab({  
    icon:Titanium.UI.iPhone.SystemIcon.SEARCH,
    title:'Search',
    window:win1
});



//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Bookmarks',
    backgroundColor:'#fff',
    url: 'main_windows/bookmarks.js',
    barColor: "#be0056"
});
var tab2 = Titanium.UI.createTab({  
    icon:Titanium.UI.iPhone.SystemIcon.FAVORITES,
    title:'Bookmarks',
    window:win2
});


//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
