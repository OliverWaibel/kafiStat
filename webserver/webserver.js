var sys = require("sys");   
filesys = require("fs");  
var express = require("express");
var file= "../database/kafiStat.db";
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
var http = require('http');

var app = express.createServer();
app.get('/',function(req,res){
 res.send("Hello World");
});

app.get('/kafiStat', function(req,res){
 db.query("select datum, maschine, stock from stat",function(records) {
   res.write('<h1>Kaffee</h1>');
   req.write('<table>\n');
   for(var i = 0; i < records.length; i++)
    {
       res.write('<tr>\n');
       res.write('<td>'+records[i].datum+'</td>\n');
       res.write('<td>'+records[i].maschine+'</td>\n');
       res.write('<td>'+records[i].stock+'</td>\n');
       res.write('</tr>');

    }
    res.write('</table>\n');
    res.end();
    });
});

app.listen(8000);

/**
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  stmt = db.prepare("INSERT INTO STAT values(strftime('%s','now'),1,2)");
  stmt.run();
  stmt.finalize();
  response.end("Daten in DB gespeichert\n");
});

server.listen(8000);

*/

console.log("Server running at http://127.0.0.1:8000/");
