
var db = null;

function openDB(){
	db = Titanium.Database.open("jazzercise");
	//db.execute("DROP TABLE classes");
	db.execute("CREATE TABLE IF NOT EXISTS classes (location_id INTEGER, name TEXT, instructor TEXT, time TEXT, date TEXT)");
}


function hasCache(location_id, min_date, max_date){
	//db.execute("SELECT COUNT(1) FROM classes WHERE location_id = ? AND date < date('now', ')")
}


function saveClass(location_id, name, instructor, time, date){
	openDB();
	db.execute("INSERT INTO classes (location_id, name, instructor, time, date) VALUES(?,?,?,?,?)", location_id, name, instructor, time, date);
	db.close();
}

function removeClasses(location_id){
	openDB();
	Titanium.API.info("DEL ID: " + id);
	db.execute("DELETE FROM classes WHERE location_id = ?", id);
	db.close();
}

function getClasses(location_id){
	openDB();
	var rows = db.execute('SELECT * FROM classes WHERE location_id = ?', location_id);
	var i = 0;
	var classes = new Array();
	while (rows.isValidRow()){
		classes[i] = {
			location_id: rows.fieldByName('location_id'),
			name: rows.fieldByName('name'),
			instructor: rows.fieldByName('instructor'),
			time: rows.fieldByName('time'),
			date: rows.fieldByName('date')
		};
		Titanium.API.info(classes[i]);
		i++;
		rows.next();
	}
	db.close();
	return classes;
}
