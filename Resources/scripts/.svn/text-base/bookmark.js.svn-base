
var db = null;

function openDB(){
	db = Titanium.Database.open("jazzercise");
	//db.execute("DROP TABLE classes");
	db.execute("CREATE TABLE IF NOT EXISTS locations (id INTEGER, name TEXT, address TEXT, citystatezip TEXT, phone TEXT, slug TEXT, lat TEXT, lng TEXT)");
}


function isBookmarked(id){
	openDB();
	var rows = db.execute("SELECT COUNT(1) AS count FROM locations WHERE id = ?", id);
	Titanium.API.info("NUM ROWS: " + rows.fieldByName('count'));
	var count = rows.fieldByName('count');
	db.close();
	return count > 0;
}

function saveBookmark(id, name, address, citystatezip, phone, slug, lat, lng){
	openDB();
	var rows = db.execute("SELECT COUNT(1) AS count FROM locations WHERE id = ?", id);
	Titanium.API.info("NUM ROWS: " + rows.fieldByName('count'));
	if (rows.fieldByName('count') == 0)
		db.execute("INSERT INTO locations (id, name, address, citystatezip, phone, slug, lat, lng) VALUES(?,?,?,?,?,?,?,?)", id, name, address, citystatezip, phone, slug, lat, lng);
	db.close();
}

function removeBookmark(id){
	openDB();
	Titanium.API.info("DEL ID: " + id);
	db.execute("DELETE FROM locations WHERE id = ?", id);
	db.close();
}

function getBookmarks(){
	openDB();
	var rows = db.execute('SELECT * FROM locations');
	var i = 0;
	var bookmarks = new Array();
	while (rows.isValidRow()){
		bookmarks[i] = {
			id: rows.fieldByName('id'),
			name: rows.fieldByName('name'),
			address: rows.fieldByName('address'),
			citystatezip: rows.fieldByName('citystatezip'),
			phone: rows.fieldByName('phone'),
			slug: rows.fieldByName('slug'),
			lat: rows.fieldByName('lat'),
			lng: rows.fieldByName('lng')
		};
		Titanium.API.info(bookmarks[i]);
		i++;
		rows.next();
	}
	db.close();
	return bookmarks;
}
