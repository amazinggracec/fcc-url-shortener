var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT;
var add_link = require('./add_link.js');
var access_link = require('./access_link.js');
// Retrieve
var MongoClient = require('mongodb').MongoClient;
var mongo_url = "mongodb://heroku_n5tzxw4r:bgegbscfvlkddoiieprkskrq03@ds051893.mongolab.com:51893/heroku_n5tzxw4r";

/*
MongoClient.connect(mongo_url, function(err, db){
  if (err) throw err;
  var sites = db.collection("sites");
  
  sites.remove(
    {
      site: {$ne: ""}
    }, function(err){
      if (err) throw err;
      db.close();
    }
  );
});
*/
add_link(MongoClient, mongo_url, app);
access_link(MongoClient, mongo_url, app);

app.use(express.static(path.resolve(__dirname)));

app.listen(port || 8080, process.env.IP || "0.0.0.0", function(){
  console.log("Server listening at",port);
});
