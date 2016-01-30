module.exports = function(MongoClient, mongo_url, app){
  app.get("/:req_id", function(req, res){
    MongoClient.connect(mongo_url, function(err, db) {
      if (err){ 
        return console.dir(err);
      }
      else {
        var sites = db.collection('sites');
        var req_id = Number(req.params.req_id);
        
        sites.count({site: {$ne: ""}}, function(err, count){
          if (err) throw err;
          if (req_id <= count && req_id > 0){
            sites.find({
              id: req_id
            }).toArray(function(err, documents){
              if (err) throw err;
              res.redirect(documents[0].site);
              db.close();
            });
          }
          else{
            res.send("invalid");
            db.close();
          }
        });
      }
     });      
  });
};