var validUrl = require('valid-url');

module.exports = function(MongoClient, mongo_url, app){
  app.use("/new", function(req, res){
    var site = req.path.substring(1);
    if (!validUrl.isUri(site)){
      res.json({
          "original_url": "invalid",
          "short_url": req.protocol.concat("://", req.get('host'), "/", site),
      });
    }    
    else{
      MongoClient.connect(mongo_url, function(err, db) {
        if (err){ 
          return console.dir(err);
        }
        else {
          var sites = db.collection('sites');
          sites.count({site: {$ne: ""}}, function(err, count){
            if (err) throw err;
            sites.insert({id: ++count, site: site});
            res.json({"original_url": site, "short_url": req.protocol.concat("://", req.get('host'), "/", count)});
            db.close();
          });
        }
      });         
    }
  });
};