var express = require("express");
var sqlite3 = require("sqlite3");

var file= "/home/d22/proj/kafiStat/database/kafiStat.db";

var db = new sqlite3.Database(file);

db.get("SELECT * FROM coffeestats", function(error, row) {
    if(error && error.errno == 1) {
        console.log("Table coffestats does not exist, creating");
        db.run("CREATE TABLE coffeestats (INT PRIMARY KEY NOT NULL, timestamp timestamp NOT NULL, city string NOT NULL, street string NOT NULL, floor int NOT NULL, duration float NOT NULL);");
    }
});

var app = express();
app.use(express.bodyParser());

app.get('/',function(req,res){
 res.send("THIS IS KAFISTATS!!");
});

app.post('/reportcoffee', function(request, response) {
    response.send(request.body);
});

app.listen(8000);


console.log("Server running at http://127.0.0.1:8000/");
